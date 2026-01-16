// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import { useNavigate } from "react-router-dom";

// interface Chat {
//   id: string;
//   subject: string;
//   learner: { id: string; name: string };
//   tutor: { id: string; name: string };
//   messages: Array<{ content: string; createdAt: string }>;
//   createdAt: string;
// }

// export default function ChatList() {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || !user.id) {
//       navigate("/");
//       return;
//     }
//     fetchChats();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       const response = await api(`/chats/${user.id}`);
//       const data = await response;
//       setChats(data);
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };

//   const openChat = (chatId: string) => {
//     navigate(`/chat/${chatId}`);

//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width:"100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         padding: 40,
//         background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//         overflowX: "hidden", // Prevent horizontal scroll
//         overflowY: "auto",
//         boxSizing: "border-box",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 700,
//           padding: 40,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           borderRadius: 16,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//           boxSizing: "border-box",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 30,
//             flexWrap: "wrap", // wrap on small screens
//           }}
//         >
//           <h1
//             style={{
//               fontSize: 28,
//               fontWeight: 700,
//               margin: 0,
//               color: "#fff",
//             }}
//           >
//             My Chats
//           </h1>

//           <button
//             onClick={() => navigate("/dashboard")}
//             style={{
//               padding: "8px 14px",
//               backgroundColor: "#fff",
//               color: "#4c63afff",
//               border: "2px solid #4c99afff",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: "bold",
//               flexShrink: 0, // prevent shrinking
//             }}
//           >
//             ← Dashboard
//           </button>
//         </div>

//         {chats.length === 0 ? (
//           <div
//             style={{
//               padding: 30,
//               textAlign: "center",
//               border: "1px dashed rgba(255,255,255,0.5)",
//               borderRadius: 12,
//               color: "#fff",
//               backgroundColor: "rgba(255,255,255,0.1)",
//               boxSizing: "border-box",
//             }}
//           >
//             <p style={{ fontSize: 18, marginBottom: 8 }}>No chats yet</p>
//             <p style={{ color: "#ddd" }}>
//               Request help from a tutor or wait for someone to reach out
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//             {chats.map((chat) => {
//               const isLearner = chat.learner.id === user.id;
//               const otherUser = isLearner ? chat.tutor : chat.learner;
//               const lastMessage = chat.messages[0];

//               const borderColor = isLearner ? "#2196F3" : "#4CAF50";
//               const backgroundColor = isLearner ? "rgba(227,242,253,0.9)" : "rgba(241,248,244,0.9)";

