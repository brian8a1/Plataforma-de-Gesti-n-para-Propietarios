import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Eye, Moon, Globe, Smartphone, Mail, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  canDisable: boolean;
}
export function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationSetting[]>([{
    id: 'emergency',
    label: 'Emergencias',
    description: 'Alertas críticas de seguridad',
    icon: AlertTriangle,
    enabled: true,
    canDisable: false
  }, {
    id: 'incident',
    label: 'Incidentes',
    description: 'Cortes de agua, luz, etc.',
    icon: AlertTriangle,
    enabled: true,
    canDisable: false
  }, {
    id: 'messages',
    label: 'Mensajes directos',
    description: 'Cuando un vecino te escribe',
    icon: Mail,
    enabled: true,
    canDisable: true
  }, {
    id: 'assembly',
    label: 'Asambleas',
    description: 'Recordatorios de asambleas',
    icon: Calendar,
    enabled: true,
    canDisable: true
  }, {
    id: 'forum',
    label: 'Respuestas en foro',
    description: 'Cuando responden tus temas',
    icon: MessageSquare,
    enabled: true,
    canDisable: true
  }, {
    id: 'community',
    label: 'Comunidad',
    description: 'Nuevos artículos y eventos',
    icon: Bell,
    enabled: false,
    canDisable: true
  }]);
  const [quietHours, setQuietHours] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('07:00');
  const toggleNotification = (id: string) => {
    setNotifications(notifications.map((n) => n.id === id && n.canDisable ? {
      ...n,
      enabled: !n.enabled
    } : n));
  };
  return <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-stone-900">Configuración</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 lg:p-8 space-y-6">
        {/* Notifications Section */}
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-stone-400" />
            Notificaciones
          </h2>

          <Card noPadding>
            <div className="divide-y divide-stone-100">
              {notifications.map((notification) => {
              const Icon = notification.icon;
              return <div key={notification.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${notification.enabled ? 'bg-teal-100 text-teal-600' : 'bg-stone-100 text-stone-400'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">
                          {notification.label}
                        </p>
                        <p className="text-xs text-stone-500">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notification.enabled} onChange={() => toggleNotification(notification.id)} disabled={!notification.canDisable} className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer 
                        ${notification.canDisable ? 'bg-stone-200 peer-checked:bg-teal-600' : 'bg-teal-600 cursor-not-allowed'}
                        peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:rounded-full after:h-5 after:w-5 
                        after:transition-all peer-checked:after:translate-x-full`} />
                    </label>
                  </div>;
            })}
            </div>
          </Card>

          <p className="text-xs text-stone-500 mt-2">
            Las notificaciones de emergencias e incidentes no se pueden
            desactivar por seguridad.
          </p>
        </div>

        {/* Quiet Hours */}
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Moon className="h-5 w-5 text-stone-400" />
            Horario Silencioso
          </h2>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-stone-900">
                  Activar horario silencioso
                </p>
                <p className="text-xs text-stone-500">
                  No recibir notificaciones en este horario (excepto
                  emergencias)
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={quietHours} onChange={(e) => setQuietHours(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            {quietHours && <div className="flex gap-4 pt-4 border-t border-stone-100">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Desde
                  </label>
                  <input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Hasta
                  </label>
                  <input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>}
          </Card>
        </div>

        {/* Privacy Section */}
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-stone-400" />
            Privacidad
          </h2>

          <Card noPadding>
            <div className="divide-y divide-stone-100">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-stone-900">
                    Mostrar estado en línea
                  </p>
                  <p className="text-xs text-stone-500">
                    Otros pueden ver cuando estás activo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-stone-900">
                    Recibir mensajes anónimos
                  </p>
                  <p className="text-xs text-stone-500">
                    Permitir que vecinos te escriban anónimamente
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-stone-200 peer-checked:bg-teal-600 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-stone-400" />
            Cuenta
          </h2>

          <Card noPadding>
            <div className="divide-y divide-stone-100">
              <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left">
                <div>
                  <p className="font-medium text-stone-900">
                    Cambiar contraseña
                  </p>
                  <p className="text-xs text-stone-500">
                    Actualiza tu contraseña de acceso
                  </p>
                </div>
                <ArrowLeft className="h-5 w-5 text-stone-300 rotate-180" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left">
                <div>
                  <p className="font-medium text-stone-900">
                    Descargar mis datos
                  </p>
                  <p className="text-xs text-stone-500">
                    Exporta toda tu información
                  </p>
                </div>
                <ArrowLeft className="h-5 w-5 text-stone-300 rotate-180" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-left">
                <div>
                  <p className="font-medium text-red-600">Eliminar cuenta</p>
                  <p className="text-xs text-stone-500">
                    Elimina permanentemente tu cuenta
                  </p>
                </div>
                <ArrowLeft className="h-5 w-5 text-stone-300 rotate-180" />
              </button>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <Button fullWidth size="lg">
          Guardar Cambios
        </Button>
      </div>
    </div>;
}