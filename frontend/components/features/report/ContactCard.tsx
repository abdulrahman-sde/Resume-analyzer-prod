import type { ContactDetails } from "@/types/report";
import { SectionHeader } from "@/components/shared";
import { UserIcon } from "@/constants/icons";

interface ContactCardProps {
  contact: ContactDetails;
  candidateName: string;
  totalExperienceYears: number;
}

const linkEntries: {
  key: keyof ContactDetails;
  label: string;
  prefix?: string;
}[] = [
  { key: "email", label: "EMAIL", prefix: "mailto:" },
  { key: "phone", label: "PHONE", prefix: "tel:" },
  { key: "linkedin", label: "LINKEDIN", prefix: "https://" },
  { key: "github", label: "GITHUB", prefix: "https://" },
  { key: "portfolio", label: "PORTFOLIO", prefix: "https://" },
];

export function ContactCard({
  contact,
  candidateName,
  totalExperienceYears,
}: ContactCardProps) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <SectionHeader title="Candidate Profile" icon={UserIcon} />

      {/* Name + Location + Experience */}
      <div className="mb-6">
        <h3 className="text-2xl font-light text-white tracking-tight mb-1">
          {candidateName}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 font-mono">
          {contact.location && (
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              {contact.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-teal-400" />
            {totalExperienceYears} years experience
          </span>
        </div>
      </div>

      {/* Contact Links */}
      <div className="space-y-2.5">
        {linkEntries.map(({ key, label, prefix }) => {
          const value = contact[key];
          if (!value || key === "extractionConfidence") return null;
          return (
            <div
              key={key}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/3 border border-white/5 hover:bg-white/6 transition-colors group"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                {label}
              </span>
              {prefix ? (
                <a
                  href={`${prefix}${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400/80 hover:text-indigo-300 transition-colors font-mono truncate max-w-50"
                >
                  {value as string}
                </a>
              ) : (
                <span className="text-xs text-white/60 font-mono truncate max-w-50">
                  {value as string}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Extraction confidence */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">
          Extraction Confidence
        </span>
        <span
          className={`text-[10px] font-mono font-bold tracking-wider ${
            contact.extractionConfidence === "HIGH"
              ? "text-emerald-400"
              : "text-yellow-400"
          }`}
        >
          {contact.extractionConfidence}
        </span>
      </div>
    </div>
  );
}
