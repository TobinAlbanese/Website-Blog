// components/LandingPage/MetaHead.jsx
import React from "react";
import Head from "next/head";

export default function MetaHead({
  title = "Tobin Albanese",
  description = "This is my personal website along with my unique blog page on international affairs!",
  url = "https://www.tobinalbanese.com",
  ogImage = "/og-ta.png",
  themeColor = "#0b1221",
}) {
  const origin = url.replace(/\/$/, "");
  const abs = (p) =>
    p?.startsWith("http") ? p : `${origin}${p.startsWith("/") ? "" : "/"}${p}`;
  const rss = `${origin}/rss.xml`;

  return (
    <Head>
      {/* Title */}
      <title>{title}</title>

      {/* Basic SEO */}
      <meta name="description" content={description} />
      <link rel="canonical" href={origin} />
      <link rel="shortlink" href={origin} />
      <meta name="robots" content="max-image-preview:large" />
      <link rel="alternate" hrefLang="en" href={origin} />
      <link rel="alternate" type="application/rss+xml" href={rss} />

      {/* App / PWA */}
      <meta name="application-name" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-title" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="dark light" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      {/* Replace with your real Bing site verification if you use it */}
      <meta name="msvalidate.01" content="Replace this" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Tobin Albanese" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={origin} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={abs(ogImage)} />
      <meta property="og:image:secure_url" content={abs(ogImage)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tobin Albanese TA monogram logo" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/TobinAlbanese"
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={abs(ogImage)} />

      {/* Icons & PWA (TA pack) */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b1221" />
      <meta name="msapplication-TileColor" content="#0b1221" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Head>
  );
}
