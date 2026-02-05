// components/LandingPage/MBHeroGallery.jsx
import { useEffect, useMemo, useRef } from "react";

export default function MBHeroGallery({ images = [] }) {
  const galleryRef = useRef(null);

  // Reuse your size classes in a repeating pattern
  const CLASS_PATTERN = useMemo(
    () => [
      "item -small",
      "item -big",
      "item -small -horizontal",
      "item -normal",
      "item -normal -horizontal",
      "item -big -horizontal",
    ],
    []
  );

  const items = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        classes: CLASS_PATTERN[i % CLASS_PATTERN.length],
      })),
    [images, CLASS_PATTERN]
  );

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const onWheel = (e) => {
      const canScrollLeft = gallery.scrollLeft > 0;
      const canScrollRight =
        gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth;

      if ((e.deltaY < 0 && canScrollLeft) || (e.deltaY > 0 && canScrollRight)) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY * 2.5;
      }
    };

    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <div className="scroll-animations-example" ref={galleryRef}>
        <div className="scrollsection">
          {items.map(({ src, classes }, idx) => (
            <div key={idx} className={classes}>
              <img
                src={src}
                alt={`Hero Image ${idx + 1}`}
                loading="lazy"
                className="-active"
                onError={(e) => {
                  // Optional: dev helper to catch any lingering bad paths
                  console.warn("Missing image:", e.currentTarget.src);
                  // Optional fallback:
                  // e.currentTarget.src = "/assets/images/Space2.jpg";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <h2 className="archive-title">My Archive</h2>
      <p className="archive-description">
        Browse the archive below — a curated timeline of investigations,
        thoughts, and dispatches. Each entry opens a deeper look. Swipe
        horizontally to scan through volumes. <br /> Scroll vertically to continue the
        journey.
      </p>
    </>
  );
}
