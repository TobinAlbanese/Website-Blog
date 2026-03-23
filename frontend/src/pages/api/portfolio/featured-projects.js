// pages/api/portfolio/featured-projects.js
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


async function getGroupIdByName(name) {
  const { data, error } = await supabaseServer
    .from("portfolio_groups")
    .select("id")
    .eq("name", name)
    .single();

  if (error) return null;
  return data?.id || null;
}

async function fetchItemsByGroupId(groupId, limit) {
  if (!groupId) return [];

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
        date,
        published_at,
        created_at,
        banner_url,
        archive_image_url,
        author
      )
    `
    )
    .eq("group_id", groupId)
    .order("position", { ascending: true })
    .limit(limit * 8); // fetch extra; we’ll filter unusable rows

  if (error) throw error;

  // Must have a slug to link /Portfolio/[slug]
  const usable = (data || []).filter((row) => row?.posts?.slug);

  return usable.slice(0, limit).map((row) => {
    const post = row.posts;

    // Primary card image preference: banner_url first (like your old `p.banner`)
    const primaryImageUrl =
      resolveImageUrl(supabaseServer, post?.banner_url) ||
      resolveImageUrl(supabaseServer, row.image_url) ||
      resolveImageUrl(supabaseServer, post?.archive_image_url) ||
      resolveImageUrl(supabaseServer, "fallbacks/space.webp") ||
      "/assets/images/space.webp";

    // Side card image can fall back similarly
    const sideImageUrl =
      resolveImageUrl(supabaseServer, row.image_url) ||
      resolveImageUrl(supabaseServer, post?.banner_url) ||
      resolveImageUrl(supabaseServer, post?.archive_image_url) ||
      resolveImageUrl(supabaseServer, "fallbacks/space.webp") ||
      "/assets/images/space.webp";

    return {
      id: row.id,
      slug: post.slug,
      title: row.title || post.title || "Untitled",
      excerpt: row.excerpt || post.excerpt || "",
      date: post.date || post.published_at || post.created_at || row.updated_at || row.created_at,
      author: post.author || "Tobin Albanese",
      // expose both to preserve your picker semantics
      banner: primaryImageUrl,
      image_url: sideImageUrl,
      archiveImage: resolveImageUrl(supabaseServer, post?.archive_image_url) || null,
    };
  });
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const featuredName = "Featured / Spotlight Projects";
    const csName = "Computer Science Projects";

    const [featuredId, csId] = await Promise.all([
      getGroupIdByName(featuredName),
      getGroupIdByName(csName),
    ]);

    // Pull enough to fill primary + 4 side safely
    const [featured, cs] = await Promise.all([
      fetchItemsByGroupId(featuredId, 8),
      fetchItemsByGroupId(csId, 8),
    ]);

    return res.status(200).json({
      featuredName,
      csName,
      featured,
      cs,
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
