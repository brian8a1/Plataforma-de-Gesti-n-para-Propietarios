import React, { useEffect, useState, useRef } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { ChatMessage as ChatMessageType } from '../types';
import { Info, Shield, Users, Hash, ChevronLeft, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const initialMessages: ChatMessageType[] = [
{
  id: '1',
  alias: 'Vecino_12',
  content: '¿Alguien sabe si hoy pasa el camión de la basura?',
  timestamp: '10:30 AM',
  isMe: false
},
{
  id: '2',
  alias: 'Residente_Norte',
  content: 'Sí, suele pasar tipo 2pm los martes.',
  timestamp: '10:35 AM',
  isMe: false
},
{
  id: '3',
  alias: 'Vecino_47',
  content:
  'Gracias! Aprovecho para preguntar, ¿alguien tiene el contacto del administrador?',
  timestamp: '10:40 AM',
  isMe: true
},
{
  id: '4',
  alias: 'Vecino_05',
  content:
  'Está en la cartelera de la entrada, pero te lo paso: 300 555 1234',
  timestamp: '10:42 AM',
  isMe: false
},
{
  id: '5',
  alias: 'Residente_Sur',
  content:
  '¿Alguien más ha tenido problemas con el internet hoy? Se me cae cada rato.',
  timestamp: '11:15 AM',
  isMe: false
}];

const channels = [
{
  id: 'general',
  name: 'general',
  description: 'Conversación general'
},
{
  id: 'admin',
  name: 'administración',
  description: 'Temas con la administración'
},
{
  id: 'tips',
  name: 'tips',
  description: 'Consejos útiles'
}];

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [activeChannel, setActiveChannel] = useState('general');
  const [showChannelList, setShowChannelList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = (text: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      alias: 'Vecino_47',
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isMe: true
    };
    setMessages([...messages, newMessage]);
  };
  const handleSelectChannel = (channelId: string) => {
    setActiveChannel(channelId);
    setShowChannelList(false);
  };
  const activeChannelData = channels.find((c) => c.id === activeChannel);
  return (
    <div className="flex h-[calc(100vh-64px)] lg:h-screen bg-stone-100">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-stone-200">
        <div className="p-4 border-b border-stone-100">
          <h2 className="font-bold text-stone-900">Chat Anónimo</h2>
          <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
            <Shield className="h-3 w-3" /> Tu identidad está protegida
          </p>
        </div>

        <div className="p-3">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-2 mb-2">
            Canales
          </p>
          <div className="space-y-1">
            {channels.map((channel) =>
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`
                  w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors
                  ${activeChannel === channel.id ? 'bg-teal-50 text-teal-700' : 'text-stone-600 hover:bg-stone-50'}
                `}>

                <Hash className="h-4 w-4" />
                <span className="text-sm font-medium">{channel.name}</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-stone-100">
          <div className="bg-stone-50 rounded-lg p-3">
            <p className="text-xs font-medium text-stone-700">Tu alias:</p>
            <p className="text-sm font-bold text-teal-600">Vecino_47</p>
          </div>
        </div>
      </div>

      {/* Mobile Channel List - Full Screen Overlay */}
      <AnimatePresence>
        {showChannelList &&
        <motion.div
          initial={{
            x: '-100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '-100%'
          }}
          transition={{
            type: 'tween',
            duration: 0.25
          }}
          className="lg:hidden fixed inset-0 z-50 bg-white">

            {/* Mobile Channel List Header */}
            <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3">
              <button
              onClick={() => setShowChannelList(false)}
              className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">

                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-bold text-stone-900">Chat Anónimo</h1>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Tu identidad está protegida
                </p>
              </div>
            </div>

            {/* Channel List */}
            <div className="p-4">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Canales disponibles
              </p>
              <div className="space-y-2">
                {channels.map((channel) =>
              <button
                key={channel.id}
                onClick={() => handleSelectChannel(channel.id)}
                className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                      ${activeChannel === channel.id ? 'bg-teal-50 text-teal-700 border-2 border-teal-200' : 'bg-stone-50 text-stone-600 border-2 border-transparent hover:bg-stone-100'}
                    `}>

                    <div
                  className={`
                      h-10 w-10 rounded-lg flex items-center justify-center
                      ${activeChannel === channel.id ? 'bg-teal-500 text-white' : 'bg-stone-200 text-stone-500'}
                    `}>

                      <Hash className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-semibold block">
                        {channel.name}
                      </span>
                      <span className="text-xs text-stone-500">
                        {channel.description}
                      </span>
                    </div>
                    {activeChannel === channel.id &&
                <div className="ml-auto w-2 h-2 rounded-full bg-teal-500" />
                }
                  </button>
              )}
              </div>
            </div>

            {/* Your Alias */}
            <div className="absolute bottom-20 left-4 right-4">
              <div className="bg-stone-100 rounded-xl p-4">
                <p className="text-xs font-medium text-stone-500 mb-1">
                  Tu alias en el chat:
                </p>
                <p className="text-lg font-bold text-teal-600">Vecino_47</p>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-stone-50 max-w-4xl">
        {/* Header */}
        <div className="bg-white border-b border-stone-200 px-4 py-3 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowChannelList(true)}
              className="lg:hidden p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">

              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-bold text-stone-900 flex items-center gap-2">
                <Hash className="h-4 w-4 text-stone-400" />
                {activeChannel}
              </h1>
              <p className="text-xs text-stone-500 flex items-center gap-1 lg:hidden">
                <Shield className="h-3 w-3" /> Identidad protegida
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
              <Users className="h-3 w-3" />
              <span>24 en línea</span>
            </div>
            <button className="text-stone-400 hover:text-stone-600 p-2 hover:bg-stone-100 rounded-lg transition-colors">
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="text-center py-4">
            <span className="bg-stone-200 text-stone-600 text-xs px-3 py-1 rounded-full">
              Hoy
            </span>
          </div>

          {messages.map((msg) =>
          <ChatMessage key={msg.id} message={msg} />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSend} />
      </div>

      {/* Right Sidebar - Desktop Only (Optional info panel) */}
      <div className="hidden xl:block w-72 bg-white border-l border-stone-200 p-4">
        <h3 className="font-semibold text-stone-900 mb-4">
          Información del Canal
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase mb-1">
              Descripción
            </p>
            <p className="text-sm text-stone-600">
              Conversación general de la comunidad. Pregunta lo que necesites.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase mb-1">
              Miembros activos
            </p>
            <p className="text-sm text-stone-600">24 vecinos en línea</p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase mb-1">
              Retención de mensajes
            </p>
            <p className="text-sm text-stone-600">
              Los mensajes se mantienen por 90 días
            </p>
          </div>
        </div>
      </div>
    </div>);

}