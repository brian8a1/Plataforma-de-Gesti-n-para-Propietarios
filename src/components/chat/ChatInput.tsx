import React, { useState } from 'react';
import { Send, Image as ImageIcon, Smile } from 'lucide-react';
import { Button } from '../ui/Button';
interface ChatInputProps {
  onSend: (text: string) => void;
}
export function ChatInput({
  onSend
}: ChatInputProps) {
  const [text, setText] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };
  return <form onSubmit={handleSubmit} className="bg-white border-t border-stone-200 p-3 lg:p-4 flex items-center gap-2 lg:gap-3">
      <button type="button" className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors hidden sm:block">
        <ImageIcon className="h-5 w-5" />
      </button>

      <div className="flex-1 relative">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe un mensaje..." className="w-full bg-stone-100 border-0 rounded-full px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all pr-10" />
        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 hidden sm:block">
          <Smile className="h-5 w-5" />
        </button>
      </div>

      <Button type="submit" size="sm" disabled={!text.trim()} className="rounded-full w-10 h-10 lg:w-12 lg:h-12 p-0 flex items-center justify-center">
        <Send className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>
    </form>;
}