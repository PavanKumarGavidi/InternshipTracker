import React, { useState } from 'react';
import { useApp, mockOrg } from '../store';
import { Building2, Users, TrendingUp, AlertTriangle, BarChart3, Download, Send, Search, Filter, ChevronDown, Shield, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const funnelData = [
  { stage: 'Registered', count: 127, pct: 100 },
  { stage: 'Profile Complete', count: 98, pct: 77 },
  { stage: 'First Application', count: 85, pct: 67 },
  { stage: 'Interview', count: 34, pct: 27 },
  { stage: 'Offer', count: 12, pct: 9 },
];

const employerData = [
  { name: 'Google', count: 18 },
  { name: 'Meta', count: 15 },
  { name: 'Stripe', count: 12 },
  { name: 'Airbnb', count: 9 },
  { name: 'Netflix', count: 7 },
  { name: 'Shopify', count: 6 },
];

const skillGapData = [
  { name: 'System Design', gap: 42 },
  { name: 'Kubernetes', gap: 38 },
  { name: 'Go/Rust', gap: 31 },
  { name: 'ML/AI', gap: 28 },
  { name: 'DevOps', gap: 24 },
];

const weeklyApps = [
  { week: 'W1', apps: 23 },
  { week: 'W2', apps: 31 },
  { week: 'W3', apps: 28 },
  { week: 'W4', apps: 45 },
  { week: 'W5', apps: 38 },
  { week: 'W6', apps: 52 },
  { week: 'W7', apps: 41 },
  { week: 'W8', apps: 47 },
];

const needsHelpStudents = [
  { name: 'Jamie Rodriguez', status: 'No activity for 18 days', applications: 3, lastActive: '18 days ago' },
  { name: 'Priya Sharma', status: '15+ apps, no interviews', applications: 17, lastActive: '2 days ago' },
  { name: 'Marcus Johnson', status: 'No activity for 21 days', applications: 5, lastActive: '21 days ago' },
  { name: 'Emily Watson', status: '15+ apps, no interviews', applications: 22, lastActive: '1 day ago' },
  { name: 'David Kim', status: 'No activity for 14 days', applications: 8, lastActive: '14 days ago' },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function CareerCenter() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'reports'>('overview');
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Career Center</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">{mockOrg.name}</span>
          </div>
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">{mockOrg.memberCount} students • {mockOrg.seats} seats available</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
            <Send className="w-4 h-4" /> Send Nudge
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 rounded-lg p-1 w-fit">
        {(['overview', 'students', 'reports'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white dark:bg-surface-700 shadow-sm text-surface-900 dark:text-white' : 'text-surface-600 dark:text-surface-400'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Privacy notice */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-lg p-3 flex items-start gap-2">
        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>Privacy notice:</strong> Individual student data is only visible with active consent. Aggregates suppress groups smaller than 5. All access is logged.
        </p>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active Students', value: '127', change: '+12 this month', color: 'text-primary-600' },
              { label: 'Total Applications', value: '847', change: '+89 this week', color: 'text-green-600' },
              { label: 'Interview Rate', value: '27%', change: '+3% vs last month', color: 'text-amber-600' },
              { label: 'Offer Rate', value: '9%', change: '+1% vs last month', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
                <p className="text-sm text-surface-500">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-surface-500 mt-1">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Cohort Funnel</h3>
              <div className="space-y-3">
                {funnelData.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-3">
                    <span className="text-sm text-surface-600 dark:text-surface-400 w-32 shrink-0">{stage.stage}</span>
                    <div className="flex-1 h-8 bg-surface-100 dark:bg-surface-700 rounded-lg overflow-hidden relative">
                      <div className="h-full rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center px-3 transition-all" style={{ width: `${stage.pct}%` }}>
                        {stage.pct > 15 && <span className="text-xs font-medium text-white">{stage.count}</span>}
                      </div>
                    </div>
                    <span className="text-xs text-surface-500 w-10 text-right">{stage.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly applications */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Weekly Applications</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyApps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="apps" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top employers */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Top Target Employers</h3>
              <div className="space-y-2.5">
                {employerData.map((emp, i) => (
                  <div key={emp.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-surface-400 w-4">{i + 1}</span>
                      <span className="text-sm text-surface-700 dark:text-surface-300">{emp.name}</span>
                    </div>
                    <span className="text-sm font-medium text-surface-900 dark:text-white">{emp.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill gaps */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Common Skill Gaps</h3>
              <div className="space-y-2.5">
                {skillGapData.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-700 dark:text-surface-300">{skill.name}</span>
                      <span className="text-surface-500">{skill.gap}%</span>
                    </div>
                    <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${skill.gap}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs help */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Needs Help
              </h3>
              <div className="space-y-2.5">
                {needsHelpStudents.slice(0, 4).map(student => (
                  <div key={student.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700/50">
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-surface-500">{student.status}</p>
                    </div>
                    <button className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('students')} className="mt-3 text-xs text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700">View all →</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm" />
            </div>
          </div>
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 dark:bg-surface-700/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Student</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Applications</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Interviews</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Last Active</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Consent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {needsHelpStudents.map(student => (
                  <tr key={student.name} className="hover:bg-surface-50 dark:hover:bg-surface-700/50">
                    <td className="px-4 py-3 font-medium text-surface-900 dark:text-white">{student.name}</td>
                    <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{student.applications}</td>
                    <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{student.applications > 15 ? '0' : Math.floor(Math.random() * 3)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${student.status.includes('No activity') ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {student.status.includes('No activity') ? 'Inactive' : 'Stuck'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500">{student.lastActive}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Granted</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">Export cohort reports as CSV. Data includes only students with active consent.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Application Summary', desc: 'All applications by student, status, and date range', rows: '847 rows' },
              { title: 'Outcome Report', desc: 'Interview and offer rates by demographic (anonymized)', rows: '127 rows' },
              { title: 'Skill Gap Analysis', desc: 'Common missing skills across the cohort', rows: '35 rows' },
              { title: 'Engagement Report', desc: 'Login frequency, feature usage, and activity trends', rows: '127 rows' },
            ].map(report => (
              <div key={report.title} className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-surface-900 dark:text-white">{report.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{report.desc}</p>
                  <p className="text-xs text-surface-400 mt-1">{report.rows}</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
