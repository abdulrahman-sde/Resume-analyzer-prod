export function BackgroundAmbience() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-900/10 to-transparent opacity-50" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-500/5 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
}
