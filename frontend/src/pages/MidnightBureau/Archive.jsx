// pages/MidnightBureau/Archive.jsx
import { useRouter } from "next/router";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

import MetaHead from "../../components/LandingPage/MetaHead";
import SvgHead from "../../components/LandingPage/svgHead";
import Footer from "../../components/LandingPage/Footer";
import MBHeroGallery from "../../components/LandingPage/MBHeroGallery";
import NavbarMB from "../../components/LandingPage/NavbarMB";

const START_YEAR = 2026;
const END_YEAR = 2014;
const YEARS_PER_PAGE = 6;

const MONTHS_DESC = [
  "December",
  "November",
  "October",
  "September",
  "August",
  "July",
  "June",
  "May",
  "April",
  "March",
  "February",
  "January",
];

const META_CATEGORIES = [
  "All",
  "Recent",
  "Popular",
  "Book Reviews",
];

const TOPIC_GROUPS = {
  "World & Diplomacy": ["Foreign Policy", "Geopolitics", "Diplomacy"],
  "Security & Military": ["Defense", "Military", "Security", "Intelligence"],
  "Energy & Environment": ["Energy", "Environment"],
  Economy: ["Economy"],
  Technology: ["Technology"],
  Culture: ["Culture"],
  Ideas: ["Philosophy", "Religion"],
};

const BASE_CATEGORIES = [...META_CATEGORIES, ...Object.keys(TOPIC_GROUPS)];

const POSTS_BUCKET = "post-images";
const PUBLIC_BUCKET = "public-images";

// --------------------
// Supabase (SSR)
// --------------------
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, anon, { auth: { persistSession: false } });
}

// --------------------
// Storage helpers
// --------------------
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

function publicBucketUrl(path, bucket = PUBLIC_BUCKET) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !path) return "";
  return `${url}/storage/v1/object/public/${bucket}/${String(path).replace(/^\/+/, "")}`;
}

const sbPublic = (path) =>
  path ? publicBucketUrl(String(path).replace(/^\/+/, ""), PUBLIC_BUCKET) : "";

const toPublicImageUrl = (src) => {
  if (!src) return "";
  const s = String(src);

  if (/^https?:\/\//i.test(s)) return s;

  const m = s.match(/^\/assets\/images\/(.+)$/i);
  if (m?.[1]) return sbPublic(m[1]);

  if (s.startsWith("/")) return s;

  return sbPublic(s);
};

const galleryImages = [
  "/assets/images/Alina.webp",
  "/assets/images/Cross.webp",
  "/assets/images/Nuns.webp",
  "/assets/images/Birds.webp",
  "/assets/images/Croatia.webp",
  "/assets/images/Iraq.webp",
  "/assets/images/Italy.webp",
  "/assets/images/Ocean.webp",
  "/assets/images/Ocean2.webp",
  "/assets/images/Pakistan.webp",
  "/assets/images/Lincoln.webp",
  "/assets/images/Russia2.webp",
  "/assets/images/Russia3.webp",
  "/assets/images/Russia5.webp",
  "/assets/images/Russia4.webp",
  "/assets/images/Russia6.webp",
  "/assets/images/Syria.webp",
  "/assets/images/Syria2.webp",
  "/assets/images/WhiteHouse.webp",
  "/assets/images/AFG2.webp",
  "/assets/images/Snowboarding1.webp",
  "/assets/images/AFG4.webp",
  "/assets/images/AFG5.webp",
  "/assets/images/Lucia2.webp",
  "/assets/images/Russia.webp",
  "/assets/images/Museum.webp",
  "/assets/images/AFG.webp",
  "/assets/images/Snowboard.webp",
  "/assets/images/Snowboard2.webp",
].map(toPublicImageUrl);

// --------------------
// Helpers
// --------------------
const arr = (x) => (Array.isArray(x) ? x : []);

const toDate = (p) => {
  const d = new Date(
    p?.date ||
      p?.published ||
      p?.createdAt ||
      p?.published_at ||
      p?.created_at ||
      0
  );
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};

const normalizeLabel = (value) => {
  if (!value) return "";
  return String(value).trim();
};

const normalizeCategoryArray = (post) => {
  const raw = [post?.category].filter(Boolean).map(normalizeLabel);
  return [...new Set(raw)];
};

const isFavoritePost = (post) =>
  normalizeCategoryArray(post).some((x) => x.toLowerCase() === "favorite");

const isBookReviewPost = (post) =>
  normalizeCategoryArray(post).some((x) => x.toLowerCase() === "book reviews");

const isPopularPost = (post) =>
  normalizeCategoryArray(post).some((x) => x.toLowerCase() === "popular");

const isRecentPost = (post, sortedPosts) => {
  const recentSlugs = new Set(sortedPosts.slice(0, 8).map((p) => p.slug));
  return recentSlugs.has(post.slug);
};

const pickImg = (p) => {
  return pickImgCandidates(p)[0] || "/assets/images/space.webp";
};

const pickImgCandidates = (p) => {
  const raw = [
    p?.archiveImage ||
    p?.archive_image_url ||
    p?.archiveImageUrl ||
    p?.imageUrl ||
    p?.image,
    p?.banner || p?.banner_url,
    Array.isArray(p?.images) ? p.images[0] : "",
    "/assets/images/space.webp",
  ];

  const seen = new Set();
  return raw
    .map(toPublicImageUrl)
    .filter(Boolean)
    .filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    });
};

