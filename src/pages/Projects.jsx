import React from 'react';
import Waves from '../components/Waves';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const Projects = () => {
  // Project data with images and descriptions
  const projectsData = [
    {
      image: "/img/Project1.jpg",
      title: "QEvents - Event Management System",
      description: "Advanced event management platform featuring QR code technology for seamless attendee check-ins, real-time analytics dashboard, Firebase authentication, and comprehensive event administration.",
      tech: ["React.js", "Firebase", "Firestore", "Firebase Auth", "QR Code API", "Real-time DB", "JavaScript", "CSS3", "HTML5", "Responsive Design", "PWA", "Event Management", "Analytics Dashboard", "User Authentication", "Cloud Functions"]
    },
    {
      image: "/img/Project2.jpg",
      title: "Purwadhika Family Meetup",
      description: "Meetup with Full Stack Web Development Purwadhika Bootcamp Alumnis!",
      tech: ["Networking"]
    },
    {
      image: "/img/Project3.jpg",
      title: "Bali Bike Rental Booking System",
      description: "Full-stack web application for bike rental bookings with real-time availability, payment integration, and user management. Features responsive design and seamless user experience.",
      tech: ["React.js", "Node.js", "MongoDB", "Payment API"]
    },
    {
      image: "/img/Project4.jpg",
      title: "Full Stack Web Development Bootcamp",
      description: "Intensive 6-month bootcamp completion at Purwadhika, mastering modern web development technologies, collaborative coding practices, and real-world project development.",
      tech: ["JavaScript", "TypeScript", "HTML", "CSS", "React.js", "Next.js", "TailwindCSS", "SEO", "NextAuth", "Supabase", "State Management", "System Security", "Code Reviews", "Git", "Node.js", "Database Design"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-red-100/20 dark:from-black dark:via-gray-900 dark:to-red-900/20 text-black dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
            My Galleria
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my development journey featuring QR Events, portfolio websites, Networking, and modern web applications. 
            Each project demonstrates my expertise in React.js, Firebase, and user-centered design principles.
          </p>
        </div>
      </div>

      {/* ScrollStack Projects Section */}
      <div className="relative">
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
                  e.target.src = "/img/Profile.jpg"; // Fallback image
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
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-gradient-to-r from-gray-900/50 to-red-900/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-2xl font-bold mb-4">Explore More on GitHub</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Check out my GitHub profile for the complete codebase of QR Events Pro, React component libraries, 
              and other projects. I'm always building something new with modern web technologies!
            </p>
            <a 
              href="https://github.com/adinatapranaja"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
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