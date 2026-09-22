import React from 'react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Zap, Bot, Users } from 'lucide-react';

interface HeroBannerProps {
  onStartCourse: () => void;
  onOpenPlayground: () => void;
  onOpenDoubt: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartCourse,
  onOpenPlayground,
  onOpenDoubt,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-[#27272a] bg-gradient-to-b from-[#09090b] via-[#0d0f14] to-[#09090b]">
      {/* Subtle background ambient glow in golden yellow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Plataforma 100% Gratuita • Desarrollo Web</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Aprende programación <br />
              <span className="text-amber-400 font-mono font-black">rápido, interactivo</span> <br />
              y sin complicaciones.
            </h1>

            {/* Description tailored for 14-35 years old */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              La academia online diseñada para estudiantes (14 a 35 años) y futuros desarrolladores. Cursos sencillos, editor de código en vivo en tu navegador, resolución de dudas con IA las 24 horas y apoyo constante de la comunidad.
            </p>

            {/* Feature Highlights Grid from PDF */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-zinc-200">Rápido Aprendizaje</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-zinc-200">100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-zinc-200">Cursos Interactivos</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Bot className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-zinc-200">Dudas IA 24/7</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-zinc-200">Foro de Expertos</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
                <span className="text-xs font-bold text-amber-300">Los Jinetes Paleteros</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartCourse}
                id="hero-btn-start"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explorar Cursos</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenPlayground}
                id="hero-btn-playground"
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Editor en Vivo</span>
              </button>

              <button
                onClick={onOpenDoubt}
                id="hero-btn-doubt"
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-400/30 text-amber-300 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Resolver Duda</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual illustration matching page 1 of the PDF */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-zinc-800 bg-[#12141a] p-3 shadow-2xl overflow-hidden group">
              {/* Gold border accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent pointer-events-none" />
              
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800">
                <img
                  src="/src/assets/images/codeacademy_dev_setup_1790076181451.jpg"
                  alt="CodeAcademy Desarrollador Los Jinetes Paleteros"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating terminal status overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-amber-400/40 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-zinc-300">Terminal:</span>
                    <span className="text-amber-400 font-bold">online</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">Los Jinetes Paleteros</span>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-zinc-400">
                <span>Proyecto: <strong className="text-white">CodeAcademy</strong></span>
                <span className="text-amber-400 font-medium">Aprende código interactivo</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
