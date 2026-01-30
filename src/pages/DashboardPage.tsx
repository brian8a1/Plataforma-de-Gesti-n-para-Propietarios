import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TimelineEvent } from '../components/timeline/TimelineEvent';
import { TimelineEvent as TimelineEventType } from '../types';
import {
  MessageSquare,
  Users,
  Briefcase,
  ChevronRight,
  Bell,
  TrendingUp,
  AlertTriangle,
  FileText,
  BookOpen,
  Mail,
  Calendar,
  Building2,
  User,
  Settings,
  Clock } from
'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MessageModal } from '../components/residents/MessageModal';
import { motion, AnimatePresence } from 'framer-motion';
// --- Types & Mock Data for Neighbors ---
type ApartmentStatus = 'registered' | 'empty';
interface Apartment {
  id: string;
  number: string;
  floor: number;
  tower: string;
  status: ApartmentStatus;
}
interface Tower {
  id: string;
  name: string;
  floors: Apartment[][];
}
const generateTowers = (): Tower[] => {
  const towers: Tower[] = [];
  const towerNames = ['1', '2', '3'];
  const numFloors = 8; // Reduced for dashboard compactness
  const aptsPerFloor = 4;
  towerNames.forEach((name) => {
    const floors: Apartment[][] = [];
    for (let f = 1; f <= numFloors; f++) {
      const floorApts: Apartment[] = [];
      for (let a = 1; a <= aptsPerFloor; a++) {
        const aptNum = `${f}${a.toString().padStart(2, '0')}`;
        floorApts.push({
          id: `T${name}-F${f}-A${a}`,
          number: aptNum,
          floor: f,
          tower: name,
          status: Math.random() > 0.4 ? 'registered' : 'empty'
        });
      }
      floors.push(floorApts);
    }
    towers.push({
      id: name,
      name: `Torre ${name}`,
      floors: floors.reverse()
    });
  });
  return towers;
};
const towersData = generateTowers();
const mockEvents: TimelineEventType[] = [
{
  id: '1',
  type: 'incident',
  title: 'Corte de agua programado',
  description:
  'Se realizará mantenimiento en las bombas de agua. El servicio se suspenderá entre 8am y 2pm.',
  date: '29 de enero, 2026 - 8:00 AM',
  status: 'active'
},
{
  id: '2',
  type: 'assembly',
  title: 'Asamblea Extraordinaria',
  description:
  'Se aprobó el aumento de la cuota de administración de $350,000 a $380,000.',
  date: '26 de enero, 2026',
  status: 'resolved'
},
{
  id: '3',
  type: 'financial',
  title: 'Nueva cuota de administración',
  description: 'A partir de febrero 2026, la cuota será de $380,000 COP.',
  date: '26 de enero, 2026',
  status: 'completed'
},
{
  id: '4',
  type: 'maintenance',
  title: 'Mantenimiento Ascensor Torre B',
  description:
  'El ascensor estará fuera de servicio por 2 horas para revisión mensual.',
  date: '22 de enero, 2026',
  status: 'completed'
}];

