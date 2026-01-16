// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Registration() {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleContinue = () => {
//     if (!name.trim()) {
//       setError("Please enter your name");
//       return;
//     }
//     setError("");
//     localStorage.setItem("tempuser", JSON.stringify({ name }));

//     navigate("/subjects");
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "40px 20px",
//       fontFamily: "system-ui, -apple-system, sans-serif",
//       position: "relative",
//       overflow: "hidden",
//       width:"100%",
//     }}>
//       {/* Background Pattern */}
//       <div style={{
//         position: "absolute",
//         inset: 0,
//         backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0)`,
//         backgroundSize: "40px 40px",
//         opacity: 0.3
//       }} />

//       {/* Back to Home Link */}
//       <button
//         onClick={() => navigate('/')}
//         style={{
//           position: "absolute",
//           top: 30,
//           left: 40,
//           backgroundColor: "transparent",
//           color: "white",
//           border: "none",
//           fontSize: 16,
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           padding: "10px 20px",
//           borderRadius: 8,
//           transition: "all 0.3s",
//           zIndex: 10
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.backgroundColor = "transparent";
//         }}
//       >
//         <span style={{ fontSize: 20 }}>←</span> Back to Home
//       </button>

//       {/* Registration Card */}
//       <div style={{
//         width: "100%",
//         maxWidth: 480,
//         padding: 50,
//         backgroundColor: "rgba(255,255,255,0.95)",
//         backdropFilter: "blur(20px)",
//         borderRadius: 24,
//         boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//         border: "1px solid rgba(255,255,255,0.2)",
//         position: "relative",
//         zIndex: 10
//       }}>
//         {/* Icon */}
//         <div style={{
//           width: 80,
//           height: 80,
//           margin: "0 auto 30px",
//           backgroundColor: "#667eea",
//           borderRadius: 20,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 40,
//           boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
//         }}>
//           📚
//         </div>

//         {/* Heading */}
//         <h1 style={{
//           fontSize: 36,
//           marginBottom: 10,
//           fontWeight: 800,
//           textAlign: "center",
//           color: "#1a1a1a",
//           letterSpacing: "-0.5px"
//         }}>
//           Welcome to StudyPal
//         </h1>

//         <p style={{
//           color: "#666",
//           marginBottom: 40,
//           fontSize: 16,
//           lineHeight: 1.6,
//           textAlign: "center"
//         }}>
//           Connect with peers to learn and teach together
//         </p>

//         {/* Input Field */}
//         <div style={{ marginBottom: 30 }}>
//           <label style={{
//             display: "block",
//             marginBottom: 12,
//             fontWeight: 600,
//             fontSize: 15,
//             color: "#333"
//           }}>
//             What's your name?
//           </label>
          
//           <input
//             type="text"
//             placeholder="Enter your full name"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//               setError("");
//             }}
//             onKeyDown={(e) => e.key === "Enter" && handleContinue()}
//             style={{
//               width: "100%",
//               padding: "16px 20px",
//               fontSize: 16,
//               borderRadius: 12,
//               border: error ? "2px solid #e53935" : "2px solid #e0e0e0",
//               outline: "none",
//               backgroundColor: "#fafafa",
//               transition: "all 0.3s",
//               boxSizing: "border-box",
//               color: "#1a1a1a"
//             }}
//             onFocus={(e) => {
//               if (!error) {
//                 e.currentTarget.style.borderColor = "#667eea";
//                 e.currentTarget.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
//               }
//             }}
//             onBlur={(e) => {
//               if (!error) {
//                 e.currentTarget.style.borderColor = "#e0e0e0";
//                 e.currentTarget.style.boxShadow = "none";
//               }
//             }}
//           />
          
//           {error && (
//             <div style={{
//               color: "#e53935",
//               fontSize: 14,
//               marginTop: 8,
//               display: "flex",
//               alignItems: "center",
//               gap: 6
//             }}>
//               <span>⚠️</span> {error}
//             </div>
//           )}
//         </div>

//         {/* Continue Button */}
//         <button
//           onClick={handleContinue}
//           style={{
//             width: "100%",
//             padding: "16px",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "#ffffff",
//             fontSize: 17,
//             fontWeight: 700,
//             borderRadius: 12,
//             border: "none",
//             cursor: "pointer",
//             transition: "all 0.3s",
//             boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
//             letterSpacing: "0.5px"
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-2px)";
//             e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
//           }}
//         >
//           Continue to Subject Selection
//         </button>

