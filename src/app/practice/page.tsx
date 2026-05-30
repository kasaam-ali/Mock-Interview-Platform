"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import InterviewSession from "@/components/interview/InterviewSession";
import type { InterviewSession as InterviewSessionType } from "@/types/interview";

export default function PracticePage() {
  const [step, setStep] = useState<"setup" | "interview" | "results">("setup");
  const [selectedRole, setSelectedRole] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [session, setSession] = useState<InterviewSessionType | null>(null);

  const roles = [
    { id: "swe", title: "Software Engineer", icon: "💻" },
    { id: "data-scientist", title: "Data Scientist", icon: "📊" },
    { id: "product-manager", title: "Product Manager", icon: "🎯" },
    { id: "frontend", title: "Frontend Developer", icon: "🎨" },
    { id: "backend", title: "Backend Developer", icon: "⚙️" },
    { id: "fullstack", title: "Full Stack Developer", icon: "🚀" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const startInterview = () => {
    // Generate mock interview session
    const mockSession: InterviewSessionType = {
      id: `session-${Date.now()}`,
      role: selectedRole,
      questions: generateMockQuestions(selectedRole),
      currentQuestionIndex: 0,
      answers: [],
      startedAt: new Date(),
      status: "in-progress",
    };

    setSession(mockSession);
    setStep("interview");
  };

  const generateMockQuestions = (role: string) => {
    const questionBank = {
      swe: [
        {
          id: "q1",
          question: "Tell me about yourself and your experience in software development.",
          category: "experience" as const,
          difficulty: "easy" as const,
          expectedDuration: 120,
        },
        {
          id: "q2",
          question: "Explain the difference between REST and GraphQL APIs. When would you use each?",
          category: "technical" as const,
          difficulty: "medium" as const,
          expectedDuration: 180,
        },
        {
          id: "q3",
          question: "Describe a challenging bug you encountered and how you resolved it.",
          category: "behavioral" as const,
          difficulty: "medium" as const,
          expectedDuration: 150,
        },
        {
          id: "q4",
          question: "How do you handle code reviews and feedback from senior developers?",
          category: "behavioral" as const,
          difficulty: "easy" as const,
          expectedDuration: 120,
        },
        {
          id: "q5",
          question: "What's your approach to writing unit tests and ensuring code quality?",
          category: "technical" as const,
          difficulty: "medium" as const,
          expectedDuration: 150,
        },
      ],
      "data-scientist": [
        {
          id: "q1",
          question: "Walk me through your experience with machine learning projects.",
          category: "experience" as const,
          difficulty: "easy" as const,
          expectedDuration: 120,
        },
        {
          id: "q2",
          question: "Explain the bias-variance tradeoff and how you handle it in practice.",
          category: "technical" as const,
          difficulty: "hard" as const,
          expectedDuration: 180,
        },
        {
          id: "q3",
          question: "How do you approach feature engineering for a new dataset?",
          category: "technical" as const,
          difficulty: "medium" as const,
          expectedDuration: 150,
        },
      ],
      "product-manager": [
        {
          id: "q1",
          question: "Tell me about a product you managed from conception to launch.",
          category: "experience" as const,
          difficulty: "medium" as const,
          expectedDuration: 180,
        },
        {
          id: "q2",
          question: "How do you prioritize features when you have limited resources?",
          category: "situational" as const,
          difficulty: "medium" as const,
          expectedDuration: 150,
        },
        {
          id: "q3",
          question: "Describe a time when you had to make a difficult product decision.",
          category: "behavioral" as const,
          difficulty: "medium" as const,
          expectedDuration: 150,
        },
      ],
    };

    return questionBank[role as keyof typeof questionBank] || questionBank.swe;
  };

  const handleSessionComplete = (completedSession: InterviewSessionType) => {
    setSession(completedSession);
    setStep("results");
  };

  if (step === "interview" && session) {
    return <InterviewSession session={session} onComplete={handleSessionComplete} />;
  }

  if (step === "results" && session) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Interview Complete! 🎉
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Great job! Your performance analysis is being generated...
            </p>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
              <CardDescription>
                You answered {session.answers.length} questions in this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {session.answers.map((answer, index) => (
                  <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div className="font-semibold text-slate-900 dark:text-white mb-2">
                      Question {index + 1}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 mb-2">
                      {session.questions[index].question}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Duration: {Math.floor(answer.duration / 60)}:{(answer.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Button onClick={() => setStep("setup")} variant="outline" className="flex-1">
                  Start New Interview
                </Button>
                <Button onClick={() => window.location.href = "/dashboard"} className="flex-1">
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Start Your Interview Practice
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Select your target role and upload your resume to get personalized questions
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Select Your Target Role
              </CardTitle>
              <CardDescription>
                Choose the position you're preparing for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedRole === role.id
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {role.title}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Resume (Optional)
              </CardTitle>
              <CardDescription>
                Upload your resume for personalized questions based on your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  {resumeFile ? (
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold mb-1">
                        {resumeFile.name}
                      </p>
                      <p className="text-sm text-slate-500">Click to change</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-slate-500">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="flex justify-center">
            <Button
              onClick={startInterview}
              disabled={!selectedRole}
              size="lg"
              className="px-12"
            >
              Start Interview
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
