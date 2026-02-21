import { SkillItem } from "@/types/report";
import { RadarChart } from "@/components/shared";

interface SkillsRadarChartProps {
  skills: SkillItem[];
}

export function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4 text-center">
        Skill Topology
      </h3>
      <RadarChart data={skills.slice(0, 5)} />
    </div>
  );
}
