import React, { useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9]+@example\.com$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    if (!emailRegex.test(email)) {
      return "Email must be in the format you@example.com and use only letters/numbers.";
    }
    if (!passwordRegex.test(password)) {
      return "Password can only contain letters and numbers.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setErrors(errorMsg);
      return;
    }

    alert("Login successful! (demo)");
    setEmail("");
    setPassword("");
    setErrors("");
  };

  const isFormValid = email.length > 0 && password.length > 0 && !validate();

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      {/*NAVBAR*/}
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
        <div className="base ">
          <NavbarMB />

          <section
            className="login-section"
            style={{
              maxWidth: 900,
              margin: "60px auto",
              padding: "40px 20px",
              border: "4px solid #b02621", // red border
              borderRadius: 8,
              backgroundColor: "transparent",
              color: "var(--c-text)",
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: 20 }}>
              Log in to{" "}
              <span style={{ color: "#b02621" }}>
                <em>Midnight Bureau</em>
              </span>
            </h2>
            <p style={{ fontSize: 18, maxWidth: 700, margin: "0 auto 30px" }}>
              Access exclusive content, track your subscriptions, and explore
              deeper insights.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Login successful! (demo)");
                e.target.reset();
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                marginTop: 30,
              }}
            >
              {/* Email */}
              <label
                htmlFor="email"
                style={{
                  fontSize: 16,
                  color: "var(--c-text)",
                  textAlign: "left",
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  padding: "12px 16px",
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #b02621",
                  backgroundColor: "transparent",
                  color: "var(--c-text)",
                  fontFamily: "inherit",
                }}
              />

              {/* Password */}
              <label
                htmlFor="password"
                style={{
                  fontSize: 16,
                  color: "var(--c-text)",
                  textAlign: "left",
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  padding: "12px 16px",
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #b02621",
                  backgroundColor: "transparent",
                  color: "var(--c-text)",
                  fontFamily: "inherit",
                }}
              />

              {/* Submit */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#d62827",
                  color: "var(--c-text)",
                  border: "none",
                  borderRadius: 4,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b02621")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d62827")
                }
              >
                Log In
              </button>

              <small style={{ marginTop: 10, fontSize: 14, color: "#555" }}>
                Don’t have an account?{" "}
                <a
                  href="/user/SignUp"
                  style={{ color: "#b02621", textDecoration: "underline" }}
                >
                  Sign up
                </a>
              </small>
            </form>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  maxWidth: 400,
  padding: "12px 16px",
  fontSize: 16,
  borderRadius: 4,
  border: "1px solid #b02621",
  backgroundColor: "transparent",
  color: "#000000",
  fontFamily: "inherit",
};

const buttonStyle = {
  color: "#000000",
  border: "none",
  borderRadius: 4,
  padding: "12px 24px",
  fontWeight: 700,
  fontSize: 16,
  fontFamily: "inherit",
  transition: "background-color 0.3s ease",
};
