import type { AnalysisResult } from "@/types/report";
import { RadialChart } from "@/components/shared";
import { Badge } from "@/components/ui";
import { CATEGORY_META } from "@/constants/report-ui";

interface CandidateHeroProps {
  analysis: AnalysisResult;
}

function getStatusVariant(status: string): "success" | "warning" | "error" {
  if (status === "HIRE") return "success";
  if (status === "CONSIDER") return "warning";
  return "error";
}

const contactLinks: {
  key: keyof AnalysisResult["contact"];
  label: string;
  prefix?: string;
}[] = [
  { key: "email", label: "EMAIL", prefix: "mailto:" },
  { key: "phone", label: "PHONE", prefix: "tel:" },
  { key: "linkedin", label: "LINKEDIN", prefix: "https://" },
  { key: "github", label: "GITHUB", prefix: "https://" },
  { key: "portfolio", label: "PORTFOLIO", prefix: "https://" },
];

export function CandidateHero({ analysis }: CandidateHeroProps) {
  const { contact, scores } = analysis;

  return (
    <section className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
      {/* ─── Top: Score + Identity ─── */}
      <div className="flex flex-col md:flex-row gap-8 p-8 pb-0">
        {/* Score Circle */}
        <div className="flex flex-col items-center shrink-0">
          <RadialChart
            score={scores.overall}
            label="Overall Match"
            color="text-indigo-400"
          />
          <div className="mt-4 flex items-center gap-2">
            <Badge
              variant={getStatusVariant(analysis.recommendation)}
              size="lg"
            >
              {analysis.recommendation}
            </Badge>
            {analysis.hireRecommendation && (
              <Badge variant="success" size="sm">
                ✓ REC
              </Badge>
            )}
          </div>
        </div>

        {/* Identity + Contact */}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-extralight text-white tracking-tight mb-1">
            {analysis.candidateName}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 font-mono mb-5">
            {contact.location && (
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                {contact.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-teal-400" />
              {analysis.totalExperienceYears} years experience
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {contact.extractionConfidence} confidence
            </span>
          </div>

          {/* Contact Links — horizontal compact */}
          <div className="flex flex-wrap gap-2 mb-6">
            {contactLinks.map(({ key, label, prefix }) => {
              const value = contact[key];
              if (!value || key === "extractionConfidence") return null;
              return prefix ? (
                <a
                  key={key}
                  href={`${prefix}${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-indigo-400/80 bg-indigo-500/8 border border-indigo-500/15 hover:bg-indigo-500/15 hover:text-indigo-300 transition-all"
                >
                  {label}
                </a>
              ) : (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-white/40 bg-white/3 border border-white/5"
                >
                  {label}
                </span>
              );
            })}
          </div>

          {/* Shortlist Summary */}
          <p className="text-sm text-white/70 font-light leading-relaxed border-l-2 border-indigo-500/40 pl-4">
            {analysis.shortlistSummary}
          </p>
        </div>
      </div>

      {/* ─── Sub-scores Bar ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-8 border-t border-white/5">
        {Object.entries(scores)
          .filter(([key]) => key !== "overall")
          .map(([key, value]) => {
            const meta = CATEGORY_META[key];
            return (
              <div
                key={key}
                className="relative text-center py-5 px-4 border-r border-white/5 last:border-r-0 group"
              >
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${meta.glow} opacity-20 group-hover:opacity-40 transition-opacity`}
                />
                <div className={`text-2xl font-light ${meta.accent} mb-0.5`}>
                  {value}
                </div>
                <div className="text-[9px] uppercase font-bold tracking-widest text-white/30">
                  {key}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
