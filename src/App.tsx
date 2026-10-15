import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Zap, LayoutDashboard, Briefcase, FileText, MessageCircle, User, Building2, Settings, LogOut, Moon, Sun, Menu, X, Plus, Search, Calendar, MapPin, Download, AlertTriangle, Shield, Award, BookOpen, TrendingUp, Save, Trash2, Edit3, GripVertical, Upload, ChevronDown, Send, Eye, BarChart3, Users, CreditCard, Clock, Target } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'applications' | 'tailor' | 'interview' | 'profile' | 'career-center' | 'settings';
type AppStatus = 'SAVED' | 'APPLIED' | 'ONLINE_ASSESSMENT' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  status: AppStatus;
  match: number;
  source: string;
  appliedAt?: string;
  deadline?: string;
  notes: string;
}

const initialApps: Application[] = [
  { id: '1', company: 'Google', role: 'Software Engineer Intern', location: 'Mountain View, CA', status: 'INTERVIEW', match: 87, source: 'LinkedIn', appliedAt: '2024-11-15', deadline: '2025-02-15', notes: 'Referred by John' },
  { id: '2', company: 'Meta', role: 'Frontend Developer', location: 'Menlo Park, CA', status: 'APPLIED', match: 75, source: 'Handshake', appliedAt: '2024-12-01', notes: '' },
  { id: '3', company: 'Stripe', role: 'Full-Stack Engineer', location: 'San Francisco, CA', status: 'OFFER', match: 92, source: 'Referral', appliedAt: '2024-10-20', notes: '$150K' },
  { id: '4', company: 'Airbnb', role: 'SWE - New Grad', location: 'San Francisco, CA', status: 'ONLINE_ASSESSMENT', match: 68, source: 'Company Website', appliedAt: '2024-12-10', notes: '' },
  { id: '5', company: 'Netflix', role: 'Platform Engineer', location: 'Remote', status: 'SAVED', match: 61, source: 'Indeed', notes: '' },
  { id: '6', company: 'Shopify', role: 'Developer Experience Intern', location: 'Remote', status: 'APPLIED', match: 79, source: 'Career Fair', appliedAt: '2024-11-28', notes: '' },
  { id: '7', company: 'Datadog', role: 'Infrastructure Engineer', location: 'New York, NY', status: 'REJECTED', match: 55, source: 'LinkedIn', appliedAt: '2024-10-05', notes: '' },
  { id: '8', company: 'Figma', role: 'Product Engineer', location: 'San Francisco, CA', status: 'INTERVIEW', match: 83, source: 'Referral', appliedAt: '2024-11-20', notes: '' },
];

