import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../components/ProfileCard.css';

const About = () => {
  const { isDark } = useTheme();
  useEffect(() => {
    // ProfileCard animation
    const profileCard = document.querySelector('.profile-card');
    
    const handleMouseMove = (e) => {
      const rect = profileCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = e.clientX;
      const y = e.clientY;
      
      const rotateX = (centerY - y) / 10;
      const rotateY = (centerX - x) / 10;
      
      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    if (profileCard) {
      profileCard.addEventListener('mousemove', handleMouseMove);
      profileCard.addEventListener('mouseleave', handleMouseLeave);
    }

    // Counter animation
    const animateCounter = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.dataset.suffix || '');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate counters
          if (entry.target.classList.contains('stat-number')) {
            const endValue = parseInt(entry.target.dataset.value);
            animateCounter(entry.target, 0, endValue, 2000);
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all animated elements
    document.querySelectorAll('.profile-card, .stat-card, .skill-item, .timeline-item').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      if (profileCard) {
        profileCard.removeEventListener('mousemove', handleMouseMove);
        profileCard.removeEventListener('mouseleave', handleMouseLeave);
      }
      observer.disconnect();
    };
  }, []);

  const handleTimelineClick = (e) => {
    const item = e.currentTarget;
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.3);
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    item.style.position = 'relative';
    item.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInScale {
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideInLeft {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes rotateIn {
            to {
              opacity: 1;
              transform: rotateY(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
          }

          @keyframes floatShape {
            0%, 100% { transform: translateX(0px) translateY(0px); }
            33% { transform: translateX(30px) translateY(-30px); }
            66% { transform: translateX(-20px) translateY(20px); }
          }

          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }

          .about-container {
            min-height: 100vh;
            padding: 120px 40px 80px;
            background: ${isDark 
              ? 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 50%, #1a1a2e 100%)' 
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
            };
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .about-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='${isDark ? '0.02' : '0.04'}'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: float 20s ease-in-out infinite;
            pointer-events: none;
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
            opacity: 0.1;
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

          .content-container {
            position: relative;
            z-index: 2;
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 80px;
            align-items: start;
          }

          .profile-section {
            position: sticky;
            top: 120px;
            height: fit-content;
          }

          .profile-card {
            background: ${isDark 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(255, 255, 255, 0.9)'
            };
            backdrop-filter: blur(20px);
            border: 1px solid ${isDark 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(0, 0, 0, 0.1)'
            };
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            animation: slideInScale 1s ease 0.2s forwards;
            cursor: pointer;
            will-change: transform;
            transform-style: preserve-3d;
            box-shadow: ${isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
            };
          }

          .profile-card:hover {
            border-color: rgba(239, 68, 68, 0.3);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          }

          .profile-image {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            margin: 0 auto 30px;
            border: 4px solid rgba(239, 68, 68, 0.3);
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.2);
            object-fit: cover;
            transition: all 0.4s ease;
          }

          .profile-card:hover .profile-image {
            border-color: rgba(239, 68, 68, 0.6);
            box-shadow: 0 0 60px rgba(239, 68, 68, 0.4);
            transform: scale(1.05);
          }

          .profile-name {
            font-size: 2rem;
            font-weight: 700;
            background: ${isDark 
              ? 'linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #dc2626 100%)' 
              : 'linear-gradient(135deg, #1a202c 0%, #ef4444 50%, #dc2626 100%)'
            };
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
          }

          .profile-title {
            font-size: 1.2rem;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.7)'
            };
            margin-bottom: 24px;
            font-weight: 500;
          }

          .profile-description {
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.6)'
            };
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 30px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.7)'
            };
            font-size: 0.95rem;
          }

          .contact-icon {
            color: #ef4444;
            font-size: 1.1rem;
            width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .contact-icon svg {
            width: 18px;
            height: 18px;
          }

          .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
          }

          .social-link {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: ${isDark 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)'
            };
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.7)'
            };
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }

          .social-link svg {
            width: 20px;
            height: 20px;
            transition: all 0.3s ease;
          }

          .social-link:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            transform: translateY(-2px);
            color: ${isDark ? '#ffffff' : '#ef4444'};
          }

          .info-section {
            display: flex;
            flex-direction: column;
            gap: 60px;
          }

          .section-title {
            font-size: 4rem;
            font-weight: 900;
            background: ${isDark 
              ? 'linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #dc2626 100%)' 
              : 'linear-gradient(135deg, #1a202c 0%, #ef4444 50%, #dc2626 100%)'
            };
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 30px;
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 1s ease 0.2s forwards;
            line-height: 1.1;
          }

          .intro-text {
            font-size: 1.25rem;
            line-height: 1.7;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.85)' 
              : 'rgba(0, 0, 0, 0.8)'
            };
            margin-bottom: 40px;
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 1s ease 0.4s forwards;
            max-width: 90%;
          }

          .stats-section {
            margin-bottom: 60px;
          }

          .stats-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
          }

          .stat-card {
            background: ${isDark 
              ? 'rgba(255, 255, 255, 0.06)' 
              : 'rgba(255, 255, 255, 0.8)'
            };
            backdrop-filter: blur(20px);
            border: 1px solid ${isDark 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
            };
            border-radius: 16px;
            padding: 24px 18px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
            box-shadow: ${isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
              : '0 4px 20px rgba(0, 0, 0, 0.05)'
            };
          }

          .stat-card:nth-child(1) { animation: slideInUp 1s ease 0.6s forwards; }
          .stat-card:nth-child(2) { animation: slideInUp 1s ease 0.7s forwards; }
          .stat-card:nth-child(3) { animation: slideInUp 1s ease 0.8s forwards; }
          .stat-card:nth-child(4) { animation: slideInUp 1s ease 0.9s forwards; }

          .stat-card:hover {
            transform: translateY(-8px) scale(1.05);
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
            box-shadow: 0 20px 40px rgba(239, 68, 68, 0.2);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #ef4444;
            margin-bottom: 8px;
            display: block;
          }

          .stat-label {
            font-size: 0.9rem;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.6)'
            };
            font-weight: 500;
          }

          .skills-section {
            margin-bottom: 60px;
          }

          .skills-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 30px;
            color: #ef4444;
            opacity: 0;
            transform: translateX(-30px);
            animation: slideInLeft 1s ease 1s forwards;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
          }

          .skill-item {
            background: ${isDark 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.7)'
            };
            backdrop-filter: blur(10px);
            border: 1px solid ${isDark 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
            };
            border-radius: 12px;
            padding: 20px 16px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            box-shadow: ${isDark 
              ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
              : '0 4px 15px rgba(0, 0, 0, 0.05)'
            };
          }

          .skill-item:nth-child(1) { animation-delay: 1.3s; }
          .skill-item:nth-child(2) { animation-delay: 1.35s; }
          .skill-item:nth-child(3) { animation-delay: 1.4s; }
          .skill-item:nth-child(4) { animation-delay: 1.45s; }
          .skill-item:nth-child(5) { animation-delay: 1.5s; }
          .skill-item:nth-child(6) { animation-delay: 1.55s; }
          .skill-item:nth-child(7) { animation-delay: 1.6s; }
          .skill-item:nth-child(8) { animation-delay: 1.65s; }
          .skill-item:nth-child(9) { animation-delay: 1.7s; }
          .skill-item:nth-child(10) { animation-delay: 1.75s; }
          .skill-item:nth-child(11) { animation-delay: 1.8s; }
          .skill-item:nth-child(12) { animation-delay: 1.85s; }
          .skill-item:nth-child(13) { animation-delay: 1.9s; }
          .skill-item:nth-child(14) { animation-delay: 1.95s; }
          .skill-item:nth-child(15) { animation-delay: 2.0s; }
          .skill-item:nth-child(16) { animation-delay: 2.05s; }
          .skill-item:nth-child(17) { animation-delay: 2.1s; }
          .skill-item:nth-child(18) { animation-delay: 2.15s; }
          .skill-item:nth-child(19) { animation-delay: 2.2s; }

          .skill-item:hover {
            transform: translateY(-6px) scale(1.02);
            background: rgba(239, 68, 68, 0.08);
            box-shadow: 0 15px 30px rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.3);
          }

          .skill-icon {
            width: 36px;
            height: 36px;
            margin: 0 auto 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            filter: grayscale(0.8);
            transition: all 0.3s ease;
          }

          .skill-icon svg {
            width: 100%;
            height: 100%;
            max-width: 32px;
            max-height: 32px;
          }

          .skill-item:hover .skill-icon {
            filter: grayscale(0);
            transform: scale(1.15);
          }

          .skill-name {
            font-size: 0.9rem;
            font-weight: 600;
            color: ${isDark 
              ? 'rgba(255, 255, 255, 0.85)' 
              : 'rgba(0, 0, 0, 0.8)'
            };
          }

          .timeline-section {
            margin: 0;
          }

          .timeline-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 30px;
            color: #ef4444;
            opacity: 0;
            transform: translateX(-30px);
            animation: slideInLeft 1s ease 2.4s forwards;
          }

          .timeline {
            position: relative;
            padding-left: 30px;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #ef4444, #dc2626);
            border-radius: 1px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 40px;
            opacity: 0;
            transform: translateX(30px);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .timeline-item:nth-child(1) { animation: slideInRight 1s ease 2.6s forwards; }
          .timeline-item:nth-child(2) { animation: slideInRight 1s ease 2.7s forwards; }
          .timeline-item:nth-child(3) { animation: slideInRight 1s ease 2.8s forwards; }
          .timeline-item:nth-child(4) { animation: slideInRight 1s ease 2.9s forwards; }

          .timeline-item:hover {
            transform: translateX(10px);
          }

          .timeline-item::before {
            content: '';
            position: absolute;
            left: -37px;
            top: 8px;
            width: 12px;
            height: 12px;
            background: #ef4444;
            border-radius: 50%;
            border: 3px solid ${isDark ? '#1e1e2e' : '#ffffff'};
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
            transition: all 0.3s ease;
          }

          .timeline-item:hover::before {
            transform: scale(1.3);
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.4);
          }

          .timeline-date {
            font-size: 0.9rem;
            color: #ef4444;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .timeline-title-item {
            font-size: 1.2rem;
            font-weight: 600;
            color: ${isDark ? '#ffffff' : '#1e293b'};
            margin-bottom: 8px;
          }

          .timeline-company {
            font-size: 1rem;
            color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)'};
            margin-bottom: 12px;
            font-weight: 500;
          }

          .timeline-description {
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)'};
            line-height: 1.6;
            font-size: 0.95rem;
          }

          @media (max-width: 1024px) {
            .content-container {
              grid-template-columns: 1fr;
              gap: 50px;
            }

            .profile-section {
              position: static;
            }

            .section-title {
              font-size: 3rem;
            }

            .stats-container {
              grid-template-columns: repeat(2, 1fr);
            }

            .skills-grid {
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }
          }

          @media (max-width: 768px) {
            .about-container {
              padding: 100px 20px 60px;
            }

            .section-title {
              font-size: 2.5rem;
            }

            .intro-text {
              font-size: 1.1rem;
            }

            .profile-card {
              padding: 30px;
            }

            .profile-image {
              width: 150px;
              height: 150px;
            }

            .profile-name {
              font-size: 1.8rem;
            }

            .stats-container {
              grid-template-columns: 1fr;
              gap: 16px;
            }

            .stat-number {
              font-size: 2rem;
            }

            .skills-grid {
              grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
              gap: 12px;
            }

            .skill-item {
              padding: 16px 12px;
            }

            .timeline {
              padding-left: 25px;
            }

            .timeline-item::before {
              left: -32px;
            }
          }

          @media (max-width: 480px) {
            .about-container {
              padding: 80px 16px 40px;
            }

            .section-title {
              font-size: 2rem;
            }

            .profile-card {
              padding: 24px;
            }

            .profile-image {
              width: 120px;
              height: 120px;
            }

            .profile-name {
              font-size: 1.6rem;
            }

            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>

      <div className="about-container">
        <div className="floating-shapes">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="shape"></div>
          ))}
        </div>

        <div className="content-container">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-card">
              <img src="/img/Profile.jpg" alt="Profile" className="profile-image" />
              <h2 className="profile-name">Adinata Pranaja</h2>
              <p className="profile-title">Full-Stack Developer & AI Enthusiast</p>
              <p className="profile-description">
                Passionate developer with expertise in modern web technologies and machine learning. 
                Building innovative solutions that make a difference.
              </p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855l9.615-7.034h.749c.904 0 1.636.732 1.636 1.636z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span>adinatapranaja@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                    </svg>
                  </span>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="social-links">
                <a href="https://adinatapranaja.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Website">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://github.com/adinatapranaja" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2Z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/adinatapranaja" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="mailto:adinatapranaja@gmail.com" className="social-link" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855l9.615-7.034h.749c.904 0 1.636.732 1.636 1.636z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="intro-section">
              <h1 className="section-title">About Me</h1>
              <p className="intro-text">
                I'm a passionate full-stack developer with a deep love for creating innovative web applications 
                and exploring the frontiers of artificial intelligence. With expertise spanning modern frameworks 
                like React, Next.js, and backend technologies, I bring ideas to life through clean, efficient code 
                and user-centered design.
              </p>
              <p className="intro-text">
                My journey in technology is driven by curiosity and a constant desire to learn. Whether it's 
                building responsive web applications, developing AI-powered solutions, or optimizing database 
                performance, I approach each project with dedication and attention to detail.
              </p>
            </div>

            {/* Statistics */}
            <div className="stats-section">
              <div className="stats-container">
                <div className="stat-card">
                  <span 
                    className="stat-number" 
                    data-value="7"
                    data-suffix="+"
                  >
                    7+
                  </span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-card">
                  <span 
                    className="stat-number" 
                    data-value="2"
                    data-suffix="+"
                  >
                    2+
                  </span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span 
                    className="stat-number" 
                    data-value="100"
                    data-suffix="%"
                  >
                    100%
                  </span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="skills-section">
              <h3 className="skills-title">Core Technologies</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.99-1.36-1.56z" fill="#61DAFB"/>
                    </svg>
                  </div>
                  <span className="skill-name">React.js</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="#306998"/>
                      <path d="M21.44 11.05l-.33.2-.29.3-.25.39-.2.42-.14.43-.1.42-.04.41-.01.18v.17l.03.2.07.2.1.18.15.18.19.15.23.13.25.09.27.07.27.04.25.01.24-.02.22-.07.2-.09.17-.13.14-.15.1-.16.07-.18.04-.18.01-.17-.02-.15-.06-.14-.08-.13-.1-.11-.11-.1-.12-.07-.12-.04-.1-.02-.05-.01H20.6l-.14.07-.1.1-.07.13-.02.05-.01.05-.01.13.04.12.08.08.11.05.1.02.02.01.05-.01.03-.01.02-.02.01-.02.01-.05.01-.06-.01-.05-.02-.04-.02-.02-.03-.01-.01-.01h-.06l-.05.01-.04.03-.02.04v.05l-.01.05.02.04.04.02.05.01h.06l.01-.01.03-.01.02-.02.01-.02v-.03l-.01-.03-.01-.02-.02-.01-.01-.01-.03-.01-.03.01-.02.01-.01.02-.01.03v.03l.01.02.02.01.01.01z" fill="#FFD43B"/>
                    </svg>
                  </div>
                  <span className="skill-name">Python</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.0132-.3636.0132-.1778 0-.3485-.0079-.4297-.0079-.0962 0-.0962.0079-.0962.0079v.3636c0 .0962.0962.1925.1925.1925h.1925c.0962 0 .1925-.0962.1925-.1925v-.1925c0-.1283.1041-.2324.2324-.2324s.2324.1041.2324.2324v.1925c0 .0962.0962.1925.1925.1925h.1925c.0962 0 .1925-.0962.1925-.1925v-.3636s0-.0079-.0962-.0079c-.0813 0-.2519.0079-.4297.0079-.1477 0-.3119-.0079-.3636-.0132C11.8823.0013 11.7488 0 11.5725 0z" fill="#000"/>
                      <path d="M23.8815 11.9757c-.0053-.7948-.0132-1.9823-.0132-2.8849 0-1.7765-.0079-3.4951-.0079-4.3977 0-.9026-.0079-1.3975-.0079-1.3975l-.3636-.0079c-2.9849-.0659-9.3157-.0659-12.3006 0l-.3636.0079s-.0079.4949-.0079 1.3975c0 .9026-.0079 2.6212-.0079 4.3977 0 .9026-.0079 2.0901-.0132 2.8849-.0013.1843-.0013.3157-.0013.4074 0 .0916 0 .2231.0013.4074.0053.7948.0132 1.9823.0132 2.8849 0 1.7765.0079 3.4951.0079 4.3977 0 .9026.0079 1.3975.0079 1.3975l.3636.0079c2.9849.0659 9.3157.0659 12.3006 0l.3636-.0079s.0079-.4949.0079-1.3975c0-.9026.0079-2.6212.0079-4.3977 0-.9026.0079-2.0901.0132-2.8849.0013-.1843.0013-.3158.0013-.4074 0-.0916 0-.2231-.0013-.4074zM12 18.5c-3.5899 0-6.5-2.9101-6.5-6.5S8.4101 5.5 12 5.5s6.5 2.9101 6.5 6.5-2.9101 6.5-6.5 6.5z" fill="#000"/>
                    </svg>
                  </div>
                  <span className="skill-name">Next.js</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h12.303l-.316 3.587H8.772l.212 2.623h8.885l-.63 6.99-4.239 1.125-4.239-1.125-.274-3.043H6.037l.537 5.993L12 23.25l5.426-1.465.726-8.133.137-1.506.844-9.729z" fill="#1572B6"/>
                    </svg>
                  </div>
                  <span className="skill-name">CSS</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" fill="#4FC08D"/>
                    </svg>
                  </div>
                  <span className="skill-name">Vue.js</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.051 1.707.204V0zm0 9.143c-.535-.204-.926-.255-1.707-.255-2.548 0-4.05 1.53-4.05 4.23 0 2.624 1.426 4.128 4.05 4.128.781 0 1.172-.051 1.707-.255V9.143zM16.541 5.086v9.911c0 3.418.204 5.086 1.172 6.167.917 1.07 2.267 1.53 5.096 1.53.535 0 .764 0 1.191-.051v-2.981c-.255.051-.535.051-.688.051-1.249 0-1.783-.382-1.783-1.989V8.62h2.471V5.086h-2.471V.765h-3.924v4.321h-1.064z" fill="#092E20"/>
                    </svg>
                  </div>
                  <span className="skill-name">Django</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="12" cy="12" rx="11" ry="6" fill="#777BB4"/><ellipse cx="12" cy="12" rx="8" ry="4" fill="#FFFFFF"/><text x="12" y="15" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="6" fill="#777BB4">PHP</text>
                    </svg>
                  </div>
                  <span className="skill-name">PHP</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 0A1.5 1.5 0 000 1.5v21A1.5 1.5 0 001.5 24h21a1.5 1.5 0 001.5-1.5v-21A1.5 1.5 0 0022.5 0h-21zm19.5 3v18H3V3h18zM6.75 6.75v1.5h1.5v-1.5h-1.5zm3 0v1.5h7.5v-1.5h-7.5zm-3 3v1.5h1.5v-1.5h-1.5zm3 0v1.5h7.5v-1.5h-7.5zm-3 3v1.5h1.5v-1.5h-1.5zm3 0v1.5h7.5v-1.5h-7.5zm-3 3v1.5h1.5v-1.5h-1.5zm3 0v1.5h7.5v-1.5h-7.5z" fill="#007ACC"/>
                    </svg>
                  </div>
                  <span className="skill-name">Full-Stack Development</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
                    </svg>
                  </div>
                  <span className="skill-name">HTML</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.339.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z" fill="#00599C"/>
                    </svg>
                  </div>
                  <span className="skill-name">C++</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#F7DF1E"/>
                    </svg>
                  </div>
                  <span className="skill-name">JavaScript</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm-.615 19.596c-4.715-.225-8.48-4.044-8.48-8.785 0-.048.008-.094.01-.141l4.502 9.239c.285.568.893.568 1.178 0l4.503-9.239c.002.047.01.093.01.141 0 4.741-3.765 8.56-8.48 8.785h-.243zm8.471-8.644L15.353 2.7c-.285-.568-.893-.568-1.178 0L9.672 10.952h-.004c-.002-.047-.01-.093-.01-.141 0-4.741 3.765-8.56 8.48-8.785h.243c4.715.225 8.48 4.044 8.48 8.785 0 .048-.008.094-.01.141z" fill="#000"/>
                    </svg>
                  </div>
                  <span className="skill-name">Flask</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.68C2.376,6.729,2.322,6.825,2.322,6.921v10.15c0,0.097,0.054,0.189,0.137,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" fill="#339933"/>
                    </svg>
                  </div>
                  <span className="skill-name">Node.js</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" fill="#3178C6"/>
                    </svg>
                  </div>
                  <span className="skill-name">TypeScript</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.017c-.008.002-.016.002-.024.002-.008 0-.016 0-.024-.002a.358.358 0 01-.066-.017L.726 18.755a.378.378 0 01-.188-.326V5.574c0-.033.005-.066.014-.098.003-.012.01-.023.015-.034a.369.369 0 01.23-.208L9.823.05a.375.375 0 01.353 0l9.025 5.184a.375.375 0 01.229.207c.005.012.012.023.015.035.002.004.002.007.004.011l-.007-.057zm-.652 5.207V6.256l-1.812 1.045-2.51 1.447v4.38l4.322-2.491zm-4.51 7.75v-4.287l-2.463 1.418-6.026 3.468v4.325l8.489-4.924zM1.262 6.256v12.456l8.489 4.924v-4.325L5.11 15.745l-.004-.002-.004-.002c-.031-.018-.057-.044-.075-.076-.008-.014-.013-.03-.016-.045-.004-.018-.004-.036-.004-.054V6.256l2.51-1.447L9.33 3.764v4.38l-4.323 2.491zM9.33 2.444L5.55 4.702l3.78 2.176 3.787-2.18L9.33 2.444zm.998 15.506l2.510-1.447 2.5-1.442-3.78-2.176-2.463 1.418-2.463 1.418 3.696 2.129z" fill="#FF2D20"/>
                    </svg>
                  </div>
                  <span className="skill-name">Laravel</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#181717"/>
                    </svg>
                  </div>
                  <span className="skill-name">GitHub</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.152zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.221c.094-1.434.25-2.662.46-3.95h1.186c.328 1.082.66 2.5.841 3.176h.008c.2-.676.553-2.094.892-3.176h1.184c.11.328.711 2.516.734 3.95zm1.137 0h-.858c.293-1.298.466-2.526.734-3.95h1.27c.309.221 1.412 1.352 1.986 2.94h.014a23.12 23.12 0 00-.34-1.076c-.083-.225-.203-.533-.29-.734-.27-.629-.421-.949-.695-1.13h-.014c.161-.055.324-.11.324-.397 0-.12-.094-.24-.154-.321-.2-.27-.626-.395-.934-.395-.354 0-.635.042-.882.154v.014c-.04.027-.067.067-.067.14 0 .094.08.154.154.154.054 0 .08-.027.134-.04.067-.027.134-.027.2-.067.054-.027.127-.067.194-.067.08 0 .154.027.207.08.067.067.094.154.094.274 0 .154-.094.274-.233.354-.134.067-.287.134-.421.167-.174.047-.367.107-.54.154-.2.054-.421.127-.594.2-.154.067-.314.154-.448.274-.134.134-.201.314-.201.514 0 .094.027.194.08.287.067.107.154.2.261.274.127.08.287.134.447.154.167.027.354.027.534 0 .2-.027.407-.08.594-.154.2-.08.407-.174.594-.314.2-.154.394-.34.554-.567.174-.234.314-.514.434-.814.127-.314.221-.654.274-1.02.067-.354.087-.734.087-1.127 0-.221-.014-.447-.027-.674-.027-.234-.067-.467-.134-.7-.054-.221-.134-.434-.234-.634-.1-.2-.234-.394-.367-.567-.154-.174-.327-.327-.521-.447-.2-.127-.434-.214-.674-.274-.234-.067-.5-.094-.754-.094-.114 0-.228.014-.34.027-.127.027-.254.067-.374.127-.127.067-.247.154-.354.274-.114.127-.2.287-.267.467-.067.174-.1.374-.1.567 0 .2.027.407.08.6.067.2.154.394.274.567.127.174.287.327.467.447.194.127.434.214.687.274.274.067.567.094.847.094.287 0 .567-.027.834-.094.274-.067.527-.174.754-.327.234-.154.434-.354.594-.594.154-.234.274-.514.354-.814.087-.3.127-.627.127-.967 0-.354-.04-.714-.134-1.06-.087-.354-.234-.687-.434-.987-.2-.3-.467-.567-.787-.754-.327-.194-.7-.314-1.094-.414-.4-.1-.827-.154-1.26-.154-.447 0-.9.067-1.327.194-.434.127-.834.327-1.18.594-.354.274-.647.627-.854 1.034-.2.407-.3.867-.3 1.34 0 .087.014.174.027.26z" fill="#4479A1"/>
                    </svg>
                  </div>
                  <span className="skill-name">MySQL</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4 3.6c-.662 0-1.2.538-1.2 1.2v14.4c0 .662.538 1.2 1.2 1.2h19.2c.662 0 1.2-.538 1.2-1.2V4.8c0-.662-.538-1.2-1.2-1.2H2.4zm1.2 1.2h17.4v12H3.6V4.8zm2.4 2.4v1.2h7.2V7.2H6zm0 2.4v1.2h9.6V9.6H6zm0 2.4v1.2h4.8v-1.2H6z" fill="#4EAA25"/>
                    </svg>
                  </div>
                  <span className="skill-name">Shell Scripting</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.678 14.62c.63-.634 1.002-1.51 1.002-2.613 0-2.073-1.614-3.725-3.61-3.725-1.997 0-3.612 1.652-3.612 3.725 0 1.103.372 1.979 1.003 2.613-1.372 1.37-3.515 3.206-5.39 4.834-1.877-1.628-4.02-3.464-5.391-4.834.63-.634 1.002-1.51 1.002-2.613 0-2.073-1.614-3.725-3.61-3.725C1.073 8.282-.54 9.934-.54 12.007c0 1.103.372 1.979 1.003 2.613C-.909 16.99-.909 19.718-.909 19.718h24c0 0 0-2.729-1.413-5.098zM2.072 12.007c0-1.036.84-1.878 1.876-1.878s1.877.842 1.877 1.878-.841 1.878-1.877 1.878-1.876-.842-1.876-1.878zm16.980 0c0-1.036.84-1.878 1.876-1.878s1.877.842 1.877 1.878-.841 1.878-1.877 1.878-1.876-.842-1.876-1.878zm2.857 6.265H2.09c-.007-.034-.014-.068-.019-.103.313-.691.526-1.517.567-2.482 1.469-1.469 3.725-3.406 5.693-5.067 1.968 1.661 4.224 3.598 5.692 5.067.041.965.254 1.791.567 2.482-.005.035-.012.069-.019.103z" fill="#003B57"/>
                    </svg>
                  </div>
                  <span className="skill-name">SQLite</span>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="timeline-section">
              <h3 className="timeline-title">Experience & Education</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">2024 - Present</div>
                  <div className="timeline-title-item">Full Stack Developer</div>
                  <div className="timeline-company">Freelance & Projects</div>
                  <div className="timeline-description">
                    Developing modern web applications using React.js, Firebase, and cutting-edge technologies. 
                    Specialized in QR code management systems and user experience optimization.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">Aug 2024 - Jan 2025</div>
                  <div className="timeline-title-item">Student, Full-Stack Web Developer</div>
                  <div className="timeline-company">Purwadhika Digital Technology School</div>
                  <div className="timeline-description">
                    Completed an intensive full-time bootcamp covering front-end and back-end web development. 
                    Developed a production-ready QR-based event guest system with role-based login and analytics dashboard.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">Jul 2025 - Present</div>
                  <div className="timeline-title-item">Undergraduate, Information System</div>
                  <div className="timeline-company">University of Indonesia</div>
                  <div className="timeline-description">
                    Currently majoring in Information Systems with focus on business process modeling, systems integration, and IT strategy. 
                    Leveraging prior Computer Science background to build full-stack web solutions.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">Aug 2023 - Jul 2025</div>
                  <div className="timeline-title-item">Undergraduate, Computer Science</div>
                  <div className="timeline-company">University of Indonesia</div>
                  <div className="timeline-description">
                    Focused on foundational computing, algorithms, and software development before transitioning to Information Systems 
                    to pursue a broader systems and business technology perspective.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
