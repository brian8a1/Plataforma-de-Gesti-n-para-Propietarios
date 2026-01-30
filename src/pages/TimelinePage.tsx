import React, { useState } from 'react';
import { ArrowLeft, Filter, Calendar, AlertTriangle, FileText, Megaphone, DollarSign, Wrench, Users, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TimelineEvent as TimelineEventType } from '../types';
const eventTypes = [{
  value: 'all',
  label: 'Todos',
  icon: Calendar
}, {
  value: 'incident',
  label: 'Incidentes',
  icon: AlertTriangle
}, {
  value: 'assembly',
  label: 'Asambleas',
  icon: FileText
}, {
  value: 'rule',
  label: 'Normas',
  icon: Megaphone
}, {
  value: 'financial',
  label: 'Financiero',
  icon: DollarSign
}, {
  value: 'maintenance',
  label: 'Mantenimiento',
  icon: Wrench
}, {
  value: 'community',
  label: 'Comunidad',
  icon: Users
}];
const periods = [{
  value: 'month',
  label: 'Este mes'
}, {
  value: '3months',
  label: 'Últimos 3 meses'
}, {
  value: 'year',
  label: 'Este año'
}, {
  value: 'all',
  label: 'Todo el historial'
}];
const mockEvents: (TimelineEventType & {
  month: string;
})[] = [{
  id: '1',
  type: 'incident',
  title: 'Corte de agua programado',
  description: 'Mantenimiento en las bombas de agua. Servicio suspendido de 8am a 2pm.',
  date: '28 Ene 2026',
  status: 'active',
  month: 'Enero 2026'
}, {
  id: '2',
  type: 'assembly',
  title: 'Asamblea Extraordinaria',
  description: 'Se aprobó aumento de cuota de $350,000 a $380,000.',
  date: '25 Ene 2026',
  status: 'resolved',
  month: 'Enero 2026'
}, {
  id: '3',
  type: 'financial',
  title: 'Nueva cuota de administración',
  description: 'A partir de febrero, la cuota será de $380,000 COP.',
  date: '25 Ene 2026',
  status: 'completed',
  month: 'Enero 2026'
}, {
  id: '4',
  type: 'maintenance',
  title: 'Mantenimiento Ascensor Torre B',
  description: 'Revisión mensual programada. Fuera de servicio por 2 horas.',
  date: '20 Ene 2026',
  status: 'completed',
  month: 'Enero 2026'
}, {
  id: '5',
  type: 'rule',
  title: 'Nuevo horario de piscina',
  description: 'El horario se extiende hasta las 9pm los fines de semana.',
  date: '15 Ene 2026',
  status: 'completed',
  month: 'Enero 2026'
}, {
  id: '6',
  type: 'incident',
  title: 'Fuga de gas Piso 5 Torre A',
  description: 'Se detectó fuga de gas. Evacuación preventiva del piso.',
  date: '28 Dic 2025',
  status: 'resolved',
  month: 'Diciembre 2025'
}, {
  id: '7',
  type: 'assembly',
  title: 'Asamblea Ordinaria Anual',
  description: 'Presentación de estados financieros y elección de nuevo comité.',
  date: '10 Dic 2025',
  status: 'completed',
  month: 'Diciembre 2025'
}, {
  id: '8',
  type: 'community',
  title: 'Novena Navideña',
  description: 'Integración comunitaria en el salón social.',
  date: '16 Dic 2025',
  status: 'completed',
  month: 'Diciembre 2025'
}, {
  id: '9',
  type: 'maintenance',
  title: 'Fumigación General',
  description: 'Fumigación de áreas comunes y parqueaderos.',
  date: '5 Dic 2025',
  status: 'completed',
  month: 'Diciembre 2025'
}];
const typeColors: Record<string, string> = {
  incident: 'bg-red-100 text-red-600 border-red-200',
  assembly: 'bg-blue-100 text-blue-600 border-blue-200',
  rule: 'bg-purple-100 text-purple-600 border-purple-200',
  financial: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  maintenance: 'bg-orange-100 text-orange-600 border-orange-200',
  community: 'bg-pink-100 text-pink-600 border-pink-200'
};
const typeIcons: Record<string, React.ElementType> = {
  incident: AlertTriangle,
  assembly: FileText,
  rule: Megaphone,
  financial: DollarSign,
  maintenance: Wrench,
  community: Users
};
export function TimelinePage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const filteredEvents = mockEvents.filter((event) => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    return matchesType && matchesStatus;
  });
  // Group by month
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.month]) acc[event.month] = [];
    acc[event.month].push(event);
    return acc;
  }, {} as Record<string, typeof filteredEvents>);
  return <div className="min-h-screen bg-stone-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-stone-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-semibold text-stone-900">
                Timeline de la Comunidad
              </h1>
              <p className="text-xs text-stone-500">
                Historial completo de eventos
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Exportar
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Filters */}
        <Card className="mb-6">
          <div className="space-y-4">
            {/* Type Filter */}
            <div>
              <p className="text-xs font-medium text-stone-500 uppercase mb-2">
                Tipo de evento
              </p>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => {
                const Icon = type.icon;
                return <button key={type.value} onClick={() => setSelectedType(type.value)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${selectedType === type.value ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {type.label}
                    </button>;
              })}
              </div>
            </div>

            {/* Period and Status */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <p className="text-xs font-medium text-stone-500 uppercase mb-2">
                  Período
                </p>
                <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  {periods.map((p) => <option key={p.value} value={p.value}>
                      {p.label}
                    </option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[150px]">
                <p className="text-xs font-medium text-stone-500 uppercase mb-2">
                  Estado
                </p>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="all">Todos</option>
                  <option value="active">En curso</option>
                  <option value="resolved">Resueltos</option>
                  <option value="scheduled">Programados</option>
                  <option value="completed">Completados</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Results count */}
        <p className="text-sm text-stone-500 mb-4">
          {filteredEvents.length} eventos encontrados
        </p>

        {/* Timeline */}
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([month, events]) => <div key={month}>
              <h2 className="text-lg font-bold text-stone-900 mb-4 sticky top-20 bg-stone-50 py-2">
                {month}
              </h2>
              <div className="space-y-4">
                {events.map((event) => {
              const Icon = typeIcons[event.type];
              return <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[event.type]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-stone-900">
                              {event.title}
                            </h3>
                            <Badge variant={event.status === 'active' ? 'error' : event.status === 'resolved' ? 'success' : event.status === 'scheduled' ? 'info' : 'default'}>
                              {event.status === 'active' ? 'En curso' : event.status === 'resolved' ? 'Resuelto' : event.status === 'scheduled' ? 'Programado' : 'Completado'}
                            </Badge>
                          </div>
                          <p className="text-sm text-stone-600 mb-2">
                            {event.description}
                          </p>
                          <p className="text-xs text-stone-400">{event.date}</p>
                        </div>
                      </div>
                    </Card>;
            })}
              </div>
            </div>)}
        </div>

        {filteredEvents.length === 0 && <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-stone-900">
              No hay eventos
            </h3>
            <p className="text-stone-500 mt-1">
              Ajusta los filtros para ver más resultados
            </p>
          </div>}
      </div>
    </div>;
}