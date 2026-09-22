import React, { useState } from 'react';
import { UserBadge } from '../types';
import { 
  Award, 
  Flame, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Printer, 
  GraduationCap, 
  ShieldCheck, 
  Lock,
  User,
  Star
} from 'lucide-react';

interface ProgressAndCertificateProps {
  xp: number;
  streakDays: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  badges: UserBadge[];
  studentName: string;
  onUpdateStudentName: (name: string) => void;
}

export const ProgressAndCertificate: React.FC<ProgressAndCertificateProps> = ({
  xp,
  streakDays,
  completedLessonsCount,
  totalLessonsCount,
  badges,
  studentName,
  onUpdateStudentName
}) => {
  const [editableName, setEditableName] = useState(studentName);
  const [showCertificateView, setShowCertificateView] = useState(false);

  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;
  const progressPercent = Math.min(100, Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100));

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (editableName.trim()) {
      onUpdateStudentName(editableName.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Mi Progreso & Certificado Oficial</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Plataforma 100% gratuita: completa lecciones, gana experiencia (XP) y obtén tu diploma acreditativo oficial.
          </p>
        </div>

        <button
          onClick={() => setShowCertificateView(!showCertificateView)}
          id="btn-toggle-certificate"
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-amber-400/20 self-start sm:self-auto"
        >
          <GraduationCap className="w-4 h-4 stroke-[2.5]" />
          <span>{showCertificateView ? 'Ocultar Certificado' : 'Ver Mi Certificado'}</span>
        </button>
      </div>

      {/* Gamification Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Card 1: Level */}
        <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0f14] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Nivel de Programador</span>
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">Nivel {level}</div>
            <div className="text-xs text-amber-400 font-medium mt-0.5">
              {level >= 3 ? 'Desarrollador FullStack Pro' : 'Iniciante Web en Progreso'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>Progreso de nivel</span>
              <span>{currentLevelXp}/100 XP</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${currentLevelXp}%` }} />
            </div>
          </div>
        </div>

        {/* Card 2: Streak */}
        <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0f14] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Racha de Estudio</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4 fill-orange-400/30" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{streakDays} días</div>
            <div className="text-xs text-orange-400 font-medium mt-0.5">¡Estudio constante activo!</div>
          </div>
          <p className="text-[11px] text-zinc-500">Cada día que entras y ejecutas código sumas +1 a tu racha.</p>
        </div>

        {/* Card 3: Total XP */}
        <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0f14] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Experiencia Total</span>
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">{xp} XP</div>
            <div className="text-xs text-zinc-400 mt-0.5">Ganada con retos y quizzes</div>
          </div>
          <p className="text-[11px] text-zinc-500">100% libre sin pagos ni bloqueos.</p>
        </div>

        {/* Card 4: Completion */}
        <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0f14] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Lecciones Completadas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {completedLessonsCount} <span className="text-sm text-zinc-500 font-normal">/ {totalLessonsCount}</span>
            </div>
            <div className="text-xs text-emerald-400 font-medium mt-0.5">{progressPercent}% del catálogo total</div>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full bg-emerald-400" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

      </div>

      {/* Badges Section */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0f14] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Logros y Medallas Desbloqueables</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Recompensas por tu constancia, resolución de dudas y práctica en el editor.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">
            {badges.filter(b => b.unlocked).length} de {badges.length} desbloqueados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border flex flex-col items-center text-center space-y-2 transition-all ${
                badge.unlocked
                  ? 'border-amber-400/40 bg-amber-400/5 shadow-md shadow-amber-400/5'
                  : 'border-zinc-800/80 bg-zinc-900/40 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  badge.unlocked
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {badge.unlocked ? <Sparkles className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
              </div>

              <div className="font-bold text-xs text-white mt-1">{badge.title}</div>
              <p className="text-[11px] text-zinc-400 leading-snug">{badge.description}</p>
              
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  badge.unlocked
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {badge.unlocked ? 'Desbloqueado' : 'Bloqueado'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Certificate Section */}
      <div className="space-y-4">
        
        {/* Name Customizer Banner */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#12141a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-white">Nombre en el Certificado Oficial:</span>
              <p className="text-[11px] text-zinc-400">Personaliza tu nombre antes de imprimir o descargar.</p>
            </div>
          </div>

          <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              className="bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
              placeholder="Tu nombre completo..."
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold"
            >
              Actualizar
            </button>
          </form>
        </div>

        {/* Certificate Visual Canvas */}
        <div className="p-6 sm:p-12 rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#0c0d12] via-[#09090b] to-[#0c0d12] shadow-2xl relative overflow-hidden print:border-black print:bg-white print:text-black">
          
          {/* Subtle Decorative Golden Border Pattern */}
          <div className="absolute inset-3 border border-amber-400/30 rounded-2xl pointer-events-none" />
          <div className="absolute top-6 left-6 text-amber-400/20 font-mono text-[10px] tracking-widest uppercase">
            CERTIFICATE ID: CA-FULLSTACK-2026-JP
          </div>
          <div className="absolute top-6 right-6 text-amber-400/20 font-mono text-[10px] tracking-widest uppercase">
            VERIFIED CREDENTIAL
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-6 relative z-10 py-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>CodeAcademy • Los Jinetes Paleteros</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-mono">
              Certificado de Finalización
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400">
              Se certifica formalmente que el estudiante
            </p>

            {/* Student Name */}
            <div className="text-3xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight py-2 border-b-2 border-amber-400/40 inline-block px-8">
              {studentName}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
              Ha demostrado excelencia y dedicación completando con éxito los módulos de desarrollo web, JavaScript moderno, backend y bases de datos relacionales en la plataforma online gratuita <strong className="text-white">CodeAcademy</strong>.
            </p>

            {/* Official Signatures Row representing Los Jinetes Paleteros */}
            <div className="pt-8 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-zinc-200">Mohammad Nacher</div>
                <div className="text-[10px] text-zinc-500">Los Jinetes Paleteros</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-zinc-200">Iker Bruña</div>
                <div className="text-[10px] text-zinc-500">Los Jinetes Paleteros</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-zinc-200">Nerea Bruña</div>
                <div className="text-[10px] text-zinc-500">Los Jinetes Paleteros</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-zinc-200">Julián Barbero</div>
                <div className="text-[10px] text-zinc-500">Los Jinetes Paleteros</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-zinc-200">José Javier Andreu</div>
                <div className="text-[10px] text-zinc-500">Los Jinetes Paleteros</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-400/20"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar como PDF</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
