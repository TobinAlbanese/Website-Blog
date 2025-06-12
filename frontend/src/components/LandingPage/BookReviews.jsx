import React from 'react';

export default function BookReviews() {
    return (
<>
    <section
        className="theme-accent"
        data-armstrong-id="wrapper"
        id=".home-section-book-review"
        >
          <div className="base__main pt-60 pb-40 row">
            <div className="col-12 m-auto ">
              <h3 className="font-style-italic c-accent mb-25">Book Reviews</h3>
              <div className="row justify-between">
                <div className="col-12 col-lg-8">
                  <div className="row border-bottom border-bottom-thin c-input-border border-0-lg pb-25 mb-25">
                    <div className="col-5 col-lg-4">
                      <a href="">
                        <figure className="">
                          <img
                            src=""
                            alt="Main centered book"
                            className=""
                            loading="lazy"
                            width={277}
                            height={347}
                            srcSet=""
                            sizes="(max-width: 720px) 123px, 277px"
                          />
                        </figure>
                      </a>
                    </div>
                    <div className="col-7 col-lg-8 d-flex flex-column pl-lg-20">
                      <h2 className="heading-s mb-5 mb-lg-15">
                        <a href="/reviews/works-progress-cecilia-rouse">
                          Title of main book centered
                        </a>
                      </h2>
                      <h3 className="body-l c-text-secondary mb-5 mb-lg-15">
                        <a href="/reviews/works-progress-cecilia-rouse">
                          Brief Desc
                        </a>
                      </h3>
                      <span className="body-m mb-10 mb-lg-30">
                        Written by{" "}
                        <a href="/authors/cecilia-elena-rouse">
                          Author
                        </a>
                      </span>
                      <div>
                        <a
                          className="arrow-link border-bottom-thin border-bottom self-start lh-22 fs-18 mt-15 mt-lg-25"
                          href="/reviews/works-progress-cecilia-rouse"
                        >
                          Continue reading
                          <svg className="arrow-link__icon ">
                            <use href="#icon-right-arrow" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 row ml-0 ml-lg-10 justify-end">
                  <div className="col-3 col-md-2 col-lg-6 pb-25 mr-10 mr-lg-0 d-flex justify-end">
                    <a href="">
                      <figure className="">
                        <img
                          src=""
                          alt="Top left book"
                          className=""
                          loading="lazy"
                          width={131}
                          height={347}
                          srcSet=""
                          sizes="243px"
                        />
                      </figure>
                    </a>
                  </div>
                  <div className="col-9 col-md-4 pb-25 d-flex flex-column d-lg-none">
                    <h2 className="body-s">
                      <a href="">
                        TITLE
                      </a>
                    </h2>
                    <p className="body-s c-text-secondary">
                      Brief Desc
                    </p>
                    <div className="">
                      <a href="" className="body-s">
                       Author
                      </a>
                    </div>
                  </div>
                  <div className="col-3 col-md-2 col-lg-6 pb-25 mr-10 mr-lg-0 d-flex justify-end">
                    <a href="">
                      <figure className="">
                        <img
                          src=""
                          alt="Top right book"
                          className=""
                          loading="lazy"
                          width={131}
                          height={347}
                          srcSet=""
                          sizes="243px"
                        />
                      </figure>
                    </a>
                  </div>
                  <div className="col-9 col-md-4 pb-25 d-flex flex-column d-lg-none">
                    <h2 className="body-s">
                      <a href="">
                        Brief
                      </a>
                    </h2>
                    <p className="body-s c-text-secondary">Author</p>
                    <div className="">
                    </div>
                  </div>
                  <div className="col-3 col-md-2 col-lg-6 pb-25 mr-10 mr-lg-0 d-flex justify-end">
                    <a href="">
                      <figure className="">
                        <img
                          src=""
                          alt="Bottom Left book"
                          className=""
                          loading="lazy"
                          width={131}
                          height={347}
                          srcSet=""
                          sizes="243px"
                        />
                      </figure>
                    </a>
                  </div>
                  <div className="col-9 col-md-4 pb-25 d-flex flex-column d-lg-none">
                    <h2 className="body-s">
                      <a href="">
                        TITLE
                      </a>
                    </h2>
                    <p className="body-s c-text-secondary">Author</p>
                    <div className="">
                    </div>
                  </div>
                  <div className="col-3 col-md-2 col-lg-6 pb-25 mr-10 mr-lg-0 d-flex justify-end">
                    <a href="">
                      <figure className="">
                        <img
                          src=""
                          alt="Bottom Right Books"
                          className=""
                          loading="lazy"
                          width={131}
                          height={347}
                          srcSet=""
                          sizes="243px"
                        />
                      </figure>
                    </a>
                  </div>
                  <div className="col-9 col-md-4 pb-25 d-flex flex-column d-lg-none">
                    <h2 className="body-s">
                      <a href="">
                        TITLE
                      </a>
                    </h2>
                    <p className="body-s c-text-secondary">
                      Author
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>    
    );
}