import React, { useState } from 'react';
import Waves from '../components/Waves';
import SocialIcons from '../components/SocialIcons';
import FloatingShapes from '../components/FloatingShapes';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration from environment variables
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      
      if (!serviceID || !templateID || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check environment variables.');
      }
      
      // Log configuration for debugging
      console.log('EmailJS Config:', {
        serviceID,
        templateID,
        publicKey: publicKey ? 'Present' : 'Missing'
      });
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: formData.subject
      };

      console.log('Template Params:', templateParams);

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855l9.615-7.034h.749c.904 0 1.636.732 1.636 1.636z" fill="currentColor"/>
        </svg>
      ),
      title: 'Email',
      value: 'adinata.alaudin@ui.ac.id',
      link: 'mailto:adinata.alaudin@ui.ac.id',
      description: 'Send me an email anytime'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855l9.615-7.034h.749c.904 0 1.636.732 1.636 1.636z" fill="currentColor"/>
        </svg>
      ),
      title: 'Personal Email',
      value: 'adinataap.pranaja@gmail.com',
      link: 'mailto:adinataap.pranaja@gmail.com',
      description: 'Alternative email address'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
        </svg>
      ),
      title: 'Location',
      value: 'Depok, Indonesia',
      link: '#',
      description: 'Available for remote work & projects'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'linkedin.com/in/adinataap',
      link: 'https://linkedin.com/in/adinataap',
      description: 'Connect with me professionally'
    }
  ];

  const socialLinks = [
    { 
      icon: 'GitHub', 
      name: 'GitHub', 
      url: 'https://github.com/adinatapranaja', 
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-800/50'
    },
    { 
      icon: 'LinkedIn', 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/adinataap', 
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-900/30'
    },
    { 
      icon: 'Twitter', 
      name: 'Twitter', 
      url: 'https://twitter.com/', 
      color: 'hover:text-cyan-400',
      bgColor: 'hover:bg-cyan-900/30'
    },
    { 
      icon: 'Instagram', 
      name: 'Instagram', 
      url: 'https://instagram.com/adinatapranaja', 
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-900/30'
    },
    { 
      icon: 'YouTube', 
      name: 'YouTube', 
      url: 'https://youtube.com/', 
      color: 'hover:text-red-400',
      bgColor: 'hover:bg-red-900/30'
    },
    { 
      icon: 'Discord', 
      name: 'Discord', 
      url: 'https://discord.gg/adinataap_', 
      color: 'hover:text-purple-400',
      bgColor: 'hover:bg-purple-900/30'
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
      color: isDark ? '#ffffff' : '#1e293b',
      paddingTop: '6rem'
    }}>
      {/* Background Pattern */}
      <div style={{
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: 'none'
      }}></div>
      
      {/* Floating 3D Shapes */}
      <FloatingShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark 
                ? 'linear-gradient(to right, #ffffff, #ef4444)'
                : 'linear-gradient(to right, #1f2937, #dc2626)'
            }}
          >
            Get In Touch
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#d1d5db' : '#475569' }}
          >
            Have a project in mind or just want to chat about technology? 
            I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 
                className="text-3xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark 
                    ? 'linear-gradient(to right, #ffffff, #ef4444)'
                    : 'linear-gradient(to right, #1f2937, #dc2626)'
                }}
              >
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 group backdrop-blur-sm"
                    style={{
                      backgroundColor: isDark ? 'rgba(17, 24, 39, 0.3)' : 'rgba(248, 250, 252, 0.6)',
                      borderColor: isDark ? '#374151' : '#d1d5db'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = isDark ? 'rgba(239, 68, 68, 0.5)' : 'rgba(220, 38, 38, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = isDark ? '#374151' : '#d1d5db';
                    }}
                  >
                    <div 
                      className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0 w-12 h-12 flex items-center justify-center"
                      style={{ color: isDark ? '#ef4444' : '#dc2626' }}
                    >
                      <div className="w-6 h-6">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 
                        className="font-semibold text-lg transition-colors"
                        style={{ 
                          color: isDark ? '#ffffff' : '#1f2937'
                        }}
                      >
                        {info.title}
                      </h3>
                      <p 
                        className="transition-colors"
                        style={{ color: isDark ? '#d1d5db' : '#374151' }}
                      >
                        {info.value}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
                        {info.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 
                className="text-2xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark 
                    ? 'linear-gradient(to right, #ffffff, #ef4444)'
                    : 'linear-gradient(to right, #1f2937, #dc2626)'
                }}
              >
                Follow Me
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = SocialIcons[social.icon];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`cursor-target flex flex-col items-center p-4 rounded-lg border transition-all duration-300 group backdrop-blur-sm ${social.color} ${social.bgColor}`}
                      style={{
                        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.3)' : 'rgba(248, 250, 252, 0.6)',
                        borderColor: isDark ? '#374151' : '#d1d5db'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = isDark ? 'rgba(239, 68, 68, 0.5)' : 'rgba(220, 38, 38, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = isDark ? '#374151' : '#d1d5db';
                      }}
                    >
                      <div 
                        className="mb-2 group-hover:scale-110 transition-transform duration-300"
                        style={{ color: isDark ? '#d1d5db' : '#374151' }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                      >
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div 
              className="rounded-lg p-6 border"
              style={{
                background: isDark 
                  ? 'linear-gradient(to right, rgba(34, 197, 94, 0.1), rgba(21, 128, 61, 0.1))'
                  : 'linear-gradient(to right, rgba(187, 247, 208, 0.5), rgba(167, 243, 208, 0.3))',
                borderColor: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.5)'
              }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: isDark ? '#4ade80' : '#16a34a' }}
                >
                  Currently Available
                </h3>
              </div>
              <p 
                style={{ color: isDark ? '#d1d5db' : '#374151' }}
              >
                I'm currently open to new opportunities and interesting projects. 
                Feel free to reach out if you'd like to work together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="rounded-lg p-8 border backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? 'rgba(17, 24, 39, 0.3)' : 'rgba(248, 250, 252, 0.6)',
              borderColor: isDark ? '#374151' : '#d1d5db'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: isDark ? '#ffffff' : '#1f2937' }}
            >
              Send Message
            </h2>
            
            {submitStatus === 'success' && (
              <div 
                className="mb-6 p-4 border rounded-lg"
                style={{
                  backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(187, 247, 208, 0.3)',
                  borderColor: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.5)'
                }}
              >
                <div className="flex items-center space-x-2">
                  <span 
                    style={{ color: isDark ? '#4ade80' : '#16a34a' }}
                  >✅</span>
                  <span 
                    style={{ color: isDark ? '#4ade80' : '#15803d' }}
                  >Message sent successfully! I'll get back to you soon.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div 
                className="mb-6 p-4 border rounded-lg"
                style={{
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(254, 226, 226, 0.5)',
                  borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.5)'
                }}
              >
                <div className="flex items-center space-x-2">
                  <span 
                    style={{ color: isDark ? '#f87171' : '#dc2626' }}
                  >❌</span>
                  <span 
                    style={{ color: isDark ? '#f87171' : '#b91c1c' }}
                  >Failed to send message. Please try again or contact me directly.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#6b7280' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = isDark ? '#ef4444' : '#dc2626';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark ? '#6b7280' : '#d1d5db';
                  }}
                  placeholder="Nama Lengkap"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#6b7280' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = isDark ? '#ef4444' : '#dc2626';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark ? '#6b7280' : '#d1d5db';
                  }}
                  placeholder="Email Anda"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#6b7280' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = isDark ? '#ef4444' : '#dc2626';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark ? '#6b7280' : '#d1d5db';
                  }}
                  placeholder="Topik diskusi"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    borderColor: isDark ? '#6b7280' : '#d1d5db',
                    color: isDark ? '#ffffff' : '#1f2937'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = isDark ? '#ef4444' : '#dc2626';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark ? '#6b7280' : '#d1d5db';
                  }}
                  placeholder="Ceritakan tentang proyek Anda atau sekedar menyapa..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform"
                style={{
                  backgroundColor: (isSubmitting || !formData.name || !formData.email || !formData.message)
                    ? (isDark ? '#6b7280' : '#9ca3af')
                    : (isDark ? '#dc2626' : '#dc2626'),
                  color: '#ffffff',
                  cursor: (isSubmitting || !formData.name || !formData.email || !formData.message) ? 'not-allowed' : 'pointer',
                  opacity: (isSubmitting || !formData.name || !formData.email || !formData.message) ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!(isSubmitting || !formData.name || !formData.email || !formData.message)) {
                    e.target.style.backgroundColor = isDark ? '#b91c1c' : '#b91c1c';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(isSubmitting || !formData.name || !formData.email || !formData.message)) {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Form responses will be sent to my email. I'll get back to you within 24 hours!</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your response time?",
                answer: "I typically respond to emails within 24 hours during weekdays. For urgent matters, feel free to call or send a message on LinkedIn."
              },
              {
                question: "Do you work on weekends?",
                answer: "While I prefer to maintain work-life balance, I'm flexible for urgent projects and deadlines. We can discuss availability based on project needs."
              },
              {
                question: "What's your preferred communication method?",
                answer: "Email is great for detailed discussions, but I'm also available on LinkedIn, Discord, and video calls for more complex conversations."
              },
              {
                question: "Are you available for freelance work?",
                answer: "Yes! I'm open to freelance projects, especially those involving React, Node.js, and modern web technologies. Let's discuss your project requirements."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-200/30 dark:bg-gray-900/30 rounded-lg p-6 border border-gray-300 dark:border-gray-700 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3 text-red-500 dark:text-red-400">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Animated Waves */}
      <Waves className="h-32 mt-16" variant="footer" animated={true} />
    </div>
  );
};

export default Contact;