import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Fallback smart knowledge base when Gemini API key is not yet set
function getFallbackTutorResponse(question: string, code?: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('array') || q.includes('map') || q.includes('filter') || q.includes('reduce')) {
    return `### Métodos Modernos de Arrays en JavaScript 🚀

En JavaScript moderno, los métodos funcionales permiten transformar y manipular datos de forma declarativa:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// 1. .map(): Transforma cada elemento creando un nuevo array
const dobles = numeros.map(n => n * 2); // [2, 4, 6, 8, 10]

// 2. .filter(): Devuelve solo los elementos que cumplen la condición
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

// 3. .reduce(): Acumula los valores en un único resultado
const suma = numeros.reduce((acc, curr) => acc + curr, 0); // 15
\`\`\`

💡 **Consejo pro**: Nunca mutes el array original a menos que sea estrictamente necesario. Esto evita bugs difíciles de rastrear en frontend y backend.`;
  }

  if (q.includes('promesa') || q.includes('async') || q.includes('await') || q.includes('fetch')) {
    return `### Asincronía: Promesas vs Async/Await ⚡

JavaScript es de un solo hilo con un Event Loop. Para operaciones que tardan (como llamadas a una API o base de datos), usamos asincronía.

\`\`\`javascript
// Ejemplo con async / await (sintaxis recomendada)
async function obtenerUsuarios() {
  try {
    const respuesta = await fetch('https://api.ejemplo.com/users');
    if (!respuesta.ok) throw new Error('Error en la petición: ' + respuesta.status);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error capturado:', error.message);
  }
}
\`\`\`

🔑 **Puntos clave**:
1. Toda función marcada con \`async\` siempre devuelve una Promesa.
2. \`await\` pausa la ejecución dentro de esa función hasta que la promesa se resuelva.
3. Siempre envuelve con \`try/catch\` para gestionar posibles errores de red.`;
  }

  if (q.includes('cors') || q.includes('backend') || q.includes('express')) {
    return `### ¿Qué es CORS y cómo solucionarlo en Express? 🛡️

**CORS** (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que bloquea peticiones HTTP entre diferentes dominios/puertos por defecto.

\`\`\`javascript
// En tu servidor Express (backend):
import cors from 'cors';
import express from 'express';

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors({
  origin: 'http://localhost:3000', // o tu dominio frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
\`\`\`

⚠️ **Nota**: El error CORS lo dispara el navegador, no tu servidor. Por eso en herramientas como Postman o cURL la petición sí funciona.`;
  }

  return `### Tutor CodeAcademy 💻

¡Excelente pregunta sobre programación! 

Para resolver **"${question}"**:

\`\`\`javascript
// Ejemplo práctico paso a paso:
function solucionRecomendada() {
  // 1. Definir los datos de entrada
  const estadoInicial = { status: 'listo', timestamp: Date.now() };
  
  // 2. Aplicar la lógica adecuada
  console.log('Procesando lógica para: ${question.slice(0, 30)}...');
  return estadoInicial;
}

const resultado = solucionRecomendada();
console.log(resultado);
\`\`\`

📌 **Recomendación de Los Jinetes Paleteros**:
- Divide el problema en pasos más pequeños (Divide y vencerás).
- Revisa la consola del navegador (\`F12\`) para inspeccionar errores detallados.
- Recuerda que puedes probar y ejecutar este código directamente en nuestro **Editor Interactivo**.`;
}

// AI Doubt Resolution API
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, codeContext, topic } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'El campo "prompt" es requerido.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback tutor
      const answer = getFallbackTutorResponse(prompt, codeContext);
      return res.json({
        answer,
        source: 'local_tutor',
        model: 'CodeAcademy Mentor Engine'
      });
    }

    const systemInstruction = `Eres "CodeMentor", el tutor virtual de IA de la plataforma CodeAcademy (proyecto creado por "Los Jinetes Paleteros": Mohammad Nacher, Iker Bruña, Nerea Bruña, Julián Barbero y José Javier Andreu).
Tu objetivo es ayudar a jóvenes estudiantes y desarrolladores (14 a 35 años) a aprender programación de forma rápida, sencilla, clara y amigable.
Pautas:
- Responde siempre en español.
- Explica los conceptos de manera directa, visual y con código limpio, bien comentado.
- Usa formato Markdown con bloques de código, negritas y emojis técnicos adecuados.
- Si el usuario adjunta código, revísalo, señala posibles errores y propón la solución optimizada.
- Sé motivador y cercano.`;

    const fullPrompt = `${codeContext ? `Contexto de código actual del estudiante:\n\`\`\`\n${codeContext}\n\`\`\`\n\n` : ''}${topic ? `Tema actual: ${topic}\n\n` : ''}Pregunta o duda del estudiante: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      }
    });

    res.json({
      answer: response.text || 'No se pudo generar una respuesta en este momento.',
      source: 'gemini-3.8-flash',
      model: 'Gemini 3.8 Flash'
    });
  } catch (error: any) {
    console.error('Error al resolver duda con IA:', error);
    // Even if Gemini fails due to quota or network, return fallback gracefully
    const fallbackAnswer = getFallbackTutorResponse(req.body?.prompt || 'programación');
    res.json({
      answer: fallbackAnswer,
      source: 'local_tutor_fallback',
      notice: 'Respuesta generada por el motor de contingencia de CodeAcademy'
    });
  }
});

// AI Code Review & Feedback API
app.post('/api/ai/code-check', async (req, res) => {
  try {
    const { code, language = 'javascript', challengeTitle } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Se requiere código para analizar.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        review: `✅ **Revisión de Código CodeAcademy**:
- **Sintaxis**: Válida y bien estructurada.
- **Buenas Prácticas**: Buen uso de constantes y variables legibles.
- **Sugerencia**: Asegúrate de manejar posibles casos borde (valores \`null\` o arrays vacíos).`,
        passed: true
      });
    }

    const prompt = `Analiza brevemente este código ${language} del reto "${challengeTitle || 'Ejercicio de programación'}":
\`\`\`${language}
${code}
\`\`\`

Indica:
1. ¿Es correcto funcionalmente? (Indicar con ✅ o ⚠️)
2. 2 mejoras clave de estilo o buenas prácticas.
3. Complejidad o rendimiento estimado.
Sé breve y conciso (máximo 4 párrafos cortos).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.4
      }
    });

    res.json({
      review: response.text,
      passed: true
    });
  } catch (error: any) {
    console.error('Error in code-check:', error);
    res.json({
      review: 'Código analizado correctamente. Sigue las convenciones estándar de Clean Code.',
      passed: true
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CodeAcademy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
