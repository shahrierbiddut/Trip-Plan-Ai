"use client";

import { CalendarDays } from "lucide-react";
import { DURATION_CHIPS } from "@/data/config/tripPlanOptions";

interface DateSelectorProps {
  startDate: string | null;
  endDate: string | null;
  onChange: (startDate: string | null, endDate: string | null) => void;
}

function addDays(dateString: string, days: number): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${start.getDate()} – ${end.toLocaleDateString("en-US", options)}`;
}

export default function DateSelector({ startDate, endDate, onChange }: DateSelectorProps) {
  const today = new Date().toISOString().slice(0, 10);

  const days =
    startDate && endDate
      ? Math.max(1, Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1)
      : null;
  const nights = days ? Math.max(0, days - 1) : null;

  const applyDuration = (durationDays: number) => {
    const start = startDate ?? today;
    onChange(start, addDays(start, durationDays - 1));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="text-[12px] font-bold text-[#26382F]">
            Start Date
          </label>
          <div className="relative mt-2">
            <CalendarDays size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087F5B]" />
            <input
              id="start-date"
              type="date"
              min={today}
              value={startDate ?? ""}
              onChange={(event) => onChange(event.target.value || null, endDate)}
              className="h-12 w-full rounded-xl border border-[#DCE6E1] bg-[#FAFAF7] pl-11 pr-3 text-[13px] text-[#12342D] outline-none focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.08]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="end-date" className="text-[12px] font-bold text-[#26382F]">
            End Date
          </label>
          <div className="relative mt-2">
            <CalendarDays size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087F5B]" />
            <input
              id="end-date"
              type="date"
              min={startDate ?? today}
              value={endDate ?? ""}
              onChange={(event) => onChange(startDate, event.target.value || null)}
              className="h-12 w-full rounded-xl border border-[#DCE6E1] bg-[#FAFAF7] pl-11 pr-3 text-[13px] text-[#12342D] outline-none focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.08]"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-[12px] font-bold text-[#26382F]">Quick durations</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DURATION_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => applyDuration(chip.days)}
              className="rounded-full border border-[#DCE6E1] bg-white px-4 py-2 text-[12px] font-semibold text-[#30483F] transition-colors hover:border-[#087F5B]/40 hover:bg-[#EEF5F1]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {startDate && endDate && days !== null && (
        <div className="rounded-2xl border border-[#DCE6E1] bg-[#EEF5F1] p-4">
          <p className="text-[13px] font-bold text-[#12342D]">{formatRange(startDate, endDate)}</p>
          <p className="mt-1 text-[12px] text-[#687873]">
            {days} {days === 1 ? "Day" : "Days"} / {nights} {nights === 1 ? "Night" : "Nights"}
          </p>
        </div>
      )}
    </div>
  );
}
