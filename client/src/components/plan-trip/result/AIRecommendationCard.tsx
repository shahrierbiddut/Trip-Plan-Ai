"use client";

import { Check, Sparkles, X } from "lucide-react";
import type { AIRecommendation } from "@/types/tripPlan";

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
}

export default function AIRecommendationCard({ recommendation }: AIRecommendationCardProps) {
  return (
    <div className="rounded-[22px] border border-[#F4A934]/30 bg-gradient-to-br from-[#FFF7E8] via-white to-[#EEF5F1] p-5 shadow-[0_10px_30px_rgba(217,134,31,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]">
            <Sparkles size={16} />
          </span>
          <p className="font-serif text-[16px] font-bold text-[#12342D]">AI Recommendation</p>
        </div>
        <span className="text-[22px] font-bold text-[#D9861F]">{recommendation.matchPercent}%</span>
      </div>

      <ul className="mt-4 space-y-2">
        {recommendation.reasons.map((reason) => (
          <li key={reason.label} className="flex items-center gap-2 text-[12px] text-[#30483F]">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                reason.matched ? "bg-[#087F5B] text-white" : "bg-[#E2E7E3] text-[#97A29C]"
              }`}
            >
              {reason.matched ? <Check size={12} /> : <X size={12} />}
            </span>
            {reason.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
