import React, { useState, useRef, useEffect } from 'react';

const InfiniteMenu = ({ items, className = "", itemWidth = 300, visibleItems = 3 }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef(null);

  const maxScroll = Math.max(0, (items.length - visibleItems) * itemWidth);

  useEffect(() => {
    setCanScrollLeft(scrollPosition > 0);
    setCanScrollRight(scrollPosition < maxScroll);
  }, [scrollPosition, maxScroll]);

  const scroll = (direction) => {
    const scrollAmount = itemWidth * 2; // Scroll 2 items at a time
    let newPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }

    setScrollPosition(newPosition);
  };

  const handleKeyDown = (e, direction) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scroll(direction);
    }
  };

  const scrollToItem = (index) => {
    const targetPosition = Math.min(maxScroll, index * itemWidth);
    setScrollPosition(targetPosition);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        onKeyDown={(e) => handleKeyDown(e, 'left')}
        disabled={!canScrollLeft}
        className={`
          absolute left-2 top-1/2 z-30 -translate-y-1/2 
          bg-black/70 hover:bg-black/90 text-white p-3 rounded-full 
          transition-all duration-300 shadow-lg
          ${canScrollLeft ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}
        `}
        aria-label="Scroll left"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div 
        ref={containerRef}
        className="flex transition-transform duration-500 ease-in-out px-12"
        style={{ 
          transform: `translateX(-${scrollPosition}px)`,
          width: `${items.length * itemWidth}px`
        }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 px-2"
            style={{ width: `${itemWidth}px` }}
          >
            <div className="h-full transform transition-all duration-300 hover:scale-105">
              {item}
            </div>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        onKeyDown={(e) => handleKeyDown(e, 'right')}
        disabled={!canScrollRight}
        className={`
          absolute right-2 top-1/2 z-30 -translate-y-1/2 
          bg-black/70 hover:bg-black/90 text-white p-3 rounded-full 
          transition-all duration-300 shadow-lg
          ${canScrollRight ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}
        `}
        aria-label="Scroll right"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {Array.from({ length: Math.ceil(items.length / 2) }).map((_, index) => {
          const isActive = Math.floor(scrollPosition / (itemWidth * 2)) === index;
          return (
            <button
              key={index}
              onClick={() => scrollToItem(index * 2)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${isActive ? 'bg-red-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}
              `}
              aria-label={`Go to section ${index + 1}`}
            />
          );
        })}
      </div>

      {/* Gradient overlays for visual effect */}
      <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default InfiniteMenu;