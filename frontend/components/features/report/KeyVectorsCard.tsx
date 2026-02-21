import { SectionHeader } from "@/components/shared";

interface KeyVectorsCardProps {
  keyVectors: string[];
  totalExperienceYears: number;
  targetRole: string;
}

function getSeniorityLabel(years: number): {
  label: string;
  color: string;
  tier: number;
} {
  if (years >= 8)
    return { label: "Senior / Lead", color: "text-emerald-400", tier: 4 };
  if (years >= 5)
    return { label: "Mid–Senior", color: "text-sky-400", tier: 3 };
  if (years >= 2)
    return { label: "Mid-Level", color: "text-yellow-400", tier: 2 };
  return { label: "Junior / Entry", color: "text-orange-400", tier: 1 };
}

export function KeyVectorsCard({
  keyVectors,
  totalExperienceYears,
  targetRole,
}: KeyVectorsCardProps) {
  const strengths = keyVectors.filter((v) =>
    v.toLowerCase().startsWith("strength:"),
  );
  const weaknesses = keyVectors.filter((v) =>
    v.toLowerCase().startsWith("weakness:"),
  );
  const other = keyVectors.filter(
    (v) =>
      !v.toLowerCase().startsWith("strength:") &&
      !v.toLowerCase().startsWith("weakness:"),
  );

  const seniority = getSeniorityLabel(totalExperienceYears);
  const tierBars = [1, 2, 3, 4];

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      {/* Header row */}
      <div className="flex items-start justify-between mb-6 pb-5 border-b border-white/5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-1">
            Candidate Intelligence
          </p>
          <h3 className="text-lg font-light text-white">{targetRole}</h3>
        </div>

        {/* Seniority Indicator */}
        <div className="text-right">
          <p className="text-[9px] font-mono uppercase tracking-widest text-white/25 mb-2">
            Seniority level
          </p>
          <div className="flex items-center gap-1.5 justify-end mb-1">
            {tierBars.map((t) => (
              <div
                key={t}
                className={`rounded-sm transition-all ${
                  t <= seniority.tier
                    ? `${seniority.color.replace("text-", "bg-")} opacity-90`
                    : "bg-white/10"
                }`}
                style={{ width: 8, height: t * 4 + 4 }}
              />
            ))}
          </div>
          <span className={`text-xs font-light ${seniority.color}`}>
            {seniority.label}
          </span>
          <p className="text-[9px] font-mono text-white/25 mt-0.5">
            {totalExperienceYears} yrs total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-500/60 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-emerald-500/40" />
              Strengths
            </p>
            <ul className="space-y-3">
              {strengths.map((v, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {v.replace(/^strength:\s*/i, "")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {weaknesses.length > 0 && (
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-red-500/60 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-red-500/40" />
              Concerns
            </p>
            <ul className="space-y-3">
              {weaknesses.map((v, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {v.replace(/^weakness:\s*/i, "")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Other (if vectors don't have Strength/Weakness prefix) */}
        {other.length > 0 && (
          <div className="md:col-span-2">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">
              Key Observations
            </p>
            <ul className="space-y-2">
              {other.map((v, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-indigo-500/50 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs text-white/65 font-light">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
