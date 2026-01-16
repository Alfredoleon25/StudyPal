// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { api } from "../../services/api";
// import { useNavigate } from "react-router-dom";

// interface Message {
//   id: string;
//   content: string;
//   createdAt: string;
//   sender: { id: string; name: string };
// }

// export default function ChatWindow() {
//   const { chatId } = useParams<{ chatId: string }>();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [otherUserName, setOtherUserName] = useState("");
//   const [isNewChat, setIsNewChat] = useState(false);
//   const [pendingChat, setPendingChat] = useState<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || !user.id) {
//       navigate("/");
//       return;
//     }
//     if (chatId === "new") {
//       console.log("Setting up new chat");
//       const pending = localStorage.getItem("pendingChat");
//       if (!pending) {
//         navigate("/tutors");
//         return;
//       }
//       const pendingData = JSON.parse(pending);
//       console.log("Pending chat data:", pendingData);
//       setPendingChat(pendingData);
//       setOtherUserName(pendingData.tutorName);
//       setIsNewChat(true);
//       setLoading(false);
//     } else {
//       console.log("Loading existing chat with ID:", chatId);
//       fetchMessages();
//       fetchChatDetails();
//       const interval = setInterval(fetchMessages, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [chatId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const fetchChatDetails = async () => {
//     try {
//       const response = await api(`/chats/${user.id}`);
//       const allChats = await response;
//       const currentChat = allChats.find((c: any) => c.id === chatId);

//       if (currentChat) {
//         const otherUser = user.role === "learner" ? currentChat.tutor : currentChat.learner;
//         setOtherUserName(otherUser.name);
//       }
//     } catch (error) {
//       console.error("Error fetching chat details:", error);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       console.log("Fetching messages for chatId:", chatId);
//       const response = await api(`/chats/${chatId}/messages`);
//       const data = await response;
//       setMessages(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setLoading(false);
//     }
//   };

//   const sendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       console.log("Sending message:", newMessage);
//       if (isNewChat && pendingChat) {
//         const chatResponse = await api("/chats", {
//           method: "POST",
//           body: JSON.stringify({
//             learnerId: pendingChat.learnerId,
//             tutorId: pendingChat.tutorId,
//             subject: pendingChat.subject,
//           }),
//         });

//         const newChat = await chatResponse;

//         await api(`/chats/${newChat.id}/messages`, {
//           method: "POST",
//           body: JSON.stringify({
//             senderId: user.id,
//             content: newMessage,
//           }),
//         });

//         // const message = await messageResponse;
//         localStorage.removeItem("pendingChat");
//         navigate(`/chat/${newChat.id}`);
//       } else {
//         const response = await api(`/chats/${chatId}/messages`, {
//           method: "POST",
//           body: JSON.stringify({
//             senderId: user.id,
//             content: newMessage,
//           }),
//         });

//         const message = await response;
//         setMessages([...messages, message]);
//         setNewMessage("");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       alert("Failed to send message");
//     }
//   };

//   if (loading) {
// return (
//   <div style={{ 
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 60, 
//     textAlign: "center",
//     fontSize: 18,
//     color: "#666",
//     minHeight: "200px"
//   }}>
//     {/* The Spinner Circle */}
//     <div className="loader-circle" style={{
//       width: 50,
//       height: 50,
//       border: "5px solid rgba(102, 126, 234, 0.1)", // Light track
//       borderTop: "5px solid #667eea", // Purple active part
//       borderRadius: "50%",
//       marginBottom: 20
//     }} />
    
//     <div style={{ fontWeight: "500", color: "#764ba2" }}>
//       Loading requests...
//     </div>

//     {/* Add this style block if you haven't already included it in your page */}
//     <style>{`
//       .loader-circle {
//         animation: spin 1s linear infinite;
//       }

