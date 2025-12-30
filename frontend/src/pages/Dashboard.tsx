// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// export default function Tutors() {
//   const [tutors, setTutors] = useState<any[]>([]);
//   const user = JSON.parse(localStorage.getItem("user")!);

//   useEffect(() => {
//     const fetchAllTutors = async () => {
//       try {
//         const params = user.subjects.join(",");
//         const data = await api(`/tutors?subject=${params}`);
//         setTutors(data);
//       } catch (err) {
//         console.error("Error fetching tutors:", err);
//       }
//     };

//     fetchAllTutors();
//   }, []);

//   const requestHelp = async (tutorId: string) => {
//     try {
//       const response = await api("/requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           learnerId: user.id,
//           tutorId,
//           subject: user.subjects[0],
//         }),
//       });

//       window.location.href = `/chat/${response.chatId}`;
//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 40,
//         maxWidth: 600,
//         margin: "0 auto",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//       }}
//     >
//       <h2>Available Tutors: {user.subjects?.join(", ")}</h2>
//       <div style={{ marginBottom: 20 }}>
    
//         <button
//           onClick={() => (window.location.href = "/edit-subjects")}
//           style={{
//             marginLeft: 10,
//             backgroundColor: "#fff",
//             color: "#3c463dff",
//             border: "1px solid #848784ff",
//             borderRadius: 6,
//             padding: "6px 10px",
//             cursor: "pointer",
//           }}
//         >
//           Edit Subjects
//         </button>
//                 <button
//           onClick={() => (window.location.href = "/chats")}
//           style={{
//             marginLeft: 10,
//             backgroundColor: "#fff",
//             color: "#3c463dff",
//             border: "1px solid #848784ff",
//             borderRadius: 6,
//             padding: "6px 10px",
//             cursor: "pointer",
//           }}
//         >
//           My chats
//         </button>
//       </div>

//       {tutors.length === 0 && <p>No tutors found.</p>}

//       {tutors.map((tutor) => (
//         <div
//           key={tutor.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10,
//             borderRadius: 6,
//           }}
//         >
//           <p>
//             <strong>{tutor.name}</strong>
//           </p>
//           <p>Subjects: {tutor.subjects.join(", ")}</p>
//           <button onClick={() => requestHelp(tutor.id)}>
//             Request Help
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       window.location.href = "/";
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, []);

//   if (!user) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 900,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 36, marginBottom: 10 }}>
//         Welcome, {user.name}! 👋
//       </h1>
//       <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>
//         Your subjects: <strong>{user.subjects?.join(", ")}</strong>
//         <button
//           onClick={() => window.location.href = "/edit-subjects"}
//           style={{
//             marginLeft: 15,
//             padding: "5px 12px",
//             backgroundColor: "#fff",
//             color: "#4CAF50",
//             border: "1px solid #4CAF50",
//             borderRadius: 6,
//             cursor: "pointer",
//             fontSize: 13,
//           }}
//         >
//           Edit
//         </button>
//       </p>

//       <div style={{ 
//         display: "grid", 
//         gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//         gap: 20,
//         marginBottom: 20
//       }}>
//         {/* Find Tutors Card */}
//         <div
//           onClick={() => window.location.href = "/tutors"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>📚</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             Find Tutors
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             Browse tutors and request help with your subjects
//           </p>
//         </div>

//         {/* My Requests Card */}
//         <div
//           onClick={() => window.location.href = "/tutor-requests"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>✋</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             Help Requests
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             See who needs help with subjects you know
//           </p>
//         </div>

//         {/* My Chats Card */}
//         <div
//           onClick={() => window.location.href = "/chats"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>💬</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             My Chats
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             Continue conversations with your study partners
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       window.location.href = "/";
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, []);

//   if (!user) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 900,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 36, marginBottom: 10 }}>
//         Welcome, {user.name}! 👋
//       </h1>
//       <div style={{ marginBottom: 40 }}>
//         <p style={{ color: "#666", fontSize: 16, marginBottom: 5 }}>
//           📚 Want to learn: <strong>{user.learnSubjects?.join(", ") || "None selected"}</strong>
//         </p>
//         <p style={{ color: "#666", fontSize: 16, marginBottom: 10 }}>
//           👨‍🏫 Can teach: <strong>{user.teachSubjects?.join(", ") || "None selected"}</strong>
//         </p>
//         <button
//           onClick={() => window.location.href = "/edit-subjects"}
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#fff",
//             color: "#4CAF50",
//             border: "1px solid #4CAF50",
//             borderRadius: 6,
//             cursor: "pointer",
//             fontSize: 14,
//             fontWeight: "bold",
//           }}
//         >
//           Edit Subjects
//         </button>
//       </div>

