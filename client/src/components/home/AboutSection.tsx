"use client";

import Link from "next/link";
import { ArrowRight, Plane, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      {/* BACKGROUND DETAILS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#087F5B]/[0.06] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-[#F4B942]/[0.09] blur-[105px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-16 lg:px-12 xl:px-16">
        {/* 3D LOGO VISUAL */}

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

        {/* ABOUT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.12, ease: revealEase }}
          className="mx-auto w-full max-w-[650px] lg:mx-0"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE4DB] bg-[#F1F8F5] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4A934] shadow-[0_0_10px_rgba(244,169,52,0.55)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#087F5B] sm:text-[11px]">
              About TripPlan AI
            </span>
          </div>

          <h2 className="mt-5 [font-family:Georgia,'Times_New_Roman',serif] text-[34px] font-normal leading-[1.08] tracking-[-0.04em] text-[#17211D] sm:text-[43px] lg:text-[50px]">
            Your smarter way to plan{" "}
            <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
              every journey.
            </span>
          </h2>

          <p className="mt-6 text-[13px] font-medium leading-[1.8] text-[#52645C] sm:text-[15px]">
            TripPlan AI brings planning, discovery, and traveler intelligence
            into one simple experience. From personalized itineraries to
            trusted destination insights, we help you plan with confidence.
          </p>

          <p className="mt-4 text-[13px] font-medium leading-[1.8] text-[#52645C] sm:text-[15px]">
            Whether you are exploring Bangladesh or planning your next
            international escape, our AI turns your preferences, time, and
            budget into a journey that feels uniquely yours.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#087F5B] transition-colors duration-300 hover:text-[#B86D1B] sm:text-[14px]"
          >
            Learn more about us
            <motion.span
              aria-hidden="true"
              className="inline-flex"
              whileHover={{ x: 2 }}
            >
              <ArrowRight
                size={17}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}