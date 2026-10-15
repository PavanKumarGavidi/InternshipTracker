import React from 'react';
import { useApp } from '../store';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, Target, Users, FileText, BarChart3, Moon, Sun, MessageCircle } from 'lucide-react';

export default function Landing() {
  const { state, dispatch } = useApp();

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-white">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">ApplyTrack</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-surface-600 dark:text-surface-400">
              <a href="#features" className="hover:text-surface-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-surface-900 dark:hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-surface-900 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#universities" className="hover:text-surface-900 dark:hover:text-white transition-colors">For Universities</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                {state.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => dispatch({ type: 'LOGIN' })} className="text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white">
                Sign In
              </button>
              <button onClick={() => dispatch({ type: 'LOGIN' })} className="text-sm font-medium px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                AI-powered resume tailoring in under 60 seconds
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Land your dream job with a{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  tailored resume
                </span>{' '}
                for every application
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                Paste a job posting, get an ATS-friendly resume that highlights your real experience. Track every application from save to offer. Prepare for interviews with AI coaching.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => dispatch({ type: 'LOGIN' })} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 flex items-center justify-center gap-2">
                  Start Free — No Credit Card <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-surface-300 dark:border-surface-700 font-semibold hover:bg-surface-50 dark:hover:bg-surface-900 transition-colors">
                  Watch 60-Second Demo
                </button>
              </div>
              <p className="mt-4 text-sm text-surface-500">Free for students • No credit card required • 3 tailored resumes/month</p>
            </div>

            {/* Hero visual */}
            <div className="mt-16 relative">
              <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl shadow-surface-900/10 dark:shadow-black/30 border border-surface-200 dark:border-surface-700 p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-surface-400">ApplyTrack — Resume Tailor</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Job: Software Engineer at Stripe</span>
                      <span className="text-sm font-bold text-success">87% Match</span>
                    </div>
                    <div className="space-y-2">
                      {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(skill => (
                        <div key={skill} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-sm text-surface-700 dark:text-surface-300">{skill}</span>
                        </div>
                      ))}
                      {['Kubernetes', 'Go'].map(skill => (
                        <div key={skill} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-warning" />
                          <span className="text-sm text-surface-500">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
                    <p className="text-xs font-medium text-surface-500 mb-2">AI Changes (3 suggested)</p>
                    <div className="space-y-2">
                      <div className="text-xs p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        ✓ Reordered: Moved React experience to top
                      </div>
                      <div className="text-xs p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        ✓ Reworded: "Built REST APIs" → "Designed and implemented RESTful APIs"
                      </div>
                      <div className="text-xs p-2 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        ○ Gap: Kubernetes — build a small project to demonstrate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-surface-50 dark:bg-surface-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to land the job</h2>
              <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">From resume to offer, ApplyTrack has you covered.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: 'AI Resume Tailoring', desc: 'Paste a job posting, get a tailored resume in 60 seconds. Every change is explained and verified against your real experience.' },
                { icon: Target, title: 'Match Score & Gaps', desc: 'Know exactly how well you match before applying. See what skills you have, what\'s missing, and how to bridge the gap honestly.' },
                { icon: BarChart3, title: 'Application Tracker', desc: 'Kanban board and table view to track every application. Never miss a deadline or forget to follow up again.' },
                { icon: MessageCircle, title: 'Interview Prep', desc: 'Get role-specific questions, practice with AI coaching, and build your story bank for behavioral interviews.' },
                { icon: Shield, title: 'Privacy First', desc: 'AI only uses your real experience. We never fabricate skills or metrics. Your data stays yours.' },
                { icon: Users, title: 'Career Center Dashboard', desc: 'For universities: see cohort progress, identify students who need help, and track outcomes — all with privacy controls.' },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
              <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">Three steps from job posting to tailored resume.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Upload your resume', desc: 'Import your existing resume or build your profile section by section. This becomes your master profile — the single source of truth.' },
                { step: '2', title: 'Paste a job posting', desc: 'Drop in a job URL or paste the text. We parse it into skills, requirements, and keywords automatically.' },
                { step: '3', title: 'Get your tailored resume', desc: 'Review AI-suggested changes, accept or reject each one, and export an ATS-friendly PDF or DOCX ready to submit.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-surface-50 dark:bg-surface-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">Simple, student-friendly pricing</h2>
              <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">Start free, upgrade when you're ready.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Free', price: '$0', period: 'forever', features: ['15 applications tracked', '3 tailored resumes/month', '1 interview session/month', 'Kanban + table view', 'PDF export'], cta: 'Get Started', highlight: false },
                { name: 'Pro', price: '$9', period: '/month', features: ['Unlimited applications', 'Unlimited tailored resumes', 'Unlimited interview prep', 'Story bank', 'Priority support', 'All export formats'], cta: 'Start Pro Trial', highlight: true },
                { name: 'University', price: 'Custom', period: 'per year', features: ['Everything in Pro', 'Career center dashboard', 'Cohort analytics', 'Bulk invitations', 'SSO integration', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl p-8 ${plan.highlight ? 'bg-primary-600 text-white ring-4 ring-primary-600/20 scale-105' : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700'}`}>
                  <h3 className={`font-semibold text-lg ${plan.highlight ? '' : ''}`}>{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? 'text-primary-200' : 'text-surface-500'}`}>{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-primary-200' : 'text-success'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => dispatch({ type: 'LOGIN' })} className={`mt-8 w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${plan.highlight ? 'bg-white text-primary-600 hover:bg-primary-50' : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'}`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Universities */}
        <section id="universities" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-8 md:p-16 text-white">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold">For Career Centers</h2>
                <p className="mt-4 text-lg text-primary-100">
                  Give every student the tools to land their dream job. Track cohort progress, identify students who need help, and measure outcomes — all while respecting student privacy.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Cohort funnel analytics', '"Needs help" early warning system', 'Privacy-first: student consent required', 'Bulk invitations and nudge emails', 'CSV reports and data export'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-primary-100">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 px-6 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-surface-200 dark:border-surface-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold">ApplyTrack</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-surface-500">
                <a href="#" className="hover:text-surface-900 dark:hover:text-white">Privacy</a>
                <a href="#" className="hover:text-surface-900 dark:hover:text-white">Terms</a>
                <a href="#" className="hover:text-surface-900 dark:hover:text-white">Cookies</a>
                <a href="#" className="hover:text-surface-900 dark:hover:text-white">Contact</a>
              </div>
              <p className="text-sm text-surface-500">© 2025 ApplyTrack. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
