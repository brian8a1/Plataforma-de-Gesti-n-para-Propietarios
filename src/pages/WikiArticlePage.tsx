import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Edit, Clock, User, Share2, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { WikiArticle } from '../types';
const mockArticle: WikiArticle = {
  id: '2',
  title: 'Protocolo: Fugas de gas - Qué hacer',
  category: 'Protocolos',
  content: `## ⚠️ En caso de detectar olor a gas

### Paso 1: No enciendas nada
- NO prendas luces ni interruptores
- NO uses el celular dentro del área
- NO enciendas fósforos ni encendedores

### Paso 2: Ventila el área
- Abre todas las ventanas y puertas
- Permite que el gas se disperse naturalmente

### Paso 3: Cierra la válvula de gas
- La válvula principal está ubicada en el cuarto de medidores del piso
- Gírala en sentido de las manecillas del reloj para cerrar

### Paso 4: Evacúa el área
- Sal del apartamento inmediatamente
- Avisa a tus vecinos cercanos
- Dirígete a un área abierta

### Paso 5: Llama a emergencias
- **Vanti (gas natural):** 164
- **Bomberos:** 119
- **Línea de emergencias:** 123
- **Portería:** 300 555 1234

### Paso 6: Espera instrucciones
- No regreses hasta que los técnicos autoricen
- Sigue las instrucciones del personal de emergencias

---

## Prevención

- Revisa periódicamente las conexiones de gas
- No dejes ollas en el fuego sin supervisión
- Instala detectores de gas en tu apartamento
- Reporta cualquier olor inusual a la administración

---

*Este protocolo fue creado en coordinación con la administración y los bomberos locales.*`,
  authorName: 'Admin',
  createdAt: 'Hace 1 mes',
  updatedAt: 'Hace 1 mes',
  votes: 78,
  viewCount: 450,
  tags: ['emergencia', 'gas', 'seguridad']
};
export function WikiArticlePage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(mockArticle.votes);
  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
    }
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
              {mockArticle.category}
            </Badge>
          </div>
          <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-4">
                {mockArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <User className="h-4 w-4" />
                  <span>{mockArticle.authorName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Clock className="h-4 w-4" />
                  <span>Actualizado {mockArticle.updatedAt}</span>
                </div>
              </div>

              <div className="prose prose-stone prose-lg max-w-none">
                {mockArticle.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                        {line.replace('## ', '')}
                      </h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">
                        {line.replace('### ', '')}
                      </h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-4">
                        {line.replace('- ', '')}
                      </li>;
                }
                if (line.startsWith('---')) {
                  return <hr key={i} className="my-6" />;
                }
                if (line.startsWith('*') && line.endsWith('*')) {
                  return <p key={i} className="text-sm text-stone-500 italic">
                        {line.replace(/\*/g, '')}
                      </p>;
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                return <p key={i}>{line}</p>;
              })}
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-stone-100">
                {mockArticle.tags?.map((tag) => <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                    #{tag}
                  </span>)}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <Card>
                <h3 className="font-semibold text-stone-900 mb-4">
                  ¿Te fue útil?
                </h3>
                <Button fullWidth variant={hasVoted ? 'primary' : 'outline'} onClick={handleVote} disabled={hasVoted}>
                  <ThumbsUp className={`h-4 w-4 mr-2 ${hasVoted ? 'fill-current' : ''}`} />
                  {hasVoted ? 'Gracias!' : 'Útil'} ({votes})
                </Button>
              </Card>

              <Card>
                <h3 className="font-semibold text-stone-900 mb-3">
                  Estadísticas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Vistas</span>
                    <span className="font-medium">{mockArticle.viewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Votos</span>
                    <span className="font-medium">{votes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Creado</span>
                    <span className="font-medium">{mockArticle.createdAt}</span>
                  </div>
                </div>
              </Card>

              <Button variant="outline" fullWidth>
                <Edit className="h-4 w-4 mr-2" /> Sugerir Edición
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}