export function DashboardPage() {
  const { user } = useAuth();
  const [activeTowerIndex, setActiveTowerIndex] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  // Quick access items for mobile home
  const quickAccessItems = [
  {
    path: '/residents',
    label: 'Vecinos',
    icon: Users,
    color: 'bg-teal-500'
  },
  {
    path: '/wiki',
    label: 'Wiki',
    icon: BookOpen,
    color: 'bg-blue-500'
  },
  {
    path: '/messages',
    label: 'Mensajes',
    icon: Mail,
    color: 'bg-purple-500'
  },
  {
    path: '/notifications',
    label: 'Notificaciones',
    icon: Bell,
    color: 'bg-amber-500'
  },
  {
    path: '/timeline',
    label: 'Timeline',
    icon: Clock,
    color: 'bg-emerald-500'
  },
  {
    path: '/profile',
    label: 'Mi Perfil',
    icon: User,
    color: 'bg-stone-600'
  },
  {
    path: '/settings',
    label: 'Ajustes',
    icon: Settings,
    color: 'bg-stone-500'
  }];

  const handleSendMessage = (message: string, isAnonymous: boolean) => {
    console.log(
      `Sending message to Torre ${selectedApartment?.tower} Apto ${selectedApartment?.number}: ${message} (Anonymous: ${isAnonymous})`
    );
  };
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
            Hola, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-sm lg:text-base text-stone-500 mt-1">
            Apto {user?.apartment} • Torre {user?.tower}
          </p>
        </div>
        <Link
          to="/notifications"
          className="p-2 lg:p-3 bg-white rounded-full shadow-sm border border-stone-100 text-stone-600 relative hover:bg-stone-50 transition-colors">

          <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
            2
          </span>
        </Link>
      </div>

      {/* Mobile Quick Access Grid - Only visible on mobile */}
      <div className="lg:hidden mb-6">
        <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
          Accesos Rápidos
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {quickAccessItems.map((item) =>
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-2 group">

              <div
              className={`h-12 w-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-sm group-active:scale-95 transition-transform`}>

                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium text-stone-600 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-amber-900">
                Corte de agua hoy
              </h3>
              <Badge variant="warning">En curso</Badge>
            </div>
            <p className="text-sm text-amber-800">
              Mantenimiento en las bombas de agua. Servicio suspendido de 8am a
              2pm.
            </p>
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Community Stats */}
          <Card className="bg-gradient-to-br from-stone-800 to-stone-900 text-white border-none">
            <h3 className="text-sm font-medium text-stone-300 mb-4">
              Estado de la Comunidad
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl lg:text-3xl font-bold">142</p>
                <p className="text-xs text-stone-400">
                  Propietarios verificados
                </p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-teal-400">
                  28
                </p>
                <p className="text-xs text-stone-400">
                  Proveedores verificados
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12 este mes</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Enero 2026</span>
              </div>
            </div>
          </Card>

          {/* Neighbors Section - Simple button for both mobile and desktop */}
          <Link to="/residents" className="block">
            <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100 hover:border-teal-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      Mis Vecinos
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ver todas las torres y apartamentos
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-teal-600" />
              </div>
            </Card>
          </Link>

          {/* Recent Forum Topics */}
          <Card className="hidden lg:block">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-stone-900">Foro Reciente</h3>
              <Link
                to="/forum"
                className="text-xs text-teal-600 hover:text-teal-700">

                Ver todo
              </Link>
            </div>
            <div className="space-y-3">
              <Link
                to="/forum/1"
                className="block p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">

                <p className="text-sm font-medium text-stone-900">
                  ¿Cómo funciona el reclamo a la constructora?
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  8 respuestas • Hace 2 horas
                </p>
              </Link>
              <Link
                to="/forum/2"
                className="block p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">

                <p className="text-sm font-medium text-stone-900">
                  Vendo sofá seccional, 6 meses de uso
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  3 respuestas • Hace 1 día
                </p>
              </Link>
            </div>
          </Card>

          {/* Wiki Highlights */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-stone-900">
                Artículos Destacados
              </h3>
              <Link
                to="/wiki"
                className="text-xs text-teal-600 hover:text-teal-700">

                Ver Wiki
              </Link>
            </div>
            <div className="space-y-3">
              <Link to="/wiki/2">
                <Card className="hover:border-teal-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 text-sm">
                        Protocolo: Fugas de gas
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        78 votos • Esencial
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link to="/wiki/1">
                <Card className="hover:border-teal-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 text-sm">
                        Guía: Tu factura de luz
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        45 votos • Popular
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-stone-900">
              Timeline de la Comunidad
            </h2>
            <Link
              to="/timeline"
              className="text-sm font-medium text-teal-600 flex items-center hover:text-teal-700 transition-colors">

              Ver historial <ChevronRight className="h-4 w-4 ml-0.5" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-5 lg:p-6">
            <div className="space-y-6">
              {mockEvents.map((event) =>
              <TimelineEvent key={event.id} event={event} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedApartment &&
      <MessageModal
        isOpen={!!selectedApartment}
        onClose={() => setSelectedApartment(null)}
        recipientApartment={`Torre ${selectedApartment.tower} - Apto ${selectedApartment.number}`}
        onSend={handleSendMessage} />

      }
    </div>);

}