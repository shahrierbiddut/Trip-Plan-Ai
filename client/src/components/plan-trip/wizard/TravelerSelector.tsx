"use client";

import { Minus, Plus, User, UserRound, Users } from "lucide-react";
import type { TravelerCounts, TravelerType } from "@/types/tripPlan";

const TRAVELER_TYPES: { id: TravelerType; label: string; icon: typeof User }[] = [
  { id: "Solo", label: "Solo", icon: User },
  { id: "Couple", label: "Couple", icon: UserRound },
  { id: "Family", label: "Family", icon: Users },
  { id: "Friends", label: "Friends", icon: Users },
];

interface TravelerSelectorProps {
  travelerType: TravelerType;
  travelers: TravelerCounts;
  onChange: (travelerType: TravelerType, travelers: TravelerCounts) => void;
}

export default function TravelerSelector({ travelerType, travelers, onChange }: TravelerSelectorProps) {
  const updateCount = (key: keyof TravelerCounts, delta: number) => {
    const min = key === "adults" ? 1 : 0;
    const nextValue = Math.max(min, travelers[key] + delta);
    onChange(travelerType, { ...travelers, [key]: nextValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[12px] font-bold text-[#26382F]">Who&apos;s traveling?</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TRAVELER_TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id, travelers)}
              aria-pressed={travelerType === id}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-xl border text-[12px] font-bold transition-all ${
                travelerType === id
                  ? "border-[#F4A934] bg-[#073D31] text-white shadow-[0_8px_20px_rgba(7,61,49,0.18)]"
                  : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
              }`}
            >
              <Icon size={16} className={travelerType === id ? "text-[#F4A934]" : "text-[#66736D]"} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            { key: "adults" as const, label: "Adults", hint: "Age 13+" },
            { key: "children" as const, label: "Children", hint: "Age 0–12" },
          ]
        ).map(({ key, label, hint }) => (
          <div key={key} className="flex items-center justify-between rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] p-4">
            <div>
              <p className="text-[13px] font-bold text-[#12342D]">{label}</p>
              <p className="text-[11px] text-[#687873]">{hint}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateCount(key, -1)}
                aria-label={`Decrease ${label.toLowerCase()}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#30483F] transition-colors hover:border-[#087F5B]/40 hover:text-[#087F5B]"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-[14px] font-bold text-[#12342D]">
                {travelers[key]}
              </span>
              <button
                type="button"
                onClick={() => updateCount(key, 1)}
                aria-label={`Increase ${label.toLowerCase()}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE6E1] bg-white text-[#30483F] transition-colors hover:border-[#087F5B]/40 hover:text-[#087F5B]"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
