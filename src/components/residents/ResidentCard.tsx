import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Resident } from '../../types';
import { motion } from 'framer-motion';
interface ResidentCardProps {
  resident: Resident;
  onMessage: () => void;
}
export function ResidentCard({ resident, onMessage }: ResidentCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      className={`
        flex flex-col items-center p-3 rounded-xl border transition-all
        ${resident.hasRegisteredUser ? 'bg-white border-stone-200 hover:border-teal-300 hover:shadow-sm' : 'bg-stone-50 border-stone-100 opacity-70'}
      `}>

      {/* Avatar */}
      <div
        className={`
        h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold mb-2
        ${resident.hasRegisteredUser ? 'bg-teal-100 text-teal-700' : 'bg-stone-200 text-stone-400'}
      `}>

        {resident.hasRegisteredUser ? resident.apartment.slice(0, 2) : '?'}
      </div>

      {/* Info */}
      <span className="text-sm font-medium text-stone-900 mb-2">
        {resident.apartment}
      </span>

      {/* Action */}
      {
      resident.hasRegisteredUser ?
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMessage();
        }}
        className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
        title="Enviar mensaje">

            <MessageSquare className="h-4 w-4" />
          </button> :

      <div className="h-8 w-8" />
      /* Spacer to keep height consistent */
      }
    </motion.div>);

}