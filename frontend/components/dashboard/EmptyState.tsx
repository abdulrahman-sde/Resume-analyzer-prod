import Link from "next/link";

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-6">
        <Icon className="w-8 h-8 text-white/20" />
      </div>
      <h3 className="text-lg font-light text-white/60 mb-2">{title}</h3>
      <p className="text-sm text-white/30 max-w-sm mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="h-10 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
