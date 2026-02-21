import { CheckCircleIcon } from "@/constants/icons";

export function HeroVisual() {
  return (
    <div className="mt-20 relative w-full max-w-5xl  mx-auto aspect-video rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden group">
      {/* Top Bar */}
      <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
      </div>

      {/* Mock UI */}
      <div className="p-8 grid grid-cols-12 gap-8 h-full">
        <div className="col-span-4 space-y-4">
          <div className="h-32 rounded-lg bg-zinc-900 border border-white/5 p-4 space-y-2">
            <div className="h-2 w-1/3 bg-white/10 rounded" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
          </div>
          <div className="h-32 rounded-lg bg-zinc-900 border border-white/5 p-4 space-y-2 opacity-50">
            <div className="h-2 w-1/3 bg-white/10 rounded" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
          </div>
        </div>
        <div className="col-span-8 bg-zinc-900/50 rounded-lg border border-white/5 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-transparent" />
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">94%</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Strong Match
            </h3>
            <p className="text-white/40 text-sm">
              Based on deep analysis of 12 skill vectors.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/2 -right-5 -translate-y-1/2 bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-xl animate-float">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase font-mono">
              Recommendation
            </p>
            <p className="text-lg font-bold text-white">HIRE NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
}
