import type { CultureSignals } from "@/types/report";
import { SectionHeader } from "@/components/shared";
import { SparklesIcon } from "@/constants/icons";

interface CultureSignalsCardProps {
  signals: CultureSignals;
}

export function CultureSignalsCard({ signals }: CultureSignalsCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Culture Signals" icon={SparklesIcon} />

      {/* Positive signals */}
      {signals.positive.length > 0 && (
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/50 block mb-3">
            Positive Indicators
          </span>
          <div className="flex flex-wrap gap-2">
            {signals.positive.map((signal, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {signal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Negative signals */}
      {signals.negative.length > 0 && (
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-400/50 block mb-3">
            Concerns
          </span>
          <div className="flex flex-wrap gap-2">
            {signals.negative.map((signal, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-red-400" />
                {signal}
              </span>
            ))}
          </div>
        </div>
      )}

      {signals.positive.length === 0 && signals.negative.length === 0 && (
        <p className="text-xs text-white/40 font-light py-4">
          No culture signals extracted.
        </p>
      )}
    </div>
  );
}
