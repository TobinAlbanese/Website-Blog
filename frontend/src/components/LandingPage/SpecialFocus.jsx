import React, { useEffect, useState } from "react";
import Link from "next/link";

const FALLBACK_THUMB = "/assets/images/space.webp";

const FALLBACK_SIDEBAR =
  "https://aekjhiphxycnybowwgud.supabase.co/storage/v1/object/public/public-images/Aircraft.webp";

const firstTruthy = (...xs) => xs.find(Boolean);

const pickProjectImg = (item) =>
  firstTruthy(
    item?.banner_url,
    item?.banner,
    item?.displayImage,
    item?.imageUrl,
    item?.archive_image_url,
    item?.archiveImage,
    FALLBACK_THUMB,
  );

const getHref = (item) => {
  if (item?.type === "mb") {
    return `/ResearchJournal/${item.slug}`;
  }

  return `/Portfolio/${item.slug}`;
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

export default function SpecialFocus() {
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      try {
        setLoading(true);
        setFailed(false);

        const res = await fetch("/api/portfolio/current-work", {
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

        if (active) {
          setCurrent(Array.isArray(data?.posts) ? data.posts : []);
        }
      } catch (e) {
        console.error("Current Work fetch failed:", e);

        if (active) {
          setCurrent([]);
          setFailed(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchItems();

    return () => {
      active = false;
    };
  }, []);

  const IMG_MAX_W_DESKTOP = 220;
  const ASPECT_RATIO = "16 / 10";

  return (
    <section className="theme-accent">
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
        data-armstrong-id="primary"
      >
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Current Work
          </h3>

          <h4
            className="fs-18 mb-15 fs-md-16"
            data-armstrong-id="module_subtitle"
          >
            Ongoing research and analytical projects currently in development.
          </h4>
        </div>

        <div className="col-12">
          <div
            className="row justify-between flex-row-reverse d-flex"
            data-armstrong-id="row"
          >
            {/* Large right image */}
            <div
              className="col-12 col-md-5 home-hide-narrow"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 32,
              }}
            >
              <img
                src={FALLBACK_SIDEBAR}
                alt="Additional research artwork"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_THUMB;
                }}
                className="home-floating-side-image"
                style={{
                  borderRadius: 18,
                }}
              />
            </div>

            {/* Cards */}
            <div className="col-12 col-md-7" data-armstrong-id="grid_2">
              {loading && (
                <div className="col-12 body-s c-text-secondary">
                  Loading current work…
                </div>
              )}

              {!loading && failed && (
                <div className="col-12 body-s c-text-secondary">
                  Couldn&apos;t load current work.
                </div>
              )}

              {!loading && !failed && current.length === 0 && (
                <div className="col-12 body-s c-text-secondary">
                  No current work available.
                </div>
              )}

              {!loading &&
                !failed &&
                current.map((item, i) => {
                  const imgSrc = pickProjectImg(item);
                  const title = item.title || "Untitled";
                  const excerpt = item.excerpt || "Details coming soon.";

                  const dateDisplay = formatDate(
                    item.date || item.published_at || item.created_at,
                  );

                  const href = getHref(item);

                  return (
                    <div
                      key={item.slug || `${title}-${i}`}
                      className={
                        "card row card--large justify-between col-12 ml-0 mr-0 pb-15 border-bottom border-bottom-thin c-border " +
                        (i === 0 ? "border-top border-top-thin pt-20" : "")
                      }
                      style={{
                        alignItems: "flex-start",
                        marginBottom: 14,
                        position: "relative",
                      }}
                    >
                      <Link
                        href={href}
                        aria-label={`Open: ${title}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 1,
                          borderRadius: 6,
                        }}
                      />

                      <div
                        className="col-9 col-md-8 d-flex flex-column"
                        style={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="body-m"
                          style={{
                            marginBottom: 8,
                            textTransform: "none",
                          }}
                        >
                          {title}
                        </h3>

                        <p
                          className="body-s c-text-secondary"
                          style={{
                            marginBottom: 12,
                            lineHeight: 1.55,
                          }}
                        >
                          {excerpt}
                        </p>

                        {dateDisplay && (
                          <p
                            className="body-s c-accent home-hide-meta"
                            style={{
                              fontSize: "0.9rem",
                              marginTop: "auto",
                              marginBottom: 18,
                              display: "flex",
                              gap: 10,
                            }}
                          >
                            <time>{dateDisplay}</time>
                          </p>
                        )}
                      </div>

                      <div
                        className="col-3 col-md-4 d-flex"
                        style={{
                          alignItems: "flex-start",
                          justifyContent: "center",
                          paddingTop: 0,
                        }}
                      >
                        <img
                          src={imgSrc}
                          alt={title}
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
                            objectPosition: "center",
                            borderRadius: 6,
                            display: "block",
                            margin: 0,
                          }}
                        />
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
