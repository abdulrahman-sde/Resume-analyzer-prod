import type { RedFlag } from "@/types/report";
import { AlertTriangleIcon } from "@/constants/icons";
import { SectionHeader } from "@/components/shared";

interface RedFlagsCardProps {
  redFlags: RedFlag[];
}

const severityStyles: Record<string, string> = {
  HIGH: "border-red-500/40 bg-red-500/5 text-red-400",
  MEDIUM: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400",
  LOW: "border-white/10 bg-white/[0.03] text-white/50",
};

const severityDot: Record<string, string> = {
  HIGH: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
  MEDIUM: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]",
  LOW: "bg-white/30",
};

export function RedFlagsCard({ redFlags }: RedFlagsCardProps) {
  if (redFlags.length === 0) {
    return (
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
        <SectionHeader title="Red Flags" icon={AlertTriangleIcon} />
        <div className="flex items-center gap-3 py-6 px-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-sm text-emerald-400 font-light">
            No red flags detected — clean profile
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Red Flags" icon={AlertTriangleIcon} />
      <div className="space-y-3">
        {redFlags.map((flag, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-5 ${severityStyles[flag.severity]}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityDot[flag.severity]}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                    {flag.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider">
                    {flag.severity}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-light opacity-80">
                  {flag.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
