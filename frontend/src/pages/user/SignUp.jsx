import React, { useState } from "react";
import MetaHead from "../../components/LandingPage/MetaHead.jsx";
import SvgHead from "../../components/LandingPage/svgHead.jsx";
import Footer from "../../components/LandingPage/Footer.jsx";
import NavbarMB from "../../components/LandingPage/NavbarMB.jsx";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9]+@example\.com$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    if (!emailRegex.test(email)) {
      return "Email must be in the format you@example.com with only letters and numbers.";
    }
    if (email !== confirmEmail) {
      return "Emails do not match.";
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

    alert("Signup successful! (demo)");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setErrors("");
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
    
    
    
    {/*NAVBAR*/}
      <div className="dialog-off-canvas-main-canvas" data-off-canvas-main-canvas="">
        <div className="text-align-center pt-15 d-flex dfp-tag-wrapper justify-around">
          <div id="js-dfp-tag-top--2"></div>
        </div>
        <div id="js-dfp-tag-outofpage--2"></div>
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
          color: "#000000",
          textAlign: "center",
          fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: 20 }}>
          Create your <span style={{ color: "#b02621" }}>Midnight Bureau</span> account
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
            <div style={{ color: "#b02621", fontSize: 14, marginTop: -10 }}>
              {errors}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              ...buttonStyle,
              backgroundColor: isFormValid ? "#d62827" : "#d62827",
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
          >
            Sign Up
          </button>

          <small style={{ marginTop: 10, fontSize: 14, color: "#000000" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#b02621", textDecoration: "underline" }}>
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