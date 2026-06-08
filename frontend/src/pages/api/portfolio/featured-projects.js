// pages/api/portfolio/featured-projects.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

const FALLBACK_THUMB = "/assets/images/space.webp";

const FEATURED_ORDER = [
  "naomi",
  "signalis-global-intelligence-platform",
  "reentry-wage-reporting-system",
  "the-human-source-premium",
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

  // Already public URL
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Local frontend asset
  if (value.startsWith("/assets/images/")) {
    return value.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  }

  // Post-uploaded storage paths like posts/<post-id>/banner/image.webp
  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  // Public bucket fallback paths like fallbacks/space.webp or image.webp
  return publicBucketUrl(value);
}

function normalizePost(post) {
  const bannerImage = toResolvedImageUrl(post.banner_url);
  const archiveImage = toResolvedImageUrl(post.archive_image_url);

  const finalImage =
    bannerImage ||
    archiveImage ||
    toResolvedImageUrl("fallbacks/space.webp") ||
    FALLBACK_THUMB;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title || "Untitled",
    excerpt: post.excerpt || "",
    author: post.author || "Tobin Albanese",
    date: post.date || post.published_at || post.created_at || null,

    banner_url: bannerImage,
    archive_image_url: archiveImage,

    // These preserve your existing FeaturedProjects.jsx picker semantics
    banner: bannerImage || finalImage,
    image_url: finalImage,
    archiveImage,

    displayImage: finalImage,
  };
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
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
      `
      )
      .eq("type", "portfolio")
      .eq("status", "published")
      .eq("is_published", true)
      .eq("clickable", true)
      .in("slug", FEATURED_ORDER);

    if (error) {
      throw error;
    }

    const bySlug = new Map((data || []).map((post) => [post.slug, post]));

    const featured = FEATURED_ORDER.map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .map(normalizePost);

    return res.status(200).json({
      featuredName: "Featured / Spotlight Projects",
      csName: "Computer Science Projects",
      featured,
      cs: [],
    });
  } catch (e) {
    console.error("featured-projects API error:", e);

    return res.status(500).json({
      featuredName: "Featured / Spotlight Projects",
      csName: "Computer Science Projects",
      featured: [],
      cs: [],
      error: e?.message || "Unknown error",
    });
  }
}