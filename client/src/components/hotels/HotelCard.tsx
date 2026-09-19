"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  GitCompareArrows,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatBdt } from "@/data/services/hotels";
import type { Hotel } from "@/types/hotel";

type HotelCardProps = {
  hotel: Hotel;
  nights?: number;
  selectedForCompare?: boolean;
  onToggleCompare?: (hotelId: string) => void;
};

export function HotelCard({
  hotel,
  nights = 3,
  selectedForCompare = false,
  onToggleCompare,
}: HotelCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem("tripplan-saved-hotels") ?? "[]") as string[];
    setSaved(savedHotels.includes(hotel.id));
  }, [hotel.id]);

  const total = useMemo(() => hotel.pricePerNight * nights, [hotel.pricePerNight, nights]);

  const toggleSave = () => {
    const savedHotels = JSON.parse(localStorage.getItem("tripplan-saved-hotels") ?? "[]") as string[];
    const next = savedHotels.includes(hotel.id)
      ? savedHotels.filter((id) => id !== hotel.id)
      : [...savedHotels, hotel.id];
    localStorage.setItem("tripplan-saved-hotels", JSON.stringify(next));
    setSaved(next.includes(hotel.id));
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-[26px] border border-[#dce7e2] bg-white shadow-[0_14px_36px_rgba(19,68,53,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(19,68,53,0.14)] md:grid md:grid-cols-[40%_60%]"
    >
      <div className="relative min-h-[235px] overflow-hidden">
        <img
          src={hotel.image}
          alt={`${hotel.name} exterior`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082c22]/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#eba42d] px-3 py-1.5 text-xs font-bold text-[#173a30] shadow-lg">
          <Star size={13} fill="currentColor" /> Best match
        </span>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-[#082c22]/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {hotel.category}-star hotel
        </span>
      </div>

      <div className="flex min-w-0 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-2xl font-semibold text-[#123c30]">
                {hotel.name}
              </h3>
              <BadgeCheck size={18} className="text-[#0a7a58]" aria-label="Verified hotel" />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#61756e]">
              <MapPin size={14} className="text-[#d18a1c]" />
              {hotel.area}, {hotel.destination}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleSave}
            className={`rounded-full border p-2.5 transition ${
              saved
                ? "border-[#e8a23a] bg-[#fff7e6] text-[#d88714]"
                : "border-[#dce7e2] text-[#587168] hover:border-[#e8a23a] hover:text-[#d88714]"
            }`}
            aria-label={saved ? "Remove from saved hotels" : "Save hotel"}
          >
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="rounded-xl bg-[#087653] px-3 py-2 text-lg font-bold text-white">
            {hotel.rating}
          </span>
          <span className="text-sm">
            <strong className="block text-[#183e33]">{hotel.ratingLabel}</strong>
            <span className="text-[#71817c]">{hotel.reviewCount.toLocaleString()} reviews</span>
          </span>
          <span className="h-9 w-px bg-[#dce7e2]" />
          <span className="text-sm text-[#3d5a51]">
            <strong className="block text-[#173b31]">{hotel.distanceToAttraction}</strong>
            {hotel.nearestAttraction}
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5d706a]">
          {hotel.shortReview}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full border border-[#dce7e2] bg-[#f8fbfa] px-3 py-1 text-xs font-medium text-[#426157]"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-[#e4ece9] pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onToggleCompare?.(hotel.id)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                selectedForCompare
                  ? "border-[#0a7555] bg-[#eaf6f2] text-[#0a7555]"
                  : "border-[#d8e3df] text-[#425f55] hover:border-[#0a7555]"
              }`}
            >
              <GitCompareArrows size={16} />
              {selectedForCompare ? "Selected" : "Compare"}
            </button>
          </div>

          <div className="flex items-end justify-between gap-4 sm:justify-end">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#173b31]">
                {formatBdt(hotel.pricePerNight)} <span className="font-normal text-[#71817c]">/ night</span>
              </p>
              <p className="font-serif text-2xl font-bold text-[#123c30]">
                {formatBdt(total)}
              </p>
              <p className="text-xs text-[#788983]">Total for {nights} nights</p>
            </div>
            <Link
              href={`/hotels/${hotel.slug}`}
              className="rounded-xl bg-[#075c43] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(7,92,67,0.2)] transition hover:bg-[#064d39]"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
