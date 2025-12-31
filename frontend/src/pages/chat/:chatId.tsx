
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
    if (chatId === "new") {
      // New chat - load pending chat info
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
      // Existing chat
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
     // Create chat with first message
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
        
        // Send first message
        const messageResponse = await api(`/chats/${newChat.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: user.id,
            content: newMessage,
          }),
        });

        const message = await messageResponse;
        console.log("this is my first messsage",message)
        // Clear pending chat and redirect to actual chat
        localStorage.removeItem("pendingChat");
        window.location.href = `/chat/${newChat.id}`;
      } else {
  console.log("this is a existing chat");
        // Existing chat - just send message
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      maxWidth: 800,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        padding: 20,
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 15
      }}>
        <button 
          onClick={() => window.location.href = "/dashboard"}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "1px solid #4CAF50",
            borderRadius: 8,
            backgroundColor: "#fff",
            color: "#4CAF50",
            fontWeight: "bold",
            fontSize: 14
          }}
        >
          ← Dashboard
        </button>
        
        <h2 style={{ margin: 0, fontSize: 20 }}>
          {otherUserName || "Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 20,
        backgroundColor: "#f5f5f5"
      }}>
        {messages.map((message) => {
          const isMe = message.sender.id === user.id;
          
          return (
            <div
              key={message.id}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                marginBottom: 15
              }}
            >
              <div style={{
                maxWidth: "70%",
                padding: 12,
                borderRadius: 12,
                backgroundColor: isMe ? "#4CAF50" : "#fff",
                color: isMe ? "#fff" : "#333",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}>
                {!isMe && (
                  <p style={{
                    margin: "0 0 5px 0",
                    fontSize: 12,
                    fontWeight: "bold",
                    opacity: 0.8
                  }}>
                    {message.sender.name}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 15 }}>
                  {message.content}
                </p>
                <p style={{
                  margin: "5px 0 0 0",
                  fontSize: 11,
                  opacity: 0.7
                }}>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
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
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          display: "flex",
          gap: 10
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 24,
            fontSize: 15,
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 24,
            cursor: "pointer",
            fontSize: 15,
            fontWeight: "bold"
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}