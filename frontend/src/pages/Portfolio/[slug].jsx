import { useRouter } from 'next/router';
import Head from 'next/head';
import PortfolioData from '../../data/portfolioData';
import Footer from '../../components/LandingPage/Footer.jsx';
import MetaHead from '../../components/LandingPage/MetaHead.jsx';
import SvgHead from '../../components/LandingPage/svgHead.jsx';
import Navbar from '../../components/LandingPage/Navbar.jsx';

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = router.query;

  const allProjects = Object.values(PortfolioData).flat();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) return <p style={{ padding: '60px', textAlign: 'center' }}>Project not found.</p>;

  return (
    <>

      <Head>
        <title>{project.title} | Project Template</title>
        <meta charSet="utf-8" />
        <meta name="description" content={project.description} />
      </Head>

      <MetaHead />
      <SvgHead />
{/*NAVBAR*/}
  <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
    <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
      <div id="js-dfp-tag-top--2"></div>
    </div>
    <div id="js-dfp-tag-outofpage--2"></div>
    <div className="base d-flex">
      <Navbar />


<main style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px', fontFamily: 'inherit' }}>
  {/* Title on its own line */}
  <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '20px' }}>
    {project.title}
  </h1>

  {/* Container for text and floated image */}
  <div style={{ overflow: 'hidden' }}>
    {project.image && (
      <img
        src={project.image}
        alt={project.title}
        style={{
          float: 'right',
          width: '450px',
          height: '350px',
          marginLeft: '30px',
          marginBottom: '20px',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
    )}

    {/* Text wraps around the image */}
    {project.content?.map((block, idx) => (
      <p
        key={idx}
        style={{
          fontSize: '1.15rem',
          lineHeight: '1.8',
          color: '#000000',
          marginBottom: '1em',
        }}
      >
        {block.text}
      </p>
    ))}
  </div>

  {/* Optional gallery */}
  {project.gallery?.length > 0 && (
    <section style={{ marginTop: '60px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {project.gallery.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery Image ${idx + 1}`}
            style={{ width: '240px', borderRadius: '8px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </section>
  )}
</main>




      <Footer />
      </div> 
      </div>
    </>
  );
}