const statusLabels: Record<AppStatus, string> = { SAVED: 'Saved', APPLIED: 'Applied', ONLINE_ASSESSMENT: 'Assessment', INTERVIEW: 'Interview', OFFER: 'Offer', REJECTED: 'Rejected' };
const statusColors: Record<AppStatus, string> = { SAVED: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', APPLIED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', ONLINE_ASSESSMENT: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', INTERVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', OFFER: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [applications, setApplications] = useState<Application[]>(initialApps);

  if (!isLoggedIn) {
    return <LandingPage darkMode={darkMode} setDarkMode={setDarkMode} onLogin={() => { setIsLoggedIn(true); setCurrentPage('dashboard'); }} />;
  }

  const pages: { id: Page; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'tailor', label: 'Resume Tailor', icon: FileText },
    { id: 'interview', label: 'Interview Prep', icon: MessageCircle },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'career-center', label: 'Career Center', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-[72px]'} fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden flex flex-col`}>
          <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {sidebarOpen && <span className="font-bold text-lg">ApplyTrack</span>}
            </div>
          </div>
          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            {pages.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
            {sidebarOpen && <div className="px-2 py-1"><p className="text-sm font-medium truncate">Alex Chen</p><p className="text-xs text-slate-500 truncate">alex@university.edu</p></div>}
            <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>
            <button onClick={() => { setIsLoggedIn(false); setCurrentPage('landing'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-[72px]'}`}>
          <header className="h-16 sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex-1" />
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Free Plan</span>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Upgrade to Pro</button>
          </header>

          <main className="p-4 md:p-6 lg:p-8 animate-fade-in">
            {currentPage === 'dashboard' && <DashboardPage apps={applications} setPage={setCurrentPage} />}
            {currentPage === 'applications' && <ApplicationsPage apps={applications} setApps={setApplications} />}
            {currentPage === 'tailor' && <TailorPage />}
            {currentPage === 'interview' && <InterviewPage />}
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'career-center' && <CareerCenterPage />}
            {currentPage === 'settings' && <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function LandingPage({ darkMode, setDarkMode, onLogin }: { darkMode: boolean; setDarkMode: (v: boolean) => void; onLogin: () => void }) {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="font-bold text-xl">ApplyTrack</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#features" className="hover:text-slate-900 dark:hover:text-white">Features</a>
              <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white">How It Works</a>
              <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white">Pricing</a>
              <a href="#universities" className="hover:text-slate-900 dark:hover:text-white">For Universities</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
              <button onClick={onLogin} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Sign In</button>
              <button onClick={onLogin} className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Get Started Free</button>
            </div>
          </div>
        </nav>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" /> AI-powered resume tailoring in under 60 seconds
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Land your dream job with a <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">tailored resume</span> for every application
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Paste a job posting, get an ATS-friendly resume that highlights your real experience. Track every application from save to offer. Prepare for interviews with AI feedback.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={onLogin} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2">
                  Start Free — No Credit Card <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-900">Watch 60-Second Demo</button>
              </div>
              <p className="mt-4 text-sm text-slate-500">Free for students • No credit card required • 3 tailored resumes/month</p>
            </div>

            <div className="mt-16 relative">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-slate-400">ApplyTrack — Resume Tailor</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Job: Software Engineer at Stripe</span>
                      <span className="text-sm font-bold text-green-600">87% Match</span>
                    </div>
                    <div className="space-y-2">
                      {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(s => (
                        <div key={s} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /><span className="text-sm text-slate-700 dark:text-slate-300">{s}</span></div>
                      ))}
                      {['Kubernetes', 'Go'].map(s => (
                        <div key={s} className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-amber-500" /><span className="text-sm text-slate-500">{s}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">AI Changes (3 suggested)</p>
                    <div className="space-y-2">
                      <div className="text-xs p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">✓ Reordered: Moved React experience to top</div>
                      <div className="text-xs p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">✓ Reworded: "Built REST APIs" → "Designed RESTful APIs"</div>
                      <div className="text-xs p-2 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">○ Gap: Kubernetes — build a small project</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to land the job</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">From resume to offer, ApplyTrack has you covered.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: 'AI Resume Tailoring', desc: 'Paste a job posting, get a tailored resume in 60 seconds. Every change is explained and verified against your real experience.' },
                { icon: TrendingUp, title: 'Match Score & Gaps', desc: 'Know exactly how well you match before applying. See what skills you have and what\'s missing.' },
                { icon: BarChart3, title: 'Application Tracker', desc: 'Kanban board and table view to track every application. Never miss a deadline or forget to follow up.' },
                { icon: MessageCircle, title: 'Interview Prep', desc: 'Get role-specific questions, practice with AI coaching, and build your story bank for behavioral interviews.' },
                { icon: Shield, title: 'Privacy First', desc: 'AI only uses your real experience. We never fabricate skills or metrics. Your data stays yours.' },
                { icon: Users, title: 'Career Center Dashboard', desc: 'For universities: see cohort progress, identify students who need help, and track outcomes.' },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">Simple, student-friendly pricing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Free', price: '$0', period: 'forever', features: ['15 applications tracked', '3 tailored resumes/month', '1 interview session/month', 'Kanban + table view', 'PDF export'], highlight: false },
                { name: 'Pro', price: '$9', period: '/month', features: ['Unlimited applications', 'Unlimited tailored resumes', 'Unlimited interview prep', 'Story bank', 'Priority support'], highlight: true },
                { name: 'University', price: 'Custom', period: 'per year', features: ['Everything in Pro', 'Career center dashboard', 'Cohort analytics', 'Bulk invitations', 'SSO integration'], highlight: false },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl p-8 ${plan.highlight ? 'bg-blue-600 text-white ring-4 ring-blue-600/20 scale-105' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-bold">{plan.price}</span><span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.period}</span></div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm"><CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-green-500'}`} />{f}</li>)}
                  </ul>
                  <button onClick={onLogin} className={`mt-8 w-full py-2.5 rounded-lg font-medium text-sm ${plan.highlight ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Get Started</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div><span className="font-semibold">ApplyTrack</span></div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white">Contact</a>
            </div>
            <p className="text-sm text-slate-500">© 2025 ApplyTrack</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DashboardPage({ apps, setPage }: { apps: Application[]; setPage: (p: Page) => void }) {
  const statusCounts = apps.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {} as Record<string, number>);
  const avgMatch = Math.round(apps.reduce((s, a) => s + a.match, 0) / apps.length);
  const active = (statusCounts.APPLIED || 0) + (statusCounts.ONLINE_ASSESSMENT || 0) + (statusCounts.INTERVIEW || 0);
  const upcoming = apps.filter(a => a.deadline && !['REJECTED', 'WITHDRAWN', 'OFFER'].includes(a.status)).sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold">Welcome back, Alex 👋</h1><p className="text-slate-600 dark:text-slate-400 mt-1">Here's your job search overview.</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: apps.length, icon: Briefcase, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Active Pipeline', value: active, icon: TrendingUp, bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600' },
          { label: 'Interviews', value: statusCounts.INTERVIEW || 0, icon: MessageCircle, bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600' },
          { label: 'Avg Match Score', value: `${avgMatch}%`, icon: FileText, bg: 'bg-violet-50 dark:bg-violet-900/20', color: 'text-violet-600 dark:text-violet-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}><Icon className={`w-5 h-5 ${stat.color}`} /></div>
              <p className="mt-3 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
            <p className="text-sm font-medium">{statusCounts.SAVED || 0} saved jobs waiting to be applied to</p>
          </div>
          <button onClick={() => setPage('applications')} className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">Go <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-semibold mb-4">Pipeline Overview</h2>
          <div className="space-y-3">
            {(['SAVED', 'APPLIED', 'ONLINE_ASSESSMENT', 'INTERVIEW', 'OFFER', 'REJECTED'] as AppStatus[]).map(status => {
              const count = statusCounts[status] || 0;
              const pct = apps.length > 0 ? (count / apps.length) * 100 : 0;
              const barColor = status === 'OFFER' ? 'bg-green-500' : status === 'REJECTED' ? 'bg-red-400' : status === 'INTERVIEW' ? 'bg-amber-500' : status === 'APPLIED' ? 'bg-blue-500' : 'bg-blue-500';
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400 w-28 shrink-0">{statusLabels[status]}</span>
                  <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }} />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> Upcoming Deadlines</h2>
          {upcoming.length === 0 ? <p className="text-sm text-slate-500">No upcoming deadlines. Nice work!</p> : (
            <div className="space-y-3">
              {upcoming.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <div><p className="text-sm font-medium">{app.role}</p><p className="text-xs text-slate-500">{app.company}</p></div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{new Date(app.deadline!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Activity</h2>
          <button onClick={() => setPage('applications')} className="text-sm text-blue-600 dark:text-blue-400 font-medium">View all →</button>
        </div>
        <div className="space-y-2">
          {apps.slice(0, 5).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">{app.company.charAt(0)}</div>
                <div><p className="text-sm font-medium">{app.role}</p><p className="text-xs text-slate-500">{app.company} • {app.location}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{app.match}% match</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[app.status]}`}>{statusLabels[app.status]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Free Plan Usage</h2>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Upgrade to Pro</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ label: 'Applications', used: apps.length, limit: 15 }, { label: 'Tailored Resumes', used: 2, limit: 3 }, { label: 'Interview Sessions', used: 1, limit: 1 }].map((u, i) => {
            const pct = (u.used / u.limit) * 100;
            return (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{u.label}</span><span className={`font-medium ${pct >= 80 ? 'text-amber-600' : ''}`}>{u.used}/{u.limit}</span></div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${pct >= 80 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ApplicationsPage({ apps, setApps }: { apps: Application[]; setApps: (a: Application[]) => void }) {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = apps.filter(a => search === '' || a.company.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()));
  const columns: AppStatus[] = ['SAVED', 'APPLIED', 'ONLINE_ASSESSMENT', 'INTERVIEW', 'OFFER', 'REJECTED'];
  const colColors: Record<AppStatus, string> = { SAVED: 'border-slate-300 dark:border-slate-600', APPLIED: 'border-blue-400', ONLINE_ASSESSMENT: 'border-purple-400', INTERVIEW: 'border-amber-400', OFFER: 'border-green-400', REJECTED: 'border-red-400' };

  function updateStatus(id: string, status: AppStatus) {
    setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status });
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold">Applications</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{apps.length} total applications</p></div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Job</button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by company or title..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button onClick={() => setView('kanban')} className={`px-3 py-1.5 rounded text-sm ${view === 'kanban' ? 'bg-white dark:bg-slate-700 shadow-sm font-medium' : 'text-slate-600 dark:text-slate-400'}`}>Kanban</button>
          <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded text-sm ${view === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm font-medium' : 'text-slate-600 dark:text-slate-400'}`}>Table</button>
        </div>
      </div>

      {view === 'kanban' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {columns.map(col => {
            const colApps = filtered.filter(a => a.status === col);
            return (
              <div key={col} className="space-y-2">
                <div className={`flex items-center justify-between px-2 py-1.5 rounded-t-lg border-t-2 ${colColors[col]} bg-slate-50 dark:bg-slate-800/50`}>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{statusLabels[col]}</span>
                  <span className="text-xs text-slate-500 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{colApps.length}</span>
                </div>
                <div className="space-y-2 min-h-[200px] p-2 rounded-lg">
                  {colApps.map(app => (
                    <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-shadow">
                      <p className="text-sm font-medium truncate">{app.role}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{app.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-400 truncate">{app.location}</span>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${app.match >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : app.match >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>{app.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === 'table' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Match</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-400">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filtered.map(app => (
                  <tr key={app.id} onClick={() => setSelectedApp(app)} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">{app.company.charAt(0)}</div><span className="font-medium">{app.company}</span></div></td>
                    <td className="px-4 py-3">{app.role}</td>
                    <td className="px-4 py-3 text-slate-500">{app.location}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[app.status]}`}>{statusLabels[app.status]}</span></td>
                    <td className="px-4 py-3"><span className={`font-medium ${app.match >= 75 ? 'text-green-600' : app.match >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{app.match}%</span></td>
                    <td className="px-4 py-3 text-slate-500">{app.deadline ? new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedApp(null)} />
          <div className="ml-auto w-full max-w-lg bg-white dark:bg-slate-900 h-full overflow-y-auto shadow-xl animate-slide-in">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedApp.role}</h2>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1"><Building2 className="w-4 h-4" /> {selectedApp.company} <span className="text-slate-400">•</span> <MapPin className="w-4 h-4" /> {selectedApp.location}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select value={selectedApp.status} onChange={e => updateStatus(selectedApp.id, e.target.value as AppStatus)} className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                  {columns.map(c => <option key={c} value={c}>{statusLabels[c]}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-500">Source</p><p className="text-sm font-medium">{selectedApp.source}</p></div>
                <div><p className="text-xs text-slate-500">Match Score</p><p className="text-sm font-medium">{selectedApp.match}%</p></div>
                <div><p className="text-xs text-slate-500">Applied</p><p className="text-sm font-medium">{selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleDateString() : 'Not yet'}</p></div>
                <div><p className="text-xs text-slate-500">Deadline</p><p className="text-sm font-medium">{selectedApp.deadline ? new Date(selectedApp.deadline).toLocaleDateString() : 'None'}</p></div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea value={selectedApp.notes} onChange={e => { const updated = { ...selectedApp, notes: e.target.value }; setSelectedApp(updated); setApps(apps.map(a => a.id === updated.id ? updated : a)); }} className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm min-h-[80px] resize-y" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">Add New Application</h2>
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm min-h-[100px]" placeholder="Paste a job posting URL or text..." />
            <div className="grid grid-cols-2 gap-3">
              <input className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" placeholder="Company" />
              <input className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm" placeholder="Role" />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TailorPage() {
  const [jobText, setJobText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleAnalyze() {
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); setShowResults(true); }, 1500);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold">Resume Tailor</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Paste a job posting to get AI-powered resume suggestions — all verified against your real experience.</p></div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <label className="text-sm font-medium block mb-2">Paste job posting</label>
        <textarea value={jobText} onChange={e => setJobText(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm min-h-[120px] resize-y" placeholder="Paste the full job posting text here..." />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-slate-500"><Shield className="w-3.5 h-3.5" /><span>AI only uses your profile data. Nothing is fabricated.</span></div>
          <button onClick={handleAnalyze} disabled={isAnalyzing} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {isAnalyzing ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Analyze & Tailor</>}
          </button>
        </div>
      </div>

      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4"><h2 className="font-semibold">Match Score</h2><span className="text-2xl font-bold text-green-600">82%</span></div>
              <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3"><div className="h-full rounded-full bg-green-500" style={{ width: '82%' }} /></div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Strong match on core requirements. Your React, TypeScript, and Node.js experience aligns well.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Matched (6)</h2>
              <div className="space-y-2.5">
                {['React/TypeScript', 'Node.js/Express', 'SQL/PostgreSQL', 'Git/version control', 'RESTful APIs', 'Team collaboration'].map((r, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">{r}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Gaps (2)</h2>
              <div className="space-y-2.5">
                {['Kubernetes experience', 'Go programming'].map((g, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{g}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">💡 Build a small project to demonstrate</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4"><h2 className="font-semibold">Suggested Changes</h2><span className="text-sm text-slate-500">4/5 accepted</span></div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> AI suggestions use only your own profile. Review each change.</p>
              </div>
              <div className="space-y-3">
                {[
                  { before: 'Developed a React dashboard that reduced page load time by 40%', after: 'Engineered a high-performance React dashboard using TypeScript, reducing page load time by 40%', reason: 'Added TypeScript keyword', accepted: true },
                  { before: 'Implemented RESTful APIs using Node.js', after: 'Designed and implemented scalable RESTful APIs using Node.js, handling 10K+ daily requests', reason: 'Mirrors "scalable" language from posting', accepted: true },
                  { before: 'Built responsive UI components', after: 'Built accessible, responsive UI components following WCAG 2.1 AA guidelines', reason: 'Job emphasizes accessibility', accepted: true },
                  { before: 'Improved accessibility score from 65 to 95', after: 'Led accessibility initiative improving WCAG compliance score from 65 to 95', reason: 'Stronger impact framing', accepted: false },
                ].map((c, i) => (
                  <div key={i} className={`rounded-lg border p-4 ${c.accepted ? 'border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/5' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-2"><span className="text-xs font-medium text-slate-400 shrink-0 w-12 mt-0.5">Before</span><p className="text-sm text-slate-600 dark:text-slate-400 line-through">{c.before}</p></div>
                        <div className="flex items-start gap-2"><span className="text-xs font-medium text-green-600 shrink-0 w-12 mt-0.5">After</span><p className="text-sm font-medium">{c.after}</p></div>
                        <p className="text-xs text-slate-500 italic pl-14">💡 {c.reason}</p>
                      </div>
                      <div className={`shrink-0 p-1.5 rounded-lg ${c.accepted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                        {c.accepted ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="text-sm text-slate-600 dark:text-slate-400"><span className="font-medium">4</span> changes accepted • Ready to export</div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><FileText className="w-4 h-4" /> DOCX</button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"><Download className="w-4 h-4" /> Export PDF</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InterviewPage() {
  const [activeTab, setActiveTab] = useState<'questions' | 'stories'>('questions');
  const [selectedQ, setSelectedQ] = useState(0);
  const [answer, setAnswer] = useState('During my internship at TechCorp, our dashboard started showing stale data. I reproduced the issue, traced it to a caching layer, added invalidation headers, and wrote a regression test. The fix reduced support tickets by 60%.');
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    { text: 'Tell me about a time you had to debug a complex issue.', category: 'behavioral', why: 'Tests problem-solving under pressure.' },
    { text: 'How would you design a URL shortener service?', category: 'technical', why: 'Evaluates system design thinking.' },
    { text: 'Why do you want to work at this company?', category: 'why-company', why: 'Assesses genuine interest.' },
    { text: 'Describe a situation with a difficult team member.', category: 'behavioral', why: 'Tests interpersonal skills.' },
    { text: 'REST vs GraphQL — when would you choose each?', category: 'technical', why: 'Tests API design knowledge.' },
  ];

  const catColors: Record<string, string> = { behavioral: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', technical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 'why-company': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold">Interview Prep</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Practice with AI coaching. Build your story bank.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('questions')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'questions' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>Questions</button>
          <button onClick={() => setActiveTab('stories')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'stories' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>Story Bank</button>
        </div>
      </div>

      {activeTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">5 Questions for this role</p>
            {questions.map((q, i) => (
              <button key={i} onClick={() => { setSelectedQ(i); setShowFeedback(false); }} className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedQ === i ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <div className="flex items-center gap-2 mb-1"><span className="text-xs font-medium text-slate-400">Q{i + 1}</span><span className={`text-xs px-1.5 py-0.5 rounded-full ${catColors[q.category]}`}>{q.category}</span></div>
                <p className="text-sm line-clamp-2">{q.text}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
            <div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${catColors[questions[selectedQ].category]}`}>{questions[selectedQ].category}</span>
              <h3 className="text-lg font-semibold mt-2">{questions[selectedQ].text}</h3>
              <p className="text-sm text-slate-500 mt-1">💡 {questions[selectedQ].why}</p>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Your Answer</label>
              <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm min-h-[150px] resize-y" placeholder="Write using STAR format..." />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">{answer.split(/\s+/).filter(Boolean).length} words</span>
                <button onClick={() => setShowFeedback(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"><Zap className="w-3.5 h-3.5" /> Get AI Feedback</button>
              </div>
            </div>
            {showFeedback && (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <h4 className="font-medium flex items-center gap-2"><Award className="w-4 h-4 text-blue-500" /> AI Feedback</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[{ l: 'Relevance', s: 4 }, { l: 'Structure', s: 5 }, { l: 'Specificity', s: 4 }, { l: 'Impact', s: 4 }, { l: 'Concision', s: 3 }].map((sc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-20">{sc.l}</span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><div className={`h-full rounded-full ${sc.s >= 4 ? 'bg-green-500' : sc.s >= 3 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${(sc.s / 5) * 100}%` }} /></div>
                      <span className="text-xs font-medium w-6">{sc.s}/5</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50">
                  <p className="text-sm text-blue-800 dark:text-blue-300">Great use of STAR format. Consider being more specific about the technical details. Your impact metric (60% reduction) is excellent.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'stories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">2 stories saved • Reuse them across interviews</p>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Story</button>
          </div>
          {[
            { title: 'Debugging Production Cache Issue', tags: ['debugging', 'production'], s: 'Internship at TechCorp, dashboard showing stale data', t: 'Identify and fix root cause', a: 'Reproduced locally, traced to caching layer, added invalidation headers', r: 'Fixed issue, reduced support tickets by 60%' },
            { title: 'Improving Accessibility Score', tags: ['accessibility', 'frontend'], s: 'Part-time role at StartupXYZ, accessibility audit score of 65', t: 'Improve WCAG compliance', a: 'Audited components, added ARIA labels, fixed color contrast', r: 'Score improved from 65 to 95' },
          ].map((story, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{story.title}</h3>
                <div className="flex items-center gap-1.5">{story.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{t}</span>)}</div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/10"><p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-0.5">Situation</p><p className="text-sm">{story.s}</p></div>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/10"><p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5">Task</p><p className="text-sm">{story.t}</p></div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/10"><p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-0.5">Action</p><p className="text-sm">{story.a}</p></div>
                <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-900/10"><p className="text-xs font-medium text-green-600 dark:text-green-400 mb-0.5">Result</p><p className="text-sm">{story.r}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div><h1 className="text-2xl font-bold">My Profile</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Your master profile is the source of truth for all tailored resumes.</p></div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><Upload className="w-4 h-4" /> Import Resume</button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-xs font-medium text-slate-500">Headline</label><input defaultValue="Computer Science Senior | Full-Stack Developer" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" /></div>
          <div><label className="text-xs font-medium text-slate-500">Graduation Date</label><input type="date" defaultValue="2025-05-15" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" /></div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500">Target Roles</label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {['Software Engineer', 'Frontend Developer', 'Full-Stack Developer'].map(r => <span key={r} className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">{r}</span>)}
            <button className="text-xs px-2 py-1 rounded-full border border-dashed border-slate-300 dark:border-slate-600 text-slate-500">+ Add</button>
          </div>
        </div>
        <div><label className="text-xs font-medium text-slate-500">Summary</label><textarea defaultValue="Senior CS student with experience in React, TypeScript, and Node.js..." className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm min-h-[80px] resize-y" /></div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4"><h2 className="font-semibold flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500" /> Experience</h2><button className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button></div>
        <div className="space-y-3">
          {[
            { title: 'Software Engineering Intern', company: 'TechCorp Inc.', dates: 'Jun 2024 — Sep 2024', bullets: ['Developed a React dashboard that reduced page load time by 40%', 'Implemented RESTful APIs using Node.js and Express'] },
            { title: 'Frontend Developer (Part-time)', company: 'StartupXYZ', dates: 'Sep 2023 — May 2024', bullets: ['Built responsive UI components using React and TypeScript', 'Improved accessibility score from 65 to 95'] },
          ].map((exp, i) => (
            <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">{exp.title} at {exp.company}</p>
                  <p className="text-xs text-slate-500">{exp.dates}</p>
                  <ul className="mt-2 space-y-1">{exp.bullets.map((b, j) => <li key={j} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"><span className="text-slate-400 mt-1">•</span> {b}</li>)}</ul>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700"><Edit3 className="w-3.5 h-3.5 text-slate-500" /></button>
                  <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-3.5 h-3.5 text-slate-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="font-semibold flex items-center gap-2 mb-4"><Target className="w-4 h-4 text-blue-500" /> Skills</h2>
        <div className="space-y-3">
          <div><p className="text-xs font-medium text-slate-500 mb-1">Languages</p><div className="flex flex-wrap gap-1.5">{['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'].map(s => <span key={s} className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">{s}</span>)}</div></div>
          <div><p className="text-xs font-medium text-slate-500 mb-1">Frameworks & Tools</p><div className="flex flex-wrap gap-1.5">{['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map(s => <span key={s} className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">{s}</span>)}</div></div>
        </div>
      </div>
    </div>
  );
}

function CareerCenterPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><div className="flex items-center gap-2"><h1 className="text-2xl font-bold">Career Center</h1><span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">Stanford University</span></div><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">127 students • 500 seats</p></div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><Send className="w-4 h-4" /> Send Nudge</button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-lg p-3 flex items-start gap-2">
        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-300"><strong>Privacy:</strong> Individual data only visible with consent. Aggregates suppress groups &lt; 5. All access logged.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: 'Active Students', v: '127', c: 'text-blue-600' }, { l: 'Total Applications', v: '847', c: 'text-green-600' }, { l: 'Interview Rate', v: '27%', c: 'text-amber-600' }, { l: 'Offer Rate', v: '9%', c: 'text-violet-600' }].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <p className="text-sm text-slate-500">{s.l}</p>
            <p className={`text-2xl font-bold mt-1 ${s.c}`}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold mb-4">Cohort Funnel</h3>
        <div className="space-y-3">
          {[{ s: 'Registered', c: 127, p: 100 }, { s: 'Profile Complete', c: 98, p: 77 }, { s: 'First Application', c: 85, p: 67 }, { s: 'Interview', c: 34, p: 27 }, { s: 'Offer', c: 12, p: 9 }].map(f => (
            <div key={f.s} className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 w-32 shrink-0">{f.s}</span>
              <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"><div className="h-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center px-3" style={{ width: `${f.p}%` }}>{f.p > 15 && <span className="text-xs font-medium text-white">{f.c}</span>}</div></div>
              <span className="text-xs text-slate-500 w-10 text-right">{f.p}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="font-semibold mb-4">Top Target Employers</h3>
          <div className="space-y-2.5">
            {[{ n: 'Google', c: 18 }, { n: 'Meta', c: 15 }, { n: 'Stripe', c: 12 }, { n: 'Airbnb', c: 9 }, { n: 'Netflix', c: 7 }].map((e, i) => (
              <div key={e.n} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xs font-medium text-slate-400 w-4">{i + 1}</span><span className="text-sm">{e.n}</span></div><span className="text-sm font-medium">{e.c}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Needs Help</h3>
          <div className="space-y-2.5">
            {[{ n: 'Jamie Rodriguez', s: 'No activity for 18 days' }, { n: 'Priya Sharma', s: '15+ apps, no interviews' }, { n: 'Marcus Johnson', s: 'No activity for 21 days' }].map(st => (
              <div key={st.n} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <div><p className="text-sm font-medium">{st.n}</p><p className="text-xs text-slate-500">{st.s}</p></div>
                <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"><Eye className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  const [section, setSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Manage your account.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          {[{ id: 'profile', l: 'Profile', i: User }, { id: 'notifications', l: 'Notifications', i: MessageCircle }, { id: 'billing', l: 'Billing', i: CreditCard }, { id: 'privacy', l: 'Privacy', i: Shield }, { id: 'data', l: 'Data & Export', i: Download }, { id: 'danger', l: 'Danger Zone', i: Trash2 }].map(s => {
            const Icon = s.i;
            return <button key={s.id} onClick={() => setSection(s.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${section === s.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Icon className="w-4 h-4" />{s.l}</button>;
          })}
        </div>
        <div className="md:col-span-3">
          {section === 'profile' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h2 className="font-semibold">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">Full Name</label><input defaultValue="Alex Chen" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" /></div>
                <div><label className="text-sm font-medium">Email</label><input defaultValue="alex@university.edu" className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" /></div>
              </div>
              <div>
                <label className="text-sm font-medium">Appearance</label>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => setDarkMode(false)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${!darkMode ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-600'}`}><Sun className="w-4 h-4" /> Light</button>
                  <button onClick={() => setDarkMode(true)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${darkMode ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-600'}`}><Moon className="w-4 h-4" /> Dark</button>
                </div>
              </div>
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">{saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}</button>
            </div>
          )}
          {section === 'billing' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h2 className="font-semibold">Billing & Plan</h2>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between"><div><p className="font-medium">Free Plan</p><p className="text-sm text-slate-500">$0/month • 15 applications</p></div><span className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-600 font-medium">Current</span></div>
              </div>
              <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-center justify-between"><div><p className="font-medium">Pro Plan</p><p className="text-sm text-slate-500">$9/month • Unlimited everything</p></div><button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Upgrade</button></div>
              </div>
            </div>
          )}
          {section === 'privacy' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h2 className="font-semibold">Privacy & Consent</h2>
              {[{ s: 'Share application status', d: 'Let career center see your statuses', on: true }, { s: 'Share resume', d: 'Allow staff to review your resumes', on: false }, { s: 'Share analytics', d: 'Include in aggregate reports', on: true }].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div><p className="text-sm font-medium">{c.s}</p><p className="text-xs text-slate-500">{c.d}</p></div>
                  <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked={c.on} className="sr-only peer" /><div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div></label>
                </div>
              ))}
            </div>
          )}
          {section === 'data' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h2 className="font-semibold">Data & Export</h2>
              {[{ l: 'Export All Data (JSON)', d: 'Complete export of your profile and applications' }, { l: 'Export Applications (CSV)', d: 'All applications with statuses and dates' }, { l: 'Export Resumes', d: 'Download all resume versions as PDF' }].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div><p className="text-sm font-medium">{item.l}</p><p className="text-xs text-slate-500">{item.d}</p></div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"><Download className="w-3.5 h-3.5" /> Export</button>
                </div>
              ))}
            </div>
          )}
          {section === 'danger' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800/50 p-6 space-y-4">
              <h2 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">Delete Account</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">This will permanently delete your account and all data. Cannot be undone.</p>
                <button className="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete My Account</button>
              </div>
            </div>
          )}
          {(section === 'notifications') && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h2 className="font-semibold">Notification Preferences</h2>
              {[{ l: 'Deadline reminders', d: '3 days and 1 day before deadlines', on: true }, { l: 'Follow-up reminders', d: 'If no status change after 7 days', on: true }, { l: 'Product updates', d: 'New features and improvements', on: true }].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div><p className="text-sm font-medium">{p.l}</p><p className="text-xs text-slate-500">{p.d}</p></div>
                  <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked={p.on} className="sr-only peer" /><div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div></label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
