"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Star,
  Wallet,
} from "lucide-react";

type Destination = {
  id: number;
  name: string;
  slug: string;
  image: string;
  match: number;
  rating: number;
  reviews: string;
  budget: string;
  bestSeason: string;
  tags: string[];
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Cox's Bazar",
    slug: "coxsbazar",
    image: "/assets/Coxs/cover-1.jpg",
    match: 94,
    rating: 4.8,
    reviews: "1.2K reviews",
    budget: "৳8,500",
    bestSeason: "Nov–Feb",
    tags: ["Beach", "Family", "Relaxation"],
  },
  {
    id: 2,
    name: "Sajek Valley",
    slug: "sajek-valley",
    image: "/assets/Sajek/cover-1.jpg",
    match: 92,
    rating: 4.7,
    reviews: "966 reviews",
    budget: "৳6,200",
    bestSeason: "Oct–Mar",
    tags: ["Nature", "Adventure", "Relaxation"],
  },
  {
    id: 3,
    name: "Saint Martin",
    slug: "saint-martin",
    image: "/assets/Saintmartin/cover-1.jpg",
    match: 93,
    rating: 4.6,
    reviews: "743 reviews",
    budget: "৳11,000",
    bestSeason: "Nov–Feb",
    tags: ["Beach", "Island", "Relaxation"],
  },
  {
    id: 4,
    name: "Sundarban",
    slug: "sundarban",
    image: "/assets/Sundarban/cover-1.jpg",
    match: 89,
    rating: 4.6,
    reviews: "682 reviews",
    budget: "৳6,800",
    bestSeason: "Oct–Mar",
    tags: ["Nature", "Adventure", "Culture"],
  },
  {
    id: 5,
    name: "Sreemangal",
    slug: "sreemangal",
    image: "/assets/sreemangal/cover-1.webp",
    match: 87,
    rating: 4.5,
    reviews: "621 reviews",
    budget: "৳4,500",
    bestSeason: "Sep–Feb",
    tags: ["Tea Garden", "Nature", "Relaxation"],
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function PopularDestinations() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const handleSliderScroll = () => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = setTimeout(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const sliderBounds = slider.getBoundingClientRect();
      let nextActiveIndex = activeIndex;
      let highestVisibility = -1;

      Array.from(slider.children).forEach((card, index) => {
        const cardBounds = card.getBoundingClientRect();
        const visibleWidth = Math.max(
          0,
          Math.min(cardBounds.right, sliderBounds.right) -
            Math.max(cardBounds.left, sliderBounds.left),
        );
        const visibility =
          cardBounds.width > 0 ? visibleWidth / cardBounds.width : 0;

        if (visibility > highestVisibility + 0.01) {
          highestVisibility = visibility;
          nextActiveIndex = index;
        }
      });

      if (nextActiveIndex !== activeIndex) {
        setActiveIndex(nextActiveIndex);
      }
    }, 140);
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-16">

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: revealEase }}
          className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-7 sm:flex-row sm:items-end sm:gap-5"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#087F5B] sm:text-[10px]">
              <span className="h-px w-7 bg-[#D8912E]" />
              Curated for every journey
            </div>

            <h2 className="[font-family:Georgia,'Times_New_Roman',serif] text-[30px] font-normal leading-[1.08] tracking-[-0.035em] text-[#17211D] sm:text-[36px] lg:text-[42px]">
              Explore Popular{" "}
              <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                Destinations
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-xs font-medium leading-5 text-[#607169] sm:text-sm">
              Discover places travelers are loving right now.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.15, ease: revealEase }}
            className="inline-flex shrink-0 self-end items-center gap-2 rounded-full border border-[#DCE7E2] bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B] shadow-[0_8px_22px_rgba(23,33,29,0.08)] backdrop-blur-md sm:self-auto sm:text-[11px]"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <motion.span
                animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-2 w-2 rounded-full bg-[#F4B942]"
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#D98B26]" />
            </span>

            <span>Swipe to explore</span>

            <motion.span
              animate={{ x: [-2, 6, -2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowRight size={15} strokeWidth={2.2} />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* EDITORIAL DESTINATION SLIDER */}

        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
          >
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
                featured={index === activeIndex}
              />
            ))}
          </div>
        </div>

        {/* VIEW ALL DESTINATIONS */}

        <div className="mt-6 flex justify-center sm:mt-7">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-full border border-[#D6E4DD] bg-white px-5 py-2.5 text-[11px] font-bold text-[#087F5B] shadow-[0_8px_22px_rgba(23,33,29,0.07)] transition-all duration-300 hover:border-[#F0B557]/70 hover:bg-[#FFF9EF] hover:text-[#B86D1B] sm:text-[12px]"
          >
            View All Destinations
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESTINATION CARD
============================================================ */

function DestinationCard({
  destination,
  index,
  featured,
}: {
  destination: Destination;
  index: number;
  featured: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, delay: index * 0.09, ease: revealEase }}
      className={[
        "group relative h-[500px] w-full shrink-0 snap-start overflow-hidden rounded-[24px] border border-[#294139]/55 bg-[#071A16] shadow-none transition-[width,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#D9A147]/70 hover:shadow-[0_10px_26px_rgba(17,24,21,0.12)] sm:h-[540px] lg:h-[500px]",
        featured ? "lg:w-[560px]" : "lg:w-[430px]",
      ].join(" ")}
    >
      {/* FULL-BLEED IMAGE */}

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          draggable={false}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 560px"
              : "(max-width: 1024px) 100vw, 430px"
          }
          className="pointer-events-none select-none object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/95 via-[#071A16]/10 via-[58%] to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#087F5B]/[0.07] via-transparent to-[#F4B942]/[0.06]" />
      </div>

      {/* AI MATCH */}

      <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[#D5A448]/45 bg-[#17352E]/70 px-3.5 py-2.5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-5 sm:top-5">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <motion.span
            animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0.05, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-2 w-2 rounded-full bg-[#F4B942]"
          />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#FFD078]" />
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/70 sm:text-[10px]">
          AI Match
        </span>
        <span className="text-[13px] font-extrabold text-[#FFD078] sm:text-[14px]">
          {destination.match}%
        </span>
      </div>

      {/* WISHLIST */}

      <button
        type="button"
        aria-label={`Add ${destination.name} to wishlist`}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#17352E]/55 text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#FFD078]/60 hover:bg-[#F4A934] hover:text-[#17211D] sm:right-5 sm:top-5"
      >
        <Heart size={18} strokeWidth={1.9} />
      </button>

      {/* CARD CONTENT */}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold sm:text-[11px]">
            <MapPin size={13} className="text-[#FFD078]" />
            Bangladesh
          </span>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold sm:text-[11px]">
            <Star size={13} className="fill-[#F4B942] text-[#F4B942]" />
            <strong className="text-[#FFD078]">{destination.rating}</strong>
            <span className="font-medium text-white/60">
              ({destination.reviews})
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={[
                "truncate [font-family:Georgia,'Times_New_Roman',serif] font-normal leading-tight tracking-[-0.035em] text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.32)]",
                featured
                  ? "text-[34px] sm:text-[40px] lg:text-[42px]"
                  : "text-[32px] sm:text-[38px] lg:text-[34px]",
              ].join(" ")}
            >
              {destination.name}
            </h3>
          </div>

          <Link
            href={`/destinations/${destination.slug}`}
            aria-label={`Explore ${destination.name}`}
            className="group/link flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#17352E]/55 text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#FFD078]/45 group-hover:bg-[#F4A934] group-hover:text-[#17211D] group-hover:shadow-[0_10px_26px_rgba(217,134,31,0.30)] hover:-translate-y-0.5 hover:rotate-[-10deg] hover:brightness-105 sm:h-14 sm:w-14"
          >
            <ArrowRight
              size={21}
              className="-rotate-45 transition-transform duration-300 group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-white/[0.10] px-3 py-2 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg">
            <Wallet size={13} className="shrink-0 text-[#FFD078]" />
            <span className="text-[9px] font-medium text-white/55">From</span>
            <strong className="truncate text-[10px] font-bold text-white">
              {destination.budget}
            </strong>
          </div>

          <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-white/[0.10] px-3 py-2 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg">
            <CalendarDays size={13} className="shrink-0 text-[#FFD078]" />
            <span className="text-[9px] font-medium text-white/55">Best</span>
            <strong className="truncate text-[10px] font-bold text-white">
              {destination.bestSeason}
            </strong>
          </div>
        </div>

        <div className="mt-3 flex min-h-[24px] flex-nowrap gap-1.5 overflow-hidden">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-full border border-white/20 bg-[#071A16]/30 px-2.5 py-1 text-[8px] font-semibold text-white/75 backdrop-blur-lg sm:text-[9px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
  
}