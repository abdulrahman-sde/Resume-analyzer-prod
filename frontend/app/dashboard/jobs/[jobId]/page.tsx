import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob, fetchAnalyses } from "@/lib/data";
import { AnalysisCard } from "@/components/dashboard/AnalysisCard";
import { ScanIcon, PlusIcon, ArrowRightIcon } from "@/constants/icons";
import { JobDetailSkeleton } from "@/components/skeletons";
import { Streamdown } from "streamdown";

interface PageProps {
  params: Promise<{ jobId: string }>;
}

async function JobDetailContent({ jobId }: { jobId: string }) {
  const [job, jobAnalyses] = await Promise.all([
    fetchJob(jobId),
    fetchAnalyses(jobId),
  ]);

  if (!job) notFound();

  const recentAnalyses = jobAnalyses.slice(0, 3);

  return (
    <div className="p-8 max-w-5xl">
      {/* Back Link */}
      <Link
        href="/dashboard/jobs"
        className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors mb-8"
      >
        ← Back to Jobs
      </Link>

      {/* Job Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-2">
            {job.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono text-white/30">
            <span>Created {job.createdAt}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-indigo-400/60">
              {jobAnalyses.length} analyses
            </span>
          </div>
        </div>

        <Link
          href={`/dashboard/analysis/create?job=${jobId}`}
          className="h-10 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] shrink-0"
        >
          <ScanIcon className="w-4 h-4" />
          Start New Analysis
        </Link>
      </div>

      {/* Description */}
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl mb-10">
        <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-4">
          Job Description
        </h2>
        <Streamdown className="text-white/70 leading-relaxed font-light">
          {job.description}
        </Streamdown>
      </div>

      {/* Recent Analyses */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
            Recent Analyses
          </h2>
          {jobAnalyses.length > 3 && (
            <Link
              href={`/dashboard/analysis?job=${jobId}`}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
            >
              Show All
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          )}
        </div>

        {recentAnalyses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAnalyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 mx-auto mb-4">
              <ScanIcon className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-white/30 text-sm mb-4">
              No resumes analyzed yet for this job.
            </p>
            <Link
              href={`/dashboard/analysis/create?job=${jobId}`}
              className="inline-flex h-10 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <PlusIcon className="w-4 h-4" />
              Analyze First Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function JobDetailPage({ params }: PageProps) {
  const { jobId } = await params;

  return (
    <Suspense fallback={<JobDetailSkeleton />}>
      <JobDetailContent jobId={jobId} />
    </Suspense>
  );
}
