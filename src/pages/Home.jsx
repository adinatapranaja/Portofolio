import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import SocialIcons from '../components/SocialIcons';

const Home = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = '💻 Full Stack Web Developer';

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
      period: '2023 - Present',
      description: 'Developing modern web applications using React.js, Firebase, and cutting-edge technologies. Specialized in QR code management systems and user experience optimization.'
    },
    {
      title: 'Bootcamp Graduate',
      company: 'Purwadhika Digital Technology School',
      period: '2023 (6 months)',
      description: 'Completed intensive Full Stack Web Development program covering React, Node.js, database management, and modern development practices with hands-on projects.'
    },
    {
      title: 'Computer Science Student',
      company: 'Universitas Indonesia',
      period: '2020 - Present',
      description: 'Pursuing S1 in Computer Science with focus on Software Engineering, Web Development, and Data Science. Building strong academic foundation in programming and system design.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-red-100/20 dark:from-black dark:via-gray-900 dark:to-red-900/20 text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
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
                Passionate about crafting digital experiences with code and creativity. Specialized in React.js, 
                Firebase, and modern web technologies to build scalable, user-focused applications.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('projects')}
                  className="cursor-target bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
                >
                  View My Gallery
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="cursor-target border-2 border-gray-600 hover:border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/5"
                >
                  Get in Touch
                </button>
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
                        className="cursor-target text-2xl hover:text-red-400 transition-colors duration-300 hover:scale-110 transform"
                        aria-label={social.label}
                      >
                        📧
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
                title="💻 Full Stack Web Developer"
                handle="adinatapranaja"
                status="Available for work"
                contactText="Contact Me"
                avatarUrl="/img/Profile.jpg"
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100/20 dark:bg-black/20">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-200/30 dark:bg-gray-900/30 rounded-lg p-6 border-l-4 border-red-500 backdrop-blur-sm hover:bg-gray-200/50 dark:hover:bg-gray-900/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                  <span className="text-red-500 font-medium">{exp.period}</span>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
                <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;