// src/pages/Personal/About.jsx
import React, { useEffect } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";

const BW_IMG = "/assets/images/GradBW.png";
const COLOR_IMG = "/assets/images/Dylan&Tobin.JPG";

// --- Layout knobs ---
const DESKTOP_MIN = 900;
const MAX_WIDTH = 1400;
const MAX_HEIGHT = 560;
const ASPECT = 16 / 9;
const FOCAL_Y = 50;

export default function About() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(document.querySelectorAll(".float-img"));

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }

    // Fallback for older browsers
    const onScroll = () => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div id="js-dfp-tag-top--2" />
        </div>
        <div id="js-dfp-tag-outofpage--2" />
        <div className="base d-flex">
          <Navbar />

          {/* HERO (responsive image across TV / wide / desktop / iPad / iPhone) */}
          <div className="hero-wrap">
            <img
              src={COLOR_IMG}
              alt="About Tobin"
              className="hero-img"
              style={{ objectPosition: `50% ${FOCAL_Y}%` }}
            />
          </div>

          {/* Content */}
          <section className="about-wrap">
            <h2 className="about-title">My Story</h2>

            <article className="about-copy">
              {/* 1) RIGHT */}
              <img
                src="/assets/images/space.jpg"
                alt="Floating visual"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I grew up in a small town in California, in a small family that
                held together through more than most people ever see. I spent
                time in foster care and learned early how to keep moving, even
                when the ground shifts under you. That experience made me
                resourceful and stubborn in the best way: if something needs
                doing, I figure it out piece by piece, no drama, just progress.
              </p>

              <p>
                These days I’m in Sacramento, studying Computer Science at
                Sacramento State. I’ll finish in May 2026, and I’m trying to
                make the years between now and then count. I like computers
                because they’re brutally honest—your code runs or it doesn’t—but
                I stay for the bigger picture: how technology shapes people, how
                information flows, and how all of that intersects with security,
                policy, and power.
              </p>

              {/* 2) LEFT */}
              <img
                src="/assets/images/space.jpg"
                alt="Floating visual"
                loading="lazy"
                className="float-img left"
              />

              <p>
                The thread that ties it all together for me is curiosity about
                the gray areas: how non-state actors work, how influence spreads
                online, and what counter-terrorism looks like in a world where a
                phone in a pocket can be both a newsroom and a command post. I’m
                not in love with the drama of that domain—just the
                responsibility of understanding it clearly enough to help build
                better defenses and better decisions.
              </p>

              <p>
                Midnight Bureau is where I put that curiosity to work in public.
                It’s my place to write plainly, link to primary sources, and
                explain what I’m seeing without hype. I try to earn attention by
                being useful: fewer opinions, more evidence; fewer hot takes,
                more context; fewer buzzwords, more clear language and diagrams
                when needed.
              </p>

              {/* 3) RIGHT */}
              <img
                src="/assets/images/space.jpg"
                alt="Floating visual"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I’m happiest when I’m building. I’ve shipped a real-time
                micro-expression analysis prototype, an early
                intelligence-platform concept, and multiple redesigns of my own
                site using Next.js and Tailwind, with some SVG/GSAP animation
                and scroll-aware UI sprinkled in. I’ve also explored a sovereign
                productivity-suite idea—modular docs, databases, tasks, and AI
                features stitched together on local infrastructure—and an
                automation pipeline that takes longform scripts, turns them into
                narrated videos, translates them, and publishes across platforms
                using n8n and Google Sheets for orchestration.
              </p>

              <p>
                Those projects might sound different, but they’re all the same
                muscle: take something complicated, break it into pieces, make
                it repeatable, and show your work. If a system only works when
                I’m standing next to it, it isn’t done yet.
              </p>

              {/* 4) LEFT */}
              <img
                src="/assets/images/space.jpg"
                alt="Floating visual"
                loading="lazy"
                className="float-img left"
              />

              <p>
                Outside the editor, I like simple things: time with friends,
                long walks, late-night diner coffee, and any excuse to be
                outside. The outdoors resets me. It’s the opposite of alerts and
                timelines—you can’t rush a sunset or negotiate with a trail. It
                also keeps me from taking myself too seriously. The best ideas
                tend to show up when I’m not trying to force them.
              </p>

              <p>
                My “soul compass,” if I had to put it into words, is built on a
                few rules: do quiet work that matters; keep your word; choose
                clarity over cleverness; be useful before you try to be
                impressive; and don’t let ambition outrun integrity. I try to
                make decisions I’ll be proud of in five years, not just five
                minutes.
              </p>

              <p>
                Counter-terrorism and security sit in my interests because they
                combine human behavior with technical systems. I care about how
                narratives spread, how small groups coordinate, and how
                defenders can separate signal from noise without trampling the
                openness that makes the internet valuable. I’m not here to
                sensationalize threats; I’m here to understand them well enough
                to help teams design better protections and better policy
                choices.
              </p>

              <p>
                School gives me the fundamentals—data structures, systems,
                ML—but I treat class as a floor, not a ceiling. I read technical
                papers, follow incident write-ups, and keep notes like I’m
                building a field guide. I like conversations with people who run
                real systems—engineers, analysts, policy folks—because they live
                with consequences. That’s where theory meets the Monday morning
                reality of budgets, logs, and deadlines.
              </p>

              <p>
                I’m also honest about trade-offs. Good engineering is less about
                perfect answers and more about choosing which constraints you’re
                willing to live with. That shows up in my code and my writing:
                clear naming, tests where they actually prevent pain, dashboards
                that favor the few signals that matter, and documents that
                someone can skim at 2 a.m. and still do the right thing.
              </p>

              <p>
                A lot of my life has been a solo grind—learning to build my own
                momentum, making calls without a safety net, figuring things out
                from first principles. I’m proud of that. But I also know I
                stand on the shoulders of friends, mentors, and a small family
                that kept showing up. Any time I can return that favor for
                someone else, I try to.
              </p>

              <p>
                If you’re here for a neat label, here’s mine: I’m a builder who
                writes, a researcher who ships, and a teammate who tries to make
                hard problems feel smaller. My objective is simple: contribute
                to systems—technical and social—that make people safer and more
                capable, especially when the stakes are high and the facts are
                messy.
              </p>

              <p>
                In the near term, that means finishing my degree, growing
                Midnight Bureau, and taking on work that bridges research with
                operations—whether that’s security-aware software, analysis that
                guides real choices, or automation that turns fragile workflows
                into reliable ones. Long term, I want to be the person you call
                when the problem is serious, the time is short, and you need
                clear thinking that leads to action.
              </p>

              <p>
                Thanks for reading. If any of this resonates—if you like primary
                sources, steady craft, good questions, and long walks—I’m glad
                you’re here. Let’s build things worth keeping.
              </p>
            </article>
          </section>

          <Footer />
        </div>
      </div>

      <style jsx>{`
        .hero-wrap {
          position: relative;
          width: 95vw;
          max-width: ${MAX_WIDTH}px;
          margin: 12px auto 36px;
          aspect-ratio: ${ASPECT};
          max-height: ${MAX_HEIGHT}px;
          border-radius: 12px;
          overflow: hidden;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover; /* keeps the image flush at all times */
        }
        @media (max-width: ${DESKTOP_MIN - 1}px) {
          .hero-wrap {
            width: 96vw;
            max-height: 46vh; /* slightly taller on phones but still restrained */
          }
        }

        /* ---------- About content ---------- */
        .about-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: inherit;
        }
        .about-title {
          font-size: 3rem;
          font-weight: 600;
          margin: 0 0 20px 0;
          line-height: 1.15;
        }
        .about-copy {
          position: relative;
        }
        .about-copy p {
          font-size: 18px;
          line-height: 1.85;
          color: var(--c-text-secondary);
          margin: 0 0 1.15em 0;
          text-wrap: pretty;
          hyphens: auto;
        }
        /* Clear floats at the end of the article */
        .about-copy::after {
          content: "";
          display: block;
          clear: both;
        }

        /* Float images with animated slide-in */
        .float-img {
          width: min(42%, 360px);
          height: auto;
          border-radius: 12px;
          margin: 0 24px 16px;
          opacity: 0;
          transform: translateX(var(--shift, 0)) scale(0.98);
          transition:
            opacity 0.7s ease,
            transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          will-change: transform, opacity;
        }
        .float-img.left {
          float: left;
          --shift: -40px;
          shape-outside: inset(0 round 18px);
          -webkit-shape-outside: inset(0 round 18px);
        }
        .float-img.right {
          float: right;
          --shift: 40px;
          shape-outside: inset(0 round 18px);
          -webkit-shape-outside: inset(0 round 18px);
        }
        .float-img.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Mobile: stack images and remove floats */
        @media (max-width: 768px) {
          .float-img {
            float: none !important;
            display: block;
            width: 100%;
            max-width: 640px;
            margin: 0 auto 24px;
            --shift: 0;
            shape-outside: auto;
            -webkit-shape-outside: auto;
          }
        }
      `}</style>
    </>
  );
}

