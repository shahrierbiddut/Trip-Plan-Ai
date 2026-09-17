"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface WizardStepShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNext?: boolean;
}

export default function WizardStepShell({
  title,
  description,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  hideNext,
}: WizardStepShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: revealEase }}
      className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.06)] sm:p-7"
    >
      <div>
        <h2 className="font-serif text-[22px] font-bold text-[#12342D] sm:text-[26px]">{title}</h2>
        {description && <p className="mt-1.5 text-[13px] text-[#687873]">{description}</p>}
      </div>

      <div className="mt-6">{children}</div>

      <div className="mt-8 flex items-center justify-between border-t border-[#DCE6E1] pt-5">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[#30483F] transition-colors hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {!hideNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-6 py-2.5 text-[13px] font-bold text-[#17332A] shadow-[0_8px_22px_rgba(217,134,31,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {nextLabel} <ArrowRight size={15} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
