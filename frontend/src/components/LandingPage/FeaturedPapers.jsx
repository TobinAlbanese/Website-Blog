// components/FeaturedPapers.jsx
import React from "react";
import Link from "next/link";
import PortfolioData from "../../data/portfolioData";

// ---- helpers ----
const getSection = (name) =>
  Array.isArray(PortfolioData?.[name]) ? PortfolioData[name] : [];
const uniqBySlug = (list) => {
  const seen = new Set();
  return (list || []).filter(
    (p) => p?.slug && !seen.has(p.slug) && seen.add(p.slug)
  );
};
const getHref = (p) => `/Portfolio/${p.slug}`;
const getImg = (p) =>
  p?.images?.[0] || p?.archiveImage || "/assets/images/space.jpg";
const getDescription = (p) => {
  if (p?.excerpt) return p.excerpt;
  const html = p?.content?.[0]?.text || "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const m = text.match(/.*?[.!?](\s|$)/);
  return (m ? m[0] : text) || "Read the full paper.";
};
const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// take up to n items from src, skipping any slugs already in used
const takeN = (src, n, used) => {
  const out = [];
  for (const p of src) {
    if (out.length >= n) break;
    if (p?.slug && !used.has(p.slug)) {
      out.push(p);
      used.add(p.slug);
    }
  }
  return out;
};

export default function FeaturedPapers() {
  const papers = uniqBySlug(getSection("Analytical Writing & Publications"));
  const research = uniqBySlug(getSection("Research & Analysis Projects"));

  // 2 + 2
  const used = new Set();
  const a = takeN(papers, 2, used);
  const b = takeN(research, 2, used);
  const posts = [...a, ...b];

  // Image sizes (match your Highlights/Special Focus look)
  const IMG_W_DESKTOP = 220;
  const IMG_W_MOBILE = 105;
  const IMG_H_MOBILE = 115;

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
        {/* Heading */}
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

        {/* Main row: image LEFT, cards RIGHT */}
        <div className="col-12">
          <div
            className="row justify-between flex-row-reverse d-flex"
            data-armstrong-id="row"
          >
            {/* Left visual */}
            <div className="col-12 col-md-5 d-flex justify-center align-items-center">
              <img
                src="/assets/images/russia4.jpg"
                alt="Featured papers artwork"
                style={{
                  maxWidth: "100%",
                  height: 650,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </div>

            {/* Cards on right */}
            <div className="col-12 col-md-7" data-armstrong-id="grid_2">
              {posts.map((p, i) => {
                const href = getHref(p);
                const img = getImg(p);
                const title = p.title || "Untitled";
                const desc = getDescription(p);
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
                    {/* FULL-CARD CLICKABLE OVERLAY */}
                    <Link
                      href={href}
                      aria-label={title}
                      style={{ position: "absolute", inset: 0, zIndex: 1 }}
                    />

                    {/* LEFT column: text */}
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
                        className="body-s c-accent"
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

                    {/* RIGHT column: image */}
                    <div
                      className="col-3 col-md-4 d-flex flex-column mr-0"
                      style={{ alignItems: "flex-start", paddingBottom: 10 }}
                    >
                      {/* Desktop */}
                      <div
                        className="d-none d-md-block"
                        style={{ width: IMG_W_DESKTOP }}
                      >
                        <figure style={{ margin: 0 }}>
                          <img
                            src={img}
                            alt={title}
                            loading="lazy"
                            style={{
                              width: "100%",
                              maxWidth: IMG_W_DESKTOP,
                              aspectRatio: "16 / 10",
                              objectFit: "cover",
                              borderRadius: 6,
                              display: "block",
                            }}
                          />
                        </figure>
                      </div>

                      {/* Mobile */}
                      <div
                        className="d-block d-md-none"
                        style={{ width: IMG_W_MOBILE }}
                      >
                        <figure style={{ margin: 0 }}>
                          <img
                            src={img}
                            alt={title}
                            loading="lazy"
                            width={IMG_W_MOBILE}
                            height={IMG_H_MOBILE}
                            style={{
                              width: IMG_W_MOBILE,
                              height: IMG_H_MOBILE,
                              objectFit: "cover",
                              borderRadius: 6,
                              display: "block",
                            }}
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                );
              })}

              {posts.length === 0 && (
                <div className="col-12 body-s c-text-secondary">
                  No papers found. Add items to{" "}
                  <code>
                    PortfolioData["Analytical Writing & Publications"]
                  </code>{" "}
                  and <code>PortfolioData["Research & Analysis Projects"]</code>
                  .
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
