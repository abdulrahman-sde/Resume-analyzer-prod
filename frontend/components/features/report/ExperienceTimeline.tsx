import { ExperienceItem } from "@/types/report";
import { CheckCircleIcon } from "@/constants/icons";
import { SectionHeader } from "@/components/shared";

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Experience Mapping" icon={CheckCircleIcon} />
      <div className="relative pl-8 border-l border-white/10 space-y-10 ml-2">
        {experience.map((item, index) => (
          <div key={index} className="relative group">
            <div
              className={`absolute -left-9 top-1.5 w-3 h-3 rounded-full bg-black border-2 ${
                item.endYear === null
                  ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                  : "border-white/20"
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h4 className="text-lg font-light text-white group-hover:text-emerald-400 transition-colors">
                {item.title}{" "}
                <span className="text-white/30">@ {item.company}</span>
              </h4>
              <span className="font-mono text-xs text-white/40">
                {item.startYear} - {item.endYear || "Present"}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-white/10" />
              <span className="text-xs font-mono text-emerald-400">
                {item.matchPercentage}% MATCH
              </span>
            </div>
            <p className="text-sm text-white/60 font-light leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
