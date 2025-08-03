import React, { useState } from 'react';
import Waves from '../components/Waves';
import SocialIcons from '../components/SocialIcons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'adinata.alaudin@ui.ac.id',
      link: 'mailto:adinata.alaudin@ui.ac.id',
      description: 'Send me an email anytime'
    },
    {
      icon: '�',
      title: 'Personal Email',
      value: 'adinataap.pranaja@gmail.com',
      link: 'mailto:adinataap.pranaja@gmail.com',
      description: 'Alternative email address'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Depok, Indonesia',
      link: '#',
      description: 'Available for remote work & projects'
    },
    {
      icon: '💼',
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
      url: 'https://instagram.com/adinataapranaja', 
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-red-100/20 dark:from-black dark:via-gray-900 dark:to-red-900/20 text-black dark:text-white pt-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat about technology? 
            I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-4 p-4 bg-gray-200/30 dark:bg-gray-900/30 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-red-500/50 transition-all duration-300 group backdrop-blur-sm"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        {info.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-red-500 bg-clip-text text-transparent">
                Follow Me
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = SocialIcons[social.icon];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`cursor-target flex flex-col items-center p-4 bg-gray-200/30 dark:bg-gray-900/30 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-red-500/50 transition-all duration-300 group backdrop-blur-sm ${social.color} ${social.bgColor}`}
                    >
                      <div className="text-gray-700 dark:text-gray-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-6 border border-green-600/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-green-400">Currently Available</h3>
              </div>
              <p className="text-gray-300">
                I'm currently open to new opportunities and interesting projects. 
                Feel free to reach out if you'd like to work together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-200/30 dark:bg-gray-900/30 rounded-lg p-8 border border-gray-300 dark:border-gray-700 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Send Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-600/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-red-500 focus:outline-none transition-colors placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                  placeholder="Nama Lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-red-500 focus:outline-none transition-colors placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                  placeholder="Email Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none transition-colors placeholder-gray-400"
                  placeholder="Topik diskusi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none placeholder-gray-400"
                  placeholder="Ceritakan tentang proyek Anda atau sekedar menyapa..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className={`
                  w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform
                  ${isSubmitting || !formData.name || !formData.email || !formData.message
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-red-600 hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-red-600/25'
                  }
                `}
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
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Form responses will be sent to my email. I'll get back to you within 24 hours!</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
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
              <div key={index} className="bg-gray-900/30 rounded-lg p-6 border border-gray-700 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-3 text-red-400">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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