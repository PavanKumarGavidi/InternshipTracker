import React, { useState } from 'react';
import { useApp } from '../store';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, ArrowRight, FileText, Download, RotateCcw, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import type { TailoredChange, MatchResult } from '../types';

const mockMatchResult: MatchResult = {
  score: 82,
  matched: [
    { requirement: 'React/TypeScript', evidence: '3+ years experience from internship and part-time roles' },
    { requirement: 'Node.js/Express', evidence: 'Built RESTful APIs at TechCorp serving 10K daily requests' },
    { requirement: 'SQL/PostgreSQL', evidence: 'Used PostgreSQL in StudyGroup Finder project with Prisma ORM' },
    { requirement: 'Git/version control', evidence: 'Used Git in all projects and team collaboration' },
    { requirement: 'RESTful APIs', evidence: 'Designed and implemented APIs at TechCorp' },
    { requirement: 'Team collaboration', evidence: 'Worked in Agile team of 5 at TechCorp, mentored juniors at StartupXYZ' },
  ],
  gaps: [
    { requirement: 'Kubernetes experience', canTruthfullyAdd: false, suggestion: 'Build a small project deploying a containerized app to demonstrate basic K8s knowledge' },
    { requirement: 'Go programming', canTruthfullyAdd: false, suggestion: 'Complete the Go tour (tour.golang.org) and build a small CLI tool' },
    { requirement: 'System design at scale', canTruthfullyAdd: true, suggestion: 'You can mention designing the chat app for 100+ concurrent users' },
  ],
  summary: 'Strong match on core requirements. Your React, TypeScript, and Node.js experience aligns well. Main gaps are Kubernetes and Go, which are nice-to-haves.',
};

const mockChanges: TailoredChange[] = [
  { id: 'c1', sectionId: 's2', original: 'Developed a React dashboard that reduced page load time by 40%', rewritten: 'Engineered a high-performance React dashboard using TypeScript, reducing page load time by 40% and improving user engagement', reason: 'Added TypeScript keyword to match job requirement; stronger action verb', accepted: true },
  { id: 'c2', sectionId: 's2', original: 'Implemented RESTful APIs using Node.js and Express serving 10K daily requests', rewritten: 'Designed and implemented scalable RESTful APIs using Node.js and Express, handling 10,000+ daily requests with 99.9% uptime', reason: 'Mirrors "scalable" language from job posting; adds specificity', accepted: true },
  { id: 'c3', sectionId: 's3', original: 'Built responsive UI components using React and TypeScript', rewritten: 'Built accessible, responsive UI components using React and TypeScript, following WCAG 2.1 AA guidelines', reason: 'Job posting emphasizes accessibility; your profile supports this claim', accepted: true },
  { id: 'c4', sectionId: 's3', original: 'Improved accessibility score from 65 to 95 using WCAG guidelines', rewritten: 'Led accessibility initiative improving WCAG compliance score from 65 to 95, enabling the product to serve users with disabilities', reason: 'Stronger impact framing; "led" shows ownership', accepted: false },
  { id: 'c5', sectionId: 's4', original: 'Full-stack web app connecting students for study sessions. Built with Next.js, PostgreSQL, and deployed on Vercel.', rewritten: 'Full-stack web application connecting students for collaborative study sessions. Architected with Next.js and PostgreSQL, deployed on Vercel with CI/CD pipeline.', reason: 'More technical detail; matches job\'s emphasis on deployment and CI/CD', accepted: true },
];

