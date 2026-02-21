import { BrainIcon } from "@/constants/icons";
import { SectionHeader } from "@/components/shared";

interface AnalysisSynthesisProps {
  summary: string;
  keyVectors?: string[]; // kept for backward compat but no longer rendered here
}

export function AnalysisSynthesis({ summary }: AnalysisSynthesisProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Analysis Summary" icon={BrainIcon} />
      <p className="font-light text-base leading-relaxed text-white/80 border-l-2 border-indigo-500/60 pl-6">
        {summary}
      </p>
    </div>
  );
}
