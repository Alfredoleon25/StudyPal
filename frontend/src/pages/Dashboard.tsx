// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useNavigate } from "react-router-dom";
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       navigate("/");

//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, []);
//   const handleLogout = async () => {
//   await supabase.auth.signOut();   // 🔐 invalidate session
//   localStorage.removeItem("user"); // 🧹 clear cached profile
//   navigate("/");
// };

//   if (!user) {
//     return <div style={{ padding: 40 }}>Loading...</div>;
//   }

//   return (
//     <div
//       style={{
//        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         backgroundColor: "#555a60",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//         width:"100vw",

//       }}
//     >
//       {/* Main Content Wrapper */}
//       <div
//         style={{
//           height: "100%",
//           padding: "64px 80px",
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Header */}
//         <div style={{ marginBottom: 40 }}>
//           <h1
//             style={{
//               fontSize: 52,
//               fontWeight: 800,
//               marginBottom: 12,
//               color: "#ffffff",
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Welcome, {user.name} 
//           </h1>

//           <p
//             style={{
//                fontSize: 22, fontWeight: 600, color: "#f9fafb"
//               // fontSize: 18,
//               // color: "#d1d5db",
//               // maxWidth: 720,
//               // lineHeight: 1.6,
//             }}
//           >
//         Find tutors. Help students. Chat instantly.
//           </p>

//           <button
//             onClick={() => navigate('/edit-subjects')}
//             style={{
//               marginTop: 20,
//               padding: "10px 18px",
//               backgroundColor: "#f9fafb",
//               color: "#111827",
//               border: "none",
//               borderRadius: 10,
//               cursor: "pointer",
//               fontSize: 15,
//               fontWeight: 600,
//             }}
//           >
//             Edit Subjects
//           </button>
//           <button
//             onClick={handleLogout}
//             style={{
//               marginTop: 20,
//               marginLeft: 12,
//               padding: "10px 18px",
//               backgroundColor: "transparent",
//               color: "#ffffff",
//               border: "2px solid rgba(255,255,255,0.6)",
//               borderRadius: 10,
//               cursor: "pointer",
//               fontSize: 15,
//               fontWeight: 600,
//             }}
//           >
//             Log out
//           </button>

//         </div>

//         {/* Subjects */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 12,
//             marginBottom: 48,
//           }}
//         >
//           {user.learnSubjects?.map((subject: string) => (
//             <span
//               key={`learn-${subject}`}
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: 9999,
//                 backgroundColor: "#eef2ff",
//                 color: "#0a3ea7ff",
//                 fontWeight: 600,
//                 fontSize: 14,
//               }}
//             >
//               {subject}
//             </span>
//           ))}

//           {user.teachSubjects?.map((subject: string) => (
//             <span
//               key={`teach-${subject}`}
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: 9999,
//                 backgroundColor: "#ecfdf5",
//                 color: "#065f46",
//                 fontWeight: 600,
//                 fontSize: 14,
//               }}
//             >
//               {subject}
//             </span>
//           ))}
//         </div>

//         {/* Feature Cards (2 x 2, LEFT ALIGNED) */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: 32,
//             flexGrow: 1,
//           }}
//         >
//           <FeatureCard
//             icon="🎓"
//             title="Find Tutors"
//             description="Browse tutors available for your learning subjects."
//             bg="#e0ecff"
//           onclick={() => navigate("/tutors")}
          
//           />

//           <FeatureCard
//             icon="📝"
//             title="My Requests"
//             description="Track the help requests you’ve sent."
//             bg="#e6f6ff"
//             onclick={() => navigate("/my-requests")}
      
//           />

//           <FeatureCard
//             icon="🤝"
//             title="Help Requests"
//             description="See students who need help in your subjects."
//             bg="#dcfce7"
//         onclick={() => navigate("/tutor-requests")}
//           />

//           <FeatureCard
//             icon="💬"
//             title="My Chats"
//             description="Continue conversations with tutors and students."
//             bg="#f0fdf4"
//             onclick={() => navigate("/chats")}
    
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Feature Card ---------- */
// function FeatureCard({
//   icon,
//   title,
//   description,
//   bg,
//   // href,
// }: {
//   icon: string;
//   title: string;
//   description: string;
//   bg: string;
//   href: string;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       onClick= {onclick}
//       style={{
//         padding: 36,
//         borderRadius: 24,
//         backgroundColor: bg,
//         cursor: "pointer",
//         transition: "transform 0.2s ease, box-shadow 0.2s ease",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px)";
//         e.currentTarget.style.boxShadow =
//           "0 16px 32px rgba(0,0,0,0.18)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       <div style={{ fontSize: 42, marginBottom: 16 }}>{icon}</div>

//       <h2
//         style={{
//           fontSize: 22,
//           fontWeight: 700,
//           marginBottom: 8,
//           color: "#525458ff",
//         }}
//       >
//         {title}
//       </h2>

