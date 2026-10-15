import React, { useState } from 'react';
import { useApp } from '../store';
import { User, Bell, CreditCard, Shield, Download, Trash2, Save, Check, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Consent', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Download },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Settings</h1>
        <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">Manage your account, preferences, and data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}
              >
                <Icon className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {activeSection === 'profile' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
              <h2 className="font-semibold text-surface-900 dark:text-white">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Full Name</label>
                  <input defaultValue={state.user?.name} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
                  <input defaultValue={state.user?.email} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Appearance</label>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => !state.darkMode && dispatch({ type: 'TOGGLE_DARK_MODE' })} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${!state.darkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-300 dark:border-surface-600'}`}>
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button onClick={() => state.darkMode && dispatch({ type: 'TOGGLE_DARK_MODE' })} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${state.darkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-300 dark:border-surface-600'}`}>
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                </div>
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
              <h2 className="font-semibold text-surface-900 dark:text-white">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: 'Deadline reminders', desc: 'Get notified 3 days and 1 day before application deadlines', default: true },
                  { label: 'Follow-up reminders', desc: 'Reminder if no status change after 7 days', default: true },
                  { label: 'Interview prep suggestions', desc: 'Weekly suggestions for interview practice', default: false },
                  { label: 'Product updates', desc: 'New features and improvements', default: true },
                  { label: 'Marketing emails', desc: 'Tips, job search advice, and offers', default: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{pref.label}</p>
                      <p className="text-xs text-surface-500">{pref.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                      <div className="w-9 h-5 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
              <h2 className="font-semibold text-surface-900 dark:text-white">Billing & Plan</h2>
              <div className="p-4 rounded-lg bg-surface-50 dark:bg-surface-700/50 border border-surface-200 dark:border-surface-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white">Free Plan</p>
                    <p className="text-sm text-surface-500">$0/month • 15 applications • 3 tailored resumes/month</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 font-medium">Current</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white">Pro Plan</p>
                    <p className="text-sm text-surface-500">$9/month • Unlimited everything • Priority support</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Upgrade</button>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Usage This Month</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-surface-600 dark:text-surface-400">Applications</span><span className="text-surface-900 dark:text-white font-medium">12 / 15</span></div>
                  <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full"><div className="h-full bg-primary-500 rounded-full" style={{ width: '80%' }} /></div>
                  <div className="flex justify-between text-sm"><span className="text-surface-600 dark:text-surface-400">Tailored Resumes</span><span className="text-surface-900 dark:text-white font-medium">2 / 3</span></div>
                  <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: '67%' }} /></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
              <h2 className="font-semibold text-surface-900 dark:text-white">Privacy & Consent</h2>
              <p className="text-sm text-surface-600 dark:text-surface-400">Control what data you share with your university's career center.</p>
              <div className="space-y-3">
                {[
                  { scope: 'Share application status', desc: 'Let career center staff see your application statuses', granted: true },
                  { scope: 'Share resume', desc: 'Allow staff to review your tailored resumes for feedback', granted: false },
                  { scope: 'Share analytics', desc: 'Include your data in aggregate reports (anonymized)', granted: true },
                ].map((consent, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{consent.scope}</p>
                      <p className="text-xs text-surface-500">{consent.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={consent.granted} className="sr-only peer" />
                      <div className="w-9 h-5 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
              <h2 className="font-semibold text-surface-900 dark:text-white">Data & Export</h2>
              <p className="text-sm text-surface-600 dark:text-surface-400">Download all your data or export specific sections.</p>
              <div className="space-y-3">
                {[
                  { label: 'Export All Data (JSON)', desc: 'Complete export of your profile, applications, stories, and settings' },
                  { label: 'Export Applications (CSV)', desc: 'All applications with statuses, dates, and notes' },
                  { label: 'Export Resumes', desc: 'Download all resume versions as PDF files' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-surface-500">{item.desc}</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-300 dark:border-surface-600 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
                      <Download className="w-3.5 h-3.5" /> Export
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'danger' && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-red-200 dark:border-red-800/50 p-6 space-y-4">
              <h2 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">Delete Account</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">This will permanently delete your account, all applications, resumes, and data. This cannot be undone.</p>
                <button className="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
