import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  MessageSquare,
  CheckCircle,
  Pin,
  Eye,
  Clock,
  Filter,
  Landmark,
  Briefcase,
  Users,
  ShoppingBag,
  Shield,
  ThumbsUp } from
'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ForumTopic, ForumCategory } from '../types';
import { motion } from 'framer-motion';
const categoryColors: Record<ForumCategory, string> = {
  'Administración y PH': 'text-amber-500',
  'Proveedores y servicios': 'text-blue-500',
  Convivencia: 'text-purple-500',
  'Compra, venta, arriendo': 'text-green-500',
  'Seguridad y emergencias': 'text-red-500'
};
const categoryLabels: Record<ForumCategory, string> = {
  'Administración y PH': 'Admin y PH',
  'Proveedores y servicios': 'Proveedores',
  Convivencia: 'Convivencia',
  'Compra, venta, arriendo': 'Compraventa',
  'Seguridad y emergencias': 'Seguridad'
};
const categories: {
  id: ForumCategory;
  icon: React.ElementType;
}[] = [
{
  id: 'Administración y PH',
  icon: Landmark
},
{
  id: 'Proveedores y servicios',
  icon: Briefcase
},
{
  id: 'Convivencia',
  icon: Users
},
{
  id: 'Compra, venta, arriendo',
  icon: ShoppingBag
},
{
  id: 'Seguridad y emergencias',
  icon: Shield
}];

const mockTopics: ForumTopic[] = [
{
  id: '1',
  title: '¿Cómo funciona el proceso de reclamo a la constructora?',
  category: 'Administración y PH',
  authorName: 'Carlos Rodríguez',
  authorAlias: 'Vecino_47',
  isAnonymous: false,
  content:
  'Tengo varios defectos en mi apartamento y quiero saber cuál es el proceso correcto para hacer el reclamo...',
  createdAt: 'Hace 2 horas',
  updatedAt: 'Hace 30 min',
  replyCount: 8,
  viewCount: 45,
  isResolved: true,
  isPinned: true,
  tags: ['constructora', 'reclamos']
},
{
  id: '2',
  title: 'Vendo sofá seccional, 6 meses de uso',
  category: 'Compra, venta, arriendo',
  authorName: 'María López',
  authorAlias: 'Residente_Norte',
  isAnonymous: false,
  content:
  'Sofá seccional en L, color gris, excelente estado. Precio: $1,200,000 negociables.',
  createdAt: 'Hace 1 día',
  updatedAt: 'Hace 1 día',
  replyCount: 3,
  viewCount: 28,
  isResolved: false,
  tags: ['venta', 'muebles']
},
{
  id: '3',
  title: 'Ruido excesivo en las noches - Torre B',
  category: 'Convivencia',
  authorName: 'Anónimo',
  authorAlias: 'Vecino_12',
  isAnonymous: true,
  content:
  'Desde hace varias semanas hay ruido de música hasta las 2-3am en el piso 4 de la Torre B...',
  createdAt: 'Hace 3 días',
  updatedAt: 'Hace 1 día',
  replyCount: 12,
  viewCount: 89,
  isResolved: false,
  tags: ['ruido', 'convivencia']
},
{
  id: '4',
  title: 'Experiencia con ElectriCosta - Cuidado',
  category: 'Proveedores y servicios',
  authorName: 'Pedro Gómez',
  authorAlias: 'Vecino_33',
  isAnonymous: false,
  content: 'Quiero compartir mi experiencia negativa con este proveedor...',
  createdAt: 'Hace 5 días',
  updatedAt: 'Hace 2 días',
  replyCount: 15,
  viewCount: 120,
  isResolved: true,
  tags: ['proveedores', 'electricidad']
},
{
  id: '5',
  title: '¿Qué hacer en caso de fuga de gas?',
  category: 'Seguridad y emergencias',
  authorName: 'Admin',
  authorAlias: 'Admin',
  isAnonymous: false,
  content:
  'Protocolo oficial de emergencia para fugas de gas en el edificio...',
  createdAt: 'Hace 2 semanas',
  updatedAt: 'Hace 2 semanas',
  replyCount: 5,
  viewCount: 200,
  isResolved: true,
  isPinned: true,
  tags: ['emergencia', 'protocolo', 'gas']
}];

