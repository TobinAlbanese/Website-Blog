// components/FeaturedProjects.jsx
import React from "react";
import Link from "next/link";
import PortfolioData from "../../data/portfolioData.js";

const section = (name) =>
  Array.isArray(PortfolioData?.[name]) ? PortfolioData[name] : [];

const uniqBySlug = (list) => {
  const seen = new Set();
  return (list || []).filter(
    (p) => p?.slug && !seen.has(p.slug) && seen.add(p.slug)
  );
};

const hrefFor = (p) => `/Portfolio/${p.slug}`;

// ------ Image picking helpers (unique per slot & post) ------
const firstTruthy = (...xs) => xs.find(Boolean);

const pickPrimaryImg = (p) =>
  firstTruthy(
    p?.banner,
    p?.cardImage,
    p?.images?.[0],
    p?.archiveImage,
    "/assets/images/space.jpg"
  );

const pickSideImg = (p, slotIndex, usedUrls) => {
  const imgs = Array.isArray(p?.images) ? p.images.filter(Boolean) : [];

  // Try a few stable, slot-specific candidates per post, then fallbacks
  const candidates = [
    p?.cardThumb,
    imgs[slotIndex + 1], // prefer a different frame than primary
    imgs[(slotIndex * 2 + 1) % (imgs.length || 1)],
    imgs[0],
    p?.banner,
    p?.archiveImage,
    "/assets/images/space.jpg",
  ].filter(Boolean);

  let choice = candidates.find((u) => !usedUrls.has(u)) || candidates[0];
  usedUrls.add(choice);
  return choice;
};

export default function FeaturedProjects() {
  const featured = uniqBySlug(section("Featured / Spotlight Projects"));
  const cs = uniqBySlug(section("Computer Science Projects"));

  const primary = featured[0] || cs[0] || null;

  const usedUrls = new Set();
  const primaryImg = primary ? pickPrimaryImg(primary) : null;
  if (primaryImg) usedUrls.add(primaryImg);

  const side = [];
  if (primary) {
    const usedSlugs = new Set([primary.slug]);
    for (let i = 1; i < featured.length && side.length < 4; i++) {
      const p = featured[i];
      if (!usedSlugs.has(p.slug)) {
        side.push(p);
        usedSlugs.add(p.slug);
      }
    }
    for (let i = 0; i < cs.length && side.length < 4; i++) {
      const p = cs[i];
      if (!usedSlugs.has(p.slug)) {
        side.push(p);
        usedSlugs.add(p.slug);
      }
    }
  }

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
            From idea to production: apps & UIs.
          </h3>

          {/* If no content yet, keep the anchor visible */}
          {!primary ? (
            <div className="body-s c-text-secondary">
              No featured projects yet.
            </div>
          ) : (
            <div className="row justify-between d-flex" data-armstrong-id="row">
              {/* Left: Primary feature */}
              <div className="col-12 col-md-6 mb-10" data-armstrong-id="grid_1">
                <div className="col-12 ml-0 mr-0">
                  <Link href={hrefFor(primary)}>
                    <figure style={{ margin: 0 }}>
                      <img
                        src={primaryImg}
                        alt={primary.title}
                        loading="lazy"
                        sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 620px"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8,
                          objectFit: "cover",
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

              {/* Right: 4 compact cards */}
              <div
                className="col-12 col-md-5 mt-30 mt-md-0 items-start"
                data-armstrong-id="grid_2"
              >
                {side.slice(0, 4).map((p, i) => {
                  const img = pickSideImg(p, i, usedUrls);
                  return (
                    <div
                      key={p.slug}
                      className={
                        "card items-start row card--medium justify-between border-bottom border-bottom-thin c-border mb-20 ml-0 mr-0 " +
                        (i === 0 ? "border-top border-top-thin pt-20" : "")
                      }
                    >
                      <div className="mb-20 col-9 ml-0">
                        <h3 className="body-m">
                          <Link href={hrefFor(p)}>{p.title}</Link>
                        </h3>
                        <h4 className="body-s c-text-secondary mt-5">
                          <Link href={hrefFor(p)}>{p.excerpt}</Link>
                        </h4>
                      </div>
                      <div className="col-3 d-flex items-start justify-end mr-0">
                        <Link
                          className="card__image mb-20"
                          href={hrefFor(p)}
                          aria-label={p.title}
                        >
                          <figure style={{ margin: 0 }}>
                            <img
                              src={img}
                              alt={p.title}
                              loading="lazy"
                              width={90}
                              height={90}
                              sizes="(max-width: 767px) 65px, 90px"
                              style={{
                                width: 90,
                                height: 90,
                                objectFit: "cover",
                                borderRadius: 6,
                                display: "block",
                              }}
                            />
                          </figure>
                        </Link>
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
