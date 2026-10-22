import React, { useState, useEffect, useRef } from "react";
import MetaHead from "../../components/LandingPage/MetaHead";
import SvgHead from "../../components/LandingPage/svgHead";
import Footer from "../../components/LandingPage/Footer";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

const faqs = [
  {
    question: "What is Research Journal?",
    answer:
      "Research Journal is an independent digital journal offering in-depth analysis of global affairs, emerging technologies, and current events. It's built for the critically curious—readers who seek clarity, substance, and perspective.",
  },
  {
    question: "How can I leave feedback or get in touch?",
    answer:
      "You can leave feedback directly on the homepage via the Feedback section. Prefer another method? Visit the Contact page to reach out via email or other platforms. Your insights are always welcome.",
  },
  {
    question: "Where can I find your latest posts and briefings?",
    answer:
      "All recent posts, essays, and intelligence briefings are available under the Research Journal section. You’ll find it in the main navigation, updated regularly with fresh analysis.",
  },
  {
    question: "Do you accept collaborations or guest contributors?",
    answer:
      "Yes. Research Journal is open to thoughtful collaborations and original guest content that aligns with our mission. Visit the Collaborations section on the Portfolio page or reach out directly.",
  },
  {
    question: "How often is new content published?",
    answer:
      "New content typically drops every 1–2 weeks. We cover a wide range of subjects—from international strategy to cyber defense and scientific innovation.",
  },
  {
    question: "Can I suggest a topic to be covered?",
    answer:
      "Absolutely. If you have a question, theme, or subject area you’d like to see explored, use the feedback form or contact link to share it. Reader prompts often inspire upcoming stories.",
  },
  {
    question: "Is there a way to subscribe for updates?",
    answer:
      "A subscription option is coming soon. In the meantime, check back regularly or follow Research Journal on social platforms to stay in the loop.",
  },
  {
    question: "What is this site built with?",
    answer:
      "Research Journal runs on modern web technology including React (Next.js), custom design components, and a performance-first mindset. The experience is designed to be clean, accessible, and responsive.",
  },
  {
    question: "Is this site mobile-friendly?",
    answer:
      "Yes, fully. Research Journal is built with mobile-first responsiveness to ensure a smooth experience across all devices—whether you're reading on the go or at your desk.",
  },
  {
    question: "What's the long-term goal of Research Journal?",
    answer:
      "The vision is to create an independent, trusted voice in digital analysis—an intersection of research, journalism, and creative insight. Research Journal aims to be a go-to hub for global thinkers and lifelong learners.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      {/*NAVBAR*/}
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

          <section
            ref={sectionRef}
            className="faq-contrast"
            aria-label="Frequently Asked Questions"
            style={{
              maxWidth: 800,
              margin: "2rem auto",
              padding: "2rem 1rem",
              backgroundColor: "var(--faq-bg)",
              color: "var(--faq-text)",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: visible ? "translateY(0)" : "translateY(40px)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Frequently Asked Questions
            </h1>
            <div role="list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  role="listitem"
                  style={{
                    borderBottom: "1px solid var(--faq-border)",
                    padding: "1rem 0",
                  }}
                >
                  <button
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    onClick={() => toggleFAQ(index)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "var(--faq-text)",
                    }}
                  >
                    {faq.question}
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "1.5rem",
                        transform:
                          openIndex === index
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        lineHeight: 0,
                        color: "var(--c-accent)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    style={{
                      maxHeight: openIndex === index ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                      color: "var(--faq-text)",
                      marginTop: openIndex === index ? "0.75rem" : "0",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                    }}
                  >
                    <p style={{ margin: 0 }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
