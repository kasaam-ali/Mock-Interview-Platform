"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Video,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mic,
  BarChart3,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Resume-based personalized interview questions tailored to your experience and target role.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Facial Expression Analysis",
      description: "Real-time confidence and emotion detection to help you master your body language.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mic,
      title: "Speech Recognition",
      description: "Advanced speech-to-text with filler word detection and communication scoring.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights and progress tracking with actionable improvement suggestions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Industry-Specific Prep",
      description: "Customized questions for SWE, Data Science, PM, and more technical roles.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Skill Improvement",
      description: "Track your progress over time and see measurable improvements in your performance.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { value: "95%", label: "Success Rate" },
    { value: "10k+", label: "Practice Sessions" },
    { value: "50+", label: "Interview Types" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                InterviewAI Pro
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/practice"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Start Practice
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                AI-Powered Interview Mastery
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Master Your Interviews
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                With AI Precision
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Practice with AI-powered mock interviews, get real-time feedback on your answers,
              body language, and communication skills. Land your dream job with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/practice"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                Start Free Practice
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to ace your next interview, powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-transparent overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get started in minutes and see improvement in your first session
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Resume", desc: "Upload your resume and select your target role" },
              { step: "02", title: "Start Interview", desc: "AI generates personalized questions based on your profile" },
              { step: "03", title: "Get Feedback", desc: "Receive detailed analysis and improvement suggestions" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-7xl font-bold text-blue-100 dark:text-blue-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who improved their interview skills with InterviewAI Pro
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              Start Your Free Practice
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InterviewAI Pro
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            © 2026 InterviewAI Pro. Built with AI to help you succeed.
          </p>
        </div>
      </footer>
    </div>
  );
}
