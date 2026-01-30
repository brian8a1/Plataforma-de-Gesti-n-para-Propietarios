import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Briefcase, FileText } from 'lucide-react';
export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) =>
  location.pathname === path || location.pathname.startsWith(path + '/');
  // Main 4 items for bottom nav (mobile) - removed "Más" button
  const navItems = [
  {
    path: '/dashboard',
    label: 'Inicio',
    icon: Home
  },
  {
    path: '/providers',
    label: 'Proveedores',
    icon: Briefcase
  },
  {
    path: '/chat',
    label: 'Chat',
    icon: MessageSquare
  },
  {
    path: '/forum',
    label: 'Foro',
    icon: FileText
  }];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors
                ${active ? 'text-teal-600' : 'text-stone-400 active:text-stone-600'}
              `}>

              <item.icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>);

        })}
      </div>
    </nav>);

}