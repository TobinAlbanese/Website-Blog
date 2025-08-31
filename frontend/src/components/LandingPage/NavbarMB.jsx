import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // ——— DO NOT CHANGE (kept exactly) ———
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.classList.add("js--menu-active");
      body.style.overflow = "hidden";
    } else {
      body.classList.remove("js--menu-active");
      body.style.overflow = "";
    }
    return () => {
      body.classList.remove("js--menu-active");
      body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  // ————————————————————————————————

  /* Anchor helpers */
  const SCROLL_OFFSET = 80;
  const scrollWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  const goToAnchor = (path, id) => async (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // Store target for reliability
    sessionStorage.setItem("scrollTarget", id);

    if (router.pathname === path) {
      // same page
      requestAnimationFrame(() => scrollWithOffset(id));
      // also update the URL hash so reloads/deep links work
      router.replace(`${path}#${encodeURIComponent(id)}`, undefined, {
        shallow: true,
      });
      return;
    }

    // cross-page: navigate WITH hash so the browser knows the intent too
    await router.push(`${path}#${encodeURIComponent(id)}`, undefined, {
      shallow: true,
    });
  };
  useEffect(() => {
    const tryScroll = (id, attemptsLeft = 20) => {
      const el = document.getElementById(id);
      if (el) {
        scrollWithOffset(id);
        return;
      }
      if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(id, attemptsLeft - 1), 50);
      }
    };

    const applyStoredScroll = () => {
      // 1) sessionStorage (menu/footer set this)
      const stored = sessionStorage.getItem("scrollTarget");
      if (stored) {
        sessionStorage.removeItem("scrollTarget");
        // try immediately + retry while content mounts
        tryScroll(stored);
      }

      // 2) native hash in URL (deep links / reloads)
      const hashRaw = window.location.hash?.slice(1);
      const hash = hashRaw ? decodeURIComponent(hashRaw) : null;
      if (hash) tryScroll(hash);
    };

    // on mount and after client-side navigation
    applyStoredScroll();
    router.events.on("routeChangeComplete", applyStoredScroll);
    return () => router.events.off("routeChangeComplete", applyStoredScroll);
  }, [router.events]);

  // Archive group helper
  const goToArchiveGroup = (group) => async (e) => {
    e.preventDefault();
    setMenuOpen(false);

    // Ask Archive to scroll to its content marker
    sessionStorage.setItem("scrollTarget", "archive-content");
    await router.push(
      `/MidnightBureau/Archive?group=${encodeURIComponent(group)}#archive-content`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <MetaHead />
      <SvgHead />

      <div className="base__nav">
        {/* Primary nav (centered logo via CSS grid) */}
        <nav className="site-nav" aria-label="primary">
          <div
            className="site-nav__inner pt-20 pb-10 pt-md-40"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* LEFT */}
            <ul
              className="site-nav__list d-flex left"
              style={{ justifySelf: "start" }}
            >
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
                  href="/MidnightBureau/Archive"
                >
                  Archive
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

              {/* Explore dropdown (restored + new items) */}
              <li className="site-nav__list-item d-flex show-desktop site-nav__dropdown">
                <a className="site-nav__link body-s-smallcaps" href="#">
                  Explore
                </a>
                <ul className="site-nav__dropdown-menu">
                  <li>
                    <a href="/MidnightBureau/BookReviews">Book Reviews</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/Music">Music Suggestions</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/Podcasts">Podcasts</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/FAQ">FAQs</a>
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

            {/* CENTER — truly centered now */}
            <a
              href="/"
              className="site-nav__center-logo-link"
              style={{ justifySelf: "center" }}
            >
              <span className="site-nav__logo-text">
                <span className="site-nav__logo-first">TOBIN</span>
                <span className="site-nav__logo-last">ALBANESE</span>
              </span>
            </a>

            {/* RIGHT */}
            <ul
              className="site-nav__list d-flex right"
              style={{ justifySelf: "end" }}
            >
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
                  aria-expanded={menuOpen}
                  onClick={toggleMenu}
                  className={`site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps ${menuOpen ? "is-open" : ""}`}
                >
                  <span className="site-nav__menu-btn-label js--menu-toggle-label">
                    {menuOpen ? "Close" : "Menu"}
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

        {/* Sticky nav — centered logo + Explore instead of Portfolio */}
        <nav
          className={`site-nav--sticky c-bg-border w-100 position-fixed top-0 z-above-everything ${menuOpen ? "menu-open" : ""}`}
          aria-label="primary"
        >
          <div
            className="site-nav__inner"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* LEFT */}
            <ul
              className="site-nav__list d-flex left"
              style={{ justifySelf: "start" }}
            >
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
                  href="/MidnightBureau/Archive"
                >
                  Archive
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

              {/* Explore dropdown replaces Portfolio here */}
              <li className="site-nav__list-item d-flex show-desktop site-nav__dropdown">
                <a className="site-nav__link body-s-smallcaps" href="#">
                  Explore
                </a>
                <ul className="site-nav__dropdown-menu">
                  <li>
                    <a href="/MidnightBureau/BookReviews">Book Reviews</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/Music">Music Suggestions</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/Podcasts">Podcasts</a>
                  </li>
                  <li>
                    <a href="/MidnightBureau/FAQ">FAQs</a>
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

            {/* CENTER — truly centered now */}
            <a
              href="/"
              className="site-nav__center-logo-linkMB"
              style={{ justifySelf: "center" }}
            >
              <span className="site-nav__logo-textMB">
                <span className="site-nav__logo-firstMB">TOBIN</span>
                <span className="site-nav__logo-lastMB">ALBANESE</span>
              </span>
            </a>

            {/* RIGHT */}
            <ul
              className="site-nav__list d-flex right"
              style={{ justifySelf: "end" }}
            >
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
                  aria-expanded={menuOpen}
                  onClick={toggleMenu}
                  className={`site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps ${menuOpen ? "is-open" : ""}`}
                >
                  <span className="site-nav__menu-btn-label js--menu-toggle-label">
                    {menuOpen ? "Close" : "Menu"}
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

        {/* Overlay menu (unchanged structure; updated links below white line) */}
        <nav
          className="js--menu theme-accent"
          aria-hidden={!menuOpen}
          aria-labelledby="menu-toggle"
        >
          <div className="menu__content col-12 col-xl-10">
            {/* top links kept */}
            <ul className="menu__nav-links mt-30 d-md-flex">
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/MidnightBureau#recent-posts"
                  onClick={goToAnchor("/MidnightBureau", "recent-posts")}
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
                  href="/Portfolio"
                >
                  Portfolio
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Portfolio"
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

            {/* top section kept the same (Browse by Section + Recent + Browse by Topic) */}
            <div className="menu__section d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10 mt-30 mb-80">
              <div className="menu__topics col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Browse by Section</p>
                <ul>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Archive">Blog Archive</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau#recent-posts"
                      onClick={goToAnchor("/MidnightBureau", "recent-posts")}
                    >
                      Recent Posts
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Portfolio">Portfolio</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/Portfolio#Current-&-In-Progress-Work"
                      onClick={goToAnchor(
                        "/Portfolio",
                        "Current-&-In-Progress-Work"
                      )}
                    >
                      Current Projects
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Notes">Notes</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Newsletter">Newsletter</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/About">About Me</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/MidnightBureau/Contact">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="menu__issues col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Recent Posts</p>
                <ul className="menu__issues-list d-flex">
                  <li>
                    <a
                      className="menu__post-link"
                      href="/MidnightBureau/post-1"
                    >
                      <figure>
                        <img
                          src="/assets/images/Midnight Bureau.png"
                          alt="Post 1 cover"
                          loading="lazy"
                          width={160}
                          height={228}
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
                      <figure>
                        <img
                          src="/assets/images/2.png"
                          alt="Post 2 cover"
                          loading="lazy"
                          width={160}
                          height={228}
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
                      <figure>
                        <img
                          src="/assets/images/3.png"
                          alt="Post 3 cover"
                          loading="lazy"
                          width={160}
                          height={228}
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
                      <a
                        href="/MidnightBureau/Archive?group=World%20%26%20Diplomacy"
                        onClick={goToArchiveGroup("World & Diplomacy")}
                      >
                        World &amp; Diplomacy
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Security%20%26%20Military"
                        onClick={goToArchiveGroup("Security & Military")}
                      >
                        Security &amp; Military
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Energy%20%26%20Environment"
                        onClick={goToArchiveGroup("Energy & Environment")}
                      >
                        Energy &amp; Environment
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Economy"
                        onClick={goToArchiveGroup("Economy")}
                      >
                        Economy
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Technology"
                        onClick={goToArchiveGroup("Technology")}
                      >
                        Technology
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Culture"
                        onClick={goToArchiveGroup("Culture")}
                      >
                        Culture
                      </a>
                    </li>
                    <li className="menu__links--list-item mb-5">
                      <a
                        href="/MidnightBureau/Archive?group=Ideas"
                        onClick={goToArchiveGroup("Ideas")}
                      >
                        Ideas
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="menu__divider border-zero mb-20" />

            {/* BELOW THE WHITE LINE — updated More Resources */}
            <div className="menu__section d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10">
              <div className="menu__about col-12 col-sm-6 col-lg-4-base-10">
                <p>
                  Hi, I'm{" "}
                  <strong>
                    <em>Tobin Albanese.. </em>
                  </strong>
                  A Computer Science student and writer passionate about
                  strategic intelligence, global affairs, and current events.
                  This blog shares my thoughts, analyses, and personal insights
                  across a wide range of topics including politics, technology,
                  and culture.
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
                    <a href="/MidnightBureau/Newsletter">Newsletter</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/FAQ">FAQs</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Podcasts">Podcasts</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/BookReviews">Book Reviews</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Music">Music Suggestions</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a
                      href="/#feedback-section"
                      onClick={goToAnchor("/", "feedback-section")}
                    >
                      Feedback
                    </a>
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
    </>
  );
}
