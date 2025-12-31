import { useEffect, useState } from "react";
import { api } from "../services/api";

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api(`/requests/learner/${user.id}`);
      const data = await response;
      console.log(data)
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };
  const openChat = (chatId: string) => {
    window.location.href = `/chat/${chatId}`;}

  if (loading) {
    return (
      <div style={{ 
        padding: 40, 
        textAlign: "center",
        fontSize: 18,
        color: "#666"
      }}>
        Loading requests...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 800,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ 
        fontSize: 32,
        marginBottom: 10,
        color: "#333"
      }}>
        My Sent Requests
      </h1>
      
      <p style={{ 
        fontSize: 16, 
        color: "#666",
        marginBottom: 30
      }}>
        Hello, <strong>{user.name}</strong>! Here are the help requests you've sent.
      </p>

      {requests.length === 0 && (
        <div style={{
          padding: 40,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          color: "#666"
        }}>
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            📝 No requests sent yet
          </p>
          <p style={{ fontSize: 14 }}>
            Go to <a href="/tutors" style={{ color: "#4CAF50" }}>Find Tutors</a> to request help
          </p>
        </div>
      )}

      {requests.map((request) => (
        <div
          key={request.id}
          onClick={() => openChat(request.id)}
          style={{
            cursor:"pointer",
            border: "1px solid #e0e0e0",
            padding: 20,
            marginBottom: 20,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <span style={{ 
              backgroundColor: "#2196F3", 
              color: "white", 
              padding: "4px 12px", 
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600
            }}>
              {request.subject}
            </span>
          </div>
          
          <div style={{ 
            padding: 15,
            backgroundColor: "#f9f9f9",
            borderRadius: 6,
            marginBottom: 12,
            borderLeft: "3px solid #2196F3"
          }}>
            <p style={{ 
              margin: 0,
              fontSize: 15,
              lineHeight: 1.5,
              color: "#333"
            }}>
              {request.messages[0]?.content}
            </p>
          </div>
          
          <div style={{ 
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#999"
          }}>
            <span>
              Sent to: <strong style={{ 
                color: "#4CAF50",
                fontSize: 14
              }}>
                {request.tutor?.name || "Unknown Tutor"}
              </strong>
            </span>
            <span>
              {new Date(request.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}