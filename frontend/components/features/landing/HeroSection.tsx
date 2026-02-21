import Link from "next/link";
import { UploadIcon, ZapIcon } from "@/constants/icons";

export function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-indigo-300 mb-8 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        AI TALENT INTELLIGENCE v2.1 NOW LIVE
      </div>

      <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
        Decide Faster with <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-teal-400 font-bold text-glow">
          Precision Recruiting
        </span>
      </h1>

      <p className="max-w-2xl text-lg text-white/50 mb-12 leading-relaxed">
        ATS Pro replaces gut instinct with data. Parse resumes, match skills,
        and generate hiring recommendations in seconds—not hours.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/dashboard"
          className="h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-3 transition-all shadow-[0_0_40px_rgba(99,102,241,0.4)] group"
        >
          <UploadIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          <span>Go to Dashboard</span>
        </Link>
        <button className="h-14 px-8 rounded-full border border-white/10 hover:border-white/20 bg-black/20 hover:bg-white/5 text-white font-medium backdrop-blur-md transition-all flex items-center gap-2">
          <ZapIcon className="w-5 h-5 text-yellow-500" />
          <span>View Sample Report</span>
        </button>
      </div>
    </div>
  );
}