//       <p
//         style={{
//           fontSize: 15,
//           color: "#374151",
//           lineHeight: 1.6,
//           margin: 0,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useNavigate } from "react-router-dom";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// interface UserProfile {
//   name: string;
//   learnSubjects?: string[];
//   teachSubjects?: string[];
// }

// export default function Dashboard() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const init = async () => {
//       // 🔐 Check Supabase session
//       const { data } = await supabase.auth.getSession();

//       if (!data.session) {
//         navigate("/");
//         return;
//       }

//       // 📦 Load cached profile (or redirect to registration)
//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) {
//         navigate("/registration");
//         return;
//       }

//       setUser(JSON.parse(storedUser));
//       setLoading(false);
//     };

//     init();
//   }, [navigate]);

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error(error);
//       return;
//     }

//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   if (loading || !user) {
//     return <div style={{ padding: 40 }}>Loading...</div>;
//   }

//   return (
//     <div
//       style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         minHeight: "100vh",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//          width:"100%",
//       }}
//     >
//       <div
//         style={{
//           padding: "64px 80px",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Header */}
//         <div style={{ marginBottom: 40 }}>
//           <h1
//             style={{
//               fontSize: 52,
//               fontWeight: 800,
//               marginBottom: 12,
//               color: "#ffffff",
//             }}
//           >
//             Welcome, {user.name}
//           </h1>

//           <p style={{ fontSize: 22, fontWeight: 600, color: "#f9fafb" }}>
//             Find tutors. Help students. Chat instantly.
//           </p>

//           <div style={{ marginTop: 20 }}>
//             <button
//               onClick={() => navigate("/edit-subjects")}
//               style={buttonPrimary}
//             >
//               Edit Subjects
//             </button>

//             <button
//               onClick={handleLogout}
//               style={buttonSecondary}
//             >
//               Log out
//             </button>
//           </div>
//         </div>

//         {/* Subjects */}
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
//           {user.learnSubjects?.map((subject) => (
//             <SubjectPill key={`learn-${subject}`} color="#eef2ff" textColor="#1d4ed8">
//               {subject}
//             </SubjectPill>
//           ))}

//           {user.teachSubjects?.map((subject) => (
//             <SubjectPill key={`teach-${subject}`} color="#ecfdf5" textColor="#065f46">
//               {subject}
//             </SubjectPill>
//           ))}
//         </div>

//         {/* Feature Cards */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
//           <FeatureCard
//             icon="🎓"
//             title="Find Tutors"
//             description="Browse tutors available for your learning subjects."
//             bg="#e0ecff"
//             onClick={() => navigate("/tutors")}
//           />

//           <FeatureCard
//             icon="📝"
//             title="My Requests"
//             description="Track the help requests you’ve sent."
//             bg="#e6f6ff"
//             onClick={() => navigate("/my-requests")}
//           />

//           <FeatureCard
//             icon="🤝"
//             title="Help Requests"
//             description="See students who need help in your subjects."
//             bg="#dcfce7"
//             onClick={() => navigate("/tutor-requests")}
//           />

//           <FeatureCard
//             icon="💬"
//             title="My Chats"
//             description="Continue conversations with tutors and students."
//             bg="#f0fdf4"
//             onClick={() => navigate("/chats")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Components ---------- */

// function FeatureCard({
//   icon,
//   title,
//   description,
//   bg,
//   onClick,
// }: {
//   icon: string;
//   title: string;
//   description: string;
//   bg: string;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: 36,
//         borderRadius: 24,
//         backgroundColor: bg,
//         cursor: "pointer",
//         transition: "transform 0.2s ease, box-shadow 0.2s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px)";
//         e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.18)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       <div style={{ fontSize: 42, marginBottom: 16 }}>{icon}</div>
//       <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8  ,  color: "#525458ff",}}>
//         {title}
//       </h2>
//       <p style={{ fontSize: 15, color: "#374151", margin: 0 }}>
//         {description}
//       </p>
//     </div>
//   );
// }

// function SubjectPill({
//   children,
//   color,
//   textColor,
// }: {
//   children: string;
//   color: string;
//   textColor: string;
// }) {
//   return (
//     <span
//       style={{
//         padding: "8px 16px",
//         borderRadius: 9999,
//         backgroundColor: color,
//         color: textColor,
//         fontWeight: 600,
//         fontSize: 14,
//       }}
//     >
//       {children}
//     </span>
//   );
// }

// /* ---------- Styles ---------- */

// const buttonPrimary = {
//   padding: "10px 18px",
//   backgroundColor: "#f9fafb",
//   color: "#111827",
//   border: "none",
//   borderRadius: 10,
//   cursor: "pointer",
//   fontSize: 15,
//   fontWeight: 600,
//   marginRight: 12,
// };

