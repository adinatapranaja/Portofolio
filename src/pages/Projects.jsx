import React from 'react';
import Waves from '../components/Waves';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import FloatingShapes from '../components/FloatingShapes';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { isDark } = useTheme();
  // Project data with images and descriptions
  const projectsData = [
    {
      image: `${process.env.PUBLIC_URL}/img/Project1.jpg`,
      title: "QEvents - Event Management System",
      description: "Advanced event management platform featuring QR code technology for seamless attendee check-ins, real-time analytics dashboard, Firebase authentication, and comprehensive event administration.",
      tech: ["React.js", "Firebase", "Firestore", "Firebase Auth", "QR Code API", "Real-time DB", "JavaScript", "CSS3", "HTML5", "Responsive Design", "PWA", "Event Management", "Analytics Dashboard", "User Authentication", "Cloud Functions"]
    },
    {
      image: `${process.env.PUBLIC_URL}/img/Project2.jpg`,
      title: "Purwadhika Family Meetup",
      description: "Meetup with Full Stack Web Development Purwadhika Bootcamp Alumnis!",
      tech: ["Networking"]
    },
    {
      image: `${process.env.PUBLIC_URL}/img/Project3.jpg`,
      title: "Bali Bike Rental Booking System",
      description: "Full-stack web application for bike rental bookings with real-time availability, payment integration, and user management. Features responsive design and seamless user experience.",
      tech: ["React.js", "Node.js", "MongoDB", "Payment API"]
    },
    {
      image: `${process.env.PUBLIC_URL}/img/Project4.jpg`,
      title: "Full Stack Web Development Bootcamp",
      description: "Intensive 6-month bootcamp completion at Purwadhika, mastering modern web development technologies, collaborative coding practices, and real-world project development.",
      tech: ["JavaScript", "TypeScript", "HTML", "CSS", "React.js", "Next.js", "TailwindCSS", "SEO", "NextAuth", "Supabase", "State Management", "System Security", "Code Reviews", "Git", "Node.js", "Database Design"]
    },
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
      {/* Header Section */}
      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark 
                ? 'linear-gradient(to right, #ffffff, #ef4444)'
                : 'linear-gradient(to right, #1f2937, #dc2626)'
            }}
          >
            My Galleria
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#d1d5db' : '#475569' }}
          >
            A showcase of my development journey featuring QR Events, portfolio websites, Networking, and modern web applications. 
            Each project demonstrates my expertise in React.js, Firebase, and user-centered design principles.
          </p>
        </div>
      </div>

      {/* ScrollStack Projects Section */}
      <div className="relative z-10">
        {/* Auto Scroll Indicator */}
        <div className="absolute top-4 right-4 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Auto scrolling • Scroll to control</span>
          </div>
        </div>

        <ScrollStack 
          className="projects-scroll-stack"
          itemDistance={80}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="15%"
          scaleEndPosition="5%"
          baseScale={0.9}
          rotationAmount={1}
          blurAmount={0.5}
          autoScroll={true}
          autoScrollSpeed={1.5}
          autoScrollPause={2200}
        >
          {projectsData.map((project, index) => (
            <ScrollStackItem key={index} itemClassName="project-card">
              <img 
                src={project.image} 
                alt={project.title}
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/img/Profile.jpg`; // Fallback image
                }}
              />
              <div className="scroll-stack-card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* GitHub CTA Section */}
      <div 
        className="relative z-10"
        style={{
          background: isDark 
            ? 'linear-gradient(to bottom right, #000000, #111827, rgba(127, 29, 29, 0.2))'
            : 'linear-gradient(to bottom right, rgba(241, 245, 249, 0.5), rgba(226, 232, 240, 0.3), rgba(254, 226, 226, 0.2))'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div 
            className="text-center rounded-2xl p-8 backdrop-blur-sm border"
            style={{
              background: isDark 
                ? 'linear-gradient(to right, rgba(17, 24, 39, 0.5), rgba(127, 29, 29, 0.2))'
                : 'linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(241, 245, 249, 0.5))',
              borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(209, 213, 219, 0.5)'
            }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: isDark ? '#ffffff' : '#1f2937' }}
            >
              Explore More on GitHub
            </h3>
            <p 
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: isDark ? '#d1d5db' : '#374151' }}
            >
              Check out my GitHub profile for the complete codebase of QEvents, React component libraries, 
              and other projects. I'm always building something new with modern web technologies!
            </p>
            <a 
              href="https://github.com/adinatapranaja"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              style={{
                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                color: isDark ? '#ffffff' : '#1f2937'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? '#4b5563' : '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = isDark ? '#374151' : '#e5e7eb';
              }}
            >
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
      
      {/* Animated Waves */}
      <Waves className="h-32" variant="footer" animated={true} />
    </div>
  );
};

export default Projects;