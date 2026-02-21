import type {
  ScoreBreakdown,
  ScoreJustification,
  FitGrade,
} from "@/types/report";
import { scoreToGrade } from "@/types/report";
import { SectionHeader } from "@/components/shared";
import { TargetIcon } from "@/constants/icons";
import { CATEGORY_META, GRADE_META } from "@/constants/report-ui";

interface ScoreJustificationCardProps {
  scores: ScoreBreakdown;
  justification: ScoreJustification;
}

export function ScoreJustificationCard({
  scores,
  justification,
}: ScoreJustificationCardProps) {
  const categories = ["experience", "projects", "tech", "education"] as const;

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Evaluation Breakdown" icon={TargetIcon} />

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20 shrink-0">
          Scoring weight
        </span>
        {categories
          .filter((c) => CATEGORY_META[c].weight !== "—")
          .map((cat) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-mono uppercase tracking-widest ${CATEGORY_META[cat].accent}`}
              >
                {CATEGORY_META[cat].label}
              </span>
              <span className="text-[9px] font-mono text-white/30">
                {CATEGORY_META[cat].weight}
              </span>
            </span>
          ))}
      </div>

      <div className="space-y-5">
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const score = scores[cat] ?? 0;
          const reason = justification[cat as keyof ScoreJustification] ?? "";
          const grade = scoreToGrade(score);
          const gradeStyle = GRADE_META[grade];

          return (
            <div
              key={cat}
              className={`rounded-2xl border p-5 transition-all hover:border-white/10 ${gradeStyle.bgColor} ${gradeStyle.borderColor}`}
            >
              {/* Row 1: Category + Score + Grade */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{meta.icon}</span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${meta.accent}`}
                  >
                    {meta.label}
                  </span>
                  {meta.weight !== "—" && (
                    <span className="text-[9px] font-mono text-white/20 border border-white/10 rounded px-1.5 py-0.5">
                      ×{meta.weight}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg border ${gradeStyle.textColor} ${gradeStyle.bgColor} ${gradeStyle.borderColor}`}
                  >
                    {gradeStyle.label}
                  </span>
                  <span
                    className={`text-2xl font-extralight tabular-nums ${gradeStyle.textColor}`}
                  >
                    {score}
                  </span>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full ${meta.barColor} transition-all duration-700`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Justification text */}
              <p className="text-sm leading-relaxed text-white/65 font-light">
                {reason}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
