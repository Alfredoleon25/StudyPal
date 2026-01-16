// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import { useNavigate } from "react-router-dom";

// interface Request {
//   id: string;
//   learnerId: string;
//   tutorId: string;
//   subject: string;
//   messages: Array<{ content: string; createdAt: string }>;
//   createdAt: string;
//   learner?: {
//     id: string;
//     name: string;
//   };
// }

// export default function TutorRequests() {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const navigate = useNavigate();

//   useEffect(() => {
//         if (!user || !user.id) {
//       navigate("/");
//       return;
//     }
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const response = await api(`/requests/tutor/${user.id}`);
//       setRequests(response);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       alert("Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openChat = (chatId: string) => {
//     navigate(`/chat/${chatId}`);
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
//     <div style={{ 
//       minHeight: "100vh",
//         width:"100%",
//       padding: 40,
//       fontFamily: "system-ui, -apple-system, sans-serif",
//       background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
//       overflowX: "hidden", // Prevent horizontal scroll
//       overflowY: "auto",
//       boxSizing: "border-box",
//       display: "flex",
//       justifyContent: "center",
//     }}>
//       <div style={{
//         width: "100%",
//         maxWidth: 700,
//         padding: 40,
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         borderRadius: 16,
//         boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//         boxSizing: "border-box",
//       }}>
//         <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 30,
//             flexWrap: "wrap", // wrap on small screens
//           }}>
//         <h1 style={{ fontSize: 32, marginBottom: 30, color: "#fff" }}>
//           My Help Requests
//         </h1>

//              <button
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
// </div>
//         {requests.length === 0 ? (
//           <div style={{
//             padding: 40,
//             textAlign: "center",
//             borderRadius: 12,
//             backgroundColor: "rgba(255,255,255,0.1)",
//             color: "#fff",
//           }}>
//             <p style={{ fontSize: 18, marginBottom: 10 }}>📚 No requests yet</p>
//             <p style={{ fontSize: 14 }}>
//               Learners will see you when they browse tutors for: <strong>{user.subjects?.join(", ")}</strong>
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//             {requests.map((request) => {
//               const lastMessage = request.messages[0];

//               return (
//                 <div
//                   key={request.id}
//                   onClick={() => openChat(request.id)}
//                   style={{
//                     cursor: "pointer",
//                     padding: 20,
//                     borderRadius: 12,
//                     backgroundColor: "rgba(255,255,255,0.9)",
//                     border: "2px solid #4CAF50",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 12,
//                     boxSizing: "border-box",
//                     width: "100%", // prevent horizontal overflow
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
//                   <span style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "4px 12px",
//                     borderRadius: 4,
//                     fontSize: 13,
//                     fontWeight: 600,
//                     alignSelf: "flex-start",
//                   }}>
//                     {request.subject}
//                   </span>

//                   <div style={{
//                     padding: 15,
//                     backgroundColor: "#f9f9f9",
//                     borderRadius: 6,
//                     borderLeft: "3px solid #4CAF50",
//                   }}>
//                     <p style={{
//                       margin: 0,
//                       fontSize: 15,
//                       lineHeight: 1.5,
//                       color: "#333",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap", // prevent horizontal scroll
//                     }}>
//                       {lastMessage?.content || "No message yet"}
//                     </p>
//                   </div>

//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: 13,
//                     color: "#555",
//                     flexWrap: "wrap",
//                   }}>
//                     <span>
//                       From: <code style={{
//                         // backgroundColor: "#f0f0f0",
//                         // padding: "2px 6px",
//                         // borderRadius: 3,
//                         fontSize: 14,
//                       }}>
//                         {request.learner?.name || "Unknown Learner"}
//                       </code>
//                     </span>
//                     <span>
//                       {new Date(request.createdAt).toLocaleString()}
//                     </span>
//                   </div>
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
      const response = await api(`/requests/tutor/${user.id}`);
      setRequests(response);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-circle" />
        <p className="loader-text">Loading requests...</p>
        <style>{`
          .loader-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f8f9ff; }
          .loader-circle { width: 50px; height: 50px; border: 5px solid rgba(102, 126, 234, 0.1); border-top: 5px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; }
          .loader-text { margin-top: 20px; font-weight: 600; color: #764ba2; font-family: sans-serif; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="requests-page">
      <div className="requests-container">
        {/* HEADER SECTION */}
        <div className="header-flex">
          <h1 className="title">My Help Requests</h1>
          <button onClick={() => navigate("/dashboard")} className="dash-pill-btn">
            ← Dashboard
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="empty-card">
            <p className="empty-icon">📚</p>
            <p className="empty-text">No requests yet</p>
            <p className="empty-sub">Learners will see you when they browse: <b>{user.subjects?.join(", ")}</b></p>
          </div>
        ) : (
          <div className="requests-list">
            {requests.map((request) => {
              const lastMessage = request.messages[0];
              return (
                <div
                  key={request.id}
                  onClick={() => openChat(request.id)}
                  className="request-card"
                >
                  <div className="request-top">
                    <span className="subject-tag">{request.subject}</span>
                    <span className="date-text">{new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="message-preview">
                    <p className="msg-content">
                      {lastMessage?.content || "No message yet"}
                    </p>
                  </div>

                  <div className="request-footer">
                    <span className="learner-name">
                      From: <b>{request.learner?.name || "Unknown"}</b>
                    </span>
                    <span className="action-link">Open Chat →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .requests-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 80%);
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .requests-container {
          width: 100%;
          max-width: 700px;
        }

        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 15px;
        }

        .title { 
          color: white; 
          margin: 0; 
          font-size: 28px; 
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .dash-pill-btn {
          padding: 10px 20px;
          border-radius: 30px; /* Round pill button */
          border: 2px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.1);
          color: white;
          font-weight: bold;
          cursor: pointer;
          backdrop-filter: blur(5px);
          white-space: nowrap;
        }

        .empty-card {
          background: rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 60px 20px;
          text-align: center;
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .empty-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-text { font-size: 20px; font-weight: 700; margin-bottom: 5px; }
        .empty-sub { opacity: 0.8; font-size: 14px; }

        .requests-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .request-card {
          background: white;
          padding: 24px;
          border-radius: 28px; /* Extra Rounded corners */
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border-left: 6px solid #4CAF50; /* Green highlight bar */
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .request-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .request-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .subject-tag {
          background: #f0fdf4;
          color: #166534;
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .date-text { font-size: 12px; color: #999; }

        .message-preview {
          background: #f9fafb;
          padding: 15px;
          border-radius: 16px;
          margin-bottom: 15px;
        }

        .msg-content {
          margin: 0;
          font-size: 15px;
          color: #374151;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .request-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .learner-name { color: #666; }
        .learner-name b { color: #111; }

        .action-link {
          color: #4CAF50; /* Green action color */
          font-weight: 800;
        }

        /* MOBILE ADJUSTMENTS */
        @media (max-width: 600px) {
          .requests-page { padding: 20px 15px; }
          .header-flex { flex-direction: column; align-items: stretch; text-align: center; }
          .dash-pill-btn { width: 100%; }
          .request-card { padding: 20px; border-radius: 22px; }
          .request-footer { flex-direction: column; align-items: flex-start; gap: 10px; }
          .action-link { width: 100%; text-align: right; border-top: 1px solid #eee; padding-top: 10px; }
        }
      `}</style>
    </div>
  );
}