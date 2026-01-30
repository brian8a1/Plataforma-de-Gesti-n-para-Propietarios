import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Users,
  MessageSquare,
  User,
  Briefcase,
  LogOut,
  Shield,
  BookOpen,
  FileText,
  Bell,
  Mail,
  Settings,
  ChevronUp } from
'lucide-react';
interface AppShellProps {
  children: React.ReactNode;
}
const mainNavItems = [
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
  label: 'Chat Anónimo',
  icon: MessageSquare
},
{
  path: '/forum',
  label: 'Foro',
  icon: FileText
},
{
  path: '/wiki',
  label: 'Wiki',
  icon: BookOpen
},
{
  path: '/residents',
  label: 'Vecinos',
  icon: Users
}];

const secondaryNavItems = [
{
  path: '/messages',
  label: 'Mensajes',
  icon: Mail
},
{
  path: '/notifications',
  label: 'Notificaciones',
  icon: Bell
}];

export function AppShell({ children }: AppShellProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node))
      {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const noNavRoutes = ['/', '/register', '/login'];
  const showNav =
  isAuthenticated &&
  user?.role !== 'pending' &&
  !noNavRoutes.includes(location.pathname);
  const isActive = (path: string) =>
  location.pathname === path || location.pathname.startsWith(path + '/');
  // Public pages (landing, register) - full width
  if (!showNav) {
    return <div className="min-h-screen bg-stone-50">{children}</div>;
  }
  // Authenticated pages with navigation
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-stone-200 z-40">
        {/* Logo/Brand */}
        <div className="p-5 border-b border-stone-100">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-stone-900">Santa Marina</h1>
              <p className="text-xs text-stone-500">Comunidad</p>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 py-2">
            Principal
          </p>
          {mainNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                  ${active ? 'bg-teal-50 text-teal-700 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}
                `}>

                <item.icon
                  className={`h-5 w-5 ${active ? 'text-teal-600' : ''}`} />

                <span>{item.label}</span>
              </Link>);

          })}

          <div className="pt-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 py-2">
              Personal
            </p>
            {secondaryNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                    ${active ? 'bg-teal-50 text-teal-700 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}
                  `}>

                  <item.icon
                    className={`h-5 w-5 ${active ? 'text-teal-600' : ''}`} />

                  <span>{item.label}</span>
                  {item.path === '/notifications' &&
                  <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      2
                    </span>
                  }
                  {item.path === '/messages' &&
                  <span className="ml-auto bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      1
                    </span>
                  }
                </Link>);

            })}
          </div>
        </nav>

        {/* Profile Menu - Bottom */}
        <div
          className="p-3 border-t border-stone-100 relative"
          ref={profileMenuRef}>

          {/* Dropdown Menu */}
          {isProfileMenuOpen &&
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50">
              <Link
              to="/profile"
              onClick={() => setIsProfileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">

                <User className="h-4 w-4" />
                <span>Mi Perfil</span>
              </Link>
              <Link
              to="/settings"
              onClick={() => setIsProfileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">

                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </Link>
              <div className="border-t border-stone-100 my-1" />
              <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">

                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          }

          {/* Profile Button */}
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors w-full text-sm">

            <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium text-stone-900 truncate text-sm">
                {user?.name}
              </p>
              <p className="text-xs text-stone-500">
                Torre {user?.tower} • Apto {user?.apartment}
              </p>
            </div>
            <ChevronUp
              className={`h-4 w-4 text-stone-400 transition-transform ${isProfileMenuOpen ? '' : 'rotate-180'}`} />

          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
      </div>

      {/* Mobile Bottom Nav - hidden on desktop */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>);

}