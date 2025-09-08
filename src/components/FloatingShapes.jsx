import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FloatingShapes = () => {
  const { isDark } = useTheme();

  return (
    <>
      <style jsx>{`
        @keyframes floatShape {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(30px) translateY(-30px); }
          66% { transform: translateX(-20px) translateY(20px); }
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .shape {
          position: absolute;
          opacity: ${isDark ? '0.1' : '0.08'};
          animation: floatShape 15s ease-in-out infinite;
        }

        .shape:nth-child(1) {
          top: 10%;
          left: 10%;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          border-radius: 50%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          top: 70%;
          right: 10%;
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation-delay: 2s;
        }

        .shape:nth-child(3) {
          top: 30%;
          right: 20%;
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #10b981, #059669);
          transform: rotate(45deg);
          animation-delay: 4s;
        }

        .shape:nth-child(4) {
          bottom: 20%;
          left: 20%;
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #f59e0b, #d97706);
          border-radius: 20px;
          animation-delay: 6s;
        }

        .shape:nth-child(5) {
          top: 50%;
          left: 5%;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          border-radius: 50%;
          animation-delay: 8s;
        }

        .shape:nth-child(6) {
          bottom: 10%;
          right: 30%;
          width: 70px;
          height: 70px;
          background: linear-gradient(45deg, #ec4899, #db2777);
          clip-path: polygon(30% 0%, 0% 50%, 30% 100%, 100% 50%);
          animation-delay: 10s;
        }

        .shape:nth-child(7) {
          top: 15%;
          left: 60%;
          width: 90px;
          height: 90px;
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation-delay: 12s;
        }

        .shape:nth-child(8) {
          bottom: 60%;
          left: 80%;
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #84cc16, #65a30d);
          clip-path: polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%);
          animation-delay: 14s;
        }

        .shape:nth-child(9) {
          top: 80%;
          left: 40%;
          width: 110px;
          height: 110px;
          background: linear-gradient(45deg, #f97316, #ea580c);
          border-radius: 50% 20% 50% 20%;
          animation-delay: 16s;
        }

        .shape:nth-child(10) {
          bottom: 40%;
          right: 5%;
          width: 65px;
          height: 65px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          animation-delay: 18s;
        }

        .shape:nth-child(11) {
          top: 25%;
          left: 25%;
          width: 55px;
          height: 55px;
          background: linear-gradient(45deg, #6366f1, #4f46e5);
          border-radius: 20px;
          transform: rotate(15deg);
          animation-delay: 1s;
        }

        .shape:nth-child(12) {
          bottom: 25%;
          right: 15%;
          width: 75px;
          height: 75px;
          background: linear-gradient(45deg, #14b8a6, #0d9488);
          clip-path: circle(50% at 50% 50%);
          animation-delay: 3s;
        }

        .shape:nth-child(13) {
          top: 60%;
          left: 15%;
          width: 85px;
          height: 85px;
          background: linear-gradient(45deg, #a855f7, #9333ea);
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          animation-delay: 5s;
        }

        .shape:nth-child(14) {
          bottom: 70%;
          right: 40%;
          width: 45px;
          height: 45px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          transform: rotate(30deg);
          animation-delay: 7s;
        }

        .shape:nth-child(15) {
          top: 40%;
          right: 60%;
          width: 95px;
          height: 95px;
          background: linear-gradient(45deg, #0ea5e9, #0284c7);
          border-radius: 50% 10% 50% 10%;
          animation-delay: 9s;
        }

        .shape:nth-child(16) {
          bottom: 15%;
          left: 70%;
          width: 35px;
          height: 35px;
          background: linear-gradient(45deg, #22c55e, #16a34a);
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          animation-delay: 11s;
        }

        .shape:nth-child(17) {
          top: 5%;
          right: 5%;
          width: 105px;
          height: 105px;
          background: linear-gradient(45deg, #f59e0b, #d97706);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation-delay: 13s;
        }

        .shape:nth-child(18) {
          bottom: 50%;
          left: 50%;
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #ec4899, #db2777);
          border-radius: 50%;
          animation-delay: 15s;
        }

        .shape:nth-child(19) {
          top: 75%;
          right: 25%;
          width: 115px;
          height: 115px;
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          clip-path: polygon(20% 0%, 80% 0%, 100% 60%, 80% 100%, 20% 100%, 0% 60%);
          animation-delay: 17s;
        }

        .shape:nth-child(20) {
          bottom: 35%;
          left: 35%;
          width: 30px;
          height: 30px;
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          transform: rotate(45deg);
          animation-delay: 19s;
        }
      `}</style>
      
      <div className="floating-shapes">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="shape" />
        ))}
      </div>
    </>
  );
};

export default FloatingShapes;
