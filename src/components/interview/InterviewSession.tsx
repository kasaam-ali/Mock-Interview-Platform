"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import VideoInterviewLayout from "@/components/interview/VideoInterviewLayout";
import type { InterviewSession as InterviewSessionType, InterviewAnswer } from "@/types/interview";

interface InterviewSessionProps {
  session: InterviewSessionType;
  onComplete: (session: InterviewSessionType) => void;
}

export default function InterviewSession({ session, onComplete }: InterviewSessionProps) {
  const [currentSession, setCurrentSession] = useState(session);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex];
  const progress = ((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100;

  // Timer Effect
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  // Speak question when component mounts or question changes
  useEffect(() => {
    speakQuestion(currentQuestion.question);
  }, [currentQuestion.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      stopSpeechRecognition();
    };
  }, []);

  // Text-to-Speech: AI speaks the question
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Camera Control
  const startCamera = async () => {
    console.log("🎥 startCamera called");
    try {
      console.log("📹 Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false
      });

      console.log("✅ Camera stream obtained:", stream);

      if (videoRef.current) {
        console.log("📺 Setting video stream to video element");
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        console.log("🟢 Setting videoEnabled to TRUE");
        setVideoEnabled(true);
        console.log("✅ Camera setup complete!");
      } else {
        console.error("❌ videoRef.current is null!");
      }
    } catch (error) {
      console.error("❌ Camera access denied:", error);
      alert("Camera access denied. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setVideoEnabled(false);
  };

  const toggleCamera = () => {
    if (videoEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Speech Recognition
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the answer with final transcript
      if (finalTranscript) {
        setAnswer(prev => prev + finalTranscript);
      }

      // Show interim results
      setTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'no-speech') {
        console.log("No speech detected");
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      if (isRecording && !isPaused) {
        // Restart if still recording
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setTranscript("");
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeElapsed(0);
    setAnswer("");
    setTranscript("");
    startSpeechRecognition();
  };

  const stopRecording = () => {
    setIsRecording(false);
    stopSpeechRecognition();
  };

  const togglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } else {
      setIsPaused(true);
      stopSpeechRecognition();
    }
  };

  const submitAnswer = () => {
    stopSpeaking();
    stopSpeechRecognition();

    const newAnswer: InterviewAnswer = {
      questionId: currentQuestion.id,
      answer: answer,
      duration: timeElapsed,
      timestamp: new Date(),
      feedback: generateMockFeedback(answer, timeElapsed),
    };

    const updatedAnswers = [...currentSession.answers, newAnswer];
    const nextIndex = currentSession.currentQuestionIndex + 1;

    if (nextIndex >= currentSession.questions.length) {
      // Interview complete
      stopCamera();
      const completedSession: InterviewSessionType = {
        ...currentSession,
        answers: updatedAnswers,
        completedAt: new Date(),
        status: "completed",
      };
      onComplete(completedSession);
    } else {
      // Move to next question
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSession({
          ...currentSession,
          answers: updatedAnswers,
          currentQuestionIndex: nextIndex,
        });
        setAnswer("");
        setTranscript("");
        setTimeElapsed(0);
        setIsRecording(false);
        setIsPaused(false);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const generateMockFeedback = (answer: string, duration: number) => {
    const wordCount = answer.trim().split(/\s+/).length;
    const hasContent = wordCount > 10;

    return {
      score: hasContent ? Math.floor(Math.random() * 30) + 70 : 50,
      strengths: hasContent
        ? ["Clear communication", "Good structure", "Relevant examples"]
        : ["Attempted to answer"],
      improvements: hasContent
        ? ["Add more specific examples", "Elaborate on key points"]
        : ["Provide more detailed response", "Include specific examples"],
      fillerWords: Math.floor(Math.random() * 5),
      clarity: hasContent ? Math.floor(Math.random() * 20) + 80 : 60,
      relevance: hasContent ? Math.floor(Math.random() * 20) + 75 : 55,
      confidence: hasContent ? Math.floor(Math.random() * 25) + 70 : 60,
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "hard":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-slate-600 bg-slate-100 dark:bg-slate-900/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical":
        return "💻";
      case "behavioral":
        return "🧠";
      case "situational":
        return "🎯";
      case "experience":
        return "📚";
      default:
        return "❓";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Question {currentSession.currentQuestionIndex + 1} of {currentSession.questions.length}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty.toUpperCase()}
              </div>
              {isSpeaking && (
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-xs font-semibold">AI Speaking...</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Question Card */}
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{getCategoryIcon(currentQuestion.category)}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
                          {currentQuestion.category}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                          {currentQuestion.question}
                        </h2>
                      </div>
                      <button
                        onClick={() => isSpeaking ? stopSpeaking() : speakQuestion(currentQuestion.question)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={isSpeaking ? "Stop speaking" : "Speak question"}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-4">
                      <AlertCircle className="w-4 h-4" />
                      <span>Expected duration: ~{Math.floor(currentQuestion.expectedDuration / 60)} minutes</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Split-Screen Video Interview Layout */}
                {videoEnabled && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* AI Interviewer Side */}
                        <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg aspect-video flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mx-auto mb-3">
                              <span className="text-4xl">👩‍💼</span>
                            </div>
                            <div className="text-white font-semibold">Sarah Chen</div>
                            <div className="text-blue-300 text-sm">AI Interviewer</div>
                            {isSpeaking && (
                              <div className="mt-2 text-green-400 text-xs flex items-center justify-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Speaking...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* User Camera Side */}
                        <div className="relative bg-slate-900 rounded-lg aspect-video overflow-hidden">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`} />
                              <span className="text-white text-sm font-semibold">You</span>
                            </div>
                          </div>
                          {isRecording && (
                            <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                              <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-white text-xs font-semibold">REC</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Video/Audio Controls */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Button
                        variant={videoEnabled ? "primary" : "outline"}
                        onClick={toggleCamera}
                        className="flex items-center gap-2"
                      >
                        {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                        {videoEnabled ? "Camera On" : "Turn Camera On"}
                      </Button>

                      {!isRecording ? (
                        <Button onClick={startRecording} size="lg" className="flex items-center gap-2">
                          <Mic className="w-5 h-5" />
                          Start Recording Answer
                        </Button>
                      ) : (
                        <>
                          <Button onClick={togglePause} variant="secondary" className="flex items-center gap-2">
                            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                            {isPaused ? "Resume" : "Pause"}
                          </Button>
                          <Button onClick={stopRecording} variant="outline" className="flex items-center gap-2">
                            <MicOff className="w-5 h-5" />
                            Stop Recording
                          </Button>
                        </>
                      )}
                    </div>

                    {isRecording && (
                      <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                        <motion.div
                          className="w-3 h-3 bg-red-600 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="font-semibold">🎤 Listening... Speak your answer</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Answer Display with Real-time Transcript */}
                <Card>
                  <CardContent className="p-6">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Your Answer {isRecording && "(Speaking... your words will appear here)"}
                    </label>
                    <div className="relative">
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Click 'Start Recording Answer' to speak, or type your answer here..."
                        className="w-full h-48 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 dark:text-white placeholder-slate-400"
                        disabled={isRecording && !isPaused}
                      />

                      {/* Real-time transcript overlay */}
                      {transcript && (
                        <div className="absolute bottom-2 left-2 right-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 rounded text-blue-900 dark:text-blue-100 text-sm border border-blue-300 dark:border-blue-700">
                          <span className="font-semibold">Speaking: </span>
                          <span className="italic">{transcript}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {answer.trim().split(/\s+/).filter(Boolean).length} words
                      </div>

                      <Button
                        onClick={submitAnswer}
                        disabled={!answer.trim()}
                        className="flex items-center gap-2"
                      >
                        {currentSession.currentQuestionIndex === currentSession.questions.length - 1 ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Complete Interview
                          </>
                        ) : (
                          <>
                            Next Question
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                      <span>💡</span> Tips for a great answer:
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Be specific with examples from your experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Speak clearly and at a moderate pace for better recognition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Take a moment to think before answering</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
