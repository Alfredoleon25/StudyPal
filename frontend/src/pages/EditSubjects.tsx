// import { useState, useEffect } from "react";
// import { api } from "../services/api";

// const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];

// export default function EditSubjects() {
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       window.location.href = "/";
//       return;
//     }
//     const userData = JSON.parse(storedUser);
//     setUser(userData);
//     setSelectedSubjects(userData.subjects || []);
//   }, []);

//   const toggleSubject = (subject: string) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };

//   const updateSubjects = async () => {
//     if (selectedSubjects.length === 0) {
//       return alert("Select at least one subject");
//     }

//     setLoading(true);

//     try {
//       const response = await api(`/users/${user.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ subjects: selectedSubjects }),
//       });

//       const updatedUser = await response;
//       console.log("User updated:", updatedUser);

//       // Update localStorage
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // Redirect back based on role
//       if (updatedUser.role === "learner") {
//         window.location.href = "/tutors";
//       } else {
//         window.location.href = "/tutor-requests";
//       }
//     } catch (error: any) {
//       console.error("Error updating subjects:", error);
//       alert(error.message || "Failed to update subjects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goBack = () => {
//     if (user?.role === "learner") {
//       window.location.href = "/tutors";
//     } else {
//       window.location.href = "/tutor-requests";
//     }
//   };

//   if (!user) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 600,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 32, marginBottom: 10 }}>Edit Your Subjects</h1>
//       <p style={{ color: "#666", marginBottom: 30 }}>
//         Hi <strong>{user.name}</strong>! Update the subjects you're interested in:
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
//               color:"black"
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
//           onClick={goBack}
//           disabled={loading}
//           style={{
//             padding: "12px 24px",
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             backgroundColor: "#fff",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: 16,
//             opacity: loading ? 0.5 : 1,
//             color:"black"
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           onClick={updateSubjects}
//           disabled={loading}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: loading ? "#ccc" : "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: 8,
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: 16,
//             fontWeight: "bold",
//             flex: 1,
//           }}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { api } from "../services/api";

// const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];

// export default function EditSubjects() {
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       window.location.href = "/";
//       return;
//     }
//     const userData = JSON.parse(storedUser);
//     setUser(userData);
//     setSelectedSubjects(userData.subjects || []);
//   }, []);

//   const toggleSubject = (subject: string) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };

//   const updateSubjects = async () => {
//     if (selectedSubjects.length === 0) {
//       return alert("Select at least one subject");
//     }

//     setLoading(true);

//     try {
//       const response = await api(`/users/${user.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ subjects: selectedSubjects }),
//       });

//       const updatedUser = await response;
//       console.log("User updated:", updatedUser);

//       // Update localStorage
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // Redirect back to dashboard
//       window.location.href = "/dashboard";
//     } catch (error: any) {
//       console.error("Error updating subjects:", error);
//       alert(error.message || "Failed to update subjects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goBack = () => {
//     window.location.href = "/dashboard";
//   };

//   if (!user) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   return (
//     <div style={{ 
//       padding: 40,
//       maxWidth: 600,
//       margin: "0 auto",
//       fontFamily: "system-ui, -apple-system, sans-serif"
//     }}>
//       <h1 style={{ fontSize: 32, marginBottom: 10 }}>Edit Your Subjects</h1>
//       <p style={{ color: "#666", marginBottom: 30 }}>
//         Hi <strong>{user.name}</strong>! Update the subjects you're interested in:
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
//               color:"black"
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
//           onClick={goBack}
//           disabled={loading}
//           style={{
//             padding: "12px 24px",
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             backgroundColor: "#fff",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: 16,
//             opacity: loading ? 0.5 : 1,
//             color:"black"
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           onClick={updateSubjects}
//           disabled={loading}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: loading ? "#ccc" : "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: 8,
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: 16,
//             fontWeight: "bold",
//             flex: 1,
//           }}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater","biology","Quemestry"];

export default function EditSubjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setLearnSubjects(userData.learnSubjects || []);
    setTeachSubjects(userData.teachSubjects || []);
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

  const updateSubjects = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      return alert("Select at least one subject to learn or teach");
    }

    setLoading(true);

    try {
      const response = await api(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          learnSubjects, 
          teachSubjects 
        }),
      });

      const updatedUser = await response;
      console.log("User updated:", updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Error updating subjects:", error);
      alert(error.message || "Failed to update subjects");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.location.href = "/dashboard";
  };

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
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Edit Your Subjects</h1>
      <p style={{ color: "#666", marginBottom: 40 }}>
        Hi <strong>{user.name}</strong>! Update what you want to learn and what you can teach:
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
          onClick={goBack}
          disabled={loading}
          style={{
            padding: "12px 24px",
            border: "1px solid #ddd",
            borderRadius: 8,
            backgroundColor: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            opacity: loading ? 0.5 : 1,
            color:"black"
          }}
        >
          Cancel
        </button>
        <button
          onClick={updateSubjects}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}