//         {/* Info Text */}
//         <p style={{
//           marginTop: 30,
//           fontSize: 13,
//           color: "#999",
//           textAlign: "center",
//           lineHeight: 1.5
//         }}>
//           By continuing, you'll be able to select subjects you want to learn or teach
//         </p>
//       </div>

//       {/* Floating Decoration */}
//       <div style={{
//         position: "absolute",
//         top: "15%",
//         left: "15%",
//         width: 100,
//         height: 100,
//         background: "rgba(255,255,255,0.1)",
//         borderRadius: 20,
//         transform: "rotate(45deg)",
//         animation: "float 6s ease-in-out infinite",
//         zIndex: 1
//       }} />
      
//       <div style={{
//         position: "absolute",
//         bottom: "20%",
//         right: "20%",
//         width: 80,
//         height: 80,
//         background: "rgba(255,255,255,0.1)",
//         borderRadius: "50%",
//         animation: "float 8s ease-in-out infinite",
//         zIndex: 1
//       }} />

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-20px) rotate(45deg); }
//         }
//       `}</style>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Auto-focus for a "Nice" UX
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    setError("");
    localStorage.setItem("tempuser", JSON.stringify({ name: name.trim() }));
    navigate("/subjects");
  };

  return (
    <div className="reg-wrapper">
      {/* Background Pattern - Consistent with your Landing Page */}
      <div className="reg-bg-pattern" />

      {/* Back to Home Link */}
      <button className="back-btn" onClick={() => navigate('/')}>
        <span>←</span> Back to Home
      </button>

      {/* Registration Card */}
      <div className="reg-card">
        <div className="reg-icon">📚</div>

        <h1 className="reg-title">Welcome to StudyPal</h1>
        <p className="reg-subtitle">Connect with peers to learn and teach together</p>

        <div className="input-group">
          <label className="input-label">What's your name?</label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your full name"
            className={`reg-input ${error ? 'input-error' : ''}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          />
          {error && <div className="error-msg"><span>⚠️</span> {error}</div>}
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue to Subjects
        </button>

        <p className="reg-footer-info">
          By continuing, you'll be able to select subjects you want to learn or teach
        </p>
      </div>

      <style>{`
        /* --- BROWSER COMPATIBILITY FIXES --- */
        .reg-wrapper {
          min-height: 100vh;
          /* Support for older browsers */
          background: #667eea;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .reg-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.3;
          pointer-events: none;
        }

        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          background: transparent;
          color: white;
          border: none;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          border-radius: 8px;
          transition: 0.3s;
          z-index: 20;
          -webkit-tap-highlight-color: transparent;
        }
        .back-btn:hover { background: rgba(255,255,255,0.1); }

        .reg-card {
          width: 100%;
          max-width: 450px;
          padding: 40px;
          background: rgba(255,255,255,0.98);
          /* Safari/Firefox Blur Support */
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          position: relative;
          z-index: 10;
          text-align: center;
          box-sizing: border-box;
        }

        .reg-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          background: #667eea;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 35px;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .reg-title { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; }
        .reg-subtitle { color: #666; font-size: 15px; margin-bottom: 30px; }

        .input-group { text-align: left; margin-bottom: 25px; }
        .input-label { display: block; margin-bottom: 8px; font-weight: 600; color: #444; font-size: 14px; }
        
        .reg-input {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          border-radius: 12px;
          border: 2px solid #eee;
          background: #fdfdfd;
          outline: none;
          transition: 0.2s;
          box-sizing: border-box;
          /* Fix for iOS Safari appearance */
          -webkit-appearance: none;
        }
        .reg-input:focus { border-color: #667eea; box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1); }
        .input-error { border-color: #ff4d4d; }

        .continue-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(102,126,234,0.3);
        }
        .continue-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(102,126,234,0.4); }

        .error-msg { color: #ff4d4d; font-size: 13px; margin-top: 8px; display: flex; align-items: center; gap: 5px; }
        .reg-footer-info { margin-top: 25px; font-size: 12px; color: #999; line-height: 1.5; }

        @media (max-width: 480px) {
          .reg-card { padding: 30px 20px; }
          .reg-title { font-size: 24px; }
        }
      `}</style>
    </div>
  );
}