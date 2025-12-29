import { useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");

  const handleRoleSelection = async (selectedRole: "learner" | "tutor") => {
    if (!name) return alert("Enter your name");

    try {
      localStorage.setItem("tempuser", JSON.stringify({ name, role: selectedRole }));
      window.location.href = "/subjects";
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    }
  };

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 600,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Welcome to StudyPal!</h1>
      <p style={{ color: "#666", marginBottom: 30 }}>
        Please enter your name and select your role to continue:
      </p>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          fontSize: 16,
          borderRadius: 8,
          border: "1px solid #e0e0e0",
          marginBottom: 20,
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "#4CAF50"}
        onBlur={(e) => e.currentTarget.style.borderColor = "#e0e0e0"}
      />

      <div style={{ marginBottom: 15, fontWeight: 600, color: "#555" }}>
        Select Role:
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
        <button
          onClick={() => handleRoleSelection("learner")}
          style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: 8,
            border: "1px solid #4CAF50",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
        >
          Learner
        </button>

        <button
          onClick={() => handleRoleSelection("tutor")}
          style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: 8,
            border: "1px solid #2196F3",
            backgroundColor: "#2196F3",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0b7dda"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2196F3"}
        >
          Tutor
        </button>
      </div>
    </div>
  );
}
