import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
// ⬇️ Match your actual file name casing (your file shows "PortfolioData.js")
import PortfolioData from "../../data/portfolioData.js";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

const categoryToId = {
  "Current & In-Progress Work": "Current-&-In-Progress-Work",
  "Research & Analysis Projects": "research-&-analysis-projects",
  "Computer Science Projects": "computer-science-projects",
  "Employers & Work Experience": "employers-&-work-experience",
  "Education & Certifications": "education-&-certifications",
  "Featured / Spotlight Projects": "featured-spotlight-projects", // avoid slash in id
  "Speaking & Media": "speaking-&-media",
  Collaborations: "collaborations",
};

const toId = (name) =>
  categoryToId[name] || name.replace(/[^\w\- ]+/g, "").replace(/\s+/g, "-");

// ---------- helpers to read your data shape ----------
const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]*>/g, "") : "";

const getProjectImage = (p) =>
  p?.archiveImage ||
  p?.banner ||
  (Array.isArray(p?.images) && p.images[0]) ||
  "/assets/images/space.jpg"; // final fallback so cards never break

const getProjectExcerpt = (p) => {
  if (p?.excerpt) return p.excerpt;
  const firstBlockHtml = Array.isArray(p?.content) ? p.content[0]?.text : "";
  const stripped = stripHtml(firstBlockHtml);
  if (!stripped) return "";
  return stripped.length > 220 ? stripped.slice(0, 220) + "…" : stripped;
};

// ---------- Card ----------
function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(t);
  }, [index]);

  const imgSrc = getProjectImage(project);
  const desc = getProjectExcerpt(project);

  const THUMB_W = 256;
  const THUMB_H = 256;

  // Default: clickable if it has a slug. Explicitly setting clickable:false disables it.
  const isClickable = project.clickable !== false && !!project.slug;

  const cardBody = (
    <div
      className={`project-card ${visible ? "visible" : ""} ${hover ? "hovered" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-clickable={isClickable ? "true" : "false"}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        borderRadius: 12,
        transition: "box-shadow .2s ease, transform .2s ease, opacity .3s ease",
        boxShadow: hover
          ? "0 12px 24px rgba(0,0,0,.15)"
          : "0 6px 12px rgba(0,0,0,.08)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      <div
        className="project-content"
        style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
      >
        <div className="project-text" style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: "0 0 .35rem 0" }}>{project.title}</h3>
          {desc && <p style={{ margin: 0 }}>{desc}</p>}
        </div>

        <div
          className="project-thumb"
          style={{
            width: THUMB_W,
            height: THUMB_H,
            flex: "0 0 auto",
            overflow: "hidden",
            borderRadius: 12,
            background: "var(--c-bg-secondary, #eee)",
          }}
        >
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );

  // Only wrap in <Link> if allowed
  return isClickable ? (
    <Link
      href={`/Portfolio/${project.slug}`}
      aria-label={`Open ${project.title}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {cardBody}
    </Link>
  ) : (
    cardBody
  );
}

// ---------- Page ----------
export default function Portfolio() {
  const scrollRefs = useRef({});

  const scroll = (category, direction) => {
  const el = scrollRefs.current[category];
  if (!el) return;

  const amount = el.clientWidth; // one “page” (2 cards visible)
  el.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth",
  });
};


  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
        <div className="base d-flex">
          <Navbar />

          <div className="PortfolioPage">
            <main className="projects-container">
              {Object.entries(PortfolioData).map(([category, projects]) => {
                const safeProjects = Array.isArray(projects) ? projects : [];
                return (
                  <section
                    key={category}
                    id={toId(category)}
                    className="carousel-section"
                    style={{ scrollMarginTop: "80px" }}
                  >
                    <div className="carousel-header">
                      <h2>{category}</h2>
                      {safeProjects.length > 2 && (
                        <div className="carousel-controls">
                          <button onClick={() => scroll(category, "left")}>
                            &lt;
                          </button>
                          <button onClick={() => scroll(category, "right")}>
                            &gt;
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className="carousel-scroll-wrapper"
                      ref={(el) => {
                        scrollRefs.current[category] = el;
                      }}
                    >
                      <div className="projects-grid">
                        {safeProjects.map((project, idx) => (
                          <div
                            className="project-wrapper"
                            key={project.slug || project.title || idx}
                            style={{ height: "100%" }}
                          >
                            <ProjectCard project={project} index={idx} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
