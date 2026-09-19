"use client";

import { Sparkles } from "lucide-react";
import type { BudgetBreakdown } from "@/types/tripPlan";
import BudgetDonut from "@/components/plan-trip/shared/BudgetDonut";

interface BudgetBreakdownPanelProps {
  budget: BudgetBreakdown;
  onOptimize: () => void;
}

export default function BudgetBreakdownPanel({ budget, onOptimize }: BudgetBreakdownPanelProps) {
  const remaining = budget.budgetLimit - budget.total;
  const usedPercent = Math.min(999, budget.usedPercent);

  return (
    <div>
      <h3 className="font-serif text-[18px] font-bold text-[#12342D]">Budget Breakdown</h3>

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
        <BudgetDonut
          segments={budget.categories.map((category) => ({
            label: category.label,
            percent: category.percent,
            color: category.color,
          }))}
          centerLabel={`৳${Math.round(budget.total).toLocaleString("en-US")}`}
          centerSubLabel="Total"
          size={148}
        />

        <div className="w-full flex-1 space-y-2">
          {budget.categories.map((category) => (
            <div key={category.label} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-2 text-[#30483F]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                {category.label}
              </span>
              <span className="font-bold text-[#12342D]">
                ৳{category.amount.toLocaleString("en-US")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#97A29C]">Total</p>
          <p className="mt-1 text-[13px] font-bold text-[#12342D]">
            ৳{Math.round(budget.total).toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#97A29C]">Budget</p>
          <p className="mt-1 text-[13px] font-bold text-[#12342D]">
            ৳{Math.round(budget.budgetLimit).toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#97A29C]">Remaining</p>
          <p className={`mt-1 text-[13px] font-bold ${remaining < 0 ? "text-[#D14A43]" : "text-[#087F5B]"}`}>
            ৳{Math.round(remaining).toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#687873]">
          <span>{usedPercent}% of budget used</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#EEF5F1]">
          <div
            className={`h-full rounded-full ${usedPercent > 100 ? "bg-[#D14A43]" : "bg-[#087F5B]"}`}
            style={{ width: `${Math.min(100, usedPercent)}%` }}
          />
        </div>
      </div>

      {budget.aiSuggestion && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[#F4A934]/30 bg-[#FFF7E8] p-3.5">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-[#D9861F]" />
          <p className="text-[11px] leading-5 text-[#7A5316]">{budget.aiSuggestion}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onOptimize}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#087F5B]/30 bg-[#EEF5F1] px-4 py-2 text-[12px] font-bold text-[#087F5B] transition-colors hover:bg-[#DCEEE4]"
      >
        <Sparkles size={14} /> Optimize My Budget
      </button>
    </div>
  );
}
