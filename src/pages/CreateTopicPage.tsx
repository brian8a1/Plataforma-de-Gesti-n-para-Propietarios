import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { ForumCategory } from '../types';
const categories: {
  value: ForumCategory;
  label: string;
}[] = [{
  value: 'Administración y PH',
  label: 'Administración y PH'
}, {
  value: 'Proveedores y servicios',
  label: 'Proveedores y servicios'
}, {
  value: 'Convivencia',
  label: 'Convivencia'
}, {
  value: 'Compra, venta, arriendo',
  label: 'Compra, venta, arriendo'
}, {
  value: 'Seguridad y emergencias',
  label: 'Seguridad y emergencias'
}];
const similarTopics = [{
  id: '1',
  title: '¿Cómo funciona el proceso de reclamo a la constructora?',
  replies: 8
}, {
  id: '5',
  title: '¿Qué hacer en caso de fuga de gas?',
  replies: 5
}];
export function CreateTopicPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ForumCategory>('Administración y PH');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);
  const handleTitleChange = (value: string) => {
    setTitle(value);
    setShowSimilar(value.length > 10);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call
    console.log({
      title,
      category,
      content,
      tags,
      isAnonymous
    });
    navigate('/forum');
  };
  const isValid = title.length >= 10 && content.length >= 50;
  return <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-stone-900">Nuevo Tema</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Input label="Título del tema" placeholder="Escribe un título descriptivo (mínimo 10 caracteres)" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
            {title.length > 0 && title.length < 10 && <p className="text-xs text-amber-600 mt-1">
                El título debe tener al menos 10 caracteres ({title.length}/10)
              </p>}
          </div>

          {/* Similar Topics Warning */}
          {showSimilar && similarTopics.length > 0 && <Card className="bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-900 mb-2">
                    ¿Tu pregunta ya fue respondida?
                  </h3>
                  <div className="space-y-2">
                    {similarTopics.map((topic) => <a key={topic.id} href={`/forum/${topic.id}`} className="block p-2 bg-white rounded-lg border border-amber-200 hover:border-amber-300 transition-colors">
                        <p className="text-sm text-stone-900">{topic.title}</p>
                        <p className="text-xs text-stone-500">
                          {topic.replies} respuestas
                        </p>
                      </a>)}
                  </div>
                  <p className="text-xs text-amber-700 mt-2">
                    Si ninguno aplica, continúa creando tu tema.
                  </p>
                </div>
              </div>
            </Card>}

          {/* Category */}
          <Select label="Categoría" options={categories} value={category} onChange={(e) => setCategory(e.target.value as ForumCategory)} />

          {/* Content */}
          <div>
            <Textarea label="Descripción" placeholder="Describe tu pregunta o tema en detalle (mínimo 50 caracteres)" value={content} onChange={(e) => setContent(e.target.value)} rows={6} required />
            {content.length > 0 && content.length < 50 && <p className="text-xs text-amber-600 mt-1">
                La descripción debe tener al menos 50 caracteres (
                {content.length}/50)
              </p>}
          </div>

          {/* Tags */}
          <Input label="Etiquetas (opcional)" placeholder="Ej: constructora, reclamos, urgente (separadas por coma)" value={tags} onChange={(e) => setTags(e.target.value)} />
          <p className="text-xs text-stone-500 -mt-4">
            Máximo 3 etiquetas para ayudar a otros a encontrar tu tema
          </p>

          {/* Anonymous Option */}
          <Card className={`cursor-pointer transition-colors ${isAnonymous ? 'border-teal-300 bg-teal-50' : ''}`}>
            <label className="flex items-start gap-4 cursor-pointer">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="mt-1 h-5 w-5 rounded border-stone-300 text-teal-600 focus:ring-teal-500" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {isAnonymous ? <EyeOff className="h-4 w-4 text-teal-600" /> : <Eye className="h-4 w-4 text-stone-400" />}
                  <span className="font-medium text-stone-900">
                    Publicar anónimamente
                  </span>
                </div>
                <p className="text-sm text-stone-600 mt-1">
                  {isAnonymous ? 'Tu tema aparecerá con tu alias anónimo. Ideal para temas sensibles.' : 'Tu nombre real aparecerá junto al tema. Recomendado para compra/venta.'}
                </p>
              </div>
            </label>
          </Card>

          {/* Preview */}
          <Card className="bg-stone-100">
            <p className="text-xs font-medium text-stone-500 uppercase mb-2">
              Vista previa
            </p>
            <div className="bg-white rounded-lg p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{category}</Badge>
                {isAnonymous && <Badge variant="default">Anónimo</Badge>}
              </div>
              <h3 className="font-semibold text-stone-900 mb-1">
                {title || 'Título del tema...'}
              </h3>
              <p className="text-sm text-stone-600 line-clamp-2">
                {content || 'Descripción del tema...'}
              </p>
              <p className="text-xs text-stone-400 mt-2">
                Por: {isAnonymous ? 'Vecino_47' : 'Tu Nombre'} • Ahora
              </p>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid} className="flex-1">
              Publicar Tema
            </Button>
          </div>

          {!isValid && <p className="text-xs text-center text-stone-500 flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Completa el título (10+ caracteres) y descripción (50+ caracteres)
            </p>}
        </form>
      </div>
    </div>;
}