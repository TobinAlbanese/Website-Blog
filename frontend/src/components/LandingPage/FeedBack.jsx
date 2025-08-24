import React, { useState, useEffect, useRef } from "react";

export default function Feedback() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:tobinalbanese1@gmail.com?subject=Website%20Feedback&body=${encodeURIComponent(feedback)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setFeedback("");
  };

  return (
    <>
      {/* ⛔ no c-bg here, so background doesn't go full-bleed */}
      <section
        ref={sectionRef}
        id="feedback-section"
        className={`${visible ? "slide-in-up" : "hidden"}`}
        data-armstrong-id="wrapper"
      >
        {/* ✅ put c-bg on the constrained container */}
        <div
          className="c-bg"
          style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 16px" }}
        >
          <div
            className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60 ml-0 mr-0"
            data-armstrong-id="primary"
          >
            <div className="col-12">
              <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
                Feedback
              </h3>
              <h3
                className="fs-18 mb-15 mb-25 fs-md-16"
                data-armstrong-id="module_subtitle"
              >
                Please feel free to reach out or leave any feedback you would
                like to add. Much Appreciated!
              </h3>

              {/* Image centered above the text */}
              <div
                className="col-12 col-md-4 ml-auto mr-auto mb-30"
                data-armstrong-id="profile-image"
              >
                <a href="/about">
                  <figure>
                    <img
                      src="/assets/images/Lucia2.jpg"
                      alt="Photo of Family wedding"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 600,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                </a>
              </div>

              {/* Two column layout */}
              <div className="row" style={{ marginTop: 40 }}>
                {/* LEFT TEXT */}
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                  <h1 style={{ marginBottom: 20, color: "var(--c-text)" }}>
                    I'd Love to Hear any Feedback
                  </h1>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--c-text-secondary)",
                      marginBottom: 16,
                    }}
                  >
                    Please share your thoughts, suggestions, or questions below.
                    I truly value your input as it helps me improve the content
                    & the way I engage with you. Your feedback is essential to
                    creating a better experience for everyone & means a lot to
                    me personally.
                  </p>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--c-text-secondary)",
                      marginBottom: 8,
                    }}
                  >
                    Every comment you provide helps shape the future of
                    Albanylitica. So don’t hesitate & let me know what you think
                    & help me make this community even stronger!
                  </p>
                  <div
                    style={{
                      marginTop: 50,
                      textAlign: "center",
                      fontSize: "1rem",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--c-text-secondary)",
                        marginBottom: 6,
                      }}
                    >
                      Prefer to send feedback another way?
                    </p>
                    <a
                      href="/contact"
                      style={{
                        color: "var(--c-accent)",
                        textDecoration: "underline",
                      }}
                    >
                      Separate Platforms
                    </a>
                  </div>
                </div>

                {/* RIGHT FORM */}
                <div className="col-12 col-md-6">
                  <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label
                      htmlFor="feedback"
                      style={{
                        marginBottom: 10,
                        fontFamily: "inherit",
                        color: "var(--c-text)",
                      }}
                    >
                      Your feedback below please
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      rows="8"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write your feedback here..."
                      required
                      style={{
                        padding: 12,
                        fontSize: "1rem",
                        borderRadius: 4,
                        border: "1px solid var(--c-border)",
                        resize: "vertical",
                        marginBottom: 20,
                        width: "100%",
                        boxSizing: "border-box",
                        backgroundColor: "var(--c-bg-secondary)",
                        color: "var(--c-text-third)",
                        fontFamily: "inherit",
                      }}
                    />
                    <button
                      type="submit"
                      className="btn border-radius-small pt-10 pb-10 pl-20 pr-20 body-s btn-accent position-relative z-above-base d-inline-block lh-22 fs-15 text-align-center mt-20 mb-40 cursor-pointer"
                    >
                      Submit Feedback
                      <svg
                        className="arrow-link__icon"
                        style={{ marginLeft: 8 }}
                      >
                        <use href="#icon-right-arrow" />
                      </svg>
                    </button>
                    {submitted && (
                      <p style={{ marginTop: 15, color: "lightgreen" }}>
                        Thanks for your feedback! We appreciate your time.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
