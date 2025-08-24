import Head from "next/head";
import MetaHead from "../components/LandingPage/MetaHead.jsx";
import SvgHead from "../components/LandingPage/svgHead.jsx";
import Navbar from "../components/LandingPage/Navbar.jsx";
import Footer from "../components/LandingPage/Footer.jsx";

export default function PrivacyPolicy() {
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

  // tighter, modern type scale
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
        <title>Privacy Policy — Tobin Albanese</title>
      </Head>
      <MetaHead />
      <SvgHead />
      <div className="base d-flex">
        <Navbar />
        <main
          className="base__main"
          role="main"
          aria-labelledby="privacy-title"
        >
          <section style={panel}>
            <h1 id="privacy-title" style={h1}>
              Privacy Policy
            </h1>
            <small style={sub}>
              Last updated: {new Date().toLocaleDateString()}
            </small>

            <p style={p}>
              This Privacy Policy explains how we collect, use, and share
              information when you use tobinalbanese.com (the “Site”). By using
              the Site, you agree to this Policy.
            </p>

            <h2 style={h2}>1) Information We Collect</h2>
            <ul style={{ ...list, listStyle: "disc" }}>
              <li style={p}>
                <strong>Information you provide:</strong> your name, email, and
                message via forms (e.g., Contact, Newsletter).
              </li>
              <li style={p}>
                <strong>Usage data:</strong> basic analytics (pages viewed,
                device/browser, approximate location).
              </li>
              <li style={p}>
                <strong>Cookies:</strong> used for essential functionality and
                performance. Control via your browser settings.
              </li>
            </ul>

            <h2 style={h2}>2) How We Use Information</h2>
            <p style={p}>
              To operate and improve the Site, respond to inquiries, send
              optional emails you opted into, and maintain security.
            </p>

            <h2 style={h2}>3) Sharing</h2>
            <p style={p}>
              We don’t sell personal data. We may share limited data with
              vendors who help run the Site (e.g., email delivery) or if
              required by law.
            </p>

            <h2 style={h2}>4) Data Retention</h2>
            <p style={p}>
              We keep data only as long as needed for the purposes above or as
              required by law, then delete or anonymize it.
            </p>

            <h2 style={h2}>5) Your Choices</h2>
            <p style={p}>
              Request access/correction/deletion by emailing{" "}
              <a href="mailto:tobinalbanese1@gmail.com">
                tobinalbanese1@gmail.com
              </a>
              . Unsubscribe links are included in emails.
            </p>

            <h2 style={h2}>6) Third-Party Links</h2>
            <p style={p}>
              We link to third parties with their own policies—review those when
              you visit.
            </p>

            <h2 style={h2}>7) Children</h2>
            <p style={p}>
              The Site isn’t intended for children under 13. We don’t knowingly
              collect data from children.
            </p>

            <h2 style={h2}>8) Changes to This Policy</h2>
            <p style={p}>
              We may update this Policy. We’ll refresh the date above; continued
              use means you accept the changes.
            </p>

            <h2 style={h2}>9) Contact</h2>
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
