export type ApplicationStatus = 'SAVED' | 'APPLIED' | 'ONLINE_ASSESSMENT' | 'INTERVIEW' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';

export type UserRole = 'STUDENT' | 'STAFF' | 'ADMIN';

export type ProfileSectionType = 'EDUCATION' | 'EXPERIENCE' | 'PROJECT' | 'SKILL' | 'CERTIFICATION';

export type ResumeKind = 'MASTER' | 'TAILORED';

export type PlanType = 'FREE' | 'PRO' | 'INSTITUTIONAL';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  plan: PlanType;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'UNIVERSITY' | 'COLLEGE' | 'BOOTCAMP';
  domain: string;
  plan: PlanType;
  seats: number;
  memberCount: number;
}

export interface Profile {
  id: string;
  userId: string;
  headline: string;
  graduationDate: string;
  targetRoles: string[];
  locations: string[];
  workAuthorization?: string;
  summary: string;
  sections: ProfileSection[];
}

export interface ProfileSection {
  id: string;
  type: ProfileSectionType;
  data: Record<string, any>;
  position: number;
}

export interface Job {
  id: string;
  sourceUrl?: string;
  company: string;
  title: string;
  location: string;
  description: string;
  requirements: string[];
  niceToHave: string[];
  keywords: string[];
  deadline?: string;
  seniority: string;
  employmentType: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
  status: ApplicationStatus;
  appliedAt?: string;
  deadline?: string;
  resumeId?: string;
  salary?: string;
  notes: string;
  source: string;
  matchScore?: number;
  createdAt: string;
  updatedAt: string;
  events: ApplicationEvent[];
  contacts: Contact[];
}

export interface ApplicationEvent {
  id: string;
  applicationId: string;
  type: 'STATUS_CHANGE' | 'NOTE' | 'INTERVIEW' | 'EMAIL';
  data: Record<string, any>;
  createdAt: string;
}

export interface Contact {
  id: string;
  applicationId: string;
  name: string;
  role: string;
  email?: string;
  linkedinUrl?: string;
  notes?: string;
}

export interface Resume {
  id: string;
  userId: string;
  applicationId?: string;
  kind: ResumeKind;
  template: string;
  content: Record<string, any>;
  matchScore?: number;
  createdAt: string;
}

export interface TailoredChange {
  id: string;
  sectionId: string;
  original: string;
  rewritten: string;
  reason: string;
  accepted: boolean;
}

export interface InterviewSession {
  id: string;
  applicationId: string;
  questions: InterviewQuestion[];
  createdAt: string;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational' | 'why-company';
  whyItMatters: string;
  answer?: string;
  scores?: AnswerScores;
  feedback?: string;
}

export interface AnswerScores {
  relevance: number;
  structure: number;
  specificity: number;
  impact: number;
  concision: number;
}

export interface StoryBankItem {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  tags: string[];
}

export interface MatchResult {
  score: number;
  matched: { requirement: string; evidence: string }[];
  gaps: { requirement: string; canTruthfullyAdd: boolean; suggestion?: string }[];
  summary: string;
}

export interface Reminder {
  id: string;
  applicationId: string;
  type: 'deadline' | 'follow-up';
  dueAt: string;
  sentAt?: string;
}

export interface UsageLog {
  id: string;
  userId: string;
  feature: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  createdAt: string;
}

export type Page = 'landing' | 'auth' | 'dashboard' | 'applications' | 'tailor' | 'interview' | 'profile' | 'career-center' | 'settings';
