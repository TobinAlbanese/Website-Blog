// lib/adminPosts.js
import { supabase } from "./supabase/client";


/**
 * Convert storage paths or stored URLs into a usable public URL.
 * Adjust bucket name if you use Storage for post images.
 */
const toPublicUrl = (maybeUrlOrPath) => {
  if (!maybeUrlOrPath) return null;

  // If it's already a full URL, return it
  if (/^https?:\/\//i.test(maybeUrlOrPath)) return maybeUrlOrPath;

  // If it's a storage path, convert to public URL (bucket name may differ)
  // Example: "posts/my-slug/image1.jpg"
  const bucket = "posts"; // <-- change if your bucket name differs
  const { data } = supabase.storage.from(bucket).getPublicUrl(maybeUrlOrPath);
  return data?.publicUrl || null;
};

const formatResources = (groups, links) => {
  // Build: { GroupName: [{label,url,external}, ...], ... }
  const byGroupId = new Map();
  (links || []).forEach((l) => {
    if (!byGroupId.has(l.group_id)) byGroupId.set(l.group_id, []);
    byGroupId.get(l.group_id).push({
      label: l.label,
      url: l.url,
      external: l.external ?? true,
      position: l.position ?? 1,
    });
  });

  // Sort links per group
  for (const arr of byGroupId.values()) {
    arr.sort((a, b) => (a.position ?? 1) - (b.position ?? 1));
  }

  const resources = {};
  (groups || [])
    .sort((a, b) => (a.position ?? 1) - (b.position ?? 1))
    .forEach((g) => {
      const name = g.name || "Resources";
      resources[name] = (byGroupId.get(g.id) || []).map(({ position, ...rest }) => rest);
    });

  return resources;
};

const normalizeArticle = ({ post, sections, images, resourceGroups, resourceLinks }) => {
  // sections -> article.content array with { text }
  const content = (sections || [])
    .sort((a, b) => (a.position ?? 1) - (b.position ?? 1))
    .map((s) => ({ text: s.body || "" }));

  // images -> separate by kind/position
  const sortedImages = (images || []).sort(
    (a, b) => (a.position ?? 1) - (b.position ?? 1)
  );

  const banner = sortedImages.find((i) => i.kind === "banner")?.storage_path || post.banner_url;

  // Inline/center images: your current renderer assumes:
  // - article.images[0..contentBlocks.length-1] align with blocks rendered (slice(1,-1) uses imgIndex=i)
  // - gallery images come after content length in the same array
  //
  // So we build:
  // images = inlineLike (for body blocks) + galleryLike (appended)
  const inlineLike = sortedImages
    .filter((i) => i.kind === "inline" || i.kind === "center")
    .map((i) => toPublicUrl(i.storage_path) || i.storage_path)
    .filter(Boolean);

  const galleryLike = sortedImages
    .filter((i) => i.kind === "gallery")
    .map((i) => toPublicUrl(i.storage_path) || i.storage_path)
    .filter(Boolean);

  // Pad inlineLike to at least content length so your indexing doesn’t break
  // (fallback will still handle missing entries)
  const imagesOut = [...inlineLike];

  // Ensure body indexing is consistent for contentBlocks.slice(1,-1)
  // Your renderer uses imgIndex = i (starting 0). It references article.images[imgIndex].
  // That means image 0 corresponds to the first middle block.
  // If you want image 0 to be the banner, DO NOT put it here; keep banner separate.
  //
  // Finally append gallery after content length:
  // "gallery images come after article content length in the images array"
  while (imagesOut.length < content.length) imagesOut.push(null);
  imagesOut.push(...galleryLike);

  const resources = formatResources(resourceGroups, resourceLinks);

  return {
    // match your current article props
    title: post.title || "",
    subtitle: post.subtitle || post.Subtitle || "",
    slug: post.slug,
    author: post.author || "Unknown",
    volume: post.volume || "VOLUME",
    date: post.date || post.published_at || post.created_at,
    excerpt: post.excerpt || "",
    banner: toPublicUrl(banner) || banner || null,
    archiveImage: toPublicUrl(post.archive_image_url) || post.archive_image_url || null,
    images: imagesOut,
    content,
    resources,
    status: post.status,
    is_published: post.is_published,
  };
};

export async function getAdminPostById(id) {
  const { data: post, error: postErr } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (postErr || !post) return { article: null, error: postErr || new Error("Not found") };

  const { data: sections, error: secErr } = await supabase
    .from("posts_sections")
    .select("*")
    .eq("post_id", post.id);

  if (secErr) return { article: null, error: secErr };

  const { data: images, error: imgErr } = await supabase
    .from("post_images")
    .select("*")
    .eq("post_id", post.id);

  if (imgErr) return { article: null, error: imgErr };

  const { data: groups, error: grpErr } = await supabase
    .from("resource_groups")
    .select("*")
    .eq("post_id", post.id);

  if (grpErr) return { article: null, error: grpErr };

  const groupIds = (groups || []).map((g) => g.id);

  const { data: links, error: lnkErr } = await supabase
    .from("resource_links")
    .select("*")
    .in("group_id", groupIds.length ? groupIds : [-1]);

  if (lnkErr) return { article: null, error: lnkErr };

  const article = normalizeArticle({
    post,
    sections,
    images,
    resourceGroups: groups,
    resourceLinks: links,
  });

  return { article, error: null };
}
