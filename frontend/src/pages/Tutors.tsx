import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const fetchAllTutors = async () => {
      try {
        const params = user.subjects.join(",")
        const response = await api(`/tutors?subject=${params}`);
        const data = await response
        console.log(response)
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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div style={{ padding: 20 }}>
      <h1>Hi {user.name}</h1>
      <div style={{padding:"5px, 100px",marginBottom: 20}}>
      Available tutors for: <strong>{user.subjects?.join(", ")}</strong>
              <button
          onClick={() => window.location.href = "/edit-subjects"}
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#4CAF50",
          }}
        >
          Edit Subjects
        </button>
      {tutors.length === 0 && <p>No tutors found.</p>}
      </div>
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <p><strong>{tutor.name}</strong></p>
          <p>Subjects: {tutor.subjects.join(", ")}</p>
            <button onClick={() => requestHelp(tutor.id)}>
              Request Help
            </button>
          
        </div>
      ))}
    </div>
  );
}
