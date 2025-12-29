import { useState } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming","Music","Theater"];

export default function Registration() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"learner" | "tutor" | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // const toggleSubject = (subject: string) => {
  //   setSelectedSubjects((prev) =>
  //     prev.includes(subject)
  //       ? prev.filter((s) => s !== subject)
  //       : [...prev, subject]
  //   );
  // };

  const handleRoleSelection = async (selectedRole: "learner" | "tutor") => {
    if (!name) return alert("Enter your name");
        try {
      
      // Save the entire user object to localStorage
      localStorage.setItem("tempuser", JSON.stringify({name,role:selectedRole}));
      if (selectedRole){
      window.location.href = "/subjects"}
      // if (user.role === "learner") {
      //   window.location.href = "/tutors";
      // } else if (user.role === "tutor") {
      //   window.location.href = "/tutor-requests";
      // }
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    }
  };

  // const createUser = async () => {
    // if (selectedSubjects.length === 0) {
    //   return alert("Select at least one subject");
    // }

    // try {
    //   const user = await api("/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ 
    //       name, 
    //       role, 
    //       subjects: selectedSubjects 
    //     }),
    //   });

   
    //   console.log("User created:", user);
      
    //   // Save the entire user object to localStorage
    //   localStorage.setItem("user", JSON.stringify(user));
    //   console.log(user)
    //   window.location.href === "/subjects"
    //   // if (user.role === "learner") {
    //   //   window.location.href = "/tutors";
    //   // } else if (user.role === "tutor") {
    //   //   window.location.href = "/tutor-requests";
    //   // }
    // } catch (error: any) {
    //   console.error("Error creating user:", error);
    //   alert(error.message || "Failed to create user");
    // }
  // };

  return (
    <div style={{ padding: 20 }}>
      {/* {step === 1 ? (
        <> */}
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
        {/* </>
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
      )} */}
    </div>
  );
}