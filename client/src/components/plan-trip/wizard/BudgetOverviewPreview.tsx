"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUDGET_TIER_OPTIONS } from "@/data/config/tripPlanOptions";
import type { BudgetTier } from "@/types/tripPlan";
import BudgetDonut from "@/components/plan-trip/shared/BudgetDonut";

const PREVIEW_SPLIT = [
  { label: "Accommodation", percent: 35, color: "#073D31" },
  { label: "Transport", percent: 25, color: "#F4A934" },
  { label: "Food", percent: 15, color: "#087F5B" },
  { label: "Activities", percent: 15, color: "#D9861F" },
  { label: "Other", percent: 10, color: "#66736D" },
];

interface BudgetOverviewPreviewProps {
  budgetTier: BudgetTier;
  customBudget: number | null;
  days: number;
  travelers: number;
}

export default function BudgetOverviewPreview({ budgetTier, customBudget, days, travelers }: BudgetOverviewPreviewProps) {
  const tierBaseline = BUDGET_TIER_OPTIONS.find((tier) => tier.id === budgetTier)?.perDayBdt ?? 4500;
  const total = customBudget ?? tierBaseline * Math.max(1, days) * Math.max(1, travelers);

  return (
    <div className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.05)]">
      <p className="font-serif text-[16px] font-bold text-[#12342D]">Budget Overview</p>

      <div className="mt-4 flex items-center gap-4">
        <BudgetDonut
          segments={PREVIEW_SPLIT}
          centerLabel={`৳${Math.round(total).toLocaleString("en-US")}`}
          centerSubLabel="Total Budget"
        />
        <ul className="flex-1 space-y-1.5">
          {PREVIEW_SPLIT.map((category) => (
            <li key={category.label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-[#30483F]">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
                {category.label}
              </span>
              <span className="font-semibold text-[#687873]">{category.percent}%</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/dashboard/budget"
        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:text-[#B86D1B]"
      >
        Manage Budget <ArrowRight size={13} />
      </Link>
    </div>
  );
}
