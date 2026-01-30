import React, { useState, Children, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Sparkles,
  Droplets,
  Zap,
  Wind,
  Wifi,
  Hammer,
  Key,
  Wrench,
  Star,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  AlertTriangle } from
'lucide-react';
import { AddProviderModal } from '../components/providers/AddProviderModal';
import { Provider, ProviderCategory } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
// --- Mock Data ---
const mockProviders: Provider[] = [
{
  id: '1',
  name: 'Harkin Instalaciones',
  category: 'Aires acondicionados',
  rating: 4.8,
  reviewCount: 12,
  phone: '+573001234567',
  services: ['Instalación', 'Mantenimiento', 'Reparación'],
  badges: ['verified', 'featured'],
  description:
  'Especialistas en aires acondicionados inverter. 5 años de experiencia en la zona.'
},
{
  id: '6',
  name: 'Internet Rápido',
  category: 'Internet y TV',
  rating: 4.6,
  reviewCount: 15,
  phone: '+573001234568',
  services: ['Instalación WiFi', 'Configuración Smart TV', 'Redes'],
  badges: ['verified', 'featured']
},
{
  id: '2',
  name: 'María Limpieza',
  category: 'Aseo y limpieza',
  rating: 4.5,
  reviewCount: 8,
  phone: '+573109876543',
  services: ['Aseo general', 'Limpieza profunda', 'Lavado de muebles'],
  badges: ['verified']
},
{
  id: '3',
  name: 'Plomería Express',
  category: 'Plomería',
  rating: 4.2,
  reviewCount: 5,
  phone: '+573205551234',
  services: ['Fugas', 'Instalación de grifos', 'Destape de cañerías'],
  badges: ['verified']
},
{
  id: '4',
  name: 'ElectriCosta',
  category: 'Electricidad',
  rating: 3.8,
  reviewCount: 3,
  phone: '+573001112233',
  services: ['Cableado', 'Instalación de tomas', 'Revisión de tableros'],
  badges: ['new']
},
{
  id: '5',
  name: 'Leonel Construcciones',
  category: 'Mantenimiento general',
  rating: 2.1,
  reviewCount: 6,
  phone: '+573159998877',
  services: ['Pintura', 'Resanes', 'Obra blanca'],
  badges: ['warning']
}];

const categories: {
  id: ProviderCategory;
  icon: React.ElementType;
}[] = [
{
  id: 'Aseo y limpieza',
  icon: Sparkles
},
{
  id: 'Plomería',
  icon: Droplets
},
{
  id: 'Electricidad',
  icon: Zap
},
{
  id: 'Aires acondicionados',
  icon: Wind
},
{
  id: 'Internet y TV',
  icon: Wifi
},
{
  id: 'Carpintería',
  icon: Hammer
},
{
  id: 'Cerrajería',
  icon: Key
},
{
  id: 'Mantenimiento general',
  icon: Wrench
}];

// --- Animation Variants ---
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};
// --- Components ---
const ProviderCard = ({
  provider,
  onClick



}: {provider: Provider;onClick: () => void;}) => {
  const isVerified = provider.badges.includes('verified');
  const isWarning = provider.badges.includes('warning');
  const isFeatured = provider.badges.includes('featured');
  return (
    <motion.div
      variants={itemVariants}
      layout
      onClick={onClick}
      className="group bg-stone-900 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:bg-stone-800 hover:scale-[1.02] w-full lg:w-[180px] h-[160px] lg:h-[175px] flex-shrink-0">

      <div className="p-3 lg:p-4 h-full flex flex-col">
        {/* Rating badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">
              {provider.rating}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isVerified &&
            <CheckCircle className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-teal-400" />
            }
            {isFeatured &&
            <Star className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-amber-400 fill-amber-400" />
            }
          </div>
        </div>

        {/* Name - full display */}
        <h3 className="font-semibold text-white text-xs lg:text-sm leading-tight mb-1 line-clamp-2">
          {provider.name}
        </h3>

        {/* Category */}
        <p className="text-[10px] lg:text-xs text-stone-400 mb-auto line-clamp-1">
          {provider.category}
        </p>

        {/* Warning indicator */}
        {isWarning &&
        <div className="flex items-center gap-1 text-amber-400 mt-2">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-[10px]">Revisar</span>
          </div>
        }

        {/* Quick actions */}
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(`tel:${provider.phone}`);
            }}
            className="flex-1 flex items-center justify-center py-1.5 text-xs font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors">

            <Phone className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/${provider.phone.replace(/\D/g, '')}`);
            }}
            className="flex-1 flex items-center justify-center py-1.5 text-xs font-medium text-teal-400 bg-teal-400/10 rounded-lg hover:bg-teal-400/20 transition-colors">

            <MessageCircle className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>);

};
export function ProvidersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [providers, setProviders] = useState(mockProviders);
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
    selectedCategory === 'Todos' || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddProvider = (newProvider: any) => {
    const provider: Provider = {
      id: Math.random().toString(),
      ...newProvider,
      rating: 0,
      reviewCount: 0,
      badges: ['new']
    };
    setProviders([provider, ...providers]);
  };
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto">
      {/* Header - Same style as other pages */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
            Directorio de Proveedores
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Encuentra expertos recomendados por tu comunidad
          </p>
        </div>
        {/* Desktop button - hidden on mobile */}
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="hidden sm:flex w-auto">

          <Plus className="h-4 w-4 mr-2" /> Recomendar Proveedor
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 lg:mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, servicio o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm lg:text-base" />

        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-stone-400">
          {filteredProviders.length} resultados
        </span>
      </div>

      {/* Categories Grid */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.1
        }}
        className="mb-6 lg:mb-10">

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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">

              <Plus className="h-3.5 w-3.5" />
              <span>Recomendar</span>
            </button>
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
                  onClick={() => setSelectedCategory(cat.id)}
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

                    {cat.id}
                  </span>
                </motion.button>);

            })}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-8 gap-8 justify-items-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

                  {cat.id}
                </span>
              </motion.button>);

          })}
        </div>
      </motion.div>

      {/* Providers Grid - Fixed size cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:gap-4">

        <AnimatePresence mode="popLayout">
          {filteredProviders.length > 0 ?
          filteredProviders.map((provider) =>
          <ProviderCard
            key={provider.id}
            provider={provider}
            onClick={() => navigate(`/providers/${provider.id}`)} />

          ) :

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="col-span-2 w-full py-20 text-center">

              <div className="h-20 w-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-stone-300" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                No encontramos resultados
              </h3>
              <p className="text-stone-500">
                Intenta ajustar tu búsqueda o selecciona otra categoría
              </p>
              <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}>

                Limpiar filtros
              </Button>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>

      <AddProviderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProvider} />

    </div>);

}