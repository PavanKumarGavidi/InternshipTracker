import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import type { User, Application, Profile, Job, InterviewSession, StoryBankItem, ApplicationStatus, TailoredChange, MatchResult, Organization } from './types';

// ============ MOCK DATA ============

const mockUser: User = {
  id: 'user-1',
  email: 'alex.chen@university.edu',
  name: 'Alex Chen',
  role: 'STUDENT',
  plan: 'FREE',
  createdAt: '2024-09-01T00:00:00Z',
};

const mockProfile: Profile = {
  id: 'profile-1',
  userId: 'user-1',
  headline: 'Computer Science Senior | Full-Stack Developer',
  graduationDate: '2025-05-15',
  targetRoles: ['Software Engineer', 'Frontend Developer', 'Full-Stack Developer'],
  locations: ['San Francisco, CA', 'New York, NY', 'Remote'],
  workAuthorization: 'US Citizen',
  summary: 'Senior CS student with experience in React, TypeScript, and Node.js. Built 3 full-stack applications serving 500+ users. Passionate about building accessible, performant web applications.',
  sections: [
    { id: 's1', type: 'EDUCATION', data: { institution: 'Stanford University', degree: 'B.S. Computer Science', gpa: '3.8', startDate: '2021-09', endDate: '2025-05', coursework: ['Algorithms', 'Machine Learning', 'Distributed Systems', 'Web Development'] }, position: 0 },
    { id: 's2', type: 'EXPERIENCE', data: { company: 'TechCorp Inc.', title: 'Software Engineering Intern', startDate: '2024-06', endDate: '2024-09', bullets: ['Developed a React dashboard that reduced page load time by 40%', 'Implemented RESTful APIs using Node.js and Express serving 10K daily requests', 'Collaborated with a team of 5 engineers using Agile methodology', 'Wrote unit and integration tests achieving 90% code coverage'] }, position: 1 },
    { id: 's3', type: 'EXPERIENCE', data: { company: 'StartupXYZ', title: 'Frontend Developer (Part-time)', startDate: '2023-09', endDate: '2024-05', bullets: ['Built responsive UI components using React and TypeScript', 'Integrated third-party APIs for payment processing and analytics', 'Improved accessibility score from 65 to 95 using WCAG guidelines', 'Mentored 2 junior developers on React best practices'] }, position: 2 },
    { id: 's4', type: 'PROJECT', data: { name: 'StudyGroup Finder', description: 'Full-stack web app connecting students for study sessions. Built with Next.js, PostgreSQL, and deployed on Vercel.', tech: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'], link: 'https://github.com/alexchen/studygroup' }, position: 3 },
    { id: 's5', type: 'PROJECT', data: { name: 'Real-time Chat Application', description: 'WebSocket-based chat app with rooms, file sharing, and message search. Supports 100+ concurrent users.', tech: ['React', 'Socket.io', 'Redis', 'Docker'], link: 'https://github.com/alexchen/chatapp' }, position: 4 },
    { id: 's6', type: 'SKILL', data: { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] }, position: 5 },
    { id: 's7', type: 'SKILL', data: { category: 'Frameworks & Tools', items: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'AWS'] }, position: 6 },
    { id: 's8', type: 'CERTIFICATION', data: { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024-03' }, position: 7 },
  ],
};

const companies = ['Google', 'Meta', 'Stripe', 'Airbnb', 'Netflix', 'Shopify', 'Datadog', 'Figma', 'Notion', 'Linear', 'Vercel', 'Supabase', 'Cloudflare', 'Twilio', 'Square'];
const titles = ['Software Engineer Intern', 'Frontend Developer', 'Full-Stack Engineer', 'SWE - New Grad', 'Platform Engineer', 'Developer Experience Intern', 'Infrastructure Engineer', 'Product Engineer'];
const locations = ['Mountain View, CA', 'Menlo Park, CA', 'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Remote', 'Austin, TX', 'London, UK', 'Toronto, CA'];
const sources = ['LinkedIn', 'Handshake', 'Company Website', 'Career Fair', 'Referral', 'Indeed'];

function generateMockJobs(): Job[] {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `job-${i + 1}`,
    company: companies[i % companies.length],
    title: titles[i % titles.length],
    location: locations[i % locations.length],
    description: `We are looking for a talented ${titles[i % titles.length].toLowerCase()} to join our team. You will work on building scalable applications and collaborate with cross-functional teams.`,
    requirements: ['React', 'TypeScript', 'Node.js', 'SQL', 'Git', ...(i % 2 === 0 ? ['AWS', 'Docker'] : ['Python', 'CI/CD'])],
    niceToHave: ['GraphQL', 'Kubernetes', 'Machine Learning', 'System Design'],
    keywords: ['software engineer', 'web development', 'full-stack', i % 2 === 0 ? 'frontend' : 'backend'],
    seniority: i < 5 ? 'Intern' : 'Entry Level',
    employmentType: 'Full-time',
    sourceUrl: `https://example.com/jobs/${i + 1}`,
    deadline: i < 3 ? '2025-02-15' : i < 6 ? '2025-03-01' : undefined,
  }));
}

