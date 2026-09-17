"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Sparkles } from "lucide-react";

const revealEase = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  "Understanding your preferences",
  "Selecting destinations",
  "Finding suitable stays",
  "Building your itinerary",
  "Optimizing your budget",
  "Finding food experiences",
];

const STEP_DELAY_MS = 380;

interface AIGenerationStateProps {
  onComplete: () => void;
}

export default function AIGenerationState({ onComplete }: AIGenerationStateProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= STEPS.length) {
      const finishTimeout = setTimeout(onComplete, 400);
      return () => clearTimeout(finishTimeout);
    }
    const timeout = setTimeout(() => setActiveIndex((current) => current + 1), STEP_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [activeIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: revealEase }}
      className="mx-auto flex max-w-md flex-col items-center rounded-[24px] border border-[#DCE6E1] bg-white p-8 text-center shadow-[0_18px_44px_rgba(7,26,22,0.1)]"
    >
      <motion.span
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]"
      >
        <Sparkles size={24} />
      </motion.span>

      <h2 className="mt-5 font-serif text-[22px] font-bold text-[#12342D]">
        Creating your perfect trip…
      </h2>
      <p className="mt-1 text-[12px] text-[#687873]">This usually takes a few seconds.</p>

      <ul className="mt-6 w-full space-y-2.5 text-left">
        {STEPS.map((step, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <li key={step} className="flex items-center gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isDone ? "bg-[#087F5B] text-white" : isActive ? "bg-[#F4A934] text-[#17211D]" : "bg-[#EEF5F1] text-[#B7C2BC]"
                }`}
              >
                {isDone ? <Check size={12} /> : <Circle size={7} fill="currentColor" />}
              </span>
              <span className={`text-[12px] ${isDone || isActive ? "font-semibold text-[#12342D]" : "text-[#97A29C]"}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
