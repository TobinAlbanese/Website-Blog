import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import Navbar from "../../components/LandingPage/Navbar.jsx";

const socialLinks = [
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/MidnightBureau",
    desc: "Join the Midnight Bureau conversation on Reddit.",
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
    desc: "Watch Midnight Bureau videos and updates.",
    icon: "#icon-youtube",
  },
  {
    name: "Spotify",
    url: "https://www.spotify.com/MidnightBureau",
    desc: "Listen to the Midnight Bureau podcast.",
    icon: "#icon-spotify",
  },
  {
    name: "GitHub",
    url: "https://github.com/TobinAlbanese",
    desc: "Check out my code and projects on GitHub.",
    icon: "#icon-github",
  },
];

// --- EmailJS env + guard ---
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const MISSING_KEYS = !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY;
if (typeof window !== "undefined") {
  // Build-time replacement in client bundle
  // Will be true/false depending on env presence at dev-server start / build time
  // eslint-disable-next-line no-console
  console.log("EmailJS env loaded?", {
    SERVICE_ID: !!SERVICE_ID,
    TEMPLATE_ID: !!TEMPLATE_ID,
    PUBLIC_KEY: !!PUBLIC_KEY,
  });
}

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" }); // kept for dev-only inline banner
  const formRef = useRef(null);

  // Success/Error dialog state
  const [dialog, setDialog] = useState({
    open: false,
    kind: /** @type {"success"|"error"} */ ("success"),
    title: "",
    body: "",
  });
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll & ESC to close when dialog is open
  useEffect(() => {
    if (!dialog.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setDialog((d) => ({ ...d, open: false }));
    };
    document.addEventListener("keydown", onKey);

    // focus the primary close button when the dialog opens
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus?.();
    });

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [dialog.open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const honeypot = formRef.current?.elements["company"]?.value;
    if (honeypot) return; // bot

    setSending(true);
    setStatus({ type: "", msg: "" });

    try {
      const fd = new FormData(formRef.current);
      const submitted_at = new Date().toLocaleString();

      // (optional) also place timestamp into the hidden input for completeness
      const tsEl = formRef.current.elements["submitted_at"];
      if (tsEl) tsEl.value = submitted_at;

      // Send explicit variables to ensure template fields populate
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fd.get("from_name") || "",
          from_email: fd.get("from_email") || "",
          message: fd.get("message") || "",
          to_name: fd.get("to_name") || "Tobin Albanese",
          submitted_at,
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus({ type: "success", msg: "" });
      setDialog({
        open: true,
        kind: "success",
        title: "Thanks — message sent!",
        body: "Thanks for reaching out — I’ll be in touch with you shortly.",
      });
      formRef.current.reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setStatus({ type: "error", msg: "" });
      setDialog({
        open: true,
        kind: "error",
        title: "Something went wrong",
        body: "Please try again in a minute or email me directly at tobinalbanese1@gmail.com.",
      });
    } finally {
      setSending(false);
    }
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
                ref={formRef}
                onSubmit={handleSubmit}
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
                    marginBottom: 24,
                    fontWeight: 400,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  Whether you have questions, want to collaborate, or just to
                  say hello, feel free to drop me a message below!
                </p>

                {/* Hidden values for EmailJS template */}
                <input type="hidden" name="to_name" value="Tobin Albanese" />
                <input type="hidden" name="submitted_at" />

                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 16,
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
                  }}
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 16,
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
                    marginBottom: 20,
                    borderRadius: 4,
                    border: `1px solid var(--c-input-border)`,
                    fontSize: 16,
                    color: "var(--c-text)",
                    backgroundColor: "var(--c-bg-primary)",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />

                {process.env.NODE_ENV !== "production" && status.msg && (
                  <div
                    role="status"
                    style={{
                      marginBottom: 12,
                      fontWeight: 600,
                      color:
                        status.type === "success"
                          ? "var(--c-success, #27ae60)"
                          : "var(--c-danger, #e74c3c)",
                    }}
                  >
                    {status.msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending || MISSING_KEYS}
                  style={{
                    backgroundColor: "var(--c-accent)",
                    color: "var(--c-button-text)",
                    border: "none",
                    borderRadius: 4,
                    padding: "12px 24px",
                    cursor: sending ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: 16,
                    transition: "opacity 0.2s ease",
                    opacity: sending ? 0.8 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>

                {process.env.NODE_ENV !== "production" && MISSING_KEYS && (
                  <small
                    style={{
                      display: "block",
                      marginTop: 8,
                      color: "var(--c-text-secondary)",
                    }}
                  >
                    Set NEXT_PUBLIC_EMAILJS_* in .env.local, then restart the
                    dev server.
                  </small>
                )}
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

          {/* Dialog (modal) */}
          {dialog.open && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
              aria-describedby="contact-dialog-desc"
              onClick={() => setDialog((d) => ({ ...d, open: false }))}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                padding: 16,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "min(520px, 92vw)",
                  borderRadius: 12,
                  border: "1px solid var(--c-border, rgba(255,255,255,0.15))",
                  background: "var(--c-bg, #0b0b0b)",
                  color: "var(--c-text, #fff)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "inline-grid",
                      placeItems: "center",
                      background:
                        dialog.kind === "success"
                          ? "var(--c-success, #27ae60)"
                          : "var(--c-danger, #e74c3c)",
                      color: "white",
                      fontWeight: 800,
                    }}
                  >
                    {dialog.kind === "success" ? "✓" : "!"}
                  </span>
                  <h2
                    id="contact-dialog-title"
                    style={{ margin: 0, fontSize: 20, lineHeight: 1.2 }}
                  >
                    {dialog.title}
                  </h2>
                </div>

                <p
                  id="contact-dialog-desc"
                  style={{
                    marginTop: 0,
                    marginBottom: 16,
                    color: "var(--c-text-secondary)",
                  }}
                >
                  {dialog.body}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setDialog((d) => ({ ...d, open: false }))}
                    style={{
                      border: "1px solid var(--c-border)",
                      background: "transparent",
                      color: "var(--c-text)",
                      borderRadius: 6,
                      padding: "10px 16px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    ref={closeBtnRef}
                    onClick={() => setDialog((d) => ({ ...d, open: false }))}
                    style={{
                      border: "none",
                      background: "var(--c-accent)",
                      color: "var(--c-button-text)",
                      borderRadius: 6,
                      padding: "10px 16px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <>
            <Head>
              <title>Tobin Albanese — Contact</title>
              <meta charSet="utf-8" />
            </Head>
            <Footer />
          </>
        </div>
      </div>
    </>
  );
}
