// components/FeaturedPapers.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

const getHref = (p) => `/Portfolio/${p.slug}`;

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

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

const publicBucketUrl = (path) => {
  if (!SB_URL || !path) return "";
  return `${SB_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${String(path).replace(/^\/+/, "")}`;
};

const postsBucketUrl = (path) => {
  if (!SB_URL || !path) return "";
  return `${SB_URL}/storage/v1/object/public/${POSTS_BUCKET}/${String(path).replace(/^\/+/, "")}`;
};

const toResolvedImageUrl = (src) => {
  if (!src) return "";

  const value = String(src).trim();
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) return value;

  const assetsMatch = value.match(/^\/assets\/images\/(.+)$/i);
  if (assetsMatch?.[1]) {
    return publicBucketUrl(assetsMatch[1]);
  }

  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  return publicBucketUrl(value);
};

const pickPostImage = (post) => {
  const raw =
    post?.image_url ||
    post?.banner_url ||
    post?.banner ||
    post?.archive_image_url ||
    post?.archiveImage ||
    post?.archiveImageUrl ||
    post?.imageUrl ||
    post?.image ||
    "";

  return post?.imageUrl || toResolvedImageUrl(raw) || "";
};

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

        const res = await fetch("/api/portfolio/featured-papers?perGroup=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
        const selected = Array.isArray(data?.posts) ? data.posts : [];

        if (active) {
          setPosts(selected);
          setSidebarImage(data?.sidebarImage || "");
        }
      } catch (e) {
        console.error("FeaturedPapers fetch failed:", e);
        if (active) {
          setPosts([]);
          setSidebarImage("");
          setFailed(true);
        }
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
              {sidebarImage ? (
                <img
                  src={sidebarImage}
                  alt="Featured papers artwork"
                  loading="lazy"
                  onLoad={() =>
                    console.log("Sidebar image loaded:", sidebarImage)
                  }
                  onError={() =>
                    console.log("Sidebar image failed:", sidebarImage)
                  }
                  style={{
                    maxWidth: "100%",
                    height: 650,
                    borderRadius: 8,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div className="body-s c-text-secondary">No sidebar image</div>
              )}
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
                  No featured papers yet. Once you create portfolio groups +
                  items in Supabase, they’ll appear here automatically.
                </div>
              )}

              {!loading &&
                !failed &&
                posts.map((p, i) => {
                  const href = getHref(p);
                  const img = pickPostImage(p) || "/assets/images/space.webp";
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
                      style={{ alignItems: "stretch", position: "relative" }}
                    >
                      <Link
                        href={href}
                        aria-label={title}
                        style={{ position: "absolute", inset: 0, zIndex: 1 }}
                      />

                      <div
                        className="col-9 col-md-8 ml-0 d-flex flex-column"
                        style={{ minHeight: 0 }}
                      >
                        <h3
                          className="body-m"
                          style={{ marginBottom: 6, textTransform: "none" }}
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
                          <span
                            aria-hidden="true"
                            style={{
                              lineHeight: 1,
                              transform: "translateY(-0.5px)",
                            }}
                          >
                            ✵
                          </span>
                          <time dateTime={p.date || ""}>{dateDisplay}</time>
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
                              e.currentTarget.src = "/assets/images/space.webp";
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
