import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import { createClient } from "@supabase/supabase-js";

// ---- categories (keep your mapping) ----
const categoryToId = {
  "Current & In-Progress Work": "Current-&-In-Progress-Work",
  "Research & Analysis Projects": "research-&-analysis-projects",
  "Computer Science Projects": "computer-science-projects",
  "Employers & Work Experience": "employers-&-work-experience",
  "Education & Certifications": "education-&-certifications",
  "Featured / Spotlight Projects": "featured-spotlight-projects",
  "Speaking & Media": "speaking-&-media",
  Collaborations: "collaborations",
};

const toId = (name) =>
  categoryToId[name] || name.replace(/[^\w\- ]+/g, "").replace(/\s+/g, "-");

const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]*>/g, "") : "";

// --------------------
// Server-side helpers
// --------------------
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, anon, { auth: { persistSession: false } });
}

function resolveImageServer(supabase, bucket, src) {
  const s = (src || "").trim();
  if (!s) return "";
  // already usable
  if (s.startsWith("http://")) return s.replace("http://", "https://");
  return s;

  // assume storage path
  const { data } = supabase.storage.from(bucket).getPublicUrl(s);
  return data?.publicUrl || "";
}

// --------------------
// Client-side helpers
// --------------------
function resolveImageClient(src) {
  const s = (src || "").trim();
  if (!s) return "/assets/images/space.webp";

  // already usable
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/"))
    return s;

  // storage path -> public URL
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "media"; // <-- set this env or change to your bucket name

  // standard public storage URL form
  return `${url}/storage/v1/object/public/${bucket}/${s}`;
}

function getProjectExcerpt(p) {
  if (p?.excerpt) return p.excerpt;
  const firstBlockHtml = Array.isArray(p?.content) ? p.content[0]?.text : "";
  const stripped = stripHtml(firstBlockHtml);
  if (!stripped) return "";
  return stripped.length > 220 ? stripped.slice(0, 220) + "…" : stripped;
}

function getProjectImage(p) {
  // choose best available image field (already resolved server-side, but safe anyway)
  return (
    p?.archiveImage ||
    p?.banner ||
    (Array.isArray(p?.images) && p.images[0]) ||
    "/assets/images/space.webp"
  );
}

// ---------- Card ----------
function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(t);
  }, [index]);

  const imgSrc = resolveImageClient(getProjectImage(project));
  const desc = getProjectExcerpt(project);

  const THUMB_W = 256;
  const THUMB_H = 256;

  const isClickable = project.clickable !== false && !!project.slug;

  const cardBody = (
    <div
      className={`project-card ${visible ? "visible" : ""} ${hover ? "hovered" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-clickable={isClickable ? "true" : "false"}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        borderRadius: 12,
        transition: "box-shadow .2s ease, transform .2s ease, opacity .3s ease",
        boxShadow: hover
          ? "0 12px 24px rgba(0,0,0,.15)"
          : "0 6px 12px rgba(0,0,0,.08)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      <div
        className="project-content"
        style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
      >
        <div className="project-text" style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: "0 0 .35rem 0" }}>{project.title}</h3>
          {desc && <p style={{ margin: 0 }}>{desc}</p>}
        </div>

        <div
          className="project-thumb"
          style={{
            width: THUMB_W,
            height: THUMB_H,
            flex: "0 0 auto",
            overflow: "hidden",
            borderRadius: 12,
            background: "var(--c-bg-secondary, #eee)",
          }}
        >
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/space.webp";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );

  // Only wrap if clickable
  if (!isClickable) return cardBody;

  // External card
  if (project.external && project.external_url) {
    return (
      <a
        href={project.external_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {cardBody}
      </a>
    );
  }

  // Internal post card
  return (
    <Link
      href={`/Portfolio/${project.slug}`}
      aria-label={`Open ${project.title}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {cardBody}
    </Link>
  );
}

