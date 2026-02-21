import type { AnalysisResult } from "./report";

export interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  analysisCount: number;
}

export interface Analysis {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  fileName: string;
  score: number;
  status: "HIRE" | "CONSIDER" | "REJECT";
  date: string;
  summary: string;
  analysisData: AnalysisResult;
}

export interface RecentActivity {
  id: string;
  type: "job_created" | "analysis_completed";
  title: string;
  subtitle: string;
  timestamp: string;
}
