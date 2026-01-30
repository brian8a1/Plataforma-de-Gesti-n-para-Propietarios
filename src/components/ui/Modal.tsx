import React, { Fragment } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export function Modal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps) {
  return <AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className="bg-white rounded-xl shadow-xl w-full max-w-md pointer-events-auto flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-stone-900">
                  {title}
                </h3>
                <button onClick={onClose} className="text-stone-400 hover:text-stone-500 p-1 rounded-full hover:bg-stone-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
}