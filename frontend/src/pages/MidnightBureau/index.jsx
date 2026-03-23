import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import HeatRevealCanvas from "../../components/LandingPage/HeatRevealCanvas.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

import { createClient } from "@supabase/supabase-js";

// ---------- helpers ----------
const arr = (xs) => (Array.isArray(xs) ? xs : []);
const sortByDateDesc = (xs) =>
  [...xs].sort((a, b) => new Date(b.date) - new Date(a.date));

const uniqBySlug = (xs = []) => {
  const seen = new Set();
  return xs.filter(
    (p) => p?.slug && !seen.has(p.slug) && (seen.add(p.slug), true)
  );
};

// --------------------
// Supabase (SSR)
// --------------------
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, anon, { auth: { persistSession: false } });
}

const POSTS_BUCKET = "post-images";

function isHttpUrl(src = "") {
  return src.startsWith("http://") || src.startsWith("https://");
}

function resolveImageServer(supabase, bucket, src) {
  const s = (src || "").trim();
  if (!s) return "";
  if (isHttpUrl(s) || s.startsWith("/")) return s;

  const { data } = supabase.storage.from(bucket).getPublicUrl(s);
  return data?.publicUrl || "";
}

// ✅ Public bucket helper (for Syria2.webp in public-images)
function publicBucketUrl(path, bucket) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !path) return "";
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}

// ✅ Always use this hero fallback (Supabase public-images bucket)
const HERO_FALLBACK = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url
    ? `${url}/storage/v1/object/public/public-images/Syria2.webp`
    : "/assets/images/space.webp";
})();

// ---------- DB category → “bucket” keys (keep your topic labels the same) ----------
/**
 * These keys replace MidnightBureauData's keys.
 * You control mapping by posts.category in DB.
 */
const BUCKET_KEYS = [
  "Geopolitics",
  "Security",
  "Technology",
  "Economy",
  "Intelligence",
  "Defense",
  "ForeignPolicy",
  "Diplomacy",
];

function bucketKeyFromPostCategory(category) {
  const c = (category || "").trim();
  if (!c) return null;

  if (BUCKET_KEYS.includes(c)) return c;

  const lower = c.toLowerCase();
  if (lower === "cybersecurity") return "Security";
  if (lower === "military" || lower === "military & defense") return "Defense";
  if (lower === "tech" || lower === "technology & innovation")
    return "Technology";
  if (lower === "global events") return "ForeignPolicy";

  return null;
}

function takeFromKeys(postsByBucket, keys, total = 2, perSourceCap) {
  const buckets = keys.map((k) => sortByDateDesc(arr(postsByBucket?.[k])));
  const out = [];
  const seen = new Set();

  if (perSourceCap != null) {
    const caps = new Array(buckets.length).fill(0);
    let progressed = true;

    while (out.length < total && progressed) {
      progressed = false;

      for (let i = 0; i < buckets.length && out.length < total; i++) {
        if (caps[i] >= perSourceCap) continue;
        const bucket = buckets[i];

        while (caps[i] < bucket.length) {
          const p = bucket[caps[i]];
          caps[i] += 1;

          if (p?.slug && !seen.has(p.slug)) {
            out.push(p);
            seen.add(p.slug);
            progressed = true;
            break;
          }
        }
      }
    }
  }

  if (out.length < total) {
    for (const bucket of buckets) {
      for (const p of bucket) {
        if (!p?.slug || seen.has(p.slug)) continue;
        out.push(p);
        seen.add(p.slug);
        if (out.length >= total) break;
      }
      if (out.length >= total) break;
    }
  }

  return out;
}

function getCategoryPosts(postsByBucket, label) {
  switch (label) {
    case "Geopolitics":
      return uniqBySlug(takeFromKeys(postsByBucket, ["Geopolitics"], 2));
    case "Cybersecurity":
      return uniqBySlug(
        takeFromKeys(postsByBucket, ["Security", "Technology"], 2, 1)
      );
    case "Economic Intelligence":
      return uniqBySlug(
        takeFromKeys(postsByBucket, ["Economy", "Intelligence"], 2, 1)
      );
    case "Military & Defense":
      return uniqBySlug(
        takeFromKeys(postsByBucket, ["Defense", "Security"], 2, 1)
      );
    case "Technology & Innovation":
      return uniqBySlug(takeFromKeys(postsByBucket, ["Technology"], 2));
    case "Global Events":
      return uniqBySlug(
        takeFromKeys(postsByBucket, ["ForeignPolicy", "Diplomacy"], 2, 1)
      );
    default:
      return [];
  }
}