{
  /**
   * ---------------------------------------------------------------------------
   * HEAT REVEAL LOGIC (ARCHIVED) — moved to the bottom and fully commented out
   * ---------------------------------------------------------------------------
   * To restore this feature:
   * 1) Uncomment the React hooks and gsap import lines below in your imports.
   * 2) Reintroduce the state/effects and the interactive SVG hero.
   * 3) Replace the <div className="hero-wrap"> block above with the interactive
   *    conditional that renders the SVG when interactive, <img> otherwise.
   *
   * Imports to re-enable:
   *   import React, { useEffect, useRef, useState } from "react";
   *   import { gsap } from "gsap";
   *
   * ----------------------------- HOOKS & EFFECTS -----------------------------
   *
   *   const svgRef = useRef(null);
   *   const [interactive, setInteractive] = useState(false);
   *
   *   // Decide interactive vs static (desktop + hover devices only)
   *   useEffect(() => {
   *     if (typeof window === "undefined") return;
   *     const decide = () =>
   *       setInteractive(
   *         window.innerWidth >= DESKTOP_MIN &&
   *         window.matchMedia("(hover: hover)").matches
   *       );
   *     decide();
   *     window.addEventListener("resize", decide);
   *     return () => window.removeEventListener("resize", decide);
   *   }, []);
   *
   *   // GSAP mask only when interactive
   *   useEffect(() => {
   *     if (!interactive) return;
   *     let cleanup = () => {};
   *     (async () => {
   *       const { DrawSVGPlugin } = await import("gsap/DrawSVGPlugin");
   *       gsap.registerPlugin(DrawSVGPlugin);
   *
   *       const svg = svgRef.current;
   *       if (!svg) return;
   *
   *       const pt = svg.createSVGPoint();
   *       const tl = gsap.timeline();
   *       gsap.set("#progressRing", { drawSVG: 0 });
   *       tl.to("#masker", { duration: 2, attr: { r: 2400 }, ease: "power2.in" }).reversed(true);
   *
   *       function getPoint(evt) {
   *         pt.x = evt.clientX; pt.y = evt.clientY;
   *         return pt.matrixTransform(svg.getScreenCTM().inverse());
   *       }
   *       function onMove(evt) {
   *         const p = getPoint(evt);
   *         gsap.set("#dot", { attr: { cx: p.x, cy: p.y } });
   *         gsap.to("#ring,#masker", { duration: 0.75, attr: { cx: p.x, cy: p.y }, ease: "power2.out" });
   *       }
   *       function toggle() { tl.reversed(!tl.reversed()); }
   *
   *       function sizeSvg() {
   *         const wrapper = svg.parentElement;
   *         const w = Math.min(wrapper.clientWidth, MAX_WIDTH);
   *         const h = Math.min(w / ASPECT, MAX_HEIGHT);
   *         svg.setAttribute("width", String(w));
   *         svg.setAttribute("height", String(h));
   *       }
   *
   *       window.addEventListener("mousemove", onMove);
   *       window.addEventListener("mousedown", toggle);
   *       window.addEventListener("mouseup", toggle);
   *       window.addEventListener("resize", sizeSvg);
   *       sizeSvg();
   *
   *       cleanup = () => {
   *         window.removeEventListener("mousemove", onMove);
   *         window.removeEventListener("mousedown", toggle);
   *         window.removeEventListener("mouseup", toggle);
   *         window.removeEventListener("resize", sizeSvg);
   *         tl.kill();
   *       };
   *     })();
   *     return () => cleanup();
   *   }, [interactive]);
   *
   * --------------------------- INTERACTIVE SVG HERO ---------------------------
   *
   *   {interactive ? (
   *     <svg
   *       ref={svgRef}
   *       id="demo"
   *       xmlns="http://www.w3.org/2000/svg"
   *       viewBox="0 0 1600 900"
   *       preserveAspectRatio="xMidYMid slice"
   *       style={{ width: "100%", height: "100%", display: "block" }}
   *     >
   *       <defs>
   *         <radialGradient id="maskGradient">
   *           <stop offset="50%" stopColor="#fff" />
   *           <stop offset="100%" stopColor="#000" />
   *         </radialGradient>
   *         <mask id="theMask">
   *           <circle id="masker" r="150" fill="url(#maskGradient)" cx="800" cy="450" />
   *         </mask>
   *       </defs>
   *
   *       {/* B/W layer
   *       <image href={BW_IMG} x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice" />
   *       {/* Color layer through mask *
   *       <g mask="url(#theMask)">
   *         <image href={COLOR_IMG} x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice" />
   *       </g>
   *
   *       {/* helpers *
   *       <circle id="progressRing" r="160" fill="none" stroke="#dc143c" strokeWidth="2" cx="800" cy="450" style={{ visibility: "hidden" }} />
   *       <circle id="ring" r="20" fill="none" stroke="#dc143c" strokeWidth="2" cx="800" cy="450" />
   *       <circle id="dot" r="4" fill="#dc143c" cx="800" cy="450" />
   *     </svg>
   *   ) : (
   *     <img src={COLOR_IMG} alt="About Tobin" className="hero-img" />
   *   )}
   *
   * ---------------------------------------------------------------------------
   * LEGACY CONTAINER NOTE:
   * If you prefer the tall hero version, you can also swap the wrapper with:
   *
   *   <div style={{ position: 'relative', width: '95vw', margin: '0 auto', height: '700px', overflow: 'hidden' }}>
   *     {/* SVG goes here *
   *   </div>
   * ---------------------------------------------------------------------------
   */
}
