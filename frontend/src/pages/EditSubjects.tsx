import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
const SUBJECTS = [
  { name: "Calculus", icon: "∫" },
  { name: "Physics", icon: "⚛️" },
  { name: "Programming", icon: "💻" },
  { name: "Chemistry", icon: "🧪" },
  { name: "Biology", icon: "🧬" },
  { name: "Statistics", icon: "📊" },
  { name: "Linear Algebra", icon: "📐" },
  { name: "Engineering", icon: "🏗️" },
  { name: "Economics", icon: "📈" },
  { name: "Psychology", icon: "🧠" }
];

export default function EditSubjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setLearnSubjects(userData.learnSubjects || []);
    setTeachSubjects(userData.teachSubjects || []);
  }, []);

  const toggleLearnSubject = (subject: string) => {
    if (teachSubjects.includes(subject)) {
      // Auto-switch: remove from teaching, add to learning
      setTeachSubjects((prev) => prev.filter((s) => s !== subject));
      setLearnSubjects((prev) => [...prev, subject]);
    } else {
      // Normal toggle
      setLearnSubjects((prev) =>
        prev.includes(subject)
          ? prev.filter((s) => s !== subject)
          : [...prev, subject]
      );
    }
  };

  const toggleTeachSubject = (subject: string) => {
    if (learnSubjects.includes(subject)) {
      // Auto-switch: remove from learning, add to teaching
      setLearnSubjects((prev) => prev.filter((s) => s !== subject));
      setTeachSubjects((prev) => [...prev, subject]);
    } else {
      // Normal toggle
      setTeachSubjects((prev) =>
        prev.includes(subject)
          ? prev.filter((s) => s !== subject)
          : [...prev, subject]
      );
    }
  };

  const updateSubjects = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }

    setLoading(true);

    try {
      const response = await api(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ 
          learnSubjects, 
          teachSubjects 
        }),
      });

      const updatedUser = await response;
      console.log("User updated:", updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error updating subjects:", error);
      alert(error.message || "Failed to update subjects");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/dashboard");
    
  };

  if (!user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

return (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#555a60",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 40,
      boxSizing: "border-box",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}
  >
    <h1
      style={{
        marginBottom: 40,
        color: "white",
        textAlign: "center",
        fontSize: 36,
        fontWeight: "bold",
      }}
    >
      Edit Your Subjects
    </h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 50,
        // height: "calc(100vh - 200px)",
        // overflowY: "auto",
      }}
    >
      {/* LEARN */}
      <div>
        <h2 style={{ marginBottom: 20, color: "#2196F3" }}>
          📚 Learn
        </h2>
        {SUBJECTS.map((s) => {
          const active = learnSubjects.includes(s.name);
          return (
            <div
              key={`learn-${s.name}`}
              onClick={() => toggleLearnSubject(s.name)}
              style={{
                padding: 22,
                marginBottom: 16,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.25s ease",
                background: active ? "#e3f2fd" : "#ffffff",
                border: active
                  ? "2px solid #2196F3"
                  : "2px solid transparent",
                boxShadow: active
                  ? "0 12px 32px rgba(33,150,243,0.3)"
                  : "0 6px 14px rgba(0,0,0,0.08)",
                transform: active ? "scale(1.04)" : "scale(1)",
                color: "#000",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <span>{s.name}</span>
            </div>
          );
        })}
      </div>

      {/* TEACH */}
      <div>
        <h2 style={{ marginBottom: 20, color: "#4CAF50" }}>
          👨‍🏫 Teach
        </h2>
        {SUBJECTS.map((s) => {
          const active = teachSubjects.includes(s.name);
          return (
            <div
              key={`teach-${s.name}`}
              onClick={() => toggleTeachSubject(s.name)}
              style={{
                padding: 22,
                marginBottom: 16,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.25s ease",
                background: active ? "#e8f5e9" : "#ffffff",
                border: active
                  ? "2px solid #4CAF50"
                  : "2px solid transparent",
                boxShadow: active
                  ? "0 12px 32px rgba(76,175,80,0.3)"
                  : "0 6px 14px rgba(0,0,0,0.08)",
                transform: active ? "scale(1.04)" : "scale(1)",
                color: "#000",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <span>{s.name}</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* ACTIONS */}
    <div
      style={{
        marginTop: 50,
        display: "flex",
        gap: 12,
        justifyContent: "center",
      }}
    >
      <button
        onClick={goBack}
        disabled={loading}
        style={{
          padding: "14px 32px",     
          borderRadius: 10,
          border: "2px solid #ddd",
          background: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 16,
          opacity: loading ? 0.6 : 1,
          color:"black"
        }}
      >
        Back
      </button>

      <button
        onClick={updateSubjects}
        disabled={loading}
        style={{
          padding: "14px 48px",
          borderRadius: 10,
          border: "none",
          background: "#fff",
          color: "black",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: 16,
          boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
          flex: 1,
          maxWidth: 220,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
);

}