import { useRouter } from 'next/router';
import MidnightBureauData from '../../data/MidnightBureau.js';
import React from 'react';

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: 10,
        zIndex: 2,
        cursor: "pointer",
        fontSize: 0, // hide default arrow text/icon
      }}
      onClick={onClick}
    >
      {/* Custom SVG arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#282828"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        <line x1="9" y1="6" x2="15" y2="12" />
        <line x1="9" y1="18" x2="15" y2="12" />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: 10,
        zIndex: 2,
        cursor: "pointer",
        fontSize: 0, // hide default arrow text/icon
      }}
      onClick={onClick}
    >
      {/* Custom SVG arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#282828"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        <line x1="15" y1="6" x2="9" y2="12" />
        <line x1="15" y1="18" x2="9" y2="12" />
      </svg>
    </div>
  );
}

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const allPosts = [
    ...MidnightBureauData.Recent,
    ...MidnightBureauData.Popular,
    ...MidnightBureauData.Archive,
    ...MidnightBureauData.BookReviews,
    ...MidnightBureauData.Resources,
  ];
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return <p>Loading...</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <>
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









      {/* This style block removes slick's default arrow background and icons */}
      <style jsx global>{`
        .slick-prev,
        .slick-next {
          background: transparent !important;
          box-shadow: none !important;
          width: 30px !important;
          height: 30px !important;
          z-index: 2;
        }
        .slick-prev:before,
        .slick-next:before {
          content: "" !important;
        }
      `}</style>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      <article
        style={{
          maxWidth: 800,
          margin: "60px auto",
          padding: "0 20px",
          fontFamily: "inherit",
          color: "#000000",
          lineHeight: 1.7,
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "0.95rem",
            marginBottom: 28,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          • {post.date}  
        </p>

        {/* IMAGE SLIDER or SINGLE IMAGE */}
        {post.images && post.images.length > 1 ? (
          <Slider {...sliderSettings} style={{ marginBottom: 32 }}>
            {post.images.map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  alt={`${post.title} - image ${i + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: 450,
                    objectFit: "cover",
                    borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                />
              </div>
            ))}
          </Slider>
        ) : post.image ? (
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: 450,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              marginBottom: 32,
            }}
          />
        ) : null}

        <div style={{ fontSize: 18 }}>
          {post.content.map((block, i) => (
            <p key={i} style={{ marginBottom: 24 }}>
              {block.text}
            </p>
          ))}
        </div>

        {/* Recommended / Footer */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 40,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontStyle: "italic", color: "#666" }}>
            Written by Tobin Albanese
          </span>

          <a
            href="/MidnightBureau"
            style={{
              color: "#d62827",
              fontWeight: 600,
              textDecoration: "underline",
              fontSize: "1rem",
            }}
          >
            ← Back to Midnight Bureau
          </a>
        </div>
      </article>

      <Footer />
      </div>
      </div>
    </>
  );
}
