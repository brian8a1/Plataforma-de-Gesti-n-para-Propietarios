import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  Ghost,
  User,
  ChevronRight,
  Circle } from
'lucide-react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Conversation, DirectMessage } from '../types';
const mockConversations: Conversation[] = [
{
  id: '1',
  participantApartment: 'A-301',
  participantName: 'Carlos Rodríguez',
  isAnonymous: false,
  lastMessage:
  'Perfecto, entonces quedamos así para el intercambio del parqueadero.',
  lastMessageAt: 'Hace 2 horas',
  unreadCount: 0
},
{
  id: '2',
  participantApartment: 'B-502',
  isAnonymous: true,
  lastMessage:
  'Hola, soy tu vecino de abajo. Parece que hay una fuga de agua...',
  lastMessageAt: 'Hace 1 día',
  unreadCount: 2
},
{
  id: '3',
  participantApartment: 'A-405',
  participantName: 'María López',
  isAnonymous: false,
  lastMessage:
  'Gracias por el aviso sobre el ruido, ya hablé con mi inquilino.',
  lastMessageAt: 'Hace 3 días',
  unreadCount: 0
}];

const mockMessages: DirectMessage[] = [
{
  id: 'm1',
  senderId: 'other',
  isAnonymous: true,
  recipientId: 'me',
  recipientApartment: 'A-301',
  content:
  'Hola, soy tu vecino de abajo. Parece que hay una fuga de agua que está afectando mi apartamento. ¿Podrías revisar?',
  createdAt: 'Ayer, 3:45 PM',
  isRead: true
},
{
  id: 'm2',
  senderId: 'me',
  senderName: 'Yo',
  senderApartment: 'A-301',
  isAnonymous: false,
  recipientId: 'other',
  recipientApartment: 'B-502',
  content:
  'Hola! Gracias por avisarme. Voy a revisar inmediatamente. ¿En qué parte de tu apartamento ves la filtración?',
  createdAt: 'Ayer, 4:00 PM',
  isRead: true
},
{
  id: 'm3',
  senderId: 'other',
  isAnonymous: true,
  recipientId: 'me',
  recipientApartment: 'A-301',
  content:
  'Es en el techo del baño principal, justo debajo de donde estaría tu baño.',
  createdAt: 'Ayer, 4:15 PM',
  isRead: false
}];

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] =
  useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const filteredConversations = mockConversations.filter(
    (conv) =>
    conv.participantApartment.
    toLowerCase().
    includes(searchTerm.toLowerCase()) ||
    conv.participantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (selectedConversation) {
    return (
      <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-3xl mx-auto h-[calc(100vh-80px)] lg:h-[calc(100vh-32px)] flex flex-col">
        {/* Conversation Header */}
        <div className="bg-white border border-stone-200 rounded-t-xl px-4 py-3 flex items-center gap-3 -mx-4 lg:mx-0">
          <button
            onClick={() => setSelectedConversation(null)}
            className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full">

            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <Avatar
            fallback={
            selectedConversation.isAnonymous ?
            '?' :
            selectedConversation.participantApartment
            }
            size="md"
            className={
            selectedConversation.isAnonymous ? 'bg-stone-200' : 'bg-teal-100'
            } />

          <div className="flex-1">
            <h2 className="font-semibold text-stone-900">
              {selectedConversation.isAnonymous ?
              'Vecino Anónimo' :
              selectedConversation.participantName}
            </h2>
            <p className="text-xs text-stone-500">
              Apto {selectedConversation.participantApartment}
            </p>
          </div>
          {selectedConversation.isAnonymous &&
          <Badge variant="outline" className="flex items-center gap-1">
              <Ghost className="h-3 w-3" /> Anónimo
            </Badge>
          }
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white border-x border-stone-200 p-4 space-y-4 -mx-4 lg:mx-0">
          {mockMessages.map((msg) =>
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>

              <div
              className={`max-w-[80%] ${msg.senderId === 'me' ? 'order-2' : ''}`}>

                <div
                className={`px-4 py-3 rounded-2xl ${msg.senderId === 'me' ? 'bg-teal-600 text-white rounded-br-sm' : 'bg-stone-100 border border-stone-200 rounded-bl-sm'}`}>

                  <p className="text-sm">{msg.content}</p>
                </div>
                <p
                className={`text-xs text-stone-400 mt-1 ${msg.senderId === 'me' ? 'text-right' : ''}`}>

                  {msg.createdAt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reply Input */}
        <div className="bg-white border border-stone-200 rounded-b-xl p-4 -mx-4 lg:mx-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Escribe tu respuesta..."
              className="flex-1 bg-stone-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500" />

            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
              disabled={!replyText.trim()}>

              Enviar
            </button>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="p-4 lg:p-8 pb-24 lg:pb-8 max-w-3xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-2">
        Mensajes
      </h1>
      <p className="text-stone-500 text-sm mb-6">
        Conversaciones con tus vecinos
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar conversación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" />

      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredConversations.length > 0 ?
        filteredConversations.map((conv) =>
        <Card
          key={conv.id}
          onClick={() => setSelectedConversation(conv)}
          className="hover:border-teal-200 cursor-pointer">

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                fallback={
                conv.isAnonymous ? '?' : conv.participantApartment
                }
                size="lg"
                className={
                conv.isAnonymous ? 'bg-stone-200' : 'bg-teal-100'
                } />

                  {conv.unreadCount > 0 &&
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
              }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-stone-900 flex items-center gap-2">
                      {conv.isAnonymous ?
                  <>
                          <Ghost className="h-4 w-4 text-stone-400" />
                          Vecino Anónimo
                        </> :

                  conv.participantName
                  }
                    </h3>
                    <span className="text-xs text-stone-400">
                      {conv.lastMessageAt}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 truncate">
                    {conv.lastMessage}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Apto {conv.participantApartment}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-stone-300" />
              </div>
            </Card>
        ) :

        <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-stone-900">
              No hay mensajes
            </h3>
            <p className="text-stone-500 mt-1">
              Tus conversaciones aparecerán aquí
            </p>
          </div>
        }
      </div>
    </div>);

}