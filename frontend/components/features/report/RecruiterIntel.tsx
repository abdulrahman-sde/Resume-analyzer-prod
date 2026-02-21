import type { RedFlag, SalaryEstimate, ExtractionStatus } from "@/types/report";

interface RecruiterIntelProps {
  redFlags: RedFlag[];
  salaryEstimate: SalaryEstimate;
  interviewQuestions: string[];
  extractionStatus: ExtractionStatus;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

const severityDot: Record<string, string> = {
  HIGH: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]",
  MEDIUM: "bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.4)]",
  LOW: "bg-white/30",
};

export function RecruiterIntel({
  redFlags,
  salaryEstimate,
  interviewQuestions,
  extractionStatus,
}: RecruiterIntelProps) {
  const midpoint =
    salaryEstimate.min + (salaryEstimate.max - salaryEstimate.min) / 2;

  return (
    <section className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
      {/* Section Title */}
      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-5 h-5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <span className="text-[10px]">🔍</span>
          </div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            Recruiter Intelligence
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ─── 1. Risk Assessment ─── */}
        <div className="p-8 border-b border-r border-white/5 md:border-b-0">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">
            Risk Assessment
          </h3>
          {redFlags.length === 0 ? (
            <div className="flex items-center gap-2 py-3 px-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-xs text-emerald-400/80 font-light">
                Clean profile — no flags
              </span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {redFlags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${severityDot[flag.severity]}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                        {flag.type.replace(/_/g, " ")}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold tracking-wider ${
                          flag.severity === "HIGH"
                            ? "text-red-400"
                            : flag.severity === "MEDIUM"
                              ? "text-yellow-400"
                              : "text-white/40"
                        }`}
                      >
                        {flag.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 font-light leading-relaxed">
                      {flag.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── 2. Salary Intelligence ─── */}
        <div className="p-8 border-r border-white/5">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">
            Salary Intelligence
          </h3>

          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xl font-light text-white tracking-tight">
              {formatCurrency(salaryEstimate.min, salaryEstimate.currency)}
              <span className="text-white/20 mx-1.5">—</span>
              {formatCurrency(salaryEstimate.max, salaryEstimate.currency)}
            </span>
            <span
              className={`text-[9px] font-mono font-bold tracking-wider ${
                salaryEstimate.confidence === "HIGH"
                  ? "text-emerald-400"
                  : "text-yellow-400"
              }`}
            >
              {salaryEstimate.confidence}
            </span>
          </div>

          {/* Bar */}
          <div className="relative h-1 w-full rounded-full bg-white/5 overflow-hidden mb-2">
            <div
              className="absolute h-full rounded-full bg-linear-to-r from-indigo-500/60 to-teal-500/60"
              style={{ left: "10%", width: "80%" }}
            />
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-[9px] font-mono text-white/20">
              {formatCurrency(salaryEstimate.min, salaryEstimate.currency)}
            </span>
            <span className="text-[9px] font-mono text-white/30">
              MID {formatCurrency(midpoint, salaryEstimate.currency)}
            </span>
            <span className="text-[9px] font-mono text-white/20">
              {formatCurrency(salaryEstimate.max, salaryEstimate.currency)}
            </span>
          </div>

          <p className="text-[11px] text-white/40 font-light leading-relaxed">
            {salaryEstimate.reasoning}
          </p>
        </div>

        {/* ─── 3. Interview Questions ─── */}
        <div className="p-8">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">
            Suggested Questions
          </h3>
          <div className="space-y-3">
            {interviewQuestions.map((q, i) => (
              <div key={i} className="flex gap-3 items-start group">
                <span className="shrink-0 w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold">
                    {i + 1}
                  </span>
                </span>
                <p className="text-xs text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors pt-0.5">
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Extraction Verification Strip ─── */}
      <div className="border-t border-white/5 px-8 py-3 flex items-center gap-6 overflow-x-auto">
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/20 shrink-0">
          Extraction
        </span>
        {Object.entries(extractionStatus).map(([key, verified]) => (
          <span key={key} className="flex items-center gap-1.5 shrink-0">
            <span
              className={`w-1 h-1 rounded-full ${
                verified
                  ? "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
                  : "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
              }`}
            />
            <span className="text-[9px] font-mono uppercase text-white/30">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
