// src/pages/Personal/About.jsx
import React, { useEffect } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

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
          <NavbarMB />

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
              {/* RIGHT (uniform size) */}
              <img
                src="/assets/images/AboutMePhoto2.jpg"
                alt="Notes and maps for research"
                loading="lazy"
                className="float-img right"
              />

              <p>
                I’m <strong>Tobin Albanese</strong>, a proud American and a
                Computer Science major with a mathematics emphasis at Sacramento
                State. I wake up thinking about where technology, intelligence,
                and international affairs collide, and how real decisions get
                made when the stakes are high. I’m not here for performative
                takes; I care about work that helps people see clearly and act
                smart. Graduating in May of 2026 and I’m aiming next at a
                master’s in{" "}
                <strong>strategic affairs and international politics</strong>.
                That’s the ground I plan to work on: sharp analysis, real
                technical fluency, and disciplined judgment. Building skills to
                protect and strengthen this country while adapting as the facts
                change. If you’re wondering where that fire comes from, it
                started long before college, this drive to become something of
                myself, something impactful for my country and the world all
                together.
              </p>

              <p>
                I grew up in a tiny rural town in California. The kind of place
                where you learn to improvise because there isn’t always a store
                around the corner or someone who can fix things for you. My dad
                served in the Navy and told stories about traveling during his
                deployments. Travelling all across the ocean and specifically
                enjoying our
                <strong> Turkey</strong> and <strong>Italy </strong>
                ports and bases. I've learned that there's this sense of
                unfamiliarity of exploring places that suddenly felt like home
                because you met people who weren't what you really expected.
                Sadly enough, I lost my father when I was twelve. That loss has
                empowered me to try and fill the shoes that he once had, even
                though I know that I can never do so. This sense of
                responsibility has driven me to work harder and be more
                disciplined in my life so that I can make something of myself.
                Prove not to just myself but him and everyone else around me
                that I can be something more than just ordinary but excel in
                everything I do. With all that's happened, I learned that God
                has given me this fate and it's up to me to make the best out of
                it and shine through the dark points and realize there's always
                something new to come tomorrow. I like to say this to my friends
                and family, "God gave us the moon not for the sake of it, but
                for you to realize there is light no matter the darkness around
                you." and that this place is truly infinite, and that we are
                infinite.
              </p>

              <p>
                Growing up living in and out of foster care has truly shaped me
                into the person I am today. I understand how judicial processes
                work, how unfortunate my life could have turned out, and how so
                many young individuals go through different hardships. Something
                you would never think about day to day, but is a reality we have
                to all share. I always like to think that someone's worse is
                truly there worse, there is no comparison. It's the way we go
                about these circumstances that make or break us, the way a
                person can turn a horrible situation into something incredible
                is truly amazing. I think this is where I get my interest in
                global affairs. This sense or calling to help people, and do
                something bigger than myself, and understanding that this tiny
                blue dot we all call home, actually holds more than what's
                confined to the places I am constrainted too. Knowing, there's
                always someone to help, an adventure to explore, and new things
                to learn and see truly excites me for what's to come. Do you
                ever feel like there's something calling you? Something inside
                you that eats at you and keeps you up at night. This sense of
                wanderlust and curiosity for the world and its stories is what
                keeps me up. I want to be that person for someone else, to be a
                light in the dark for someone who needs it, no matter the
                distance, no matter the background but just help the entirety of
                our world and most importantly the people residing in my great
                nation.
              </p>

              {/* LEFT (uniform size) */}
              <img
                src="/assets/images/Cross.jpg"
                alt="Building software and writing clearly"
                loading="lazy"
                className="float-img left"
              />

              <p>
                That pull to do something bigger than myself shows up in how I
                work. Computer Science lets me turn conviction into tools, and
                code doesn’t care about intentions; it runs or it doesn’t. The
                strategic side of me, headed towards international politics and
                security, keeps me honest about incentives, second-order
                effects, and what happens after we press “deploy.” Separately,
                languages are for the world I plan to operate in, not for
                coding. I’m studying Russian and Arabic to deal with
                international conflicts more intelligently and to understand
                people on their own terms, and to sharpen my intelligence
                gathering and conversational skills across different
                environments. I want to backpack the Middle East and step into
                places my family never imagined I’d go, places many Americans
                have also only ever heard about as well. Night markets at full
                buzz, bus stations at first light, and border towns where
                history is something you feel under your shoes and inside
                entirely. I want to eat what locals eat, ride through towns in
                tuk tuks, and speak with the many great individuals residing in
                these places. Especially immersing myself completely and being
                able to speak Russian and Arabic whenever I can even though we
                both know I will probably butcher the languages haha. I also
                would really love to visit eastern Europe and get the
                opportunity to see Russia beyond headlines and classroom
                summaries, from provincial cities and long rail stretches to
                small towns where life moves at a human pace. Distancing myself
                from the everyday societal norms and get to experience the world
                for what it truly is. Down to earth and off grid from the usual
                tik-toks and youtube content but truly experience what goes on
                beyond the screens. This is about pushing past comfort, facing
                my fears, and opening new horizons the way my dad did when he
                experienced the navy. I want to meet people who build, think,
                and serve, and get the opportunities to learn how they solve
                problems in their own context, and collect the kind of stories
                that help me bridge cultures when it matters. Honestly, just to
                have as many stories and adventures as I can to tell my family
                and future kids at the end of the day.
              </p>

              <p>
                I gravitate to skills that reward patience and accountability.
                In the field, hunting, range time, and marksmanship slow my
                breathing, make me read wind and terrain, and keep me honest
                about fundamentals. In the gym, lifting clears the static and
                gives me a routine I can measure: add a rep, add five pounds,
                show up tomorrow. Around the table, time with family and friends
                keeps the compass straight with long dinners, straight talk, and
                good jokes. All of that discipline isn’t for its own sake; it’s
                how I stay ready to carry responsibility when it counts. The
                through line is service. I’m a prideful American, and loving
                this country isn’t about pretending it’s perfect; it’s about
                taking responsibility to help it meet its ideals. That’s the
                lane I choose: build tools that surface truth, harden systems
                people rely on, teach what I know, listen to people who’ve
                carried real responsibility, and be useful when it actually
                matters most. I like to show up, take responsibility, finish the
                job, and leave things stronger than I found them.
              </p>

              {/* RIGHT (uniform size) */}
              <img
                src="/assets/images/tk.jpg"
                alt="Curiosity for the world and its stories"
                loading="lazy"
                className="float-img right"
              />

              <p>
                Looking ahead, I want work that bridges research and operations.
                Give me a problem that matters, incomplete information, and a
                team that cares more about results than theatrics, and I’ll
                gladly take the first watch. I want to help build secure,
                reliable systems that hold up under pressure; write analysis
                people can act on when the clock is running; and design
                automations that turn fragile, manual workflows into durable,
                auditable ones. I’ll keep traveling, learning languages, and
                sharpening my questions, not as a checklist, but as a way to
                earn better judgment. Listening more than I talk, using Russian
                and Arabic in real conversations, and chasing primary sources
                until the picture gets clearer. The goal is simple: work hard,
                widen my field of view, and turn curiosity into disciplined
                outcomes. If there’s a path that ties together responsibility,
                strategy, and service, that’s where I’ll be. I also want a life
                outside of work however. I love to read widely, listen to music,
                stay fit, and show up for the people who show up for me. I’m
                grateful for all my mentors who push me and friends who keep me
                going through hard times. I know where I’m from, and I know
                where I want to go, and there's nothing I won't do to get there.
                My passions and interests go deeper than just work and school,
                this is something I live for.
              </p>

              <p>
                If you’ve read this far, thank you for taking the time out of
                your day to step a little bit inside mr version of our shared
                reality. And, If you work on hard problems where policy and
                technology meet and need help I am always there to listen and
                input. Or if you have recommendations for books, music, or FOOD
                (I am a sucker for new foods) please feel free to send them my
                way. And if you ever just need someone to eat some cheese with
                and talk and be heard, I'm your guy. Let’s build things, work
                hard, and be the best people we can be.
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
          height: 510px; /* uniform height */
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
