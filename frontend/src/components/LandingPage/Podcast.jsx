import React from "react"

export default function Podcast() {
  return (
    <>
        <section
          className="c-bg-secondary position-relative overflow-hidden"
          data-armstrong-id="wrapper"
          id=".home-section-podcast"
        >
          <div
            className="row base__main position-relative z-above-base"
            data-armstrong-id="primary"
          >
            <div className="col-12">
              <div
                className="row justify-between justify-center"
                data-armstrong-id="row"
              >
                <div
                  className="row ml-0 mr-0 flex-column-reverse flex-row-reverse-lg"
                  data-armstrong-id="grid_1"
                >
                  <div className="col-lg-6 mb-20 mt-md-60 mb-md-60">
                    <a href="/podcasts/sudans-intractable-war">
                      <figure className="">
                        <img
                          src=""
                          alt="Podcast Image for the week"
                          className="w-75 ml-auto mr-auto ml-md-auto mr-md-0"
                          title="Sudan’s Intractable War"
                          loading="lazy"
                          srcSet=""
                          sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 620px"
                        />
                      </figure>
                    </a>
                  </div>
                  <div className="col-lg-6 text-align-center content-center">
                    <figure className="">
                      <img
                        src=""
                        alt="Podcast Logo"
                        className="mx-auto mt-60 mb-60"
                        title="Weekly Podcast"
                        loading="lazy"
                        width={186}
                        height={186}
                        srcSet=""
                      />
                    </figure>
                    <h2 className="heading-l">
                      <a href="/podcasts/sudans-intractable-war">
                        Name of Weekly Podcast
                      </a>
                    </h2>
                    <h3 className="body-l c-text-secondary mt-5">
                      <a href="/podcasts/sudans-intractable-war">
                        A brief description
                      </a>
                    </h3>
                    <div className="audio-player d-flex items-center c-border border-thin border-radius js--audio-player mt-60 mx-auto max-445">
                      <div className="audio-player__item pl-10 pr-10 d-flex audio-player__controls">
                        <a
                          href="/podcasts/weekly-podcast"
                          className="audio-player__play-button border-radius-full d-flex"
                        >
                          <span className="audio-player__play-icon-label visually-hidden">
                            Play
                          </span>
                          <svg className="play-icon play-pause-icon">
                            <use xlinkHref="#icon-play" />
                          </svg>
                        </a>
                        <div className="audio-player__label">
                          <span>Listen to the Episode</span>
                          <span className="audio-player__duration-label">
                            (display minutes){" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      className="arrow-link border-bottom-thin border-bottom d-inline-block lh-22 fs-18 mt-40 mb-40"
                      href="/podcasts"
                    >
                      Follow the Podcast
                      <svg className="arrow-link__icon ">
                        <use href="#icon-right-arrow" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="row items-start" data-armstrong-id="grid_2" />
              </div>
            </div>
          </div>
        </section>
        </>
);
}