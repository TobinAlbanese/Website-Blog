import { useState, useMemo } from "react";
import Link from "next/link";
import MidnightBureauData from "../../data/MidnightBureau";
import MetaHead from "../../components/LandingPage/MetaHead";
import SvgHead from "../../components/LandingPage/svgHead";
import Footer from "../../components/LandingPage/Footer";

const START_YEAR = 2025;
const END_YEAR = 1900;
const YEARS_PER_PAGE = 6;

const MONTHS_DESC = [
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
  "Book Reviews",
  "Popular",
  "Resources",
  "Culture",
  "Politics",
  "Favorites",
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
      ...MidnightBureauData.Recent,
      ...MidnightBureauData.Popular,
      ...MidnightBureauData.Archive,
      ...MidnightBureauData.BookReviews,
      ...MidnightBureauData.Resources,
    ]
      .map((p) => ({ ...p, dateObj: new Date(p.date) }))
      .sort((a, b) => b.dateObj - a.dateObj);
    return combined;
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;
    if (selectedCategory === "Book Reviews")
      return allPosts.filter((p) =>
        MidnightBureauData.BookReviews.find((q) => q.slug === p.slug)
      );
    if (selectedCategory === "Popular")
      return allPosts.filter((p) =>
        MidnightBureauData.Popular.find((q) => q.slug === p.slug)
      );
    if (selectedCategory === "Favorites")
      return allPosts.filter((p) => p.tags?.includes("Favorite"));
    return allPosts.filter(
      (p) =>
        p.category === selectedCategory || p.tags?.includes(selectedCategory)
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

  const handlePrevYears = () => {
    if (yearPage > 0) setYearPage(yearPage - 1);
  };
  const handleNextYears = () => {
    if (yearPage < totalPages - 1) setYearPage(yearPage + 1);
  };

  return (
    <>
      <MetaHead />
      <SvgHead />


{/*NAVBAR*/}
  <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
    <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
      <div id="js-dfp-tag-top--2"></div>
    </div>
    <div id="js-dfp-tag-outofpage--2"></div>
    <div className="base ">
      <div className="base__nav">
        <nav className="site-nav" aria-label="primary">
          <div className="site-nav__inner d-flex pt-20 pb-10 pt-md-40">
            <ul className="site-nav__list d-flex left">
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Personal/About"
                >
                  About
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Personal/Contact"
                >
                  Contact
                </a>
              </li>
<li className="site-nav__list-item d-flex show-desktop site-nav__dropdown">
    <a className="site-nav__link body-s-smallcaps" href="#">Explore</a>
  <ul className="site-nav__dropdown-menu">
    <li><a href="/MidnightBureau/Archive">Archive</a></li>
    <li><a href="/MidnightBureau/Media">Media</a></li>
    <li><a href="/MidnightBureau/Projects">Projects</a></li>
    <li><a href="/MidnightBureau/Events">Events</a></li>
    <li><a href="/MidnightBureau/FAQs">FAQs</a></li>
  </ul>   
</li>
              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
            </ul>
            <a href="/" className="site-nav__logo-link d-block">
              <svg viewBox="0 0 130 53" className="site-nav__logo">
                <use href="#fa-logo" />
              </svg>
              <span className="visually-hidden">Tobin Albanese</span>
            </a>
            <ul className="site-nav__list d-flex right">
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Newsletter"
                >
                  Newsletters
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/user/login"
                >
                  Log In
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/user/login"
                >
                  Log In
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
              <li className="site-nav__list-item">
                <button
                  id="menu-toggle"
                  aria-expanded="false"
                  className="site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps"
                >
                  <span className="site-nav__menu-btn-label js--menu-toggle-label">
                    Menu
                  </span>
                  <svg className="site-nav__menu-btn-icon" aria-hidden="true">
                    <use href="#icon-menu-search" />
                  </svg>
                  <svg className="site-nav__close-icon" aria-hidden="true">
                    <use href="#icon-x" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <nav
          className="site-nav--sticky c-bg-border position-fixed w-100 top-0 z-above-everything"
          aria-label="primary"
        >
          <div className="site-nav__inner d-flex">
            <ul className="site-nav__list d-flex left">
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Personal/About"
                >
                  About
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/BookReviews"
                >
                  
                </a>
              </li>
<li className="site-nav__list-item d-flex show-desktop site-nav__dropdown">
    <a className="site-nav__link body-s-smallcaps" href="#">Explore</a>
  <ul className="site-nav__dropdown-menu">
    <li><a href="/MidnightBureau/Archive">Archive</a></li>
    <li><a href="/MidnightBureau/Media">Media</a></li>
    <li><a href="/MidnightBureau/Projects">Projects</a></li>
    <li><a href="/MidnightBureau/Events">Events</a></li>
    <li><a href="/MidnightBureau/FAQs">FAQs</a></li>
  </ul>
</li>

              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
            </ul>
            <span className="site-nav__current-article ellipsis d-none d-md-inline-block flex-1" />
            <a
              href="/"
              className="site-nav__logo-link--horizontal d-none ml-md-150 mr-md-150"
            >
              <svg viewBox="0 0 195 20" className="site-nav__logo">
                <use href="#fa-logo-h" />
              </svg>
              <span className="visually-hidden">Tobin Albanese</span>
            </a>
            <ul className="site-nav__list d-flex right">
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Newsletter"
                >
                  Newsletters
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/user/login"
                >
                  Log In
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/user/login"
                >
                  Log In
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/MidnightBureau"
                >
                 Midnight Bureau
                </a>
              </li>
              <li className="site-nav__list-item">
                <button
                  id="menu-toggle"
                  aria-expanded="false"
                  className="site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps"
                >
                  <span className="site-nav__menu-btn-label js--menu-toggle-label">
                    Menu
                  </span>
                  <svg className="site-nav__menu-btn-icon" aria-hidden="true">
                    <use href="#icon-menu-search" />
                  </svg>
                  <svg className="site-nav__close-icon" aria-hidden="true">
                    <use href="#icon-x" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </nav>
       
       
       
       
       
       
       
       
       
       
        <nav
          className="js--menu theme-accent"
          aria-hidden="true"
          aria-labelledby="menu-toggle"
        >
          <div className="menu__content col-12 col-xl-10">
            <ul className="menu__nav-links mt-30 d-md-flex">
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Recent"
                >
                  Current Issue
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Archive"
                >
                  Archive
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Archive"
                >
                  Archive
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/BookReviews"
                >
                  Books
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/BookReviews"
                >
                  Books
                </a>
              </li>
<li className="site-nav__list-item d-flex show-tablet site-nav__dropdown">
    <a className="site-nav__link body-s-smallcaps" href="#">Explore</a>
  <ul className="site-nav__dropdown-menu">
    <li><a href="/MidnightBureau/Archive">Archive</a></li>
    <li><a href="/MidnightBureau/Media">Media</a></li>
    <li><a href="/MidnightBureau/Projects">Projects</a></li>
    <li><a href="/MidnightBureau/Events">Events</a></li>
    <li><a href="/MidnightBureau/FAQs">FAQs</a></li>
  </ul>
</li>

<li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item">
  <details>
    <summary className="site-nav__link body-s-smallcaps">Portfolio</summary>
    <ul>
      <li><a href="/MidnightBureau/Projects">Projects</a></li>
      <li><a href="/MidnightBureau/Media">Media</a></li>
      <li><a href="/MidnightBureau/Archive">Archive</a></li>
      <li><a href="/MidnightBureau/Events">Events</a></li>
      <li><a href="/MidnightBureau/FAQs">FAQs</a></li>
    </ul>
  </details>
</li>

              <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Newsletter"
                >
                  Newsletters
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau/Newsletter"
                >
                  Newsletters
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/user/login"
                >
                  Log In
                </a>
              </li>
            </ul>
            <div className="search-form position-relative w-100 theme-accent mt-30 mb-60">
              <svg className="search-form__icon" aria-hidden="true">
                <use xlinkHref="#icon-search" />
              </svg>
              <form
                type="post"
                action="/search"
                role="search"
                onSubmit="faSearch(this)"
                className="search-form__form"
              >
                <input
                  className="search-form__input border-zero border-radius-small pt-15 pb-15 pl-50 pr-30 c-bg-secondary"
                  type="search"
                  name="fa_search_keyword"
                  placeholder="Search to expand filter options"
                />
                <button
                  type="submit"
                  title="Submit the search query"
                  hidden=""
                  onClick="event.preventDefault(); faSearch(event.currentTarget.parentElement);"
                >
                  Search{" "}
                </button>
              </form>
            </div>
            <div className="menu__section d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10 mt-30 mb-80">
              <div className="menu__topics col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Browse by Section</p>
                <ul>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Archive">Blog Archive</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Recent">Recent Posts</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Popular">Popular Posts</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Categories">Categories</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Archive">Archive</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Personal/Contact">Contact</a>
                  </li>
                </ul>
              </div>

{/*CHANGE THIS*/}
              <div className="menu__issues col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Recent Posts</p>
                <ul className="menu__issues-list d-flex">
                  <li>
                    <a className="menu__post-link" href="/MidnightBureau/post-1">
                      <figure className="">
                        <img
                          src=""
                          alt=""
                          className=""
                          loading="lazy"
                          width={160}
                          height={228}
                          srcSet=""
                          sizes="(max-width: 767px) 26vw, (min-width: 1024px) 100vw"
                        />
                      </figure>
                      <span className="body-xs-smallcaps fs-15 d-inline-block pt-5">
                        Post 1
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="menu__post-link" href="/MidnightBureau/post-2">
                      <figure className="">
                        <img
                          src=""
                          alt=""
                          className=""
                          loading="lazy"
                          width={160}
                          height={228}
                          srcSet=""
                          sizes="(max-width: 767px) 26vw, (min-width: 1024px) 100vw"
                        />
                      </figure>
                      <span className="body-xs-smallcaps fs-15 d-inline-block pt-5">
                        Post 2
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="menu__post-link" href="/MidnightBureau/post-3">
                      <figure className="">
                        <img
                          src=""
                          alt="Post 3"
                          className=""
                          loading="lazy"
                          width={160}
                          height={228}
                          srcSet=""
                          sizes="(max-width: 767px) 26vw, (min-width: 1024px) 100vw"
                        />
                      </figure>
                      <span className="body-xs-smallcaps fs-15 d-inline-block pt-5">
                        Post 3
                      </span>
                    </a>
                  </li>
                </ul>


                <div>
                  <p className="menu__overline mb-20 mt-40">Browse by Topic</p>
                  <ul className="menu__links pt-30 pt-md-0">
                    <li className="menu__links--list-item mb-5">
                      <a href="/topics/trump-administration">
                        Trump Administration
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/tags/war-ukraine">War in Ukraine</a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/tags/israeli-palestinian-conflict">
                        Israeli-Palestinian Conflict
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/tags/us-chinese-relations">
                        US-China Relations
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/tags/tariffs">Tariffs</a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/topics/geopolitics">Geopolitics</a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/tags/artificial-intelligence">
                        Artificial Intelligence
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a href="/topics/us-foreign-policy">
                        U.S. Foreign Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
            <hr className="menu__divider border-zero mb-20" />
            <div className="menu__section d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10">
              <div className="menu__about col-12 col-sm-6 col-lg-4-base-10">
                <p>
                  Hi, I'm <em>Tobin Albanese</em>
                  A Computer Science student and writer passionate about strategic intelligence, 
                  global affairs, and current events. This blog shares my thoughts, analyses, and
                  personal insights across a wide range of topics including politics, technology, and culture.
                </p>
                <a
                  className="mt-30 arrow-link border-bottom-thin border-bottom d-inline-block lh-22"
                  href="/Personal/About"
                >
                  More About Me 
                  <svg className="arrow-link__icon ">
                    <use href="#icon-right-arrow" />
                  </svg>
                </a>
              </div>


              <div className="col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">More Resources</p>
                <ul className="menu__links pt-30 pt-md-0">
                  <li className="menu__links--list-item mb-5">
                    <a href="/Personal/Contact">Contact</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
  <details>
    <summary className="site-nav__link body-s-smallcaps">Portfolio</summary>
    <ul>
      <li><a href="/MidnightBureau/Projects">Projects</a></li>
      <li><a href="/MidnightBureau/Media">Media</a></li>
      <li><a href="/MidnightBureau/Archive">Archive</a></li>
      <li><a href="/MidnightBureau/Events">Events</a></li>
      <li><a href="/MidnightBureau/Contact">Contact</a></li>
    </ul>
  </details>
</li>

                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Newsletter">NewsLetter</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Archive"></a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Archive">Archive</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/Albanlytica/Archives">Blog Archive</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Media">Media</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/FAQ">/FAQs</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Resources">Albanlytica Resources</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Projects">Projects & Events</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="colophon_bg position-fixed c-fill-secondary translatey-50 w-50-sm w-70"
          >
            <svg height={100} width={100}>
              <use xlinkHref="#colophon" />
            </svg>
          </div>
        </nav>
      </div>
      <div className="messages--container z-base">
        <div data-drupal-messages-fallback="" className="hidden" />
      </div>
    











      {/* Header Image */}
      <section
        style={{
          height: 450,
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url('/assets/images/space.jpg') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--c-text-primary)",
          }}
        >
          Midnight Bureau Archive
        </h1>
      </section>

      {/* Years bar with pagination arrows */}
      <nav
        aria-label="Year selection"
        style={{
          maxWidth: 1400,
          margin: "24px auto 0",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <button
          onClick={handlePrevYears}
          disabled={yearPage === 0}
          aria-label="Previous years"
          style={{
            cursor: yearPage === 0 ? "default" : "pointer",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            color: yearPage === 0 ? "var(--c-text-secondary)" : "var(--c-text-primary)",
            marginRight: 16,
          }}
        >
          &#8592;
        </button>

        <ul
          style={{
            display: "flex",
            gap: 24,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {yearsForPage.map((year) => (
            <li key={year}>
              <button
                onClick={() => setSelectedYear(year)}
                aria-current={selectedYear === year ? "true" : undefined}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: selectedYear === year ? 700 : 400,
                  fontSize: selectedYear === year ? "2rem" : "1.5rem", // bigger font
                  color:
                    selectedYear === year
                      ? "var(--c-text-primary)"
                      : "var(--c-text-secondary)",
                  borderBottom:
                    selectedYear === year
                      ? "4px solid #d62827"
                      : "4px solid transparent", // thicker underline
                  paddingBottom: 8,
                  margin: "0 20px", // more horizontal spacing
                  transition: "font-size 0.3s ease, border-bottom 0.3s ease",
                }}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleNextYears}
          disabled={yearPage === totalPages - 1}
          aria-label="Next years"
          style={{
            cursor: yearPage === totalPages - 1 ? "default" : "pointer",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            color:
              yearPage === totalPages - 1 ? "var(--c-text-primary)" : "var(--c-text-primary)",
            marginLeft: 16,
          }}
        >
          &#8594;
        </button>
        
      </nav>
      {/* Red line separator */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          borderTop: "4px solid #d62827",
        }}
      />

      {/* Main content area: categories dropdown left, posts right */}
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
        {/* Categories dropdown (left column) */}
        <aside style={{ flex: "0 0 150px", marginTop: "60px" }}>
          <button
            className="categories-toggle-btn"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            aria-expanded={categoriesOpen}
            aria-controls="categories-list"
            aria-haspopup="true"
            style={{ fontSize: "1.25rem"}}
          >
            Categories
            <span
              style={{
                display: "inline-block",
                transform: categoriesOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                marginLeft: 8,
                fontSize: "1rem",
              }}
            >
              &#9776;
            </span>
          </button>

          {categoriesOpen && (
            <ul className="categories-list" id="categories-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      // optionally close menu after select
                      // setCategoriesOpen(false);
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

        {/* Posts container (right column) */}
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
            monthsToShow.map((month) => (
              <article key={`${selectedYear}-${month}`}>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--c-text-primary)",
                    marginBottom: 16,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  {month} {selectedYear}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 24,
                  }}
                >
                  {postsByYearMonth[selectedYear][month].map((post) => (
                    <Link
                      href={`/Albanylitica/${post.slug}`}
                      key={post.slug}
                      legacyBehavior
                    >
                      <a
                        className="archive-card"
                        style={{
                          backgroundColor: "var(--c-bg-primary)",
                          borderRadius: 8,
                          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                          overflow: "hidden",
                          textDecoration: "none",
                          color: "var(--c-text-primary)",
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                          userSelect: "none",
                          transition: "transform 0.2s, box-shadow 0.2s",
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
                        <div
                          style={{
                            height: 200,
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>

                        <div style={{ padding: "12px 14px", flexGrow: 1 }}>
                          <h4
                            style={{
                              fontSize: "1rem",
                              fontWeight: 700,
                              marginBottom: 8,
                              color: "var(--c-text-primary)",
                            }}
                          >
                            {post.title}
                          </h4>
                          <time
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--c-text-secondary)",
                            }}
                            dateTime={post.dateObj.toISOString()}
                          >
                            {post.dateObj.toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <Footer />
        </div>
      </div>
    </>
  );
}
