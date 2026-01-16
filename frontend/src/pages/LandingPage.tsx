import { useRef } from 'react';
import { useState } from 'react';
import AuthModal from './Authentication';

export default function LandingPage() {
  // Refs for scrolling
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const aboutRef = useRef(null);
  const [showAuth,setShowAuth] = useState(false)

  const scrollToSection = (ref:any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif", 
      width:"100%",
      overflowX:"hidden"
    }}>
      {/* Hero Section */}
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        paddingBottom:50,
        paddingTop:10
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.3
        }} />
        
        {/* Navigation */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <span style={{ fontSize: 32 }}>📚</span>
            StudyPal
          </div>
          
          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            <a 
              onClick={() => scrollToSection(featuresRef)} 
              style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
            >
              Features
            </a>
            <a 
              onClick={() => scrollToSection(howItWorksRef)} 
              style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
            >
              How It Works
            </a>
            <a 
              onClick={() => scrollToSection(aboutRef)} 
              style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16, cursor: "pointer" }}
            >
              About
            </a>
            <button
              onClick={() => setShowAuth(true)}
              style={{
                padding: "12px 30px",
                backgroundColor: "white",
                color: "#667eea",
                border: "none",
                borderRadius: 25,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          textAlign: "center",
          padding: "0 40px",
          position: "relative",
          zIndex: 10
        }}>
          {/* Badge */}
          <div 
            onClick={() => scrollToSection(aboutRef)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "10px 25px",
              borderRadius: 30,
              marginBottom: 40,
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
            }}
          >
            <span style={{
              backgroundColor: "#FF6B6B",
              color: "white",
              padding: "4px 12px",
              borderRadius: 15,
              fontSize: 12,
              fontWeight: "bold"
            }}>
              New
            </span>
            <span style={{ color: "white", fontSize: 14 }}>
              Peer-to-peer learning platform for students
            </span>
            <span style={{ color: "white", fontSize: 18 }}>→</span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 72,
            fontWeight: "800",
            color: "white",
            margin: "0 0 20px 0",
            lineHeight: 1.2,
            maxWidth: 900,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}>
            Learn from peers,
            <br />
            <span style={{ 
              background: "linear-gradient(to right, #FFD93D, #FF6B6B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative"
            }}>
              teach what you know
              <div style={{
                position: "absolute",
                bottom: -10,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(to right, #FFD93D, #FF6B6B)",
                borderRadius: 2
              }} />
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.9)",
            maxWidth: 600,
            margin: "0 0 50px 0",
            lineHeight: 1.6
          }}>
            Connect with students who need help in subjects you excel at, 
            and find tutors for topics you're learning
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 20 }}>
            <button
              onClick={() => setShowAuth(true)}
              style={{
                padding: "18px 45px",
                backgroundColor: "white",
                color: "#667eea",
                border: "none",
                borderRadius: 30,
                fontSize: 18,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
              }}
            >
              Start Learning
            </button>
            
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              style={{
                padding: "18px 45px",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: 30,
                fontSize: 18,
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: 60,
            marginTop: 80,
            padding: "30px 60px",
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>1000+</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Students</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>500+</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Tutors</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>10K+</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>Sessions</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 100,
          height: 100,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          transform: "rotate(45deg)",
          animation: "float 6s ease-in-out infinite"
        }} />
        
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 80,
          height: 80,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite"
        }} />
      </div>

      {/* Features Section */}
      <div ref={featuresRef} style={{
        padding: "100px 60px",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "#1a1a1a"
          }}>
            Why Choose StudyPal?
          </h2>
          <p style={{
            fontSize: 18,
            color: "#666",
            textAlign: "center",
            marginBottom: 60,
            maxWidth: 600,
            margin: "0 auto 60px"
          }}>
            Everything you need to succeed in your studies, all in one place
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40
          }}>
            {[
              {
                icon: "👥",
                title: "Peer-to-Peer Learning",
                desc: "Connect with students who understand your struggles and can explain concepts in relatable ways"
              },
              {
                icon: "⚡",
                title: "Instant Help",
                desc: "Get help when you need it most. No waiting for office hours or scheduled appointments"
              },
              {
                icon: "💰",
                title: "Free to Start",
                desc: "Join for free and start helping others. Build your reputation while learning together"
              },
              {
                icon: "📱",
                title: "Study Anywhere",
                desc: "Access StudyPal on web and mobile. Get help whether you're at home, library, or on the go"
              },
              {
                icon: "🎯",
                title: "Subject Specific",
                desc: "Match with tutors who excel in exactly what you're struggling with. From Calculus to Physics to Programming"
              },
              {
                icon: "🤝",
                title: "Community Driven",
                desc: "Be part of a supportive community where everyone helps each other succeed"
              }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: 40,
                backgroundColor: "white",
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#1a1a1a" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={howItWorksRef} style={{
        padding: "100px 60px",
        backgroundColor:  "#e7ebeeff"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "#1a1a1a"
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: 18,
            color: "#666",
            textAlign: "center",
            marginBottom: 60,
            maxWidth: 600,
            margin: "0 auto 60px"
          }}>
            Get started in 3 simple steps
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40,
            marginBottom: 60
          }}>
            {[
              {
                step: "1",
                title: "Create Your Profile",
                desc: "Sign up and tell us what subjects you want to learn and what you can teach"
              },
              {
                step: "2",
                title: "Find Your Match",
                desc: "Browse available tutors or wait for learners to find you based on your expertise"
              },
              {
                step: "3",
                title: "Start Learning",
                desc: "Chat in real-time, share resources, and help each other succeed"
              }
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center",
                padding: 40
              }}>
                <div style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#667eea",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "white",
                  margin: "0 auto 24px"
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#1a1a1a" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setShowAuth(true)}
              style={{
                padding: "18px 45px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: 30,
                fontSize: 18,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
              }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} style={{
        padding: "100px 60px",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 30,
            color: "#1a1a1a"
          }}>
            About StudyPal
          </h2>
          <p style={{
            fontSize: 20,
            color: "#666",
            lineHeight: 1.8,
            marginBottom: 30
          }}>
            StudyPal was created by students, for students. We understand the challenges of learning complex subjects and the frustration of not having help when you need it most.
          </p>
          <p style={{
            fontSize: 20,
            color: "#666",
            lineHeight: 1.8,
            marginBottom: 30
          }}>
            Our mission is to create a supportive community where students help each other succeed. Whether you're struggling with Calculus derivatives or debugging your first program, there's someone here who's been through it and can help.
          </p>
          <p style={{
            fontSize: 20,
            color: "#666",
            lineHeight: 1.8,
            marginBottom: 40
          }}>
            We believe that peer-to-peer learning is more effective, more accessible, and more human than traditional tutoring. Join us in building a community where everyone teaches, everyone learns, and everyone succeeds together.
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            padding: "40px",
            backgroundColor: "white",
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>24/7</div>
              <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>Always Available</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>100%</div>
              <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>Student Run</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: "bold", color: "#667eea" }}>Free</div>
              <div style={{ fontSize: 16, color: "#666", marginTop: 8 }}>To Get Started</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div style={{
        padding: "80px 60px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "white",
          marginBottom: 20
        }}>
          Ready to Start Your Learning Journey?
        </h2>
        <p style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.9)",
          marginBottom: 40,
          maxWidth: 600,
          margin: "0 auto 40px"
        }}>
          Join thousands of students already helping each other succeed
        </p>
        <button
          onClick={() => setShowAuth(true)}
          style={{
            padding: "18px 50px",
            backgroundColor: "white",
            color: "#667eea",
            border: "none",
            borderRadius: 30,
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
          }}
        >
          Join StudyPal Today
        </button>

        <div style={{
          marginTop: 60,
          paddingTop: 40,
          borderTop: "1px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.8)",
          fontSize: 14
        }}>
          © 2025 StudyPal. Made with ❤️ by students, for students.
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
         {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}