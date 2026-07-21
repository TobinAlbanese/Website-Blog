import Head from "next/head";
import React, { useEffect, useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

const socialLinks = [
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/MidnightBureau",
    desc: "Join the Research Journal conversation on Reddit.",
    icon: "#icon-reddit",
  },
  {
    name: "X",
    url: "https://x.com/TobinAlbanese",
    desc: "Follow me on X for quick thoughts.",
    icon: "#icon-twitter",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tobin_albanese/",
    desc: "See behind the scenes on Instagram.",
    icon: "#icon-instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tobinalbanese/",
    desc: "Professional updates on LinkedIn.",
    icon: "#icon-linkedin",
  },
  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/profile/Tobin-Albanese",
    desc: "Read my research work on ResearchGate.",
    icon: "#icon-researchgate",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@MidnightBureau-TA",
    desc: "Watch Research Journal videos and updates.",
    icon: "#icon-youtube",
  },
  {
    name: "Spotify",
    url: "https://www.spotify.com/MidnightBureau",
    desc: "Listen to the Research Journal podcast.",
    icon: "#icon-spotify",
  },
  {
    name: "GitHub",
    url: "https://github.com/TobinAlbanese",
    desc: "Check out my code and projects on GitHub.",
    icon: "#icon-github",
  },
];

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
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

          {/* Main bordered section */}
          <section
            className="contact-section"
            style={{
              maxWidth: 900,
              margin: "0 auto 80px",
              padding: "30px 20px",
              border: `4px solid var(--c-accent)`,
              borderRadius: 8,
              fontWeight: 600,
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 1.2s ease-in",
              color: "var(--c-text)",
              backgroundColor: "var(--c-bg)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 40,
                flexWrap: "wrap",
                minHeight: 500,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Left side: Contact Form */}
              <form
                style={{
                  flex: 1,
                  minWidth: 320,
                  border: `2px solid var(--c-accent)`,
                  borderRadius: 8,
                  backgroundColor: "var(--c-bg)",
                  padding: 20,
                  color: "var(--c-text)",
                  fontFamily: "inherit",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent! (demo)");
                  e.target.reset();
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    color: "var(--c-text)",
                    fontFamily: "inherit",
                  }}
                >
                  Get in Touch
                </h2>
                <p
                  style={{
                    marginBottom: 40,
                    fontWeight: 400,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  Whether you have questions, want to collaborate, or just to
                  say hello, feel free to drop me a message below!
                </p>

                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    fontFamily: "inherit",
                  }}
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                  }}
                />

                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    FontFamily: "inherit",
                  }}
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                  }}
                />

                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                    FontFamily: "inherit",
                  }}
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--c-accent)",
                    color: "var(--c-button-text)",
                    border: "none",
                    borderRadius: 4,
                    padding: "12px 24px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 16,
                    transition: "background-color 0.3s ease",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--c-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--c-accent)")
                  }
                >
                  Send Message
                </button>
              </form>

              {/* Right side: Socials with descriptions */}
              <aside
                style={{
                  flex: 1,
                  minWidth: 280,
                  fontSize: 18,
                  lineHeight: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--c-text-secondary)",
                  fontFamily: "inherit",
                }}
              >
                <h3
                  style={{
                    marginBottom: 20,
                    fontWeight: 600,
                    color: "var(--c-text)",
                    fontFamily: "inherit",
                  }}
                >
                  Find Me Online
                </h3>

                <div style={{ width: "100%" }}>
                  {socialLinks.map(({ name, url, desc, icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 18,
                        color: "var(--c-text-secondary)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--c-border)",
                        paddingBottom: 10,
                        fontWeight: 600,
                        fontFamily: "inherit",
                      }}
                      aria-label={name}
                    >
                      <svg
                        viewBox="0 0 15 15"
                        width={28}
                        height={28}
                        fill="currentColor"
                        style={{ marginRight: 12, flexShrink: 0 }}
                      >
                        <use href={icon} />
                      </svg>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 4,
                            color: "var(--c-text)",
                          }}
                        >
                          {name}
                        </div>
                        <small
                          style={{
                            fontWeight: 400,
                            color: "var(--c-text-secondary)",
                            fontSize: 14,
                            lineHeight: 1.3,
                          }}
                        >
                          {desc}
                        </small>
                      </div>
                    </a>
                  ))}
                </div>
              </aside>
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
