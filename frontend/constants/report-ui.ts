import { FitGrade } from "@/types/report";

export const CATEGORY_META: Record<
  string,
  {
    label: string;
    accent: string;
    barColor: string;
    icon: string;
    weight: string;
    glow: string;
    gradientBar: string;
  }
> = {
  experience: {
    label: "Experience",
    accent: "text-indigo-400",
    barColor: "bg-indigo-500",
    icon: "💼",
    weight: "35%",
    glow: "bg-indigo-500",
    gradientBar: "bg-linear-to-r from-indigo-500/80 to-indigo-400/40",
  },
  projects: {
    label: "Projects",
    accent: "text-sky-400",
    barColor: "bg-sky-500",
    icon: "🗂️",
    weight: "25%",
    glow: "bg-sky-500",
    gradientBar: "bg-linear-to-r from-sky-500/80 to-sky-400/40",
  },
  tech: {
    label: "Technical Skills",
    accent: "text-teal-400",
    barColor: "bg-teal-500",
    icon: "⚡",
    weight: "25%",
    glow: "bg-teal-500",
    gradientBar: "bg-linear-to-r from-teal-500/80 to-teal-400/40",
  },
  education: {
    label: "Education",
    accent: "text-violet-400",
    barColor: "bg-violet-500",
    icon: "🎓",
    weight: "15%",
    glow: "bg-violet-500",
    gradientBar: "bg-linear-to-r from-violet-500/80 to-violet-400/40",
  },
};

export const GRADE_META: Record<
  FitGrade,
  {
    label: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    simpleTextColor: string;
  }
> = {
  EXCEPTIONAL: {
    label: "Exceptional",
    textColor: "text-emerald-300",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    simpleTextColor: "text-emerald-400",
  },
  STRONG: {
    label: "Strong",
    textColor: "text-sky-300",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    simpleTextColor: "text-sky-400",
  },
  ADEQUATE: {
    label: "Adequate",
    textColor: "text-yellow-300",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    simpleTextColor: "text-yellow-400",
  },
  WEAK: {
    label: "Weak",
    textColor: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    simpleTextColor: "text-orange-400",
  },
  POOR: {
    label: "Poor",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    simpleTextColor: "text-red-400",
  },
  UNQUALIFIED: {
    label: "Unqualified",
    textColor: "text-red-600",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-600/30",
    simpleTextColor: "text-red-600",
  },
};
