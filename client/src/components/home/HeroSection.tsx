"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, MessageCircle, Sparkles } from "lucide-react";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-b-[24px] bg-[#071A16]">
      {/* HERO BACKGROUND IMAGE */}

      <motion.div
        className="absolute inset-0 scale-[1.02]"
        animate={{ scale: [1.02, 1.06, 1.02] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/travel-planning-group.svg"
          alt="Beautiful mountain travel destination"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* READABILITY OVERLAYS */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-[#071A16]/38 to-black/58" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="absolute left-1/2 top-[10%] h-64 w-64 -translate-x-1/2 rounded-full bg-[#F4B942]/18 blur-[90px]" />
      <div className="absolute bottom-[8%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#087F5B]/20 blur-[100px]" />

      {/* CONTENT */}

      <div className="relative z-10 mx-auto min-h-[531px] max-w-[1440px] px-6 sm:px-10 lg:min-h-[601px] lg:px-16 xl:px-20">
        <div className="flex min-h-[531px] items-center justify-center pt-[101px] lg:min-h-[601px]">
          <div className="w-full max-w-[920px] py-14 text-center lg:py-16">
            {/* AI BADGE */}

            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: revealEase }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#071A16]/45 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <motion.span
                animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
                className="inline-flex"
              >
                <Sparkles size={13} strokeWidth={2.3} className="text-[#E6A735]" />
              </motion.span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/88 sm:text-[11px]">
                Plan your group trip,together
              </span>
            </motion.div>

            {/* HERO HEADING */}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: revealEase }}
              className="mx-auto max-w-[920px] [font-family:Georgia,'Times_New_Roman',serif] text-[43px] font-normal leading-[0.98] tracking-[-0.045em] text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.28)] sm:text-[55px] lg:text-[66px]"
            >
              The Free Group 
              <br />
              <span className="text-white">
                Trip Planner-Plan Together,{" "}
                <span className="bg-gradient-to-r from-[#FFD078] via-[#F4AD3F] to-[#DF8425] bg-clip-text italic text-transparent [filter:drop-shadow(0_2px_12px_rgba(244,173,63,0.22))]">
                  Decide Together.
                </span>
              </span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: revealEase }}
              className="mx-auto mt-5 max-w-[530px] text-[13px] font-medium leading-[1.7] tracking-[-0.005em] text-white/78 [text-shadow:0_2px_12px_rgba(0,0,0,0.24)] sm:text-[15px]"
            >
              TripPlan AI crafts personalized itineraries, smart recommendations,
              and unforgettable experiences—just for you.
            </motion.p>

            {/* HERO ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.32, ease: revealEase }}
              className="mx-auto mb-20 mt-8 flex w-full max-w-[540px] flex-col gap-3 rounded-[22px] border border-white/25 bg-[#071A16]/52 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:flex-row"
            >
              <Link
                href="/destinations"
                className="flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-[#F6B84C] via-[#ECA23A] to-[#D88928] px-5 text-[15px] font-bold text-[#14211C] shadow-[0_8px_24px_rgba(229,151,43,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD078]"
              >
                <Compass size={19} aria-hidden="true" />
                Destinations
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("tripplan:open-ai-chat"))}
                className="flex min-h-14 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-[#FFD078]/55 bg-white/[0.08] px-5 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD078]"
              >
                <MessageCircle size={19} className="text-[#FFD078]" aria-hidden="true" />
                Ask AI
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE IMAGE OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-transparent sm:hidden" />
    </section>
  );
}