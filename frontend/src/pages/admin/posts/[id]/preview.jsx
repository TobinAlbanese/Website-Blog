// src/pages/admin/posts/[id]/preview.jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MetaHead from "../../../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "../../../../components/LandingPage/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import AdminNavbar from "../../../../components/Admin/AdminNavbar.jsx";
import AutoFitText from "../../../../components/AutoFitText.jsx";

import {
  supabase,
  BUCKET,
  storagePathToPublicUrl,
} from "../../../../lib/supabase/client";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formatDate = (d) => {
  const dt = d ? new Date(d) : null;
  return dt && !isNaN(dt) ? dt.toDateString() : "";
};

const isHttpUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);

function resolvePublicOrRaw(v) {
  if (!v) return "";
  if (isHttpUrl(v)) return v;
  return storagePathToPublicUrl(v) || "";
}

async function toSignedUrl(storage_path, expiresIn = 60 * 60) {
  if (!storage_path) return "";
  if (isHttpUrl(storage_path)) return storage_path;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storage_path, expiresIn);

  if (error) return "";
  return data?.signedUrl || "";
}

async function resolveImage(storageOrUrl) {
  if (!storageOrUrl) return "";
  if (isHttpUrl(storageOrUrl)) return storageOrUrl;
  return await toSignedUrl(storageOrUrl);
}

function splitHtmlIntoBlocks(html = "") {
  if (!html) return [];

  const matches =
    html.match(
      /<p[\s\S]*?<\/p>|<blockquote[\s\S]*?<\/blockquote>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<h[1-6][\s\S]*?<\/h[1-6]>/gi
    ) || [];

  const rawBlocks = matches.length ? matches : [html];

  return rawBlocks.map((blockHtml) => {
    const plain = blockHtml
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const isSpacer =
      /^<p[\s\S]*?>\s*(<br\s*\/?>|\s|&nbsp;)*<\/p>$/i.test(blockHtml) ||
      plain.length === 0;

    const isHeading = /^<h[1-6][\s\S]*?>/i.test(blockHtml);
    const acceptsInline =
      /^<p[\s\S]*?>/i.test(blockHtml) ||
      /^<blockquote[\s\S]*?>/i.test(blockHtml);

    return {
      html: blockHtml,
      plain,
      isSpacer,
      isHeading,
      acceptsInline,
    };
  });
}

