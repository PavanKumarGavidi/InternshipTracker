import React from 'react';
import { useApp } from '../store';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, User, Building2, Settings, LogOut, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'applications', label: 'Applications', icon: Briefcase },
  { id: 'tailor', label: 'Resume Tailor', icon: FileText },
  { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'career-center', label: 'Career Center', icon: Building2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useApp();

  return (
    <div className={`min-h-screen flex ${state.darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`${state.sidebarOpen ? 'w-[260px]' : 'w-0 md:w-[72px]'} fixed inset-y-0 left-0 z-40 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 transition-all duration-300 overflow-hidden flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-surface-200 dark:border-surface-700 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {state.sidebarOpen && <span className="font-bold text-lg text-surface-900 dark:text-white">ApplyTrack</span>}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = state.currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch({ type: 'SET_PAGE', page: item.id })}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {state.sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-surface-200 dark:border-surface-700 p-3 space-y-2">
          {state.sidebarOpen && state.user && (
            <div className="px-2 py-1">
              <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{state.user.name}</p>
              <p className="text-xs text-surface-500 truncate">{state.user.email}</p>
            </div>
          )}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            {state.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {state.sidebarOpen && <span>{state.darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button
            onClick={() => dispatch({ type: 'LOGOUT' })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <LogOut className="w-4 h-4" />
            {state.sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${state.sidebarOpen ? 'ml-[260px]' : 'ml-0 md:ml-[72px]'}`}>
        {/* Top bar */}
        <header className="h-16 sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 flex items-center px-4 gap-4">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
          >
            {state.sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              Free Plan
            </span>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
