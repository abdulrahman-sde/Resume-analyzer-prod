import Link from "next/link";
import { BrainIcon, RefreshCwIcon } from "@/constants/icons";
import { ReportMetadata } from "@/types/report";
import { Button } from "@/components/ui";

interface ReportHeaderProps {
  metadata: ReportMetadata;
}

export function ReportHeader({ metadata }: ReportHeaderProps) {
  return (
    <header className="relative z-10 max-w-7xl mx-auto mb-12 border-b border-white/5 p-6 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            Talent Intelligence v2.4
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-2">
          Candidate <span className="text-white/40">Report</span>
        </h1>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="text-right font-mono text-xs leading-relaxed text-white/50 space-y-1">
          <p>
            <span className="text-indigo-400 mr-2">REF:</span>{" "}
            {metadata.candidateName}
          </p>
          <p>
            <span className="text-indigo-400 mr-2">TARGET:</span>{" "}
            {metadata.jobRole}
          </p>
          <p>
            <span className="text-indigo-400 mr-2">DATE:</span> {metadata.date}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/chat">
            <Button variant="primary" size="sm" icon={<BrainIcon />}>
              Ask Assistant
            </Button>
          </Link>
          <Link href="/analyze">
            <Button variant="outline" size="sm" icon={<RefreshCwIcon />}>
              New Analysis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
