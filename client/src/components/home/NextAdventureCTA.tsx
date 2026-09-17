"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NextAdventureCTAProps = {
  /** Pass your current planner route here so this component does not change routing logic. */
  plannerHref: string;
  /** Place the supplied image inside public/images and keep this default path. */
  backgroundSrc?: string;
  className?: string;
  priority?: boolean;
};

const benefits = ["Local-first ideas", "Budget-aware plans", "One clear itinerary"];

export default function NextAdventureCTA({
  plannerHref,
  backgroundSrc = "https://images.unsplash.com/photo-1562658601-0ae4a690ae1f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  className = "",
  priority = false,
}: NextAdventureCTAProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="next-adventure-heading"
      className={`group relative isolate w-full overflow-hidden bg-[#071e18] py-10 sm:py-24 lg:py-28 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        initial={reduceMotion ? false : { scale: 1.07 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={backgroundSrc}
          alt="A wooden boat on a calm Bangladeshi river at sunset"
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
        />
      </motion.div>

      {/* The left overlay protects text contrast; the right side keeps the sunset visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 "
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-[radial-gradient(circle_at_28%_48%,rgba(9,115,82,0.2),transparent_42%)]"
      />

      <motion.span
        aria-hidden="true"
        className="absolute right-[14%] top-[18%] -z-10 h-40 w-40 rounded-full bg-[#f0a51f]/15 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.7, 0.35],
                scale: [0.9, 1.1, 0.9],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f7d48a] shadow-lg backdrop-blur-md sm:text-xs">
            <Sparkles size={15} aria-hidden="true" />
            Your journey starts here
          </div>

          <h2
            id="next-adventure-heading"
            className="font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ready for your next great{" "}
            <span className="relative inline-block italic text-[#f1ad2d]">
              adventure?
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-[#f0a521] to-transparent"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.45 }}
              />
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Turn a destination idea into a practical Bangladesh trip plan.
            Discover stays, food, routes and budget guidance in one place—built
            around how you want to travel.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4, rotateX: -3, rotateY: 3, scale: 1.015 }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="w-full [perspective:900px] sm:w-auto"
            >
              <Link
                href={plannerHref}
                className="group/button flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#e99b1d] to-[#f6ba42] px-6 font-semibold text-[#12382e] shadow-[0_15px_35px_rgba(234,157,29,0.3)] transition focus:outline-none focus:ring-2 focus:ring-[#f5b940] focus:ring-offset-2 focus:ring-offset-[#08251d] sm:w-auto"
              >
                Plan Your Trip
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#123d31] text-white transition-transform group-hover/button:translate-x-1">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>

            <div className="flex items-center gap-2 text-xs font-medium text-white/70">
              <MapPin size={16} className="shrink-0 text-[#efae35]" aria-hidden="true" />
              Built for travelling across Bangladesh
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5">
            {benefits.map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-2 text-[11px] font-medium text-white/70 sm:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9a323] shadow-[0_0_10px_rgba(233,163,35,0.8)]" />
                {benefit}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}