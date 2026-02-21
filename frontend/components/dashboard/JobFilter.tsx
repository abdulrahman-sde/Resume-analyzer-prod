"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Job } from "@/types/dashboard";

interface JobFilterProps {
  jobs: Job[];
  selectedJobId?: string;
}

export function JobFilter({ jobs, selectedJobId }: JobFilterProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`/dashboard/analysis?job=${value}`);
    } else {
      router.push("/dashboard/analysis");
    }
  };

  return (
    <select
      value={selectedJobId || ""}
      onChange={handleChange}
      className="h-10 px-4 pr-10 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      <option value="" className="bg-zinc-900 text-white">
        All Jobs
      </option>
      {jobs.map((job) => (
        <option key={job.id} value={job.id} className="bg-zinc-900 text-white">
          {job.title}
        </option>
      ))}
    </select>
  );
}
