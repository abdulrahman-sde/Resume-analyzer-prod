"use client";

import { useCreateJob } from "@/hooks/useCreateJob";
import { BriefcaseIcon } from "@/constants/icons";
import Link from "next/link";

export default function CreateJobPage() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    isValid,
    isSubmitting,
    error,
    handleSubmit,
  } = useCreateJob();

  return (
    <div className="p-8">
      {/* Back Link */}
      <Link
        href="/dashboard/jobs"
        className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Back to Jobs
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <BriefcaseIcon className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
              New Position
            </span>
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Create <span className="text-white/40">Job</span>
          </h1>
        </div>

        {/* Form */}
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs text-white/60 font-mono mb-2 block uppercase tracking-wider">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs text-white/60 font-mono mb-2 block uppercase tracking-wider">
              Job Description / Requirements
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job description or key requirements here..."
              rows={10}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none transition-all placeholder:text-white/20 font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating…
                </>
              ) : (
                "Create Job"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
