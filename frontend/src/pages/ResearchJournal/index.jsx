import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------
   HELPERS
------------------------------------------------- */

const arr = (xs) =>
  Array.isArray(xs) ? xs : [];

const getReleaseTime = (post) => {
  const raw =
    post?.published_at ||
    post?.date ||
    null;

  if (!raw) return 0;

  const time =
    new Date(raw).getTime();

  return Number.isNaN(time)
    ? 0
    : time;
};

const sortByReleaseDateDesc = (posts) =>
  [...posts].sort(
    (a, b) =>
      getReleaseTime(b) -
      getReleaseTime(a)
  );

/* -------------------------------------------------
   SUPABASE
------------------------------------------------- */

function getServerSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(url, anon, {
    auth: {
      persistSession: false,
    },
  });
}

const POSTS_BUCKET = "post-images";

function isHttpUrl(src = "") {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://")
  );
}

function resolveImageServer(
  supabase,
  bucket,
  src
) {
  const s = (src || "").trim();

  if (!s) return "";

  if (
    isHttpUrl(s) ||
    s.startsWith("/")
  ) {
    return s;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(s);

  return data?.publicUrl || "";
}

function publicBucketUrl(
  path,
  bucket
) {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url || !path) {
    return "";
  }

  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}

const HERO_FALLBACK = (() => {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  return url
    ? `${url}/storage/v1/object/public/public-images/Syria2.webp`
    : "/assets/images/space.webp";
})();

/* -------------------------------------------------
   TEXT ANIMATION
------------------------------------------------- */

export function useWordAnimatedText(
  text,
  baseDelay = 0.08,
  charClass = "type-char-title",
  startDelay = 0
) {
  return useMemo(() => {
    const tokens =
      text.split(/(\s+)/);

    let i = 0;

    return tokens.map(
      (tok, idx) => {
        if (/^\s+$/.test(tok)) {
          return (
            <span key={`sp-${idx}`}>
              {tok}
            </span>
          );
        }

        const chars = tok
          .split("")
          .map((ch) => {
            const k = `c-${i++}`;

            return (
              <span
                key={k}
                className={charClass}
                style={{
                  animationDelay:
                    `${startDelay + i * baseDelay}s`,
                }}
              >
                {ch}
              </span>
            );
          });

        return (
          <span
            key={`w-${idx}`}
            style={{
              display: "inline-block",
            }}
          >
            {chars}
          </span>
        );
      }
    );
  }, [
    text,
    baseDelay,
    charClass,
    startDelay,
  ]);
}

export function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0
) {
  return useMemo(() => {
    const tokens =
      text.split(/(\s+)/);

    let t = 0;

    return tokens.map(
      (tok, idx) => {
        if (/^\s+$/.test(tok)) {
          return (
            <span key={`sp-${idx}`}>
              {tok}
            </span>
          );
        }

        const chars = tok
          .split("")
          .map((ch, j) => {
            t += 1;

            return (
              <span
                key={`c-${idx}-${j}`}
                className={charClass}
                style={{
                  animationDelay:
                    `${startDelay + t * baseDelay}s`,
                }}
              >
                {ch}
              </span>
            );
          });

        return (
          <span
            key={`w-${idx}`}
            style={{
              display: "inline-block",
            }}
          >
            {chars}
          </span>
        );
      }
    );
  }, [
    text,
    baseDelay,
    charClass,
    startDelay,
  ]);
}

/* -------------------------------------------------
   DATE
------------------------------------------------- */

