import React from 'react';
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from '../../components/LandingPage/Footer.jsx';
import NavbarMB from '../../components/LandingPage/NavbarMB.jsx';
export default function Newsletter() {
  return (
<>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <MetaHead />
            <SvgHead />







{/*NAVBAR*/}
  <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
    <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
      <div id="js-dfp-tag-top--2"></div>
    </div>
    <div id="js-dfp-tag-outofpage--2"></div>
    <div className="base d-flex">
      <NavbarMB />
    


    








    <section
  className="newsletter-section"
  style={{
    maxWidth: 900,
    margin: "0 auto 80px",
    padding: "40px 20px",
    border: "4px solid #b02621", // red border
    borderRadius: 8,
    backgroundColor: "transparent",
    color: "var(--color-text-secondary)",
    textAlign: "center",
    fontWeight: 600,
    fontFamily: "inherit",
  }}
>
  <h2 style={{ fontSize: "2.5rem", marginBottom: 20, color: "var(c-text-primary"}}>
    Subscribe to <span style={{ color: "#b02621" }}><em>Midnight Bureau</em></span>
  </h2>
  <p style={{ fontSize: 18, maxWidth: 700, margin: "0 auto 30px", color: "var(--c-text-secondary)" }}>
    Get updates on my latest posts, essays, and book reviews exploring the intersections of politics, technology, and global affairs.
    No spam — just ideas worth reading.
  </p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert("Subscribed! (demo)");
      e.target.reset();
    }}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      marginTop: 30,
    }}
  >
    <label htmlFor="email" style={{ fontSize: 16, color: "var(--c-text-secondary)" }}>
      Email Address below please!
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="you@example.com"
      style={{
        width: "100%",
        maxWidth: 400,
        padding: "12px 16px",
        fontSize: 16,
        borderRadius: 4,
        border: "1px solid #b02621", // red border
        backgroundColor: "transparent",
        color: "#000000",
        fontFamily: "inherit",
      }}
    />
    <button
      type="submit"
      style={{
        backgroundColor: "#d62827",
        color: "var(--color-text-primary)",
        border: "none",
        borderRadius: 4,
        padding: "12px 24px",
        fontWeight: 700,
        fontSize: 16,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b02621")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d62827")}
    >
      Subscribe
    </button>
  </form>

<small style={{ marginTop: 10, fontSize: 14, color: "var(--c-text-secondary)" }}>
  You can unsubscribe anytime.
</small>
</section>

        <Footer />

    </div>
  </div>
</>
  );
} 