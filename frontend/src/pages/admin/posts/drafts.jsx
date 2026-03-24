import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Footer from "../../../components/LandingPage/Footer";

const POSTS_BUCKET = "post-images";
const PUBLIC_BUCKET = "public-images";
const PAGE_SIZE = 12;

function isHttpUrl(src = "") {
  return src.startsWith("http://") || src.startsWith("https://");
}

function resolveImageServer(supabase, bucket, src) {
  const s = (src || "").trim();
  if (!s) return "";
  if (isHttpUrl(s) || s.startsWith("/")) return s;

  const { data } = supabase.storage.from(bucket).getPublicUrl(s);
  return data?.publicUrl || "";
}

function publicBucketUrl(path, bucket = PUBLIC_BUCKET) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !path) return "";
  return `${url}/storage/v1/object/public/${bucket}/${String(path).replace(
    /^\/+/,
    ""
  )}`;
}

function toPublicImageUrl(src) {
  if (!src) return "";
  const s = String(src).trim();
  if (!s) return "";

  if (/^https?:\/\//i.test(s)) return s;

  const assetMatch = s.match(/^\/assets\/images\/(.+)$/i);
  if (assetMatch?.[1]) return publicBucketUrl(assetMatch[1], PUBLIC_BUCKET);

  if (s.startsWith("/")) return s;

  return publicBucketUrl(s, PUBLIC_BUCKET);
}

function formatDate(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getExcerpt(post) {
  const raw = post?.excerpt || post?.summary || post?.description || "";
  const text = String(raw || "").trim();

  if (!text) return "No excerpt available yet.";
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).trim()}...`;
}

function getPostDate(post) {
  return (
    post?.published_at ||
    post?.date ||
    post?.updated_at ||
    post?.created_at ||
    null
  );
}

function getPostHref(post) {
  return `/admin/posts/${post.id}`;
}

function getPostImage(post) {
  // 1. Banner (highest priority)
  if (post?.banner_url) return post.banner_url;
  if (post?.banner) return post.banner;

  // 2. First inline image (from normalized SSR)
  if (post?.imageUrl) return post.imageUrl;
  if (post?.image) return post.image;

  // 3. Fallback
  return "/assets/images/space.webp";
}

function isAllowedStatus(post) {
  const status = String(post?.status || "").trim().toLowerCase();
  return status === "draft";
}

export default function AdminPostsIndex({ posts = [] }) {
  const sentinelRef = useRef(null);

  const validPosts = useMemo(() => {
    return Array.isArray(posts) ? posts.filter(isAllowedStatus) : [];
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...validPosts].sort((a, b) => {
      const aTime = new Date(getPostDate(a) || 0).getTime();
      const bTime = new Date(getPostDate(b) || 0).getTime();
      return bTime - aTime;
    });
  }, [validPosts]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = useMemo(() => {
    return sortedPosts.slice(0, visibleCount);
  }, [sortedPosts, visibleCount]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) =>
          Math.min(prev + PAGE_SIZE, sortedPosts.length)
        );
      },
      { rootMargin: "280px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sortedPosts.length]);

  return (
    <div className="admin-root">
      <AdminNavbar />

      <div className="admin-shell">
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto 18px",
          }}
        >
          <div className="admin-title">Draft Posts</div>
          <div className="admin-subtitle">
            All draft posts in one continuous collection.
          </div>
        </div>

        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          {visiblePosts.length === 0 ? (
            <div className="admin-card">
              <div className="admin-subtitle" style={{ marginTop: 0 }}>
                No posts found.
              </div>
              <div className="admin-subtitle" style={{ marginTop: 10 }}>
                Total rows returned from posts table: {posts.length}
              </div>
            </div>
          ) : (
            visiblePosts.map((post, i) => {
              const imageSrc = getPostImage(post);
              const href = getPostHref(post);

              return (
                <div
                  key={post.id}
                  className={
                    "card row card--large justify-between col-12 ml-0 mr-0 pb-15 border-bottom border-bottom-thin c-border " +
                    (i === 0 ? "border-top border-top-thin pt-20" : "")
                  }
                  style={{
                    alignItems: "flex-start",
                    marginBottom: 14,
                    position: "relative",
                  }}
                >
                  <Link
                    href={href}
                    aria-label={`Open: ${post.title}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      borderRadius: 6,
                    }}
                  />

                  <div
                    className="col-9 col-md-8 d-flex flex-column"
                    style={{ justifyContent: "flex-start", minWidth: 0 }}
                  >
                    <h3 className="body-m" style={{ marginBottom: 6 }}>
                      {post.title || "Untitled"}
                    </h3>

                    <p
                      className="body-s c-text-secondary"
                      style={{ marginBottom: 10 }}
                    >
                      {getExcerpt(post)}
                    </p>

                    <p
                      className="body-s c-accent"
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "auto",
                        marginBottom: 18,
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{post.author || "Tobin M. Albanese"}</span>
                      <span>✵</span>
                      <time>{formatDate(getPostDate(post))}</time>
                      <span>✵</span>
                      <span style={{ textTransform: "capitalize" }}>
                        {post.status || "draft"}
                      </span>
                      <span>✵</span>
                      <span>
                        {post.type === "portfolio"
                          ? "Portfolio"
                          : post.type === "mb"
                            ? "Blog"
                            : "Post"}
                      </span>
                    </p>
                  </div>

                  <div
                    className="col-3 col-md-4 d-flex"
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: 0,
                    }}
                  >
                    <img
                      src={imageSrc || "/assets/images/space.webp"}
                      alt={post.title || "Post image"}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/assets/images/space.webp";
                      }}
                      style={{
                        width: "100%",
                        maxWidth: 260,
                        aspectRatio: "16 / 10",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 6,
                        display: "block",
                        margin: "0 0 8px 0",
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />

          {visibleCount < sortedPosts.length && (
            <div
              className="body-s c-text-secondary"
              style={{ textAlign: "center", paddingTop: 8, paddingBottom: 14 }}
            >
              Loading more posts...
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const supabase = supabaseServer;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      type,
      title,
      slug,
      excerpt,
      status,
      is_published,
      published_at,
      created_at,
      updated_at,
      banner_url,
      archive_image_url,
      author,
      date
    `
    )
    .eq("status", "draft")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.log("ADMIN POSTS rows error:", error);
    return { props: { posts: [] } };
  }

  const safe = Array.isArray(data) ? data : [];
  const postIds = safe.map((p) => p.id).filter(Boolean);

  let inlineImageMap = {};

  if (postIds.length > 0) {
    const { data: imageRows, error: imageErr } = await supabase
      .from("post_images")
      .select("id, post_id, kind, storage_path, position")
      .in("post_id", postIds)
      .order("position", { ascending: true });

    if (imageErr) {
      console.log("Admin posts image SSR error:", imageErr);
    } else {
      for (const row of imageRows || []) {
        if (!row?.post_id || !row?.storage_path) continue;
        if (!inlineImageMap[row.post_id]) {
          inlineImageMap[row.post_id] = row.storage_path;
        }
      }
    }
  }

  const fallback = toPublicImageUrl("/assets/images/space.webp");

  const normalized = safe.map((p) => {
    const rawBanner = (p.banner_url || "").trim();
    const rawArchive = (p.archive_image_url || "").trim();
    const rawInline = (inlineImageMap[p.id] || "").trim();

    const resolvedBanner =
      resolveImageServer(supabase, POSTS_BUCKET, rawBanner) || "";
    const resolvedArchive =
      resolveImageServer(supabase, POSTS_BUCKET, rawArchive) || "";
    const resolvedInline =
      resolveImageServer(supabase, POSTS_BUCKET, rawInline) || "";

    return {
      id: p.id,
      type: p.type || "",
      title: p.title || "Untitled",
      slug: p.slug || "",
      excerpt: p.excerpt || "",
      status: p.status || "",
      is_published: !!p.is_published,
      published_at: p.published_at || null,
      created_at: p.created_at || null,
      updated_at: p.updated_at || null,
      date: p.date || null,
      author: p.author || "Tobin Albanese",
      banner_url: resolvedBanner || "",
      archive_image_url: resolvedArchive || "",
      banner: resolvedBanner || resolvedArchive || resolvedInline || fallback,
      image: resolvedBanner || resolvedArchive || resolvedInline || fallback,
      imageUrl: resolvedBanner || resolvedArchive || resolvedInline || fallback,
    };
  });

  return {
    props: {
      posts: normalized,
    },
  };
}
