// pages/api/portfolio/special-focus.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const BUCKET = "public-images";

const toWebp = (s) => (s ? s.replace(/\.(jpg|jpeg|png)$/i, ".webp") : s);

function resolveImageUrl(supabase, maybePathOrUrl) {
  if (!maybePathOrUrl) return null;

  // ✅ Local assets: enforce webp
  if (maybePathOrUrl.startsWith("/")) {
    return maybePathOrUrl.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  }

  // ✅ External: DO NOT rewrite extensions
  if (/^https?:\/\//i.test(maybePathOrUrl)) {
    return maybePathOrUrl;
  }

  // ✅ Storage object path: enforce webp
  const value = maybePathOrUrl.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const { data } = supabase.storage.from("public-images").getPublicUrl(value);
  return data?.publicUrl || null;
}



async function fetchGroupItemsByName(groupName, limit) {
  const { data: group, error: groupErr } = await supabaseServer
    .from("portfolio_groups")
    .select("id, name")
    .eq("name", groupName)
    .single();

  if (groupErr) return [];

  const { data, error } = await supabaseServer
    .from("portfolio_items")
    .select(
      `
      id,
      title,
      excerpt,
      image_url,
      position,
      created_at,
      updated_at,
      post_id,
      posts:post_id (
        id,
        slug,
        title,
        excerpt,
        author,
        date,
        banner_url,
        archive_image_url,
        created_at,
        published_at
      )
    `
    )
    .eq("group_id", group.id)
    .order("position", { ascending: true })
    .limit(limit * 6);

  if (error) throw error;

  const usable = (data || []).filter((row) => row?.posts?.slug);

  return usable.slice(0, limit).map((row) => {
    const post = row.posts;

    const imageUrl =
      resolveImageUrl(supabaseServer, row.image_url) ||
      resolveImageUrl(supabaseServer, post?.archive_image_url) ||
      resolveImageUrl(supabaseServer, post?.banner_url) ||
      resolveImageUrl(supabaseServer, "fallbacks/space.webp") ||
      "/assets/images/space.webp";

    return {
      id: row.id,
      slug: post.slug,
      title: row.title || post.title || "Untitled",
      excerpt: row.excerpt || post.excerpt || "",
      date: post.date || post.published_at || post.created_at || row.updated_at || row.created_at,
      imageUrl,
      imageAlt: row.title || post.title || "Portfolio image",
    };
  });
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const limitRaw = parseInt(req.query.limit || "3", 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 6) : 3;

    const GROUP = "Current & In-Progress Work";
    const items = await fetchGroupItemsByName(GROUP, limit);

    return res.status(200).json({ group: GROUP, items });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
