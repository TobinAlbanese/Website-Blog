// components/LandingPage/MetaHead.jsx
import React from "react";
import Head from "next/head";

export default function MetaHead({
  title = "Tobin Albanese",
  description = "This is my personal website along with my unique blog page on international affairs!",
  url = "https://www.tobinalbanese.com",
  ogImage = "/og-ta.png",
  themeColor = "#000000",
}) {
  const origin = url.replace(/\/$/, "");
  const abs = (p) => (p?.startsWith("http") ? p : `${origin}${p.startsWith("/") ? "" : "/"}${p}`);
  const rss = `${origin}/rss.xml`;

  return (
    <Head>
      {/* Browser tab title */}
      <title>{title}</title>

      {/* Basic SEO */}
      <meta name="description" content={description} />
      <link rel="canonical" href={origin} />
      <link rel="shortlink" href={origin} />
      <meta name="robots" content="max-image-preview:large" />
      <link rel="alternate" hrefLang="en" href={origin} />
      <link rel="alternate" type="application/rss+xml" href={rss} />

      {/* App/site meta */}
      <meta name="application-name" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-title" content="Tobin Albanese" />
      <meta name="theme-color" content={themeColor} />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="msvalidate.01" content="Replace this" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Tobin Albanese" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={origin} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={abs(ogImage)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TA monogram mark" />
      <meta property="article:publisher" content="https://www.facebook.com/TobinAlbanese" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={abs(ogImage)} />

      {/* Icons & PWA */}
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      {/* Optional: Android home-screen icons */}
      <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" />
      <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" />
    </Head>
  );
}
