import { Feature } from "@/types/landing";

interface FeatureCardProps {
  feature: Feature;
  bgColorClass: string;
}

export function FeatureCard({ feature, bgColorClass }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className={`p-8 rounded-2xl bg-white/5 border border-white/5 ${feature.borderHoverColor} transition-colors group`}
    >
      <div
        className={`w-12 h-12 rounded-lg ${bgColorClass} flex items-center justify-center mb-6 group-hover:${bgColorClass.replace("/10", "/20")} transition-colors`}
      >
        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-white/50 leading-relaxed">{feature.description}</p>
    </div>
  );
}
