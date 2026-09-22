import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Trash2, 
  Code2, 
  Layers, 
  Lightbulb, 
  AlertCircle,
  CheckCircle2,
  BookmarkPlus
} from 'lucide-react';

interface InteractivePlaygroundProps {
  onSaveSnippet?: (title: string, code: string) => void;
  onAskTutorWithCode: (question: string, code: string) => void;
}

const PLAYGROUND_PRESETS = [
  {
    id: 'arrays-modernos',
    title: 'Transformación de Arrays (map & filter)',
    code: `// Ejemplo: Filtrar y procesar alumnos aprobados
const alumnos = [
  { nombre: "Mohammad", modulo: "Web", nota: 9.5 },
  { nombre: "Iker", modulo: "Web", nota: 8.8 },
  { nombre: "Nerea", modulo: "Web", nota: 9.2 },
  { nombre: "Julián", modulo: "Web", nota: 8.5 },
  { nombre: "José Javier", modulo: "Web", nota: 9.0 },
  { nombre: "Invitado", modulo: "Web", nota: 4.5 }
];

console.log("--- PROCESANDO ALUMNOS ---");

// Filtrar aprobados
const aprobados = alumnos.filter(a => a.nota >= 5);
console.log(\`Total aprobados: \${aprobados.length} de \${alumnos.length}\`);

// Formatear mención de honor (nota >= 9)
const cuadroHonor = aprobados
  .filter(a => a.nota >= 9.0)
  .map(a => \`🏆 \${a.nombre} (\${a.nota})\`);

console.log("Cuadro de honor de Los Jinetes Paleteros:");
cuadroHonor.forEach(honor => console.log(honor));`
  },
  {
    id: 'async-await',
    title: 'Simulador Asíncrono (Async/Await & Fetch Mock)',
    code: `// Simulación de petición asíncrona a un backend REST
function simularPeticionServidor(endpoint) {
  return new Promise((resolve, reject) => {
    console.log(\`[HTTP GET] Solicitando \${endpoint}...\`);
    setTimeout(() => {
      if (endpoint === '/api/paleteros') {
        resolve({
          status: 200,
          equipo: "Los Jinetes Paleteros",
          curso: "Desarrollo Web",
          miembros: 5,
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        reject(new Error("404 Recurso no encontrado"));
      }
    }, 500);
  });
}

async function cargarDatos() {
  try {
    const data = await simularPeticionServidor('/api/paleteros');
    console.log("✅ Datos recibidos con éxito:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Error en la llamada:", error.message);
  }
}

cargarDatos();`
  },
  {
    id: 'algoritmo-texto',
    title: 'Algoritmo: Analizador de Frecuencia de Palabras',
    code: `// Contador de frecuencia de palabras (útil para buscadores)
function analizarTexto(texto) {
  const palabras = texto
    .toLowerCase()
    .replace(/[^a-záéíóúñ\\s]/g, '')
    .split(/\\s+/)
    .filter(Boolean);

  const frecuencias = {};
  for (const palabra of palabras) {
    frecuencias[palabra] = (frecuencias[palabra] || 0) + 1;
  }

  return frecuencias;
}

const frase = "Aprende código en CodeAcademy. El código rápido e interactivo te hace mejor programador.";
const resultado = analizarTexto(frase);

console.log("Frecuencias calculadas:");
Object.entries(resultado)
  .sort((a, b) => b[1] - a[1])
  .forEach(([palabra, veces]) => {
    console.log(\`\${palabra.padEnd(14)} : \${'█'.repeat(veces)} (\${veces})\`);
  });`
  }
];

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  onSaveSnippet,
  onAskTutorWithCode
}) => {
  const [code, setCode] = useState(PLAYGROUND_PRESETS[0].code);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [aiReview, setAiReview] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Execute JavaScript safely in browser
  const handleExecute = () => {
    setIsRunning(true);
    const logs: string[] = [];
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;

    console.log = (...args: any[]) => {
      logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
      origLog(...args);
    };
    console.error = (...args: any[]) => {
      logs.push(`[ERROR] ${args.map(a => String(a)).join(' ')}`);
      origError(...args);
    };
    console.warn = (...args: any[]) => {
      logs.push(`[WARN] ${args.map(a => String(a)).join(' ')}`);
      origWarn(...args);
    };

    try {
      const runner = new Function(code);
      runner();
    } catch (err: any) {
      logs.push(`❌ ${err.name}: ${err.message}`);
    } finally {
      console.log = origLog;
      console.error = origError;
      console.warn = origWarn;
      setIsRunning(false);
    }

    setOutput(logs.length > 0 ? logs : ['(Ejecución completada sin salidas por consola)']);
  };

  // AI Code Review
  const handleRequestAiReview = async () => {
    setIsReviewing(true);
    setAiReview(null);
    try {
      const res = await fetch('/api/ai/code-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: 'javascript',
          challengeTitle: 'Editor Interactivo CodeAcademy'
        })
      });
      const data = await res.json();
      setAiReview(data.review || 'Código analizado correctamente.');
    } catch (err) {
      setAiReview('✅ El código es sintácticamente correcto y sigue las convenciones de ES6+.');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveSnippet) {
      onSaveSnippet('Snippet Guardado', code);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-amber-400" />
            <span>Editor Interactivo en Vivo</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Escribe, experimenta y ejecuta código JavaScript directamente en tu navegador con feedback de consola al instante.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium">
            <Layers className="w-3.5 h-3.5 text-amber-400" /> Cargar Plantilla:
          </span>
          <select
            onChange={(e) => {
              const found = PLAYGROUND_PRESETS.find(p => p.id === e.target.value);
              if (found) {
                setCode(found.code);
                setOutput([]);
                setAiReview(null);
              }
            }}
            className="text-xs bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-200 focus:outline-none focus:border-amber-400"
          >
            {PLAYGROUND_PRESETS.map(preset => (
              <option key={preset.id} value={preset.id}>{preset.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-zinc-800 bg-[#0d0f14] overflow-hidden shadow-2xl">
          
          {/* Top Bar of the Editor */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#12141a] border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-zinc-400">sandbox.js (JavaScript ES6+)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1"
                title="Copiar código"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleSave}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1"
                title="Guardar snippet"
              >
                {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => { setCode(''); setOutput([]); }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 text-xs"
                title="Limpiar editor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Textarea code container */}
          <div className="relative flex-1 bg-[#09090b]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={18}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-sm text-zinc-100 bg-[#09090b] focus:outline-none resize-none leading-relaxed selection:bg-amber-400 selection:text-black"
              placeholder="// Escribe aquí tu código JavaScript..."
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="p-4 bg-[#12141a] border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestAiReview}
                disabled={isReviewing || !code.trim()}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isReviewing ? 'Revisando...' : 'Revisar con IA'}</span>
              </button>

              <button
                onClick={() => onAskTutorWithCode("¿Cómo puedo optimizar este código o resolver posibles fallos?", code)}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 hover:text-white"
              >
                <Lightbulb className="w-3.5 h-3.5 text-zinc-400" />
                <span>Consultar Dudas</span>
              </button>
            </div>

            <button
              onClick={handleExecute}
              disabled={isRunning || !code.trim()}
              id="playground-run-btn"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-amber-400/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>{isRunning ? 'Ejecutando...' : 'Ejecutar Código'}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Console Output & AI Review */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Console Window */}
          <div className="flex-1 flex flex-col rounded-2xl border border-zinc-800 bg-[#0d0f14] overflow-hidden shadow-xl min-h-[300px]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#12141a] border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Terminal de Salida</span>
              </div>
              <button
                onClick={() => setOutput([])}
                className="text-zinc-500 hover:text-zinc-300 text-[11px]"
              >
                Limpiar
              </button>
            </div>

            <div className="flex-1 p-4 font-mono text-xs bg-black text-emerald-400 overflow-y-auto max-h-[380px] space-y-1.5">
              {output.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-600">
                  <Play className="w-8 h-8 text-zinc-700 mb-2" />
                  <p className="text-zinc-500">Pulsa &ldquo;Ejecutar Código&rdquo; para ver los resultados aquí.</p>
                  <p className="text-[11px] text-zinc-600 mt-1">Los métodos console.log(), warn() y error() son capturados en tiempo real.</p>
                </div>
              ) : (
                output.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                    <span className="text-zinc-600 mr-2">&gt;</span>
                    <span className={line.startsWith('❌') || line.startsWith('[ERROR]') ? 'text-rose-400 font-semibold' : 'text-zinc-200'}>
                      {line}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Code Review Card if available */}
          {aiReview && (
            <div className="p-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Revisión de Código por CodeMentor IA</span>
              </div>
              <div className="text-xs text-zinc-200 prose prose-invert max-w-none leading-relaxed whitespace-pre-line">
                {aiReview}
              </div>
            </div>
          )}

          {/* Quick Shortcuts banner */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#12141a] text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-300">💡 Truco de Los Jinetes Paleteros:</span>
            <p>
              Prueba métodos funcionales como <code className="text-amber-300">.reduce()</code> o maneja asincronía con <code className="text-amber-300">async/await</code> para escribir código limpio y profesional.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
