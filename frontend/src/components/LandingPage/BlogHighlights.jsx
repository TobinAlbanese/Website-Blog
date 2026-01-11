// components/BlogHighlights.jsx
import React from "react";
import Link from "next/link";
import MidnightBureauData from "../../data/MidnightBureau";

// pick Popular first, else Recent
const source =
  Array.isArray(MidnightBureauData?.Popular) &&
  MidnightBureauData.Popular.length
    ? MidnightBureauData.Popular
    : Array.isArray(MidnightBureauData?.Recent)
      ? MidnightBureauData.Recent
      : [];
const posts = source.slice(0, 4);

const getImg = (post) =>
  post?.images?.[0] || post?.archiveImage || "/assets/images/space.jpg";
const getHref = (post) => `/MidnightBureau/${post.slug}`;
const getDescription = (post) => {
  if (post?.excerpt) return post.excerpt;
  const html = post?.content?.[0]?.text || "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const m = text.match(/.*?[.!?](\s|$)/);
  return (m ? m[0] : text) || "Read the full story.";
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

// image sizing to match Special Focus
const IMG_MAX_W_DESKTOP = 220;
const ASPECT_RATIO = "16 / 10";
const IMG_W_MOBILE = 105;
const IMG_H_MOBILE = 115;

export default function BlogHighlights() {
  return (
    <section
      className="c-bg"
      data-armstrong-id="wrapper"
      id="blog-highlights-section"
    >
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
        data-armstrong-id="primary"
      >
        {/* Heading */}
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Blog Highlights
          </h3>
          <h4
            className="fs-18 mb-15 fs-md-16"
            data-armstrong-id="module_subtitle"
          >
            A curated look at my latest insights on politics, culture, and more.
          </h4>
        </div>

        {/* Cards + sidebar */}
        <div className="col-12">
          <div className="row justify-between d-flex" data-armstrong-id="row">
            {/* Cards */}
            <div className="col-12 col-md-8" data-armstrong-id="grid_2">
              {posts.map((post, i) => (
                <div
                  key={post.slug || `${post.title}-${i}`}
                  className={
                    "card row card--large justify-between col-12 ml-0 mr-0 pb-15 border-bottom border-bottom-thin c-border " +
                    (i === 0 ? "border-top border-top-thin pt-20" : "")
                  }
                  style={{
                    alignItems: "stretch",
                    marginBottom: 14,
                    position: "relative",
                  }}
                >
                  {/* FULL-CARD CLICKABLE OVERLAY */}
                  <Link
                    href={getHref(post)}
                    aria-label={`Open: ${post.title}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      borderRadius: 6,
                    }}
                  />

                  {/* LEFT: title/desc/author+date */}
                  <div
                    className="col-9 col-md-8 ml-0 d-flex flex-column"
                    style={{ minHeight: 0 }}
                  >
                    <h3 className="body-m" style={{ marginBottom: 6 }}>
                      <span>{post.title}</span>
                    </h3>

                    <p
                      className="body-s c-text-secondary"
                      style={{ marginBottom: 10 }}
                    >
                      <span>{getDescription(post)}</span>
                    </p>

                    {/* Author ✵ Date (no divider) */}
                    <p
                      className="body-s c-accent home-hide-meta"
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "auto",
                        marginBottom: 0,
                        paddingTop: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span>Tobin M. Albanese</span>
                      <span
                        aria-hidden="true"
                        style={{
                          lineHeight: 1,
                          transform: "translateY(-0.5px)",
                        }}
                      >
                        ✵
                      </span>
                      <time dateTime={post.date || ""}>
                        {formatDate(post.date)}
                      </time>
                    </p>
                  </div>

                  {/* RIGHT: image — sized like Special Focus */}
                  <div
                    className="col-3 col-md-4 d-flex flex-column mr-0"
                    style={{ alignItems: "flex-start" }}
                  >
                    {/* Desktop */}
                    <figure
                      className="d-none d-md-block"
                      style={{ margin: 0, marginBottom: 10 }}
                    >
                      <img
                        src={getImg(post)}
                        alt={post.title}
                        loading="lazy"
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

                    {/* Mobile */}
                    <figure
                      className="d-block d-md-none"
                      style={{ margin: 0, marginBottom: 10 }}
                    >
                      <img
                        src={getImg(post)}
                        alt={post.title}
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
              ))}

              {posts.length === 0 && (
                <div className="col-12 body-s c-text-secondary">
                  No posts found. Add items to{" "}
                  <code>MidnightBureauData.Popular</code> or{" "}
                  <code>.Recent</code>.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="col-12 col-md-4 home-hide-narrow">
              <div className="sidebar">
                <aside className="col-12 col-md-4 d-flex justify-center align-items-center">
                  <img
                    src="/assets/images/Croatia.jpg"
                    alt="Croatia coastline"
                    style={{
                      maxWidth: "100%",
                      height: 620,
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </aside>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