export function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showResolved, setShowResolved] = useState(true);
  const filteredTopics = mockTopics.filter((topic) => {
    const matchesSearch =
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.tags?.some((t) =>
    t.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
    selectedCategory === 'Todos' || topic.category === selectedCategory;
    const matchesResolved = showResolved || !topic.isResolved;
    return matchesSearch && matchesCategory && matchesResolved;
  });
  const pinnedTopics = filteredTopics.filter((t) => t.isPinned);
  const regularTopics = filteredTopics.filter((t) => !t.isPinned);
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
            Foro
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Discusiones y preguntas de la comunidad
          </p>
        </div>
        {/* Desktop button - hidden on mobile */}
        <Link to="/forum/new" className="hidden sm:block">
          <Button className="w-auto">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Tema
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4 lg:mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar temas o etiquetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm lg:text-base" />

      </div>

      {/* Categories */}
      <div className="mb-6 lg:mb-10">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-lg lg:text-xl font-bold text-stone-900">
            Categorías
          </h2>
          <div className="flex items-center gap-2">
            {selectedCategory !== 'Todos' &&
            <button
              onClick={() => setSelectedCategory('Todos')}
              className="text-xs lg:text-sm text-teal-600 hover:text-teal-700 font-medium">

                Ver todas
              </button>
            }
            {/* Mobile small button */}
            <Link
              to="/forum/new"
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">

              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo</span>
            </Link>
          </div>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div
            className="flex gap-4"
            style={{
              width: 'max-content'
            }}>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() =>
                  setSelectedCategory(isSelected ? 'Todos' : cat.id)
                  }
                  whileTap={{
                    scale: 0.95
                  }}
                  className="flex flex-col items-center gap-2 group">

                  <div
                    className={`
                      h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm
                      ${isSelected ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-white text-stone-500 border border-stone-200'}
                    `}>

                    <cat.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-[10px] font-medium text-center max-w-[60px] leading-tight ${isSelected ? 'text-teal-700' : 'text-stone-500'}`}>

                    {categoryLabels[cat.id]}
                  </span>
                </motion.button>);

            })}
          </div>
        </div>

        {/* Desktop: Grid centered */}
        <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() =>
                setSelectedCategory(isSelected ? 'Todos' : cat.id)
                }
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

                  <cat.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <span
                  className={`text-xs font-medium text-center max-w-[80px] leading-tight ${isSelected ? 'text-teal-700' : 'text-stone-500'}`}>

                  {categoryLabels[cat.id]}
                </span>
              </motion.button>);

          })}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowResolved(!showResolved)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${!showResolved ? 'bg-teal-100 text-teal-700' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>

          <Filter className="h-4 w-4" />
          {showResolved ? 'Mostrar todos' : 'Solo sin resolver'}
        </button>
      </div>

      {/* Pinned Topics */}
      {pinnedTopics.length > 0 &&
      <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Pin className="h-4 w-4" /> Fijados
          </h2>
          <div className="space-y-4">
            {pinnedTopics.map((topic) =>
          <TopicCard key={topic.id} topic={topic} />
          )}
          </div>
        </div>
      }

      {/* Regular Topics */}
      <div className="space-y-4">
        {regularTopics.length > 0 ?
        regularTopics.map((topic) =>
        <TopicCard key={topic.id} topic={topic} />
        ) :

        <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-stone-900">No hay temas</h3>
            <p className="text-stone-500 mt-1">
              Sé el primero en crear un tema de discusión
            </p>
          </div>
        }
      </div>
    </div>);

}
function TopicCard({ topic }: {topic: ForumTopic;}) {
  const categoryIcon = categories.find((c) => c.id === topic.category);
  const Icon = categoryIcon?.icon || MessageSquare;
  const colorClass = categoryColors[topic.category] || 'text-stone-400';
  return (
    <Link to={`/forum/${topic.id}`}>
      <Card className="hover:border-teal-200 hover:shadow-md transition-all">
        <div className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-stone-50 border border-stone-100 ${colorClass}`}>

            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              {topic.isPinned &&
              <Pin className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              }
              {topic.isResolved &&
              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              }
              <h3 className="font-semibold text-stone-900 line-clamp-2">
                {topic.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> {topic.replyCount}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {topic.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {topic.createdAt}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>);

}