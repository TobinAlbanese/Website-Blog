import React, { useEffect, useRef } from 'react';
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from '../../components/LandingPage/Footer.jsx';
import Navbar from '../../components/LandingPage/Navbar.jsx';
import { gsap } from 'gsap';

export default function About() {
  const svgRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    let tl;
    let DrawSVGPlugin;

    async function setupGSAP() {
      const pluginModule = await import('gsap/DrawSVGPlugin');
      DrawSVGPlugin = pluginModule.DrawSVGPlugin;
      gsap.registerPlugin(DrawSVGPlugin);

      const svg = svgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();

      tl = gsap.timeline({ onUpdate });
      gsap.set("#progressRing", { drawSVG: 0 });

      tl.to("#masker", {
        duration: 2,
        attr: { r: 2400 },
        ease: "power2.in"
      }).reversed(true);

      function onUpdate() {
        const prog = tl.progress() * 100;
        gsap.set("#progressRing", { drawSVG: prog + "%" });
        if (counterRef.current) {
          counterRef.current.textContent = prog.toFixed();
        }
      }

      function getPoint(evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }

      function mouseMove(evt) {
        const newPoint = getPoint(evt);
        gsap.set("#dot", {
          attr: { cx: newPoint.x, cy: newPoint.y }
        });
        gsap.to("#ring, #masker", {
          duration: 0.88,
          attr: { cx: newPoint.x, cy: newPoint.y },
          ease: "power2.out"
        });
      }

      function mouseHandler() {
        tl.reversed(!tl.reversed());
      }

      function newSize() {
        const ratio = 0.5625;
        let w = window.innerWidth;
        let h = window.innerHeight;
        const isWide = w > h * (16 / 9);

        gsap.set("#demo", {
          attr: {
            width: isWide ? w : h / ratio,
            height: isWide ? w * ratio : h
          }
        });

        const data = svg.getBoundingClientRect();
        gsap.set("#demo", {
          x: w / 2 - data.width / 2,
          y: h / 2 - data.height / 2
        });
      }

      window.addEventListener("mousedown", mouseHandler);
      window.addEventListener("mouseup", mouseHandler);
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("resize", newSize);

      newSize();

      // Cleanup on unmount
      return () => {
        window.removeEventListener("mousedown", mouseHandler);
        window.removeEventListener("mouseup", mouseHandler);
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("resize", newSize);
      };
    }

    const cleanupPromise = setupGSAP();

    // Cleanup promise resolve returns cleanup function
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <MetaHead />
      <SvgHead />

      <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
        <div className="base d-flex">
          <Navbar />

          {/* SVG Reveal Animation inserted here */}
          <div style={{ position: 'relative', width: '95vw',  margin: '0px auto', height: '700px', overflow: 'hidden' }}>
            <svg
              ref={svgRef}
              id="demo"
              xmlns="http://www.w3.org/2000/svg"
              x={0}
              y={0}
              width="100%"
              height= "100%"
              viewBox= "0 0 1600 900"
              style={{  display: 'block', margin: '0 auto' }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="maskGradient">
                  <stop offset="50%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <mask id="theMask">
                  <circle
                    id="masker"
                    r={150}
                    fill="url(#maskGradient)"
                    cx={800}
                    cy={450}
                  />
                </mask>
              </defs>
              {/* Sketch background */}
              <image
                href="/assets/images/AboutDark.jpg"
                x={0}
                y={0}
                width={1600}
                height={900}
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Color image shown through mask */}
              <g id="maskReveal" mask="url(#theMask)">
                <image
                  href="/assets/images/AboutMePhoto.jpg"
                  x={0}
                  y={0}
                  width={1600}
                height={900}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
              {/* Progress ring */}
              <circle
                id="progressRing"
                r={160}
                fill="none"
                stroke="#dc143c"
                strokeWidth={2}
                cx={800}
                cy={450}
                style={{visibility: 'hidden'}}
              />
              {/* Ring and dot */}
              <circle
                id="ring"
                r={20}
                fill="none"
                stroke="#dc143c"
                strokeWidth={2}
                cx={800}
                cy={450}
              />
              <circle id="dot" r={4} fill="#dc143c" cx={800} cy={450} />
            </svg>
            {/* Counter */}
          
          </div>

        {/* Content Section */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px", fontFamily: "inherit" }}>
          
          {/* Section 1: Who I Am */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '600', marginBottom: 20 }}>Who I Am</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              My name is Tobin Albanese, and I’m currently pursuing a Computer Science degree at Sacramento State University. My academic focus is centered on areas like software development, data systems, and machine learning — but my real passion lies at the crossroads of technology and geopolitics. I am deeply intrigued by how the rapid advancements in technology affect global security and the strategic decisions that shape international relations.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              This interest drives me to blend technical skills with political analysis, cybersecurity, and intelligence studies. By adopting this interdisciplinary lens, I aim to better understand the new forms of warfare and diplomatic tools emerging from the digital revolution. These insights help frame how nations prepare for and respond to global threats, from cyberattacks to hybrid conflicts.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Beyond academic environments, I regularly engage with experts across multiple fields to stay informed on current global security issues. Midnight Bureau, my personal research platform, reflects this ongoing commitment to connecting complex technology with real-world security challenges in a way that is accessible and impactful.
            </p>
          </section>

          {/* Section 2: My Learning Journey */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 20 }}>My Learning Journey</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Learning for me goes far beyond textbooks and lectures. I actively seek out knowledge through a variety of channels — from foreign policy journals to cybersecurity forums and AI research papers. This constant pursuit of learning sharpens my critical thinking and deepens my understanding of complex global dynamics.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              I’m particularly focused on the intersection of international relations and technology — where cyber warfare, data privacy, and digital diplomacy converge. Staying updated on emerging threats and strategic innovations helps me grasp not just what is happening, but why it matters for national and global security.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Through Midnight Bureau, I translate this learning into clear, accessible analysis. This platform is not just a blog; it’s a space where ideas can be explored, challenged, and refined. My goal is to create content that empowers readers with deeper insights rather than surface-level commentary.
            </p>
          </section>

          {/* Section 3: Global Awareness & Engagement */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 20 }}>Global Awareness & Engagement</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              I keep a close eye on the world’s shifting geopolitical landscape, focusing on national security policies, technological advancements, and evolving power structures. This ongoing engagement helps me contextualize the technological changes within broader political and social frameworks.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              What fascinates me most is uncovering the underlying causes of global events and figuring out how best to respond. This means not only understanding the immediate tactical moves but also the strategic narratives that drive decisions on the international stage.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Midnight Bureau serves as both a repository and a conversation starter. I use it to present my findings and invite dialogue among readers who want to engage seriously with these issues. The goal is to foster a community that values thoughtful analysis and thoughtful debate.
            </p>
          </section>

          {/* Section 4: Research Focus & Core Interests */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 20 }}>Research Focus & Core Interests</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              My primary research interest lies in analyzing how non-state actors exploit digital platforms and technologies to advance their agendas. Understanding these asymmetric threats is critical as such actors evolve faster than traditional defense mechanisms can adapt.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              I study how governments respond to these challenges, examining policy, cybersecurity strategies, and intelligence efforts. This research highlights the ongoing tug-of-war between innovation and regulation, offense and defense.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              A major part of my work is breaking down complex topics—be it emerging cyber threats, influence operations, or the impact of AI on warfare—into clear, actionable insights. This bridges the gap between academia and practical security needs.
            </p>
          </section>

          {/* Section 5: Mission & Vision */}
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 20 }}>Mission & Vision</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Midnight Bureau embodies my mission to provide thoughtful, strategic perspectives on the most pressing security and technology issues of our time. In a world where misinformation spreads quickly and cyber threats loom large, clear and honest analysis is more crucial than ever.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              I hope to cultivate a community of readers who are not only informed but also engaged — who seek to understand complexity rather than shy away from it. This platform is a call for critical thinking and meaningful dialogue.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--c-text-secondary)" }}>
              Ultimately, I want Midnight Bureau to be a space where innovation, security, and geopolitics intersect to inform better decisions, stronger policies, and a safer world. It’s a journey I’m excited to share with you.
            </p>
          </section>
        </section>

        <Footer />
      </div>
      </div>
    </>
  );
}
