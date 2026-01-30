import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  BookOpen,
  FileText,
  HelpCircle,
  Phone,
  ThumbsUp,
  Eye,
  Clock } from
'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { WikiArticle, WikiCategory } from '../types';
import { motion } from 'framer-motion';
const categoryIcons: Record<WikiCategory, React.ElementType> = {
  Guías: BookOpen,
  Protocolos: FileText,
  FAQ: HelpCircle,
  Contactos: Phone
};
const categoryColors: Record<WikiCategory, string> = {
  Guías: 'text-blue-500',
  Protocolos: 'text-red-500',
  FAQ: 'text-purple-500',
  Contactos: 'text-green-500'
};
const mockArticles: WikiArticle[] = [
{
  id: '1',
  title: 'Guía: Entendiendo tu factura de luz',
  category: 'Guías',
  content:
  'Aprende a leer tu factura de energía y entiende por qué puede variar tanto...',
  authorName: 'Admin',
  createdAt: 'Hace 2 semanas',
  updatedAt: 'Hace 3 días',
  votes: 45,
  viewCount: 320,
  tags: ['electricidad', 'costos', 'servicios']
},
{
  id: '2',
  title: 'Protocolo: Fugas de gas - Qué hacer',
  category: 'Protocolos',
  content:
  'Pasos a seguir en caso de detectar una fuga de gas en tu apartamento o áreas comunes...',
  authorName: 'Admin',
  createdAt: 'Hace 1 mes',
  updatedAt: 'Hace 1 mes',
  votes: 78,
  viewCount: 450,
  tags: ['emergencia', 'gas', 'seguridad']
},
{
  id: '3',
  title: 'FAQ: Reglamento de Propiedad Horizontal',
  category: 'FAQ',
  content:
  'Preguntas frecuentes sobre qué se puede y no se puede hacer según el reglamento...',
  authorName: 'Admin',
  createdAt: 'Hace 3 semanas',
  updatedAt: 'Hace 1 semana',
  votes: 32,
  viewCount: 180,
  tags: ['reglamento', 'PH', 'normas']
},
{
  id: '4',
  title: 'Contactos: Administración, portería y emergencias',
  category: 'Contactos',
  content: 'Directorio de contactos importantes de la comunidad...',
  authorName: 'Admin',
  createdAt: 'Hace 2 meses',
  updatedAt: 'Hace 1 semana',
  votes: 56,
  viewCount: 890,
  tags: ['contactos', 'emergencias', 'administración']
},
{
  id: '5',
  title: 'Guía: Cómo configurar tu Airbnb correctamente',
  category: 'Guías',
  content:
  'Tips y mejores prácticas para configurar tu apartamento en plataformas de alquiler...',
  authorName: 'Carlos Rodríguez',
  createdAt: 'Hace 1 semana',
  updatedAt: 'Hace 1 semana',
  votes: 23,
  viewCount: 145,
  tags: ['airbnb', 'alquiler', 'turismo']
},
{
  id: '6',
  title: 'Protocolo: Cortes de agua programados',
  category: 'Protocolos',
  content:
  'Qué hacer antes, durante y después de un corte de agua programado...',
  authorName: 'Admin',
  createdAt: 'Hace 1 mes',
  updatedAt: 'Hace 2 semanas',
  votes: 28,
  viewCount: 210,
  tags: ['agua', 'mantenimiento']
}];

const categories: WikiCategory[] = ['Guías', 'Protocolos', 'FAQ', 'Contactos'];
export function WikiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags?.some((t) =>
    t.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
    selectedCategory === 'Todos' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
            Wiki
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Base de conocimiento de la comunidad
          </p>
        </div>
        <Link to="/wiki/new">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Artículo
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar artículos o etiquetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm lg:text-base" />

      </div>

      {/* Categories - Same style as Providers */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-900">Categorías</h2>
          {selectedCategory !== 'Todos' &&
          <button
            onClick={() => setSelectedCategory('Todos')}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium">

              Ver todas
            </button>
          }
        </div>

        <div className="flex justify-center gap-4 sm:gap-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const Icon = categoryIcons[cat];
            const count = mockArticles.filter((a) => a.category === cat).length;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? 'Todos' : cat)}
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="flex flex-col items-center gap-3 group">

                <div
                  className={`
                    h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                    ${isSelected ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-white text-stone-500 border border-stone-200 group-hover:border-teal-200 group-hover:text-teal-600'}
                  `}>

                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <span
                  className={`text-xs font-medium text-center max-w-[80px] leading-tight ${isSelected ? 'text-teal-700' : 'text-stone-500'}`}>

                  {cat}
                </span>
              </motion.button>);

          })}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {filteredArticles.length > 0 ?
        filteredArticles.map((article) =>
        <ArticleCard key={article.id} article={article} />
        ) :

        <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-stone-900">
              No hay artículos
            </h3>
            <p className="text-stone-500 mt-1">
              Sé el primero en crear un artículo
            </p>
          </div>
        }
      </div>
    </div>);

}
function ArticleCard({ article }: {article: WikiArticle;}) {
  const Icon = categoryIcons[article.category];
  return (
    <Link to={`/wiki/${article.id}`}>
      <Card className="hover:border-teal-200 hover:shadow-md transition-all">
        <div className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-stone-50 border border-stone-100 ${categoryColors[article.category]}`}>

            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-stone-900 line-clamp-2 mb-2">
              {article.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" /> {article.votes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {article.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.updatedAt}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>);

}