"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AnalyzeStep, JobContext } from "@/types/analyze";

export function useAnalyze() {
  const router = useRouter();
  const [step, setStep] = useState<AnalyzeStep>(1);
  const [file, setFile] = useState<File | null>(null);
  const [jobContext, setJobContext] = useState<JobContext>({
    title: "",
    description: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Navigation handlers
  const goToNextStep = () => {
    if (step < 3) setStep((step + 1) as AnalyzeStep);
  };

  const goToPreviousStep = () => {
    if (step > 1) setStep((step - 1) as AnalyzeStep);
  };

  // Analysis handler
  const startAnalysis = () => {
    setStep(3);

    // Save to session storage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ats_resume_name", file?.name || "Candidate.pdf");
      sessionStorage.setItem(
        "ats_job_role",
        jobContext.title || "Senior Engineer",
      );
      sessionStorage.setItem("ats_job_desc", jobContext.description);
      sessionStorage.setItem("ats_timestamp", new Date().toISOString());
    }

    // Simulate processing and redirect
    setTimeout(() => {
      router.push("/report");
    }, 2500);
  };

  return {
    step,
    file,
    setFile,
    jobContext,
    setJobContext,
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    goToNextStep,
    goToPreviousStep,
    startAnalysis,
  };
}
