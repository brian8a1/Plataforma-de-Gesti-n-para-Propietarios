import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';
// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { ProviderDetailPage } from './pages/ProviderDetailPage';
import { ChatPage } from './pages/ChatPage';
import { ForumPage } from './pages/ForumPage';
import { ForumTopicPage } from './pages/ForumTopicPage';
import { CreateTopicPage } from './pages/CreateTopicPage';
import { WikiPage } from './pages/WikiPage';
import { WikiArticlePage } from './pages/WikiArticlePage';
import { CreateWikiArticlePage } from './pages/CreateWikiArticlePage';
import { ResidentsPage } from './pages/ResidentsPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { TimelinePage } from './pages/TimelinePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
// Protected Route Component
function ProtectedRoute({
  children


}: {children: React.ReactNode;}) {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-500">Cargando...</p>
        </div>
      </div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
export function App() {
  return <AuthProvider>
      <Router>
        <AppShell>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>} />

            {/* Providers */}
            <Route path="/providers" element={<ProtectedRoute>
                  <ProvidersPage />
                </ProtectedRoute>} />
            <Route path="/providers/:id" element={<ProtectedRoute>
                  <ProviderDetailPage />
                </ProtectedRoute>} />

            {/* Chat */}
            <Route path="/chat" element={<ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>} />

            {/* Forum */}
            <Route path="/forum" element={<ProtectedRoute>
                  <ForumPage />
                </ProtectedRoute>} />
            <Route path="/forum/new" element={<ProtectedRoute>
                  <CreateTopicPage />
                </ProtectedRoute>} />
            <Route path="/forum/:id" element={<ProtectedRoute>
                  <ForumTopicPage />
                </ProtectedRoute>} />

            {/* Wiki */}
            <Route path="/wiki" element={<ProtectedRoute>
                  <WikiPage />
                </ProtectedRoute>} />
            <Route path="/wiki/new" element={<ProtectedRoute>
                  <CreateWikiArticlePage />
                </ProtectedRoute>} />
            <Route path="/wiki/:id" element={<ProtectedRoute>
                  <WikiArticlePage />
                </ProtectedRoute>} />

            {/* Residents */}
            <Route path="/residents" element={<ProtectedRoute>
                  <ResidentsPage />
                </ProtectedRoute>} />

            {/* Messages */}
            <Route path="/messages" element={<ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>} />

            {/* Notifications */}
            <Route path="/notifications" element={<ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>} />

            {/* Timeline */}
            <Route path="/timeline" element={<ProtectedRoute>
                  <TimelinePage />
                </ProtectedRoute>} />

            {/* Profile & Settings */}
            <Route path="/profile" element={<ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>} />
          </Routes>
        </AppShell>
      </Router>
    </AuthProvider>;
}