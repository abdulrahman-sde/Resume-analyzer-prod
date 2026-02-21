import { api } from "./api";

// ---------------------------------------------------------------------------
// Types matching backend response shapes (snake_case from Python)
// ---------------------------------------------------------------------------

export interface JobResponse {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface AnalysisResultData {
  candidate_name: string;
  contact: {
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
    extraction_confidence: "HIGH" | "LOW";
  };
  education: {
    degree: string;
    institution: string;
    graduation_year: number | null;
    gpa: number | null;
  }[];
  total_experience_years: number;
  target_role: string;
  scores: {
    overall: number;
    experience: number;
    projects: number;
    tech: number;
    education: number;
  };
  score_justification: {
    experience: string;
    projects: string;
    tech: string;
    education: string;
  };
  recommendation: "HIRE" | "CONSIDER" | "REJECT";
  summary: string;
  shortlist_summary: string;
  key_vectors: string[];
  skills: { name: string; years: number; level: number }[];
  experience: {
    title: string;
    company: string;
    start_year: number;
    end_year: number | null;
    duration_years: number;
    match_percentage: number;
    description: string;
  }[];
  red_flags: {
    type: string;
    description: string;
    severity: "HIGH" | "MEDIUM" | "LOW";
  }[];
  extraction_status: {
    personal_info: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
  };
}

export interface AnalysisResponse {
  id: number;
  resume_id: number;
  job_id: number | null;
  candidate_name: string;
  recommendation: "HIRE" | "CONSIDER" | "REJECT";
  overall_score: number;
  total_experience_years: number;
  analysis_result: AnalysisResultData;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Transformers: backend snake_case → frontend camelCase
// ---------------------------------------------------------------------------

import type { Job, Analysis } from "@/types/dashboard";
import type { AnalysisResult } from "@/types/report";

export function transformJob(j: JobResponse): Job {
  return {
    id: String(j.id),
    title: j.title,
    description: j.description,
    createdAt: new Date(j.created_at).toLocaleDateString("en-CA"),
    analysisCount: 0, // populated separately if needed
  };
}

export function transformAnalysisResult(r: AnalysisResultData): AnalysisResult {
  return {
    candidateName: r.candidate_name,
    contact: {
      email: r.contact.email,
      phone: r.contact.phone,
      location: r.contact.location,
      linkedin: r.contact.linkedin,
      github: r.contact.github,
      portfolio: r.contact.portfolio,
      extractionConfidence: r.contact.extraction_confidence,
    },
    education: r.education.map((e) => ({
      degree: e.degree,
      institution: e.institution,
      graduationYear: e.graduation_year,
      gpa: e.gpa,
    })),
    totalExperienceYears: r.total_experience_years,
    targetRole: r.target_role,
    scores: {
      overall: r.scores.overall,
      tech: r.scores.tech,
      experience: r.scores.experience,
      projects: r.scores.projects,
      education: r.scores.education,
      culture: 0,
    },
    scoreJustification: {
      tech: r.score_justification.tech,
      experience: r.score_justification.experience,
      projects: r.score_justification.projects,
      education: r.score_justification.education,
      culture: "",
    },
    recommendation: r.recommendation,
    hireRecommendation: r.recommendation === "HIRE",
    summary: r.summary,
    shortlistSummary: r.shortlist_summary,
    keyVectors: r.key_vectors,
    skills: r.skills.map((s) => ({
      name: s.name,
      years: s.years,
      level: s.level,
    })),
    experience: r.experience.map((e) => ({
      title: e.title,
      company: e.company,
      startYear: e.start_year,
      endYear: e.end_year,
      durationYears: e.duration_years,
      matchPercentage: e.match_percentage,
      description: e.description,
    })),
    redFlags: r.red_flags.map((f) => ({
      type: f.type,
      description: f.description,
      severity: f.severity,
    })),
    suggestedInterviewQuestions: [],
    salaryEstimate: {
      min: 0,
      max: 0,
      currency: "USD",
      confidence: "LOW",
      reasoning: "",
    },
    cultureSignals: { positive: [], negative: [] },
    extractionStatus: {
      personalInfo: r.extraction_status.personal_info,
      education: r.extraction_status.education,
      experience: r.extraction_status.experience,
      skills: r.extraction_status.skills,
      projects: r.extraction_status.projects,
    },
  };
}

export function transformAnalysis(
  a: AnalysisResponse,
  jobTitle?: string,
): Analysis {
  return {
    id: String(a.id),
    jobId: a.job_id ? String(a.job_id) : "",
    jobTitle: jobTitle || a.analysis_result.target_role,
    candidateName: a.candidate_name,
    fileName: "",
    score: a.overall_score,
    status: a.recommendation,
    date: new Date(a.created_at).toLocaleDateString("en-CA"),
    summary: a.analysis_result.summary,
    analysisData: transformAnalysisResult(a.analysis_result),
  };
}

// ---------------------------------------------------------------------------
// Data fetchers (server-side, called from server components)
// ---------------------------------------------------------------------------

export async function fetchJobs(): Promise<Job[]> {
  const jobs = await api<JobResponse[]>("/jobs");
  return jobs.map(transformJob);
}

export async function fetchJob(jobId: string): Promise<Job | null> {
  try {
    const job = await api<JobResponse>(`/jobs/${jobId}`);
    return transformJob(job);
  } catch {
    return null;
  }
}

export async function fetchAnalyses(jobId?: string): Promise<Analysis[]> {
  const query = jobId ? `?job_id=${jobId}` : "";
  const analyses = await api<AnalysisResponse[]>(`/analyses${query}`);

  return analyses.map((a) => transformAnalysis(a));
}

export async function fetchAnalysis(
  analysisId: string,
): Promise<Analysis | null> {
  try {
    const a = await api<AnalysisResponse>(`/analyses/${analysisId}`);
    return transformAnalysis(a);
  } catch {
    return null;
  }
}

export async function createJob(data: {
  title: string;
  description: string;
}): Promise<JobResponse> {
  return api<JobResponse>("/jobs", {
    method: "POST",
    body: data,
  });
}
