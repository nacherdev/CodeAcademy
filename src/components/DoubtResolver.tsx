import React, { useState, useRef, useEffect } from 'react';
import { AiChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code2, 
  User, 
  Copy, 
  Check, 
  RotateCcw, 
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface DoubtResolverProps {
  initialCodeContext?: string;
  initialQuestion?: string;
  onSendCodeToPlayground?: (code: string) => void;
}

const COMMON_QUESTIONS = [
  '¿Cómo solucionar el error CORS en Express?',
  'Diferencia real entre Array.map() y Array.forEach()',
  '¿Cómo funciona el Event Loop y async/await en JS?',
  '¿Cuándo usar clave primaria vs clave foránea en SQL?',
  '¿Por qué usar const en lugar de let por defecto?',
  '¿Cómo centrar un div en CSS con Flexbox?'
];

export const DoubtResolver: React.FC<DoubtResolverProps> = ({
  initialCodeContext = '',
  initialQuestion = '',
  onSendCodeToPlayground
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `👋 ¡Hola! Soy **CodeMentor**, el asistente inteligente de resolución de dudas 24/7 de **CodeAcademy** (proyecto de *Los Jinetes Paleteros*).

¿Tienes dudas con sintaxis, errores de consola, APIs en Express o consultas SQL? 
Pregúntame lo que necesites o pega tu código para revisarlo.`,
      timestamp: 'Ahora',
      modelUsed: 'CodeMentor 24/7'
    }
  ]);

  const [inputQuery, setInputQuery] = useState(initialQuestion);
  const [codeContext, setCodeContext] = useState(initialCodeContext);
  const [showCodeInput, setShowCodeInput] = useState(!!initialCodeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuestion) {
      setInputQuery(initialQuestion);
    }
    if (initialCodeContext) {
      setCodeContext(initialCodeContext);
      setShowCodeInput(true);
    }
  }, [initialQuestion, initialCodeContext]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: AiChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      codeSnippet: codeContext.trim() ? codeContext : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          codeContext: userMsg.codeSnippet,
          topic: 'Desarrollo Web'
        })
      });

      const data = await res.json();

      const tutorMsg: AiChatMessage = {
        id: 'tutor-' + Date.now(),
        sender: 'tutor',
        text: data.answer || 'No se pudo obtener respuesta del tutor.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || 'Gemini 3.8 Flash'
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (err: any) {
      const errorMsg: AiChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'tutor',
        text: `Lo siento, ocurrió una incidencia temporal al conectar con el servidor: ${err.message}. Por favor intenta de nuevo en unos segundos.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to extract first code block for sending to playground
  const extractCodeBlock = (markdownText: string): string | null => {
    const match = markdownText.match(/```(?:javascript|js|html|css)?\n([\s\S]*?)```/);
    return match ? match[1].trim() : null;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-amber-400" />
            <span>Resolución de Dudas en Cualquier Momento (24/7)</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tutor de Inteligencia Artificial especializado en programación para estudiantes y desarrolladores.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
            setCodeContext('');
            setShowCodeInput(false);
          }}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Nueva Consulta</span>
        </button>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-2">
        <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Consultas frecuentes recomendadas:
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_QUESTIONS.map((question, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(question)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400/40 text-zinc-300 hover:text-amber-300 transition-all text-left"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0f14] overflow-hidden shadow-2xl flex flex-col h-[600px]">
        
        {/* Chat Banner Info */}
        <div className="px-5 py-3 bg-[#12141a] border-b border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">CodeMentor AI Online</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">Impulsado por Gemini 3.8 Flash & Los Jinetes Paleteros</span>
          </div>

          <span className="text-amber-400 font-mono text-[11px]">Respuesta Inmediata</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#09090b]">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            const codeInAnswer = isTutor ? extractCodeBlock(msg.text) : null;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isTutor ? '' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isTutor
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                  }`}
                >
                  {isTutor ? <Bot className="w-4 h-4 stroke-[2.5]" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`space-y-2 flex-1 ${isTutor ? '' : 'text-right'}`}>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <span className={isTutor ? 'font-semibold text-amber-400' : 'text-zinc-400'}>
                      {isTutor ? 'CodeMentor Tutor' : 'Tú'}
                    </span>
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                      isTutor
                        ? 'bg-[#12141a] border border-zinc-800 text-zinc-200 shadow-sm'
                        : 'bg-amber-400 text-black font-medium ml-auto rounded-tr-none'
                    }`}
                  >
                    {/* Render message body */}
                    <div className="whitespace-pre-wrap space-y-2">
                      {msg.text}
                    </div>

                    {/* If user attached code context */}
                    {msg.codeSnippet && (
                      <div className="mt-3 p-3 rounded-lg bg-black/60 border border-zinc-700 text-xs font-mono text-zinc-300 overflow-x-auto">
                        <div className="text-[10px] text-zinc-400 mb-1 font-semibold uppercase">Código adjuntado:</div>
                        <code>{msg.codeSnippet}</code>
                      </div>
                    )}

                    {/* Action buttons on tutor answer */}
                    {isTutor && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-3 text-xs">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="text-zinc-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'Copiado' : 'Copiar respuesta'}</span>
                        </button>

                        {codeInAnswer && onSendCodeToPlayground && (
                          <button
                            onClick={() => onSendCodeToPlayground(codeInAnswer)}
                            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Probar código en el Editor</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-black flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="p-4 rounded-2xl bg-[#12141a] border border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>CodeMentor está analizando tu consulta...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#12141a] border-t border-zinc-800 space-y-3">
          
          {/* Collapsible Code Context Input */}
          {showCodeInput ? (
            <div className="rounded-xl border border-zinc-800 bg-[#09090b] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-xs">
                <span className="text-zinc-400 font-mono flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" /> Código a revisar (opcional)
                </span>
                <button
                  onClick={() => setShowCodeInput(false)}
                  className="text-zinc-500 hover:text-zinc-300 text-[11px]"
                >
                  Ocultar
                </button>
              </div>
              <textarea
                value={codeContext}
                onChange={(e) => setCodeContext(e.target.value)}
                placeholder="// Pega aquí el fragmento de código que te está dando problemas..."
                rows={4}
                className="w-full p-3 font-mono text-xs text-zinc-200 bg-[#09090b] focus:outline-none resize-none leading-relaxed selection:bg-amber-400 selection:text-black"
                spellCheck={false}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowCodeInput(true)}
              className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 font-medium transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Adjuntar código para revisión</span>
            </button>
          )}

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Escribe tu duda técnica (ej: ¿Por qué mi fetch da error 404?)..."
              disabled={isLoading}
              className="flex-1 bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              id="doubt-send-btn"
              className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold disabled:opacity-50 disabled:pointer-events-none transition-transform active:scale-95 shadow-md shadow-amber-400/20"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
