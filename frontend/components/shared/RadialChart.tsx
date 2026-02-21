interface RadialChartProps {
  score: number;
  label: string;
  color?: string;
}

export function RadialChart({
  score,
  label,
  color = "text-emerald-400",
}: RadialChartProps) {
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`absolute inset-0 blur-xl opacity-20 bg-current ${color}`}
      />
      <svg className="transform rotate-90 w-48 h-48">
        <circle
          cx="90"
          cy="90"
          r="80"
          stroke="currentColor"
          strokeWidth="18"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="90"
          cy="90"
          r="80"
          stroke="currentColor"
          strokeWidth="18"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={`text-3xl font-bold tracking-tighter ${color} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        >
          {score}%
        </span>
        <span className="text-[10px] uppercase font-medium text-white/40 tracking-widest mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
