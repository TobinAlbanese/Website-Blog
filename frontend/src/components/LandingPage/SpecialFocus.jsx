import React, { useEffect, useState } from "react";
import Link from "next/link";

const getHref = (item, base = "/Portfolio") => `${base}/${item.slug}`;

// all webp now
const FALLBACK_THUMB = "/assets/images/space.webp";
const LEFT_VISUAL = "/assets/images/stellarisWorkflow.webp";
const PODCAST_FALLBACK_IMG = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-images/Podcast.png`;

export default function SpecialFocus() {
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        setFailed(false);
        const res = await fetch("api/portfolio/special-focus?limit=4");
        const data = await res.json();
        setCurrent(Array.isArray(data?.items) ? data.items : []);
      } catch (e) {
        console.error("SpecialFocus fetch failed:", e);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Podcast card (kept as a static card unless/until you store it in DB)
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

  // Desktop thumb sizing stays exactly like before
  const IMG_MAX_W_DESKTOP = 220;
  const ASPECT_RATIO = "16 / 10";

  return (
    <div
      className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
      data-armstrong-id="primary"
    >
      {/* Heading */}
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

      {/* Content */}
      <div className="col-12">
        <div
          className="row justify-between flex-row-reverse d-flex"
          data-armstrong-id="row"
        >
          {/* Large image on the left */}
          <div className="col-12 col-md-5 d-flex justify-center align-items-center home-hide-narrow">
            <img
              src={LEFT_VISUAL}
              alt="Special Focus Visual"
              style={{
                maxWidth: "100%",
                height: 650,
                borderRadius: 8,
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>

          {/* Cards on the right */}
          <div
            className="col-12 col-md-7 items-start"
            data-armstrong-id="grid_2"
          >
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

                const dateDisplay = item.date
                  ? new Date(item.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "";

                return (
                  <div
                    key={`${item.slug || title}-${i}`}
                    className={`card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border ${
                      i === 0 ? "border-top border-top-thin pt-20" : ""
                    }`}
                    style={{ position: "relative", alignItems: "stretch" }}
                  >
                    {/* FULL-CARD CLICKABLE OVERLAY */}
                    <Link
                      href={href}
                      aria-label={title}
                      style={{ position: "absolute", inset: 0, zIndex: 1 }}
                    />

                    {/* LEFT: title + excerpt + date pinned to bottom */}
                    <div
                      className="mb-20 col-9 col-md-8 ml-0 d-flex flex-column"
                      style={{ minHeight: 0 }}
                    >
                      <h3 className="body-m" style={{ marginBottom: 6 }}>
                        <span>{title}</span>
                      </h3>

                      <h4
                        className="body-s c-text-secondary"
                        style={{ marginBottom: 0 }}
                      >
                        <span>{excerpt}</span>
                      </h4>

                      <p
                        className="body-xs-smallcaps c-accent home-hide-meta"
                        style={{
                          marginTop: "auto",
                          paddingTop: 6,
                          marginBottom: 0,
                        }}
                      >
                        <span>{dateDisplay}</span>
                      </p>
                    </div>

                    {/* RIGHT: thumbnail + podcast icon */}
                    <div
                      className="col-3 col-md-4 mr-0 home-card-thumb d-flex"
                      style={{ justifyContent: "flex-end", paddingBottom: 10 }}
                    >
                      {isPodcast && (
                        <div className="home-podcast-icon" aria-label="podcast">
                          <svg
                            style={{ width: 14, height: 14, display: "block" }}
                          >
                            <use href="#icon-podcast" />
                          </svg>
                        </div>
                      )}

                      <figure style={{ margin: 0 }}>
                        <img
                          src={imgSrc}
                          alt={item.imageAlt || title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            maxWidth: 220,
                            aspectRatio: "16 / 10",
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
  );
}
