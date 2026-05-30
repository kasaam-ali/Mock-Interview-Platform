"use client";

import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoInterviewLayoutProps {
  userVideoRef: React.RefObject<HTMLVideoElement>;
  isUserSpeaking?: boolean;
  isAISpeaking?: boolean;
  interviewerName?: string;
}

export default function VideoInterviewLayout({
  userVideoRef,
  isUserSpeaking = false,
  isAISpeaking = false,
  interviewerName = "Sarah Chen"
}: VideoInterviewLayoutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-2 gap-2 h-full p-2">
        {/* AI Interviewer Side */}
        <motion.div
          className={`relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg overflow-hidden ${
            isAISpeaking ? 'ring-4 ring-green-500' : ''
          }`}
          animate={isAISpeaking ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.5, repeat: isAISpeaking ? Infinity : 0 }}
        >
          {/* AI Avatar/Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Professional Avatar Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>

              {/* AI Badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white">AI</span>
              </div>

              {/* Speaking Indicator */}
              {isAISpeaking && (
                <motion.div
                  className="absolute -top-2 -left-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-green-500 rounded-full"
                        animate={{
                          height: [8, 16, 8],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Name Tag */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAISpeaking ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-white text-sm font-semibold">{interviewerName}</span>
              <span className="text-blue-300 text-xs">Interviewer</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* User Camera Side */}
        <motion.div
          className={`relative bg-slate-800 rounded-lg overflow-hidden ${
            isUserSpeaking ? 'ring-4 ring-blue-500' : ''
          }`}
          animate={isUserSpeaking ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.5, repeat: isUserSpeaking ? Infinity : 0 }}
        >
          {/* User Video */}
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Name Tag */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isUserSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-white text-sm font-semibold">You</span>
              <span className="text-slate-300 text-xs">Candidate</span>
            </div>
          </div>

          {/* Recording Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-white text-xs font-semibold">REC</span>
          </div>
        </motion.div>
      </div>

      {/* Top Bar - Meeting Info */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">InterviewAI Pro Session</div>
              <div className="text-slate-300 text-xs">Live Interview Practice</div>
            </div>
          </div>
          <div className="text-white text-sm font-mono bg-black/40 px-3 py-1 rounded-lg">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Connection Status */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-white text-xs font-semibold">Secure Connection</span>
          <span className="text-slate-300 text-xs">• End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
}
