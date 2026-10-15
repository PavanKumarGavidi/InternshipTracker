import React, { useState } from 'react';
import { useApp } from '../store';
import { MessageCircle, Star, BookOpen, CheckCircle2, Target, Zap, Award, ChevronRight, Plus, Tag, Lightbulb } from 'lucide-react';
import type { InterviewQuestion, AnswerScores, StoryBankItem } from '../types';

const categoryColors: Record<string, string> = {
  behavioral: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  technical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  situational: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'why-company': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const categoryLabels: Record<string, string> = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  situational: 'Situational',
  'why-company': 'Why This Company',
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 5) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-surface-500 w-20">{label}</span>
      <div className="flex-1 h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-surface-700 dark:text-surface-300 w-6">{score}/5</span>
    </div>
  );
}

export default function Interview() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'questions' | 'stories'>('questions');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [isCoaching, setIsCoaching] = useState(false);
  const [showNewStory, setShowNewStory] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', situation: '', task: '', action: '', result: '', tags: '' });

  const session = state.interviewSession;
  const currentQ = session?.questions.find(q => q.id === selectedQuestion);

  function handleCoach() {
    if (!selectedQuestion || !answerText.trim()) return;
    setIsCoaching(true);
    dispatch({ type: 'UPDATE_INTERVIEW_ANSWER', questionId: selectedQuestion, answer: answerText });
    setTimeout(() => {
      const scores: AnswerScores = { relevance: 3 + Math.floor(Math.random() * 3), structure: 3 + Math.floor(Math.random() * 3), specificity: 2 + Math.floor(Math.random() * 3), impact: 3 + Math.floor(Math.random() * 2), concision: 3 + Math.floor(Math.random() * 2) };
      dispatch({ type: 'SET_INTERVIEW_SCORES', questionId: selectedQuestion, scores, feedback: 'Good use of the STAR format. Consider adding more specific metrics to strengthen your impact. Your answer covers the situation well but could be more concise in the action section.' });
      setIsCoaching(false);
    }, 1500);
  }

  function handleAddStory() {
    if (!newStory.title || !newStory.situation) return;
    const story: StoryBankItem = { id: `story-${Date.now()}`, title: newStory.title, situation: newStory.situation, task: newStory.task, action: newStory.action, result: newStory.result, tags: newStory.tags.split(',').map(t => t.trim()).filter(Boolean) };
    dispatch({ type: 'ADD_STORY', story });
    setNewStory({ title: '', situation: '', task: '', action: '', result: '', tags: '' });
    setShowNewStory(false);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Interview Prep</h1>
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-0.5">Practice with AI coaching. Build your story bank for behavioral interviews.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('questions')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'questions' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}>
            <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Questions</span>
          </button>
          <button onClick={() => setActiveTab('stories')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stories' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}>
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Story Bank</span>
          </button>
        </div>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && session && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question list */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-3">10 Questions for {session.applicationId === 'app-2' ? 'Meta — Frontend Developer' : 'this role'}</p>
            {session.questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => { setSelectedQuestion(q.id); setAnswerText(q.answer || ''); }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedQuestion === q.id ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/10' : 'border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-surface-400">Q{i + 1}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${categoryColors[q.category]}`}>{categoryLabels[q.category]}</span>
                    </div>
                    <p className="text-sm text-surface-800 dark:text-surface-200 line-clamp-2">{q.text}</p>
                  </div>
                  {q.scores && (
                    <div className="shrink-0">
                      <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-700 dark:text-green-300">{Math.round((q.scores.relevance + q.scores.structure + q.scores.specificity + q.scores.impact + q.scores.concision) / 5 * 20)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Answer area */}
          <div className="lg:col-span-2">
            {currentQ ? (
              <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[currentQ.category]}`}>{categoryLabels[currentQ.category]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{currentQ.text}</h3>
                  <p className="text-sm text-surface-500 mt-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> {currentQ.whyItMatters}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300 block mb-2">Your Answer</label>
                  <textarea
                    value={answerText}
                    onChange={e => setAnswerText(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-900 text-sm min-h-[150px] resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Write your answer using the STAR format: Situation, Task, Action, Result..."
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-surface-500">{answerText.split(/\s+/).filter(Boolean).length} words</span>
                    <button
                      onClick={handleCoach}
                      disabled={!answerText.trim() || isCoaching}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
                    >
                      {isCoaching ? (
                        <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Coaching...</>
                      ) : (
                        <><Zap className="w-3.5 h-3.5" /> Get AI Feedback</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Scores & feedback */}
                {currentQ.scores && (
                  <div className="space-y-4 pt-4 border-t border-surface-200 dark:border-surface-700 animate-fade-in">
                    <h4 className="font-medium text-surface-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary-500" /> AI Feedback
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ScoreBar label="Relevance" score={currentQ.scores.relevance} />
                      <ScoreBar label="Structure" score={currentQ.scores.structure} />
                      <ScoreBar label="Specificity" score={currentQ.scores.specificity} />
                      <ScoreBar label="Impact" score={currentQ.scores.impact} />
                      <ScoreBar label="Concision" score={currentQ.scores.concision} />
                    </div>
                    {currentQ.feedback && (
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50">
                        <p className="text-sm text-blue-800 dark:text-blue-300">{currentQ.feedback}</p>
                      </div>
                    )}
                    <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-700/50">
                      <p className="text-xs font-medium text-surface-600 dark:text-surface-400 mb-1">Suggested Structure:</p>
                      <ol className="text-xs text-surface-600 dark:text-surface-400 space-y-1 list-decimal list-inside">
                        <li><strong>Situation:</strong> Set the context briefly (1-2 sentences)</li>
                        <li><strong>Task:</strong> What was your specific responsibility?</li>
                        <li><strong>Action:</strong> What did YOU do? (Use "I" not "we")</li>
                        <li><strong>Result:</strong> Quantify the outcome with metrics</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-12 text-center">
                <MessageCircle className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                <p className="text-surface-600 dark:text-surface-400">Select a question to start practicing</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Story Bank Tab */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-surface-600 dark:text-surface-400">{state.stories.length} stories saved • Reuse them across interviews</p>
            <button onClick={() => setShowNewStory(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
              <Plus className="w-4 h-4" /> Add Story
            </button>
          </div>

          {/* New story form */}
          {showNewStory && (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 space-y-4 animate-fade-in">
              <h3 className="font-semibold text-surface-900 dark:text-white">New STAR Story</h3>
              <input value={newStory.title} onChange={e => setNewStory({ ...newStory, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" placeholder="Story title (e.g. 'Debugging Production Cache Issue')" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-surface-500">Situation</label>
                  <textarea value={newStory.situation} onChange={e => setNewStory({ ...newStory, situation: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm min-h-[80px]" placeholder="What was the context?" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500">Task</label>
                  <textarea value={newStory.task} onChange={e => setNewStory({ ...newStory, task: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm min-h-[80px]" placeholder="What was your responsibility?" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500">Action</label>
                  <textarea value={newStory.action} onChange={e => setNewStory({ ...newStory, action: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm min-h-[80px]" placeholder="What did you do?" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500">Result</label>
                  <textarea value={newStory.result} onChange={e => setNewStory({ ...newStory, result: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm min-h-[80px]" placeholder="What was the outcome? Include metrics." />
                </div>
              </div>
              <input value={newStory.tags} onChange={e => setNewStory({ ...newStory, tags: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-sm" placeholder="Tags (comma-separated): debugging, leadership, teamwork" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNewStory(false)} className="px-4 py-2 rounded-lg text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">Cancel</button>
                <button onClick={handleAddStory} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Save Story</button>
              </div>
            </div>
          )}

          {/* Story list */}
          <div className="space-y-3">
            {state.stories.map(story => (
              <div key={story.id} className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-surface-900 dark:text-white">{story.title}</h3>
                  <div className="flex items-center gap-1.5">
                    {story.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/10">
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-0.5">Situation</p>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{story.situation}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5">Task</p>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{story.task}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-0.5">Action</p>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{story.action}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-0.5">Result</p>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{story.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
