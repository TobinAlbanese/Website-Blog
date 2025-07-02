import Head from "next/head";
import React, { useEffect, useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

const socialLinks = [
  {
    name: "X",
    url: "https://x.com/TobinAlbanese",
    desc: "Follow me on X for quick thoughts.",
    icon: "#icon-twitter",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tobin_albanese/",
    desc: "See behind the scenes on Instagram.",
    icon: "#icon-instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/tobin-albanese",
    desc: "Professional updates on LinkedIn.",
    icon: "#icon-linkedin",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Tobinalbanese",
    desc: "Watch my videos on YouTube.",
    icon: "#icon-youtube",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/tobin.graham.77",
    desc: "Connect with me on Facebook for updates.",
    icon: "#icon-facebook",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/tobinalbanese",
    desc: "Join the conversation on Reddit.",
    icon: "#icon-reddit",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/",
    desc: "Listen to my playlists on Spotify.",
    icon: "#icon-spotify",
  },
  {
    name: "RSS",
    url: "https://www.tobinalbanese.com/rss.xml",
    desc: "Subscribe to my RSS feed.",
    icon: "#icon-rss",
  },
];

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
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
                        <a href="/MidnightBureau/Newsletter">NewsLetter</a>
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

          {/* Main bordered section */}
          <section
            className="contact-section"
            style={{
              maxWidth: 900,
              margin: "0 auto 80px",
              padding: "30px 20px",
              border: `4px solid var(--c-accent)`,
              borderRadius: 8,
              fontWeight: 600,
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 1.2s ease-in",
              color: "var(--c-text)",
              backgroundColor: "var(--c-bg)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 40,
                flexWrap: "wrap",
                minHeight: 500,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Left side: Contact Form */}
              <form
                style={{
                  flex: 1,
                  minWidth: 320,
                  border: `2px solid var(--c-accent)`,
                  borderRadius: 8,
                  backgroundColor: "var(--c-bg)",
                  padding: 20,
                  color: "var(--c-text)",
                  fontFamily: "inherit",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent! (demo)");
                  e.target.reset();
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    color: "var(--c-text)",
                    fontFamily: "inherit",
                  }}
                >
                  Get in Touch
                </h2>
                <p
                  style={{
                    marginBottom: 40,
                    fontWeight: 400,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  Whether you have questions, want to collaborate, or just to
                  say hello, feel free to drop me a message below!
                </p>

                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    fontFamily: "inherit",
                  }}
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                  }}
                />

                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    FontFamily: "inherit",
                  }}
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                  }}
                />

                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    FontFamily: "inherit",
                  }}
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--c-accent)",
                    color: "var(--c-button-text)",
                    border: "none",
                    borderRadius: 4,
                    padding: "12px 24px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 16,
                    transition: "background-color 0.3s ease",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--c-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--c-accent)")
                  }
                >
                  Send Message
                </button>
              </form>

              {/* Right side: Socials with descriptions */}
              <aside
                style={{
                  flex: 1,
                  minWidth: 280,
                  fontSize: 18,
                  lineHeight: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--c-text-secondary)",
                  fontFamily: "inherit",
                }}
              >
                <h3
                  style={{
                    marginBottom: 20,
                    fontWeight: 600,
                    color: "var(--c-text)",
                    fontFamily: "inherit",
                  }}
                >
                  Find Me Online
                </h3>

                <div style={{ width: "100%" }}>
                  {socialLinks.map(({ name, url, desc, icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 18,
                        color: "var(--c-text-secondary)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--c-border)",
                        paddingBottom: 10,
                        fontWeight: 600,
                        fontFamily: "inherit",
                      }}
                      aria-label={name}
                    >
                      <svg
                        viewBox="0 0 15 15"
                        width={28}
                        height={28}
                        fill="currentColor"
                        style={{ marginRight: 12, flexShrink: 0 }}
                      >
                        <use href={icon} />
                      </svg>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 4,
                            color: "var(--c-text)",
                          }}
                        >
                          {name}
                        </div>
                        <small
                          style={{
                            fontWeight: 400,
                            color: "var(--c-text-secondary)",
                            fontSize: 14,
                            lineHeight: 1.3,
                          }}
                        >
                          {desc}
                        </small>
                      </div>
                    </a>
                  ))}
                </div>
              </aside>
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
