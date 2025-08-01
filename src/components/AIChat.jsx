import React, { useState, useEffect, useRef } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! 👋 Saya AI assistant untuk **Adinata Alaudin Pranaja** yang powered by Google Gemini! Ada yang ingin kamu ketahui tentang Full Stack Developer mahasiswa UI ini?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
      quickReplies: ['Profil Adinata', 'QR Events Pro Project', 'Technical Skills', 'Contact Info']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState('ready');
  // eslint-disable-next-line no-unused-vars
  const [conversationContext, setConversationContext] = useState({
    currentTopic: null,
    previousQuestions: [],
    userPreferences: {},
    conversationFlow: []
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const responseCache = useRef(new Map());

  // FREE Gemini API Configuration
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Advanced System Prompt for Gemini API
  const getSystemPrompt = () => `
Kamu adalah AI assistant untuk portfolio Adinata Alaudin Pranaja, seorang Full Stack Developer dari Depok, Indonesia.

INFORMASI LENGKAP TENTANG ADINATA:

👤 PROFIL PERSONAL:
- Nama Lengkap: Adinata Alaudin Pranaja
- Profesi: Full Stack Developer / Frontend Specialist / Backend Engineer
- Lokasi: Depok, Indonesia  
- Tagline: "Crafting digital experiences with code and creativity"
- Status: Available untuk new opportunities (Remote/Project-based)

🎓 PENDIDIKAN & BACKGROUND:
- Mahasiswa S1 Computer Science, Universitas Indonesia (2020-present)
- Fokus: Software Engineering & Web Development, Data Science
- Bootcamp: Purwadhika Full Stack Web Development (6 bulan, 2023)
- Curriculum: HTML/CSS, React JS, Next JS, SEO Fundamental, NextAuth & Supabase, State Management, System Security, Writing Robust Code, Code Reviews, Task Scheduling, Application Deployment

💻 TECHNICAL SKILLS & EXPERTISE:

Frontend Skills (Expert Level):
- Programming Languages: JavaScript, TypeScript, HTML5, CSS3
- Frameworks/Libraries: React.js (1 year expert), Next.js, Vue.js
- CSS Frameworks: TailwindCSS (1 year advanced), Styled Components  
- State Management: Redux, Context API
- Build Tools: Webpack, Vite
- Testing: Jest, React Testing Library

Backend Skills (Intermediate Level):
- Languages: Node.js (1 year), Python, Laravel, PHP
- Frameworks: Express.js, Fastify, Django, Flask
- Databases: MongoDB, PostgreSQL, MySQL
- APIs: RESTful, GraphQL, WebSocket  
- Authentication: JWT, OAuth, Passport.js, Firebase Authentication
- Cloud Services: AWS, GCP, Azure, Firebase

DevOps & Tools:
- Version Control: Git, GitHub, GitLab
- Containerization: Docker
- CI/CD: GitHub Actions, Jenkins, GitLab CI  
- Deployment: Firebase, Vercel, Netlify
- Monitoring: Sentry, LogRocket

Design & UI/UX:
- Design Tools: Figma
- Prototyping: InVision  
- Animation: GSAP, Framer Motion
- 3D: Three.js

Experience Highlights:
- React.js: Expert (1 year) - Hooks, Context, Performance optimization, Custom hooks, Redux state management
- Node.js: Intermediate (1 year) - RESTful API development, Authentication & authorization, Database integration  
- TailwindCSS: Advanced (1 year) - Responsive design expert, Custom components, Design systems

🚀 FEATURED PROJECT:

**QR Event Management System "QR Events Pro"** (Solo Project - 4 months)

Deskripsi: Modern web application untuk manajemen event dengan sistem QR code terintegrasi untuk check-in otomatis dan tracking real-time attendance.

Problem Statement: Event organizers kesulitan melakukan tracking attendance yang akurat dan efisien. Sistem manual check-in memakan waktu lama, prone to error, dan tidak memberikan insights real-time untuk manajemen event yang optimal.

Solution: Full-stack web application dengan QR code generation system, real-time scanner, dan comprehensive analytics dashboard. Implementasi encryption untuk security dan real-time updates untuk monitoring attendance.

Tech Stack:
- Frontend: React.js, Tailwind CSS, Lucide React Icons
- Backend: Firebase (Firestore, Authentication, Hosting)  
- QR Processing: QR Scanner library dengan camera integration
- Security: AES encryption, HMAC validation
- Real-time: Firebase real-time database listeners
- Styling: Modern glassmorphism design dengan elegant UI/UX

Key Features:
• Smart QR Generation - Generate encrypted QR codes dengan expiration controls
• Secure Validation - AES encryption dengan HMAC untuk single-use codes  
• Real-time Scanner - Camera-based scanning dengan instant validation
• Complete Guest Lifecycle - Registration hingga check-in tracking
• Bulk Import/Export - CSV support untuk guest list management
• Real-time Dashboard - Live attendance monitoring
• Comprehensive Reports - Export dalam multiple formats (CSV, PDF)
• Multi-role System - Owner, Admin, Client dengan different permissions
• Mobile-first Approach - Optimized untuk scanner mobile usage

Technical Achievements:
• 99.9% Scanner Accuracy - Reliable QR detection across different devices
• Real-time Performance - Instant updates dengan Firebase integration  
• Security Standards - Implemented industry-standard encryption methods
• Mobile Optimization - Seamless experience across desktop dan mobile platforms

Key Challenges Solved:
• QR Code Security - Implemented AES encryption dan single-use token system
• Real-time Performance - Firebase real-time listeners untuk instant updates
• Mobile Scanner Optimization - Cross-browser camera compatibility
• Complex State Management - React Context dan custom hooks architecture

Learning Outcomes:
• QR Code Technology - Understanding QR generation, scanning, dan security
• Firebase Integration - Real-time database, authentication, hosting
• Advanced React Patterns - Context API, custom hooks, performance optimization
• Security Implementation - Encryption, validation, secure data handling
• Camera API Integration - Browser camera untuk scanning functionality

Demo: Contact untuk live demo dan detailed case study

Other Projects:
1. Portfolio Website (Modern Style) - React, TailwindCSS, GSAP, OGL
2. Task Management App - React, Socket.io, Express, PostgreSQL  
3. Real Estate Platform - React, Node.js, MongoDB, Maps API

🎯 CAREER GOALS & MOTIVASI:

Current Status: Actively seeking Full Stack Developer opportunities

Short-term Goals (6-12 bulan):
• Master React Native untuk mobile development
• Learn DevOps tools (Docker, Kubernetes)  
• Contribute to 3+ open source projects
• Land role di tech startup atau established company

Long-term Vision (2-3 tahun):
• Become Senior Full Stack Developer
• Lead development team
• Build meaningful products yang impact lives
• Mentor junior developers
• Start tech community di Indonesia

What Drives Me: "Passionate about creating digital solutions that solve real-world problems. Every line of code is an opportunity to make someone's life easier."

💭 PERSONALITY & WORK STYLE:

Personality:
• Problem solver yang suka challenge dan kompleksitas
• Detail-oriented tapi bisa see the big picture  
• Always eager to learn dan stay updated dengan tech trends
• Collaborative - suka sharing knowledge dan help others

Work Style:
• Prefer hands-on learning over theoretical
• Thrive dalam team environment tapi bisa work independently
• Like structured approach tapi flexible untuk adaptation
• Value clean code dan best practices

Values:
• Code quality over quick fixes
• Continuous learning dan improvement  
• Knowledge sharing dengan community
• Building products yang meaningful

📞 CONTACT & AVAILABILITY:

Professional Contact:
📧 Email: adinata.alaudin@ui.ac.id / adinataap.pranaja@gmail.com
💼 LinkedIn: linkedin.com/in/adinataap
🐱 GitHub: github.com/adinatapranaja
🌐 Portfolio: [Portfolio sedang dalam pengembangan]
📱 WhatsApp: [Contact via email untuk koordinasi]

Availability:
⏰ Timezone: WIB (GMT+7)
💬 Response Time: 24 hours untuk email, 2-4 hours untuk urgent messages
📅 Available: Monday-Friday 9AM-6PM, flexible untuk project deadlines
🎯 Current Status: Available untuk new opportunities (Remote/Project-based)

🎨 UNIQUE VALUE PROPOSITION:

What Makes Adinata Different:
• Full Stack Developer dengan strong design sense
• Experience dalam fast-paced startup environment  
• Proven track record building scalable applications
• Passionate about performance optimization dan user experience
• Bridge between technical dan business requirements

💡 CURRENT LEARNING & TECH TRENDS:

Currently Learning:
🎯 React Native - Building mobile app untuk side project
🧠 AI Integration - Exploring OpenAI API untuk web applications
☁️ AWS DevOps - Preparing untuk Solutions Architect certification  
📱 Three.js - Adding 3D elements to portfolio projects

Tech Philosophy:
• "Choose the right tool for the job, not the trendy one"
• Clean, maintainable code > clever solutions
• User experience should drive technical decisions
• Always learning, technology evolves rapidly

Current Tech Stack Preferences:
• Frontend: React + TypeScript + TailwindCSS
• Backend: Node.js + Express
• Deployment: Vercel + Netlify + Firebase + GitHub Actions
• Design: Figma

INSTRUKSI RESPONSE:
1. Jawab dalam bahasa Indonesia yang natural dan friendly
2. Gunakan emoji untuk expressiveness (jangan berlebihan)
3. Maintain enthusiastic but professional tone
4. Jika tidak tahu detail spesifik, suggest contact langsung dengan Adinata
5. Offer follow-up questions atau suggestions
6. Jangan buat informasi yang tidak ada dalam knowledge base
7. Be helpful, engaging, dan informative
8. Gunakan format yang rapi dengan **bold** untuk emphasis
9. Fokus pada skills, projects, dan experience yang sudah dijelaskan
10. Highlight QR Events Pro sebagai featured project utama
11. Tekankan bahwa Adinata currently available untuk opportunities

Contoh tone: "Wah menarik! Adinata memang specialist di React.js dengan 1 tahun experience..."

IMPORTANT NOTES:
- Adinata adalah mahasiswa UI Computer Science dan Purwadhika bootcamp
- QR Events Pro adalah project unggulan dengan tech stack Firebase + React
- Currently available untuk remote work dan project-based opportunities
- Expertise di React.js, Node.js, Firebase, dan modern web development
- Strong focus pada user experience dan performance optimization
`;

  // FREE Gemini API Call with Enhanced Error Handling and Retry
  const callGeminiAPI = async (userMessage, retryCount = 0) => {
    const maxRetries = 1; // Reduced retries for overloaded API
    if (!GEMINI_API_KEY) {
      console.warn('❌ Gemini API key not found');
      setApiStatus('error');
      throw new Error('Setup Required: Missing API key. Please add REACT_APP_GEMINI_API_KEY to your environment variables.');
    }

    try {
      console.log('🚀 Calling Gemini API with key:', GEMINI_API_KEY ? 'Present' : 'Missing');
      setApiStatus('calling');
      
      const systemPrompt = getSystemPrompt();
      const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds - more reasonable

      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: parseFloat(process.env.REACT_APP_AI_TEMPERATURE) || 0.7,
            maxOutputTokens: parseInt(process.env.REACT_APP_AI_MAX_TOKENS) || 1000,
            topP: 0.8,
            topK: 40
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Gemini API Error:', response.status, errorData);
        
        if (response.status === 429) {
          throw new Error('Rate limit reached. Please wait a moment before trying again.');
        } else if (response.status === 403) {
          throw new Error('API access denied. Please check your API key.');
        } else if (response.status === 400) {
          throw new Error('API_KEY_EXPIRED'); // Special error code for expired key
        } else if (response.status === 503) {
          throw new Error('API_OVERLOADED'); // Special error code for fallback
        } else {
          throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('❌ Invalid response structure:', data);
        throw new Error('Invalid response from Gemini API');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      if (!generatedText || generatedText.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }

      setApiStatus('success');
      return generatedText.trim();

    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      setApiStatus('error');
      
      if (error.name === 'AbortError') {
        // Retry on timeout if retries available
        if (retryCount < maxRetries) {
          console.log(`🔄 Retrying API call (${retryCount + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
          return callGeminiAPI(userMessage, retryCount + 1);
        }
        throw new Error('Request timeout after retries. Please try again.');
      }
      
      // Don't retry for expired API key - immediate fallback
      if (error.message === 'API_KEY_EXPIRED') {
        throw error;
      }
      
      // Retry on network errors or API overload
      if ((error.message.includes('fetch') || error.message.includes('network') || error.message === 'API_OVERLOADED') && retryCount < maxRetries) {
        const delayMs = error.message === 'API_OVERLOADED' ? 5000 * (retryCount + 1) : 2000 * (retryCount + 1); // Longer delay for overload
        console.log(`🔄 Retrying API call due to ${error.message === 'API_OVERLOADED' ? 'API overload' : 'network error'} (${retryCount + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        return callGeminiAPI(userMessage, retryCount + 1);
      }
      
      throw error;
    }
  };

  // Enhanced Fallback System (jika API gagal)
  const getSmartFallback = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Greeting detection dengan berbagai variasi
    if (lowerMessage.match(/\b(halo|hai|hello|hi|selamat|assalamualaikum|morning|siang|malam)\b/)) {
      const greetings = [
        "Halo! 👋 Saya AI Assistant untuk **Adinata Alaudin Pranaja**. Meskipun sedang offline mode, saya tetap bisa bantu jelasin tentang Full Stack Developer mahasiswa UI ini!",
        "Hai there! 😊 Senang ketemu kamu! Google Gemini lagi overloaded nih, tapi saya punya comprehensive knowledge tentang Adinata - CS UI student & Purwadhika graduate!",
        "Hello! Saya assistant Adinata. API sedang busy, tapi no worries! Saya bisa kasih info lengkap tentang QR Events Pro project, technical skills, atau cara contact dia! 🚀"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Identity & Profile
    if (lowerMessage.match(/\b(siapa|nama|tentang|profil|biodata|introduce|introduction)\b/)) {
      return `**Adinata Alaudin Pranaja** adalah Full Stack Developer dari Depok yang passionate tentang creating digital solutions! 🚀

🎓 **Background:** 
- Mahasiswa S1 Computer Science, Universitas Indonesia (2020-present)
- Purwadhika Full Stack Web Development Bootcamp Graduate (2023)
- Fokus: Software Engineering, Web Development, Data Science

💻 **Expertise:** React.js (1 year expert), Node.js, Firebase, TailwindCSS
🎯 **Tagline:** "Crafting digital experiences with code and creativity"
🌟 **Personality:** Problem solver, detail-oriented, always eager to learn
📍 **Status:** Available untuk new opportunities (Remote/Project-based)

Dia selalu excited untuk discuss tentang tech trends dan collaborate di project-project menarik! Mau tahu lebih detail tentang aspect tertentu?`;
    }
    
    // Skills & Technical
    if (lowerMessage.match(/\b(skill|keahlian|teknologi|tech stack|programming|coding|bahasa pemrograman|expertise)\b/)) {
      return `Adinata menguasai tech stack modern yang powerful! 💪

🎨 **Frontend Mastery (Expert Level):**
- React.js (1 year) - Hooks, Context, Performance optimization, Custom hooks, Redux
- TailwindCSS (1 year advanced) - Responsive design, custom components, design systems
- JavaScript & TypeScript - Modern ES6+, async/await patterns

⚙️ **Backend Expertise (Intermediate Level):**
- Node.js (1 year) - RESTful API development, Authentication & authorization 
- Express.js, Python, Laravel, PHP
- MongoDB, PostgreSQL, MySQL - Database design & integration
- Firebase - Real-time database, authentication, hosting

🛠️ **Development Tools:**
- Git, GitHub, GitLab version control
- Docker containerization  
- Firebase, Vercel, Netlify deployment
- Figma design, GSAP animation

📚 **Currently Learning:** React Native, AI Integration, AWS DevOps, Three.js

Dari Purwadhika bootcamp, dia dapat solid foundation dalam modern web development. Ingin tahu pengalaman dia dengan teknologi tertentu?`;
    }
    
    // Projects
    if (lowerMessage.match(/\b(project|proyek|portfolio|aplikasi|website|app|application)\b/)) {
      return `Adinata punya portfolio projects yang impressive! ✨

🏆 **QR Event Management System "QR Events Pro"** (Featured Project)
- Modern web app untuk event management dengan QR code integration
- Tech: React.js + Firebase + Tailwind CSS
- Features: Real-time scanner, encrypted QR codes, analytics dashboard
- 4 bulan solo project dengan glassmorphism design
- 99.9% scanner accuracy, mobile-optimized
- Security: AES encryption, HMAC validation

🎨 **Other Projects:**
- Portfolio Website (Modern Style) - React + TailwindCSS + GSAP + OGL
- Task Management App - React + Socket.io + Express + PostgreSQL  
- Real Estate Platform - React + Node.js + MongoDB + Maps API

**Key Achievements:**
- Implemented real-time features dengan Firebase
- Advanced React patterns dengan performance optimization
- Security-first approach dengan encryption standards
- Mobile-first responsive design

Contact Adinata untuk live demo dan detailed case study! Mau tahu detail spesifik project mana?`;
    }
    
    // Contact & Communication
    if (lowerMessage.match(/\b(kontak|contact|hubungi|email|telepon|reach|communicate)\b/)) {
      return `Kamu bisa reach out ke Adinata melalui berbagai channel! 📞

📧 **Email:** 
- adinata.alaudin@ui.ac.id  
- adinataap.pranaja@gmail.com

💼 **LinkedIn:** linkedin.com/in/adinataap
🐱 **GitHub:** github.com/adinatapranaja  
🌍 **Timezone:** WIB (GMT+7)
📅 **Availability:** Monday-Friday 9AM-6PM, flexible untuk project deadlines
🎯 **Status:** Available untuk new opportunities (Remote/Project-based)

💬 **Response Time:** 
- Email: 24 hours  
- Urgent messages: 2-4 hours

Adinata always welcome untuk:
- Tech discussions & knowledge sharing
- Project collaborations & opportunities
- Freelance projects
- Mentoring sessions

Contact sekarang juga untuk discuss opportunities! 🚀`;
    }
    
    // Career & Goals
    if (lowerMessage.match(/\b(karir|career|goals|target|motivasi|motivation|future|masa depan)\b/)) {
      return `Adinata punya vision yang jelas untuk karir development dia! 🎯

**Current Status:** Actively seeking Full Stack Developer opportunities

**Short-term Goals (6-12 bulan):**
• Master React Native untuk mobile development
• Learn DevOps tools (Docker, Kubernetes)
• Contribute to 3+ open source projects  
• Land role di tech startup atau established company

**Long-term Vision (2-3 tahun):**
• Become Senior Full Stack Developer
• Lead development team
• Build meaningful products yang impact lives
• Mentor junior developers
• Start tech community di Indonesia

**What Drives Him:**
"Passionate about creating digital solutions that solve real-world problems. Every line of code is an opportunity to make someone's life easier."

**Learning Philosophy:**
• "Choose the right tool for the job, not the trendy one"
• Clean, maintainable code > clever solutions
• User experience should drive technical decisions
• Always learning, technology evolves rapidly

As CS UI student & Purwadhika graduate, dia bring academic foundation + practical bootcamp experience. Perfect combination untuk tackle modern web development challenges! 🚀`;
    }
    
    // Default smart response
    const defaultResponses = [
      "Pertanyaan yang menarik! 🤔 Saya belum punya info yang spesifik tentang itu, tapi Adinata pasti bisa kasih jawaban yang lebih detail. Coba contact dia langsung ya!",
      "Hmm, untuk info yang lebih comprehensive tentang hal itu, better langsung reach out ke Adinata! Dia always responsive dan senang sharing. 😊",
      "Great question! Untuk detail yang lebih akurat, saya recommend contact Adinata directly. Atau coba tanya tentang skills, projects, atau background dia yang lain?"
    ];
    
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    const suggestions = "\n\n💬 **Try asking about:**\n- QR Events Pro project details\n- Technical skills & experience\n- Learning journey & career goals\n- Contact info & availability";
    
    return randomResponse + suggestions;
  };

  // Enhanced Cache Management
  const getCachedResponse = (normalizedQuery) => {
    const cached = responseCache.current.get(normalizedQuery);
    const cacheTimeout = parseInt(process.env.REACT_APP_AI_CACHE_TTL) || 300000; // 5 minutes default
    
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      console.log('✅ Using cached response for:', normalizedQuery.substring(0, 50));
      return cached.response;
    }
    return null;
  };

  const setCachedResponse = (normalizedQuery, response) => {
    const maxCacheSize = parseInt(process.env.REACT_APP_AI_CACHE_MAX_SIZE) || 50;
    
    if (responseCache.current.size >= maxCacheSize) {
      const firstKey = responseCache.current.keys().next().value;
      responseCache.current.delete(firstKey);
    }
    
    responseCache.current.set(normalizedQuery, {
      response,
      timestamp: Date.now()
    });
    
    console.log('💾 Cached response for:', normalizedQuery.substring(0, 50));
  };

  // Enhanced Message Processing
  const processUserMessage = async (message) => {
    const normalizedQuery = message.toLowerCase().trim();
    
    // Check cache first
    const cachedResponse = getCachedResponse(normalizedQuery);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      previousQuestions: [...prev.previousQuestions.slice(-4), normalizedQuery],
      conversationFlow: [...prev.conversationFlow, { type: 'user', content: message, timestamp: Date.now() }]
    }));

    try {
      const response = await callGeminiAPI(message);
      setCachedResponse(normalizedQuery, response);
      
      // Update context with AI response
      setConversationContext(prev => ({
        ...prev,
        conversationFlow: [...prev.conversationFlow, { type: 'ai', content: response, timestamp: Date.now() }]
      }));
      
      return response;
    } catch (error) {
      console.error('❌ API Error:', error);
      
      const fallbackResponse = getSmartFallback(message);
      
      let errorNote;
      if (error.message === 'API_KEY_EXPIRED') {
        errorNote = '\n\n⚠️ **Note:** API key has expired. Using comprehensive offline knowledge base.';
      } else if (error.message === 'API_OVERLOADED') {
        errorNote = '\n\n⚠️ **Note:** Gemini API is currently overloaded. Using smart offline responses.';
      } else if (error.message.includes('Setup Required')) {
        errorNote = '\n\n⚠️ **Note:** AI features require setup. Currently using offline mode.';
      } else if (error.message.includes('timeout')) {
        errorNote = '\n\n⚠️ **Note:** API timeout. Using offline mode for faster response.';
      } else {
        errorNote = '\n\n⚠️ **Note:** Using offline mode due to temporary API issue.';
      }
      
      return `${fallbackResponse}${errorNote}`;
    }
  };

  // Enhanced Send Message Function
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      const aiResponse = await processUserMessage(userMessage);
      
      // Add AI response with typing effect
      setTimeout(() => {
        const newAIMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          quickReplies: getContextualQuickReplies(userMessage)
        };
        
        setMessages(prev => [...prev, newAIMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay for natural feel
      
    } catch (error) {
      console.error('❌ Message processing error:', error);
      setIsTyping(false);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: getSmartFallback(userMessage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Contextual Quick Replies
  const getContextualQuickReplies = (lastMessage) => {
    const lower = lastMessage.toLowerCase();
    
    if (lower.includes('project') || lower.includes('qr')) {
      return ['Tech Stack QR Events', 'Challenges & Solutions', 'Demo Access', 'Other Projects'];
    }
    
    if (lower.includes('skill') || lower.includes('tekno')) {
      return ['Frontend Skills', 'Backend Experience', 'Tools & DevOps', 'Learning Path'];
    }
    
    if (lower.includes('contact') || lower.includes('hire')) {
      return ['Email Contact', 'LinkedIn Profile', 'GitHub Projects', 'Availability'];
    }
    
    if (lower.includes('career') || lower.includes('goal')) {
      return ['Short-term Goals', 'Learning Plans', 'Ideal Role', 'Tech Stack'];
    }
    
    return ['QR Events Pro', 'Technical Skills', 'Contact Info', 'Career Goals'];
  };

  // Quick Reply Handler
  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => sendMessage(), 100);
  };

  // Keyboard Event Handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Status indicator
  const getStatusIndicator = () => {
    switch (apiStatus) {
      case 'success':
        return { color: 'text-green-400', text: 'Powered by Gemini AI!' };
      case 'calling':
        return { color: 'text-yellow-400', text: 'Thinking...' };
      case 'error':
        return { color: 'text-red-400', text: 'Offline Mode' };
      default:
        return { color: 'text-blue-400', text: 'Ready to Chat!' };
    }
  };

  const statusInfo = getStatusIndicator();

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md h-[70vh] flex flex-col pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Adinata's AI Assistant</div>
                  <div className={`text-xs ${statusInfo.color}`}>
                    {apiStatus === 'success' && '🟢 AI Online'}
                    {apiStatus === 'error' && '🟡 Smart Offline Mode'}
                    {apiStatus === 'loading' && '🔄 Connecting...'}
                    {!apiStatus && statusInfo.text}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                      __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                    
                    {/* Quick Replies */}
                    {message.quickReplies && message.sender === 'ai' && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors border border-white/20"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanya tentang Adinata..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-full p-2 transition-colors disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 z-50 ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {/* Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 w-16 h-16 pointer-events-none">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
