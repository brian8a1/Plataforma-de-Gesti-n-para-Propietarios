import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
export function LoginPage() {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Simulate login - in real app would call API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login({
        email
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-white lg:bg-stone-100 lg:flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center p-4 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-teal-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900">
                  Santa Marina
                </h1>
                <p className="text-sm text-stone-500">Comunidad</p>
              </div>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-stone-900 mt-6">
              Bienvenido de vuelta
            </h2>
            <p className="text-stone-600 mt-1">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Correo Electrónico" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="relative">
              <Input label="Contraseña" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-stone-400 hover:text-stone-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-stone-300 text-teal-600 focus:ring-teal-500" />
                <span className="text-sm text-stone-600">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </span> : 'Ingresar'}
            </Button>

            <p className="text-center text-sm text-stone-500">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-8 p-4 bg-stone-100 rounded-lg">
            <p className="text-xs text-stone-500 text-center">
              <strong>Demo:</strong> Usa cualquier email y contraseña para
              probar
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Branding (Desktop only) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-stone-900 to-stone-800 text-white p-12 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="h-20 w-20 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Shield className="h-10 w-10 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Tu comunidad, organizada</h2>
          <p className="text-stone-400 text-lg leading-relaxed">
            Accede al directorio de proveedores, participa en el chat anónimo, y
            mantente informado de todo lo que pasa en Santa Marina.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-teal-400">142</p>
              <p className="text-xs text-stone-400">Vecinos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-400">28</p>
              <p className="text-xs text-stone-400">Proveedores</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-400">102</p>
              <p className="text-xs text-stone-400">Reseñas</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}