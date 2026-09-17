"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { FoodRecommendation } from "@/types/tripPlan";

interface FoodRecommendationsProps {
  food: FoodRecommendation[];
}

export default function FoodRecommendations({ food }: FoodRecommendationsProps) {
  return (
    <div>
      <h3 className="font-serif text-[18px] font-bold text-[#12342D]">Taste Your Destination</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {food.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[18px] border border-[#DCE6E1] bg-white shadow-[0_6px_18px_rgba(7,26,22,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(7,26,22,0.09)]"
          >
            <div className="relative h-28 w-full">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 260px" className="object-cover" />
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#073D31]/85 px-2 py-0.5 text-[9px] font-bold text-[#F4A934] backdrop-blur-sm">
                <Sparkles size={9} /> {item.aiMatch}%
              </span>
            </div>
            <div className="p-3">
              <p className="text-[12px] font-bold text-[#12342D]">{item.title}</p>
              <p className="mt-0.5 text-[10px] text-[#687873]">{item.type}</p>
              <p className="mt-1.5 text-[11px] leading-5 text-[#687873]">{item.description}</p>
              <p className="mt-1.5 text-[12px] font-bold text-[#087F5B]">{item.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
