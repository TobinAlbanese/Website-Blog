import React from "react";
import { publicImageUrl } from "../../lib/supabase/client"; // adjust if needed

export default function AboutMe() {
  const aboutImg =
    publicImageUrl("My-Bday.webp") || "/assets/images/My-Bday.webp";

  return (
    <section
      className="theme-accent"
      data-armstrong-id="wrapper"
      id=".home-section-current-issue"
    >
      <div className="row base__main pt-60 pb-40" data-armstrong-id="primary">
        <div className="col-12">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            About Me
          </h3>

          {/* Image centered above the text */}
          <div
            className="col-12 col-md-4 ml-auto mr-auto mb-30"
            data-armstrong-id="profile-image"
          >
            <a href="/Personal/About">
              <figure>
                <img
                  src={aboutImg}
                  alt="Photo of Family wedding"
                  loading="lazy"
                  className="about-img"
                  style={{
                    width: "100%",
                    maxWidth: 1250,
                    height: 500,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // if Supabase URL fails for any reason, drop to local fallback
                    e.currentTarget.src = "/assets/images/My-Bday.jpg";
                  }}
                />
              </figure>
            </a>
          </div>

          {/* Text below the image */}
          <div
            className="col-12 col-md-8 ml-auto mr-auto"
            data-armstrong-id="profile-text"
          >
            <p className="body-s mt-10">
              My name is Tobin Albanese, and I come from a small town with a
              strong desire to build a meaningful life and contribute to
              something larger than myself. Growing up was not always
              straightforward, but through every challenge, my curiosity about
              the world remained constant. As a child, I was always reading,
              asking questions, and trying to understand why people, societies,
              and things function the way they do. That curiosity
              continues to guide my academic and professional interests in
              political science, national security, counterterrorism, and human
              behavior. Today, I am focused on examining the forces that shape
              our world and exploring the intersections of politics, culture,
              technology, and human decision-making. My journey is still
              unfolding, and this website offers a closer look at the
              experiences that shaped me, the work I am pursuing, the ideas that
              drive me, and the goals I hope to achieve.
            </p>

            <a
              className="arrow-link border-bottom-thin border-bottom d-inline-block lh-22 fs-15 mt-20 c-accent"
              href="/Personal/About"
            >
              More about me here
              <svg className="arrow-link__icon">
                <use href="#icon-right-arrow" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
