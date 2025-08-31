import React from "react";
import Link from "next/link";
import PortfolioData from "../../data/portfolioData";
import PodcastData from "../../data/PodcastData";

const getSection = (name) =>
  Array.isArray(PortfolioData?.[name]) ? PortfolioData[name] : [];

const uniqBySlug = (arr) => {
  const seen = new Set();
  return (arr || []).filter(
    (x) => x?.slug && !seen.has(x.slug) && seen.add(x.slug)
  );
};

const getImg = (item) =>
  item?.images?.[0] || item?.archiveImage || "/assets/images/space.jpg";

const getHref = (item, base = "/Portfolio") => `${base}/${item.slug}`;

export default function SpecialFocus() {
  const current = uniqBySlug(getSection("Current & In-Progress Work")).slice(
    0,
    3
  );

  const podcastItems = Array.isArray(PodcastData?.items)
    ? PodcastData.items
    : [];
  const podcastFromData = podcastItems[0] || null;

  const podcastCard = podcastFromData
    ? {
        ...podcastFromData,
        _isPodcast: true,
        _href: getHref(podcastFromData, "/Podcast"),
      }
    : {
        title: "Midnight Bureau Podcast",
        excerpt:
          "Conversations on strategy, tech, and influence (coming soon).",
        slug: "podcast",
        _href: "/Podcast",
        _isPodcast: true,
        images: ["/assets/images/podcast-cover.jpg"],
      };

  const cards = [...current, podcastCard];

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
          <div className="col-12 col-md-5 d-flex justify-center align-items-center">
            <img
              src="/assets/images/stellarisWorkflow.jpg"
              alt="Special Focus Visual"
              style={{
                maxWidth: "100%",
                height: 650,
                borderRadius: 8,
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </div>

          {/* Cards on the right */}
          <div
            className="col-12 col-md-7 items-start"
            data-armstrong-id="grid_2"
          >
            {cards.map((item, i) => {
              const isPodcast = !!item._isPodcast;
              const href = item._href || getHref(item);
              const imgSrc = getImg(item);
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

                    {/* pushes date to bottom; sits right above the bottom line */}
                    <p
                      className="body-xs-smallcaps c-accent"
                      style={{
                        marginTop: "auto",
                        paddingTop: 6,
                        marginBottom: 0,
                      }}
                    >
                      <span>{dateDisplay}</span>
                    </p>
                  </div>

                  {/* RIGHT: image (spaced from the bottom line) + tiny podcast label under image */}
                  <div
                    className="col-3 col-md-4 d-flex flex-column items-end mr-0"
                    style={{ position: "relative", paddingBottom: 10 }}
                  >
                    <figure className="d-none d-md-block" style={{ margin: 0 }}>
                      <img
                        src={imgSrc}
                        alt={title}
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

                    <figure className="d-block d-md-none" style={{ margin: 0 }}>
                      <img
                        src={imgSrc}
                        alt={title}
                        loading="lazy"
                        style={{
                          width: 105,
                          height: 115,
                          objectFit: "cover",
                          borderRadius: 6,
                          display: "block",
                        }}
                      />
                    </figure>

                    {isPodcast && (
                      <div
                        className="mt-5 d-flex items-center"
                        style={{ gap: 6 }}
                      >
                        <svg
                          style={{ width: 14, height: 14, display: "block" }}
                        >
                          <use href="#icon-podcast" />
                        </svg>
                        <span className="d-none d-md-block body-xs-smallcaps">
                          podcast
                        </span>
                      </div>
                    )}
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
