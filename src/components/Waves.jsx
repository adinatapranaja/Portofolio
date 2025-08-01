import React from 'react';

const Waves = ({ className = "", variant = 'footer', animated = true }) => {
  const WaveVariants = {
    footer: {
      viewBox: "0 24 150 28",
      preserveAspectRatio: "none",
      path: "m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
    },
    hero: {
      viewBox: "0 0 1440 320",
      preserveAspectRatio: "none",
      path: "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    },
    divider: {
      viewBox: "0 0 1440 200",
      preserveAspectRatio: "none",  
      path: "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
    }
  };

  const currentVariant = WaveVariants[variant] || WaveVariants.footer;

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={currentVariant.viewBox}
        preserveAspectRatio={currentVariant.preserveAspectRatio}
      >
        <defs>
          <path
            id={`gentle-wave-${variant}`}
            d={currentVariant.path}
          />
          
          {/* Gradient definitions */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#450a0a" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        <g className={animated ? "animate-pulse" : ""}>
          {/* Multiple wave layers for depth */}
          <use 
            xlinkHref={`#gentle-wave-${variant}`} 
            x="50" 
            y="0" 
            fill="url(#waveGradient1)"
            className={animated ? "animate-pulse" : ""}
            style={{
              animationDelay: '0s',
              animationDuration: '4s'
            }}
          />
          <use 
            xlinkHref={`#gentle-wave-${variant}`} 
            x="50" 
            y="3" 
            fill="url(#waveGradient2)"
            className={animated ? "animate-pulse" : ""}
            style={{
              animationDelay: '1s',
              animationDuration: '5s'
            }}
          />
          <use 
            xlinkHref={`#gentle-wave-${variant}`} 
            x="50" 
            y="5" 
            fill="url(#waveGradient3)"
            className={animated ? "animate-pulse" : ""}
            style={{
              animationDelay: '2s',
              animationDuration: '6s'
            }}
          />
        </g>
      </svg>
      
      {/* Additional animated particles for enhancement */}
      {animated && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full opacity-60 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Waves;