function formatJournalDate(input) {
  if (!input) return "";

  const raw = String(input);

  const d = new Date(
    raw.length === 10
      ? `${raw}T12:00:00`
      : raw
  );

  if (
    Number.isNaN(
      d.getTime()
    )
  ) {
    return "";
  }

  return d.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

/* -------------------------------------------------
   META
------------------------------------------------- */

function MetaRow({
  author,
  date,
}) {
  return (
    <div
      className="body-l checkmarks c-text"
      style={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        paddingLeft: 0,
        marginLeft: 0,
      }}
    >
      <small
        style={{
          fontSize: "0.9rem",
          color:
            "var(--c-text-secondary)",
          textTransform:
            "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {author}
      </small>

      <small
        style={{
          fontSize: "0.9rem",
          color:
            "var(--c-text-secondary)",
          textTransform:
            "uppercase",
          letterSpacing: 0.5,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden="true">
          ✵
        </span>

        <span
          style={{
            marginLeft: 6,
          }}
        >
          {formatJournalDate(
            date
          )}
        </span>
      </small>
    </div>
  );
}

function EmptyCard({
  isMain,
}) {
  return (
    <div
      style={{
        backgroundColor:
          "var(--c-bg-primary)",
        borderRadius: 12,
        padding: isMain
          ? 24
          : 16,
        boxShadow: isMain
          ? "0 10px 30px rgba(0,0,0,0.1)"
          : "0 8px 24px rgba(0,0,0,0.08)",
        width: "100%",
        minHeight: isMain
          ? 720
          : 260,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
          "var(--c-text-secondary)",
      }}
    >
      No posts yet.
    </div>
  );
}

/* -------------------------------------------------
   FEATURED POST CARD
------------------------------------------------- */

function AnimatedPostCard({
  post,
  index,
  isMain,
}) {
  const [visible, setVisible] =
    useState(false);

  const [hover, setHover] =
    useState(false);

  const router =
    useRouter();

  useEffect(() => {
    const timeout =
      setTimeout(() => {
        setVisible(true);
      }, index * 200);

    return () =>
      clearTimeout(timeout);
  }, [index]);

  if (!post) {
    return (
      <EmptyCard
        isMain={isMain}
      />
    );
  }

  const handleNav = () => {
    router.push(
      `/ResearchJournal/${post.slug}`
    );
  };

  const displayImg =
    post.banner ||
    post.image ||
    HERO_FALLBACK;

  return (
    <article
      onMouseEnter={() =>
        setHover(true)
      }
      onMouseLeave={() =>
        setHover(false)
      }
      onClick={handleNav}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();
          handleNav();
        }
      }}
      style={{
        opacity:
          visible ? 1 : 0,

        transform: visible
          ? hover
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateX(-30px)",

        transition:
          "opacity 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease",

        boxShadow: hover
          ? "0 12px 30px rgba(0,0,0,0.15)"
          : isMain
            ? "0 10px 30px rgba(0,0,0,0.1)"
            : "0 8px 24px rgba(0,0,0,0.08)",

        backgroundColor:
          "var(--c-bg-primary)",

        borderRadius: 12,

        padding: isMain
          ? 24
          : 16,

        display: isMain
          ? "flex"
          : "grid",

        flexDirection:
          isMain
            ? "column"
            : undefined,

        gap: isMain
          ? 24
          : 32,

        gridTemplateColumns:
          isMain
            ? undefined
            : "1fr 2fr",

        width: "100%",
        cursor: "pointer",
      }}
    >
      {isMain ? (
        <>
          <img
            src={displayImg}
            alt={
              post.title ||
              "Research article"
            }
            onError={(e) => {
              e.currentTarget.onerror =
                null;

              e.currentTarget.src =
                HERO_FALLBACK;
            }}
            style={{
              width: "100%",
              height: 600,
              objectFit: "cover",
              objectPosition:
                "center",
              borderRadius: 12,
              boxShadow:
                "0 8px 30px rgba(0,0,0,0.1)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              justifyContent:
                "space-between",
              flexGrow: 1,
              textAlign: "left",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize:
                    "2.5rem",
                  fontWeight: 900,
                  margin:
                    "0 0 8px 0",
                  color:
                    "var(--c-text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize:
                    "1.15rem",
                  lineHeight: 1.8,
                  color:
                    "var(--c-text-secondary)",
                  marginBottom: 8,
                  display:
                    "-webkit-box",
                  WebkitLineClamp:
                    4,
                  WebkitBoxOrient:
                    "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <MetaRow
              author={
                post.author
              }
              date={
                post.published_at ||
                post.date
              }
            />
          </div>
        </>
      ) : (
        <>
          <img
            src={displayImg}
            alt={
              post.title ||
              "Research article"
            }
            onError={(e) => {
              e.currentTarget.onerror =
                null;

              e.currentTarget.src =
                HERO_FALLBACK;
            }}
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              objectPosition:
                "center",
              borderRadius: 12,
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              justifyContent:
                "space-between",
              minHeight: 260,
              textAlign: "left",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin:
                    "10px 0 12px 0",
                  color:
                    "var(--c-text-primary)",
                  lineHeight: 1.25,
                  display:
                    "-webkit-box",
                  WebkitLineClamp:
                    2,
                  WebkitBoxOrient:
                    "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize:
                    "1.05rem",
                  lineHeight: 1.7,
                  color:
                    "var(--c-text-secondary)",
                  marginBottom: 12,
                  display:
                    "-webkit-box",
                  WebkitLineClamp:
                    3,
                  WebkitBoxOrient:
                    "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <MetaRow
              author={
                post.author
              }
              date={
                post.published_at ||
                post.date
              }
            />
          </div>
        </>
      )}
    </article>
  );
}

/* -------------------------------------------------
   PAGE
------------------------------------------------- */

export default function MidnightBureau({
  posts = [],
}) {
  const [animate, setAnimate] =
    useState(false);



useEffect(() => {
  setAnimate(true);
}, []);
  /*
    #1 = big card
    #2, #3, #4 = Recent Posts

    Everything else is intentionally
    left for the Archive page.
  */

  const sortedRecent =
    useMemo(
      () =>
        sortByReleaseDateDesc(
          arr(posts)
        ),
      [posts]
    );

  const mainPost =
    sortedRecent[0] ||
    null;

  const recentPosts =
    sortedRecent.slice(1, 4);

  const paragraphLines = [
    `This Research Journal is where I work through the ideas, questions, and events that stand out to me. From research on politics, culture, and current events, every post is written carefully by me, `,
    "Tobin Albanese",
    `, with the goal of sharing what I have learned while leaving room for deeper thought and honest discussion.`,
    `Whether you're here to learn something new, consider a different perspective, or simply read through ideas that interest you, take your time exploring the posts below. Each one reflects something I wanted to understand more clearly.`,
    `Stay curious, keep reading, and see where the questions lead.`,
  ];

  const titleLine1 =
    useWordAnimatedText(
      "Welcome to my",
      0.08,
      "type-char-title"
    );

  const titleLine2 =
    useWordAnimatedText(
      "Research Journal",
      0.08,
      "type-char-title"
    );

const heroImage =
  publicBucketUrl(
    "Syria2.webp",
    "public-images"
  ) ||
  HERO_FALLBACK;

  return (
    <>
      <meta charSet="utf-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <MetaHead />
      <SvgHead />

      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2" />
        </div>

        <div id="js-dfp-tag-outofpage--2" />

        <div className="base d-flex">
          <NavbarMB />

          <section
            className="c-bg"
            data-armstrong-id="wrapper"
          >
            {/* HERO */}

            <div
              className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
              data-armstrong-id="primary"
            >
              <div className="col-12">
                <div
                  className="row justify-between d-flex mb-hero-row"
                  data-armstrong-id="row"
                >
                  <div
                    className={`col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center ${
                      animate
                        ? "slide-in-left"
                        : ""
                    }`}
                    data-armstrong-id="personal-message"
                    style={{
                      position:
                        "relative",
                      isolation:
                        "isolate",
                      zIndex: 2,
                      paddingRight: 16,
                      minWidth: 0,
                    }}
                  >
                    <h1
                      className="heading-l mb-15"
                      style={{
                        fontFamily:
                          "inherit",
                        overflow:
                          "visible",
                        whiteSpace:
                          "pre-wrap",
                        color:
                          "var(--c-text)",
                      }}
                    >
                      <div>
                        {titleLine1}
                      </div>

                      <div>
                        {titleLine2}
                      </div>
                    </h1>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color:
                          "var(--c-text-secondary)",
                        marginBottom:
                          "1em",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[0],
                        0.01,
                        "type-char",
                        0
                      )}

                      <b>
                        <em>
                          {useWordSpanizedText(
                            paragraphLines[1],
                            0.01,
                            "type-char",
                            2.8
                          )}
                        </em>
                      </b>

                      {useWordSpanizedText(
                        paragraphLines[2],
                        0.01,
                        "type-char",
                        3
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color:
                          "var(--c-text-secondary)",
                        marginBottom:
                          "1em",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[3],
                        0.01,
                        "type-char",
                        3.6
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize: 18,
                        lineHeight: 1.6,
                        color:
                          "var(--c-text-secondary)",
                      }}
                    >
                      {useWordSpanizedText(
                        paragraphLines[4],
                        0.01,
                        "type-char",
                        5.7
                      )}
                    </p>
                  </div>

                  {/* Interactive desktop image remains */}
<div className="heat-canvas-wrapper mb-hero-media">
  <img
    src={heroImage}
    alt="Research Journal"
    loading="eager"
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      maxWidth: 800,
      aspectRatio: "1 / 1",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 12,
    }}
  />
</div>

                </div>
              </div>
            </div>

            <div
              style={{
                maxWidth: 1000,
                margin:
                  "40px auto",
                borderTop:
                  "4px solid #d62827",
              }}
            />

            <main
              style={{
                maxWidth: 1400,
                margin:
                  "40px auto",
                padding:
                  "0 24px",
              }}
            >
              {/* LATEST + RECENT */}

              <section
                id="briefing-recent"
                className="mb-briefing-recent"
                style={{
                  display: "flex",
                  gap: "48px",
                  marginBottom:
                    70,
                  alignItems:
                    "stretch",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display:
                      "flex",
                    flexDirection:
                      "column",
                  }}
                >
                  <h2
                    style={{
                      fontSize:
                        "2.75rem",
                      fontWeight:
                        800,
                      marginBottom:
                        24,
                      color:
                        "var(--c-text-primary)",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        1,
                      borderLeft:
                        "5px solid #d62827",
                      paddingLeft:
                        16,
                    }}
                  >
                    Latest Briefing
                  </h2>

                  <div className="latest-briefing-wrapper">
                    <AnimatedPostCard
                      post={
                        mainPost
                      }
                      index={0}
                      isMain
                    />
                  </div>
                </div>

                <div
                  id="recent-posts"
                  className="mb-recent-col"
                  style={{
                    flex: 1,
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "32px",
                  }}
                >
                  <h2
                    style={{
                      fontSize:
                        "2.75rem",
                      fontWeight:
                        800,
                      marginBottom:
                        24,
                      color:
                        "var(--c-text-primary)",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        1,
                      borderLeft:
                        "5px solid #d62827",
                      paddingLeft:
                        16,
                    }}
                  >
                    Recent Posts
                  </h2>

                  {recentPosts.length ===
                  0 ? (
                    <EmptyCard
                      isMain={
                        false
                      }
                    />
                  ) : (
                    recentPosts.map(
                      (
                        post,
                        i
                      ) => (
                        <AnimatedPostCard
                          key={
                            post.slug
                          }
                          post={
                            post
                          }
                          index={
                            i + 1
                          }
                          isMain={
                            false
                          }
                        />
                      )
                    )
                  )}
                </div>
              </section>

              {/* ARCHIVE CTA */}

              <div
                style={{
                  maxWidth:
                    1000,
                  margin:
                    "80px auto 38px",
                  borderTop:
                    "4px solid #d62827",
                }}
              />

              <section
                style={{
                  maxWidth:
                    900,
                  margin:
                    "0 auto 100px",
                  textAlign:
                    "center",
                }}
              >
                <h2
                  style={{
                    fontSize:
                      "2.4rem",
                    fontWeight:
                      800,
                    color:
                      "var(--c-text-primary)",
                    marginBottom:
                      14,
                  }}
                >
                  Continue Through
                  My Archive
                </h2>

                <p
                  className="c-text-secondary"
                  style={{
                    fontSize:
                      "1.05rem",
                    lineHeight:
                      1.7,
                    maxWidth:
                      850,
                    margin:
                      "0 auto 28px",
                  }}
                >
                  Browse the complete
                  collection of my published
                  research, analysis, and
                  academic writing in
                  chronological order.
                </p>

                <Link
                  href="/ResearchJournal/Archive"
                  style={{
                    display:
                      "inline-block",
                    backgroundColor:
                      "#d62827",
                    color: "#fff",
                    padding:
                      "13px 26px",
                    borderRadius: 4,
                    fontWeight: 700,
                    fontSize:
                      "1rem",
                    textDecoration:
                      "none",
                  }}
                >
                  Explore Research Archive
                  →
                </Link>
              </section>
            </main>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------
   SSR
------------------------------------------------- */

export async function getServerSideProps() {
  const supabase =
    getServerSupabase();

  const { data, error } =
    await supabase
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
          banner_url,
          archive_image_url,
          author,
          date,
          category,
          created_at
        `
      )
      .eq("type", "mb")
      .eq(
        "is_published",
        true
      )
      .not(
        "published_at",
        "is",
        null
      )
      .order(
        "published_at",
        {
          ascending:
            false,
        }
      );

  if (error) {
    console.log(
      "MidnightBureau SSR posts error:",
      error
    );

    return {
      props: {
        posts: [],
      },
    };
  }

  const safe =
    Array.isArray(data)
      ? data
      : [];

  const postIds = safe
    .map((p) => p.id)
    .filter(Boolean);

  let inlineImageMap = {};

  if (
    postIds.length > 0
  ) {
    const {
      data: imageRows,
      error: imageErr,
    } = await supabase
      .from("post_images")
      .select(
        "id, post_id, kind, storage_path, position"
      )
      .in(
        "post_id",
        postIds
      )
      .eq(
        "kind",
        "inline"
      )
      .order("position", {
        ascending: true,
      });

    if (imageErr) {
      console.log(
        "MidnightBureau SSR post_images error:",
        imageErr
      );
    } else {
      for (
        const row of
        imageRows || []
      ) {
        if (
          !row?.post_id ||
          !row?.storage_path
        ) {
          continue;
        }

        if (
          !inlineImageMap[
            row.post_id
          ]
        ) {
          inlineImageMap[
            row.post_id
          ] =
            row.storage_path;
        }
      }
    }
  }

  const normalized =
    safe
      .filter(
        (p) => p?.slug
      )
      .map((p) => {
        const rawBanner =
          (
            p.banner_url ||
            ""
          ).trim();

        const rawArchive =
          (
            p.archive_image_url ||
            ""
          ).trim();

        const rawFirstInline =
          (
            inlineImageMap[
              p.id
            ] || ""
          ).trim();

        const resolvedBanner =
          resolveImageServer(
            supabase,
            POSTS_BUCKET,
            rawBanner
          ) || "";

        const resolvedArchive =
          resolveImageServer(
            supabase,
            POSTS_BUCKET,
            rawArchive
          ) || "";

        const resolvedFirstInline =
          resolveImageServer(
            supabase,
            POSTS_BUCKET,
            rawFirstInline
          ) || "";

        return {
          id: p.id,

          slug:
            p.slug,

          title:
            p.title ||
            "Untitled",

          excerpt:
            p.excerpt ||
            "",

          author:
            p.author ||
            "Tobin Albanese",

          category:
            p.category ||
            "",

          published_at:
            p.published_at ||
            null,

          date:
            p.published_at ||
            p.date ||
            null,

          banner:
            resolvedBanner ||
            resolvedFirstInline ||
            resolvedArchive ||
            HERO_FALLBACK,

          image:
            resolvedArchive ||
            resolvedFirstInline ||
            resolvedBanner ||
            HERO_FALLBACK,
        };
      });

  normalized.sort(
    (a, b) =>
      getReleaseTime(b) -
      getReleaseTime(a)
  );

  return {
    props: {
      posts:
        normalized,
    },
  };
}