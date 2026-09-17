"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Camera,
  CircleAlert,
  Heart,
  Mountain,
  Sparkles,
  Star,
  Sun,
  Target,
  Users,
  Utensils,
  Waves,
  Baby,
  Car,
  CloudSun,
  CalendarDays,
  Wallet,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type Recommendation = {
  id: number;
  title: string;
  location: string;
  match: number;
  rating: number;
  description: string;
  type: string;
  date: string;
  image: string;
};

/* ============================================================
   DATA
============================================================ */

const lovedThings = [
  {
    icon: Waves,
    label: "Beautiful Beaches",
    percentage: 96,
  },
  {
    icon: Sun,
    label: "Stunning Sunsets",
    percentage: 89,
  },
  {
    icon: Utensils,
    label: "Fresh Seafood",
    percentage: 91,
  },
  {
    icon: Mountain,
    label: "Scenic Marine Drive",
    percentage: 87,
  },
  {
    icon: Baby,
    label: "Family Friendly",
    percentage: 84,
  },
];

const concerns = [
  {
    icon: Users,
    label: "Peak-season Crowds",
    percentage: 32,
  },
  {
    icon: Car,
    label: "Weekend Traffic",
    percentage: 28,
  },
  {
    icon: CloudSun,
    label: "Weather Changes",
    percentage: 16,
  },
  {
    icon: CalendarDays,
    label: "Holiday Availability",
    percentage: 12,
  },
  {
    icon: Wallet,
    label: "Seasonal Price Changes",
    percentage: 10,
  },
];

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: "Cox's Bazar",
    location: "Cox's Bazar, Bangladesh",
    match: 96,
    rating: 4.8,
    description: "Perfect family beach getaway",
    type: "Family Trip",
    date: "Feb 2026",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    title: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    match: 94,
    rating: 4.9,
    description: "Peaceful mountain escape",
    type: "Couple Trip",
    date: "Jan 2026",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    title: "Bandarban",
    location: "Bandarban, Bangladesh",
    match: 91,
    rating: 4.8,
    description: "An amazing adventure",
    type: "Friends Trip",
    date: "Dec 2025",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=700&q=85",
  },
];

