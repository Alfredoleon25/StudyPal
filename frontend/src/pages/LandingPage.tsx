export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
      width:"100vw"
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
          <a href="#features" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16 }}>Features</a>
          <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16 }}>How It Works</a>
          <a href="#about" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 16 }}>About</a>
          <button
            onClick={() => window.location.href = "/registration"}
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

      {/* Hero Section */}
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
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          padding: "10px 25px",
          borderRadius: 30,
          marginBottom: 40,
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
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
            onClick={() => window.location.href = "/registration"}
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
          border: "1px solid rgba(255,255,255,0.2)"
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}