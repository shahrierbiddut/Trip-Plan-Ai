"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { trendingStyles } from "@/data/config/trendingStyles";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TrendingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.65,
          ease: revealEase,
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.025em] text-[#17211D] sm:text-[34px]">
              🔥 Trending This Season
            </h2>
            <p className="mt-2 max-w-[520px] text-[13px] font-medium leading-relaxed text-[#5B6C63] sm:text-[14px]">
              Discover what travelers are exploring right now.
            </p>
          </div>
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#087F5B] transition-colors hover:text-[#D98B26]"
          >
            View All Styles
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid / Scroll Container */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trendingStyles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: revealEase,
              }}
            >
              <Link
                href={style.href}
                className="group relative flex h-[260px] flex-col justify-end overflow-hidden rounded-[20px] border border-[#23483D]/20 bg-[#0B251E] shadow-[0_12px_28px_rgba(23,33,29,0.10)] transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(8,59,46,0.20)] sm:h-[280px]"
                aria-label={`Explore ${style.title}`}
              >
                {/* Image */}
                <Image
                  src={style.image}
                  alt={`${style.title} destinations`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041C16]/90 via-[#071A16]/30 to-black/[0.05] transition-colors duration-500" />

                {/* Trending Badge */}
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-[#F4A934]/40 bg-[#071A16]/60 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#FFD078] backdrop-blur-md">
                  <TrendingUp size={10} />
                  Trending ↑
                </span>

                {/* Content */}
                <div className="relative z-10 p-4 text-white sm:p-5">
                  <h3 className="font-serif text-[22px] font-normal leading-none tracking-[-0.02em] sm:text-[24px]">
                    {style.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium text-white/75 sm:text-[11px]">
                    {style.destinations.join(", ")}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8FE0C2]">
                        {style.destinationCount} destinations
                      </span>
                      <span className="text-[8px] text-white/50">·</span>
                      <span className="text-[8px] font-semibold text-white/60">
                        Best for {style.bestFor}
                      </span>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-[#071A16]/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#FFD078] group-hover:bg-[#F4A934] group-hover:text-[#13221C]">
                      <ArrowUpRight size={16} strokeWidth={1.7} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
