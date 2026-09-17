"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, MapPinned, Sparkles, Wallet } from "lucide-react";

const revealEase = [0.22, 1, 0.36, 1] as const;

const FEATURE_PILLS = [
  { label: "AI-Powered Planning", icon: Sparkles },
  { label: "Bangladesh Focused", icon: MapPinned },
  { label: "Personalized Itinerary", icon: Compass },
  { label: "Optimized Budget", icon: Wallet },
];

export default function PlanningHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: revealEase }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#087F5B]">
            Plan Your Journey
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-[#12342D] sm:text-[42px] lg:text-[46px]">
            Plan a trip{" "}
            <span className="bg-gradient-to-r from-[#D98B26] via-[#F4A934] to-[#B8691B] bg-clip-text text-transparent">
              your way
            </span>
            , let AI handle the rest.
          </h1>
          <p className="mt-4 max-w-lg text-[13px] leading-6 text-[#687873] sm:text-[14px]">
            Create a personalized itinerary based on your destination, dates, budget and travel
            style.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {FEATURE_PILLS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6E1] bg-white px-3.5 py-2 text-[11px] font-semibold text-[#30483F] shadow-sm"
              >
                <Icon size={14} className="text-[#087F5B]" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: revealEase }}
          className="relative h-[220px] w-full overflow-hidden rounded-[24px] border border-white/60 shadow-[0_18px_44px_rgba(7,26,22,0.16)] sm:h-[260px]"
        >
          <Image
            src="/assets/Bandarban/images 2.jfif"
            alt="Misty mountain road through the hills of Bandarban"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFE0A2]">
              Featured Route
            </p>
            <p className="mt-0.5 font-serif text-[16px]">Bandarban hill roads</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
