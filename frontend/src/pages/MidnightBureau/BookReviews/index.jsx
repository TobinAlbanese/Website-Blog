// pages/SpeakingMedia.jsx  (duplicate for /Collaborations)
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import MetaHead from "../../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../../components/LandingPage/svgHead.jsx";
import Footer from "../../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../../components/LandingPage/NavbarMB.jsx";

export default function SpeakingMedia() {
  return (
    <>
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

          <Head>
            <title>Speaking & Media — Midnight Bureau</title>
            <meta name="robots" content="noindex,follow" />
          </Head>
          <main
            style={{ maxWidth: 900, margin: "80px auto", padding: "0 24px" }}
          >
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
              Speaking & Media
            </h1>
            <p style={{ color: "var(--c-text-secondary)", marginTop: 12 }}>
              Keynotes, panels, interviews, and expert commentary. Full page
              coming soon.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link
                href="/Personal/Contact"
                style={{ textDecoration: "underline", fontWeight: 700 }}
              >
                Book an appearance →
              </Link>{" "}
              or see highlights on the{" "}
              <Link
                href="/Portfolio#speaking-&-media"
                style={{ textDecoration: "underline" }}
              >
                Portfolio page
              </Link>
              .
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
