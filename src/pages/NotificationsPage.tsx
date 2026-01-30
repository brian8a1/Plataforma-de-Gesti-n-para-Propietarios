import React, { useState } from 'react';
import { Bell, AlertTriangle, MessageSquare, Calendar, Users, Settings, Check, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Notification, NotificationType } from '../types';
const notificationIcons: Record<NotificationType, React.ReactNode> = {
  emergency: <AlertTriangle className="h-5 w-5" />,
  incident: <AlertTriangle className="h-5 w-5" />,
  message: <MessageSquare className="h-5 w-5" />,
  assembly: <Calendar className="h-5 w-5" />,
  forum: <MessageSquare className="h-5 w-5" />,
  community: <Users className="h-5 w-5" />,
  system: <Settings className="h-5 w-5" />
};
const notificationColors: Record<NotificationType, string> = {
  emergency: 'bg-red-100 text-red-600',
  incident: 'bg-amber-100 text-amber-600',
  message: 'bg-blue-100 text-blue-600',
  assembly: 'bg-purple-100 text-purple-600',
  forum: 'bg-teal-100 text-teal-600',
  community: 'bg-green-100 text-green-600',
  system: 'bg-stone-100 text-stone-600'
};
const mockNotifications: Notification[] = [{
  id: '1',
  type: 'incident',
  title: 'Corte de agua programado',
  message: 'Hoy de 8am a 2pm habrá corte de agua por mantenimiento.',
  createdAt: 'Hace 30 min',
  isRead: false,
  link: '/dashboard'
}, {
  id: '2',
  type: 'message',
  title: 'Nuevo mensaje',
  message: 'Tienes un mensaje de un vecino sobre el Apto B-502.',
  createdAt: 'Hace 2 horas',
  isRead: false,
  link: '/messages'
}, {
  id: '3',
  type: 'forum',
  title: 'Respuesta en tu tema',
  message: 'Pedro Gómez respondió a "¿Cómo funciona el proceso de reclamo?"',
  createdAt: 'Hace 5 horas',
  isRead: true,
  link: '/forum/1'
}, {
  id: '4',
  type: 'assembly',
  title: 'Asamblea mañana',
  message: 'Recordatorio: Asamblea extraordinaria mañana a las 7pm.',
  createdAt: 'Ayer',
  isRead: true,
  link: '/dashboard'
}, {
  id: '5',
  type: 'community',
  title: 'Nuevo artículo en Wiki',
  message: 'Se publicó "Guía: Cómo configurar tu Airbnb correctamente"',
  createdAt: 'Hace 2 días',
  isRead: true,
  link: '/wiki/5'
}, {
  id: '6',
  type: 'system',
  title: 'Verificación completada',
  message: 'Tu cuenta ha sido verificada exitosamente. ¡Bienvenido!',
  createdAt: 'Hace 1 semana',
  isRead: true
}];
export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const filteredNotifications = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({
      ...n,
      isRead: true
    })));
  };
  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => n.id === id ? {
      ...n,
      isRead: true
    } : n));
  };
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };
  return <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900">
            Notificaciones
          </h1>
          {unreadCount > 0 && <p className="text-stone-500 text-sm mt-1">
              {unreadCount} sin leer
            </p>}
        </div>
        {unreadCount > 0 && <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-1" /> Marcar todas
          </Button>}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${filter === 'all' ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
          Todas
        </button>
        <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${filter === 'unread' ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
          Sin leer {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? filteredNotifications.map((notification) => <Card key={notification.id} className={`relative ${!notification.isRead ? 'bg-teal-50/50 border-teal-200' : ''}`}>
              <div className="flex gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${notificationColors[notification.type]}`}>
                  {notificationIcons[notification.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-medium ${!notification.isRead ? 'text-stone-900' : 'text-stone-700'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-stone-400 whitespace-nowrap">
                      {notification.createdAt}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 mt-1">
                    {notification.message}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    {notification.link && <a href={notification.link} className="text-xs text-teal-600 hover:text-teal-700 font-medium" onClick={() => markAsRead(notification.id)}>
                        Ver detalles →
                      </a>}
                    {!notification.isRead && <button onClick={() => markAsRead(notification.id)} className="text-xs text-stone-500 hover:text-stone-700">
                        Marcar como leída
                      </button>}
                  </div>
                </div>
                <button onClick={() => deleteNotification(notification.id)} className="p-1 text-stone-400 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {!notification.isRead && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r" />}
            </Card>) : <div className="text-center py-12">
            <Bell className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-stone-900">
              No hay notificaciones
            </h3>
            <p className="text-stone-500 mt-1">
              {filter === 'unread' ? 'No tienes notificaciones sin leer' : 'Tus notificaciones aparecerán aquí'}
            </p>
          </div>}
      </div>
    </div>;
}