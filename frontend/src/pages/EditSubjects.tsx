// import { useState, useEffect } from "react";
// import { api } from "../services/api";
// import { useNavigate } from "react-router-dom";
// const SUBJECTS = [
//   { name: "Calculus", icon: "∫" },
//   { name: "Physics", icon: "⚛️" },
//   { name: "Programming", icon: "💻" },
//   { name: "Chemistry", icon: "🧪" },
//   { name: "Biology", icon: "🧬" },
//   { name: "Statistics", icon: "📊" },
//   { name: "Linear Algebra", icon: "📐" },
//   { name: "Engineering", icon: "🏗️" },
//   { name: "Economics", icon: "📈" },
//   { name: "Psychology", icon: "🧠" }
// ];

// export default function EditSubjects() {
//   const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
//   const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/");
//       return;
//     }
//     const userData = JSON.parse(storedUser);
//     setUser(userData);
//     setLearnSubjects(userData.learnSubjects || []);
//     setTeachSubjects(userData.teachSubjects || []);
//   }, []);

//   const toggleLearnSubject = (subject: string) => {
//     if (teachSubjects.includes(subject)) {
//       // Auto-switch: remove from teaching, add to learning
//       setTeachSubjects((prev) => prev.filter((s) => s !== subject));
//       setLearnSubjects((prev) => [...prev, subject]);
//     } else {
//       // Normal toggle
//       setLearnSubjects((prev) =>
//         prev.includes(subject)
//           ? prev.filter((s) => s !== subject)
//           : [...prev, subject]
//       );
//     }
//   };

//   const toggleTeachSubject = (subject: string) => {
//     if (learnSubjects.includes(subject)) {
//       // Auto-switch: remove from learning, add to teaching
//       setLearnSubjects((prev) => prev.filter((s) => s !== subject));
//       setTeachSubjects((prev) => [...prev, subject]);
//     } else {
//       // Normal toggle
//       setTeachSubjects((prev) =>
//         prev.includes(subject)
//           ? prev.filter((s) => s !== subject)
//           : [...prev, subject]
//       );
//     }
//   };

//   const updateSubjects = async () => {
//     if (learnSubjects.length === 0 && teachSubjects.length === 0) {
//       return alert("Select at least one subject to learn or teach");
//     }

//     setLoading(true);

//     try {
//       const response = await api(`/users/${user.id}`, {
//         method: "PATCH",
//         body: JSON.stringify({ 
//           learnSubjects, 
//           teachSubjects 
//         }),
//       });

//       const updatedUser = await response;
//       console.log("User updated:", updatedUser);

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       navigate("/dashboard");
//     } catch (error: any) {
//       console.error("Error updating subjects:", error);
//       alert(error.message || "Failed to update subjects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goBack = () => {
//     navigate("/dashboard");
    
//   };

//   if (!user) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

// return (
//   <div
//     style={{
//       minHeight: "100vh",
//       width:"100%",
//       backgroundColor: "#555a60",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: 40,
//       boxSizing: "border-box",
//       fontFamily: "system-ui, -apple-system, sans-serif",
//     }}
//   >
//     <h1
//       style={{
//         marginBottom: 40,
//         color: "white",
//         textAlign: "center",
//         fontSize: 36,
//         fontWeight: "bold",
//       }}
//     >
//       Edit Your Subjects
//     </h1>

