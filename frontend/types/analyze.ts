export type AnalyzeStep = 1 | 2 | 3;

export interface UploadState {
  file: File | null;
  isDragging: boolean;
}

export interface JobContext {
  title: string;
  description: string;
}
