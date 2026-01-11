// pages/MidnightBureau/Archive.jsx (or wherever this file lives)
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

const META_CATEGORIES = ["All", "Recent", "Popular", "Favorites", "Book Reviews"];

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

// ---------- small safety helpers ----------
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

// ---------- tiny media hook (layout-only response) ----------
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

export default function Archive() {
  const totalYears = START_YEAR - END_YEAR + 1;
  const totalPages = Math.ceil(totalYears / YEARS_PER_PAGE);

  const [yearPage, setYearPage] = useState(0);
  const [selectedYear, setSelectedYear] = useState(START_YEAR);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Breakpoints:
  // - Mobile: <= 767
  // - Tablet: 768 - 1024
  // Desktop: >= 1025
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const isSmallScreen = isMobile || isTablet;

  // Viewport cards per row (locked)
  // Desktop: 3, Tablet: 2, Mobile: 1
  const viewCount = isMobile ? 1 : isTablet ? 2 : 3;

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

  // ---------- build safely + dedupe ----------
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

    const seen = new Set();
    const deduped = combined.filter((p) => {
      if (!p?.slug) return false;
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });

    return deduped
      .map((p) => ({ ...p, dateObj: toDate(p) }))
      .sort((a, b) => b.dateObj - a.dateObj);
  }, []);

  // ---------- safe filters ----------
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;

    if (selectedCategory === "Book Reviews") {
      const pool = new Set(arr(MidnightBureauData?.BookReviews).map((q) => q.slug));
      return allPosts.filter((p) => pool.has(p.slug));
    }
    if (selectedCategory === "Popular") {
      const pool = new Set(arr(MidnightBureauData?.Popular).map((q) => q.slug));
      return allPosts.filter((p) => pool.has(p.slug));
    }
    if (selectedCategory === "Favorites") {
      return allPosts.filter((p) => Array.isArray(p.tags) && p.tags.includes("Favorite"));
    }
    if (selectedCategory === "Recent") {
      const pool = new Set(arr(MidnightBureauData?.Recent).map((q) => q.slug));
      return allPosts.filter((p) => pool.has(p.slug));
    }

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

  const monthsAvailable = postsByYearMonth[selectedYear] ? Object.keys(postsByYearMonth[selectedYear]) : [];
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

  // IMPORTANT: keep your visual sizing the same; just make scroll math consistent and rows responsive
  const CARD_W = 280;
  const CARD_GAP = 24;

  // Locked viewport width by breakpoint:
  // Desktop: 3 cards, Tablet: 2 cards, Mobile: 1 card
  const VIEWPORT_W = viewCount * CARD_W + (viewCount - 1) * CARD_GAP;

  const scrollMonth = (key, direction) => {
    const container = scrollRefs.current[key];
    if (!container) return;

    const cardWidth = CARD_W + CARD_GAP;

    // Scroll exactly one “viewport page”
    const scrollAmount = cardWidth * viewCount;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    const newScrollLeft =
      direction === "right"
        ? Math.min(container.scrollLeft + scrollAmount, maxScrollLeft)
        : Math.max(container.scrollLeft - scrollAmount, 0);

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  // --- CARD + IMAGE + CAPTION (kept same look) ---
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
const headerArrowFontSize = isMobile ? 40 : isTablet ? 60 : 28;


  const headerScrollButtonStyle = {
  cursor: "pointer",
  border: "none",
  background: "none",

  // 🎯 breakpoint-controlled size
  fontSize: headerArrowFontSize,

  // generous tap target for touch devices
  padding: "6px 10px",

  fontWeight: 600,
  color: "var(--c-accent)",
  userSelect: "none",
  lineHeight: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "transform 0.15s ease, opacity 0.15s ease",
};


  const router = useRouter();
  useEffect(() => {
    const g = typeof router.query.group === "string" ? decodeURIComponent(router.query.group) : null;
    if (g && CATEGORIES.includes(g)) {
      setSelectedCategory(g);
      setCategoriesOpen(true);
      setTimeout(() => scrollWithOffset("archive-content"), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.group]);

  const SCROLL_OFFSET = 250;
  const scrollWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const renderMonthRow = (key, postsForMonth) => {
    const showScrollButtons = postsForMonth.length > viewCount;

    return (
      <>
        {/* Locked viewport wrapper:
            - Desktop: left aligned (3 cards)
            - Tablet: left aligned (2 cards)
            - Mobile: centered (1 card)
        */}
        <div
          style={{
            width: "100%",
            maxWidth: VIEWPORT_W,
            margin: isMobile ? "0 auto" : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: CARD_GAP,
              overflowX: "auto",
              scrollBehavior: "smooth",
              paddingBottom: 8,
              width: "100%",
              flexWrap: "nowrap", // ✅ never drop to next line
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            ref={(el) => (scrollRefs.current[key] = el)}
            className="hide-scrollbar"
          >
            {postsForMonth.map((post) => {
              const author = post.author || "Tobin Albanese";
              return (
                <Link href={`/MidnightBureau/${post.slug}`} key={post.slug} legacyBehavior>
                  <a
                    className="archive-card"
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img src={pickImg(post)} alt={post.title} style={imgStyle} />
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
        </div>

        {/* Desktop only: keep arrows below row (your original behavior) */}
        {!isSmallScreen && showScrollButtons && (
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <button aria-label={`Scroll ${key} left`} onClick={() => scrollMonth(key, "left")} style={scrollButtonStyle}>
              ‹
            </button>
            <button aria-label={`Scroll ${key} right`} onClick={() => scrollMonth(key, "right")} style={scrollButtonStyle}>
              ›
            </button>
          </div>
        )}
      </>
    );
  };

  const renderMonthHeader = (key, monthLabel, yearLabel, postsForMonth) => {
    const showHeaderArrows = isSmallScreen && postsForMonth.length > viewCount;

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

        {/* Tablet + Mobile: arrows to the right of date */}
        {showHeaderArrows && (
          <div style={{ display: "flex", gap: 10, alignItems: "center", flex: "0 0 auto" }}>
            <button
              aria-label={`Scroll ${key} left`}
              onClick={() => scrollMonth(key, "left")}
              style={headerScrollButtonStyle}
            >
              ‹
            </button>
            <button
              aria-label={`Scroll ${key} right`}
              onClick={() => scrollMonth(key, "right")}
              style={headerScrollButtonStyle}
            >
              ›
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <MetaHead />
      <SvgHead />

      <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
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

              // ✅ Mobile: stack sidebar above posts
              // ✅ Tablet+Desktop: keep sidebar left, posts right
              flexDirection: isMobile ? "column" : "row",

              gap: isMobile ? 24 : 48,
              userSelect: "none",
            }}
          >
            {/* SIDEBAR */}
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
                  backgroundColor: categoriesOpen ? "var(--c-bg-secondary)" : "transparent",
                  color: categoriesOpen ? "var(--c-text-third)" : "var(--c-text)",
                  userSelect: "none",
                  transition: "transform 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  // ✅ Mobile: button spans nicely
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

                    // ✅ Mobile: prevent gigantic dropdown; allow internal scroll
                    maxHeight: isMobile ? 320 : undefined,
                    overflowY: isMobile ? "auto" : undefined,
                    WebkitOverflowScrolling: isMobile ? "touch" : undefined,
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <li key={cat} style={{ listStyle: "none", marginBottom: 8 }}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          fontWeight: selectedCategory === cat ? "600" : "400",
                          color: selectedCategory === cat ? "var(--c-text-third)" : "var(--c-text-secondary)",
                          backgroundColor: selectedCategory === cat ? "var(--c-bg-secondary)" : "transparent",
                          borderLeft: selectedCategory === cat ? "4px solid #d62827" : "4px solid transparent",
                          padding: "8px 16px",
                          margin: 0,
                          cursor: "pointer",
                          boxShadow: selectedCategory === cat ? "inset 4px 0 0 0 #d62827" : "none",
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
                        aria-current={selectedCategory === cat ? "true" : undefined}
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
                minWidth: 0, // ✅ prevent overflow/side scroll from long content
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
                  No posts found for {selectedYear} in "{selectedCategory}" category.
                </p>
              ) : (
                monthsToShow.map((month) => {
                  const key = `${selectedYear}-${month}`;
                  if (!scrollRefs.current[key]) scrollRefs.current[key] = null;
                  const postsForMonth = postsByYearMonth[selectedYear][month] || [];

                  return (
                    <article key={key}>
                      {renderMonthHeader(key, month, selectedYear, postsForMonth)}

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

              {/* Loaded years (same rendering) */}
              {loadedYears.map((year) => {
                const monthsAvail = postsByYearMonth[year] ? Object.keys(postsByYearMonth[year]) : [];
                const monthsToShowYear = MONTHS_DESC.filter((m) => monthsAvail.includes(m));

                return monthsToShowYear.map((month) => {
                  const key = `${year}-${month}`;
                  if (!scrollRefs.current[key]) scrollRefs.current[key] = null;
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

              {/* sentinel (kept) */}
              <div ref={sentinelRef} style={{ height: 1 }} />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
