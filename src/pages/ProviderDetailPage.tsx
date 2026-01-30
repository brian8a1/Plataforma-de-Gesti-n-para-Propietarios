import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Share2,
  Star,
  MessageCircle,
  MapPin,
  Clock } from
'lucide-react';
import { Provider, Review } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ReviewCard } from '../components/providers/ReviewCard';
import { AddReviewModal } from '../components/providers/AddReviewModal';
import { Card } from '../components/ui/Card';
const mockProvider: Provider = {
  id: '1',
  name: 'Harkin Instalaciones',
  category: 'Aires acondicionados',
  rating: 4.8,
  reviewCount: 12,
  phone: '+573001234567',
  services: ['Instalación', 'Mantenimiento', 'Reparación', 'Carga de gas'],
  badges: ['verified', 'featured'],
  description:
  'Somos especialistas en sistemas de aire acondicionado inverter. Contamos con 5 años de experiencia trabajando en Santa Marina. Ofrecemos garantía de 3 meses en todos nuestros trabajos.',
  priceRange: '$80,000 - $250,000',
  reviews: [
  {
    id: 'r1',
    providerId: '1',
    authorAlias: 'Vecino_47',
    rating: 5,
    comment:
    'Excelente servicio. Llegó puntual, trajo sus propias herramientas y dejó todo limpio. Muy recomendado.',
    date: 'Hace 2 días',
    serviceType: 'Mantenimiento preventivo',
    wouldHireAgain: true
  },
  {
    id: 'r2',
    providerId: '1',
    authorAlias: 'Residente_TorreB',
    rating: 4,
    comment:
    'Buen trabajo técnico, aunque se demoró un poco en llegar. El precio me pareció justo.',
    date: 'Hace 1 semana',
    serviceType: 'Reparación de fuga',
    wouldHireAgain: true
  },
  {
    id: 'r3',
    providerId: '1',
    authorAlias: 'Vecino_23',
    rating: 5,
    comment:
    'Instaló el aire en mi apartamento nuevo. Trabajo impecable y muy profesional.',
    date: 'Hace 2 semanas',
    serviceType: 'Instalación completa',
    wouldHireAgain: true
  }]

};
export function ProviderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [provider, setProvider] = useState(mockProvider);
  const handleAddReview = (reviewData: any) => {
    const newReview: Review = {
      id: Math.random().toString(),
      providerId: provider.id,
      authorAlias: 'Yo',
      ...reviewData
    };
    setProvider({
      ...provider,
      reviews: [newReview, ...(provider.reviews || [])],
      reviewCount: provider.reviewCount + 1
    });
  };
  return (
    <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">

            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-stone-900 truncate max-w-[200px] lg:max-w-none">
            {provider.name}
          </h1>
          <button className="p-2 -mr-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Header */}
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="h-20 w-20 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 text-3xl font-bold flex-shrink-0 mx-auto sm:mx-0">
                  {provider.name.charAt(0)}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold text-stone-900 mb-1">
                    {provider.name}
                  </h2>
                  <p className="text-stone-500 mb-3">{provider.category}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {provider.badges.map((badge) =>
                    <Badge
                      key={badge}
                      variant={
                      badge === 'verified' ?
                      'success' :
                      badge === 'featured' ?
                      'warning' :
                      'default'
                      }>

                        {badge === 'verified' ?
                      '✓ Verificado' :
                      badge === 'featured' ?
                      '⭐ Destacado' :
                      badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start bg-stone-100 px-4 py-2 rounded-xl">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-2" />
                  <span className="text-xl font-bold text-stone-900">
                    {provider.rating}
                  </span>
                  <span className="text-sm text-stone-500 ml-1">
                    ({provider.reviewCount})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-stone-100">
                <Button
                  className="flex-1"
                  onClick={() => window.open(`tel:${provider.phone}`)}>

                  <Phone className="h-4 w-4 mr-2" /> Llamar
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() =>
                  window.open(
                    `https://wa.me/${provider.phone.replace(/\D/g, '')}`
                  )
                  }>

                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </Card>

            {/* About */}
            <Card>
              <h3 className="font-semibold text-stone-900 mb-3">
                Sobre el servicio
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                {provider.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase mb-2">
                    Servicios
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.services.map((service) =>
                    <span
                      key={service}
                      className="text-sm bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg">

                        {service}
                      </span>
                    )}
                  </div>
                </div>

                {provider.priceRange &&
                <div>
                    <p className="text-xs font-medium text-stone-500 uppercase mb-2">
                      Rango de precios
                    </p>
                    <p className="text-lg font-semibold text-stone-900">
                      {provider.priceRange}
                    </p>
                  </div>
                }
              </div>
            </Card>

            {/* Reviews Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-stone-900">
                  Reseñas{' '}
                  <span className="text-stone-500 font-normal">
                    ({provider.reviewCount})
                  </span>
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsReviewModalOpen(true)}>

                  Escribir Reseña
                </Button>
              </div>

              <div className="space-y-4">
                {provider.reviews?.map((review) =>
                <ReviewCard key={review.id} review={review} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            <Card className="sticky top-24">
              <h3 className="font-semibold text-stone-900 mb-4">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Clock className="h-4 w-4 text-stone-400" />
                  <span>Responde en menos de 1 hora</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <MapPin className="h-4 w-4 text-stone-400" />
                  <span>Trabaja en Santa Marina</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleAddReview}
        providerName={provider.name} />

    </div>);

}