export default function Tailor() {
  const { state, dispatch } = useApp();
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [changes, setChanges] = useState<TailoredChange[]>(mockChanges);
  const [matchResult, setMatchResult] = useState<MatchResult>(mockMatchResult);
  const [expandedGap, setExpandedGap] = useState<number | null>(null);

  function handleAnalyze() {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  }

  function toggleChange(id: string) {
    setChanges(prev => prev.map(c => c.id === id ? { ...c, accepted: !c.accepted } : c));
  }

  const acceptedCount = changes.filter(c => c.accepted).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Resume Tailor</h1>
        <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">Paste a job posting to get AI-powered resume suggestions — all verified against your real experience.</p>
      </div>

      {/* Job input */}
      <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
        <label className="text-sm font-medium text-surface-700 dark:text-surface-300 block mb-2">Paste job posting</label>
        <textarea
          value={jobText}
          onChange={e => setJobText(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-900 text-sm min-h-[120px] resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Paste the full job posting text here, or enter a URL and we'll fetch it for you..."
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-surface-500">
            <Shield className="w-3.5 h-3.5" />
            <span>AI only uses your profile data. Nothing is fabricated.</span>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {isAnalyzing ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Analyze & Tailor</>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && !isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Left: Match score & gaps */}
          <div className="space-y-6">
            {/* Match Score */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-surface-900 dark:text-white">Match Score</h2>
                <span className={`text-2xl font-bold ${matchResult.score >= 75 ? 'text-green-600' : matchResult.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  {matchResult.score}%
                </span>
              </div>
              <div className="h-3 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full transition-all ${matchResult.score >= 75 ? 'bg-green-500' : matchResult.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${matchResult.score}%` }} />
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400">{matchResult.summary}</p>
            </div>

            {/* Matched */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h2 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Matched ({matchResult.matched.length})
              </h2>
              <div className="space-y-2.5">
                {matchResult.matched.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">{item.requirement}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">{item.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h2 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Gaps ({matchResult.gaps.length})
              </h2>
              <div className="space-y-2.5">
                {matchResult.gaps.map((gap, i) => (
                  <div key={i} className="rounded-lg border border-amber-200 dark:border-amber-800/50 overflow-hidden">
                    <button
                      onClick={() => setExpandedGap(expandedGap === i ? null : i)}
                      className="w-full flex items-center justify-between p-2.5 text-left hover:bg-amber-50 dark:hover:bg-amber-900/10"
                    >
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-300">{gap.requirement}</span>
                      {expandedGap === i ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-amber-500" />}
                    </button>
                    {expandedGap === i && (
                      <div className="px-2.5 pb-2.5 text-xs text-surface-600 dark:text-surface-400">
                        {gap.canTruthfullyAdd ? (
                          <p className="text-green-600 dark:text-green-400">✓ You can mention this based on your experience</p>
                        ) : (
                          <p className="text-amber-600 dark:text-amber-400">⚠ Not in your profile yet</p>
                        )}
                        {gap.suggestion && <p className="mt-1">💡 {gap.suggestion}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Changes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-surface-900 dark:text-white">Suggested Changes</h2>
                <span className="text-sm text-surface-500">{acceptedCount}/{changes.length} accepted</span>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  AI suggestions use only your own profile. Review each change before accepting. No facts are fabricated.
                </p>
              </div>

              <div className="space-y-3">
                {changes.map(change => (
                  <div key={change.id} className={`rounded-lg border p-4 transition-colors ${change.accepted ? 'border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/5' : 'border-surface-200 dark:border-surface-700'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-surface-400 shrink-0 mt-0.5 w-12">Before</span>
                          <p className="text-sm text-surface-600 dark:text-surface-400 line-through decoration-surface-300">{change.original}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400 shrink-0 mt-0.5 w-12">After</span>
                          <p className="text-sm text-surface-900 dark:text-white font-medium">{change.rewritten}</p>
                        </div>
                        <p className="text-xs text-surface-500 italic pl-14">💡 {change.reason}</p>
                      </div>
                      <button
                        onClick={() => toggleChange(change.id)}
                        className={`shrink-0 p-1.5 rounded-lg transition-colors ${change.accepted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-surface-100 dark:bg-surface-700 text-surface-400 hover:text-surface-600'}`}
                        title={change.accepted ? 'Accepted' : 'Rejected'}
                      >
                        {change.accepted ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export */}
              <div className="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between">
                <div className="text-sm text-surface-600 dark:text-surface-400">
                  <span className="font-medium">{acceptedCount}</span> changes accepted • Ready to export
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
                    <FileText className="w-4 h-4" /> DOCX
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
                    <Download className="w-4 h-4" /> Export PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Template selector */}
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6">
              <h2 className="font-semibold text-surface-900 dark:text-white mb-3">Template</h2>
              <div className="grid grid-cols-3 gap-3">
                {['Classic', 'Modern', 'Compact'].map((t, i) => (
                  <button key={t} className={`p-3 rounded-lg border text-center text-sm font-medium transition-colors ${i === 0 ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-surface-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-surface-500 mt-2">All templates are ATS-friendly: single-column, standard headings, no tables or images.</p>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing state */}
      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
          <p className="text-surface-600 dark:text-surface-400 font-medium">Analyzing job posting and tailoring your resume...</p>
          <p className="text-sm text-surface-500 mt-1">This usually takes 10–30 seconds</p>
        </div>
      )}
    </div>
  );
}
