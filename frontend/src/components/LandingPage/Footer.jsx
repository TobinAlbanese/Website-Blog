import React from "react";

export default function Footer() {
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
              Published by Tobin Albanese on Albanylitica, Inc.
            </p>
            <p className="c-text-secondary mt-5">©2025. All Rights Reserved.</p>
            <p className="mt-15">
              <a href="/privacy-policy">Privacy Policy</a>
              <span className="divider" />
              <a href="/terms-use">Terms of Use</a>
            </p>
            <div className="socials d-flex items-center justify-center mt-30 mt-md-40 mb-30 mb-md-40">
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
                      About Myself{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica"
                    >
                      Blog{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Portfolio"
                    >
                      Portfolio{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/Contact"
                    >
                      Contact{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/FAQ"
                    >
                      FAQs{" "}
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
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Recent"
                    >
                      Latest Posts{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Categories"
                    >
                      Categories{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Popular"
                    >
                      Popular Posts{" "}
                    </a>
                  </li>
                  <li className="d-none d-lg-block">
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Archive"
                    >
                      Archives{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Resources"
                    >
                      Resources{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Feedback"
                    >
                      Feedback{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  Projects & Work
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Portfolio"
                    >
                      Current Projects{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Archive"
                    >
                      Writing Portfolio{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Portfolio/Research"
                    >
                      Research{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/Events"
                    >
                      Events{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Portfolio/Consulting"
                    >
                      Consulting{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-6 col-md-3">
              <nav>
                <div className="mb-10 mt-40 mt-md-0 f-sans fw-semibold">
                  Connect & Resources
                </div>
                <ul className="d-flex flex-column">
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Personal/Contact"
                    >
                      Contact Me{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="PUT THE LINKTREE THING HERE FOR ROUTES "
                    >
                      Social Media{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Recomendations"
                    >
                      Recommended Reads{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Resources"
                    >
                      Tools & Links{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitica/Glossary"
                    >
                      Glossary{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className="site-footer-section-menu__item d-block lh-lg fs-12"
                      href="/Albanylitical/Newsletter"
                    >
                      Newsletters{" "}
                    </a>
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
