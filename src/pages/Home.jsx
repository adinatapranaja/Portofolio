import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import SocialIcons from '../components/SocialIcons';
import FloatingShapes from '../components/FloatingShapes';
import { useTheme } from '../context/ThemeContext';

const Home = ({ setCurrentPage }) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Web Developer';

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const skills = [
    { name: 'React.js', level: 90, color: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', level: 85, color: 'from-green-500 to-green-700' },
    { name: 'Firebase', level: 88, color: 'from-orange-500 to-orange-700' },
    { name: 'JavaScript', level: 95, color: 'from-yellow-500 to-yellow-700' },
    { name: 'TailwindCSS', level: 92, color: 'from-cyan-500 to-cyan-700' },
    { name: 'TypeScript', level: 80, color: 'from-purple-500 to-purple-700' }
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance & Projects',
      period: '2024 - Present',
      description: 'Developing modern web applications using React.js, Firebase, and cutting-edge technologies. Specialized in QR code management systems and user experience optimization.'
    },
    {
      title: 'Student, Full-Stack Web Developer',
      company: 'Purwadhika Digital Technology School',
      period: 'Aug 2024 - Jan 2025',
      description: 'Completed an intensive full-time bootcamp covering front-end and back-end web development. Built multiple projects using JavaScript, TypeScript, React.js, Node.js, Firebase, Vercel, Tailwind CSS, etc. Developed a production-ready QR-based event guest system with role-based login and analytics dashboard.'
    },
    {
      title: 'Undergraduate, Information System',
      company: 'University of Indonesia',
      period: 'Jul 2025 - Present',
      description: 'Currently majoring in Information Systems with focus on business process modeling, systems integration, and IT strategy. Leveraging prior Computer Science background to build full-stack web solutions and system architectures.'
    },
    {
      title: 'Undergraduate, Computer Science',
      company: 'University of Indonesia', 
      period: 'Aug 2023 - Jul 2025',
      description: 'Focused on foundational computing, algorithms, and software development before transitioning to Information Systems to pursue a broader systems and business technology perspective.'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      color: isDark ? '#ffffff' : '#1e293b'
    }}>
      {/* Background Pattern */}
      <div style={{
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: isDark 
          ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: 'none'
      }}></div>
      
      {/* Floating 3D Shapes */}
      <FloatingShapes />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  <span className="block text-gray-700 dark:text-gray-300">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
                    Adinata Alaudin Pranaja
                  </span>
                </h1>
                <div className="text-xl md:text-2xl text-red-400 font-semibold h-8 mb-6">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                Mahasiswa S1 Computer Science Universitas Indonesia & Purwadhika Full Stack Graduate. 
                Berfokus pada pengembangan aplikasi web modern dengan React.js, Firebase, dan teknologi terkini. 
                Senang mengeksplorasi teknologi baru dan membangun solusi yang berdampak positif.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('projects')}
                  className="cursor-target px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-white"
                  style={{
                    backgroundColor: '#dc2626'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#b91c1c';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                  }}
                >
                  View My Gallery
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="cursor-target px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                  style={{
                    border: `2px solid ${isDark ? '#6b7280' : '#9ca3af'}`,
                    color: isDark ? '#ffffff' : '#374151',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (isDark) {
                      e.target.style.borderColor = '#ffffff';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    } else {
                      e.target.style.borderColor = '#1f2937';
                      e.target.style.backgroundColor = 'rgba(31, 41, 59, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = isDark ? '#6b7280' : '#9ca3af';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Get in Touch
                </button>
                <a
                  href="/img/Adinata%20Alaudin%20Pranaja%20CV.pdf"
                  download="CV_Adinata_Alaudin_Pranaja.pdf"
                  className="cursor-target inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-white no-underline"
                  style={{
                    backgroundColor: '#2563eb'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 pt-4">
                {[
                  { icon: 'Email', label: 'Email', href: 'mailto:adinata.alaudin@ui.ac.id', isEmail: true },
                  { icon: 'LinkedIn', label: 'LinkedIn', href: 'https://linkedin.com/in/adinataap' },
                  { icon: 'GitHub', label: 'GitHub', href: 'https://github.com/adinatapranaja' },
                  { icon: 'Twitter', label: 'Twitter', href: 'https://twitter.com/adinataap' }
                ].map((social, index) => {
                  if (social.isEmail) {
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="cursor-target text-2xl transition-colors duration-300 hover:scale-110 transform"
                        style={{ 
                          color: isDark ? '#d1d5db' : '#6b7280'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = isDark ? '#f87171' : '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = isDark ? '#d1d5db' : '#6b7280';
                        }}
                        aria-label={social.label}
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855l9.615-7.034h.749c.904 0 1.636.732 1.636 1.636z" fill="currentColor"/>
                        </svg>
                      </a>
                    );
                  }
                  
                  const IconComponent = SocialIcons[social.icon];
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="cursor-target text-gray-300 hover:text-red-400 transition-colors duration-300 hover:scale-110 transform"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Profile Card */}
            <div className="flex justify-center lg:justify-end">
              <ProfileCard
                name="Adinata Alaudin Pranaja"
                title="Full Stack Web Developer"
                handle="adinatapranaja"
                status="Available for work"
                contactText="Contact Me"
                avatarUrl={`${process.env.PUBLIC_URL}/img/Profile.jpg`}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                className="max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100/20 dark:bg-black/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="bg-gray-200/50 dark:bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-300 dark:border-gray-700 hover:border-red-500/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark 
                ? 'linear-gradient(to right, #ffffff, #ef4444)'
                : 'linear-gradient(to right, #1f2937, #dc2626)'
            }}
          >
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="rounded-lg p-6 border-l-4 backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.3)' : 'rgba(15, 23, 42, 0.1)',
                  borderLeftColor: isDark ? '#ef4444' : '#dc2626'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDark ? 'rgba(17, 24, 39, 0.5)' : 'rgba(15, 23, 42, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDark ? 'rgba(17, 24, 39, 0.3)' : 'rgba(15, 23, 42, 0.1)';
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                  >
                    {exp.title}
                  </h3>
                  <span 
                    className="font-medium"
                    style={{ color: isDark ? '#ef4444' : '#dc2626' }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p 
                  className="text-lg mb-2"
                  style={{ color: isDark ? '#d1d5db' : '#374151' }}
                >
                  {exp.company}
                </p>
                <p 
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                >
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;