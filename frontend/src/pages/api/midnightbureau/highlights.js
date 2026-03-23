// frontend/src/pages/api/midnightbureau/highlights.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const BUCKET = "public-images";

function resolveImageUrl(supabase, maybePathOrUrl) {
  if (!maybePathOrUrl) return null;

  // local public asset
  if (maybePathOrUrl.startsWith("/")) return maybePathOrUrl;

  // external
  if (/^https?:\/\//i.test(maybePathOrUrl)) return maybePathOrUrl;

  // storage path in bucket
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(maybePathOrUrl);
  return data?.publicUrl || null;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const limitRaw = parseInt(req.query.limit || "4", 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 12) : 4;

    // ✅ BLOG ONLY (no portfolio)
    // Current DB uses `type = 'mb'` for Midnight Bureau posts.
    const BLOG_TYPES = ["mb", "midnightbureau", "blog"];

    const { data, error } = await supabaseServer
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
        date,
        author,
        banner_url,
        archive_image_url
      `
      )
      .in("type", BLOG_TYPES)
      // published guardrails (you can loosen later if you want to preview drafts)
      .eq("status", "published")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    const posts = (data || []).map((p) => {
      const imageUrl =
        resolveImageUrl(supabaseServer, p.banner_url) ||
        resolveImageUrl(supabaseServer, p.archive_image_url) ||
        "/assets/images/space.webp";

      return {
        id: p.id,
        slug: p.slug,
        title: p.title || "Untitled",
        excerpt: p.excerpt || "",
        date: p.published_at || p.date || p.created_at,
        author: p.author || "Tobin M. Albanese",
        imageUrl,
        imageAlt: p.title || "Blog image",
      };
    });

    return res.status(200).json({ posts });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
