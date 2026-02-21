import { ScanIcon } from "@/constants/icons";
import type { JobContext } from "@/types/analyze";

interface ContextStepProps {
  jobContext: JobContext;
  onJobContextChange: (context: JobContext) => void;
  onBack: () => void;
  onAnalyze: () => void;
}

export function ContextStep({
  jobContext,
  onJobContextChange,
  onBack,
  onAnalyze,
}: ContextStepProps) {
  const isValid = jobContext.title.trim() && jobContext.description.trim();

  return (
    <div className="flex-1 rounded-[22px] bg-black/20 p-8 flex flex-col animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg text-white font-light">Target Profile</h2>
          <p className="text-xs text-white/40 font-mono mt-1">
            PASTE JOB DESCRIPTION OR KEYWORDS
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-white/40 hover:text-white transition-colors"
        >
          BACK
        </button>
      </div>

      <div className="space-y-4 flex flex-col flex-1">
        <div>
          <label className="text-xs text-white/60 font-mono mb-2 block uppercase">
            Job Title
          </label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
            placeholder="e.g. Senior Full Stack Engineer"
            value={jobContext.title}
            onChange={(e) =>
              onJobContextChange({ ...jobContext, title: e.target.value })
            }
            autoFocus
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-xs text-white/60 font-mono mb-2 block uppercase">
            Job Description / Requirements
          </label>
          <textarea
            className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none transition-all placeholder:text-white/20 font-mono leading-relaxed"
            placeholder="Paste the full job description or key requirements here..."
            value={jobContext.description}
            onChange={(e) =>
              onJobContextChange({ ...jobContext, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={!isValid}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          <ScanIcon className="w-4 h-4" />
          Run Full Diagnostics
        </button>
      </div>
    </div>
  );
}
