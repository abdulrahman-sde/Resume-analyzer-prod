import { SectionHeader } from "@/components/shared";
import { BrainIcon } from "@/constants/icons";

interface InterviewQuestionsCardProps {
  questions: string[];
}

export function InterviewQuestionsCard({
  questions,
}: InterviewQuestionsCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Suggested Interview Questions" icon={BrainIcon} />
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div
            key={i}
            className="flex gap-4 items-start p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-indigo-500/20 transition-all group"
          >
            <div className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <span className="text-[10px] font-mono text-indigo-400 font-bold">
                Q{i + 1}
              </span>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed group-hover:text-white/90 transition-colors pt-0.5">
              {q}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
