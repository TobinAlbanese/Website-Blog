// components/LandingPage/LandingSection.jsx (or Hero.jsx)
import React, { useEffect, useState } from "react";
import { publicImageUrl } from "../../lib/supabase/client";
// 👆 adjust the relative path ("../../") if your folder structure is different

export default function LandingSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const heroImageSrc = publicImageUrl("Tobin-Johnny.webp");

  return (
    <section className="c-bg" data-armstrong-id="wrapper">
      <div
        className="row base__main pt-20 pt-md-30 pt-lg-60 pb-10 pb-md-25 pb-lg-40"
        data-armstrong-id="primary"
      >
        <div className="col-12">
          <div className="row justify-between d-flex" data-armstrong-id="row">
            {/* Left side: Personal message */}
            <div
              className={`col-12 col-lg-6 mb-20 mb-lg-0 d-flex flex-column justify-center ${
                animate ? "slide-in-left" : ""
              }`}
              data-armstrong-id="personal-message"
            >
              <h1 className="heading-l mb-15">
                Welcome to <br />
                Tobin Albanese&apos;s space
              </h1>
              <p
                className="body-m c-text-secondary"
                style={{ fontSize: 18, lineHeight: 1.6 }}
              >
                Hi, I&apos;m Tobin Albanese — a student, researcher, writer, and
                developer with interests in politics, international affairs,
                national security, technology, and human behavior.
                <br />
                <br />
                <em>Research Journal</em> is my independent publication and
                personal archive for research, analysis, commentary, and ongoing
                projects. It is where I explore complex issues, document what I
                am learning, and share work that reflects my academic,
                professional, and intellectual interests.
                <br />
                <br />
                This website also serves as my portfolio, bringing together my
                writing, research, technical projects, education, and
                professional experience. Whether you are here to read my latest
                work or learn more about what I do. 
                <br />
                <br />
                I hope you find the content here informative, thought-provoking,
                and engaging. Thank you for visiting!
              </p>
            </div>

            {/* Right side: Your image from Supabase public-images */}
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
