export interface InterviewQuestion {
  id: string;
  question: string;
  category: "technical" | "behavioral" | "situational" | "experience";
  difficulty: "easy" | "medium" | "hard";
  expectedDuration: number; // in seconds
}

export interface InterviewSession {
  id: string;
  userId?: string;
  role: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: InterviewAnswer[];
  startedAt: Date;
  completedAt?: Date;
  status: "setup" | "in-progress" | "completed";
}

export interface InterviewAnswer {
  questionId: string;
  answer: string;
  duration: number; // in seconds
  timestamp: Date;
  feedback?: AnswerFeedback;
}

export interface AnswerFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  fillerWords: number;
  clarity: number; // 0-100
  relevance: number; // 0-100
  confidence: number; // 0-100
}

export interface ResumeData {
  name: string;
  email: string;
  experience: string[];
  skills: string[];
  education: string[];
  rawText: string;
}
