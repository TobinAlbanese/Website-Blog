// components/FeaturedPapers.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

const FALLBACK_THUMB = "/assets/images/space.webp";
const FALLBACK_SIDEBAR = "/assets/images/Russia4.webp";

const getHref = (p) => {
  if (p?.href) return p.href;

  if (p?.type === "mb") {
    return `/MidnightBureau/${p.slug}`;
  }

  return `/Portfolio/${p.slug}`;
};

const formatDate = (iso) => {
  if (!iso) return "";

  const d = new Date(iso);

  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const firstTruthy = (...xs) => xs.find(Boolean);

const pickPostImage = (post) =>
  firstTruthy(
    post?.imageUrl,
    post?.displayImage,
    post?.banner_url,
    post?.banner,
    post?.archive_image_url,
    post?.archiveImage,
    FALLBACK_THUMB
  );

export default function FeaturedPapers() {
  const [posts, setPosts] = useState([]);
  const [sidebarImage, setSidebarImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchFeatured() {
      try {
        setLoading(true);
        setFailed(false);

        const res = await fetch("/api/portfolio/featured-papers", {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();

        if (!active) return;

        setPosts(Array.isArray(data?.posts) ? data.posts.slice(0, 4) : []);
        setSidebarImage(data?.sidebarImage || "");
      } catch (e) {
        console.error("FeaturedPapers fetch failed:", e);

        if (!active) return;

        setPosts([]);
        setSidebarImage("");
        setFailed(true);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchFeatured();

    return () => {
      active = false;
    };
  }, []);

  const IMG_MAX_W_DESKTOP = 220;
  const ASPECT_RATIO = "16 / 10";

  return (
    <section
      className="c-bg"
      data-armstrong-id="wrapper"
      id="featured-papers-section"
    >
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
        data-armstrong-id="primary"
      >
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Featured Papers
          </h3>

          <h4
            className="fs-18 mb-15 fs-md-16"
            data-armstrong-id="module_subtitle"
          >
            Selected writing & research.
          </h4>
        </div>

        <div className="col-12">
          <div
            className="row justify-between flex-row-reverse d-flex"
            data-armstrong-id="row"
          >
            {/* Large right image */}
            <div className="col-12 col-md-5 d-flex justify-center align-items-center home-hide-narrow">
              <img
                src={sidebarImage || FALLBACK_SIDEBAR}
                alt="Featured papers artwork"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_SIDEBAR;
                }}
                style={{
                  maxWidth: "100%",
                  height: 650,
                  borderRadius: 8,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Cards */}
            <div className="col-12 col-md-7" data-armstrong-id="grid_2">
              {loading && (
                <div className="col-12 body-s c-text-secondary">
                  Loading featured papers…
                </div>
              )}

              {!loading && failed && (
                <div className="col-12 body-s c-text-secondary">
                  Couldn’t load featured papers from Supabase.
                </div>
              )}

              {!loading && !failed && posts.length === 0 && (
                <div className="col-12 body-s c-text-secondary">
                  No featured papers yet.
                </div>
              )}

              {!loading &&
                !failed &&
                posts.map((p, i) => {
                  const href = getHref(p);
                  const img = pickPostImage(p);
                  const title = p.title || "Untitled";
                  const desc = p.excerpt || "Read the full paper.";
                  const author = p.author || "Tobin Albanese";
                  const dateDisplay = formatDate(p.date);

                  return (
                    <div
                      key={p.slug || `${title}-${i}`}
                      className={
                        "card row card--large justify-between col-12 ml-0 mr-0 mb-20 " +
                        (i === 0 ? "border-top border-top-thin pt-20 " : "") +
                        "border-bottom border-bottom-thin c-border"
                      }
                      style={{
                        alignItems: "stretch",
                        position: "relative",
                      }}
                    >
                      <Link
                        href={href}
                        aria-label={title}
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 1,
                          borderRadius: 6,
                        }}
                      />

                      <div
                        className="col-9 col-md-8 ml-0 d-flex flex-column"
                        style={{ minHeight: 0 }}
                      >
                        <h3
                          className="body-m"
                          style={{
                            marginBottom: 6,
                            textTransform: "none",
                          }}
                        >
                          <span>{title}</span>
                        </h3>

                        <p
                          className="body-s c-text-secondary"
                          style={{ marginBottom: 10 }}
                        >
                          <span>{desc}</span>
                        </p>

                        <p
                          className="body-s c-accent home-hide-meta"
                          style={{
                            fontSize: "0.9rem",
                            marginTop: "auto",
                            marginBottom: 0,
                            paddingTop: 8,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span>{author}</span>

                          {dateDisplay && (
                            <>
                              <span
                                aria-hidden="true"
                                style={{
                                  lineHeight: 1,
                                  transform: "translateY(-0.5px)",
                                }}
                              >
                                ✵
                              </span>

                              <time dateTime={p.date || ""}>
                                {dateDisplay}
                              </time>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="col-3 col-md-4 mr-0 home-card-thumb">
                        <figure style={{ margin: 0 }}>
                          <img
                            src={img}
                            alt={p.imageAlt || title}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = FALLBACK_THUMB;
                            }}
                            style={{
                              width: "100%",
                              maxWidth: IMG_MAX_W_DESKTOP,
                              aspectRatio: ASPECT_RATIO,
                              objectFit: "cover",
                              borderRadius: 6,
                              display: "block",
                            }}
                          />
                        </figure>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}