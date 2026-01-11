import React from "react";

export default function StayConnected() {
  return (
    <>
      <section
        className="position-relative overflow-hidden theme-accent"
        data-armstrong-id="wrapper"
      >
        <div className="row base__main items-center flex-column-reverse position-relative overflow-hidden justify-between flex-row-md pb-50 pt-80">
          <div className="col-12 col-md-8 position-relative z-above-base ">
            <h2 className="position-relative z-above-base mt-15 c-accent fs-18 font-style-italic mb-20" />
            <h2 className="heading-m ls-narrow f-serif ls--1 text-wrap">
              Stay connected to <em>Midnight Bureau</em>
            </h2>

            {/* use ✵ as the bullet; keep checkmarks class for your existing spacing */}
            <ul
              className="body-l checkmarks ml-35 c-text"
              style={{ listStyle: "none", paddingLeft: 0, marginTop: 10 }}
            >
              <li
                className="d-flex items-start"
                style={{ gap: 10, marginBottom: 10 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    lineHeight: 1,
                    marginTop: 4,
                    fontSize: 25,
                    color: "var(--c-accent, #d62827)",
                  }}
                >
                  ✵
                </span>
                <span>
                  Stay informed with the latest insights &amp; analysis from{" "}
                  <em>Midnight Bureau</em>.
                  <br /> Sign up for our newsletter and never miss an update.
                </span>
              </li>

              <li
                className="d-flex items-start"
                style={{ gap: 10, marginBottom: 10 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    lineHeight: 1,
                    marginTop: 4,
                    fontSize: 25,
                    color: "var(--c-accent, #d62827)",
                  }}
                >
                  ✵
                </span>
                <span>
                  Follow me on social media for real-time updates, political
                  commentary, &amp; some behind the scenes content of me
                  personally!
                </span>
              </li>

              <li
                className="d-flex items-start"
                style={{ gap: 10, marginBottom: 10 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    lineHeight: 1,
                    marginTop: 4,
                    fontSize: 25,
                    color: "var(--c-accent, #d62827)",
                  }}
                >
                  ✵
                </span>
                <span>
                  Stay in the loop with me as I share fresh insights, updates,
                  and thoughtful takes straight to your inbox.
                </span>
              </li>

              <li className="d-flex items-start" style={{ gap: 10 }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    lineHeight: 1,
                    marginTop: 4,
                    fontSize: 25,
                    color: "var(--c-accent, #d62827)",
                  }}
                >
                  ✵
                </span>
                <span>
                  Thanks for being here and engaging with Midnight Bureau. Your
                  interest and feedback inspire me every day. Let’s keep the
                  conversation going!
                </span>
              </li>
            </ul>

            <div className="mt-20" id="stay-connected-cta">
              <a
                className="btn border-radius-small pt-10 pb-10 pl-20 pr-20 body-s btn-accent position-relative z-above-base d-inline-block lh-22 fs-15 text-align-center mt-20 mb-40 cursor-pointer"
                href="/MidnightBureau/Newsletter"
                data-dl-click-event="updates_cta_click"
                data-dl-variable-name="dl_event_location"
                data-dl-variable-value="sub-mod-tout"
              >
                Get Updates
                <svg className="arrow-link__icon">
                  <use href="#icon-right-arrow" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-30 position-relative z-above-base stay-connected-media">
            <a className="current-issue__image" href="#">
              <figure>
                <img
                  src="/assets/images/albanylitica.png"
                  alt="Midnight Bureau Blog Main Image"
                  className="drop-shadow w-30 w-auto-md m-auto"
                  loading="lazy"
                  width={767}
                  height={1096}
                  srcSet="/assets/images/MB.png"
                />
              </figure>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
