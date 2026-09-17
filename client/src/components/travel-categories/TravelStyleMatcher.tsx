"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Clock3, Compass, MapPin, Sparkles, Wallet } from "lucide-react";
import { moods, getRecommendation } from "@/data/config/aiMatches";
import type { AIMatchResult } from "@/data/config/aiMatches";
import Link from "next/link";
import Image from "next/image";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TravelStyleMatcher() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<AIMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindMatch = () => {
    if (!selectedMood) return;

    setIsLoading(true);
    setMatchResult(null);

    window.setTimeout(() => {
      const result = getRecommendation(selectedMood);
      setMatchResult(result);
      setIsLoading(false);
    }, 1200);
  };

  const handleTryAnother = () => {
    setSelectedMood(null);
    setMatchResult(null);
  };

  return (
    <section className="bg-gradient-to-b from-[#F7F7F2]/60 to-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.65,
            ease: revealEase,
          }}
          className="overflow-hidden rounded-[24px] border border-[#E2E7E3] bg-white shadow-[0_14px_38px_rgba(23,33,29,0.06)]"
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="flex items-center gap-2 font-serif text-[26px] font-normal leading-tight text-[#17211D] sm:text-[30px]">
                <Compass
                  size={24}
                  className="shrink-0 text-[#F4A934]"
                  strokeWidth={1.8}
                />
                <span>Find Your Perfect Travel Style</span>
              </h2>
              <p className="mt-3 max-w-[440px] text-[13px] font-medium leading-relaxed text-[#5B6C63] sm:text-[14px]">
                Not sure what kind of trip you want? Tell us how you want to
                feel, and TripPlan AI will find the right travel style for you.
              </p>

              <h3 className="mt-7 text-[12px] font-bold text-[#26382F]">
                How do you want to feel?
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;

                  return (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => {
                        setSelectedMood(mood.id);
                        setMatchResult(null);
                      }}
                      aria-pressed={isSelected}
                      className={`group flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-all duration-300 ${
                        isSelected
                          ? "border-[#F4A934] bg-[#FFFBF0] shadow-[0_6px_18px_rgba(244,169,52,0.12)]"
                          : "border-[#E2E7E3] bg-white hover:border-[#F4A934]/50 hover:bg-[#FFFDF7]"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 ${
                          isSelected
                            ? mood.activeColor
                            : `${mood.color} opacity-80 group-hover:opacity-100`
                        }`}
                      >
                        <Icon size={24} strokeWidth={1.8} />
                      </span>
                      <span
                        className={`text-[10px] font-bold transition-colors ${
                          isSelected ? "text-[#17211D]" : "text-[#52635A]"
                        }`}
                      >
                        {mood.label}
                      </span>
                      {isSelected && (
                        <span className="h-1 w-5 rounded-full bg-[#F4A934]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleFindMatch}
                disabled={!selectedMood || isLoading}
                className="group mt-6 inline-flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#E89425] to-[#F5B13E] px-6 text-[12px] font-bold text-[#13221C] shadow-[0_10px_25px_rgba(232,148,37,0.22)] transition-all duration-300 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E89425]/45 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                <Sparkles
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                {isLoading ? "Finding your match..." : "Find My Match"}
              </button>
            </div>

            <div className="border-t border-[#E2E7E3] lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex h-full min-h-[360px] flex-col items-center justify-center overflow-hidden bg-[#06291E] p-8 text-center"
                  >
                    <Image
                      src="/assets/Sajek/cover-3.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-[#06291E]/65" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              rotate: [0, 360],
                              scale: [1, 1.1, 1],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD078] text-[#06291E]"
                    >
                      <Sparkles size={24} />
                    </motion.div>
                    <p className="relative z-10 mt-4 font-serif text-[20px] text-white">
                      Finding your perfect travel style...
                    </p>
                    <p className="relative z-10 mt-2 text-[12px] font-medium text-white/70">
                      TripPlan AI is analyzing your preferences
                    </p>
                  </motion.div>
                )}

                {!isLoading && matchResult && (
                  <motion.div
                    key="result"
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 16,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.55,
                      ease: revealEase,
                    }}
                    className="p-3 sm:p-4"
                  >
                    <div className="overflow-hidden rounded-[18px] border border-[#245144] bg-[radial-gradient(circle_at_top_left,rgba(10,85,65,0.75),transparent_42%),linear-gradient(135deg,#041B14_0%,#06291E_58%,#02110D_100%)] p-5 text-white shadow-[0_18px_38px_rgba(6,41,30,0.24)] sm:p-6">
                      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#AEE9D5]">
                            Your TripPlan AI Match
                          </p>
                          <div className="mt-2 flex flex-wrap items-baseline gap-3">
                            <span className="text-[46px] font-bold leading-none text-[#F4A934] sm:text-[54px]">
                              {matchResult.matchPercentage}%
                            </span>
                            <span className="font-serif text-[23px] font-normal text-white sm:text-[27px]">
                              {matchResult.travelStyle}
                            </span>
                          </div>

                          <p className="mt-4 text-[11px] font-bold text-white/90">
                            Best destinations
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {matchResult.bestDestinations.map((dest) => (
                              <span
                                key={dest}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/6 bg-white/10 px-2.5 py-1.5 text-[10px] font-bold text-white/90"
                              >
                                <MapPin size={11} className="text-white/65" />
                                {dest}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 border-t border-white/10 pt-4">
                            <div className="flex flex-wrap gap-6 sm:gap-10">
                              <div>
                                <p className="flex items-center gap-1.5 text-[10px] font-bold text-white/80">
                                  <span className="text-[#F4A934]">
                                    <Clock3 size={12} strokeWidth={3} />
                                  </span>
                                  Best duration
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-[#06291E]">
                                    <Clock3 size={13} strokeWidth={2.5} />
                                  </div>
                                  <span className="text-[12px] font-bold text-white">
                                    {matchResult.bestDuration}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <p className="flex items-center gap-1.5 text-[10px] font-bold text-white/80">
                                  <span className="text-[#F4A934]">
                                    <Wallet size={12} strokeWidth={3} />
                                  </span>
                                  Estimated budget
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded border border-[#F4A934] text-[#F4A934]">
                                    <Wallet size={13} strokeWidth={2.5} />
                                  </div>
                                  <span className="text-[12px] font-bold text-white">
                                    {matchResult.estimatedBudget}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[210px] w-full shrink-0 xl:h-full xl:min-h-[205px]">
                          <div className="absolute inset-0 overflow-hidden rounded-[11px] border border-[#DFA84C]/45 bg-[#123D30] shadow-[0_16px_34px_rgba(0,0,0,0.24)]">
                            <Image
                              src={matchResult.image}
                              alt={matchResult.travelStyle}
                              fill
                              sizes="(min-width: 1280px) 260px, 100vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06291E]/25 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-white/10 pt-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                          <div className="flex-1 lg:pr-8">
                            <p className="text-[12px] font-bold text-white">
                              Why this matches you:
                            </p>
                            <p className="mt-1.5 max-w-[470px] text-[12px] leading-relaxed text-white/72">
                              {matchResult.explanation}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <Link
                              href="/destinations"
                              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#F4A934] px-5 text-[11px] font-bold text-[#17211D] shadow-[0_10px_22px_rgba(244,169,52,0.18)] transition-all hover:bg-[#F5B13E]"
                            >
                              Discover My Matches <Sparkles size={13} />
                            </Link>
                            <button
                              type="button"
                              onClick={handleTryAnother}
                              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-[11px] font-bold text-white transition-colors hover:bg-white/10"
                            >
                              Try Another Style
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isLoading && !matchResult && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-full min-h-[380px] overflow-hidden bg-[#06291E]"
                  >
                    <Image
                      src="/assets/Sajek/cover-1.jpg"
                      alt="Green mountain landscape"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#03140F]/88 via-[#073124]/48 to-[#0B3E2D]/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03140F]/75 via-transparent to-transparent" />

                    <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-between p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-flex rounded-full border border-[#FFD078]/35 bg-[#071A16]/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#FFD078] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-md">
                            TripPlan AI
                          </span>
                          <p className="mt-3 max-w-[280px] text-[11px] font-semibold leading-relaxed text-white/72">
                            Mood-based destination preview
                          </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/14 text-[#FFD078] shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur-md">
                          <Sparkles size={21} strokeWidth={1.8} />
                        </div>
                      </div>

                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_190px] xl:items-end">
                        <div className="max-w-[430px]">
                          <div className="mb-5 grid w-full max-w-[360px] grid-cols-3 gap-2">
                            {["Mood", "Budget", "Places"].map((item) => (
                              <span
                                key={item}
                                className="rounded-lg border border-white/16 bg-white/14 px-3 py-2 text-center text-[10px] font-bold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-serif text-[31px] leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:text-[38px]">
                            Your AI match awaits
                          </h3>
                          <p className="mt-3 max-w-[360px] text-[13px] font-medium leading-relaxed text-white/78">
                            Select a mood, then tap Find My Match to reveal your
                            destination style.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/18 bg-[#041B14]/58 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#AEE9D5]">
                              Preview
                            </span>
                            <span className="text-[20px] font-bold leading-none text-[#F4A934]">
                              AI
                            </span>
                          </div>
                          <div className="mt-4 space-y-2.5">
                            {["Travel style", "Best places", "Trip budget"].map(
                              (item, index) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-[10px] font-bold text-white/78"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4A934]" />
                                  <span>{item}</span>
                                  <span
                                    className="ml-auto h-1.5 rounded-full bg-white/22"
                                    style={{ width: `${52 - index * 10}px` }}
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