function generateMockApplications(): Application[] {
  const jobs = generateMockJobs();
  const statuses: ApplicationStatus[] = ['SAVED', 'APPLIED', 'ONLINE_ASSESSMENT', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'];
  return jobs.map((job, i) => {
    const status = statuses[i % statuses.length];
    const created = new Date(2024, 10 + Math.floor(i / 5), 1 + i * 2);
    return {
      id: `app-${i + 1}`,
      userId: 'user-1',
      jobId: job.id,
      job,
      status,
      appliedAt: status !== 'SAVED' ? created.toISOString() : undefined,
      deadline: job.deadline,
      salary: status === 'OFFER' ? '$120,000 - $150,000' : undefined,
      notes: i % 3 === 0 ? 'Referred by John from college' : '',
      source: sources[i % sources.length],
      matchScore: 55 + Math.floor(Math.random() * 40),
      createdAt: created.toISOString(),
      updatedAt: new Date(created.getTime() + 86400000 * (i % 7)).toISOString(),
      events: [
        { id: `evt-${i}-1`, applicationId: `app-${i + 1}`, type: 'STATUS_CHANGE', data: { from: null, to: 'SAVED' }, createdAt: created.toISOString() },
        ...(status !== 'SAVED' ? [{ id: `evt-${i}-2`, applicationId: `app-${i + 1}`, type: 'STATUS_CHANGE' as const, data: { from: 'SAVED', to: 'APPLIED' }, createdAt: new Date(created.getTime() + 86400000).toISOString() }] : []),
        ...(status === 'INTERVIEW' || status === 'OFFER' ? [{ id: `evt-${i}-3`, applicationId: `app-${i + 1}`, type: 'INTERVIEW' as const, data: { format: 'Video', duration: '45 min' }, createdAt: new Date(created.getTime() + 86400000 * 5).toISOString() }] : []),
      ],
      contacts: i % 4 === 0 ? [{ id: `contact-${i}`, applicationId: `app-${i + 1}`, name: 'Sarah Johnson', role: 'Recruiter', email: 'sarah@company.com' }] : [],
    };
  });
}

const mockInterviewSession: InterviewSession = {
  id: 'interview-1',
  applicationId: 'app-2',
  createdAt: '2024-12-01T00:00:00Z',
  questions: [
    { id: 'q1', text: 'Tell me about a time you had to debug a complex issue in a production system.', category: 'behavioral', whyItMatters: 'Tests problem-solving under pressure and debugging methodology.', answer: 'During my internship at TechCorp, our dashboard started showing stale data intermittently. I first reproduced the issue locally by checking the API responses, then traced it to a caching layer that wasn\'t invalidating properly. I added cache-busting headers and wrote a test to prevent regression. The fix reduced support tickets by 60%.', scores: { relevance: 4, structure: 5, specificity: 4, impact: 4, concision: 3 }, feedback: 'Great use of STAR format. Consider being more specific about the technical details of the caching issue. Your impact metric (60% reduction) is excellent.' },
    { id: 'q2', text: 'How would you design a URL shortener service?', category: 'technical', whyItMatters: 'Evaluates system design thinking and understanding of distributed systems.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q3', text: 'Why do you want to work at this company specifically?', category: 'why-company', whyItMatters: 'Assesses genuine interest and research about the company.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q4', text: 'Describe a situation where you had to work with a difficult team member.', category: 'behavioral', whyItMatters: 'Tests interpersonal skills and conflict resolution.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q5', text: 'What\'s the difference between REST and GraphQL? When would you choose one over the other?', category: 'technical', whyItMatters: 'Tests API design knowledge and practical decision-making.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q6', text: 'If you could improve one thing about your last project, what would it be?', category: 'situational', whyItMatters: 'Shows self-awareness and ability to reflect on past work.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q7', text: 'Walk me through how you would optimize a slow-loading React application.', category: 'technical', whyItMatters: 'Directly relevant to frontend performance, a key skill for this role.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q8', text: 'Tell me about a project where you had to learn a new technology quickly.', category: 'behavioral', whyItMatters: 'Demonstrates adaptability and learning ability.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q9', text: 'How do you prioritize tasks when working on multiple projects with competing deadlines?', category: 'situational', whyItMatters: 'Tests time management and organizational skills.', answer: '', scores: undefined, feedback: undefined },
    { id: 'q10', text: 'What excites you most about the future of web development?', category: 'why-company', whyItMatters: 'Gauges passion for the field and alignment with company direction.', answer: '', scores: undefined, feedback: undefined },
  ],
};

const mockStories: StoryBankItem[] = [
  { id: 'story-1', title: 'Debugging Production Cache Issue', situation: 'Internship at TechCorp, dashboard showing stale data', task: 'Identify and fix the root cause of intermittent data staleness', action: 'Reproduced locally, traced to caching layer, added invalidation headers, wrote regression test', result: 'Fixed the issue, reduced support tickets by 60%, learned by team as best practice', tags: ['debugging', 'production', 'caching', 'internship'] },
  { id: 'story-2', title: 'Improving Accessibility Score', situation: 'Part-time role at StartupXYZ, accessibility audit revealed score of 65', task: 'Improve WCAG compliance to meet company standards', action: 'Audited all components, added ARIA labels, fixed color contrast, implemented keyboard navigation, tested with screen readers', result: 'Score improved from 65 to 95, received commendation from VP of Engineering', tags: ['accessibility', 'frontend', 'WCAG', 'leadership'] },
];

const mockOrg: Organization = {
  id: 'org-1',
  name: 'Stanford University',
  type: 'UNIVERSITY',
  domain: 'stanford.edu',
  plan: 'INSTITUTIONAL',
  seats: 500,
  memberCount: 127,
};

// ============ STORE ============

interface AppState {
  user: User | null;
  profile: Profile | null;
  applications: Application[];
  interviewSession: InterviewSession | null;
  stories: StoryBankItem[];
  currentPage: string;
  darkMode: boolean;
  sidebarOpen: boolean;
  tailoredChanges: TailoredChange[];
  matchResult: MatchResult | null;
  isAuthenticated: boolean;
}

type Action =
  | { type: 'SET_PAGE'; page: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_APPLICATION'; id: string; updates: Partial<Application> }
  | { type: 'ADD_APPLICATION'; application: Application }
  | { type: 'DELETE_APPLICATION'; id: string }
  | { type: 'SET_MATCH_RESULT'; result: MatchResult | null }
  | { type: 'SET_TAILORED_CHANGES'; changes: TailoredChange[] }
  | { type: 'TOGGLE_CHANGE'; changeId: string }
  | { type: 'UPDATE_INTERVIEW_ANSWER'; questionId: string; answer: string }
  | { type: 'SET_INTERVIEW_SCORES'; questionId: string; scores: any; feedback: string }
  | { type: 'ADD_STORY'; story: StoryBankItem }
  | { type: 'UPDATE_PROFILE'; profile: Partial<Profile> };

const initialState: AppState = {
  user: null,
  profile: null,
  applications: generateMockApplications(),
  interviewSession: mockInterviewSession,
  stories: mockStories,
  currentPage: 'landing',
  darkMode: false,
  sidebarOpen: true,
  tailoredChanges: [],
  matchResult: null,
  isAuthenticated: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.page };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'LOGIN':
      return { ...state, user: mockUser, profile: mockProfile, isAuthenticated: true, currentPage: 'dashboard' };
    case 'LOGOUT':
      return { ...state, user: null, profile: null, isAuthenticated: false, currentPage: 'landing' };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.id ? { ...app, ...action.updates, updatedAt: new Date().toISOString() } : app
        ),
      };
    case 'ADD_APPLICATION':
      return { ...state, applications: [action.application, ...state.applications] };
    case 'DELETE_APPLICATION':
      return { ...state, applications: state.applications.filter(a => a.id !== action.id) };
    case 'SET_MATCH_RESULT':
      return { ...state, matchResult: action.result };
    case 'SET_TAILORED_CHANGES':
      return { ...state, tailoredChanges: action.changes };
    case 'TOGGLE_CHANGE':
      return {
        ...state,
        tailoredChanges: state.tailoredChanges.map(c =>
          c.id === action.changeId ? { ...c, accepted: !c.accepted } : c
        ),
      };
    case 'UPDATE_INTERVIEW_ANSWER':
      return {
        ...state,
        interviewSession: state.interviewSession ? {
          ...state.interviewSession,
          questions: state.interviewSession.questions.map(q =>
            q.id === action.questionId ? { ...q, answer: action.answer } : q
          ),
        } : null,
      };
    case 'SET_INTERVIEW_SCORES':
      return {
        ...state,
        interviewSession: state.interviewSession ? {
          ...state.interviewSession,
          questions: state.interviewSession.questions.map(q =>
            q.id === action.questionId ? { ...q, scores: action.scores, feedback: action.feedback } : q
          ),
        } : null,
      };
    case 'ADD_STORY':
      return { ...state, stories: [action.story, ...state.stories] };
    case 'UPDATE_PROFILE':
      return { ...state, profile: state.profile ? { ...state.profile, ...action.profile } : null };
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { mockOrg, generateMockJobs, generateMockApplications };
