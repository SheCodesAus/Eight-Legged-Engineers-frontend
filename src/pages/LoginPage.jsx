import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../index.css";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate("/home");
      }
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account before logging in.");
      }
    }

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset email sent. Check your inbox.");
      }
    }

    setLoading(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
    setMessage("");
  };

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
          <input
            className="input-field login-input"
            placeholder={mode === "forgot" ? "Enter your email" : "Email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {mode !== "forgot" && (
            <input
              className="input-field login-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
          {message && <p style={{ color: "green", fontSize: "0.875rem" }}>{message}</p>}
        </div>

        <div className="login-actions">
          <button
            className="btn-primary login-cta"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please wait..." : (
              <>
                {mode === "login" && "Login"}
                {mode === "signup" && "Sign up"}
                {mode === "forgot" && "Send reset link"}
              </>
            )}
          </button>

          {mode === "login" && (
            <div className="login-links">
              <button className="link-btn link-pink" onClick={() =>
                handleModeChange("signup")}>
                Sign up
              </button>

              <button className="link-btn link-sky" onClick={() =>
                handleModeChange("forgot")}>
                Forgot password?
              </button>
            </div>
          )}

          {mode !== "login" && (
            <button className="link-btn link-gold" onClick={() =>
              handleModeChange("login")}>
              Back to login
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default LoginPage;