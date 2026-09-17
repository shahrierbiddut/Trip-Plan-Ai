"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { DestinationData } from "@/types/destination-card";

import { DESTINATION_REGION_LABELS } from "@/data/config/tripPlanOptions";

interface DestinationCardProps {
  destination: DestinationData;
  selected: boolean;
  onSelect: () => void;
}

export default function DestinationCard({ destination, selected, onSelect }: DestinationCardProps) {
  const heroImage = destination.image || destination.heroImage || "/assets/placeholder.jpg";
  const region = DESTINATION_REGION_LABELS[destination.slug] ?? destination.region;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${destination.name}: ${(destination.styles ?? []).join(", ")}`}
      className={`group relative h-[168px] overflow-hidden rounded-[18px] border-2 text-left transition-all ${
        selected
          ? "border-[#087F5B] shadow-[0_10px_28px_rgba(8,127,91,0.22)]"
          : "border-transparent hover:border-[#DCE6E1]"
      }`}
    >
      {heroImage ? (
        <Image
          src={heroImage}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 50vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a3a] to-[#087F5B]" />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#031D16]/90 via-black/10 to-transparent transition-colors ${
          selected ? "from-[#053D2C]/92" : ""
        }`}
      />

      {selected && (
        <span className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#087F5B] text-white shadow-[0_4px_10px_rgba(8,127,91,0.35)]">
          <Check size={13} />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <p className="truncate font-serif text-[15px] font-bold leading-tight">{destination.name}</p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#FFE0A2]">
          {region} · {destination.styles[0]}
        </p>
      </div>
    </button>
  );
}
