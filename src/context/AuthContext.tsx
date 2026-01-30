import React, { useEffect, useState, createContext, useContext } from 'react';
import { User } from '../types';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: {
    email: string;
  }) => void;
  register: (data: any) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const mockUser: User = {
  id: '1',
  name: 'Carlos Rodríguez',
  email: 'carlos@email.com',
  role: 'verified',
  apartment: '301',
  tower: 'A',
  alias: 'Vecino_47',
  phone: '+57 300 123 4567'
};
export function AuthProvider({
  children


}: {children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = (credentials: {
    email: string;
  }) => {
    // In real app, would validate credentials with API
    const loggedInUser = {
      ...mockUser,
      email: credentials.email
    };
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };
  const register = (data: any) => {
    // Create user with pending status for KYC
    const newUser: User = {
      id: Math.random().toString(),
      name: data.name,
      email: data.email,
      role: 'pending',
      apartment: data.apartment,
      tower: data.tower,
      alias: `Vecino_${Math.floor(Math.random() * 100)}`,
      phone: data.phone
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user && user.role !== 'pending',
    isLoading,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}