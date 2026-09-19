"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  Clock3,
  Gem,
  MapPin,
  Search,
  Sparkles,
  WalletCards,
} from "lucide-react";

const popularDestinations = [
  "Cox's Bazar",
  "Sajek Valley",
  "Bandarban",
  "Saint Martin",
  "Sylhet",
];

const aiOptions = [
  {
    label: "Smart Itinerary",
    icon: CalendarCheck2,
    highlighted: true,
  },
  {
    label: "Budget Optimizer",
    icon: WalletCards,
    highlighted: false,
  },
  {
    label: "Best Time",
    icon: Clock3,
    highlighted: false,
  },
  {
    label: "Hidden Gems",
    icon: Gem,
    highlighted: false,
  },
];

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

            {/* DESTINATION SEARCH CARD */}

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.32, ease: revealEase }}
              className="mx-auto mb-20 mt-7 w-full max-w-[760px] rounded-[22px] border border-white/25 bg-[#071A16]/52 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.30),0_0_30px_rgba(244,185,66,0.08),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-2.5"
            >
              <div className="flex w-full items-center gap-2">
                {/* SEARCH INPUT */}

                <div className="min-w-0 flex-1">
                  <div className="relative flex h-[48px] w-full items-center rounded-2xl border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 focus-within:border-[#F4B942]/55 focus-within:bg-white/[0.10] focus-within:shadow-[0_0_0_3px_rgba(244,185,66,0.10),0_0_24px_rgba(244,185,66,0.10)]">
                    <Search
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 shrink-0 text-[#FFD078]"
                    />

                    <input
                      type="search"
                      name="destination"
                      aria-label="Search destination"
                      placeholder="Where do you want to explore?"
                      className="h-full w-full rounded-2xl bg-transparent py-2 pl-11 pr-12 text-[13px] font-medium tracking-[-0.005em] text-white outline-none placeholder:text-white/62 sm:text-[14px]"
                    />

                    <button
                      type="button"
                      aria-label="Use current location"
                      className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-[#FFD078] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B942]/40"
                    >
                      <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* EXPLORE BUTTON */}

                <Link href="/destinations">
                  <Button
                    className="!h-[48px] min-w-[92px] shrink-0 rounded-2xl border border-[#FFD078]/35 bg-gradient-to-br from-[#F6B84C] via-[#ECA23A] to-[#D88928] px-5 text-[12px] font-semibold tracking-[-0.005em] text-[#14211C] shadow-[0_8px_24px_rgba(229,151,43,0.30),inset_0_1px_0_rgba(255,255,255,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_12px_30px_rgba(229,151,43,0.38)] sm:text-[13px]"
                  >
                    Explore
                  </Button>
                </Link>
              </div>

              {/* POPULAR DESTINATION CHIPS */}

              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 px-1 pb-0.5">
                {popularDestinations.map((destination, index) => (
                  <motion.div
                    key={destination}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.48 + index * 0.06, ease: revealEase }}
                  >
                    <Link
                      href={`/destinations?search=${encodeURIComponent(destination)}`}
                      className="inline-flex rounded-full border border-white/20 bg-white/[0.07] px-2.5 py-1 text-[11px] font-medium tracking-[-0.005em] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F4B942]/45 hover:bg-[#F4B942]/12 hover:text-[#FFD078] sm:text-[12px]"
                    >
                      {destination}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* AI PLANNING OPTIONS */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.78, ease: revealEase }}
                className="px-1 pb-1 pt-3"
              >
                <div className="mb-2.5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[10px]">
                    AI planning options
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {aiOptions.map((option, index) => {
                    const Icon = option.icon;

                    return (
                      <motion.div
                        key={option.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.86 + index * 0.06, ease: revealEase }}
                        className={option.highlighted ? "flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#F4B942]/65 bg-[#F4B942]/12 px-2.5 text-[#FFD078] shadow-[0_0_22px_rgba(244,185,66,0.13),inset_0_1px_0_rgba(255,255,255,0.08)]" : "flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/[0.055] px-2.5 text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"}
                      >
                        <Icon size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                        <span className="text-[10px] font-medium tracking-[-0.005em] sm:text-[11px]">
                          {option.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE IMAGE OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-transparent sm:hidden" />
    </section>
  );
}