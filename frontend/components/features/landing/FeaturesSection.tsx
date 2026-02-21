import { FEATURES } from "@/constants/landing";
import { FeatureCard } from "./FeatureCard";

const FEATURE_BG_COLORS = [
  "bg-indigo-500/10",
  "bg-teal-500/10",
  "bg-emerald-500/10",
];

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-40" id="features">
      <div className="mb-16">
        <h2 className="text-3xl font-light mb-4 text-white">
          Identify the <span className="font-bold">Top 1%</span>
        </h2>
        <div className="h-1 w-20 bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            bgColorClass={FEATURE_BG_COLORS[index]}
          />
        ))}
      </div>
    </section>
  );
}
