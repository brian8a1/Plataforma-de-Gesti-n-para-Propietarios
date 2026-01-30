import React from 'react';
import { AlertTriangle, FileText, Megaphone, DollarSign, Wrench, Users, Clock, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { TimelineEvent as TimelineEventType } from '../../types';
import { Badge } from '../ui/Badge';
interface TimelineEventProps {
  event: TimelineEventType;
}
export function TimelineEvent({
  event
}: TimelineEventProps) {
  const icons = {
    incident: AlertTriangle,
    assembly: FileText,
    rule: Megaphone,
    financial: DollarSign,
    maintenance: Wrench,
    community: Users
  };
  const colors = {
    incident: 'bg-red-100 text-red-600 border-red-200',
    assembly: 'bg-blue-100 text-blue-600 border-blue-200',
    rule: 'bg-purple-100 text-purple-600 border-purple-200',
    financial: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    maintenance: 'bg-orange-100 text-orange-600 border-orange-200',
    community: 'bg-pink-100 text-pink-600 border-pink-200'
  };
  const statusBadges = {
    active: {
      variant: 'error' as const,
      label: 'En curso',
      icon: Clock
    },
    resolved: {
      variant: 'success' as const,
      label: 'Resuelto',
      icon: CheckCircle
    },
    scheduled: {
      variant: 'info' as const,
      label: 'Programado',
      icon: Calendar
    },
    completed: {
      variant: 'default' as const,
      label: 'Completado',
      icon: CheckCircle
    }
  };
  const Icon = icons[event.type];
  const colorClass = colors[event.type];
  const statusInfo = statusBadges[event.status];
  const StatusIcon = statusInfo.icon;
  return <div className="relative pl-8 pb-6 last:pb-0 border-l-2 border-stone-200 ml-4 group">
      {/* Icon */}
      <div className={`absolute -left-[17px] top-0 rounded-full p-2 border-2 border-white shadow-sm ${colorClass}`}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="bg-stone-50 rounded-lg p-4 hover:bg-stone-100 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">
              {event.date}
            </span>
            <Badge variant={statusInfo.variant} className="flex items-center gap-1">
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
          {event.forumTopicId && <a href={`/forum/${event.forumTopicId}`} className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1">
              Ver discusión <ExternalLink className="h-3 w-3" />
            </a>}
        </div>

        <h3 className="font-semibold text-stone-900 mb-1">{event.title}</h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          {event.description}
        </p>

        {event.attachments && event.attachments.length > 0 && <div className="mt-3 pt-3 border-t border-stone-200">
            <p className="text-xs text-stone-500 mb-2">Documentos adjuntos:</p>
            <div className="flex flex-wrap gap-2">
              {event.attachments.map((attachment, i) => <a key={i} href="#" className="text-xs bg-white px-2 py-1 rounded border border-stone-200 text-teal-600 hover:bg-teal-50 transition-colors">
                  📎 {attachment}
                </a>)}
            </div>
          </div>}
      </div>
    </div>;
}