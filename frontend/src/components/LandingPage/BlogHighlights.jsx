// components/LandingPage/BlogHighlights.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

const getHref = (post) => `/MidnightBureau/${post.slug}`;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function BlogHighlights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setFailed(false);
        const res = await fetch("api/midnightbureau/highlights?limit=4");
        const data = await res.json();
        const recent = Array.isArray(data?.recent) ? data.recent : [];
        setPosts(recent.slice(0, 4));
      } catch (err) {
        console.error("Error loading highlights:", err);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="c-bg" id="blog-highlights-section">
      <div className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60">
        {/* Heading */}
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Blog Highlights
          </h3>
          <h4 className="fs-18 mb-15 fs-md-16">
            A curated look at my latest insights on politics, culture, and more.
          </h4>
        </div>

        {/* ALWAYS render the cards+sidebar layout row */}
        <div className="col-12">
          <div className="row justify-between d-flex">
            {/* LEFT: Cards / empty states */}
            <div className="col-12 col-md-8">
              {loading && (
                <div className="body-s c-text-secondary">Loading highlights…</div>
              )}

              {!loading && failed && (
                <div className="body-s c-text-secondary">
                  Couldn’t load highlights from Supabase.
                </div>
              )}

              {!loading && !failed && posts.length === 0 && (
                <div className="body-s c-text-secondary">
                  No published posts yet.
                </div>
              )}

              {!loading &&
                !failed &&
                posts.map((post, i) => (
                  <div
                    key={post.slug || i}
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

                    <div className="col-9 col-md-8 d-flex flex-column">
                      <h3 className="body-m" style={{ marginBottom: 6 }}>
                        {post.title}
                      </h3>

                      <p
                        className="body-s c-text-secondary"
                        style={{ marginBottom: 10 }}
                      >
                        {post.excerpt || "Read the full story."}
                      </p>

                      <p
                        className="body-s c-accent"
                        style={{
                          fontSize: "0.9rem",
                          marginTop: "auto",
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <span>Tobin M. Albanese</span>
                        <span>✵</span>
                        <time>{formatDate(post.date)}</time>
                      </p>
                    </div>

                    <div className="col-3 col-md-4">
                      <img
                        src={post.imageUrl || "/assets/images/space.webp"}
                        alt={post.title}
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
                    </div>
                  </div>
                ))}
            </div>

            {/* RIGHT: Sidebar image — ALWAYS visible */}
            <aside className="col-12 col-md-4 home-hide-narrow">
              <div className="sidebar">
                <aside className="col-12 col-md-4 d-flex justify-center align-items-center">
                  <img
                    src="/assets/images/croatia.webp"
                    alt="Croatia coastline"
                    style={{
                      maxWidth: "100%",
                      height: 620,
                      borderRadius: "8px",
                      objectFit: "cover",
                      display: "block",
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
