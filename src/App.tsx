import React from 'react';
import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Tailor from './pages/Tailor';
import Interview from './pages/Interview';
import ProfilePage from './pages/Profile';
import CareerCenter from './pages/CareerCenter';
import Settings from './pages/Settings';

function AppContent() {
  const { state } = useApp();

  // Apply dark mode class to document
  React.useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Landing page (no layout)
  if (!state.isAuthenticated) {
    return <Landing />;
  }

  // Authenticated pages (with layout)
  function renderPage() {
    switch (state.currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'applications': return <Applications />;
      case 'tailor': return <Tailor />;
      case 'interview': return <Interview />;
      case 'profile': return <ProfilePage />;
      case 'career-center': return <CareerCenter />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  }

  return <Layout>{renderPage()}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
