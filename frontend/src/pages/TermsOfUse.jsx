import Head from "next/head";
import MetaHead from "../components/LandingPage/MetaHead.jsx";
import SvgHead from "../components/LandingPage/svgHead.jsx";
import Navbar from "../components/LandingPage/Navbar.jsx";
import Footer from "../components/LandingPage/Footer.jsx";

export default function TermsOfUse() {
  const panel = {
    maxWidth: 820,
    margin: "0 auto 72px",
    padding: "24px",
    border: "3px solid var(--c-accent)",
    borderRadius: 10,
    backgroundColor: "var(--c-bg)",
    color: "var(--c-text)",
    fontFamily: "inherit",
  };

  const h1 = {
    margin: "0 0 6px",
    fontWeight: 600,
    fontSize: "clamp(1.4rem, 1.4rem + 0.5vw, 1.9rem)",
  };
  const sub = {
    color: "var(--c-text-secondary)",
    marginBottom: 16,
    display: "block",
    fontSize: 14,
  };
  const h2 = {
    marginTop: 22,
    marginBottom: 8,
    fontWeight: 600,
    fontSize: "1.05rem",
  };
  const p = { margin: "8px 0", lineHeight: 1.55, fontSize: 15.5 };
  const list = { paddingLeft: 18, margin: "8px 0" };

  return (
    <>
      <Head>
        <title>Terms of Use — Tobin Albanese</title>
      </Head>
      <MetaHead />
      <SvgHead />
      <div className="base d-flex">
        <Navbar />
        <main className="base__main" role="main" aria-labelledby="terms-title">
          <section style={panel}>
            <h1 id="terms-title" style={h1}>
              Terms of Use
            </h1>
            <small style={sub}>
              Last updated: {new Date().toLocaleDateString()}
            </small>

            <p style={p}>
              These Terms govern your use of tobinalbanese.com (the “Site”). By
              accessing or using the Site, you agree to these Terms.
            </p>

            <h2 style={h2}>1) Use of the Site</h2>
            <p style={p}>
              You agree not to misuse the Site (e.g., disrupt service, breach
              security, or violate laws/third-party rights).
            </p>

            <h2 style={h2}>2) Accounts & Submissions</h2>
            <ul style={{ ...list, listStyle: "disc" }}>
              <li style={p}>
                You’re responsible for your content and keeping login
                credentials secure.
              </li>
              <li style={p}>
                Do not post unlawful, harmful, or infringing content.
              </li>
            </ul>

            <h2 style={h2}>3) Intellectual Property</h2>
            <p style={p}>
              All Site content is owned by or licensed to us. Don’t reproduce or
              distribute without permission unless permitted by law.
            </p>

            <h2 style={h2}>4) Third-Party Links</h2>
            <p style={p}>
              We’re not responsible for third-party sites/services linked from
              the Site.
            </p>

            <h2 style={h2}>5) Disclaimers</h2>
            <p style={p}>
              The Site is provided “as is,” without warranties of any kind. Use
              at your own risk.
            </p>

            <h2 style={h2}>6) Limitation of Liability</h2>
            <p style={p}>
              To the fullest extent permitted by law, we’re not liable for
              indirect, incidental, or consequential damages.
            </p>

            <h2 style={h2}>7) Indemnification</h2>
            <p style={p}>
              You agree to indemnify us for claims arising from your misuse of
              the Site or violation of these Terms.
            </p>

            <h2 style={h2}>8) Changes</h2>
            <p style={p}>
              We may modify these Terms. Continued use after changes means you
              accept the updated Terms.
            </p>

            <h2 style={h2}>9) Governing Law</h2>
            <p style={p}>
              These Terms are governed by the laws of your jurisdiction (update
              as appropriate).
            </p>

            <h2 style={h2}>10) Contact</h2>
            <p style={p}>
              Questions?{" "}
              <a href="mailto:tobinalbanese1@gmail.com">
                tobinalbanese1@gmail.com
              </a>
            </p>

            <p
              style={{
                ...p,
                marginTop: 16,
                fontSize: 13,
                color: "var(--c-text-secondary)",
              }}
            >
              This page is general information and not legal advice.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
