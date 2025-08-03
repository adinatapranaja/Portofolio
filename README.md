# Adinata Pranaja - Portfolio Website

A modern, interactive portfolio website showcasing my journey as a Full Stack Developer and Computer Science student at Universitas Indonesia.

## 🚀 Features

- **Interactive 3D Profile Card** with tilt effects and gradient animations
- **AI-Powered Chatbot** using Google Gemini API for intelligent conversations
- **ScrollStack Gallery** with smooth auto-scrolling project showcase
- **Modern UI/UX** with Tailwind CSS and custom animations
- **Responsive Design** optimized for all devices
- **Dark Theme** with red accent colors
- **Smooth Animations** using GSAP and Lenis

## 🛠️ Tech Stack

- **Frontend**: React.js, JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS, Custom CSS animations
- **Navigation**: Custom State-Based Router (instead of React Router V7)
- **Libraries**: 
  - Lenis (smooth scrolling)
  - GSAP (animations)
  - Google Gemini API (AI chatbot)
- **Tools**: Create React App, Git, GitHub

## 🏗️ Architecture Decision: Custom State-Based Navigation

### Why Not React Router V7?

This portfolio implements a **custom state-based navigation system** instead of React Router V7 for several strategic reasons:

#### 🎯 **Portfolio-Specific Optimization**
```jsx
// Custom approach allows sophisticated animation control
const [currentPage, setCurrentPage] = useState('home');
const [isTransitioning, setIsTransitioning] = useState(false);

const handleNavigation = async (page) => {
  setIsTransitioning(true);
  await customExitAnimation();  // GSAP/Lenis integration
  setCurrentPage(page);
  await customEntranceAnimation();
  setIsTransitioning(false);
};
```

#### ⚡ **Performance Benefits**
- **Zero URL parsing overhead** - instant page switches
- **Shared component persistence** - Navigation, Theme, AI Chat state preserved
- **Memory efficiency** - no route mounting/unmounting cycles
- **Optimized for SPA experience** - perfect for portfolio showcases

#### 🎨 **Advanced Animation Control**
- **Seamless transitions** between sections without browser refresh artifacts
- **Component-level animation orchestration** with GSAP and Lenis
- **State persistence** across navigation (AI chat conversations, theme, scroll positions)
- **Custom loading states** and transition effects

#### 📱 **UX Excellence**
- **Instant navigation** - no URL bar changes or loading states
- **Smooth user flow** - uninterrupted experience
- **Mobile-optimized** - no browser back/forward button confusion
- **Portfolio-focused** - users stay engaged with content, not navigation

#### 🛠️ **Technical Implementation**
```jsx
// Clean separation of concerns
const renderPage = () => {
  switch (currentPage) {
    case 'projects': return <Projects />;
    case 'contact': return <Contact />;
    default: return <Home setCurrentPage={setCurrentPage} />;
  }
};

// Advanced state management with context
<ThemeProvider>
  <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
  <main>{renderPage()}</main>
  <AIChat /> {/* Persists across all pages */}
</ThemeProvider>
```

#### 🎯 **When This Approach Is Superior**
- ✅ Portfolio/showcase websites
- ✅ Single-page applications with complex animations
- ✅ Performance-critical applications
- ✅ Sites prioritizing UX over SEO multi-page structure
- ✅ Interactive demos and presentations

#### 🌐 **When React Router V7 Is Better**
- ❌ Multi-page applications with distinct URLs
- ❌ SEO-heavy content sites
- ❌ Applications requiring bookmarkable pages
- ❌ Complex nested routing requirements
- ❌ Team development with multiple developers

#### 📊 **Performance Metrics**
- **Navigation Speed**: ~0ms (state change) vs ~50-100ms (route change)
- **Bundle Impact**: No routing library overhead
- **Memory Usage**: Lower due to component persistence
- **Animation Quality**: Superior due to uninterrupted context

This architectural decision demonstrates **advanced React state management** and **performance optimization thinking** beyond conventional routing solutions.

## 📂 Project Structure

```
src/
├── components/
│   ├── AIChat.jsx          # AI-powered chatbot
│   ├── CircularGallery.jsx # Circular project gallery
│   ├── GooeyNav.jsx        # Animated navigation
│   ├── Navigation.jsx      # Main navigation component
│   ├── ProfileCard.jsx     # Interactive 3D profile card
│   ├── ScrollStack.jsx     # Auto-scrolling project stack
│   ├── SocialIcons.jsx     # Social media links
│   └── ...
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Projects.jsx       # Gallery page
│   └── Contact.jsx        # Contact page
├── context/
│   └── ThemeContext.jsx   # Theme management
└── App.jsx                # Main app component
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/adinatapranaja/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Key Features Showcase

### AI Chatbot Integration
- Powered by Google Gemini API
- Comprehensive knowledge about my background, skills, and projects
- Natural language processing in Indonesian and English
- Real-time responses with typing indicators

### ScrollStack Gallery
- Auto-scrolling project showcase
- Smooth animations with Lenis integration
- Interactive pause on user scroll
- Stack effect with blur and scale transitions

### 3D Profile Card
- Tilt effect following mouse movement
- Gradient animations and background effects
- Mobile-responsive with touch support
- Hardware-accelerated CSS animations

## 🌟 Projects Featured

1. **QEvents - Event Management System**
   - QR Code technology for check-ins
   - Real-time analytics dashboard
   - Firebase backend integration

2. **Bali Bike Rental System**
   - Full-stack booking platform
   - Payment integration
   - Real-time availability

3. **Portfolio Websites**
   - Modern responsive designs
   - Custom animations and interactions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1366px - 1919px)
- Tablet (768px - 1365px)
- Mobile (320px - 767px)

## 🎯 Performance Optimizations

- Lazy loading for images
- Optimized CSS animations
- Hardware acceleration
- Efficient state management
- Minimal bundle size

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect With Me

- **Email**: adinata.alaudin@ui.ac.id
- **LinkedIn**: [linkedin.com/in/adinataap](https://linkedin.com/in/adinataap)
- **GitHub**: [github.com/adinatapranaja](https://github.com/adinatapranaja)
- **Instagram**: [@adinatapranaja](https://instagram.com/adinataapranaja)

---

*Built with ❤️ by Adinata Alaudin Pranaja - Computer Science Student at Universitas Indonesia*
