import { Suspense } from "react";
import Link from "next/link";
import { JobCard, EmptyState } from "@/components/dashboard";
import { BriefcaseIcon, PlusIcon } from "@/constants/icons";
import { fetchJobs } from "@/lib/data";
import { JobsGridSkeleton } from "@/components/skeletons";

async function JobsContent() {
  const jobs = await fetchJobs();

  return (
    <>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BriefcaseIcon}
          title="No jobs yet"
          description="Create your first job posting to start analyzing resumes."
          actionLabel="Create Job"
          actionHref="/dashboard/jobs/create"
        />
      )}
    </>
  );
}

export default function JobsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
              <BriefcaseIcon className="w-4 h-4 text-white/60" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
              Job Board
            </span>
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            My <span className="text-white/40">Jobs</span>
          </h1>
        </div>

        <Link
          href="/dashboard/jobs/create"
          className="h-10 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          <PlusIcon className="w-4 h-4" />
          Create Job
        </Link>
      </div>

      {/* Grid */}
      <Suspense fallback={<JobsGridSkeleton />}>
        <JobsContent />
      </Suspense>
    </div>
  );
}
