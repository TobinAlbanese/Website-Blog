import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------
   CONSTANTS / CATEGORY HELPERS
------------------------------------------------- */

const HERO_IMAGE =
  "https://aekjhiphxycnybowwgud.supabase.co/storage/v1/object/public/public-images/Snowboarding1.webp";

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

const NON_CLICKABLE_CATEGORIES = new Set([
  "Current & In-Progress Work",
  "Education & Certifications",
  "Collaborations",
]);

const HIDDEN_PORTFOLIO_SLUGS = new Set([
  "semantic-archive",
  "daily-briefing-generator",
  "noise-filtering-engine",
  "ofac-sanctions-monitor",
  "watchlist-engine",
]);

const getCategoryDisplayName = (category = "") =>
  String(category).replace(/\s*\(Non-clickable\)\s*$/i, "").trim();

const toId = (name = "") => {
  const displayName = getCategoryDisplayName(name);

  return (
    categoryToId[displayName] ||
    displayName.replace(/[^\w -]+/g, "").replace(/\s+/g, "-")
  );
};

const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]*>/g, "") : "";

/* -------------------------------------------------
   SERVER-SIDE HELPERS
------------------------------------------------- */

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(url, anon, {
    auth: {
      persistSession: false,
    },
  });
}

function resolveImageServer(supabase, bucket, src) {
  let s = (src || "").trim();

  if (!s) return "";

  if (s.startsWith("http://")) {
    return s.replace("http://", "https://");
  }

  if (s.startsWith("https://")) {
    return s;
  }

  if (s.startsWith("/")) {
    return s;
  }

  if (bucket && s.startsWith(`${bucket}/`)) {
    s = s.slice(bucket.length + 1);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(s);

  return data?.publicUrl || s;
}

/* -------------------------------------------------
   CLIENT-SIDE HELPERS
------------------------------------------------- */

function resolveImageClient(src) {
  let s = (src || "").trim();

  if (!s) {
    return HERO_IMAGE;
  }

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

  if (!url) {
    return HERO_IMAGE;
  }

  return `${url}/storage/v1/object/public/${bucket}/${s}`;
}

function getProjectExcerpt(project) {
  if (project?.excerpt) {
    return project.excerpt;
  }

  const firstBlockHtml = Array.isArray(project?.content)
    ? project.content[0]?.text
    : "";

  const stripped = stripHtml(firstBlockHtml);

  if (!stripped) {
    return "";
  }

  return stripped.length > 220 ? `${stripped.slice(0, 220)}…` : stripped;
}

function getProjectImage(project) {
  return (
    project?.cardImage ||
    project?.archiveImage ||
    project?.banner ||
    (Array.isArray(project?.images) && project.images[0]) ||
    HERO_IMAGE
  );
}

/* -------------------------------------------------
   HERO TITLE ANIMATION
------------------------------------------------- */

function useWordAnimatedText(
  text,
  baseDelay = 0.08,
  charClass = "type-char-title",
  startDelay = 0,
) {
  return useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let i = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) {
        return <span key={`sp-${idx}`}>{tok}</span>;
      }

      const chars = tok.split("").map((ch) => {
        const key = `c-${i++}`;

        return (
          <span
            key={key}
            className={charClass}
            style={{
              animationDelay: `${startDelay + i * baseDelay}s`,
            }}
          >
            {ch}
          </span>
        );
      });

      return (
        <span key={`w-${idx}`} style={{ display: "inline-block" }}>
          {chars}
        </span>
      );
    });
  }, [text, baseDelay, charClass, startDelay]);
}

/* -------------------------------------------------
   HERO BODY HIGHLIGHT ANIMATION
------------------------------------------------- */

function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0,
) {
  return useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let t = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) {
        return <span key={`sp-${idx}`}>{tok}</span>;
      }

      const chars = tok.split("").map((ch, j) => {
        t += 1;

        return (
          <span
            key={`c-${idx}-${j}`}
            className={charClass}
            style={{
              animationDelay: `${startDelay + t * baseDelay}s`,
            }}
          >
            {ch}
          </span>
        );
      });

      return (
        <span key={`w-${idx}`} style={{ display: "inline-block" }}>
          {chars}
        </span>
      );
    });
  }, [text, baseDelay, charClass, startDelay]);
}

/* -------------------------------------------------
   EDITORIAL PROJECT ROW
------------------------------------------------- */

