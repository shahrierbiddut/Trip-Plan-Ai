"use client";

import { LocateFixed, MapPin, Minus, Plus } from "lucide-react";
import type { Hotel } from "@/types/hotel";
import { formatBdt } from "@/data/services/hotels";

export function HotelMap({ hotels }: { hotels: Hotel[] }) {
  return (
    <section
      aria-label="Hotel map preview"
      className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-[#cfe0da] bg-[#d9ebe7] shadow-[0_18px_50px_rgba(12,62,49,0.1)] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(28deg, transparent 46%, rgba(255,255,255,.95) 47%, rgba(255,255,255,.95) 50%, transparent 51%), linear-gradient(118deg, transparent 45%, rgba(255,255,255,.85) 46%, rgba(255,255,255,.85) 49%, transparent 50%), linear-gradient(90deg, rgba(14,116,85,.06) 1px, transparent 1px), linear-gradient(rgba(14,116,85,.06) 1px, transparent 1px)",
          backgroundSize: "180px 180px, 240px 240px, 42px 42px, 42px 42px",
        }}
      />
      <div className="absolute -left-16 inset-y-0 w-[35%] rounded-r-[55%] bg-gradient-to-r from-[#6fc9de] to-[#a7dfeb] shadow-[inset_-12px_0_28px_rgba(255,255,255,0.45)]" />

      <div className="absolute left-[10%] top-[18%] rounded-full bg-[#087653] p-2 text-white shadow-lg">
        <MapPin size={18} />
      </div>
      <span className="absolute left-[8%] top-[26%] text-xs font-bold text-[#0d5b45]">
        Cox’s Bazar Beach
      </span>

      {hotels.slice(0, 5).map((hotel) => (
        <a
          key={hotel.id}
          href={`/hotels/${hotel.slug}`}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#e69b21] px-3 py-1.5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(88,62,13,0.25)] transition hover:z-20 hover:scale-110"
          style={{ left: `${hotel.coordinates.x}%`, top: `${hotel.coordinates.y}%` }}
          aria-label={`View ${hotel.name}, ${formatBdt(hotel.pricePerNight)} per night`}
        >
          {formatBdt(hotel.pricePerNight)}
        </a>
      ))}

      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          aria-label="Locate me"
          className="rounded-xl border border-white/70 bg-white/90 p-2.5 text-[#0b5c45] shadow-md backdrop-blur"
        >
          <LocateFixed size={18} />
        </button>
      </div>
      <div className="absolute bottom-4 right-4 grid overflow-hidden rounded-xl border border-white/70 bg-white/90 shadow-md backdrop-blur">
        <button type="button" aria-label="Zoom in" className="border-b border-[#dbe6e2] p-2.5">
          <Plus size={18} />
        </button>
        <button type="button" aria-label="Zoom out" className="p-2.5">
          <Minus size={18} />
        </button>
      </div>
      <p className="absolute bottom-4 left-4 rounded-lg bg-white/85 px-3 py-2 text-[11px] font-medium text-[#47645a] backdrop-blur">
        Map preview · connect your map provider later
      </p>
    </section>
  );
}