//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//         gap: 50,
//         // height: "calc(100vh - 200px)",
//         // overflowY: "auto",
//       }}
//     >
//       {/* LEARN */}
//       <div>
//         <h2 style={{ marginBottom: 20, color: "#2196F3" }}>
//           📚 Learn
//         </h2>
//         {SUBJECTS.map((s) => {
//           const active = learnSubjects.includes(s.name);
//           return (
//             <div
//               key={`learn-${s.name}`}
//               onClick={() => toggleLearnSubject(s.name)}
//               style={{
//                 padding: 22,
//                 marginBottom: 16,
//                 borderRadius: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 14,
//                 fontSize: 18,
//                 cursor: "pointer",
//                 transition: "all 0.25s ease",
//                 background: active ? "#e3f2fd" : "#ffffff",
//                 border: active
//                   ? "2px solid #2196F3"
//                   : "2px solid transparent",
//                 boxShadow: active
//                   ? "0 12px 32px rgba(33,150,243,0.3)"
//                   : "0 6px 14px rgba(0,0,0,0.08)",
//                 transform: active ? "scale(1.04)" : "scale(1)",
//                 color: "#000",
//                 userSelect: "none",
//               }}
//             >
//               <span style={{ fontSize: 26 }}>{s.icon}</span>
//               <span>{s.name}</span>
//             </div>
//           );
//         })}
//       </div>

//       {/* TEACH */}
//       <div>
//         <h2 style={{ marginBottom: 20, color: "#4CAF50" }}>
//           👨‍🏫 Teach
//         </h2>
//         {SUBJECTS.map((s) => {
//           const active = teachSubjects.includes(s.name);
//           return (
//             <div
//               key={`teach-${s.name}`}
//               onClick={() => toggleTeachSubject(s.name)}
//               style={{
//                 padding: 22,
//                 marginBottom: 16,
//                 borderRadius: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 14,
//                 fontSize: 18,
//                 cursor: "pointer",
//                 transition: "all 0.25s ease",
//                 background: active ? "#e8f5e9" : "#ffffff",
//                 border: active
//                   ? "2px solid #4CAF50"
//                   : "2px solid transparent",
//                 boxShadow: active
//                   ? "0 12px 32px rgba(76,175,80,0.3)"
//                   : "0 6px 14px rgba(0,0,0,0.08)",
//                 transform: active ? "scale(1.04)" : "scale(1)",
//                 color: "#000",
//                 userSelect: "none",
//               }}
//             >
//               <span style={{ fontSize: 26 }}>{s.icon}</span>
//               <span>{s.name}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>

//     {/* ACTIONS */}
//     <div
//       style={{
//         marginTop: 50,
//         display: "flex",
//         gap: 12,
//         justifyContent: "center",
//       }}
//     >
//       <button
//         onClick={goBack}
//         disabled={loading}
//         style={{
//           padding: "14px 32px",     
//           borderRadius: 10,
//           border: "2px solid #ddd",
//           background: "#fff",
//           fontWeight: 600,
//           cursor: "pointer",
//           fontSize: 16,
//           opacity: loading ? 0.6 : 1,
//           color:"black"
//         }}
//       >
//         Back
//       </button>

//       <button
//         onClick={updateSubjects}
//         disabled={loading}
//         style={{
//           padding: "14px 48px",
//           borderRadius: 10,
//           border: "none",
//           background: "#fff",
//           color: "black",
//           fontWeight: "bold",
//           cursor: "pointer",
//           fontSize: 16,
//           boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
//           flex: 1,
//           maxWidth: 220,
//           opacity: loading ? 0.6 : 1,
//         }}
//       >
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </div>
//   </div>
// );

// }




import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

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
  { name: "Psychology", icon: "🧠" }
];

