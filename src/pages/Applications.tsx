import React, { useState } from 'react';
import { useApp } from '../store';
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { Plus, Search, Filter, Table, Columns, Download, Upload, MoreVertical, Calendar, MapPin, Building2 } from 'lucide-react';
import type { Application, ApplicationStatus } from '../types';

const columns: { id: ApplicationStatus; label: string; color: string }[] = [
  { id: 'SAVED', label: 'Saved', color: 'border-surface-300 dark:border-surface-600' },
  { id: 'APPLIED', label: 'Applied', color: 'border-blue-400' },
  { id: 'ONLINE_ASSESSMENT', label: 'Assessment', color: 'border-purple-400' },
  { id: 'INTERVIEW', label: 'Interview', color: 'border-amber-400' },
  { id: 'OFFER', label: 'Offer', color: 'border-green-400' },
  { id: 'REJECTED', label: 'Rejected', color: 'border-red-400' },
];

function KanbanCard({ app, onClick }: { app: Application; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: app.id, data: { app } });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${isDragging ? 'opacity-50 shadow-lg' : ''}`}
    >
      <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{app.job.title}</p>
      <p className="text-xs text-surface-500 mt-0.5 truncate">{app.job.company}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-surface-400">{app.job.location}</span>
        {app.matchScore && (
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${app.matchScore >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : app.matchScore >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
            {app.matchScore}%
          </span>
        )}
      </div>
      {app.deadline && (
        <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 dark:text-amber-400">
          <Calendar className="w-3 h-3" />
          {new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`kanban-column space-y-2 p-2 rounded-lg transition-colors ${isOver ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}>
      {children}
    </div>
  );
}

