import React, { useEffect, useState } from "react";
import Link from "next/link";

const HIGHLIGHT_SLUGS = [
  "markets-without-rules",
  "strategic-proxies",
  "pipelines-and-democracy",
  "the-terrorist-without-an-organization",
];

const getHref = (post) => {
  if (post?.href) {
    return post.href;
  }

  if (post?.type === "mb") {
    return `/MidnightBureau/${post.slug}`;
  }

  return `/Portfolio/${post.slug}`;
};

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

const SB_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

const publicBucketUrl = (path) => {
  if (!SB_URL || !path) return "";

  return `${SB_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${String(
    path
  ).replace(/^\/+/, "")}`;
};

const postsBucketUrl = (path) => {
  if (!SB_URL || !path) return "";

  return `${SB_URL}/storage/v1/object/public/${POSTS_BUCKET}/${String(
    path
  ).replace(/^\/+/, "")}`;
};

const toResolvedImageUrl = (src) => {
  if (!src) return "";

  const value = String(src).trim();

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const assetsMatch = value.match(
    /^\/assets\/images\/(.+)$/i
  );

  if (assetsMatch?.[1]) {
    return publicBucketUrl(assetsMatch[1]);
  }

  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  return publicBucketUrl(value);
};

const pickPostImage = (post) => {
  const raw =
    post?.banner_url ||
    post?.banner ||
    post?.archive_image_url ||
    post?.archiveImage ||
    post?.archiveImageUrl ||
    post?.imageUrl ||
    post?.image ||
    "";

  return (
    post?.imageUrl ||
    toResolvedImageUrl(raw) ||
    ""
  );
};

export default function BlogHighlights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        setFailed(false);

const res = await fetch(
  "/api/portfolio/research-highlights",
  {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

        if (!res.ok) {
          throw new Error(
            `Request failed: ${res.status}`
          );
        }

        const data = await res.json();

        if (active) {
          setPosts(
  Array.isArray(data?.posts)
    ? data.posts
    : []
);
        }
      } catch (err) {
        console.error(
          "Error loading highlights:",
          err
        );

        if (active) {
          setFailed(true);
          setPosts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      className="c-bg"
      id="blog-highlights-section"
    >
      <div className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60">
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Research Highlights
          </h3>

          <h4 className="fs-18 mb-15 fs-md-16">
            Selected completed research and published analysis.
          </h4>
        </div>

        <div className="col-12">
          <div className="row justify-between d-flex">
            <div className="col-12 col-md-7">
              {loading && (
                <div className="body-s c-text-secondary">
                  Loading highlights…
                </div>
              )}

              {!loading && failed && (
                <div className="body-s c-text-secondary">
                  Couldn&apos;t load highlights.
                </div>
              )}

              {!loading &&
                !failed &&
                posts.length === 0 && (
                  <div className="body-s c-text-secondary">
                    No published posts yet.
                  </div>
                )}

              {!loading &&
                !failed &&
                posts.map((post, i) => {
                  const imageSrc =
                    pickPostImage(post);

                  return (
                    <div
                      key={post.slug || i}
                      className={
                        "card row card--large justify-between col-12 ml-0 mr-0 pb-15 border-bottom border-bottom-thin c-border " +
                        (i === 0
                          ? "border-top border-top-thin pt-20"
                          : "")
                      }
                      style={{
                        alignItems:
                          "flex-start",
                        marginBottom: 14,
                        position: "relative",
                      }}
                    >
                      <Link
                        href={getHref(post)}
                        aria-label={`Open: ${post.title}`}
                        style={{
                          position:
                            "absolute",
                          inset: 0,
                          zIndex: 1,
                          borderRadius: 6,
                        }}
                      />

                      <div
                        className="col-9 col-md-8 d-flex flex-column"
                        style={{
                          justifyContent:
                            "flex-start",
                        }}
                      >
                        <h3
                          className="body-m"
                          style={{
                            marginBottom: 6,
                          }}
                        >
                          {post.title}
                        </h3>

                        <p
                          className="body-s c-text-secondary"
                          style={{
                            marginBottom: 10,
                          }}
                        >
                          {post.excerpt ||
                            "Read the full story."}
                        </p>

                        <p
                          className="body-s c-accent"
                          style={{
                            fontSize:
                              "0.9rem",
                            marginTop:
                              "auto",
                            marginBottom: 18,
                            display: "flex",
                            gap: 10,
                          }}
                        >
                          <span>
                            {post.author ||
                              "Tobin Albanese"}
                          </span>

                          <span>✵</span>

                          <time>
                            {formatDate(
                              post.date ||
                                post.published_at ||
                                post.created_at
                            )}
                          </time>
                        </p>
                      </div>

                      <div
                        className="col-3 col-md-4 d-flex"
                        style={{
                          alignItems:
                            "flex-start",
                          justifyContent:
                            "center",
                          paddingTop: 0,
                        }}
                      >
                        <img
                          src={
                            imageSrc ||
                            "/assets/images/space.webp"
                          }
                          alt={post.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror =
                              null;

                            e.currentTarget.src =
                              "/assets/images/space.webp";
                          }}
                          style={{
                            width: "100%",
                            maxWidth: 220,
                            aspectRatio:
                              "16 / 10",
                            objectFit: "cover",
                            objectPosition:
                              "center",
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

        <aside
  className="col-12 col-md-5 home-hide-narrow"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 32,
  }}
>
  <img
    src="https://aekjhiphxycnybowwgud.supabase.co/storage/v1/object/public/public-images/Croatia.webp"
    alt="Croatia coastline"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/assets/images/space.webp";
    }}
    className="home-floating-side-image"
    style={{
      borderRadius: 18,
    }}
  />
</aside>
          </div>
        </div>
      </div>
    </section>
  );
}