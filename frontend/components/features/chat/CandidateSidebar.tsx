import type { CandidateContext } from "@/types/chat";
import { getHighlightColor } from "@/constants/chat";

interface CandidateSidebarProps {
  context: CandidateContext;
}

export function CandidateSidebar({ context }: CandidateSidebarProps) {
  return (
    <div className="w-80 border-r border-zinc-900 bg-[#050505]/50 hidden lg:flex flex-col shrink-0">
      <div className="p-6 border-b border-zinc-900">
        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-lg font-medium text-white border border-zinc-800 mb-4">
          {context.name.charAt(0)}
        </div>
        <h2 className="text-lg font-medium text-white">{context.name}</h2>
        <p className="text-sm text-zinc-500">{context.role}</p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
            Match Score
          </span>
          <span className="text-2xl font-bold text-white">
            {context.matchScore}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
            Experience
          </span>
          <span className="text-xl font-medium text-white">
            {context.experience}
          </span>
        </div>

        <div className="pt-6 border-t border-zinc-900">
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
            Analysis Highlights
          </div>
          <ul className="space-y-2 text-sm text-zinc-400">
            {context.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${getHighlightColor(highlight.status)}`}
                />
                {highlight.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
