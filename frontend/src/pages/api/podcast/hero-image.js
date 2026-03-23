// frontend/src/pages/api/podcast/hero-image.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const BUCKET = "public-images";

function resolveImageUrl(supabase, maybePathOrUrl) {
  if (!maybePathOrUrl) return null;

  // Local public asset
  if (maybePathOrUrl.startsWith("/")) return maybePathOrUrl;

  // External URL
  if (/^https?:\/\//i.test(maybePathOrUrl)) return maybePathOrUrl;

  // Storage path in bucket
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(maybePathOrUrl);
  return data?.publicUrl || null;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Pick your canonical "podcast" type(s). Add/adjust as needed.
    const PODCAST_TYPES = ["podcast"];

    const { data, error } = await supabaseServer
      .from("posts")
      .select("id, type, title, banner_url, archive_image_url, created_at, published_at, date")
      .in("type", PODCAST_TYPES)
      // if you want it to show even before publishing, remove these:
      // .eq("status", "published")
      // .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    const row = data?.[0] || null;

    const imageUrl =
      resolveImageUrl(supabaseServer, row?.banner_url) ||
      resolveImageUrl(supabaseServer, row?.archive_image_url) ||
      "/assets/images/Podcast.webp"; // fallback (ensure webp)

    return res.status(200).json({
      imageUrl,
      title: row?.title || null,
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
