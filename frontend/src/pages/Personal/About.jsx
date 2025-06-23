import Head from 'next/head';
import React, { useState, useEffect, useRef } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx"
import SvgHead from "../../components/LandingPage/svgHead.jsx"
import Footer from '../../components/LandingPage/Footer.jsx';



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
                  href="/Albanylitica"
                >
                  Albanylitica
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/Albanylitica"
                >
                  Albanylitica
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
                  href="/Albanylitica/Newsletter"
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
                  href="/Albanylitica"
                >
                  Albanylitica
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
                  href="/Albanylitica/BookReviews"
                >
                  
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
                  href="/Albanylitica"
                >
                  Albanylitica
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile">
                <a
                  className="site-nav__link body-s-smallcaps highlight"
                  href="/Albanylitica"
                >
                  Albanylitica
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
                  href="/Albanylitica/Newsletter"
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
                  href="/Albanylitica"
                >
                  Albanylitica
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
                  href="/Albanylitica/Recent"
                >
                  Current Issue
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Albanylitica/Archive"
                >
                  Archive
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Albanylitica/Archive"
                >
                  Archive
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-tablet menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Albanylitica/BookReviews"
                >
                  Books
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Albanylitica/BookReviews"
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
                  href="/Albanylitica/Newsletter"
                >
                  Newsletters
                </a>
              </li>
              <li className="site-nav__list-item d-flex show-mobile menu__nav-links-list-item pt-5 pb-5">
                <a
                  className="site-nav__link body-s-smallcaps "
                  href="/Albanylitica/Newsletter"
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
                    <a href="/Albanylitica/Archive">Blog Archive</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Albanylitica/Recent">Recent Posts</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Albanylitica/Popular">Popular Posts</a>
                  </li>
                  <li className="menu__topics-list-item mb-10">
                    <a href="/Albanylitica/Categories">Categories</a>
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
                    <a className="menu__post-link" href="/Albanylitica/post-1">
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
                    <a className="menu__post-link" href="/Albanylitica/post-2">
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
                    <a className="menu__post-link" href="/Albanylitica/post-3">
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
                    <a href="/Personal/Portfolio">
                      Portfolio
                    </a>
                  </li>
                  <li className="menu__links--list-item mb-5">
                    <a href="/Albanylitica/Newsletter">NewsLetter</a>
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
                    <a href="/Albanylitica/Resources">Albanlytica Resources</a>
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



<section style={{ maxWidth: 900, margin: "0 auto", padding: 40, fontFamily: "inherit", color: "#222" }}>
  {/* First section: text left, image right */}
  <div style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 50 }}>
    <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
<p>
  I’m Tobin Albanese, a researcher committed to unraveling the intricacies of global security and modern threats. My work centers on the evolving landscape of counterterrorism, political violence, and the growing influence of emerging technologies in shaping conflict.
  I approach international affairs with a strong foundation in critical analysis and an interdisciplinary mindset — informed by studies in political science, history, and cybersecurity. This allows me to synthesize complex events and patterns into narratives that are both accessible and intellectually grounded.
  I’m Tobin Albanese, a researcher committed to unraveling the intricacies of global security and modern threats. My work centers on the evolving landscape of counterterrorism, political violence, and the growing influence of emerging technologies in shaping conflict.
  I approach international affairs with a strong foundation in critical analysis and an interdisciplinary mindset — informed by studies in political science, history, and cybersecurity. This allows me to synthesize complex events and patterns into narratives that are both accessible and intellectually grounded.



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
        transform: visibleRight ? "translateX(0)" : "translateX(50px)", // slide in from right
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    />
  </div>
  <div style={{ fontSize: 18, lineHeight: 1.6 }}>
    <p>
      When not working, I focus on continuous learning, reading, and engaging with global affairs to keep my perspective fresh and informed.
    </p>
    <p>
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
          Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.

    </p>
  </div>

  {/* Later section: image left, text right */}
  <div style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 50 }}>
    <img
      id="about-image-left"
      src="/assets/images/AfroTob.jpg" 
      alt="Description"
      style={{
        width: 400,
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        opacity: visibleLeft ? 1 : 0,
        transform: visibleLeft ? "translateX(0)" : "translateX(-50px)", // slide in from left
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    />

    <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
<p>
  My research often explores how non-state actors adapt to digital environments, and how governments respond to asymmetric threats. I’m particularly interested in the policy implications of these dynamics, and how institutions must evolve to stay ahead of rapidly shifting realities.
</p>

<p>
  I believe that knowledge, when clearly communicated, becomes power for the public. Whether I’m writing, speaking, or collaborating with others in the field, my goal is to bridge the gap between specialized research and meaningful civic understanding.
</p>

<p>
  Beyond my academic and analytical work, I remain a student of the world — continuously reading, listening, and learning. I created Albanylitica to serve as a space where I can share my observations, challenge assumptions, and build conversations around the forces shaping our security future.
</p>
    </div>
  </div>

  {/* More text-only paragraphs */}
  <div style={{ fontSize: 18, lineHeight: 1.6 }}>
    <p>
      When not working, I focus on continuous learning, reading, and engaging with global affairs to keep my perspective fresh and informed.
    </p>
    <p>
      Albanylitica is my space to share these insights and foster thoughtful discussion on the issues shaping our world.
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