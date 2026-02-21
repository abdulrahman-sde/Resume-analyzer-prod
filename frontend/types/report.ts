export interface ContactDetails {
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  extractionConfidence: "HIGH" | "LOW";
}

export interface EducationItem {
  degree: string;
  institution: string;
  graduationYear: number | null;
  gpa: number | null;
}

export type FitGrade =
  | "EXCEPTIONAL"
  | "STRONG"
  | "ADEQUATE"
  | "WEAK"
  | "POOR"
  | "UNQUALIFIED";

export function scoreToGrade(score: number): FitGrade {
  if (score >= 90) return "EXCEPTIONAL";
  if (score >= 75) return "STRONG";
  if (score >= 60) return "ADEQUATE";
  if (score >= 40) return "WEAK";
  if (score >= 20) return "POOR";
  return "UNQUALIFIED";
}

export interface ScoreBreakdown {
  overall: number;
  tech: number;
  experience: number;
  projects: number;
  education: number;
  culture: number;
}

export interface ScoreJustification {
  tech: string;
  experience: string;
  projects: string;
  education: string;
  culture: string;
}

export interface SkillItem {
  name: string;
  years: number;
  level: number;
}

export interface ExperienceItem {
  title: string;
  company: string;
  startYear: number;
  endYear: number | null;
  durationYears: number;
  matchPercentage: number;
  description: string;
}

export interface RedFlag {
  type: string; // "employment_gap" | "job_hopping" | "unverifiable_claim" | "inconsistent_dates"
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

export interface SalaryEstimate {
  min: number;
  max: number;
  currency: string;
  confidence: "HIGH" | "LOW";
  reasoning: string;
}

export interface CultureSignals {
  positive: string[];
  negative: string[];
}

export interface ExtractionStatus {
  personalInfo: boolean;
  education: boolean;
  experience: boolean;
  skills: boolean;
  projects: boolean;
}

export interface AnalysisResult {
  // candidate identity
  candidateName: string;
  contact: ContactDetails;
  education: EducationItem[];
  totalExperienceYears: number;

  // target
  targetRole: string; // The job title being targeted

  // scores
  scores: ScoreBreakdown;
  scoreJustification: ScoreJustification;
  recommendation: "HIRE" | "CONSIDER" | "REJECT";
  hireRecommendation: boolean;

  // synthesis
  summary: string;
  shortlistSummary: string;
  keyVectors: string[];

  // skills + experience
  skills: SkillItem[];
  experience: ExperienceItem[];

  // recruiter intelligence
  redFlags: RedFlag[];
  suggestedInterviewQuestions: string[];
  salaryEstimate: SalaryEstimate;
  cultureSignals: CultureSignals;

  // verification
  extractionStatus: ExtractionStatus;
}

export interface ReportMetadata {
  id: string;
  jobId: string;
  candidateName: string;
  targetRole: string;
  jobRole: string;
  date: string;
  createdAt: string;
  lastUpdated: string;
}

export interface AnalysisData {
  overallScore: number;
  status: "HIRE" | "CONSIDER" | "REJECT";
  categories: {
    technical: number;
    experience: number;
    education: number;
    culture: number;
  };
  skills: {
    name: string;
    score: number;
  }[];
  parsingVerification: {
    personalInfo: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
  };
  reasoning: string[];
}
