import { useState, useEffect } from 'react';
import { Course, Lesson, ForumPost, UserBadge } from './types';
import { COURSES, INITIAL_BADGES } from './data/coursesData';
import { INITIAL_FORUM_POSTS } from './data/forumData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CoursesView } from './components/CoursesView';
import { InteractivePlayground } from './components/InteractivePlayground';
import { DoubtResolver } from './components/DoubtResolver';
import { CommunityForum } from './components/CommunityForum';
import { ProgressAndCertificate } from './components/ProgressAndCertificate';
import { LessonModal } from './components/LessonModal';
import { ProjectCreditsModal } from './components/ProjectCreditsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'courses' | 'playground' | 'doubt' | 'forum' | 'progress'>('courses');
  
  // Persistent user state
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ca_completed_lessons');
      return saved ? JSON.parse(saved) : ['js-1'];
    } catch {
      return ['js-1'];
    }
  });

  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ca_user_xp');
      return saved ? parseInt(saved, 10) : 150;
    } catch {
      return 150;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ca_streak_days');
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ca_student_name');
      return saved || 'Mohammad Nacher';
    } catch {
      return 'Mohammad Nacher';
    }
  });

  const [badges, setBadges] = useState<UserBadge[]>(() => {
    try {
      const saved = localStorage.getItem('ca_user_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('ca_forum_posts');
      return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
    } catch {
      return INITIAL_FORUM_POSTS;
    }
  });

  // Modal and cross-navigation contexts
  const [currentLessonModal, setCurrentLessonModal] = useState<{ course: Course; lesson: Lesson } | null>(null);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  // Pre-load contexts for Playground and DoubtResolver
  const [tutorContext, setTutorContext] = useState<{ question: string; code: string }>({
    question: '',
    code: ''
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ca_completed_lessons', JSON.stringify(completedLessons));
      localStorage.setItem('ca_user_xp', xp.toString());
      localStorage.setItem('ca_streak_days', streakDays.toString());
      localStorage.setItem('ca_student_name', studentName);
      localStorage.setItem('ca_user_badges', JSON.stringify(badges));
      localStorage.setItem('ca_forum_posts', JSON.stringify(forumPosts));
    } catch (e) {
      console.warn('Could not persist state to localStorage', e);
    }
  }, [completedLessons, xp, streakDays, studentName, badges, forumPosts]);

  // Award XP and complete lesson
  const handleCompleteLesson = (lessonId: string, earnedXp: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setXp(prev => prev + earnedXp);

      // Unlock badges if conditions met
      setBadges(prev => prev.map(badge => {
        if (badge.id === 'first-code' || (badge.id === 'fullstack-master' && lessonId.includes('node'))) {
          return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
        }
        return badge;
      }));
    }
  };

  // Cross-component: Ask tutor with lesson or playground code context
  const handleAskTutorWithContext = (question: string, code: string) => {
    setTutorContext({ question, code });
    if (currentLessonModal) {
      setCurrentLessonModal(null);
    }
    setActiveTab('doubt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cross-component: Send code from tutor or lesson to interactive playground
  const handleSendCodeToPlayground = (_code: string) => {
    setActiveTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Forum actions
  const handleAddForumPost = (newPostData: Omit<ForumPost, 'id' | 'views' | 'date' | 'replies' | 'upvotes' | 'solved'>) => {
    const created: ForumPost = {
      ...newPostData,
      id: 'post-' + Date.now(),
      views: 1,
      date: 'Justo ahora',
      upvotes: 1,
      solved: false,
      replies: []
    };
    setForumPosts(prev => [created, ...prev]);
    setXp(prev => prev + 30);
    // Unlock community badge
    setBadges(prev => prev.map(b => b.id === 'community-pillar' ? { ...b, unlocked: true } : b));
  };

  const handleUpvoteForumPost = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleAddForumReply = (postId: string, replyContent: string, authorName: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newReply = {
          id: 'rep-' + Date.now(),
          author: authorName || 'Compañero',
          authorRole: 'Comunidad CodeAcademy',
          avatarSeed: authorName,
          date: 'Justo ahora',
          content: replyContent,
          upvotes: 1,
          isAccepted: false
        };
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));
    setXp(prev => prev + 20);
  };

  // Total lessons in catalogue
  const totalLessonsCount = COURSES.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        streakDays={streakDays}
        onOpenCredits={() => setShowCreditsModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Hero Section shown on courses overview */}
        {activeTab === 'courses' && (
          <HeroBanner
            onStartCourse={() => {
              const firstLesson = COURSES[0].lessons[0];
              setCurrentLessonModal({ course: COURSES[0], lesson: firstLesson });
            }}
            onOpenPlayground={() => setActiveTab('playground')}
            onOpenDoubt={() => setActiveTab('doubt')}
          />
        )}

        {/* Tab 1: Cursos */}
        {activeTab === 'courses' && (
          <CoursesView
            courses={COURSES}
            completedLessonIds={completedLessons}
            onSelectLesson={(course, lesson) => setCurrentLessonModal({ course, lesson })}
            onOpenDoubt={() => setActiveTab('doubt')}
          />
        )}

        {/* Tab 2: Editor en Vivo (Playground) */}
        {activeTab === 'playground' && (
          <InteractivePlayground
            onAskTutorWithCode={(question, code) => handleAskTutorWithContext(question, code)}
          />
        )}

        {/* Tab 3: Resolución de Dudas 24/7 (AI Tutor) */}
        {activeTab === 'doubt' && (
          <DoubtResolver
            initialQuestion={tutorContext.question}
            initialCodeContext={tutorContext.code}
            onSendCodeToPlayground={handleSendCodeToPlayground}
          />
        )}

        {/* Tab 4: Foro de la Comunidad */}
        {activeTab === 'forum' && (
          <CommunityForum
            posts={forumPosts}
            onAddPost={handleAddForumPost}
            onUpvotePost={handleUpvoteForumPost}
            onAddReply={handleAddForumReply}
          />
        )}

        {/* Tab 5: Mi Progreso & Certificado */}
        {activeTab === 'progress' && (
          <ProgressAndCertificate
            xp={xp}
            streakDays={streakDays}
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={totalLessonsCount}
            badges={badges}
            studentName={studentName}
            onUpdateStudentName={setStudentName}
          />
        )}

      </main>

      {/* Interactive Lesson Modal */}
      {currentLessonModal && (
        <LessonModal
          course={currentLessonModal.course}
          lesson={currentLessonModal.lesson}
          isOpen={!!currentLessonModal}
          onClose={() => setCurrentLessonModal(null)}
          onCompleteLesson={handleCompleteLesson}
          isCompleted={completedLessons.includes(currentLessonModal.lesson.id)}
          onAskTutorWithContext={handleAskTutorWithContext}
          onNextLesson={() => {
            const currentIdx = currentLessonModal.course.lessons.findIndex(l => l.id === currentLessonModal.lesson.id);
            if (currentIdx !== -1 && currentIdx < currentLessonModal.course.lessons.length - 1) {
              setCurrentLessonModal({
                course: currentLessonModal.course,
                lesson: currentLessonModal.course.lessons[currentIdx + 1]
              });
            }
          }}
          onPrevLesson={() => {
            const currentIdx = currentLessonModal.course.lessons.findIndex(l => l.id === currentLessonModal.lesson.id);
            if (currentIdx > 0) {
              setCurrentLessonModal({
                course: currentLessonModal.course,
                lesson: currentLessonModal.course.lessons[currentIdx - 1]
              });
            }
          }}
        />
      )}

      {/* Project Credits Modal from PDF */}
      <ProjectCreditsModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenCredits={() => setShowCreditsModal(true)}
      />

    </div>
  );
}
