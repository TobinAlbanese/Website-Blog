// src/lib/posts.js
// Single source of truth for both MB + Portfolio

export const slugify = (s = "") =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const normalize = (p = {}) => ({
  volume: p.volume ?? "VOLUME",
  title: p.title ?? "Untitled",
  slug: p.slug ?? slugify(p.title ?? "untitled"),
  author: p.author ?? "Unknown",
  date: p.date ?? null,
  excerpt: p.excerpt ?? "",
  archiveImage: p.archiveImage ?? "/assets/images/space.jpg",
  banner: p.banner ?? null,
  content: Array.isArray(p.content) ? p.content : [],
  images: Array.isArray(p.images) ? p.images : [],
  resources: p.resources ?? {},
  published: p.published ?? true, // future-proof
});

// ----- In-memory adapters (today) -----
import MB_RAW from "../data/MidnightBureau";
import PF_RAW from "../data/portfolioData";

const MB = (Array.isArray(MB_RAW) ? MB_RAW : Object.values(MB_RAW).flat()).map(
  normalize
);
const PF = (Array.isArray(PF_RAW) ? PF_RAW : Object.values(PF_RAW).flat()).map(
  normalize
);

// Public API your pages use:
export const listMB = () => MB.filter((p) => p.published);
export const listPF = () => PF.filter((p) => p.published);
export const getMB = (slug) => listMB().find((p) => p.slug === slug) || null;
export const getPF = (slug) => listPF().find((p) => p.slug === slug) || null;
