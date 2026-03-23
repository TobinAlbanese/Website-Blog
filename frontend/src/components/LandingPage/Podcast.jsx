// components/Podcast.jsx
import React from "react";
import Link from "next/link";

const BUCKET = "public-images";

// Put your actual object paths here (inside the bucket)
const HERO_OBJECT_PATH = "podcast/Lincoln.webp";
const LOGO_OBJECT_PATH = "podcast/Podcast.png";

function publicBucketUrl(objectPath) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "";
  return `${base}/storage/v1/object/public/${BUCKET}/${objectPath}`;
}

export default function Podcast() {
  // These will resolve as soon as the files exist in the bucket
  const heroSrc = publicBucketUrl(HERO_OBJECT_PATH);
  const logoSrc = publicBucketUrl(LOGO_OBJECT_PATH);

  // Optional local fallback if the bucket images aren't uploaded yet
  const heroFallback = "/assets/images/Lincoln.webp"; // keep your old one if it exists
  const logoFallback = "/assets/images/Podcast.png";

  const title = "Weekly Podcast";
  const excerpt =
    "Conversations on strategy, technology, and influence—spanning real-world operations, tools of the trade, and the human factors that shape power.";

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
        <div className="col-12" style={{ paddingTop: 18 }}>
          <div className="row justify-between justify-center" data-armstrong-id="row">
            <div className="row ml-0 mr-0" data-armstrong-id="grid_1">
              {/* LEFT: Artwork (bucket) */}
              <div className="col-lg-6 mb-20 mt-md-60 mb-md-60 home-hide-narrow">
                <Link href="/Podcast">
                  <figure style={{ margin: 0 }}>
                    <img
                      src={heroSrc || heroFallback}
                      onError={(e) => {
                        // If bucket object is missing, fall back to local
                        e.currentTarget.src = heroFallback;
                      }}
                      alt={`${title} — episode artwork`}
                      loading="lazy"
                      sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 620px"
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 8,
                        height: 650,
                        width: 400,
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                </Link>
              </div>

              {/* RIGHT: Logo (bucket) + existing static UI */}
              <div className="col-lg-6 d-flex" style={{ overflow: "visible" }}>
                <div
                  className="home-podcast-info"
                  style={{
                    maxWidth: 560,
                    marginLeft: "auto",
                    paddingRight: 8,
                    textAlign: "center",
                    transform: "translateX(clamp(0px, 12vw, 220px))",
                  }}
                >
                  <figure style={{ margin: 0 }}>
                    <img
                      src={logoSrc || logoFallback}
                      onError={(e) => {
                        e.currentTarget.src = logoFallback;
                      }}
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

                  <h2 className="heading-l c-text-primary" style={{ textTransform: "none" }}>
                    <Link href="/Podcast">{title}</Link>
                  </h2>

                  <h3 className="body-l c-text-2third mt-5" style={{ maxWidth: 680, margin: "6px auto 0" }}>
                    <Link href="/Podcast">{excerpt}</Link>
                  </h3>

                  {/* leave your faux player as-is */}
                  <div className="audio-player d-flex items-center c-border border-thin border-radius js--audio-player mt-60 mx-auto max-445">
                    <div className="audio-player__item pl-10 pr-10 d-flex audio-player__controls">
                      <Link
                        href="/Podcast"
                        className="audio-player__play-button border-radius-full d-flex"
                        aria-label="Open podcast"
                      >
                        <span className="audio-player__play-icon-label visually-hidden">Play</span>
                        <svg className="play-icon play-pause-icon">
                          <use xlinkHref="#icon-play" />
                        </svg>
                      </Link>

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
                      </div>
                    </div>
                  </div>

                  <Link
                    className="arrow-link border-bottom-thin border-bottom d-inline-block lh-22 fs-18 mt-40 mb-40 c-accent"
                    href="/Podcast"
                  >
                    Follow the Podcast
                    <svg className="arrow-link__icon">
                      <use href="#icon-right-arrow" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row items-start" data-armstrong-id="grid_2" />
          </div>
        </div>
      </div>
    </section>
  );
}
