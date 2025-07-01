import React, { useState, useEffect } from "react";
import Link from "next/link";

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import MidnightBureauData from "../../data/MidnightBureau.js";

// Card Component
function AnimatedPostCard({ post, index, isMain }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateX(-30px)",
        transition: "opacity 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease",
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
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            <div style={{ flex: 1, textAlign: "left" }}>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  margin: "0 0 8px 0",
                  color: "var(--c-text-primary)",
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
                }}
              >
                {post.excerpt}
              </p>
              <small
                style={{
                  fontSize: "0.9rem",
                  color: "var(--c-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {post.date} • {post.author}
              </small>
            </div>
            <Link
              href={`/MidnightBureau/${post.slug}`}
              style={{
                color: "var(--c-accent)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: 0.5,
                textDecoration: "underline",
                whiteSpace: "nowrap",
                alignSelf: "flex-end",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Continue reading here →
            </Link>
          </div>
        </>
      ) : (
        <>
          <img
            src={post.image}
            alt={post.title}
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
              height: 260,
              textAlign: "justify",
              paddingLeft: 0,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "10px 0 16px 0",
                  color: "var(--c-text-primary)",
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
                }}
              >
                {post.excerpt}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <small
                style={{
                  fontSize: "0.85rem",
                  color: "var(--c-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {post.date} • {post.author}
              </small>
              <Link
                href={`/MidnightBureau/${post.slug}`}
                style={{
                  color: "var(--c-accent)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "underline",
                }}
              >
                Read full article →
              </Link>
            </div>
          </div>
        </>
      )}
    </article>
  );
}


export default function MidnightBureau() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const recentPosts = MidnightBureauData.Recent;
  const sortedRecent = [...recentPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const mainPost = sortedRecent[0];
  const otherPosts = sortedRecent.slice(1);

  return (
<>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <MetaHead />
            <SvgHead />





{/*NAVBAR*/}
  <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
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
      <div className="base__main row flex-column w-100" />
    







    

<section className="c-bg" data-armstrong-id="wrapper">
  <div className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40" data-armstrong-id="primary">
    <div className="col-12">
      <div className="row justify-between d-flex" data-armstrong-id="row">
        {/* Hero section left */}
        <div
          className={`col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center ${
            animate ? "slide-in-left" : ""
          }`}
          data-armstrong-id="personal-message"
        >
          <h1 className="heading-l mb-15">Welcome to Midnight Bureau</h1>
          <p className="body-m" style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
            At Midnight Bureau, you'll find a thoughtful space dedicated to deep dives, critical analyses, and fresh
            perspectives. From engaging book reviews and carefully curated resources to timely insights on culture and
            current events, every post is crafted with care by myself, <em>Tobin Albanese</em>, to inspire, inform, and
            spark meaningful conversations.
            <br />
            Whether you're here to expand your knowledge, discover new ideas, or simply enjoy well-written content,
            take your time exploring the posts below—there’s something here for every curious mind.
            <br />
            Step inside, and let our journey begin.
          </p>
        </div>

        {/* Hero section right image */}
        <div
          className={`col-12 col-lg-6 d-flex justify-center ${animate ? "slide-in-right" : ""}`}
          style={{ transition: "all 0.8s ease" }}
        >
          <img
            src="/assets/images/tobin&johnny.jpg"
            alt="Photo of Tobin Albanese"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  </div>

  {/* Red line separator */}
  <div
    style={{
      maxWidth: 1000,
      margin: "40px auto",
      borderTop: "4px solid #d62827",
    }}
  />

  <main style={{ maxWidth: 1400, margin: "40px auto", padding: "0 24px" }}>
    {/* Featured Most Recent Post */}
    <section style={{ marginBottom: 80 }}>
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
        Latest Briefings
      </h2>
      <AnimatedPostCard post={mainPost} index={0} isMain />
    </section>

    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        borderTop: "4px solid #d62827",
      }}
    />

    {/* Other Recent Posts */}
    <section>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "48px",
          maxWidth: "1350px",
          margin: "0 auto",
        }}
      >
        {otherPosts.slice(0, 4).map((post, i) => (
          <AnimatedPostCard key={post.slug} post={post} index={i + 1} isMain={false} />
        ))}
      </div>
    </section>

    <div
      style={{
        maxWidth: 1000,
        margin: "80px auto 24px auto",
        borderTop: "4px solid #d62827",
      }}
    />

    {/* Browse by Topics */}
    <h2
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

    {/* Categories Section */}
    <div
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
        const posts = MidnightBureauData[cat.replace(/ & /g, "").replace(/ /g, "")]?.slice(0, 2) || [];
        return (
          <div key={cat} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
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
            {posts.map((post, i) => (
              <AnimatedPostCard key={post.slug} post={post} index={i} isMain={false} />
            ))}
          </div>
        );
      })}
    </div>
    <button
  type="button"
  style={{
    backgroundColor: "#d62827",
    color: "var(--c-text-primary)",
    border: "none",
    borderRadius: 4,
    padding: "12px 24px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontFamily: "inherit",
    marginTop: 40, // add some spacing from categories
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b02621")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d62827")}
  onClick={() => window.location.href = "/MidnightBureau/Archive"} 
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









