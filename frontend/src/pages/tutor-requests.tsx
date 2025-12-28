import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Request {
  id: string;
  learnerId: string;
  tutorId: string;
  subject: string;
  messages: Array<{ content: string; createdAt: string }>;
  createdAt: string;
  learner?: {
    id: string;
    name: string;
  };

}

export default function TutorRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api(`/chats/${user.id}`);
      setRequests(response);
      console.log("This is the request",response)
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };
  const openChat = (chatId: string) => {
    window.location.href = `/chat/${chatId}`;
  };
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
      fontFamily: "system-ui, -apple-system, sans-serif",
      
    }}>
      <div style={{ marginBottom: 30, gap:50,display: "flex",}}>
      <h1 style={{ 
        fontSize: 32,
        marginBottom: 10,
        color: "#ded1d1ff"
      }}>
        My Help Requests
      </h1>
      
              <button 
          onClick={() => window.location.href = "/tutors"}
          style={{
            justifyContent: "flex-end",
            // padding: "10px 20px",
            cursor: "pointer",
            border: "1px solid #4CAF50",
            borderRadius: 10,
            // backgroundColor: "#fff",
            color: "#4CAF50",
            fontWeight: "bold",
            fontSize: 14
          }}
        >
         Change to Learner
        </button>
       </div>
      {requests.length === 0 && (   
        <div style={{
          padding: 40,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          color: "#666"
        }}>
          <p style={{ fontSize: 18, marginBottom: 10 }}>
            📚 No requests yet
          </p>
          <p style={{ fontSize: 14 }}>
            Learners will see you when they browse tutors for: <strong>{user.subjects?.join(", ")}</strong>
          </p>
        </div>
      )}

      {requests.map((request) => (
        // const lastMessage = request.messages[0]

        <div
          key={request.id}
          onClick={() => openChat(request.id)}
          style={{
            cursor: "pointer",
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
              backgroundColor: "#4CAF50", 
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
            borderLeft: "3px solid #4CAF50"
          }}>
            <p style={{ 
              margin: 0,
              fontSize: 15,
              lineHeight: 1.5,
              color: "#333"
            }}>
              {request.messages[0].content}
        {/* {lastMessage.content} */}
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
              From: <code style={{ 
                backgroundColor: "#f0f0f0",
                padding: "2px 6px",
                borderRadius: 3,
                fontSize: 12
              }}>
                {/* {request.learnerId} */}
                {request.learner?.name || "Unknown Learner"}
              </code>
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