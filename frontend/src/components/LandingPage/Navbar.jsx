import React, { useEffect, useState, useRef } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Archive from "../../pages/MidnightBureau/Archive.jsx";


export default function Navbar(){
 const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(prev => !prev);
  };


    return(
<>
      <MetaHead />
      <SvgHead />

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
          <a href="/" className="site-nav__center-logo-link">
  <span className="site-nav__logo-text">
    <span className="site-nav__logo-first">TOBIN</span>
    <span className="site-nav__logo-last">ALBANESE</span>
  </span>
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
            <nav
  className={`site-nav--sticky c-bg-border w-100 position-fixed top-0 z-above-everything ${
  menuOpen ? "menu-open" : ""
}`}
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
                <div className="site-nav__logo-wrapper">
          <a href="/" className="NavLogoCenter">
  <span className="site-nav__logo-text">
    <span className="site-nav__logo-first">TOBIN</span>
    <span className="site-nav__logo-last">ALBANESE</span>
  </span>
</a>
</div>
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
            <nav
  className="js--menu theme-accent"
  aria-hidden={!menuOpen}
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
                </ul>
                <div className="menu__section d-flex flex-wrap justify-between gap-y-30 -ml-10 -mr-10 mt-30 mb-80">
                  <div className="menu__topics col-12 col-sm-6 col-lg-4-base-10">
                   <p className="menu__overline mb-20">Browse by Section</p>
<ul>
  <li className="menu__topics-list-item mb-10">
    <a href="/MidnightBureau/Archive">Blog Archive</a>
  </li>
  <li className="menu__topics-list-item mb-10">
    <a href="/MidnightBureau">Recent Posts</a>
  </li>
  <li className="menu__topics-list-item mb-10">
    <a href="/Portfolio">Portfolio</a>
  </li>
   <li className="menu__topics-list-item mb-10">
    <a href="/Portfolio">Current Projects</a>
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
                        <a
                          className="menu__post-link"
                          href="/MidnightBureau/post-1"
                        >
                          <figure className="">
                            <img
                              src="/assets/images/Midnight Bureau.png"
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
                              src="/assets/images/2.png"
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
                              src="/assets/images/3.png"
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
<p className="menu__overline mb-20 mt-40">Browse Topics</p>
<ul className="menu__links pt-30 pt-md-0">
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Recent">Recent</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Popular">Popular</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Favorites">Favorites</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Philosophy">Philosophy & Tech</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Geopolitics">Geopolitics & Defense</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Intelligence">Security & Intelligence</a></li>
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
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Newsletter">Newsletter</a></li>
  <li className="menu__links--list-item mb-5"><a href="/Personal/Library">Reading Library</a></li>
  <li className="menu__links--list-item mb-5"><a href="/Personal/Media">Media Features</a></li>
  <li className="menu__links--list-item mb-5"><a href="/Personal/Projects">Projects & Events</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/FAQ">FAQs</a></li>
  <li className="menu__links--list-item mb-5"><a href="/MidnightBureau/Resources">Blog Resources</a></li>
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

