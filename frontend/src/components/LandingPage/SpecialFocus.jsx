import React from 'react';

export default function SpecialFocus() {
  return (
    <>
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
        data-armstrong-id="primary"
      >
        {/* Heading and subtitle stacked top-left */}
        <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
          <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
            Special Focus
          </h3>
          <h4 className="fs-18 mb-15 fs-md-16" data-armstrong-id="module_subtitle">
            Specific topics I am working on currently.
          </h4>
        </div>

        {/* Main content: image left, cards right */}
        <div className="col-12">
          <div
            className="row justify-between flex-row-reverse d-flex"
            data-armstrong-id="row"
          >
            {/* Image on left */}
            <div className="col-12 col-md-5 d-flex justify-center align-items-center">
              <img
                src="/assets/images/Cross.jpg"
                alt="Special Focus Visual"
                style={{ maxWidth: '100%', height: 650, borderRadius: "8px" }}
                loading="lazy"
              />
            </div>

            {/* Cards on right */}
            <div className="col-12 col-md-7 items-start" data-armstrong-id="grid_2">
              {/* Card 1 */}
              <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border justify-between border-top border-top-thin pt-20">
                <div className="mb-20 col-9 col-md-8 ml-0">
                  <h3 className="body-m">
                    <a href="">
                      TITLE
                    </a>
                  </h3>
                  <h4 className="body-s c-text-secondary mt-5">
                    <a href="">
                      Brief Desc
                    </a>
                  </h4>
                  <p className="body-s mt-10">
                    <a href="">author</a>
                  </p>
                </div>
                <div className="col-3 col-md-4 d-flex items-start justify-end mr-0">
                  <a
                    className="card__image mb-20"
                    href=""
                    aria-label="Get Ready for a Big, Bold, and Very Bad North Korea Deal"
                  >
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-none d-md-block"
                        loading="lazy"
                        width={200}
                        height={120}
                      />
                    </figure>
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-block d-md-none"
                        loading="lazy"
                        width={90}
                        height={90}
                      />
                    </figure>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border justify-between">
                <div className="mb-20 col-9 col-md-8 ml-0">
                  <h3 className="body-m">
                    <a href="">TITLE</a>
                  </h3>
                  <h4 className="body-s c-text-secondary mt-5">
                    <a href="">
                      Brief Desc
                    </a>
                  </h4>
                  <p className="body-s mt-10">
                    <a href="">author</a>
                  </p>
                </div>
                <div className="col-3 col-md-4 d-flex items-start justify-end mr-0">
                  <a
                    className="card__image mb-20"
                    href=""
                    aria-label="The End of Erdogan"
                  >
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-none d-md-block"
                        loading="lazy"
                        width={200}
                        height={120}
                      />
                    </figure>
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-block d-md-none"
                        loading="lazy"
                        width={90}
                        height={90}
                      />
                    </figure>
                  </a>
                </div>
              </div>

              {/* Card 3 */}
              <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border justify-between">
                <div className="mb-20 col-9 col-md-8 ml-0">
                  <h3 className="body-m">
                    <a href="">TITLE</a>
                  </h3>
                  <h4 className="body-s c-text-secondary mt-5">
                    <a href="">
                      Brief Desc
                    </a>
                  </h4>
                </div>
                <div className="col-3 col-md-4 d-flex items-start justify-end mr-0">
                  <a
                    className="card__image mb-20"
                    href=""
                    aria-label=""
                  >
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-none d-md-block"
                        loading="lazy"
                        width={200}
                        height={120}
                      />
                    </figure>
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-block d-md-none"
                        loading="lazy"
                        width={90}
                        height={90}
                      />
                    </figure>
                    <div className="card__icon position-absolute border-radius-small d-flex items-center justify-center c-bg">
                      <svg>
                        <use href="#icon-podcast" />
                      </svg>
                      <span className="d-none d-md-block body-xs-smallcaps ml-5">
                        podcast
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Card 4 */}
              <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border justify-between">
                <div className="mb-20 col-9 col-md-8 ml-0">
                  <h3 className="body-m">
                    <a href="">TITLE</a>
                  </h3>
                  <h4 className="body-s c-text-secondary mt-5">
                    <a href="">
Brief Desc              Brief Desc
                    </a>
                  </h4>
                  <p className="body-s mt-10">
                    <a href="">author</a>
                  </p>
                </div>
                <div className="col-3 col-md-4 d-flex items-start justify-end mr-0">
                  <a
                    className="card__image mb-20"
                    href=""
                    aria-label=""
                  >
                    <figure>
                      <img
                        src=""
                        alt=""
                        className="d-none d-md-block"
                        loading="lazy"
                        width={200}
                        height={120}
                      />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
