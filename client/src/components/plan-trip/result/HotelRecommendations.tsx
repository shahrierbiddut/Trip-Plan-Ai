"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import type { HotelRecommendation } from "@/types/tripPlan";

interface HotelRecommendationsProps {
  hotels: HotelRecommendation[];
  onSelect: (hotelId: string) => void;
}

export default function HotelRecommendations({ hotels, onSelect }: HotelRecommendationsProps) {
  return (
    <div>
      <h3 className="font-serif text-[18px] font-bold text-[#12342D]">Recommended Stays</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`overflow-hidden rounded-[18px] border bg-white transition-all hover:-translate-y-0.5 ${
              hotel.selected
                ? "border-[#087F5B] shadow-[0_10px_26px_rgba(8,127,91,0.16)]"
                : "border-[#DCE6E1] shadow-[0_6px_18px_rgba(7,26,22,0.05)] hover:shadow-[0_12px_26px_rgba(7,26,22,0.09)]"
            }`}
          >
            <div className="relative h-36 w-full">
              <Image src={hotel.image} alt={hotel.name} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-[#073D31]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#F4A934] backdrop-blur-sm">
                AI Match {hotel.aiMatch}%
              </span>
            </div>
            <div className="p-3.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-bold text-[#12342D]">{hotel.name}</p>
                <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#D9861F]">
                  <Star size={12} fill="currentColor" /> {hotel.rating}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-[#687873]">
                <MapPin size={11} /> {hotel.location} · {hotel.category}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hotel.amenities.slice(0, 3).map((amenity) => (
                  <span key={amenity} className="rounded-full bg-[#EEF5F1] px-2 py-0.5 text-[10px] font-semibold text-[#30483F]">
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[13px] font-bold text-[#087F5B]">
                  ৳{hotel.pricePerNight.toLocaleString("en-US")}
                  <span className="text-[10px] font-medium text-[#687873]"> /night</span>
                </p>
                <button
                  type="button"
                  onClick={() => onSelect(hotel.id)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold transition-colors ${
                    hotel.selected
                      ? "bg-[#087F5B] text-white"
                      : "border border-[#DCE6E1] text-[#30483F] hover:border-[#087F5B]/40 hover:text-[#087F5B]"
                  }`}
                >
                  {hotel.selected ? "Selected" : "Select Hotel"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
