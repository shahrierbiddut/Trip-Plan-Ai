"use client";

import { Pencil } from "lucide-react";
import type { DestinationData } from "@/types/destination-card";
import {
  BUDGET_TIER_OPTIONS,
  DESTINATION_REGION_LABELS,
  TRANSPORT_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
} from "@/data/config/tripPlanOptions";
import type { TripPlanFormState, WizardStepId } from "@/types/tripPlan";
import GenerateTripButton from "@/components/plan-trip/wizard/GenerateTripButton";

interface TripBlueprintProps {
  formState: TripPlanFormState;
  destination: DestinationData | null;
  days: number | null;
  nights: number | null;
  isValid: boolean;
  onEdit: (step: WizardStepId) => void;
  onGenerate: () => void;
}

function BlueprintRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/10 py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/50">{label}</p>
        <p className="mt-0.5 truncate text-[13px] font-semibold text-white">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${label.toLowerCase()}`}
        className="shrink-0 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-[#F4A934]"
      >
        <Pencil size={13} />
      </button>
    </div>
  );
}

export default function TripBlueprint({
  formState,
  destination,
  days,
  nights,
  isValid,
  onEdit,
  onGenerate,
}: TripBlueprintProps) {
  const styleLabel = formState.travelStyles.length
    ? formState.travelStyles
        .map((id) => TRAVEL_STYLE_OPTIONS.find((option) => option.id === id)?.label)
        .filter(Boolean)
        .join(", ")
    : "Not set";

  const budgetLabel = formState.customBudget
    ? `৳${formState.customBudget.toLocaleString("en-US")}`
    : `${BUDGET_TIER_OPTIONS.find((tier) => tier.id === formState.budgetTier)?.label ?? "Standard"} tier`;

  const transportLabel = formState.transport
    ? TRANSPORT_OPTIONS.find((option) => option.id === formState.transport)?.label ?? "Not set"
    : "Not set";

  const travelerCount = formState.travelers.adults + formState.travelers.children;

  return (
    <div className="rounded-[22px] bg-[#073D31] p-5 text-white shadow-[0_18px_44px_rgba(7,61,49,0.25)]">
      <div className="flex items-center justify-between">
        <p className="font-serif text-[16px] font-bold">Your Trip Blueprint</p>
      </div>

      <div className="mt-2">
        <BlueprintRow
          label="Destination"
          value={
            destination
              ? `${destination.name}, ${DESTINATION_REGION_LABELS[destination.slug] ?? destination.region}`
              : "Not selected"
          }
          onEdit={() => onEdit("destination")}
        />
        <BlueprintRow
          label="Dates"
          value={formState.startDate && formState.endDate ? `${formState.startDate} → ${formState.endDate}` : "Not set"}
          onEdit={() => onEdit("dates")}
        />
        <BlueprintRow
          label="Duration"
          value={days ? `${days} Days / ${nights} Nights` : "Not set"}
          onEdit={() => onEdit("dates")}
        />
        <BlueprintRow
          label="Travelers"
          value={`${formState.travelerType} · ${travelerCount} ${travelerCount === 1 ? "traveler" : "travelers"}`}
          onEdit={() => onEdit("travelers")}
        />
        <BlueprintRow label="Travel Style" value={styleLabel} onEdit={() => onEdit("style")} />
        <BlueprintRow label="Budget" value={budgetLabel} onEdit={() => onEdit("budget")} />
        <BlueprintRow label="Transport" value={transportLabel} onEdit={() => onEdit("preferences")} />
        <BlueprintRow
          label="Travel Pace"
          value={formState.travelPace[0].toUpperCase() + formState.travelPace.slice(1)}
          onEdit={() => onEdit("preferences")}
        />
      </div>

      <div className="mt-4 space-y-2.5">
        <GenerateTripButton disabled={!isValid} onClick={onGenerate} />
        <button
          type="button"
          onClick={() => onEdit("preferences")}
          className="w-full text-center text-[11px] font-semibold text-white/60 transition-colors hover:text-white"
        >
          ← Edit Preferences
        </button>
      </div>
    </div>
  );
}
