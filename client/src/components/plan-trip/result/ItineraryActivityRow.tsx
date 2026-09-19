"use client";

import Image from "next/image";
import { Bus, Car, MapPin, Pencil, Plane, Train, UtensilsCrossed, Footprints } from "lucide-react";
import type { ItineraryActivity, TransportMode } from "@/types/tripPlan";

const TRAVEL_MODE_ICON: Record<TransportMode | "walk", typeof Bus> = {
  bus: Bus,
  train: Train,
  "private-car": Car,
  flight: Plane,
  mixed: Car,
  walk: Footprints,
};

interface ItineraryActivityRowProps {
  activity: ItineraryActivity;
  onEdit?: () => void;
}

export default function ItineraryActivityRow({ activity, onEdit }: ItineraryActivityRowProps) {
  const ModeIcon = activity.tag === "meal" ? UtensilsCrossed : TRAVEL_MODE_ICON[activity.travelMode ?? "walk"];

  return (
    <div className="flex gap-3 rounded-2xl border border-[#EEF5F1] bg-[#FAFAF7] p-3.5">
      <div className="flex w-16 shrink-0 flex-col items-center pt-0.5 text-center">
        <span className="text-[10px] font-bold text-[#087F5B]">{activity.time}</span>
        <span className="mt-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF5F1] text-[#087F5B]">
          <ModeIcon size={14} />
        </span>
      </div>

      {activity.image && (
        <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image src={activity.image} alt="" fill sizes="64px" className="object-cover" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-bold text-[#12342D]">{activity.title}</p>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${activity.title}`}
              className="shrink-0 rounded-full p-1 text-[#97A29C] transition-colors hover:bg-white hover:text-[#087F5B]"
            >
              <Pencil size={13} />
            </button>
          )}
        </div>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#687873]">
          <MapPin size={11} /> {activity.location}
        </p>
        <p className="mt-1 text-[11px] leading-5 text-[#687873]">{activity.description}</p>
        {activity.cost > 0 && (
          <p className="mt-1.5 text-[11px] font-bold text-[#087F5B]">
            ৳{activity.cost.toLocaleString("en-US")}
          </p>
        )}
      </div>
    </div>
  );
}
