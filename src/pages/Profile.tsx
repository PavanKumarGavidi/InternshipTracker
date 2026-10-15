import React, { useState } from 'react';
import { useApp } from '../store';
import { User, GraduationCap, Briefcase, Code, Award, Plus, Edit3, Trash2, GripVertical, Upload, CheckCircle2, MapPin, Target } from 'lucide-react';
import type { ProfileSection, ProfileSectionType } from '../types';

const sectionIcons: Record<ProfileSectionType, any> = {
  EDUCATION: GraduationCap,
  EXPERIENCE: Briefcase,
  PROJECT: Code,
  SKILL: Target,
  CERTIFICATION: Award,
};

const sectionLabels: Record<ProfileSectionType, string> = {
  EDUCATION: 'Education',
  EXPERIENCE: 'Experience',
  PROJECT: 'Projects',
  SKILL: 'Skills',
  CERTIFICATION: 'Certifications',
};

export default function ProfilePage() {
  const { state, dispatch } = useApp();
  const profile = state.profile;
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);

  if (!profile) return null;

  const groupedSections = profile.sections.sort((a, b) => a.position - b.position);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My Profile</h1>
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">Your master profile is the source of truth for all tailored resumes.</p>
        </div>
        <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
          <Upload className="w-4 h-4" /> Import Resume
        </button>
      </div>

      {/* Basic info */}
      <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4">
        <h2 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2"><User className="w-4 h-4" /> Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-surface-500">Headline</label>
            <input defaultValue={profile.headline} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-500">Graduation Date</label>
            <input type="date" defaultValue={profile.graduationDate} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-500">Target Roles</label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {profile.targetRoles.map(role => (
                <span key={role} className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{role}</span>
              ))}
              <button className="text-xs px-2 py-1 rounded-full border border-dashed border-surface-300 dark:border-surface-600 text-surface-500 hover:border-primary-400">+ Add</button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-500">Locations</label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {profile.locations.map(loc => (
                <span key={loc} className="text-xs px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 flex items-center gap-1"><MapPin className="w-3 h-3" />{loc}</span>
              ))}
              <button className="text-xs px-2 py-1 rounded-full border border-dashed border-surface-300 dark:border-surface-600 text-surface-500 hover:border-primary-400">+ Add</button>
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-surface-500">Professional Summary</label>
          <textarea defaultValue={profile.summary} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm min-h-[80px] resize-y" />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {(['EXPERIENCE', 'EDUCATION', 'PROJECT', 'SKILL', 'CERTIFICATION'] as ProfileSectionType[]).map(type => {
          const sections = groupedSections.filter(s => s.type === type);
          if (sections.length === 0) return null;
          const Icon = sectionIcons[type];
          return (
            <div key={type} className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-500" /> {sectionLabels[type]}
                </h2>
                <button className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {sections.map(section => (
                  <div key={section.id} className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {type === 'EXPERIENCE' && (
                          <>
                            <p className="font-medium text-surface-900 dark:text-white">{section.data.title} at {section.data.company}</p>
                            <p className="text-xs text-surface-500">{section.data.startDate} — {section.data.endDate}</p>
                            <ul className="mt-2 space-y-1">
                              {section.data.bullets?.map((bullet: string, i: number) => (
                                <li key={i} className="text-sm text-surface-700 dark:text-surface-300 flex items-start gap-2">
                                  <span className="text-surface-400 mt-1">•</span> {bullet}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        {type === 'EDUCATION' && (
                          <>
                            <p className="font-medium text-surface-900 dark:text-white">{section.data.degree}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">{section.data.institution}</p>
                            <p className="text-xs text-surface-500">{section.data.startDate} — {section.data.endDate} • GPA: {section.data.gpa}</p>
                          </>
                        )}
                        {type === 'PROJECT' && (
                          <>
                            <p className="font-medium text-surface-900 dark:text-white">{section.data.name}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400 mt-0.5">{section.data.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {section.data.tech?.map((t: string) => (
                                <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400">{t}</span>
                              ))}
                            </div>
                          </>
                        )}
                        {type === 'SKILL' && (
                          <>
                            <p className="text-xs font-medium text-surface-500 mb-1">{section.data.category}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {section.data.items?.map((item: string) => (
                                <span key={item} className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">{item}</span>
                              ))}
                            </div>
                          </>
                        )}
                        {type === 'CERTIFICATION' && (
                          <>
                            <p className="font-medium text-surface-900 dark:text-white">{section.data.name}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">{section.data.issuer} • {section.data.date}</p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-500 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 cursor-grab"><GripVertical className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowImport(false)} />
          <div className="relative bg-white dark:bg-surface-900 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Import Resume</h2>
            <p className="text-sm text-surface-600 dark:text-surface-400">Upload your existing resume (PDF or DOCX, max 5MB). We'll extract the information and show it for your review before saving.</p>
            <div className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300">Click to upload or drag and drop</p>
              <p className="text-xs text-surface-500 mt-1">PDF or DOCX, max 5MB</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-surface-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              <span>Your data is parsed locally and reviewed by you before saving. Nothing is shared.</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowImport(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">Cancel</button>
              <button onClick={() => setShowImport(false)} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
