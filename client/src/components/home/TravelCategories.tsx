"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Backpack,
  Compass,
  Heart,
  Leaf,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { getTravelCategories } from "@/lib/api/slug";
import type { TravelCategory as ApiTravelCategory } from "@/types/travelCategory";

type TrustItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type TravelCategory = ApiTravelCategory & {
  icon: React.ReactNode;
};

const trustItems: TrustItem[] = [
  {
    title: "AI-powered recommendations",
    description: "Personalized just for you",
    icon: <Sparkles size={20} strokeWidth={2} />,
  },
  {
    title: "Real traveler insights",
    description: "From thousands of reviews",
    icon: <Users size={20} strokeWidth={2} />,
  },
  {
    title: "Smart travel planning",
    description: "Plan better, travel better",
    icon: <Compass size={20} strokeWidth={2} />,
  },
];

const categoryIconMap: Record<string, React.ReactNode> = {
  adventure: <Compass size={18} strokeWidth={2.2} />,
  beach: <Waves size={18} strokeWidth={2.2} />,
  family: <Users size={18} strokeWidth={2.2} />,
  romantic: <Heart size={18} strokeWidth={2.2} />,
  backpacking: <Backpack size={18} strokeWidth={2.2} />,
  nature: <Leaf size={18} strokeWidth={2.2} />,
  cultural: <Compass size={18} strokeWidth={2.2} />,
  relaxation: <Leaf size={18} strokeWidth={2.2} />,
  food: <Heart size={18} strokeWidth={2.2} />,
  luxury: <Sparkles size={18} strokeWidth={2.2} />,
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TravelCategories() {
  const [travelCategories, setTravelCategories] = useState<TravelCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTravelCategories = async () => {
      try {
        const data = await getTravelCategories();

        if (!isMounted) return;

        setTravelCategories(
          data.map((category) => ({
            ...category,
            icon: categoryIconMap[category.slug] ?? (
              <Compass size={18} strokeWidth={2.2} />
            ),
          })),
        );
      } catch (error) {
        console.error("Failed to load travel categories:", error);
      }
    };

    loadTravelCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isCarouselPaused || travelCategories.length === 0) return;

    const autoplay = window.setInterval(() => {
      setActiveCategory((current) =>
        current === travelCategories.length - 1 ? 0 : current + 1,
      );
    }, 3600);

    return () => window.clearInterval(autoplay);
  }, [isCarouselPaused, travelCategories.length]);

  const visibleCategories =
    travelCategories.length > 0
      ? [-2, -1, 0, 1, 2].map((offset) => {
          const index =
            (activeCategory + offset + travelCategories.length) %
            travelCategories.length;

          return {
            category: travelCategories[index],
            index,
            offset,
          };
        })
      : [];

  return (
    <section className="relative overflow-x-hidden bg-linear-to-b from-white via-[#FBFCFA] to-[#F4F8F5] pt-24 sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute -left-28 top-36 h-72 w-72 rounded-full bg-[#087F5B]/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#F4B942]/[0.08] blur-[110px]" />

      <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 xl:px-16">
        {/* TRUST / VALUE BAR */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: revealEase }}
          className="relative -top-5 z-20 -mt-8 overflow-hidden rounded-[22px] border border-[#DCE9E3]/80 bg-linear-to-r from-[#F2FAF6]/95 via-white/95 to-[#FFF7E8]/95 px-4 py-3 shadow-[0_18px_48px_rgba(23,33,29,0.12),inset_0_1px_0_rgba(255,255,255,0.90)] backdrop-blur-xl sm:px-5 lg:-mt-10 lg:px-6 lg:py-3.5"
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.75, 1, 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-8 top-0 h-px origin-center bg-linear-to-r from-transparent via-[#F4B942] to-transparent"
          />

          <div className="grid grid-cols-1 divide-y divide-[#DCE9E3]/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + index * 0.1,
                  ease: revealEase,
                }}
                className="group relative flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300 hover:bg-white/65 sm:px-5 lg:px-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#BFE4D5]/70 bg-linear-to-br from-[#E3F6EE] to-[#FFF0D0] text-[#087F5B] shadow-[0_6px_18px_rgba(8,127,91,0.09)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#F4B942]/60 group-hover:text-[#C87920]">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="[font-family:Georgia,'Times_New_Roman',serif] text-[14px] font-normal leading-[1.15] tracking-[-0.015em] text-[#17211D] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[15px]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.09em] text-[#708078] sm:text-[10px]">
                    {item.description}
                  </p>
                </div>

                <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-[#087F5B] via-[#F4B942] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CATEGORY HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.08, ease: revealEase }}
          className="mt-8 flex items-end justify-between gap-4 sm:mt-9"
        >
          <div>
            <h2 className="[font-family:Georgia,'Times_New_Roman',serif] text-[30px] font-normal leading-tight tracking-[-0.035em] text-[#17211D] sm:text-[36px] lg:text-[42px]">
              Find Your Way to{" "}
              <span className="bg-linear-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                Travel
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-xs font-medium leading-5 text-[#607169] sm:text-sm">
              Choose a travel style and discover experiences made for you.
            </p>
          </div>

          <Link
            href="/destinations"
            className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-bold text-[#B86D1B] transition-colors hover:text-[#087F5B] sm:flex"
          >
            View All Categories
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* 3D CATEGORY CAROUSEL */}

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-5 flex items-center justify-end lg:hidden"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE7E2] bg-white/85 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B] shadow-[0_8px_22px_rgba(23,33,29,0.08)] backdrop-blur-md sm:text-[11px]">
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: revealEase }}
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocusCapture={() => setIsCarouselPaused(true)}
          onBlurCapture={() => setIsCarouselPaused(false)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              setActiveCategory((current) =>
                current === travelCategories.length - 1 ? 0 : current + 1,
              );
            }

            if (event.key === "ArrowLeft") {
              setActiveCategory((current) =>
                current === 0 ? travelCategories.length - 1 : current - 1,
              );
            }
          }}
          className="relative mt-3 h-[390px] w-full overflow-hidden [contain:paint] [perspective:1400px] sm:h-[445px] lg:mt-5 lg:h-[500px]"
          role="region"
          aria-label="Travel categories carousel"
        >
          <AnimatePresence initial={false}>
            {visibleCategories.map(({ category, index, offset }) => {
              const distance = Math.abs(offset);
              const isActive = offset === 0;

              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: distance === 2 ? 0.58 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.48, ease: revealEase }}
                  style={{ zIndex: travelCategories.length - distance }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                <motion.div
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragStart={() => setIsCarouselPaused(true)}
                  onDragEnd={(_, info) => {
                    setIsCarouselPaused(false);

                    if (info.offset.x < -55 || info.velocity.x < -450) {
                      setActiveCategory((current) =>
                        current === travelCategories.length - 1
                          ? 0
                          : current + 1,
                      );
                    }

                    if (info.offset.x > 55 || info.velocity.x > 450) {
                      setActiveCategory((current) =>
                        current === 0
                          ? travelCategories.length - 1
                          : current - 1,
                      );
                    }
                  }}
                  initial={false}
                  animate={{
                    x: `${offset * 84}%`,
                    rotateY: offset === 0 ? 0 : offset < 0 ? 13 : -13,
                    scale:
                      distance === 0 ? 1 : distance === 1 ? 0.9 : 0.78,
                    filter:
                      distance === 0
                        ? "brightness(1) saturate(1.06)"
                        : "brightness(0.78) saturate(0.82)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 92,
                    damping: 24,
                    mass: 1.05,
                    restDelta: 0.001,
                    restSpeed: 0.001,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin:
                      offset < 0
                        ? "right center"
                        : offset > 0
                          ? "left center"
                          : "center center",
                  }}
                  className="pointer-events-auto h-[350px] w-[76vw] max-w-[300px] touch-pan-y sm:h-[400px] sm:w-[310px] sm:max-w-none lg:h-[455px] lg:w-[340px]"
                >
                  <Link
                    href={`/destinations?category=${category.slug}`}
                    aria-label={`${category.title}: ${category.destinations} destinations`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative block h-full overflow-hidden rounded-[22px] border border-white/45 bg-[#DDE9E3] shadow-[0_18px_44px_rgba(14,23,19,0.18)] outline-none transition-[border-color,box-shadow] duration-500 hover:border-[#FFD078]/75 hover:shadow-[0_24px_58px_rgba(14,23,19,0.24),0_0_30px_rgba(244,185,66,0.12)] focus-visible:ring-2 focus-visible:ring-[#F4B942] focus-visible:ring-offset-4"
                  >
                    <Image
                      src={category.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                      alt={category.title}
                      fill
                      sizes="(max-width: 640px) 76vw, (max-width: 1024px) 310px, 340px"
                      className="object-cover saturate-[1.08] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/90 via-black/[0.08] to-black/[0.04] transition-colors duration-500 group-hover:from-[#031D16]/82" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#087F5B]/[0.04] via-transparent to-[#F4B942]/[0.08] opacity-80 transition-opacity duration-500 group-hover:opacity-45" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                      <div className="min-w-0 text-left text-white">
                        <h3 className="truncate [font-family:Georgia,'Times_New_Roman',serif] text-[25px] font-normal leading-tight tracking-[-0.025em] [text-shadow:0_3px_20px_rgba(0,0,0,0.38)] sm:text-[29px]">
                          {category.title}
                        </h3>

                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFE0A2] sm:text-[10px]">
                          {category.destinations} destinations
                        </p>
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/55 bg-black/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition-all duration-300 group-hover:rotate-[-12deg] group-hover:border-[#FFD078] group-hover:bg-[#F4B942] group-hover:text-[#17211D] sm:h-12 sm:w-12">
                        <ArrowRight
                          size={20}
                          strokeWidth={1.6}
                          className="-rotate-45"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CAROUSEL PAGINATION */}

        <div className="mt-1 flex items-center justify-center gap-2 sm:mt-2">
          {travelCategories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(index)}
              aria-label={`Show ${category.title}`}
              aria-current={activeCategory === index ? "true" : undefined}
              className="group flex h-5 items-center justify-center px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B]/35"
            >
              <motion.span
                animate={{
                  width: activeCategory === index ? 24 : 6,
                  backgroundColor:
                    activeCategory === index ? "#087F5B" : "#BFD0C8",
                }}
                transition={{ duration: 0.3, ease: revealEase }}
                className="h-1.5 rounded-full group-hover:bg-[#F4B942]"
              />
            </button>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}

        <div className="mt-4 flex justify-center sm:hidden">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#DCE7E2] bg-[#F8FAF9] px-4 py-2 text-[11px] font-bold text-[#087F5B]"
          >
            View All Categories
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
    </section>
  );
}