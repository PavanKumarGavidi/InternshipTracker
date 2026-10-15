import React from 'react';
import { useApp } from '../store';
import { Briefcase, FileText, MessageCircle, TrendingUp, Clock, AlertCircle, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import type { ApplicationStatus } from '../types';

const statusColors: Record<ApplicationStatus, string> = {
  SAVED: 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300',
  APPLIED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  ONLINE_ASSESSMENT: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  INTERVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  OFFER: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  WITHDRAWN: 'bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-500',
};

const statusLabels: Record<ApplicationStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  ONLINE_ASSESSMENT: 'Assessment',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const { applications, profile } = state;

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const upcomingDeadlines = applications
    .filter(a => a.deadline && a.status !== 'REJECTED' && a.status !== 'WITHDRAWN' && a.status !== 'OFFER')
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 3);

  const recentApps = [...applications].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  const avgMatchScore = Math.round(applications.filter(a => a.matchScore).reduce((sum, a) => sum + (a.matchScore || 0), 0) / applications.filter(a => a.matchScore).length) || 0;

  const suggestedAction = statusCounts['SAVED'] > 0
    ? { text: `You have ${statusCounts['SAVED']} saved jobs waiting to be applied to`, action: 'applications' }
    : statusCounts['INTERVIEW'] > 0
    ? { text: `Prepare for ${statusCounts['INTERVIEW']} upcoming interview(s)`, action: 'interview' }
    : { text: 'Find and track your next opportunity', action: 'applications' };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Welcome back, {state.user?.name?.split(' ')[0] || 'Student'} 👋
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">Here's your job search overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: applications.length, icon: Briefcase, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Active Pipeline', value: (statusCounts['APPLIED'] || 0) + (statusCounts['ONLINE_ASSESSMENT'] || 0) + (statusCounts['INTERVIEW'] || 0), icon: TrendingUp, color: 'text-success', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Interviews', value: statusCounts['INTERVIEW'] || 0, icon: MessageCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Avg Match Score', value: `${avgMatchScore}%`, icon: FileText, color: 'text-accent-600 dark:text-accent-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-surface-800 rounded-xl p-5 border border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-surface-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Suggested action */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-5 border border-primary-200 dark:border-primary-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-sm font-medium text-surface-800 dark:text-surface-200">{suggestedAction.text}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', page: suggestedAction.action })}
            className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700"
          >
            Go <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline overview */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
          <h2 className="font-semibold text-surface-900 dark:text-white mb-4">Pipeline Overview</h2>
          <div className="space-y-3">
            {(['SAVED', 'APPLIED', 'ONLINE_ASSESSMENT', 'INTERVIEW', 'OFFER', 'REJECTED'] as ApplicationStatus[]).map(status => {
              const count = statusCounts[status] || 0;
              const pct = applications.length > 0 ? (count / applications.length) * 100 : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-sm text-surface-600 dark:text-surface-400 w-28 shrink-0">{statusLabels[status]}</span>
                  <div className="flex-1 h-6 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === 'OFFER' ? 'bg-green-500' :
                        status === 'REJECTED' ? 'bg-red-400' :
                        status === 'INTERVIEW' ? 'bg-amber-500' :
                        status === 'APPLIED' ? 'bg-blue-500' :
                        'bg-primary-500'
                      }`}
                      style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming deadlines */}
        <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
          <h2 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-surface-500" />
            Upcoming Deadlines
          </h2>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-sm text-surface-500">No upcoming deadlines. Nice work!</p>
          ) : (
            <div className="space-y-3">
              {upcomingDeadlines.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{app.job.title}</p>
                    <p className="text-xs text-surface-500">{app.job.company}</p>
                  </div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {new Date(app.deadline!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-surface-900 dark:text-white">Recent Activity</h2>
          <button onClick={() => dispatch({ type: 'SET_PAGE', page: 'applications' })} className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">
            View all →
          </button>
        </div>
        <div className="space-y-2">
          {recentApps.map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-xs font-bold text-surface-600 dark:text-surface-400">
                  {app.job.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{app.job.title}</p>
                  <p className="text-xs text-surface-500">{app.job.company} • {app.job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {app.matchScore && (
                  <span className="text-xs font-medium text-surface-500">{app.matchScore}% match</span>
                )}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[app.status]}`}>
                  {statusLabels[app.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage meter */}
      <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-surface-900 dark:text-white">Free Plan Usage</h2>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
            Upgrade to Pro
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Applications', used: applications.length, limit: 15 },
            { label: 'Tailored Resumes', used: 2, limit: 3 },
            { label: 'Interview Sessions', used: 1, limit: 1 },
          ].map((usage, i) => {
            const pct = (usage.used / usage.limit) * 100;
            const isNearLimit = pct >= 80;
            return (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-600 dark:text-surface-400">{usage.label}</span>
                  <span className={`font-medium ${isNearLimit ? 'text-warning' : 'text-surface-700 dark:text-surface-300'}`}>
                    {usage.used}/{usage.limit}
                  </span>
                </div>
                <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${isNearLimit ? 'bg-warning' : 'bg-primary-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