/* ============================================================
   MOTION
============================================================ */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.045,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mb-5
        flex
        flex-col
        gap-2.5
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
    >
      <div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          >
            <Sparkles
              size={16}
              className="text-[#F4A62A]"
              fill="currentColor"
            />
          </motion.div>

          <h2
            className="
              text-[17px]
              font-bold
              tracking-[-0.02em]
              text-[#17211D]
              sm:text-[19px]
            "
          >
            AI-Powered Review Intelligence
          </h2>
        </div>

        <p
          className="
            mt-1.5
            max-w-[620px]
            text-[11px]
            leading-5
            text-[#66736D]
          "
        >
          Understand thousands of traveler experiences at a glance with
          AI-powered summaries and personalized insights.
        </p>
      </div>

      <Link
        href="/reviews/insights"
        className="
          group
          inline-flex
          shrink-0
          items-center
          gap-1.5
          text-[10px]
          font-semibold
          text-[#0B6B50]
          transition-colors
          duration-200
          hover:text-[#F4A62A]
        "
      >
        How AI works
        <motion.span
          whileHover={{ x: 4 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <ArrowRight size={13} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   GENERIC CARD
============================================================ */

function IntelligenceCard({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }
      }
      className={`
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[16px]
        border
        border-[#DCE5E1]
        shadow-[0_4px_18px_rgba(11,37,34,0.055)]
        transition-[box-shadow,border-color]
        duration-300
        hover:border-[#C8D8D1]
        hover:shadow-[0_18px_40px_rgba(11,37,34,0.12)]
        ${className}
      `}
    >
      {children}
    </motion.article>
  );
}

/* ============================================================
   AI REVIEW INSIGHTS
============================================================ */

function AIInsightsCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <IntelligenceCard
      index={0}
      className="
        min-h-[390px]
        border-[#075143]
        bg-[#063A2F]
        text-white
      "
    >
      {/* ======================================================
          TOP BACKGROUND IMAGE
      ======================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          h-[155px]
          w-[190px]
          overflow-hidden
          rounded-bl-[70px]
          opacity-80
        "
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.04,
              }
        }
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=90"
          alt=""
          fill
          sizes="190px"
          className="
            object-cover
            object-center
            opacity-50
            mix-blend-screen
          "
        />

        {/* Top image gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#063A2F]
            via-[#063A2F]/40
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-transparent
            via-[#063A2F]/20
            to-[#063A2F]
          "
        />
      </motion.div>

      {/* Decorative glow */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          z-0
          h-52
          w-52
          rounded-full
          bg-[#087F5B]/25
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 14, -5, 0],
                y: [0, 10, -7, 0],
                scale: [1, 1.08, 0.98, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-70px]
          left-[-60px]
          z-0
          h-44
          w-44
          rounded-full
          bg-[#F4A62A]/10
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 12, 0],
                y: [0, -12, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ======================================================
          CONTENT
      ======================================================= */}

      <div className="relative z-10 flex h-full flex-1 flex-col p-5">
        {/* Header */}

        <motion.div
          className="flex items-center gap-2.5"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 12,
                    scale: 1.08,
                  }
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#F4B942]/20
              bg-[#F4A62A]/15
              text-[#F4B942]
            "
          >
            <Sparkles size={15} fill="currentColor" />
          </motion.div>

          <h3 className="text-[14px] font-bold">AI Review Insights</h3>
        </motion.div>

        <p
          className="
            mt-3
            max-w-[225px]
            text-[10px]
            leading-[1.65]
            text-white/70
          "
        >
          We analyze thousands of reviews to summarize what travelers really
          think.
        </p>

        {/* Reviews analyzed */}

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -3,
                  scale: 1.02,
                }
          }
          className="
            mt-4
            inline-flex
            w-fit
            flex-col
            rounded-lg
            border
            border-white/10
            bg-white/[0.06]
            px-3
            py-2
            backdrop-blur-sm
          "
        >
          <span className="text-[9px] text-white/45">Reviews Analyzed</span>

          <span className="mt-0.5 text-[13px] font-bold text-white">
            1,200+
          </span>
        </motion.div>

        {/* AI Summary */}

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -3,
                  borderColor: "rgba(244,185,66,0.25)",
                }
          }
          className="
            relative
            mt-4
            rounded-xl
            border
            border-white/10
            bg-[#0A463A]/80
            p-3.5
            backdrop-blur-[2px]
            transition-colors
            duration-300
          "
        >
          <div className="flex items-center gap-2">
            <Bot size={14} className="text-[#F4B942]" />

            <span className="text-[10px] font-semibold text-white/85">
              AI Summary
            </span>
          </div>

          <p
            className="
              mt-2.5
              text-[9px]
              leading-[1.6]
              text-white/70
            "
          >
            Travelers consistently praise Cox&apos;s Bazar for its long beaches,
            stunning sunsets, fresh seafood and scenic Marine Drive. Peak-season
            crowds and weekend traffic are the most common concerns.
          </p>
        </motion.div>

        {/* Bottom */}

        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <span className="block text-[8px] text-white/40">Confidence</span>

            <motion.span
              className="
                mt-0.5
                block
                text-[11px]
                font-bold
                text-[#F4B942]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.7, 1, 0.7],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              High
            </motion.span>
          </div>

          <Link
            href="/reviews/insights"
            className="
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-lg
              border
              border-white/20
              bg-white/[0.03]
              px-3
              text-[8px]
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-[#F4B942]
              hover:bg-[#F4B942]
              hover:text-[#063A2F]
            "
          >
            View Full Insights
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </IntelligenceCard>
  );
}

/* ============================================================
   SENTIMENT ANALYSIS
============================================================ */

function SentimentAnalysisCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <IntelligenceCard
      index={1}
      className="
        min-h-[390px]
        bg-white
      "
    >
      <div className="flex h-full flex-1 flex-col p-5">
        {/* Header */}

        <motion.div
          className="flex items-center gap-2.5"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: -8,
                    scale: 1.08,
                  }
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#087F5B]/10
              text-[#087F5B]
            "
          >
            <BarChart3 size={16} />
          </motion.div>

          <h3 className="text-[14px] font-bold text-[#17211D]">
            Sentiment Analysis
          </h3>
        </motion.div>

        <p className="mt-3 text-[10px] text-[#66736D]">
          Overall traveler sentiment
        </p>

        {/* Donut */}

        <div className="mt-5 flex justify-center">
          <motion.div
            className="relative h-[140px] w-[140px]"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.05,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  conic-gradient(
                    #087F5B 0% 88%,
                    #F4A62A 88% 96%,
                    #EF5B52 96% 100%
                  )
                `,
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, 4, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div
              className="
                absolute
                inset-[12px]
                flex
                flex-col
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >
              <span
                className="
                  font-serif
                  text-[26px]
                  font-semibold
                  text-[#17211D]
                "
              >
                88%
              </span>

              <span className="mt-0.5 text-[10px] font-medium text-[#087F5B]">
                Positive
              </span>
            </div>
          </motion.div>
        </div>

        {/* Legend */}

        <div className="mt-5 grid grid-cols-3 gap-2">
          <SentimentLegend
            color="bg-[#087F5B]"
            percentage="88%"
            label="Positive"
          />

          <SentimentLegend
            color="bg-[#F4A62A]"
            percentage="8%"
            label="Neutral"
          />

          <SentimentLegend
            color="bg-[#EF5B52]"
            percentage="4%"
            label="Negative"
          />
        </div>

        {/* Bottom Button */}

        <Link
          href="/reviews/sentiment"
          className="
            group
            mt-auto
            flex
            items-center
            justify-center
            gap-1.5
            pt-5
            text-[10px]
            font-semibold
            text-[#0B6B50]
            transition-colors
            hover:text-[#F4A62A]
          "
        >
          See Sentiment by Category
          <motion.span
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
          >
            <ArrowRight size={12} />
          </motion.span>
        </Link>
      </div>
    </IntelligenceCard>
  );
}

/* ============================================================
   SENTIMENT LEGEND
============================================================ */

function SentimentLegend({
  color,
  percentage,
  label,
}: {
  color: string;
  percentage: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        flex
        cursor-default
        items-center
        justify-center
        gap-1.5
        rounded-md
        py-1
        transition-colors
        hover:bg-[#F7F7F2]
      "
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />

      <div>
        <p className="text-[9px] font-bold text-[#17211D]">{percentage}</p>

        <p className="text-[8px] text-[#8A9590]">{label}</p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   LOVE + CONCERNS
============================================================ */

function LoveAndConcernsCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <IntelligenceCard
      index={2}
      className="
        min-h-[390px]
        bg-white
      "
    >
      <div className="flex h-full flex-1 flex-col p-5">
        {/* Header */}

        <motion.div
          className="flex items-center gap-2.5"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.1,
                    rotate: -6,
                  }
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#087F5B]/10
              text-[#087F5B]
            "
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>

          <h3 className="text-[14px] font-bold text-[#17211D]">
            What Travelers Love
          </h3>
        </motion.div>

        {/* Love */}

        <div className="mt-4 space-y-1">
          {lovedThings.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                custom={index}
                variants={rowVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                        backgroundColor: "rgba(8,127,91,0.045)",
                      }
                }
                className="
                  flex
                  cursor-default
                  items-center
                  gap-2
                  rounded-lg
                  px-1
                  py-1
                  transition-colors
                "
              >
                <div
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    bg-[#087F5B]/10
                    text-[#087F5B]
                  "
                >
                  <Icon size={11} />
                </div>

                <span className="min-w-0 flex-1 truncate text-[9px] text-[#4E5D56]">
                  {item.label}
                </span>

                <span className="text-[9px] font-bold text-[#087F5B]">
                  {item.percentage}%
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="my-3 h-px bg-[#E6ECE9]" />

        {/* Concerns */}

        <div className="flex items-center gap-2">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          >
            <CircleAlert size={15} className="text-[#C7372F]" />
          </motion.div>

          <h4 className="text-[12px] font-bold text-[#C7372F]">
            Common Concerns
          </h4>
        </div>

        <div className="mt-2 space-y-1">
          {concerns.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                custom={index}
                variants={rowVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                        backgroundColor: "rgba(199,55,47,0.035)",
                      }
                }
                className="
                  flex
                  cursor-default
                  items-center
                  gap-2
                  rounded-lg
                  px-1
                  py-1
                  transition-colors
                "
              >
                <Icon size={11} className="shrink-0 text-[#D14A43]" />

                <span className="min-w-0 flex-1 truncate text-[9px] text-[#4E5D56]">
                  {item.label}
                </span>

                <span className="text-[9px] font-bold text-[#D14A43]">
                  {item.percentage}%
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Button */}

        <Link
          href="/reviews/pros-cons"
          className="
            group
            mt-auto
            flex
            items-center
            justify-center
            gap-1.5
            pt-3.5
            text-[10px]
            font-semibold
            text-[#0B6B50]
            transition-colors
            hover:text-[#F4A62A]
          "
        >
          View All Pros &amp; Cons
          <motion.span
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
          >
            <ArrowRight size={12} />
          </motion.span>
        </Link>
      </div>
    </IntelligenceCard>
  );
}

/* ============================================================
   REVIEWS PICKED FOR YOU
============================================================ */

function ReviewsPickedForYouCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <IntelligenceCard
      index={3}
      className="
        min-h-[390px]
        border-[#075143]
        bg-[#063A2F]
        text-white
      "
    >
      {/* Background glow */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#087F5B]/25
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 12, -4, 0],
                y: [0, 10, -5, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex h-full flex-1 flex-col p-5">
        {/* Header */}

        <motion.div
          className="flex items-center gap-2.5"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 10,
                    scale: 1.08,
                  }
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#F4B942]/20
              bg-[#F4A62A]/15
              text-[#F4B942]
            "
          >
            <Target size={16} />
          </motion.div>

          <h3 className="text-[14px] font-bold text-white">
            Reviews Picked For You
          </h3>
        </motion.div>

        <p className="mt-3 text-[10px] text-white/60">
          Personalized for your interests
        </p>

        {/* Tags */}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            {
              label: "Beach",
              icon: Waves,
            },
            {
              label: "Family",
              icon: Users,
            },
            {
              label: "Food",
              icon: Utensils,
            },
            {
              label: "Photography",
              icon: Camera,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <motion.span
                key={item.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.04,
                        borderColor: "rgba(244,185,66,0.55)",
                        backgroundColor: "rgba(244,166,42,0.10)",
                      }
                }
                transition={{
                  duration: 0.2,
                }}
                className="
                  inline-flex
                  cursor-default
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.06]
                  px-2
                  py-1
                  text-[8px]
                  font-medium
                  text-white/75
                  backdrop-blur-sm
                "
              >
                <Icon size={9} className="text-[#F4B942]" />

                {item.label}
              </motion.span>
            );
          })}
        </div>

        {/* Recommendation list */}

        <div className="mt-4 space-y-1">
          {recommendations.map((recommendation, index) => (
            <RecommendationItem
              key={recommendation.id}
              recommendation={recommendation}
              index={index}
            />
          ))}
        </div>

        {/* Bottom button */}

        <Link
          href="/reviews/for-you"
          className="
            group
            mt-auto
            flex
            h-8
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-white/25
            bg-white/[0.03]
            pt-0
            text-[9px]
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-[#F4B942]
            hover:bg-[#F4B942]
            hover:text-[#063A2F]
          "
        >
          See More For You
          <motion.span
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
          >
            <ArrowRight size={11} />
          </motion.span>
        </Link>
      </div>
    </IntelligenceCard>
  );
}

/* ============================================================
   RECOMMENDATION ITEM
============================================================ */

function RecommendationItem({
  recommendation,
  index,
}: {
  recommendation: Recommendation;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const slug = recommendation.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 8,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: "easeOut",
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: 3,
            }
      }
    >
      <Link
        href={`/destinations/${slug}`}
        className="
          group/recommendation
          flex
          gap-2.5
          rounded-lg
          p-1
          transition-colors
          duration-200
          hover:bg-white/[0.06]
        "
      >
        {/* Image */}

        <motion.div
          className="
            relative
            h-[48px]
            w-[64px]
            shrink-0
            overflow-hidden
            rounded-lg
            border
            border-white/10
          "
        >
          <Image
            src={recommendation.image}
            alt={recommendation.title}
            fill
            sizes="64px"
            className="
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover/recommendation:scale-110
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/10
              transition-colors
              duration-300
              group-hover/recommendation:bg-transparent
            "
          />
        </motion.div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <h4
              className="
                truncate
                text-[10px]
                font-bold
                text-white
                transition-colors
                duration-200
                group-hover/recommendation:text-[#F4B942]
              "
            >
              {recommendation.title}
            </h4>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-0.5
                text-[9px]
                font-bold
                text-[#F4B942]
              "
            >
              <Star size={9} fill="currentColor" />

              {recommendation.rating}
            </div>
          </div>

          <p
            className="
              mt-0.5
              text-[8px]
              font-medium
              text-[#6DD4B3]
            "
          >
            AI Match {recommendation.match}%
          </p>

          <p className="mt-0.5 truncate text-[8px] text-white/65">
            &quot;{recommendation.description}&quot;
          </p>

          <p className="mt-0.5 text-[7px] text-white/40">
            {recommendation.type} · {recommendation.date}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function AIReviewIntelligence() {
  return (
    <section
      aria-labelledby="ai-review-intelligence-title"
      className="
        bg-[#F7F7F2]
        py-5
        sm:py-6
        lg:py-7
      "
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        <SectionHeader />

        {/* ====================================================
            FOUR EQUAL HEIGHT CARDS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <AIInsightsCard />

          <SentimentAnalysisCard />

          <LoveAndConcernsCard />

          <ReviewsPickedForYouCard />
        </div>
      </div>
    </section>
  );
}
