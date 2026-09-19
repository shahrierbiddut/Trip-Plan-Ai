"use client";

import { useState } from "react";
import type { ItineraryDay } from "@/types/tripPlan";
import ItineraryActivityRow from "@/components/plan-trip/result/ItineraryActivityRow";

interface ItineraryTimelineProps {
  days: ItineraryDay[];
  onEditActivity?: (day: number, activityId: string) => void;
}

export default function ItineraryTimeline({ days, onEditActivity }: ItineraryTimelineProps) {
  const [activeDay, setActiveDay] = useState(days[0]?.day ?? 1);
  const currentDay = days.find((day) => day.day === activeDay) ?? days[0];

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day.day}
            type="button"
            onClick={() => setActiveDay(day.day)}
            aria-current={activeDay === day.day ? "page" : undefined}
            className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold transition-colors ${
              activeDay === day.day
                ? "border-[#087F5B] bg-[#073D31] text-white"
                : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
            }`}
          >
            Day {String(day.day).padStart(2, "0")}
          </button>
        ))}
      </div>

      {currentDay && (
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-[18px] font-bold text-[#12342D]">{currentDay.title}</h3>
            <span className="text-[11px] font-semibold text-[#687873]">
              ৳{currentDay.totalCost.toLocaleString("en-US")} for the day
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            {currentDay.activities.map((activity) => (
              <ItineraryActivityRow
                key={activity.id}
                activity={activity}
                onEdit={onEditActivity ? () => onEditActivity(currentDay.day, activity.id) : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