function ProjectRow({ project, index }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setVisible(true);
      },
      Math.min(index * 90, 450),
    );

    return () => clearTimeout(timeout);
  }, [index]);

  const imgSrc = resolveImageClient(getProjectImage(project));
  const desc = getProjectExcerpt(project);
  const subtitle = (project?.subtitle || "").trim();

  const hasExternalLink = project.external && !!project.external_url;
  const hasInternalPostLink = !project.external && !!project.slug;

  const isClickable =
    project.clickable !== false && (hasExternalLink || hasInternalPostLink);

  const body = (
    <article
      className={`portfolio-row ${visible ? "visible" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-clickable={isClickable ? "true" : "false"}
      style={{
        transform: visible
          ? hover && isClickable
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(12px)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="portfolio-row-copy">
        <h3 className="portfolio-row-title">{project.title}</h3>

        {subtitle && <p className="portfolio-row-subtitle">{subtitle}</p>}

        {desc && <p className="portfolio-row-excerpt">{desc}</p>}

        {isClickable && (
          <div className="portfolio-row-link">
            View project <span aria-hidden="true">→</span>
          </div>
        )}
      </div>

      <div className="portfolio-row-media">
        <img
          src={imgSrc}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = HERO_IMAGE;
          }}
        />
      </div>
    </article>
  );

  if (!isClickable) {
    return body;
  }

  if (hasExternalLink) {
    const isInternalExternalUrl = project.external_url.startsWith("/");

    return (
      <a
        href={project.external_url}
        target={isInternalExternalUrl ? "_self" : "_blank"}
        rel={isInternalExternalUrl ? undefined : "noopener noreferrer"}
        aria-label={`Open ${project.title}`}
        className="portfolio-row-link-wrap"
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={`/Portfolio/${project.slug}`}
      aria-label={`Open ${project.title}`}
      className="portfolio-row-link-wrap"
    >
      {body}
    </Link>
  );
}

/* -------------------------------------------------
   PORTFOLIO PAGE
------------------------------------------------- */

export default function Portfolio({ grouped = {}, orderedCategories = [] }) {
  const visibleCategories = orderedCategories.filter((category) => {
    const projects = Array.isArray(grouped?.[category])
      ? grouped[category]
      : [];

    return projects.length > 0;
  });

  const heroTitle = useWordAnimatedText(
    "Research, Intelligence & Technical Work",
    0.06,
    "type-char-title",
    0,
  );

  const heroCopy = useWordSpanizedText(
    "A collection of my research, intelligence analysis, analytical writing, software systems, and independent technical projects. The work below is organized by area so each project can be explored in context rather than reduced to a small card.",
    0.006,
    "type-char",
    0.7,
  );

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

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

        <div className="base d-flex">
          <Navbar />

          <div className="PortfolioPage">
            <section
              className="c-bg portfolio-hero-section"
              data-armstrong-id="wrapper"
            >
              <div
                className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
                data-armstrong-id="primary"
              >
                <div className="col-12">
                  <div
                    className="row justify-between d-flex portfolio-hero-row"
                    data-armstrong-id="row"
                  >
                    <div
                      className="col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center portfolio-hero-text"
                      data-armstrong-id="personal-message"
                    >
                      <h1 className="heading-l mb-15 portfolio-hero-title">
                        {heroTitle}
                      </h1>

                      <p className="body-m portfolio-hero-copy">{heroCopy}</p>
                    </div>

                    <div
                      className="col-12 col-lg-6 d-flex justify-center portfolio-hero-media"
                      data-armstrong-id="profile-image"
                    >
                      <img
                        src={HERO_IMAGE}
                        alt="Tobin Albanese snowboarding"
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/images/space.webp";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="portfolio-hero-divider" />

            <main className="portfolio-editorial">
              {visibleCategories.length === 0 ? (
                <div className="portfolio-empty">
                  No portfolio projects found.
                </div>
              ) : (
                visibleCategories.map((category, categoryIndex) => {
                  const projects = Array.isArray(grouped?.[category])
                    ? grouped[category]
                    : [];

                  const displayName = getCategoryDisplayName(category);

                  return (
                    <section
                      key={category}
                      id={toId(category)}
                      className="portfolio-category"
                      style={{ scrollMarginTop: "80px" }}
                    >
                      {categoryIndex > 0 && (
                        <div className="portfolio-category-rule" />
                      )}

                      <header className="portfolio-category-header">
                        <h2>{displayName}</h2>

                        <p>
                          {projects.length} {projects.length === 1 ? "project" : "projects"}
                          {NON_CLICKABLE_CATEGORIES.has(displayName) && (
                            <> · Non-clickable</>
                          )}
                        </p>
                      </header>

                      <div className="portfolio-category-list">
                        {projects.map((project, idx) => (
                          <ProjectRow
                            key={
                              project.slug || project.id || project.title || idx
                            }
                            project={project}
                            index={idx}
                          />
                        ))}
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

      <style jsx global>{`
        /* =========================================
           PAGE
        ========================================= */

        .PortfolioPage {
          width: 100%;
        }

        /* =========================================
           HERO
        ========================================= */

        .portfolio-hero-section {
          width: 100%;
        }

        .portfolio-hero-row {
          align-items: center;
        }

        .portfolio-hero-text {
          position: relative;
          isolation: isolate;
          z-index: 2;
          min-width: 0;
          padding-right: 16px;
        }

        .portfolio-hero-title {
          margin-top: 0;
          color: var(--c-text);
          font-family: inherit;
          overflow: visible;
        }

        .portfolio-hero-copy {
          max-width: 640px;
          margin: 0;
          color: var(--c-text-secondary);
          font-size: 18px;
          line-height: 1.7;
          word-break: normal;
          overflow-wrap: normal;
          hyphens: none;
        }

        .portfolio-hero-media {
          min-width: 0;
          align-items: center;
        }

        .portfolio-hero-media img {
          display: block;
          width: 100%;
          max-width: 600px;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center;
          border-radius: 12px;
        }

        /* =========================================
           HERO DIVIDER
        ========================================= */

        .portfolio-hero-divider {
          width: min(1000px, calc(100% - 48px));
          margin: 40px auto;
          border-top: 4px solid #d62827;
        }

        /* =========================================
           PORTFOLIO CONTENT
        ========================================= */

        .portfolio-editorial {
          width: min(1080px, calc(100% - 48px));
          margin: 0 auto;
          padding: 0 0 90px;
        }

        .portfolio-category {
          width: 100%;
        }

        /* =========================================
           CATEGORY RED RULE
        ========================================= */

        .portfolio-category-rule {
          width: 100%;
          border-top: 2px solid #d62827;
          margin: 64px 0 30px;
        }

        /* =========================================
           CATEGORY HEADER
        ========================================= */

        .portfolio-category-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 12px;
        }

        .portfolio-category-header h2 {
          margin: 0;
          padding-left: 14px;
          border-left: 4px solid #d62827;
          color: var(--c-text-primary);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          line-height: 1.1;
        }

        .portfolio-category-header p {
          margin: 0 0 4px;
          color: var(--c-text-secondary);
          font-size: 14px;
          white-space: nowrap;
        }

        .portfolio-category-list {
          width: 100%;
        }

        /* =========================================
           PROJECT LINKS
        ========================================= */

        .portfolio-row-link-wrap {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        /* =========================================
           PROJECT ROW
        ========================================= */

        .portfolio-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 250px;
          gap: 34px;
          align-items: center;
          min-height: 190px;
          padding: 22px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
          transition:
            opacity 0.35s ease,
            transform 0.25s ease;
        }

        .portfolio-row[data-clickable="true"] {
          cursor: pointer;
        }

        /* =========================================
           PROJECT COPY
        ========================================= */

        .portfolio-row-copy {
          min-width: 0;
        }

        .portfolio-row-title {
          margin: 0 0 7px;
          color: var(--c-text-primary);
          font-size: 1.35rem;
          font-weight: 600;
          line-height: 1.25;
        }

        .portfolio-row-subtitle {
          margin: 0 0 8px;
          color: var(--c-text-secondary);
          font-size: 0.95rem;
          line-height: 1.45;
          font-style: italic;
        }

        .portfolio-row-excerpt {
          max-width: 680px;
          margin: 0;
          color: var(--c-text-secondary);
          font-size: 16px;
          line-height: 1.65;
        }

        .portfolio-row-link {
          margin-top: 12px;
          color: #d62827;
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* =========================================
           PROJECT IMAGE
        ========================================= */

        .portfolio-row-media {
          width: 250px;
          height: 150px;
          overflow: hidden;
          border-radius: 8px;
          background: var(--c-bg-secondary, #1f1f1f);
        }

        .portfolio-row-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .portfolio-row[data-clickable="true"]:hover .portfolio-row-media img {
          transform: scale(1.025);
        }

        /* =========================================
           EMPTY STATE
        ========================================= */

        .portfolio-empty {
          padding: 40px 0 80px;
          color: var(--c-text-secondary);
          font-size: 18px;
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {
          .portfolio-editorial {
            width: calc(100% - 40px);
          }

          .portfolio-row {
            grid-template-columns: minmax(0, 1fr) 210px;
            gap: 24px;
          }

          .portfolio-row-media {
            width: 210px;
            height: 140px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 768px) {
          .portfolio-hero-text {
            padding-right: 0;
          }

          .portfolio-hero-media {
            width: 100%;
          }

          .portfolio-hero-media img {
            width: 100%;
            max-width: 600px;
            aspect-ratio: 4 / 5;
          }

          .portfolio-hero-divider {
            width: auto;
            margin: 30px 16px;
          }

          .portfolio-editorial {
            width: calc(100% - 32px);
            padding-bottom: 60px;
          }

          .portfolio-category-rule {
            margin: 48px 0 26px;
          }

          .portfolio-category-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .portfolio-category-header h2 {
            font-size: clamp(1.6rem, 7vw, 2rem);
          }

          .portfolio-row {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 22px 0 26px;
          }

          .portfolio-row-media {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            order: -1;
          }

          .portfolio-row-title {
            font-size: 1.25rem;
          }

          .portfolio-row-excerpt {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}

/* -------------------------------------------------
   SSR
------------------------------------------------- */

export async function getServerSideProps() {
  const supabase = getServerSupabase();
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "post-images";

  /* -------------------------------------------------
     1. PORTFOLIO GROUPS
  ------------------------------------------------- */

  const { data: groups, error: gErr } = await supabase
    .from("portfolio_groups")
    .select("id, name, slug, position")
    .order("position", {
      ascending: true,
    });

  if (gErr) {
    console.log("Portfolio SSR groups error:", gErr);

    return {
      props: {
        grouped: {},
        orderedCategories: [],
        groupMeta: {},
      },
    };
  }

  const safeGroups = Array.isArray(groups) ? groups : [];
  const orderedCategories = safeGroups.map((group) => group.name);

  /* -------------------------------------------------
     GROUP METADATA
  ------------------------------------------------- */

  const groupMeta = {};

  for (const group of safeGroups) {
    const displayName = getCategoryDisplayName(group.name || "");

    const nonClickable =
      NON_CLICKABLE_CATEGORIES.has(displayName) ||
      (group.slug || "").endsWith("-non-clickable") ||
      (group.name || "").toLowerCase().includes("non-clickable");

    groupMeta[group.name] = {
      id: group.id,
      name: group.name,
      slug: group.slug,
      position: group.position,
      nonClickable,
    };
  }

  /* -------------------------------------------------
     INITIALIZE ALL GROUPS
  ------------------------------------------------- */

  const grouped = {};

  for (const name of orderedCategories) {
    grouped[name] = [];
  }

  /* -------------------------------------------------
     2. CURATED PORTFOLIO ITEMS
  ------------------------------------------------- */

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
      `,
    )
    .order("position", {
      ascending: true,
    });

  if (iErr) {
    console.log("Portfolio SSR items error:", iErr);

    return {
      props: {
        grouped,
        orderedCategories,
        groupMeta,
      },
    };
  }

  const safeItems = Array.isArray(items) ? items : [];

  /* -------------------------------------------------
     3. STANDALONE PORTFOLIO POSTS
  ------------------------------------------------- */

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
        category,
        clickable
      `,
    )
    .eq("type", "portfolio")
    .eq("status", "published")
    .eq("is_published", true)
    .order("published_at", {
      ascending: false,
    });

  if (pErr) {
    console.log("Portfolio SSR standalone posts error:", pErr);
  }

  const safeStandalonePosts = Array.isArray(standalonePosts)
    ? standalonePosts
    : [];

  /* -------------------------------------------------
     GROUP ID -> GROUP NAME
  ------------------------------------------------- */

  const groupIdToName = {};

  for (const group of safeGroups) {
    groupIdToName[group.id] = group.name;
  }

  /* -------------------------------------------------
     PREVENT DUPLICATE POSTS
  ------------------------------------------------- */

  const representedPostIds = new Set(
    safeItems.map((item) => item.post_id).filter(Boolean),
  );

  /* -------------------------------------------------
     CATEGORY MATCHING
  ------------------------------------------------- */

  const resolveCategoryName = (requestedCategory) => {
    const requestedDisplayName = getCategoryDisplayName(requestedCategory);

    return (
      orderedCategories.find(
        (existingCategory) =>
          getCategoryDisplayName(existingCategory) === requestedDisplayName,
      ) || requestedCategory
    );
  };

  /* -------------------------------------------------
     NORMALIZE CURATED PORTFOLIO ITEM
  ------------------------------------------------- */

  const normalizeCard = (item) => {
    const post = item.posts || null;

    const rawCardImage = (item.image_url || "").trim();
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

    const cardExcerpt =
      (item.excerpt || "").trim() || (post?.excerpt || "").trim() || "";

    const cardTitle =
      (item.title || "").trim() || (post?.title || "").trim();

    const cardSubtitle =
      (item.subtitle || "").trim() ||
      (post?.subtitle || post?.Subtitle || "").trim() ||
      "";

    const slug = post?.slug || "";

    const groupName =
      groupIdToName[item.group_id] || orderedCategories[0] || "";

    const groupNonClickable = !!groupMeta?.[groupName]?.nonClickable;

    const isClickable =
      item.clickable !== false &&
      !groupNonClickable &&
      ((item.external && !!item.external_url) || (!!slug && !item.external));

    return {
      id: item.id,
      title: cardTitle || "Untitled",
      subtitle: cardSubtitle,
      excerpt: cardExcerpt,
      cardImage: resolvedCardImage,
      banner: resolvedBannerImage,
      archiveImage: resolvedArchiveImage,
      images: [],
      slug,
      clickable: isClickable,
      external: !!item.external,
      external_url: item.external_url || "",
      volume: post?.volume || null,
      author: post?.author || null,
      date: post?.date || null,
      source: "portfolio_items",
      postId: post?.id || null,
    };
  };

  /* -------------------------------------------------
     NORMALIZE STANDALONE PORTFOLIO POST
  ------------------------------------------------- */

  const normalizeStandalonePost = (post, category) => {
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

    const categoryNonClickable =
      !!groupMeta?.[category]?.nonClickable ||
      NON_CLICKABLE_CATEGORIES.has(getCategoryDisplayName(category));

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
      clickable:
        post.clickable !== false && !!post.slug && !categoryNonClickable,
      external: false,
      external_url: "",
      volume: post.volume || null,
      author: post.author || null,
      date: post.date || null,
      source: "posts",
      postId: post.id,
    };
  };

  /* -------------------------------------------------
     4. ADD CURATED ITEMS TO THEIR GROUPS
  ------------------------------------------------- */

  for (const item of safeItems) {
    const groupName = groupIdToName[item.group_id];

    if (!groupName || !grouped[groupName]) {
      continue;
    }

    const normalized = normalizeCard(item);

    if (HIDDEN_PORTFOLIO_SLUGS.has(normalized.slug)) {
      continue;
    }

    grouped[groupName].push(normalized);
  }

  /* -------------------------------------------------
     5. ADD STANDALONE POSTS
  ------------------------------------------------- */

  for (const post of safeStandalonePosts) {
    if (!post?.id) {
      continue;
    }

    if (HIDDEN_PORTFOLIO_SLUGS.has(post.slug)) {
      continue;
    }

    if (representedPostIds.has(post.id)) {
      continue;
    }

    const requestedCategory =
      post.category && typeof post.category === "string"
        ? post.category
        : "Featured / Spotlight Projects";

    const category = resolveCategoryName(requestedCategory);

    if (!grouped[category]) {
      grouped[category] = [];
      orderedCategories.push(category);

      const displayName = getCategoryDisplayName(category);
      const nonClickable = NON_CLICKABLE_CATEGORIES.has(displayName);

      groupMeta[category] = {
        id: null,
        name: category,
        slug: toId(category),
        position: orderedCategories.length,
        nonClickable,
        dynamic: true,
      };
    }

    grouped[category].push(normalizeStandalonePost(post, category));
  }

  /* -------------------------------------------------
     RETURN DATA
  ------------------------------------------------- */

  return {
    props: {
      grouped,
      orderedCategories,
      groupMeta,
    },
  };
}
