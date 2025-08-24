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
    const timeout = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(timeout);
  }, [index]);

  const imgSrc = getProjectImage(project);
  const desc = getProjectExcerpt(project);

  return (
    <div
      className={`project-card ${visible ? "visible" : ""} ${hover ? "hovered" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="project-content">
        <div className="project-text">
          <h3>{project.title}</h3>
          {desc && <p>{desc}</p>}
        </div>

        {/* Use the resolved image source */}
        <img
          src={imgSrc}
          alt={project.title}
          loading="lazy"
          decoding="async"
          // style={{ objectFit: "cover" }} // uncomment if your CSS needs it
        />
      </div>

      <div className="project-link">
        <Link href={`/Portfolio/${project.slug}`}>Click here for more</Link>
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function Portfolio() {
  const scrollRefs = useRef({});

  const scroll = (category, direction) => {
    const el = scrollRefs.current[category];
    if (!el) return;
    const scrollAmount = el.clientWidth;
    const newScrollLeft =
      direction === "left"
        ? el.scrollLeft - scrollAmount
        : el.scrollLeft + scrollAmount;
    el.scrollTo({ left: newScrollLeft, behavior: "smooth" });
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
                      {safeProjects.length > 3 && (
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
