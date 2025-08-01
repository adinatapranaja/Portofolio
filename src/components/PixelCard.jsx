import React, { useState } from 'react';

const PixelCard = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-lg transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.3), transparent)`,
        }}
      />
      
      {/* Main card */}
      <div className={`
        relative bg-gradient-to-br from-red-900 to-black 
        border-2 border-red-600 
        p-6 rounded-lg 
        transform transition-all duration-300
        ${isHovered ? 'scale-105 shadow-2xl shadow-red-600/50 border-red-400' : 'scale-100'}
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500/20 before:to-transparent before:rounded-lg
        backdrop-blur-sm
      `}>
        {/* Pixelated corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 opacity-60" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 opacity-60" />
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-red-500 opacity-60" />
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-red-500 opacity-60" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Scan line effect */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent
            transition-all duration-1000 rounded-lg
            ${isHovered ? 'animate-pulse' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default PixelCard;