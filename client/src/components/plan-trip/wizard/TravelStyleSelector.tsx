"use client";

import { TRAVEL_STYLE_OPTIONS } from "@/data/config/tripPlanOptions";
import type { TravelStyleId } from "@/types/tripPlan";
import ToggleChip from "@/components/plan-trip/shared/ToggleChip";

interface TravelStyleSelectorProps {
  selected: TravelStyleId[];
  onChange: (selected: TravelStyleId[]) => void;
}

export default function TravelStyleSelector({ selected, onChange }: TravelStyleSelectorProps) {
  const toggle = (id: TravelStyleId) => {
    onChange(selected.includes(id) ? selected.filter((entry) => entry !== id) : [...selected, id]);
  };

  return (
    <div>
      <p className="text-[12px] text-[#687873]">Choose as many as you like — this shapes your itinerary.</p>
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {TRAVEL_STYLE_OPTIONS.map(({ id, label, icon }) => (
          <ToggleChip key={id} label={label} icon={icon} selected={selected.includes(id)} onClick={() => toggle(id)} />
        ))}
      </div>
    </div>
  );
}