//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }
//     `}</style>
//   </div>
// );
//   }

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//         // overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 500,
//           width: "100%",
//           height: "80vh",
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: 20,
//           overflow: "hidden",
//           boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
//           background: "rgba(255,255,255,0.9)",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: 20,
//             display: "flex",
//             alignItems: "center",
//             gap: 15,
//             backgroundColor: "rgba(255,255,255,0.8)",
//             backdropFilter: "blur(10px)",
//             borderBottom: "1px solid rgba(0,0,0,0.05)",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//             zIndex: 10,
//           }}
//         >
//           <button
//             onClick={() => navigate("/dashboard")}
//             style={{
//               padding: "10px 20px",
//               cursor: "pointer",
//               border: "1px solid #667eea",
//               borderRadius: 8,
//               backgroundColor: "#fff",
//               color: "#667eea",
//               fontWeight: "bold",
//               fontSize: 14,
//             }}
//           >
//             ← Dashboard
//           </button>
//           <h2 style={{ margin: 0, fontSize: 20 }}>{otherUserName || "Chat"}</h2>
//         </div>

//         {/* Messages */}
//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             padding: 20,
//             display: "flex",
//             flexDirection: "column",
//             gap: 12,
//           }}
//         >
//           {messages.map((message) => {
//             const isMe = message.sender.id === user.id;
//             return (
//               <div
//                 key={message.id}
//                 style={{
//                   display: "flex",
//                   justifyContent: isMe ? "flex-end" : "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     maxWidth: "70%",
//                     padding: 14,
//                     borderRadius: 20,
//                     backgroundColor: isMe
//                       ? "rgba(102,126,234,0.3)"
//                       : "rgba(255,255,255,0.8)",
//                     color: isMe ? "#1a1a1a" : "#333",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                     backdropFilter: isMe ? "none" : "blur(6px)",
//                   }}
//                 >
//                   {!isMe && (
//                     <p
//                       style={{
//                         margin: "0 0 5px 0",
//                         fontSize: 12,
//                         fontWeight: "bold",
//                         opacity: 0.7,
//                       }}
//                     >
//                       {message.sender.name}
//                     </p>
//                   )}
//                   <p style={{ margin: 0, fontSize: 15 }}>{message.content}</p>
//                   <p
//                     style={{
//                       margin: "5px 0 0 0",
//                       fontSize: 11,
//                       opacity: 0.6,
//                       textAlign: "right",
//                     }}
//                   >
//                     {new Date(message.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <form
//           onSubmit={sendMessage}
//           style={{
//             padding: 20,
//             display: "flex",
//             gap: 10,
//             backgroundColor: "rgba(255,255,255,0.8)",
//             backdropFilter: "blur(10px)",
//             borderTop: "1px solid rgba(0,0,0,0.05)",
//           }}
//         >
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             style={{
//               flex: 1,
//               padding: "14px 20px",
//               borderRadius: 24,
//               border: "1px solid #ddd",
//               fontSize: 15,
//               outline: "none",
//               backgroundColor: "rgba(255,255,255,0.9)",
//               color:"black"
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: "14px 28px",
//               borderRadius: 24,
//               border: "none",
//               backgroundColor: "#667eea",
//               color: "white",
//               fontWeight: "bold",
//               fontSize: 15,
//               cursor: "pointer",
//               boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
//             }}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/");
      return;
    }
    if (chatId === "new") {
      const pending = localStorage.getItem("pendingChat");
      if (!pending) {
        navigate("/tutors");
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
          body: JSON.stringify({
            learnerId: pendingChat.learnerId,
            tutorId: pendingChat.tutorId,
            subject: pendingChat.subject,
          }),
        });
        const newChat = await chatResponse;
        await api(`/chats/${newChat.id}/messages`, {
          method: "POST",
          body: JSON.stringify({ senderId: user.id, content: newMessage }),
        });
        localStorage.removeItem("pendingChat");
        navigate(`/chat/${newChat.id}`);
      } else {
        const response = await api(`/chats/${chatId}/messages`, {
          method: "POST",
          body: JSON.stringify({ senderId: user.id, content: newMessage }),
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
    return (
      <div className="loader-wrapper">
        <div className="loader-circle" />
        <div className="loader-text">Loading requests...</div>
        <style>{`
          .loader-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
          .loader-circle { width: 50px; height: 50px; border: 5px solid rgba(102, 126, 234, 0.1); border-top: 5px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
          .loader-text { font-weight: 500; color: #764ba2; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <button onClick={() => navigate("/dashboard")} className="dash-btn">
            ← <span className="btn-text">Dashboard</span>
          </button>
          <h2 className="header-name">{otherUserName || "Chat"}</h2>
        </div>

        {/* Messages */}
        <div className="message-list">
          {messages.map((message) => {
            const isMe = message.sender.id === user.id;
            return (
              <div key={message.id} className={`message-row ${isMe ? 'me' : 'them'}`}>
                <div className="bubble">
                  {!isMe && <p className="sender-label">{message.sender.name}</p>}
                  <p className="msg-text">{message.content}</p>
                  <p className="time-text">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>

      <style>{`
        /* UNIVERSAL WRAPPER */
        .chat-screen {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
          font-family: system-ui, -apple-system, sans-serif;
          overflow: hidden;
        }

        /* CONTAINER LOGIC - ROUNDED CORNERS */
        .chat-container {
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          width: 100%;
          height: 100%; 
        }

        @media (min-width: 768px) {
          .chat-container {
            max-width: 500px;
            height: 85vh;
            border-radius: 32px; /* Extra Rounded Corners */
            box-shadow: 0 20px 60px rgba(0,0,0,0.12);
            overflow: hidden; /* Ensures child elements don't break rounded corners */
          }
        }

        /* HEADER */
        .chat-header {
          padding: 18px 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.8);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          z-index: 10;
        }

        .dash-btn {
          padding: 8px 18px;
          cursor: pointer;
          border: 1px solid #667eea;
          border-radius: 20px; /* Rounded button */
          background: #fff;
          color: #667eea;
          font-weight: bold;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .dash-btn:hover { background: #f8f9ff; }

        .header-name { margin: 0; font-size: 20px; font-weight: 700; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* MESSAGE LIST */
        .message-list {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-row { display: flex; width: 100%; }
        .me { justify-content: flex-end; }
        .them { justify-content: flex-start; }

        /* ROUNDED BUBBLES */
        .bubble {
          max-width: 75%;
          padding: 14px 18px;
          border-radius: 24px; /* Very Rounded bubbles */
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .me .bubble { 
          background: rgba(102,126,234,0.3); 
          color: #1a1a1a; 
          border-bottom-right-radius: 4px; /* Keeps a small tail */
        }
        
        .them .bubble { 
          background: #ffffff; 
          color: #333; 
          border-bottom-left-radius: 4px; /* Keeps a small tail */
          border: 1px solid #f0f0f0;
        }

        .sender-label { margin: 0 0 5px 0; font-size: 12px; font-weight: bold; opacity: 0.7; }
        .msg-text { margin: 0; font-size: 15px; line-height: 1.4; }
        .time-text { margin: 6px 0 0 0; font-size: 10px; opacity: 0.5; text-align: right; }

        /* FORM / INPUT - ROUNDED */
        .chat-form {
          padding: 20px;
          display: flex;
          gap: 12px;
          background: rgba(255,255,255,0.9);
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-bottom: max(20px, env(safe-area-inset-bottom));
        }

        .chat-input {
          flex: 1;
          padding: 14px 22px;
          border-radius: 30px; /* Fully Rounded Input */
          border: 1px solid #e0e0e0;
          font-size: 16px;
          outline: none;
          background: #ffffff;
          transition: border-color 0.2s ease;
        }
        .chat-input:focus { border-color: #667eea; }

        .send-btn {
          padding: 0 24px;
          border-radius: 30px; /* Fully Rounded Button */
          border: none;
          background: #667eea;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .send-btn:hover { opacity: 0.9; }

        @media (max-width: 500px) {
          .btn-text { display: none; }
          .message-list { padding: 15px; }
          .bubble { max-width: 85%; border-radius: 20px; }
        }
      `}</style>
    </div>
  );
}