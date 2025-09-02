// components/BookReviews.jsx
import React from "react";
import Link from "next/link";
import BookReviewData from "../../data/BookReviewData";

const getItems = () =>
  Array.isArray(BookReviewData?.Reviews) ? BookReviewData.Reviews : [];

const getHref = (item) => `/Books/${item.slug}`;
const getImg = (item) =>
  item?.images?.[0] || item?.archiveImage || "/assets/images/space.jpg";
const clamp = (s = "", n = 200) =>
  s.length > n ? s.slice(0, n).trim() + "…" : s;
const firstSentenceFromHTML = (html = "") => {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const m = text.match(/.*?[.!?](\s|$)/);
  return (m ? m[0] : text) || "";
};
const getDescription = (item) =>
  item?.excerpt ||
  firstSentenceFromHTML(item?.content?.[0]?.text || "") ||
  "Read the full review.";

export default function BookReviews() {
  const items = getItems();
  if (items.length === 0) return null;

  const primary = items[0];
  const side = items.slice(1, 5); // up to 4

  return (
    <section className="theme-accent" data-armstrong-id="wrapper" id="home-section-book-review">
      <div className="base__main pt-60 pb-40 row">
        <div className="col-12 m-auto">
          <h3 className="font-style-italic c-accent mb-10">Book Reviews</h3>

          <h4 className="fs-18 mb-15 fs-md-16" data-armstrong-id="module_subtitle">
            Thoughts on books I've read recently.
          </h4>

          <div className="row justify-between">
            {/* LEFT: Primary feature */}
            <div className="col-12 col-lg-8">
              <div
                className="br-card border-bottom border-bottom-thin c-input-border border-0-lg pb-25 mb-25"
                style={{ position: "relative" }}
              >
                <Link
                  href={getHref(primary)}
                  aria-label={primary.title}
                  style={{ position: "absolute", inset: 0, zIndex: 1 }}
                />

                <figure style={{ margin: 0 }}>
                  <img
                    src={getImg(primary)}
                    alt={primary.title}
                    className="br-thumb"
                    style={{
                      height: 650,
                      width: 400,
                      borderRadius: 8,
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </figure>

                {/* TEXT UNDER PRIMARY IMAGE (restored) */}
                <div
                  className="col-12 col-lg-10"
                  style={{ position: "relative", zIndex: 2, marginTop: 14 }}
                >
                  <h2
                    className="heading-s"
                    style={{ textTransform: "none", marginBottom: 8 }}
                  >
                    <span>{primary.title}</span>
                  </h2>

                  <h3
                    className="body-l c-text-secondary"
                    style={{ marginBottom: 10 }}
                  >
                    <span>{clamp(getDescription(primary), 220)}</span>
                  </h3>

                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <span className="body-m" style={{ color: "var(--c-text-secondary)" }}>
                      Written by{" "}
                      <i style={{ color: "var(--c-accent)" }}>{primary.author}</i>
                    </span>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <span
                      className="arrow-link border-bottom-thin border-bottom lh-22 fs-18"
                      style={{ color: "var(--c-accent)", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      {/* CTA (optional) */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: four covers */}
            <div className="col-12 col-lg-4" style={{ marginRight: "auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                  gap: 10,
                  justifyItems: "start",
                  overflow: "visible",
                }}
              >
                {side.map((b, idx) => (
                  <div
                    key={b.slug || idx}
                    className="br-card"
                    style={{
                      transform: `translate(${idx % 2 === 0 ? -200 : -75}px, ${idx >= 2 ? 65 : 15}px)`,
                      transition: "transform 0.2s",
                      position: "relative",
                      zIndex: 3, // above the left overlay while shifted left
                    }}
                  >
                    <Link href={getHref(b)} aria-label={b.title}>
                      <figure style={{ margin: 0 }}>
                        <img
                          src={getImg(b)}
                          alt={b.title}
                          loading="lazy"
                          className="br-thumb"
                          style={{
                            width: "100%",
                            maxWidth: 220,
                            aspectRatio: "2 / 3",
                            objectFit: "cover",
                            borderRadius: 8,
                            display: "block",
                          }}
                        />
                      </figure>
                    </Link>

                    {/* mobile-only text */}
                    <div className="d-lg-none body-s" style={{ marginTop: 8 }}>
                      <h2 className="body-s" style={{ marginBottom: 4, textTransform: "none" }}>
                        <Link href={getHref(b)}>{b.title}</Link>
                      </h2>
                      <p className="body-s c-text-secondary" style={{ marginBottom: 6 }}>
                        {clamp(getDescription(b), 100)}
                      </p>
                      <div className="body-s">
                        <span>{b.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
              /* Shared card thumb styling (works in light & dark) */
              .br-thumb {
                box-shadow:
                  0 12px 32px rgba(0, 0, 0, 0.28),
                  0 3px 10px rgba(0, 0, 0, 0.18);
                outline: 1px solid rgba(0, 0, 0, 0.06);
                border-radius: 8px;
                transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
                will-change: transform;
                backface-visibility: hidden;
              }
              .br-card:hover .br-thumb,
              .br-card:focus-within .br-thumb {
                transform: translateY(-3px) scale(1.03);
                box-shadow:
                  0 28px 70px rgba(0, 0, 0, 0.45),
                  0 10px 24px rgba(0, 0, 0, 0.28);
              }
              .br-card a:focus-visible .br-thumb {
                box-shadow:
                  0 0 0 3px var(--c-accent, #6aa6ff),
                  0 28px 70px rgba(0, 0, 0, 0.45),
                  0 10px 24px rgba(0, 0, 0, 0.28);
              }
              @media (prefers-color-scheme: dark) {
                .br-thumb {
                  box-shadow:
                    0 16px 42px rgba(0, 0, 0, 0.6),
                    0 4px 14px rgba(0, 0, 0, 0.45);
                  outline: 1px solid rgba(255, 255, 255, 0.09);
                }
                .br-card:hover .br-thumb,
                .br-card:focus-within .br-thumb {
                  box-shadow:
                    0 36px 90px rgba(0, 0, 0, 0.75),
                    0 14px 32px rgba(0, 0, 0, 0.55);
                }
              }
              @media (hover: none) and (pointer: coarse) {
                .br-card:hover .br-thumb {
                  transform: none;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
