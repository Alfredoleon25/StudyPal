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
      {/* 1. HERO & NAVBAR */}
      <section className="hero-section">
        <div className="bg-pattern" />

        {/* FLOATING BACKGROUND ELEMENTS */}
        <div className="floating-shape square" />
        <div className="floating-shape circle" />
        
        <nav className="navbar">
          <div className="navbar-container">
            <div className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span>📚</span> StudyPal
            </div>
            <div className="nav-links">
              <button className="nav-item-btn" type="button" onClick={() => scrollToSection(featuresRef)}>
                Features
              </button>
              <button className="nav-item-btn" type="button" onClick={() => scrollToSection(howItWorksRef)}>
                Guide
              </button>
              <button className="nav-item-btn" type="button" onClick={() => scrollToSection(aboutRef)}>
                About
              </button>
              <button type="button" className="nav-cta-pill" onClick={() => setShowAuth(true)}>Get Started</button>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-badge" onClick={() => scrollToSection(aboutRef)}>
            <span className="badge-tag">Launch Edition</span>
            <span>Be a founding member of the community →</span>
          </div>

          <h1 className="main-title">
            Learn from peers,<br />
            <span className="gradient-text">
              teach what you know
              <div className="title-underline" />
            </span>
          </h1>

          <p className="main-subtitle">
            {/* A new space for students to connect, collaborate, and master subjects together. 
            No expensive tutors—just students helping students. */}
   Connect with students who need help in subjects you excel at, 
        and find tutors for topics you're learning.
          </p>

          <div className="cta-container">
            <button className="btn-solid" onClick={() => setShowAuth(true)}>Start Learning</button>
            <button className="btn-outline" onClick={() => scrollToSection(howItWorksRef)}>Learn More</button>
          </div>

          {/* MINIMALIST TRUST ROW */}
          <div className="trust-row">
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <span>Early access launch</span>
            </div>
            <div className="trust-dot">•</div>
            <div className="trust-item">
              <span className="trust-icon">🤝</span>
              <span>Peer-to-peer mentoring</span>
            </div>
            <div className="trust-dot">•</div>
            <div className="trust-item">
              <span className="trust-icon">🎁</span>
              <span>Always free for students</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES */}
      <section ref={featuresRef} className="section features-bg anchor-point">
        <div className="content-container">
          <h2 className="section-title">Why Choose StudyPal?</h2>
          <div className="features-grid">
            {[
              { icon: "👥", title: "Peer-to-Peer", desc: "Connect with students who understand your specific coursework and struggles." },
              { icon: "⚡", title: "On-Demand Help", desc: "Get answers when you need them, not just during scheduled office hours." },
              { icon: "💰", title: "Cost Effective", desc: "Knowledge exchange shouldn't break the bank. Join our student-first economy." },
              { icon: "📱", title: "Study Anywhere", desc: "Optimized for your phone and laptop so you can learn in the library or on the bus." },
              { icon: "🎯", title: "Direct Matches", desc: "Find peers who have already aced the exact classes you're taking now." },
              { icon: "🤝", title: "Safe Community", desc: "A supportive, verified environment where everyone is here to grow together." }
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="card-h3">{f.title}</h3>
                <p className="card-p">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section ref={howItWorksRef} className="section how-bg anchor-point">
        <div className="content-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            {[
              { t: "Set Up Your Profile", d: "Tell the community what subjects you need help with and what you excel in." },
              { t: "Find Your Match", d: "Browse local or global students based on subject expertise and availability." },
              { t: "Collaborate", d: "Chat, share notes, and jump on a call to master the material together." }
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number-circle">{i + 1}</div>
                <h3 className="card-h3">{step.t}</h3>
                <p className="card-p">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT */}
      <section ref={aboutRef} className="section about-bg anchor-point">
        <div className="content-container about-content">
          <h2 className="section-title">Our Mission</h2>
          <p className="about-text">
            StudyPal was built by students who believe the best way to learn something is to explain it to someone else. 
            We're moving away from traditional, expensive tutoring and building a human-centric network of knowledge sharing.
          </p>
          <div className="about-stats-container">
             <div className="about-stat-box"><strong>Active</strong><p className="dark-label">Community</p></div>
             <div className="about-stat-box"><strong>100%</strong><p className="dark-label">Student Run</p></div>
             <div className="about-stat-box"><strong>Free</strong><p className="dark-label">To join</p></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2 className="footer-title">Ready to Start Learning?</h2>
        <p style={{ marginBottom: '30px', opacity: 0.9 }}>Join the next generation of collaborative learners.</p>
        <button className="btn-solid" onClick={() => setShowAuth(true)}>Join StudyPal Today</button>
        <div className="footer-line" />
        <p className="copyright">© 2026 StudyPal. Made for students, by students.</p>
      </footer>

      <style>{`
        button, div, span, h2, section { -webkit-tap-highlight-color: transparent; outline: none !important; }
        .anchor-point { scroll-margin-top: 80px; }
        .app-wrapper { width: 100%; margin: 0; padding: 0; overflow-x: hidden; font-family: system-ui, sans-serif; background: white; }
        .section { width: 100%; padding: 100px 20px; display: flex; justify-content: center; box-sizing: border-box; }
        .content-container { width: 100%; max-width: 1100px; }
        .section-title { font-size: clamp(32px, 5vw, 48px); font-weight: 800; text-align: center; margin-bottom: 60px; color: #1a1a1a; }

        .features-bg { background-color: #f8f9fa; }
        .how-bg { background-color: #ffffff; }
        .about-bg { background-color: #f8f9fa; }

        .hero-section { width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; display: flex; flex-direction: column; align-items: center; padding-bottom: 60px; overflow: hidden; }
        
        /* FLOATING BACKGROUND SHAPES */
        .floating-shape { position: absolute; background: rgba(255, 255, 255, 0.1); z-index: 1; }
        .floating-shape.square { top: 20%; left: 8%; width: 100px; height: 100px; border-radius: 20px; animation: float 6s ease-in-out infinite; }
        .floating-shape.circle { bottom: 15%; right: 10%; width: 80px; height: 80px; border-radius: 50%; animation: float 8s ease-in-out infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }

        .bg-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 40px 40px; opacity: 0.3; }

        /* NAVBAR */
        .navbar { width: 100%; display: flex; justify-content: center; position: relative; z-index: 100; padding: 25px 0; }
        .navbar-container { width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; padding: 0 40px; }
        .logo { font-size: 26px; font-weight: 900; color: white; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .nav-links { display: flex; align-items: center; gap: 15px; }
        .nav-item-btn { background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; padding: 10px 18px; border-radius: 12px; transition: all 0.3s ease; }
        .nav-item-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-2px); }
        .nav-cta-pill { background: white; color: #667eea; padding: 12px 24px; border-radius: 50px; font-weight: 700; border: none; cursor: pointer; margin-left: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

        /* HERO CONTENT */
        .hero-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; z-index: 2; padding: 40px 20px; }
        .main-title { font-size: clamp(36px, 8vw, 72px); font-weight: 800; color: white; line-height: 1.2; margin: 20px 0; }
        .gradient-text { background: linear-gradient(to right, #FFD93D, #FF6B6B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; position: relative; display: inline-block; }
        .title-underline { position: absolute; bottom: -5px; left: 0; right: 0; height: 4px; background: linear-gradient(to right, #FFD93D, #FF6B6B); border-radius: 2px; }
        .main-subtitle { font-size: clamp(16px, 2.5vw, 22px); color: rgba(255,255,255,0.9); max-width: 650px; margin-bottom: 40px; line-height: 1.5; }
        .cta-container { display: flex; gap: 20px; }

        /* TRUST ROW STYLES */
        .trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 50px;
          padding: 12px 30px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          font-weight: 500;
          font-size: 15px;
          z-index: 2;
        }
        .trust-item { display: flex; align-items: center; gap: 8px; opacity: 0.95; }
        .trust-icon { font-size: 18px; }
        .trust-dot { opacity: 0.3; font-size: 20px; }

        /* OTHER SECTION STYLES */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .feature-card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center; border: 1px solid #f0f0f0; transition: transform 0.3s ease; }
        .feature-card:hover { transform: translateY(-5px); }
        .card-h3 { color: #1a1a1a; font-size: 24px; font-weight: 700; margin-bottom: 15px; }
        .card-p { color: #666; line-height: 1.6; }

        .steps-container { display: flex; gap: 30px; }
        .step-card { flex: 1; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .step-number-circle { width: 70px; height: 70px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 28px; font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 25px; }

        .about-text { font-size: 20px; color: #444; line-height: 1.8; text-align: center; max-width: 800px; margin: 0 auto 50px; }
        .about-stats-container { display: flex; gap: 20px; width: 100%; max-width: 800px; margin: 0 auto; }
        .about-stat-box { flex: 1; padding: 40px 20px; background: white; border-radius: 24px; border: 1px solid #eee; text-align: center; }
        .about-stat-box strong { font-size: 30px; color: #667eea; display: block; margin-bottom: 10px; }
        .dark-label { color: #333 !important; font-weight: 600; margin: 0; }

        .footer { padding: 100px 20px; background: linear-gradient(135deg, #667eea, #764ba2); text-align: center; color: white; }
        .footer-line { width: 100%; max-width: 600px; height: 1px; background: rgba(255,255,255,0.2); margin: 50px auto; }

        @media (max-width: 768px) {
          .navbar-container { flex-direction: column; gap: 15px; }
          .nav-cta-pill { display: none; }
          .cta-container { flex-direction: column; width: 100%; padding: 0 20px; }
          .btn-solid, .btn-outline { width: 100%; }
          .trust-row { flex-direction: column; gap: 12px; border-radius: 20px; padding: 20px; width: 90%; }
          .trust-dot { display: none; }
          .steps-container, .about-stats-container { flex-direction: column; }
        }

        .btn-solid { padding: 18px 45px; background: white; color: #667eea; border: none; border-radius: 40px; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .btn-solid:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
        .btn-outline { padding: 18px 45px; background: transparent; color: white; border: 2px solid white; border-radius: 40px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .hero-badge { background: rgba(255,255,255,0.15); padding: 10px 20px; border-radius: 30px; color: white; cursor: pointer; margin-bottom: 20px; font-size: 14px; border: 1px solid rgba(255,255,255,0.2); z-index: 10; position: relative; transition: background 0.3s; }
        .hero-badge:hover { background: rgba(255,255,255,0.25); }
        .badge-tag { background:  #FF6B6B; padding: 2px 8px; border-radius: 6px; margin-right: 10px; font-size: 12px; font-weight: bold; }
      `}</style>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}