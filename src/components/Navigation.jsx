import React, { useState, useEffect } from 'react';

const BulletproofNavigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force positioning dengan JavaScript
  useEffect(() => {
    const navbar = document.getElementById('bulletproof-navbar');
    if (navbar) {
      // Force reset semua positioning
      navbar.style.position = 'sticky';
      navbar.style.top = '0';
      navbar.style.left = '0';
      navbar.style.right = '0';
      navbar.style.width = '100%';
      navbar.style.zIndex = '9999';
      navbar.style.margin = '0';
      navbar.style.transform = 'none';
      navbar.style.webkitTransform = 'none';
    }
  }, []);

  const navigationItems = [
    { label: 'Home', key: 'home' },
    { label: 'Gallery', key: 'projects' },
    { label: 'Contact', key: 'contact' }
  ];

  // Inline styles yang akan override semua CSS
  const navbarStyles = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 9999,
    margin: 0,
    padding: 0,
    transform: 'none',
    WebkitTransform: 'none',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    // Force box model
    boxSizing: 'border-box',
    display: 'block',
    clear: 'both',
    // Override any parent transforms
    isolation: 'isolate'
  };

  const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    boxSizing: 'border-box',
    width: '100%'
  };

  const flexContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: isScrolled ? '56px' : '64px',
    transition: 'height 0.3s ease',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <>
      {/* Critical CSS injection */}
      <style>{`
        #bulletproof-navbar {
          position: sticky !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 9999 !important;
          margin: 0 !important;
          transform: none !important;
          -webkit-transform: none !important;
        }
        
        #bulletproof-navbar * {
          box-sizing: border-box;
        }
        
        /* Reset any parent container effects */
        body {
          overflow-x: hidden !important;
        }
        
        /* Force hardware acceleration */
        #bulletproof-navbar {
          will-change: transform;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        
        /* Mobile specific fixes */
        @media (max-width: 768px) {
          #bulletproof-navbar {
            position: sticky !important;
            top: 0 !important;
          }
        }
      `}</style>

      <nav 
        id="bulletproof-navbar"
        style={navbarStyles}
      >
        <div style={containerStyles}>
          <div style={flexContainerStyles}>
            
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <button 
                onClick={() => setCurrentPage('home')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: isScrolled ? '32px' : '40px',
                  height: isScrolled ? '32px' : '40px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  <img 
                    src="/img/Profile.jpg" 
                    alt="Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <span style={{ 
                  fontWeight: 'bold', 
                  fontSize: isScrolled ? '14px' : '16px',
                  color: '#374151',
                  transition: 'font-size 0.3s ease',
                  whiteSpace: 'nowrap'
                }}>
                  Adinata AP
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div style={{ 
              display: window.innerWidth >= 768 ? 'flex' : 'none',
              gap: '8px',
              alignItems: 'center'
            }}>
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: currentPage === item.key ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                    color: currentPage === item.key ? '#ef4444' : '#374151',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.key) {
                      e.target.style.backgroundColor = 'rgba(156, 163, 175, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.key) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              flexShrink: 0
            }}>
              {/* Theme Toggle */}
              <button
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f3f4f6',
                  cursor: 'pointer',
                  width: isScrolled ? '36px' : '40px',
                  height: isScrolled ? '36px' : '40px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}
              >
                🌙
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: window.innerWidth < 768 ? 'flex' : 'none',
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f3f4f6',
                  cursor: 'pointer',
                  width: isScrolled ? '36px' : '40px',
                  height: isScrolled ? '36px' : '40px',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <span style={{
                  width: '16px',
                  height: '2px',
                  backgroundColor: '#374151',
                  borderRadius: '1px',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(5px)' : 'none',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}></span>
                <span style={{
                  width: '16px',
                  height: '2px',
                  backgroundColor: '#374151',
                  borderRadius: '1px',
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}></span>
                <span style={{
                  width: '16px',
                  height: '2px',
                  backgroundColor: '#374151',
                  borderRadius: '1px',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          maxHeight: isMobileMenuOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderTop: isMobileMenuOpen ? '1px solid rgba(239, 68, 68, 0.2)' : 'none',
          width: '100%'
        }}>
          <div style={{ padding: '16px' }}>
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '12px',
                  border: 'none',
                  background: currentPage === item.key ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  color: currentPage === item.key ? '#ef4444' : '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  fontSize: '16px'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: isScrolled ? '56px' : '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9998
          }}
        />
      )}
    </>
  );
};

export default BulletproofNavigation;