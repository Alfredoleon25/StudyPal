import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Chat {
  id: string;
  subject: string;
  learner: { id: string; name: string };
  tutor: { id: string; name: string };
  messages: Array<{ content: string; createdAt: string }>;
  createdAt: string;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api(`/chats/${user.id}`);
      const data = await response;
      console.log("this is the response",data)
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const openChat = (chatId: string) => {
    window.location.href = `/chat/${chatId}`;
  };

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 800,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ color: "#666", marginBottom: 20 }}>
       <strong>My chats</strong>!
      </h1>
      <div style={{        padding: 20,
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        // justifyContent: "flex-end",
        gap: 120
        }}>
          <button 
          onClick={() => window.location.href = "/tutors"}
          style={{
            justifyContent: "flex-end",
            // padding: "10px 20px",
            cursor: "pointer",
            border: "1px solid #4CAF50",
            borderRadius: 8,
            // backgroundColor: "#fff",
            color: "#4CAF50",
            fontWeight: "bold",
            fontSize: 14
          }}
        >
         Go to Tutors
        </button>
        <div style={{padding:20}}>Current Mode:{user.role}</div>
                  <button 
          onClick={() => window.location.href = "/tutors"}
          style={{
            justifyContent: "flex-end",
            // padding: "10px 20px",
            cursor: "pointer",
            border: "1px solid #4CAF50",
            borderRadius: 8,
            // backgroundColor: "#fff",
            color: "#4CAF50",
            fontWeight: "bold",
            fontSize: 14
          }}
        >
         Change Modes 
        </button>
        </div>

      {chats.length === 0 && (
        <div style={{
          padding: 40,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
        }}>
          <p>💬 No chats yet</p>
          <p style={{ fontSize: 14, color: "#666" }}>
            {user.role === "learner" 
              ? "Request help from a tutor to start chatting"
              : "Wait for learners to request your help"}
          </p>
        </div>
      )}

      {chats.map((chat) => {
        // const otherUser = user.role === "learner" ? chat.tutor : chat.learner;
        // console.log("this is the name of the other user",otherUser.name)
        const otherUser = chat.tutor
        const lastMessage = chat.messages[0];

        return (
          <div
            key={chat.id}
            onClick={() => openChat(chat.id)}
            style={{
              border: "1px solid #e0e0e0",
              padding: 20,
              marginBottom: 15,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 ,  color: "black",}}>{otherUser.name}</h3>
                <span style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  marginTop: 5,
                  display: "inline-block"
                }}>
                  {chat.subject}
                </span>
              </div>
              <span style={{ fontSize: 12, color: "#999" }}>
                {new Date(chat.createdAt).toLocaleDateString()}
              </span>
            </div>

            {lastMessage && (
              <p style={{ 
                margin: 0, 
                color: "#666", 
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {lastMessage.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}