// src/components/LandingSection.jsx
import React, { useEffect, useState } from "react";

export default function LandingSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
              <h1 className="heading-l mb-15">Welcome to Tobin Albanese's Space</h1>
              <p className="body-m">
                Hi, I'm Tobin Albanese — a student, writer, thinker, and creator behind the blog{" "}
                <em>Albanylitica</em>.
                <br />
                This space is where I share my insights on politics, culture, and the ideas that inspire me every day.
                Through thoughtful analysis and personal reflections, I aim to explore the complexities of the world around us and encourage meaningful conversations.
                <br />
                <br />
                In addition to the blog, this site also serves as a portfolio showcasing my current projects and work as I grow and learn in the fields I’m passionate about.
                Whether you’re here to read my latest thoughts or explore my portfolio, I hope you find something that resonates or sparks your curiosity.
                <br />
                <br />
                Thanks for visiting!
              </p>
            </div>

            {/* Right side: Your image */}
            <div
              className={`col-12 col-lg-6 d-flex justify-center ${
                animate ? "slide-in-right" : ""
              }`}
              data-armstrong-id="profile-image"
            >
              <img
                src="/assets/images/tobin&johnny.jpg"
                alt="Photo of Tobin Albanese"
                className="profile-image"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
