import { ExtractionStatus } from "@/types/report";
import { FileTextIcon, CheckCircleIcon, XCircleIcon } from "@/constants/icons";
import { SectionHeader } from "@/components/shared";

interface ParsingVerificationCardProps {
  verification: ExtractionStatus;
}

export function ParsingVerificationCard({
  verification,
}: ParsingVerificationCardProps) {
  return (
    <div className="bg-black/40 rounded-2xl p-6 font-mono text-xs leading-relaxed border border-white/5 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-3 flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/10" />
      </div>
      <SectionHeader title="System Log // Extraction" icon={FileTextIcon} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {Object.entries(verification).map(([key, verified]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b border-white/5 pb-2 hover:bg-white/5 transition-colors px-2 -mx-2 rounded"
          >
            <span className="uppercase text-white/50">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            {verified ? (
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="text-[10px] tracking-wider">VERIFIED</span>
                <CheckCircleIcon className="w-3 h-3" />
              </span>
            ) : (
              <span className="flex items-center gap-2 text-red-400">
                <span className="text-[10px] tracking-wider">FAILED</span>
                <XCircleIcon className="w-3 h-3" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
