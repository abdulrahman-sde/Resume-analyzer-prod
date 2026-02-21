import { AnalysisResult } from "@/types/report";
import { scoreToGrade } from "@/types/report";
import { RadialChart } from "@/components/shared";
import { Badge } from "@/components/ui";
import { CATEGORY_META, GRADE_META } from "@/constants/report-ui";

interface ScoreOverviewProps {
  analysis: AnalysisResult;
}

export function ScoreOverview({ analysis }: ScoreOverviewProps) {
  const scoreCategories = ["experience", "projects", "tech", "education"];

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <div className="text-center border-b border-white/5 pb-8 mb-6">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
          Fit Probability
        </h3>
        <RadialChart
          score={analysis.scores.overall}
          label="Overall Match"
          color="text-indigo-400"
        />
        <div className="mt-8">
          <Badge variant={getStatusVariant(analysis.recommendation)} size="lg">
            {analysis.recommendation}
          </Badge>
        </div>
      </div>

      {/* Per-category scores with mini bars */}
      <div className="space-y-3">
        {scoreCategories.map((key) => {
          const score =
            (analysis.scores as unknown as Record<string, number>)[key] ?? 0;
          const meta = CATEGORY_META[key];
          const grade = scoreToGrade(score);
          return (
            <div key={key} className="flex items-center gap-3">
              <span
                className={`text-[9px] font-mono uppercase tracking-widest w-16 shrink-0 ${meta.accent}`}
              >
                {meta.label}
              </span>
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${meta.barColor} transition-all duration-700`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span
                className={`text-xs font-light tabular-nums w-7 text-right ${GRADE_META[grade].simpleTextColor}`}
              >
                {score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getStatusVariant(status: string): "success" | "warning" | "error" {
  if (status === "HIRE") return "success";
  if (status === "CONSIDER") return "warning";
  return "error";
}
