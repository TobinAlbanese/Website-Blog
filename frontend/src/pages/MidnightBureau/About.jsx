import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

export default function About() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const rightImage = document.getElementById("about-image-right");
      const leftImage = document.getElementById("about-image-left");

      if (rightImage) {
        const rectRight = rightImage.getBoundingClientRect();
        if (rectRight.top < window.innerHeight * 0.8) setVisibleRight(true);
      }
      if (leftImage) {
        const rectLeft = leftImage.getBoundingClientRect();
        if (rectLeft.top < window.innerHeight * 0.8) setVisibleLeft(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // check immediately on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <>
        <Head>
          <title>MetaHead</title>
          <meta charSet="utf-8" />
        </Head>

        <MetaHead />
      </>
      <>
        <Head>
          <title>svgHead</title>
          <meta charSet="utf-8" />
        </Head>

        <SvgHead />
      </>

      {/*NAVBAR*/}
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
        <div className="base d-flex">
        <NavbarMB />

          <section
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: 40,
              fontFamily: "inherit",
            }}
          >
            {/* First section: text left, image right */}
            <div
              style={{
                display: "flex",
                gap: 40,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "600",
                    marginBottom: 10,
                  }}
                >
                  My Story...
                </h1>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I’m Tobin Albanese, a Computer Science student at Sacramento
                  State University with a deep interest in global intelligence
                  and national security. My academic path is grounded in
                  technical learning—software development, data systems, and
                  machine logic—yet it’s also shaped by a broader passion for
                  understanding how technology influences geopolitics, security
                  strategy, and international conflict.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I bring an interdisciplinary mindset to my work, combining
                  computer science with a growing knowledge base in political
                  science, cybersecurity, and international relations. I’m
                  fascinated by the ways in which emerging technologies are
                  transforming both modern warfare and diplomacy, and how
                  technical expertise can be used to improve intelligence
                  gathering, threat analysis, and strategic decision-making.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  Outside the classroom, I’m always learning—listening to
                  experts, reading across disciplines, and keeping a close eye
                  on global developments. Midnight Bureau is my way of
                  organizing those insights into something valuable for others.
                  It’s a space where I reflect, analyze, and contribute to the
                  public conversation on security, technology, and the future of
                  global affairs.
                </p>
              </div>

              <img
                id="about-image-right"
                src="/assets/images/tnjt.jpg"
                alt="Tobin Albanese"
                style={{
                  width: 250,
                  height: "100%",
                  borderRadius: 16,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  opacity: visibleRight ? 1 : 0,
                  transform: visibleRight
                    ? "translateX(0)"
                    : "translateX(50px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              />
            </div>

            {/* Main body section */}
            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              <p style={{ color: "var(--c-text-secondary)" }}>
                When I’m not immersed in academic work, I dedicate time to deep,
                consistent learning. I explore the connections between
                international relations, cybersecurity, digital warfare, and
                emerging technologies. I believe that staying informed isn't
                just a professional necessity—it’s a way of staying
                intellectually sharp and socially engaged. Whether it’s reading
                foreign policy journals, studying cyber law, or dissecting new
                innovations in AI, I seek out the knowledge that helps me think
                critically and strategically.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                My engagement with global affairs is personal and ongoing. I
                track the latest developments in national security, follow tech
                policy, and try to understand the shifting architecture of
                global power. What excites me is not just the “what” of world
                events, but the “why” behind them—and how we can respond more
                intelligently.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Midnight Bureau was created to be a reflection of that drive.
                It’s not just a blog—it’s an evolving portfolio of insight,
                research, and strategic thinking. Here, I translate complexity
                into clarity. I write to understand, and I write to connect—with
                readers who want more than surface-level takes on the forces
                shaping our world.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Whether I’m unpacking the global impact of AI regulation or
                analyzing hybrid warfare tactics, my goal is to bring attention
                to the overlooked, the emerging, and the critically important.
                The platform is also a space to challenge assumptions and build
                a community of informed readers who value depth over
                distraction.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Ultimately, Midnight Bureau is about bridging the gap between
                technical knowledge and public awareness. It’s where I turn
                rigorous research into accessible stories and spark
                conversations about the future of intelligence, governance, and
                global stability. In an age where information is abundant but
                insight is rare, I aim to offer the latter.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Because in the end, intelligence isn’t just about collecting
                data—it’s about seeing what others don’t. It’s about asking the
                right questions before the world knows they matter. Through this
                platform, I’m not just tracking the future—I’m training to
                understand it. And if you’re here reading, maybe you are too.
              </p>
            </div>

            {/* Later section: image left, text right */}
            <div
              style={{
                display: "flex",
                gap: 40,
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <img
                id="about-image-left"
                src="/assets/images/AfroTob.jpg"
                alt="Tobin Albanese"
                style={{
                  width: 400,
                  borderRadius: 16,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  opacity: visibleLeft ? 1 : 0,
                  transform: visibleLeft
                    ? "translateX(0)"
                    : "translateX(-50px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              />

              <div style={{ flex: 1, fontSize: 18, lineHeight: 1.6 }}>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  A core focus of my research is how non-state actors operate in
                  the digital realm—and how governments adapt to those
                  asymmetric threats. As new platforms, tools, and technologies
                  emerge, threat actors evolve rapidly. Understanding how these
                  changes affect national defense, cybersecurity, and policy
                  response is at the center of my work.
                </p>
                <p style={{ color: "var(--c-text-secondary)" }}>
                  I also believe that communicating complex issues clearly is a
                  public service. Whether I’m breaking down policy implications,
                  exploring historical context, or connecting disparate trends,
                  my intent is always the same: make knowledge meaningful and
                  actionable. My writing aims to bridge the space between
                  research and real-world relevance.
                </p>
              </div>
            </div>

            {/* Final closer */}
            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Outside of research, I stay grounded through a lifelong
                curiosity and a deep respect for learning. I’m constantly
                observing, listening, and reflecting on how the world is
                changing—and how we can meet those changes with clarity and
                courage. Midnight Bureau is the product of that ongoing journey.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                This platform reflects not only my personal interests, but also
                a broader mission: to contribute to the growing need for
                strategic, informed voices in the public arena. We live in a
                time when our greatest challenges—cybersecurity, misinformation,
                global instability—require new forms of literacy and leadership.
              </p>
              <p style={{ color: "var(--c-text-secondary)" }}>
                Through Midnight Bureau, I strive to be a part of that solution.
                I hope to connect with others who share a passion for truth,
                analysis, and intelligent discourse. Because in the field of
                intelligence, what you know matters—but what you can see before
                it happens? That’s what shapes the future.
              </p>
            </div>
          </section>

          {/* Footer */}
          <>
            <Head>
              <title>Tobin Albanese</title>
              <meta charSet="utf-8" />
            </Head>

            <Footer />
          </>
        </div>
      </div>
    </>
  );
}
