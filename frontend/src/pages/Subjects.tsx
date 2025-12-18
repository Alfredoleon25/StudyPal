import { useState } from "react";
import { api } from "../services/api";

const SUBJECTS = ["Calculus", "Physics", "Programming"];

export default function Subjects() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    setSelected((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const saveSubjects = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    console.log(user)
    if (selected.length === 0) return alert("Select at least one subject");
    const users = await api("/users", {
      method: "POST",
      body: JSON.stringify({ ...user, subjects: selected }),
    });
    console.log(users)
    localStorage.setItem("user", JSON.stringify({ ...user, subjects: selected }));
    
    window.location.href = "/tutors";
  };

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
      <button onClick={saveSubjects} style={{ marginTop: 10 }}>
        Continue
      </button>
    </div>
  );
}
