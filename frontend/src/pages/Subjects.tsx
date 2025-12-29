import { useState,useEffect } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming"];

export default function Subjects() {
  const [selected, setSelected] = useState<string[]>([]);
  const [tempUser, setTempUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    // Get temporary user data from localStorage
    const temp = localStorage.getItem("tempuser");
    // console.log("this is the temp user",tempUser)
    if (!temp) {
      // If no temp user, redirect back to registration
      window.location.href = "/";
      return;
    }
    setTempUser(JSON.parse(temp));
  }, []);
  const toggleSubject = (subject: string) => {
    setSelected((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };
    const createUser = async () => {
    if (selected.length === 0) {
      return alert("Select at least one subject");
    }

    if (!tempUser) return;

    try {
      const user= await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tempUser.name,
          role: tempUser.role,
          subjects: selected,
        }),
      });
      console.log("User created:", user);

      // Save the complete user object to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Remove temporary user data
      localStorage.removeItem("tempUser");

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

  if (!tempUser) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }


  // const saveSubjects = async () => {
  //   const user = JSON.parse(localStorage.getItem("user")!);
  //   console.log(user)
  //   if (selected.length === 0) return alert("Select at least one subject");
  //   const users = await api("/users", {
  //     method: "POST",
  //     body: JSON.stringify({ ...user, subjects: selected }),
  //   });
  //   console.log(users)
  //   localStorage.setItem("user", JSON.stringify({ ...user, subjects: selected }));
    
  //   window.location.href = "/tutors";
  // };

  return (
    <div style={{ padding: 20 }}>
      <h1>Select Subjects</h1>
      {SUBJECTS.map((subject) => (
        <div key={subject}>
          <input
            type="checkbox"
            checked={selected.includes(subject)}
            onChange={() => toggleSubject(subject)}
          />
          <label>{subject}</label>
        </div>
      ))}
      <button onClick={createUser} style={{ marginTop: 10 }}>
        Continue
      </button>
    </div>
  );
}
