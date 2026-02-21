"use client";

import { Suspense, use } from "react";
import { useCreateAnalysis } from "@/hooks/useCreateAnalysis";
import { ScanIcon, UploadIcon, FileIcon } from "@/constants/icons";
import Link from "next/link";
import type { Job } from "@/types/dashboard";

export function CreateAnalysisForm({
  jobsPromise,
}: {
  jobsPromise: Promise<Job[]>;
}) {
  const jobs = use(jobsPromise);
  const {
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
  } = useCreateAnalysis();

  if (isProcessing) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Scan line animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent w-full h-[50%] animate-[scan_2s_ease-in-out_infinite]" />

          <div className="relative z-10 text-center space-y-8">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin-reverse" />
            </div>
            <div>
              <h3 className="text-xl font-light text-white mb-2">
                Analyzing Vectors
              </h3>
              <div className="flex flex-col items-center gap-1 text-[10px] font-mono text-indigo-400/60 uppercase tracking-widest">
                <span>Parsing Structure...</span>
                <span>Mapping Keywords...</span>
                <span>Calculating Fit...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Back Link */}
      <Link
        href="/dashboard/analysis"
        className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Back to Analyses
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
              <ScanIcon className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
              New Scan
            </span>
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Analyze <span className="text-white/40">Resume</span>
          </h1>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl space-y-6">
          {/* Job Selector */}
          <div>
            <label className="text-xs text-white/60 font-mono mb-2 block uppercase tracking-wider">
              Select Job
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="" className="bg-zinc-900">
                Choose a job...
              </option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id} className="bg-zinc-900">
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Zone */}
          <div>
            <label className="text-xs text-white/60 font-mono mb-2 block uppercase tracking-wider">
              Upload Resume
            </label>
            <div
              className={`rounded-[22px] border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer relative group ${
                isDragging
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) =>
                  e.target.files?.[0] && setFile(e.target.files[0])
                }
                accept=".pdf,.docx"
              />

              {file ? (
                <div className="animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <FileIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg text-white font-light mb-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-emerald-400/60 font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • READY
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                    <UploadIcon className="w-7 h-7 text-white/40 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg text-white font-light">
                      Drop Resume Here
                    </h3>
                    <p className="text-sm text-white/40 mt-1">
                      Supports PDF & DOCX
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              onClick={startAnalysis}
              disabled={!isValid || isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <ScanIcon className="w-4 h-4" />
              Run Full Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
