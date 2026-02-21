"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createAnalysisAction } from "@/lib/actions";

export function useCreateAnalysis() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedJobId = searchParams.get("job") || "";

  const [selectedJobId, setSelectedJobId] = useState(preselectedJobId);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const isValid = Boolean(selectedJobId && file);

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
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!isValid || !file) return;
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_id", selectedJobId);

    const result = await createAnalysisAction(formData);

    if (result.error) {
      setError(result.error);
      setIsProcessing(false);
      return;
    }

    router.push(`/dashboard/analysis/${result.analysisId}`);
  };

  return {
    selectedJobId,
    setSelectedJobId,
    file,
    setFile,
    isDragging,
    fileInputRef,
    isProcessing,
    isValid,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    startAnalysis,
  };
}
