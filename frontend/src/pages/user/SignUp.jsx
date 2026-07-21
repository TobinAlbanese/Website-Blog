import React, { useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";
import { supabase } from "../../lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email?.includes("@")) return "Please enter a valid email address.";
    if (email !== confirmEmail) return "Emails do not match.";
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/MidnightBureau`
            : undefined,
      },
    });

    if (error) {
      setLoading(false);
      setErrors(error.message);
      return;
    }

    const user = data?.user;

    // Create profiles row for this user (role defaults to 'user')
    if (user?.id) {
      const base = email.split("@")[0] || "user";
      const rawUsername = base.toLowerCase().replace(/[^a-z0-9_]/g, "");
      const username = rawUsername.slice(0, 24) || "user";

      const { error: profErr } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username,
          display_name: base,
          // role defaults to 'user' in DB; you only manually set yourself 'admin'
        },
      ]);

      if (profErr && profErr.message?.toLowerCase().includes("duplicate")) {
        const suffix = Math.random().toString(36).slice(2, 8);
        await supabase.from("profiles").insert([
          {
            id: user.id,
            username: `${username}_${suffix}`.slice(0, 30),
            display_name: base,
          },
        ]);
      }
    }

    setLoading(false);

    // If email confirmation is ON, user might not be "logged in" yet,
    // but they are created. For now, just send them to Research Journal.
    window.location.href = "/MidnightBureau";
  };

  const isFormValid =
    email.length > 0 &&
    confirmEmail.length > 0 &&
    password.length > 0 &&
    !validate();

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

        <div className="base d-flex">
          <NavbarMB />

          <section
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
              Create your{" "}
              <span style={{ color: "#b02621" }}>Research Journal</span> account
            </h2>

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
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />

              <input
                type="email"
                placeholder="confirm email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                style={inputStyle}
                required
              />

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />

              {errors && (
                <div
                  style={{
                    color: "#b02621",
                    fontSize: 14,
                    marginTop: -10,
                    maxWidth: 520,
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
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

              <small
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "var(--c-text-secondary)",
                }}
              >
                Already have an account?{" "}
                <a
                  href="/user/login"
                  style={{ color: "#b02621", textDecoration: "underline" }}
                >
                  Log in
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
