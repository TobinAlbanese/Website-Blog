// components/LandingPage/MetaHead.jsx
import React from "react";
import Head from "next/head";

export default function MetaHead({
  title = "Tobin Albanese",
  description = "This is my personal website along with my unique blog page on international affairs!",
  url = "https://www.tobinalbanese.com/",
}) {
  const rss = `${url.replace(/\/$/, "")}/rss.xml`;
  return (
    <Head>
      {/* This controls the browser tab text */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="shortlink" href={url} />
      <meta name="robots" content="max-image-preview:large" />
      <meta property="og:site_name" content="Tobin Albanese" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/TobinAlbanese"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="msvalidate.01" content="Replace this" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />

      <link rel="icon" href="/themes/mag/favicon.ico" />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/themes/mag/favicons/favicon-live.svg"
      />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" type="application/rss+xml" href={rss} />
    </Head>
  );
}
