import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedNavbar = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', key: 'home' },
    { label: 'Gallery', key: 'projects' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' }
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const navbarStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
    background: isScrolled ? 'rgba(15, 20, 25, 0.95)' : 'rgba(15, 20, 25, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '8px 16px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 2px 8px rgba(239, 68, 68, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    animation: 'navbarFloat 6s ease-in-out infinite',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <>
      <style>
        {`
          @keyframes navbarFloat {
            0%, 100% { transform: translateX(-50%) translateY(0px); }
            50% { transform: translateX(-50%) translateY(-5px); }
          }

          @keyframes logoRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes particleFloat {
            0% {
              transform: translateY(100vh) translateX(0) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(100px) scale(1);
              opacity: 0;
            }
          }

          .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(239, 68, 68, 0.5);
            border-radius: 50%;
            animation: particleFloat 20s linear infinite;
          }

          .nav-content {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-right: 16px;
            padding: 8px 12px;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .nav-logo:hover {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
            transform: scale(1.05);
          }

          .logo-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: logoRotate 8s linear infinite;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }

          .logo-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .logo-text {
            font-size: 16px;
            font-weight: 600;
            background: linear-gradient(135deg, #ffffff, #ef4444);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .nav-link {
            position: relative;
            padding: 12px 20px;
            border-radius: 12px;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            font-size: 14px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            perspective: 1000px;
            overflow: hidden;
            cursor: pointer;
            border: none;
            background: transparent;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3));
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
            border-radius: 12px;
          }

          .nav-link:hover::before {
            left: 0;
          }

          .nav-link:hover {
            color: white;
            transform: translateY(-3px) rotateX(15deg);
            box-shadow: 
              0 10px 25px rgba(239, 68, 68, 0.3),
              0 5px 10px rgba(0, 0, 0, 0.2);
          }

          .nav-link.active {
            color: white;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4));
            transform: translateY(-2px);
            box-shadow: 
              0 8px 20px rgba(239, 68, 68, 0.2),
              0 3px 8px rgba(0, 0, 0, 0.2);
          }

          .nav-link::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
            z-index: -2;
          }

          .nav-link:hover::after {
            opacity: 1;
          }

          .theme-toggle {
            margin-left: 8px;
            padding: 10px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 16px;
          }

          .theme-toggle:hover {
            background: rgba(239, 68, 68, 0.2);
            transform: rotate(180deg) scale(1.1);
          }

          @media (max-width: 768px) {
            .animated-navbar {
              top: 10px !important;
              left: 10px !important;
              right: 10px !important;
              transform: none !important;
              padding: 6px 12px !important;
            }

            .nav-content {
              justify-content: space-between;
            }

            .nav-links {
              gap: 2px;
            }

            .nav-link {
              padding: 8px 12px;
              font-size: 13px;
            }

            .logo-text {
              display: none;
            }
          }
        `}
      </style>

      {/* Particles Background */}
      <div className="particles-container">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="animated-navbar" style={navbarStyle}>
        <div className="nav-content">
          <div className="nav-logo" onClick={() => handleNavigation('home')}>
            <div className="logo-icon">
              <img src="/img/Profile.jpg" alt="Adinata Profile" />
            </div>
            <span className="logo-text">Adinata</span>
          </div>
          
          <div className="nav-links">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                className={`nav-link ${currentPage === item.key ? 'active' : ''}`}
                onClick={() => handleNavigation(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default AnimatedNavbar;