export default function EditSubjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setLearnSubjects(userData.learnSubjects || []);
    setTeachSubjects(userData.teachSubjects || []);
  }, [navigate]);

  const toggleLearnSubject = (subject: string) => {
    setTeachSubjects((prev) => prev.filter((s) => s !== subject));
    setLearnSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const toggleTeachSubject = (subject: string) => {
    setLearnSubjects((prev) => prev.filter((s) => s !== subject));
    setTeachSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const updateSubjects = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }
    setLoading(true);
    try {
  
      // const response = await api(`/users/${user.id}`, { method: "PATCH", ... });
            const response = await api(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ 
          learnSubjects, 
          teachSubjects 
        }),
      });

      const updatedUser = await response;
      // console.log("User updated:", updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // navigate("/dashboard");
      // const updatedUser = { ...user, learnSubjects, teachSubjects };
      // localStorage.setItem("user", JSON.stringify(updatedUser));
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 800);
    } 
    catch (error) {
      setLoading(false);
      alert("Failed to update subjects");
    }
  };

  if (!user) return null;

  return (
    <div className="edit-wrapper">
      <div className="bg-pattern" />

      <div className="edit-container">
        <header className="edit-header">
          <h1>Update Your Interests</h1>
          <p>Switch between learning and teaching anytime</p>
        </header>

        <div className="edit-grid">
          {/* LEARN SECTION */}
          <div className="edit-col">
            <h2 className="col-title learn-text">📚 Learning</h2>
            <div className="card-list">
              {SUBJECTS.map((s) => {
                const active = learnSubjects.includes(s.name);
                return (
                  <button
                    key={`l-${s.name}`}
                    className={`edit-card ${active ? 'active-l' : ''}`}
                    onClick={() => toggleLearnSubject(s.name)}
                  >
                    <span className="edit-icon">{s.icon}</span>
                    <span className="edit-name">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TEACH SECTION */}
          <div className="edit-col">
            <h2 className="col-title teach-text">👨‍🏫 Teaching</h2>
            <div className="card-list">
              {SUBJECTS.map((s) => {
                const active = teachSubjects.includes(s.name);
                return (
                  <button
                    key={`t-${s.name}`}
                    className={`edit-card ${active ? 'active-t' : ''}`}
                    onClick={() => toggleTeachSubject(s.name)}
                  >
                    <span className="edit-icon">{s.icon}</span>
                    <span className="edit-name">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="edit-footer">
          <button className="btn-back" onClick={() => navigate("/dashboard")} disabled={loading}>
            Cancel
          </button>
          <button className="btn-save" onClick={updateSubjects} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </footer>
      </div>

      <style>{`
        .edit-wrapper {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          font-family: system-ui, sans-serif;
          position: relative;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .bg-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.3;
          pointer-events: none;
        }

        .edit-container { width: 100%; max-width: 900px; position: relative; z-index: 2; }

        .edit-header { text-align: center; color: white; margin-bottom: 40px; }
        .edit-header h1 { font-size: clamp(26px, 7vw, 40px); font-weight: 800; margin: 0; }
        .edit-header p { font-size: 17px; margin-top: 8px; opacity: 0.9; }

        .edit-grid {
          display: grid;
          grid-template-columns: 1fr; /* Mobile first */
          gap: 30px;
        }

        @media (min-width: 768px) {
          .edit-grid { grid-template-columns: 1fr 1fr; } /* Laptop View */
          .edit-wrapper { padding: 60px 40px; }
        }

        .col-title { font-size: 20px; font-weight: 700; margin-bottom: 15px; }
        .learn-text { color: #FFD93D; }
        .teach-text { color: #69ff9d; }

        .card-list { display: flex; flex-direction: column; gap: 10px; }

        .edit-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.95);
          border: 2px solid transparent;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          -webkit-appearance: none;
        }

        .edit-icon { font-size: 22px; }
        .edit-name { font-weight: 600; color: #1a1a1a; font-size: 16px; }

        /* ACTIVE STATES */
        .active-l {
          border-color: #FFD93D;
          background: #fffdf2;
          transform: translateX(5px);
        }

        .active-t {
          border-color: #4CAF50;
          background: #f2fff4;
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
            .active-l, .active-t { transform: scale(1.02); }
        }

        .edit-footer {
          margin-top: 50px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-back {
          padding: 14px 28px;
          background: transparent;
          border: 2px solid white;
          color: white;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-save {
          flex: 1;
          max-width: 250px;
          padding: 14px;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          opacity: ${loading ? '0.7' : '1'};
        }

        .btn-save:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(0,0,0,0.2); }
      `}</style>
    </div>
  );
}