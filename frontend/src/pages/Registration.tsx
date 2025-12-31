import { useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setError("");

    // Save name temporarily
    localStorage.setItem("tempuser", JSON.stringify({ name }));

    // Redirect
    window.location.href = "/subjects";
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#555a60",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 40,
          backgroundColor: "#47494dff",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            marginBottom: 8,
            fontWeight: 700,
          }}
        >
          Welcome to StudyPal
        </h1>

        <p
          style={{
            color: "#777",
            marginBottom: 30,
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          Connect with peers to learn and teach together
        </p>

        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            What's your name?
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: 16,
              borderRadius: 10,
              border: error ? "2px solid #e53935" : "2px solid #ddd",
              outline: "none",
              backgroundColor: "#fafafa",
              transition: "border 0.2s ease",
              boxSizing: "border-box",
              color:"black"
            }}
          />

          {error && (
            <div
              style={{
                color: "#e53935",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {error}
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            marginTop: 24,
            padding: 14,
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#43a047")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#4CAF50")
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}
