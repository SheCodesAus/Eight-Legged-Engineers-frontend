import { useState } from "react";
import "../index.css";
import "./LoginPage.css";

function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <main className="login-page">
      <div className="login-panel">
        <div className="login-header">
          <h1 className="login-brand">
            <span className="text-pink">Play</span>{" "}
            <span className="text-sky">Pal</span>
          </h1>

          <p className="login-tagline">Find something fun, fast</p>

          <h2 className="login-title">
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
          </h2>
        </div>

        <div className="login-form">
          {mode === "signup" && (
            <input className="input-field login-input" placeholder="Name" />
          )}

          <input
            className="input-field login-input"
            placeholder={mode === "forgot" ? "Enter your email" : "Email"}
          />

          {mode !== "forgot" && (
            <input className="input-field login-input" placeholder="Password" />
          )}
        </div>

        <div className="login-actions">
          <button className="btn-primary login-cta">
            {mode === "login" && "Login"}
            {mode === "signup" && "Sign up"}
            {mode === "forgot" && "Send reset link"}
          </button>

          {mode === "login" && (
            <div className="login-links">
              <button className="link-btn link-pink" onClick={() => setMode("signup")}>
                Sign up
              </button>

              <button className="link-btn link-sky" onClick={() => setMode("forgot")}>
                Forgot password?
              </button>
            </div>
          )}

          {mode !== "login" && (
            <button className="link-btn link-gold" onClick={() => setMode("login")}>
              Back to login
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default LoginPage;