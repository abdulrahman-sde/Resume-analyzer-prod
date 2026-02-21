import { ClockIcon } from "@/constants/icons";

export function HistoryHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-white/60" />
          </div>
          <span className="text-xs font-mono text-white/40 tracking-wider">
            ARCHIVE
          </span>
        </div>
        <h1 className="text-4xl font-light text-white">
          Analysis <span className="text-white/40">History</span>
        </h1>
      </div>
    </div>
  );
}
