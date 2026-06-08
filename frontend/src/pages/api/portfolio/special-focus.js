// pages/api/portfolio/special-focus.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

const FALLBACK_THUMB = "/assets/images/space.webp";

const SPECIAL_FOCUS_ORDER = [
  "midnight-bureau-expansion",
  "european-terrorist-group-intel-report",
  "global-intel-hub-launch-finalization",
  "russian-affairs-project",
];

const RUSSIA_SIDEBAR_PUBLIC_PATH = "russia9.webp";

function publicBucketUrl(path) {
  if (!path) return "";

  const clean = String(path)
    .replace(/^\/+/, "")
    .replace(/^public-images\//i, "");

  const { data } = supabaseServer.storage.from(PUBLIC_BUCKET).getPublicUrl(clean);

  return data?.publicUrl || "";
}

function postsBucketUrl(path) {
  if (!path) return "";

  const clean = String(path)
    .replace(/^\/+/, "")
    .replace(/^post-images\//i, "");

  const { data } = supabaseServer.storage.from(POSTS_BUCKET).getPublicUrl(clean);

  return data?.publicUrl || "";
}

function toResolvedImageUrl(src) {
  if (!src) return "";

  const value = String(src).trim();

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const assetsMatch = value.match(/^\/assets\/images\/(.+)$/i);

  if (assetsMatch?.[1]) {
    return publicBucketUrl(assetsMatch[1]);
  }

  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  return publicBucketUrl(value);
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
    slug: post.slug,
    title: post.title || "Untitled",
    excerpt: post.excerpt || "",
    author: post.author || "Tobin M. Albanese",
    date: post.date || post.published_at || post.created_at || null,

    banner_url: bannerImage,
    archive_image_url: archiveImage,

    banner: bannerImage,
    archiveImage,
    imageUrl,
    displayImage: imageUrl,

    imageAlt: post.title || "Portfolio image",

    // Kept for clarity. Your frontend will still decide whether it is clickable.
    clickable: false,
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
      .in("slug", SPECIAL_FOCUS_ORDER);

    if (error) {
      throw error;
    }

    const bySlug = new Map((data || []).map((post) => [post.slug, post]));

    const items = SPECIAL_FOCUS_ORDER.map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .map(normalizePost);

    const sidebarImage =
      publicBucketUrl(RUSSIA_SIDEBAR_PUBLIC_PATH) ||
      "https://aekjhiphxycnybowwgud.supabase.co/storage/v1/object/public/public-images/russia9.webp";

    return res.status(200).json({
      group: "Current & In-Progress Work",
      items,
      sidebarImage,
    });
  } catch (e) {
    console.error("special-focus API error:", e);

    return res.status(500).json({
      group: "Current & In-Progress Work",
      items: [],
      sidebarImage:
        "https://aekjhiphxycnybowwgud.supabase.co/storage/v1/object/public/public-images/russia9.webp",
      error: e?.message || "Unknown error",
    });
  }
}