import React, { useState } from 'react';
import { Course, Lesson } from '../types';
import { 
  FileCode2, 
  Server, 
  Layout, 
  Database, 
  GitBranch, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  completedLessonIds: string[];
  onSelectLesson: (course: Course, lesson: Lesson) => void;
  onOpenDoubt: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  completedLessonIds,
  onSelectLesson,
  onOpenDoubt
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string>(courses[0]?.id || '');

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode2': return <FileCode2 className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-amber-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-amber-400" />;
      default: return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredCourses = selectedTrack === 'all' 
    ? courses 
    : courses.filter(c => c.track === selectedTrack);

  return (
    <div className="space-y-8">
      
      {/* Top Filter and Stats Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-amber-400">Catálogo de Cursos</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono font-normal">
              100% Gratuitos
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Lecciones breves, sencillas e interactivas diseñadas para dominar el código paso a paso.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#12141a] p-1.5 rounded-xl border border-zinc-800">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'database', label: 'Bases de Datos' },
            { id: 'tools', label: 'Git & Herramientas' },
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedTrack === track.id
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const completedCount = course.lessons.filter(l => completedLessonIds.includes(l.id)).length;
          const progressPercent = Math.round((completedCount / course.lessons.length) * 100);
          const isExpanded = expandedCourseId === course.id;

          return (
            <div
              key={course.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col bg-[#0d0f14] ${
                isExpanded ? 'border-amber-400/50 shadow-xl shadow-amber-400/5' : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Course Card Header */}
              <div className="p-5 flex-1 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    {getCourseIcon(course.icon)}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      {course.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" /> {course.duration}
                    </span>
                    <span className="text-amber-400 font-semibold">{progressPercent}% completado</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Course Lessons Accordion Header */}
              <div className="border-t border-zinc-800/80 px-5 py-3 bg-[#111319] flex items-center justify-between rounded-b-2xl">
                <span className="text-xs text-zinc-400 font-medium">
                  {course.lessons.length} {course.lessons.length === 1 ? 'lección interactiva' : 'lecciones interactivas'}
                </span>

                <button
                  onClick={() => setExpandedCourseId(isExpanded ? '' : course.id)}
                  className="text-xs text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Ocultar lecciones' : 'Ver lecciones'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expandable Lessons List */}
              {isExpanded && (
                <div className="p-4 pt-2 border-t border-zinc-800 bg-[#09090b] rounded-b-2xl space-y-2">
                  {course.lessons.map((lesson) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(course, lesson)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                          isCompleted
                            ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/40'
                            : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <div className="truncate">
                            <span className="font-semibold text-white mr-1.5 font-mono">
                              #{lesson.order}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Help Banner */}
      <div className="p-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-[#13161f] to-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">¿Atascado en algún ejercicio o concepto?</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Nuestro tutor de IA está disponible 24/7 para explicarte cualquier línea de código paso a paso.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDoubt}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shrink-0 transition-transform active:scale-95 shadow-md shadow-amber-400/20"
        >
          Preguntar al Tutor Ahora
        </button>
      </div>

    </div>
  );
};
