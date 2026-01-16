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
//   { name: "Psychology", icon: "🧠" },
// ];

// export default function Subjects() {
//   const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
//   const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
//   const [tempUser, setTempUser] = useState<{ name: string } | null>(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const temp = localStorage.getItem("tempuser");

//     if (!temp) {
//       navigate("/")
//       return;
//     }
//     setTempUser(JSON.parse(temp));
//   }, []);

//   // Exclusive toggle: selecting one side deselects the other
//   const toggleLearnSubject = (subject: string) => {
//     setLearnSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//     setTeachSubjects((prev) => prev.filter((s) => s !== subject));
//   };

//   const toggleTeachSubject = (subject: string) => {
//     setTeachSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//     setLearnSubjects((prev) => prev.filter((s) => s !== subject));
//   };

//   const createUser = async () => {
//     // const token = localStorage.getItem("supabase_token");

//     if (learnSubjects.length === 0 && teachSubjects.length === 0) {
//       return alert("Select at least one subject to learn or teach");
//     }
//     if (!tempUser) return;
    
//     const user = await api("/users", {
//       method: "POST",
//       body: JSON.stringify({
//         name: tempUser.name,
//         learnSubjects,
//         teachSubjects,
//       }),
//     });
//     localStorage.setItem("user",JSON.stringify(user))
//     localStorage.removeItem("tempuser")
//     navigate("/dashboard");

//   };

//   if (!tempUser) return null;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//       width:"100%",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         backgroundColor: "#555a60", // dark gray background covers whole page
//         padding: 40,
//         boxSizing: "border-box",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//       }}
//     >
//       {/* <h1
//         style={{
//           marginBottom: 40,
//           color: "white",
//           textAlign: "center",
//           fontSize: 36,
//           fontWeight: "bold",
//         }}
//       >
//         Select Your Subjects
//       </h1> */}
//             <h1
//         style={{
//           textAlign: "center",
//           fontSize: 40,
//           fontWeight: 800,
//           color: "white",
//           marginBottom: 10,
//         }}
//       >
//         Hi {tempUser.name} 
//       </h1>

//       <p
//         style={{
//           textAlign: "center",
//           color: "rgba(255,255,255,0.85)",
//           fontSize: 17,
//           marginBottom: 50,
//         }}
//       >
//         Pick what you want to learn or teach
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 50,
//           // height: "calc(100vh - 160px)", // full height minus padding and heading
//           // overflowY: "auto",
//         }}
//       >
//         {/* LEARN */}
//         <div>
//           <h2 style={{ marginBottom: 20, color: "#3341a9ff" }}>
//             📚 Learn
//           </h2>
//           {SUBJECTS.map((s) => {
//             const active = learnSubjects.includes(s.name);
//             return (
//               <div
//                 key={`learn-${s.name}`}
//                 onClick={() => toggleLearnSubject(s.name)}
//                 style={{
//                   padding: 22,
//                   marginBottom: 16,
//                   borderRadius: 16,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 14,
//                   fontSize: 18,
//                   cursor: "pointer",
//                   transition: "all 0.25s ease",
//                   background: active ? "#e3f2fd" : "#ffffff",
//                   border: active ? "2px solid #2196F3" : "2px solid transparent",
//                   boxShadow: active
//                     ? "0 12px 32px rgba(33,150,243,0.3)"
//                     : "0 6px 14px rgba(0,0,0,0.08)",
//                   transform: active ? "scale(1.04)" : "scale(1)",
//                   color: "#000", // black text for visibility
//                   userSelect: "none",
//                 }}
//               >
//                 <span style={{ fontSize: 26 }}>{s.icon}</span>
//                 <span>{s.name}</span>
//               </div>
//             );
//           })}
//         </div>

//         {/* TEACH */}
//         <div>
//           <h2 style={{ marginBottom: 20, color: "#4CAF50" }}>
//             👨‍🏫 Teach
//           </h2>
//           {SUBJECTS.map((s) => {
//             const active = teachSubjects.includes(s.name);
//             return (
//               <div
//                 key={`teach-${s.name}`}
//                 onClick={() => toggleTeachSubject(s.name)}
//                 style={{
//                   padding: 22,
//                   marginBottom: 16,
//                   borderRadius: 16,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 14,
//                   fontSize: 18,
//                   cursor: "pointer",
//                   transition: "all 0.25s ease",
//                   background: active ? "#e8f5e9" : "#ffffff",
//                   border: active ? "2px solid #4CAF50" : "2px solid transparent",
//                   boxShadow: active
//                     ? "0 12px 32px rgba(76,175,80,0.3)"
//                     : "0 6px 14px rgba(0,0,0,0.08)",
//                   transform: active ? "scale(1.04)" : "scale(1)",
//                   color: "#000", // black text for visibility
//                   userSelect: "none",
//                 }}
//               >
//                 <span style={{ fontSize: 26 }}>{s.icon}</span>
//                 <span>{s.name}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div
//         style={{
//           marginTop: 50,
//           display: "flex",
//           gap: 12,
//           justifyContent: "center",
//         }}
//       >
//         <button
//           onClick={() => navigate('/registration')}
//           style={{
//             padding: "14px 32px",
//             borderRadius: 10,
//             border: "2px solid #ddd",
//             background: "#fff",
//             fontWeight: 600,
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
//             padding: "14px 48px",
//             borderRadius: 10,
//             border: "none",
//             background:  "#fff",
//             color: "black",
//             fontWeight: "bold",
//             cursor: "pointer",
//             fontSize: 16,
//             boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
//             flex: 1,
//             maxWidth: 200,
             
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
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
  { name: "Psychology", icon: "🧠" },
];

