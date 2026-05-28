// pages/api/portfolio/special-focus.js
import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const PUBLIC_BUCKET = "public-images";
const POSTS_BUCKET = "post-images";

function publicBucketUrl(path) {
  if (!path) return "";
  const clean = String(path).replace(/^\/+/, "").replace(/^public-images\//i, "");
  const { data } = supabaseServer.storage.from(PUBLIC_BUCKET).getPublicUrl(clean);
  return data?.publicUrl || "";
}

function postsBucketUrl(path) {
  if (!path) return "";
  const clean = String(path).replace(/^\/+/, "").replace(/^post-images\//i, "");
  const { data } = supabaseServer.storage.from(POSTS_BUCKET).getPublicUrl(clean);
  return data?.publicUrl || "";
}

function toResolvedImageUrl(src) {
  if (!src) return "";

  const value = String(src).trim();
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) return value;

  const assetsMatch = value.match(/^\/assets\/images\/(.+)$/i);
  if (assetsMatch?.[1]) {
    return publicBucketUrl(assetsMatch[1]);
  }

  if (value.startsWith("posts/")) {
    return postsBucketUrl(value);
  }

  return publicBucketUrl(value);
}

async function fetchGroupItemsByName(groupName, limit) {
  const { data: group, error: groupErr } = await supabaseServer
    .from("portfolio_groups")
    .select("id, name")
    .eq("name", groupName)
    .single();

  if (groupErr || !group?.id) return [];

  const { data, error } = await supabaseServer
    .from("portfolio_items")
    .select(`
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
    `)
    .eq("group_id", group.id)
    .order("position", { ascending: true })
    .limit(limit * 6);

  if (error) throw error;

  const usable = (data || []).filter((row) => row?.posts?.slug);

  return usable.slice(0, limit).map((row) => {
    const post = row.posts;

    const imageUrl =
      toResolvedImageUrl(row.image_url) ||
      toResolvedImageUrl(post?.archive_image_url) ||
      toResolvedImageUrl(post?.banner_url) ||
      toResolvedImageUrl("fallbacks/space.webp") ||
      "/assets/images/space.webp";

    return {
      id: row.id,
      slug: post.slug,
      title: row.title || post.title || "Untitled",
      excerpt: row.excerpt || post.excerpt || "",
      author: post.author || "Tobin M. Albanese",
      date:
        post.date ||
        post.published_at ||
        post.created_at ||
        row.updated_at ||
        row.created_at,
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
    const limit = Number.isFinite(limitRaw)
      ? Math.min(Math.max(limitRaw, 1), 6)
      : 3;

    const GROUP = "Current & In-Progress Work";
    const items = await fetchGroupItemsByName(GROUP, limit);

    const { data: sidebarData } = supabaseServer
      .storage
      .from(PUBLIC_BUCKET)
      .getPublicUrl("stellarisWorkflow.webp");

    const sidebarImage = sidebarData?.publicUrl || "";

    return res.status(200).json({
      group: GROUP,
      items,
      sidebarImage,
    });
  } catch (e) {
    console.error("special-focus API error:", e);
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
