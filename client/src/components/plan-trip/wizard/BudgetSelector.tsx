"use client";

import { Sparkles } from "lucide-react";
import { BUDGET_TIER_OPTIONS } from "@/data/config/tripPlanOptions";
import type { BudgetTier } from "@/types/tripPlan";

const PREVIEW_SPLIT: { label: string; percent: number; color: string }[] = [
  { label: "Accommodation", percent: 35, color: "#073D31" },
  { label: "Transport", percent: 25, color: "#F4A934" },
  { label: "Food", percent: 15, color: "#087F5B" },
  { label: "Activities", percent: 15, color: "#D9861F" },
  { label: "Other", percent: 10, color: "#66736D" },
];

interface BudgetSelectorProps {
  budgetTier: BudgetTier;
  customBudget: number | null;
  days: number;
  travelers: number;
  onChange: (budgetTier: BudgetTier, customBudget: number | null) => void;
}

export default function BudgetSelector({ budgetTier, customBudget, days, travelers, onChange }: BudgetSelectorProps) {
  const tierBaseline = BUDGET_TIER_OPTIONS.find((tier) => tier.id === budgetTier)?.perDayBdt ?? 4500;
  const estimatedTotal = customBudget ?? tierBaseline * days * travelers;
  const sliderMin = 2000 * days * travelers;
  const sliderMax = 20000 * days * travelers;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {BUDGET_TIER_OPTIONS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => onChange(tier.id, null)}
            aria-pressed={budgetTier === tier.id && customBudget === null}
            className={`rounded-2xl border p-3.5 text-left transition-all ${
              budgetTier === tier.id && customBudget === null
                ? "border-[#F4A934] bg-[#073D31] text-white shadow-[0_8px_20px_rgba(7,61,49,0.18)]"
                : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
            }`}
          >
            <p className="text-[13px] font-bold">{tier.label}</p>
            <p className={`mt-0.5 text-[10px] ${budgetTier === tier.id && customBudget === null ? "text-white/70" : "text-[#687873]"}`}>
              {tier.description}
            </p>
            <p className="mt-2 text-[11px] font-semibold">৳{tier.perDayBdt.toLocaleString("en-US")}/day</p>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="custom-budget" className="text-[12px] font-bold text-[#26382F]">
            Or set a custom total budget
          </label>
          <span className="text-[13px] font-bold text-[#087F5B]">
            ৳{Math.round(estimatedTotal).toLocaleString("en-US")}
          </span>
        </div>
        <input
          id="custom-budget"
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={500}
          value={estimatedTotal}
          onChange={(event) => onChange(budgetTier, Number(event.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#DCE6E1] accent-[#087F5B]"
        />
      </div>

      <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] p-4">
        <p className="text-[12px] font-bold text-[#26382F]">Estimated allocation</p>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#EEF5F1]">
          <div className="flex h-full w-full">
            {PREVIEW_SPLIT.map((category) => (
              <span key={category.label} style={{ width: `${category.percent}%`, backgroundColor: category.color }} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-5">
          {PREVIEW_SPLIT.map((category) => (
            <div key={category.label} className="flex items-center gap-1.5 text-[10px] text-[#687873]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
              {category.label} {category.percent}%
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange("standard", null)}
        className="inline-flex items-center gap-2 rounded-full border border-[#087F5B]/30 bg-[#EEF5F1] px-4 py-2 text-[12px] font-bold text-[#087F5B] transition-colors hover:bg-[#DCEEE4]"
      >
        <Sparkles size={14} /> Optimize My Budget
      </button>
    </div>
  );
}
