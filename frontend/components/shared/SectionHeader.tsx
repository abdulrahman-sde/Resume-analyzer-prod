import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-8 mt-4">
      {Icon && <Icon className="w-5 h-5 text-indigo-400" />}
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
        {title}
      </h2>
    </div>
  );
}
