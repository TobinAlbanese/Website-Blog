// pages/Portfolio/[slug].jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "../../components/LandingPage/Footer.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import { listPF, getPF } from "../../lib/posts";
import Script from "next/script";

gsap.registerPlugin(ScrollTrigger);

const ProjectPost = ({ project }) => {
  const router = useRouter();
  const [visibleImages, setVisibleImages] = useState([]);
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bannerRef = useRef(null);

  // ---------- Derived content/image data ----------
  const contentBlocks = Array.isArray(project?.content) ? project.content : [];
  // We pair images with every block except the intro (index 0) and outro (last)
  const pairedCount = Math.max(0, contentBlocks.length - 2);

  const allImages = Array.isArray(project?.images)
    ? project.images.filter(Boolean)
    : [];

  // The images used in the text body are indices [0 .. pairedCount-1]
  // The gallery shows the remainder (or falls back)
  const primaryGallery =
    allImages.length > pairedCount ? allImages.slice(pairedCount) : [];

  const fallbackGallery = [project?.banner, project?.archiveImage].filter(
    Boolean
  );

  const gallery = primaryGallery.length
    ? primaryGallery
    : allImages.length
      ? allImages
      : fallbackGallery;

  // ---------- Effects ----------
  // Smooth-scroll to banner
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

  // Strip hash if present
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Reveal-on-scroll + vertical link visibility
  useEffect(() => {
    document.body.setAttribute("data-highlight", "underline");
    const handleScroll = () => {
      const revealed = Array.from({ length: pairedCount }).map((_, idx) => {
        const el = document.getElementById(`img-${idx}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.8;
      });
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
  }, [pairedCount]);

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

  // ---------- Helpers ----------
  const alternatingAlign = (i) => (i % 2 === 0 ? "right" : "left");

  const handleGalleryNav = (dir) => {
    setGalleryIdx((prev) => {
      const total = gallery.length;
      const maxStart = Math.max(0, total - 5);
      let next = prev;
      if (dir === "prev") next = Math.max(prev - 5, 0);
      if (dir === "next") next = Math.min(prev + 5, maxStart);

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
    project?.banner ||
    allImages[0] ||
    null ||
    project?.archiveImage ||
    "/assets/images/space.jpg";

  return (
    <>
      <MetaHead />
      <SvgHead />

      {/* NAVBAR */}
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

          <Head>
            <title>{project.title} – Portfolio</title>
            <meta name="description" content={project.excerpt || ""} />
          </Head>
          <Script
  src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
  strategy="afterInteractive"
/>

          <div className="midnight-bureau-article">
            {/* Vertical helper links */}
            {showTopLink && (
              <a href="#" className="vertical-link top-link">
                <span></span>Top of Project
              </a>
            )}
            {showBottomLink && (
              <a href="#resources" className="vertical-link bottom-link">
                <span></span>More Resources
              </a>
            )}

            {/* Banner */}
            <img
              ref={bannerRef}
              className="banner"
              src={bannerSrc}
              alt="Banner"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            {/* Title block */}
            <h1 className="mb-title">{(project.title || "").toUpperCase()}</h1>
            <h2>by {project.author}</h2>
            <h3>
              {project.volume || "Volume No. 1"}{" "}
              <span className="date">
                {project.date ? new Date(project.date).toDateString() : ""}
              </span>
            </h3>

            {/* Intro */}
            {contentBlocks[0]?.text && (
              <p
                className="intro-paragraph"
                dangerouslySetInnerHTML={{ __html: contentBlocks[0].text }}
              />
            )}

            {/* Body with alternating float images (indexes 0..pairedCount-1) */}
            {contentBlocks.slice(1, -1).map((block, i) => {
              const imgIndex = i; // image aligned with this block index
              const side = alternatingAlign(i); // "left" or "right"
              const floatStyle = {
                float: side,
                margin: side === "left" ? "0 1rem 1rem 0" : "0 0 1rem 1rem",
              };
              const imgSrc = allImages[imgIndex];

              return (
                <div
                  key={imgIndex}
                  style={{ overflow: "hidden", marginBottom: "2rem" }}
                >
                  {imgSrc && (
                    <img
                      id={`img-${imgIndex}`}
                      src={imgSrc}
                      alt={`Project Image ${imgIndex + 1}`}
                      className={`card-image ${visibleImages[imgIndex] ? "slide-in" : ""}`}
                      style={{
                        ...floatStyle,
                        width: "260px",
                        height: "380px",
                        objectFit: "cover",
                      }}
                      onClick={() => setModalImage(imgSrc)}
                    />
                  )}
                  <div
                    className="text-block"
                    dangerouslySetInnerHTML={{ __html: block?.text || "" }}
                  />
                </div>
              );
            })}

            {/* Outro */}
            {contentBlocks.at(-1)?.text && (
              <p
                className="outro-paragraph"
                dangerouslySetInnerHTML={{ __html: contentBlocks.at(-1).text }}
              />
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div
                className="gallery-wrapper"
                style={{ maxWidth: "1400px", margin: "3rem auto" }}
              >
                <div className="gallery-header">
                  <h4>Gallery Images</h4>
                  {gallery.length > 5 && (
                    <div className="gallery-arrows">
                      {galleryIdx > 0 && (
                        <button
                          onClick={() => handleGalleryNav("prev")}
                          aria-label="Previous images"
                        >
                          &lt;
                        </button>
                      )}
                      {galleryIdx + 5 < gallery.length && (
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
                  {gallery.slice(galleryIdx, galleryIdx + 5).map((src, idx) => {
                    const absoluteIdx = galleryIdx + idx;
                    const isExpanded = expandedCarouselIndex === absoluteIdx;
                    return (
                      <div
                        key={absoluteIdx}
                        className={`box ${isExpanded ? "expanded" : expandedCarouselIndex === null ? "" : "closed"}`}
                        style={{ backgroundImage: `url("${src}")` }}
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

            {/* Image Modal */}
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

            {/* Resources */}
            {project.resources && (
              <section className="resources" id="resources">
                <h4>Resources &amp; Links</h4>
                <div className="navs-wrapper">
                  {Object.entries(project.resources).map(
                    ([category, links]) => (
                      <div key={category} className="resource-category">
                        <h5 className="category-title">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h5>
                        <ul className="sub-resource-list">
                          {links.map((link, i) => (
                            <li key={i}>
                              <a
                                className="sub-resource-link"
                                href={link.url}
                                target={link.external ? "_blank" : "_self"}
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

          <Footer />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: listPF().map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getPF(params.slug);
  if (!project) return { notFound: true };
  return { props: { project }, revalidate: 60 };
}

export default ProjectPost;
