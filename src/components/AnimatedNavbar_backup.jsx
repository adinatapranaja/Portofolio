import React, { useState, useEffect } from 'react';
i        {`
          @keyframes navbarFloat {
            0%, 100% { 
              transform: translateX(-50%) translateY(0px); 
            }
            50% { 
              transform: translateX(-50%) translateY(-3px); 
            }
          }

          @keyframes logoRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          * {
            box-sizing: border-box;
          }

          html, body {
            overflow-x: hidden;
          }} from '../context/ThemeContext';

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
    borderRadius: '24px',
    padding: '12px 20px',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 2px 8px rgba(239, 68, 68, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'navbarFloat 6s ease-in-out infinite',
    minWidth: '300px',
    maxWidth: '600px',
    width: 'fit-content',
  };

  return (
    <>
      <style>
        {`
          @keyframes navbarFloat {
            0%, 100% { 
              transform: translateX(-50%) translateY(0px); 
            }
            50% { 
              transform: translateX(-50%) translateY(-3px); 
            }
          }

          @keyframes logoRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes buttonGlow {
            0%, 100% { 
              box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
            }
            50% { 
              box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
            }
          }

          * {
            box-sizing: border-box;
          }

          html, body {
            overflow-x: hidden;
          }

          body {
            padding-top: 80px;
          }

          @media (max-width: 768px) {
            body {
              padding-top: 60px;
            }
          }

          .animated-navbar {
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 1000 !important;
            overflow: hidden;
            box-sizing: border-box;
          }
          
          .nav-content {
            display: flex;
            align-items: center;
            padding: 0;
            justify-content: space-between;
            width: 100%;
            box-sizing: border-box;
            gap: 8px;
          }

          .nav-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            flex-shrink: 0;
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
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            flex-shrink: 0;
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
            gap: 8px;
            flex: none;
            justify-content: center;
          }

          .nav-link {
            position: relative;
            padding: 10px 16px;
            border-radius: 12px;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            font-size: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            cursor: pointer;
            border: none;
            background: transparent;
            white-space: nowrap;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3));
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
            border-radius: 12px;
          }

          .nav-link:hover::before {
            left: 0;
          }

          .nav-link:hover {
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }

          .nav-link.active {
            color: white;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4));
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
          }

          .theme-toggle {
            padding: 10px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 16px;
            flex-shrink: 0;
          }

          .theme-toggle:hover {
            background: rgba(239, 68, 68, 0.2);
            transform: scale(1.1);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .animated-navbar {
              top: 10px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: 95% !important;
              min-width: 280px !important;
              max-width: 400px !important;
            }

            .nav-content {
              padding: 0 8px;
              gap: 4px;
            }

            .nav-links {
              gap: 2px;
              flex: 1;
              justify-content: center;
            }

            .nav-link {
              padding: 6px 8px;
              font-size: 11px;
              min-width: auto;
            }

            .logo-text {
              font-size: 13px;
            }

            .theme-toggle {
              padding: 6px;
              font-size: 12px;
              min-width: 28px;
              height: 28px;
            }
          }

          /* Very small screens */
          @media (max-width: 480px) {
            .animated-navbar {
              width: 98% !important;
              min-width: 250px !important;
              max-width: 350px !important;
            }

            .nav-content {
              padding: 0 6px;
              gap: 2px;
            }

            .nav-link {
              padding: 5px 6px;
              font-size: 10px;
            }

            .logo-text {
              font-size: 12px;
            }

            .theme-toggle {
              padding: 5px;
              font-size: 11px;
              min-width: 26px;
              height: 26px;
            }
          }

          /* Tablet */
          @media (max-width: 1024px) and (min-width: 769px) {
            .animated-navbar {
              min-width: 350px;
              max-width: 500px;
            }
            
            .nav-link {
              padding: 10px 14px;
              font-size: 13px;
            }
          }
        `}
      </style>

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
