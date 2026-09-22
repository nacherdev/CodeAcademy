import { ForumPost } from '../types';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: '¿Por qué me da error CORS al hacer fetch() desde mi frontend a mi API Express?',
    content: `Hola a todos! Estoy haciendo una práctica de desarrollo web con Node.js y Express. En Postman la ruta \`http://localhost:3000/api/productos\` responde perfecto con status 200 y JSON, pero cuando hago el fetch() desde mi React en el puerto 5173 el navegador me salta con:

\`Access to XMLHttpRequest at '...' from origin 'http://localhost:5173' has been blocked by CORS policy\`

¿Qué middleware me falta instalar en el backend para permitir la comunicación? ¡Gracias!`,
    author: 'Mohammad Nacher',
    authorRole: 'Los Jinetes Paleteros',
    avatarSeed: 'Mohammad',
    date: 'Hace 2 horas',
    category: 'Backend',
    tags: ['CORS', 'Express', 'Fetch', 'Node.js', 'Web'],
    upvotes: 18,
    views: 142,
    solved: true,
    replies: [
      {
        id: 'rep-1',
        author: 'Iker Bruña',
        authorRole: 'Backend Mentor',
        avatarSeed: 'Iker',
        date: 'Hace 1 hora',
        content: `¡Buenas Mohammad! El problema es que el navegador bloquea por seguridad cualquier petición HTTP entre diferentes orígenes (origen = protocolo + dominio + puerto).

Para solucionarlo en tu servidor Express:
1. Instala el paquete cors: \`npm install cors\`
2. En tu archivo del servidor:
\`\`\`javascript
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
\`\`\`
Pon ese middleware antes de declarar tus rutas de la API y verás cómo el navegador ya te deja leer el JSON sin problemas.`,
        upvotes: 14,
        isAccepted: true
      },
      {
        id: 'rep-2',
        author: 'Nerea Bruña',
        authorRole: 'UX/UI Developer',
        avatarSeed: 'Nerea',
        date: 'Hace 45 min',
        content: 'Exacto, también si estás en Vite puedes configurar un proxy en `vite.config.js` con `server: { proxy: { "/api": "http://localhost:3000" } }`, así no te preocupas por CORS en desarrollo.',
        upvotes: 8,
        isAccepted: false
      }
    ]
  },
  {
    id: 'post-2',
    title: '¿Diferencia real entre Array.map() y Array.forEach()? ¿Cuál usar para renderizar listas?',
    content: `Tengo 19 años y estoy empezando con JavaScript moderno. Veo que ambos recorren un array, pero en muchos tutoriales dicen que nunca use forEach para retornar cosas en React o crear nuevos datos. ¿Alguien puede darme una regla mnemotécnica clara?`,
    author: 'Julián Barbero',
    authorRole: 'Estudiante de Programación',
    avatarSeed: 'Julian',
    date: 'Ayer',
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6', 'Arrays', 'BuenasPrácticas'],
    upvotes: 24,
    views: 290,
    solved: true,
    replies: [
      {
        id: 'rep-3',
        author: 'José Javier Andreu',
        authorRole: 'Desarrollador Web',
        avatarSeed: 'JoseJavier',
        date: 'Ayer',
        content: `Regla de oro sencilla:
- **\`map()\`**: Piensa en "Mapear / Transformar". SIEMPRE devuelve un NUEVO array con el resultado de la función. Por eso en React usamos \`items.map(item => <Card key={item.id} />)\`, porque React necesita el array de elementos JSX.
- **\`forEach()\`**: Piensa en "Efecto secundario / Solo ejecutar". Recorre pero SIEMPRE retorna \`undefined\`. Úsalo solo para disparar una acción (ej: enviar un log, guardar en BD o escuchar eventos).

Si necesitas un array nuevo -> \`map()\`. Si solo quieres ejecutar algo para cada elemento -> \`forEach()\`.`,
        upvotes: 21,
        isAccepted: true
      }
    ]
  },
  {
    id: 'post-3',
    title: '¿Cómo diseñar una relación 1 a N en PostgreSQL para una tienda online?',
    content: `Estamos diseñando la base de datos de nuestro proyecto final. Tenemos la tabla \`clientes\` y la tabla \`pedidos\`. ¿La clave foránea debe ir en clientes o en pedidos? A veces me confundo con el sentido de la relación.`,
    author: 'Carlos G.',
    authorRole: 'Estudiante Web (18 años)',
    avatarSeed: 'Carlos',
    date: 'Hace 3 días',
    category: 'Bases de Datos',
    tags: ['SQL', 'PostgreSQL', 'Modelado', 'BasesDeDatos'],
    upvotes: 11,
    views: 185,
    solved: true,
    replies: [
      {
        id: 'rep-4',
        author: 'Mohammad Nacher',
        authorRole: 'Los Jinetes Paleteros',
        avatarSeed: 'Mohammad',
        date: 'Hace 2 días',
        content: `La regla mnemotécnica es: **la foreign key siempre va en la tabla del lado "N" (muchos)**.
Un cliente puede tener **muchos** pedidos, pero un pedido pertenece a **un único** cliente.
Por lo tanto:
\`\`\`sql
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE,
  fecha TIMESTAMP DEFAULT NOW(),
  total DECIMAL(10,2)
);
\`\`\`
Si la pusieras en clientes, tendrías que guardar un array de pedidos, lo cual rompe la 1ª Forma Normal (1FN). ¡Mucho ánimo con el proyecto!`,
        upvotes: 16,
        isAccepted: true
      }
    ]
  },
  {
    id: 'post-4',
    title: '¿Por qué flexbox no centra verticalmente mi div si puse align-items: center?',
    content: `Hola chic@s! Tengo un div con \`display: flex; justify-content: center; align-items: center;\`, pero el contenido sigue arriba del todo de la pantalla. ¿Qué me está faltando?`,
    author: 'Lucía M.',
    authorRole: 'Autodidacta (22 años)',
    avatarSeed: 'Lucia',
    date: 'Hace 4 días',
    category: 'HTML/CSS',
    tags: ['CSS', 'Flexbox', 'Diseño'],
    upvotes: 9,
    views: 210,
    solved: true,
    replies: [
      {
        id: 'rep-5',
        author: 'Nerea Bruña',
        authorRole: 'Los Jinetes Paleteros',
        avatarSeed: 'Nerea',
        date: 'Hace 3 días',
        content: '¡Clásico despiste! Tu contenedor flex solo tiene la altura que ocupa su contenido interno. Para que pueda centrar verticalmente, el contenedor necesita tener una altura definida respecto a la ventana, por ejemplo: `min-height: 100vh;` o `height: 100%;`. ¡Pruébalo y me dices!',
        upvotes: 12,
        isAccepted: true
      }
    ]
  }
];
