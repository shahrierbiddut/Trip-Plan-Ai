"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Sparkles, Users } from "lucide-react";

import { DESTINATION_REGION_LABELS } from "@/data/config/tripPlanOptions";
import type { GeneratedTrip, ResultTabId } from "@/types/tripPlan";

const TABS: { id: ResultTabId; label: string }[] = [
  { id: "itinerary", label: "Itinerary" },
  { id: "stay", label: "Stay" },
  { id: "food", label: "Food" },
  { id: "transport", label: "Transport" },
  { id: "budget", label: "Budget" },
  { id: "notes", label: "Notes" },
];

interface TripSummaryProps {
  trip: GeneratedTrip;
  activeTab: ResultTabId;
  onTabChange: (tab: ResultTabId) => void;
  onPlanNewTrip?: () => void;
}

export default function TripSummary({ trip, activeTab, onTabChange, onPlanNewTrip }: TripSummaryProps) {
  const travelerCount = trip.formState.travelers.adults + trip.formState.travelers.children;
  const heroImage = trip.destination.image;
  const region = DESTINATION_REGION_LABELS[trip.destination.slug] ?? trip.destination.region;

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#DCE6E1] bg-white shadow-[0_10px_30px_rgba(7,26,22,0.06)]">
      <div className="relative h-[190px] w-full sm:h-[230px]">
        <Image
          src={heroImage}
          alt={trip.destination.name}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/92 via-[#031D16]/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFE0A2]">
              <Sparkles size={13} /> Trip Ready
            </p>
            <h1 className="mt-1 font-serif text-[26px] font-bold leading-tight sm:text-[32px]">
              Your {trip.destination.name} Journey
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] font-semibold text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[#F4A934]" />
                {region}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="text-[#F4A934]" />
                {trip.days} Days · {trip.nights} Nights
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} className="text-[#F4A934]" />
                {travelerCount} {travelerCount === 1 ? "Traveler" : "Travelers"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4A934]/25 px-2.5 py-1 text-[#FFE0A2] backdrop-blur-sm">
                AI Match {trip.aiRecommendation.matchPercent}%
              </span>
            </div>
          </div>
          
          {onPlanNewTrip && (
            <button
              type="button"
              onClick={onPlanNewTrip}
              className="flex shrink-0 items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-[13px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <Sparkles size={14} /> Plan New Trip
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-[#DCE6E1] px-5 pt-1 sm:px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
            className={`shrink-0 border-b-2 px-3.5 py-2.5 text-[12px] font-bold transition-colors ${
              activeTab === tab.id
                ? "border-[#087F5B] text-[#087F5B]"
                : "border-transparent text-[#687873] hover:text-[#12342D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
