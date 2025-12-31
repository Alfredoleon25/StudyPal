// import { useState, useEffect } from "react";
// import { api } from "../services/api";

// const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];

// export default function Subjects() {
//   const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
//   const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
//   const [tempUser, setTempUser] = useState<{ name: string } | null>(null);

//   useEffect(() => {
//     const temp = localStorage.getItem("tempuser");
//     if (!temp) {
//       window.location.href = "/";
//       return;
//     }
//     setTempUser(JSON.parse(temp));
//   }, []);

//   const toggleLearnSubject = (subject: string) => {
//     setLearnSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };

//   const toggleTeachSubject = (subject: string) => {
//     setTeachSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };

//   const createUser = async () => {
//     if (learnSubjects.length === 0 && teachSubjects.length === 0) {
//       return alert("Select at least one subject to learn or teach");
//     }

//     if (!tempUser) return;

//     try {
//       const response = await api("/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: tempUser.name,
//           learnSubjects,
//           teachSubjects,
//         }),
//       });

//       const user = await response;
//       console.log("User created:", user);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.removeItem("tempuser");

//       window.location.href = "/dashboard";
//     } catch (error: any) {
//       console.error("Error creating user:", error);
//       alert(error.message || "Failed to create user");
//     }
//   };

//   if (!tempUser) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 900,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 32, marginBottom: 10 }}>Select Your Subjects</h1>
//       <p style={{ color: "#666", marginBottom: 40 }}>
//         Hi <strong>{tempUser.name}</strong>! Tell us what you want to learn and what you can teach:
//       </p>

//       <div style={{ 
//         display: "grid", 
//         gridTemplateColumns: "1fr 1fr", 
//         gap: 30,
//         marginBottom: 30 
//       }}>
//         {/* Learn Subjects */}
//         <div>
//           <h2 style={{ fontSize: 20, marginBottom: 15, color: "#2196F3" }}>
//             📚 I want to learn:
//           </h2>
//           {SUBJECTS.map((subject) => (
//             <div
//               key={`learn-${subject}`}
//               style={{
//                 padding: 15,
//                 marginBottom: 10,
//                 border: learnSubjects.includes(subject)
//                   ? "2px solid #2196F3"
//                   : "2px solid #e0e0e0",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 backgroundColor: learnSubjects.includes(subject)
//                   ? "#e3f2fd"
//                   : "#fff",
//                 transition: "all 0.2s",
//                 color:"black"
//               }}
//               onClick={() => toggleLearnSubject(subject)}
//             >
//               <label style={{ 
//                 cursor: "pointer", 
//                 display: "flex", 
//                 alignItems: "center",
//                 fontSize: 15
//               }}>
//                 <input
//                   type="checkbox"
//                   checked={learnSubjects.includes(subject)}
//                   onChange={() => {}}
//                   style={{ marginRight: 10, width: 18, height: 18 }}
//                 />
//                 {subject}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* Teach Subjects */}
//         <div>
//           <h2 style={{ fontSize: 20, marginBottom: 15, color: "#4CAF50" }}>
//             👨‍🏫 I can teach:
//           </h2>
//           {SUBJECTS.map((subject) => (
//             <div
//               key={`teach-${subject}`}
//               style={{
//                 padding: 15,
//                 marginBottom: 10,
//                 border: teachSubjects.includes(subject)
//                   ? "2px solid #4CAF50"
//                   : "2px solid #e0e0e0",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 backgroundColor: teachSubjects.includes(subject)
//                   ? "#f1f8f4"
//                   : "#fff",
//                 transition: "all 0.2s",
//                 color:"black"
//               }}
//               onClick={() => toggleTeachSubject(subject)}
//             >
//               <label style={{ 
//                 cursor: "pointer", 
//                 display: "flex", 
//                 alignItems: "center",
//                 fontSize: 15
//               }}>
//                 <input
//                   type="checkbox"
//                   checked={teachSubjects.includes(subject)}
//                   onChange={() => {}}
//                   style={{ marginRight: 10, width: 18, height: 18 }}
//                 />
//                 {subject}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={{ display: "flex", gap: 10 }}>
//         <button
//           onClick={() => window.location.href = "/"}
//           style={{
//             padding: "12px 24px",
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             backgroundColor: "#fff",
//             cursor: "pointer",
//             fontSize: 16,
//             color:"black"
//           }}
//         >
//           Back
//         </button>
//         <button
//           onClick={createUser}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: 8,
//             cursor: "pointer",
//             fontSize: 16,
//             fontWeight: "bold",
//             flex: 1,
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { api } from "../services/api";

