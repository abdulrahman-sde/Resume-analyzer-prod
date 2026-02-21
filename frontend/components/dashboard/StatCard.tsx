import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
          <Icon className="w-5 h-5 text-white/40" />
        </div>
        {trend && (
          <span className="text-xs text-emerald-400 font-mono">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-light text-white mb-1">{value}</div>
      <div className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-mono">
        {label}
      </div>
    </div>
  );
}
