import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const hrefFor = (p) => `/Portfolio/${p.slug}`;

const firstTruthy = (...xs) => xs.find(Boolean);

const pickProjectImg = (p) =>
  firstTruthy(
    p?.banner_url,
    p?.banner,
    p?.displayImage,
    p?.archive_image_url,
    p?.archiveImage,
    p?.image_url,
    "/assets/images/space.webp"
  );

const uniqBySlug = (list) => {
  const seen = new Set();

  return (list || []).filter((p) => {
    if (!p?.slug || seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
};

export default function FeaturedProjects() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        setLoading(true);
        setFailed(false);

        const res = await fetch("/api/portfolio/featured-projects", {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();

        if (!active) return;

        const incoming = Array.isArray(data?.featured) ? data.featured : [];

        setFeatured(uniqBySlug(incoming));
      } catch (e) {
        console.error("FeaturedProjects fetch failed:", e);

        if (!active) return;

        setFeatured([]);
        setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const { primary, side, primaryImg, sideImages } = useMemo(() => {
    const primary = featured[0] || null;
    const primaryImg = primary ? pickProjectImg(primary) : null;

    const side = featured.slice(1, 4);

    const sideImages = side.reduce((acc, project) => {
      acc[project.slug] = pickProjectImg(project);
      return acc;
    }, {});

    return {
      primary,
      side,
      primaryImg,
      sideImages,
    };
  }, [featured]);

  return (
    <section
      className="theme-accent"
      data-armstrong-id="wrapper"
      id="featured-projects"
    >
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-10 pt-md-25 pt-lg-40"
        data-armstrong-id="primary"
      >
        <div className="col-12">
          <h3 className="font-style-italic c-accent mt-15 mb-15">
            Featured Projects
          </h3>

          <h3
            className="fs-18 mb-15 mb-25 fs-md-16"
            data-armstrong-id="module_subtitle"
          >
            A collection of my favorite projects, handpicked to showcase the
            breadth and depth of my work.
          </h3>

          {loading ? (
            <div className="body-s c-text-secondary">
              Loading featured projects…
            </div>
          ) : failed ? (
            <div className="body-s c-text-secondary">
              Couldn’t load featured projects from Supabase.
            </div>
          ) : !primary ? (
            <div className="body-s c-text-secondary">
              No featured projects yet.
            </div>
          ) : (
            <div className="row justify-between d-flex" data-armstrong-id="row">
              {/* Left: large NAOMI card */}
              <div
                className="col-12 col-md-6 mb-10"
                data-armstrong-id="grid_1"
              >
                <div className="col-12 ml-0 mr-0">
                  <Link href={hrefFor(primary)}>
                    <figure style={{ margin: 0 }}>
                      <img
                        src={primaryImg || "/assets/images/space.webp"}
                        alt={primary.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/images/space.webp";
                        }}
                        sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 620px"
                        style={{
                          width: "100%",
                          height: 300,
                          borderRadius: 8,
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </figure>
                  </Link>
                </div>

                <div className="col-12 ml-0 mr-0">
                  <h2 className="heading-m mt-20">
                    <Link href={hrefFor(primary)}>{primary.title}</Link>
                  </h2>

                  <h3 className="body-l c-text-secondary mt-5">
                    <Link href={hrefFor(primary)}>{primary.excerpt}</Link>
                  </h3>

                  <div className="body-s mt-10" />
                </div>
              </div>

              {/* Right: SIGNALIS, Reentry Wage, Human Source */}
              <div
                className="col-12 col-md-5 mt-30 mt-md-0"
                data-armstrong-id="grid_2"
              >
                {side.map((p, i) => {
                  const img = sideImages[p.slug] || "/assets/images/space.webp";

                  return (
                    <div
                      key={p.slug}
                      className={
                        "card row card--large justify-between col-12 ml-0 mr-0 pb-15 border-bottom border-bottom-thin c-border " +
                        (i === 0 ? "border-top border-top-thin pt-20" : "")
                      }
                      style={{
                        alignItems: "flex-start",
                        marginBottom: 14,
                        position: "relative",
                      }}
                    >
                      <Link
                        href={hrefFor(p)}
                        aria-label={`Open: ${p.title}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 1,
                          borderRadius: 6,
                        }}
                      />

                      <div
                        className="col-9 col-md-8 d-flex flex-column"
                        style={{ justifyContent: "flex-start" }}
                      >
                        <h3 className="body-m" style={{ marginBottom: 6 }}>
                          {p.title}
                        </h3>

                        <p
                          className="body-s c-text-secondary"
                          style={{ marginBottom: 10 }}
                        >
                          {p.excerpt || "Read the full project."}
                        </p>
                      </div>

                      <div
                        className="col-3 col-md-4 d-flex"
                        style={{
                          alignItems: "flex-start",
                          justifyContent: "center",
                          paddingTop: 0,
                        }}
                      >
                        <img
                          src={img}
                          alt={p.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/assets/images/space.webp";
                          }}
                          style={{
                            width: "100%",
                            maxWidth: 220,
                            aspectRatio: "4 / 3",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: 6,
                            display: "block",
                            margin: 0,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}