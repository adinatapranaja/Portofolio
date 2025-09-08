import React, { useEffect, useRef } from 'react';

const About = () => {
  const profileCardRef = useRef(null);
  const statNumbersRef = useRef([]);

  useEffect(() => {
    // Profile card tilt effect
    const profileCard = profileCardRef.current;
    
    const handleMouseMove = (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
    const handleMouseLeav                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="#306998"/>
                      <path d="M21.44 11.05l-.33.2-.29.3-.25.39-.2.42-.14.43-.1.42-.04.41-.01.18v.17l.03.2.07.2.1.18.15.18.19.15.23.13.25.09.27.07.27.04.25.01.24-.02.22-.07.2-.09.17-.13.14-.15.1-.16.07-.18.04-.18.01-.17-.02-.15-.06-.14-.08-.13-.1-.11-.11-.1-.12-.07-.12-.04-.1-.02-.05-.01H20.6l-.14.07-.1.1-.07.13-.02.05-.01.05-.01.13.04.12.08.08.11.05.1.02.02.01.05-.01.03-.01.02-.02.01-.02.01-.05.01-.06-.01-.05-.02-.04-.02-.02-.03-.01-.01-.01h-.06l-.05.01-.04.03-.02.04v.05l-.01.05.02.04.04.02.05.01h.06l.01-.01.03-.01.02-.02.01-.02v-.03l-.01-.03-.01-.02-.02-.01-.01-.01-.03-.01-.03.01-.02.01-.01.02-.01.03v.03l.01.02.02.01.01.01z" fill="#FFD43B"/>
                    </svg>
                  </div>
                  <span className="skill-name">Python</span>
                </div>() => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };
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
        element.textContent = current + (element.textContent.includes('%') ? '%' : '+');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const text = target.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          
          if (text.includes('%')) {
            animateCounter(target, 0, number, 2000);
          } else {
            animateCounter(target, 0, number, 1500);
          }
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbersRef.current.forEach(stat => {
      if (stat) observer.observe(stat);
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
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-50px) rotate(90deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            75% { transform: translateY(-80px) rotate(270deg); }
          }

          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
          }

          .about-section {
            min-height: 100vh;
            padding: 100px 20px 60px;
            position: relative;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 80px;
            align-items: flex-start;
          }

          .profile-container {
            position: relative;
            perspective: 1000px;
            position: sticky;
            top: 120px;
          }

          .profile-card {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            transform-style: preserve-3d;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            margin: 0 auto;
          }

          .profile-card:hover {
            transform: rotateY(8deg) rotateX(8deg) scale(1.02);
            box-shadow: 
              0 30px 80px rgba(239, 68, 68, 0.25),
              0 15px 40px rgba(0, 0, 0, 0.4);
          }

          .profile-image {
            width: 100%;
            height: 550px;
            object-fit: cover;
            object-position: center;
            transition: all 0.6s ease;
          }

          .profile-card:hover .profile-image {
            transform: scale(1.05);
          }

          .floating-element {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4));
            backdrop-filter: blur(10px);
            animation: float 8s ease-in-out infinite;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .floating-element:nth-child(2) {
            width: 60px;
            height: 60px;
            top: -30px;
            right: -30px;
            animation-delay: 0s;
          }

          .floating-element:nth-child(3) {
            width: 45px;
            height: 45px;
            bottom: -22px;
            left: -22px;
            animation-delay: 2.5s;
          }

          .floating-element:nth-child(4) {
            width: 35px;
            height: 35px;
            top: 40%;
            right: -17px;
            animation-delay: 5s;
          }

          .content-container {
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 50px;
          }

          .section-title {
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #dc2626 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0;
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 1s ease 0.2s forwards;
            line-height: 1.1;
          }

          .intro-text {
            font-size: 1.25rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 0;
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 1s ease 0.4s forwards;
            max-width: 90%;
          }

          .stats-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 0;
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
            transform: translateY(30px) scale(0.95);
            animation: slideInScale 1s ease forwards;
            position: relative;
            overflow: hidden;
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #ef4444, #dc2626);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .stat-card:hover::before {
            transform: scaleX(1);
          }

          .stat-card:nth-child(1) { animation-delay: 0.6s; }
          .stat-card:nth-child(2) { animation-delay: 0.7s; }
          .stat-card:nth-child(3) { animation-delay: 0.8s; }
          .stat-card:nth-child(4) { animation-delay: 0.9s; }

          .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(239, 68, 68, 0.08);
            box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);
            border-color: rgba(239, 68, 68, 0.3);
          }

          .stat-number {
            font-size: 2.2rem;
            font-weight: 800;
            color: #ef4444;
            margin-bottom: 8px;
            display: block;
          }

          .stat-label {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
          }

          .skills-section {
            margin: 0;
          }

          .skills-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 24px;
            color: #ef4444;
            opacity: 0;
            transform: translateX(-30px);
            animation: slideInLeft 1s ease 1.1s forwards;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
          }

          .skill-item {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 16px 12px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 0;
            transform: rotateY(45deg) scale(0.9);
            animation: rotateIn 0.8s ease forwards;
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
            animation: slideInLeft 1s ease 1.8s forwards;
          }

          .timeline {
            position: relative;
            padding-left: 35px;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 18px;
            top: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, rgba(220, 38, 38, 0.3) 100%);
            border-radius: 2px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 35px;
            opacity: 0;
            transform: translateX(40px);
            animation: slideInRight 0.8s ease forwards;
          }

          .timeline-item:nth-child(1) { animation-delay: 2.0s; }
          .timeline-item:nth-child(2) { animation-delay: 2.2s; }
          .timeline-item:nth-child(3) { animation-delay: 2.4s; }

          .timeline-item::before {
            content: '';
            position: absolute;
            left: -43px;
            top: 12px;
            width: 14px;
            height: 14px;
            background: #ef4444;
            border-radius: 50%;
            border: 4px solid #0f1419;
            transition: all 0.3s ease;
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }

          .timeline-item:hover::before {
            transform: scale(1.3);
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.3);
          }

          .timeline-content {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .timeline-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, #ef4444, #dc2626);
            transform: scaleY(0);
            transition: transform 0.3s ease;
            transform-origin: bottom;
          }

          .timeline-content:hover::before {
            transform: scaleY(1);
          }

          .timeline-content:hover {
            transform: translateX(8px);
            background: rgba(239, 68, 68, 0.06);
            box-shadow: 0 15px 40px rgba(239, 68, 68, 0.15);
            border-color: rgba(239, 68, 68, 0.2);
          }

          .timeline-date {
            font-size: 0.9rem;
            color: #ef4444;
            font-weight: 700;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .timeline-title-text {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
            line-height: 1.3;
          }

          .timeline-desc {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.6;
          }

          .bg-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
          }

          .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.06), rgba(220, 38, 38, 0.06));
            backdrop-filter: blur(5px);
            animation: floatShape 25s linear infinite;
          }

          .shape:nth-child(1) {
            width: 120px;
            height: 120px;
            top: 15%;
            left: 8%;
            animation-delay: 0s;
          }

          .shape:nth-child(2) {
            width: 80px;
            height: 80px;
            top: 65%;
            right: 15%;
            animation-delay: 8s;
          }

          .shape:nth-child(3) {
            width: 100px;
            height: 100px;
            bottom: 15%;
            left: 75%;
            animation-delay: 16s;
          }

          @media (max-width: 1200px) {
            .container {
              max-width: 1000px;
              gap: 60px;
            }
            
            .section-title {
              font-size: 3.5rem;
            }
          }

          @media (max-width: 968px) {
            .container {
              grid-template-columns: 1fr;
              gap: 50px;
              max-width: 800px;
            }

            .profile-container {
              position: relative;
              top: auto;
            }

            .profile-card {
              max-width: 400px;
            }

            .profile-image {
              height: 450px;
            }

            .section-title {
              font-size: 3rem;
              text-align: center;
            }

            .intro-text {
              text-align: center;
              max-width: 100%;
            }

            .stats-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }

            .skills-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
            }

            .skill-item {
              padding: 14px 10px;
            }

            .skills-title,
            .timeline-title {
              text-align: center;
            }
          }

          @media (max-width: 640px) {
            .about-section {
              padding: 80px 16px 40px;
            }

            .section-title {
              font-size: 2.5rem;
            }

            .intro-text {
              font-size: 1.1rem;
            }

            .stats-container {
              grid-template-columns: 1fr;
              gap: 12px;
            }

            .stat-card {
              padding: 20px 16px;
            }

            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .skill-item {
              padding: 12px 8px;
            }

            .skill-name {
              font-size: 0.8rem;
            }

            .timeline {
              padding-left: 25px;
            }

            .timeline::before {
              left: 12px;
            }

            .timeline-item::before {
              left: -30px;
            }
          }
        `}
      </style>

      <section className="about-section">
        <div className="bg-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="container">
          {/* Left Side - Profile */}
          <div className="profile-container">
            <div className="profile-card" ref={profileCardRef}>
              <img 
                src="/img/Profile.jpg" 
                alt="Adinata Alaudin Pranaja" 
                className="profile-image"
              />
              <div className="floating-element"></div>
              <div className="floating-element"></div>
              <div className="floating-element"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="content-container">
            <h2 className="section-title">About Me</h2>
            
            <p className="intro-text">
              Mahasiswa S1 Information System di Universitas Indonesia dengan background Computer Science 
              dan lulusan Purwadhika Full Stack Web Development Bootcamp. Saya passionate dalam menciptakan 
              solusi digital yang inovatif dengan menggabungkan technical skills dan business perspective 
              untuk membangun sistem yang meaningful dan scalable.
            </p>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stat-card">
                <span 
                  className="stat-number" 
                  ref={(el) => (statNumbersRef.current[0] = el)}
                >
                  2+
                </span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span 
                  className="stat-number"
                  ref={(el) => (statNumbersRef.current[1] = el)}
                >
                  15+
                </span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span 
                  className="stat-number"
                  ref={(el) => (statNumbersRef.current[2] = el)}
                >
                  5+
                </span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-card">
                <span 
                  className="stat-number"
                  ref={(el) => (statNumbersRef.current[3] = el)}
                >
                  100%
                </span>
                <span className="stat-label">Client Satisfaction</span>
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
                  <span className="skill-icon">�</span>
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
                  <span className="skill-icon">�</span>
                  <span className="skill-name">JavaScript</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">�🔥</span>
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
              <h3 className="timeline-title">Education Journey</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-content">
                    <div className="timeline-date">Jul 2025 - Present</div>
                    <div className="timeline-title-text">Universitas Indonesia</div>
                    <div className="timeline-desc">
                      Undergraduate, Information System - Currently majoring in Information Systems 
                      with focus on business process modeling, systems integration, and IT strategy. 
                      Leveraging prior Computer Science background to build full-stack web solutions 
                      and system architectures.
                    </div>
                  </div>
                </div>
                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-content">
                    <div className="timeline-date">Aug 2024 - Jan 2025</div>
                    <div className="timeline-title-text">Purwadhika Digital Technology School</div>
                    <div className="timeline-desc">
                      Student, Full-Stack Web Developer - Completed an intensive full-time bootcamp 
                      covering front-end and back-end web development. Built multiple projects using 
                      JavaScript, TypeScript, React.js, Node.js, Firebase, Vercel, Tailwind CSS. 
                      Developed a production-ready QR-based event guest system with role-based 
                      login and analytics dashboard.
                    </div>
                  </div>
                </div>
                <div className="timeline-item" onClick={handleTimelineClick}>
                  <div className="timeline-content">
                    <div className="timeline-date">Aug 2023</div>
                    <div className="timeline-title-text">Universitas Indonesia</div>
                    <div className="timeline-desc">
                      Undergraduate, Computer Science - Focused on foundational computing, algorithms, 
                      and software development before transitioning to Information Systems to pursue 
                      a broader systems and business technology perspective. Strong foundation in 
                      programming languages and development frameworks.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
