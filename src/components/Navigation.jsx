import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import GooeyNav from './GooeyNav';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { label: 'Home', href: '#', key: 'home', icon: '🏠' },
    { label: 'Gallery', href: '#', key: 'projects', icon: '💼' },
    { label: 'Contact', href: '#', key: 'contact', icon: '📧' }
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Handle GooeyNav navigation clicks
  const handleGooeyNavClick = (e, index) => {
    e.preventDefault();
    const pageKey = navigationItems[index].key;
    handleNavigation(pageKey);
  };

  // Get current active index for GooeyNav
  const getCurrentActiveIndex = () => {
    return navigationItems.findIndex(item => item.key === currentPage);
  };

  return (
    <>
      <nav className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-red-300/50 dark:border-red-900/50' 
          : 'bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-red-300/30 dark:border-red-900/30'
        }
      `}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavigation('home')}
                className="flex items-center space-x-2 md:space-x-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1.5 sm:p-2 transition-all duration-300"
              >
                {/* Logo Icon/Symbol */}
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <img 
                    src="/img/Profile.jpg" 
                    alt="Adinata Profile" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-lg"></div>
                </div>
                
                {/* Logo Text - Progressive disclosure */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-gray-600 group-hover:to-gray-800 dark:group-hover:from-gray-100 dark:group-hover:to-gray-400 transition-all duration-300">
                    Adinata AP
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden md:block">
                    Personal Portfolio
                  </span>
                </div>
                
                {/* Mobile only - Just initials */}
                <div className="sm:hidden">
                  <span className="text-sm font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-gray-600 group-hover:to-gray-800 dark:group-hover:from-gray-100 dark:group-hover:to-gray-400 transition-all duration-300">
                    AP
                  </span>
                </div>
              </button>
            </div>

            {/* Tablet Navigation (hidden on mobile, visible on md+) */}
            <div className="hidden lg:flex items-center">
              <GooeyNav
                items={navigationItems.map((item, index) => ({
                  label: item.label,
                  href: item.href,
                  onClick: (e) => handleGooeyNavClick(e, index)
                }))}
                particleCount={12}
                particleDistances={[60, 8]}
                particleR={80}
                initialActiveIndex={Math.max(0, getCurrentActiveIndex())}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 4]}
                key={currentPage} // Force re-render when page changes
              />
            </div>

            {/* Tablet Navigation (simple buttons for md-lg) */}
            <div className="hidden md:flex lg:hidden items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-red-500
                    ${currentPage === item.key
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden text-lg">{item.icon}</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="cursor-target p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle theme"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-sm sm:text-base">
                  {isDark ? '☀️' : '🌙'}
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="cursor-target md:hidden p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-5 sm:w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-red-300/30 dark:border-red-900/30
        `}>
          <div className="px-3 sm:px-4 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`
                  flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-red-500 text-left
                  ${currentPage === item.key
                    ? 'text-red-500 bg-red-500/10 border-l-4 border-red-500 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
                {currentPage === item.key && (
                  <div className="ml-auto flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
            
            {/* Mobile Theme Toggle */}
            <div className="pt-2 mt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <span className="text-lg sm:text-xl flex-shrink-0">{isDark ? '☀️' : '🌙'}</span>
                <span className="font-medium text-sm sm:text-base">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ top: isScrolled ? '56px' : '64px' }} // Adjust for navbar height
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navigation;