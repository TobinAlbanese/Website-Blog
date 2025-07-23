import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MidnightBureauData from "../../data/MidnightBureau.js";
import Footer from '../../components/LandingPage/Footer.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";




gsap.registerPlugin(ScrollTrigger);

const BlogPost = ({ article }) => {
  const router = useRouter();
  const [visibleImages, setVisibleImages] = useState([]);
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  const bannerRef = useRef(null);
useEffect(() => {
  const timeout = setTimeout(() => {
    if (bannerRef.current) {
      const offsetTop = bannerRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: offsetTop - 50, behavior: "smooth" }); 
    }
  }, 0); 

  return () => clearTimeout(timeout);
}, []);
useEffect(() => {
  if (typeof window !== "undefined" && window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }
}, []);

  useEffect(() => {
    document.body.setAttribute("data-highlight", "underline");

    const handleScroll = () => {
      const revealed = article.images?.map((_, idx) => {
        const el = document.getElementById(`img-${idx}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.8;
      }) || [];
      setVisibleImages(revealed);

      const header = document.querySelector("h1");
const headerBelowView = header && header.getBoundingClientRect().bottom < 0;

setShowTopLink(headerBelowView);
setShowBottomLink(headerBelowView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.images]);

  if (router.isFallback) return <p>Loading...</p>;

  const alternatingAlign = (i) => (i % 2 === 0 ? "right" : "left");
  const galleryImages = article.images?.slice(article.content.length) || [];

  const handleGalleryNav = (dir) => {
    setGalleryIdx((prev) => {
      const total = galleryImages.length;
      const maxStart = Math.max(0, total - 5);
      let newIdx = prev;

      if (dir === "prev") newIdx = Math.max(prev - 5, 0);
      if (dir === "next") newIdx = Math.min(prev + 5, maxStart);
      if (
        expandedCarouselIndex !== null &&
        (expandedCarouselIndex < newIdx || expandedCarouselIndex >= newIdx + 5)
      ) {
        setExpandedCarouselIndex(null);
      }

      return newIdx;
    });
  };

  const toggleCarouselExpand = (idx) => {
    setExpandedCarouselIndex((prev) => (prev === idx ? null : idx));
  };




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

  return (
    <>
      <MetaHead />
      <SvgHead />

     {/*NAVBAR*/}
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
         <div className="base d-flex">
        <NavbarMB />















      <Head>
        <title>{article.title} – Midnight Bureau</title>
        <meta name="description" content={article.excerpt} />
         <script
    src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
    strategy="afterInteractive"
  />
      </Head>
      <div className="midnight-bureau-article">

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

        <img
  ref={bannerRef}
  className="banner"
  src={article.banner || article.images[0]}
  alt="Banner"
  style={{ width: "100%", height: "200px", objectFit: "cover" }}
/>

        <h1>{article.title.toUpperCase()}</h1>
        <h2>by {article.author}</h2>
        <h3>
          Volume No. 1 <span className="date">{new Date(article.date).toDateString()}</span>
        </h3>

        <p
          className="intro-paragraph"
          dangerouslySetInnerHTML={{ __html: article.content[0].text }}
        />

        {article.content.slice(1, -1).map((block, i) => {
          const imgIndex = i;
          const side = alternatingAlign(i); // "left" or "right"
          const floatStyle = {
            float: side,
            margin: side === "left" ? "0 1rem 1rem 0" : "0 0 1rem 1rem",
          };

          return (
            <div key={imgIndex} style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <img
                id={`img-${imgIndex}`}
                src={article.images[imgIndex]}
                alt={`Article Image ${imgIndex}`}
                className={`card-image ${visibleImages[imgIndex] ? "slide-in" : ""}`}
                style={{ ...floatStyle, width: "260px", height: "380px" }}
                onClick={() => setModalImage(article.images[imgIndex])}
              />
              <div className="text-block" dangerouslySetInnerHTML={{ __html: block.text }} />
            </div>
          );
        })}

        <p
          className="outro-paragraph"
          dangerouslySetInnerHTML={{ __html: article.content.at(-1).text }}
        />

        {/*gallery images*/}
        <div className="gallery-wrapper" style={{ maxWidth: "1400px", margin: "3rem auto" }}>
          <div className="gallery-header">
            <h4>Gallery Images</h4>
            {galleryImages.length > 5 && (
              <div className="gallery-arrows">
                {galleryIdx > 0 && (
                  <button onClick={() => handleGalleryNav("prev")} aria-label="Previous images">
                    &lt;
                  </button>
                )}
                {galleryIdx + 5 < galleryImages.length && (
                  <button onClick={() => handleGalleryNav("next")} aria-label="Next images">
                    &gt;
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="box-container">
            {galleryImages.slice(galleryIdx, galleryIdx + 5).map((src, idx) => {
              const absoluteIdx = galleryIdx + idx;
              const isExpanded = expandedCarouselIndex === absoluteIdx;
              return (
                <div
                  key={absoluteIdx}
                  className={`box ${
                    isExpanded ? "expanded" : expandedCarouselIndex === null ? "" : "closed"
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

        <hr className="fancy-line" />
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative" }}>
          {/* Bookmark button */}
          <button
  className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
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

        {/* Modal for full image */}
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

        <section className="resources" id="resources">
          <h4>Resources &amp; Archival References</h4>
          <div className="navs-wrapper">
            {Object.entries(article.resources).map(([category, links]) => (
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
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
      </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = MidnightBureauData.Recent.map((post) => ({ params: { slug: post.slug } }));
  console.log('Paths:', paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = MidnightBureauData.Recent.find((post) => post.slug === params.slug);
  console.log('Article for slug:', params.slug, article);
  if (!article) return { notFound: true };
  return { props: { article } };
}


export default BlogPost;


