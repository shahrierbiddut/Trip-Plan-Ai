"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  Eye,
  Handshake,
  HeartHandshake,
  MapPinned,
  MessageCircleMore,
  Plane,
  Sparkles,
  Target,
  WalletCards,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const values: ValueItem[] = [
  {
    title: "Our Vision",
    description:
      "Make intelligent, personalized travel planning accessible to every traveler.",
    icon: Eye,
  },
  {
    title: "Our Mission",
    description:
      "Turn real preferences, trusted insights, and smart technology into better journeys.",
    icon: Target,
  },
  {
    title: "Our Values",
    description:
      "We design every experience around trust, clarity, inclusion, and genuine traveler needs.",
    icon: HeartHandshake,
  },
];

const services: ServiceItem[] = [
  {
    title: "AI Trip Planning",
    description: "Personalized multi-day itineraries built around you.",
    icon: BrainCircuit,
  },
  {
    title: "Destination Discovery",
    description: "Find places that match your interests and travel style.",
    icon: MapPinned,
  },
  {
    title: "Smart Recommendations",
    description: "Receive relevant suggestions for every part of your trip.",
    icon: Compass,
  },
  {
    title: "Review Intelligence",
    description: "Understand thousands of traveler reviews more easily.",
    icon: MessageCircleMore,
  },
  {
    title: "Smart Budgeting",
    description: "Make confident decisions within your travel budget.",
    icon: WalletCards,
  },
  {
    title: "Collaborative Planning",
    description: "Build and organize journeys with your travel companions.",
    icon: Handshake,
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function AboutPageContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17211D]">
      {/* ========================================================
          ABOUT HERO
      ======================================================== */}

      <section className="relative min-h-[390px] overflow-hidden bg-[#071A16] pb-28 pt-[108px] sm:min-h-[430px] sm:pb-32 sm:pt-[122px] lg:min-h-[470px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-28 h-96 w-96 rounded-full bg-[#087F5B]/35 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#F4B942]/20 blur-[105px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.20) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: revealEase }}
            className="max-w-[760px]"
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/55 sm:text-[11px]">
              <Link
                href="/"
                className="transition-colors duration-200 hover:text-[#FFD078]"
              >
                Home
              </Link>
              <span className="text-white/25">/</span>
              <span className="text-[#FFD078]">About Us</span>
            </div>

            <h1 className="mt-5 [font-family:Georgia,'Times_New_Roman',serif] text-[44px] font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[70px]">
              About{" "}
              <span className="bg-gradient-to-r from-[#FFD078] via-[#F4AD3F] to-[#D98B26] bg-clip-text italic text-transparent">
                TripPlan AI
              </span>
            </h1>

            <p className="mt-5 max-w-[620px] text-[13px] font-medium leading-[1.75] text-white/68 sm:text-[15px]">
              Your intelligent travel companion—making every journey more
              personal, informed, and effortless.
            </p>
          </motion.div>

          {/* HERO 3D ORBIT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: revealEase }}
            className="relative mx-auto hidden h-[250px] w-[250px] [perspective:1100px] lg:block"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotateX: [0, 7, 0, -7, 0],
                      rotateY: [0, -10, 0, 10, 0],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : { rotate: [0, 360] }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-3 rounded-full border border-dashed border-[#FFD078]/35"
                style={{ transform: "translateZ(15px)" }}
              />

              <div
                className="absolute inset-9"
                style={{ transform: "rotateX(68deg) translateZ(25px)" }}
              >
                <motion.div
                  animate={
                    shouldReduceMotion ? undefined : { rotate: [360, 0] }
                  }
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-full w-full rounded-full border border-[#8FE0C2]/30"
                />
              </div>

              <div
                className="absolute inset-[58px] flex items-center justify-center rounded-full border border-[#FFD078]/45 bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_18px_55px_rgba(244,169,52,0.30),inset_0_1px_0_rgba(255,255,255,0.48)]"
                style={{ transform: "translateZ(62px)" }}
              >
                <Plane
                  size={48}
                  strokeWidth={1.9}
                  className="rotate-[-45deg] text-[#123B31]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-px left-0 h-[72px] w-full sm:h-[90px]"
        >
          <path
            d="M0,55 C260,105 500,82 720,63 C980,40 1190,85 1440,42 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </section>

      {/* ========================================================
          OUR STORY
      ======================================================== */}

      <section className="relative py-14 sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#087F5B]/[0.06] blur-[100px]"
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-16 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: revealEase }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE4DB] bg-[#F1F8F5] px-3 py-1.5">
              <Sparkles size={13} className="text-[#D98B26]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#087F5B] sm:text-[11px]">
                Our story
              </span>
            </div>

            <h2 className="mt-5 max-w-[680px] [font-family:Georgia,'Times_New_Roman',serif] text-[34px] font-normal leading-[1.08] tracking-[-0.04em] text-[#17211D] sm:text-[43px] lg:text-[50px]">
              Travel planning should feel{" "}
              <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                inspiring.
              </span>
            </h2>

            <p className="mt-6 max-w-[680px] text-[13px] font-medium leading-[1.8] text-[#52645C] sm:text-[15px]">
              TripPlan AI is a travel planning and review intelligence platform
              built to make discovering destinations and organizing journeys
              simpler. We combine personalized recommendations, practical
              planning tools, and real traveler experiences in one place.
            </p>

            <p className="mt-4 max-w-[680px] text-[13px] font-medium leading-[1.8] text-[#52645C] sm:text-[15px]">
              Whether you are exploring Bangladesh, planning an international
              escape, or creating a trip with friends, TripPlan AI helps turn
              your time, interests, and budget into a journey designed around
              you.
            </p>
          </motion.div>

          {/* 3D BRAND CARD */}

          <motion.div
                    initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: revealEase }}
                    className="relative mx-auto w-full max-w-[650px] [perspective:1400px]"
                  >
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              rotateX: [0, 1.8, 0, -1.8, 0],
                              rotateY: [0, -2.5, 0, 2.5, 0],
                            }
                      }
                      transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="[transform-style:preserve-3d]"
                    >
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { rotateX: -4, rotateY: 6, scale: 1.012 }
                        }
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="group relative min-h-[360px] overflow-hidden rounded-[30px] border border-[#2D5D50]/60 bg-gradient-to-br from-[#061B16] via-[#0A3227] to-[#071A16] shadow-[0_28px_75px_rgba(7,26,22,0.24),inset_0_1px_0_rgba(255,255,255,0.10)] [transform-style:preserve-3d] sm:min-h-[420px]"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at center, rgba(255,255,255,0.24) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
          
                        <div
                          aria-hidden="true"
                          className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#087F5B]/45 blur-[75px]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#F4B942]/25 blur-[85px]"
                        />
          
                        <motion.div
                          aria-hidden="true"
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : { rotate: [0, 360], opacity: [0.35, 0.65, 0.35] }
                          }
                          transition={{
                            rotate: {
                              duration: 24,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            opacity: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FFD078]/35 sm:h-64 sm:w-64"
                        />
          
                        <div
                          className="absolute inset-0 flex items-center justify-center px-6"
                          style={{ transform: "translateZ(55px)" }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <motion.div
                              animate={
                                shouldReduceMotion
                                  ? undefined
                                  : {
                                      boxShadow: [
                                        "0 10px 28px rgba(217,134,31,0.24)",
                                        "0 14px 40px rgba(244,185,66,0.44)",
                                        "0 10px 28px rgba(217,134,31,0.24)",
                                      ],
                                    }
                              }
                              transition={{
                                duration: 3.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] sm:h-[74px] sm:w-[74px]"
                            >
                              <span className="pointer-events-none absolute inset-[4px] rounded-full border border-[#FFF0C2]/70" />
                              <Plane
                                size={31}
                                strokeWidth={2.2}
                                className="relative rotate-[-45deg] text-[#123B31] sm:h-9 sm:w-9"
                              />
                            </motion.div>
          
                            <h3 className="mt-5 text-[32px] font-extrabold leading-none tracking-[-0.045em] text-white sm:text-[40px]">
                              TripPlan <span className="text-[#F4AD3F]">AI</span>
                            </h3>
          
                            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
                              Plan smarter. Travel better.
                            </p>
                          </div>
                        </div>
          
                        <div
                          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70 backdrop-blur-xl sm:left-7 sm:top-7 sm:text-[10px]"
                          style={{ transform: "translateZ(32px)" }}
                        >
                          <Sparkles size={12} className="text-[#FFD078]" />
                          AI-powered travel
                        </div>
          
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-[12%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFD078]/70 to-transparent"
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
        </div>
      </section>

      {/* ========================================================
          VISION, MISSION, VALUES
      ======================================================== */}

      <section className="bg-gradient-to-b from-[#F5F9F7] to-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: revealEase }}
            className="mx-auto max-w-[760px] text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F5B] sm:text-[11px]">
              What guides us
            </p>
            <h2 className="mt-3 [font-family:Georgia,'Times_New_Roman',serif] text-[32px] font-normal tracking-[-0.035em] text-[#17211D] sm:text-[40px]">
              Built around{" "}
              <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                better journeys.
              </span>
            </h2>
          </motion.div>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: revealEase,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { rotateX: -3, rotateY: index === 1 ? 0 : index === 0 ? 3 : -3 }
                  }
                  className="group relative overflow-hidden rounded-[24px] border border-[#DCE9E3] bg-white p-6 shadow-[0_14px_38px_rgba(23,33,29,0.08)] [perspective:900px] transition-[border-color,box-shadow] duration-300 hover:border-[#F4B942]/45 hover:shadow-[0_20px_48px_rgba(23,33,29,0.12)] sm:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#F4B942]/0 blur-[38px] transition-colors duration-500 group-hover:bg-[#F4B942]/15"
                  />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#BFE4D5] bg-[#EAF7F1] text-[#087F5B] transition-all duration-300 group-hover:rotate-[-5deg] group-hover:border-[#FFD078] group-hover:bg-[#F4A934] group-hover:text-[#17211D]">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-6 [font-family:Georgia,'Times_New_Roman',serif] text-[23px] font-normal tracking-[-0.025em] text-[#17211D]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[12px] font-medium leading-[1.75] text-[#607169] sm:text-[13px]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SERVICES
      ======================================================== */}

      <section className="relative py-14 sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#F4B942]/[0.08] blur-[100px]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: revealEase }}
            className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F5B] sm:text-[11px]">
                What we offer
              </p>
              <h2 className="mt-3 [font-family:Georgia,'Times_New_Roman',serif] text-[32px] font-normal tracking-[-0.035em] text-[#17211D] sm:text-[40px]">
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                  travel smarter.
                </span>
              </h2>
            </div>

            <p className="max-w-[440px] text-[12px] font-medium leading-[1.7] text-[#607169] sm:text-right sm:text-[13px]">
              Useful tools and intelligent guidance for every stage of your
              journey.
            </p>
          </motion.div>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.58,
                    delay: index * 0.06,
                    ease: revealEase,
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E0EBE6] bg-[#F8FBF9] p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#BFE4D5] hover:bg-white hover:shadow-[0_14px_32px_rgba(23,33,29,0.08)] sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5EF] text-[#087F5B] transition-all duration-300 group-hover:rotate-[-5deg] group-hover:bg-[#F4A934] group-hover:text-[#17211D]">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="[font-family:Georgia,'Times_New_Roman',serif] text-[17px] font-normal tracking-[-0.018em] text-[#17211D]">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-[10px] font-medium leading-[1.55] text-[#6A7A72] sm:text-[11px]">
                      {service.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto shrink-0 text-[#C2CEC8] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#D98B26]"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          CTA
      ======================================================== */}

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: revealEase }}
          className="relative mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-[#23483E] bg-[#071A16] px-6 py-10 text-center shadow-[0_24px_65px_rgba(7,26,22,0.18)] sm:px-10 sm:py-12"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#087F5B]/40 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-[#F4B942]/20 blur-[85px]"
          />

          <div className="relative z-10">
            <h2 className="[font-family:Georgia,'Times_New_Roman',serif] text-[30px] font-normal tracking-[-0.035em] text-white sm:text-[39px]">
              Ready to create a journey made for{" "}
              <span className="text-[#F4AD3F] italic">you?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[580px] text-[12px] font-medium leading-[1.7] text-white/62 sm:text-[13px]">
              Tell TripPlan AI what you love, and start planning with confidence.
            </p>

            <Link
              href="/plan-trip"
              className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#FFD078]/50 bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-6 text-[13px] font-bold text-[#17332A] shadow-[0_10px_28px_rgba(217,134,31,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              Plan My Trip
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}