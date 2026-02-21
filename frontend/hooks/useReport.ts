"use client";

import { useEffect, useState } from "react";
import { AnalysisData, ReportMetadata } from "@/types/report";
import { MOCK_ANALYSIS_DATA } from "@/constants/report";

export function useReport() {
  const [mounted, setMounted] = useState(false);
  const [metadata, setMetadata] = useState<ReportMetadata>({
    id: "rep_123456",
    jobId: "job_7890",
    candidateName: "Alex Jensen",
    targetRole: "Senior Full Stack Engineer",
    jobRole: "Senior Full Stack Engineer",
    date: new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });
  const [analysis] = useState<AnalysisData>(MOCK_ANALYSIS_DATA);

  useEffect(() => {
    setMounted(true);

    // Hydrate from Session Storage
    if (typeof window !== "undefined") {
      const storedName = sessionStorage.getItem("ats_resume_name");
      const storedRole = sessionStorage.getItem("ats_job_role");

      setMetadata((prev) => ({
        ...prev,
        candidateName: storedName
          ? storedName.replace(/\.[^/.]+$/, "")
          : prev.candidateName,
        jobRole: storedRole || prev.jobRole,
      }));
    }
  }, []);

  return {
    mounted,
    metadata,
    analysis,
  };
}
