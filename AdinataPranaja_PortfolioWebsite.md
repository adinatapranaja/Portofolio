# Portfolio Website - Adinata Alaudin Pranaja

## Deskripsi Proyek

Website portfolio modern dan interaktif yang mena## Deployment & Hosting

- **Repository**: https://github.com/adinatapranaja/OH
- **Live Demo**: https://adinata-portofolio.vercel.app
- **Build Tool**: npm run build
- **Hosting**: Vercel (Production)

### **Environment Variables Setup (Vercel)**
Untuk mengaktifkan AI Chatbot di production, perlu set environment variables di Vercel:

1. **REACT_APP_GEMINI_API_KEY**: Google Gemini API key untuk AI chatbot
2. **REACT_APP_AI_TEMPERATURE**: 0.7 (optional)
3. **REACT_APP_AI_MAX_TOKENS**: 1000 (optional)
4. **REACT_APP_AI_CACHE_TTL**: 300000 (optional)

### **Cara Set Environment Variables di Vercel:**
1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project "adinata-portofolio"
3. Go to Settings → Environment Variables
4. Add variable: REACT_APP_GEMINI_API_KEY dengan value API key
5. Redeploy project untuk apply changesn perjalanan saya sebagai Full Stack Developer dan mahasiswa Ilmu Komputer di Universitas Indonesia. Website ini dibangun dengan teknologi terkini untuk memberikan pengalaman pengguna yang optimal dan mendemonstrasikan kemampuan teknis saya.

## Fitur Utama

### 🎨 **Desain & User Interface**
- **Interactive 3D Profile Card** dengan efek tilt dan animasi gradien yang mengikuti pergerakan mouse
- **Modern UI/UX** menggunakan Tailwind CSS dengan tema gelap dan aksen warna merah
- **Responsive Design** yang dioptimalkan untuk semua perangkat (desktop, tablet, mobile)
- **Smooth Animations** menggunakan GSAP dan Lenis untuk pengalaman yang halus

### 🤖 **AI-Powered Chatbot**
- Menggunakan Google Gemini API untuk percakapan cerdas
- Pengetahuan komprehensif tentang latar belakang, keahlian, dan proyek saya
- Pemrosesan bahasa alami dalam bahasa Indonesia dan Inggris
- Real-time responses dengan indikator typing

### 📱 **ScrollStack Gallery**
- Showcase proyek dengan auto-scrolling yang mulus
- Integrasi animasi dengan Lenis
- Pause interaktif saat user melakukan scroll
- Efek stack dengan blur dan scale transitions

### 🌙 **Theme System**
- **Light/Dark Mode Toggle** dengan transisi yang mulus
- Konteks tema yang persisten menggunakan localStorage
- Responsive styling untuk kedua mode tema
- Logo dan navigasi yang adaptif

## Teknologi yang Digunakan

### **Frontend**
- **React.js** - Library JavaScript untuk membangun user interface
- **JavaScript ES6+** - Bahasa pemrograman utama
- **HTML5 & CSS3** - Markup dan styling dasar
- **Tailwind CSS** - Framework CSS utility-first untuk styling cepat

### **Navigation & State Management**
- **Custom State-Based Router** - Alternatif React Router untuk performa optimal
- **React Context API** - Manajemen state global untuk tema dan navigasi
- **localStorage** - Persistensi pengaturan user

### **Libraries & Tools**
- **Lenis** - Smooth scrolling library
- **GSAP** - Green Sock Animation Platform untuk animasi kompleks
- **Google Gemini API** - AI chatbot integration
- **Create React App** - Build tool dan development environment

### **Development & Deployment**
- **Git** - Version control system
- **GitHub** - Repository hosting dan collaboration
- **GitHub Pages/Vercel** - Platform deployment

## Arsitektur Teknis

### **Custom State-Based Navigation**
Website ini menggunakan sistem navigasi berbasis state custom alih-alih React Router V7 untuk:
- **Zero URL parsing overhead** - perpindahan halaman instan
- **Shared component persistence** - Navigation, Theme, AI Chat state tetap terjaga
- **Memory efficiency** - tidak ada mounting/unmounting cycles
- **Advanced animation control** - kontrol animasi yang lebih sophisticated

### **Performance Optimizations**
- **Lazy loading** untuk gambar
- **Hardware acceleration** untuk animasi CSS
- **Efficient state management** dengan React Context
- **Minimal bundle size** tanpa overhead routing library

### **Responsive Breakpoints**
- **Desktop**: 1920px+
- **Laptop**: 1366px - 1919px
- **Tablet**: 768px - 1365px
- **Mobile**: 320px - 767px

## Proyek yang Ditampilkan

### 1. **QEvents - Event Management System**
- Teknologi QR Code untuk check-in peserta
- Dashboard analytics real-time
- Integrasi backend Firebase
- Sistem manajemen acara komprehensif

### 2. **Bali Bike Rental System**
- Platform booking full-stack
- Integrasi sistem pembayaran
- Real-time availability tracking
- User interface yang intuitif

### 3. **Portfolio Websites**
- Desain responsive modern
- Animasi dan interaksi custom
- Optimasi performa dan SEO

## Struktur Proyek

```
src/
├── components/
│   ├── AIChat.jsx          # AI-powered chatbot
│   ├── CircularGallery.jsx # Circular project gallery
│   ├── GooeyNav.jsx        # Animated navigation
│   ├── Navigation.jsx      # Main navigation component
│   ├── ProfileCard.jsx     # Interactive 3D profile card
│   ├── ScrollStack.jsx     # Auto-scrolling project stack
│   └── SocialIcons.jsx     # Social media links
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Projects.jsx       # Gallery page
│   └── Contact.jsx        # Contact page
├── context/
│   └── ThemeContext.jsx   # Theme management
└── App.jsx                # Main app component
```

## Deployment & Hosting

- **Repository**: https://github.com/adinatapranaja/OH
- **Live Demo**: [Portfolio Website URL]
- **Build Tool**: npm run build
- **Hosting**: GitHub Pages/Vercel

## Kontribusi Teknis

Proyek ini mendemonstrasikan:
- **Advanced React patterns** dan state management
- **Custom component architecture** untuk reusability
- **Performance optimization** techniques
- **Modern CSS** dengan Tailwind dan custom animations
- **API integration** untuk AI chatbot
- **Responsive design** principles
- **Accessibility** considerations

## Kontak & Informasi

- **Email**: adinata.alaudin@ui.ac.id
- **LinkedIn**: linkedin.com/in/adinataap
- **GitHub**: github.com/adinatapranaja
- **Instagram**: @adinataapranaja

---

*Dikembangkan dengan ❤️ oleh Adinata Alaudin Pranaja - Mahasiswa Ilmu Komputer Universitas Indonesia*
