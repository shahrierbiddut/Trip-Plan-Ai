"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowLeft, MapPin, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import LoginForm from "./LoginForm";

const revealEase = [0.22, 1, 0.36, 1] as const;

const navigationItems = [
  { label: "Explore", href: "/travel-categories" },
  { label: "Destinations", href: "/destinations" },
  { label: "Plan My Trip", href: "/plan-trip" },
  { label: "Reviews", href: "/reviews" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
] as const;

const destinationCards = [
  {
    name: "Sajek Valley",
    note: "Cloud-kissed mountains",
    image: "/assets/Sajek/cover-1.jpg",
    className: "right-[5%] top-[8%]",
  },
  {
    name: "Cox's Bazar",
    note: "World's longest sea beach",
    image: "/assets/Coxs/cover-1.jpg",
    className: "left-[5%] top-[49%]",
  },
  {
    name: "Saint Martin",
    note: "Coral island paradise",
    image: "/assets/Saintmartin/cover-1.jpg",
    className: "bottom-[5%] right-[5%]",
  },
] as const;

export default function LoginPage() {
  const prefersReducedMotion = useReducedMotion();

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(rotateYValue, { stiffness: 120, damping: 18 });

  const handleMapMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXValue.set(y * -4);
    rotateYValue.set(x * 5);
  };

  const resetMapTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F3] text-[#17211D] antialiased">
      <LoginNavbar prefersReducedMotion={Boolean(prefersReducedMotion)} />

      <section className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 pb-8 pt-[92px] sm:px-6 sm:pb-10 sm:pt-[104px] lg:min-h-screen lg:grid-cols-[1.28fr_0.88fr] lg:items-stretch lg:gap-6 lg:px-8 lg:pb-8 xl:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: revealEase }}
          className="order-2 min-h-[390px] [perspective:1200px] sm:min-h-[520px] lg:order-1 lg:min-h-0"
          onMouseMove={handleMapMove}
          onMouseLeave={resetMapTilt}
        >
          <motion.div
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full min-h-[390px] overflow-hidden rounded-[24px] border border-[#DCE6E1] bg-[#E9E8D9] shadow-[0_24px_60px_rgba(23,51,42,0.14)] sm:min-h-[520px] sm:rounded-[30px] lg:min-h-[660px]"
          >
            <Image
              src="/images/login/bangladesh-3d-route-map.png"
              alt="Three-dimensional travel map of Bangladesh"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-[#071A16]/[0.12]" />
            <div className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/[0.74] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#087F5B] shadow-sm backdrop-blur-xl sm:left-7 sm:top-7 sm:text-[10px]">
              Your journey, mapped by AI
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <motion.path
                d="M 67 23 C 55 33, 64 43, 52 56 C 42 66, 52 73, 47 84"
                fill="none"
                stroke="rgba(255,255,255,0.88)"
                strokeWidth="0.55"
                strokeDasharray="1.4 1.8"
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, delay: 0.55, ease: revealEase }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 67 23 C 55 33, 64 43, 52 56 C 42 66, 52 73, 47 84"
                fill="none"
                stroke="#087F5B"
                strokeWidth="1.25"
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.35, ease: revealEase }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <motion.div
              aria-hidden="true"
              className="absolute z-20 text-white drop-shadow-[0_3px_8px_rgba(7,26,22,0.35)]"
              initial={{ left: "65%", top: "24%", opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { left: "52%", top: "54%", opacity: 1 }
                  : {
                      left: ["65%", "55%", "51%", "47%"],
                      top: ["24%", "39%", "58%", "81%"],
                      rotate: [145, 168, 152, 160],
                      opacity: [0, 1, 1, 1],
                    }
              }
              transition={{
                duration: 8,
                delay: 1.1,
                ease: "easeInOut",
                repeat: prefersReducedMotion ? 0 : Infinity,
                repeatDelay: 1.2,
              }}
            >
              <Plane size={21} fill="currentColor" strokeWidth={1.5} />
            </motion.div>

            <MapMarker
              label="Sajek Valley"
              className="left-[64%] top-[20%]"
              delay={0.55}
            />
            <MapMarker
              label="Cox's Bazar"
              className="left-[49%] top-[52%]"
              delay={0.75}
            />
            <MapMarker
              label="Saint Martin"
              className="bottom-[11%] left-[44%]"
              delay={0.95}
            />

            <div className="block">
              {destinationCards.map((destination, index) => (
                <motion.article
                  key={destination.name}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 18, rotate: index === 1 ? -2 : 2 }
                  }
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.85 + index * 0.14,
                    ease: revealEase,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.035, rotateY: index % 2 ? -4 : 4 }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute z-30 w-[118px] overflow-hidden rounded-[14px] border border-white/75 bg-[#071A16]/[0.88] p-1 text-white shadow-[0_16px_35px_rgba(7,26,22,0.24)] backdrop-blur-lg sm:w-[150px] sm:rounded-[17px] sm:p-1.5 xl:w-[170px] ${destination.className}`}
                >
                  <div className="relative h-[62px] overflow-hidden rounded-[10px] sm:h-[82px] sm:rounded-[12px] xl:h-[96px]">
                    <Image
                      src={destination.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 118px, 170px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>
                  <div className="px-1 pb-1 pt-1.5 sm:px-1.5 sm:pb-1.5 sm:pt-2">
                    <h2 className="text-[9px] font-bold sm:text-[11px] xl:text-[12px]">
                      {destination.name}
                    </h2>
                    <p className="mt-0.5 text-[7px] text-white/[0.68] sm:text-[8px] xl:text-[9px]">
                      {destination.note}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/45" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: revealEase }}
          className="order-1 flex items-center lg:order-2"
        >
          <div className="w-full rounded-[24px] border border-[#DDE5E1] bg-white/[0.88] p-5 shadow-[0_22px_60px_rgba(23,51,42,0.10)] backdrop-blur-xl sm:rounded-[30px] sm:p-8 lg:p-9 xl:p-11">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087F5B] sm:text-[11px]">
              Welcome back
            </p>

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 12, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.32, ease: revealEase }}
              className="mt-4"
            >
              <Link
                href="/"
                aria-label="TripPlan AI Home"
                className="group inline-flex items-center gap-3"
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotateX: [0, -8, 0, 7, 0],
                          rotateY: [0, 12, 0, -10, 0],
                          scale: [1, 1.045, 1, 1.025, 1],
                          boxShadow: [
                            "0 9px 24px rgba(217,134,31,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
                            "0 14px 34px rgba(217,134,31,0.48), inset 0 1px 0 rgba(255,255,255,0.55)",
                            "0 9px 24px rgba(217,134,31,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
                          ],
                        }
                  }
                  transition={{
                    duration: 5.5,
                    ease: "easeInOut",
                    repeat: prefersReducedMotion ? 0 : Infinity,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -4, scale: 1.08, rotateZ: -5 }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_9px_24px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] sm:h-[58px] sm:w-[58px]"
                >
                  <span className="pointer-events-none absolute inset-[4px] rounded-full border border-[#FFF0C2]/70" />
                  <Plane
                    size={27}
                    strokeWidth={2.3}
                    className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.div>

                <motion.span
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, x: -12 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.48,
                    ease: revealEase,
                  }}
                  className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[34px]"
                >
                  TripPlan <span className="text-[#D88928]">AI</span>
                </motion.span>
              </Link>
            </motion.div>

            <p className="mt-4 max-w-[480px] text-[13px] font-medium leading-6 text-[#66766F] sm:text-[14px]">
              Sign in to revisit saved places and continue your AI-planned
              journey.
            </p>

            <LoginForm prefersReducedMotion={Boolean(prefersReducedMotion)} />
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function LoginNavbar({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-7">
      <motion.nav
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: -22, scale: 0.985 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: revealEase }}
        className="mx-auto flex h-[64px] w-full max-w-[1420px] items-center rounded-[22px] border border-white/75 bg-white/[0.78] px-3 shadow-[0_14px_40px_rgba(7,26,22,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl sm:rounded-full sm:px-5 lg:px-7"
      >
        <Link
          href="/"
          aria-label="TripPlan AI Home"
          className="group z-20 flex shrink-0 items-center"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
              <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />
              <Plane
                size={20}
                strokeWidth={2.3}
                className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>

            <span className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[20px]">
              TripPlan <span className="text-[#D88928]">AI</span>
            </span>
          </div>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 text-[13px] font-semibold tracking-[-0.01em] text-[#30483F] transition-colors hover:text-[#B86D1B] xl:px-4 xl:text-[14px]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-full px-3 text-[12px] font-bold text-[#40554D] transition-colors hover:bg-white hover:text-[#087F5B] sm:px-4 sm:text-[13px]"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </motion.nav>
    </header>
  );
}

function MapMarker({
  label,
  className,
  delay,
}: {
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: revealEase }}
      className={`absolute z-20 flex items-center gap-1.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#FFE2A0] bg-gradient-to-br from-[#FFC44F] to-[#E99123] text-[#17332A] shadow-[0_8px_18px_rgba(217,134,31,0.30)] sm:h-10 sm:w-10">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#F4A934]/[0.22]" />
        <MapPin size={18} fill="currentColor" className="relative" />
      </span>
      <span className="hidden rounded-full border border-white/70 bg-white/[0.88] px-2.5 py-1 text-[9px] font-bold text-[#17332A] shadow-sm backdrop-blur-md xl:block">
        {label}
      </span>
    </motion.div>
  );
}
