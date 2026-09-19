"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  Compass,
  Map,
  Plane,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

type JourneyStep = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  desktopPosition: string;
};

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore destinations based on your interests, budget and travel style.",
    icon: <Compass size={29} strokeWidth={1.7} />,
    desktopPosition: "left-[7%] top-[20px]",
  },
  {
    number: "02",
    title: "Evaluate",
    description:
      "Understand ratings, traveler reviews and AI insights.",
    icon: <Map size={29} strokeWidth={1.7} />,
    desktopPosition: "left-[32%] top-[105px]",
  },
  {
    number: "03",
    title: "Plan",
    description: "Create your personalized trip using AI.",
    icon: <ClipboardCheck size={29} strokeWidth={1.7} />,
    desktopPosition: "left-[62%] top-[70px]",
  },
  {
    number: "04",
    title: "Travel Better",
    description:
      "Optimize your budget, collaborate and manage your journey.",
    icon: <Users size={29} strokeWidth={1.7} />,
    desktopPosition: "left-[89%] top-[28px]",
  },
];

export default function TravelJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#fcfaf5] pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20">
      {/* Bangladesh map shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-170px] left-1/2 h-[580px] w-[430px] -translate-x-1/2 bg-contain bg-bottom bg-no-repeat opacity-[0.035] sm:h-[680px] sm:w-[500px] lg:bottom-[-260px] lg:h-[850px] lg:w-[620px]"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/e/ea/Bangladesh_divisions_english.svg')",
          filter: "brightness(0) saturate(100%)",
        }}
      />

      {/* Background glows */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#dcece4]/50 blur-[100px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#e8c77c]/15 blur-[110px]" />

      {/* Topographic decoration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 300"
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 85C80 10 175 150 330 70s280 90 440 5 230 30 320-20"
          fill="none"
          stroke="#194f3e"
          strokeWidth="1"
        />
        <path
          d="M-100 112C70 28 190 174 344 93s275 90 430 15 240 12 335-35"
          fill="none"
          stroke="#194f3e"
          strokeWidth="1"
        />
        <path
          d="M-70 140C95 56 205 196 360 120s265 88 420 22 225 0 325-40"
          fill="none"
          stroke="#194f3e"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        {/* Heading */}
<motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.7 }}
  transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="max-w-[900px]"
>
  {/* Eyebrow */}
  <div className="flex items-center gap-3">
    <motion.span
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.15,
      }}
      className="h-px w-9 origin-left bg-[#d9901f]"
    />

    <span className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#008566] sm:text-[11px]">
      Curated for every journey
    </span>
  </div>

  {/* Main heading */}
  <h2
    className="mt-3 text-[38px] leading-[1.05] tracking-[-0.045em] text-[#17211d] sm:text-[50px] lg:text-[62px]"
    style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}
  >
    From Inspiration to{" "}
    <span className="font-normal italic text-[#df8d19]">
      Itinerary
    </span>
  </h2>

  {/* Subtitle */}
  <p className="mt-3 max-w-[620px] text-[14px] font-medium leading-relaxed text-[#65766f] sm:text-[16px]">
    Discover, evaluate and plan every part of your journey with confidence.
  </p>
