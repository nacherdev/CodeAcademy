import React from 'react';
import { Terminal, Heart, Sparkles, BookOpen, Code2, Users, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'courses' | 'playground' | 'doubt' | 'forum' | 'progress') => void;
  onOpenCredits: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCredits }) => {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090b] text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Team */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center font-bold">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white font-mono">
                Code<span className="text-amber-400">Academy</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                Aprende Gratis
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Plataforma de aprendizaje online de programación 100% gratuita, rápida e interactiva. Diseñada para estudiantes y apasionados del código de 14 a 35 años.
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenCredits}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver memoria completa del proyecto (Los Jinetes Paleteros)</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explorar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" /> Cursos Gratuitos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('playground')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-zinc-500" /> Editor en Vivo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doubt')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-500" /> Dudas 24/7 con IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forum')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-500" /> Foro de la Comunidad
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The 5 Participants */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Grupo: Los Jinetes Paleteros
            </h4>
            <p className="text-[11px] text-zinc-500">
              Equipo de Desarrollo:
            </p>
            <ul className="space-y-1 text-xs text-zinc-300 font-mono">
              <li>• Mohammad Nacher Rahman Akter</li>
              <li>• Iker Bruña Hijano</li>
              <li>• Nerea Bruña Hijano</li>
              <li>• Julián Barbero Perea</li>
              <li>• José Javier Andreu Sánchez</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © 2026 CodeAcademy. Diseñado para aprender a programar de forma rápida y práctica.
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>para la comunidad de programadores</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
