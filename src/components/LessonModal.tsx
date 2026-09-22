import React, { useState } from 'react';
import { Lesson, Course } from '../types';
import { 
  X, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Lightbulb, 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check,
  RotateCcw
} from 'lucide-react';

interface LessonModalProps {
  course: Course;
  lesson: Lesson;
  isOpen: boolean;
  onClose: () => void;
  onCompleteLesson: (lessonId: string, earnedXp: number) => void;
  isCompleted: boolean;
  onAskTutorWithContext: (question: string, code: string) => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  course,
  lesson,
  isOpen,
  onClose,
  onCompleteLesson,
  isCompleted,
  onAskTutorWithContext,
  onNextLesson,
  onPrevLesson
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'challenge' | 'quiz'>('theory');
  const [userCode, setUserCode] = useState(lesson.challenge.initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Quiz states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen) return null;

  // Safe client-side JavaScript execution for the interactive challenge
  const handleRunCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      originalLog(...args);
    };
    console.error = (...args: any[]) => {
      logs.push(`[ERROR] ${args.map(a => String(a)).join(' ')}`);
      originalError(...args);
    };
    console.warn = (...args: any[]) => {
      logs.push(`[WARN] ${args.map(a => String(a)).join(' ')}`);
      originalWarn(...args);
    };

    let hasExecutionError = false;
    try {
      // Evaluate within a Function constructor sandbox
      const executor = new Function(userCode);
      executor();
    } catch (err: any) {
      hasExecutionError = true;
      logs.push(`❌ Error de sintaxis o ejecución: ${err.message}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }

    setConsoleOutput(logs.length ? logs : ['(Código ejecutado sin salida por consola)']);

    // Check challenge validation
    if (hasExecutionError) {
      setValidationStatus('error');
      setValidationMessage('El código lanzó un error al ejecutarse. Revisa la consola para más detalles.');
      return;
    }

    const combinedOutput = logs.join(' ');
    const expected = lesson.challenge.expectedOutputSubstring;

    if (expected && combinedOutput.includes(expected)) {
      setValidationStatus('success');
      setValidationMessage('¡Excelente! El reto se ha completado correctamente (+50 XP ganados).');
      onCompleteLesson(lesson.id, 50);
    } else if (expected) {
      setValidationStatus('error');
      setValidationMessage(`Salida incompleta. Se esperaba que la consola incluyera: "${expected}".`);
    } else {
      setValidationStatus('success');
      setValidationMessage('¡Código ejecutado correctamente!');
      onCompleteLesson(lesson.id, 50);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedOption(index);
    setQuizSubmitted(true);
    if (index === lesson.quiz.correctIndex && !isCompleted) {
      onCompleteLesson(lesson.id, 25);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0d0f14] border border-amber-400/40 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272a] bg-[#12141a]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {course.title}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">Lección {lesson.order} de {course.lessons.length}</span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completada
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lesson Title & Subheader */}
        <div className="px-6 py-3 bg-[#09090b] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-amber-400 font-mono">#{lesson.order}</span> {lesson.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{lesson.summary}</p>
          </div>

          {/* Sub-tabs: Teoría / Reto Interactivo / Quiz */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'theory' ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              1. Teoría & Ejemplo
            </button>
            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'challenge' ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              2. Reto Interactivo
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              3. Test Rápido
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
                {lesson.theory.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Code Example Card */}
              <div className="rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                  <span className="text-xs font-mono font-semibold text-amber-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    Ejemplo de Código ({lesson.language})
                  </span>
                  <button
                    onClick={() => handleCopyCode(lesson.codeExample)}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto selection:bg-amber-400 selection:text-black">
                  <code>{lesson.codeExample}</code>
                </pre>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <button
                  onClick={() => onAskTutorWithContext(
                    `Explícame con un ejemplo muy sencillo el concepto de la lección: "${lesson.title}"`,
                    lesson.codeExample
                  )}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-amber-400/30 text-amber-300 hover:bg-zinc-800 text-xs font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  ¿Dudas con la teoría? Preguntar a CodeMentor IA
                </button>

                <button
                  onClick={() => setActiveTab('challenge')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-2"
                >
                  <span>Continuar al Reto Interactivo</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE CHALLENGE */}
          {activeTab === 'challenge' && (
            <div className="space-y-4">
              
              {/* Instructions banner */}
              <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 text-zinc-200 text-sm">
                <div className="flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Objetivo del Reto:</p>
                    <p className="text-xs text-zinc-300">{lesson.challenge.instructions}</p>
                  </div>
                </div>
              </div>

              {/* Live Interactive Code Editor & Console Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Editor Column */}
                <div className="lg:col-span-7 flex flex-col rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-xs">
                    <span className="font-mono text-zinc-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" /> editor.js
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setUserCode(lesson.challenge.initialCode)}
                        title="Restablecer código original"
                        className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 text-[11px] flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reiniciar
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    rows={12}
                    className="w-full p-3 font-mono text-xs text-zinc-100 bg-[#09090b] focus:outline-none resize-none selection:bg-amber-400 selection:text-black leading-relaxed"
                    spellCheck={false}
                  />

                  {/* Actions under editor */}
                  <div className="p-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-xs text-amber-400/80 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {showHint ? 'Ocultar Pista' : 'Ver Pista'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAskTutorWithContext(
                          `Revisa mi código para el reto "${lesson.title}": ¿por qué no funciona o cómo puedo mejorarlo?`,
                          userCode
                        )}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-medium flex items-center gap-1.5 border border-amber-400/20"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Pedir Ayuda a la IA
                      </button>

                      <button
                        onClick={handleRunCode}
                        id="btn-run-challenge-code"
                        className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md shadow-amber-400/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Ejecutar y Validar</span>
                      </button>
                    </div>
                  </div>

                  {showHint && (
                    <div className="p-3 bg-amber-400/10 border-t border-amber-400/20 text-xs text-amber-300 font-mono">
                      💡 Pista: {lesson.challenge.solutionHint}
                    </div>
                  )}
                </div>

                {/* Console Output Column */}
                <div className="lg:col-span-5 flex flex-col rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    <span>Consola de Salida (Terminal)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  <div className="flex-1 p-3 font-mono text-xs space-y-1.5 overflow-y-auto max-h-[260px] bg-black text-emerald-400">
                    {consoleOutput.length === 0 ? (
                      <span className="text-zinc-600 italic">
                        Haz clic en &ldquo;Ejecutar y Validar&rdquo; para ver el resultado de tu código aquí.
                      </span>
                    ) : (
                      consoleOutput.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                          <span className="text-zinc-600 mr-2">&gt;</span>
                          <span className={line.startsWith('❌') ? 'text-rose-400' : 'text-zinc-200'}>
                            {line}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Validation Feedback Banner */}
                  {validationStatus !== 'idle' && (
                    <div
                      className={`p-3 border-t text-xs font-medium flex items-start gap-2 ${
                        validationStatus === 'success'
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                      }`}
                    >
                      {validationStatus === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                      )}
                      <div>{validationMessage}</div>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setActiveTab('theory')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  ← Volver a la Teoría
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Ir al Test de la Lección</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="p-5 rounded-xl border border-zinc-800 bg-[#09090b] space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Pregunta de Evaluación Rápida</span>
                </div>

                <h3 className="text-base font-semibold text-white leading-snug">
                  {lesson.quiz.question}
                </h3>

                <div className="space-y-2.5 pt-2">
                  {lesson.quiz.options.map((option, idx) => {
                    let btnStyle = 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200';
                    if (quizSubmitted) {
                      if (idx === lesson.quiz.correctIndex) {
                        btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-semibold';
                      } else if (selectedOption === idx) {
                        btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && idx === lesson.quiz.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && selectedOption === idx && idx !== lesson.quiz.correctIndex && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-1">
                    <p className="font-bold text-amber-400">Explicación del tutor:</p>
                    <p className="text-zinc-300 leading-relaxed">{lesson.quiz.explanation}</p>
                  </div>
                )}
              </div>

              {/* Modal footer controls */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <button
                  onClick={onPrevLesson}
                  disabled={!onPrevLesson}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none text-xs text-zinc-300"
                >
                  ← Lección Anterior
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300"
                  >
                    Cerrar Lección
                  </button>

                  <button
                    onClick={onNextLesson}
                    disabled={!onNextLesson}
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:pointer-events-none text-black text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Siguiente Lección</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
