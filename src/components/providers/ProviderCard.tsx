import React from 'react';
import { Phone, CheckCircle, Star, AlertTriangle, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Provider } from '../../types';
import { Button } from '../ui/Button';
interface ProviderCardProps {
  provider: Provider;
  onClick?: () => void;
}
export function ProviderCard({
  provider,
  onClick
}: ProviderCardProps) {
  return <Card onClick={onClick} className="h-full flex flex-col hover:border-teal-200 hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-stone-900 truncate">
            {provider.name}
          </h3>
          <p className="text-sm text-stone-500">{provider.category}</p>
        </div>
        <div className="flex items-center bg-stone-100 px-2.5 py-1.5 rounded-lg ml-2 flex-shrink-0">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
          <span className="text-sm font-bold text-stone-700">
            {provider.rating}
          </span>
          <span className="text-xs text-stone-400 ml-1">
            ({provider.reviewCount})
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {provider.badges.includes('verified') && <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Verificado
          </Badge>}
        {provider.badges.includes('featured') && <Badge variant="warning" className="flex items-center gap-1">
            <Star className="h-3 w-3" /> Destacado
          </Badge>}
        {provider.badges.includes('new') && <Badge variant="info">Nuevo</Badge>}
        {provider.badges.includes('warning') && <Badge variant="error" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Revisar
          </Badge>}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
        {provider.services.slice(0, 3).map((service, i) => <span key={i} className="text-xs bg-stone-50 text-stone-600 px-2 py-1 rounded border border-stone-200">
            {service}
          </span>)}
        {provider.services.length > 3 && <span className="text-xs text-stone-400 px-1 py-1">
            +{provider.services.length - 3}
          </span>}
      </div>

      <div className="flex gap-2 mt-auto pt-2 border-t border-stone-100">
        <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
        e.stopPropagation();
        window.open(`tel:${provider.phone}`);
      }}>
          <Phone className="h-4 w-4 mr-1.5" />
          Llamar
        </Button>
        <Button variant="secondary" size="sm" className="flex-1" onClick={(e) => {
        e.stopPropagation();
        window.open(`https://wa.me/${provider.phone.replace(/\D/g, '')}`);
      }}>
          <MessageCircle className="h-4 w-4 mr-1.5" />
          WhatsApp
        </Button>
      </div>
    </Card>;
}