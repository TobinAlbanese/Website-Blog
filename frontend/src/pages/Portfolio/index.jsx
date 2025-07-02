import React, { useState, useEffect } from "react";
import Link from "next/link";

import Footer from "../../components/LandingPage/Footer.jsx";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import PortfolioData from '../../data/portfolioData.js';

function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "var(--c-text)",
        border: "1px solid var(--c-border)",
        borderRadius: 12,
        padding: 20,
        boxShadow: hover
          ? "0 10px 20px rgba(0, 0, 0, 0.1)"
          : "0 4px 12px rgba(0, 0, 0, 0.04)",
        backgroundColor: "var(--c-bg-primary)", 
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover
            ? "translateY(-8px)"
            : "translateX(0)"
          : "translateX(-30px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        cursor: hover ? "pointer" : "default",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 20,
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: 24, fontWeight: 700 }}>
            {project.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--c-text-secondary)",
            }}
          >
            {project.description}
          </p>
        </div>

        <img
          src={project.image}
          alt={project.title}
          style={{
            width: 300,
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Link text at bottom left */}
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Link
          href={`/Portfolio/${project.slug}`}
          style={{
            color: "var(--c-accent)",
            fontWeight: "500",
            fontSize: 16,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Click here for more
        </Link>
      </div>
    </div>
  );
}



export default function Portfolio() {
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
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Portfolio"
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
            <a href="/" className="site-nav__logo-link d-block">
              <svg viewBox="0 0 130 53" className="site-nav__logo">
                <use href="#fa-logo" />
              </svg>
              <span className="visually-hidden">Tobin Albanese</span>
            </a>
            <ul className="site-nav__list d-flex right">
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
              <li className="site-nav__list-item d-flex show-desktop">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Portfolio"
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
                    <a href="/Personal/About">About Me</a>
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
                    <a href="/Portfolio">
                      Portfolio
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/MidnightBureau/Newsletter">NewsLetter</a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/Personal/About">About Me</a>
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
                    <a href="/MidnightBureau/Resources">Albanlytica Resources</a>
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
    


  <main style={{ maxWidth: "1400px", margin: "40px auto", padding: "0 20px" }}>
        {Object.entries(PortfolioData).map(([category, projects]) => (
<section
  id={category.toLowerCase().replace(/\s+/g, '-')}
  key={category}
  style={{ marginBottom: 60 }}
>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                borderBottom: "3px solid #d62827",
                paddingBottom: 8,
                marginBottom: 30,
              }}
            >
              {category}
            </h2>

            <div className="projects-container">
              <div className="projects-grid">
                {projects.map((project, idx) => (
                  <div key={project.title} className="project-wrapper">
                    <ProjectCard project={project} index={idx} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

        <Footer />

    </div>
  </div>
</>
  );
} 