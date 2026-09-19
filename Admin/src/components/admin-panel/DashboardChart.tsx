"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    trips: 42,
  },
  {
    month: "Feb",
    trips: 58,
  },
  {
    month: "Mar",
    trips: 76,
  },
  {
    month: "Apr",
    trips: 63,
  },
  {
    month: "May",
    trips: 91,
  },
  {
    month: "Jun",
    trips: 108,
  },
  {
    month: "Jul",
    trips: 126,
  },
  {
    month: "Aug",
    trips: 142,
  },
];

export default function DashboardChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="tripGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#16a34a"
                stopOpacity={0.3}
              />

              <stop
                offset="100%"
                stopColor="#16a34a"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#9ca3af",
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#9ca3af",
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#86efac",
              strokeWidth: 1,
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #dcfce7",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
            labelStyle={{
              color: "#374151",
              fontWeight: 600,
              marginBottom: "4px",
            }}
            formatter={(value) => [
              `${value} trips`,
              "Trips",
            ]}
          />

          <Area
            type="monotone"
            dataKey="trips"
            stroke="#16a34a"
            strokeWidth={3}
            fill="url(#tripGradient)"
            dot={{
              r: 4,
              fill: "#16a34a",
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
            activeDot={{
              r: 6,
              fill: "#16a34a",
              stroke: "#ffffff",
              strokeWidth: 3,
            }}
            animationDuration={1800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}