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
  const ogAbs = `${origin}/og-ta.png?v=5`; // cache-busted absolute OG image

  return (
    <Head>
      {/* Title */}
      <title>{title}</title>

      {/* Basic SEO */}
      <meta name="description" content={description} />
      <link rel="canonical" href={origin} />
      <meta name="robots" content="max-image-preview:large" />
      <link rel="alternate" hrefLang="en" href={origin} />
      <link rel="alternate" type="application/rss+xml" href={rss} />

      {/* App / PWA */}
      <meta name="application-name" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-title" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="dark light" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      {/* If you use Bing site verification, replace the value below */}
      {/* <meta name="msvalidate.01" content="REPLACE_ME" /> */}

      {/* Open Graph */}
      <meta property="og:site_name" content="Tobin Albanese" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={origin} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogAbs} />
      <meta property="og:image:secure_url" content={ogAbs} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tobin Albanese TA monogram logo" />
      <meta property="article:publisher" content="https://www.facebook.com/TobinAlbanese" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogAbs} />

      {/* Favicons & PWA Icons */}
      {/* --- IMPORTANT: unversioned .ico so Google picks it up --- */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* PNG fallbacks/sizes */}
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=5" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=5" color="#0b1221" />
      <link rel="manifest" href="/site.webmanifest?v=5" />

      {/* Windows tiles */}
      <meta name="msapplication-TileColor" content="#0b1221" />
      <meta name="msapplication-config" content="/browserconfig.xml?v=5" />
    </Head>
  );
}// components/LandingPage/MetaHead.jsx
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
  const abs = (p) => (p?.startsWith("http") ? p : `${origin}${p.startsWith("/") ? "" : "/"}${p}`);
  const rss = `${origin}/rss.xml`;
  const ogAbs = `${origin}/og-ta.png?v=6`; // bump if you change the OG image

  return (
    <Head>
      <title>{title}</title>

      {/* Basic SEO */}
      <meta name="description" content={description} />
      <link rel="canonical" href={origin} />
      <link rel="alternate" hrefLang="en" href={origin} />
      <link rel="alternate" type="application/rss+xml" href={rss} />
      <meta name="robots" content="max-image-preview:large" />

      {/* App / PWA */}
      <meta name="application-name" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-title" content="Tobin Albanese" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="dark light" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Tobin Albanese" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={origin} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogAbs} />
      <meta property="og:image:secure_url" content={ogAbs} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tobin Albanese TA monogram logo" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogAbs} />

      {/* Favicons — keep unversioned ICO; add explicit 48×48 PNG */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b1221" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Windows */}
      <meta name="msapplication-TileColor" content="#0b1221" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Head>
  );
}

