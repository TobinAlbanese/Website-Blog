import React from 'react';
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
              <h2 className="heading-m ls-narrow f-serif ls--1 dark-text-light text-wrap">
                Stay connected to <em>Albanylitica </em>
              </h2>
              <ul className="body-l checkmarks ml-35">
                <li>
                    Stay informed with the latest insights & analysis from <em>Albanylitica</em>. 
                    <br /> Sign up for our newsletter and never miss an update.
                </li>
                <li>
                    Follow me on social media for real-time updates, political commentary, 
                    & some behind the scenes content of me personally!

                </li>
                <li>
                    Stay in the loop with me as I share fresh insights, updates, and thoughtful 
                    takes straight to your inbox.
                </li>
                <li>
                    Thanks for being here and engaging with AlbanyLitica. Your interest and feedback 
                    inspire me every day. Let’s keep the conversation going!
                </li>
              </ul>
              <div className="mt-20">
                <a
                  className="btn border-radius-small pt-10 pb-10 pl-20 pr-20 body-s btn-accent position-relative z-above-base d-inline-block lh-22 fs-15 text-align-center mt-20 mb-40 cursor-pointer"
                  href="/newsletter"
                  data-dl-click-event="updates_cta_click"
                  data-dl-variable-name="dl_event_location"
                  data-dl-variable-value="sub-mod-tout"
                >
                  Get Updates
                  <svg className="arrow-link__icon ">
                    <use href="#icon-right-arrow" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-30 position-relative z-above-base ">
              <a className="current-issue__image" href="#">
                <figure className="">
                  <img
                    src="/assets/images/albanylitica.png"
                    alt="Albanylitica Blog Main Image"
                    className="drop-shadow w-30 w-auto-md m-auto"
                    loading="lazy"
                    width={767}
                    height={1096}
                    srcSet="/assets/images/albanylitica.png"
                  />
                </figure>
              </a>
            </div>
          </div>
        </section>
</>
  );
}