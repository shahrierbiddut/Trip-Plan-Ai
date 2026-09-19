"use client";

import {
  ACCOMMODATION_OPTIONS,
  ACTIVITY_OPTIONS,
  FOOD_PREFERENCE_OPTIONS,
  TRANSPORT_OPTIONS,
  TRAVEL_PACE_OPTIONS,
} from "@/data/config/tripPlanOptions";
import type {
  AccommodationType,
  ActivityTag,
  FoodPreference,
  TransportMode,
  TravelPace,
} from "@/types/tripPlan";
import ToggleChip from "@/components/plan-trip/shared/ToggleChip";

interface PreferenceSelectorProps {
  accommodation: AccommodationType | null;
  foodPreferences: FoodPreference[];
  transport: TransportMode | null;
  activities: ActivityTag[];
  travelPace: TravelPace;
  onChange: (patch: Partial<{
    accommodation: AccommodationType | null;
    foodPreferences: FoodPreference[];
    transport: TransportMode | null;
    activities: ActivityTag[];
    travelPace: TravelPace;
  }>) => void;
}

export default function PreferenceSelector({
  accommodation,
  foodPreferences,
  transport,
  activities,
  travelPace,
  onChange,
}: PreferenceSelectorProps) {
  const toggleFood = (id: FoodPreference) => {
    onChange({
      foodPreferences: foodPreferences.includes(id)
        ? foodPreferences.filter((entry) => entry !== id)
        : [...foodPreferences, id],
    });
  };

  const toggleActivity = (id: ActivityTag) => {
    onChange({
      activities: activities.includes(id) ? activities.filter((entry) => entry !== id) : [...activities, id],
    });
  };

  return (
    <div className="space-y-7">
      <section>
        <p className="text-[12px] font-bold text-[#26382F]">Accommodation</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ACCOMMODATION_OPTIONS.map((option) => (
            <ToggleChip
              key={option.id}
              label={option.label}
              selected={accommodation === option.id}
              onClick={() => onChange({ accommodation: option.id })}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="text-[12px] font-bold text-[#26382F]">Food</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FOOD_PREFERENCE_OPTIONS.map((option) => (
            <ToggleChip
              key={option.id}
              label={option.label}
              icon={option.icon}
              selected={foodPreferences.includes(option.id)}
              onClick={() => toggleFood(option.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="text-[12px] font-bold text-[#26382F]">Transport</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TRANSPORT_OPTIONS.map((option) => (
            <ToggleChip
              key={option.id}
              label={option.label}
              icon={option.icon}
              selected={transport === option.id}
              onClick={() => onChange({ transport: option.id })}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="text-[12px] font-bold text-[#26382F]">Activities</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ACTIVITY_OPTIONS.map((option) => (
            <ToggleChip
              key={option.id}
              label={option.label}
              icon={option.icon}
              selected={activities.includes(option.id)}
              onClick={() => toggleActivity(option.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="text-[12px] font-bold text-[#26382F]">Travel Pace</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {TRAVEL_PACE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange({ travelPace: option.id })}
              aria-pressed={travelPace === option.id}
              className={`rounded-xl border p-3 text-left transition-all ${
                travelPace === option.id
                  ? "border-[#F4A934] bg-[#073D31] text-white shadow-[0_8px_20px_rgba(7,61,49,0.18)]"
                  : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
              }`}
            >
              <p className="text-[12px] font-bold">{option.label}</p>
              <p className={`mt-0.5 text-[10px] ${travelPace === option.id ? "text-white/70" : "text-[#687873]"}`}>
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
