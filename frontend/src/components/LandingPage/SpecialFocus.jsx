import React, { useEffect, useState } from "react";
import Link from "next/link";

const getHref = (item, base = "/Portfolio") => `${base}/${item.slug}`;

const FALLBACK_THUMB = "/assets/images/space.webp";
const FALLBACK_SIDEBAR = "/assets/images/stellarisWorkflow.webp";
const PODCAST_FALLBACK_IMG = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-images/Podcast.png`;

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
  const [sidebarImage, setSidebarImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      try {
        setLoading(true);
        setFailed(false);

        const res = await fetch("/api/portfolio/special-focus?limit=4", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();

        if (active) {
          setCurrent(Array.isArray(data?.items) ? data.items : []);
          setSidebarImage(data?.sidebarImage || "");
        }
      } catch (e) {
        console.error("SpecialFocus fetch failed:", e);
        if (active) {
          setCurrent([]);
          setSidebarImage("");
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

  const podcastCard = {
    title: "Midnight Bureau Podcast",
    excerpt: "Conversations on strategy, tech, and influence (coming soon).",
    slug: "podcast",
    _href: "/Podcast",
    _isPodcast: true,
    imageUrl: PODCAST_FALLBACK_IMG,
    imageAlt: "Podcast cover",
    date: null,
  };

  const cards = [...current, podcastCard];

  const IMG_MAX_W_DESKTOP = 220;
  const ASPECT_RATIO = "16 / 10";

  return (
    <div
      className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
      data-armstrong-id="primary"
    >
      <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
        <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
          Special Focus
        </h3>
        <h4
          className="fs-18 mb-15 fs-md-16"
          data-armstrong-id="module_subtitle"
        >
          Specific topics I am working on currently.
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
              alt="Special Focus Visual"
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

          {/* Cards on the left */}
          <div className="col-12 col-md-7" data-armstrong-id="grid_2">
            {loading && (
              <div className="col-12 body-s c-text-secondary">
                Loading special focus…
              </div>
            )}

            {!loading && failed && (
              <div className="col-12 body-s c-text-secondary">
                Couldn’t load special focus items from Supabase.
              </div>
            )}

            {!loading && !failed && current.length === 0 && (
              <div className="col-12 body-s c-text-secondary">
                No “Current & In-Progress Work” items yet — add them in Supabase
                and they’ll appear here automatically.
              </div>
            )}

            {!loading &&
              !failed &&
              cards.map((item, i) => {
                const isPodcast = !!item._isPodcast;
                const href = item._href || getHref(item);
                const imgSrc = item.imageUrl || FALLBACK_THUMB;
                const title = item.title || "Untitled";
                const excerpt = item.excerpt || "Details coming soon.";
                const dateDisplay = formatDate(item.date);

                return (
                  <div
                    key={`${item.slug || title}-${i}`}
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
                      aria-label={title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        borderRadius: 6,
                      }}
                    />

                    {/* Text */}
                    <div
                      className="col-9 col-md-8 d-flex flex-column"
                      style={{ justifyContent: "flex-start" }}
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
                        <time dateTime={item.date || ""}>{dateDisplay}</time>
                      </p>
                    </div>

                    {/* Thumbnail */}
                    <div
                      className="col-3 col-md-4 d-flex"
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingTop: 0,
                      }}
                    >
                      {isPodcast && (
                        <div
                          className="home-podcast-icon"
                          aria-label="podcast"
                          style={{ marginRight: 8 }}
                        >
                          <svg
                            style={{ width: 14, height: 14, display: "block" }}
                          >
                            <use href="#icon-podcast" />
                          </svg>
                        </div>
                      )}

                      <img
                        src={imgSrc}
                        alt={item.imageAlt || title}
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
  );
}