// ---------- Per-character animator ----------
export function useSpanizedText(
  text,
  baseDelay = 0.05,
  className = "type-char",
  startDelay = 0
) {
  return useMemo(() => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={className}
        style={{ animationDelay: `${startDelay + index * baseDelay}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [text, baseDelay, className]);
}

// ---------- Title animator ----------
export function useWordAnimatedText(
  text,
  baseDelay = 0.08,
  charClass = "type-char-title",
  startDelay = 0
) {
  return React.useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let i = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) return <span key={`sp-${idx}`}>{tok}</span>;
      const chars = tok.split("").map((ch) => {
        const k = `c-${i++}`;
        return (
          <span
            key={k}
            className={charClass}
            style={{ animationDelay: `${startDelay + i * baseDelay}s` }}
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

// ---------- Paragraph animator ----------
export function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0
) {
  return React.useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let t = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) return <span key={`sp-${idx}`}>{tok}</span>;
      const chars = tok.split("").map((ch, j) => {
        t += 1;
        return (
          <span
            key={`c-${idx}-${j}`}
            className={charClass}
            style={{ animationDelay: `${startDelay + t * baseDelay}s` }}
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

function MetaRow({ author, date }) {
  return (
    <div
      className="body-l checkmarks c-text"
      style={{
        marginTop: 8,
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
        {author}
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
        <span aria-hidden="true">✵</span>
        <span style={{ fontSize: "0.9rem", marginLeft: 6 }}>{date}</span>
      </small>
    </div>
  );
}

function EmptyCard({ isMain }) {
  return (
    <div
      style={{
        backgroundColor: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: isMain ? 24 : 16,
        boxShadow: isMain
          ? "0 10px 30px rgba(0,0,0,0.1)"
          : "0 8px 24px rgba(0, 0, 0, 0.08)",
        width: "100%",
        minHeight: isMain ? 720 : 260,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--c-text-secondary)",
        fontSize: isMain ? "1.1rem" : "1rem",
      }}
    >
      No posts yet.
    </div>
  );
}

function AnimatedPostCard({ post, index, isMain }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  if (!post) return <EmptyCard isMain={isMain} />;

  const handleNav = () => router.push(`/MidnightBureau/${post.slug}`);

  // ✅ Always resolve fallback via public-images bucket Syria2.webp
  const displayImg = post.banner || HERO_FALLBACK;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleNav}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNav();
        }
      }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateX(-30px)",
        transition:
          "opacity 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hover
          ? "0 12px 30px rgba(0, 0, 0, 0.15)"
          : isMain
            ? "0 10px 30px rgba(0,0,0,0.1)"
            : "0 8px 24px rgba(0, 0, 0, 0.08)",
        backgroundColor: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: isMain ? 24 : 16,
        display: isMain ? "flex" : "grid",
        flexDirection: isMain ? "column" : undefined,
        gap: isMain ? 24 : 32,
        gridTemplateColumns: isMain ? undefined : "1fr 2fr",
        width: "100%",
        cursor: "pointer",
      }}
    >
      {isMain ? (
        <>
          <img
            src={displayImg}
            alt={post.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = HERO_FALLBACK;
            }}
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              textAlign: "left",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  margin: "0 0 8px 0",
                  color: "var(--c-text-primary)",
                  textAlign: "left",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
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
                {post.excerpt}
              </p>
            </div>

            <MetaRow author={post.author} date={post.date} />
          </div>
        </>
      ) : (
        <>
          <img
            src={displayImg}
            alt={post.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = HERO_FALLBACK;
            }}
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
              paddingLeft: 0,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "10px 0 12px 0",
                  color: "var(--c-text-primary)",
                  textAlign: "left",
                  lineHeight: 1.25,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
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
                {post.excerpt}
              </p>
            </div>
            <MetaRow author={post.author} date={post.date} />
          </div>
        </>
      )}
    </article>
  );
}

export default function MidnightBureau({ posts = [] }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Build “buckets” in-memory from DB posts
  const postsByBucket = useMemo(() => {
    const out = {};
    for (const k of BUCKET_KEYS) out[k] = [];
    for (const p of arr(posts)) {
      const key = bucketKeyFromPostCategory(p.category);
      if (!key) continue;
      out[key].push(p);
    }
    return out;
  }, [posts]);

  const sortedRecent = useMemo(() => sortByDateDesc(arr(posts)), [posts]);
  const mainPost = sortedRecent[0] || null;
  const otherPosts = sortedRecent.slice(1);

  const paragraphLines = [
    `At Midnight Bureau, you'll find a thoughtful space dedicated to deep dives, critical analyses, and fresh perspectives. From engaging book reviews and carefully curated resources to timely insights on culture and current events, every post is crafted with care by myself, `,
    "Tobin Albanese",
    `, to inspire, inform, and spark meaningful wonders.`,
    `Whether you're here to expand your knowledge, discover new ideas, or simply        enjoy well-written content, take your time exploring the posts below—there’s         something here for every curious mind.`,
    `Step inside, and let our journey begin.`,
  ];

  const titleLine1 = useWordAnimatedText("Welcome to", 0.08, "type-char-title");
  const titleLine2 = useWordAnimatedText(
    "Midnight Bureau",
    0.08,
    "type-char-title"
  );

  // ✅ Syria2.webp from Supabase public-images bucket for the hero effect
  const heroEffectImage =
    publicBucketUrl("Syria2.webp", "public-images") || HERO_FALLBACK;

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
          <NavbarMB />

          <section className="c-bg" data-armstrong-id="wrapper">
            <div
              className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
              data-armstrong-id="primary"
            >
              <div className="col-12">
                <div
                  className="row justify-between d-flex mb-hero-row"
                  data-armstrong-id="row"
                >
                  <div
                    className={`col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center ${
                      animate ? "slide-in-left" : ""
                    }`}
                    data-armstrong-id="personal-message"
                    style={{
                      position: "relative",
                      isolation: "isolate",
                      zIndex: 2,
                      paddingRight: 16,
                      minWidth: 0,
                    }}
                  >
                    <h1
                      className="heading-l mb-15"
                      style={{
                        fontFamily: "inherit",
                        overflow: "visible",
                        whiteSpace: "pre-wrap",
                        color: "var(--c-text)",
                      }}
                    >
                      <div>{titleLine1}</div>
                      <div>{titleLine2}</div>
                    </h1>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color: "var(--c-text-secondary)",
                        fontFamily: "inherit",
                        whiteSpace: "normal",
                        marginBottom: "1em",
                        wordBreak: "normal",
                        overflowWrap: "normal",
                        hyphens: "none",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[0],
                        0.01,
                        "type-char",
                        0
                      )}
                      <b>
                        <em>
                          {useWordSpanizedText(
                            paragraphLines[1],
                            0.01,
                            "type-char",
                            2.8
                          )}
                        </em>
                      </b>
                      {useWordSpanizedText(
                        paragraphLines[2],
                        0.01,
                        "type-char",
                        3
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color: "var(--c-text-secondary)",
                        fontFamily: "inherit",
                        whiteSpace: "normal",
                        marginBottom: "1em",
                        wordBreak: "normal",
                        overflowWrap: "normal",
                        hyphens: "none",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[3],
                        0.01,
                        "type-char",
                        3.6
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color: "var(--c-text-secondary)",
                        fontFamily: "inherit",
                        whiteSpace: "normal",
                        wordBreak: "normal",
                        overflowWrap: "normal",
                        hyphens: "none",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[4],
                        0.01,
                        "type-char",
                        5.7
                      )}
                    </p>
                  </div>

                  {/* ✅ Hero image effect must be Syria2.webp from public-images bucket */}
                  <div className="heat-canvas-wrapper mb-hero-media">
                    <HeatRevealCanvas
                      width={800}
                      height={800}
                      imageSrc={heroEffectImage}
                    />
                  </div>
                </div>
              </div>
            </div>

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
              <section
                id="briefing-recent"
                className="mb-briefing-recent"
                style={{
                  display: "flex",
                  gap: "48px",
                  marginBottom: 80,
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
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
                    Latest Briefing
                  </h2>
                  <div className="latest-briefing-wrapper">
                    <AnimatedPostCard post={mainPost} index={0} isMain />
                  </div>
                </div>

                <div
                  id="recent-posts"
                  className="mb-recent-col"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                    scrollMarginTop: "80px",
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
                    Recent Posts
                  </h2>

                  {otherPosts.length === 0 ? (
                    <EmptyCard isMain={false} />
                  ) : (
                    otherPosts
                      .slice(0, 3)
                      .map((post, i) => (
                        <AnimatedPostCard
                          key={post.slug}
                          post={post}
                          index={i + 1}
                          isMain={false}
                        />
                      ))
                  )}
                </div>
              </section>

              <div
                style={{
                  maxWidth: 1000,
                  margin: "80px auto 24px auto",
                  borderTop: "4px solid #d62827",
                }}
              />

              <h2
                id="categories"
                style={{
                  fontSize: "2.75rem",
                  fontWeight: 800,
                  marginBottom: 32,
                  color: "var(--c-text-primary)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  borderLeft: "5px solid #d62827",
                  paddingLeft: 16,
                  maxWidth: 1400,
                  marginInline: "auto",
                }}
              >
                Browse by Topics
              </h2>

              <div
                className="mb-topics-grid"
                style={{
                  maxWidth: "1350px",
                  margin: "0 auto 100px auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                  gap: "64px 48px",
                }}
              >
                {[
                  "Geopolitics",
                  "Cybersecurity",
                  "Economic Intelligence",
                  "Military & Defense",
                  "Technology & Innovation",
                  "Global Events",
                ].map((cat) => {
                  const postsForCat = getCategoryPosts(postsByBucket, cat);

                  return (
                    <div
                      key={cat}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "var(--c-text-primary)",
                          borderBottom: "2px solid #d62827",
                          paddingBottom: 8,
                        }}
                      >
                        {cat}
                      </h3>

                      {postsForCat.length === 0 ? (
                        <EmptyCard isMain={false} />
                      ) : (
                        postsForCat.map((post, i) => (
                          <AnimatedPostCard
                            key={post.slug}
                            post={post}
                            index={i}
                            isMain={false}
                          />
                        ))
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                style={{
                  backgroundColor: "#d62827",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontFamily: "inherit",
                  marginTop: 40,
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b02621")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d62827")
                }
                onClick={() =>
                  (window.location.href = "/MidnightBureau/Archive")
                }
              >
                Explore Full Archive Here!
              </button>
            </main>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}

// -------------------------
// SSR: fetch posts from DB
// -------------------------
export async function getServerSideProps() {
  const supabase = getServerSupabase();
  const POSTS_BUCKET = "post-images";

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, type, title, slug, excerpt, status, is_published, published_at, banner_url, archive_image_url, author, date, category, created_at"
    )
    .eq("type", "mb")
    .eq("is_published", true)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  if (error) {
    console.log("MidnightBureau SSR posts error:", error);
    return { props: { posts: [] } };
  }

  const safe = Array.isArray(data) ? data : [];
  const postIds = safe.map((p) => p.id).filter(Boolean);

  let inlineImageMap = {};

  if (postIds.length > 0) {
    const { data: imageRows, error: imageErr } = await supabase
      .from("post_images")
      .select("id, post_id, kind, storage_path, position")
      .in("post_id", postIds)
      .eq("kind", "inline")
      .order("position", { ascending: true });

    if (imageErr) {
      console.log("MidnightBureau SSR post_images error:", imageErr);
    } else {
      for (const row of imageRows || []) {
        if (!row?.post_id || !row?.storage_path) continue;
        if (!inlineImageMap[row.post_id]) {
          inlineImageMap[row.post_id] = row.storage_path;
        }
      }
    }
  }

  const normalized = safe
    .filter((p) => p?.slug)
    .map((p) => {
      const rawBanner = (p.banner_url || "").trim();
      const rawArchive = (p.archive_image_url || "").trim();
      const rawFirstInline = (inlineImageMap[p.id] || "").trim();

      const resolvedBanner =
        resolveImageServer(supabase, POSTS_BUCKET, rawBanner) || "";

      const resolvedArchive =
        resolveImageServer(supabase, POSTS_BUCKET, rawArchive) || "";

      const resolvedFirstInline =
        resolveImageServer(supabase, POSTS_BUCKET, rawFirstInline) || "";

      const d =
        p.published_at || p.date || p.created_at || new Date().toISOString();

      const dateIso = new Date(d);
      const dateStr = isNaN(dateIso.getTime())
        ? ""
        : dateIso.toISOString().slice(0, 10);

      return {
        id: p.id,
        slug: p.slug,
        title: p.title || "Untitled",
        excerpt: p.excerpt || "",
        author: p.author || "Tobin Albanese",
        category: p.category || "",
        date: dateStr || "",
        banner: resolvedBanner || resolvedFirstInline || HERO_FALLBACK,
        image:
          resolvedArchive ||
          resolvedFirstInline ||
          resolvedBanner ||
          HERO_FALLBACK,
        images: [
          resolvedFirstInline || resolvedArchive || resolvedBanner,
        ].filter(Boolean),
      };
    });

  return { props: { posts: normalized } };
}
