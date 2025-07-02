import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

export default function About() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const rightImage = document.getElementById("about-image-right");
      const leftImage = document.getElementById("about-image-left");

      if (rightImage) {
        const rectRight = rightImage.getBoundingClientRect();
        if (rectRight.top < window.innerHeight * 0.8) setVisibleRight(true);
      }
      if (leftImage) {
        const rectLeft = leftImage.getBoundingClientRect();
        if (rectLeft.top < window.innerHeight * 0.8) setVisibleLeft(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // check immediately on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <>
        <Head>
          <title>MetaHead</title>
          <meta charSet="utf-8" />
        </Head>

        <MetaHead />
      </>
      <>
        <Head>
          <title>svgHead</title>
          <meta charSet="utf-8" />
        </Head>

        <SvgHead />
      </>

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
          <div className="base__nav">
            <nav className="site-nav" aria-label="primary">
              <div className="site-nav__inner d-flex pt-20 pb-10 pt-md-40">
                <ul className="site-nav__list d-flex left">
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a className="site-nav__link body-s-smallcaps " href="/">
                      Home
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-tablet">
                    <a className="site-nav__link body-s-smallcaps " href="/">
                      Home
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/MidnightBureau/About"
                    >
                      About
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/MidnightBureau/Contact"
                    >
                      Contact
                    </a>
                  </li>

                  <li className="site-nav__list-item d-flex show-desktop site-nav__dropdown">
                    <a className="site-nav__link body-s-smallcaps" href="#">
                      Explore
                    </a>
                    <ul className="site-nav__dropdown-menu">
                      <li>
                        <a href="/MidnightBureau/Archive">Archive</a>
                      </li>
                      <li>
                        <a href="/MidnightBureau/Media">Media</a>
                      </li>
                      <li>
                        <a href="/MidnightBureau/Projects">Projects</a>
                      </li>
                      <li>
                        <a href="/MidnightBureau/Events">Events</a>
                      </li>
                      <li>
                        <a href="/MidnightBureau/FAQs">FAQs</a>
                      </li>
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
                      <svg
                        className="site-nav__menu-btn-icon"
                        aria-hidden="true"
                      >
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
                    <a className="site-nav__link body-s-smallcaps " href="/">
                      Home
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-tablet">
                    <a className="site-nav__link body-s-smallcaps " href="/">
                      Home
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/MidnightBureau/About"
                    >
                      About
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/MidnightBureau/BookReviews"
                    ></a>
                  </li>
                  <li className="site-nav__list-item d-flex show-desktop">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/Personal/Portfolio"
                    >
                      Portfolio
                    </a>
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
                      <svg
                        className="site-nav__menu-btn-icon"
                        aria-hidden="true"
                      >
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
                  <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/Personal/Portfolio"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                    <a
                      className="site-nav__link body-s-smallcaps "
                      href="/Personal/Portfolio"
                    >
                      Portfolio
                    </a>
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
                        <a href="/MidnightBureau/About">About Me</a>
                      </li>
                      <li className="menu__topics-list-item mb-10">
                        <a href="/MidnightBureau/Contact">Contact</a>
                      </li>
                    </ul>
                  </div>

                  {/*CHANGE THIS*/}
                  <div className="menu__issues col-12 col-sm-6 col-lg-4-base-10">
                    <p className="menu__overline mb-20">Recent Posts</p>
                    <ul className="menu__issues-list d-flex">
                      <li>
                        <a
                          className="menu__post-link"
                          href="/MidnightBureau/post-1"
                        >
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
                        <a
                          className="menu__post-link"
                          href="/MidnightBureau/post-2"
                        >
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
                        <a
                          className="menu__post-link"
                          href="/MidnightBureau/post-3"
                        >
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
                      <p className="menu__overline mb-20 mt-40">
                        Browse by Topic
                      </p>
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
                      Hi, I'm{" "}
                      <strong>
                        <em>Tobin Albanese</em>
                      </strong>
                      A Computer Science student and writer passionate about
                      strategic intelligence, global affairs, and current
                      events. This blog shares my thoughts, analyses, and
                      personal insights across a wide range of topics including
                      politics, technology, and culture.
                    </p>
                    <a
                      className="mt-30 arrow-link border-bottom-thin border-bottom d-inline-block lh-22"
                      href="/MidnightBureau/About"
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
                        <a href="/MidnightBureau/Contact">Contact</a>
                      </li>
                      <li className="site-nav__list-item d-flex show-tablet site-nav__dropdown">
                        <a className="site-nav__link body-s-smallcaps" href="#">
                          Explore
                        </a>
                        <ul className="site-nav__dropdown-menu">
                          <li>
                            <a href="/MidnightBureau/Archive">Archive</a>
                          </li>
                          <li>
                            <a href="/MidnightBureau/Media">Media</a>
                          </li>
                          <li>
                            <a href="/MidnightBureau/Projects">Projects</a>
                          </li>
                          <li>
                            <a href="/MidnightBureau/Events">Events</a>
                          </li>
                          <li>
                            <a href="/MidnightBureau/FAQs">FAQs</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/MidnightBureau/Newsletter">NewsLetters</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/MidnightBureau/About">About Me</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/Personal/Library">Library</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/Albanlytica/Archives">Blog Archive</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/Personal/Media">Media</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/Personal/FAQ">/FAQs</a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/MidnightBureau/Resources">
                          Albanlytica Resources
                        </a>
                      </li>
                      <li className="menu__links--list-item mb-5">
                        <a href="/Personal/Projects">Projects & Events</a>
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
          <div className="base__main row flex-column w-100" />

          <section
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: 40,
              fontFamily: "inherit",
            }}
          >
            {/* First section: text left, image right */}
            <div
              style={{
                display: "flex",
                gap: 40,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "600",
                    marginBottom: 10,
                  }}
                >
                  My Story...
                </h1>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I’m Tobin Albanese, a Computer Science student at Sacramento
                  State University with a deep interest in global intelligence
                  and national security. My academic path is grounded in
                  technical learning—software development, data systems, and
                  machine logic—yet it’s also shaped by a broader passion for
                  understanding how technology influences geopolitics, security
                  strategy, and international conflict.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I bring an interdisciplinary mindset to my work, combining
                  computer science with a growing knowledge base in political
                  science, cybersecurity, and international relations. I’m
                  fascinated by the ways in which emerging technologies are
                  transforming both modern warfare and diplomacy, and how
                  technical expertise can be used to improve intelligence
                  gathering, threat analysis, and strategic decision-making.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  Outside the classroom, I’m always learning—listening to
                  experts, reading across disciplines, and keeping a close eye
                  on global developments. Midnight Bureau is my way of
                  organizing those insights into something valuable for others.
                  It’s a space where I reflect, analyze, and contribute to the
                  public conversation on security, technology, and the future of
                  global affairs.
                </p>
              </div>

              <img
                id="about-image-right"
                src="/assets/images/tnjt.jpg"
                alt="Tobin Albanese"
                style={{
                  width: 250,
                  height: "100%",
                  borderRadius: 16,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  opacity: visibleRight ? 1 : 0,
                  transform: visibleRight
                    ? "translateX(0)"
                    : "translateX(50px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              />
            </div>

            {/* Main body section */}
            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              <p style={{ color: "var(--c-text-secondary)" }}>
                When I’m not immersed in academic work, I dedicate time to deep,
                consistent learning. I explore the connections between
                international relations, cybersecurity, digital warfare, and
                emerging technologies. I believe that staying informed isn't
                just a professional necessity—it’s a way of staying
                intellectually sharp and socially engaged. Whether it’s reading
                foreign policy journals, studying cyber law, or dissecting new
                innovations in AI, I seek out the knowledge that helps me think
                critically and strategically.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                My engagement with global affairs is personal and ongoing. I
                track the latest developments in national security, follow tech
                policy, and try to understand the shifting architecture of
                global power. What excites me is not just the “what” of world
                events, but the “why” behind them—and how we can respond more
                intelligently.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Midnight Bureau was created to be a reflection of that drive.
                It’s not just a blog—it’s an evolving portfolio of insight,
                research, and strategic thinking. Here, I translate complexity
                into clarity. I write to understand, and I write to connect—with
                readers who want more than surface-level takes on the forces
                shaping our world.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Whether I’m unpacking the global impact of AI regulation or
                analyzing hybrid warfare tactics, my goal is to bring attention
                to the overlooked, the emerging, and the critically important.
                The platform is also a space to challenge assumptions and build
                a community of informed readers who value depth over
                distraction.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Ultimately, Midnight Bureau is about bridging the gap between
                technical knowledge and public awareness. It’s where I turn
                rigorous research into accessible stories and spark
                conversations about the future of intelligence, governance, and
                global stability. In an age where information is abundant but
                insight is rare, I aim to offer the latter.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Because in the end, intelligence isn’t just about collecting
                data—it’s about seeing what others don’t. It’s about asking the
                right questions before the world knows they matter. Through this
                platform, I’m not just tracking the future—I’m training to
                understand it. And if you’re here reading, maybe you are too.
              </p>
            </div>

            {/* Later section: image left, text right */}
            <div
              style={{
                display: "flex",
                gap: 40,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <img
                id="about-image-left"
                src="/assets/images/AfroTob.jpg"
                alt="Tobin Albanese"
                style={{
                  width: 400,
                  borderRadius: 16,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  opacity: visibleLeft ? 1 : 0,
                  transform: visibleLeft
                    ? "translateX(0)"
                    : "translateX(-50px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              />

              <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  A core focus of my research is how non-state actors operate in
                  the digital realm—and how governments adapt to those
                  asymmetric threats. As new platforms, tools, and technologies
                  emerge, threat actors evolve rapidly. Understanding how these
                  changes affect national defense, cybersecurity, and policy
                  response is at the center of my work.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I also believe that communicating complex issues clearly is a
                  public service. Whether I’m breaking down policy implications,
                  exploring historical context, or connecting disparate trends,
                  my intent is always the same: make knowledge meaningful and
                  actionable. My writing aims to bridge the space between
                  research and real-world relevance.
                </p>
              </div>
            </div>

            {/* Final closer */}
            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Outside of research, I stay grounded through a lifelong
                curiosity and a deep respect for learning. I’m constantly
                observing, listening, and reflecting on how the world is
                changing—and how we can meet those changes with clarity and
                courage. Midnight Bureau is the product of that ongoing journey.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                This platform reflects not only my personal interests, but also
                a broader mission: to contribute to the growing need for
                strategic, informed voices in the public arena. We live in a
                time when our greatest challenges—cybersecurity, misinformation,
                global instability—require new forms of literacy and leadership.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Through Midnight Bureau, I strive to be a part of that solution.
                I hope to connect with others who share a passion for truth,
                analysis, and intelligent discourse. Because in the field of
                intelligence, what you know matters—but what you can see before
                it happens? That’s what shapes the future.
              </p>
            </div>
          </section>

          {/* Footer */}
          <>
            <Head>
              <title>Tobin Albanese</title>
              <meta charSet="utf-8" />
            </Head>

            <Footer />
          </>
        </div>
      </div>
    </>
  );
}
