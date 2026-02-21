import { SkillItem } from "@/types/report";

interface RadarChartProps {
  data: SkillItem[];
}

export function RadarChart({ data }: RadarChartProps) {
  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const numPoints = data.length;

  if (numPoints < 3) return null;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = data
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.level);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full flex justify-center py-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {[20, 40, 60, 80, 100].map((level) => (
          <polygon
            key={level}
            points={data
              .map((_, i) => {
                const { x, y } = getCoordinates(i, level);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {data.map((_, i) => {
          const end = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={points}
          fill="rgba(20, 184, 166, 0.2)"
          stroke="#14b8a6"
          strokeWidth="2"
          className="drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]"
        />

        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, d.level);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#14b8a6"
              className="drop-shadow-[0_0_5px_rgba(20,184,166,0.8)]"
            />
          );
        })}

        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, 115);

          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="10"
              fill="rgba(255,255,255,0.6)"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono uppercase tracking-widest select-none"
            >
              <tspan x={x} dy="0">
                {d.name}
              </tspan>
              <tspan x={x} dy="12" fontSize="9" fill="rgba(255,255,255,0.3)">
                {d.years} yrs
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
