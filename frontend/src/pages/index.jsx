import Head from "next/head";
import MetaHead from "../components/LandingPage/MetaHead.jsx";
import SvgHead from "../components/LandingPage/svgHead.jsx";
import Hero from "../components/LandingPage/Hero.jsx";
import AboutMe from "../components/LandingPage/AboutMe.jsx";
import BlogHighlights from "../components/LandingPage/BlogHighlights.jsx";
import FeaturedProjects from "../components/LandingPage/FeaturedProjects.jsx";
import FeaturedPapers from "../components/LandingPage/FeaturedPapers.jsx";
import SpecialFocus from "../components/LandingPage/SpecialFocus.jsx";
import Podcast from "../components/LandingPage/Podcast.jsx";
import BookReviews from "../components/LandingPage/BookReviews.jsx";
import Feedback from "../components/LandingPage/FeedBack.jsx";
import StayConnected from "../components/LandingPage/StayConnected.jsx";
import Footer from "../components/LandingPage/Footer.jsx";
import Navbar from "../components/LandingPage/Navbar.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tobin Albanese</title>
        <meta charSet="utf-8" />
      </Head>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <>
        <Head>
          <title>MetaHead</title>
          <meta charSet="utf-8" />
        </Head>

        <MetaHead />
      </>
      <>
        <Head>
          <title>svgHead</title>
          <meta charSet="utf-8" />
        </Head>

        <SvgHead />
      </>

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
          <Navbar />

          <main
            className="base__content js--sticky-nav w-100 h-content-min d-flex justify-center flex-column"
            id="content"
            tabIndex={-1}
          >
            <h1 className="visually-hidden">Tobin Albanese</h1>
            <Hero />
            <AboutMe />
            <BlogHighlights />
            <FeaturedProjects />
            <SpecialFocus />
            <Podcast />
            <FeaturedPapers />
            <BookReviews />
            <Feedback />
            <StayConnected />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
