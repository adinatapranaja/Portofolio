import React, { useState, useEffect } from 'react';

const Stack = ({ items, className = "", autoRotate = false, rotateInterval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoRotate && items.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % items.length);
      }, rotateInterval);

      return () => clearInterval(interval);
    }
  }, [autoRotate, items.length, rotateInterval]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <div className={`relative ${className}`} style={{ minHeight: '400px' }}>
      {/* Stack indicator dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-red-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`View item ${index + 1}`}
          />
        ))}
      </div>

      {/* Stacked cards */}
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const distanceFromActive = Math.abs(index - activeIndex);
        const isVisible = distanceFromActive <= 2;

        return (
          <div
            key={index}
            className={`
              absolute transition-all duration-500 cursor-pointer
              ${isActive ? 'z-20' : 'z-10'}
              ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{
              transform: `
                translateY(${index * 20}px) 
                translateX(${index * 10}px) 
                scale(${isActive ? 1 : 0.95 - distanceFromActive * 0.05})
                rotateY(${isActive ? 0 : (index - activeIndex) * 5}deg)
              `,
              transformOrigin: 'center center',
              filter: isActive ? 'brightness(1)' : `brightness(${0.8 - distanceFromActive * 0.1})`,
            }}
            onClick={() => handleCardClick(index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            tabIndex={isVisible ? 0 : -1}
            role="button"
            aria-label={`Stack item ${index + 1}${isActive ? ' (active)' : ''}`}
          >
            <div className={`
              transition-all duration-300
              ${isActive ? 'shadow-2xl shadow-red-600/30' : 'shadow-lg shadow-black/50'}
            `}>
              {item}
            </div>
          </div>
        );
      })}

      {/* Navigation arrows */}
      <button
        onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : items.length - 1)}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setActiveIndex(prev => (prev + 1) % items.length)}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Stack;