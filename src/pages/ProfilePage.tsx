import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Bell,
  Moon,
  Eye,
  Mail,
  MessageSquare,
  Calendar,
  AlertTriangle,
  ArrowLeft } from
'lucide-react';
interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  canDisable: boolean;
}
export function ProfilePage() {
  const { user, logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Settings state
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
  {
    id: 'emergency',
    label: 'Emergencias',
    description: 'Alertas críticas de seguridad',
    icon: AlertTriangle,
    enabled: true,
    canDisable: false
  },
  {
    id: 'incident',
    label: 'Incidentes',
    description: 'Cortes de agua, luz, etc.',
    icon: AlertTriangle,
    enabled: true,
    canDisable: false
  },
  {
    id: 'messages',
    label: 'Mensajes directos',
    description: 'Cuando un vecino te escribe',
    icon: Mail,
    enabled: true,
    canDisable: true
  },
  {
    id: 'assembly',
    label: 'Asambleas',
    description: 'Recordatorios de asambleas',
    icon: Calendar,
    enabled: true,
    canDisable: true
  },
  {
    id: 'forum',
    label: 'Respuestas en foro',
    description: 'Cuando responden tus temas',
    icon: MessageSquare,
    enabled: true,
    canDisable: true
  },
  {
    id: 'community',
    label: 'Comunidad',
    description: 'Nuevos artículos y eventos',
    icon: Bell,
    enabled: false,
    canDisable: true
  }]
  );
  const [quietHours, setQuietHours] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('07:00');
  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((n) =>
      n.id === id && n.canDisable ?
      {
        ...n,
        enabled: !n.enabled
      } :
      n
      )
    );
  };
  if (!user) return null;
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 min-h-screen bg-stone-50 max-w-2xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-6 lg:mb-8">
        Mi Perfil
      </h1>

      {/* Profile Header */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar
            fallback={user.name}
            size="xl"
            src={user.avatar}
            className="mx-auto sm:mx-0" />

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl lg:text-2xl font-bold text-stone-900">
              {user.name}
            </h2>
            <p className="text-stone-500">
              Torre {user.tower} • Apto {user.apartment}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                <Shield className="h-3 w-3 mr-1" /> Verificado
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Anonymous Alias Card */}
      <Card className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-orange-900 mb-2">
              Tu Alias Anónimo
            </h3>
            <p className="text-sm text-orange-800 mb-3">
              En el chat y reseñas apareces como:
            </p>
            <div className="bg-white px-4 py-3 rounded-lg border border-orange-200 inline-block">
              <span className="font-mono text-lg font-bold text-orange-700">
                {user.alias}
              </span>
            </div>
            <p className="text-xs text-orange-700 mt-3">
              Este alias protege tu identidad para que puedas participar sin
              miedo al juicio social.
            </p>
          </div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="text-orange-600 hover:text-orange-700 p-2 hover:bg-orange-100 rounded-lg transition-colors">

            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </Card>

      {/* Menu Options */}
      <Card noPadding className="mb-6">
        <div className="divide-y divide-stone-100">
          {/* Settings - Expandable */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors">

              <div className="flex items-center gap-3">
                <div className="bg-stone-100 p-2 rounded-lg">
                  <Settings className="h-5 w-5 text-stone-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-stone-900">Configuración</p>
                  <p className="text-xs text-stone-500">
                    Notificaciones y privacidad
                  </p>
                </div>
              </div>
              <motion.div
                animate={{
                  rotate: settingsOpen ? 180 : 0
                }}
                transition={{
                  duration: 0.2
                }}>

                <ChevronDown className="h-5 w-5 text-stone-400" />
              </motion.div>
            </button>

            {/* Expandable Settings Panel */}
            <AnimatePresence>
              {settingsOpen &&
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: 'auto',
                  opacity: 1
                }}
                exit={{
                  height: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut'
                }}
                className="overflow-hidden">

                  <div className="px-4 pb-4 space-y-5 bg-stone-50/50">
                    {/* Notifications Section */}
                    <div className="pt-4">
                      <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-stone-400" />
                        Notificaciones
                      </h3>
                      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
                        {notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between p-3">

                              <div className="flex items-center gap-3">
                                <div
                                className={`h-8 w-8 rounded-lg flex items-center justify-center ${notification.enabled ? 'bg-teal-100 text-teal-600' : 'bg-stone-100 text-stone-400'}`}>

                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-stone-900">
                                    {notification.label}
                                  </p>
                                  <p className="text-xs text-stone-500">
                                    {notification.description}
                                  </p>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                type="checkbox"
                                checked={notification.enabled}
                                onChange={() =>
                                toggleNotification(notification.id)
                                }
                                disabled={!notification.canDisable}
                                className="sr-only peer" />

                                <div
                                className={`w-10 h-5 rounded-full peer 
                                  ${notification.canDisable ? 'bg-stone-200 peer-checked:bg-teal-600' : 'bg-teal-600 cursor-not-allowed'}
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:rounded-full after:h-4 after:w-4 
                                  after:transition-all peer-checked:after:translate-x-5`} />

                              </label>
                            </div>);

                      })}
                      </div>
                      <p className="text-xs text-stone-500 mt-2">
                        Las emergencias e incidentes no se pueden desactivar.
                      </p>
                    </div>

                    {/* Quiet Hours */}
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <Moon className="h-4 w-4 text-stone-400" />
                        Horario Silencioso
                      </h3>
                      <div className="bg-white rounded-xl border border-stone-200 p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              Activar horario silencioso
                            </p>
                            <p className="text-xs text-stone-500">
                              Sin notificaciones (excepto emergencias)
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            checked={quietHours}
                            onChange={(e) => setQuietHours(e.target.checked)}
                            className="sr-only peer" />

                            <div className="w-10 h-5 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                        {quietHours &&
                      <div className="flex gap-3 pt-3 border-t border-stone-100">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-stone-700 mb-1">
                                Desde
                              </label>
                              <input
                            type="time"
                            value={quietStart}
                            onChange={(e) => setQuietStart(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />

                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-stone-700 mb-1">
                                Hasta
                              </label>
                              <input
                            type="time"
                            value={quietEnd}
                            onChange={(e) => setQuietEnd(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />

                            </div>
                          </div>
                      }
                      </div>
                    </div>

                    {/* Privacy Section */}
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-stone-400" />
                        Privacidad
                      </h3>
                      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              Mostrar estado en línea
                            </p>
                            <p className="text-xs text-stone-500">
                              Otros ven cuando estás activo
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer" />

                            <div className="w-10 h-5 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              Recibir mensajes anónimos
                            </p>
                            <p className="text-xs text-stone-500">
                              Vecinos pueden escribirte anónimamente
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer" />

                            <div className="w-10 h-5 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Account Section */}
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-stone-400" />
                        Cuenta
                      </h3>
                      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
                        <button className="w-full flex items-center justify-between p-3 hover:bg-stone-50 transition-colors text-left">
                          <p className="text-sm font-medium text-stone-900">
                            Cambiar contraseña
                          </p>
                          <ChevronRight className="h-4 w-4 text-stone-300" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 hover:bg-stone-50 transition-colors text-left">
                          <p className="text-sm font-medium text-stone-900">
                            Descargar mis datos
                          </p>
                          <ChevronRight className="h-4 w-4 text-stone-300" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 hover:bg-red-50 transition-colors text-left">
                          <p className="text-sm font-medium text-red-600">
                            Eliminar cuenta
                          </p>
                          <ChevronRight className="h-4 w-4 text-stone-300" />
                        </button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <Button fullWidth size="md">
                      Guardar Cambios
                    </Button>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button
        variant="outline"
        fullWidth
        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        onClick={logout}>

        <LogOut className="h-4 w-4 mr-2" />
        Cerrar Sesión
      </Button>

      {/* Version Info */}
      <p className="text-center text-xs text-stone-400 mt-6">
        Comunidad Santa Marina v1.0 • Enero 2026
      </p>
    </div>);

}