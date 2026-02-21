import { HistoryRecord } from "@/types/history";

export const MOCK_HISTORY_DATA: HistoryRecord[] = [
  {
    id: "1",
    candidateName: "Alex Jensen",
    jobRole: "Senior Full Stack Engineer",
    date: "2024-05-15",
    score: 87,
    status: "CONSIDER",
  },
  {
    id: "2",
    candidateName: "Sarah Connor",
    jobRole: "Lead Security Analyst",
    date: "2024-05-14",
    score: 94,
    status: "HIRE",
  },
  {
    id: "3",
    candidateName: "John Smith",
    jobRole: "Product Manager",
    date: "2024-05-12",
    score: 45,
    status: "REJECT",
  },
  {
    id: "4",
    candidateName: "Emily Blunt",
    jobRole: "UX Designer",
    date: "2024-05-10",
    score: 72,
    status: "CONSIDER",
  },
  {
    id: "5",
    candidateName: "Michael Chen",
    jobRole: "DevOps Engineer",
    date: "2024-05-08",
    score: 91,
    status: "HIRE",
  },
];

export function getStatusColor(status: string): string {
  switch (status) {
    case "HIRE":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    case "REJECT":
      return "text-red-400 bg-red-500/10 border-red-500/30";
    default:
      return "text-amber-400 bg-amber-500/10 border-amber-500/30";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-400";
  if (score >= 70) return "text-indigo-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}