// const buttonSecondary = {
//   padding: "10px 18px",
//   backgroundColor: "transparent",
//   color: "#ffffff",
//   border: "2px solid rgba(255,255,255,0.6)",
//   borderRadius: 10,
//   cursor: "pointer",
//   fontSize: 15,
//   fontWeight: 600,
// };

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/");
        return;
      }
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/registration");
        return;
      }
      setUser(JSON.parse(storedUser));
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: "#667eea",
        color: 'white',
        fontFamily: 'system-ui'
      }}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dash-wrapper">
      <div className="bg-pattern" />

      <div className="dash-container">
        {/* HEADER: Flex-column on mobile, row on laptop */}
        <header className="dash-header">
          <div className="header-text">
            <h1>Welcome, {user.name}</h1>
            <p>Find tutors. Help students. Chat instantly.</p>
          </div>
          
          <div className="header-actions">
            <button onClick={() => navigate("/edit-subjects")} className="btn-edit">
              Edit Subjects
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Log out
            </button>
          </div>
        </header>

        {/* PILLS: Wrap naturally on all devices */}
        <div className="pills-section">
          {user.learnSubjects?.map((subject: string) => (
            <div key={`l-${subject}`} className="pill learn-pill">📚 {subject}</div>
          ))}
          {user.teachSubjects?.map((subject: string) => (
            <div key={`t-${subject}`} className="pill teach-pill">👨‍🏫 {subject}</div>
          ))}
        </div>

        {/* GRID: Automatically adjusts column count based on width */}
        <div className="feature-grid">
          {[
            { id: 1, icon: "🎓", title: "Find Tutors", desc: "Browse available tutors.", style: "card-blue", path: "/tutors" },
            { id: 2, icon: "📝", title: "My Requests", desc: "Track your sent requests.", style: "card-cyan", path: "/my-requests" },
            { id: 3, icon: "🤝", title: "Help Requests", desc: "Students who need you.", style: "card-green", path: "/tutor-requests" },
            { id: 4, icon: "💬", title: "My Chats", desc: "Continue conversations.", style: "card-emerald", path: "/chats" }
          ].map((card) => (
            <div 
              key={card.id} 
              className={`feature-card ${card.style}`}
              onClick={() => navigate(card.path)}
            >
              <span className="card-icon">{card.icon}</span>
              <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* UNIVERSAL RESET */
        .dash-wrapper {
          min-height: 100vh;
          width: 100%;
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          overflow-x: hidden;
        }

        .dash-wrapper * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        .bg-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.3;
          pointer-events: none;
        }

        .dash-container {
          width: 100%;
          max-width: 1100px;
          position: relative;
          z-index: 2;
        }

        /* RESPONSIVE HEADER */
        .dash-header {
          display: flex;
          flex-direction: column; /* Mobile first */
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (min-width: 768px) {
          .dash-header { flex-direction: row; justify-content: space-between; align-items: flex-end; }
          .dash-wrapper { padding: 80px 40px; }
        }

        .header-text h1 { 
          font-size: clamp(28px, 8vw, 48px); 
          color: white; 
          margin: 0; 
          font-weight: 800;
          line-height: 1.1;
        }
        
        .header-text p { font-size: 18px; color: rgba(255,255,255,0.95); margin: 10px 0 0; }

        .header-actions { display: flex; gap: 12px; }
        
        .btn-edit, .btn-logout {
          flex: 1; /* Stretch on mobile */
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 15px;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .btn-edit, .btn-logout { flex: none; padding: 12px 24px; }
        }

        .btn-edit { background: white; color: #667eea; border: none; }
        .btn-logout { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.4); }
        .btn-edit:hover { background: #f8f9ff; transform: translateY(-2px); }

        /* PILLS */
        .pills-section { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
        .pill {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          background: white;
        }
        .learn-pill { background: #FFD93D; color: #000; }
        .teach-pill { background: #69ff9d; color: #000; }

        /* RESPONSIVE GRID */
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr; /* Stack on mobile */
          gap: 20px;
        }

        @media (min-width: 640px) {
          .feature-grid { grid-template-columns: repeat(2, 1fr); } /* 2 columns on tablets */
        }

        @media (min-width: 1024px) {
          .feature-grid { gap: 30px; } /* More breathing room on laptop */
        }

        .feature-card {
          padding: 30px;
          border-radius: 24px;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          background: rgba(255,255,255,0.98);
          border: 1px solid rgba(255,255,255,0.4);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .card-blue { background: #eef2ff; }
        .card-cyan { background: #e0f2fe; }
        .card-green { background: #f0fdf4; }
        .card-emerald { background: #ecfdf5; }

        .card-icon { font-size: 44px; margin-bottom: 16px; }
        .card-title { font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 8px 0; }
        .card-desc { font-size: 15px; color: #4b5563; margin: 0; line-height: 1.5; }
      `}</style>
    </div>
  );
}