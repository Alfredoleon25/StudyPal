import { useState, useEffect } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming"];

export default function EditSubjects() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setSelectedSubjects(userData.subjects || []);
  }, []);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const updateSubjects = async () => {
    if (selectedSubjects.length === 0) {
      return alert("Select at least one subject");
    }

    setLoading(true);

    try {
      const response = await api(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjects: selectedSubjects }),
      });

      const updatedUser = await response.json();
      console.log("User updated:", updatedUser);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Redirect back based on role
      if (updatedUser.role === "learner") {
        window.location.href = "/tutors";
      } else {
        window.location.href = "/tutor-requests";
      }
    } catch (error: any) {
      console.error("Error updating subjects:", error);
      alert(error.message || "Failed to update subjects");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (user?.role === "learner") {
      window.location.href = "/tutors";
    } else {
      window.location.href = "/tutor-requests";
    }
  };

  if (!user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 600,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Edit Your Subjects</h1>
      <p style={{ color: "#666", marginBottom: 30 }}>
        Hi <strong>{user.name}</strong>! Update the subjects you're interested in:
      </p>

      <div style={{ marginBottom: 30 }}>
        {SUBJECTS.map((subject) => (
          <div
            key={subject}
            style={{
              padding: 15,
              marginBottom: 10,
              border: selectedSubjects.includes(subject)
                ? "2px solid #4CAF50"
                : "2px solid #e0e0e0",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: selectedSubjects.includes(subject)
                ? "#f1f8f4"
                : "#fff",
              transition: "all 0.2s",
              color:"black"
            }}
            onClick={() => toggleSubject(subject)}
          >
            <label style={{ 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center",
              fontSize: 16
            }}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                onChange={() => {}}
                style={{ marginRight: 10, width: 18, height: 18 }}
              />
              {subject}
            </label>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={goBack}
          disabled={loading}
          style={{
            padding: "12px 24px",
            border: "1px solid #ddd",
            borderRadius: 8,
            backgroundColor: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            opacity: loading ? 0.5 : 1,
            color:"black"
          }}
        >
          Cancel
        </button>
        <button
          onClick={updateSubjects}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}