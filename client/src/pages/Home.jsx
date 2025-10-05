import React from "react";
import { Bot, Zap, Shield, BarChart3, BookOpen, Bell } from "lucide-react";

export default function LandingPage() {
  const [visibleCards, setVisibleCards] = React.useState([]);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    // Wait for DOM to be ready
    setTimeout(() => {
      const cards = document.querySelectorAll('.animate-on-scroll');
      cards.forEach((card) => observer.observe(card));
    }, 100);

    return () => {
      const cards = document.querySelectorAll('.animate-on-scroll');
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const features = [
    {
      icon: Bot,
      title: "AI Chatbot Assistant",
      desc: "Resolve common issues instantly with our intelligent chatbot. Password resets, VPN access, and more without human intervention.",
    },
    {
      icon: Zap,
      title: "Unified Ingestion",
      desc: "Consolidate tickets from GLPI, Solman, email, and other sources into one centralized system for seamless management.",
    },
    {
      icon: Shield,
      title: "Intelligent Routing",
      desc: "AI analyzes context, urgency, and historical patterns to automatically assign tickets to the right team instantly.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      desc: "Track ticket trends, resolution times, and team performance with comprehensive dashboards and reports.",
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      desc: "Access relevant articles instantly. AI suggests solutions and identifies gaps to create new knowledge base entries.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      desc: "Configure email and SMS alerts for specific events. Stay informed about ticket status changes and updates.",
    },
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    backgroundGradient: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, #030712, #000000, #030712)',
      pointerEvents: 'none',
    },
    floatingOrb1: {
      position: 'absolute',
      top: '5rem',
      left: '25%',
      width: '24rem',
      height: '24rem',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      animation: 'floatingGlow 4s ease-in-out infinite',
    },
    floatingOrb2: {
      position: 'absolute',
      bottom: 0,
      right: '25%',
      width: '24rem',
      height: '24rem',
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      animation: 'floatingGlow 4s ease-in-out infinite',
      animationDelay: '2s',
    },
    floatingOrb3: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '24rem',
      height: '24rem',
      backgroundColor: 'rgba(20, 184, 166, 0.05)',
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      animation: 'floatingGlow 4s ease-in-out infinite',
      animationDelay: '1s',
    },
    backgroundLines: {
      position: 'absolute',
      inset: 0,
      opacity: 0.1,
      pointerEvents: 'none',
      mixBlendMode: 'screen',
    },
    gridBackground: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
      opacity: 0.1,
      pointerEvents: 'none',
      animation: 'gridPulse 3s ease-in-out infinite',
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    },
    headerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    logoIcon: {
      width: '2.5rem',
      height: '2.5rem',
      background: 'linear-gradient(to bottom right, #34d399, #10b981, #14b8a6)',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
      position: 'relative',
      overflow: 'hidden',
    },
    logoIconOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      background: 'linear-gradient(to right, #ffffff, #d1d5db)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    loginLink: {
      color: '#d1d5db',
      fontWeight: 500,
      textDecoration: 'none',
      transition: 'color 0.3s',
      cursor: 'pointer',
    },
    getStartedBtn: {
      padding: '0.625rem 1.5rem',
      background: 'linear-gradient(to right, #34d399, #10b981)',
      color: '#000000',
      fontWeight: 600,
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block',
    },
    heroSection: {
      position: 'relative',
      zIndex: 10,
      paddingTop: '5rem',
      paddingBottom: '8rem',
      padding: '5rem 1.5rem 8rem',
    },
    heroContainer: {
      maxWidth: '56rem',
      margin: '0 auto',
      textAlign: 'center',
    },
    electricContainer: {
      position: 'relative',
      width: '100%',
      height: '16rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    },
    lockIconLeft: {
      position: 'absolute',
      left: '10%',
      top: '30%',
      width: '2.5rem',
      height: '2.5rem',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      backdropFilter: 'blur(8px)',
    },
    lockIconRight: {
      position: 'absolute',
      right: '10%',
      top: '30%',
      width: '2.5rem',
      height: '2.5rem',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      backdropFilter: 'blur(8px)',
    },
    botIconContainer: {
      position: 'relative',
      width: '10rem',
      height: '10rem',
      backgroundColor: '#0a0f14',
      borderRadius: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid rgba(16, 185, 129, 0.5)',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.1)',
      backdropFilter: 'none',
      overflow: 'hidden',
    },
    gridPatternOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.4) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(16, 185, 129, 0.4) 0.5px, transparent 0.5px)',
      backgroundSize: '8px 8px',
      borderRadius: '1.25rem',
    },
    botIconGlow: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)',
      borderRadius: '1.25rem',
      opacity: 0.8,
      filter: 'blur(15px)',
      zIndex: -1,
      animation: 'pulse 2s ease-in-out infinite',
    },
    botIconBorder: {
      position: 'absolute',
      inset: 0,
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '1.25rem',
    },
    connectionPoint: {
      position: 'absolute',
      width: '0.625rem',
      height: '0.625rem',
      backgroundColor: '#34d399',
      borderRadius: '50%',
      boxShadow: '0 0 20px rgba(52, 211, 153, 0.8)',
      animation: 'pulse 2s ease-in-out infinite',
    },
    connectionPointTop: {
      top: '-0.25rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    connectionPointBottomLeft: {
      bottom: '-0.25rem',
      left: '-0.25rem',
      animationDelay: '0.5s',
    },
    connectionPointBottomRight: {
      bottom: '-0.25rem',
      right: '-0.25rem',
      animationDelay: '0.8s',
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
      background: 'linear-gradient(to right, #f3f4f6, #ffffff, #d1d5db)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#9ca3af',
      marginBottom: '2.5rem',
      lineHeight: 1.6,
      maxWidth: '48rem',
      margin: '0 auto 2.5rem',
      fontWeight: 300,
    },
    ctaButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
    },
    primaryBtn: {
      padding: '1rem 2rem',
      background: 'linear-gradient(to right, #34d399, #10b981)',
      color: '#000000',
      fontWeight: 600,
      fontSize: '1.125rem',
      borderRadius: '0.75rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block',
    },
    secondaryBtn: {
      padding: '1rem 2rem',
      border: '1px solid rgba(16, 185, 129, 0.4)',
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      backdropFilter: 'blur(8px)',
      color: '#34d399',
      fontWeight: 600,
      fontSize: '1.125rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block',
    },
    trustText: {
      fontSize: '0.875rem',
      color: '#6b7280',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    featuresSection: {
      position: 'relative',
      zIndex: 10,
      padding: '5rem 1.5rem',
    },
    featuresContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
    },
    featureCard: {
      position: 'relative',
      background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), rgba(3, 7, 18, 0.3))',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      borderRadius: '1rem',
      padding: '2rem',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.5s',
      cursor: 'pointer',
    },
    featureTopBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(to right, transparent, #34d399, transparent)',
      opacity: 0,
      transition: 'opacity 0.5s',
      borderRadius: '1rem 1rem 0 0',
    },
    featureInnerGlow: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.05))',
      borderRadius: '1rem',
      opacity: 0,
      transition: 'opacity 0.5s',
      pointerEvents: 'none',
    },
    featureHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1rem',
      position: 'relative',
      zIndex: 10,
    },
    featureIcon: {
      width: '3.5rem',
      height: '3.5rem',
      background: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.02))',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.3s',
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '0.5rem',
      color: '#f3f4f6',
    },
    featureDesc: {
      color: '#9ca3af',
      lineHeight: 1.6,
      position: 'relative',
      zIndex: 10,
    },
    ctaSection: {
      position: 'relative',
      zIndex: 10,
      padding: '6rem 1.5rem',
    },
    ctaContainer: {
      maxWidth: '56rem',
      margin: '0 auto',
    },
    ctaBox: {
      position: 'relative',
      background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.6), rgba(0, 0, 0, 0.8))',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '1.5rem',
      padding: '3rem 4rem',
      textAlign: 'center',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    ctaGlow: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '10rem',
      background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1), transparent)',
      filter: 'blur(60px)',
      pointerEvents: 'none',
    },
    ctaGradient: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), transparent, rgba(16, 185, 129, 0.05))',
      pointerEvents: 'none',
    },
    ctaContent: {
      position: 'relative',
      zIndex: 10,
    },
    ctaH2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
      background: 'linear-gradient(to right, #f3f4f6, #ffffff, #d1d5db)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.02em',
    },
    ctaText: {
      fontSize: '1.125rem',
      color: '#9ca3af',
      marginBottom: '2.5rem',
      maxWidth: '32rem',
      margin: '0 auto 2.5rem',
      lineHeight: 1.6,
      fontWeight: 300,
    },
    footer: {
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(16, 185, 129, 0.1)',
      marginTop: '5rem',
      padding: '2rem 0',
      textAlign: 'center',
    },
    footerText: {
      color: '#6b7280',
      fontSize: '0.875rem',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes floatingGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes electricFlow {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes electricGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px #00ff88) drop-shadow(0 0 4px #00ff88);
          }
          50% {
            filter: drop-shadow(0 0 6px #00ff88) drop-shadow(0 0 12px #00ff88) drop-shadow(0 0 16px #00ff88);
          }
        }

        .electric-line {
          stroke: #00ff88;
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: electricFlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 4px #00ff88);
        }

        .electric-line-1 {
          animation-delay: 0s;
        }

        .electric-line-2 {
          animation-delay: 0.5s;
        }

        .electric-line-3 {
          animation-delay: 1s;
        }

        .electric-particle {
          animation: electricGlow 2s ease-in-out infinite;
        }

        a:hover {
          transform: translateY(-2px);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(16, 185, 129, 0.5);
          background: linear-gradient(to bottom right, rgba(6, 78, 59, 0.3), rgba(17, 24, 39, 0.5));
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.2);
        }

        .feature-card:hover .feature-top-border {
          opacity: 1;
        }

        .feature-card:hover .feature-inner-glow {
          opacity: 1;
        }

        .feature-card:hover .feature-icon {
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
        }

        .login-link:hover {
          color: #34d399;
        }

        .get-started-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
          background: linear-gradient(to right, #10b981, #059669);
        }

        .primary-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.5);
          background: linear-gradient(to right, #10b981, #059669);
        }

        .secondary-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.3);
          backgroundColor: rgba(16, 185, 129, 0.1);
          borderColor: rgba(16, 185, 129, 0.6);
        }

        @media (min-width: 768px) {
          .h1-responsive {
            font-size: 4.5rem !important;
          }
          .cta-h2-responsive {
            font-size: 3rem !important;
          }
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }

        
      `}</style>

      {/* Background Elements */}
      <div style={styles.backgroundGradient} />
      <div style={styles.floatingOrb1} />
      <div style={styles.floatingOrb2} />
      <div style={styles.floatingOrb3} />
      
      <svg style={styles.backgroundLines}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 0 300 Q 400 200 800 300 T 1600 300" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
        <path d="M 0 500 Q 600 400 1200 500 T 2400 500" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
        <path d="M 0 700 Q 300 600 600 700 T 1200 700" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
      </svg>
      
      <div style={styles.gridBackground} />

      {/* Header */}
<header style={styles.header} className="frosted-navbar">
  <div style={styles.headerContainer}>
    <div style={styles.headerContent}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <div style={styles.logoIconOverlay} />
          <Bot size={24} color="#000000" strokeWidth={2.5} style={{ position: 'relative', zIndex: 10 }} />
        </div>
        <span style={styles.logoText}>POWERGRID</span>
      </div>
      <nav style={styles.nav}>
        <a href="/login" style={styles.loginLink} className="login-link">Log In</a>
        <a href="/signup" style={styles.getStartedBtn} className="get-started-btn">Get Started</a>
      </nav>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.electricContainer}>
            {/* Lock Icons */}
            <div style={styles.lockIconLeft} className="lock-icon">
              <Shield size={20} color="#10b981" strokeWidth={2} />
            </div>
            <div style={{...styles.lockIconRight, animationDelay: '1s'}} className="lock-icon">
              <Shield size={20} color="#10b981" strokeWidth={2} />
            </div>

            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 800 250">
              {/* Multiple vertical lines from top */}
              <path className="electric-line electric-line-1" d="M 380 0 L 380 115" />
              <path className="electric-line electric-line-2" d="M 400 0 L 400 115" style={{ animationDelay: '0.1s' }} />
              <path className="electric-line electric-line-3" d="M 420 0 L 420 115" style={{ animationDelay: '0.2s' }} />
              
              {/* Horizontal lines from center to left lock */}
              <path className="electric-line electric-line-1" d="M 380 125 L 80 125" style={{ animationDelay: '0.8s' }} />
              <path className="electric-line electric-line-2" d="M 380 130 L 80 130" style={{ animationDelay: '0.9s' }} />
              <path className="electric-line electric-line-3" d="M 380 135 L 80 135" style={{ animationDelay: '1s' }} />
              
              {/* Horizontal lines from center to right lock */}
              <path className="electric-line electric-line-1" d="M 420 125 L 720 125" style={{ animationDelay: '0.8s' }} />
              <path className="electric-line electric-line-2" d="M 420 130 L 720 130" style={{ animationDelay: '0.9s' }} />
              <path className="electric-line electric-line-3" d="M 420 135 L 720 135" style={{ animationDelay: '1s' }} />
              
              {/* Multiple vertical lines from center down */}
              <path className="electric-line electric-line-1" d="M 380 135 L 380 180" style={{ animationDelay: '1.6s' }} />
              <path className="electric-line electric-line-2" d="M 400 135 L 400 180" style={{ animationDelay: '1.7s' }} />
              <path className="electric-line electric-line-3" d="M 420 135 L 420 180" style={{ animationDelay: '1.8s' }} />
              
              {/* Horizontal lines spreading from bottom left */}
              <path className="electric-line electric-line-1" d="M 380 180 L 150 180" style={{ animationDelay: '2s' }} />
              <path className="electric-line electric-line-2" d="M 380 185 L 150 185" style={{ animationDelay: '2.1s' }} />
              
              {/* Horizontal lines spreading from bottom right */}
              <path className="electric-line electric-line-3" d="M 420 180 L 650 180" style={{ animationDelay: '2s' }} />
              <path className="electric-line electric-line-1" d="M 420 185 L 650 185" style={{ animationDelay: '2.1s' }} />
              
              {/* Electric particles */}
              <circle className="electric-particle" cx="390" cy="20" r="2" fill="#10b981" />
              <circle className="electric-particle" cx="410" cy="25" r="2" fill="#10b981" style={{ animationDelay: '0.1s' }} />
              <circle className="electric-particle" cx="80" cy="130" r="2" fill="#10b981" style={{ animationDelay: '0.9s' }} />
              <circle className="electric-particle" cx="720" cy="130" r="2" fill="#10b981" style={{ animationDelay: '0.9s' }} />
              <circle className="electric-particle" cx="150" cy="182" r="1.5" fill="#10b981" style={{ animationDelay: '2.1s' }} />
              <circle className="electric-particle" cx="650" cy="182" r="1.5" fill="#10b981" style={{ animationDelay: '2.1s' }} />
            </svg>

            <div style={styles.botIconContainer}>
              <div style={styles.gridPatternOverlay} className="grid-pattern" />
              <div style={styles.botIconGlow} />
              <div style={styles.botIconBorder} />
              <Bot size={72} color="#10b981" strokeWidth={2.5} style={{ position: 'relative', zIndex: 10, filter: 'drop-shadow(0 0 10px #10b981)' }} />
              <div style={{...styles.connectionPoint, ...styles.connectionPointTop}} />
              <div style={{...styles.connectionPoint, ...styles.connectionPointBottomLeft}} />
              <div style={{...styles.connectionPoint, ...styles.connectionPointBottomRight}} />
            </div>
          </div>

          <h1 style={styles.h1} className="h1-responsive">
            Unified AI-Powered IT Support for POWERGRID
          </h1>
          
          <p style={styles.subtitle}>
            One platform to consolidate all your IT tickets from GLPI, Solman, and email. Get instant resolutions with
            AI-powered automation and intelligent routing.
          </p>

          <div style={styles.ctaButtons}>
            <a href="/signup" style={styles.primaryBtn} className="primary-btn">
              Start Using Now
            </a>
            <a href="/login" style={styles.secondaryBtn} className="secondary-btn">
              Employee Login
            </a>
          </div>

          <p style={styles.trustText}>
            Trusted by POWERGRID Employees • 2025
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <div style={styles.featuresGrid} className="features-grid">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} style={styles.featureCard} className="feature-card">
                  <div style={styles.featureTopBorder} className="feature-top-border" />
                  <div style={styles.featureInnerGlow} className="feature-inner-glow" />
                  
                  <div style={styles.featureHeader}>
                    <div style={styles.featureIcon} className="feature-icon">
                      <Icon size={28} color="#34d399" strokeWidth={2} />
                    </div>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                  </div>
                  <p style={styles.featureDesc}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <div style={styles.ctaBox} className="animate-on-scroll cta-animate from-left">
            <div style={styles.ctaGlow} />
            <div style={styles.ctaGradient} />
            
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaH2} className="cta-h2-responsive">
                Ready to Transform Your IT Support?
              </h2>
              <p style={styles.ctaText}>
                Join POWERGRID employees already using our unified ticketing system for faster resolutions and better
                support experience.
              </p>
              <a href="/signup" style={styles.primaryBtn} className="primary-btn">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 POWERGRID. All rights reserved.
        </p>
      </footer>
    </div>
  );
}