export default function Subjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [tempUser, setTempUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = localStorage.getItem("tempuser");
    if (!temp) {
      navigate("/");
      return;
    }
    setTempUser(JSON.parse(temp));
  }, [navigate]);

  const toggleLearnSubject = (subject: string) => {
    setLearnSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
    setTeachSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const toggleTeachSubject = (subject: string) => {
    setTeachSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
    setLearnSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const createUser = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Please select at least one subject.");
    }
    // Your API logic here...
    navigate("/dashboard");
  };

  if (!tempUser) return null;

  return (
    <div className="sub-wrapper">
      <div className="bg-pattern" />

      <div className="sub-container">
        <header className="sub-header">
          <h1>Hi, {tempUser.name}</h1>
          <p>What brings you to StudyPal today?</p>
        </header>

        <div className="sub-grid">
          {/* LEARN COLUMN */}
          <div className="sub-column">
            <h2 className="column-title learn-color">📚 I want to Learn</h2>
            <div className="card-stack">
              {SUBJECTS.map((s) => (
                <button
                  key={`l-${s.name}`}
                  className={`sub-card ${learnSubjects.includes(s.name) ? 'active-learn' : ''}`}
                  onClick={() => toggleLearnSubject(s.name)}
                >
                  <span className="sub-icon">{s.icon}</span>
                  <span className="sub-label">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TEACH COLUMN */}
          <div className="sub-column">
            <h2 className="column-title teach-color">👨‍🏫 I can Teach</h2>
            <div className="card-stack">
              {SUBJECTS.map((s) => (
                <button
                  key={`t-${s.name}`}
                  className={`sub-card ${teachSubjects.includes(s.name) ? 'active-teach' : ''}`}
                  onClick={() => toggleTeachSubject(s.name)}
                >
                  <span className="sub-icon">{s.icon}</span>
                  <span className="sub-label">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="sub-footer">
          <button className="btn-back" onClick={() => navigate('/registration')}>Back</button>
          <button className="btn-finish" onClick={createUser}>Finish Setup</button>
        </footer>
      </div>

      <style>{`
        .sub-wrapper {
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

        .sub-container { width: 100%; max-width: 900px; position: relative; z-index: 2; }

        .sub-header { text-align: center; color: white; margin-bottom: 40px; }
        .sub-header h1 { font-size: clamp(28px, 7vw, 42px); font-weight: 800; margin: 0; }
        .sub-header p { font-size: 18px; margin-top: 10px; opacity: 0.9; }

        /* THE RESPONSIVE GRID */
        .sub-grid {
          display: grid;
          grid-template-columns: 1fr; /* 1 column on Phone */
          gap: 40px;
        }

        @media (min-width: 768px) {
          .sub-grid { grid-template-columns: 1fr 1fr; } /* 2 columns on Laptop */
        }

        .column-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
        .learn-color { color: #FFD93D; }
        .teach-color { color: #69ff9d; }

        .card-stack { display: flex; flex-direction: column; gap: 10px; }

        .sub-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px 20px;
          background: white;
          border: 2px solid transparent;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
          -webkit-appearance: none;
        }

        .sub-icon { font-size: 24px; }
        .sub-label { font-weight: 600; color: #1a1a1a; font-size: 16px; }

        /* ACTIVE STATES */
        .active-learn {
          border-color: #FFD93D;
          background: #fffdf2;
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(255, 217, 61, 0.2);
        }

        .active-teach {
          border-color: #4CAF50;
          background: #f2fff4;
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
        }

        /* FOOTER BUTTONS */
        .sub-footer {
          margin-top: 50px;
          display: flex;
          gap: 15px;
        }

        .btn-back {
          padding: 16px 25px;
          background: transparent;
          border: 2px solid white;
          color: white;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-finish {
          flex: 1;
          padding: 16px;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 480px) {
          .sub-wrapper { padding: 30px 15px; }
          .sub-card { padding: 14px 16px; }
        }
      `}</style>
    </div>
  );
}