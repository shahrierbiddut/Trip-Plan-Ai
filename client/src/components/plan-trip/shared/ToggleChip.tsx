"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface ToggleChipProps {
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export default function ToggleChip({ label, icon: Icon, selected, onClick }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-[13px] font-semibold transition-all ${
        selected
          ? "border-[#F4A934] bg-[#073D31] text-white shadow-[0_8px_20px_rgba(7,61,49,0.18)]"
          : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40 hover:bg-[#EEF5F1]"
      }`}
    >
      {Icon && <Icon size={16} className={selected ? "text-[#F4A934]" : "text-[#66736D]"} />}
      {label}
      {selected && <Check size={14} className="ml-auto text-[#F4A934]" />}
    </button>
  );
}
