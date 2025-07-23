import React from 'react';

export default function FeaturedPapers() {
  return (
    <section className="c-bg" data-armstrong-id="wrapper">
      <div
        className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
        data-armstrong-id="primary"
      >
        <div className="col-12">
          <div className="row justify-between d-flex" data-armstrong-id="row">
            {/* Sidebar Title + Subtitle */}
            <div className="col-12 col-md-4 d-flex flex-column justify-start align-items-start">
              <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
                Featured Papers
              </h3>
              <h4
                className="fs-18 mb-15 fs-md-16"
                style={{ color: 'var(--c-text-secondary)' }}
                data-armstrong-id="module_subtitle"
              >
                A curated selection of key research and insights.
              </h4>

              {/* Sidebar Ad Placeholder */}
              <div className="d-flex dfp-tag-wrapper justify-around" style={{ width: '100%' }}>
                <div id="js-dfp-tag-sidebar--5"></div>
              </div>
            </div>

            {/* Paper Cards */}
            <div className="col-12 col-md-7 items-start" data-armstrong-id="grid_2">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border border-top border-top-thin pt-20"
                >
                  {/* Image */}
                  <div className="col-3 col-md-4 d-flex items-start justify-start mr-0">
                    <a className="card__image mb-20" href="#" aria-label="">
                      <figure>
                        <img
                          src=""
                          alt=""
                          className="d-none d-md-block"
                          loading="lazy"
                          width={200}
                          height={120}
                          srcSet=""
                          sizes="(max-width: 767px) 200px"
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
                          srcSet=""
                          sizes="(max-width: 767px) 65px, 90px"
                        />
                      </figure>
                    </a>
                  </div>

                  {/* Text Content */}
                  <div className="mb-20 col-9 col-md-8 ml-0">
                    <h3 className="body-m">
                      <a href="#">TITLE</a>
                    </h3>
                    <h4
                      className="body-s mt-5"
                      style={{ color: 'var(--c-text-secondary)' }}
                    >
                      <a href="#">Brief Description of what should go here</a>
                    </h4>
                    <p
                      className="body-s mt-10"
                      style={{ color: 'var(--c-accent)', fontWeight: 600 }}
                    >
                      <a href="#">Tobin Albanese</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
