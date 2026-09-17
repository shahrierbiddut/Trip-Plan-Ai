"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { DestinationData } from "@/types/destination-card";

interface TrendingDestinationsProps {
  destinations: DestinationData[];
}

export default function TrendingDestinations({ destinations }: TrendingDestinationsProps) {
  const trending = destinations.filter((d) => d.trending).slice(0, 4);

  if (trending.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#17211D]">
          Trending Right Now
        </h2>
        <p className="text-[14px] text-[#66736D] mt-1 font-medium">
          Places travelers are discovering this season.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trending.map((destination) => (
          <Link
            key={destination.id}
            href={`/destinations/${destination.slug}`}
            className="group bg-white border border-[#E2E7E3] rounded-xl p-3 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <div className="absolute top-0 left-0 bg-[#F4A62A] text-[#0B2522] text-[8px] font-bold px-1.5 py-0.5 rounded-br-lg z-10 uppercase">
                Hot
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold text-[#17211D] truncate group-hover:text-[#087F5B] transition-colors">
                {destination.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={10} className="fill-[#F4A62A] text-[#F4A62A]" />
                  <span className="text-[11px] font-extrabold text-[#17211D]">{destination.rating}</span>
                </div>
                <span className="text-[11px] font-medium text-[#66736D]">
                  {destination.budget}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-full bg-[#F7F7F2] flex items-center justify-center text-[#087F5B] group-hover:bg-[#087F5B] group-hover:text-white transition-colors shrink-0">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