// ---------- Page ----------
export default function Portfolio({
  grouped = {},
  orderedCategories = [],
  groupMeta = {},
}) {
  const scrollRefs = useRef({});

  const scroll = (category, direction) => {
    const el = scrollRefs.current?.[category];
    if (!el) return;

    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

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
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
        <div className="base d-flex">
          <Navbar />

          <div className="PortfolioPage">
            <main className="projects-container">
              {orderedCategories.length === 0 ? (
                <div style={{ padding: 24, opacity: 0.8 }}>
                  No portfolio posts found. (If this is unexpected, your SELECT
                  policy or query filters may be too strict.)
                </div>
              ) : (
                orderedCategories.map((category) => {
                  const projects = Array.isArray(grouped?.[category])
                    ? grouped[category]
                    : [];
                  return (
                    <section
                      key={category}
                      id={toId(category)}
                      className="carousel-section"
                      style={{ scrollMarginTop: "80px" }}
                    >
                      <div className="carousel-header">
                        <h2>{category}</h2>
                        {projects.length > 2 && (
                          <div className="carousel-controls">
                            <button onClick={() => scroll(category, "left")}>
                              &lt;
                            </button>
                            <button onClick={() => scroll(category, "right")}>
                              &gt;
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        className="carousel-scroll-wrapper"
                        ref={(el) => {
                          scrollRefs.current[category] = el;
                        }}
                      >
                        <div className="projects-grid">
                          {projects.map((project, idx) => (
                            <div
                              className="project-wrapper"
                              key={project.slug || project.title || idx}
                              style={{ height: "100%" }}
                            >
                              <ProjectCard project={project} index={idx} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })
              )}
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

// -------------------------
// SSR: fetch + RESOLVE URLs
// -------------------------
export async function getServerSideProps() {
  const supabase = getServerSupabase();
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "media";

  // 1) Groups (drives the section order + guarantees headers exist)
  const { data: groups, error: gErr } = await supabase
    .from("portfolio_groups")
    .select("id, name, slug, position")
    .order("position", { ascending: true });

  if (gErr) {
    console.log("Portfolio SSR groups error:", gErr);
    return { props: { grouped: {}, orderedCategories: [], groupMeta: {} } };
  }

  const safeGroups = Array.isArray(groups) ? groups : [];
  const orderedCategories = safeGroups.map((g) => g.name);

  // meta about groups (non-clickable sections etc.)
  const groupMeta = {};
  for (const g of safeGroups) {
    const nonClickable =
      (g.slug || "").endsWith("-non-clickable") ||
      (g.name || "").toLowerCase().includes("non-clickable");

    groupMeta[g.name] = {
      id: g.id,
      name: g.name,
      slug: g.slug,
      position: g.position,
      nonClickable,
    };
  }

  // init grouped so empty sections still render
  const grouped = {};
  for (const name of orderedCategories) grouped[name] = [];

  // 2) Items (drives card order within each group)
  // Join posts by post_id (left join behavior via select nesting)
  const { data: items, error: iErr } = await supabase
    .from("portfolio_items")
    .select(
      `
      id,
      group_id,
      title,
      subtitle,
      excerpt,
      image_url,
      external_url,
      external,
      position,
      post_id,
      clickable,
      posts:post_id (
        id,
        title,
        slug,
        excerpt,
        banner_url,
        archive_image_url,
        status,
        type,
        volume,
        author,
        date
      )
    `
    )
    .order("position", { ascending: true });

  if (iErr) {
    console.log("Portfolio SSR items error:", iErr);
    return { props: { grouped, orderedCategories, groupMeta } };
  }

  const safeItems = Array.isArray(items) ? items : [];

  // map group_id -> group name
  const groupIdToName = {};
  for (const g of safeGroups) groupIdToName[g.id] = g.name;

  // normalize cards for UI
  const normalizeCard = (it) => {
    const post = it.posts || null;

    // image priority: item.image_url -> post.banner -> post.archive -> fallback
    const rawImage =
      (it.image_url || "").trim() ||
      (post?.banner_url || "").trim() ||
      (post?.archive_image_url || "").trim() ||
      "";

    const resolvedImage =
      resolveImageServer(supabase, BUCKET, rawImage) || rawImage || null;

    // excerpt priority: item.excerpt -> post.excerpt
    const cardExcerpt =
      (it.excerpt || "").trim() || (post?.excerpt || "").trim() || "";

    // title priority: item.title -> post.title
    const cardTitle = (it.title || "").trim() || (post?.title || "").trim();

    // slug: only if linked post exists
    const slug = post?.slug || "";

    // clickable:
    // - explicit item.clickable false means never clickable
    // - group non-clickable means never clickable
    // - external items are clickable if they have external_url
    // - internal items clickable if they have post slug
    const groupName = groupIdToName[it.group_id] || orderedCategories[0] || "";
    const groupNonClickable = !!groupMeta?.[groupName]?.nonClickable;

    const isClickable =
      it.clickable !== false &&
      !groupNonClickable &&
      ((it.external && !!it.external_url) || (!!slug && !it.external));

    return {
      id: it.id,
      title: cardTitle || "Untitled",
      excerpt: cardExcerpt,
      banner: resolvedImage,
      archiveImage: resolvedImage,
      images: [],

      // used by ProjectCard logic
      slug,
      clickable: isClickable,

      // if external, UI can choose to open external link (optional)
      external: !!it.external,
      external_url: it.external_url || "",

      // keep these for display if you want
      volume: post?.volume || null,
      author: post?.author || null,
      date: post?.date || null,
    };
  };

  // place each item into the correct group bucket
  for (const it of safeItems) {
    const groupName = groupIdToName[it.group_id];
    if (!groupName) continue; // unknown group id
    grouped[groupName].push(normalizeCard(it));
  }

  return { props: { grouped, orderedCategories, groupMeta } };
}
