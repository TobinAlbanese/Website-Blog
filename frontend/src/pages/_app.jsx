import "../styles/globals.css";
import "../styles/media1.css";
import "../styles/media2.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* First focusable thing in <body> */}
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      {/* Give the target an id and make it focusable */}
      <div id="content" tabIndex="-1">
        <Component {...pageProps} />
      </div>
    </>
  );
}
