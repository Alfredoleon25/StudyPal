import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (!user || !user.learnSubjects?.length) return;

    const fetchFilteredTutors = async () => {
      try {
        const subjectsParam = user.learnSubjects.join(",");
        const response = await api(`/tutors?subjects=${subjectsParam}`);
        setTutors(response);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };

    fetchFilteredTutors();
  }, []);

  const requestHelp = async (tutorId: string, tutorName: string) => {
    try {
      const chatsResponse = await api(`/chats/${user.id}`);
      const allChats = await chatsResponse;

      const existingChat = allChats.find((chat: any) =>
        ((chat.learnerId === user.id && chat.tutorId === tutorId) ||
          (chat.tutorId === user.id && chat.learnerId === tutorId)) &&
        chat.subject === user.learnSubjects[0]
      );

      if (existingChat) {
        window.location.href = `/chat/${existingChat.id}`;
      } else {
        const pendingChat = {
          learnerId: user.id,
          tutorId,
          tutorName,
          subject: user.learnSubjects[0],
        };
        localStorage.setItem("pendingChat", JSON.stringify(pendingChat));
        window.location.href = `/chat/new`;
      }
    } catch {
      alert("Failed to start chat");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "auto-flex",
        justifyContent: "center",
        backgroundColor: "#555a60",
                // background: "linear-gradient(135deg, #667eea 0%, #764ba2 80%)",
                        background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow:"auto",
        paddingTop: 40,
        paddingBottom: 40,
        
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          padding: 40,
          backgroundColor: "#47494dff",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* ---------- HEADER ROW ---------- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              color: "#fff",
            }}
          >
            Tutors for your subjects
          </h1>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              padding: "8px 14px",
              backgroundColor: "#fff",
              color: "#4CAF50",
              border: "2px solid #4CAF50",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← Dashboard
          </button>
        </div>

        {/* ---------- USER SUBJECTS + EDIT BUTTON ---------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {user.learnSubjects?.map((subject: string) => (
            <span
              key={subject}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                backgroundColor: "#e3f2fd",
                color: "#1565c0",
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #bbdefb" ,
              }}
            >
              {subject}
            </span>
          ))}

          <button
            onClick={() => (window.location.href = "/edit-subjects")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Edit subjects
          </button>
        </div>

        {/* ---------- TUTORS LIST ---------- */}
        {tutors.length === 0 ? (
          <div
            style={{
              padding: 30,
              textAlign: "center",
              border: "1px dashed #ccc",
              borderRadius: 12,
              color: "#fff",
            }}
          >
            <p style={{ fontSize: 18, marginBottom: 8 }}>
              No tutors available right now
            </p>
            <p style={{ color: "#ccc" }}>
              Try checking back later or editing your subjects.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  borderRadius: 12,
                  backgroundColor: "#fff",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#222" }}>
                    {tutor.name}
                  </h3>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {tutor.teachSubjects?.map((subject: string) => (
                      <span
                        key={subject}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 16,
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                          fontSize: 13,
                          border: "1px solid #c8e6c9",
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => requestHelp(tutor.id, tutor.name)}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
