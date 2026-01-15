import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
}

export default function ChatWindow() {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherUserName, setOtherUserName] = useState("");
  const [isNewChat, setIsNewChat] = useState(false);
  const [pendingChat, setPendingChat] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user || !user.id) {
      window.location.href = "/";
      return;
    }
    if (chatId === "new") {
      const pending = localStorage.getItem("pendingChat");
      if (!pending) {
        window.location.href = "/tutors";
        return;
      }
      const pendingData = JSON.parse(pending);
      setPendingChat(pendingData);
      setOtherUserName(pendingData.tutorName);
      setIsNewChat(true);
      setLoading(false);
    } else {
      fetchMessages();
      fetchChatDetails();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatDetails = async () => {
    try {
      const response = await api(`/chats/${user.id}`);
      const allChats = await response;
      const currentChat = allChats.find((c: any) => c.id === chatId);

      if (currentChat) {
        const otherUser = user.role === "learner" ? currentChat.tutor : currentChat.learner;
        setOtherUserName(otherUser.name);
      }
    } catch (error) {
      console.error("Error fetching chat details:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api(`/chats/${chatId}/messages`);
      const data = await response;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      if (isNewChat && pendingChat) {
        const chatResponse = await api("/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learnerId: pendingChat.learnerId,
            tutorId: pendingChat.tutorId,
            subject: pendingChat.subject,
          }),
        });

        const newChat = await chatResponse;

        const messageResponse = await api(`/chats/${newChat.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: user.id,
            content: newMessage,
          }),
        });

        const message = await messageResponse;
        localStorage.removeItem("pendingChat");
        window.location.href = `/chat/${newChat.id}`;
      } else {
        const response = await api(`/chats/${chatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: user.id,
            content: newMessage,
          }),
        });

        const message = await response;
        setMessages([...messages, message]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading chat...</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 15,
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              border: "1px solid #667eea",
              borderRadius: 8,
              backgroundColor: "#fff",
              color: "#667eea",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            ← Dashboard
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>{otherUserName || "Chat"}</h2>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {messages.map((message) => {
            const isMe = message.sender.id === user.id;
            return (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: 14,
                    borderRadius: 20,
                    backgroundColor: isMe
                      ? "rgba(102,126,234,0.3)"
                      : "rgba(255,255,255,0.8)",
                    color: isMe ? "#1a1a1a" : "#333",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    backdropFilter: isMe ? "none" : "blur(6px)",
                  }}
                >
                  {!isMe && (
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: 12,
                        fontWeight: "bold",
                        opacity: 0.7,
                      }}
                    >
                      {message.sender.name}
                    </p>
                  )}
                  <p style={{ margin: 0, fontSize: 15 }}>{message.content}</p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: 11,
                      opacity: 0.6,
                      textAlign: "right",
                    }}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          style={{
            padding: 20,
            display: "flex",
            gap: 10,
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: 24,
              border: "1px solid #ddd",
              fontSize: 15,
              outline: "none",
              backgroundColor: "rgba(255,255,255,0.9)",
              color:"black"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 28px",
              borderRadius: 24,
              border: "none",
              backgroundColor: "#667eea",
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
