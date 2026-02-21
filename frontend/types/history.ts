export interface HistoryRecord {
  id: string;
  candidateName: string;
  jobRole: string;
  date: string;
  score: number;
  status: "HIRE" | "CONSIDER" | "REJECT";
}
