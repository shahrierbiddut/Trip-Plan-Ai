"use client";

import { Sparkles } from "lucide-react";

interface GenerateTripButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export default function GenerateTripButton({ disabled, onClick }: GenerateTripButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] py-3.5 text-[13px] font-bold text-[#17332A] shadow-[0_10px_26px_rgba(217,134,31,0.3)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
    >
      <Sparkles size={16} />
      Generate My Trip
    </button>
  );
}