//       <div style={{ 
//         display: "grid", 
//         gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//         gap: 20,
//         marginBottom: 20
//       }}>
//         {/* Find Tutors Card */}
//         <div
//           onClick={() => window.location.href = "/tutors"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>📚</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             Find Tutors
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             Browse tutors and request help with your subjects
//           </p>
//         </div>

//         {/* My Requests Card */}
//         <div
//           onClick={() => window.location.href = "/tutor-requests"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>✋</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             Help Requests
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             See who needs help with subjects you know
//           </p>
//         </div>

//         {/* My Chats Card */}
//         <div
//           onClick={() => window.location.href = "/chats"}
//           style={{
//             padding: 30,
//             border: "2px solid #e0e0e0",
//             borderRadius: 12,
//             cursor: "pointer",
//             backgroundColor: "#fff",
//             transition: "all 0.2s",
//             textAlign: "center",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.borderColor = "#4CAF50";
//             e.currentTarget.style.transform = "translateY(-4px)";
//             e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.borderColor = "#e0e0e0";
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "none";
//           }}
//         >
//           <div style={{ fontSize: 48, marginBottom: 15 }}>💬</div>
//           <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
//             My Chats
//           </h2>
//           <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
//             Continue conversations with your study partners
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  if (!user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 900,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ fontSize: 36, marginBottom: 10 }}>
        Welcome, {user.name}! 👋
      </h1>
      <div style={{ marginBottom: 40 }}>
        <p style={{ color: "#666", fontSize: 16, marginBottom: 5 }}>
          📚 Want to learn: <strong>{user.learnSubjects?.join(", ") || "None selected"}</strong>
        </p>
        <p style={{ color: "#666", fontSize: 16, marginBottom: 10 }}>
          👨‍🏫 Can teach: <strong>{user.teachSubjects?.join(", ") || "None selected"}</strong>
        </p>
        <button
          onClick={() => window.location.href = "/edit-subjects"}
          style={{
            padding: "8px 16px",
            backgroundColor: "#fff",
            color: "#4CAF50",
            border: "1px solid #4CAF50",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Edit Subjects
        </button>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
        marginBottom: 20
      }}>
        {/* Find Tutors Card */}
        <div
          onClick={() => window.location.href = "/tutors"}
          style={{
            padding: 30,
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "#fff",
            transition: "all 0.2s",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4CAF50";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e0e0e0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 15 }}>📚</div>
          <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
            Find Tutors
          </h2>
          <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
            Browse tutors and request help with your subjects
          </p>
        </div>

        {/* My Sent Requests Card */}
        <div
          onClick={() => window.location.href = "/my-requests"}
          style={{
            padding: 30,
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "#fff",
            transition: "all 0.2s",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#2196F3";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e0e0e0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 15 }}>📤</div>
          <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
            My Requests
          </h2>
          <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
            View help requests you've sent to tutors
          </p>
        </div>

        {/* Help Requests Card */}
        <div
          onClick={() => window.location.href = "/tutor-requests"}
          style={{
            padding: 30,
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "#fff",
            transition: "all 0.2s",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4CAF50";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e0e0e0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 15 }}>✋</div>
          <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
            Help Requests
          </h2>
          <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
            See who needs help with subjects you know
          </p>
        </div>

        {/* My Chats Card */}
        <div
          onClick={() => window.location.href = "/chats"}
          style={{
            padding: 30,
            border: "2px solid #e0e0e0",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "#fff",
            transition: "all 0.2s",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4CAF50";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e0e0e0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 15 }}>💬</div>
          <h2 style={{ fontSize: 22, margin: "0 0 10px 0", color: "#333" }}>
            My Chats
          </h2>
          <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
            Continue conversations with your study partners
          </p>
        </div>
      </div>
    </div>
  );
}