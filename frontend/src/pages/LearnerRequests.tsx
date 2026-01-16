import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
interface Request {
  id: string;
  learnerId: string;
  tutorId: string;
  subject: string;
  messages: Array<{ id:string; content: string; createdAt: string }>;
  createdAt: string;
  tutor?: {
    id: string;
    name: string;
  };
}

export default function LearnerRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
        if (!user || !user.id) {
      navigate("/");
      return;
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api(`/requests/learner/${user.id}`);
      setRequests(response);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  if (loading) {
return (
  <div style={{ 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 60, 
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    minHeight: "200px"
  }}>
    {/* The Spinner Circle */}
    <div className="loader-circle" style={{
      width: 50,
      height: 50,
      border: "5px solid rgba(102, 126, 234, 0.1)", // Light track
      borderTop: "5px solid #667eea", // Purple active part
      borderRadius: "50%",
      marginBottom: 20
    }} />
    
    <div style={{ fontWeight: "500", color: "#764ba2" }}>
      Loading requests...
    </div>

    {/* Add this style block if you haven't already included it in your page */}
    <style>{`
      .loader-circle {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
  }
                
  return (
    <div style={{ 
      minHeight: "100vh",
      width:"100%",
      padding: 40,
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
      overflowX: "hidden", // prevent horizontal scroll
      overflowY: "auto",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 700,
        padding: 40,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        boxSizing: "border-box",
      }}>
        <div           style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            flexWrap: "wrap", // wrap on small screens
          }}>
         
        <h1 style={{ fontSize: 32, marginBottom: 10, color: "#fff" }}>
          My Sent Requests
        </h1>

                  <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "8px 14px",
              backgroundColor: "#fff",
              color: "#4c63afff",
              border: "2px solid #4c99afff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              flexShrink: 0, // prevent shrinking
            }}
          >
            ← Dashboard
          </button>

          </div>
                  <p style={{ fontSize: 16, color: "#eee", marginBottom: 30 }}>
          Hello, <strong>{user.name}</strong>! Here are the help requests you've sent.
        </p>

        {requests.length === 0 ? (
          <div style={{
            padding: 40,
            textAlign: "center",
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#fff",
          }}>
            <p style={{ fontSize: 18, marginBottom: 10 }}>📝 No requests sent yet</p>
            <p style={{ fontSize: 14 }}>
              Go to <a href="/tutors" style={{ color: "#4CAF50" }}>Find Tutors</a> to request help
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {requests.map((request) => {
              const lastMessage = request.messages[0];

              return (
                <div
                  key={request.id}
                  onClick={() => openChat(request.id)}
                  style={{
                    cursor: "pointer",
                    padding: 20,
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "2px solid #2196F3",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    boxSizing: "border-box",
                    width: "100%", // prevent horizontal overflow
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <span style={{
                    backgroundColor: "#2196F3",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    alignSelf: "flex-start",
                  }}>
                    {request.subject}
                  </span>

                  <div style={{
                    padding: 15,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 6,
                    borderLeft: "3px solid #2196F3",
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "#333",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // prevent horizontal scroll
                    }}>
                      {lastMessage?.content || "No message yet"}
                    </p>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 13,
                    color: "#555",
                    flexWrap: "wrap",
                  }}>
                    <span>
                      Sent to: <strong style={{  fontSize: 14 }}>
                        {request.tutor?.name || "Unknown Tutor"}
                      </strong>
                    </span>
                    <span>
                      {new Date(request.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
