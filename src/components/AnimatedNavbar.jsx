import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedNavbar = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

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
    // Prevent multiple clicks
    if (isNavigating) return;
    
    setIsNavigating(true);
    setCurrentPage(page);
    
    // Smooth scroll to top with better timing
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset navigation state after scroll completes
      setTimeout(() => {
        setIsNavigating(false);
      }, 500);
    }, 50);
  };

  const navbarStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(15px) saturate(1.2)',
    background: isScrolled 
      ? (isDark 
          ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.95) 0%, rgba(26, 31, 46, 0.95) 50%, rgba(15, 20, 25, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(226, 232, 240, 0.95) 50%, rgba(241, 245, 249, 0.95) 100%)')
      : (isDark 
          ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.8) 0%, rgba(26, 31, 46, 0.8) 50%, rgba(15, 20, 25, 0.8) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.8) 50%, rgba(241, 245, 249, 0.8) 100%)'),
    border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(220, 38, 38, 0.3)'}`,
    borderRadius: '24px',
    padding: '12px 20px',
    boxShadow: isDark
      ? `
        0 8px 32px rgba(0, 0, 0, 0.4),
        0 2px 8px rgba(239, 68, 68, 0.15),
        0 0 20px rgba(26, 31, 46, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `
      : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 2px 8px rgba(220, 38, 38, 0.15),
        0 0 20px rgba(226, 232, 240, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.8)
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
              box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 2px 8px rgba(239, 68, 68, 0.15),
                0 0 20px rgba(26, 31, 46, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            50% { 
              transform: translateX(-50%) translateY(-3px);
              box-shadow: 
                0 12px 40px rgba(0, 0, 0, 0.5),
                0 4px 12px rgba(239, 68, 68, 0.2),
                0 0 30px rgba(26, 31, 46, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.15);
            }
          }

          @keyframes logoRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes buttonGlow {
            0%, 100% { 
              box-shadow: 
                0 4px 12px rgba(239, 68, 68, 0.2),
                0 0 15px rgba(26, 31, 46, 0.3);
            }
            50% { 
              box-shadow: 
                0 6px 20px rgba(239, 68, 68, 0.4),
                0 0 25px rgba(26, 31, 46, 0.5);
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
            animation: logoRotate 8s linear infinite;
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
            background: ${isDark 
              ? 'linear-gradient(135deg, #ffffff, #ef4444)'
              : 'linear-gradient(135deg, #1f2937, #dc2626)'
            };
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            white-space: nowrap;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 4px;
            flex: 1;
            justify-content: center;
          }

          .nav-link {
            position: relative;
            padding: 10px 16px;
            border-radius: 12px;
            text-decoration: none;
            color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 59, 0.8)'};
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
            background: ${isDark 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))'
              : 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.2))'
            };
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
            border-radius: 12px;
          }

          .nav-link:hover::before {
            left: 0;
          }

          .nav-link:hover {
            color: ${isDark ? 'white' : '#1f2937'};
            transform: translateY(-2px);
            box-shadow: ${isDark 
              ? '0 4px 12px rgba(239, 68, 68, 0.3)'
              : '0 4px 12px rgba(220, 38, 38, 0.2)'
            };
          }

          .nav-link.active {
            color: ${isDark ? 'white' : '#1f2937'};
            background: ${isDark 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4))'
              : 'linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.3))'
            };
            box-shadow: ${isDark 
              ? '0 4px 12px rgba(239, 68, 68, 0.2)'
              : '0 4px 12px rgba(220, 38, 38, 0.15)'
            };
            animation: buttonGlow 3s ease-in-out infinite;
          }

          .nav-link.navigating {
            opacity: 0.7;
            transform: scale(0.95);
            pointer-events: none;
          }

          .animated-navbar.navigating {
            pointer-events: none;
          }

          .theme-toggle {
            padding: 10px;
            border-radius: 10px;
            background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(31, 41, 59, 0.1)'};
            border: none;
            color: ${isDark ? 'white' : '#1f2937'};
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 16px;
            flex-shrink: 0;
          }

          .theme-toggle:hover {
            background: ${isDark 
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(220, 38, 38, 0.15)'
            };
            transform: scale(1.1) rotate(180deg);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            body {
              padding-top: 70px;
            }

            .animated-navbar {
              top: 10px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: 95% !important;
              min-width: 280px !important;
              max-width: 400px !important;
              padding: 8px 16px !important;
              border-radius: 20px !important;
            }

            .nav-content {
              padding: 0 4px;
              gap: 4px;
            }

            .nav-logo {
              padding: 6px 8px;
              gap: 6px;
            }

            .logo-icon {
              width: 24px;
              height: 24px;
            }

            .logo-text {
              font-size: 14px;
              font-weight: 600;
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
              font-weight: 500;
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
              padding: 6px 12px !important;
            }

            .nav-content {
              padding: 0 2px;
              gap: 2px;
            }

            .nav-logo {
              padding: 4px 6px;
              gap: 4px;
            }

            .logo-icon {
              width: 22px;
              height: 22px;
            }

            .logo-text {
              font-size: 12px;
            }

            .nav-link {
              padding: 5px 6px;
              font-size: 10px;
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
      <nav className={`animated-navbar ${isNavigating ? 'navigating' : ''}`} style={navbarStyle}>
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
                className={`nav-link ${currentPage === item.key ? 'active' : ''} ${isNavigating ? 'navigating' : ''}`}
                onClick={() => handleNavigation(item.key)}
                disabled={isNavigating}
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
