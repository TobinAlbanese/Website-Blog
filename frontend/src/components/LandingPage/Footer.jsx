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

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);


  const sectionToPageMap = {
    // Midnight Bureau sections
    "latest-posts": "/MidnightBureau",
    "recent-posts": "/MidnightBureau",
    "geopolitics": "/MidnightBureau",
    "economic-intelligence": "/MidnightBureau",
    "military-&-defense": "/MidnightBureau",
    "technology-&-innovation": "/MidnightBureau",
    "global-events": "/MidnightBureau",
    "cybersecurity": "/MidnightBureau",

    // Portfolio sections
    "Current-&-In-Progress-Work": "/Portfolio",
    "research-&-analysis-projects": "/Portfolio",
    "computer-science-projects": "/Portfolio",
    "employers-&-work-experience": "/Portfolio",
    "education-&-certifications": "/Portfolio",
    "featured-/-spotlight-projects": "/Portfolio",
    "speaking-&-media": "/Portfolio",
    "collaborations": "/Portfolio",
    "analytical-writing-&-publications": "/Portfolio",

    "feedback-section": "/",
  };

const handleScrollToSection = (id) => {
  if (typeof window === "undefined") return;

  const targetPage = sectionToPageMap[id] || "/";

  if (router.pathname === targetPage) {
    // If already on the page, scroll immediately
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Store target and navigate
    sessionStorage.setItem("scrollTarget", id);
    router.push(targetPage);
  }
};

useEffect(() => {
  if (typeof window === "undefined") return;

  const scrollTarget = sessionStorage.getItem("scrollTarget");

  if (scrollTarget && document.readyState === "complete") {
    const el = document.getElementById(scrollTarget);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
        sessionStorage.removeItem("scrollTarget");
      }, 300); // Delay to allow section to mount/render
    }
  }
}, [router.pathname]);


  return (
    <>
      <div className="footer w-100" data-theme="theme-contrast">
        <div className="row flex-nowrap-lg footer__inner pt-60 pb-40 pt-lg-80 pb-lg-30 f-sans fs-11 fs-md-12">
          <div className="col-12 col-lg-3 text-align-center">
            <a href="/" className="d-block">
              <svg viewBox="0 0 130 53" className="footer__logo">
                <use href="#fa-logo" />
              </svg>
              <span className="visually-hidden">Tobin Albanese</span>
            </a>
            <p className="c-text-secondary mt-20 mt-md-20 lh-sm">
              Published by Tobin Albanese on MidnightBureau, Inc.
            </p>
            <p className="c-text-secondary mt-5">©2025. All Rights Reserved.</p>
            <p className="mt-15">
              <a href="/privacy-policy">Privacy Policy</a>
              <span className="divider" />
              <a href="/terms-use">Terms of Use</a>
            </p>
            <div className="socials d-flex items-center justify-center mt-30 mt-md-40 mb-30 mb-md-40">
              {/* Social links unchanged */}
              <a
                href="https://www.facebook.com/tobin.graham.77"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on facebook"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-facebook" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://x.com/TobinAlbanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on X"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-twitter" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.instagram.com/tobin_albanese/"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on instagram"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-instagram" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.linkedin.com/company/tobin-albanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on linkedin"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-linkedin" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.youtube.com/@Tobinalbanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on youtube"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-youtube" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.tobinalbanese.com/rss.xml"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on rss"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-rss" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://www.reddit.com/user/tobinalbanese"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on reddit"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-reddit" />
                </svg>
              </a>
              <span className="divider" />
              <a
                href="https://open.spotify.com/"
                className="footer__social d-inline-block"
                aria-label="Tobin Albanese on spotify"
              >
                <svg viewBox="0 0 15 15">
                  <use href="#icon-spotify" />
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
                      href="/Personal/FAQ"
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
                        handleScrollToSection("employers-&-work-experience")
                      }
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      style={{ cursor: "pointer" }}
                    >
                      Employers & Work Experience
                    </span>
                  </li>
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
                      onClick={() =>
                        handleScrollToSection("featured-/-spotlight-projects")
                      }
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
