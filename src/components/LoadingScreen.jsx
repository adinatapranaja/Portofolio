import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Delay before hiding loading screen
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete();
          }, 500);
          return 100;
        }
        // Random increment for more natural loading feel
        const increment = Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${isDark ? 'dark' : 'light'}`}>
      {/* Background with animated particles */}
      <div className="loading-background">
        <div className="particle-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${Math.random() * 3}s`,
                '--duration': `${3 + Math.random() * 2}s`,
                '--size': `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main loading container */}
      <div className="loading-container">
        {/* 3D Loading Ring */}
        <div className="loading-ring-container">
          <div className="loading-ring">
            <div className="ring-segment ring-1"></div>
            <div className="ring-segment ring-2"></div>
            <div className="ring-segment ring-3"></div>
            <div className="ring-inner">
              <div className="percentage-display">
                <span className="percentage-number">{Math.floor(progress)}</span>
                <span className="percentage-symbol">%</span>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div 
            className="progress-fill"
            style={{ '--progress': `${progress}%` }}
          ></div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="loading-text">
          <h2 className="loading-title">Loading Portfolio</h2>
          <div className="loading-dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </div>
        </div>

        {/* Interactive elements */}
        <div className="loading-elements">
          <div className="floating-cube cube-1"></div>
          <div className="floating-cube cube-2"></div>
          <div className="floating-cube cube-3"></div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="bottom-progress">
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {progress < 30 && "Initializing..."}
          {progress >= 30 && progress < 60 && "Loading assets..."}
          {progress >= 60 && progress < 90 && "Preparing interface..."}
          {progress >= 90 && "Almost ready..."}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
