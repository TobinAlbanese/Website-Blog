// src/pages/Portfolio/[slug].jsx
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "../../components/LandingPage/Footer.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Script from "next/script";
import { createClient } from "@supabase/supabase-js";
import AutoFitText from "../../components/AutoFitText.jsx";

gsap.registerPlugin(ScrollTrigger);

const formatDate = (d) => {
  const dt = d ? new Date(d) : null;
  return dt && !isNaN(dt) ? dt.toDateString() : "";
};

const toPublic = (supabaseUrl, bucket, storagePathOrUrl) => {
  if (!storagePathOrUrl || typeof storagePathOrUrl !== "string") return "";

  const value = storagePathOrUrl.trim();
  if (!value) return "";

  // Already absolute URL
  if (/^https?:\/\//i.test(value)) return value;

  // Local image path -> map into public-images bucket
  // Example: /assets/images/portfolioBanner.webp -> public-images/portfolioBanner.webp
  // Example: /assets/images/portfolio/behav-ai-banner.webp -> public-images/portfolio/behav-ai-banner.webp
  if (value.startsWith("/assets/images/")) {
    const key = value.replace(/^\/assets\/images\//, "");
    return `${supabaseUrl}/storage/v1/object/public/public-images/${key}`;
  }

  // Other local assets can stay local if you still want them available
  if (value.startsWith("/assets/")) return value;

  // Otherwise treat it as a storage path in the provided bucket
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${value}`;
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener();

    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

const ProjectPost = ({ project, __supabaseUrl, __bucket }) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const router = useRouter();

  // ---------- State ----------
  const [visibleImages, setVisibleImages] = useState([]);
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const bannerRef = useRef(null);

  // ---------- Derived content/image data ----------
  const contentBlocks = Array.isArray(project?.content) ? project.content : [];
  const subtitle = (project?.subtitle || project?.Subtitle || "").trim();
  const pairedCount = Math.max(0, contentBlocks.length - 2);

  const allImages = Array.isArray(project?.images)
    ? project.images
        .map((p) => toPublic(__supabaseUrl, __bucket, p))
        .filter(Boolean)
    : [];

  const primaryGallery =
    allImages.length > pairedCount ? allImages.slice(pairedCount) : [];

  const fallbackGallery = [
    toPublic(__supabaseUrl, __bucket, project?.banner),
    toPublic(__supabaseUrl, __bucket, project?.archiveImage),
  ].filter(Boolean);

  const gallery = primaryGallery.length
    ? primaryGallery
    : allImages.length
      ? allImages
      : fallbackGallery;

  const shouldShowGallery = Array.isArray(gallery) && gallery.length >= 4;

  // ---------- Helpers used by effects ----------
  const VISIBLE_COUNT = 5;

  const midOfWindow = useCallback(
    (start) => {
      const total = gallery.length;
      const windowCount = Math.min(VISIBLE_COUNT, total - start);
      if (windowCount <= 0) return null;
      return start + Math.floor((windowCount - 1) / 2);
    },
    [gallery.length]
  );

  // ---------- Effects ----------
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

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

  useEffect(() => {
    if (!shouldShowGallery) return;
    setExpandedCarouselIndex((prev) => {
      const start = galleryIdx;
      const end = galleryIdx + VISIBLE_COUNT;
      const outOfWindow = prev == null || prev < start || prev >= end;
      return outOfWindow ? midOfWindow(galleryIdx) : prev;
    });
  }, [shouldShowGallery, galleryIdx, midOfWindow]);

  const alternatingAlign = (i) => (i % 2 === 0 ? "right" : "left");

  const handleGalleryNav = (dir) => {
    if (!shouldShowGallery) return;
    setGalleryIdx((prev) => {
      const total = gallery.length;
      const maxStart = Math.max(0, total - VISIBLE_COUNT);
      const next =
        dir === "prev"
          ? Math.max(prev - VISIBLE_COUNT, 0)
          : Math.min(prev + VISIBLE_COUNT, maxStart);
      const mid = midOfWindow(next);
      if (mid !== null) setExpandedCarouselIndex(mid);
      return next;
    });
  };

  const toggleCarouselExpand = (idx) => {
    setExpandedCarouselIndex((prev) => (prev === idx ? null : idx));
  };

  const bannerSrc =
    toPublic(__supabaseUrl, __bucket, project?.banner) ||
    allImages[0] ||
    toPublic(__supabaseUrl, __bucket, project?.archiveImage) ||
    "/assets/images/space.jpg";

  return (
    <>
      <MetaHead />
      <SvgHead />

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

            <div className="mb-article-inner">
              <div
                className="mb-banner-wrap"
                style={{
                  width: "100%",
                  maxWidth: "1400px",
                  margin: "0 auto",
                }}
              >
                <img
                  ref={bannerRef}
                  className="banner mb-banner"
                  src={bannerSrc}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div
                className="mb-title-wrap"
                style={{
                  position: "relative",
                  left: "50%",
                  width: "min(92vw, 1450px)",
                  maxWidth: "calc(100vw - 2rem)",
                  margin: "0 auto",
                  padding: 0,
                  boxSizing: "border-box",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                <AutoFitText
                  as="h1"
                  text={(project.title || "").toUpperCase()}
                  className="mb-title"
                  minSize={44}
                  maxSize={150}
                  maxLines={2}
                  mobileMaxLines={6}
                  style={{
                    margin: "1rem auto 0.75rem",
                    padding: 0,
                    width: "fit-content",
                    maxWidth: "100%",
                    lineHeight: 0.9,
                    fontWeight: 400,
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    textIndent: 0,
                    whiteSpace: "normal",
                    wordBreak: "normal",
                    overflowWrap: "anywhere",
                    hyphens: "none",
                    textWrap: "balance",
                    textAlign: "left",
                  }}
                />

                {subtitle ? (
                  <AutoFitText
                    as="p"
                    text={subtitle}
                    className="mb-article-subtitle"
                    minSize={20}
                    maxSize={54}
                    maxLines={2}
                    mobileMaxLines={3}
                    style={{
                      width: "fit-content",
                      maxWidth: "min(88vw, 1200px)",
                      margin: "0 auto 1.1rem",
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                      textAlign: "center",
                      whiteSpace: "normal",
                      wordBreak: "normal",
                      hyphens: "none",
                      color: "var(--text-color)",
                    }}
                  />
                ) : null}
              </div>

              <h2 className="mb-subtitle">by {project.author || "Unknown"}</h2>
              <h3 className="mb-meta">
                {project.volume || "Volume"}{" "}
                <span className="date">{formatDate(project.date)}</span>
              </h3>

              {contentBlocks[0]?.text && (
                <p
                  className="intro-paragraph"
                  dangerouslySetInnerHTML={{ __html: contentBlocks[0].text }}
                />
              )}

              {contentBlocks.slice(1, -1).map((block, i) => {
                const imgIndex = i;
                const side = alternatingAlign(i);
                const floatStyle = {
                  float: side,
                  margin: side === "left" ? "0 1rem 1rem 0" : "0 0 1rem 1rem",
                };
                const imgSrc = allImages[imgIndex];

                return (
                  <div
                    key={imgIndex}
                    className="mb-block-row"
                    style={{ overflow: "hidden", marginBottom: "2rem" }}
                  >
                    {imgSrc && (
                      <img
                        id={`img-${imgIndex}`}
                        src={imgSrc}
                        alt={`Project Image ${imgIndex + 1}`}
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
                    )}
                    <div
                      className="text-block mb-text"
                      dangerouslySetInnerHTML={{ __html: block?.text || "" }}
                    />
                  </div>
                );
              })}

              {contentBlocks.at(-1)?.text && (
                <p
                  className="outro-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: contentBlocks.at(-1).text,
                  }}
                />
              )}

              {shouldShowGallery && (
                <div
                  className="gallery-wrapper"
                  style={{ maxWidth: "1400px", margin: "3rem auto" }}
                >
                  <div className="gallery-header">
                    <h4>Gallery Images</h4>
                    {gallery.length > 4 && (
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
                    {gallery
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

              {project.resources && (
                <section className="resources" id="resources">
                  <h4>Resources &amp; Links</h4>
                  <div className="navs-wrapper">
                    {Object.entries(project.resources).map(
                      ([category, links]) => (
                        <div key={category} className="resource-category">
                          <h5 className="category-title">{category}</h5>
                          <ul className="sub-resource-list">
                            {(links || []).map((link, i) => (
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

export async function getServerSideProps({ params }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "post-images";

  if (!supabaseUrl || !serviceRole) {
    return { notFound: true };
  }

  const supabase = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false },
  });

  const slug = params?.slug;

  // 1) core post
  let { data: post, error: pErr } = await supabase
    .from("posts")
    .select(
      "id, title, Subtitle, slug, excerpt, banner_url, archive_image_url, volume, author, date, status, type"
    )
    .eq("type", "portfolio")
    .eq("slug", slug)
    .maybeSingle();

  if (pErr) {
    const fallback = await supabase
      .from("posts")
      .select(
        "id, title, slug, excerpt, banner_url, archive_image_url, volume, author, date, status, type"
      )
      .eq("type", "portfolio")
      .eq("slug", slug)
      .maybeSingle();

    post = fallback.data;
    pErr = fallback.error;
  }

  if (pErr || !post) return { notFound: true };

  // 2) sections
  const { data: sections } = await supabase
    .from("posts_sections")
    .select("position, heading, body")
    .eq("post_id", post.id)
    .order("position", { ascending: true });

  // 3) images
  const { data: imgs } = await supabase
    .from("post_images")
    .select("position, storage_path, kind")
    .eq("post_id", post.id)
    .neq("kind", "banner")
    .order("position", { ascending: true });

  // 4) resources
  const { data: groups } = await supabase
    .from("resource_groups")
    .select("id, name, position")
    .eq("post_id", post.id)
    .order("position", { ascending: true });

  let resources = null;
  if (Array.isArray(groups) && groups.length) {
    const groupIds = groups.map((g) => g.id);

    const { data: links } = await supabase
      .from("resource_links")
      .select("group_id, label, url, external, position")
      .in("group_id", groupIds)
      .order("position", { ascending: true });

    resources = {};
    for (const g of groups) {
      const arr = (links || []).filter((l) => l.group_id === g.id);
      resources[g.name] = arr.map((l) => ({
        label: l.label,
        url: l.url,
        external: !!l.external,
      }));
    }
  }

  const project = {
    title: post.title || "",
    subtitle: post.subtitle || post.Subtitle || "",
    slug: post.slug,
    excerpt: post.excerpt || "",
    banner: post.banner_url || null,
    archiveImage: post.archive_image_url || null,
    volume: post.volume || null,
    author: post.author || null,
    date: post.date || null,
    content: (sections || []).map((s) => ({
      heading: s.heading || null,
      text: s.body || "",
    })),
    images: (imgs || []).map((i) => i.storage_path).filter(Boolean),
    resources: resources || null,
  };

  return {
    props: {
      project,
      __supabaseUrl: supabaseUrl,
      __bucket: bucket,
    },
  };
}

export default ProjectPost;