//               return (
//                 <div
//                   key={chat.id}
//                   onClick={() => openChat(chat.id)}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     flexWrap: "wrap", // wrap content on small screens
//                     padding: 20,
//                     borderRadius: 12,
//                     backgroundColor,
//                     border: `2px solid ${borderColor}`,
//                     cursor: "pointer",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     transition: "all 0.2s",
//                     boxSizing: "border-box",
//                     width: "100%", // ensure it doesn't overflow
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//                   }}
//                 >
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <h3 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#222" }}>
//                       {otherUser.name}
//                     </h3>
//                     <span
//                       style={{
//                         fontSize: 13,
//                         fontWeight: "bold",
//                         padding: "4px 10px",
//                         borderRadius: 12,
//                         backgroundColor: borderColor,
//                         color: "#fff",
//                       }}
//                     >
//                       {isLearner ? "🎓 Learning" : "👨‍🏫 Teaching"}
//                     </span>
//                     <span
//                       style={{
//                         fontSize: 12,
//                         marginLeft: 10,
//                         padding: "2px 8px",
//                         borderRadius: 8,
//                         backgroundColor: isLearner ? "#1976D2" : "#388E3C",
//                         color: "#fff",
//                       }}
//                     >
//                       {chat.subject}
//                     </span>
//                     {lastMessage && (
//                       <p
//                         style={{
//                           marginTop: 8,
//                           color: "#555",
//                           fontSize: 14,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {lastMessage.content}
//                       </p>
//                     )}
//                   </div>
//                   <span style={{ fontSize: 12, color: "#999", flexShrink: 0 }}>
//                     {new Date(chat.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/");
      return;
    }
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api(`/chats/${user.id}`);
      const data = await response;
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="chat-list-page">
      <div className="container">
        {/* HEADER */}
        <div className="header-flex">
          <h1 className="title">My Chats</h1>
          <button onClick={() => navigate("/dashboard")} className="dash-btn-pill">
            ← Dashboard
          </button>
        </div>

        {chats.length === 0 ? (
          <div className="empty-chat-card">
            <p className="empty-icon">💬</p>
            <p className="empty-text">No chats yet</p>
            <p className="empty-sub">Find a tutor to learn something new or help a student!</p>
          </div>
        ) : (
          <div className="chat-stack">
            {chats.map((chat) => {
              const isLearner = chat.learner.id === user.id;
              const otherUser = isLearner ? chat.tutor : chat.learner;
              const lastMessage = chat.messages[0];
              
              // NEW COLOR LOGIC: Yellow for Learning, Green for Teaching
              const themeColor = isLearner ? "#fbbf24" : "#4CAF50"; 
              const textColor = isLearner ? "#78350f" : "#ffffff";

              return (
                <div
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  className="chat-row-card"
                  style={{ borderLeft: `8px solid ${themeColor}` }}
                >
                  <div className="chat-info">
                    <div className="chat-top-row">
                      <h3 className="user-name">{otherUser.name}</h3>
                      <span className="date-label">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="tag-group">
                      <span className="role-tag" style={{ background: themeColor, color: textColor }}>
                        {isLearner ? "🎓 Learning" : "👨‍🏫 Teaching"}
                      </span>
                      <span className="subject-tag">
                        {chat.subject}
                      </span>
                    </div>

                    {lastMessage && (
                      <p className="last-msg-preview">{lastMessage.content}</p>
                    )}
                  </div>
                  <div className="chevron-icon" style={{ color: themeColor }}>→</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .chat-list-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 80%);
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .container { width: 100%; max-width: 700px; }

        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .title { color: white; margin: 0; font-size: 28px; font-weight: 800; }

        .dash-btn-pill {
          padding: 10px 20px;
          border-radius: 30px;
          border: 2px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
          color: white;
          font-weight: bold;
          cursor: pointer;
          backdrop-filter: blur(5px);
        }

        .empty-chat-card {
          background: rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 60px 20px;
          text-align: center;
          color: white;
          border: 1px dashed rgba(255,255,255,0.3);
        }

        .empty-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-text { font-size: 20px; font-weight: 700; margin-bottom: 5px; }
        .empty-sub { opacity: 0.7; font-size: 14px; }

        .chat-stack { display: flex; flex-direction: column; gap: 16px; }

        .chat-row-card {
          background: white;
          padding: 24px;
          border-radius: 30px; /* Extra Rounded */
          display: flex;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transition: transform 0.2s ease;
        }

        .chat-row-card:hover { transform: translateY(-3px); }

        .chat-info { flex: 1; min-width: 0; }

        .chat-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .user-name { margin: 0; font-size: 19px; color: #1a1a1a; font-weight: 700; }
        .date-label { font-size: 12px; color: #999; }

        .tag-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .role-tag { 
          padding: 5px 14px; 
          border-radius: 20px; 
          font-size: 11px; 
          font-weight: 800; 
          text-transform: uppercase; 
        }

        .subject-tag { 
          padding: 4px 12px; 
          border-radius: 20px; 
          font-size: 11px; 
          font-weight: 700; 
          background: #f3f4f6; 
          color: #4b5563;
        }

        .last-msg-preview {
          margin: 0;
          color: #666;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chevron-icon { font-size: 20px; font-weight: bold; margin-left: 15px; }

        @media (max-width: 600px) {
          .chat-list-page { padding: 20px 15px; }
          .header-flex { flex-direction: column; align-items: stretch; text-align: center; gap: 15px; }
          .dash-btn-pill { width: 100%; }
          .chat-row-card { padding: 22px; border-radius: 24px; }
          .chat-top-row { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
      `}</style>
    </div>
  );
}