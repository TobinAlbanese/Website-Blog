// components/Podcast.jsx
import React from "react";
import Link from "next/link";
import PodcastData from "../../data/PodcastData";

const getItems = () =>
  Array.isArray(PodcastData?.items) ? PodcastData.items : [];

const pickHeroImg = (ep) =>
  ep?.images?.[0] ||
  ep?.banner ||
  ep?.coverImage ||
  "/assets/images/Podcast.png";

const pickLogo = (ep) =>
  ep?.logo || PodcastData?.logo || "/assets/images/Podcast.png";

const hrefEpisode = (ep) => `/Podcast/${ep.slug || ""}`;
const hrefIndex = "/Podcast";

const formatDuration = (mins) => {
  if (!mins && mins !== 0) return "";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};

const getDurationLabel = (ep) => {
  if (ep?.duration) return String(ep.duration); // e.g. "90 minutes"
  if (typeof ep?.durationMinutes === "number")
    return formatDuration(ep.durationMinutes);
  return "";
};

export default function Podcast() {
  const items = getItems();
  if (!items.length) return null;

  const ep = items[0];

  const heroSrc = pickHeroImg(ep);
  const logoSrc = pickLogo(ep);
  const title = ep?.title || "Weekly Podcast";
  const excerpt =
    ep?.excerpt ||
    "Conversations on strategy, technology, and influence—spanning real-world operations, tools of the trade, and the human factors that shape power.";
  const durationLabel = getDurationLabel(ep);
  const epHref = hrefEpisode(ep);

  return (
    <section
      className="c-bg-secondary position-relative overflow-hidden"
      data-armstrong-id="wrapper"
      id=".home-section-podcast"
    >
      <div
        className="row base__main position-relative z-above-base c-text-third"
        data-armstrong-id="primary"
      >
        <div className="col-12">
          <div
            className="row justify-between justify-center"
            data-armstrong-id="row"
          >
            {/* ORDER: image LEFT, info RIGHT */}
            <div className="row ml-0 mr-0" data-armstrong-id="grid_1">
              {/* LEFT: Episode artwork (tall like other sections) */}
              <div className="col-lg-6 mb-20 mt-md-60 mb-md-60">
                <Link href={epHref}>
                  <figure style={{ margin: 0 }}>
                    <img
                      src={heroSrc}
                      alt={`${title} — episode artwork`}
                      loading="lazy"
                      sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 620px"
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 8,
                        height: 650, // tall + consistent
                        width: 400, // vertical aspect
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                </Link>
              </div>

              {/* RIGHT: Logo, title, blurb, faux player, follow link */}
              <div className="col-lg-6 d-flex" style={{ overflow: "visible" }}>
                <div
                  style={{
                    maxWidth: 560,
                    marginLeft: "auto",
                    paddingRight: 8,
                    textAlign: "center",
                    transform: "translateX(clamp(0px, 12vw, 220px))", // nudge block further right
                  }}
                >
                  <figure style={{ margin: 0 }}>
                    <img
                      src={logoSrc}
                      alt="Podcast logo"
                      className="mx-auto mt-60 mb-60"
                      loading="lazy"
                      width={260}
                      height={260}
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth: 260,
                        aspectRatio: "1 / 1",
                        objectFit: "contain",
                      }}
                    />
                  </figure>

                  <h2
                    className="heading-l c-text-primary"
                    style={{ textTransform: "none" }}
                  >
                    <Link href={epHref}>{title}</Link>
                  </h2>

                  <h3
                    className="body-l c-text-2third mt-5"
                    style={{ maxWidth: 680, margin: "6px auto 0" }}
                  >
                    <Link href={epHref}>{excerpt}</Link>
                  </h3>

                  {/* Faux audio player (links to episode) */}
                  <div className="audio-player d-flex items-center c-border border-thin border-radius js--audio-player mt-60 mx-auto max-445">
                    <div className="audio-player__item pl-10 pr-10 d-flex audio-player__controls">
                      <Link
                        href={epHref}
                        className="audio-player__play-button border-radius-full d-flex"
                        aria-label={`Play ${title}`}
                      >
                        <span className="audio-player__play-icon-label visually-hidden">
                          Play
                        </span>
                        <svg className="play-icon play-pause-icon">
                          <use xlinkHref="#icon-play" />
                        </svg>
                      </Link>

                      {/* Label row with duration right-aligned */}
                      <div
                        className="audio-player__label"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          gap: 8,
                        }}
                      >
                        <span>Listen to the Episode</span>
                        {durationLabel && (
                          <span
                            className="audio-player__duration-label"
                            style={{ whiteSpace: "nowrap", opacity: 0.85 }}
                          >
                            {durationLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    className="arrow-link border-bottom-thin border-bottom d-inline-block lh-22 fs-18 mt-40 mb-40 c-accent"
                    href={hrefIndex}
                  >
                    Follow the Podcast
                    <svg className="arrow-link__icon">
                      <use href="#icon-right-arrow" />
                    </svg>
                  </Link>
                </div>
              </div>
              {/* /RIGHT */}
            </div>

            <div className="row items-start" data-armstrong-id="grid_2" />
          </div>
        </div>
      </div>
    </section>
  );
}
