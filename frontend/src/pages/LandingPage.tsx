// import { useRef } from 'react';
// import { useState } from 'react';
// import AuthModal from './Authentication';

// export default function LandingPage() {
//   // Refs for scrolling
//   const featuresRef = useRef(null);
//   const howItWorksRef = useRef(null);
//   const aboutRef = useRef(null);
//   const [showAuth,setShowAuth] = useState(false)

//   const scrollToSection = (ref:any) => {
//     ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <div style={{
//       fontFamily: "system-ui, -apple-system, sans-serif", 
//       width:"100%",
//     }}>
//       {/* Hero Section */}
//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         position: "relative",
//         overflow: "hidden",
//         paddingBottom:50,
//         paddingTop:10
//       }}>
//         {/* Background Pattern */}
//         <div style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0)`,
//           backgroundSize: "40px 40px",
//           opacity: 0.3
//         }} />
        
//         {/* Navigation */}
//         <nav style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "20px 60px",
//           position: "relative",
//           zIndex: 10
//         }}>
//           <div style={{
//             fontSize: 28,
//             fontWeight: "bold",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             gap: 10
//           }}>
//             <span style={{ fontSize: 32 }}>📚</span>
//             StudyPal
//           </div>
          
//           <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
//             <a 
//               onClick={() => scrollToSection(featuresRef)} 
//               style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
//             >
//               Features
//             </a>
//             <a 
//               onClick={() => scrollToSection(howItWorksRef)} 
//               style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
//             >
//               How It Works
//             </a>
//             <a 
//               onClick={() => scrollToSection(aboutRef)} 
//               style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
//             >
//               About
//             </a>
//             <button
//               onClick={() => setShowAuth(true)}
//               style={{
//                 padding: "12px 30px",
//                 backgroundColor: "white",
//                 color: "#667eea",
//                 border: "none",
//                 borderRadius: 25,
//                 fontSize: 16,
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//                 transition: "all 0.3s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
//               }}
//             >
//               Get Started
//             </button>
//           </div>
//         </nav>

//         {/* Hero Content */}
//         <div style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "calc(100vh - 80px)",
//           textAlign: "center",
//           padding: "0 40px",
//           position: "relative",
//           zIndex: 10
//         }}>
//           {/* Badge */}
//           <div 
//             onClick={() => scrollToSection(aboutRef)}
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 10,
//               backgroundColor: "rgba(255,255,255,0.15)",
//               backdropFilter: "blur(10px)",
//               padding: "10px 25px",
//               borderRadius: 30,
//               marginBottom: 40,
//               border: "1px solid rgba(255,255,255,0.2)",
//               cursor: "pointer",
//               transition: "all 0.3s"
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
//             }}
//           >
//             <span style={{
//               backgroundColor: "#FF6B6B",
//               color: "white",
//               padding: "4px 12px",
//               borderRadius: 15,
//               fontSize: 12,
//               fontWeight: "bold"
//             }}>
//               New
//             </span>
//             <span style={{ color: "white", fontSize: 14 }}>
//               Peer-to-peer learning platform for students
//             </span>
//             <span style={{ color: "white", fontSize: 18 }}>→</span>
//           </div>

