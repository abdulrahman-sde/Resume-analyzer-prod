import type { SalaryEstimate } from "@/types/report";
import { SectionHeader } from "@/components/shared";

interface SalaryEstimateCardProps {
  estimate: SalaryEstimate;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SalaryEstimateCard({ estimate }: SalaryEstimateCardProps) {
  const range = estimate.max - estimate.min;
  const midpoint = estimate.min + range / 2;

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Salary Intelligence" />

      {/* Range Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">
              Estimated Range
            </span>
            <span className="text-2xl font-light text-white tracking-tight">
              {formatCurrency(estimate.min, estimate.currency)}
              <span className="text-white/20 mx-2">—</span>
              {formatCurrency(estimate.max, estimate.currency)}
            </span>
          </div>
          <span
            className={`text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded-full border ${
              estimate.confidence === "HIGH"
                ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                : "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
            }`}
          >
            {estimate.confidence} CONF
          </span>
        </div>

        {/* Bar visualization */}
        <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="absolute h-full rounded-full bg-linear-to-r from-indigo-500/60 to-teal-500/60"
            style={{ left: "10%", width: "80%" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ left: "50%" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-mono text-white/20">
            {formatCurrency(estimate.min, estimate.currency)}
          </span>
          <span className="text-[9px] font-mono text-white/40">
            MID {formatCurrency(midpoint, estimate.currency)}
          </span>
          <span className="text-[9px] font-mono text-white/20">
            {formatCurrency(estimate.max, estimate.currency)}
          </span>
        </div>
      </div>

      {/* Reasoning */}
      <div className="pt-4 border-t border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">
          Reasoning
        </span>
        <p className="text-xs text-white/60 font-light leading-relaxed">
          {estimate.reasoning}
        </p>
      </div>
    </div>
  );
}
