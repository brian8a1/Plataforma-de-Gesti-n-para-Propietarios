import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Eye, MessageSquare, ThumbsUp, Flag, Share2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Textarea } from '../components/ui/Textarea';
import { ForumTopic, ForumReply } from '../types';
const mockTopic: ForumTopic = {
  id: '1',
  title: '¿Cómo funciona el proceso de reclamo a la constructora?',
  category: 'Administración y PH',
  authorName: 'Carlos Rodríguez',
  authorAlias: 'Vecino_47',
  isAnonymous: false,
  content: `Hola vecinos,

Tengo varios defectos en mi apartamento que necesito reportar a la constructora:
- Filtraciones en el baño principal
- Puertas que no cierran bien
- Pintura descascarada en varias paredes

¿Alguien sabe cuál es el proceso correcto para hacer el reclamo? ¿Hay algún formato específico? ¿Cuánto tiempo tienen para responder?

Agradezco cualquier información que puedan compartir.`,
  createdAt: 'Hace 2 horas',
  updatedAt: 'Hace 30 min',
  replyCount: 8,
  viewCount: 45,
  isResolved: true,
  solutionId: 'r2',
  tags: ['constructora', 'reclamos']
};
const mockReplies: ForumReply[] = [{
  id: 'r1',
  topicId: '1',
  authorName: 'María López',
  authorAlias: 'Residente_Norte',
  content: 'Yo tuve el mismo problema. Te recomiendo documentar todo con fotos antes de hacer el reclamo.',
  createdAt: 'Hace 1 hora',
  isSolution: false,
  likes: 3
}, {
  id: 'r2',
  topicId: '1',
  authorName: 'Pedro Gómez',
  authorAlias: 'Vecino_33',
  content: `El proceso es el siguiente:

1. **Documenta los defectos** con fotos y videos
2. **Envía un correo** a postventa@constructora.com con:
   - Tu nombre y número de apartamento
   - Descripción detallada de cada defecto
   - Fotos adjuntas
3. **Guarda el número de radicado** que te dan
4. Tienen **15 días hábiles** para responder
5. Si no responden, puedes escalar a la Superintendencia de Industria y Comercio

También puedes ir directamente a la oficina de postventa en el edificio administrativo, están de lunes a viernes de 8am a 5pm.

¡Suerte con tu reclamo!`,
  createdAt: 'Hace 45 min',
  isSolution: true,
  likes: 12
}, {
  id: 'r3',
  topicId: '1',
  authorName: 'Ana Martínez',
  authorAlias: 'Vecino_88',
  content: 'Gracias Pedro, muy útil la información. Yo también tengo que hacer un reclamo.',
  createdAt: 'Hace 30 min',
  isSolution: false,
  likes: 1
}];
export function ForumTopicPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(mockReplies);
  const solutionReply = replies.find((r) => r.isSolution);
  const otherReplies = replies.filter((r) => !r.isSolution);
  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    const newReply: ForumReply = {
      id: Date.now().toString(),
      topicId: mockTopic.id,
      authorName: 'Yo',
      authorAlias: 'Vecino_47',
      content: replyContent,
      createdAt: 'Ahora',
      isSolution: false,
      likes: 0
    };
    setReplies([...replies, newReply]);
    setReplyContent('');
  };
  return <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="mb-1">
              {mockTopic.category}
            </Badge>
            <h1 className="font-semibold text-stone-900 truncate">
              {mockTopic.title}
            </h1>
          </div>
          <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-6">
        {/* Original Post */}
        <Card>
          <div className="flex items-start gap-4 mb-4">
            <Avatar fallback={mockTopic.authorName} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-stone-900">
                  {mockTopic.isAnonymous ? mockTopic.authorAlias : mockTopic.authorName}
                </span>
                {mockTopic.isResolved && <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Resuelto
                  </Badge>}
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {mockTopic.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {mockTopic.viewCount} vistas
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-stone prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{mockTopic.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-100">
            {mockTopic.tags?.map((tag) => <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                #{tag}
              </span>)}
          </div>
        </Card>

        {/* Solution (if exists) */}
        {solutionReply && <div>
            <h2 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Solución Marcada
            </h2>
            <ReplyCard reply={solutionReply} isSolution />
          </div>}

        {/* Other Replies */}
        <div>
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> {replies.length} Respuestas
          </h2>
          <div className="space-y-4">
            {otherReplies.map((reply) => <ReplyCard key={reply.id} reply={reply} />)}
          </div>
        </div>

        {/* Reply Form */}
        <Card>
          <h3 className="font-semibold text-stone-900 mb-4">Tu Respuesta</h3>
          <Textarea placeholder="Escribe tu respuesta aquí..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={4} />
          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
              Publicar Respuesta
            </Button>
          </div>
        </Card>
      </div>
    </div>;
}
function ReplyCard({
  reply,
  isSolution = false



}: {reply: ForumReply;isSolution?: boolean;}) {
  return <Card className={isSolution ? 'border-emerald-200 bg-emerald-50/50' : ''}>
      <div className="flex items-start gap-3">
        <Avatar fallback={reply.authorName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-stone-900">
              {reply.authorName}
            </span>
            <span className="text-xs text-stone-500">{reply.createdAt}</span>
          </div>
          <div className="prose prose-stone prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{reply.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-xs text-stone-500 hover:text-teal-600 transition-colors">
              <ThumbsUp className="h-4 w-4" /> {reply.likes}
            </button>
            <button className="flex items-center gap-1 text-xs text-stone-500 hover:text-red-600 transition-colors">
              <Flag className="h-4 w-4" /> Reportar
            </button>
          </div>
        </div>
      </div>
    </Card>;
}