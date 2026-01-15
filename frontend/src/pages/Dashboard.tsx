import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");

      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);
  const handleLogout = async () => {
  await supabase.auth.signOut();   // 🔐 invalidate session
  localStorage.removeItem("user"); // 🧹 clear cached profile
  navigate("/");
};

  if (!user) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div
      style={{
       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundColor: "#555a60",
        fontFamily: "system-ui, -apple-system, sans-serif",
        width:"100vw",

      }}
    >
      {/* Main Content Wrapper */}
      <div
        style={{
          height: "100%",
          padding: "64px 80px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              marginBottom: 12,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome, {user.name} 
          </h1>

          <p
            style={{
               fontSize: 22, fontWeight: 600, color: "#f9fafb"
              // fontSize: 18,
              // color: "#d1d5db",
              // maxWidth: 720,
              // lineHeight: 1.6,
            }}
          >
        Find tutors. Help students. Chat instantly.
          </p>

          <button
            onClick={() => navigate('/edit-subjects')}
            style={{
              marginTop: 20,
              padding: "10px 18px",
              backgroundColor: "#f9fafb",
              color: "#111827",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Edit Subjects
          </button>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 20,
              marginLeft: 12,
              padding: "10px 18px",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.6)",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Log out
          </button>

        </div>

        {/* Subjects */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 48,
          }}
        >
          {user.learnSubjects?.map((subject: string) => (
            <span
              key={`learn-${subject}`}
              style={{
                padding: "8px 16px",
                borderRadius: 9999,
                backgroundColor: "#eef2ff",
                color: "#0a3ea7ff",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {subject}
            </span>
          ))}

          {user.teachSubjects?.map((subject: string) => (
            <span
              key={`teach-${subject}`}
              style={{
                padding: "8px 16px",
                borderRadius: 9999,
                backgroundColor: "#ecfdf5",
                color: "#065f46",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {subject}
            </span>
          ))}
        </div>

        {/* Feature Cards (2 x 2, LEFT ALIGNED) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
            flexGrow: 1,
          }}
        >
          <FeatureCard
            icon="🎓"
            title="Find Tutors"
            description="Browse tutors available for your learning subjects."
            bg="#e0ecff"
            href="/tutors"
          
          />

          <FeatureCard
            icon="📝"
            title="My Requests"
            description="Track the help requests you’ve sent."
            bg="#e6f6ff"
            href="/my-requests"
          />

          <FeatureCard
            icon="🤝"
            title="Help Requests"
            description="See students who need help in your subjects."
            bg="#dcfce7"
            href="/tutor-requests"
          />

          <FeatureCard
            icon="💬"
            title="My Chats"
            description="Continue conversations with tutors and students."
            bg="#f0fdf4"
            href="/chats"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Feature Card ---------- */
function FeatureCard({
  icon,
  title,
  description,
  bg,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  bg: string;
  href: string;
}) {
  return (
    <div
      onClick={() => (window.location.href = href)}
      style={{
        padding: 36,
        borderRadius: 24,
        backgroundColor: bg,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 16px 32px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: 42, marginBottom: 16 }}>{icon}</div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 8,
          color: "#525458ff",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: 15,
          color: "#374151",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
