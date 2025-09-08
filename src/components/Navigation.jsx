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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavigation('home')}
                className="flex items-center space-x-2 md:space-x-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-2 transition-all duration-300"
              >
                {/* Logo Icon/Symbol */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  <img 
                    src="/img/Profile.jpg" 
                    alt="Adinata Profile" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-lg"></div>
                </div>
                
                {/* Logo Text - Hidden on small screens, visible on md+ */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-base md:text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-gray-600 group-hover:to-gray-800 dark:group-hover:from-gray-100 dark:group-hover:to-gray-400 transition-all duration-300">
                    Adinata AP
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
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

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="cursor-target p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle theme"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {isDark ? '☀️' : '🌙'}
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="cursor-target md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-gray-800 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-red-300/30 dark:border-red-900/30
        `}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`
                  flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-red-500
                  ${currentPage === item.key
                    ? 'text-red-500 bg-red-500/10 border-l-4 border-red-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;