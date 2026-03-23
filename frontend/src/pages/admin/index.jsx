// frontend/src/pages/admin/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import AdminNavbar from "../../components/Admin/AdminNavbar.jsx";
import { supabase } from "../../lib/supabase/client";

const FALLBACK_IMG = "/assets/images/space.webp";

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: "2.75rem",
        fontWeight: 800,
        marginBottom: 24,
        color: "var(--c-text-primary)",
        textTransform: "uppercase",
        letterSpacing: 1,
        borderLeft: "5px solid #d62827",
        paddingLeft: 16,
      }}
    >
      {children}
    </h2>
  );
}

function MetaRow({ left, right }) {
  return (
    <div
      className="body-l checkmarks c-text"
      style={{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 0,
        marginLeft: 0,
      }}
    >
      <small
        style={{
          fontSize: "0.9rem",
          color: "var(--c-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginLeft: 0,
        }}
      >
        {left}
      </small>

      <small
        style={{
          fontSize: "0.9rem",
          color: "var(--c-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            color: "#d62827",
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            transform: "translateY(2px)",
          }}
        >
          ♱
        </span>
      </small>
    </div>
  );
}

/**
 * Big card like your main AnimatedPostCard (image on top, content below)
 * but navigates to admin editorial route (you can adjust href).
 */
function DraftBigCard({ post }) {
  const href = post?.id ? `/admin/posts/${post.id}` : "/admin/posts/new";

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => (window.location.href = href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = href;
        }
      }}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        backgroundColor: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        width: "100%",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={post?.banner_url || FALLBACK_IMG}
        alt={post?.title || "Draft"}
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      />

      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h3
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            margin: "0 0 8px 0",
            color: "var(--c-text-primary)",
            lineHeight: 1.2,
          }}
        >
          {post?.title || "Start a new draft"}
        </h3>

        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.8,
            color: "var(--c-text-secondary)",
            marginBottom: 8,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post?.excerpt || "Click to open your editor and begin writing."}
        </p>

        <MetaRow
          left={post?.status ? `Status: ${post.status}` : "Draft"}
          right={
            post?.updated_at ? new Date(post.updated_at).toDateString() : "—"
          }
        />
      </div>
    </article>
  );
}

/**
 * Small card like your non-main AnimatedPostCard layout:
 * image left, content right.
 */
function SmallPostCard({ post, kind = "draft" }) {
  const isEmpty = !post;

  const href = isEmpty
    ? kind === "draft"
      ? "/admin/posts/new"
      : "/admin/posts"
    : `/admin/posts/${post.id}`;

  const title = isEmpty
    ? kind === "draft"
      ? "No second draft yet"
      : "No published posts yet"
    : post.title || "Untitled";

  const excerpt = isEmpty
    ? kind === "draft"
      ? "Create another draft to see it here."
      : "Publish a post to populate this slot."
    : post.excerpt ||
      (kind === "draft" ? "Open draft in editor." : "Open public post.");

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => (window.location.href = href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = href;
        }
      }}
      style={{
        opacity: 1,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        backgroundColor: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: 16,
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: 32,
        width: "100%",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
      }}
    >
      <img
        src={post?.banner_url || FALLBACK_IMG}
        alt={title}
        style={{
          width: "100%",
          maxHeight: 260,
          height: 260,
          objectFit: "cover",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          flexShrink: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 260,
          textAlign: "left",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              margin: "10px 0 12px 0",
              color: "var(--c-text-primary)",
              lineHeight: 1.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--c-text-secondary)",
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
        </div>

        <MetaRow
          left={
            isEmpty
              ? kind === "draft"
                ? "Draft"
                : "Published"
              : kind === "draft"
                ? `Status: ${post.status || "draft"}`
                : `Status: ${post.status || "published"}`
          }
          right={
            isEmpty
              ? "—"
              : post.updated_at || post.published_at
                ? new Date(post.updated_at || post.published_at).toDateString()
                : "—"
          }
        />
      </div>
    </article>
  );
}

