import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Textarea } from '../ui/Textarea';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StarRating } from '../ui/StarRating';
interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  providerName: string;
}
export function AddReviewModal({
  isOpen,
  onClose,
  onSubmit,
  providerName
}: AddReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [wouldHireAgain, setWouldHireAgain] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      comment,
      serviceType,
      wouldHireAgain,
      date: new Date().toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short'
      })
    });
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={`Calificar a ${providerName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center justify-center py-4">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Tu calificación general
          </label>
          <StarRating rating={rating} size="lg" interactive onChange={setRating} />
        </div>

        <Input label="¿Qué servicio contrataste?" value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder="Ej: Mantenimiento de aire acondicionado" required />

        <Textarea label="Tu experiencia (mínimo 20 caracteres)" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Cuenta detalles útiles: puntualidad, precio, calidad..." rows={4} required minLength={20} />

        <div className="flex items-center gap-2">
          <input type="checkbox" id="hireAgain" checked={wouldHireAgain} onChange={(e) => setWouldHireAgain(e.target.checked)} className="rounded border-stone-300 text-teal-600 focus:ring-teal-500" />
          <label htmlFor="hireAgain" className="text-sm text-stone-700">
            ¿Lo contratarías de nuevo?
          </label>
        </div>

        <div className="pt-2 flex gap-3">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" fullWidth disabled={rating === 0 || comment.length < 20}>
            Publicar Reseña
          </Button>
        </div>
      </form>
    </Modal>;
}