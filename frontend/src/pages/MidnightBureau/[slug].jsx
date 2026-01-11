// pages/MidnightBureau/[slug].jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "../../components/LandingPage/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";
import { listMB, getMB } from "../../lib/posts";



// Only register GSAP plugin client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formatDate = (d) => {
  const dt = d ? new Date(d) : null;
  return dt && !isNaN(dt) ? dt.toDateString() : "";
};

const BlogPost = ({ article }) => {
  const router = useRouter();

  const [visibleImages, setVisibleImages] = useState([]);
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bannerRef = useRef(null);

  // Smooth-scroll to banner (offset for navbar)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bannerRef.current) {
        const offsetTop =
          bannerRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: offsetTop - 50, behavior: "smooth" });
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  // Strip hash from URL (avoids auto-jump on load)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Reveal-on-scroll + vertical link visibility
  useEffect(() => {
    document.body.setAttribute("data-highlight", "underline");

    const handleScroll = () => {
      const revealed =
        article.images?.map((_, idx) => {
          const el = document.getElementById(`img-${idx}`);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.8;
        }) || [];
      setVisibleImages(revealed);

      const header = document.querySelector("h1");
      const headerBelowView =
        header && header.getBoundingClientRect().bottom < 0;
      setShowTopLink(!!headerBelowView);
      setShowBottomLink(!!headerBelowView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.images]);

  // Freeze body scroll when menu is open
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

  if (router.isFallback) return <p>Loading...</p>;

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const alternatingAlign = (i) => (i % 2 === 0 ? "right" : "left");

  const contentBlocks = Array.isArray(article.content) ? article.content : [];
  const introBlock = contentBlocks[0]?.text || "";
  const outroBlock = contentBlocks.at(-1)?.text || "";

  // Gallery images come after article content length in the images array
  const galleryImages = article.images?.slice(contentBlocks.length) || [];

  const handleGalleryNav = (dir) => {
    setGalleryIdx((prev) => {
      const total = galleryImages.length;
      const maxStart = Math.max(0, total - 5);
      let next = prev;
      if (dir === "prev") next = Math.max(prev - 5, 0);
      if (dir === "next") next = Math.min(prev + 5, maxStart);

      // Collapse expanded if it leaves the window
      if (
        expandedCarouselIndex !== null &&
        (expandedCarouselIndex < next || expandedCarouselIndex >= next + 5)
      ) {
        setExpandedCarouselIndex(null);
      }
      return next;
    });
  };

  const toggleCarouselExpand = (idx) => {
    setExpandedCarouselIndex((prev) => (prev === idx ? null : idx));
  };

  const bannerSrc =
    article.banner ||
    article.images?.[0] ||
    article.archiveImage ||
    "/assets/images/space.jpg";

  return (
    <>
      <MetaHead />
      <SvgHead />

      {/* NAVBAR + global wrappers */}
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2" />
        </div>
        <div id="js-dfp-tag-outofpage--2" />

        <div className="base d-flex">
          <NavbarMB toggleMenu={toggleMenu} menuOpen={menuOpen} />

          <Head>
            <title>{article.title} – Midnight Bureau</title>
            <meta name="description" content={article.excerpt || ""} />
          </Head>

          <div className="midnight-bureau-article">
            {/* Vertical helper links */}
            {showTopLink && (
              <a href="#" className="vertical-link top-link">
                <span></span>Top of Article
              </a>
            )}
            {showBottomLink && (
              <a href="#resources" className="vertical-link bottom-link">
                <span></span>More Resources
              </a>
            )}

            {/* ✅ NEW: Inner content wrapper to prevent title/content bleed */}
            <div className="mb-article-inner">
              {/* Banner */}
              <img
                ref={bannerRef}
                className="banner mb-banner"
                src={bannerSrc}
                alt="Banner"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />

              {/* Title block */}
              <h1 className="mb-title">
                {(article.title || "").toUpperCase()}
              </h1>
              <h2 className="mb-subtitle">by {article.author || "Unknown"}</h2>
              <h3 className="mb-meta">
                {article.volume || "VOLUME"}{" "}
                <span className="date">{formatDate(article.date)}</span>
              </h3>

              {/* Intro */}
              {introBlock && (
                <p
                  className="intro-paragraph"
                  dangerouslySetInnerHTML={{ __html: introBlock }}
                />
              )}

              {/* Body with alternating float images */}
              {contentBlocks.slice(1, -1).map((block, i) => {
                const imgIndex = i; // image aligned with this block index
                const side = alternatingAlign(i); // "left" or "right"
                const floatStyle = {
                  float: side,
                  margin:
                    side === "left"
                      ? "0 1rem 1rem 0"
                      : "0 0 1rem 1rem",
                };
                const imgSrc =
                  article.images?.[imgIndex] ||
                  article.archiveImage ||
                  "/assets/images/space.jpg";

                return (
                  <div
                    key={imgIndex}
                    className="mb-block-row"
                    style={{ overflow: "hidden", marginBottom: "2rem" }}
                  >
                    <img
                      id={`img-${imgIndex}`}
                      src={imgSrc}
                      alt={`Article Image ${imgIndex + 1}`}
                      className={`card-image mb-float-img ${
                        visibleImages[imgIndex] ? "slide-in" : ""
                      }`}
                      style={{
                        ...floatStyle,
                        width: "260px",
                        height: "380px",
                        objectFit: "cover",
                      }}
                      onClick={() => setModalImage(imgSrc)}
                    />
                    <div
                      className="text-block mb-text"
                      dangerouslySetInnerHTML={{ __html: block?.text || "" }}
                    />
                  </div>
                );
              })}

              {/* Outro */}
              {outroBlock && (
                <p
                  className="outro-paragraph"
                  dangerouslySetInnerHTML={{ __html: outroBlock }}
                />
              )}

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div
                  className="gallery-wrapper"
                  style={{ maxWidth: "1400px", margin: "3rem auto" }}
                >
                  <div className="gallery-header">
                    <h4>Gallery Images</h4>
                    {galleryImages.length > 5 && (
                      <div className="gallery-arrows">
                        {galleryIdx > 0 && (
                          <button
                            onClick={() => handleGalleryNav("prev")}
                            aria-label="Previous images"
                          >
                            &lt;
                          </button>
                        )}
                        {galleryIdx + 5 < galleryImages.length && (
                          <button
                            onClick={() => handleGalleryNav("next")}
                            aria-label="Next images"
                          >
                            &gt;
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="box-container">
                    {galleryImages
                      .slice(galleryIdx, galleryIdx + 5)
                      .map((src, idx) => {
                        const absoluteIdx = galleryIdx + idx;
                        const isExpanded =
                          expandedCarouselIndex === absoluteIdx;
                        return (
                          <div
                            key={absoluteIdx}
                            className={`box ${
                              isExpanded
                                ? "expanded"
                                : expandedCarouselIndex === null
                                ? ""
                                : "closed"
                            }`}
                            style={{ backgroundImage: `url(${src})` }}
                            onClick={() => toggleCarouselExpand(absoluteIdx)}
                          >
                            <div className="overlay" />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              <hr className="fancy-line" />

              {/* Bookmark button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  position: "relative",
                }}
              >
                <button
                  className={`favorite-button ${
                    isFavorite ? "is-favorite" : ""
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label="Bookmark"
                >
                  <span className="favorite__icon favorite--enable">
                    <FontAwesomeIcon icon={solidBookmark} />
                  </span>
                  <span className="favorite__icon favorite--not">
                    <FontAwesomeIcon icon={regularBookmark} />
                  </span>
                </button>
              </div>

              {/* Resources */}
              {article.resources &&
                Object.keys(article.resources).length > 0 && (
                  <section className="resources" id="resources">
                    <h4>Resources &amp; Archival References</h4>
                    <div className="navs-wrapper">
                      {Object.entries(article.resources).map(
                        ([category, links]) => (
                          <div key={category} className="resource-category">
                            <h5 className="category-title">
                              {category.replace(/([A-Z])/g, " $1").trim()}
                            </h5>
                            <ul className="sub-resource-list">
                              {(links || []).map((link, i) => (
                                <li key={i}>
                                  <a
                                    className="sub-resource-link"
                                    href={link.url}
                                    target={
                                      link.external ? "_blank" : "_self"
                                    }
                                    rel={
                                      link.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                  >
                                    <span>{link.label}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}
            </div>

            {/* Image modal (kept outside inner wrapper so it overlays entire viewport) */}
            {modalImage && (
              <div
                className="midnight-img-modal"
                onClick={() => setModalImage(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "var(--c-bg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  zIndex: 1000,
                }}
              >
                <img
                  src={modalImage}
                  alt="Expanded view"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "90vh",
                    width: "auto",
                    height: "auto",
                    borderRadius: "16px",
                    objectFit: "contain",
                    boxShadow: "0 0 25px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: listMB().map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getMB(params.slug);
  if (!article) return { notFound: true };
  return { props: { article }, revalidate: 60 };
}

export default BlogPost;