function NotesCard({ notes }) {
  return (
    <section
      style={{
        maxWidth: 1000,
        margin: "60px auto 0 auto",
        padding: "40px 20px",
        border: "4px solid #b02621",
        borderRadius: 12,
        backgroundColor: "transparent",
        color: "var(--c-text)",
      }}
    >
      <h3
        style={{
          fontSize: "2.2rem",
          fontWeight: 900,
          textAlign: "center",
          marginBottom: 18,
        }}
      >
        Notes / To-Do
      </h3>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {!notes?.length ? (
          <div style={{ opacity: 0.8, textAlign: "center", lineHeight: 1.7 }}>
            No notes yet. Add your first note in{" "}
            <Link
              href="/admin/notes"
              style={{ color: "#b02621", textDecoration: "underline" }}
            >
              Notes
            </Link>
            .
          </div>
        ) : (
          <ul
            className="sub-resource-list"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 14,
            }}
          >
            {notes.map((n) => (
              <li
                key={n.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22px 1fr",
                  gap: 12,
                  alignItems: "start",
                  padding: "14px 14px",
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.10)",
                }}
              >
                {/* red star */}
                <span
                  aria-hidden="true"
                  style={{
                    color: "#d62827",
                    fontSize: 48,
                    fontWeight: 900,
                    lineHeight: 1,
                    transform: "translateY(2px)",
                  }}
                >
                  ♱
                </span>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.7,
                    color: "var(--c-text)",
                    fontWeight: 600,
                  }}
                >
                  {n.body}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: 22, textAlign: "center" }}>
          <Link
            href="/admin/notes"
            style={{
              backgroundColor: "#d62827",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "12px 24px",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              fontFamily: "inherit",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#b02621")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#d62827")
            }
          >
            Open Notes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AdminIndex() {
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Data buckets
  const [drafts, setDrafts] = useState([]); // ordered newest->oldest
  const [published, setPublished] = useState([]); // ordered newest->oldest
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let alive = true;

    async function boot() {
      setErr("");
      setLoading(true);

      // require session
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session?.user) {
        if (alive) router.replace("/user/login");
        return;
      }

      // require admin (db role first, env email fallback)
      const user = session.user;
      let role = "user";

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role) role = profile.role;
      else if (
        adminEmail &&
        (user.email || "").toLowerCase() === adminEmail.toLowerCase()
      )
        role = "admin";

      if (role !== "admin") {
        if (alive) router.replace("/MidnightBureau");
        return;
      }

      // load dashboard data
      const [{ data: d }, { data: p }, { data: n }] = await Promise.all([
        supabase
          .from("posts")
          .select("id,title,slug,excerpt,status,updated_at,banner_url")
          .eq("status", "draft")
          .order("updated_at", { ascending: false })
          .limit(6),
        supabase
          .from("posts")
          .select(
            "id,title,slug,excerpt,status,published_at,updated_at,banner_url"
          )
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(2),
        supabase
          .from("admin_notes")
          .select("id,body,updated_at")
          .order("updated_at", { ascending: false })
          .limit(8),
      ]);

      if (!alive) return;

      setDrafts(d ?? []);
      setPublished(p ?? []);
      setNotes(n ?? []);
      setLoading(false);
    }

    boot();
    return () => {
      alive = false;
    };
  }, [router, adminEmail]);

  const mostRecentDraft = drafts?.[0] ?? null;
  const secondDraft = drafts?.[1] ?? null;
  const published1 = published?.[0] ?? null;
  const published2 = published?.[1] ?? null;

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <MetaHead />
      <SvgHead />

      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2" />
        </div>
        <div id="js-dfp-tag-outofpage--2" />

        <div className="base d-flex" style={{ flexDirection: "column" }}>
          <AdminNavbar />

          {/* page wrapper */}
          <section className="c-bg" data-armstrong-id="wrapper">
            {/* red separator like MB */}
            <div
              style={{
                maxWidth: 1000,
                margin: "40px auto",
                borderTop: "4px solid #d62827",
              }}
            />

            <main
              style={{ maxWidth: 1400, margin: "40px auto", padding: "0 24px" }}
            >
              {loading ? (
                <div style={{ opacity: 0.8, padding: "20px 0" }}></div>
              ) : (
                <>
                  {/* Big left + 3 small right (MB layout clone) */}
                  <section
                    style={{
                      display: "flex",
                      gap: "48px",
                      marginBottom: 80,
                      alignItems: "stretch",
                    }}
                  >
                    {/* LEFT */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "2.75rem",
                          fontWeight: 800,
                          marginBottom: 24,
                          color: "var(--c-text-primary)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          borderLeft: "5px solid #d62827",
                          paddingLeft: 16,
                        }}
                      >
                        Current Draft
                      </h2>

                      <DraftBigCard post={mostRecentDraft} />
                    </div>

                    {/* RIGHT */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "2.75rem",
                          fontWeight: 800,
                          marginBottom: 24,
                          color: "var(--c-text-primary)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          borderLeft: "5px solid #d62827",
                          paddingLeft: 16,
                        }}
                      >
                        Queue
                      </h2>

                      {/* 1) second draft */}
                      <SmallPostCard post={secondDraft} kind="draft" />

                      {/* 2) published post #1 */}
                      <SmallPostCard post={published1} kind="published" />

                      {/* 3) published post #2 */}
                      <SmallPostCard post={published2} kind="published" />
                    </div>
                  </section>

                  <div
                    style={{
                      maxWidth: 1000,
                      margin: "80px auto 24px auto",
                      borderTop: "4px solid #d62827",
                    }}
                  />

                  {/* Notes */}
                  <NotesCard notes={notes} />
                </>
              )}
            </main>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
