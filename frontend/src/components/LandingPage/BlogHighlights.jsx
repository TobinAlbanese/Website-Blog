import React from 'react';

export default function BlogHighlights() {
  return (
    <>
        <section className="c-bg" data-armstrong-id="wrapper" id="blog-highlights-section">
        <div
          className="row base__main pb-10 pb-md-25 pb-lg-40 pt-20 pt-md-30 pt-lg-60"
          data-armstrong-id="primary"
        >
          {/* Heading and subtitle stacked top-left */}
          <div className="col-12 col-md-5 d-flex flex-column justify-center align-items-start">
            <h3 className="font-style-italic c-accent mt-15 fs-md-24 lh-lg">
              Blog Highlights
            </h3>
            <h4 className="fs-18 mb-15 fs-md-16" data-armstrong-id="module_subtitle">
              A curated look at my latest insights on politics, culture, and more.
            </h4>
          </div>

          {/* Blog cards + sidebar row underneath full width */}
          <div className="col-12">
            <div className="row justify-between d-flex" data-armstrong-id="row">
              {/* Blog cards */}
              <div className="col-12 col-md-8 items-start" data-armstrong-id="grid_2">
                {/* Card 1 */}
                <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border border-top border-top-thin pt-20">
                  <div className="mb-20 col-9 col-md-8 ml-0">
                    <h3 className="body-m">
                      <a href="">TITLE</a>
                    </h3>
                    <h4 className="body-s c-text-secondary mt-5">
                      <a href="">
                        Breif Desc
                      </a>
                    </h4>
                    <p className="body-s mt-10 ">
                      <a href="/authors/tobin-m-albanese">Tobin M. Albanese</a> 
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
                </div>

                {/* Card 2 */}
                <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border">
                  <div className="mb-20 col-9 col-md-8 ml-0">
                    <h3 className="body-m">
                      <a href="">
                       TITLE 
                      </a>
                    </h3>
                    <h4 className="body-s c-text-secondary mt-5">
                      <a href="">
                        Breif Desc
                      </a>
                    </h4>
                    <p className="body-s mt-10 ">
                      <a href="/authors/tobin-m-albanese">Tobin M. Albanese</a> 
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
                </div>

                {/* Card 3 */}
                <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border">
                  <div className="mb-20 col-9 col-md-8 ml-0">
                    <h3 className="body-m">
                      <a href="">
                        TITLE
                      </a>
                    </h3>
                    <h4 className="body-s c-text-secondary mt-5">
                      <a href="">
                        Breif Desc
                      </a>
                    </h4>
                    <p className="body-s mt-10 ">
                      <a href="/authors/tobin-m-albanese">Tobin M. Albanese</a> 
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
                </div>

                {/* Card 4 */}
                <div className="card items-start row card--large justify-between col-12 ml-0 mr-0 mb-20 border-bottom border-bottom-thin c-border">
                  <div className="mb-20 col-9 col-md-8 ml-0">
                    <h3 className="body-m">
                      <a href="">
                        TITLE
                      </a>
                    </h3>
                    <h4 className="body-s c-text-secondary mt-5">
                      <a href="">
                        Breif Desc
                      </a>
                    </h4>
                    <p className="body-s mt-10 ">
                      <a href="/authors/tobin-m-albanese">Tobin M. Albanese</a> 
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
                </div>
              </div>

              {/* Sidebar (ad) on the right of the cards */}
              <aside className="col-12 col-md-4">
                {/* Your sidebar content here */}
                <div className="sidebar">
                    <aside className="col-12 col-md-4 d-flex justify-center align-items-center">
                    <img
                        src="/assets/images/Family.jpg"
                        alt="blog background"
                        style={{ maxWidth: '100%', height: 650, borderRadius: '8px' }}
                        loading="lazy"
                    />
                    </aside>

                  </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
