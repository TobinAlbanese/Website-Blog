// components/LandingPage/LandingSection.jsx

import React, { useEffect, useMemo, useState } from "react";

import { publicImageUrl } from "../../lib/supabase/client";

/* -------------------------------------------------
   TITLE ANIMATION
------------------------------------------------- */

function useWordAnimatedText(
  text,
  baseDelay = 0.08,
  charClass = "type-char-title",
  startDelay = 0,
) {
  return useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let i = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) {
        return <span key={`sp-${idx}`}>{tok}</span>;
      }

      const chars = tok.split("").map((ch) => {
        const key = `c-${i++}`;

        return (
          <span
            key={key}
            className={charClass}
            style={{
              animationDelay: `${startDelay + i * baseDelay}s`,
            }}
          >
            {ch}
          </span>
        );
      });

      return (
        <span
          key={`w-${idx}`}
          style={{
            display: "inline-block",
          }}
        >
          {chars}
        </span>
      );
    });
  }, [text, baseDelay, charClass, startDelay]);
}

/* -------------------------------------------------
   PARAGRAPH / HIGHLIGHT ANIMATION
------------------------------------------------- */

function useWordSpanizedText(
  text,
  baseDelay = 0.01,
  charClass = "type-char",
  startDelay = 0,
) {
  return useMemo(() => {
    const tokens = text.split(/(\s+)/);
    let t = 0;

    return tokens.map((tok, idx) => {
      if (/^\s+$/.test(tok)) {
        return <span key={`sp-${idx}`}>{tok}</span>;
      }

      const chars = tok.split("").map((ch, j) => {
        t += 1;

        return (
          <span
            key={`c-${idx}-${j}`}
            className={charClass}
            style={{
              animationDelay: `${startDelay + t * baseDelay}s`,
            }}
          >
            {ch}
          </span>
        );
      });

      return (
        <span
          key={`w-${idx}`}
          style={{
            display: "inline-block",
          }}
        >
          {chars}
        </span>
      );
    });
  }, [text, baseDelay, charClass, startDelay]);
}

/* -------------------------------------------------
   LANDING HERO
------------------------------------------------- */

export default function LandingSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const heroImageSrc = publicImageUrl("Tobin-Johnny.webp");

  /* -------------------------
     HERO TEXT
  ------------------------- */

  const name = useWordAnimatedText(
    "Tobin Albanese",
    0.08,
    "type-char-title",
    0,
  );

  const role = useWordSpanizedText(
    "Security & Intelligence Researcher",
    0.025,
    "type-char",
    0.6,
  );

  const paragraphOne = useWordSpanizedText(
    "I am a student and researcher whose work is centered on terrorism, intelligence, and international security, with a strong interest in understanding how states, organizations, and non-state actors respond to threats, exercise power, and operate in complex security environments.",
    0.008,
    "type-char",
    1.15,
  );

  const paragraphTwo = useWordSpanizedText(
    "A major focus of my research is Russia and Eastern Europe, particularly Russian state affairs, regional security, political influence, and the strategic relationships shaping competition across the region.",
    0.008,
    "type-char",
    2.5,
  );

  const paragraphThree = useWordSpanizedText(
    "Across my work, I use academic research, open-source intelligence, data analysis, and technical tools to examine how actors behave, how networks are structured, and what those patterns can reveal about broader political and security developments.",
    0.008,
    "type-char",
    3.6,
  );

  return (
    <section className="c-bg" data-armstrong-id="wrapper">
      <div
        className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
        data-armstrong-id="primary"
      >
        <div className="col-12">
          <div className="row justify-between d-flex" data-armstrong-id="row">
            {/* LEFT SIDE */}

            <div
              className="col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center"
              data-armstrong-id="personal-message"
              style={{
                position: "relative",
                isolation: "isolate",
                zIndex: 2,
                paddingRight: 16,
                minWidth: 0,
              }}
            >
              <h1
                className="heading-l mb-8"
                style={{
                  fontFamily: "inherit",
                  overflow: "visible",
                  color: "var(--c-text)",
                }}
              >
                {name}
              </h1>

              <p
                className="c-text-secondary mb-20"
                style={{
                  fontSize: 16,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {role}
              </p>

              <p
                className="body-m c-text-secondary"
                style={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  maxWidth: "640px",
                  marginBottom: "1em",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {paragraphOne}
              </p>

              <p
                className="body-m c-text-secondary"
                style={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  maxWidth: "640px",
                  marginBottom: "1em",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {paragraphTwo}
              </p>

              <p
                className="body-m c-text-secondary"
                style={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  maxWidth: "640px",
                  marginBottom: 0,
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {paragraphThree}
              </p>
            </div>

            {/* RIGHT SIDE */}

            <div
              className={`col-12 col-lg-6 d-flex justify-center ${
                animate ? "slide-in-right" : ""
              } home-hero-media`}
              data-armstrong-id="profile-image"
            >
              <img
                src={heroImageSrc}
                alt="Photo of Tobin Albanese"
                className="profile-image home-hero-img"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
