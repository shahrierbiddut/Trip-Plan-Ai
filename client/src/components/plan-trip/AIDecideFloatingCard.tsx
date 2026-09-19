"use client";

import { Sparkles } from "lucide-react";

interface AIDecideFloatingCardProps {
  onOpen: () => void;
}

export default function AIDecideFloatingCard({ onOpen }: AIDecideFloatingCardProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#F4A934]/30 bg-gradient-to-r from-[#FFF7E8] via-white to-[#EEF5F1] p-5 shadow-[0_10px_28px_rgba(217,134,31,0.08)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]">
          <Sparkles size={19} />
        </span>
        <div>
          <p className="font-serif text-[16px] font-bold text-[#12342D]">Not sure where to go?</p>
          <p className="text-[12px] text-[#687873]">
            Let TripPlan AI find the perfect destination for you.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-5 py-2.5 text-[12px] font-bold text-[#17332A] shadow-[0_8px_22px_rgba(217,134,31,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105"
      >
        Let AI Decide <Sparkles size={14} />
      </button>
    </div>
  );
}
