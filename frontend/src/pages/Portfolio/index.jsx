import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import { createClient } from "@supabase/supabase-js";

// ---- categories ----
// Keep your existing mapping, but add the newer portfolio sections too.
const categoryToId = {
  "Current & In-Progress Work": "Current-&-In-Progress-Work",
  "Research & Analysis Projects": "research-&-analysis-projects",
  "Computer Science Projects": "computer-science-projects",
  "Intelligence & Computer Systems": "intelligence-computer-systems",
  "Analytical Writing & Publications": "analytical-writing-publications",
  "Skills & Technologies": "skills-technologies",
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

  return createClient(url, anon, {
    auth: { persistSession: false },
  });
}

function resolveImageServer(supabase, bucket, src) {
  let s = (src || "").trim();
  if (!s) return "";

  if (s.startsWith("http://")) return s.replace("http://", "https://");
  if (s.startsWith("https://")) return s;
  if (s.startsWith("/")) return s;

  // If DB accidentally stored "post-images/posts/...",
  // strip the bucket name so the final URL does not duplicate it.
  if (bucket && s.startsWith(`${bucket}/`)) {
    s = s.slice(bucket.length + 1);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(s);
  return data?.publicUrl || s;
}

// --------------------
// Client-side helpers
// --------------------
function resolveImageClient(src) {
  let s = (src || "").trim();
  if (!s) return "/assets/images/space.webp";

  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("/")
  ) {
    return s;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "post-images";

  if (bucket && s.startsWith(`${bucket}/`)) {
    s = s.slice(bucket.length + 1);
  }

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
  return (
    p?.cardImage ||
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
  const subtitle = (project?.subtitle || "").trim();

  const THUMB_W = 256;
  const THUMB_H = 256;

  const hasExternalLink = project.external && !!project.external_url;
  const hasInternalPostLink = !project.external && !!project.slug;

  const isClickable =
    project.clickable !== false && (hasExternalLink || hasInternalPostLink);

  const cardBody = (
    <div
      className={`project-card ${visible ? "visible" : ""} ${
        hover ? "hovered" : ""
      }`}
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

          {subtitle && (
            <p
              className="project-card-subtitle"
              style={{
                margin: "0 0 .45rem 0",
                opacity: 0.78,
                fontSize: "0.95rem",
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </p>
          )}

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
// Only wrap if clickable
if (!isClickable) return cardBody;

// External card or manually linked internal route
if (hasExternalLink) {
  return (
    <a
      href={project.external_url}
      target={project.external_url.startsWith("/") ? "_self" : "_blank"}
      rel={
        project.external_url.startsWith("/")
          ? undefined
          : "noopener noreferrer"
      }
      aria-label={`Open ${project.title}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {cardBody}
    </a>
  );
}

// Internal portfolio post card
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
                              key={
                                project.slug ||
                                project.id ||
                                project.title ||
                                idx
                              }
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
// SSR: fetch + resolve URLs
// -------------------------
export async function getServerSideProps() {
  const supabase = getServerSupabase();
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "post-images";

  // 1) Groups:
  // portfolio_groups controls section order and guarantees headers exist.
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

  // Meta about groups, including optional non-clickable sections.
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

  // Initialize grouped object so empty sections still render.
  const grouped = {};
  for (const name of orderedCategories) grouped[name] = [];

  // 2) Curated portfolio items:
  // portfolio_items controls manual cards, external links, custom ordering, etc.
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
        Subtitle,
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

  // 3) Standalone published portfolio posts:
  // These are real posts created through admin/editor.
  // They appear automatically even if no portfolio_items row links to them.
  const { data: standalonePosts, error: pErr } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      Subtitle,
      slug,
      excerpt,
      banner_url,
      archive_image_url,
      status,
      is_published,
      published_at,
      type,
      volume,
      author,
      date,
      category
    `
    )
    .eq("type", "portfolio")
    .eq("status", "published")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (pErr) {
    console.log("Portfolio SSR standalone posts error:", pErr);
  }

  // Map group_id -> group name.
  const groupIdToName = {};
  for (const g of safeGroups) groupIdToName[g.id] = g.name;

  // Track which post IDs are already represented by portfolio_items.
  // This prevents duplicates when a post has both:
  // - a posts row
  // - a curated portfolio_items card pointing to that same post_id
  const representedPostIds = new Set(
    safeItems.map((it) => it.post_id).filter(Boolean)
  );

  // Normalize portfolio_items into the card shape used by ProjectCard.
  const normalizeCard = (it) => {
    const post = it.posts || null;

    // Image priority:
    // item.image_url -> post.banner_url -> post.archive_image_url -> fallback
    const rawCardImage = (it.image_url || "").trim();

    const rawArchiveImage = (post?.archive_image_url || "").trim();
    const rawBannerImage = (post?.banner_url || "").trim();

    const resolvedCardImage =
      resolveImageServer(supabase, BUCKET, rawCardImage) ||
      rawCardImage ||
      null;

    const resolvedArchiveImage =
      resolveImageServer(supabase, BUCKET, rawArchiveImage) ||
      rawArchiveImage ||
      null;

    const resolvedBannerImage =
      resolveImageServer(supabase, BUCKET, rawBannerImage) ||
      rawBannerImage ||
      null;

    const resolvedImage =
      resolvedCardImage || resolvedArchiveImage || resolvedBannerImage || null;

    // Excerpt priority:
    // item.excerpt -> post.excerpt
    const cardExcerpt =
      (it.excerpt || "").trim() || (post?.excerpt || "").trim() || "";

    // Title priority:
    // item.title -> post.title
    const cardTitle = (it.title || "").trim() || (post?.title || "").trim();

    // Subtitle priority:
    // item.subtitle -> post.Subtitle
    const cardSubtitle =
      (it.subtitle || "").trim() ||
      (post?.subtitle || post?.Subtitle || "").trim() ||
      "";

    // Slug exists only if linked post exists.
    const slug = post?.slug || "";

    const groupName = groupIdToName[it.group_id] || orderedCategories[0] || "";
    const groupNonClickable = !!groupMeta?.[groupName]?.nonClickable;

    const isClickable =
      it.clickable !== false &&
      !groupNonClickable &&
      ((it.external && !!it.external_url) || (!!slug && !it.external));

    return {
      id: it.id,
      title: cardTitle || "Untitled",
      subtitle: cardSubtitle,
      excerpt: cardExcerpt,
      cardImage: resolvedCardImage,
      banner: resolvedBannerImage,
      archiveImage: resolvedArchiveImage,
      images: [],

      // Used by ProjectCard link logic.
      slug,
      clickable: isClickable,

      // External cards.
      external: !!it.external,
      external_url: it.external_url || "",

      // Optional display metadata.
      volume: post?.volume || null,
      author: post?.author || null,
      date: post?.date || null,

      // Helpful for debugging / future filtering.
      source: "portfolio_items",
      postId: post?.id || null,
    };
  };

  // Normalize standalone posts into the same card shape.
  const normalizeStandalonePost = (post) => {
    const rawArchiveImage = (post?.archive_image_url || "").trim();
    const rawBannerImage = (post?.banner_url || "").trim();

    const resolvedArchiveImage =
      resolveImageServer(supabase, BUCKET, rawArchiveImage) ||
      rawArchiveImage ||
      null;

    const resolvedBannerImage =
      resolveImageServer(supabase, BUCKET, rawBannerImage) ||
      rawBannerImage ||
      null;

    return {
      id: post.id,
      title: post.title || "Untitled",
      subtitle: post.subtitle || post.Subtitle || "",
      excerpt: post.excerpt || "",
      cardImage: null,
      banner: resolvedBannerImage,
      archiveImage: resolvedArchiveImage,
      images: [],
      slug: post.slug || "",
      clickable: !!post.slug,
      external: false,
      external_url: "",
      volume: post.volume || null,
      author: post.author || null,
      date: post.date || null,

      // Helpful for debugging / future filtering.
      source: "posts",
      postId: post.id,
    };
  };

  // 4) Place curated portfolio_items into the correct group bucket.
  for (const it of safeItems) {
    const groupName = groupIdToName[it.group_id];
    if (!groupName) continue;

    grouped[groupName].push(normalizeCard(it));
  }

  // 5) Add standalone published portfolio posts that are not already represented.
  if (Array.isArray(standalonePosts)) {
    for (const post of standalonePosts) {
      if (!post?.id) continue;

      // Prevent duplicate display if portfolio_items already has this post_id.
      if (representedPostIds.has(post.id)) continue;

      const category =
        post.category && typeof post.category === "string"
          ? post.category
          : "Featured / Spotlight Projects";

      // If the category does not exist in portfolio_groups,
      // create a dynamic section at the bottom.
      if (!grouped[category]) {
        grouped[category] = [];
        orderedCategories.push(category);

        groupMeta[category] = {
          id: null,
          name: category,
          slug: toId(category),
          position: orderedCategories.length,
          nonClickable: false,
          dynamic: true,
        };
      }

      grouped[category].push(normalizeStandalonePost(post));
    }
  }

  return {
    props: {
      grouped,
      orderedCategories,
      groupMeta,
    },
  };
}
