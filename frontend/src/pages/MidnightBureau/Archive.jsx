import { useRouter } from "next/router";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import MidnightBureauData from "../../data/MidnightBureau";
import MetaHead from "../../components/LandingPage/MetaHead";
import SvgHead from "../../components/LandingPage/svgHead";
import Footer from "../../components/LandingPage/Footer";
import MBHeroGallery from "../../components/LandingPage/MBHeroGallery";
import NavbarMB from "../../components/LandingPage/NavbarMB";

const START_YEAR = 2025;
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
  "Favorites",
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

const CATEGORIES = [...META_CATEGORIES, ...Object.keys(TOPIC_GROUPS)];

const galleryImages = [
  "/assets/images/Alina.jpg",
  "/assets/images/Cross.jpg",
  "/assets/images/Nuns.jpg",
  "/assets/images/Birds.jpg",
  "/assets/images/Croatia.jpg",
  "/assets/images/Iraq.jpg",
  "/assets/images/Italy.jpg",
  "/assets/images/Ocean.jpg",
  "/assets/images/Ocean2.jpg",
  "/assets/images/Pakistan.jpg",
  "/assets/images/Lincoln.jpg",
  "/assets/images/Russia2.jpg",
  "/assets/images/Russia3.jpg",
  "/assets/images/Russia5.jpg",
  "/assets/images/Russia4.jpg",
  "/assets/images/Russia6.jpg",
  "/assets/images/Syria.jpg",
  "/assets/images/Syria2.jpg",
  "/assets/images/WhiteHouse.jpg",
  "/assets/images/AFG2.jpg",
  "/assets/images/Space2.jpg",
  "/assets/images/AFG4.jpg",
  "/assets/images/AFG5.jpg",
  "/assets/images/Lucia2.jpg",
  "/assets/images/Russia.jpg",
  "/assets/images/Museum.jpg",
  "/assets/images/AFG.jpg",
  "/assets/images/Snowboard.jpg",
  "/assets/images/Snowboard2.jpg",
  "/assets/images/Snowboarding1.jpg",
];

// ---------- NEW: small safety helpers ----------
const arr = (x) => (Array.isArray(x) ? x : []);
const toDate = (p) => {
  const d = new Date(p?.date || p?.published || p?.createdAt || 0);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};
const pickImg = (p) =>
  p?.archiveImage ||
  p?.image ||
  p?.banner ||
  (Array.isArray(p?.images) ? p.images[0] : "") ||
  "/assets/images/space.jpg";