const handleArchiveImageError = (event) => {
  const img = event.currentTarget;
  const candidates = String(img.dataset.imageCandidates || "")
    .split("\n")
    .filter(Boolean);
  const currentIndex = Number(img.dataset.imageIndex || 0);
  const nextIndex = currentIndex + 1;

  if (nextIndex < candidates.length) {
    img.dataset.imageIndex = String(nextIndex);
    img.src = candidates[nextIndex];
    return;
  }

  img.onerror = null;
  img.src = "/assets/images/space.webp";
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    setMatches(mql.matches);

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

export default function Archive({ posts = [] }) {
  const router = useRouter();

  const [yearPage, setYearPage] = useState(0);
  const [selectedYear, setSelectedYear] = useState(START_YEAR);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");

  const yearsForPage = useMemo(() => {
    const years = [];
    const startIndex = yearPage * YEARS_PER_PAGE;
    for (let i = 0; i < YEARS_PER_PAGE; i++) {
      const year = START_YEAR - (startIndex + i);
      if (year < END_YEAR) break;
      years.push(year);
    }
    return years;
  }, [yearPage]);

  const dbPosts = useMemo(() => {
    const seen = new Set();

    return arr(posts)
      .filter((p) => p?.slug && p?.title)
      .filter((p) => {
        if (seen.has(p.slug)) return false;
        seen.add(p.slug);
        return true;
      })
      .map((p) => ({
        ...p,
        categoriesNormalized: normalizeCategoryArray(p),
        dateObj: toDate(p),
      }))
      .sort((a, b) => b.dateObj - a.dateObj);
  }, [posts]);

  const dynamicDbCategories = useMemo(() => {
    const set = new Set();

    dbPosts.forEach((post) => {
      (post.categoriesNormalized || []).forEach((cat) => {
        if (!cat) return;
        if (
          !BASE_CATEGORIES.includes(cat) &&
          !Object.keys(TOPIC_GROUPS).includes(cat)
        ) {
          set.add(cat);
        }
      });
    });

    return [...set].sort((a, b) => a.localeCompare(b));
  }, [dbPosts]);

  const allCategories = useMemo(() => {
    return [
      ...BASE_CATEGORIES,
      ...dynamicDbCategories.filter((c) => !BASE_CATEGORIES.includes(c)),
    ];
  }, [dynamicDbCategories]);

  const SCROLL_OFFSET = 250;

  const scrollWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const g =
      typeof router.query.group === "string"
        ? decodeURIComponent(router.query.group)
        : null;
    if (g && allCategories.includes(g)) {
      setSelectedCategory(g);
      setCategoriesOpen(true);
      setTimeout(() => scrollWithOffset("archive-content"), 50);
    }
  }, [router.query.group, allCategories]);

  const filteredPosts = useMemo(() => {
    const allPosts = dbPosts;

    if (selectedCategory === "All") return allPosts;

    if (selectedCategory === "Recent") {
      return allPosts.filter((post) => isRecentPost(post, allPosts));
    }

    if (selectedCategory === "Popular") {
      return allPosts.filter((post) => isPopularPost(post));
    }

    if (selectedCategory === "Favorites") {
      return allPosts.filter((post) => isFavoritePost(post));
    }

    if (selectedCategory === "Book Reviews") {
      return allPosts.filter((post) => isBookReviewPost(post));
    }

    if (selectedCategory in TOPIC_GROUPS) {
      const members = new Set(
        TOPIC_GROUPS[selectedCategory].map((x) => x.toLowerCase())
      );
      return allPosts.filter((post) =>
        (post.categoriesNormalized || []).some((cat) =>
          members.has(cat.toLowerCase())
        )
      );
    }

    return allPosts.filter((post) =>
      (post.categoriesNormalized || []).some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [selectedCategory, dbPosts]);

  const postsByYearMonth = useMemo(() => {
    const obj = {};
    filteredPosts.forEach((post) => {
      const year = post.dateObj.getFullYear();
      const month = post.dateObj.toLocaleDateString("en-US", { month: "long" });
      if (!obj[year]) obj[year] = {};
      if (!obj[year][month]) obj[year][month] = [];
      obj[year][month].push(post);
    });
    return obj;
  }, [filteredPosts]);

  const monthsAvailable = postsByYearMonth[selectedYear]
    ? Object.keys(postsByYearMonth[selectedYear])
    : [];

  const monthsToShow = MONTHS_DESC.filter((m) => monthsAvailable.includes(m));

  const [loadedYears, setLoadedYears] = useState([START_YEAR - 1]);
  const sentinelRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const lastYear = loadedYears[loadedYears.length - 1];
          if (lastYear > END_YEAR) {
            setLoadedYears((prev) => [...prev, lastYear - 1]);
          }
        }
      },
      { rootMargin: "200px" }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loadedYears]);

  const CARD_W = 280;
  const CARD_GAP = 24;

  const cardStyle = {
    backgroundColor: "var(--c-bg)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    userSelect: "none",
    width: CARD_W,
    height: 380,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderRadius: 6,
  };

  const imgStyle = {
    width: "100%",
    height: 300,
    objectFit: "cover",
    display: "block",
    flex: "0 0 auto",
  };

  const captionStyle = {
    padding: "8px 10px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: "1 1 auto",
    position: "relative",
    background: "transparent",
  };

  const captionTitleStyle = {
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "var(--c-text-primary)",
    lineHeight: 1.25,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const captionAuthorStyle = {
    fontSize: "0.85rem",
    color: "var(--c-text-secondary)",
    textAlign: "right",
    lineHeight: 1.2,
    marginTop: "auto",
  };

  const renderMonthRow = (key, postsForMonth) => {
    const gridTemplateColumns = isMobile
      ? "minmax(0, 1fr)"
      : isTablet
        ? `repeat(2, ${CARD_W}px)`
        : `repeat(3, ${CARD_W}px)`;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns,
          gap: CARD_GAP,
          width: "100%",
          justifyContent: isMobile ? "stretch" : "start",
        }}
      >
        {postsForMonth.map((post) => {
          const author = post.author || "Tobin Albanese";
          const imageCandidates = pickImgCandidates(post);

          return (
            <Link
              href={`/MidnightBureau/${post.slug}`}
              key={post.slug}
              legacyBehavior
            >
              <a
                className="archive-card"
                style={{
                  ...cardStyle,
                  width: isMobile ? "100%" : CARD_W,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={imageCandidates[0] || pickImg(post)}
                  data-image-candidates={imageCandidates.join("\n")}
                  data-image-index="0"
                  alt={post.title}
                  onError={handleArchiveImageError}
                  style={imgStyle}
                />
                <div style={captionStyle}>
                  <div style={captionTitleStyle} title={post.title}>
                    {post.title}
                  </div>
                  <div style={captionAuthorStyle}>{author}</div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderMonthHeader = (_key, monthLabel, yearLabel) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          userSelect: "none",
          gap: 16,
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--c-text-primary)",
            textTransform: "uppercase",
            margin: 0,
            flex: "1 1 auto",
            minWidth: 0,
          }}
        >
          {monthLabel} {yearLabel}
        </h2>
      </div>
    );
  };

  return (
    <>
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
          <MBHeroGallery images={galleryImages} />

          <div id="archive-content" />

          <main
            style={{
              maxWidth: 1440,
              margin: "24px auto 60px",
              padding: "0 24px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 24 : 48,
              userSelect: "none",
            }}
          >
            <aside
              style={{
                flex: isMobile ? "0 0 auto" : "0 0 200px",
                width: isMobile ? "100%" : undefined,
                marginBottom: isMobile ? 0 : "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingTop: 0,
              }}
            >
              <div
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                style={{
                  padding: "6px 12px",
                  marginBottom: 12,
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  border: "2px solid var(--c-accent)",
                  borderRadius: 4,
                  backgroundColor: categoriesOpen
                    ? "var(--c-bg-secondary)"
                    : "transparent",
                  color: categoriesOpen
                    ? "var(--c-text-third)"
                    : "var(--c-text)",
                  userSelect: "none",
                  transition: "transform 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: isMobile ? "100%" : undefined,
                }}
              >
                <span style={{ paddingTop: "4px" }}>Categories</span>

                <svg
                  className={`ham ham6 ${categoriesOpen ? "active" : ""}`}
                  viewBox="0 0 100 100"
                  width="32"
                  style={{ marginLeft: 8 }}
                >
                  <path
                    className="line top"
                    d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
                  />
                  <path
                    className="line middle"
                    d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
                  />
                  <path
                    className="line bottom"
                    d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
                  />
                </svg>
              </div>

              {categoriesOpen && (
                <ul
                  style={{
                    paddingLeft: 0,
                    marginTop: 4,
                    maxHeight: isMobile ? 320 : undefined,
                    overflowY: isMobile ? "auto" : undefined,
                    WebkitOverflowScrolling: isMobile ? "touch" : undefined,
                  }}
                >
                  {allCategories.map((cat) => (
                    <li
                      key={cat}
                      style={{ listStyle: "none", marginBottom: 8 }}
                    >
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          fontWeight: selectedCategory === cat ? "600" : "400",
                          color:
                            selectedCategory === cat
                              ? "var(--c-text-third)"
                              : "var(--c-text-secondary)",
                          backgroundColor:
                            selectedCategory === cat
                              ? "var(--c-bg-secondary)"
                              : "transparent",
                          borderLeft:
                            selectedCategory === cat
                              ? "4px solid #d62827"
                              : "4px solid transparent",
                          padding: "8px 16px",
                          margin: 0,
                          cursor: "pointer",
                          boxShadow:
                            selectedCategory === cat
                              ? "inset 4px 0 0 0 #d62827"
                              : "none",
                          borderRadius: 4,
                          textAlign: "left",
                          width: "100%",
                          transition: "background-color 0.3s, box-shadow 0.3s",
                          userSelect: "none",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 1.2,
                          minHeight: 40,
                        }}
                        aria-current={
                          selectedCategory === cat ? "true" : undefined
                        }
                        title={cat}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </aside>

            <section
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                gap: 48,
                minWidth: 0,
              }}
            >
              {monthsToShow.length === 0 ? (
                <p
                  style={{
                    color: "var(--c-text-secondary)",
                    fontStyle: "italic",
                    textAlign: "center",
                    marginTop: 48,
                    userSelect: "text",
                  }}
                >
                  No posts found for {selectedYear} in "{selectedCategory}"
                  category.
                </p>
              ) : (
                monthsToShow.map((month) => {
                  const key = `${selectedYear}-${month}`;
                  const postsForMonth =
                    postsByYearMonth[selectedYear][month] || [];

                  return (
                    <article key={key}>
                      {renderMonthHeader(
                        key,
                        month,
                        selectedYear,
                        postsForMonth
                      )}

                      <div
                        style={{
                          height: 4,
                          width: isMobile ? "100%" : 600,
                          maxWidth: 600,
                          backgroundColor: "#d62827",
                          margin: "0 0 24px 0",
                        }}
                      />

                      {renderMonthRow(key, postsForMonth)}
                    </article>
                  );
                })
              )}

              {loadedYears.map((year) => {
                const monthsAvail = postsByYearMonth[year]
                  ? Object.keys(postsByYearMonth[year])
                  : [];
                const monthsToShowYear = MONTHS_DESC.filter((m) =>
                  monthsAvail.includes(m)
                );

                return monthsToShowYear.map((month) => {
                  const key = `${year}-${month}`;
                  const postsForMonth = postsByYearMonth[year][month] || [];

                  return (
                    <article key={key}>
                      {renderMonthHeader(key, month, year, postsForMonth)}

                      <div
                        style={{
                          height: 4,
                          width: isMobile ? "100%" : 600,
                          maxWidth: 600,
                          backgroundColor: "#d62827",
                          margin: "0 0 24px 0",
                        }}
                      />

                      {renderMonthRow(key, postsForMonth)}
                    </article>
                  );
                });
              })}

              <div ref={sentinelRef} style={{ height: 1 }} />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const supabase = getServerSupabase();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, type, title, slug, excerpt, status, is_published, published_at, created_at, banner_url, archive_image_url, author, date, category"
    )
    .eq("type", "mb")
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.log("Archive SSR posts error:", error);
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
      console.log("Archive SSR post_images error:", imageErr);
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
        published_at: p.published_at || null,
        created_at: p.created_at || null,
        banner: resolvedBanner || resolvedFirstInline || "",
        image:
          resolvedArchive ||
          resolvedFirstInline ||
          resolvedBanner ||
          publicBucketUrl("space.webp", PUBLIC_BUCKET) ||
          "/assets/images/space.webp",
        archive_image_url: resolvedArchive || "",
        banner_url: resolvedBanner || "",
        images: [
          resolvedArchive || resolvedFirstInline || resolvedBanner,
        ].filter(Boolean),
      };
    });

  return { props: { posts: normalized } };
}
