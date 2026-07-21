// src/pages/Personal/About.jsx
import React, { useEffect } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

// --- Supabase Storage (public-images bucket) ---
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const BUCKET = "public-images";
const sbPublic = (path) =>
  path
    ? `${SB_URL}/storage/v1/object/public/${BUCKET}/${path.replace(/^\/+/, "")}`
    : "";

// ✅ Set these to the exact storage paths (object keys) in public-images.
// (Case-sensitive. If your objects are inside folders, include them, e.g. "about/AboutMePhoto2.webp")
const HERO_IMG_PATH = "Dylan-Tobin.webp"; // was /assets/images/Dylan-Tobin.jpg
const FLOAT_RIGHT_1 = "AboutMePhoto2.webp"; // was /assets/images/AboutMePhoto2.jpg
const FLOAT_LEFT_1 = "Cross.webp"; // was /assets/images/Cross.jpg
const FLOAT_RIGHT_2 = "tk.webp"; // was /assets/images/tk.jpg

const COLOR_IMG = sbPublic(HERO_IMG_PATH);

// --- Layout knobs (hero remains untouched) ---
const DESKTOP_MIN = 900; // breakpoint for interactive mode
const MAX_WIDTH = 1400; // px, cap for the hero container
const MAX_HEIGHT = 560; // px, cap to avoid a super tall hero
const ASPECT = 16 / 9; // keep images cinematic but not too short
const FOCAL_Y = 75; // % from top for object-position to avoid neck chop

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
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }

    // Fallback
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

          {/* HERO — DO NOT TOUCH */}
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
              {/* RIGHT IMAGE */}
              <img
                src={sbPublic(FLOAT_RIGHT_1)}
                alt="Notes and maps for international affairs research"
                loading="lazy"
                className="float-img right"
              />
              <p>
                I’m <strong>Tobin Albanese</strong>, a proud American, student,
                researcher, and state government professional. At Sacramento
                State University, I studied{" "}
                <strong>International Relations and Political Science</strong>,
                with minors in{" "}
                <strong>behavioral analysis and war studies</strong>. My
                academic interests center on diplomacy, international security,
                intelligence, political behavior, and the ways states compete
                when the rules are unclear and the consequences are real. My
                long-term goal is to build a career in international relations
                and eventually serve in the{" "}
                <strong>United States Foreign Service</strong>, working overseas
                and representing my country in environments where judgment,
                cultural understanding, patience, and personal integrity matter.
                I’m especially interested in{" "}
                <strong>Russia and Eastern European affairs</strong>, including
                Russian foreign policy, regional security, strategic culture,
                and Russia’s political and economic influence throughout the
                region. In my view, understanding another country does not
                require agreeing with its government or overlooking its actions.
                It requires taking its history, institutions, fears, ambitions,
                and internal contradictions seriously. That kind of
                understanding is necessary for any diplomacy that hopes to
                produce more than temporary results.
              </p>
              <p>
                I currently work within{" "}
                <strong>California state government</strong>, which has given me
                a practical understanding of how public institutions operate and
                how much responsibility exists behind decisions most people
                never see. What stands out to me is that effective government
                depends less on appearances and more on consistency, judgment,
                accountability, and people who are willing to do the work
                correctly even when that work happens behind the scenes. Before
                moving more directly into international relations, I studied{" "}
                <strong>computer science</strong> and earned an associate degree
                in the field. That technical background still shapes the way I
                approach political and international problems. I tend to look
                for systems, incentives, weak points, patterns, feedback loops,
                and unintended consequences. Code either works or it doesn’t.
                Government and foreign policy are obviously not that simple, but
                the same discipline still matters. Assumptions have to be
                tested. Sources have to be checked. A confident answer is not
                automatically a correct one. Behavioral analysis adds another
                side to that thinking by helping me understand decision-making,
                perception, pressure, incentives, and uncertainty, while war
                studies gives me a stronger foundation for studying strategy,
                deterrence, escalation, proxy conflict, and the political
                consequences of force. International relations is where those
                different areas begin to connect.
              </p>
              <p>
                I grew up in a <strong>small rural town in California</strong>,
                where you learn early that not every problem comes with
                instructions. Sometimes you have to improvise, work with what
                you have, and figure things out yourself. My father served in
                the United States Navy, and some of my earliest interest in the
                world came from listening to stories about his deployments and
                the places he visited. He spoke about traveling through ports in
                Turkey and Italy, meeting people from completely different
                backgrounds, and discovering that unfamiliar places could begin
                to feel human once you stopped viewing them from a distance. I
                lost my father when I was twelve, but one of the lessons he gave
                me has stayed with me throughout my life:{" "}
                <strong>
                  “Integrity is about doing the right thing even when no one’s
                  around to see it.”
                </strong>{" "}
                That sentence means more to me now than it did when I first
                heard it. Integrity is easy to talk about when other people are
                watching, when there is recognition involved, or when doing the
                right thing benefits you. The harder question is what you do
                when there is no reward, no attention, and no one nearby to hold
                you accountable. His example continues to shape the kind of man
                and professional I want to become.
              </p>
              <p>
                Growing up <strong>in and out of foster care</strong> shaped me
                in a different but equally important way. It gave me an early
                understanding of how institutions can affect a person’s life,
                especially when that person has very little control over the
                decisions being made around them. It also taught me not to
                compare suffering too easily. Someone’s worst experience is
                still their worst experience, even when another person has lived
                through something that may appear more severe from the outside.
                We rarely know the full weight another person is carrying, but
                we can still decide whether we treat them with patience,
                dignity, and respect. Those experiences could have pushed my
                life in several directions. Instead, they gave me a stronger
                sense of responsibility and a desire to build something
                meaningful from what I went through. I believe we are shaped by
                our circumstances, but we are not completely defined by them. We
                still have choices. That does not mean pretending hardship was
                good or acting as if pain automatically makes someone stronger.
                Sometimes hardship simply hurts. Strength comes from what a
                person decides to build afterward, the people they allow to
                support them, and their willingness to keep moving even when the
                path ahead is not completely clear. My faith has helped me hold
                onto that perspective. I often tell the people close to me that
                God gave us the moon as a reminder that there can still be light
                even when everything around us feels dark.
              </p>
              {/* LEFT IMAGE */}
              <img
                src={sbPublic(FLOAT_LEFT_1)}
                alt="Research, public service, and international affairs"
                loading="lazy"
                className="float-img left"
              />
              <p>
                That sense of responsibility is one of the main reasons I’m
                drawn toward foreign affairs and a future in the Foreign
                Service. I want to work on problems that are larger than one
                person, but I also understand that no individual solves those
                problems alone. Diplomacy, intelligence, and national security
                depend on teams, institutions, regional knowledge, and people
                who are willing to listen before they act. The United States
                needs professionals who can defend its interests without
                reducing every foreign society to a headline, stereotype, or
                political talking point. I want to become one of those
                professionals. My regional focus is Russia and Eastern Europe
                because the region brings together many of the questions I find
                most important. It involves security competition, national
                identity, historical memory, and the relationship between formal
                institutions and the power structures operating underneath them.
                Russia is also one of the clearest examples of how modern power
                can move through military pressure, diplomacy, energy,
                intelligence, and information at the same time. From my
                perspective, studying the region means looking past the
                immediate event and asking what caused it, who benefits, what
                weakness made it possible, and what may happen once public
                attention moves somewhere else.
              </p>
              <p>
                I’m studying <strong>Russian</strong> because language is part
                of taking a region seriously. Translation can tell you what
                someone said, but learning the language can help you better
                understand how an argument is framed, what references carry
                cultural meaning, and why certain ideas connect with an
                audience. I know learning Russian will take time and patience.
                That is part of the reason I value it. I want to engage more
                directly with Russian sources, communicate with people without
                always relying on another person’s interpretation, and
                understand the region on its own terms. I also hope to spend
                much of my professional life overseas, experiencing Eastern
                Europe beyond government reports, news coverage, and classroom
                summaries. I want to travel through its cities and smaller
                communities, speak with people from different political and
                cultural backgrounds, and understand how international decisions
                are experienced by the people who actually have to live with
                them. Policy can look very clean on paper. Life rarely does.
                Decisions made in capitals eventually reach ordinary people,
                families, businesses, and communities in ways that are often
                ignored during the initial debate. Being present, listening
                carefully, and remembering that people are always more
                complicated than their governments are necessary parts of
                serious diplomacy.
              </p>
              <p>
                Writing is one of the main ways I work through these questions.
                Through my <strong>Research Journal</strong>, I publish research
                and analysis on foreign affairs, political theory, technology,
                intelligence, and the systems beneath major public events. My
                goal is not to repeat whatever position is most popular in the
                moment. I want to examine how power actually operates, where
                institutions become weak, why well-intended policies fail, and
                what the long-term consequences of political decisions may be.
                My published and featured writing includes{" "}
                <strong>
                  “Markets Without Rules: Informal Networks and the Failure of
                  IMF Reform in Russia,”
                </strong>{" "}
                which examines how Soviet-era informal networks adapted to
                Russia’s post-Soviet economic transition;{" "}
                <strong>
                  “Strategic Proxies: Explaining Iran’s Support for Hezbollah
                  Through Realist Theory,”
                </strong>{" "}
                which studies proxy warfare through survival, deterrence, and
                regional influence; and{" "}
                <strong>“Pipelines and Democracy,”</strong> a quantitative study
                of Russian energy dependence and European political alignment,
                along with my ongoing{" "}
                <strong>Russian Affairs Research Project</strong>. International
                affairs is rarely a choice between one perfect solution and one
                obviously wrong answer. Most of the time, it is a matter of
                risk, timing, trade-offs, and consequences.
              </p>
              {/* RIGHT IMAGE */}{" "}
              <img
                src={sbPublic(FLOAT_RIGHT_2)}
                alt="Eastern European and Russian affairs research"
                loading="lazy"
                className="float-img right"
              />
              <p>
                Outside of school and work, I try to maintain a life that keeps
                me grounded. I enjoy reading widely, listening to music,
                lifting, spending time outdoors, traveling, trying unfamiliar
                food, and being around the people who have supported me. Family
                and close friendships matter a great deal to me. Long
                conversations, shared meals, good jokes, and the ability to
                laugh after a difficult week are not small things. They remind
                me what all the work is supposed to be for. I also care deeply
                about my country. Loving the United States does not mean
                pretending it is perfect or ignoring the times it has failed to
                live up to its own principles. From my perspective, patriotism
                means accepting some responsibility for helping the country
                become stronger, more honest, and more capable of meeting those
                principles. It means protecting what has worked, studying
                failures without hiding from them, and recognizing that
                authority should always come with accountability. Looking ahead,
                I want work that connects diplomacy, regional expertise,
                research, behavioral understanding, and disciplined analysis. I
                want to represent the United States professionally overseas,
                write analysis that people can actually use, and continue
                building the knowledge required to specialize in Russian and
                Eastern European affairs. know where I came from, and I know
                where I’m trying to go. The distance between those two places is
                not something I take for granted. A lot of what has shaped me
                came from difficult circumstances, but those experiences also
                gave me perspective, discipline, and a reason to keep moving
                forward. I don’t expect the path ahead to be simple. I expect it
                to test me, force me to grow, and require more patience than I
                probably realize right now. That being said, I’m ready for it. I
                want to build a life centered on service, integrity, curiosity,
                and work that matters beyond myself.
              </p>
              <p>
                If you have read this far, thank you for taking the time to
                learn a little more about me. I’m always open to a good
                conversation, especially when it involves international affairs,
                Russia, Eastern Europe, or the way the world is changing around
                us. At the same time, I’m just as happy talking about books,
                music, travel, good food, or sharing a plate of cheese while
                trying to make sense of everything going on. At the end of the
                day, I want to keep learning, represent my country with honor,
                and become someone others can rely on. I want the work I do and
                the way I carry myself to mean something.
              </p>
              <p>
                <strong>
                  Stay blessed. Stay you. <br />
                  This is infinite. We are infinite.
                </strong>
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
