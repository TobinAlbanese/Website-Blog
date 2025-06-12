import React from 'react';
export default function AboutMe() {
  return (
    <>
    <section className="theme-accent" data-armstrong-id="wrapper" id=".home-section-current-issue">
      <div className="row base__main pt-60 pb-40" data-armstrong-id="primary">
        <div className="col-12">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">About Me</h3>
          <h3 className="fs-18 mb-15 mb-25 fs-md-16" data-armstrong-id="module_subtitle">
            I’m a seeker of stories, a believer in growth, and someone who finds meaning in every question asked and every answer pursued</h3>

          {/* Image centered above the text */}
          <div className="col-12 col-md-4 ml-auto mr-auto mb-30" data-armstrong-id="profile-image">
            <a href="/about">
              <figure>
                <img
                  src="/assets/images/AboutMePhoto.jpg"
                  alt="Photo of Family wedding"
                  loading="lazy"
                  style={{ width: "100%", maxWidth: 1600, height: 600, borderRadius: 8 }}
                />
              </figure>
            </a>
          </div>

          {/* Text below the image */}
          <div className="col-12 col-md-8 ml-auto mr-auto" data-armstrong-id="profile-text">
            <p className="body-s mt-10">
            My name is Tobin Albanese, a small-town kid driven by the desire to make something meaningful of 
            myself. Growing up was a bit of a rollercoaster, but through it all, my curiosity about the world never faded. 
            As a child, I constantly wondered about everything, devouring books and asking questions about how 
            things truly worked. This curiosity has been a constant companion, guiding me toward a career in 
            political science and counterterrorism. Today, I’m focused on unraveling the complexities of our world & exploring
            the intersections of politics, culture, and human behavior. This journey is just beginning, 
            and I invite you to discover the story behind my past, my goals, my passions, and what truly lies ahead not just for myself but the world around us.
            </p>
            <a
              className="arrow-link border-bottom-thin border-bottom d-inline-block lh-22 fs-15 mt-20 c-accent"
              href="/about"
            >
              More about me here
              <svg className="arrow-link__icon ">
                <use href="#icon-right-arrow" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
