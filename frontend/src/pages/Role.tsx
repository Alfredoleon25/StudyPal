// import { useState } from "react";
// import { api } from "../services/api";

// export default function Role() {
//   const [name, setName] = useState("");

//   const createUser = async (role: "learner" | "tutor") => {
//     if (!name) return alert("Enter your name");
//     console.log("hello world")
//     try{

//     const user = await api("/users", {
//       method: "POST",
//       body: JSON.stringify({ name, role, subjects: [] }),
//     });

//     localStorage.setItem("user", JSON.stringify(user));
//     window.location.href = "/subjects";}
//     catch(error:any){
 
//         console.error(error);
//         alert(error.message)
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Enter Your Name</h1>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <div style={{ marginTop: 10 }}>
//         <button onClick={() => createUser("learner")}>Learner</button>
//         <button onClick={() => createUser("tutor")}>Tutor</button>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { api } from "../services/api";

// const SUBJECTS = ["Calculus", "Physics", "Programming"];

// export default function Registration() {
//   const [step, setStep] = useState(1);
//   const [name, setName] = useState("");
//   const [role, setRole] = useState<"learner" | "tutor" | null>(null);
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

//   const toggleSubject = (subject: string) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//   };

//   const handleRoleSelection = (selectedRole: "learner" | "tutor") => {
//     if (!name) return alert("Enter your name");
//     setRole(selectedRole);
//     setStep(2);
//   };

//   const createUser = async () => {
//     if (selectedSubjects.length === 0) {
//       return alert("Select at least one subject");
//     }

//     try {
//       const response = await api("/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           name, 
//           role, 
//           subjects: selectedSubjects 
//         }),
//       });
//       console.log("this is the response",response)
//       const Role = response.role
      
//       localStorage.setItem("user", JSON.stringify(Role));
//       if(Role=="learner"){
//       window.location.href = "/tutors";}
//       else{
//         console.log("this is the role",Role)
//       }
//     } catch (error: any) {
//       console.error("Error creating user:", error);
//       alert(error.message || "Failed to create user");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       {step === 1 ? (
//         <>
//           <h1>Enter Your Name</h1>
//           <input
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <div style={{ marginTop: 10 }}>
//             <button onClick={() => handleRoleSelection("learner")}>
//               Learner
//             </button>
//             <button onClick={() => handleRoleSelection("tutor")}>
//               Tutor
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <h1>Select Subjects</h1>
//           {SUBJECTS.map((subject) => (
//             <div key={subject}>
//               <input
//                 type="checkbox"
//                 checked={selectedSubjects.includes(subject)}
//                 onChange={() => toggleSubject(subject)}
//               />
//               <label>{subject}</label>
//             </div>
//           ))}
//           <div style={{ marginTop: 10 }}>
//             <button onClick={() => setStep(1)}>Back</button>
//             <button onClick={createUser} style={{ marginLeft: 10 }}>
//               Continue
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming"];

export default function Registration() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"learner" | "tutor" | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleRoleSelection = (selectedRole: "learner" | "tutor") => {
    if (!name) return alert("Enter your name");
    setRole(selectedRole);
    setStep(2);
  };

  const createUser = async () => {
    if (selectedSubjects.length === 0) {
      return alert("Select at least one subject");
    }

    try {
      const user = await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          role, 
          subjects: selectedSubjects 
        }),
      });

   
      console.log("User created:", user);
      
      // Save the entire user object to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Redirect based on role
      if (user.role === "learner") {
        window.location.href = "/tutors";
      } else if (user.role === "tutor") {
        window.location.href = "/tutor-requests";
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {step === 1 ? (
        <>
          <h1>Enter Your Name</h1>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ marginTop: 10 }}>
            <button onClick={() => handleRoleSelection("learner")}>
              Learner
            </button>
            <button onClick={() => handleRoleSelection("tutor")}>
              Tutor
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Select Subjects</h1>
          {SUBJECTS.map((subject) => (
            <div key={subject}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                onChange={() => toggleSubject(subject)}
              />
              <label>{subject}</label>
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={createUser} style={{ marginLeft: 10 }}>
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}