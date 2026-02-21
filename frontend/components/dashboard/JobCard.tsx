import Link from "next/link";
import { ArrowRightIcon } from "@/constants/icons";
import type { Job } from "@/types/dashboard";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/dashboard/jobs/${job.id}`}>
      <div className="group relative bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <h3 className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors mb-2">
            {job.title}
          </h3>
          <p className="text-sm text-white/40 line-clamp-2 mb-6 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/20 font-mono">
                {job.createdAt}
              </span>
              {/* <span className="text-xs text-indigo-400/60 font-mono">
                {job.analysisCount} analyses
              </span> */}
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