</motion.div>

        {/* Desktop journey */}
        <div className="relative mt-8 hidden h-[410px] lg:block">
          {/* Curved route */}
          <svg
            viewBox="0 0 1200 330"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.path
              d="M84 135C210 75 300 225 384 220C520 180 620 205 744 170C870 135 960 75 1068 145"
              fill="none"
              stroke="#fff7e7"
              strokeWidth="7"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            <motion.path
              d="M84 135C210 75 300 225 384 220C520 180 620 205 744 170C870 135 960 75 1068 145"
              fill="none"
              stroke="#b97916"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="7 10"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 2,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>

          {/* Animated plane */}
          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : {
                    left: ["7%", "32%", "62%", "89%"],
                    top: ["115px", "200px", "150px", "122px"],
                    rotate: [5, 18, -9, 4],
                  }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.34, 0.68, 1],
            }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-[#bd7d18] drop-shadow-[0_5px_6px_rgba(118,74,11,0.25)]"
          >
            <Plane size={31} fill="currentColor" strokeWidth={1.3} />
          </motion.div>

          {/* Desktop pins */}
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 50,
                      scale: 0.75,
                      rotateX: 22,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: 0.3 + index * 0.18,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute w-[230px] -translate-x-1/2 text-center ${step.desktopPosition}`}
            >
              <JourneyPin icon={step.icon} index={index} />

              <div className="mt-3">
                <h3 className="font-serif text-[25px] tracking-[-0.025em] text-[#093f31]">
                  <span className="mr-2 text-[#bd8121]">{step.number}</span>
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[210px] text-[12px] font-medium leading-[1.65] text-[#50645d]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile and tablet journey */}
        <div className="relative mx-auto mt-12 max-w-[650px] lg:hidden">
          {/* Vertical route */}
          <motion.div
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-10 left-[39px] top-9 origin-top border-l-2 border-dashed border-[#c38a31]/70 sm:left-[45px]"
          />

          <div className="space-y-9">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -28,
                        rotateY: -12,
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  delay: index * 0.13,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center gap-5 sm:gap-7"
              >
                <JourneyPin
                  icon={step.icon}
                  index={index}
                  compact
                />

                <div className="min-w-0 flex-1 rounded-[20px] border border-white/80 bg-white/55 px-5 py-4 shadow-[0_12px_32px_rgba(21,67,52,0.07)] backdrop-blur-md">
                  <h3 className="font-serif text-[21px] tracking-[-0.02em] text-[#093f31] sm:text-[24px]">
                    <span className="mr-2 text-[#bd8121]">
                      {step.number}
                    </span>
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] font-medium leading-[1.65] text-[#586c65] sm:text-[13px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyPin({
  icon,
  index,
  compact = false,
}: {
  icon: ReactNode;
  index: number;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduceMotion
          ? undefined
          : {
              rotateX: -9,
              rotateY: index % 2 === 0 ? 13 : -13,
              scale: 1.06,
            }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 16,
      }}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative z-10 shrink-0 ${
        compact ? "w-[80px] sm:w-[92px]" : "mx-auto w-[106px]"
      }`}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -6, 0],
                rotateY: [0, 5, 0, -5, 0],
              }
        }
        transition={{
          duration: 4 + index * 0.35,
          delay: index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center"
      >
        {/* Pin */}
        <div
          className={`relative ${
            compact
              ? "h-[70px] w-[70px] sm:h-[78px] sm:w-[78px]"
              : "h-[94px] w-[94px]"
          }`}
        >
          <div className="absolute inset-0 -rotate-45 rounded-[50%_50%_50%_9px] border border-[#dab977] bg-gradient-to-br from-white via-[#fbf6eb] to-[#e9ddc7] shadow-[8px_12px_25px_rgba(46,66,57,0.2),inset_3px_3px_9px_rgba(255,255,255,0.95)]">
            <div className="absolute inset-[8px] rounded-full border border-white bg-gradient-to-br from-white to-[#f1e8d7] shadow-[inset_0_2px_6px_rgba(94,67,25,0.12)]" />

            <div
              className={`absolute inset-[15px] flex rotate-45 items-center justify-center rounded-full border border-[#d8b66e] bg-[#fffdf8] text-[#0b513e] shadow-[0_5px_13px_rgba(37,71,58,0.1)] ${
                compact ? "[&>svg]:h-[22px] [&>svg]:w-[22px]" : ""
              }`}
              style={{ transform: "rotate(45deg) translateZ(18px)" }}
            >
              {icon}
            </div>
          </div>
        </div>

        {/* Ground point */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scaleX: [1, 0.78, 1],
                  opacity: [0.35, 0.18, 0.35],
                }
          }
          transition={{
            duration: 4 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="-mt-1 flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-white bg-[#c48a28] shadow-[0_4px_12px_rgba(113,73,14,0.35)]"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-[#fff8e8]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}