import type { AnalyzeStep } from "@/types/analyze";

interface StepIndicatorProps {
  currentStep: AnalyzeStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="absolute top-8 flex items-center gap-4 text-xs font-mono tracking-widest text-white/30 z-20">
      <span className={currentStep >= 1 ? "text-indigo-400" : ""}>
        01 UPLOAD
      </span>
      <span className="w-8 h-px bg-white/10" />
      <span className={currentStep >= 2 ? "text-indigo-400" : ""}>
        02 CONTEXT
      </span>
      <span className="w-8 h-px bg-white/10" />
      <span className={currentStep >= 3 ? "text-indigo-400" : ""}>
        03 ANALYZE
      </span>
    </div>
  );
}
