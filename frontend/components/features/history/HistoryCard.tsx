"use client";

import { useRouter } from "next/navigation";
import { ScoreCircle } from "@/components/shared/ScoreCircle";
import { ArrowRightIcon } from "@/constants/icons";
import { getStatusColor } from "@/constants/history";
import type { HistoryRecord } from "@/types/history";

interface HistoryCardProps {
  record: HistoryRecord;
}

export function HistoryCard({ record }: HistoryCardProps) {
  const router = useRouter();

  const handleViewReport = () => {
    sessionStorage.setItem(
      "analysis-metadata",
      JSON.stringify({
        candidateName: record.candidateName,
        jobRole: record.jobRole,
        analysisDate: record.date,
      }),
    );
    router.push("/report");
  };

  return (
    <div
      onClick={handleViewReport}
      className="group relative bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors">
            {record.candidateName}
          </h3>
          <p className="text-sm text-white/40 mt-1 line-clamp-1">
            {record.jobRole}
          </p>
        </div>
        <ScoreCircle score={record.score} size="sm" />
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${getStatusColor(record.status)}`}
          >
            {record.status}
          </div>
          <span className="text-xs text-white/20 font-mono">{record.date}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <ArrowRightIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
}
