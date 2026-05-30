# 🎯 InterviewAI Pro

<div align="center">

![InterviewAI Pro Banner](https://img.shields.io/badge/InterviewAI-Pro-blue?style=for-the-badge&logo=react)

**AI-Powered Mock Interview Platform for Technical Professionals**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

---

## 🚀 Overview

**InterviewAI Pro** is a cutting-edge interview practice platform that leverages artificial intelligence to help job seekers master their interview skills. With real-time feedback, speech recognition, facial expression analysis, and personalized question generation, candidates can practice interviews in a realistic, pressure-free environment.

### 🎥 Demo

> *Add screenshots or demo video here*

---

## ✨ Features

### 🤖 **AI-Powered Intelligence**
- **Smart Question Generation**: Resume-based personalized interview questions tailored to your experience and target role
- **Real-time Speech Recognition**: Advanced speech-to-text with filler word detection and communication scoring
- **Text-to-Speech AI Interviewer**: Natural voice synthesis for realistic interview simulation
- **Answer Evaluation**: AI-powered feedback on answer quality, relevance, and clarity

### 🎥 **Immersive Interview Experience**
- **Split-Screen Video Layout**: Realistic Zoom/Teams-style interview interface
- **Facial Expression Analysis**: Real-time confidence and emotion detection
- **Live Timer & Progress Tracking**: Monitor your response time and interview progress
- **Recording & Playback**: Review your performance after each session

### 📊 **Performance Analytics**
- **Detailed Insights Dashboard**: Track improvement over time with visual charts
- **Skill Assessment**: Identify weak areas and get targeted improvement suggestions
- **Interview History**: Access past sessions and compare performance metrics
- **Scoring System**: Comprehensive evaluation across multiple dimensions

### 🎯 **Industry-Specific Preparation**
- **Multiple Role Types**: Software Engineer, Data Scientist, Product Manager, Frontend, Backend, Full Stack
- **Question Categories**: Technical, Behavioral, Situational, and Experience-based questions
- **Difficulty Levels**: Easy, Medium, and Hard questions to match your preparation stage
- **Custom Question Banks**: Extensive library of real interview questions from top companies

---

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **AI & Media**
- **Web Speech API** - Speech recognition and synthesis
- **WebRTC** - Real-time video and audio capture
- **MediaStream API** - Camera and microphone access

### **State Management & Utilities**
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes

### **Future Integrations**
- **OpenAI GPT-4** / **Anthropic Claude** - Advanced question generation and evaluation
- **TensorFlow.js** - Facial expression analysis
- **Prisma + PostgreSQL** - Database and ORM
- **NextAuth.js** - Authentication
- **Supabase** - Backend as a Service

---

## 📦 Installation

### Prerequisites
- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- Modern browser with WebRTC support (Chrome, Edge, Firefox)

### Clone the Repository
```bash
git clone https://github.com/kasaam-ali/Mock-Interview-Platform.git
cd Mock-Interview-Platform
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎮 Usage

### 1️⃣ **Start Practice**
Navigate to the practice page and select your target role (e.g., Software Engineer, Data Scientist).

### 2️⃣ **Upload Resume (Optional)**
Upload your resume for personalized questions based on your experience.

### 3️⃣ **Begin Interview**
- Click "Start Interview" to begin
- Enable camera for realistic video interview experience
- Listen to AI-generated questions (text-to-speech)
- Answer using voice (speech-to-text) or type your response

### 4️⃣ **Get Feedback**
Receive instant feedback on:
- Answer quality and relevance
- Communication clarity
- Filler word usage
- Response time
- Confidence level

### 5️⃣ **Track Progress**
View your performance dashboard to see improvement over time.

---

## 🏗️ Project Structure

```
interview-ai-pro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── practice/          # Interview practice page
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── interview/         # Interview-related components
│   │   │   ├── InterviewSession.tsx
│   │   │   └── VideoInterviewLayout.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── lib/                   # Utility functions
│   │   └── utils.ts
│   └── types/                 # TypeScript type definitions
│       └── interview.ts
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🎨 Key Features in Detail

### **Smart Question Generation**
Questions are dynamically generated based on:
- Selected role and seniority level
- Resume content and experience
- Industry best practices
- Real interview patterns from top companies

### **Real-time Speech Recognition**
- Continuous speech-to-text conversion
- Live transcript display
- Automatic punctuation and formatting
- Multi-language support (coming soon)

### **Video Interview Simulation**
- Split-screen layout with AI interviewer avatar
- Real-time video feed from your camera
- Speaking indicators for both interviewer and candidate
- Recording status and timer display

### **Performance Metrics**
- **Score**: Overall performance rating (0-100)
- **Clarity**: Communication effectiveness
- **Relevance**: Answer alignment with question
- **Confidence**: Body language and speech analysis
- **Filler Words**: Detection of "um", "uh", "like", etc.

---

## 🚧 Roadmap

- [ ] **Backend Integration**: User authentication and session persistence
- [ ] **AI Model Integration**: OpenAI/Claude for advanced question generation
- [ ] **Facial Expression Analysis**: Real-time emotion detection using TensorFlow.js
- [ ] **Dashboard Analytics**: Comprehensive performance tracking with charts
- [ ] **Mobile App**: React Native version for iOS and Android
- [ ] **Company-Specific Prep**: Interview questions from FAANG and top tech companies
- [ ] **Peer Comparison**: Anonymous benchmarking against other users
- [ ] **Interview Scheduling**: Practice with real human interviewers
- [ ] **Resume Builder**: Integrated resume creation and optimization
- [ ] **Job Board Integration**: Direct application to job postings

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- Inspired by the need for accessible interview preparation tools
- Built with modern web technologies and best practices
- Designed to help candidates succeed in their job search

---

## 📞 Contact

**Kasaam Ali**

- GitHub: [@kasaam-ali](https://github.com/kasaam-ali)
- LinkedIn: [Your LinkedIn Profile](#)
- Email: your.email@example.com

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for job seekers worldwide

</div>
