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
  { name: "Psychology", icon: "🧠" },
];

export default function Subjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [tempUser, setTempUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const temp = localStorage.getItem("tempuser");

    if (!temp) {
      navigate("/")
      return;
    }
    setTempUser(JSON.parse(temp));
  }, []);

  // Exclusive toggle: selecting one side deselects the other
  const toggleLearnSubject = (subject: string) => {
    setLearnSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setTeachSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const toggleTeachSubject = (subject: string) => {
    setTeachSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setLearnSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const createUser = async () => {
    // const token = localStorage.getItem("supabase_token");

    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }
    if (!tempUser) return;
    
    const user = await api("/users", {
      method: "POST",
      body: JSON.stringify({
        name: tempUser.name,
        learnSubjects,
        teachSubjects,
      }),
    });
    localStorage.setItem("user",JSON.stringify(user))
    localStorage.removeItem("tempuser")
    navigate("/dashboard");

  };

  if (!tempUser) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
      width:"100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundColor: "#555a60", // dark gray background covers whole page
        padding: 40,
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* <h1
        style={{
          marginBottom: 40,
          color: "white",
          textAlign: "center",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        Select Your Subjects
      </h1> */}
            <h1
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: "white",
          marginBottom: 10,
        }}
      >
        Hi {tempUser.name} 
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.85)",
          fontSize: 17,
          marginBottom: 50,
        }}
      >
        Pick what you want to learn or teach
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 50,
          // height: "calc(100vh - 160px)", // full height minus padding and heading
          // overflowY: "auto",
        }}
      >
        {/* LEARN */}
        <div>
          <h2 style={{ marginBottom: 20, color: "#3341a9ff" }}>
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
                  border: active ? "2px solid #2196F3" : "2px solid transparent",
                  boxShadow: active
                    ? "0 12px 32px rgba(33,150,243,0.3)"
                    : "0 6px 14px rgba(0,0,0,0.08)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  color: "#000", // black text for visibility
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
                  border: active ? "2px solid #4CAF50" : "2px solid transparent",
                  boxShadow: active
                    ? "0 12px 32px rgba(76,175,80,0.3)"
                    : "0 6px 14px rgba(0,0,0,0.08)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  color: "#000", // black text for visibility
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

      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate('/registration')}
          style={{
            padding: "14px 32px",
            borderRadius: 10,
            border: "2px solid #ddd",
            background: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            color:"black"
          }}
        >
          Back
        </button>

        <button
          onClick={createUser}
          style={{
            padding: "14px 48px",
            borderRadius: 10,
            border: "none",
            background:  "#fff",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
            flex: 1,
            maxWidth: 200,
             
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
