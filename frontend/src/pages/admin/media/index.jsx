import { useEffect, useMemo, useRef, useState } from "react";
import MetaHead from "../../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../../components/LandingPage/svgHead.jsx";
import AdminNavbar from "../../../components/Admin/AdminNavbar.jsx";
import Footer from "../../../components/LandingPage/Footer.jsx";
import { supabaseServer } from "../../../lib/supabase/supabaseServer";
import { supabase } from "../../../lib/supabase/client";

const BUCKET = "public-images";
const INITIAL_COUNT = 30;
const LOAD_MORE_COUNT = 20;

function isImageFile(name = "") {
  return /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(name);
}

function getPublicImageUrl(path) {
  const { data } = supabaseServer.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl || "";
}

function getClientPublicImageUrl(path) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl || "";
}

function sanitizeFileName(name = "") {
  return name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}
export default function AdminMediaPage({ images = [] }) {
  const [galleryImages, setGalleryImages] = useState(images);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const loaderRef = useRef(null);
  const fileInputRef = useRef(null);

  const visibleImages = useMemo(() => {
    return galleryImages.slice(0, visibleCount);
  }, [galleryImages, visibleCount]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;

        setVisibleCount((prev) => {
          if (prev >= images.length) return prev;
          return Math.min(prev + LOAD_MORE_COUNT, images.length);
        });
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [galleryImages.length]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsUploadOpen(false);
        setUploadError("");
        setUploadSuccess("");
      }
    };

    if (isUploadOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isUploadOpen]);

  const openUploadModal = () => {
    setUploadError("");
    setUploadSuccess("");
    setIsUploadOpen(true);
  };

  const closeUploadModal = () => {
    if (uploading) return;
    setIsUploadOpen(false);
    setUploadError("");
    setUploadSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadError("");
    setUploadSuccess("");
    setUploading(true);

    try {
      const uploadedItems = [];

      for (const file of files) {
        if (!isImageFile(file.name)) continue;

        const safeName = sanitizeFileName(file.name);
        const finalName = safeName;

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(finalName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        uploadedItems.push({
          name: finalName,
          path: finalName,
          url: getClientPublicImageUrl(finalName),
        });
      }

      if (!uploadedItems.length) {
        throw new Error("No valid image files selected.");
      }

      setGalleryImages((prev) =>
        [...prev, ...uploadedItems].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        )
      );

      setVisibleCount((prev) => prev + uploadedItems.length);
      setUploadSuccess(
        uploadedItems.length === 1
          ? "Image uploaded successfully."
          : `${uploadedItems.length} images uploaded successfully.`
      );

      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        setIsUploadOpen(false);
        setUploadSuccess("");
      }, 900);
    } catch (err) {
      setUploadError(err?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <MetaHead
        title="Admin Media | Tobin Albanese"
        description="Media library for public images."
      />
      <SvgHead />

      <main className="admin-root">
        <AdminNavbar />
        <section className="admin-shell admin-media-wrap">
          <div className="admin-media-topbar">
            <div>
              <h1 className="admin-media-title">Media Library</h1>
            </div>

            <button
              type="button"
              className="admin-media-upload-btn"
              onClick={openUploadModal}
            >
              Upload
            </button>
          </div>

          {galleryImages.length === 0 ? ( 
            <div className="admin-media-empty">
              No images found in the public-images bucket.
            </div>
          ) : (
            <>
              <div className="admin-media-gallery">
                {visibleImages.map((image) => (
                  <div key={image.path} className="admin-media-item">
                    <img
                      src={image.url}
                      alt={image.name}
                      loading="lazy"
                      className="admin-media-image"
                    />
                  </div>
                ))}
              </div>

              <div ref={loaderRef} className="admin-media-loader">
                {visibleCount < images.length
                  ? "Loading more images..."
                  : "All images loaded"}
              </div>
            </>
          )}
        </section>
      </main>
{isUploadOpen && (
  <div className="admin-modal-overlay" onClick={closeUploadModal}>
    <div
      className="admin-modal admin-media-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="admin-media-modal-close"
        onClick={closeUploadModal}
        aria-label="Close upload modal"
      >
        ×
      </button>

      <h2 className="admin-media-modal-title">Upload to Media Library</h2>

      <p className="admin-media-modal-copy">
        Select one or more images from your device to upload directly into your
        public-images bucket.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        className="admin-media-file-input"
      />

      <button
        type="button"
        className="admin-btn"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload from Device"}
      </button>

      {uploadError ? (
        <div className="admin-error admin-media-modal-message">
          {uploadError}
        </div>
      ) : null}

      {uploadSuccess ? (
        <div className="admin-media-modal-success admin-media-modal-message">
          {uploadSuccess}
        </div>
      ) : null}
    </div>
  </div>
)}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabaseServer.storage.from(BUCKET).list("", {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error loading media library:", error.message);
    return {
      props: {
        images: [],
      },
    };
  }

  const images = (data || [])
    .filter((item) => item?.name)
    .filter((item) => !item.name.startsWith("."))
    .filter((item) => isImageFile(item.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({
      name: item.name,
      path: item.name,
      url: getPublicImageUrl(item.name),
    }));

  return {
    props: {
      images,
    },
  };
}