export default function Applications() {
  const { state, dispatch } = useApp();
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = state.applications.filter(app => {
    const matchSearch = search === '' || app.job.title.toLowerCase().includes(search.toLowerCase()) || app.job.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.data.current?.app) {
      const newStatus = over.id as ApplicationStatus;
      const app = active.data.current.app as Application;
      if (app.status !== newStatus) {
        dispatch({
          type: 'UPDATE_APPLICATION',
          id: app.id,
          updates: { status: newStatus, events: [...app.events, { id: `evt-${Date.now()}`, applicationId: app.id, type: 'STATUS_CHANGE', data: { from: app.status, to: newStatus }, createdAt: new Date().toISOString() }] },
        });
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Applications</h1>
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">{state.applications.length} total applications</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" /> Add Job
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by company or title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm text-surface-700 dark:text-surface-300"
        >
          <option value="all">All Statuses</option>
          {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
          <button onClick={() => setView('kanban')} className={`p-1.5 rounded ${view === 'kanban' ? 'bg-white dark:bg-surface-700 shadow-sm' : ''}`}>
            <Columns className="w-4 h-4 text-surface-600 dark:text-surface-400" />
          </button>
          <button onClick={() => setView('table')} className={`p-1.5 rounded ${view === 'table' ? 'bg-white dark:bg-surface-700 shadow-sm' : ''}`}>
            <Table className="w-4 h-4 text-surface-600 dark:text-surface-400" />
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <DndContext onDragEnd={handleDragEnd} onDragStart={e => setActiveId(e.active.id as string)}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {columns.map(col => {
              const apps = filtered.filter(a => a.status === col.id);
              return (
                <div key={col.id} className="space-y-2">
                  <div className={`flex items-center justify-between px-2 py-1.5 rounded-t-lg border-t-2 ${col.color} bg-surface-50 dark:bg-surface-800/50`}>
                    <span className="text-xs font-semibold text-surface-700 dark:text-surface-300">{col.label}</span>
                    <span className="text-xs text-surface-500 bg-surface-200 dark:bg-surface-700 px-1.5 py-0.5 rounded-full">{apps.length}</span>
                  </div>
                  <DroppableColumn id={col.id}>
                    {apps.map(app => (
                      <KanbanCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
                    ))}
                  </DroppableColumn>
                </div>
              );
            })}
          </div>
          <DragOverlay>
            {activeId ? (
              <div className="bg-white dark:bg-surface-800 rounded-lg p-3 border border-surface-200 dark:border-surface-700 shadow-xl w-64 rotate-2">
                {(() => { const app = state.applications.find(a => a.id === activeId); return app ? <><p className="text-sm font-medium">{app.job.title}</p><p className="text-xs text-surface-500">{app.job.company}</p></> : null; })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 dark:bg-surface-700/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Match</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Applied</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600 dark:text-surface-400">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filtered.map(app => (
                  <tr key={app.id} onClick={() => setSelectedApp(app)} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-xs font-bold text-surface-600 dark:text-surface-400">
                          {app.job.company.charAt(0)}
                        </div>
                        <span className="font-medium text-surface-900 dark:text-white">{app.job.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{app.job.title}</td>
                    <td className="px-4 py-3 text-surface-500">{app.job.location}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        app.status === 'OFFER' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                        app.status === 'INTERVIEW' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                        app.status === 'APPLIED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300'
                      }`}>
                        {columns.find(c => c.id === app.status)?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {app.matchScore ? (
                        <span className={`font-medium ${app.matchScore >= 75 ? 'text-green-600' : app.matchScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                          {app.matchScore}%
                        </span>
                      ) : <span className="text-surface-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-surface-500">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                    <td className="px-4 py-3 text-surface-500">{app.deadline ? new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedApp(null)} />
          <div className="ml-auto w-full max-w-lg bg-white dark:bg-surface-900 h-full overflow-y-auto shadow-xl animate-slide-in">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white">{selectedApp.job.title}</h2>
                  <p className="text-surface-600 dark:text-surface-400 flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" /> {selectedApp.job.company}
                    <span className="text-surface-400">•</span>
                    <MapPin className="w-4 h-4" /> {selectedApp.job.location}
                  </p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500">✕</button>
              </div>

              {/* Status selector */}
              <div>
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Status</label>
                <select
                  value={selectedApp.status}
                  onChange={e => {
                    const newStatus = e.target.value as ApplicationStatus;
                    dispatch({ type: 'UPDATE_APPLICATION', id: selectedApp.id, updates: { status: newStatus } });
                    setSelectedApp({ ...selectedApp, status: newStatus });
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm"
                >
                  {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-surface-500">Source</p>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{selectedApp.source}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Match Score</p>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{selectedApp.matchScore || 'N/A'}%</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Applied</p>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleDateString() : 'Not yet'}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Deadline</p>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{selectedApp.deadline ? new Date(selectedApp.deadline).toLocaleDateString() : 'None'}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Notes</label>
                <textarea
                  value={selectedApp.notes}
                  onChange={e => {
                    dispatch({ type: 'UPDATE_APPLICATION', id: selectedApp.id, updates: { notes: e.target.value } });
                    setSelectedApp({ ...selectedApp, notes: e.target.value });
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm min-h-[80px] resize-y"
                  placeholder="Add notes about this application..."
                />
              </div>

              {/* Requirements */}
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Key Requirements</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.job.requirements.map((req, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">{req}</span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Timeline</p>
                <div className="space-y-3">
                  {selectedApp.events.map(evt => (
                    <div key={evt.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-sm text-surface-700 dark:text-surface-300">
                          {evt.type === 'STATUS_CHANGE' ? `Status changed to ${columns.find(c => c.id === evt.data.to)?.label}` : evt.type}
                        </p>
                        <p className="text-xs text-surface-500">{new Date(evt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-surface-200 dark:border-surface-700">
                <button onClick={() => { dispatch({ type: 'SET_PAGE', page: 'tailor' }); setSelectedApp(null); }} className="flex-1 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
                  Tailor Resume
                </button>
                <button onClick={() => { dispatch({ type: 'SET_PAGE', page: 'interview' }); setSelectedApp(null); }} className="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
                  Interview Prep
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white dark:bg-surface-900 rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Add New Application</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Job URL or paste posting</label>
                <textarea className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm min-h-[100px] resize-y" placeholder="Paste a job posting URL or the full text here..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Company</label>
                  <input className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm" placeholder="e.g. Google" />
                </div>
                <div>
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Role</label>
                  <input className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm" placeholder="e.g. SWE Intern" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Location</label>
                <input className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm" placeholder="e.g. San Francisco, CA" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Add Application</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
