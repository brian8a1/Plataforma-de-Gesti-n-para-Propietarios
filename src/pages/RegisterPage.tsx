import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { KYCUpload } from '../components/auth/KYCUpload';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    user
  } = useAuth();
  const [step, setStep] = useState<'form' | 'kyc'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tower: 'A',
    apartment: '',
    role: 'owner'
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
    setStep('kyc');
  };
  if (user?.role === 'pending' || step === 'kyc') {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <KYCUpload />
        </div>
      </div>;
  }
  if (user?.role === 'verified') {
    navigate('/dashboard');
    return null;
  }
  return <div className="min-h-screen bg-white lg:bg-stone-100 lg:flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center p-4 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-stone-600">
              Únete a la comunidad de propietarios de Santa Marina.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Nombre Completo" placeholder="Juan Pérez" value={formData.name} onChange={(e) => setFormData({
            ...formData,
            name: e.target.value
          })} required />

            <Input label="Correo Electrónico" type="email" placeholder="juan@ejemplo.com" value={formData.email} onChange={(e) => setFormData({
            ...formData,
            email: e.target.value
          })} required />

            <Input label="WhatsApp" type="tel" placeholder="+57 300 123 4567" value={formData.phone} onChange={(e) => setFormData({
            ...formData,
            phone: e.target.value
          })} required />

            <div className="grid grid-cols-2 gap-4">
              <Select label="Torre" options={[{
              value: 'A',
              label: 'Torre A'
            }, {
              value: 'B',
              label: 'Torre B'
            }, {
              value: 'C',
              label: 'Torre C'
            }]} value={formData.tower} onChange={(e) => setFormData({
              ...formData,
              tower: e.target.value
            })} />

              <Input label="Apartamento" placeholder="Ej: 301" value={formData.apartment} onChange={(e) => setFormData({
              ...formData,
              apartment: e.target.value
            })} required />
            </div>

            <Select label="Soy..." options={[{
            value: 'owner',
            label: 'Propietario'
          }, {
            value: 'tenant',
            label: 'Arrendatario / Residente'
          }, {
            value: 'agency',
            label: 'Agencia Inmobiliaria'
          }]} value={formData.role} onChange={(e) => setFormData({
            ...formData,
            role: e.target.value
          })} />

            <Button type="submit" fullWidth size="lg" className="mt-6">
              Continuar
            </Button>

            <p className="text-center text-sm text-stone-500">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Info (Desktop only) */}
      <div className="hidden lg:flex lg:flex-1 bg-stone-900 text-white p-12 items-center justify-center">
        <div className="max-w-md">
          <div className="h-16 w-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-8">
            <Shield className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Verificación segura</h2>
          <p className="text-stone-400 text-lg mb-8 leading-relaxed">
            Para mantener la seguridad de la comunidad, verificamos que cada
            usuario sea un residente real.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
              <div>
                <p className="font-medium">Proceso automático</p>
                <p className="text-sm text-stone-400">
                  Verificación en menos de 1 minuto
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
              <div>
                <p className="font-medium">Datos protegidos</p>
                <p className="text-sm text-stone-400">
                  Tu información está encriptada
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
              <div>
                <p className="font-medium">Alias anónimo</p>
                <p className="text-sm text-stone-400">
                  Participa sin revelar tu identidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}