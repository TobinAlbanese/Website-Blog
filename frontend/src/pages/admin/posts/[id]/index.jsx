// src/pages/admin/posts/[id].jsx
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "../../../../components/Admin/AdminNavbar.jsx";
import TiptapEditor from "../../../../components/Admin/TiptapEditor.jsx";
import { supabase } from "../../../../lib/supabase/client";

// ---------- utilities ----------
const safeArr = (v) => (Array.isArray(v) ? v : []);
const debounce = (fn, ms = 700) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

const BUCKET = "post-images";

function publicUrl(storage_path) {
  if (!storage_path) return "";
  return supabase.storage.from(BUCKET).getPublicUrl(storage_path).data
    .publicUrl;
}

async function uploadImageFile({ postId, kind, file }) {
  // same upload helper as before — uses postId
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const name = `${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const storage_path = `posts/${postId}/${kind}/${name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storage_path, file, { upsert: true });

  if (error) throw error;
  return storage_path;
}

export default function AdminPostEditor() {
  const router = useRouter();
  const { id: postId } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // post meta
  const [post, setPost] = useState(null);

  // sections
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);

  // images
  const [inlineImages, setInlineImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [centerImages, setCenterImages] = useState([]);

  const [resourceGroups, setResourceGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [activeGroupLinks, setActiveGroupLinks] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [linkPaste, setLinkPaste] = useState("");
  const [groupDrafts, setGroupDrafts] = useState({});

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmDangerText, setConfirmDangerText] = useState("Delete");
  const [confirmAction, setConfirmAction] = useState(null);

  const openConfirm = ({
    title,
    message,
    dangerText = "Delete",
    onConfirm,
  }) => {
    setConfirmTitle(title || "Confirm");
    setConfirmMessage(message || "");
    setConfirmDangerText(dangerText);
    setConfirmAction(() => onConfirm);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmTitle("");
    setConfirmMessage("");
    setConfirmDangerText("Delete");
    setConfirmAction(null);
  };

  useEffect(() => {
    if (!confirmOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeConfirm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen]);
  
  // ---------- auth gate ----------
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) router.replace("/admin/login");
      const { data: prof } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (prof?.role !== "admin") router.replace("/MidnightBureau");
    })();
  }, [router]);

  // ---------- load everything ----------
  useEffect(() => {
    if (!postId) return;

    (async () => {
      setLoading(true);
      setErr("");

      const { data: p, error: pErr } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .maybeSingle();
      if (pErr) return (setErr(pErr.message), setLoading(false));

      const { data: s, error: sErr } = await supabase
        .from("posts_sections")
        .select("*")
        .eq("post_id", postId)
        .order("position", { ascending: true });
      if (sErr) return (setErr(sErr.message), setLoading(false));

      const { data: imgs, error: iErr } = await supabase
        .from("post_images")
        .select("*")
        .eq("post_id", postId)
        .order("position", { ascending: true });
      if (iErr) return (setErr(iErr.message), setLoading(false));

      const { data: groups, error: gErr } = await supabase
        .from("resource_groups")
        .select("*")
        .eq("post_id", postId)
        .order("position", { ascending: true });
      if (gErr) return (setErr(gErr.message), setLoading(false));

      // images by kind
      const inl = (imgs || []).filter((x) => x.kind === "inline");
      const cen = (imgs || []).filter((x) => x.kind === "center");
      const gal = (imgs || []).filter((x) => x.kind === "gallery");

      setPost(p);
      setSections(Array.isArray(s) ? s : []);
      setActiveSectionId((s || [])[0]?.id || null);

      setInlineImages(inl);
      setCenterImages(cen);
      setGalleryImages(gal);

      setResourceGroups(groups || []);
      setActiveGroupId((groups || [])[0]?.id || null);

      setLoading(false);
    })();
  }, [postId]);

  // ---------- load links for active resource group ----------
  useEffect(() => {
    if (!activeGroupId) {
      setActiveGroupLinks([]);
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from("resource_links")
        .select("*")
        .eq("group_id", activeGroupId)
        .order("position", { ascending: true });

      if (error) {
        setErr(error.message);
        return;
      }

      const links = data || [];
      setActiveGroupLinks(links);

      // Load drafts if we have them; otherwise build from DB
      const draft = groupDrafts[activeGroupId];
      if (draft) {
        setNewGroupName(draft.name ?? "");
        setLinkPaste(draft.paste ?? "");
      } else {
        const g = (resourceGroups || []).find((x) => x.id === activeGroupId);
        setNewGroupName(g?.name || "");
        setLinkPaste(linksToPasteText(links));
      }
    })();
  }, [activeGroupId, resourceGroups]); // groupDrafts intentionally NOT here (avoid loops)

  // ---------- async wrapper for Tiptap image uploads (fixed) ----------
  // must be defined inside component so `postId` is in scope and can use await
  async function uploadImageFileWrapped(file) {
    if (!postId) throw new Error("postId missing");
    const storage_path = await uploadImageFile({
      postId,
      kind: "inline",
      file,
    });
    return publicUrl(storage_path);
  }

  // ---------- autosave meta ----------
  const saveMeta = async (patch) => {
    if (!postId) return;
    setSaving(true);
    const { error } = await supabase
      .from("posts")
      .update(patch)
      .eq("id", postId);
    setSaving(false);
    if (error) setErr(error.message);
    else setErr("");
  };
  const saveMetaDebounced = useMemo(() => debounce(saveMeta, 600), [postId]);

  // ---------- publish / unpublish / archive ----------
  const publishPost = async () => {
    if (!postId) return;
    if (!confirm("Publish this post now?")) return;
    setSaving(true);
    const published_at = new Date().toISOString();
    const { error } = await supabase
      .from("posts")
      .update({ status: "published", is_published: true, published_at })
      .eq("id", postId);
    setSaving(false);
    if (error) return setErr(error.message);
    setPost((p) => ({
      ...p,
      status: "published",
      is_published: true,
      published_at,
    }));
  };

  const unpublishToDraft = async () => {
    if (!postId) return;
    setSaving(true);
    const { error } = await supabase
      .from("posts")
      .update({ status: "draft", is_published: false })
      .eq("id", postId);
    setSaving(false);
    if (error) return setErr(error.message);
    setPost((p) => ({ ...p, status: "draft", is_published: false }));
  };

  const archivePost = async () => {
    if (!postId) return;
    if (!confirm("Archive this post? It will be removed from public listings."))
      return;
    setSaving(true);
    const { error } = await supabase
      .from("posts")
      .update({ status: "archived", is_published: false })
      .eq("id", postId);
    setSaving(false);
    if (error) return setErr(error.message);
    // redirect to admin posts list
    router.push("/admin/posts");
  };

  // ---------- autosave section ----------
  const saveSection = async (sectionId, patch) => {
    setSaving(true);
    const { error } = await supabase
      .from("posts_sections")
      .update(patch)
      .eq("id", sectionId);
    setSaving(false);
    if (error) setErr(error.message);
    else setErr("");
  };
  const saveSectionDebounced = useMemo(() => debounce(saveSection, 650), []);

  // ---------- section helpers ----------
  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId),
    [sections, activeSectionId]
  );

  const updateSectionLocal = (id, patch) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const addSectionAfter = async (afterId) => {
    const after = sections.find((s) => s.id === afterId);
    const newPos = (after?.position || sections.length) + 1;

    // shift positions after
    const tail = sections.filter((s) => s.position >= newPos);
    for (const t of tail) {
      await supabase
        .from("posts_sections")
        .update({ position: t.position + 1 })
        .eq("id", t.id);
    }

    const { data, error } = await supabase
      .from("posts_sections")
      .insert({
        post_id: postId,
        position: newPos,
        heading: "",
        body: "",
      })
      .select("*")
      .single();

    if (error) return setErr(error.message);

    // reload sections (simple + safe)
    const { data: s } = await supabase
      .from("posts_sections")
      .select("*")
      .eq("post_id", postId)
      .order("position", { ascending: true });

    setSections(s);
    setActiveSectionId(data.id);
  };

  const deleteSection = async (sectionId) => {
    openConfirm({
      title: "Delete section?",
      message: "This will permanently delete the section and its content.",
      dangerText: "Delete Section",
      onConfirm: async () => {
        closeConfirm();

        const { error } = await supabase
          .from("posts_sections")
          .delete()
          .eq("id", sectionId);

        if (error) return setErr(error.message);

        const { data: s } = await supabase
          .from("posts_sections")
          .select("*")
          .eq("post_id", postId)
          .order("position", { ascending: true });

        setSections(s || []);
        setActiveSectionId((s || [])[0]?.id || null);
      },
    });
  };

  const addLinkGroup = async () => {
    const name = (newGroupName || "").trim();
    if (!name) return;

    const nextPos = ((resourceGroups || []).at(-1)?.position || 0) + 1;

    setSaving(true);
    const { data, error } = await supabase
      .from("resource_groups")
      .insert({ post_id: postId, name, position: nextPos })
      .select("*")
      .single();
    setSaving(false);

    if (error) return setErr(error.message);

    setResourceGroups((p) => [...(p || []), data]);
    setActiveGroupId(data.id);
    setNewGroupName("");
  };

  const parseLinksPaste = (text) => {
    // Format: first non-empty line = label; optional URL in same line or next line
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    // If user pasted: header line + many items (no URLs)
    const items = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // if line looks like a URL by itself, attach to previous
      const isUrl = /^https?:\/\/\S+/i.test(line);

      if (isUrl && items.length) {
        items[items.length - 1].url = line;
        continue;
      }

      // try label + url in one line
      const m = line.match(/(https?:\/\/\S+)/i);
      if (m) {
        const url = m[1];
        const label = line
          .replace(url, "")
          .trim()
          .replace(/[—-]\s*$/, "")
          .trim();
        items.push({ label: label || url, url });
      } else {
        items.push({ label: line, url: null });
      }
    }
    return items;
  };

  const addLinksToActiveGroup = async () => {
    if (!activeGroupId)
      return setErr("Select a resource group on the left first.");

    const items = parseLinksPaste(linkPaste);

    const cleaned = items
      .map((x) => ({
        label: (x.label || "").trim(),
        url: (x.url || "").trim(),
      }))
      .filter((x) => x.url);

    if (!cleaned.length)
      return setErr("No valid URLs found in the content box.");

    const nextPos = (activeGroupLinks.at(-1)?.position || 0) + 1;
    const payload = cleaned.map((x, idx) => ({
      group_id: activeGroupId,
      position: nextPos + idx,
      label: x.label || x.url,
      url: x.url,
    }));

    setSaving(true);
    const { data, error } = await supabase
      .from("resource_links")
      .insert(payload)
      .select("*");
    setSaving(false);

    if (error) return setErr(error.message);

    setActiveGroupLinks((p) => [...(p || []), ...(data || [])]);
    setErr("");

    // update the draft snapshot so switching groups won't revert
    setGroupDrafts((p) => ({
      ...p,
      [activeGroupId]: { name: newGroupName, paste: linkPaste },
    }));
  };

  function linksToPasteText(links) {
    return (links || [])
      .map((l) => `${l.label || l.url}\n${l.url}`)
      .join("\n\n")
      .trim();
  }
  const saveGroupAndLinks = async () => {
    setErr("");

    const name = (newGroupName || "").trim();
    if (!name) return setErr("Group header is required.");

    // parse links from textarea
    const items = parseLinksPaste(linkPaste);
    const cleaned = items
      .map((x) => ({
        label: (x.label || "").trim(),
        url: (x.url || "").trim(),
      }))
      .filter((x) => x.url);

    setSaving(true);

    let groupId = activeGroupId;

    // 1) If new group: create it
    if (!groupId) {
      const nextPos = ((resourceGroups || []).at(-1)?.position || 0) + 1;

      const { data: gData, error: gErr } = await supabase
        .from("resource_groups")
        .insert({ post_id: postId, name, position: nextPos })
        .select("*")
        .single();

      if (gErr) {
        setSaving(false);
        return setErr(gErr.message);
      }

      groupId = gData.id;
      setResourceGroups((p) => [...(p || []), gData]);
      setActiveGroupId(groupId);
    } else {
      // 2) Existing group: update header name
      const { error: upErr } = await supabase
        .from("resource_groups")
        .update({ name })
        .eq("id", groupId);

      if (upErr) {
        setSaving(false);
        return setErr(upErr.message);
      }

      // update local list so left reflects renamed group immediately
      setResourceGroups((p) =>
        (p || []).map((g) => (g.id === groupId ? { ...g, name } : g))
      );
    }

    // 3) Replace links (so edits/removals work)
    const { error: delErr } = await supabase
      .from("resource_links")
      .delete()
      .eq("group_id", groupId);

    if (delErr) {
      setSaving(false);
      return setErr(delErr.message);
    }

    let inserted = [];
    if (cleaned.length) {
      const payload = cleaned.map((x, idx) => ({
        group_id: groupId,
        position: idx + 1,
        label: x.label || x.url,
        url: x.url,
      }));

      const { data: lData, error: insErr } = await supabase
        .from("resource_links")
        .insert(payload)
        .select("*");

      if (insErr) {
        setSaving(false);
        return setErr(insErr.message);
      }

      inserted = lData || [];
    }

    setActiveGroupLinks(inserted);

    // keep drafts synced too
    setGroupDrafts((p) => ({
      ...p,
      [groupId]: { name, paste: linkPaste },
    }));

    setSaving(false);
  };

  const deleteActiveGroup = async () => {
    if (!activeGroupId) return;

    const g = (resourceGroups || []).find((x) => x.id === activeGroupId);

    openConfirm({
      title: "Delete resource group?",
      message: `This will permanently delete "${g?.name || "Untitled"}" and ALL its links.`,
      dangerText: "Delete Group",
      onConfirm: async () => {
        closeConfirm();

        setSaving(true);

        const { error: lErr } = await supabase
          .from("resource_links")
          .delete()
          .eq("group_id", activeGroupId);

        if (lErr) {
          setSaving(false);
          return setErr(lErr.message);
        }

        const { error: gErr } = await supabase
          .from("resource_groups")
          .delete()
          .eq("id", activeGroupId);

        setSaving(false);
        if (gErr) return setErr(gErr.message);

        setResourceGroups((p) =>
          (p || []).filter((x) => x.id !== activeGroupId)
        );
        setActiveGroupLinks([]);
        setGroupDrafts((p) => {
          const copy = { ...p };
          delete copy[activeGroupId];
          return copy;
        });

        const remaining = (resourceGroups || []).filter(
          (x) => x.id !== activeGroupId
        );
        setActiveGroupId(remaining[0]?.id || null);
        setErr("");
      },
    });
  };

  // ---------- image helpers ----------
  const replaceImage = async ({ imageRow, kind, file }) => {
    try {
      setErr("");
      const storage_path = await uploadImageFile({ postId, kind, file });

      const { error } = await supabase
        .from("post_images")
        .update({ storage_path })
        .eq("id", imageRow.id);

      if (error) throw error;

      // update local
      const patcher = (row) =>
        row.id === imageRow.id ? { ...row, storage_path } : row;
      if (kind === "inline") setInlineImages((p) => p.map(patcher));
      if (kind === "gallery") setGalleryImages((p) => p.map(patcher));
      if (kind === "center") setCenterImages((p) => p.map(patcher));
    } catch (e) {
      setErr(e?.message || "Upload failed");
    }
  };

  const addImage = async ({ kind, file }) => {
    try {
      setErr("");
      const storage_path = await uploadImageFile({ postId, kind, file });

      const list = kind === "inline" ? inlineImages : galleryImages;
      const nextPos = (list.at(-1)?.position || 0) + 1;

      const { data, error } = await supabase
        .from("post_images")
        .insert({
          post_id: postId,
          kind,
          position: nextPos,
          storage_path,
          alt_text: "",
          caption: "",
        })
        .select("*")
        .single();

      if (error) throw error;

      if (kind === "inline") setInlineImages((p) => [...p, data]);
      if (kind === "gallery") setGalleryImages((p) => [...p, data]);
      if (kind === "center") setCenterImages((p) => [...p, data]);
    } catch (e) {
      setErr(e?.message || "Upload failed");
    }
  };

  const deleteImage = async ({ kind, id }) => {
    openConfirm({
      title: "Delete image?",
      message: "This will permanently remove this image.",
      dangerText: "Delete Image",
      onConfirm: async () => {
        closeConfirm();

        const { error } = await supabase
          .from("post_images")
          .delete()
          .eq("id", id);
        if (error) return setErr(error.message);

        if (kind === "inline")
          setInlineImages((p) => p.filter((x) => x.id !== id));
        if (kind === "center")
          setCenterImages((p) => p.filter((x) => x.id !== id));
        if (kind === "gallery")
          setGalleryImages((p) => p.filter((x) => x.id !== id));
      },
    });
  };

  // ---------- render ----------
  if (loading) {
    return (
      <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
        <AdminNavbar />
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: 24,
            opacity: 0.7,
          }}
        >
          Loading…
        </div>
      </div>
  
);
  }

  if (!post) {
    return (
      <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
        <AdminNavbar />
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: 24,
            color: "#d62827",
            fontWeight: 900,
          }}
        >
          Post not found.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>Editorial</div>
            <div style={{ opacity: 0.7, marginTop: 4, fontWeight: 800 }}>
              {saving ? (
                <span style={{ color: "#d62827" }}>Saving…</span>
              ) : (
                "Saved"
              )}
            </div>

            {err && (
              <div style={{ color: "#d62827", fontWeight: 900, marginTop: 8 }}>
                {err}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button
              className="admin-top-action"
              onClick={() => router.push(`/admin/posts/${postId}/preview`)}
            >
              Slug View
            </button>

            {post.status !== "published" ? (
              <button className="admin-top-action" onClick={publishPost}>
                Publish
              </button>
            ) : (
              <button className="admin-top-action" onClick={unpublishToDraft}>
                Unpublish
              </button>
            )}

            <button className="admin-top-action" onClick={archivePost}>
              Archive
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.15fr",
            gap: 22,
            alignItems: "start",
          }}
        >
          {/* LEFT: meta + sections list */}
          <div style={{ display: "grid", gap: 16 }}>
            <Card title="Post Meta">
              <Field label="Title">
                <input
                  value={post.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    setPost((p) => ({ ...p, title }));
                    saveMetaDebounced({ title });
                  }}
                  style={inputStyle()}
                />
              </Field>

              <Field label="Slug">
                <input
                  value={post.slug || ""}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setPost((p) => ({ ...p, slug }));
                    saveMetaDebounced({ slug });
                  }}
                  style={inputStyle()}
                />
              </Field>

              <Field label="Excerpt">
                <textarea
                  value={post.excerpt || ""}
                  onChange={(e) => {
                    const excerpt = e.target.value;
                    setPost((p) => ({ ...p, excerpt }));
                    saveMetaDebounced({ excerpt });
                  }}
                  rows={3}
                  style={textareaStyle()}
                />
              </Field>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="Status">
                  <select
                    value={post.status || "draft"}
                    onChange={(e) => {
                      const status = e.target.value;
                      setPost((p) => ({ ...p, status }));
                      // ensure is_published synced
                      saveMetaDebounced({
                        status,
                        is_published: status === "published",
                        published_at:
                          status === "published"
                            ? new Date().toISOString()
                            : null,
                      });
                    }}
                    style={inputStyle()}
                  >
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                  </select>
                </Field>

                <Field label="Volume">
                  <input
                    value={post.volume || ""}
                    onChange={(e) => {
                      const volume = e.target.value;
                      setPost((p) => ({ ...p, volume }));
                      saveMetaDebounced({ volume });
                    }}
                    style={inputStyle()}
                  />
                </Field>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="Author">
                  <input
                    value={post.author || ""}
                    onChange={(e) => {
                      const author = e.target.value;
                      setPost((p) => ({ ...p, author }));
                      saveMetaDebounced({ author });
                    }}
                    style={inputStyle()}
                  />
                </Field>

                <Field label="Date">
                  <input
                    type="date"
                    value={
                      post.date
                        ? new Date(post.date).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={(e) => {
                      const iso = e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null;
                      setPost((p) => ({ ...p, date: iso }));
                      saveMetaDebounced({ date: iso });
                    }}
                    style={inputStyle()}
                  />
                </Field>
              </div>

              <Field label="Banner (click to replace)">
                <label style={{ display: "block", cursor: "pointer" }}>
                  <img
                    src={post.banner_url || "/assets/images/space.jpg"}
                    alt="banner"
                    style={{
                      width: "100%",
                      height: 170,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const storage_path = await uploadImageFile({
                        postId,
                        kind: "banner",
                        file,
                      });
                      const url = publicUrl(storage_path);
                      setPost((p) => ({ ...p, banner_url: url }));
                      saveMetaDebounced({ banner_url: url });
                    }}
                  />
                </label>
              </Field>
            </Card>

            <Card title="Sections">
              <div style={{ display: "grid", gap: 10 }}>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveSectionId(s.id);
                      document
                        .querySelector("#admin-right-panel")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    style={{
                      ...listBtn(),
                      borderColor:
                        s.id === activeSectionId
                          ? "rgba(214,40,39,0.75)"
                          : "rgba(214,40,39,0.28)",
                      background:
                        s.id === activeSectionId
                          ? "rgba(214,40,39,0.10)"
                          : "rgba(0,0,0,0.12)",
                    }}
                  >
                    <span style={{ fontWeight: 900 }}>
                      {s.position}. {s.heading?.trim() || "Untitled"}
                    </span>
                    <span style={{ opacity: 0.65, fontWeight: 900 }}>
                      {s.id === activeSectionId ? "Editing" : "Edit"}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() =>
                    addSectionAfter(
                      activeSectionId || sections[sections.length - 1]?.id
                    )
                  }
                  style={btnRed()}
                >
                  + Add Section
                </button>
                {activeSectionId && (
                  <button
                    type="button"
                    onClick={() => deleteSection(activeSectionId)}
                    style={btnSoftRed()}
                  >
                    Delete Section
                  </button>
                )}
              </div>
            </Card>

            <Card title="Resources">
              <div style={{ display: "grid", gap: 10 }}>
                {resourceGroups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setActiveGroupId(g.id);
                      document
                        .querySelector("#admin-right-panel")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className={`admin-list-btn ${g.id === activeGroupId ? "is-active" : ""}`}
                  >
                    <span style={{ fontWeight: 900 }}>
                      {g.name || "Untitled Group"}
                    </span>
                    <span style={{ opacity: 0.65, fontWeight: 900 }}>
                      {g.id === activeGroupId ? "Viewing" : "Open"}
                    </span>
                  </button>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <button
                    type="button"
                    style={btnRed()}
                    onClick={() => {
                      // NEW: blank the right editor so you can create a new group
                      setActiveGroupId(null);
                      setActiveGroupLinks([]);
                      setNewGroupName("");
                      setLinkPaste("");
                      setErr("");
                      document
                        .querySelector("#admin-right-panel")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                  >
                    New
                  </button>

                  <button
                    type="button"
                    style={btnSoftRed()}
                    onClick={deleteActiveGroup}
                    disabled={!activeGroupId}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: active section editor + images */}
          <div id="admin-right-panel" style={{ display: "grid", gap: 16 }}>
            <Card title="Section Editor (TipTap)">
              {!activeSection ? (
                <div style={{ opacity: 0.7 }}>No section selected.</div>
              ) : (
                <>
                  <Field label="Heading">
                    <input
                      value={activeSection.heading || ""}
                      onChange={(e) => {
                        const heading = e.target.value;
                        updateSectionLocal(activeSection.id, { heading });
                        saveSectionDebounced(activeSection.id, { heading });
                      }}
                      style={inputStyle()}
                    />
                  </Field>

                  <Field label="Body">
                    <TiptapEditor
                      key={activeSection.id}
                      value={activeSection.body || ""}
                      onChange={(html) => {
                        updateSectionLocal(activeSection.id, { body: html });
                        saveSectionDebounced(activeSection.id, {
                          body: html,
                        });
                      }}
                      onUploadImage={uploadImageFileWrapped}
                    />
                  </Field>
                </>
              )}
            </Card>
            <Card title="Resources & Links">
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Group Header">
                  <input
                    value={newGroupName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setNewGroupName(v);
                      if (activeGroupId) {
                        setGroupDrafts((p) => ({
                          ...p,
                          [activeGroupId]: { name: v, paste: linkPaste },
                        }));
                      }
                    }}
                    style={inputStyle()}
                    placeholder="Foundational Papers & Demos"
                  />
                </Field>

                <div
                  style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
                />

                <Field label="Links Content (paste)">
                  <textarea
                    value={linkPaste}
                    onChange={(e) => {
                      const v = e.target.value;
                      setLinkPaste(v);
                      if (activeGroupId) {
                        setGroupDrafts((p) => ({
                          ...p,
                          [activeGroupId]: { name: newGroupName, paste: v },
                        }));
                      }
                    }}
                    rows={10}
                    style={textareaStyle()}
                    placeholder={`Example:\nChurch et al. — Next-Generation...\nhttps://...\nGoldman et al. — ...\nhttps://...`}
                  />
                </Field>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    style={btnRed()}
                    onClick={saveGroupAndLinks}
                  >
                    Save Group
                  </button>

                  <button
                    type="button"
                    style={btnSoftRed()}
                    onClick={() => {
                      setLinkPaste("");
                      if (activeGroupId) {
                        setGroupDrafts((p) => ({
                          ...p,
                          [activeGroupId]: { name: newGroupName, paste: "" },
                        }));
                      }
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </Card>

            <Card title="Inline Images (click to replace)">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 900, opacity: 0.85 }}>
                  Used for floating images in-body
                </div>
                <label style={btnRed(true)}>
                  + Upload
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) addImage({ kind: "inline", file });
                    }}
                  />
                </label>
              </div>

              <ImageGrid
                rows={inlineImages}
                kind="inline"
                onReplace={replaceImage}
                onDelete={deleteImage}
              />
            </Card>

            <Card title="Gallery Images (click to replace)">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 900, opacity: 0.85 }}>
                  Used for the carousel/gallery section
                </div>
                <label style={btnRed(true)}>
                  + Upload
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) addImage({ kind: "gallery", file });
                    }}
                  />
                </label>
              </div>

              <ImageGrid
                rows={galleryImages}
                kind="gallery"
                onReplace={replaceImage}
                onDelete={deleteImage}
              />
            </Card>

            <Card title="Centered Images (click to replace)">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 900, opacity: 0.85 }}>
                  Used for large centered images in-body
                </div>
                <label style={btnRed(true)}>
                  + Upload
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) addImage({ kind: "center", file });
                    }}
                  />
                </label>
              </div>

              <ImageGrid
                rows={centerImages}
                kind="center"
                onReplace={replaceImage}
                onDelete={deleteImage}
              />
            </Card>
          </div>
        </div>
      </div>
    
    {confirmOpen && (
  <div
    onClick={closeConfirm}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "grid",
      placeItems: "center",
      zIndex: 9999,
      padding: 16,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "min(520px, 94vw)",
        background: "var(--c-bg-primary)",
        borderRadius: 14,
        padding: 18,
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        border: "1px solid rgba(214,40,39,0.25)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
        {confirmTitle}
      </div>

      <div style={{ opacity: 0.8, fontWeight: 700, lineHeight: 1.4 }}>
        {confirmMessage}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 16,
        }}
      >
        <button type="button" style={btnSoftRed()} onClick={closeConfirm}>
          Cancel
        </button>

        <button
          type="button"
          style={btnRed()}
          onClick={async () => {
            if (typeof confirmAction === "function") await confirmAction();
          }}
        >
          {confirmDangerText}
        </button>
      </div>
    </div>
  </div>
)}

    
    </div>
  );
}

