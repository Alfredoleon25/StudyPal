// import { useState,useEffect } from "react";
// import { api } from "../services/api";

// const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];
// export default function Subjects() {
//   const [selectedSubjects, setSelected] = useState<string[]>([]);
//   const [tempUser, setTempUser] = useState<{ name: string} | null>(null);

//   useEffect(() => {
//     // Get temporary user data from localStorage
//     const temp = localStorage.getItem("tempuser");
//     console.log("this is the temp user",temp)
//     // console.log("this is the temp user",tempUser)
//     if (!temp) {
//       // If no temp user, redirect back to registration
//       window.location.href = "/";
//       return;
//     }
//     setTempUser(JSON.parse(temp));
//   }, []);
//   const toggleSubject = (subject: string) => {
//     setSelected((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };
//     const createUser = async () => {
//     if (selectedSubjects.length === 0) {
//       return alert("Select at least one subject");
//     }

//     if (!tempUser) return;

//     try {
//       const user= await api("/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: tempUser.name,
//           // role: tempUser.role,
//           subjects: selectedSubjects,
//         }),
//       });
//       console.log("User created:", user);
//       // Remove temporary user data
//       localStorage.removeItem("tempuser");
//       // Save the complete user object to localStorage
//       localStorage.setItem("user", JSON.stringify(user));
      
//       window.location.href = "/Dashboard"
//       // Redirect based on role
//       // if (user.role === "learner") {
//       //   window.location.href = "/tutors";
//       // } else if (user.role === "tutor") {
//       //   window.location.href = "/tutor-requests";
//       // }
//     } catch (error: any) {
//       console.error("Error creating user:", error);
//       alert(error.message || "Failed to create user");
//     }
//   };

//   if (!tempUser) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }
//   // return (
//   //   <div style={{ padding: 20 }}>
//   //     <h1>Select Subjects</h1>
//   //     {SUBJECTS.map((subject) => (
//   //       <div key={subject}>
//   //         <input
//   //           type="checkbox"
//   //           checked={selected.includes(subject)}
//   //           onChange={() => toggleSubject(subject)}
//   //         />
//   //         <label>{subject}</label>
//   //       </div>
//   //     ))}
      
//   //     <button onClick={createUser} style={{ marginTop: 10 }}>
//   //       Continue
//   //     </button>
//   //   </div>
//   // );
//       return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 600,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 32, marginBottom: 10 }}>Select Your Subjects</h1>
//       <p style={{ color: "#666", marginBottom: 30 }}>
//         Hi <strong>{tempUser.name}</strong>! Choose the subjects you're interested in:
//       </p>

//       <div style={{ marginBottom: 30 }}>
//         {SUBJECTS.map((subject) => (
//           <div
//             key={subject}
//             style={{
//               padding: 15,
//               marginBottom: 10,
//               border: selectedSubjects.includes(subject)
//                 ? "2px solid #4CAF50"
//                 : "2px solid #e0e0e0",
//               borderRadius: 8,
//               cursor: "pointer",
//               backgroundColor: selectedSubjects.includes(subject)
//                 ? "#f1f8f4"
//                 : "#fff",
//               transition: "all 0.2s",
//               color: "black",
//             }}
//             onClick={() => toggleSubject(subject)}
//           >
//             <label style={{ 
//               cursor: "pointer", 
//               display: "flex", 
//               alignItems: "center",
//               fontSize: 16
//             }}>
//               <input
//                 type="checkbox"
//                 checked={selectedSubjects.includes(subject)}
//                 onChange={() => {}}
//                 style={{ marginRight: 10, width: 18, height: 18 }}
//               />
//               {subject}
//             </label>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "flex", gap: 10 }}>
//         <button
//           onClick={() => window.location.href = "/"}
//           style={{
//             padding: "12px 24px",
//             border: "1px solid #9b8989ff",
//             borderRadius: 8,
//             backgroundColor: "#fff",
//             cursor: "pointer",
//             fontSize: 16,
//             color: "black",
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

const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];

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

  const toggleLearnSubject = (subject: string) => {
    setLearnSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleTeachSubject = (subject: string) => {
    setTeachSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const createUser = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }

    if (!tempUser) return;

    try {
      const response = await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tempUser.name,
          learnSubjects,
          teachSubjects,
        }),
      });

      const user = await response;
      console.log("User created:", user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("tempuser");

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    }
  };

  if (!tempUser) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ 
      padding: 40,
      maxWidth: 900,
      margin: "0 auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Select Your Subjects</h1>
      <p style={{ color: "#666", marginBottom: 40 }}>
        Hi <strong>{tempUser.name}</strong>! Tell us what you want to learn and what you can teach:
      </p>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 30,
        marginBottom: 30 
      }}>
        {/* Learn Subjects */}
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 15, color: "#2196F3" }}>
            📚 I want to learn:
          </h2>
          {SUBJECTS.map((subject) => (
            <div
              key={`learn-${subject}`}
              style={{
                padding: 15,
                marginBottom: 10,
                border: learnSubjects.includes(subject)
                  ? "2px solid #2196F3"
                  : "2px solid #e0e0e0",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: learnSubjects.includes(subject)
                  ? "#e3f2fd"
                  : "#fff",
                transition: "all 0.2s",
                color:"black"
              }}
              onClick={() => toggleLearnSubject(subject)}
            >
              <label style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center",
                fontSize: 15
              }}>
                <input
                  type="checkbox"
                  checked={learnSubjects.includes(subject)}
                  onChange={() => {}}
                  style={{ marginRight: 10, width: 18, height: 18 }}
                />
                {subject}
              </label>
            </div>
          ))}
        </div>

        {/* Teach Subjects */}
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 15, color: "#4CAF50" }}>
            👨‍🏫 I can teach:
          </h2>
          {SUBJECTS.map((subject) => (
            <div
              key={`teach-${subject}`}
              style={{
                padding: 15,
                marginBottom: 10,
                border: teachSubjects.includes(subject)
                  ? "2px solid #4CAF50"
                  : "2px solid #e0e0e0",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: teachSubjects.includes(subject)
                  ? "#f1f8f4"
                  : "#fff",
                transition: "all 0.2s",
                color:"black"
              }}
              onClick={() => toggleTeachSubject(subject)}
            >
              <label style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center",
                fontSize: 15
              }}>
                <input
                  type="checkbox"
                  checked={teachSubjects.includes(subject)}
                  onChange={() => {}}
                  style={{ marginRight: 10, width: 18, height: 18 }}
                />
                {subject}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => window.location.href = "/"}
          style={{
            padding: "12px 24px",
            border: "1px solid #ddd",
            borderRadius: 8,
            backgroundColor: "#fff",
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
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}