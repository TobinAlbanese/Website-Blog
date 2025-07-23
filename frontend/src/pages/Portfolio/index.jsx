import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import PortfolioData from "../../data/portfolioData.js";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";

function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(timeout);
  }, [index]);



  return (
 
    <div
      className={`project-card ${visible ? "visible" : ""} ${hover ? "hovered" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="project-content">
        <div className="project-text">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-link">
        <Link href={`/Portfolio/${project.slug}`}>Click here for more</Link>
      </div>
    </div>
  );
}

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
        {Object.entries(PortfolioData).map(([category, projects]) => (
          <section key={category} className="carousel-section">
            <div className="carousel-header">
              <h2>{category}</h2>
              {projects.length > 3 && (
  <div className="carousel-controls">
    <button onClick={() => scroll(category, "left")}>&lt;</button>
    <button onClick={() => scroll(category, "right")}>&gt;</button>
  </div>
)}
            </div>

            {/* 🧷 NEW FULL-WIDTH WRAPPER FOR SCROLLING */}
           <div
  className="carousel-scroll-wrapper"
  ref={(el) => {
    scrollRefs.current[category] = el; // 👉 Now pointing to the correct scroll container
  }}
>
  <div className="projects-grid">
    {projects.map((project, idx) => (
      <div className="project-wrapper" key={project.title}>
        <ProjectCard project={project} index={idx} />
      </div>
    ))}
  </div>
</div>
          </section>
        ))}
      </main>
    </div>


 <Footer />
 </div>
 </div>
 </>
  );
}
