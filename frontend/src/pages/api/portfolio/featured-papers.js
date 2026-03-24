import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const BUCKET = "public-images";

function resolveImageUrl(supabase, maybePathOrUrl) {
  if (!maybePathOrUrl) return null;

  const value = String(maybePathOrUrl).trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("/")) {
    const key = value.replace(/^\/assets\/images\//i, "");
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
    return data?.publicUrl || null;
  }

  const cleaned = value.replace(/^public-images\//i, "");
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(cleaned);
  return data?.publicUrl || null;
}

async function getGroupIdByName(groupName) {
  const { data, error } = await supabaseServer
    .from("portfolio_groups")
    .select("id")
    .eq("name", groupName)
    .single();

  if (error) return null;
  return data?.id || null;
}

async function fetchPortfolioItemsForGroup(groupId, limit) {
  if (!groupId) return [];

  const { data, error } = await supabaseServer
    .from("portfolio_items")
    .select(
      `
      id,
      title,
      excerpt,
      image_url,
      external,
      external_url,
      clickable,
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
        published_at,
        created_at,
        banner_url,
        archive_image_url
      )
    `
    )
    .eq("group_id", groupId)
    .order("position", { ascending: true })
    .limit(limit * 8);

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
      author: post.author || "Tobin Albanese",
      date: post.date || post.published_at || post.created_at || row.updated_at || row.created_at,
      imageUrl,
      imageAlt: row.title || post.title || "Paper thumbnail",
      group: groupId,
    };
  });
}

function uniqBySlug(list) {
  const seen = new Set();
  return (list || []).filter((p) => {
    if (!p?.slug) return false;
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const perGroupRaw = parseInt(req.query.perGroup || "2", 10);
    const perGroup = Number.isFinite(perGroupRaw)
      ? Math.min(Math.max(perGroupRaw, 1), 6)
      : 2;

    const GROUP_A = "Analytical Writing & Publications";
    const GROUP_B = "Research & Analysis Projects";

    const [groupAId, groupBId] = await Promise.all([
      getGroupIdByName(GROUP_A),
      getGroupIdByName(GROUP_B),
    ]);

    const [aRaw, bRaw] = await Promise.all([
      fetchPortfolioItemsForGroup(groupAId, perGroup),
      fetchPortfolioItemsForGroup(groupBId, perGroup),
    ]);

    const used = new Set();
    const takeUnique = (arr) => {
      const out = [];
      for (const p of uniqBySlug(arr)) {
        if (out.length >= perGroup) break;
        if (p?.slug && !used.has(p.slug)) {
          used.add(p.slug);
          out.push(p);
        }
      }
      return out;
    };

    const a = takeUnique(aRaw);
    const b = takeUnique(bRaw);

    const sidebarImage =
      resolveImageUrl(supabaseServer, "Russia4.webp") ||
      "/assets/images/Russia4.webp";

    return res.status(200).json({
      groups: { a: GROUP_A, b: GROUP_B },
      posts: [...a, ...b],
      sidebarImage,
    });
  } catch (e) {
    console.error("featured-papers API error:", e);
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}