import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { User, Ghost } from 'lucide-react';
interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientApartment: string;
  onSend: (message: string, isAnonymous: boolean) => void;
}
export function MessageModal({
  isOpen,
  onClose,
  recipientApartment,
  onSend
}: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const handleSend = () => {
    onSend(message, isAnonymous);
    setMessage('');
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={`Mensaje a Apto ${recipientApartment}`}>
      <div className="space-y-4">
        <Textarea placeholder="Escribe tu mensaje aquí..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Enviar como:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setIsAnonymous(false)} className={`
                flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                ${!isAnonymous ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 hover:border-stone-300'}
              `}>
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Tu Nombre</span>
            </button>

            <button type="button" onClick={() => setIsAnonymous(true)} className={`
                flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                ${isAnonymous ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 hover:border-stone-300'}
              `}>
              <Ghost className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Anónimo</span>
            </button>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            {isAnonymous ? "El vecino verá 'Mensaje de un vecino' y no sabrá quién eres." : 'El vecino verá tu nombre y número de apartamento.'}
          </p>
        </div>

        <Button fullWidth onClick={handleSend} disabled={!message.trim()}>
          Enviar Mensaje
        </Button>
      </div>
    </Modal>;
}