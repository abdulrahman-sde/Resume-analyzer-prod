import { FileTextIcon, TargetIcon, ZapIcon } from "./icons";
import { Feature, Testimonial } from "@/types/landing";

export const FEATURES: Feature[] = [
  {
    icon: FileTextIcon,
    title: "Deep Parsing",
    description:
      "Extracts hidden details from PDF/DOCX. We go beyond keywords to understand experience equivalency and career trajectory.",
    iconColor: "text-indigo-400",
    borderHoverColor: "hover:border-indigo-500/30",
  },
  {
    icon: TargetIcon,
    title: "Contextual Matching",
    description:
      "Maps candidate skills to your specific job requirements with semantic understanding of industry terminology and seniority.",
    iconColor: "text-teal-400",
    borderHoverColor: "hover:border-teal-500/30",
  },
  {
    icon: ZapIcon,
    title: "Instant Scoring",
    description:
      "Get a 0-100 fit score instantly. Prioritize high-potential candidates and reject unqualified ones with confidence.",
    iconColor: "text-emerald-400",
    borderHoverColor: "hover:border-emerald-500/30",
  },
];

export const TESTIMONIAL: Testimonial = {
  quote: "The AI doesn't just read resumes. It understands capability.",
  author: "Sarah Jenkins",
  role: "Head of Talent, CyberCorp",
  metric: "SAVED 15HRS/WEEK",
};

export const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
];
