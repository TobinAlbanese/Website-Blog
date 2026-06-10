// pages/MidnightBureau/[slug].jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from "../../components/LandingPage/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";
import AutoFitText from "../../components/AutoFitText.jsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_IMG = "/assets/images/space.webp";

const formatDate = (d) => {
  const dt = d ? new Date(d) : null;
  return dt && !isNaN(dt) ? dt.toDateString() : "";
};

const isHttpUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);

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

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, anon, { auth: { persistSession: false } });
}

function resolveImageServer(supabase, bucket, value) {
  if (!value) return "";
  const v = String(value).trim();
  if (!v) return "";
  if (isHttpUrl(v) || v.startsWith("/")) return v;

  const { data } = supabase.storage.from(bucket).getPublicUrl(v);
  return data?.publicUrl || "";
}

export default function BlogPost({
  article,
  sections = [],
  inlineResolvedBySection = {},
  centerResolvedBySection = {},
  galleryResolved = [],
}) {
  const router = useRouter();

  const [visibleImages, setVisibleImages] = useState({});
  const [showTopLink, setShowTopLink] = useState(false);
  const [showBottomLink, setShowBottomLink] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [expandedCarouselIndex, setExpandedCarouselIndex] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [validGalleryImages, setValidGalleryImages] = useState([]);
  useEffect(() => {
    let cancelled = false;

    const rawGalleryImages = (galleryResolved || []).filter(
      (src) => typeof src === "string" && src.trim().length > 0
    );

    if (!rawGalleryImages.length) {
      setValidGalleryImages([]);
      return;
    }

    (async () => {
      const checks = await Promise.all(
        rawGalleryImages.map(
          (src) =>
            new Promise((resolve) => {
              const img = new window.Image();

              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
              img.src = src;
            })
        )
      );

      if (!cancelled) {
        setValidGalleryImages(checks.filter(Boolean));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [galleryResolved]);

  const bannerRef = useRef(null);

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

  if (router.isFallback) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (!article) return <p style={{ padding: "2rem" }}>Post not found.</p>;

  const bannerSrc = article.banner || FALLBACK_IMG;
  const safeSections = Array.isArray(sections) ? sections : [];
  const introSection = safeSections[0] || null;
  const bodySections = safeSections.slice(1);
  const galleryImages = validGalleryImages;

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

  const subtitle = (article?.subtitle || article?.Subtitle || "").trim();

  const toggleCarouselExpand = (idx) => {
    setExpandedCarouselIndex((prev) => (prev === idx ? null : idx));
  };

  const [isPhoneTitle, setIsPhoneTitle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPhone = () => {
      setIsPhoneTitle(window.innerWidth <= 480);
    };

    checkPhone();
    window.addEventListener("resize", checkPhone);

    return () => window.removeEventListener("resize", checkPhone);
  }, []);

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
          <NavbarMB toggleMenu={toggleMenu} menuOpen={menuOpen} />

          <Head>
            <title>{`${article.title || "Untitled"} – Midnight Bureau`}</title>
            <meta name="description" content={article.excerpt || ""} />
          </Head>

          <div className="midnight-bureau-article">
            {showTopLink && (
              <a href="#" className="vertical-link top-link">
                <span></span>Top of Article
              </a>
            )}

            {showBottomLink &&
              article.resources &&
              Object.keys(article.resources).length > 0 && (
                <a href="#resources" className="vertical-link bottom-link">
                  <span></span>More Resources
                </a>
              )}

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
                alt={article.title || "Banner"}
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
                key={`${article.id}-${isPhoneTitle ? "phone" : "desktop"}`}
                as="h1"
                text={(article.title || "").toUpperCase()}
                className="mb-title"
                minSize={isPhoneTitle ? 28 : 44}
                maxSize={isPhoneTitle ? 62 : 150}
                maxLines={isPhoneTitle ? 4 : 2}
                mobileMaxLines={isPhoneTitle ? 4 : 6}
                style={{
                  margin: "1rem auto 0.75rem",
                  padding: 0,
                  width: isPhoneTitle ? "100%" : "fit-content",
                  maxWidth: "100%",
                  lineHeight: isPhoneTitle ? 0.92 : 0.9,
                  fontWeight: 380,
                  letterSpacing: isPhoneTitle ? "-0.035em" : "-0.04em",
                  textTransform: "uppercase",
                  textIndent: 0,
                  whiteSpace: "normal",
                  wordBreak: "normal",
                  overflowWrap: isPhoneTitle ? "break-word" : "anywhere",
                  hyphens: "none",
                  textWrap: "balance",
                  textAlign: isPhoneTitle ? "center" : "left",
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

            <div className="mb-article-inner">
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

              {safeSections.length === 1 ? (
                <div
                  className="text-block mb-text"
                  dangerouslySetInnerHTML={{
                    __html: safeSections[0]?.body || "",
                  }}
                />
              ) : null}

              {bodySections.map((sec) => {
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

                    return;
                  }

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

              {galleryImages.length >= 5 && (
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
                            key={`${absoluteIdx}-${src}`}
                            className={`box ${
                              isExpanded
                                ? "expanded"
                                : expandedCarouselIndex === null
                                  ? ""
                                  : "closed"
                            }`}
                            onClick={() => toggleCarouselExpand(absoluteIdx)}
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={src}
                              alt={`Gallery Image ${absoluteIdx + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
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
}

export async function getServerSideProps({ params }) {
  const supabase = getServerSupabase();
  const POSTS_BUCKET = "post-images";
  const incomingSlug = String(params?.slug || "").trim();

  if (!incomingSlug) {
    return { notFound: true };
  }

  const { data: posts, error: postErr } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .eq("type", "mb");

  if (postErr || !posts?.length) {
    return { notFound: true };
  }

  const post =
    posts.find(
      (p) =>
        String(p.slug || "")
          .trim()
          .toLowerCase() === incomingSlug.toLowerCase()
    ) || null;

  if (!post) {
    return { notFound: true };
  }

  if (incomingSlug !== post.slug) {
    return {
      redirect: {
        destination: `/MidnightBureau/${post.slug}`,
        permanent: false,
      },
    };
  }

  const postId = post.id;

  const [
    { data: sectionsData, error: sectionsErr },
    { data: imagesData, error: imagesErr },
    { data: groupsData, error: groupsErr },
  ] = await Promise.all([
    supabase
      .from("posts_sections")
      .select("*")
      .eq("post_id", postId)
      .order("position", { ascending: true }),
    supabase
      .from("post_images")
      .select("*")
      .eq("post_id", postId)
      .order("position", { ascending: true }),
    supabase
      .from("resource_groups")
      .select("*")
      .eq("post_id", postId)
      .order("position", { ascending: true }),
  ]);

  if (sectionsErr) {
    console.log("Public MB slug sections error:", sectionsErr);
    return { notFound: true };
  }

  if (groupsErr) {
    console.log("Public MB slug resource_groups error:", groupsErr);
    return { notFound: true };
  }

  if (imagesErr) {
    console.log("Public MB slug post_images error:", imagesErr);
  }

  const groupIds = (groupsData || []).map((g) => g.id);

  let linksData = [];
  if (groupIds.length > 0) {
    const { data, error } = await supabase
      .from("resource_links")
      .select("*")
      .in("group_id", groupIds)
      .order("position", { ascending: true });

    if (error) {
      return { notFound: true };
    }

    linksData = data || [];
  }

  const resources = {};
  (groupsData || []).forEach((g) => {
    resources[g.name || "Resources"] = (linksData || [])
      .filter((l) => l.group_id === g.id)
      .map((l) => ({
        label: l.label,
        url: l.url,
        external: true,
      }));
  });

  const images = Array.isArray(imagesData) ? imagesData : [];
  const inlineRows = images.filter((x) => x.kind === "inline");
  const centerRows = images.filter((x) => x.kind === "center");
  const galleryRows = images.filter((x) => x.kind === "gallery");

  const buildSectionMap = (rows) => {
    const sorted = [...rows].sort(
      (a, b) => (a.position || 0) - (b.position || 0)
    );

    const map = {};

    sorted.forEach((r) => {
      const url = resolveImageServer(supabase, POSTS_BUCKET, r.storage_path);
      if (!r.section_id || !url) return;

      if (!map[r.section_id]) map[r.section_id] = [];
      map[r.section_id].push(url);
    });

    return map;
  };

  const inlineResolvedBySection = buildSectionMap(inlineRows);
  const centerResolvedBySection = buildSectionMap(centerRows);

  const firstInlineResolved =
    inlineRows
      .map((r) => resolveImageServer(supabase, POSTS_BUCKET, r.storage_path))
      .find(Boolean) || "";

  const hasRealPath = (row) => !!String(row?.storage_path || "").trim();

  const gallerySourceRows = [
    ...galleryRows.filter(hasRealPath),
    ...inlineRows.filter((r) => r.show_in_gallery && hasRealPath(r)),
    ...centerRows.filter((r) => r.show_in_gallery && hasRealPath(r)),
  ];

  const seen = new Set();
  const dedupedGalleryRows = gallerySourceRows.filter((r) => {
    const path = String(r?.storage_path || "").trim();
    const key = path || String(r?.id || "").trim();

    if (!key) return false;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });

  const galleryResolved = dedupedGalleryRows
    .map((r) => resolveImageServer(supabase, POSTS_BUCKET, r.storage_path))
    .filter((src) => !!String(src || "").trim());

  const bannerResolved =
    resolveImageServer(supabase, POSTS_BUCKET, post.banner_url) || "";

  const archiveResolved =
    resolveImageServer(supabase, POSTS_BUCKET, post.archive_image_url) || "";

  const article = {
    ...post,
    author: post.author || "Tobin Albanese",
    excerpt: post.excerpt || "",
    volume: post.volume || post.category || "MIDNIGHT BUREAU",
    date: post.published_at || post.date || post.created_at || null,
    banner:
      bannerResolved || firstInlineResolved || archiveResolved || FALLBACK_IMG,
    archiveImage:
      archiveResolved || firstInlineResolved || bannerResolved || FALLBACK_IMG,
    resources,
  };

  return {
    props: {
      article,
      sections: sectionsData || [],
      inlineResolvedBySection,
      centerResolvedBySection,
      galleryResolved,
    },
  };
}
