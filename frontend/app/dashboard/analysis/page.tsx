import { Suspense } from "react";
import Link from "next/link";
import { AnalysisCard, EmptyState, JobFilter } from "@/components/dashboard";
import { ScanIcon, PlusIcon } from "@/constants/icons";
import { fetchAnalyses, fetchJobs } from "@/lib/data";
import { AnalysesGridSkeleton } from "@/components/skeletons";

interface PageProps {
  searchParams: Promise<{ job?: string }>;
}

async function AnalysisContent({ jobFilter }: { jobFilter?: string }) {
  const [analyses, jobs] = await Promise.all([
    fetchAnalyses(jobFilter),
    fetchJobs(),
  ]);

  const selectedJobTitle = jobFilter
    ? jobs.find((j) => j.id === jobFilter)?.title
    : undefined;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <ScanIcon className="w-4 h-4 text-white/60" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
              Archive
            </span>
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Past <span className="text-white/40">Analyses</span>
          </h1>
          {selectedJobTitle && (
            <p className="text-sm text-indigo-400/60 mt-2 font-mono">
              Filtered by: {selectedJobTitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <JobFilter jobs={jobs} selectedJobId={jobFilter} />

          <Link
            href="/dashboard/analysis/create"
            className="h-10 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <PlusIcon className="w-4 h-4" />
            New Analysis
          </Link>
        </div>
      </div>

      {/* Grid */}
      {analyses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ScanIcon}
          title="No analyses found"
          description={
            jobFilter
              ? "No resumes analyzed for this job yet."
              : "Upload your first resume to get started."
          }
          actionLabel="New Analysis"
          actionHref="/dashboard/analysis/create"
        />
      )}
    </div>
  );
}

export default async function AnalysisPage({ searchParams }: PageProps) {
  const { job: jobFilter } = await searchParams;

  return (
    <Suspense fallback={<AnalysesGridSkeleton />}>
      <AnalysisContent jobFilter={jobFilter} />
    </Suspense>
  );
}
