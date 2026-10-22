// pages/ResearchJournal/Archive.jsx

import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

import Link from "next/link";

import {
  createClient,
} from "@supabase/supabase-js";

import MetaHead from "../../components/LandingPage/MetaHead";
import SvgHead from "../../components/LandingPage/svgHead";
import Footer from "../../components/LandingPage/Footer";
import NavbarMB from "../../components/LandingPage/NavbarMB";

/* -------------------------------------------------
   SETTINGS
------------------------------------------------- */

const POSTS_BUCKET =
  "post-images";

const PUBLIC_BUCKET =
  "public-images";

const PAGE_SIZE = 8;

/* -------------------------------------------------
   SUPABASE
------------------------------------------------- */

function getServerSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(
    url,
    anon,
    {
      auth: {
        persistSession:
          false,
      },
    }
  );
}

/* -------------------------------------------------
   STORAGE HELPERS
------------------------------------------------- */

function isHttpUrl(
  src = ""
) {
  return (
    src.startsWith(
      "http://"
    ) ||
    src.startsWith(
      "https://"
    )
  );
}

function resolveImageServer(
  supabase,
  bucket,
  src
) {
  const s =
    (src || "").trim();

  if (!s) return "";

  if (
    isHttpUrl(s) ||
    s.startsWith("/")
  ) {
    return s;
  }

  const { data } =
    supabase.storage
      .from(bucket)
      .getPublicUrl(s);

  return (
    data?.publicUrl ||
    ""
  );
}

function publicBucketUrl(
  path,
  bucket = PUBLIC_BUCKET
) {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (
    !url ||
    !path
  ) {
    return "";
  }

  return `${url}/storage/v1/object/public/${bucket}/${String(
    path
  ).replace(/^\/+/, "")}`;
}

const sbPublic = (
  path
) =>
  path
    ? publicBucketUrl(
        String(
          path
        ).replace(
          /^\/+/,
          ""
        ),
        PUBLIC_BUCKET
      )
    : "";

function toPublicImageUrl(
  src
) {
  if (!src) {
    return "";
  }

  const s =
    String(src).trim();

  if (!s) {
    return "";
  }

  if (
    /^https?:\/\//i.test(
      s
    )
  ) {
    return s;
  }

  const match =
    s.match(
      /^\/assets\/images\/(.+)$/i
    );

  if (
    match?.[1]
  ) {
    return sbPublic(
      match[1]
    );
  }

  if (
    s.startsWith("/")
  ) {
    return s;
  }

  return sbPublic(s);
}

/* -------------------------------------------------
   ARCHIVE HERO IMAGE

   Change Museum.webp here whenever you
   want a different Archive hero image.
------------------------------------------------- */

const ARCHIVE_HERO_IMAGE =
  publicBucketUrl(
    "G7.webp",
    PUBLIC_BUCKET
  ) ||
  "/assets/images/space.webp";

/* -------------------------------------------------
   TEXT ANIMATION
------------------------------------------------- */

