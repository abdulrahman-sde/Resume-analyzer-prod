import { Suspense } from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  BriefcaseIcon,
  ScanIcon,
  TargetIcon,
  ZapIcon,
  PlusIcon,
} from "@/constants/icons";
import { fetchJobs, fetchAnalyses } from "@/lib/data";
import { getSession } from "@/lib/auth";
import { DashboardOverviewSkeleton } from "@/components/skeletons";

async function DashboardContent() {
  const [session, jobs, analyses] = await Promise.all([
    getSession(),
    fetchJobs(),
    fetchAnalyses(),
  ]);

  const totalJobs = jobs.length;
  const totalAnalyses = analyses.length;
  const avgScore =
    analyses.length > 0
      ? Math.round(
          analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length,
        )
      : 0;
  const topScore =
    analyses.length > 0 ? Math.max(...analyses.map((a) => a.score)) : 0;

  const firstName = session?.full_name?.split(" ")[0] || "there";

  // Build recent activity from real data
  const recentActivity = [
    ...jobs.slice(0, 3).map((j) => ({
      id: `job-${j.id}`,
      type: "job_created" as const,
      title: `Created job: ${j.title}`,
      subtitle: j.description.slice(0, 80),
      timestamp: j.createdAt,
    })),
    ...analyses.slice(0, 3).map((a) => ({
      id: `analysis-${a.id}`,
      type: "analysis_completed" as const,
      title: `Analyzed: ${a.candidateName}`,
      subtitle: `${a.jobTitle} — Score: ${a.score}%`,
      timestamp: a.date,
    })),
  ]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 5);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
            Dashboard
          </span>
        </div>
        <h1 className="text-4xl font-extralight tracking-tight text-white">
          Welcome back, <span className="text-white/40">{firstName}</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Active Jobs" value={totalJobs} icon={BriefcaseIcon} />
        <StatCard
          label="Total Analyses"
          value={totalAnalyses}
          icon={ScanIcon}
        />
        <StatCard label="Avg. Score" value={`${avgScore}%`} icon={TargetIcon} />
        <StatCard label="Top Score" value={`${topScore}%`} icon={ZapIcon} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link
          href="/dashboard/jobs/create"
          className="group bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
              <PlusIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-white font-medium group-hover:text-indigo-300 transition-colors">
              Post a New Job
            </h3>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            Define a role and start analyzing resumes against it.
          </p>
        </Link>

        <Link
          href="/dashboard/analysis/create"
          className="group bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500/20 transition-colors">
              <ScanIcon className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-white font-medium group-hover:text-teal-300 transition-colors">
              Analyze a Resume
            </h3>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            Upload a candidate&apos;s CV and get an instant AI evaluation.
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-6">
          Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    activity.type === "job_created"
                      ? "bg-indigo-500"
                      : "bg-emerald-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70">{activity.title}</p>
                  <p className="text-xs text-white/30 truncate">
                    {activity.subtitle}
                  </p>
                </div>
                <span className="text-xs text-white/20 font-mono shrink-0">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/30 text-center py-8">
            No activity yet. Create a job or run an analysis to get started.
          </p>
        )}
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<DashboardOverviewSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
