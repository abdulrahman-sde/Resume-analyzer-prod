interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreCircle({
  score,
  size = "md",
  showLabel = true,
}: ScoreCircleProps) {
  const radius = size === "sm" ? 20 : size === "md" ? 30 : 40;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 90) return "stroke-emerald-400";
    if (score >= 70) return "stroke-indigo-400";
    if (score >= 50) return "stroke-amber-400";
    return "stroke-red-400";
  };

  const getTextColor = () => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 70) return "text-indigo-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const svgSize = radius * 2;
  const textSize =
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={svgSize} width={svgSize} className="transform -rotate-90">
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={getScoreColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${textSize} ${getTextColor()}`}>
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
