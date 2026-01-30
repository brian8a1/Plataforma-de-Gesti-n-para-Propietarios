import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { Avatar } from '../ui/Avatar';
import { motion } from 'framer-motion';
interface ChatMessageProps {
  message: ChatMessageType;
}
export function ChatMessage({
  message
}: ChatMessageProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}>
      <Avatar fallback={message.alias} src={message.photoUrl} size="sm" className={`flex-shrink-0 ${message.isMe ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'}`} />

      <div className={`flex flex-col max-w-[75%] lg:max-w-[60%] ${message.isMe ? 'items-end' : 'items-start'}`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-medium text-stone-600">
            {message.alias}
          </span>
          <span className="text-[10px] text-stone-400">
            {message.timestamp}
          </span>
        </div>

        <div className={`
            px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed
            ${message.isMe ? 'bg-teal-600 text-white rounded-tr-sm' : 'bg-white text-stone-800 rounded-tl-sm border border-stone-100'}
          `}>
          {message.content}
        </div>
      </div>
    </motion.div>;
}