import React from 'react';
import { Terminal, Flame, Zap, HelpCircle, BookOpen, Code2, Users, Award, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: 'courses' | 'playground' | 'doubt' | 'forum' | 'progress';
  setActiveTab: (tab: 'courses' | 'playground' | 'doubt' | 'forum' | 'progress') => void;
  xp: number;
  streakDays: number;
  onOpenCredits: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  xp,
  streakDays,
  onOpenCredits
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#27272a] bg-[#09090b]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('courses')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                  Code<span className="text-amber-400">Academy</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  Aprende Gratis
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">
                Por <span className="text-amber-400 font-medium">Los Jinetes Paleteros</span>
              </p>
            </div>
          </button>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#12141a] p-1 rounded-xl border border-[#27272a]">
          <button
            onClick={() => setActiveTab('courses')}
            id="nav-tab-courses"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'courses'
                ? 'bg-amber-400 text-black shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Cursos
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            id="nav-tab-playground"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'playground'
                ? 'bg-amber-400 text-black shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Editor en Vivo
          </button>

          <button
            onClick={() => setActiveTab('doubt')}
            id="nav-tab-doubt"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
              activeTab === 'doubt'
                ? 'bg-amber-400 text-black shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Dudas 24/7</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            id="nav-tab-forum"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'forum'
                ? 'bg-amber-400 text-black shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            Comunidad
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            id="nav-tab-progress"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'progress'
                ? 'bg-amber-400 text-black shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificado
          </button>
        </nav>

        {/* Right Stats & Credits */}
        <div className="flex items-center gap-3">
          {/* Streak widget */}
          <div 
            title="Racha de días de estudio continuo"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-400"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <span>{streakDays}d</span>
          </div>

          {/* XP Widget */}
          <div 
            title="Experiencia de programación acumulada"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{xp} <span className="text-[10px] text-zinc-400">XP</span></span>
          </div>

          {/* Project Info Button */}
          <button
            onClick={onOpenCredits}
            id="btn-project-credits"
            title="Ver información del proyecto y creadores (Los Jinetes Paleteros)"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-zinc-800/80 bg-[#09090b] px-2 py-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            activeTab === 'courses' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Cursos
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            activeTab === 'playground' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Editor
        </button>
        <button
          onClick={() => setActiveTab('doubt')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            activeTab === 'doubt' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Dudas 24/7
        </button>
        <button
          onClick={() => setActiveTab('forum')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            activeTab === 'forum' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Foro
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            activeTab === 'progress' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Perfil
        </button>
      </div>
    </header>
  );
};
