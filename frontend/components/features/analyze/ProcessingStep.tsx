export function ProcessingStep() {
  return (
    <div className="flex-1 rounded-[22px] bg-black/40 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Scan Line Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent w-full h-[50%] animate-[scan_2s_ease-in-out_infinite]" />

      <div className="relative z-10 text-center space-y-8">
        <div className="w-24 h-24 mx-auto relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin-reverse" />
        </div>
        <div>
          <h3 className="text-xl font-light text-white mb-2">
            Analyzing Vectors
          </h3>
          <div className="flex flex-col items-center gap-1 text-[10px] font-mono text-indigo-400/60 uppercase tracking-widest">
            <span>Parsing Structure...</span>
            <span>Mapping Keywords...</span>
            <span>Calculating Fit...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