export default function AdminPostid() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [sections, setSections] = useState([]);
  const [loadErr, setLoadErr] = useState(null);

  const [visibleImages, setVisibleImages] = useState({});
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const bannerRef = useRef(null);

  const [bannerResolved, setBannerResolved] = useState("");
  const [inlineResolvedBySection, setInlineResolvedBySection] = useState({});
  const [centerResolvedBySection, setCenterResolvedBySection] = useState({});
  const [galleryResolved, setGalleryResolved] = useState([]);

  const subtitle = (article?.subtitle || article?.Subtitle || "").trim();


  
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      try {
        setLoadErr(null);
        setArticle(null);
        setSections([]);

        const { data: p, error: pErr } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (pErr) throw pErr;
        if (!p) throw new Error("Post not found.");

        const { data: s, error: sErr } = await supabase
          .from("posts_sections")
          .select("*")
          .eq("post_id", id)
          .order("position", { ascending: true });

        if (sErr) throw sErr;

        const { data: imgs, error: iErr } = await supabase
          .from("post_images")
          .select("*")
          .eq("post_id", id)
          .order("position", { ascending: true });

        if (iErr) throw iErr;

        const { data: groups, error: gErr } = await supabase
          .from("resource_groups")
          .select("*")
          .eq("post_id", id)
          .order("position", { ascending: true });

        if (gErr) throw gErr;

        const groupIds = (groups || []).map((g) => g.id);
        let links = [];
        if (groupIds.length) {
          const { data: lData, error: lErr } = await supabase
            .from("resource_links")
            .select("*")
            .in("group_id", groupIds)
            .order("position", { ascending: true });
          if (lErr) throw lErr;
          links = lData || [];
        }

        const resources = {};
        (groups || []).forEach((g) => {
          resources[g.name || "Resources"] = (links || [])
            .filter((l) => l.group_id === g.id)
            .map((l) => ({ label: l.label, url: l.url, external: true }));
        });

        const inl = (imgs || []).filter((x) => x.kind === "inline");
        const cen = (imgs || []).filter((x) => x.kind === "center");
        const gal = (imgs || []).filter((x) => x.kind === "gallery");

        const a = {
          ...p,
          inline_images: inl,
          center_images: cen,
          gallery_images: gal,
          resources,
        };

        if (!cancelled) {
          setArticle(a);
          setSections(Array.isArray(s) ? s : []);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadErr(e?.message || "Failed to load post");
          setArticle(null);
          setSections([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!article) return;
    let cancelled = false;

    (async () => {
      const bannerUrl = (await resolveImage(article.banner_url)) || "";

      const buildSectionMap = async (rows) => {
        const sorted = [...rows].sort(
          (a, b) => (a.position || 0) - (b.position || 0)
        );

        const entries = await Promise.all(
          sorted.map(async (r) => {
            const url = await resolveImage(r.storage_path);
            return { section_id: r.section_id, url, row: r };
          })
        );

        const map = {};
        entries.forEach(({ section_id, url }) => {
          if (!section_id || !url) return;
          if (!map[section_id]) map[section_id] = [];
          map[section_id].push(url);
        });

        return map;
      };

      const inlineMap = await buildSectionMap(article.inline_images || []);
      const centerMap = await buildSectionMap(article.center_images || []);

      const gallerySourceRows = [
        ...(article.gallery_images || []),
        ...(article.inline_images || []).filter((r) => r.show_in_gallery),
        ...(article.center_images || []).filter((r) => r.show_in_gallery),
      ];

      const seen = new Set();
      const dedupedGalleryRows = gallerySourceRows.filter((r) => {
        const key = r.id || r.storage_path;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      const galleryUrls = await Promise.all(
        dedupedGalleryRows.map((r) => resolveImage(r.storage_path))
      );

      if (cancelled) return;

      setBannerResolved(bannerUrl);
      setInlineResolvedBySection(inlineMap);
      setCenterResolvedBySection(centerMap);
      setGalleryResolved(galleryUrls.filter(Boolean));
    })();

    return () => {
      cancelled = true;
    };
  }, [article]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bannerRef.current) {
        const offsetTop =
          bannerRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: offsetTop - 50, behavior: "smooth" });
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [article?.id]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!article) return;

    document.body.setAttribute("data-highlight", "underline");

    const handleScroll = () => {
      const nextVisible = {};

      const inlineEls = document.querySelectorAll("[data-inline-image='true']");

      inlineEls.forEach((el) => {
        const key = el.getAttribute("data-inline-key");
        if (!key) return;

        const rect = el.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

        nextVisible[key] = isVisible;
      });

      setVisibleImages(nextVisible);

      const header = document.querySelector("h1");
      const headerBelowView =
        header && header.getBoundingClientRect().bottom < 0;
      setShowTopLink(!!headerBelowView);
      setShowBottomLink(!!headerBelowView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [article, sections, inlineResolvedBySection]);

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const alternatingAlign = (i) => (i % 2 === 0 ? "right" : "left");

  if (!id) return <p style={{ padding: "2rem" }}>Loading…</p>;
  if (loadErr) return <p style={{ padding: "2rem" }}>Error: {loadErr}</p>;
  if (!article) return <p style={{ padding: "2rem" }}>Loading post…</p>;

 const bannerSrc = bannerResolved || "/assets/images/space.webp";

const safeSections = Array.isArray(sections) ? sections : [];
const hasMultipleSections = safeSections.length > 1;
const introSection = hasMultipleSections ? safeSections[0] : null;
const bodySections = hasMultipleSections ? safeSections.slice(1) : safeSections;

  const galleryImages = galleryResolved;

  const handleGalleryNav = (dir) => {
    setGalleryIdx((prev) => {
      const total = galleryImages.length;
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
          <AdminNavbar toggleMenu={toggleMenu} menuOpen={menuOpen} />

          <Head>
            <title>{article.title} – Admin Preview</title>
            <meta name="description" content={article.excerpt || ""} />
            <meta name="robots" content="noindex,nofollow" />
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

            <div className="mb-article-inner">
              <img
                ref={bannerRef}
                className="banner mb-banner"
                src={bannerSrc}
                alt="Banner"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  marginBottom: "-1rem",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    border: "1px solid var(--c-border, rgba(255,255,255,0.15))",
                    opacity: 0.85,
                  }}
                >
                  Admin Preview • {article.status}
                </span>
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
                  text={(article.title || "").toUpperCase()}
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
              <h2 className="mb-subtitle">by {article.author || "Unknown"}</h2>
              <h3 className="mb-meta">
                {article.volume || "VOLUME"}{" "}
                <span className="date">{formatDate(article.date)}</span>
              </h3>

              {introSection?.body ? (
                <div
                  className="intro-paragraph"
                  dangerouslySetInnerHTML={{ __html: introSection.body }}
                />
              ) : null}

              {bodySections.map((sec, sectionIdx) => {
                const inlineList = inlineResolvedBySection[sec.id] || [];
                const centerList = centerResolvedBySection[sec.id] || [];
                const blocks = splitHtmlIntoBlocks(sec?.body || "");

                let inlineCursor = 0;
                let centerCursor = 0;

                const renderedBlocks = [];

                if (sec.heading?.trim()) {
                  renderedBlocks.push(
                    <h3 key={`${sec.id}-heading`} style={{ marginTop: 0 }}>
                      {sec.heading}
                    </h3>
                  );
                }

                blocks.forEach((block, blockIdx) => {
                  // Blank paragraph / spacer = centered image insertion point
                  if (block.isSpacer) {
                    const centeredSrc = centerList[centerCursor] || null;

                    if (centeredSrc) {
                      renderedBlocks.push(
                        <div
                          key={`${sec.id}-center-marker-${blockIdx}`}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "1.1rem 0",
                            clear: "both",
                          }}
                        >
                          <img
                            src={centeredSrc}
                            alt={`Centered Image ${centerCursor + 1}`}
                            style={{
                              width: "100%",
                              maxWidth: "760px",
                              height: "420px",
                              objectFit: "cover",
                              borderRadius: "16px",
                              display: "block",
                              cursor: "pointer",
                            }}
                            onClick={() => setModalImage(centeredSrc)}
                          />
                        </div>
                      );
                      centerCursor += 1;
                    }

                    // Do not render the empty spacer itself
                    return;
                  }

                  // Real paragraph/blockquote blocks can receive inline images
                  const inlineSrc =
                    block.acceptsInline && inlineCursor < inlineList.length
                      ? inlineList[inlineCursor]
                      : null;

                  const side = inlineCursor % 2 === 0 ? "right" : "left";

                  const floatStyle = {
                    float: side,
                    margin:
                      side === "left" ? "0 1rem 0.75rem 0" : "0 0 0.75rem 1rem",
                  };

                  renderedBlocks.push(
                    <div
                      key={`${sec.id}-block-${blockIdx}`}
                      style={{
                        overflow: "hidden",
                        marginBottom: "0.9rem",
                        clear: "both",
                      }}
                    >
                      {inlineSrc ? (
                        <img
                          id={`img-inline-${sec.id}-${inlineCursor}`}
                          data-inline-image="true"
                          data-inline-key={`${sec.id}-${inlineCursor}`}
                          src={inlineSrc}
                          alt={`Inline Image ${inlineCursor + 1}`}
                          className={`card-image mb-float-img ${
                            visibleImages[`${sec.id}-${inlineCursor}`]
                              ? "slide-in"
                              : ""
                          }`}
                          style={{
                            ...floatStyle,
                            width: "260px",
                            height: "380px",
                            objectFit: "cover",
                          }}
                          onClick={() => setModalImage(inlineSrc)}
                        />
                      ) : null}

                      <div
                        className="text-block mb-text"
                        dangerouslySetInnerHTML={{ __html: block.html }}
                      />
                    </div>
                  );

                  if (inlineSrc) inlineCursor += 1;
                });

                // Any remaining centered images go to the bottom of the section
                while (centerCursor < centerList.length) {
                  const centeredSrc = centerList[centerCursor];

                  renderedBlocks.push(
                    <div
                      key={`${sec.id}-center-bottom-${centerCursor}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "1.1rem 0 0.5rem",
                        clear: "both",
                      }}
                    >
                      <img
                        src={centeredSrc}
                        alt={`Centered Bottom ${centerCursor + 1}`}
                        style={{
                          width: "100%",
                          maxWidth: "760px",
                          height: "420px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          display: "block",
                          cursor: "pointer",
                        }}
                        onClick={() => setModalImage(centeredSrc)}
                      />
                    </div>
                  );

                  centerCursor += 1;
                }

                return (
                  <div key={sec.id} style={{ marginBottom: "2.75rem" }}>
                    {renderedBlocks}
                  </div>
                );
              })}

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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  position: "relative",
                }}
              >
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

              {article.resources &&
                Object.keys(article.resources).length > 0 && (
                  <section className="resources" id="resources">
                    <h4>Resources &amp; Archival References</h4>
                    <div className="navs-wrapper">
                      {Object.entries(article.resources).map(
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3.5rem 0 4.5rem",
            }}
          >
            <button
              className="admin-btn-soft"
              onClick={() => router.push(`/admin/posts/${id}`)}
            >
              ← Back to Editor
            </button>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
