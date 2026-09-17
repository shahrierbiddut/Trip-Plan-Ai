"use client";

import { Check } from "lucide-react";
import { WIZARD_STEPS } from "@/data/config/tripPlanOptions";
import type { WizardStepId } from "@/types/tripPlan";

interface PlanningProgressProps {
  currentStep: WizardStepId;
  onStepClick?: (step: WizardStepId) => void;
}

export default function PlanningProgress({ currentStep, onStepClick }: PlanningProgressProps) {
  const currentIndex = WIZARD_STEPS.findIndex((step) => step.id === currentStep);

  return (
    <div>
      {/* Desktop: full step row */}
      <ol className="hidden items-center gap-2 lg:flex">
        {WIZARD_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => (isDone || isActive) && onStepClick?.(step.id)}
                disabled={!isDone && !isActive}
                className="flex items-center gap-2 disabled:cursor-not-allowed"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                    isDone
                      ? "bg-[#087F5B] text-white"
                      : isActive
                        ? "bg-[#073D31] text-white ring-4 ring-[#F4A934]/25"
                        : "bg-[#EEF5F1] text-[#66736D]"
                  }`}
                >
                  {isDone ? <Check size={16} /> : String(step.index).padStart(2, "0")}
                </span>
                <span
                  className={`hidden text-[12px] font-semibold xl:inline ${
                    isActive ? "text-[#12342D]" : "text-[#687873]"
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {index < WIZARD_STEPS.length - 1 && (
                <span
                  className={`h-[2px] flex-1 rounded-full ${isDone ? "bg-[#F4A934]" : "bg-[#DCE6E1]"}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile/tablet: compact dot indicator */}
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#087F5B]">
          Step {currentIndex + 1} of {WIZARD_STEPS.length}
        </p>
        <p className="text-[12px] font-semibold text-[#12342D]">{WIZARD_STEPS[currentIndex]?.label}</p>
      </div>
      <div className="mt-2 flex gap-1.5 lg:hidden">
        {WIZARD_STEPS.map((step, index) => (
          <span
            key={step.id}
            className={`h-1.5 flex-1 rounded-full ${
              index <= currentIndex ? "bg-[#087F5B]" : "bg-[#DCE6E1]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
