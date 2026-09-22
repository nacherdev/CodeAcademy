export interface LessonChallenge {
  instructions: string;
  initialCode: string;
  solutionHint: string;
  expectedOutputSubstring?: string;
  testFunction?: (output: string, code: string) => { passed: boolean; message: string };
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  duration: string;
  summary: string;
  theory: string;
  codeExample: string;
  language: string;
  challenge: LessonChallenge;
  quiz: LessonQuiz;
}

export interface Course {
  id: string;
  title: string;
  track: 'frontend' | 'backend' | 'fullstack' | 'database' | 'python' | 'tools';
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  shortDesc: string;
  icon: string;
  badge: string;
  accentColor: string;
  lessons: Lesson[];
}

export interface ForumReply {
  id: string;
  author: string;
  authorRole: string;
  avatarSeed: string;
  date: string;
  content: string;
  upvotes: number;
  isAccepted: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  avatarSeed: string;
  date: string;
  category: 'JavaScript' | 'Web' | 'Backend' | 'HTML/CSS' | 'Bases de Datos' | 'Python' | 'General';
  tags: string[];
  upvotes: number;
  views: number;
  solved: boolean;
  replies: ForumReply[];
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  age: number;
  xp: number;
  level: number;
  streakDays: number;
  completedLessons: string[];
  savedSnippets: { id: string; title: string; code: string; date: string }[];
  badges: UserBadge[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  modelUsed?: string;
}
