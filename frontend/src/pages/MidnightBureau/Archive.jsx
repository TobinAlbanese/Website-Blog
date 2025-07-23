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

const CATEGORIES = [
  "All",
  "Recent",
  "Popular",
  "Favorites",
  "Book Reviews",
  "Culture",
  "Defense",
  "Diplomacy",
  "Economy",
  "Energy",
  "Environment",
  "Foreign Policy",
  "Geopolitics",
  "Intelligence",
  "Military",
  "Philosophy",
  "Religion",
  "Security",
  "Technology",
];

const galleryImages = [
  "/assets/images/AboutMePhoto.jpg",
  "/assets/images/afroTob.jpg",
  "/assets/images/Alina.jpg",
  "/assets/images/Cross.jpg",
  "/assets/images/Dad&Tobin.jpg",
  "/assets/images/Dad&Tobin2.jpg",
  "/assets/images/Dylan&Tobin.jpg",
  "/assets/images/Family.jpg",
  "/assets/images/Tobin&Johnny.jpg",
  "/assets/images/Tobin&Gus.JPG",
  "/assets/images/TNJT.JPG",
  "/assets/images/Snowboard.jpg",
  "/assets/images/Pakistan.jpg",
  "/assets/images/SanFran.jpg",
  "/assets/images/Dad&BabyTob.jpg",
  "/assets/images/BabyTobin&Grammy.jpg",
  "/assets/images/AfroTob.jpg",
  "/assets/images/AfroTob.jpg",
  "/assets/images/AfroTob.jpg",
  "/assets/images/AfroTob.jpg",
];



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

  const allPosts = useMemo(() => {
    const combined = [
      ...MidnightBureauData.Recent.map((p) => ({ ...p, category: "Recent" })),
      ...MidnightBureauData.Popular.map((p) => ({ ...p, category: "Popular" })),
      ...MidnightBureauData.BookReviews.map((p) => ({ ...p, category: "Book Reviews" })),
      ...MidnightBureauData.Culture.map((p) => ({ ...p, category: "Culture" })),
      ...MidnightBureauData.Defense.map((p) => ({ ...p, category: "Defense" })),
      ...MidnightBureauData.Diplomacy.map((p) => ({ ...p, category: "Diplomacy" })),
      ...MidnightBureauData.Economy.map((p) => ({ ...p, category: "Economy" })),
      ...MidnightBureauData.Energy.map((p) => ({ ...p, category: "Energy" })),
      ...MidnightBureauData.Environment.map((p) => ({ ...p, category: "Environment" })),
      ...MidnightBureauData.ForeignPolicy.map((p) => ({ ...p, category: "Foreign Policy" })),
      ...MidnightBureauData.Geopolitics.map((p) => ({ ...p, category: "Geopolitics" })),
      ...MidnightBureauData.Intelligence.map((p) => ({ ...p, category: "Intelligence" })),
      ...MidnightBureauData.MilitaryDefense.map((p) => ({ ...p, category: "Military" })),
      ...MidnightBureauData.Philosophy.map((p) => ({ ...p, category: "Philosophy" })),
      ...MidnightBureauData.Religion.map((p) => ({ ...p, category: "Religion" })),
      ...MidnightBureauData.Security.map((p) => ({ ...p, category: "Security" })),
      ...MidnightBureauData.Technology.map((p) => ({ ...p, category: "Technology" })),
    ]
      .map((p) => ({ ...p, dateObj: new Date(p.date) }))
      .sort((a, b) => b.dateObj - a.dateObj);

    return combined;
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;

    if (selectedCategory === "Book Reviews") {
      return allPosts.filter((p) =>
        MidnightBureauData.BookReviews.some((q) => q.slug === p.slug)
      );
    }

    if (selectedCategory === "Popular") {
      return allPosts.filter((p) =>
        MidnightBureauData.Popular.some((q) => q.slug === p.slug)
      );
    }

    if (selectedCategory === "Favorites") {
      return allPosts.filter((p) => p.tags?.includes("Favorite"));
    }

    if (selectedCategory === "Recent") {
      return allPosts.filter((p) =>
        MidnightBureauData.Recent.some((q) => q.slug === p.slug)
      );
    }
    return allPosts.filter(
      (p) =>
        p.category === selectedCategory ||
        p.tags?.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase())
    );
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
      {
        rootMargin: "200px",
      }
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
    const cardWidth = 280 + 24; // card width + gap
    const scrollAmount = cardWidth * 4; // scroll 4 cards at a time

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    let newScrollLeft;

    if (direction === "right") {
      newScrollLeft = Math.min(container.scrollLeft + scrollAmount, maxScrollLeft);
    } else {
      newScrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
    }

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Card style for full image only
const cardStyle = {
    backgroundColor: "var(--c-bg)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    userSelect: "none",
    width: 280,
    height: 380, // slightly less tall, more book-like
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Image style stays same, fills card fully
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  // Scroll button style - thicker and bolder
  const scrollButtonStyle = {
    cursor: "pointer",
    border: "none",
    background: "none",
    fontSize: 36,
    fontWeight: "600",
    color: "var(--c-accent)",
    userSelect: "none",
    padding: 0,
    lineHeight: 1,
  };



const heroRef = useRef(null);







  return (
    <>
      <MetaHead />
      <SvgHead />











      {/*NAVBAR*/}
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

<MBHeroGallery />
















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
  
{/* SIDEBAR */}
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
        d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777
           -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913
           l -28.284272,28.284272"
      />
      <path
        className="line middle"
        d="m 70,50 c 0,0 -32.213436,0 -40,0
           -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429
           0,-5.895471 6.073743,-11.783399 12.286435,-5.570707
           6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
      />
      <path
        className="line bottom"
        d="m 69.575405,67.073826 h -40
           c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777
           24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913
           l 28.284272,-28.284272"
      />
    </svg>
  </div>

  {/* Category List */}
  {categoriesOpen && (
    <ul style={{ paddingLeft: 0, marginTop: 4 }}>
      {CATEGORIES.map((cat) => (
        <li key={cat} style={{ listStyle: "none", marginBottom: 8 }}>
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
            }}
            aria-current={selectedCategory === cat ? "true" : undefined}
          >
            {cat}
          </button>
        </li>
      ))}
    </ul>
  )}
</aside>


        {/* Posts container */}
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
              No posts found for {selectedYear} in "{selectedCategory}" category.
            </p>
          ) : (
            monthsToShow.map((month) => {
              const key = `${selectedYear}-${month}`;
              if (!scrollRefs.current[key]) scrollRefs.current[key] = null;

              const postsForMonth = postsByYearMonth[selectedYear][month];
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

                  {/* Red underline divider */}
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
                      width: 280 * 4 + 24 * 3, // 4 cards wide + 3 gaps
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE 10+
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
  src={post.archiveImage || post.image || post.banner}
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

          {/* Loaded years section (same changes apply) */}
          {loadedYears.map((year) => {
            const monthsAvailable = postsByYearMonth[year]
              ? Object.keys(postsByYearMonth[year])
              : [];
            const monthsToShow = MONTHS_DESC.filter((m) =>
              monthsAvailable.includes(m)
            );

            return monthsToShow.map((month) => {
              const key = `${year}-${month}`;
              if (!scrollRefs.current[key]) scrollRefs.current[key] = null;

              const postsForMonth = postsByYearMonth[year][month];
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
  src={post.archiveImage || post.image || post.banner}
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
