import { supabaseServer } from "../../../lib/supabase/supabaseServer";

const POSTS_BUCKET = "post-images";
const PUBLIC_BUCKET = "public-images";

function resolveImageUrl(supabase, maybePathOrUrl) {
  if (!maybePathOrUrl) return null;

  const value = String(maybePathOrUrl).trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("/assets/images/")) {
    const key = value.replace(/^\/assets\/images\//, "");
    const { data } = supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(key);
    return data?.publicUrl || null;
  }

  if (value.startsWith("/")) return value;

  if (value.startsWith("posts/")) {
    const { data } = supabase.storage.from(POSTS_BUCKET).getPublicUrl(value);
    return data?.publicUrl || null;
  }

  const { data } = supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(value);
  return data?.publicUrl || null;
}

function dedupeBySlug(posts) {
  const seen = new Set();
  return (posts || []).filter((p) => {
    const slug = String(p?.slug || "").trim();
    if (!slug || seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const limitRaw = parseInt(req.query.limit || "4", 10);
    const limit = Number.isFinite(limitRaw)
      ? Math.min(Math.max(limitRaw, 1), 12)
      : 4;

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
        archive_image_url,
        category
      `
      )
      .in("type", BLOG_TYPES)
      .eq("status", "published")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    const allPosts = (data || []).map((p) => {
      const bannerUrl = resolveImageUrl(supabaseServer, p.banner_url);
      const archiveImageUrl = resolveImageUrl(
        supabaseServer,
        p.archive_image_url
      );

      return {
        id: p.id,
        slug: p.slug,
        title: p.title || "Untitled",
        excerpt: p.excerpt || "",
        date: p.published_at || p.date || p.created_at,
        author: p.author || "Tobin M. Albanese",
        category: p.category || "",
        banner_url: p.banner_url || "",
        archive_image_url: p.archive_image_url || "",
        imageUrl: bannerUrl || archiveImageUrl || "",
        imageAlt: p.title || "Blog image",
      };
    });

    const highlights = allPosts.filter(
      (p) =>
        String(p.category || "")
          .trim()
          .toLowerCase() === "highlights"
    );

    const recent = allPosts;

    const selected = dedupeBySlug([
      ...highlights.slice(0, limit),
      ...recent,
    ]).slice(0, limit);

    const { data: sidebarData } = supabaseServer.storage
      .from(PUBLIC_BUCKET)
      .getPublicUrl("Croatia.webp");

    return res.status(200).json({
      highlights: highlights.slice(0, limit),
      recent: recent.slice(0, limit),
      posts: selected,
      sidebarImage: sidebarData?.publicUrl || "",
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
