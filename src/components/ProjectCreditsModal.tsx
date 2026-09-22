import React from 'react';
import { X, Users, Target, Palette, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProjectCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCreditsModal: React.FC<ProjectCreditsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0d0f14] border border-amber-400/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-[#12141a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-black font-bold flex items-center justify-center font-mono">
              CA
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Memoria del Proyecto • CodeAcademy</h3>
              <p className="text-xs text-amber-400 font-medium">Grupo: Los Jinetes Paleteros</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-zinc-300">
          
          {/* Group Members Section */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Participantes del Grupo (Los Jinetes Paleteros)</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li className="flex items-center gap-2 text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>Mohammad Nacher Rahman Akter</strong>
              </li>
              <li className="flex items-center gap-2 text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>Iker Bruña Hijano</strong>
              </li>
              <li className="flex items-center gap-2 text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>Nerea Bruña Hijano</strong>
              </li>
              <li className="flex items-center gap-2 text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>Julián Barbero Perea</strong>
              </li>
              <li className="flex items-center gap-2 text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>José Javier Andreu Sánchez</strong>
              </li>
            </ul>
          </div>

          {/* Section 1: Objetivos del PDF */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4 text-amber-400" />
              <span>1. Objetivo de la Página Web (PDF pág. 3)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Rápido aprendizaje (lecciones y retos de 5-10 min)',
                'Totalmente gratuito (0€, sin muros de pago)',
                'Cursos sencillos (conceptos claros sin rodeos)',
                'Cursos interactivos (editor en vivo en el navegador)',
                'Resolución de dudas en cualquier momento (IA 24/7)',
                'Foro de consulta de la comunidad (apoyo entre pares)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#12141a] border border-zinc-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Perfil del Usuario del PDF */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 text-amber-400" />
              <span>2. Perfil del Usuario (PDF pág. 4)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#12141a] border border-zinc-800 space-y-1.5 text-xs">
              <p>• <strong>Edad:</strong> Entre 14 y 35 años (estudiantes de FP, universidad y autodidactas).</p>
              <p>• <strong>Motivación:</strong> Interesados en aprender o mejorar sus cualidades de programación.</p>
              <p>• <strong>Necesidad:</strong> Búsqueda de apoyo comunitario de expertos y resolución rápida de dudas.</p>
            </div>
          </div>

          {/* Section 3: Diseño de la Página del PDF */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>3. Diseño de la Página (PDF pág. 5)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#12141a] border border-zinc-800 space-y-1.5 text-xs">
              <p>• <strong>Interfaz Oscura:</strong> Configurada para un óptimo confort visual durante largas sesiones de código.</p>
              <p>• <strong>Acentos Destacados:</strong> Para títulos, llamadas a la acción y elementos clave.</p>
              <p>• <strong>Contraste Nítido:</strong> Máximo contraste para la lectura de código y documentación.</p>
              <p>• <strong>Estilo:</strong> Minimalista y moderno, sin distracciones innecesarias.</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-[#12141a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
