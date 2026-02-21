import type { SkillItem, ExperienceItem, EducationItem } from "@/types/report";
import { RadarChart } from "@/components/shared";

interface ProfileMatrixProps {
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export function ProfileMatrix({
  skills,
  experience,
  education,
}: ProfileMatrixProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ─── Skills Radar ─── */}
      <div className="lg:col-span-5 bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4 text-center">
          Skill Topology
        </h3>
        <RadarChart data={skills.slice(0, 5)} />
      </div>

      {/* ─── Experience + Education ─── */}
      <div className="lg:col-span-7 bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
        {/* Experience Timeline */}
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Experience Mapping
        </h3>

        <div className="relative pl-6 border-l border-white/10 space-y-6 ml-1 mb-8">
          {experience.map((item, index) => (
            <div key={index} className="relative group">
              <div
                className={`absolute -left-3.25 top-1 w-2.5 h-2.5 rounded-full bg-black border-2 ${
                  item.endYear === null
                    ? "border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                    : "border-white/20"
                }`}
              />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h4 className="text-sm font-light text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}{" "}
                  <span className="text-white/30">@ {item.company}</span>
                </h4>
                <span className="font-mono text-[10px] text-white/30">
                  {item.startYear}–{item.endYear || "Present"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-emerald-400/70">
                  {item.matchPercentage}% MATCH
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="border-t border-white/5 pt-6">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Education
          </h3>

          <div className="space-y-3">
            {education.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-light text-white truncate">
                    {item.degree}
                  </h4>
                  <p className="text-xs text-white/40 font-mono">
                    {item.institution}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {item.gpa !== null && item.gpa !== undefined && (
                    <span className="text-[10px] font-mono text-emerald-400/70">
                      GPA {item.gpa.toFixed(1)}
                    </span>
                  )}
                  {item.graduationYear && (
                    <span className="text-[10px] font-mono text-white/25">
                      {item.graduationYear}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
