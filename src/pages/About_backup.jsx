import React, { useEffect } from 'react';
import '../components/ProfileCard.css';

const About = () => {
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
            background: linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 50%, #1a1a2e 100%);
            position: relative;
            overflow: hidden;
          }

          .about-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
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
            background: linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #dc2626 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
          }

          .profile-title {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 24px;
            font-weight: 500;
          }

          .profile-description {
            color: rgba(255, 255, 255, 0.7);
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
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.95rem;
          }

          .contact-icon {
            color: #ef4444;
            font-size: 1.1rem;
            width: 20px;
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
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }

          .social-link:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            transform: translateY(-2px);
            color: #ffffff;
          }

          .info-section {
            display: flex;
            flex-direction: column;
            gap: 60px;
          }

          .section-title {
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #dc2626 100%);
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
            color: rgba(255, 255, 255, 0.85);
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
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px 18px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
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
            color: rgba(255, 255, 255, 0.7);
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
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px 16px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
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
            color: rgba(255, 255, 255, 0.85);
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
            border: 3px solid #1e1e2e;
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
            color: #ffffff;
            margin-bottom: 8px;
          }

          .timeline-company {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            font-weight: 500;
          }

          .timeline-description {
            color: rgba(255, 255, 255, 0.7);
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
                  <span className="contact-icon">📧</span>
                  <span>adinatapranaja@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-link">🔗</a>
                <a href="#" className="social-link">🐙</a>
                <a href="#" className="social-link">💼</a>
                <a href="#" className="social-link">📧</a>
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
                    data-value="50"
                    data-suffix="+"
                  >
                    0+
                  </span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-card">
                  <span 
                    className="stat-number" 
                    data-value="3"
                    data-suffix="+"
                  >
                    0+
                  </span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span 
                    className="stat-number" 
                    data-value="25"
                    data-suffix="+"
                  >
                    0+
                  </span>
                  <span className="stat-label">Happy Clients</span>
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
                  <span className="skill-icon">🐍</span>
                  <span className="skill-name">Python</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">⬛</span>
                  <span className="skill-name">Next.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🎨</span>
                  <span className="skill-name">CSS</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🟢</span>
                  <span className="skill-name">Vue.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🟤</span>
                  <span className="skill-name">Django</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🔷</span>
                  <span className="skill-name">PHP</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🌐</span>
                  <span className="skill-name">Full-Stack Development</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">📝</span>
                  <span className="skill-name">HTML</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">➕</span>
                  <span className="skill-name">C++</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🟨</span>
                  <span className="skill-name">JavaScript</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🔥</span>
                  <span className="skill-name">Flask</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🟢</span>
                  <span className="skill-name">Node.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🔷</span>
                  <span className="skill-name">TypeScript</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🔴</span>
                  <span className="skill-name">Laravel</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🐙</span>
                  <span className="skill-name">GitHub</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🗄️</span>
                  <span className="skill-name">MySQL</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">⚡</span>
                  <span className="skill-name">Shell Scripting</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">💾</span>
                  <span className="skill-name">SQLite</span>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="timeline-section">
              <h3 className="timeline-title">Experience & Education</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">2023 - Present</div>
                  <div className="timeline-title-item">Senior Full-Stack Developer</div>
                  <div className="timeline-company">Tech Innovation Inc.</div>
                  <div className="timeline-description">
                    Leading development of modern web applications using React, Next.js, and Node.js. 
                    Implementing AI-powered features and optimizing application performance.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">2021 - 2023</div>
                  <div className="timeline-title-item">Full-Stack Developer</div>
                  <div className="timeline-company">Digital Solutions Co.</div>
                  <div className="timeline-description">
                    Developed and maintained multiple web applications using modern technologies. 
                    Collaborated with cross-functional teams to deliver high-quality software solutions.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">2019 - 2021</div>
                  <div className="timeline-title-item">Frontend Developer</div>
                  <div className="timeline-company">Creative Agency</div>
                  <div className="timeline-description">
                    Specialized in creating responsive and interactive user interfaces. 
                    Worked with designers to bring creative visions to life through code.
                  </div>
                </div>

                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-date">2015 - 2019</div>
                  <div className="timeline-title-item">Computer Science Degree</div>
                  <div className="timeline-company">University of Technology</div>
                  <div className="timeline-description">
                    Graduated with honors, specializing in software engineering and artificial intelligence. 
                    Completed thesis on machine learning applications in web development.
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
