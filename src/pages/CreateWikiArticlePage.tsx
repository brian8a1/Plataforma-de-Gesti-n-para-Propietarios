import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Phone, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { WikiCategory } from '../types';
const categories: {
  value: WikiCategory;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [{
  value: 'Guías',
  label: 'Guía',
  icon: <BookOpen className="h-5 w-5" />,
  description: 'Instrucciones paso a paso'
}, {
  value: 'Protocolos',
  label: 'Protocolo',
  icon: <FileText className="h-5 w-5" />,
  description: 'Qué hacer en situaciones específicas'
}, {
  value: 'FAQ',
  label: 'FAQ',
  icon: <HelpCircle className="h-5 w-5" />,
  description: 'Preguntas frecuentes'
}, {
  value: 'Contactos',
  label: 'Contactos',
  icon: <Phone className="h-5 w-5" />,
  description: 'Información de contacto útil'
}];
export function CreateWikiArticlePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<WikiCategory>('Guías');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      category,
      content,
      tags
    });
    navigate('/wiki');
  };
  const isValid = title.length >= 5 && content.length >= 200;
  return <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-stone-900">Nuevo Artículo</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Tipo de artículo
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => <button key={cat.value} type="button" onClick={() => setCategory(cat.value)} className={`p-4 rounded-xl border-2 text-left transition-all
                    ${category === cat.value ? 'border-teal-500 bg-teal-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-2
                    ${category === cat.value ? 'bg-teal-100 text-teal-600' : 'bg-stone-100 text-stone-600'}`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-stone-900">{cat.label}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {cat.description}
                  </p>
                </button>)}
            </div>
          </div>

          {/* Title */}
          <Input label="Título del artículo" placeholder={`Ej: ${category === 'Guías' ? 'Cómo reportar una fuga de gas' : category === 'Protocolos' ? 'Protocolo de evacuación' : category === 'FAQ' ? '¿Cuánto cuesta la cuota?' : 'Números de emergencia'}`} value={title} onChange={(e) => setTitle(e.target.value)} required />

          {/* Content */}
          <div>
            <Textarea label="Contenido" placeholder="Escribe el contenido del artículo (mínimo 200 caracteres). Puedes usar:&#10;&#10;## Para títulos&#10;### Para subtítulos&#10;- Para listas&#10;**texto** para negritas" value={content} onChange={(e) => setContent(e.target.value)} rows={12} required />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-stone-500">
                Usa formato Markdown para estructurar el contenido
              </p>
              {content.length > 0 && <p className={`text-xs ${content.length >= 200 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {content.length}/200 caracteres
                </p>}
            </div>
          </div>

          {/* Tags */}
          <Input label="Etiquetas (opcional)" placeholder="Ej: emergencia, gas, seguridad (separadas por coma)" value={tags} onChange={(e) => setTags(e.target.value)} />

          {/* Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">
              💡 Tips para un buen artículo
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Usa títulos claros y descriptivos</li>
              <li>• Incluye pasos numerados si es una guía</li>
              <li>• Agrega números de contacto cuando sea relevante</li>
              <li>• Mantén la información actualizada</li>
            </ul>
          </Card>

          {/* Preview */}
          <Card className="bg-stone-100">
            <p className="text-xs font-medium text-stone-500 uppercase mb-2">
              Vista previa
            </p>
            <div className="bg-white rounded-lg p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{category}</Badge>
              </div>
              <h2 className="text-xl font-bold text-stone-900 mb-3">
                {title || 'Título del artículo...'}
              </h2>
              <div className="prose prose-sm prose-stone max-w-none">
                {content ? <p className="whitespace-pre-wrap">
                    {content.slice(0, 300)}
                    {content.length > 300 ? '...' : ''}
                  </p> : <p className="text-stone-400">
                    El contenido aparecerá aquí...
                  </p>}
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid} className="flex-1">
              Publicar Artículo
            </Button>
          </div>

          {!isValid && <p className="text-xs text-center text-stone-500 flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" />
              El contenido debe tener al menos 200 caracteres
            </p>}
        </form>
      </div>
    </div>;
}