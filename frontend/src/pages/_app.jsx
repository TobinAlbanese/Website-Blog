import "../styles/globals.css";
import "../styles/media1.css";
import "../styles/media2.css";
import "../styles/admin.css"; 

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <div id="content" tabIndex="-1">
        <Component {...pageProps} />
      </div>

      <Analytics />
      <SpeedInsights />
    </>
  );
}
