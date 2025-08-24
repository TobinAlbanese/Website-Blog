import React, { useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

const ACTION = process.env.NEXT_PUBLIC_MAILERLITE_ACTION || "";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const missingAction = !ACTION;

  const handleSubmit = (e) => {
    if (missingAction) {
      e.preventDefault();
      alert(
        "Set NEXT_PUBLIC_MAILERLITE_ACTION in .env.local, then restart `npm run dev`."
      );
      return;
    }
    // We submit to the hidden iframe; give immediate UX feedback.
    setSubmitted(true);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      {/* NAVBAR */}
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

          {/* Newsletter */}
          <section
            className="newsletter-section"
            style={{
              maxWidth: 900,
              margin: "0 auto 80px",
              padding: "40px 20px",
              border: "4px solid #b02621",
              borderRadius: 8,
              backgroundColor: "transparent",
              color: "var(--c-text)",
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: 20,
                color: "var(--c-text-primary)",
                lineHeight: 1.1,
              }}
            >
              Subscribe to{" "}
              <span style={{ color: "#b02621" }}>
                <em>Midnight Bureau</em>
              </span>
            </h2>

            <p
              style={{
                fontSize: 18,
                maxWidth: 700,
                margin: "0 auto 30px",
                color: "var(--c-text-secondary)",
                fontWeight: 400,
              }}
            >
              Get updates on new posts, essays, and book reviews at the
              intersection of politics, technology, and global affairs. No spam
              — just ideas worth reading.
            </p>

            {/* Hidden iframe target keeps the page in place after submit */}
            <iframe
              title="ml-submit"
              name="ml-submit"
              style={{ display: "none" }}
            />

            <form
              action={missingAction ? undefined : ACTION}
              method="post"
              target="ml-submit"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                marginTop: 30,
              }}
            >
              {/* Honeypot anti-bot field (kept off-screen) */}
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input tabIndex={-1} name="hp_field" autoComplete="off" />
              </div>

              <label
                htmlFor="ml-email"
                style={{
                  fontSize: 16,
                  color: "var(--c-text-secondary)",
                  fontWeight: 500,
                }}
              >
                Email address
              </label>

              {/* IMPORTANT: MailerLite default embedded field name */}
              <input
                type="email"
                id="ml-email"
                name="fields[email]"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: 420,
                  padding: "12px 16px",
                  fontSize: 16,
                  borderRadius: 6,
                  border: "1px solid #b02621",
                  backgroundColor: "transparent",
                  color: "var(--c-text)",
                  fontFamily: "inherit",
                }}
              />

              {/* Some ML embeds include this hidden flag */}
              <input type="hidden" name="ml-submit" value="1" />

              <button
                type="submit"
                disabled={submitted && !missingAction}
                style={{
                  backgroundColor: "#d62827",
                  color: "var(--c-button-text, #fff)",
                  border: "none",
                  borderRadius: 6,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "transform .06s ease, background-color .2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b02621")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d62827")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "translateY(1px)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {submitted ? "Check your inbox" : "Subscribe"}
              </button>

              {submitted && !missingAction && (
                <small
                  role="status"
                  style={{
                    marginTop: 8,
                    color: "var(--c-text-secondary)",
                    fontWeight: 400,
                  }}
                >
                  Thanks! If double opt-in is enabled, please confirm via the
                  email we just sent.
                </small>
              )}

              {missingAction && (
                <small
                  style={{
                    marginTop: 8,
                    color: "var(--c-text-secondary)",
                    fontWeight: 400,
                  }}
                >
                  Dev note: set <code>NEXT_PUBLIC_MAILERLITE_ACTION</code> in{" "}
                  <code>.env.local</code>, then restart <code>next dev</code>.
                </small>
              )}

              <small
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  color: "var(--c-text-secondary)",
                  fontWeight: 400,
                }}
              >
                You can unsubscribe anytime.
              </small>
            </form>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