//           {/* Main Heading */}
//           <h1 style={{
//             fontSize: 72,
//             fontWeight: "800",
//             color: "white",
//             margin: "0 0 20px 0",
//             lineHeight: 1.2,
//             maxWidth: 900,
//             textShadow: "0 2px 10px rgba(0,0,0,0.2)"
//           }}>
//             Learn from peers,
//             <br />
//             <span style={{ 
//               background: "linear-gradient(to right, #FFD93D, #FF6B6B)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               position: "relative"
//             }}>
//               teach what you know
//               <div style={{
//                 position: "absolute",
//                 bottom: -10,
//                 left: 0,
//                 right: 0,
//                 height: 4,
//                 background: "linear-gradient(to right, #FFD93D, #FF6B6B)",
//                 borderRadius: 2
//               }} />
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p style={{
//             fontSize: 22,
//             color: "rgba(255,255,255,0.9)",
//             maxWidth: 600,
//             margin: "0 0 50px 0",
//             lineHeight: 1.6
//           }}>
//             Connect with students who need help in subjects you excel at, 
//             and find tutors for topics you're learning
//           </p>

//           {/* CTA Buttons */}
//           <div style={{ display: "flex", gap: 20 }}>
//             <button
//               onClick={() => setShowAuth(true)}
//               style={{
//                 padding: "18px 45px",
//                 backgroundColor: "white",
//                 color: "#667eea",
//                 border: "none",
//                 borderRadius: 30,
//                 fontSize: 18,
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//                 transition: "all 0.3s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-3px)";
//                 e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
//               }}
//             >
//               Start Learning
//             </button>
            
//             <button
//               onClick={() => scrollToSection(howItWorksRef)}
//               style={{
//                 padding: "18px 45px",
//                 backgroundColor: "transparent",
//                 color: "white",
//                 border: "2px solid white",
//                 borderRadius: 30,
//                 fontSize: 18,
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 transition: "all 0.3s",
//                 backdropFilter: "blur(10px)"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
//                 e.currentTarget.style.transform = "translateY(-3px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.transform = "translateY(0)";
//               }}
//             >
//               Learn More
//             </button>
//           </div>

//           {/* Stats */}
//           <div style={{
//             display: "flex",
//             gap: 60,
//             marginTop: 80,
//             padding: "30px 60px",
//             backgroundColor: "rgba(255,255,255,0.1)",
//             backdropFilter: "blur(20px)",
//             borderRadius: 20,
//             border: "1px solid rgba(255,255,255,0.2)",
//           }}>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>1000+</div>
//               <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Students</div>
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>500+</div>
//               <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Tutors</div>
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>10K+</div>
//               <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Sessions</div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <div style={{
//           position: "absolute",
//           top: "20%",
//           left: "10%",
//           width: 100,
//           height: 100,
//           background: "rgba(255,255,255,0.1)",
//           borderRadius: 20,
//           transform: "rotate(45deg)",
//           animation: "float 6s ease-in-out infinite"
//         }} />
        
//         <div style={{
//           position: "absolute",
//           bottom: "20%",
//           right: "15%",
//           width: 80,
//           height: 80,
//           background: "rgba(255,255,255,0.1)",
//           borderRadius: "50%",
//           animation: "float 8s ease-in-out infinite"
//         }} />
//       </div>

//       {/* Features Section */}
//       <div ref={featuresRef} style={{
//         padding: "100px 60px",
//         backgroundColor: "#f8f9fa"
//       }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <h2 style={{
//             fontSize: 48,
//             fontWeight: "bold",
//             textAlign: "center",
//             marginBottom: 20,
//             color: "#1a1a1a"
//           }}>
//             Why Choose StudyPal?
//           </h2>
//           <p style={{
//             fontSize: 18,
//             color: "#666",
//             textAlign: "center",
//             marginBottom: 60,
//             maxWidth: 600,
//             margin: "0 auto 60px"
//           }}>
//             Everything you need to succeed in your studies, all in one place
//           </p>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: 40
//           }}>
//             {[
//               {
//                 icon: "👥",
//                 title: "Peer-to-Peer Learning",
//                 desc: "Connect with students who understand your struggles and can explain concepts in relatable ways"
//               },
//               {
//                 icon: "⚡",
//                 title: "Instant Help",
//                 desc: "Get help when you need it most. No waiting for office hours or scheduled appointments"
//               },
//               {
//                 icon: "💰",
//                 title: "Free to Start",
//                 desc: "Join for free and start helping others. Build your reputation while learning together"
//               },
//               {
//                 icon: "📱",
//                 title: "Study Anywhere",
//                 desc: "Access StudyPal on web and mobile. Get help whether you're at home, library, or on the go"
//               },
//               {
//                 icon: "🎯",
//                 title: "Subject Specific",
//                 desc: "Match with tutors who excel in exactly what you're struggling with. From Calculus to Physics to Programming"
//               },
//               {
//                 icon: "🤝",
//                 title: "Community Driven",
//                 desc: "Be part of a supportive community where everyone helps each other succeed"
//               }
//             ].map((feature, i) => (
//               <div key={i} style={{
//                 padding: 40,
//                 backgroundColor: "white",
//                 borderRadius: 16,
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                 transition: "all 0.3s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-8px)";
//                 e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
//               }}>
//                 <div style={{ fontSize: 48, marginBottom: 20 }}>{feature.icon}</div>
//                 <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#1a1a1a" }}>
//                   {feature.title}
//                 </h3>
//                 <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
//                   {feature.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div ref={howItWorksRef} style={{
//         padding: "100px 60px",
//         backgroundColor:  "#e7ebeeff"
//       }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <h2 style={{
//             fontSize: 48,
//             fontWeight: "bold",
//             textAlign: "center",
//             marginBottom: 20,
//             color: "#1a1a1a"
//           }}>
//             How It Works
//           </h2>
//           <p style={{
//             fontSize: 18,
//             color: "#666",
//             textAlign: "center",
//             marginBottom: 60,
//             maxWidth: 600,
//             margin: "0 auto 60px"
//           }}>
//             Get started in 3 simple steps
//           </p>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: 40,
//             marginBottom: 60
//           }}>
//             {[
//               {
//                 step: "1",
//                 title: "Create Your Profile",
//                 desc: "Sign up and tell us what subjects you want to learn and what you can teach"
//               },
//               {
//                 step: "2",
//                 title: "Find Your Match",
//                 desc: "Browse available tutors or wait for learners to find you based on your expertise"
//               },
//               {
//                 step: "3",
//                 title: "Start Learning",
//                 desc: "Chat in real-time, share resources, and help each other succeed"
//               }
//             ].map((item, i) => (
//               <div key={i} style={{
//                 textAlign: "center",
//                 padding: 40
//               }}>
//                 <div style={{
//                   width: 80,
//                   height: 80,
//                   backgroundColor: "#667eea",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 36,
//                   fontWeight: "bold",
//                   color: "white",
//                   margin: "0 auto 24px"
//                 }}>
//                   {item.step}
//                 </div>
//                 <h3 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#1a1a1a" }}>
//                   {item.title}
//                 </h3>
//                 <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div style={{ textAlign: "center" }}>
//             <button
//               onClick={() => setShowAuth(true)}
//               style={{
//                 padding: "18px 45px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 30,
//                 fontSize: 18,
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
//                 transition: "all 0.3s"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-3px)";
//                 e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
//               }}
//             >
//               Get Started Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* About Section */}
//       <div ref={aboutRef} style={{
//         padding: "100px 60px",
//         backgroundColor: "#f8f9fa"
//       }}>
//         <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
//           <h2 style={{
//             fontSize: 48,
//             fontWeight: "bold",
//             marginBottom: 30,
//             color: "#1a1a1a"
//           }}>
//             About StudyPal
//           </h2>
//           <p style={{
//             fontSize: 20,
//             color: "#666",
//             lineHeight: 1.8,
//             marginBottom: 30
//           }}>
//             StudyPal was created by students, for students. We understand the challenges of learning complex subjects and the frustration of not having help when you need it most.
//           </p>
//           <p style={{
//             fontSize: 20,
//             color: "#666",
//             lineHeight: 1.8,
//             marginBottom: 30
//           }}>
//             Our mission is to create a supportive community where students help each other succeed. Whether you're struggling with Calculus derivatives or debugging your first program, there's someone here who's been through it and can help.
//           </p>
//           <p style={{
//             fontSize: 20,
//             color: "#666",
//             lineHeight: 1.8,
//             marginBottom: 40
//           }}>
//             We believe that peer-to-peer learning is more effective, more accessible, and more human than traditional tutoring. Join us in building a community where everyone teaches, everyone learns, and everyone succeeds together.
//           </p>

//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 60,
//             padding: "40px",
//             backgroundColor: "white",
//             borderRadius: 20,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
//           }}>
//             <div>
//               <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>24/7</div>
//               <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>Always Available</div>
//             </div>
//             <div>
//               <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>100%</div>
//               <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>Student Run</div>
//             </div>
//             <div>
//               <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>Free</div>
//               <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>To Get Started</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer / CTA */}
//       <div style={{
//         padding: "80px 60px",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         textAlign: "center"
//       }}>
//         <h2 style={{
//           fontSize: 42,
//           fontWeight: "bold",
//           color: "white",
//           marginBottom: 20
//         }}>
//           Ready to Start Your Learning Journey?
//         </h2>
//         <p style={{
//           fontSize: 20,
//           color: "rgba(255,255,255,0.9)",
//           marginBottom: 40,
//           maxWidth: 600,
//           margin: "0 auto 40px"
//         }}>
//           Join thousands of students already helping each other succeed
//         </p>
//         <button
//           onClick={() => setShowAuth(true)}
//           style={{
//             padding: "18px 50px",
//             backgroundColor: "white",
//             color: "#667eea",
//             border: "none",
//             borderRadius: 30,
//             fontSize: 20,
//             fontWeight: "bold",
//             cursor: "pointer",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//             transition: "all 0.3s"
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-3px)";
//             e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
//           }}
//         >
//           Join StudyPal Today
//         </button>

//         <div style={{
//           marginTop: 60,
//           paddingTop: 40,
//           borderTop: "1px solid rgba(255,255,255,0.2)",
//           color: "rgba(255,255,255,0.8)",
//           fontSize: 14
//         }}>
//           © 2025 StudyPal. Made with ❤️ by students, for students.
//         </div>
//       </div>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-20px) rotate(45deg); }
//         }
//       `}</style>
//          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
//     </div>
//   );
// }




import { useRef, useState } from 'react';
import AuthModal from './Authentication';

export default function LandingPage() {
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const aboutRef = useRef(null);
  const [showAuth, setShowAuth] = useState(false);

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-wrapper">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="bg-pattern" />
        
        {/* <nav className="navbar">
          <div className="logo"><span>📚</span> StudyPal</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection(featuresRef)}>Features</button>
            <button onClick={() => scrollToSection(howItWorksRef)}>How It Works</button>
            <button onClick={() => scrollToSection(aboutRef)}>About</button>
            <button className="nav-cta" onClick={() => setShowAuth(true)}>Get Started</button>
          </div>
        </nav> */}
     
<nav className="navbar">
  <div className="navbar-container">
    <div className="logo">
      <span>📚</span> StudyPal
    </div>
    
    <div className="nav-links">
      <button onClick={() => scrollToSection(featuresRef)}>Features</button>
      <button onClick={() => scrollToSection(howItWorksRef)}>How It Works</button>
      <button onClick={() => scrollToSection(aboutRef)}>About</button>
      <button className="nav-cta-pill" onClick={() => setShowAuth(true)}>Get Started</button>
    </div>
  </div>
</nav>

<style>{`
  .navbar {
    width: 100%;
    display: flex;
    justify-content: center; /* Centers the inner container */
    position: relative;
    z-index: 100;
    padding: 20px 0;
  }

  .navbar-container {
    width: 100%;
    max-width: 1200px; /* Laptop "Center Lane" */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
  }

  .logo {
    font-size: 24px;
    font-weight: 800;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .nav-links button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    padding: 5px 0;
  }

  .nav-links button:hover {
    color: white;
  }

  .nav-cta-pill {
    background: white !important;
    color: #667eea !important;
    padding: 10px 25px !important;
    border-radius: 50px !important;
    font-weight: 700 !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    margin-left: 10px;
  }

  /* 📱 MOBILE NAVBAR FIX */
  @media (max-width: 768px) {
    .navbar {
      padding: 15px 0;
    }

    .navbar-container {
      flex-direction: column; /* Stack logo above links */
      gap: 15px;
      padding: 0 20px;
    }

    .nav-links {
      gap: 15px;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap; /* Prevents links from going off-screen */
    }

    .nav-links button {
      font-size: 14px;
    }

    .nav-cta-pill {
      display: none; /* Hide the heavy button on mobile to save space */
    }
  }
`}</style>

        <div className="hero-content">
          <div className="hero-badge" onClick={() => scrollToSection(aboutRef)}>
            <span className="badge-tag">New</span>
            <span>Peer-to-peer learning for students →</span>
          </div>

          <h1 className="main-title">
            Learn from peers,<br />
            <span className="gradient-text">teach what you know</span>
          </h1>

          <p className="main-subtitle">
            Connect with students who need help in subjects you excel at, 
            and find tutors for topics you're learning.
          </p>

          <div className="cta-container">
            <button className="btn-solid" onClick={() => setShowAuth(true)}>Start Learning</button>
            <button className="btn-outline" onClick={() => scrollToSection(howItWorksRef)}>Learn More</button>
          </div>

          {/* FIXED STATS BAR */}
          <div className="stats-bar">
            <div className="stat-item"><span className="stat-num">1000+</span><span className="stat-label">Students</span></div>
            <div className="stat-item"><span className="stat-num">500+</span><span className="stat-label">Tutors</span></div>
            <div className="stat-item"><span className="stat-num">10K+</span><span className="stat-label">Sessions</span></div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION (Fixed Contrast) */}
      <section ref={featuresRef} className="section features-bg">
        <div className="content-container">
          <h2 className="section-title">Why Choose StudyPal?</h2>
          <div className="features-grid">
            {[
              { icon: "👥", title: "Peer-to-Peer", desc: "Connect with students who understand your struggles." },
              { icon: "⚡", title: "Instant Help", desc: "No waiting for office hours. Connect and learn immediately." },
              { icon: "💰", title: "Free to Start", desc: "Build your reputation by helping others succeed." },
              { icon: "📱", title: "Study Anywhere", desc: "Access on web and mobile easily while on the go." },
              { icon: "🎯", title: "Subject Specific", desc: "Match with tutors who excel in exactly what you need." },
              { icon: "🤝", title: "Community", desc: "A supportive environment where everyone succeeds." }
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section ref={aboutRef} className="section about-bg">
        <div className="content-container about-content">
          <h2 className="section-title">About StudyPal</h2>
          <p className="about-text">
            StudyPal was created by students, for students. We believe that peer-to-peer learning is 
            more effective, accessible, and human than traditional tutoring.
          </p>
          <div className="about-stats-container">
             <div className="about-stat-box"><strong>24/7</strong><p>Available</p></div>
             <div className="about-stat-box"><strong>100%</strong><p>Student Run</p></div>
             <div className="about-stat-box"><strong>Free</strong><p>To Join</p></div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="footer">
        <h2 className="footer-title">Ready to Start Learning?</h2>
        <button className="btn-solid" onClick={() => setShowAuth(true)}>Join StudyPal Today</button>
        <div className="footer-line" />
        <p>© 2026 StudyPal. Made with ❤️ by students, for students.</p>
      </footer>

      <style>{`
        /* --- GLOBAL --- */
        .app-wrapper { width: 100%; margin: 0; padding: 0; overflow-x: hidden; font-family: system-ui, sans-serif; box-sizing: border-box; }
        
        /* --- HERO --- */
        .hero-section { width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; display: flex; flex-direction: column; align-items: center; padding-bottom: 60px; }
        .bg-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 40px 40px; opacity: 0.3; }
        .navbar { width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; z-index: 10; color: white; box-sizing: border-box; }
        .nav-links { display: flex; gap: 30px; align-items: center; }
        .nav-links button { background: none; border: none; color: white; cursor: pointer; font-size: 16px; font-weight: 500; }
        .hero-content { width: 100%; max-width: 900px; padding: 60px 20px; text-align: center; z-index: 10; display: flex; flex-direction: column; align-items: center; box-sizing: border-box; }
        .main-title { font-size: 72px; font-weight: 800; color: white; line-height: 1.1; margin-bottom: 20px; }
        .gradient-text { background: linear-gradient(to right, #FFD93D, #FF6B6B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .main-subtitle { font-size: 22px; color: rgba(255,255,255,0.9); margin-bottom: 40px; max-width: 600px; line-height: 1.6; }
        .cta-container { display: flex; gap: 20px; }

        /* --- STATS BAR FIX --- */
        .stats-bar {
          display: flex; gap: 60px; margin-top: 80px;
          background: rgba(255,255,255,0.15); padding: 30px 60px;
          border-radius: 24px; backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);
          justify-content: center;
        }
        .stat-item { text-align: center; min-width: 100px; }
        .stat-num { display: block; font-size: 36px; font-weight: bold; color: white; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; }

        /* --- SECTIONS --- */
        .section { width: 100%; padding: 100px 20px; display: flex; justify-content: center; box-sizing: border-box; }
        .features-bg { background: #f0f2f5; } /* DARKER BACKGROUND TO SHOW WHITE CARDS */
        .content-container { width: 100%; max-width: 1100px; }
        .section-title { font-size: 48px; font-weight: bold; text-align: center; margin-bottom: 60px; color: #1a1a1a; }
        
        /* --- FEATURE CARDS --- */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .feature-card { 
          background: #ffffff; /* CLEAR WHITE */
          padding: 40px; 
          border-radius: 20px; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.06); /* VISIBLE SHADOW */
          text-align: center; 
          transition: transform 0.3s ease, box-shadow 0.3s ease; 
        }
        .feature-card:hover { transform: translateY(-10px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .feature-icon { font-size: 48px; margin-bottom: 20px; }
        .feature-title { font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #333; }
        .feature-desc { color: #666; line-height: 1.6; }

        /* --- ABOUT --- */
        .about-bg { background: #ffffff; }
        .about-content { text-align: center; max-width: 800px; }
        .about-text { font-size: 20px; color: #555; line-height: 1.8; margin-bottom: 40px; }
        .about-stats-container { display: flex; justify-content: center; gap: 40px; }
        .about-stat-box { 
          padding: 30px; background: #f8f9fa; border-radius: 20px; flex: 1; 
          border: 1px solid #eee;
        }
        .about-stat-box strong { font-size: 32px; color: #667eea; display: block; }

        /* --- FOOTER --- */
        .footer { padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; color: white; }
        .footer-line { width: 100%; max-width: 600px; height: 1px; background: rgba(255,255,255,0.2); margin: 40px auto; }

        /* --- MOBILE RESPONSIVE ENGINE --- */
        @media (max-width: 768px) {
          .navbar { flex-direction: column; padding: 20px; gap: 15px; }
          .nav-cta { display: none; }
          .main-title { font-size: 38px !important; }
          .cta-container { flex-direction: column; width: 100%; padding: 0 20px; }
          .btn-solid, .btn-outline { width: 100%; text-align: center; }
          
          /* STATS FIX FOR PHONE */
          .stats-bar { 
            flex-direction: column; 
            gap: 25px; 
            width: 85%; 
            padding: 30px; 
            margin-top: 50px;
          }
          
          .about-stats-container { flex-direction: column; }
          .section-title { font-size: 32px; }
        }

        /* --- REUSABLE BUTTONS --- */
        .btn-solid { padding: 18px 45px; background: white; color: #667eea; border: none; border-radius: 35px; font-weight: bold; font-size: 18px; cursor: pointer; border: 2px solid white; transition: 0.3s; }
        .btn-solid:hover { background: #f0f0f0; transform: scale(1.05); }
        .btn-outline { padding: 18px 45px; background: transparent; color: white; border: 2px solid white; border-radius: 35px; font-weight: bold; font-size: 18px; cursor: pointer; transition: 0.3s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); }
      `}</style>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}