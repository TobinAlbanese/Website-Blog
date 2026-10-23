// pages/api/portfolio/research-highlights.js

import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

const FALLBACK_THUMB = "/assets/images/space.webp";

const RESEARCH_HIGHLIGHTS_ORDER = [
  "markets-without-rules",
  "strategic-proxies",
  "pipelines-and-democracy",
  "covert-action-paper",
];

function publicBucketUrl(path) {
  if (!path) return "";

  const clean = String(path)
    .replace(/^\/+/, "")
    .replace(/^public-images\//i, "");

  const { data } = supabaseServer.storage
    .from(PUBLIC_BUCKET)
    .getPublicUrl(clean);

  return data?.publicUrl || "";
}

function postsBucketUrl(path) {
  if (!path) return "";

  const clean = String(path)
    .replace(/^\/+/, "")
    .replace(/^post-images\//i, "");

  const { data } = supabaseServer.storage
    .from(POSTS_BUCKET)
    .getPublicUrl(clean);

  return data?.publicUrl || "";
}

function toResolvedImageUrl(src) {
  if (!src) return "";

  const value = String(src).trim();

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/assets/images/")) {
    return value.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  }

  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  return publicBucketUrl(value);
}

function hrefForPost(post) {
  if (post.type === "mb") {
    return `/ResearchJournal/${post.slug}`;
  }

  return `/Portfolio/${post.slug}`;
}

function normalizePost(post) {
  const bannerImage = toResolvedImageUrl(post.banner_url);
  const archiveImage = toResolvedImageUrl(post.archive_image_url);

  const imageUrl =
    bannerImage ||
    archiveImage ||
    toResolvedImageUrl("fallbacks/space.webp") ||
    FALLBACK_THUMB;

  return {
    id: post.id,
    type: post.type,
    slug: post.slug,
    title: post.title || "Untitled",
    excerpt: post.excerpt || "",
    author: post.author || "Tobin Albanese",
    date: post.date || post.published_at || post.created_at || null,

    href: hrefForPost(post),

    banner_url: bannerImage,
    archive_image_url: archiveImage,
    banner: bannerImage,
    archiveImage,
    imageUrl,
    displayImage: imageUrl,

    imageAlt: post.title || "Research thumbnail",
  };
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const { data, error } = await supabaseServer
      .from("posts")
      .select(
        `
        id,
        slug,
        type,
        title,
        excerpt,
        author,
        date,
        status,
        is_published,
        clickable,
        banner_url,
        archive_image_url,
        created_at,
        published_at
      `,
      )
      .in("type", ["portfolio", "mb"])
      .eq("status", "published")
      .eq("is_published", true)
      .in("slug", RESEARCH_HIGHLIGHTS_ORDER);

    if (error) {
      console.error("Supabase research-highlights query error:", error);
      throw error;
    }

    const bySlug = new Map((data || []).map((post) => [post.slug, post]));

    const posts = RESEARCH_HIGHLIGHTS_ORDER.map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .map(normalizePost);

    return res.status(200).json({
      posts,
    });
  } catch (e) {
    console.error("research-highlights API error:", e);

    return res.status(500).json({
      posts: [],
      error: e?.message || "Unknown error",
    });
  }
}
