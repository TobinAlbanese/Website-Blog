import React, { useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import MetaHead from "../components/LandingPage/MetaHead.jsx";
import SvgHead from "../components/LandingPage/svgHead.jsx";
import Hero from "../components/LandingPage/Hero.jsx";
import AboutMe from "../components/LandingPage/AboutMe.jsx";
import BlogHighlights from "../components/LandingPage/BlogHighlights.jsx";
import FeaturedProjects from "../components/LandingPage/FeaturedProjects.jsx";
import FeaturedPapers from "../components/LandingPage/FeaturedPapers.jsx";
import SpecialFocus from "../components/LandingPage/SpecialFocus.jsx";
import Podcast from "../components/LandingPage/Podcast.jsx";
import BookReviews from "../components/LandingPage/BookReviews.jsx";
import Feedback from "../components/LandingPage/FeedBack.jsx";
import StayConnected from "../components/LandingPage/StayConnected.jsx";
import Footer from "../components/LandingPage/Footer.jsx";
import Navbar from "../components/LandingPage/Navbar.jsx";

export default function Home() {
  // ---- Keyboard section nav setup ----
  const SECTION_IDS = [
    "hero",
    "about",
    "blog-highlights",
    "featured-projects",
    "special-focus",
    "podcast",
    "featured-papers",
    "book-reviews",
    "feedback",
    "stay-connected",
  ];

  const sectionRefs = useRef({});
  const setSectionRef = useCallback(
    (id) => (el) => {
      if (el) sectionRefs.current[id] = el;
    },
    []
  );

  const focusSection = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.focus();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleKeyNav = useCallback(
    (e) => {
      // Only act when a section wrapper has focus
      const t = e.target;
      if (!t || t.getAttribute("data-section-wrapper") !== "true") return;

      const currentId = t.id;
      const idx = SECTION_IDS.indexOf(currentId);
      if (idx === -1) return;

      const prev = () => idx > 0 && focusSection(SECTION_IDS[idx - 1]);
      const next = () =>
        idx < SECTION_IDS.length - 1 && focusSection(SECTION_IDS[idx + 1]);

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          focusSection(SECTION_IDS[0]);
          break;
        case "End":
          e.preventDefault();
          focusSection(SECTION_IDS[SECTION_IDS.length - 1]);
          break;
        default:
          break;
      }
    },
    [SECTION_IDS, focusSection]
  );

  // On hash deep-link, focus the target section wrapper (if it exists)
  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && SECTION_IDS.includes(hash)) {
      // wait a tick for layout
      setTimeout(() => focusSection(hash), 50);
    }
  }, [focusSection]);

  return (
    <>
      <Head>
        <title>Tobin Albanese</title>
        <meta charSet="utf-8" />
      </Head>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Meta/SVG heads (unchanged) */}
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

      {/* Accessible skip link */}
      <a className="skip-link" href="#content">
        Skip to main content
      </a>

      {/* NAVBAR + Layout */}
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2" />
        </div>
        <div id="js-dfp-tag-outofpage--2" />
        <div className="base d-flex">
          <Navbar />

          <main
            id="content"
            role="main"
            tabIndex={-1}
            // add the responsive wrapper class
            className="base__content js--sticky-nav w-100 h-content-min d-flex justify-center flex-column rwd-v1 page-home"
            onKeyDown={handleKeyNav}
          >
            <h1 className="visually-hidden">Tobin Albanese</h1>

            {/* Container keeps content readable on all breakpoints */}
            <div className="base__main">
              {/* Each section gets a keyboard-focusable wrapper */}
              <section
                id="hero"
                ref={setSectionRef("hero")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Hero"
              >
                <h2 className="visually-hidden">Hero</h2>
                <Hero />
              </section>

              <section
                id="about"
                ref={setSectionRef("about")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="About me" 
              >
                <h2 className="visually-hidden">About me</h2>
                <AboutMe />
              </section>

              <section
                id="blog-highlights"
                ref={setSectionRef("blog-highlights")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Blog highlights"
              >
                <h2 className="visually-hidden">Blog highlights</h2>
                <BlogHighlights />
              </section>

              <section
                id="featured-projects"
                ref={setSectionRef("featured-projects")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Featured projects"
              >
                <h2 className="visually-hidden">Featured projects</h2>
                <FeaturedProjects />
              </section>

              <section
                id="special-focus"
                ref={setSectionRef("special-focus")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Special focus"
              >
                <h2 className="visually-hidden">Special focus</h2>
                <SpecialFocus />
              </section>

              <section
                id="podcast"
                ref={setSectionRef("podcast")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Podcast"
              >
                <h2 className="visually-hidden">Podcast</h2>
                <Podcast />
              </section>

              <section
                id="featured-papers"
                ref={setSectionRef("featured-papers")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Featured papers"
              >
                <h2 className="visually-hidden">Featured papers</h2>
                <FeaturedPapers />
              </section>

              <section
                id="book-reviews"
                ref={setSectionRef("book-reviews")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Book reviews"
              >
                <h2 className="visually-hidden">Book reviews</h2>
                <BookReviews />
              </section>

              <section
                id="feedback"
                ref={setSectionRef("feedback")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Feedback"
              >
                <h2 className="visually-hidden">Feedback</h2>
                <Feedback />
              </section>

              <section
                id="stay-connected"
                ref={setSectionRef("stay-connected")}
                tabIndex={0}
                data-section-wrapper="true"
                aria-label="Stay connected"
              >
                <h2 className="visually-hidden">Stay connected</h2>
                <StayConnected />
              </section>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