export default function Archive() {
  const totalYears = START_YEAR - END_YEAR + 1;
  const totalPages = Math.ceil(totalYears / YEARS_PER_PAGE);

  const [yearPage, setYearPage] = useState(0);
  const [selectedYear, setSelectedYear] = useState(START_YEAR);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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

  // ---------- FIX: build safely + dedupe ----------
  const allPosts = useMemo(() => {
    const spec = [
      ["Recent", "Recent"],
      ["Popular", "Popular"],
      ["BookReviews", "Book Reviews"],
      ["Culture", "Culture"],
      ["Defense", "Defense"],
      ["Diplomacy", "Diplomacy"],
      ["Economy", "Economy"],
      ["Energy", "Energy"],
      ["Environment", "Environment"],
      ["ForeignPolicy", "Foreign Policy"],
      ["Geopolitics", "Geopolitics"],
      ["Intelligence", "Intelligence"],
      ["MilitaryDefense", "Military"],
      ["Philosophy", "Philosophy"],
      ["Religion", "Religion"],
      ["Security", "Security"],
      ["Technology", "Technology"],
    ];

    const combined = spec.flatMap(([key, label]) =>
      arr(MidnightBureauData?.[key]).map((p) => ({ ...p, category: label }))
    );

    // dedupe by slug
    const seen = new Set();
    const deduped = combined.filter((p) => {
      if (!p?.slug) return false;
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });

    // add dateObj (resilient) and sort newest first
    return deduped
      .map((p) => ({ ...p, dateObj: toDate(p) }))
      .sort((a, b) => b.dateObj - a.dateObj);
  }, []);

  // ---------- FIX: safe filters when categories may be missing ----------
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;

    if (selectedCategory === "Book Reviews") {
      const pool = new Set(
        arr(MidnightBureauData?.BookReviews).map((q) => q.slug)
      );
      return allPosts.filter((p) => pool.has(p.slug));
    }
    if (selectedCategory === "Popular") {
      const pool = new Set(arr(MidnightBureauData?.Popular).map((q) => q.slug));
      return allPosts.filter((p) => pool.has(p.slug));
    }
    if (selectedCategory === "Favorites") {
      return allPosts.filter(
        (p) => Array.isArray(p.tags) && p.tags.includes("Favorite")
      );
    }
    if (selectedCategory === "Recent") {
      const pool = new Set(arr(MidnightBureauData?.Recent).map((q) => q.slug));
      return allPosts.filter((p) => pool.has(p.slug));
    }

    // Topic groups
    if (selectedCategory in TOPIC_GROUPS) {
      const members = new Set(TOPIC_GROUPS[selectedCategory]);
      return allPosts.filter((p) => members.has(p.category));
    }

    return allPosts;
  }, [selectedCategory, allPosts]);

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

  const scrollRefs = useRef({});
  const scrollMonth = (key, direction) => {
    const container = scrollRefs.current[key];
    if (!container) return;
    const cardWidth = 280 + 24;
    const scrollAmount = cardWidth * 4;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    let newScrollLeft =
      direction === "right"
        ? Math.min(container.scrollLeft + scrollAmount, maxScrollLeft)
        : Math.max(container.scrollLeft - scrollAmount, 0);
    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  const cardStyle = {
    backgroundColor: "var(--c-bg)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    userSelect: "none",
    width: 280,
    height: 380,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const scrollButtonStyle = {
    cursor: "pointer",
    border: "none",
    background: "none",
    fontSize: 36,
    fontWeight: 600,
    color: "var(--c-accent)",
    userSelect: "none",
    padding: 0,
    lineHeight: 1,
  };

  const heroRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const g =
      typeof router.query.group === "string"
        ? decodeURIComponent(router.query.group)
        : null;
    if (g && CATEGORIES.includes(g)) {
      setSelectedCategory(g);
      setCategoriesOpen(true);
      setTimeout(() => scrollWithOffset("archive-content"), 50);
    }
  }, [router.query.group]);

  const SCROLL_OFFSET = 250;
  const scrollWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
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
              gap: 48,
              userSelect: "none",
            }}
          >
            {/* SIDEBAR (unchanged) */}
            {/* ... your sidebar code stays the same ... */}
            <aside
              style={{
                flex: "0 0 200px",
                marginBottom: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingTop: 0,
              }}
            >
              {/* Categories Button */}
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
                <ul style={{ paddingLeft: 0, marginTop: 4 }}>
                  {CATEGORIES.map((cat) => (
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

            {/* Posts */}
            <section
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                gap: 48,
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
                  if (!scrollRefs.current[key]) scrollRefs.current[key] = null;

                  const postsForMonth =
                    postsByYearMonth[selectedYear][month] || [];
                  const showScrollButtons = postsForMonth.length > 4;

                  return (
                    <article key={key}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8,
                          userSelect: "none",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            color: "var(--c-text-primary)",
                            textTransform: "uppercase",
                            margin: 0,
                          }}
                        >
                          {month} {selectedYear}
                        </h2>
                        {showScrollButtons && (
                          <div style={{ display: "flex", gap: 12 }}>
                            <button
                              aria-label={`Scroll ${month} ${selectedYear} left`}
                              onClick={() => scrollMonth(key, "left")}
                              style={scrollButtonStyle}
                            >
                              ‹
                            </button>
                            <button
                              aria-label={`Scroll ${month} ${selectedYear} right`}
                              onClick={() => scrollMonth(key, "right")}
                              style={scrollButtonStyle}
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          height: 4,
                          width: 600,
                          backgroundColor: "#d62827",
                          margin: "0 0 24px 0",
                        }}
                      />

                      <div
                        ref={(el) => (scrollRefs.current[key] = el)}
                        style={{
                          display: "flex",
                          gap: 24,
                          overflowX: "auto",
                          scrollBehavior: "smooth",
                          paddingBottom: 8,
                          width: 280 * 4 + 24 * 3,
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                        className="hide-scrollbar"
                      >
                        {postsForMonth.map((post) => (
                          <Link
                            href={`/MidnightBureau/${post.slug}`}
                            key={post.slug}
                            legacyBehavior
                          >
                            <a
                              className="archive-card"
                              style={cardStyle}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-4px)";
                                e.currentTarget.style.boxShadow =
                                  "0 12px 20px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 12px rgba(0,0,0,0.1)";
                              }}
                            >
                              <img
                                src={pickImg(post)}
                                alt={post.title}
                                style={imgStyle}
                              />
                            </a>
                          </Link>
                        ))}
                      </div>
                    </article>
                  );
                })
              )}

              {/* Loaded years (same rendering) */}
              {loadedYears.map((year) => {
                const monthsAvail = postsByYearMonth[year]
                  ? Object.keys(postsByYearMonth[year])
                  : [];
                const monthsToShowYear = MONTHS_DESC.filter((m) =>
                  monthsAvail.includes(m)
                );

                return monthsToShowYear.map((month) => {
                  const key = `${year}-${month}`;
                  if (!scrollRefs.current[key]) scrollRefs.current[key] = null;

                  const postsForMonth = postsByYearMonth[year][month] || [];
                  const showScrollButtons = postsForMonth.length > 4;

                  return (
                    <article key={key}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8,
                          userSelect: "none",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            color: "var(--c-text-primary)",
                            textTransform: "uppercase",
                            margin: 0,
                          }}
                        >
                          {month} {year}
                        </h2>
                        {showScrollButtons && (
                          <div style={{ display: "flex", gap: 12 }}>
                            <button
                              aria-label={`Scroll ${month} ${year} left`}
                              onClick={() => scrollMonth(key, "left")}
                              style={scrollButtonStyle}
                            >
                              ‹
                            </button>
                            <button
                              aria-label={`Scroll ${month} ${year} right`}
                              onClick={() => scrollMonth(key, "right")}
                              style={scrollButtonStyle}
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          height: 4,
                          width: 600,
                          backgroundColor: "#d62827",
                          margin: "0 0 24px 0",
                        }}
                      />

                      <div
                        ref={(el) => (scrollRefs.current[key] = el)}
                        style={{
                          display: "flex",
                          gap: 24,
                          overflowX: "auto",
                          scrollBehavior: "smooth",
                          paddingBottom: 8,
                          width: 280 * 4 + 24 * 3,
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                        className="hide-scrollbar"
                      >
                        {postsForMonth.map((post) => (
                          <Link
                            href={`/MidnightBureau/${post.slug}`}
                            key={post.slug}
                            legacyBehavior
                          >
                            <a
                              className="archive-card"
                              style={cardStyle}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-4px)";
                                e.currentTarget.style.boxShadow =
                                  "0 12px 20px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 6px 12px rgba(0,0,0,0.1)";
                              }}
                            >
                              <img
                                src={pickImg(post)}
                                alt={post.title}
                                style={imgStyle}
                              />
                            </a>
                          </Link>
                        ))}
                      </div>
                    </article>
                  );
                });
              })}
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
