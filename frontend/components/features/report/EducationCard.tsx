import type { EducationItem } from "@/types/report";
import { SectionHeader } from "@/components/shared";

interface EducationCardProps {
  education: EducationItem[];
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Education" />
      <div className="space-y-5">
        {education.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 border-l-2 border-indigo-500/30 hover:border-indigo-400 transition-colors group"
          >
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <h4 className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
              {item.degree}
            </h4>
            <p className="text-xs text-white/50 font-mono mt-0.5">
              {item.institution}
            </p>
            <div className="flex items-center gap-4 mt-2">
              {item.graduationYear && (
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                  Class of {item.graduationYear}
                </span>
              )}
              {item.gpa !== null && item.gpa !== undefined && (
                <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
                  GPA {item.gpa.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
