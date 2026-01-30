import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Search, ArrowRight, CheckCircle, MessageSquare, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
export function LandingPage() {
  return <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full bg-teal-500 opacity-20 blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-60 h-60 lg:w-96 lg:h-96 rounded-full bg-orange-500 opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 lg:py-24 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column - Text */}
            <div className="text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-teal-300 text-xs font-medium mb-6 backdrop-blur-sm border border-white/10">
                Exclusivo para Comunidad Santa Marina
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 lg:mb-6">
                Tu comunidad,
                <br />
                <span className="text-teal-400">organizada.</span>
              </h1>
              <p className="text-lg lg:text-xl text-stone-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Encuentra proveedores verificados, participa sin miedo al qué
                dirán, y mantente informado de lo que pasa en tu inversión.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <Link to="/register" className="flex-1">
                  <Button size="lg" fullWidth className="bg-teal-500 hover:bg-teal-400 text-white border-none">
                    Únete a tu comunidad
                  </Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="lg" fullWidth className="border-white/30 text-white hover:bg-white/10">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Stats/Visual (Desktop only) */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <p className="text-4xl font-bold text-teal-400">196</p>
                    <p className="text-sm text-stone-400 mt-1">Propietarios</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <p className="text-4xl font-bold text-orange-400">28</p>
                    <p className="text-sm text-stone-400 mt-1">Proveedores</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <p className="text-4xl font-bold text-white">102</p>
                    <p className="text-sm text-stone-400 mt-1">Reseñas</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl">
                    <p className="text-4xl font-bold text-emerald-400">85%</p>
                    <p className="text-sm text-stone-400 mt-1">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
            Todo lo que necesitas para gestionar tu inversión
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Diseñado específicamente para comunidades de apartamentos turísticos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">
              Proveedores Verificados
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Deja de preguntar "¿quién arregla aires?" en WhatsApp. Encuentra
              proveedores calificados por tus propios vecinos.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Reseñas verificadas
              </li>
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Alertas de malos proveedores
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">
              Participación Anónima
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Opina, pregunta y propón ideas sin miedo a ser juzgado. Tu
              identidad está protegida con un alias aleatorio.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Alias automático
              </li>
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Sin miedo al qué dirán
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">
              Directorio de Vecinos
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Contacta a cualquier apartamento sin necesidad de tener su
              teléfono. Ideal para avisar de fugas o ruidos.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Mensajes anónimos o con nombre
              </li>
              <li className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Privacidad garantizada
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-stone-900 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para organizar tu comunidad?
          </h2>
          <p className="text-lg text-stone-400 mb-8 max-w-2xl mx-auto">
            Únete a los propietarios que ya están ahorrando tiempo y dinero con
            nuestra plataforma.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white px-8">
              Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-stone-50 py-12 px-4 text-center border-t border-stone-100">
        <p className="text-sm text-stone-500 mb-4">
          Solo para propietarios y residentes verificados.
        </p>
        <div className="flex justify-center items-center gap-6 text-stone-400 text-xs">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Datos encriptados</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Verificación KYC</span>
          </div>
        </div>
      </div>
    </div>;
}