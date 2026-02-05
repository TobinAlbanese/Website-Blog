// components/LandingPage/NavbarMB.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import MidnightBureauData from "../../data/MidnightBureau";
import { supabase } from "../../lib/supabase/client"; 

// helpers
const arr = (x) => (Array.isArray(x) ? x : []);
const toDate = (p) => {
  const d = new Date(p?.date || p?.published || p?.createdAt || 0);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};
const pickArchiveImg = (p) =>
  p?.archiveImage ||
  p?.image ||
  (Array.isArray(p?.images) ? p.images[0] : "") ||
  "/assets/images/space.jpg";

const collectMBPosts = () => {
  const flat = Object.values(MidnightBureauData)
    .flatMap(arr)
    .filter((p) => p && p.slug);
  const seen = new Set();
  const dedup = flat.filter(
    (p) => !seen.has(p.slug) && (seen.add(p.slug), true)
  );
  return dedup
    .map((p) => ({ ...p, dateObj: toDate(p) }))
    .sort((a, b) => b.dateObj - a.dateObj);
};

export default function NavbarMB() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ NEW
  const router = useRouter();

  const recentPosts = useMemo(() => collectMBPosts().slice(0, 3), []);

  // ✅ Auth state: check on mount + subscribe to changes
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;
      setIsLoggedIn(!!data?.user);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setMenuOpen(false);
      setIsLoggedIn(false);
      router.push("/MidnightBureau");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  // ————————————————————————————————

  // anchors
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
    sessionStorage.setItem("scrollTarget", id);

    if (router.pathname === path) {
      requestAnimationFrame(() => scrollWithOffset(id));
      router.replace(`${path}#${encodeURIComponent(id)}`, undefined, {
        shallow: true,
      });
      return;
    }

    await router.push(`${path}#${encodeURIComponent(id)}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const tryScroll = (id, attemptsLeft = 20) => {
      const el = document.getElementById(id);
      if (el) return scrollWithOffset(id);
      if (attemptsLeft > 0)
        setTimeout(() => tryScroll(id, attemptsLeft - 1), 50);
    };

    const applyStoredScroll = () => {
      const stored = sessionStorage.getItem("scrollTarget");
      if (stored) {
        sessionStorage.removeItem("scrollTarget");
        tryScroll(stored);
      }
      const hashRaw = window.location.hash?.slice(1);
      const hash = hashRaw ? decodeURIComponent(hashRaw) : null;
      if (hash) tryScroll(hash);
    };

    applyStoredScroll();
    router.events.on("routeChangeComplete", applyStoredScroll);
    return () => router.events.off("routeChangeComplete", applyStoredScroll);
  }, [router.events]);

  const goToArchiveGroup = (group) => async (e) => {
    e.preventDefault();
    setMenuOpen(false);
    sessionStorage.setItem("scrollTarget", "archive-content");
    await router.push(
      `/MidnightBureau/Archive?group=${encodeURIComponent(
        group
      )}#archive-content`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <MetaHead />
      <SvgHead />

      <div className="base__nav">
        {/* Primary nav */}
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

              {/* Explore dropdown */}
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

            {/* CENTER */}
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

              {/* ✅ Log In / Log Out (primary nav) */}
              {isLoggedIn ? (
                <li className="site-nav__list-item d-flex show-desktop show-tablet">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="site-nav__link body-s-smallcaps"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <>
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
                </>
              )}

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
                  className={`site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps ${
                    menuOpen ? "is-open" : ""
                  }`}
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

        {/* Sticky nav */}
        <nav
          className={`site-nav--sticky c-bg-border w-100 position-fixed top-0 z-above-everything ${
            menuOpen ? "menu-open" : ""
          }`}
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

            {/* CENTER */}
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

              {/* ✅ Log In / Log Out (sticky nav) */}
              {isLoggedIn ? (
                <li className="site-nav__list-item d-flex show-desktop show-tablet">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="site-nav__link body-s-smallcaps"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <>
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
                </>
              )}

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
                  className={`site-nav__menu-btn d-flex site-nav__link js--menu-toggle body-s-smallcaps ${
                    menuOpen ? "is-open" : ""
                  }`}
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

        {/* Overlay menu */}
        <nav
          className="js--menu theme-accent"
          aria-hidden={!menuOpen}
          aria-labelledby="menu-toggle"
        >
          <div className="menu__content col-12 col-xl-10">
            <div className="menu__section menu__section--top d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10 mt-30 mb-80">
              {/* LEFT: Browse by Section */}
              <div className="menu__topics col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Browse by Section</p>
                <ul>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau/Archive"
                      onClick={() => setMenuOpen(false)}
                    >
                      Blog Archive
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau#recent-posts"
                      onClick={goToAnchor("/MidnightBureau", "recent-posts")}
                    >
                      Recent Posts
                    </a>
                  </li>

                  {/* ✅ Overlay Login / Logout */}
                  <li className="menu__topics-list-item mb-10">
                    {isLoggedIn ? (
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          color: "inherit",
                          font: "inherit",
                          textAlign: "left",
                        }}
                      >
                        Log Out
                      </button>
                    ) : (
                      <a
                        href="/user/login"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login / Sign Up
                      </a>
                    )}
                  </li>

                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau/Newsletter"
                      onClick={() => setMenuOpen(false)}
                    >
                      Newsletter
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau/FAQ"
                      onClick={() => setMenuOpen(false)}
                    >
                      FAQs
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau/About"
                      onClick={() => setMenuOpen(false)}
                    >
                      About Me
                    </a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a
                      href="/MidnightBureau/Contact"
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                {/* MOBILE ONLY: Browse by Topic */}
                <div className="menu__topics-mobile-only d-block d-md-none">
                  <p className="menu__overline mb-20 mt-40">Browse by Topic</p>
                  <ul className="menu__links pt-10">
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=World%20%26%20Diplomacy"
                        onClick={goToArchiveGroup("World & Diplomacy")}
                      >
                        World &amp; Diplomacy
                      </a>
                    </li>
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=Security%20%26%20Military"
                        onClick={goToArchiveGroup("Security & Military")}
                      >
                        Security &amp; Military
                      </a>
                    </li>
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=Energy%20%26%20Environment"
                        onClick={goToArchiveGroup("Energy & Environment")}
                      >
                        Energy &amp; Environment
                      </a>
                    </li>
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=Economy"
                        onClick={goToArchiveGroup("Economy")}
                      >
                        Economy
                      </a>
                    </li>
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=Technology"
                        onClick={goToArchiveGroup("Technology")}
                      >
                        Technology
                      </a>
                    </li>
                    <li className="menu__links--list-item">
                      <a
                        href="/MidnightBureau/Archive?group=Culture"
                        onClick={goToArchiveGroup("Culture")}
                      >
                        Culture
                      </a>
                    </li>
                    <li className="menu__links--list-item">
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

              {/* RIGHT: Recent Posts + topics */}
              <div className="menu__issues col-12 col-sm-6 col-lg-4-base-10">
                <p className="menu__overline mb-20">Recent Posts</p>

                <ul className="menu__issues-list d-flex">
                  {recentPosts.map((p, i) => (
                    <li key={p.slug}>
                      <a
                        className="menu__post-link"
                        href={`/MidnightBureau/${p.slug}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <figure
                          style={{
                            width: 160,
                            height: 228,
                            overflow: "hidden",
                            borderRadius: 6,
                            margin: 0,
                          }}
                        >
                          <img
                            src={pickArchiveImg(p)}
                            alt={p.title || `Post ${i + 1}`}
                            loading="lazy"
                            width={160}
                            height={228}
                            style={{
                              width: "160px",
                              height: "228px",
                              objectFit: "cover",
                              display: "block",
                            }}
                            sizes="(max-width: 767px) 26vw, (min-width: 1024px) 160px"
                          />
                        </figure>

                        <span
                          className="body-xs-smallcaps fs-15 d-inline-block pt-5"
                          style={{
                            width: 160,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: 1.25,
                          }}
                        >
                          {p.title?.trim() || `Post ${i + 1}`}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="d-none d-md-block">
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

            {/* BELOW WHITE LINE */}
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
                  onClick={() => setMenuOpen(false)}
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
                    <a
                      href="/MidnightBureau/Newsletter"
                      onClick={() => setMenuOpen(false)}
                    >
                      Newsletter
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a
                      href="/MidnightBureau/FAQ"
                      onClick={() => setMenuOpen(false)}
                    >
                      FAQs
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a
                      href="/MidnightBureau/Podcasts"
                      onClick={() => setMenuOpen(false)}
                    >
                      Podcasts
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a
                      href="/MidnightBureau/BookReviews"
                      onClick={() => setMenuOpen(false)}
                    >
                      Book Reviews
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a
                      href="/MidnightBureau/Music"
                      onClick={() => setMenuOpen(false)}
                    >
                      Music Suggestions
                    </a>
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
