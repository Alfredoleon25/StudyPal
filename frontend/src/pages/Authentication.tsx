import {useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
type AuthMode = "login" | "signup";

interface Props {
  onClose: () => void;
}
export default function AuthModal({ onClose }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      if (authMode === "signup") {
        const { data ,error } = await supabase.auth.signUp({ email, password,options: {
      data: {
        onboarding_completed: false // 👈 Initialize the flag
      }
    } });
    console.log("Signup data:", data);
        if(error) throw error;
        if (data.session){
          // localStorage.setItem("supabase_token", data.session.access_token);
          navigate("/registration");
          //  window.location.href = "/registration";}}
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if(error) throw error;
          // localStorage.setItem("supabase_token", data.session.access_token);
          //  window.location.href = "/dashboard";
               // 🔑 Check if profile exists
            const profile = await api("/me");

            if (profile) {
              // ✅ Existing user → dashboard
              localStorage.setItem("user", JSON.stringify(profile));
              navigate("/dashboard");
              // window.location.href = "/dashboard";
              } else {
                // 🆕 New user → registration
                navigate("/registration");
                // window.location.href = "/registration";
              }

      }
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={e => e.stopPropagation()}>

        <button style={styles.close} onClick={onClose}>✖</button>

        <div style={styles.icon}>🔐</div>

        <h1 style={styles.title}>
          {authMode === "signup" ? "Create an account" : "Welcome back"}
        </h1>

        <p style={styles.subtitle}>
          Learn and teach together on StudyPal
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <button onClick={handleAuth} disabled={loading} style={styles.button}>
          {loading ? "Please wait..." : authMode === "signup" ? "Sign Up" : "Login"}
        </button>

        <p style={styles.switch}>
          {authMode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <button
            onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
            style={styles.link}
          >
            {authMode === "signup" ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  } as React.CSSProperties,

  container: {
    width: "100%",
    maxWidth: 480,
    padding: 50,
    backgroundColor: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    position: "relative",
  } as React.CSSProperties,

  icon: {
    width: 80,
    height: 80,
    margin: "0 auto 30px",
    backgroundColor: "#667eea",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    color: "white",
  } as React.CSSProperties,

  title: {
    fontSize: 32,
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 10,
    color:"black"
  } as React.CSSProperties,

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding:16,
    fontSize: 16,
    borderRadius: 12,
    border: "2px solid #e0e0e0",
    marginBottom: 15,
    background:"white",
    boxSizing: "border-box",
    color:"black"
  } as React.CSSProperties,

  button: {
    width: "100%",
    padding: 16,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: 700,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    marginTop: 10,
  } as React.CSSProperties,

  error: {
    color: "#e53935",
    marginBottom: 10,
    fontSize: 14,
  } as React.CSSProperties,

  switch: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color:"black"
  } as React.CSSProperties,

  link: {
    background: "none",
    border: "none",
    color: "#667eea",
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties,

  close: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color:"#666"
  } as React.CSSProperties,
};
