// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Tutors() {
//   const [tutors, setTutors] = useState<any[]>([]);
//   // const [user, setUser] = useState<any>(null);
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const navigate = useNavigate();
//   useEffect(() => {
//     // console.log("fetch the users",user)
//     // const storedUser = localStorage.getItem("user");

//     // if (!storedUser) {
//     //   window.location.href = "/";
//     //   console.error("No user found in localStorage");
//     //   return;
//     // }
//     // setUser(JSON.parse(storedUser));
//     const fetchFilteredTutors = async () => {
//       try {
//         const subjectsParam = user.learnSubjects.join(",");
//         const response = await api(`/tutors?subjects=${subjectsParam}`);
//         setTutors(response);
//       } catch (err) {
//         console.error("Error fetching tutors:", err);
//       }
//     };

//     fetchFilteredTutors();
//   }, []);

//   const requestHelp = async (tutorId: string, tutorName: string) => {
//     try {
//       const chatsResponse = await api(`/chats/${user.id}`);
//       const allChats = await chatsResponse;

//       const existingChat = allChats.find((chat: any) =>
//         ((chat.learnerId === user.id && chat.tutorId === tutorId) ||
//           (chat.tutorId === user.id && chat.learnerId === tutorId)) &&
//         chat.subject === user.learnSubjects[0]
//       );

//       if (existingChat) {
//         navigate(`/chat/${existingChat.id}`);
//       } else {
//         const pendingChat = {
//           learnerId: user.id,
//           tutorId,
//           tutorName,
//           subject: user.learnSubjects[0],
//         };
//         localStorage.setItem("pendingChat", JSON.stringify(pendingChat));
//         navigate(`/chat/new`);
//       }
//     } catch {
//       alert("Failed to start chat");
//     }
//   };
//   if (!user) {
//     return <div style={{ padding: 40 }}>Loading...</div>;
//   }
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//          width:"100%",
//         display: "flex",
//         alignItems: "auto-flex",
//         justifyContent: "center",
//         backgroundColor: "#555a60",
//                 // background: "linear-gradient(135deg, #667eea 0%, #764ba2 80%)",
//         background: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//         overflow:"auto",
//         paddingTop: 40,
//         paddingBottom: 40,
        
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 700,
//           padding: 40,
//           backgroundColor: "#47494dff",
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           borderRadius: 16,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//         }}
//       >
//         {/* ---------- HEADER ROW ---------- */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 20,
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
//             Tutors for your subjects
//           </h1>

//           <button
//             onClick={() => navigate("/dashboard")}
//             style={{
//               padding: "8px 14px",
//               backgroundColor: "#fff",
//               color: "#4CAF50",
//               border: "2px solid #4CAF50",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//           >
//             ← Dashboard
//           </button>
//         </div>

//         {/* ---------- USER SUBJECTS + EDIT BUTTON ---------- */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             flexWrap: "wrap",
//             marginBottom: 20,
//           }}
//         >
//           {user.learnSubjects?.map((subject: string) => (
//             <span
//               key={subject}
//               style={{
//                 padding: "6px 14px",
//                 borderRadius: 20,
//                 backgroundColor: "#e3f2fd",
//                 color: "#1565c0",
//                 fontSize: 14,
//                 fontWeight: 500,
//                 border: "1px solid #bbdefb" ,
//               }}
//             >
//               {subject}
//             </span>
//           ))}

//           <button
//             onClick={() => navigate("/edit-subjects")}
//             style={{
//               padding: "6px 12px",
//               backgroundColor: "#f5f5f5",
//               color: "#333",
//               border: "1px solid #ccc",
//               borderRadius: 6,
//               cursor: "pointer",
//               fontSize: 13,
//             }}
//           >
//             Edit subjects
//           </button>
//         </div>

//         {/* ---------- TUTORS LIST ---------- */}
//         {tutors.length === 0 ? (
//           <div
//             style={{
//               padding: 30,
//               textAlign: "center",
//               border: "1px dashed #ccc",
//               borderRadius: 12,
//               color: "#fff",
//             }}
//           >
//             <p style={{ fontSize: 18, marginBottom: 8 }}>
//               No tutors available right now
//             </p>
//             <p style={{ color: "#ccc" }}>
//               Try checking back later or editing your subjects.
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//             {tutors.map((tutor) => (
//               <div
//                 key={tutor.id}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: 20,
//                   borderRadius: 12,
//                   backgroundColor: "#fff",
//                 }}
//               >
//                 <div>
//                   <h3 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#222" }}>
//                     {tutor.name}
//                   </h3>

