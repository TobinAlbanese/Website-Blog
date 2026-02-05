import React, { useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";
import { supabase } from "../../lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email?.includes("@")) return "Please enter a valid email address.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const errorMsg = validate();
    if (errorMsg) {
      setErrors(errorMsg);
      return;
    }

    setLoading(true);

    try {
      // 1) Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const user = data?.user;
      if (!user) {
        throw new Error("Login succeeded but no user returned.");
      }

      // 2) Fetch role from profiles (RLS allows user to read their own row)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // If for some reason profile is missing, default safely
        console.error("Profile lookup failed:", profileError.message);
      }

      const role = profile?.role || "user";

      setLoading(false);

      // 3) Redirect based on role
      if (role === "admin") {
        window.location.assign("/admin");
      } else {
        window.location.assign("/MidnightBureau");
      }
    } catch (err) {
      setLoading(false);
      setErrors(err?.message || "Login failed.");
    }
  };

  const isFormValid = email.length > 0 && password.length > 0 && !validate();

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <MetaHead />
      <SvgHead />

      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2" />
        </div>
        <div id="js-dfp-tag-outofpage--2" />

        <div className="base">
          <NavbarMB />

          <section
            className="login-section"
            style={{
              maxWidth: 900,
              margin: "60px auto",
              padding: "40px 20px",
              border: "4px solid #b02621",
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
              onSubmit={handleSubmit}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />

              {errors && (
                <div
                  style={{
                    color: "#b02621",
                    fontSize: 14,
                    maxWidth: 520,
                    marginTop: 4,
                  }}
                >
                  {errors}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid || loading}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#d62827",
                  color: "var(--c-text)",
                  cursor: !isFormValid || loading ? "not-allowed" : "pointer",
                  opacity: !isFormValid || loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b02621")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d62827")
                }
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <small
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "var(--c-text-secondary)",
                }}
              >
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
  color: "var(--c-text)",
  fontFamily: "inherit",
};

const buttonStyle = {
  border: "none",
  borderRadius: 4,
  padding: "12px 24px",
  fontWeight: 700,
  fontSize: 16,
  fontFamily: "inherit",
  transition: "background-color 0.3s ease",
};
