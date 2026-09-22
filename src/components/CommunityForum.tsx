import React, { useState } from 'react';
import { ForumPost, ForumReply } from '../types';
import { 
  Users, 
  Search, 
  PlusCircle, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquare, 
  Eye, 
  Send, 
  X, 
  Sparkles,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface CommunityForumProps {
  posts: ForumPost[];
  onAddPost: (newPost: Omit<ForumPost, 'id' | 'views' | 'date' | 'replies' | 'upvotes' | 'solved'>) => void;
  onUpvotePost: (postId: string) => void;
  onAddReply: (postId: string, replyContent: string, authorName: string) => void;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  posts,
  onAddPost,
  onUpvotePost,
  onAddReply
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(posts[0]?.id || null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  
  // New Question form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('JavaScript');
  const [newTags, setNewTags] = useState('Frontend, JavaScript');
  const [newAuthor, setNewAuthor] = useState('Estudiante');

  // Reply form state
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('Compañero');

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activePost = posts.find(p => p.id === selectedPostId) || filteredPosts[0];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onAddPost({
      title: newTitle,
      content: newContent,
      author: newAuthor || 'Alumno CodeAcademy',
      authorRole: 'Comunidad (14-35 años)',
      avatarSeed: newAuthor,
      category: newCategory,
      tags: tagsArray.length > 0 ? tagsArray : ['General']
    });

    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activePost) return;

    onAddReply(activePost.id, replyText, replyAuthor);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Foro de Consulta de la Comunidad</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Espacio colaborativo donde estudiantes (14 a 35 años) y desarrolladores resuelven dudas y comparten soluciones.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          id="forum-new-question-btn"
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-amber-400/20 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Hacer una Pregunta</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave, duda o etiqueta (#Express, #SQL)..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['Todas', 'JavaScript', 'Backend', 'HTML/CSS', 'Bases de Datos', 'Web'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Questions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs text-zinc-400 font-mono flex items-center justify-between px-1">
            <span>{filteredPosts.length} preguntas encontradas</span>
            <span className="text-amber-400">Apoyo entre pares</span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-zinc-800 bg-[#0d0f14] text-zinc-500 text-xs">
                No se encontraron preguntas con los filtros actuales.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isSelected = activePost?.id === post.id;

                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-[#141720] shadow-lg shadow-amber-400/5'
                        : 'border-zinc-800/80 bg-[#0d0f14] hover:bg-zinc-900/60 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-amber-300 font-mono">
                        {post.category}
                      </span>

                      {post.solved && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resuelta
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white mt-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Metadata Footer */}
                    <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="truncate max-w-[140px] text-zinc-300 font-medium">
                        {post.author}
                      </span>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpvotePost(post.id);
                          }}
                          className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3 text-amber-400" />
                          <span>{post.upvotes}</span>
                        </button>

                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-zinc-500" />
                          <span>{post.replies.length}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Question Detail & Thread */}
        <div className="lg:col-span-7">
          {activePost ? (
            <div className="rounded-2xl border border-zinc-800 bg-[#0d0f14] overflow-hidden shadow-2xl flex flex-col">
              
              {/* Question Header */}
              <div className="p-6 border-b border-zinc-800 bg-[#111319] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                      {activePost.category}
                    </span>
                    <span className="text-xs text-zinc-500">{activePost.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpvotePost(activePost.id)}
                      className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-amber-400 flex items-center gap-1.5"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 fill-amber-400/20" />
                      <span>{activePost.upvotes} Votos</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {activePost.title}
                </h3>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs">
                    {activePost.author[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-200">{activePost.author}</div>
                    <div className="text-[10px] text-zinc-400">{activePost.authorRole}</div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans bg-[#09090b] p-4 rounded-xl border border-zinc-800/80">
                  {activePost.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {activePost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      <Tag className="w-2.5 h-2.5 text-amber-400" />
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Replies Section */}
              <div className="p-6 space-y-4 bg-[#09090b]">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>{activePost.replies.length} Respuestas de la comunidad</span>
                  </span>
                  <span className="text-zinc-500">Expertos y Comunidad</span>
                </div>

                {/* Replies list */}
                <div className="space-y-3">
                  {activePost.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2.5 ${
                        reply.isAccepted
                          ? 'border-emerald-500/40 bg-[#0d1612]'
                          : 'border-zinc-800 bg-[#12141a]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{reply.author}</span>
                          <span className="text-[11px] text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                            {reply.authorRole}
                          </span>
                        </div>

                        {reply.isAccepted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <ShieldCheck className="w-3.5 h-3.5" /> Solución aceptada
                          </span>
                        )}
                      </div>

                      <div className="text-zinc-200 whitespace-pre-wrap">
                        {reply.content}
                      </div>

                      <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-1">
                        <span>{reply.date}</span>
                        <span className="text-amber-400 font-mono">+{reply.upvotes} votos de ayuda</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Reply Form */}
                <form onSubmit={handlePostReply} className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      placeholder="Tu nombre o apodo..."
                      className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[11px] text-zinc-500">Participa como compañero o experto</span>
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta o explicación técnica para ayudar a este usuario..."
                      rows={3}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Responder</span>
                    </button>
                  </div>
                </form>

              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-zinc-800 bg-[#0d0f14] text-zinc-500 text-sm">
              Selecciona una pregunta de la izquierda para ver las respuestas.
            </div>
          )}
        </div>

      </div>

      {/* Modal: Publicar Nueva Pregunta */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0d0f14] border border-amber-400/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            <div className="px-5 py-4 border-b border-zinc-800 bg-[#12141a] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Publicar Consulta en la Comunidad</h3>
              </div>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Título claro y conciso de tu duda
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: ¿Cómo estructurar un controlador en Express?"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Backend">Backend</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                    <option value="Bases de Datos">Bases de Datos</option>
                    <option value="Web">Web</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Tu Nombre o Nick
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Ej: Mario Gómez"
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Etiquetas (separadas por comas)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Express, Router, Controllers, Web"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Descripción detallada y código relevante
                </label>
                <textarea
                  required
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe qué intentas hacer, qué error obtienes y pega el fragmento de código si es necesario..."
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-400 resize-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-transform active:scale-95"
                >
                  Publicar Pregunta
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
