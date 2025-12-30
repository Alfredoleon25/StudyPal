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


import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (!user || !user.learnSubjects?.length) {
      console.log("No user or learn subjects found");
      return;
    }
    
    const fetchFilteredTutors = async () => {
      try {
        // Send learn subjects to find tutors who can teach them
        const subjectsParam = user.learnSubjects.join(',');
        console.log("Fetching tutors for subjects:", subjectsParam);
        
        const response = await api(`/tutors?subjects=${subjectsParam}`);
        const data = await response;
        
        console.log("Tutors found:", data);
        setTutors(data);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    
    fetchFilteredTutors();
  }, []);

  const requestHelp = async (tutorId: string) => {
    try {
      const response = await api("/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learnerId: user.id,
          tutorId,
          subject: user.learnSubjects[0],
        }),
      });

      const data = await response;
      
      // Redirect to the new chat
      window.location.href = `/chat/${data.chatId}`;
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 20 
      }}>
          <h1>Available Tutors</h1>
        <div style={{      display: "flex",justifyContent:"space-between"}}>
        <button
          onClick={() => window.location.href = "/dashboard"}
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#4CAF50",
            border: "2px solid #4CAF50",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Dashboard
        </button>
                <button
          onClick={() => window.location.href = "/edit-subjects"}
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#4CAF50",
            border: "2px solid #4CAF50",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          Edit Subjects
        </button>
        </div>
      </div>
      
      {tutors.length === 0 && <p>No tutors found for your subjects.</p>}
      
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,

          }}
        >
          <p><strong>{tutor.name}</strong></p>
          <p>Subjects: {tutor.teachSubjects.join(", ")}</p>
          

            <button onClick={() => requestHelp(tutor.id)}>
              Request Help
            </button>
        
        </div>
      ))}
    </div>
  );
}