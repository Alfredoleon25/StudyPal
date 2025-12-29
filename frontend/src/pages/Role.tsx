import { useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");
  const handleRoleSelection = async (selectedRole: "learner" | "tutor") => {
    if (!name) return alert("Enter your name");
        try {
      localStorage.setItem("tempuser", JSON.stringify({name,role:selectedRole}));
      if (selectedRole){
      window.location.href = "/subjects"}
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    }
  };
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
    </div>
  );
}

