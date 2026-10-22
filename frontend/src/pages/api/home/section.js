import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

const VALID_SECTIONS = new Set([
  "current-work",
  "research-highlights",
  "featured-projects",
  "additional-research",
]);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);

    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { section } = req.query;

  if (!section || !VALID_SECTIONS.has(section)) {
    return res.status(400).json({
      error: "Invalid homepage section",
    });
  }

  try {
    // First get the exact homepage ordering.
    const {
      data: mappings,
      error: mappingError,
    } = await supabase
      .from("homepage_cards")
      .select("post_id, position")
      .eq("section_key", section)
      .eq("is_active", true)
      .order("position", {
        ascending: true,
      });

    if (mappingError) {
      throw mappingError;
    }

    if (!mappings?.length) {
      return res.status(200).json({
        items: [],
      });
    }

    const postIds = mappings.map(
      (item) => item.post_id
    );

    // Fetch the corresponding posts.
    const {
      data: posts,
      error: postsError,
    } = await supabase
      .from("posts")
      .select(`
        id,
        type,
        title,
        slug,
        excerpt,
        author,
        date,
        published_at,
        created_at,
        banner_url,
        archive_image_url,
        category,
        "Subtitle"
      `)
      .in("id", postIds);

    if (postsError) {
      throw postsError;
    }

    const postMap = new Map(
      (posts || []).map((post) => [
        post.id,
        post,
      ])
    );

    // Restore the homepage_cards position order.
    const items = mappings
      .map((mapping) => {
        const post = postMap.get(
          mapping.post_id
        );

        if (!post) return null;

        return {
          ...post,
          position: mapping.position,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      section,
      items,
    });
  } catch (error) {
    console.error(
      "Homepage section fetch failed:",
      error
    );

    return res.status(500).json({
      error: "Could not load homepage section",
    });
  }
}