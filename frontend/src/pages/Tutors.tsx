// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// export default function Tutors() {
//   const [tutors, setTutors] = useState<any[]>([]);
//   const [message, setMessage] = useState("");
//   const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
//   const user = JSON.parse(localStorage.getItem("user")!);

//   useEffect(() => {
//     const fetchAllTutors = async () => {
//       try {
//         const params = user.subjects.join(",")
//         const response = await api(`/tutors?subject=${params}`);
//         const data = await response
//         console.log(response)
//         setTutors(data);
//       } catch (err) {
//         console.error("Error fetching tutors:", err);
//       }
//     };
    
//     fetchAllTutors();
//   }, []);

//   const requestHelp = async (tutorId: string) => {
//     if (!message.trim()) {
//       return alert("Please enter a message");
//     }

//     try {
//       console.log("it's working fine")
//       console.log(user.subjects)
//       console.log(user)
//       const response = await api("/requests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           learnerId: user.id,
//           tutorId,
//           subject: user.subjects[0],
//           message: message,
//         }),
//       });

//       await response;
//       console.log(response)
//       alert("Request sent!");
//       setMessage("");
//       setSelectedTutor(null);
//     } catch (error) {
//       console.error("Error sending request:", error);
//       alert("Failed to send request");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       {/* <div>{user.name}</div> */}
//       <h1>Welcome {user.name}</h1>
//       Available tutors for: <strong>{user.subjects?.join(", ")}</strong>
//       {tutors.length === 0 && <p>No tutors found.</p>}
      
//       {tutors.map((tutor) => (
//         <div
//           key={tutor.id}
//           style={{
//             border: "1px solid gray",
//             padding: 10,
//             marginBottom: 10,
//             borderRadius: 5,
//           }}
//         >
//           <p><strong>{tutor.name}</strong></p>
//           <p>Subjects: {tutor.subjects.join(", ")}</p>
          
//           {selectedTutor === tutor.id ? (
//             <div style={{ marginTop: 10 }}>
//               <textarea
//                 placeholder="What do you need help with?"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows={3}
//                 style={{ width: "100%", marginBottom: 5 }}
//               />
//               <div>
//                 <button onClick={() => requestHelp(tutor.id)}>
//                   Send Request
//                 </button>
//                 <button 
//                   onClick={() => {
//                     setSelectedTutor(null);
//                     setMessage("");
//                   }}
//                   style={{ marginLeft: 5 }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button onClick={() => setSelectedTutor(tutor.id)}>
//               Request Help
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (!user || !user.subjects?.length) {
      console.log("No user or subjects found");
      return;
    }
    
    const fetchFilteredTutors = async () => {
      try {
        // Send subjects as comma-separated query parameter
        const subjectsParam = user.subjects.join(',');
        console.log("Fetching tutors for subjects:", subjectsParam);
        
        const response = await api(`/tutors?subject=${subjectsParam}`);
        
        console.log("Tutors found:", response);
        setTutors(response);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    
    fetchFilteredTutors();
  }, []);

  const requestHelp = async (tutorId: string) => {
    if (!message.trim()) {
      return alert("Please enter a message");
    }

    try {
      const response = await api("/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learnerId: user.id,
          tutorId,
          subject: user.subjects[0],
          message: message,
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
      <h1>Available Tutors</h1>
      <p style={{ color: "#666", marginBottom: 20 }}>
        Showing tutors for: <strong>{user.subjects?.join(", ")}</strong>
      </p>
      
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
          <p>Subjects: {tutor.subjects.join(", ")}</p>
          
          {selectedTutor === tutor.id ? (
            <div style={{ marginTop: 10 }}>
              <textarea
                placeholder="What do you need help with?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                style={{ width: "100%", marginBottom: 5 }}
              />
              <div>
                <button onClick={() => requestHelp(tutor.id)}>
                  Send Request
                </button>
                <button 
                  onClick={() => {
                    setSelectedTutor(null);
                    setMessage("");
                  }}
                  style={{ marginLeft: 5 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setSelectedTutor(tutor.id)}>
              Request Help
            </button>
          )}
        </div>
      ))}
    </div>
  );
}