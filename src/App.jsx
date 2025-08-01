import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import TargetCursor from './components/TargetCursor';
import AIChat from './components/AIChat';

// Loading component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-white mb-2">Loading Portfolio</h2>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// SEO Component for meta tags
const SEOHead = ({ currentPage }) => {
  const seoData = {
    home: {
      title: 'Adinata Pranaja - Full Stack Developer Portfolio',
      description: 'Computer Science student & Full Stack Developer specializing in React, Firebase, and modern web technologies. View my projects and get in touch!',
      keywords: 'full stack developer, react developer, firebase, portfolio, web development, computer science, UI student'
    },
    projects: {
      title: 'Projects - Adinata Pranaja Portfolio',
      description: 'Explore my latest web development projects including QR Events Pro, AI applications, and modern web apps built with React and Firebase.',
      keywords: 'web projects, react projects, firebase projects, full stack applications, QR Events Pro, portfolio projects'
    },
    contact: {
      title: 'Contact - Adinata Pranaja Portfolio',
      description: 'Get in touch with me for your next web development project. Computer Science student available for freelance and collaboration opportunities.',
      keywords: 'contact developer, hire developer, web development services, freelance developer, computer science student'
    }
  };

  const currentSEO = seoData[currentPage] || seoData.home;

  useEffect(() => {
    document.title = currentSEO.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = currentSEO.description;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = currentSEO.keywords;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [currentPage, currentSEO]);

  return null;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              The application encountered an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and check if all resources are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
          <SEOHead currentPage={currentPage} />
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="relative">
            {renderPage()}
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-100/50 dark:bg-black/50 border-t border-gray-300 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600 dark:text-gray-400">
                    © 2025 Adinata Pranaja. Built with React & TailwindCSS.
                  </p>
                </div>
                <div className="flex space-x-6">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer">Privacy</button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer">Terms</button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer">Sitemap</button>
                </div>
              </div>
            </div>
          </footer>
          
          {/* Target Cursor Animation */}
          <TargetCursor 
            spinDuration={2}
            hideDefaultCursor={true}
          />
          
          {/* AI Chat Component */}
          <AIChat />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;