function useWordAnimatedText(
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
        if (
          /^\s+$/.test(tok)
        ) {
          return (
            <span
              key={`sp-${idx}`}
            >
              {tok}
            </span>
          );
        }

        const chars = tok
          .split("")
          .map((ch) => {
            const key =
              `c-${i++}`;

            return (
              <span
                key={key}
                className={
                  charClass
                }
                style={{
                  animationDelay:
                    `${
                      startDelay +
                      i *
                        baseDelay
                    }s`,
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
              display:
                "inline-block",
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

function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0
) {
  return useMemo(() => {
    const tokens =
      text.split(/(\s+)/);

    let count = 0;

    return tokens.map(
      (tok, idx) => {
        if (
          /^\s+$/.test(tok)
        ) {
          return (
            <span
              key={`sp-${idx}`}
            >
              {tok}
            </span>
          );
        }

        const chars = tok
          .split("")
          .map(
            (
              ch,
              charIndex
            ) => {
              count += 1;

              return (
                <span
                  key={`c-${idx}-${charIndex}`}
                  className={
                    charClass
                  }
                  style={{
                    animationDelay:
                      `${
                        startDelay +
                        count *
                          baseDelay
                      }s`,
                  }}
                >
                  {ch}
                </span>
              );
            }
          );

        return (
          <span
            key={`w-${idx}`}
            style={{
              display:
                "inline-block",
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
   POST HELPERS
------------------------------------------------- */

function getReleaseTime(
  post
) {
  const raw =
    post?.published_at ||
    post?.date ||
    null;

  if (!raw) {
    return 0;
  }

  const time =
    new Date(
      raw
    ).getTime();

  return Number.isNaN(
    time
  )
    ? 0
    : time;
}

function formatDate(
  input
) {
  if (!input) {
    return "";
  }

  const raw =
    String(input);

  const date =
    new Date(
      raw.length === 10
        ? `${raw}T12:00:00`
        : raw
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function getExcerpt(
  post
) {
  const text =
    String(
      post?.excerpt ||
        ""
    ).trim();

  if (!text) {
    return "Read the full research and analysis.";
  }

  if (
    text.length <=
    260
  ) {
    return text;
  }

  return `${text
    .slice(
      0,
      257
    )
    .trim()}...`;
}

function pickImgCandidates(
  post
) {
  const raw = [
    post?.archive_image_url,
    post?.archiveImage,
    post?.image,
    post?.imageUrl,
    post?.banner,
    post?.banner_url,
    "/assets/images/space.webp",
  ];

  const seen =
    new Set();

  return raw
    .map(
      toPublicImageUrl
    )
    .filter(Boolean)
    .filter((src) => {
      if (
        seen.has(src)
      ) {
        return false;
      }

      seen.add(src);

      return true;
    });
}

function handleArchiveImageError(
  event
) {
  const img =
    event.currentTarget;

  const candidates =
    String(
      img.dataset
        .imageCandidates ||
        ""
    )
      .split("\n")
      .filter(Boolean);

  const currentIndex =
    Number(
      img.dataset
        .imageIndex ||
        0
    );

  const nextIndex =
    currentIndex + 1;

  if (
    nextIndex <
    candidates.length
  ) {
    img.dataset.imageIndex =
      String(
        nextIndex
      );

    img.src =
      candidates[
        nextIndex
      ];

    return;
  }

  img.onerror = null;

  img.src =
    "/assets/images/space.webp";
}

/* -------------------------------------------------
   ARCHIVE CARD
------------------------------------------------- */

function ArchivePostCard({
  post,
  index,
}) {
  const imageCandidates =
    pickImgCandidates(
      post
    );

  const imageSrc =
    imageCandidates[0] ||
    "/assets/images/space.webp";

  return (
    <article
      className={
        "card row card--large justify-between col-12 ml-0 mr-0 pb-20 border-bottom border-bottom-thin c-border " +
        (
          index === 0
            ? "border-top border-top-thin pt-20"
            : "pt-20"
        )
      }
      style={{
        alignItems:
          "flex-start",
        position:
          "relative",
        marginBottom: 0,
      }}
    >
      {/* Entire card is clickable */}

      <Link
        href={`/ResearchJournal/${post.slug}`}
        aria-label={`Open: ${post.title}`}
        style={{
          position:
            "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: 6,
        }}
      />

      {/* TEXT */}

      <div
        className="col-9 col-md-8 d-flex flex-column"
        style={{
          minWidth: 0,
          justifyContent:
            "flex-start",
          paddingRight: 24,
        }}
      >
        <h3
          className="body-m"
          style={{
            fontSize:
              "1.55rem",
            lineHeight:
              1.25,
            fontWeight: 500,
            marginBottom: 8,
            textTransform:
              "none",
            color:
              "var(--c-text-primary)",
          }}
        >
          {post.title ||
            "Untitled"}
        </h3>

        <p
          className="body-s c-text-secondary"
          style={{
            fontSize:
              "1.02rem",
            lineHeight: 1.6,
            marginBottom: 14,
            display:
              "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient:
              "vertical",
            overflow:
              "hidden",
          }}
        >
          {getExcerpt(
            post
          )}
        </p>

        <p
          className="body-s c-accent"
          style={{
            fontSize:
              "0.9rem",
            marginTop:
              "auto",
            marginBottom: 0,
            display: "flex",
            alignItems:
              "center",
            gap: 9,
            flexWrap:
              "wrap",
          }}
        >
          <span>
            {post.author ||
              "Tobin Albanese"}
          </span>

          <span
            aria-hidden="true"
          >
            ✵
          </span>

          <time>
            {formatDate(
              post.published_at ||
                post.date
            )}
          </time>

          {post.category && (
            <>
              <span
                aria-hidden="true"
              >
                ✵
              </span>

              <span>
                {
                  post.category
                }
              </span>
            </>
          )}
        </p>
      </div>

      {/* IMAGE */}

      <div
        className="col-3 col-md-4 d-flex"
        style={{
          alignItems:
            "flex-start",
          justifyContent:
            "center",
        }}
      >
        <img
          src={
            imageSrc
          }
          data-image-candidates={
            imageCandidates.join(
              "\n"
            )
          }
          data-image-index="0"
          alt={
            post.title ||
            "Research article"
          }
          loading="lazy"
          onError={
            handleArchiveImageError
          }
          style={{
            width: "100%",
            maxWidth: 300,
            aspectRatio:
              "16 / 10",
            objectFit:
              "cover",
            objectPosition:
              "center",
            borderRadius: 6,
            display: "block",
            margin: 0,
          }}
        />
      </div>
    </article>
  );
}

/* -------------------------------------------------
   PAGE
------------------------------------------------- */

export default function Archive({
  posts = [],
}) {
  const [
    animate,
    setAnimate,
  ] = useState(false);

  const sentinelRef =
    useRef(null);

  /* Hero entrance */

  useEffect(() => {
    setAnimate(true);
  }, []);

  /* Chronological posts */

  const sortedPosts =
    useMemo(() => {
      const seen =
        new Set();

      return [
        ...posts,
      ]
        .filter(
          (post) =>
            post?.slug &&
            post?.title
        )
        .filter(
          (post) => {
            if (
              seen.has(
                post.slug
              )
            ) {
              return false;
            }

            seen.add(
              post.slug
            );

            return true;
          }
        )
        .sort(
          (a, b) =>
            getReleaseTime(
              b
            ) -
            getReleaseTime(
              a
            )
        );
    }, [posts]);

  /* Infinite scroll */

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(
    PAGE_SIZE
  );

  const visiblePosts =
    useMemo(
      () =>
        sortedPosts.slice(
          0,
          visibleCount
        ),
      [
        sortedPosts,
        visibleCount,
      ]
    );

  useEffect(() => {
    setVisibleCount(
      PAGE_SIZE
    );
  }, [
    sortedPosts.length,
  ]);

  useEffect(() => {
    const node =
      sentinelRef.current;

    if (!node) {
      return;
    }

    if (
      visibleCount >=
      sortedPosts.length
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0];

          if (
            !entry
              ?.isIntersecting
          ) {
            return;
          }

          setVisibleCount(
            (
              previous
            ) =>
              Math.min(
                previous +
                  PAGE_SIZE,
                sortedPosts.length
              )
          );
        },
        {
          rootMargin:
            "300px 0px",
        }
      );

    observer.observe(
      node
    );

    return () =>
      observer.disconnect();
  }, [
    visibleCount,
    sortedPosts.length,
  ]);

  /* -------------------------------------------------
     HERO COPY
  ------------------------------------------------- */

  const archiveParagraphs = [
    `This archive brings together my published research, analysis, and academic writing in one continuous collection.`,
    `Each entry reflects a different stage of my research and writing, from shorter analytical pieces to larger academic projects and long-form studies.`,
    `The collection is organized by publication date, beginning with my most recent work and moving backward through earlier research.`,
  ];

  const titleLine1 =
    useWordAnimatedText(
      "Welcome to my",
      0.08,
      "type-char-title"
    );

  const titleLine2 =
    useWordAnimatedText(
      "Research Archive",
      0.08,
      "type-char-title"
    );

  return (
    <>
      <meta
        charSet="utf-8"
      />

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
            style={{
              width: "100%",
            }}
          >
            {/* -----------------------------------------
                ARCHIVE HERO
            ----------------------------------------- */}

            <div
              className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
              data-armstrong-id="primary"
            >
              <div className="col-12">
                <div
                  className="row justify-between d-flex mb-hero-row"
                  data-armstrong-id="row"
                >
                  {/* HERO TEXT */}

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
                      paddingRight:
                        16,
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
                        {
                          titleLine1
                        }
                      </div>

                      <div>
                        {
                          titleLine2
                        }
                      </div>
                    </h1>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.6,
                        color:
                          "var(--c-text-secondary)",
                        fontFamily:
                          "inherit",
                        whiteSpace:
                          "normal",
                        marginBottom:
                          "1em",
                        wordBreak:
                          "normal",
                        overflowWrap:
                          "normal",
                        hyphens:
                          "none",
                      }}
                    >
                      {useWordSpanizedText(
                        archiveParagraphs[0],
                        0.01,
                        "type-char",
                        0
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.6,
                        color:
                          "var(--c-text-secondary)",
                        fontFamily:
                          "inherit",
                        whiteSpace:
                          "normal",
                        marginBottom:
                          "1em",
                        wordBreak:
                          "normal",
                        overflowWrap:
                          "normal",
                        hyphens:
                          "none",
                      }}
                    >
                      {useWordSpanizedText(
                        archiveParagraphs[1],
                        0.01,
                        "type-char",
                        1.4
                      )}
                    </p>

                    <p
                      className="body-m"
                      style={{
                        fontSize:
                          18,
                        lineHeight:
                          1.6,
                        color:
                          "var(--c-text-secondary)",
                        fontFamily:
                          "inherit",
                        whiteSpace:
                          "normal",
                        wordBreak:
                          "normal",
                        overflowWrap:
                          "normal",
                        hyphens:
                          "none",
                      }}
                    >
                      {useWordSpanizedText(
                        archiveParagraphs[2],
                        0.01,
                        "type-char",
                        3
                      )}
                    </p>
                  </div>

                  {/* STATIC HERO IMAGE */}

                  <div className="heat-canvas-wrapper mb-hero-media">
                    <img
                      src={
                        ARCHIVE_HERO_IMAGE
                      }
                      alt="Research Archive"
                      loading="eager"
                      style={{
                        display:
                          "block",
                        width:
                          "100%",
                        height:
                          "100%",
                        maxWidth:
                          800,
                        aspectRatio:
                          "1 / 1",
                        objectFit:
                          "cover",
                        objectPosition:
                          "center",
                        borderRadius:
                          12,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------
                DIVIDER
            ----------------------------------------- */}

            <div
              style={{
                maxWidth:
                  1000,
                margin:
                  "40px auto",
                borderTop:
                  "4px solid #d62827",
              }}
            />

            {/* -----------------------------------------
                ARCHIVE FEED
            ----------------------------------------- */}

            <main
              id="archive-content"
              style={{
                maxWidth:
                  1120,
                margin:
                  "0 auto 100px",
                padding:
                  "0 24px",
              }}
            >
              <div
                style={{
                  marginBottom:
                    28,
                }}
              >
                <h2
                  style={{
                    fontSize:
                      "2.75rem",
                    fontWeight:
                      800,
                    margin:
                      "0 0 10px 0",
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
                  Published Work
                </h2>

                <p
                  className="c-text-secondary"
                  style={{
                    fontSize:
                      "1.05rem",
                    lineHeight:
                      1.6,
                    margin: 0,
                    paddingLeft:
                      21,
                  }}
                >
                  Research,
                  analysis, and
                  academic writing
                  organized from
                  newest to earliest
                  by publication
                  date.
                </p>
              </div>

              {visiblePosts.length ===
              0 ? (
                <div
                  className="body-s c-text-secondary"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "50px 0",
                  }}
                >
                  No published
                  research found.
                </div>
              ) : (
                visiblePosts.map(
                  (
                    post,
                    index
                  ) => (
                    <ArchivePostCard
                      key={
                        post.slug
                      }
                      post={
                        post
                      }
                      index={
                        index
                      }
                    />
                  )
                )
              )}

              {/* Infinite scroll trigger */}

              <div
                ref={
                  sentinelRef
                }
                aria-hidden="true"
                style={{
                  height: 1,
                }}
              />

              {/* Loading */}

              {visibleCount <
                sortedPosts.length && (
                <div
                  className="body-s c-text-secondary"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "24px 0 16px",
                  }}
                >
                  Loading more
                  research...
                </div>
              )}

              {/* End */}

              {sortedPosts.length >
                0 &&
                visibleCount >=
                  sortedPosts.length && (
                  <div
                    className="body-s c-text-secondary"
                    style={{
                      textAlign:
                        "center",
                      paddingTop:
                        36,
                      opacity:
                        0.65,
                    }}
                  >
                    End of archive.
                  </div>
                )}
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

  const {
    data,
    error,
  } =
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
          created_at,
          banner_url,
          archive_image_url,
          author,
          date,
          category
        `
      )
      .eq(
        "type",
        "mb"
      )
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
          nullsFirst:
            false,
        }
      );

  if (error) {
    console.log(
      "Archive SSR posts error:",
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

  const postIds =
    safe
      .map(
        (post) =>
          post.id
      )
      .filter(Boolean);

  let inlineImageMap =
    {};

  if (
    postIds.length > 0
  ) {
    const {
      data: imageRows,
      error: imageErr,
    } =
      await supabase
        .from(
          "post_images"
        )
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
        .order(
          "position",
          {
            ascending:
              true,
          }
        );

    if (imageErr) {
      console.log(
        "Archive SSR post_images error:",
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
        (post) =>
          post?.slug
      )
      .map(
        (post) => {
          const rawBanner =
            (
              post.banner_url ||
              ""
            ).trim();

          const rawArchive =
            (
              post.archive_image_url ||
              ""
            ).trim();

          const rawFirstInline =
            (
              inlineImageMap[
                post.id
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
            id:
              post.id,

            slug:
              post.slug,

            title:
              post.title ||
              "Untitled",

            excerpt:
              post.excerpt ||
              "",

            author:
              post.author ||
              "Tobin Albanese",

            category:
              post.category ||
              "",

            published_at:
              post.published_at ||
              null,

            created_at:
              post.created_at ||
              null,

            date:
              post.published_at ||
              post.date ||
              null,

            banner:
              resolvedBanner ||
              resolvedFirstInline ||
              resolvedArchive ||
              "",

            image:
              resolvedArchive ||
              resolvedFirstInline ||
              resolvedBanner ||
              publicBucketUrl(
                "space.webp",
                PUBLIC_BUCKET
              ) ||
              "/assets/images/space.webp",

            archive_image_url:
              resolvedArchive ||
              "",

            banner_url:
              resolvedBanner ||
              "",
          };
        }
      );

  normalized.sort(
    (a, b) =>
      getReleaseTime(
        b
      ) -
      getReleaseTime(
        a
      )
  );

  return {
    props: {
      posts:
        normalized,
    },
  };
}