import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ProviderCategory } from '../../types';
interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const categories: {
  value: ProviderCategory;
  label: string;
}[] = [{
  value: 'Aseo y limpieza',
  label: 'Aseo y limpieza'
}, {
  value: 'Plomería',
  label: 'Plomería'
}, {
  value: 'Electricidad',
  label: 'Electricidad'
}, {
  value: 'Aires acondicionados',
  label: 'Aires acondicionados'
}, {
  value: 'Internet y TV',
  label: 'Internet y TV'
}, {
  value: 'Carpintería',
  label: 'Carpintería'
}, {
  value: 'Cerrajería',
  label: 'Cerrajería'
}, {
  value: 'Lavandería',
  label: 'Lavandería'
}, {
  value: 'Fumigación',
  label: 'Fumigación'
}, {
  value: 'Transporte',
  label: 'Transporte'
}, {
  value: 'Mantenimiento general',
  label: 'Mantenimiento general'
}];
export function AddProviderModal({
  isOpen,
  onClose,
  onSubmit
}: AddProviderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0].value,
    phone: '',
    services: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      services: formData.services.split(',').map((s) => s.trim()).filter(Boolean)
    });
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Recomendar Proveedor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 mb-4">
          Solo agrega proveedores que hayas usado personalmente y recomiendes.
          No te puedes auto-promocionar.
        </div>

        <Input label="Nombre del negocio o persona" value={formData.name} onChange={(e) => setFormData({
        ...formData,
        name: e.target.value
      })} placeholder="Ej: Harkin Instalaciones" required />

        <Select label="Categoría" options={categories} value={formData.category} onChange={(e) => setFormData({
        ...formData,
        category: e.target.value as ProviderCategory
      })} />

        <Input label="Teléfono / WhatsApp" value={formData.phone} onChange={(e) => setFormData({
        ...formData,
        phone: e.target.value
      })} placeholder="+57 300 123 4567" required />

        <Input label="Servicios principales (separados por coma)" value={formData.services} onChange={(e) => setFormData({
        ...formData,
        services: e.target.value
      })} placeholder="Ej: Instalación, Mantenimiento, Reparación" required />

        <div className="pt-2 flex gap-3">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" fullWidth>
            Agregar Proveedor
          </Button>
        </div>
      </form>
    </Modal>;
}