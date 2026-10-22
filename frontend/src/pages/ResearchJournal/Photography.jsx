// pages/Photography/index.jsx

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

import { supabaseServer } from "../../lib/supabase/supabaseServer.js";

/* -------------------------------------------------
   SETTINGS
------------------------------------------------- */

const MEDIA_BUCKET = "media";

const PUBLIC_BUCKET =
  "public-images";

const INITIAL_COUNT = 18;

const LOAD_MORE_COUNT = 12;

/* -------------------------------------------------
   STORAGE HELPERS
------------------------------------------------- */

function isImageFile(
  name = ""
) {
  return /\.(jpg|jpeg|png|webp|avif)$/i.test(
    name
  );
}

function getMediaPublicUrl(
  path
) {
  const { data } =
    supabaseServer.storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(path);

  return (
    data?.publicUrl ||
    ""
  );
}

function getPublicImageUrl(
  path
) {
  const { data } =
    supabaseServer.storage
      .from(PUBLIC_BUCKET)
      .getPublicUrl(path);

  return (
    data?.publicUrl ||
    ""
  );
}

/* -------------------------------------------------
   NUMBERING

   0001.webp = oldest
   0250.webp = newer

   Public display:
   0250
   0249
   0248
   ...
   0001
------------------------------------------------- */

function getImageNumber(
  name = ""
) {
  const clean =
    String(name);

  const match =
    clean.match(
      /(\d+)(?=\.[^.]+$)/
    );

  if (
    !match?.[1]
  ) {
    return 0;
  }

  const number =
    Number(
      match[1]
    );

  return Number.isFinite(
    number
  )
    ? number
    : 0;
}

/* -------------------------------------------------
   DATE
------------------------------------------------- */

