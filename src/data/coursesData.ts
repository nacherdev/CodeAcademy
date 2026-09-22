import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'javascript-moderno',
    title: 'JavaScript Moderno ES6+ & Lógica',
    track: 'frontend',
    level: 'Principiante',
    duration: '2h 30m',
    shortDesc: 'Aprende el lenguaje de la web desde cero: sintaxis moderna, funciones flecha, desestructuración y arrays funcionales.',
    icon: 'FileCode2',
    badge: 'Popular',
    accentColor: '#facc15',
    lessons: [
      {
        id: 'js-1',
        courseId: 'javascript-moderno',
        order: 1,
        title: 'Variables Modernas: const, let y Template Strings',
        duration: '10 min',
        summary: 'Olvídate de "var". Domina el ámbito de bloque y cómo concatenar cadenas limpiamente.',
        theory: `En JavaScript moderno (**ES6+**), dejamos de usar \`var\` para evitar problemas de hoisting y ámbito global accidental.

- **\`const\`**: Úsalo por defecto para valores que no se van a reasignar. Si es un array u objeto, sus propiedades internas sí pueden cambiar, pero la referencia no.
- **\`let\`**: Úsalo únicamente cuando el valor necesite ser reasignado (por ejemplo, en bucles \`for\` o contadores).
- **Template Literals**: Se escriben con acentos graves (\`\`\`) y permiten insertar expresiones directamente con \`\${variable}\`.`,
        codeExample: `const nombre = 'Paletero Dev';
let nivel = 2;

// Template string
const mensaje = \`¡Hola \${nombre}! Estás en el nivel \${nivel} de programación.\`;
console.log(mensaje);

nivel += 1;
console.log(\`Nuevo nivel: \${nivel}\`);`,
        language: 'javascript',
        challenge: {
          instructions: 'Declara una constante `lenguaje` con el valor "JavaScript" y una variable `alumnos` con el número 5. Luego imprime por consola con template literals: "Aprendiendo JavaScript con 5 compañeros".',
          initialCode: `// Escribe tu código aquí:
const lenguaje = "JavaScript";
let alumnos = 5;

// Imprime con console.log usando template literals:
console.log(\`Aprendiendo \${lenguaje} con \${alumnos} compañeros\`);`,
          solutionHint: 'Utiliza console.log(`Aprendiendo ${lenguaje} con ${alumnos} compañeros`);',
          expectedOutputSubstring: 'Aprendiendo JavaScript con 5 compañeros'
        },
        quiz: {
          question: '¿Cuándo se debe utilizar "const" en lugar de "let"?',
          options: [
            'Solo cuando el valor sea numérico',
            'Siempre por defecto, salvo que la variable deba reasignarse',
            'Únicamente para funciones asíncronas',
            'Nunca, let es más moderno'
          ],
          correctIndex: 1,
          explanation: 'La regla de oro del Clean Code en JavaScript es usar const por defecto y solo cambiar a let si explícitamente reasignamos la variable.'
        }
      },
      {
        id: 'js-2',
        courseId: 'javascript-moderno',
        order: 2,
        title: 'Arrays Funcionales: map() y filter()',
        duration: '12 min',
        summary: 'Aprende a transformar y filtrar colecciones de datos sin mutar el array original.',
        theory: `Los métodos funcionales de Array son fundamentales en el desarrollo web moderno:

- **\`map(callback)\`**: Transforma cada elemento de un array y devuelve un **nuevo array** del mismo tamaño con los resultados.
- **\`filter(callback)\`**: Evalúa una condición booleana para cada elemento y devuelve un **nuevo array** que contiene solo los que devuelvan \`true\`.
- Ambos métodos respetan la inmutabilidad: el array original no sufre cambios.`,
        codeExample: `const puntuaciones = [12, 45, 80, 95, 60];

// Filtrar aprobados (>= 50)
const aprobados = puntuaciones.filter(p => p >= 50);
console.log('Aprobados:', aprobados);

// Bonificar con +5 puntos a todos
const conBonus = aprobados.map(p => p + 5);
console.log('Con bonus:', conBonus);`,
        language: 'javascript',
        challenge: {
          instructions: 'Dado el array de precios `[10, 25, 40, 5, 80]`, utiliza `.filter()` para obtener solo los precios mayores de 20, y luego con `.map()` aplica un descuento del 10% (multiplicando por 0.9). Muestra el array resultante con console.log.',
          initialCode: `const precios = [10, 25, 40, 5, 80];

// Filtra precios > 20 y luego mapea con descuento * 0.9:
const resultado = precios
  .filter(p => p > 20)
  .map(p => p * 0.9);

console.log('Precios finales:', resultado);`,
          solutionHint: 'precios.filter(p => p > 20).map(p => p * 0.9)',
          expectedOutputSubstring: 'Precios finales:'
        },
        quiz: {
          question: '¿Qué devuelve el método Array.prototype.map()?',
          options: [
            'Un número que representa la suma total',
            'Un nuevo array con los resultados de la función aplicada a cada elemento',
            'Modifica el array original directamente sin devolver nada',
            'Un booleano indicando si todos los elementos cumplen la condición'
          ],
          correctIndex: 1,
          explanation: 'map() crea y retorna un nuevo array transformado, sin alterar el array original.'
        }
      },
      {
        id: 'js-3',
        courseId: 'javascript-moderno',
        order: 3,
        title: 'Asincronía en JS: Promesas y Async / Await',
        duration: '15 min',
        summary: 'Domina el Event Loop, llamadas a APIs REST y el manejo elegante con try...catch.',
        theory: `JavaScript ejecuta código en un único hilo. Para operaciones no bloqueantes (como peticiones de red o temporizadores), utilizamos **Promesas** y la sintaxis **\`async / await\`**.

\`async\` convierte una función normal en una función que devuelve una promesa.
\`await\` suspende la ejecución hasta que la promesa se resuelve o rechaza.

Siempre es buena práctica envolver llamadas asíncronas dentro de un bloque \`try...catch\` para prevenir caídas de la aplicación.`,
        codeExample: `// Simulación de función asíncrona que consulta datos
async function consultarDatosServidor() {
  console.log('Consultando servidor...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, modulo: 'Desarrollo Web', grupo: 'Los Jinetes Paleteros' });
    }, 400);
  });
}

async function ejecutar() {
  try {
    const res = await consultarDatosServidor();
    console.log('Respuesta recibida:', res.grupo);
  } catch (error) {
    console.error('Fallo en la petición:', error);
  }
}

ejecutar();`,
        language: 'javascript',
        challenge: {
          instructions: 'Crea una función asíncrona `obtenerEstado()` que devuelva el string "Servidor Activo", y ejecútala usando `await` dentro de una función autoejecutable o llamándola para imprimir el mensaje con console.log.',
          initialCode: `async function obtenerEstado() {
  return "Servidor Activo";
}

async function inicio() {
  const estado = await obtenerEstado();
  console.log("Estado:", estado);
}

inicio();`,
          solutionHint: 'Declara la función con async y resuélvela con await.',
          expectedOutputSubstring: 'Estado: Servidor Activo'
        },
        quiz: {
          question: '¿Qué ocurre si ocurre un error dentro de una función con "await" sin un bloque try/catch?',
          options: [
            'Se ignora automáticamente',
            'La promesa se rechaza con un "UnhandledPromiseRejection"',
            'El navegador se reinicia automáticamente',
            'Se convierte automáticamente en una cadena de texto vacía'
          ],
          correctIndex: 1,
          explanation: 'Sin try/catch, un error en await genera una excepción no controlada que rechaza la promesa devuelta por la función asíncrona.'
        }
      }
    ]
  },
  {
    id: 'backend-express',
    title: 'Desarrollo Backend con Node.js & Express',
    track: 'backend',
    level: 'Intermedio',
    duration: '3h 15m',
    shortDesc: 'Aprende arquitectura de servidores, rutas REST, middlewares, controladores y código de estado HTTP profesional.',
    icon: 'Server',
    badge: 'Backend Pro',
    accentColor: '#f59e0b',
    lessons: [
      {
        id: 'node-1',
        courseId: 'backend-express',
        order: 1,
        title: 'Creación de un Servidor REST con Express',
        duration: '15 min',
        summary: 'Aprende los métodos HTTP (GET, POST, PUT, DELETE) y la estructura de una API REST profesional.',
        theory: `**Express** es el framework minimalista más utilizado en Node.js.
Una API REST define puntos de entrada (**endpoints**) que responden con datos en formato JSON:

- **\`GET\`**: Obtener datos o recursos.
- **\`POST\`**: Crear un nuevo recurso.
- **\`PUT / PATCH\`**: Actualizar un recurso existente.
- **\`DELETE\`**: Eliminar un recurso.

Usamos \`express.json()\` como middleware para interpretar automáticamente el cuerpo de las peticiones con JSON.`,
        codeExample: `// Estructura de servidor Express básico
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint de prueba
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend de CodeAcademy!' });
});

console.log('Servidor configurado en el puerto ' + PORT);`,
        language: 'javascript',
        challenge: {
          instructions: 'Simula un objeto de respuesta API creando un objeto `respuesta` con las propiedades `status: 200`, `datos: ["HTML", "CSS", "JS", "Node"]` y `autor: "Los Jinetes Paleteros"`. Luego imprímelo con console.log.',
          initialCode: `// Simula una respuesta de API REST:
const respuesta = {
  status: 200,
  datos: ["HTML", "CSS", "JS", "Node"],
  autor: "Los Jinetes Paleteros"
};

console.log("Respuesta API:", JSON.stringify(respuesta));`,
          solutionHint: 'Crea el objeto con las propiedades pedidas y muéstralo con JSON.stringify.',
          expectedOutputSubstring: 'Respuesta API:'
        },
        quiz: {
          question: '¿Cuál es el código de estado HTTP estándar para indicar que un recurso ha sido creado con éxito?',
          options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
          correctIndex: 1,
          explanation: 'El código 201 Created indica que la solicitud ha tenido éxito y ha llevado a la creación de un nuevo recurso en el servidor.'
        }
      },
      {
        id: 'node-2',
        courseId: 'backend-express',
        order: 2,
        title: 'Middlewares y Gestión de Errores',
        duration: '15 min',
        summary: 'Cómo interceptar peticiones, validar autenticación y capturar excepciones centralizadas.',
        theory: `Un **middleware** es una función que tiene acceso al objeto de solicitud (\`req\`), al objeto de respuesta (\`res\`) y a la siguiente función de middleware en el ciclo de solicitud-respuesta (\`next\`).

Los middlewares son esenciales para:
- Registro de logs (p. ej. morgan)
- Validación de tokens JWT
- Manejo centralizado de errores 404 y 500`,
        codeExample: `// Middleware de logging
function loggerMiddleware(req, res, next) {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pasa al siguiente middleware o controlador
}

console.log('Middleware logger preparado.');`,
        language: 'javascript',
        challenge: {
          instructions: 'Crea una función middleware simulada `validarRol(rol)` que verifique si el rol es "admin" o "estudiante". Si es válido, imprime "Acceso concedido", sino imprime "Acceso denegado". Prueba con el rol "estudiante".',
          initialCode: `function validarRol(rol) {
  if (rol === 'admin' || rol === 'estudiante') {
    console.log("Acceso concedido para: " + rol);
  } else {
    console.log("Acceso denegado");
  }
}

validarRol('estudiante');`,
          solutionHint: 'Verifica rol === "admin" || rol === "estudiante" con un condicional if/else.',
          expectedOutputSubstring: 'Acceso concedido para: estudiante'
        },
        quiz: {
          question: '¿Qué parámetro se debe invocar en un middleware de Express para continuar hacia la siguiente ruta?',
          options: ['res.send()', 'next()', 'continue()', 'app.listen()'],
          correctIndex: 1,
          explanation: 'next() le indica a Express que ejecute el siguiente middleware en la cadena de ejecución.'
        }
      }
    ]
  },
  {
    id: 'html-css-moderno',
    title: 'HTML5 Semántico & CSS3 Flexbox / Grid',
    track: 'frontend',
    level: 'Principiante',
    duration: '2h 00m',
    shortDesc: 'Aprende a estructurar páginas web accesibles y maquetar interfaces responsivas con Flexbox y CSS Grid moderno.',
    icon: 'Layout',
    badge: 'Esencial',
    accentColor: '#38bdf8',
    lessons: [
      {
        id: 'css-1',
        courseId: 'html-css-moderno',
        order: 1,
        title: 'Flexbox: Eje Principal y Eje Cruzado',
        duration: '10 min',
        summary: 'Domina justify-content, align-items y flex-direction para alinear cualquier interfaz sin dolor.',
        theory: `**Flexbox** es el modelo de caja unidimensional de CSS. Permite distribuir espacio entre elementos y alinearlos de forma predecible:

- \`display: flex;\`: Convierte el contenedor en un flex container.
- \`justify-content\`: Alinea a lo largo del **eje principal** (\`center\`, \`space-between\`, \`flex-start\`).
- \`align-items\`: Alinea a lo largo del **eje transversal** (\`center\`, \`stretch\`, \`flex-end\`).
- \`gap\`: Espacio constante entre elementos sin recurrir a márgenes sucios.`,
        codeExample: `/* Estilos Flexbox modernos */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: #09090b;
  color: #facc15;
  padding: 1rem 2rem;
}`,
        language: 'css',
        challenge: {
          instructions: 'Simula el cálculo de ancho flex: Si tienes 3 tarjetas iguales en un contenedor con gap de 20px, define una variable `anchoTarjeta` como "calc((100% - 40px) / 3)" e imprímela por consola.',
          initialCode: `const totalGap = 20 * 2; // 40px para 3 tarjetas
const formulaFlex = \`calc((100% - \${totalGap}px) / 3)\`;
console.log("Ancho por columna flex:", formulaFlex);`,
          solutionHint: 'Utiliza template strings para armar la regla calc.',
          expectedOutputSubstring: 'Ancho por columna flex: calc((100% - 40px) / 3)'
        },
        quiz: {
          question: '¿Qué propiedad de Flexbox controla la alineación en el eje vertical cuando flex-direction es "row"?',
          options: ['justify-content', 'align-items', 'flex-wrap', 'order'],
          correctIndex: 1,
          explanation: 'Con flex-direction: row, el eje principal es horizontal y el eje cruzado es vertical, controlado por align-items.'
        }
      }
    ]
  },
  {
    id: 'bases-datos-sql',
    title: 'Bases de Datos Relacionales & SQL',
    track: 'database',
    level: 'Intermedio',
    duration: '2h 45m',
    shortDesc: 'Diseño de modelos relacionales, claves primarias y foráneas, consultas complejas con JOINs y normalización.',
    icon: 'Database',
    badge: 'Bases de Datos',
    accentColor: '#10b981',
    lessons: [
      {
        id: 'sql-1',
        courseId: 'bases-datos-sql',
        order: 1,
        title: 'Consultas SELECT, Filtros WHERE y Ordenación',
        duration: '12 min',
        summary: 'Aprende a extraer información precisa de una base de datos relacional de forma eficiente.',
        theory: `El lenguaje **SQL** (Structured Query Language) es el estándar de facto para consultar bases de datos relacionales como PostgreSQL, MySQL y MariaDB:

- **\`SELECT\`**: Especifica las columnas que queremos obtener.
- **\`FROM\`**: La tabla donde residen los datos.
- **\`WHERE\`**: Condiciones lógicas (\`AND\`, \`OR\`, \`IN\`, \`LIKE\`).
- **\`ORDER BY\`**: Ordenar ascendente (\`ASC\`) o descendente (\`DESC\`).
- **\`LIMIT\`**: Limita el número de filas recibidas.`,
        codeExample: `-- Ejemplo de consulta SQL:
SELECT id, nombre, email, fecha_registro
FROM usuarios
WHERE activo = true AND edad >= 18
ORDER BY fecha_registro DESC
LIMIT 10;`,
        language: 'sql',
        challenge: {
          instructions: 'Escribe una simulación de query SQL en JavaScript creando una cadena `consultaSQL` que seleccione `titulo` y `calificacion` de la tabla `cursos` donde `gratuito = true` ordenado por `calificacion DESC`. Imprímela por consola.',
          initialCode: `const consultaSQL = "SELECT titulo, calificacion FROM cursos WHERE gratuito = true ORDER BY calificacion DESC";
console.log("Query generada:", consultaSQL);`,
          solutionHint: 'Asigna el string de la consulta SQL y muéstralo con console.log.',
          expectedOutputSubstring: 'Query generada: SELECT titulo, calificacion FROM cursos WHERE gratuito = true ORDER BY calificacion DESC'
        },
        quiz: {
          question: '¿Cuál es la función principal de una Foreign Key (clave foránea)?',
          options: [
            'Encriptar las contraseñas de los usuarios',
            'Garantizar la integridad referencial relacionando dos tablas',
            'Acelerar la conexión a internet del servidor',
            'Evitar que la base de datos se quede sin memoria RAM'
          ],
          correctIndex: 1,
          explanation: 'Una clave foránea establece un vínculo entre los datos de dos tablas, asegurando que un registro hijo apunte siempre a un registro padre existente.'
        }
      }
    ]
  },
  {
    id: 'git-github-dev',
    title: 'Control de Versiones con Git & GitHub',
    track: 'tools',
    level: 'Principiante',
    duration: '1h 45m',
    shortDesc: 'Aprende el flujo de trabajo en equipo: commits atómicos, ramas feature, resolución de conflictos y Pull Requests.',
    icon: 'GitBranch',
    badge: 'Indispensable',
    accentColor: '#f97316',
    lessons: [
      {
        id: 'git-1',
        courseId: 'git-github-dev',
        order: 1,
        title: 'El Flujo de Trabajo: Working Directory, Staging y Commit',
        duration: '10 min',
        summary: 'Entiende las tres áreas de Git y cómo guardar versiones limpias y rastreables de tu código.',
        theory: `Git es un sistema de control de versiones distribuido. Sus tres zonas principales son:

1. **Directorio de trabajo (Working Directory)**: Donde editas tus archivos.
2. **Área de preparación (Staging Area / Index)**: Seleccionas qué cambios formarán parte del próximo paquete con \`git add .\`.
3. **Repositorio local (Commit History)**: Guardas una instantánea permanente con \`git commit -m "feat: nuevo componente"\`.`,
        codeExample: `# Comandos fundamentales diarios:
git status
git add .
git commit -m "feat: añadir cursos interactivos"
git push origin main`,
        language: 'bash',
        challenge: {
          instructions: 'Declara un array `comandosGit` con los pasos básicos: "git add .", "git commit -m \\"mensaje\\"", "git push". Recórrelos e imprímelos con formato paso a paso.',
          initialCode: `const comandosGit = ["git add .", "git commit -m \\"avance proyecto\\"", "git push origin main"];
comandosGit.forEach((cmd, idx) => {
  console.log(\`Paso \${idx + 1}: \${cmd}\`);
});`,
          solutionHint: 'Utiliza un bucle forEach para imprimir cada comando numerado.',
          expectedOutputSubstring: 'Paso 1: git add .'
        },
        quiz: {
          question: '¿Qué comando crea y cambia inmediatamente a una nueva rama en Git?',
          options: [
            'git branch nueva-rama',
            'git checkout -b nueva-rama (o git switch -c nueva-rama)',
            'git commit -b nueva-rama',
            'git merge nueva-rama'
          ],
          correctIndex: 1,
          explanation: 'La opción -b en checkout (o -c en switch) crea la rama y salta a ella en una sola instrucción.'
        }
      }
    ]
  }
];

export const INITIAL_BADGES = [
  {
    id: 'first-code',
    title: 'Primer Hola Mundo',
    description: 'Completaste tu primera ejecución en el editor interactivo.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: 'Hoy',
    category: 'Iniciación'
  },
  {
    id: 'js-ninja',
    title: 'Ninja de JavaScript',
    description: 'Dominaste los métodos funcionales de array y template literals.',
    icon: 'Zap',
    unlocked: false,
    category: 'Frontend'
  },
  {
    id: 'fullstack-master',
    title: 'Jinete Paletero (FullStack)',
    description: 'Completaste una lección del itinerario oficial de Desarrollo Web.',
    icon: 'GraduationCap',
    unlocked: false,
    category: 'Académico'
  },
  {
    id: 'bug-hunter',
    title: 'Caza-Bugs 24/7',
    description: 'Consultaste una duda técnica con el tutor inteligente de IA.',
    icon: 'Bot',
    unlocked: false,
    category: 'Resolución'
  },
  {
    id: 'community-pillar',
    title: 'Voz de la Comunidad',
    description: 'Participaste en el foro de dudas de estudiantes.',
    icon: 'MessageSquare',
    unlocked: false,
    category: 'Comunidad'
  }
];
