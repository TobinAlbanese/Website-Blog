import { useEffect, useRef } from "react";

const galleryItems = [
  { src: "/assets/images/AboutMePhoto.jpg", classes: "item -small" },
  { src: "/assets/images/afroTob.jpg", classes: "item -big" },
  { src: "/assets/images/Alina.jpg", classes: "item -small -horizontal" },
  { src: "/assets/images/Cross.jpg", classes: "item -normal" },
  { src: "/assets/images/Dad&Tobin.jpg", classes: "item -normal -horizontal" },
  { src: "/assets/images/Dad&Tobin2.jpg", classes: "item -big -horizontal" },
  { src: "/assets/images/Dylan&Tobin.jpg", classes: "item -small" },
  { src: "/assets/images/Family.jpg", classes: "item -normal -horizontal" },
  { src: "/assets/images/Tobin&Johnny.jpg", classes: "item -small -horizontal" },
  { src: "/assets/images/Tobin&Gus.JPG", classes: "item -big" },
  { src: "/assets/images/TNJT.JPG", classes: "item -normal -horizontal" },
  { src: "/assets/images/Snowboard.jpg", classes: "item -normal -horizontal" },
  { src: "/assets/images/Pakistan.jpg", classes: "item -small -horizontal" },
  { src: "/assets/images/SanFran.jpg", classes: "item -big" },
  { src: "/assets/images/Dad&BabyTob.jpg", classes: "item -normal -horizontal" },
  { src: "/assets/images/BabyTobin&Grammy.jpg", classes: "item -small -horizontal" },
  { src: "/assets/images/AfroTob.jpg", classes: "item -big" },
  { src: "/assets/images/AfroTob.jpg", classes: "item -normal -horizontal" },
  { src: "/assets/images/AfroTob.jpg", classes: "item -small -horizontal" },
  { src: "/assets/images/AfroTob.jpg", classes: "item -normal" },
];

export default function MBHeroGallery() {
  const galleryRef = useRef(null);

useEffect(() => {
  const gallery = galleryRef.current;
  if (!gallery) return;

  let scrollAmount = 0;
  let isScrolling = false;

  const smoothScroll = () => {
    if (Math.abs(scrollAmount) < 0.5) {
      scrollAmount = 0;
      isScrolling = false;
      return;
    }

    gallery.scrollLeft += scrollAmount;
    requestAnimationFrame(smoothScroll);
  };

const onWheel = (e) => {
  const canScrollLeft = gallery.scrollLeft > 0;
  const canScrollRight = gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth;

  if ((e.deltaY < 0 && canScrollLeft) || (e.deltaY > 0 && canScrollRight)) {
    e.preventDefault();
    gallery.scrollLeft += e.deltaY * 2.5; 
  }
};


  gallery.addEventListener("wheel", onWheel, { passive: false });

  return () => {
    gallery.removeEventListener("wheel", onWheel);
  };
}, []);




return (
  <>
    <div className="scroll-animations-example" ref={galleryRef}>
      <div className="scrollsection">
        {galleryItems.map(({ src, classes }, idx) => (
          <div key={idx} className={classes}>
            <img src={src} alt={`Hero Image ${idx}`} loading="lazy" className="-active" />

          </div>
        ))}
      </div>
    </div>

    <h2 className="archive-title">My Archive</h2>
<p className="archive-description">
Browse the archive below — a curated timeline of investigations, thoughts, and dispatches.
Each entry opens a deeper look. Swipe horizontally to scan through volumes. Scroll vertically to continue the journey.
</p>
  </>
);
}
