import { Badge } from "@/components/ui";

interface ShortlistSummaryCardProps {
  shortlistSummary: string;
  recommendation: "HIRE" | "CONSIDER" | "REJECT";
  hireRecommendation: boolean;
}

function getVariant(rec: string): "success" | "warning" | "error" {
  if (rec === "HIRE") return "success";
  if (rec === "CONSIDER") return "warning";
  return "error";
}

const recMeta: Record<
  string,
  {
    accentBorder: string;
    accentBg: string;
    decorColor: string;
    label: string;
    actionHint: string;
  }
> = {
  HIRE: {
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/4",
    decorColor: "bg-emerald-500",
    label: "Recommended for Hire",
    actionHint: "Move to interview stage",
  },
  CONSIDER: {
    accentBorder: "border-yellow-500/25",
    accentBg: "bg-yellow-500/4",
    decorColor: "bg-yellow-500",
    label: "Review Recommended",
    actionHint: "Screen call advised before advancing",
  },
  REJECT: {
    accentBorder: "border-red-500/25",
    accentBg: "bg-red-500/4",
    decorColor: "bg-red-500",
    label: "Not Recommended",
    actionHint: "Does not meet minimum requirements",
  },
};

export function ShortlistSummaryCard({
  shortlistSummary,
  recommendation,
  hireRecommendation,
}: ShortlistSummaryCardProps) {
  const meta = recMeta[recommendation];

  return (
    <div
      className={`rounded-3xl border shadow-2xl backdrop-blur-md overflow-hidden ${meta.accentBg} ${meta.accentBorder}`}
    >
      {/* Top accent bar */}
      <div className={`h-0.5 w-full ${meta.decorColor} opacity-60`} />

      <div className="p-8">
        {/* Label row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-1.5 h-1.5 rounded-full ${meta.decorColor} shadow-[0_0_8px_var(--tw-shadow-color)]`}
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
              {meta.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getVariant(recommendation)} size="sm">
              {recommendation}
            </Badge>
            {hireRecommendation && (
              <Badge variant="success" size="sm">
                ✓ RECOMMENDED
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-white/85 font-light leading-relaxed mb-5">
          {shortlistSummary}
        </p>

        {/* Action hint */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">
            Suggested action:
          </span>
          <span className="text-[9px] font-mono text-white/40">
            {meta.actionHint}
          </span>
        </div>
      </div>
    </div>
  );
}