function formatMediaDate(
  value
) {
  if (!value) {
    return "";
  }

  const date =
    new Date(
      String(value).length === 10
        ? `${value}T12:00:00`
        : value
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

/* -------------------------------------------------
   HERO FALLBACK

   This is used while your media bucket is empty.

   Change Ocean.webp to any public-images
   photograph you want.
------------------------------------------------- */

function getHeroFallback() {
  return (
    getPublicImageUrl(
      "Ocean.webp"
    ) ||
    "/assets/images/space.webp"
  );
}

/* -------------------------------------------------
   TEXT ANIMATION
------------------------------------------------- */

function useWordAnimatedText(
  text,
  baseDelay = 0.08,
  charClass = "type-char-title",
  startDelay = 0
) {
  return useMemo(() => {
    const tokens =
      text.split(
        /(\s+)/
      );

    let index = 0;

    return tokens.map(
      (
        token,
        tokenIndex
      ) => {
        if (
          /^\s+$/.test(
            token
          )
        ) {
          return (
            <span
              key={`space-${tokenIndex}`}
            >
              {token}
            </span>
          );
        }

        const characters =
          token
            .split("")
            .map(
              (
                character
              ) => {
                index += 1;

                return (
                  <span
                    key={`character-${index}`}
                    className={
                      charClass
                    }
                    style={{
                      animationDelay:
                        `${
                          startDelay +
                          index *
                            baseDelay
                        }s`,
                    }}
                  >
                    {
                      character
                    }
                  </span>
                );
              }
            );

        return (
          <span
            key={`word-${tokenIndex}`}
            style={{
              display:
                "inline-block",
            }}
          >
            {
              characters
            }
          </span>
        );
      }
    );
  }, [
    text,
    baseDelay,
    charClass,
    startDelay,
  ]);
}

function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0
) {
  return useMemo(() => {
    const tokens =
      text.split(
        /(\s+)/
      );

    let count = 0;

    return tokens.map(
      (
        token,
        tokenIndex
      ) => {
        if (
          /^\s+$/.test(
            token
          )
        ) {
          return (
            <span
              key={`space-${tokenIndex}`}
            >
              {token}
            </span>
          );
        }

        const characters =
          token
            .split("")
            .map(
              (
                character,
                characterIndex
              ) => {
                count += 1;

                return (
                  <span
                    key={`character-${tokenIndex}-${characterIndex}`}
                    className={
                      charClass
                    }
                    style={{
                      animationDelay:
                        `${
                          startDelay +
                          count *
                            baseDelay
                        }s`,
                    }}
                  >
                    {
                      character
                    }
                  </span>
                );
              }
            );

        return (
          <span
            key={`word-${tokenIndex}`}
            style={{
              display:
                "inline-block",
            }}
          >
            {
              characters
            }
          </span>
        );
      }
    );
  }, [
    text,
    baseDelay,
    charClass,
    startDelay,
  ]);
}

/* -------------------------------------------------
   PAGE
------------------------------------------------- */

export default function PhotographyPage({
  images = [],
  heroFallback = "",
}) {
  const [
    animate,
    setAnimate,
  ] = useState(
    false
  );

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(
    INITIAL_COUNT
  );

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(
    null
  );

  const loaderRef =
    useRef(null);

  const visibleImages =
    useMemo(
      () =>
        images.slice(
          0,
          visibleCount
        ),
      [
        images,
        visibleCount,
      ]
    );

  const selectedImage =
    selectedIndex !== null
      ? images[
          selectedIndex
        ] || null
      : null;

  const heroImage =
    images[0]?.url ||
    heroFallback ||
    "/assets/images/space.webp";

  /* -------------------------------------------------
     HERO ENTRANCE
  ------------------------------------------------- */

  useEffect(() => {
    setAnimate(true);
  }, []);

  /* -------------------------------------------------
     RESET INFINITE SCROLL
  ------------------------------------------------- */

  useEffect(() => {
    setVisibleCount(
      INITIAL_COUNT
    );
  }, [
    images.length,
  ]);

  /* -------------------------------------------------
     INFINITE SCROLL
  ------------------------------------------------- */

  useEffect(() => {
    const node =
      loaderRef.current;

    if (!node) {
      return;
    }

    if (
      visibleCount >=
      images.length
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (
          entries
        ) => {
          const entry =
            entries[0];

          if (
            !entry
              ?.isIntersecting
          ) {
            return;
          }

          setVisibleCount(
            (
              previous
            ) =>
              Math.min(
                previous +
                  LOAD_MORE_COUNT,
                images.length
              )
          );
        },
        {
          rootMargin:
            "500px 0px",
          threshold: 0,
        }
      );

    observer.observe(
      node
    );

    return () => {
      observer.disconnect();
    };
  }, [
    visibleCount,
    images.length,
  ]);

  /* -------------------------------------------------
     MODAL BODY LOCK
  ------------------------------------------------- */

  useEffect(() => {
    if (
      selectedIndex ===
      null
    ) {
      document.body.style.overflow =
        "";

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    selectedIndex,
  ]);

  /* -------------------------------------------------
     KEYBOARD CONTROLS
  ------------------------------------------------- */

  useEffect(() => {
    if (
      selectedIndex ===
      null
    ) {
      return;
    }

    const onKeyDown = (
      event
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setSelectedIndex(
          null
        );

        return;
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        setSelectedIndex(
          (
            current
          ) => {
            if (
              current ===
              null
            ) {
              return null;
            }

            return (
              current ===
              0
                ? images.length -
                  1
                : current -
                  1
            );
          }
        );
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        setSelectedIndex(
          (
            current
          ) => {
            if (
              current ===
              null
            ) {
              return null;
            }

            return (
              current ===
              images.length -
                1
                ? 0
                : current +
                  1
            );
          }
        );
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [
    selectedIndex,
    images.length,
  ]);

  /* -------------------------------------------------
     MODAL NAVIGATION
  ------------------------------------------------- */

  const showPrevious =
    () => {
      if (
        !images.length
      ) {
        return;
      }

      setSelectedIndex(
        (
          current
        ) => {
          if (
            current ===
            null
          ) {
            return null;
          }

          return (
            current ===
            0
              ? images.length -
                1
              : current -
                1
          );
        }
      );
    };

  const showNext =
    () => {
      if (
        !images.length
      ) {
        return;
      }

      setSelectedIndex(
        (
          current
        ) => {
          if (
            current ===
            null
          ) {
            return null;
          }

          return (
            current ===
            images.length -
              1
              ? 0
              : current +
                1
          );
        }
      );
    };

  /* -------------------------------------------------
     HERO COPY
  ------------------------------------------------- */

  const titleLine1 =
    useWordAnimatedText(
      "Photography &",
      0.08,
      "type-char-title"
    );

  const titleLine2 =
    useWordAnimatedText(
      "Visual Archive",
      0.08,
      "type-char-title"
    );

  const paragraphLines =
    [
      "Photography has become another way for me to document the places, environments, and moments that shape how I understand the world around me.",
      "This visual archive brings together photographs from travel, research, and everyday life, arranged from my most recent images back through earlier experiences.",
      "Open any photograph to view it in full and, where available, explore the location, date, and context behind the image.",
    ];

  return (
    <>
      <MetaHead
        title="Photography | Tobin Albanese"
        description="A visual archive of photography, travel, research, and places documented by Tobin Albanese."
      />

      <SvgHead />

      <div className="dialog-off-canvas-main-canvas">
        <div className="base d-flex">
          <NavbarMB />

          <section
            className="c-bg photography-page"
            style={{
              width:
                "100%",
            }}
          >
            {/* -----------------------------------------
                HERO
            ----------------------------------------- */}

            <div
              className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
            >
              <div className="col-12">
                <div className="row justify-between d-flex photography-hero-row">
                  {/* TEXT */}

                  <div
                    className={`col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center ${
                      animate
                        ? "slide-in-left"
                        : ""
                    }`}
                    style={{
                      position:
                        "relative",
                      zIndex: 2,
                      paddingRight:
                        24,
                      minWidth: 0,
                    }}
                  >
                    <h1
                      className="heading-l mb-15"
                      style={{
                        fontFamily:
                          "inherit",
                        overflow:
                          "visible",
                        whiteSpace:
                          "pre-wrap",
                        color:
                          "var(--c-text)",
                      }}
                    >
                      <div>
                        {
                          titleLine1
                        }
                      </div>

                      <div>
                        {
                          titleLine2
                        }
                      </div>
                    </h1>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.65,
                        color:
                          "var(--c-text-secondary)",
                        marginBottom:
                          "1em",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[0],
                        0.01,
                        "type-char",
                        0
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.65,
                        color:
                          "var(--c-text-secondary)",
                        marginBottom:
                          "1em",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[1],
                        0.01,
                        "type-char",
                        1.7
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.65,
                        color:
                          "var(--c-text-secondary)",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[2],
                        0.01,
                        "type-char",
                        3.5
                      )}
                    </p>
                  </div>

                  {/* STATIC IMAGE */}

                  <div className="col-12 col-lg-6 photography-hero-media">
                    <img
                      src={
                        heroImage
                      }
                      alt="Photography archive"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DIVIDER */}

            <div className="photography-divider" />

            {/* -----------------------------------------
                VISUAL ARCHIVE
            ----------------------------------------- */}

            <main className="photography-shell">
              <header className="photography-gallery-heading">
                <h2>
                  Visual Archive
                </h2>

                <p>
                  Photographs
                  arranged from
                  most recent to
                  earliest.
                </p>
              </header>

              {images.length ===
              0 ? (
                <div className="photography-empty">
                  <h3>
                    The archive
                    is currently
                    empty.
                  </h3>

                  <p>
                    Photographs
                    will appear
                    here as they
                    are added to
                    the media
                    collection.
                  </p>
                </div>
              ) : (
                <>
                  <div className="photography-grid">
                    {visibleImages.map(
                      (
                        image
                      ) => {
                        const actualIndex =
                          images.findIndex(
                            (
                              item
                            ) =>
                              item.path ===
                              image.path
                          );

                        return (
                          <button
                            key={
                              image.path
                            }
                            type="button"
                            className="photography-card"
                            onClick={() =>
                              setSelectedIndex(
                                actualIndex
                              )
                            }
                            aria-label={`Open ${
                              image.title ||
                              image.location ||
                              `photograph ${image.number}`
                            }`}
                          >
                            <img
                              src={
                                image.url
                              }
                              alt={
                                image.alt_text ||
                                image.title ||
                                image.location ||
                                `Photograph ${image.number}`
                              }
                              loading="lazy"
                            />

                            <div className="photography-card-overlay">
                              {image.location ? (
                                <span>
                                  {
                                    image.location
                                  }
                                </span>
                              ) : null}

                              <span className="photography-number">
                                #
                                {
                                  image.displayNumber
                                }
                              </span>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>

                  <div
                    ref={
                      loaderRef
                    }
                    className="photography-loader"
                  >
                    {visibleCount <
                    images.length
                      ? "Loading more photographs..."
                      : "End of visual archive."}
                  </div>
                </>
              )}
            </main>
          </section>

          <Footer />
        </div>
      </div>

      {/* -----------------------------------------
          IMAGE MODAL
      ----------------------------------------- */}

      {selectedImage && (
        <div
          className="photography-modal-overlay"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedIndex(
                null
              );
            }
          }}
        >
          <div
            className="photography-modal"
            role="dialog"
            aria-modal="true"
            aria-label={
              selectedImage.title ||
              selectedImage.location ||
              "Photograph"
            }
          >
            {/* CLOSE */}

            <button
              type="button"
              className="photography-modal-close"
              onClick={() =>
                setSelectedIndex(
                  null
                )
              }
              aria-label="Close photograph"
            >
              ×
            </button>

            {/* IMAGE */}

            <div className="photography-modal-image-wrap">
              <img
                src={
                  selectedImage.url
                }
                alt={
                  selectedImage.alt_text ||
                  selectedImage.title ||
                  selectedImage.location ||
                  `Photograph ${selectedImage.number}`
                }
              />

              <button
                type="button"
                className="photography-modal-nav photography-modal-prev"
                onClick={
                  showPrevious
                }
                aria-label="Previous photograph"
              >
                ‹
              </button>

              <button
                type="button"
                className="photography-modal-nav photography-modal-next"
                onClick={
                  showNext
                }
                aria-label="Next photograph"
              >
                ›
              </button>
            </div>

            {/* INFORMATION */}

            <aside className="photography-modal-info">
              <div>
                <div className="photography-modal-meta">
                  {selectedImage.location ? (
                    <span>
                      {
                        selectedImage.location
                      }
                    </span>
                  ) : null}

                  {selectedImage.taken_at ? (
                    <span>
                      {formatMediaDate(
                        selectedImage.taken_at
                      )}
                    </span>
                  ) : null}
                </div>

                {selectedImage.title ? (
                  <h2>
                    {
                      selectedImage.title
                    }
                  </h2>
                ) : (
                  <h2>
                    Photograph{" "}
                    {
                      selectedImage.displayNumber
                    }
                  </h2>
                )}

                {selectedImage.caption ? (
                  <p className="photography-modal-caption">
                    {
                      selectedImage.caption
                    }
                  </p>
                ) : (
                  <p className="photography-modal-caption photography-modal-caption-empty">
                    Additional
                    context for
                    this image
                    has not been
                    added yet.
                  </p>
                )}
              </div>

              <div className="photography-modal-footer">
                <span>
                  IMAGE{" "}
                  {
                    selectedImage.displayNumber
                  }
                </span>

                <span>
                  {selectedIndex +
                    1}{" "}
                  /{" "}
                  {
                    images.length
                  }
                </span>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* -----------------------------------------
          PAGE STYLES
      ----------------------------------------- */}

      <style jsx>{`
        .photography-page {
          min-height: 100vh;
        }

        .photography-hero-row {
          align-items: center;
        }

        .photography-hero-media {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .photography-hero-media img {
          display: block;
          width: 100%;
          max-width: 620px;
          aspect-ratio: 9 / 16;
          max-height: 720px;
          object-fit: cover;
          object-position: center;
          border-radius: 12px;
        }

        .photography-divider {
          max-width: 1000px;
          margin: 40px auto;
          border-top: 4px solid #d62827;
        }

        .photography-shell {
          max-width: 1320px;
          margin: 0 auto 120px;
          padding: 0 24px;
        }

        .photography-gallery-heading {
          margin-bottom: 34px;
        }

        .photography-gallery-heading h2 {
          margin: 0 0 10px;
          padding-left: 16px;
          border-left: 5px solid #d62827;
          color: var(--c-text-primary);
          font-size: 2.75rem;
          line-height: 1.1;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .photography-gallery-heading p {
          margin: 0;
          padding-left: 21px;
          color: var(--c-text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .photography-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: start;
        }

        .photography-card {
          appearance: none;
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          aspect-ratio: 9 / 16;
        }

        .photography-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition:
            transform 350ms ease,
            filter 350ms ease;
        }

        .photography-card:hover img {
          transform: scale(1.025);
          filter: brightness(0.83);
        }

        .photography-card-overlay {
          position: absolute;
          inset: auto 0 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          padding: 44px 16px 15px;
          color: #fff;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.72)
          );
          opacity: 0;
          transition: opacity 250ms ease;
        }

        .photography-card:hover
          .photography-card-overlay {
          opacity: 1;
        }

        .photography-number {
          margin-left: auto;
          opacity: 0.8;
          white-space: nowrap;
        }

        .photography-loader {
          padding: 50px 0 20px;
          text-align: center;
          color: var(--c-text-secondary);
          font-size: 0.95rem;
          opacity: 0.7;
        }

        .photography-empty {
          padding: 80px 24px;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
          text-align: center;
        }

        .photography-empty h3 {
          margin: 0 0 10px;
          color: var(--c-text-primary);
          font-size: 1.6rem;
        }

        .photography-empty p {
          max-width: 520px;
          margin: 0 auto;
          color: var(--c-text-secondary);
          line-height: 1.7;
        }

        /* -----------------------------------------
           MODAL
        ----------------------------------------- */

        .photography-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(4, 4, 5, 0.74);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .photography-modal {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(300px, 0.9fr)
            minmax(320px, 0.7fr);
          width: min(1160px, 100%);
          max-height: calc(100vh - 64px);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: var(--c-bg-primary);
          box-shadow:
            0 30px 90px
            rgba(0, 0, 0, 0.55);
        }

        .photography-modal-image-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          overflow: hidden;
          background: #050505;
        }

        .photography-modal-image-wrap img {
          display: block;
          width: 100%;
          height: 100%;
          max-height: calc(100vh - 64px);
          object-fit: contain;
        }

        .photography-modal-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          padding: 54px 46px 32px;
          overflow-y: auto;
        }

        .photography-modal-meta {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 22px;
          color: #d62827;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .photography-modal-info h2 {
          margin: 0 0 22px;
          color: var(--c-text-primary);
          font-size: clamp(
            2rem,
            4vw,
            3.3rem
          );
          line-height: 1.05;
          font-weight: 700;
        }

        .photography-modal-caption {
          margin: 0;
          color: var(--c-text-secondary);
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .photography-modal-caption-empty {
          opacity: 0.55;
          font-style: italic;
        }

        .photography-modal-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 50px;
          padding-top: 18px;
          border-top: 1px solid var(--c-border);
          color: var(--c-text-secondary);
          font-size: 0.76rem;
          letter-spacing: 0.1em;
        }

        .photography-modal-close {
          position: absolute;
          top: 14px;
          right: 16px;
          z-index: 20;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.58);
          color: #fff;
          font-size: 1.7rem;
          line-height: 1;
          cursor: pointer;
          transition:
            background 180ms ease,
            transform 180ms ease;
        }

        .photography-modal-close:hover {
          background: #d62827;
          transform: scale(1.05);
        }

        .photography-modal-nav {
          position: absolute;
          top: 50%;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 58px;
          padding: 0;
          transform: translateY(-50%);
          border: 0;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 2.6rem;
          line-height: 1;
          cursor: pointer;
          transition: background 180ms ease;
        }

        .photography-modal-nav:hover {
          background: rgba(214, 40, 39, 0.9);
        }

        .photography-modal-prev {
          left: 15px;
        }

        .photography-modal-next {
          right: 15px;
        }

        /* -----------------------------------------
           TABLET
        ----------------------------------------- */

        @media (
          max-width: 1024px
        ) {
          .photography-hero-row {
            gap: 28px;
          }

          .photography-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }

          .photography-modal {
            grid-template-columns:
              minmax(
                280px,
                1fr
              )
              minmax(
                280px,
                0.8fr
              );
          }

          .photography-modal-info {
            padding:
              48px
              32px
              28px;
          }
        }

        /* -----------------------------------------
           MOBILE
        ----------------------------------------- */

        @media (
          max-width: 767px
        ) {
          .photography-hero-row {
            display: block;
          }

          .photography-hero-media {
            margin-top: 28px;
          }

          .photography-hero-media img {
            max-height: none;
          }

          .photography-divider {
            margin:
              30px
              24px
              38px;
          }

          .photography-shell {
            padding:
              0
              16px;
          }

          .photography-gallery-heading h2 {
            font-size:
              2rem;
          }

          .photography-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
            gap: 10px;
          }

          .photography-card {
            border-radius:
              5px;
          }

          .photography-card-overlay {
            padding:
              35px
              10px
              10px;
            font-size:
              0.67rem;
            opacity: 1;
          }

          .photography-modal-overlay {
            padding: 0;
            align-items:
              stretch;
          }

          .photography-modal {
            display: flex;
            flex-direction:
              column;
            width: 100%;
            height: 100%;
            max-height: none;
            border: 0;
            border-radius: 0;
          }

          .photography-modal-image-wrap {
            flex: 1 1 auto;
            min-height:
              55vh;
          }

          .photography-modal-image-wrap img {
            width: 100%;
            max-height:
              68vh;
          }

          .photography-modal-info {
            flex: 0 0 auto;
            max-height:
              42vh;
            padding:
              26px
              22px
              24px;
          }

          .photography-modal-info h2 {
            font-size:
              1.8rem;
          }

          .photography-modal-caption {
            font-size:
              0.98rem;
          }

          .photography-modal-footer {
            margin-top:
              26px;
          }

          .photography-modal-nav {
            width: 40px;
            height: 50px;
            font-size:
              2.2rem;
          }

          .photography-modal-prev {
            left: 8px;
          }

          .photography-modal-next {
            right: 8px;
          }
        }

        @media (
          max-width: 420px
        ) {
          .photography-grid {
            gap: 7px;
          }
        }

        /* -----------------------------------------
           REDUCED MOTION
        ----------------------------------------- */

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .photography-card img,
          .photography-card-overlay,
          .photography-modal-close,
          .photography-modal-nav {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

/* -------------------------------------------------
   LIST EVERY FILE IN THE MEDIA BUCKET

   This paginates through Supabase Storage so
   you are not limited to only 1,000 photos.
------------------------------------------------- */

async function listAllMediaFiles() {
  const PAGE_LIMIT =
    1000;

  let offset =
    0;

  let allItems =
    [];

  while (true) {
    const {
      data,
      error,
    } =
      await supabaseServer.storage
        .from(
          MEDIA_BUCKET
        )
        .list(
          "",
          {
            limit:
              PAGE_LIMIT,
            offset,
            sortBy: {
              column:
                "name",
              order:
                "asc",
            },
          }
        );

    if (error) {
      throw error;
    }

    const page =
      Array.isArray(
        data
      )
        ? data
        : [];

    allItems =
      allItems.concat(
        page
      );

    if (
      page.length <
      PAGE_LIMIT
    ) {
      break;
    }

    offset +=
      PAGE_LIMIT;
  }

  return allItems;
}

/* -------------------------------------------------
   SSR
------------------------------------------------- */

export async function getServerSideProps() {
  let storageItems =
    [];

  try {
    storageItems =
      await listAllMediaFiles();
  } catch (error) {
    console.error(
      "Photography storage error:",
      error?.message ||
        error
    );
  }

  /* -------------------------------------------------
     OPTIONAL METADATA TABLE

     The page still works if there are no rows.

     Table:
       media_items
  ------------------------------------------------- */

  let metadataRows =
    [];

  try {
    const {
      data,
      error,
    } =
      await supabaseServer
        .from(
          "media_items"
        )
        .select(
          `
            id,
            storage_path,
            sort_order,
            title,
            caption,
            location,
            taken_at,
            alt_text,
            is_published
          `
        );

    if (error) {
      console.warn(
        "Photography metadata unavailable:",
        error.message
      );
    } else {
      metadataRows =
        data || [];
    }
  } catch (error) {
    console.warn(
      "Photography metadata table unavailable:",
      error?.message ||
        error
    );
  }

  const metadataMap =
    new Map();

  for (
    const row of
    metadataRows
  ) {
    if (
      !row?.storage_path
    ) {
      continue;
    }

    metadataMap.set(
      row.storage_path,
      row
    );
  }

  const images =
    storageItems
      .filter(
        (
          item
        ) =>
          item?.name
      )
      .filter(
        (
          item
        ) =>
          !item.name.startsWith(
            "."
          )
      )
      .filter(
        (
          item
        ) =>
          isImageFile(
            item.name
          )
      )
      .map(
        (
          item
        ) => {
          const metadata =
            metadataMap.get(
              item.name
            ) ||
            {};

          const filenameNumber =
            getImageNumber(
              item.name
            );

          const sortOrder =
            Number.isFinite(
              Number(
                metadata.sort_order
              )
            )
              ? Number(
                  metadata.sort_order
                )
              : filenameNumber;

          return {
            name:
              item.name,

            path:
              item.name,

            url:
              getMediaPublicUrl(
                item.name
              ),

            number:
              sortOrder,

            displayNumber:
              String(
                filenameNumber
              ).padStart(
                4,
                "0"
              ),

            title:
              metadata.title ||
              "",

            caption:
              metadata.caption ||
              "",

            location:
              metadata.location ||
              "",

            taken_at:
              metadata.taken_at ||
              null,

            alt_text:
              metadata.alt_text ||
              "",

            is_published:
              metadata.is_published !==
              false,
          };
        }
      )
      .filter(
        (
          image
        ) =>
          image.is_published
      )
      .sort(
        (
          a,
          b
        ) =>
          b.number -
          a.number
      );

  return {
    props: {
      images,
      heroFallback:
        getHeroFallback(),
    },
  };
}