// ---------- small UI ----------
function Card({ title, children }) {
  return (
    <div
      style={{
        background: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 8, opacity: 0.85 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function ImageGrid({ rows, kind, onReplace, onDelete }) {
  if (!rows?.length) return <div style={{ opacity: 0.7 }}>No images.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {rows.map((r) => {
        const url = publicUrl(r.storage_path) || "/assets/images/space.jpg";
        return (
          <div key={r.id} style={{ position: "relative" }}>
            <label style={{ display: "block", cursor: "pointer" }}>
              <img
                src={url}
                alt={r.alt_text || ""}
                style={{
                  width: "100%",
                  height: 170,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onReplace({ imageRow: r, kind, file });
                }}
              />
            </label>

            <button
              type="button"
              onClick={() => onDelete({ kind, id: r.id })}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "rgba(214,40,39,0.92)",
                color: "white",
                border: "none",
                borderRadius: 999,
                width: 34,
                height: 34,
                fontWeight: 900,
                cursor: "pointer",
              }}
              aria-label="Remove"
            >
              ×
            </button>
            
          </div>
        );
      })}
      
    </div>
    
  );
}


// ---------- styles ----------
function inputStyle() {
  return {
    width: "100%",
    borderRadius: 10,
    padding: 12,
    border: "1px solid rgba(214,40,39,0.45)",
    background: "rgba(0,0,0,0.12)",
    color: "var(--c-text)",
    outline: "none",
    fontFamily: "inherit",
  };
}
function textareaStyle() {
  return {
    width: "100%",
    borderRadius: 10,
    padding: 12,
    border: "1px solid rgba(214,40,39,0.45)",
    background: "rgba(0,0,0,0.12)",
    color: "var(--c-text)",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  };
}
function btnRed(asLabel = false) {
  const style = {
    background: "#d62827",
    color: "white",
    padding: "10px 12px",
    borderRadius: 10,
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  return asLabel ? { ...style, cursor: "pointer" } : style;
}
function btnSoftRed() {
  return {
    background: "rgba(214,40,39,0.12)",
    color: "#d62827",
    padding: "10px 12px",
    borderRadius: 10,
    fontWeight: 900,
    border: "1px solid rgba(214,40,39,0.35)",
    cursor: "pointer",
  };
}
function listBtn() {
  return {
    width: "100%",
    textAlign: "left",
    padding: 12,
    borderRadius: 10,
    border: "1px solid rgba(214,40,39,0.28)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    color: "var(--c-text)",
  };
}
function topAction() {
  return {
    background: "transparent",
    border: "none",
    padding: 0,
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  };
}