const SUBJECTS = [
  { name: "Calculus", icon: "∫" },
  { name: "Physics", icon: "⚛️" },
  { name: "Programming", icon: "💻" },
  { name: "Chemistry", icon: "🧪" },
  { name: "Biology", icon: "🧬" },
  { name: "Statistics", icon: "📊" },
  { name: "Linear Algebra", icon: "📐" },
  { name: "Engineering", icon: "🏗️" },
  { name: "Economics", icon: "📈" },
  { name: "Psychology", icon: "🧠" },
];

export default function Subjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [tempUser, setTempUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const temp = localStorage.getItem("tempuser");
    if (!temp) {
      window.location.href = "/";
      return;
    }
    setTempUser(JSON.parse(temp));
  }, []);

  // Exclusive toggle: selecting one side deselects the other
  const toggleLearnSubject = (subject: string) => {
    setLearnSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setTeachSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const toggleTeachSubject = (subject: string) => {
    setTeachSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setLearnSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const createUser = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }
    if (!tempUser) return;
    
    const user = await api("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: tempUser.name,
        learnSubjects,
        teachSubjects,
      }),
    });
    localStorage.setItem("user",JSON.stringify(user))
    localStorage.removeItem("tempuser")
    window.location.href = "/dashboard";

  };

  if (!tempUser) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#555a60", // dark gray background covers whole page
        padding: 40,
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: 40,
          color: "white",
          textAlign: "center",
          fontSize: 36,
          fontWeight: "bold",
        }}
      >
        Select Your Subjects
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 50,
          // height: "calc(100vh - 160px)", // full height minus padding and heading
          // overflowY: "auto",
        }}
      >
        {/* LEARN */}
        <div>
          <h2 style={{ marginBottom: 20, color: "#2196F3" }}>
            📚 Learn
          </h2>
          {SUBJECTS.map((s) => {
            const active = learnSubjects.includes(s.name);
            return (
              <div
                key={`learn-${s.name}`}
                onClick={() => toggleLearnSubject(s.name)}
                style={{
                  padding: 22,
                  marginBottom: 16,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 18,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: active ? "#e3f2fd" : "#ffffff",
                  border: active ? "2px solid #2196F3" : "2px solid transparent",
                  boxShadow: active
                    ? "0 12px 32px rgba(33,150,243,0.3)"
                    : "0 6px 14px rgba(0,0,0,0.08)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  color: "#000", // black text for visibility
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <span>{s.name}</span>
              </div>
            );
          })}
        </div>

        {/* TEACH */}
        <div>
          <h2 style={{ marginBottom: 20, color: "#4CAF50" }}>
            👨‍🏫 Teach
          </h2>
          {SUBJECTS.map((s) => {
            const active = teachSubjects.includes(s.name);
            return (
              <div
                key={`teach-${s.name}`}
                onClick={() => toggleTeachSubject(s.name)}
                style={{
                  padding: 22,
                  marginBottom: 16,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 18,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: active ? "#e8f5e9" : "#ffffff",
                  border: active ? "2px solid #4CAF50" : "2px solid transparent",
                  boxShadow: active
                    ? "0 12px 32px rgba(76,175,80,0.3)"
                    : "0 6px 14px rgba(0,0,0,0.08)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  color: "#000", // black text for visibility
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <span>{s.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "14px 32px",
            borderRadius: 10,
            border: "2px solid #ddd",
            background: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
            color:"black"
          }}
        >
          Back
        </button>

        <button
          onClick={createUser}
          style={{
            padding: "14px 48px",
            borderRadius: 10,
            border: "none",
            background: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
            flex: 1,
            maxWidth: 200,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
