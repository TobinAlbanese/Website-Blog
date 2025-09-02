import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sectionToPageMap = {
    // Midnight Bureau
    "latest-posts": "/MidnightBureau",
    "recent-posts": "/MidnightBureau",
    geopolitics: "/MidnightBureau",
    "economic-intelligence": "/MidnightBureau",
    "military-&-defense": "/MidnightBureau",
    "technology-&-innovation": "/MidnightBureau",
    "global-events": "/MidnightBureau",
    cybersecurity: "/MidnightBureau",

    // Portfolio
    "Current-&-In-Progress-Work": "/Portfolio",
    "research-&-analysis-projects": "/Portfolio",
    "computer-science-projects": "/Portfolio",
    "education-&-certifications": "/Portfolio",
    "featured-projects": "/Portfolio",
    "speaking-&-media": "/Portfolio",
    collaborations: "/Portfolio",
    "analytical-writing-&-publications": "/Portfolio",

    "feedback-section": "/",
  };

  const PORTFOLIO_OFFSET = 120; // adjust to your sticky header height
  const scrollWithOffset = (id, offset = PORTFOLIO_OFFSET) => {
    const candidates = [
      id,
      id === "featured-/-spotlight-projects" ? "featured-projects" : null,
      "home-section-featured-tag", // legacy alias if you still have it
    ].filter(Boolean);

    for (const key of candidates) {
      const el = document.getElementById(key);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - (offset || 0);
        window.scrollTo({ top, behavior: "smooth" });
        return true;
      }
    }
    return false;
  };

  const handleScrollToSection = (id) => {
    if (typeof window === "undefined") return;

    const targetPage = sectionToPageMap[id] || "/";

    // ✅ If the target is Portfolio, use offsetted smooth scroll (no slam)
    if (targetPage === "/Portfolio") {
      if (router.pathname === "/Portfolio") {
        // already there → scroll with offset
        scrollWithOffset(id);
      } else {
        // navigate then scroll with offset when ready
        sessionStorage.setItem("scrollTarget", id);
        sessionStorage.setItem("scrollPage", "/Portfolio");
        router.push("/Portfolio", undefined, { scroll: true });
      }
      return;
    }

    // Non-portfolio behavior: keep your existing smooth scroll
    if (router.pathname === targetPage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTarget", id);
      sessionStorage.setItem("scrollPage", targetPage);
      router.push(targetPage);
    }
  };

  // ✅ After route change, if we landed on /Portfolio, retry-scroll until the section exists
  useEffect(() => {
    const tryScrollPortfolio = () => {
      const targetPage = sessionStorage.getItem("scrollPage");
      const id = sessionStorage.getItem("scrollTarget");
      if (
        router.pathname !== "/Portfolio" ||
        targetPage !== "/Portfolio" ||
        !id
      )
        return;

      let attempts = 0;
      const maxAttempts = 25; // ~2.5s at 100ms
      const tick = () => {
        attempts += 1;
        const ok = scrollWithOffset(id);
        if (ok) {
          sessionStorage.removeItem("scrollTarget");
          sessionStorage.removeItem("scrollPage");
          return;
        }
        if (attempts < maxAttempts) {
          setTimeout(tick, 100);
        }
      };
      // kick off
      setTimeout(tick, 100);
    };

    // Run on initial mount & on each route change completion
    tryScrollPortfolio();
    const handleRouteChange = () => tryScrollPortfolio();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // (Optional) keep your previous effect for non-Portfolio pages
  useEffect(() => {
    const targetPage = sessionStorage.getItem("scrollPage");
    if (targetPage === "/Portfolio") return; // handled by the Portfolio-specific logic above

    const id = sessionStorage.getItem("scrollTarget");
    if (!id) return;

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollTarget");
      sessionStorage.removeItem("scrollPage");
    }
  }, [router.pathname]);

  return (
    <>
      <div className="footer w-100" data-theme="theme-contrast">
        <div className="row flex-nowrap-lg footer__inner pt-60 pb-40 pt-lg-80 pb-lg-30 f-sans fs-11 fs-md-12">
          <div className="col-12 col-lg-3 text-align-center">
            <a href="/" className="site-nav__center-logo-link">
              <span className="site-nav__logo-text">
                <span className="site-nav__logo-first">TOBIN</span>
                <span className="site-nav__logo-last">ALBANESE</span>
              </span>
            </a>
            <p className="c-text-secondary mt-20 mt-md-20 lh-sm">
              Published by Tobin Albanese on MidnightBureau, Inc.
            </p>
            <p className="c-text-secondary mt-5">
              ©2025. All Rights Reserved.
            </p>
            <p className="mt-15">
              <a href="/PrivacyPolicy">Privacy Policy</a>
              <span className="divider" />
              <a href="/TermsOfUse">Terms of Use</a>
            </p>
            <div className="socials d-flex items-center justify-center mt-30 mt-md-40 mb-30 mb-md-40">
              {/* Community */}
              <a
                href="https://www.reddit.com/user/MidnightBureau"
                className="footer__social d-inline-block"
                aria-label="Midnight Bureau on Reddit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-reddit" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://x.com/TobinAlbanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-twitter" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.instagram.com/tobin_albanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-instagram" />
                </svg>
              </a>

              {/* Professional */}
              <span className="divider" />
              <a
                href="https://www.linkedin.com/in/tobinalbanese/"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-linkedin" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.researchgate.net/profile/Tobin-Albanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on ResearchGate"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <use href="#icon-researchgate" />
                </svg>
              </a>

              {/* Media */}
              <span className="divider" />
              <a
                href="https://www.youtube.com/@MidnightBureau-TA"
                className="footer__social d-inline-block"
                aria-label="Midnight Bureau on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-youtube" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://open.spotify.com/"
                className="footer__social d-inline-block"
                aria-label="Midnight Bureau on Spotify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-spotify" />
                </svg>
              </a>

              {/* GitHub */}
              <span className="divider" />
              <a
                href="https://github.com/TobinAlbanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-github" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-9 pl-lg-80 row">
            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  About
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/About"
                    >
                      About Myself
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/Contact"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Portfolio"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/MidnightBureau/FAQ"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  Blog
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <span
                      onClick={() => handleScrollToSection("latest-posts")}
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Latest Debrief
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleScrollToSection("recent-posts")}
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Recent Posts
                    </span>
                  </li>
                  <li className="d-none d-lg-block">
                    <a
                      href="/MidnightBureau/Archive"
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Archives
                    </a>
                  </li>
                  <li>
                    <span
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleScrollToSection("feedback-section")}
                    >
                      Feedback
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  Portfolio Sections
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <span
                      onClick={() =>
                        handleScrollToSection("computer-science-projects")
                      }
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Computer Science Projects
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() =>
                        handleScrollToSection("research-&-analysis-projects")
                      }
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Research & Analysis Projects
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() =>
                        handleScrollToSection("education-&-certifications")
                      }
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Education & Certifications
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleScrollToSection("featured-projects")}
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Featured Projects
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  Speaking & Media
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <span
                      onClick={() => handleScrollToSection("speaking-&-media")}
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Speaking & Media
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleScrollToSection("collaborations")}
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Collaborations
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
