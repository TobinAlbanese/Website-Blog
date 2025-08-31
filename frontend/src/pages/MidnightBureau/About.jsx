// src/pages/Personal/About.jsx
import React, { useEffect } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";

const BW_IMG = "/assets/images/GradBW.png";
const COLOR_IMG = "/assets/images/Dylan-Tobin.jpg";

// --- Layout knobs (keep blog-side constants as-is) ---
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

          {/* HERO (leave untouched) */}
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
            <h2 className="about-title">About Me</h2>

            <article className="about-copy">
              {/* RIGHT (uniform size, same as main About) */}
              <img
                src="/assets/images/AboutMePhoto2.jpg"
                alt="Notes and maps for research"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I’m <strong>Tobin Albanese</strong>—a proud American, a Computer
                Science major with a mathematics emphasis at Sacramento State,
                and someone who wakes up thinking about how technology,
                intelligence, and international affairs collide in the real
                world. I’m not chasing hot takes. I’m building toward a life of
                service where good engineering and clear thinking help the right
                decisions get made under pressure. I graduate in May 2026 and
                plan to pursue a master’s in{" "}
                <strong>strategic affairs and international politics</strong>.
                My long-term aim is simple and steady: defend and protect my
                country, keep learning, and do work that stands up when it
                matters most.
              </p>

              <p>
                I grew up in a tiny rural California town—the kind of place
                where you figure things out because there isn’t someone to do it
                for you. My dad served in the Navy and brought home stories that
                put pins in the map—<strong>Turkey</strong>,{" "}
                <strong>Italy</strong>, ports and bases, strangers who weren’t
                strangers by the end of a meal. I lost him when I was twelve. I
                spent time in foster care, learned to keep going when the ground
                moved under me, and saw enough of the dark side of the world to
                respect the light. Those experiences didn’t make me cynical;
                they made me disciplined and calm. I don’t dramatize problems. I
                take them apart and keep moving.
              </p>

              <p>
                I read a lot, and I read widely—international affairs, news,
                politics, presidencies, and foreign policy. I care about how
                narratives move, how coalitions form, and why different actors
                read the same facts and see different worlds. I track sources
                and try to understand incentives. It’s not trivia to me; it’s a
                map of how influence, legitimacy, and power actually function.
                The question I’m always asking is:{" "}
                <em>
                  What would I do with this information if the stakes were high
                  and time was short?
                </em>
              </p>

              {/* LEFT */}
              <img
                src="/assets/images/tobin-kenny.JPG"
                alt="Building software and writing clearly"
                loading="lazy"
                className="float-img left"
              />

              <p>
                On the technical side, Computer Science gives me the tools to
                build and reason about systems. Math keeps my head clear. Code
                is honest in a way that’s useful: it runs or it doesn’t; the
                logs are either telling you what you need or they aren’t. I like
                breaking complex things into testable parts, writing names that
                mean something, instrumenting what actually matters, and leaving
                trails a teammate can follow at 2 a.m. If a system only works
                when I’m standing next to it, it isn’t finished. The bar is
                reliability under stress, not vibes.
              </p>

              <p>
                My interests sit in the overlap of security, intelligence, and
                technology—places where human behavior meets code. I’m drawn to
                open-source research, information flows, cyber defense, and the
                gray areas where non-state actors coordinate and influence
                outcomes. I’m not in love with the drama; I’m in love with the
                responsibility. The work isn’t about being loud—it’s about being
                right, careful, and useful.
              </p>

              <p>
                And then there’s <strong>SPACE</strong>. I’m not shy about it:
                I’m obsessed with space and exploration. Part of it is the human
                story—the courage to go farther. But a big part is the systems
                thinking: autonomy, comms, power, navigation, failure modes, and
                the discipline it takes to make something work far from help.
                Space forces you to respect constraints and design with
                humility. That mindset translates back to Earth: plan for
                failure, keep your loops tight, log what matters, and build so
                the next person can pick up where you left off.
              </p>

              {/* RIGHT */}
              <img
                src="/assets/images/AFG4.jpg"
                alt="Curiosity for the world and its stories"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I love the world and plan to see as much of it as I can. I want
                to backpack the <strong>Middle East</strong>, not as a tourist
                collecting photos but as a student of places—learning in markets
                and mosques, on buses and back roads, eating what locals eat and
                listening more than I talk. I want to visit{" "}
                <strong>Russia</strong>
                and understand it beyond the headlines and history class
                summaries. I’m studying <strong>Russian</strong> and{" "}
                <strong>Arabic</strong> because languages unlock context and
                respect. You understand people better when you can listen in the
                words they chose.
              </p>

              <p>
                Food is part of that. I’ve got a soft spot for{" "}
                <strong>Muslim/Middle Eastern food</strong>—the spice profiles,
                the hospitality, the way meals turn into long conversations. And
                yes, I love <strong>cheese</strong>. I’ll try the fancy stuff,
                the local stuff, and the random “you just have to try this”
                thing from a corner store. It’s funny how small tastes can stick
                with you like landmarks on a map.
              </p>

              <p>
                Music is a big part of how I think and work. I love{" "}
                <strong>heavy metal</strong> when I need to focus hard—there’s a
                discipline to it, a precision that makes good code feel like a
                riff locking into time. <strong>Reggae</strong> resets me; it’s
                structure without stress. Stripped-down{" "}
                <strong>acoustic</strong>
                sets and <strong>piano instrumentals</strong> help me draft or
                outline; it’s like someone cleared the room so the ideas can
                walk around. And then there are the{" "}
                <strong>guitar solos</strong> that say more than words—those
                remind me that there’s a line between good and great that has
                nothing to do with speed and everything to do with taste. Music
                isn’t background noise for me; it’s a way to set intent.
              </p>

              {/* LEFT */}
              <img
                src="/assets/images/WhiteHouse.jpg"
                alt="Where policy, security, and technology meet"
                loading="lazy"
                className="float-img left"
              />

              <p>
                The thread running through all of this is service. I’m a
                prideful American and I don’t hide it. Loving your country
                doesn’t mean you think it’s perfect; it means you take
                responsibility for helping it meet its ideals. I plan to defend
                and protect it however I can—by building tools that surface
                truth, by improving systems people rely on, by teaching what I
                know, and by learning from the folks who’ve already done the
                hard miles. I want to be useful when it matters, not just
                impressive when it’s easy.
              </p>

              <p>
                I’m honest about trade-offs. In both policy and engineering,
                perfect is rare and expensive, and reality shows up with a
                deadline. The job is to choose constraints carefully and
                document the why, so when conditions change you can adjust
                without losing the plot. That’s how I approach research, code,
                and writing: start with first principles, move in small proofs,
                measure the right things, and communicate like the next person
                will be smarter than you and busier than you. I respect people’s
                time.
              </p>

              <p>
                I’m not trying to be everywhere at once. I’m trying to be
                present where I am—whether that’s debugging a hard issue,
                studying Russian verbs, reading about a presidency, mapping a
                conflict’s actors, or cooking something new because a friend
                swore it would change my life. I’m comfortable being the person
                who quietly handles what needs handling, and I’m learning when
                to step forward and lead. Good teams need both.
              </p>

              <p>
                As for the future, I want work that bridges{" "}
                <strong>research and operations</strong>. Give me a problem that
                matters, incomplete information, and a team that cares more
                about results than theatrics. I want to help build secure,
                reliable systems; write analysis that people can act on; and
                create automations that take the grind out of serious workflows.
                I want to keep traveling, keep learning languages, and keep
                asking better questions. If there’s a path that ties together
                code, strategy, and service, that’s where I’ll be.
              </p>

              <img
                src="/assets/images/Snowboard2.jpg"
                alt="The future"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I also want to keep a life outside of work: read widely, listen
                deeply, stay strong, and show up for the people who show up for
                me. I’m grateful for the mentors who’ve pushed me and the
                friends who’ve kept me laughing. I know where I’m from, and I
                know where I want to go. The plan is simple: build steadily,
                travel often, study hard, and keep my word. If I do those things
                consistently, the rest tends to sort itself out.
              </p>

              <p>
                If you’ve read this far, thank you. If you share these
                interests, or if you work on hard problems in the space where
                policy and technology meet, I’d like to learn from you. If
                you’ve got recommendations for books, maps, music, or
                meals—especially from the Middle East—send them my way. And if
                you ever need someone to split a cheese board and talk through a
                complicated idea, I’m your guy. Let’s build things worth
                keeping.
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
          object-fit: cover; /* keep hero intact */
        }
        @media (max-width: ${DESKTOP_MIN - 1}px) {
          .hero-wrap {
            width: 96vw;
            max-height: 46vh;
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
        .about-copy::after {
          content: "";
          display: block;
          clear: both;
        }

        /* ---------- Uniform floated images (flush with text) ---------- */
        .float-img {
          width: min(40%, 340px);
          height: 230px; /* uniform height */
          object-fit: cover;
          object-position: center;
          border-radius: 12px;

          /* Even spacing with text */
          margin: 2px 24px 14px;
          vertical-align: top;
          opacity: 0;
          transform: translateX(var(--shift, 0)) scale(0.98);
          transition:
            opacity 0.7s ease,
            transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          will-change: transform, opacity;

          /* Wrap text flush to rounded image edge */
          shape-outside: inset(0 round 18px);
          -webkit-shape-outside: inset(0 round 18px);
        }
        .float-img.left {
          float: left;
          --shift: -40px;
        }
        .float-img.right {
          float: right;
          --shift: 40px;
        }
        .float-img.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Mobile: stack images; keep uniform look */
        @media (max-width: 768px) {
          .float-img {
            float: none !important;
            display: block;
            width: 100%;
            max-width: 640px;
            height: 220px;
            margin: 0 auto 22px;
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