//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                     {tutor.teachSubjects?.map((subject: string) => (
//                       <span
//                         key={subject}
//                         style={{
//                           padding: "5px 12px",
//                           borderRadius: 16,
//                           backgroundColor: "#e8f5e9",
//                           color: "#2e7d32",
//                           fontSize: 13,
//                           border: "1px solid #c8e6c9",
//                         }}
//                       >
//                         {subject}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => requestHelp(tutor.id, tutor.name)}
//                   style={{
//                     padding: "10px 18px",
//                     backgroundColor: "#4CAF50",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
//                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
//                 >
//                   Start Chat
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

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
        navigate(`/chat/${existingChat.id}`);
      } else {
        const pendingChat = {
          learnerId: user.id,
          tutorId,
          tutorName,
          subject: user.learnSubjects[0],
        };
        localStorage.setItem("pendingChat", JSON.stringify(pendingChat));
        navigate(`/chat/new`);
      }
    } catch {
      alert("Failed to start chat");
    }
  };

  if (!user) {
    return <div style={{ padding: 40, color: "white" }}>Loading...</div>;
  }

  return (
    <div className="tutors-page">
      <div className="content-container">
        {/* HEADER */}
        <div className="header-flex">
          <h1 className="main-title">Tutors for you</h1>
          <button onClick={() => navigate("/dashboard")} className="back-dash-btn">
            ← Dashboard
          </button>
        </div>

        {/* SUBJECT FILTER BAR (Yellow Accents) */}
        <div className="subject-bar">
          <div className="pill-box">
            {user.learnSubjects?.map((subject: string) => (
              <span key={subject} className="user-subject-pill">{subject}</span>
            ))}
          </div>
          {/* YELLOW EDIT BUTTON - No more black */}
          <button onClick={() => navigate("/edit-subjects")} className="edit-yellow-btn">
            Edit Subjects
          </button>
        </div>

        {/* TUTORS LIST */}
        <div className="tutor-stack">
          {tutors.length === 0 ? (
            <div className="empty-state">
              <p>No tutors available right now.</p>
            </div>
          ) : (
            tutors.map((tutor) => (
              <div key={tutor.id} className="tutor-card">
                <div className="tutor-info">
                  <h3 className="tutor-name">{tutor.name}</h3>
                  <div className="teach-tags">
                    {tutor.teachSubjects?.map((s: string) => (
                      <span key={s} className="teach-tag">{s}</span>
                    ))}
                  </div>
                </div>
                {/* GREEN START CHAT BUTTON */}
                <button
                  onClick={() => requestHelp(tutor.id, tutor.name)}
                  className="start-green-btn"
                >
                  Start Chat
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .tutors-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 80%);
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .content-container { width: 100%; max-width: 750px; }

        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .main-title { color: white; margin: 0; font-size: 28px; font-weight: 800; }

        .back-dash-btn {
          padding: 10px 18px;
          border-radius: 12px;
          border: 2px solid #fff;
          background: transparent;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .subject-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 15px 20px;
          border-radius: 18px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pill-box { display: flex; gap: 10px; flex-wrap: wrap; }

        .user-subject-pill {
          background: #fbbf24;
          color: #0c0c0cff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        /* YELLOW BOX/BUTTON FOR EDIT */
        .edit-yellow-btn {
          background: #fff; /* Golden Yellow */
          color: #161617ff; /* Dark brown text for contrast */
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
    
        }

        .tutor-stack { display: flex; flex-direction: column; gap: 16px; }

        .tutor-card {
          background: white;
          padding: 24px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .tutor-name { margin: 0 0 8px 0; color: #1a1a1a; font-size: 20px; }
        
        .teach-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .teach-tag { background: #f0fdf4; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 8px; font-weight: 600; }

        /* GREEN BOX/BUTTON FOR START CHAT */
        .start-green-btn {
          background: #4CAF50; /* Success Green */
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 14px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
          transition: transform 0.2s;
        }
        .start-green-btn:hover { transform: scale(1.03); background: #43a047; }

        .empty-state { text-align: center; padding: 60px; color: white; opacity: 0.8; }

        @media (max-width: 650px) {
          .header-flex { flex-direction: column; align-items: stretch; gap: 15px; text-align: center; }
          .subject-bar { flex-direction: column; gap: 15px; }
          .edit-yellow-btn { width: 100%; }
          .tutor-card { flex-direction: column; text-align: center; gap: 20px; }
          .teach-tags { justify-content: center; }
          .start-green-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}
