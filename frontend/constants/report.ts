import { AnalysisData } from "@/types/report";

export const MOCK_ANALYSIS_DATA: AnalysisData = {
  overallScore: 87,
  status: "CONSIDER",
  categories: {
    technical: 92,
    experience: 85,
    education: 78,
    culture: 88,
  },
  skills: [
    { name: "React / Next.js", score: 98 },
    { name: "TypeScript", score: 95 },
    { name: "System Design", score: 82 },
    { name: "Cloud / AWS", score: 70 },
    { name: "GraphQL", score: 88 },
  ],
  parsingVerification: {
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
  },
  reasoning: [
    "Candidate demonstrates exceptional proficiency in the core stack (React, TypeScript).",
    "Experience timeline aligns well with the seniority required, showing 7+ years of progressive responsibility.",
    "Lack of explicit recent experience with AWS Lambda might be a gap for the serverless architecture migration planning.",
    "Strong background in performance optimization which is a key OKR for this quarter.",
  ],
};

export const STATUS_COLORS = {
  HIRE: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  CONSIDER: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  REJECT: "text-red-400 bg-red-500/10 border-red-500/30",
} as const;
