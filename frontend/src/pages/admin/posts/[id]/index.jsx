// src/pages/admin/posts/[id].jsx
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "../../../../components/Admin/AdminNavbar.jsx";
import TiptapEditor from "../../../../components/Admin/TiptapEditor.jsx";
import {
  supabase,
  BUCKET,
  storagePathToPublicUrl,
} from "../../../../lib/supabase/client";

// ---------- utilities ----------
const safeArr = (v) => (Array.isArray(v) ? v : []);
const debounce = (fn, ms = 700) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

const isHttpUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);

function publicUrl(storage_path) {
  return storagePathToPublicUrl(storage_path);
}

async function getRenderableImageUrl(storageOrUrl, expiresIn = 60 * 60) {
  if (!storageOrUrl) return "";
  if (isHttpUrl(storageOrUrl)) return storageOrUrl;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storageOrUrl, expiresIn);

  if (error) {
    console.error("Signed URL error:", error);
    return "";
  }

  return data?.signedUrl || "";
}

async function uploadImageFile({ postId, kind, file }) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const name = `${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const storage_path = `posts/${postId}/${kind}/${name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storage_path, file, { upsert: true });

  if (error) throw error;
  return storage_path;
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPostEditor() {
  const router = useRouter();
  const { id: postId } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // post meta
  const [post, setPost] = useState(null);

  const resolvedImages = useMemo(() => {
    if (!post) return [];
    const rows = post.post_images || [];
    return (rows || []).map(
      (r) => storagePathToPublicUrl(r.storage_path) || r.storage_path
    );
  }, [post]);

  // sections
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);

  // images
  const [inlineImages, setInlineImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [centerImages, setCenterImages] = useState([]);

  const [bannerResolvedUrl, setBannerResolvedUrl] = useState("");
  const [inlineResolvedUrls, setInlineResolvedUrls] = useState({});
  const [galleryResolvedUrls, setGalleryResolvedUrls] = useState({});
  const [centerResolvedUrls, setCenterResolvedUrls] = useState({});

  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imagePickerKind, setImagePickerKind] = useState(null);
  const [bannerPickerOpen, setBannerPickerOpen] = useState(false);

  const inlineFileInputRef = React.useRef(null);
  const galleryFileInputRef = React.useRef(null);
  const centerFileInputRef = React.useRef(null);
  const bannerFileInputRef = React.useRef(null);

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

  const [bodyExpanded, setBodyExpanded] = useState(false);

  const [bannerLocalPreview, setBannerLocalPreview] = useState("");
  const activeSectionInlineImages = useMemo(() => {
    return inlineImages
      .filter((img) => img.section_id === activeSectionId)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  }, [inlineImages, activeSectionId]);

  const activeSectionCenterImages = useMemo(() => {
    return centerImages
      .filter((img) => img.section_id === activeSectionId)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  }, [centerImages, activeSectionId]);

  const activeSectionImageRefs = useMemo(() => {
    return [...activeSectionInlineImages, ...activeSectionCenterImages].sort(
      (a, b) => (a.position || 0) - (b.position || 0)
    );
  }, [activeSectionInlineImages, activeSectionCenterImages]);
  const addSectionImage = async ({ kind, file, sectionId }) => {
    if (!sectionId) {
      setErr("Select a section first.");
      return;
    }

    try {
      setErr("");
      setSaving(true);

      const storage_path = await uploadImageFile({ postId, kind, file });

      const sectionRows = [...inlineImages, ...centerImages].filter(
        (img) => img.section_id === sectionId && img.kind === kind
      );

      const nextPos =
        sectionRows.reduce((m, r) => Math.max(m, Number(r?.position || 0)), 0) +
        1;

      const { data, error } = await supabase
        .from("post_images")
        .insert({
          post_id: postId,
          section_id: sectionId,
          kind,
          position: nextPos,
          storage_path,
          alt_text: "",
          caption: "",
          show_in_gallery: true,
        })
        .select("*")
        .single();

      if (error) throw error;

      if (kind === "inline") {
        setInlineImages((prev) => [...prev, data]);
      } else if (kind === "center") {
        setCenterImages((prev) => [...prev, data]);
      }
    } catch (e) {
      setErr(e?.message || "Image upload failed");
    } finally {
      setSaving(false);
    }
  };

  const hasStoragePath = (row) => !!String(row?.storage_path || "").trim();
  const updateImageGalleryFlag = async (imageId, checked, kind) => {
    try {
      setErr("");
      const { data, error } = await supabase
        .from("post_images")
        .update({ show_in_gallery: checked })
        .eq("id", imageId)
        .select("*")
        .single();

      if (error) throw error;

      if (kind === "inline") {
        setInlineImages((prev) =>
          prev.map((img) => (img.id === imageId ? data : img))
        );
      } else if (kind === "center") {
        setCenterImages((prev) =>
          prev.map((img) => (img.id === imageId ? data : img))
        );
      } else if (kind === "gallery") {
        setGalleryImages((prev) =>
          prev.map((img) => (img.id === imageId ? data : img))
        );
      }
    } catch (e) {
      setErr(e?.message || "Failed to update gallery setting");
    }
  };

  const moveSectionImage = async ({ imageRow, kind, direction }) => {
    const list =
      kind === "inline"
        ? inlineImages
        : kind === "center"
          ? centerImages
          : galleryImages;

    const sectionList =
      kind === "gallery"
        ? [...list].sort((a, b) => (a.position || 0) - (b.position || 0))
        : list
            .filter((img) => img.section_id === imageRow.section_id)
            .sort((a, b) => (a.position || 0) - (b.position || 0));

    const idx = sectionList.findIndex((img) => img.id === imageRow.id);
    if (idx === -1) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sectionList.length) return;

    const current = sectionList[idx];
    const target = sectionList[swapIdx];

    try {
      setErr("");
      setSaving(true);

      const currentPos = current.position || 0;
      const targetPos = target.position || 0;

      const { error: e1 } = await supabase
        .from("post_images")
        .update({ position: -999999 })
        .eq("id", current.id);

      if (e1) throw e1;

      const { error: e2 } = await supabase
        .from("post_images")
        .update({ position: currentPos })
        .eq("id", target.id);

      if (e2) throw e2;

      const { error: e3 } = await supabase
        .from("post_images")
        .update({ position: targetPos })
        .eq("id", current.id);

      if (e3) throw e3;

      const swapLocal = (rows) =>
        rows.map((img) => {
          if (img.id === current.id) return { ...img, position: targetPos };
          if (img.id === target.id) return { ...img, position: currentPos };
          return img;
        });

      if (kind === "inline") setInlineImages((prev) => swapLocal(prev));
      if (kind === "center") setCenterImages((prev) => swapLocal(prev));
      if (kind === "gallery") setGalleryImages((prev) => swapLocal(prev));
    } catch (e) {
      setErr(e?.message || "Failed to reorder image");
    } finally {
      setSaving(false);
    }
  };

  const bannerPreviewUrl =
    bannerLocalPreview || bannerResolvedUrl || "/assets/images/space.webp";

  const inlineUrls = inlineImages.map((r) =>
    storagePathToPublicUrl(r.storage_path)
  );

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

  const openImagePicker = (kind) => {
    setImagePickerKind(kind);
    setImagePickerOpen(true);
  };

  const closeImagePicker = () => {
    setImagePickerOpen(false);
    setImagePickerKind(null);
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

      const inl = (imgs || []).filter(
        (x) => x.kind === "inline" && hasStoragePath(x)
      );
      const cen = (imgs || []).filter(
        (x) => x.kind === "center" && hasStoragePath(x)
      );
      const gal = (imgs || []).filter(
        (x) => x.kind === "gallery" && hasStoragePath(x)
      );

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

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!post?.banner_url) {
        setBannerResolvedUrl("");
        return;
      }

      const url = await getRenderableImageUrl(post.banner_url);
      if (!cancelled) setBannerResolvedUrl(url);
    })();

    return () => {
      cancelled = true;
    };
  }, [post?.banner_url]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const resolveRows = async (rows) => {
        const validRows = (rows || []).filter(hasStoragePath);

        const pairs = await Promise.all(
          validRows.map(async (r) => {
            const url = await getRenderableImageUrl(r.storage_path);
            return [r.id, url];
          })
        );

        return Object.fromEntries(
          pairs.filter(([, url]) => !!String(url || "").trim())
        );
      };

      const [inlineMap, centerMap, galleryMap] = await Promise.all([
        resolveRows(inlineImages),
        resolveRows(centerImages),
        resolveRows(galleryImages),
      ]);

      if (cancelled) return;

      setInlineResolvedUrls(inlineMap);
      setCenterResolvedUrls(centerMap);
      setGalleryResolvedUrls(galleryMap);
    })();

    return () => {
      cancelled = true;
    };
  }, [inlineImages, centerImages, galleryImages]);

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
  }, [activeGroupId, resourceGroups]);

  // ---------- async wrapper for Tiptap image uploads ----------
  async function uploadImageFileWrapped(file) {
    if (!postId) throw new Error("postId missing");
    const storage_path = await uploadImageFile({
      postId,
      kind: "inline",
      file,
    });

    const signed = await getRenderableImageUrl(storage_path);
    return signed || publicUrl(storage_path);
  }
  const PORTFOLIO_CATEGORIES = [
    "Current & In-Progress Work",
    "Research & Analysis Projects",
    "Computer Science Projects",
    "Employers & Work Experience",
    "Education & Certifications",
    "Featured / Spotlight Projects",
    "Speaking & Media",
    "Collaborations",
  ];

  const BLOG_LANDING_CATEGORIES = [
    "All",
    "Geopolitics",
    "Cybersecurity",
    "Economic Intelligence",
    "Military & Defense",
    "Technology & Innovation",
    "Global Events",
  ];

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

    const nextType =
      post?.type ||
      (BLOG_LANDING_CATEGORIES.includes(post?.category) ? "mb" : null) ||
      (PORTFOLIO_CATEGORIES.includes(post?.category) ? "portfolio" : null);

    if (!nextType) {
      setErr("Select a valid category before publishing.");
      return;
    }

    setSaving(true);
    const published_at = new Date().toISOString();

    const { error } = await supabase
      .from("posts")
      .update({
        type: nextType,
        status: "published",
        is_published: true,
        published_at,
      })
      .eq("id", postId);

    setSaving(false);

    if (error) return setErr(error.message);

    setPost((p) => ({
      ...p,
      type: nextType,
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
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const items = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isUrl = /^https?:\/\/\S+/i.test(line);

      if (isUrl && items.length) {
        items[items.length - 1].url = line;
        continue;
      }

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

    const items = parseLinksPaste(linkPaste);
    const cleaned = items
      .map((x) => ({
        label: (x.label || "").trim(),
        url: (x.url || "").trim(),
      }))
      .filter((x) => x.url);

    setSaving(true);

    let groupId = activeGroupId;

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
      const { error: upErr } = await supabase
        .from("resource_groups")
        .update({ name })
        .eq("id", groupId);

      if (upErr) {
        setSaving(false);
        return setErr(upErr.message);
      }

      setResourceGroups((p) =>
        (p || []).map((g) => (g.id === groupId ? { ...g, name } : g))
      );
    }

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

      const all = [...inlineImages, ...galleryImages, ...centerImages];
      const maxPos = all.reduce(
        (m, r) => Math.max(m, Number(r?.position || 0)),
        0
      );
      const nextPos = maxPos + 1;

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

      try {
        setErr("");
        setSaving(true);

        const sourceList =
          kind === "inline"
            ? inlineImages
            : kind === "center"
              ? centerImages
              : galleryImages;

        const imageRow = sourceList.find((x) => x.id === id);
        if (!imageRow) throw new Error("Image record not found.");

        const storagePath = String(imageRow.storage_path || "").trim();

        if (storagePath) {
          const { error: storageErr } = await supabase.storage
            .from(BUCKET)
            .remove([storagePath]);

          if (storageErr) throw storageErr;
        }

        const { error: dbErr } = await supabase
          .from("post_images")
          .delete()
          .eq("id", id);

        if (dbErr) throw dbErr;

        if (kind === "inline") {
          setInlineImages((p) => p.filter((x) => x.id !== id));
        }

        if (kind === "center") {
          setCenterImages((p) => p.filter((x) => x.id !== id));
        }

        if (kind === "gallery") {
          setGalleryImages((p) => p.filter((x) => x.id !== id));
        }
      } catch (e) {
        setErr(e?.message || "Failed to delete image");
      } finally {
        setSaving(false);
      }
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

                    setPost((prev) => {
                      const prevTitle = prev.title || "";
                      const prevSlug = prev.slug || "";

                      const oldAutoSlug = slugify(prevTitle);
                      const nextAutoSlug = slugify(title);

                      const shouldAutoUpdateSlug =
                        !prevSlug || prevSlug === oldAutoSlug;

                      const next = {
                        ...prev,
                        title,
                        slug: shouldAutoUpdateSlug ? nextAutoSlug : prevSlug,
                      };

                      saveMetaDebounced({
                        title,
                        ...(shouldAutoUpdateSlug ? { slug: nextAutoSlug } : {}),
                      });

                      return next;
                    });
                  }}
                  style={inputStyle()}
                />
              </Field>

              <Field label="Slug">
                <input
                  value={post.slug || ""}
                  onChange={(e) => {
                    const slug = slugify(e.target.value);
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
                <Field label="Category">
                  <select
                    value={
                      post.category
                        ? post.type === "portfolio"
                          ? `portfolio:${post.category}`
                          : post.type === "mb"
                            ? `blog:${post.category}`
                            : post.category
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value;

                      if (!raw) {
                        setPost((p) => ({ ...p, category: "", type: null }));
                        saveMetaDebounced({ category: "", type: null });
                        return;
                      }

                      const [scope, ...rest] = raw.split(":");
                      const category = rest.join(":").trim();

                      const type =
                        scope === "blog"
                          ? "mb"
                          : scope === "portfolio"
                            ? "portfolio"
                            : null;

                      setPost((p) => ({
                        ...p,
                        category,
                        type,
                      }));

                      saveMetaDebounced({
                        category,
                        type,
                      });
                    }}
                    style={inputStyle()}
                  >
                    <option value="">Select a category</option>

                    <optgroup label="Portfolio">
                      {PORTFOLIO_CATEGORIES.map((category) => (
                        <option
                          key={`portfolio-${category}`}
                          value={`portfolio:${category}`}
                        >
                          {category}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Blog">
                      {BLOG_LANDING_CATEGORIES.map((category) => (
                        <option
                          key={`blog-${category}`}
                          value={`blog:${category}`}
                        >
                          {category}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    value={post.status || "draft"}
                    onChange={(e) => {
                      const status = e.target.value;

                      const inferredType =
                        post?.type ||
                        (BLOG_LANDING_CATEGORIES.includes(post?.category)
                          ? "mb"
                          : null) ||
                        (PORTFOLIO_CATEGORIES.includes(post?.category)
                          ? "portfolio"
                          : null);

                      const patch = {
                        status,
                        is_published: status === "published",
                        published_at:
                          status === "published"
                            ? new Date().toISOString()
                            : null,
                        ...(inferredType ? { type: inferredType } : {}),
                      };

                      setPost((p) => ({
                        ...p,
                        ...patch,
                      }));

                      saveMetaDebounced(patch);
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

              <Field label="Banner">
                <div style={{ display: "grid", gap: 10 }}>
                  <img
                    src={bannerPreviewUrl}
                    alt="banner"
                    style={{
                      width: "100%",
                      height: 170,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />

                  <button
                    type="button"
                    style={btnRed()}
                    onClick={() => setBannerPickerOpen(true)}
                  >
                    Change Banner
                  </button>
                </div>
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
                    className={`admin-list-btn ${
                      g.id === activeGroupId ? "is-active" : ""
                    }`}
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
                    <div
                      style={{
                        borderRadius: 12,
                        border: "1px solid rgba(214,40,39,0.28)",
                        overflow: "hidden",
                        background: "rgba(0,0,0,0.06)",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: bodyExpanded ? "none" : 520,
                          overflowY: bodyExpanded ? "visible" : "auto",
                          padding: 12,
                        }}
                      >
                        <TiptapEditor
                          key={activeSection.id}
                          value={activeSection.body || ""}
                          onChange={(html) => {
                            updateSectionLocal(activeSection.id, {
                              body: html,
                            });
                            saveSectionDebounced(activeSection.id, {
                              body: html,
                            });
                          }}
                          onUploadImage={uploadImageFileWrapped}
                        />
                      </div>
                    </div>
                  </Field>

                  <div style={{ marginTop: 14 }}>
                    <div
                      style={{
                        fontWeight: 900,
                        marginBottom: 8,
                        opacity: 0.82,
                      }}
                    >
                      Section image references
                    </div>

                    {!activeSectionId ? (
                      <div style={{ opacity: 0.7 }}>
                        Select a section first.
                      </div>
                    ) : activeSectionImageRefs.length === 0 ? (
                      <div style={{ opacity: 0.7 }}>
                        No images assigned to this section yet.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          overflowX: "auto",
                          paddingBottom: 4,
                        }}
                      >
                        {activeSectionImageRefs.map((img) => {
                          const src =
                            inlineResolvedUrls[img.id] ||
                            centerResolvedUrls[img.id] ||
                            "/assets/images/space.jpg";

                          return (
                            <div
                              key={img.id}
                              style={{
                                minWidth: 110,
                                width: 110,
                                borderRadius: 10,
                                overflow: "hidden",
                                border: "1px solid rgba(214,40,39,0.25)",
                                background: "rgba(0,0,0,0.06)",
                              }}
                            >
                              <img
                                src={src}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: 78,
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                              <div
                                style={{
                                  padding: "6px 8px",
                                  fontSize: 11,
                                  fontWeight: 800,
                                  opacity: 0.75,
                                  textTransform: "capitalize",
                                }}
                              >
                                {img.kind}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
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

            <Card title="Section Inline Images">
              {!activeSection ? (
                <div style={{ opacity: 0.7 }}>Select a section first.</div>
              ) : (
                <>
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
                      Left / right floating images for this section
                    </div>
                    <button
                      type="button"
                      style={btnRed()}
                      onClick={() => openImagePicker("inline")}
                    >
                      + Upload
                    </button>
                  </div>

                  {activeSectionInlineImages.length ? (
                    <SectionImageGrid
                      rows={activeSectionInlineImages}
                      kind="inline"
                      resolvedMap={inlineResolvedUrls}
                      onDelete={deleteImage}
                      onToggleGallery={updateImageGalleryFlag}
                      onMove={moveSectionImage}
                    />
                  ) : (
                    <div style={{ opacity: 0.7 }}>
                      No inline images assigned to this section.
                    </div>
                  )}
                </>
              )}
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
                <button
                  type="button"
                  style={btnRed()}
                  onClick={() => openImagePicker("gallery")}
                >
                  + Upload
                </button>
              </div>

              <ImageGrid
                rows={galleryImages}
                kind="gallery"
                onReplace={replaceImage}
                onDelete={deleteImage}
                resolvedMap={galleryResolvedUrls}
              />
            </Card>

            <Card title="Section Centered Images">
              {!activeSection ? (
                <div style={{ opacity: 0.7 }}>Select a section first.</div>
              ) : (
                <>
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
                      Large centered images for this section
                    </div>
                    <button
                      type="button"
                      style={btnRed()}
                      onClick={() => openImagePicker("center")}
                    >
                      + Upload
                    </button>
                  </div>

                  {activeSectionCenterImages.length ? (
                    <SectionImageGrid
                      rows={activeSectionCenterImages}
                      kind="center"
                      resolvedMap={centerResolvedUrls}
                      onDelete={deleteImage}
                      onToggleGallery={updateImageGalleryFlag}
                      onMove={moveSectionImage}
                    />
                  ) : (
                    <div style={{ opacity: 0.7 }}>
                      No centered images assigned to this section.
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={inlineFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) {
            addSectionImage({
              kind: "inline",
              file,
              sectionId: activeSectionId,
            });
          }
        }}
      />

      <input
        ref={galleryFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) addImage({ kind: "gallery", file });
        }}
      />

      <input
        ref={centerFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) {
            addSectionImage({
              kind: "center",
              file,
              sectionId: activeSectionId,
            });
          }
        }}
      />

      <input
        ref={bannerFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;

          const tmpUrl = URL.createObjectURL(file);
          setBannerLocalPreview(tmpUrl);

          try {
            setErr("");
            setSaving(true);

            const storage_path = await uploadImageFile({
              postId,
              kind: "banner",
              file,
            });

            const { error: upErr } = await supabase
              .from("posts")
              .update({ banner_url: storage_path })
              .eq("id", postId);

            if (upErr) throw upErr;

            setPost((p) => ({ ...p, banner_url: storage_path }));

            const signed = await getRenderableImageUrl(storage_path);
            URL.revokeObjectURL(tmpUrl);
            setBannerLocalPreview(signed || "");
          } catch (err) {
            setErr(err?.message || "Banner upload failed");
          } finally {
            setSaving(false);
          }
        }}
      />

      {/* Image picker modal */}
      {imagePickerOpen && (
        <div
          onClick={closeImagePicker}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 10000,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(460px, 94vw)",
              background: "var(--c-bg)",
              color: "var(--c-text)",
              borderRadius: 14,
              padding: 18,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              border: "1px solid rgba(214,40,39,0.25)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
              Add image
            </div>

            <div style={{ opacity: 0.8, fontWeight: 700, lineHeight: 1.4 }}>
              Choose how you want to add this image to the{" "}
              <span style={{ textTransform: "capitalize" }}>
                {imagePickerKind}
              </span>{" "}
              bucket.
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <button
                type="button"
                style={btnRed()}
                onClick={() => {
                  closeImagePicker();
                  if (imagePickerKind === "inline")
                    inlineFileInputRef.current?.click();
                  if (imagePickerKind === "gallery")
                    galleryFileInputRef.current?.click();
                  if (imagePickerKind === "center")
                    centerFileInputRef.current?.click();
                }}
              >
                Upload from device
              </button>

              <button
                type="button"
                style={btnSoftRed()}
                onClick={() => {
                  closeImagePicker();
                  setErr("Media library is not built yet.");
                }}
              >
                Choose from library
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <button
                type="button"
                style={btnSoftRed()}
                onClick={closeImagePicker}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner picker modal */}
      {bannerPickerOpen && (
        <div
          onClick={() => setBannerPickerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 10000,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            sstyle={{
              width: "min(460px, 94vw)",
              background: "var(--c-bg)",
              color: "var(--c-text)",
              borderRadius: 14,
              padding: 18,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              border: "1px solid rgba(214,40,39,0.25)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
              Change banner
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <button
                type="button"
                style={btnRed()}
                onClick={() => {
                  setBannerPickerOpen(false);
                  bannerFileInputRef.current?.click();
                }}
              >
                Upload from device
              </button>

              <button
                type="button"
                style={btnSoftRed()}
                onClick={() => {
                  setBannerPickerOpen(false);
                  setErr("Media library is not built yet.");
                }}
              >
                Choose from library
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <button
                type="button"
                style={btnSoftRed()}
                onClick={() => setBannerPickerOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
              width: "min(460px, 94vw)",
              background: "var(--c-bg)",
              color: "var(--c-text)",
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
                  if (typeof confirmAction === "function")
                    await confirmAction();
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

function SectionImageGrid({
  rows,
  kind,
  resolvedMap = {},
  onDelete,
  onToggleGallery,
  onMove,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      {rows.map((row, idx) => {
        const url = resolvedMap[row.id] || "/assets/images/space.jpg";

        return (
          <div
            key={row.id}
            style={{
              border: "1px solid rgba(214,40,39,0.25)",
              borderRadius: 12,
              overflow: "hidden",
              background: "rgba(0,0,0,0.04)",
            }}
          >
            <img
              src={url}
              alt={row.alt_text || ""}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                padding: 12,
                display: "grid",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 800, opacity: 0.8 }}>
                  {kind} #{idx + 1}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    style={btnSoftRed()}
                    onClick={() =>
                      onMove({ imageRow: row, kind, direction: "up" })
                    }
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    style={btnSoftRed()}
                    onClick={() =>
                      onMove({ imageRow: row, kind, direction: "down" })
                    }
                  >
                    ↓
                  </button>
                </div>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!row.show_in_gallery}
                  onChange={(e) =>
                    onToggleGallery(row.id, e.target.checked, kind)
                  }
                />
                Include in gallery
              </label>

              <button
                type="button"
                style={btnSoftRed()}
                onClick={() => onDelete({ kind, id: row.id })}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ImageGrid({ rows, kind, onReplace, onDelete, resolvedMap = {} }) {
  const validRows = (rows || []).filter(
    (r) => !!String(r?.storage_path || "").trim()
  );

  if (!validRows.length) return <div style={{ opacity: 0.7 }}>No images.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {validRows.map((r) => {
        const url = resolvedMap[r.id] || "/assets/images/space.jpg";
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
