import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const fetchAllTutors = async () => {
      try {
        const params = user.subjects.join(",");
        const data = await api(`/tutors?subject=${params}`);
        setTutors(data);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };

    fetchAllTutors();
  }, []);

  const requestHelp = async (tutorId: string) => {
    try {
      const response = await api("/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learnerId: user.id,
          tutorId,
          subject: user.subjects[0],
        }),
      });

      window.location.href = `/chat/${response.chatId}`;
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request");
    }
  };

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Available Tutors</h1>

      <div style={{ marginBottom: 20 }}>
        Tutors for <strong>{user.subjects?.join(", ")}</strong>
        <button
          onClick={() => (window.location.href = "/edit-subjects")}
          style={{
            marginLeft: 10,
            backgroundColor: "#fff",
            color: "#3c463dff",
            border: "1px solid #848784ff",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Edit Subjects
        </button>
      </div>

      {tutors.length === 0 && <p>No tutors found.</p>}

      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <p>
            <strong>{tutor.name}</strong>
          </p>
          <p>Subjects: {tutor.subjects.join(", ")}</p>
          <button onClick={() => requestHelp(tutor.id)}>
            Request Help
          </button>
        </div>
      ))}
    </div>
  );
}
