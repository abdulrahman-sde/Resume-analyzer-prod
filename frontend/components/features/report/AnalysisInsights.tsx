import type { ScoreBreakdown, ScoreJustification } from "@/types/report";
import { BrainIcon } from "@/constants/icons";
import { SectionHeader } from "@/components/shared";
import { CATEGORY_META } from "@/constants/report-ui";

interface AnalysisInsightsProps {
  summary: string;
  keyVectors: string[];
  scores: ScoreBreakdown;
  justification: ScoreJustification;
}

export function AnalysisInsights({
  summary,
  keyVectors,
  scores,
  justification,
}: AnalysisInsightsProps) {
  const categories = ["tech", "experience", "education"] as const;

  return (
    <section className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Analysis Synthesis" icon={BrainIcon} />

      {/* Summary */}
      <p className="font-light text-lg leading-relaxed text-white/90 mb-10 border-l-2 border-indigo-500 pl-6">
        {summary}
      </p>

      {/* Score Breakdown — horizontal bars */}
      <div className="space-y-5 mb-10">
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const score = scores[cat];
          const reason = justification[cat];

          return (
            <div key={cat} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{meta.icon}</span>
                  <span
                    className={`text-xs font-mono uppercase tracking-widest ${meta.accent}`}
                  >
                    {cat}
                  </span>
                </div>
                <span
                  className={`text-lg font-light tabular-nums ${meta.accent}`}
                >
                  {score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${meta.gradientBar} transition-all duration-700`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Justification text */}
              <p className="text-[11px] text-white/40 font-light leading-relaxed pl-7 group-hover:text-white/60 transition-colors">
                {reason}
              </p>
            </div>
          );
        })}
      </div>

      {/* Key Vectors */}
      <div className="border-t border-white/5 pt-8">
        <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-6">
          Key Vectors
        </h4>
        <div className="space-y-4">
          {keyVectors.map((point, i) => (
            <div key={i} className="flex gap-4 items-start group">
              <span className="font-mono text-xs text-indigo-500/50 mt-0.5 group-hover:text-indigo-400 transition-colors shrink-0">
                0{i + 1}
              </span>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
