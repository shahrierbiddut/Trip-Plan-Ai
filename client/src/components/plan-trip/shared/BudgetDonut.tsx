"use client";

interface BudgetDonutSegment {
  label: string;
  percent: number;
  color: string;
}

interface BudgetDonutProps {
  segments: BudgetDonutSegment[];
  centerLabel: string;
  centerSubLabel?: string;
  size?: number;
}

export default function BudgetDonut({ segments, centerLabel, centerSubLabel, size = 132 }: BudgetDonutProps) {
  const strokeWidth = 16;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.reduce<{ segment: BudgetDonutSegment; dashLength: number; offset: number }[]>(
    (accumulated, segment) => {
      if (segment.percent <= 0) return accumulated;
      const cumulativePercent = accumulated.reduce((sum, arc) => sum + arc.segment.percent, 0);
      accumulated.push({
        segment,
        dashLength: (segment.percent / 100) * circumference,
        offset: circumference * (1 - cumulativePercent / 100),
      });
      return accumulated;
    },
    [],
  );

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEF5F1" strokeWidth={strokeWidth} />
        {arcs.map(({ segment, dashLength, offset }) => (
          <circle
            key={segment.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-bold text-[#12342D]">{centerLabel}</span>
        {centerSubLabel && <span className="text-[9px] text-[#687873]">{centerSubLabel}</span>}
      </div>
    </div>
  );
}
