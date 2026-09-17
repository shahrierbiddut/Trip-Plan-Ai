"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Heart,
  Info,
  MapPin,
  MessageSquareText,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Waves,
  Utensils,
  Car,
  Sun,
  Camera,
  ShieldCheck,
} from "lucide-react";

/* ============================================================
   DATA
============================================================ */

// const highlights = [
//   {
//     icon: Waves,
//     title: "Beautiful Beaches",
//     percentage: 96,
//     color: "emerald",
//   },
//   {
//     icon: Sun,
//     title: "Stunning Sunsets",
//     percentage: 89,
//     color: "gold",
//   },
//   {
//     icon: Utensils,
//     title: "Fresh Seafood",
//     percentage: 91,
//     color: "emerald",
//   },
//   {
//     icon: Camera,
//     title: "Scenic Photography",
//     percentage: 87,
//     color: "gold",
//   },
// ];

const concerns = [
  {
    icon: Users,
    title: "Peak-season Crowds",
    percentage: 32,
  },
  {
    icon: Car,
    title: "Weekend Traffic",
    percentage: 28,
  },
  {
    icon: Clock3,
    title: "Long Waiting Times",
    percentage: 19,
  },
  {
    icon: CircleAlert,
    title: "Weather Changes",
    percentage: 16,
  },
];

const categories = [
  {
    label: "Overall Experience",
    score: 4.9,
  },
  {
    label: "Family Experience",
    score: 4.9,
  },
  {
    label: "Food & Dining",
    score: 4.7,
  },
  {
    label: "Transportation",
    score: 4.8,
  },
  {
    label: "Accommodation",
    score: 4.7,
  },
  {
    label: "Safety & Security",
    score: 4.2,
  },
  {
    label: "Cleanliness",
    score: 4.5,
  },
  {
    label: "Value for Money",
    score: 4.7,
  },
];

const recentReviews = [
  {
    name: "Rahim Ahmed",
    initials: "RA",
    rating: 5,
    date: "2 weeks ago",
    trip: "Family Trip",
    text: "The beach was beautiful and the sunset was unforgettable. Marine Drive was definitely one of the highlights.",
    tags: ["Beach", "Family"],
  },
  {
    name: "Nusrat Jahan",
    initials: "NJ",
    rating: 4,
    date: "1 month ago",
    trip: "Couple Trip",
    text: "Loved the scenery and seafood. It gets quite busy during weekends, but overall the experience was excellent.",
    tags: ["Food", "Scenery"],
  },
  {
    name: "Tanvir Hasan",
    initials: "TH",
    rating: 5,
    date: "1 month ago",
    trip: "Friends Trip",
    text: "Great destination for a short escape. We especially enjoyed the Marine Drive and evening beach walks.",
    tags: ["Adventure", "Photography"],
  },
];

/* ============================================================
   MOTION
============================================================ */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   STAR RATING
============================================================ */

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating ? "fill-[#F4B942] text-[#F4B942]" : "text-[#D5DDD9]"
          }
        />
      ))}
    </div>
  );
}

/* ============================================================
   INSIGHT STAT
============================================================ */

function InsightStat({
  icon: Icon,
  label,
  value,
  description,
  accent = "emerald",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  accent?: "emerald" | "gold";
}) {
  const gold = accent === "gold";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        group
        rounded-2xl
        border
        border-[#DDE6E1]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(11,37,34,0.045)]
        transition-all
        duration-300
        hover:border-[#C7D7D0]
        hover:shadow-[0_15px_35px_rgba(11,37,34,0.09)]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            gold
              ? "bg-[#F4A62A]/10 text-[#C9820B]"
              : "bg-[#087F5B]/10 text-[#087F5B]"
          }`}
        >
          <Icon size={18} />
        </div>

        <TrendingUp
          size={15}
          className="text-[#087F5B] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>

      <p className="mt-5 text-[11px] font-medium text-[#7A8781]">{label}</p>

      <p className="mt-1 font-serif text-[32px] font-semibold tracking-[-0.03em] text-[#0B2522]">
        {value}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-[#66736D]">{description}</p>
    </motion.div>
  );
}

/* ============================================================
   PROGRESS BAR
============================================================ */

function ProgressBar({
  value,
  color = "emerald",
}: {
  value: number;
  color?: "emerald" | "gold";
}) {
  const bg = color === "gold" ? "#F4A62A" : "#087F5B";

  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#E9EFEC]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ backgroundColor: bg }}
        className="h-full rounded-full"
      />
    </div>
  );
}

/* ============================================================
   CATEGORY SCORE
============================================================ */

function CategoryScore({
  label,
  score,
  index,
}: {
  label: string;
  score: number;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-xl border border-[#E1E8E4] bg-[#FBFCFA] p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-[#43514B]">
          {label}
        </span>

        <div className="flex items-center gap-1.5">
          <Star size={12} className="fill-[#F4B942] text-[#F4B942]" />

          <span className="text-[11px] font-bold text-[#17211D]">
            {score.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar
          value={(score / 5) * 100}
          color={score >= 4.7 ? "emerald" : "gold"}
        />
      </div>
    </motion.div>
  );
}

/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({
  review,
  index,
}: {
  review: (typeof recentReviews)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-2xl
        border
        border-[#DDE6E1]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(11,37,34,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_15px_35px_rgba(11,37,34,0.09)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#087F5B]/10
              text-[11px]
              font-bold
              text-[#087F5B]
            "
          >
            {review.initials}
          </div>

          <div>
            <h3 className="text-[12px] font-bold text-[#17211D]">
              {review.name}
            </h3>

            <p className="mt-0.5 text-[9px] text-[#8A9590]">
              {review.trip} · {review.date}
            </p>
          </div>
        </div>

        <Stars rating={review.rating} size={11} />
      </div>

      <p className="mt-4 text-[11px] leading-6 text-[#52615A]">
        “{review.text}”
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {review.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              border
              border-[#DDE7E2]
              bg-[#F6F9F7]
              px-2.5
              py-1
              text-[8px]
              font-semibold
              text-[#087F5B]
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ReviewInsightsPage() {
  const shouldReduceMotion = useReducedMotion();

  const [insightsData, setInsightsData] = useState<{
    highlights: any[];
    concerns: any[];
    categories: any[];
  } | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/reviews/insights`);
        const data = await res.json();
        if (data.success && data.data) {
          setInsightsData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#17211D]">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#063A2F]">
        {/* Background glows */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-[430px]
            w-[430px]
            rounded-full
            bg-[#087F5B]/25
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-40
            left-[-100px]
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#F4A62A]/10
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          {/* Back */}

          <Link
            href="/reviews"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-white/65
              transition-colors
              hover:text-[#F4B942]
            "
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Reviews
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Hero copy */}

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F4B942]/20 bg-[#F4A62A]/10 px-3 py-1.5">
                <Sparkles
                  size={12}
                  className="text-[#F4B942]"
                  fill="currentColor"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F4B942]">
                  AI Review Intelligence
                </span>
              </div>

              <h1
                className="
                  mt-5
                  max-w-[760px]
                  font-serif
                  text-[42px]
                  font-medium
                  leading-[1.04]
                  tracking-[-0.035em]
                  text-white
                  sm:text-[52px]
                  lg:text-[62px]
                "
              >
                Thousands of reviews.
                <span className="block text-[#6DD4B3]">One clear picture.</span>
              </h1>

              <p className="mt-5 max-w-[650px] text-[12px] leading-6 text-white/65 sm:text-[14px] sm:leading-7">
                Our AI analyzes authentic traveler experiences to reveal the
                patterns, highlights, concerns, and insights that matter before
                you plan your next trip.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/reviews"
                  className="
                    group
                    inline-flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#F4B942]
                    px-5
                    text-[10px]
                    font-bold
                    text-[#063A2F]
                    shadow-[0_8px_25px_rgba(244,185,66,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#FFC85B]
                    hover:shadow-[0_12px_30px_rgba(244,185,66,0.28)]
                  "
                >
                  Explore Reviews
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <div className="inline-flex items-center gap-2 text-[9px] text-white/50">
                  <ShieldCheck size={14} className="text-[#6DD4B3]" />
                  Built from verified community insights
                </div>
              </div>
            </motion.div>

            {/* AI summary panel */}

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.055]
                p-5
                backdrop-blur-xl
                shadow-[0_20px_70px_rgba(0,0,0,0.18)]
              "
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#087F5B]/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4A62A]/15 text-[#F4B942]">
                    <Bot size={17} />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">
                      AI Summary
                    </p>

                    <p className="text-[8px] text-white/40">
                      Cox&apos;s Bazar · Bangladesh
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[12px] leading-6 text-white/70">
                  Travelers consistently praise Cox&apos;s Bazar for its
                  beautiful beaches, sunsets, seafood, and scenic Marine Drive.
                  The main concerns are peak-season crowds and weekend traffic.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[8px] text-white/40">Reviews analyzed</p>

                    <p className="mt-1 text-[17px] font-bold text-white">
                      1,200+
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[8px] text-white/40">AI confidence</p>

                    <p className="mt-1 text-[17px] font-bold text-[#F4B942]">
                      High
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
                  <CheckCircle2 size={13} className="text-[#6DD4B3]" />

                  <span className="text-[8px] text-white/50">
                    Insights generated from traveler review patterns
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          OVERVIEW STATS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InsightStat
            icon={Star}
            label="Overall Rating"
            value="4.8/5"
            description="Average rating from verified travelers"
            accent="gold"
          />

          <InsightStat
            icon={MessageSquareText}
            label="Reviews Analyzed"
            value="1,200+"
            description="Traveler experiences processed by AI"
          />

          <InsightStat
            icon={Heart}
            label="Positive Sentiment"
            value="88%"
            description="Reviews showing positive experiences"
          />

          <InsightStat
            icon={Users}
            label="Would Recommend"
            value="96%"
            description="Travelers willing to recommend the destination"
            accent="gold"
          />
        </div>
      </section>

      {/* ======================================================
          AI ANALYSIS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Sentiment */}

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="
              rounded-[22px]
              border
              border-[#DDE6E1]
              bg-white
              p-6
              shadow-[0_6px_25px_rgba(11,37,34,0.05)]
              sm:p-7
            "
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={17} className="text-[#087F5B]" />

                  <h2 className="text-[16px] font-bold text-[#17211D]">
                    Sentiment Analysis
                  </h2>
                </div>

                <p className="mt-2 text-[10px] text-[#7A8781]">
                  How travelers feel about the destination overall
                </p>
              </div>

              <span className="rounded-full bg-[#087F5B]/10 px-2.5 py-1 text-[8px] font-bold text-[#087F5B]">
                AI analyzed
              </span>
            </div>

            <div className="mt-7 grid items-center gap-8 sm:grid-cols-[180px_1fr]">
              {/* Donut */}

              <div className="mx-auto">
                <div
                  className="
                    relative
                    flex
                    h-[165px]
                    w-[165px]
                    items-center
                    justify-center
                    rounded-full
                  "
                  style={{
                    background:
                      "conic-gradient(#087F5B 0% 88%, #F4A62A 88% 96%, #EF5B52 96% 100%)",
                  }}
                >
                  <div className="flex h-[137px] w-[137px] flex-col items-center justify-center rounded-full bg-white">
                    <span className="font-serif text-[34px] font-semibold text-[#17211D]">
                      88%
                    </span>

                    <span className="mt-1 text-[9px] font-semibold text-[#087F5B]">
                      Positive
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}

              <div className="space-y-4">
                {[
                  {
                    label: "Positive",
                    value: "88%",
                    color: "#087F5B",
                  },
                  {
                    label: "Neutral",
                    value: "8%",
                    color: "#F4A62A",
                  },
                  {
                    label: "Negative",
                    value: "4%",
                    color: "#EF5B52",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />

                        <span className="text-[10px] font-semibold text-[#43514B]">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-[#17211D]">
                        {item.value}
                      </span>
                    </div>

                    <ProgressBar
                      value={parseInt(item.value)}
                      color={item.label === "Neutral" ? "gold" : "emerald"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI takeaway */}

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            custom={1}
            className="
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-[#075143]
              bg-[#063A2F]
              p-6
              text-white
              shadow-[0_10px_35px_rgba(6,58,47,0.16)]
              sm:p-7
            "
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B]/25 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={17}
                  className="text-[#F4B942]"
                  fill="currentColor"
                />

                <h2 className="text-[16px] font-bold">What the AI Found</h2>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  "Beach quality is the strongest positive signal.",
                  "Families consistently mention the destination as enjoyable.",
                  "Sunset experiences receive unusually high praise.",
                  "Crowds are the most repeated negative theme.",
                ].map((text, index) => (
                  <motion.div
                    key={text}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -10,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.4,
                    }}
                    className="flex gap-3"
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-[#6DD4B3]"
                    />

                    <p className="text-[10px] leading-5 text-white/65">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex gap-2">
                  <Info size={13} className="mt-0.5 shrink-0 text-[#F4B942]" />

                  <p className="text-[9px] leading-5 text-white/50">
                    AI insights summarize recurring patterns across reviews.
                    They are designed to help you make faster, more informed
                    travel decisions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          WHAT TRAVELERS LOVE / CONCERNS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Love */}

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              rounded-[22px]
              border
              border-[#DDE6E1]
              bg-white
              p-6
              sm:p-7
            "
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087F5B]/10 text-[#087F5B]">
                <Heart size={17} fill="currentColor" />
              </div>

              <div>
                <h2 className="text-[16px] font-bold text-[#17211D]">
                  What Travelers Love
                </h2>

                <p className="mt-1 text-[9px] text-[#8A9590]">
                  Most frequently mentioned positive experiences
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {(insightsData?.highlights || []).map((item, index) => {
                const Icon = item.icon === "Waves" ? Waves : item.icon === "Sun" ? Sun : item.icon === "Utensils" ? Utensils : Camera;

                return (
                  <motion.div
                    key={item.title}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -15,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.45,
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={13} className="text-[#087F5B]" />

                        <span className="text-[10px] font-semibold text-[#43514B]">
                          {item.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-[#087F5B]">
                        {item.percentage}%
                      </span>
                    </div>

                    <ProgressBar
                      value={item.percentage}
                      color={item.color === "gold" ? "gold" : "emerald"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Concerns */}

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="
              rounded-[22px]
              border
              border-[#DDE6E1]
              bg-white
              p-6
              sm:p-7
            "
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EF5B52]/10 text-[#C7372F]">
                <CircleAlert size={17} />
              </div>

              <div>
                <h2 className="text-[16px] font-bold text-[#C7372F]">
                  Common Concerns
                </h2>

                <p className="mt-1 text-[9px] text-[#8A9590]">
                  Repeated concerns mentioned by travelers
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {(insightsData?.concerns || []).map((item, index) => {
                const Icon = item.icon === "Users" ? Users : item.icon === "Car" ? Car : item.icon === "Clock3" ? Clock3 : CircleAlert;

                return (
                  <motion.div
                    key={item.title}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 15,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.45,
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={13} className="text-[#D14A43]" />

                        <span className="text-[10px] font-semibold text-[#43514B]">
                          {item.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-[#D14A43]">
                        {item.percentage}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#F2E9E7]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${item.percentage}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-[#D14A43]"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          CATEGORY RATINGS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
        <div
          className="
            rounded-[22px]
            border
            border-[#DDE6E1]
            bg-white
            p-6
            sm:p-7
          "
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 size={17} className="text-[#087F5B]" />

                <h2 className="text-[16px] font-bold text-[#17211D]">
                  Ratings by Category
                </h2>
              </div>

              <p className="mt-2 text-[10px] text-[#7A8781]">
                See what travelers think about specific parts of the experience.
              </p>
            </div>

            <span className="text-[9px] font-medium text-[#8A9590]">
              Based on 1,200+ reviews
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(insightsData?.categories || []).map((category, index) => (
              <CategoryScore
                key={category.label}
                label={category.label}
                score={category.score}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          RECENT REVIEWS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareText size={17} className="text-[#087F5B]" />

              <h2 className="text-[18px] font-bold text-[#17211D]">
                Recent Traveler Experiences
              </h2>
            </div>

            <p className="mt-2 max-w-[600px] text-[10px] leading-5 text-[#7A8781]">
              A sample of authentic experiences that contribute to the AI
              insights above.
            </p>
          </div>

          <Link
            href="/reviews"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              text-[#087F5B]
              transition-colors
              hover:text-[#F4A62A]
            "
          >
            View All Reviews
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {recentReviews.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} />
          ))}
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="border-t border-[#E0E7E3] bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-8 lg:py-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#087F5B]/10 text-[#087F5B]">
              <Search size={18} />
            </div>

            <h2
              className="
                mt-5
                font-serif
                text-[30px]
                font-medium
                tracking-[-0.025em]
                text-[#0B2522]
                sm:text-[38px]
              "
            >
              Plan with better information.
            </h2>

            <p className="mx-auto mt-3 max-w-[560px] text-[11px] leading-6 text-[#66736D]">
              Use real traveler experiences and AI-powered insights to make
              smarter decisions for your next adventure.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-trip"
                className="
                  group
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#087F5B]
                  px-5
                  text-[10px]
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#076B4E]
                  hover:shadow-[0_12px_25px_rgba(8,127,91,0.18)]
                "
              >
                Plan Your Trip
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/reviews"
                className="
                  inline-flex
                  h-10
                  items-center
                  rounded-xl
                  border
                  border-[#D7E1DC]
                  bg-white
                  px-5
                  text-[10px]
                  font-semibold
                  text-[#43514B]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#087F5B]/30
                  hover:text-[#087F5B]
                "
              >
                Read More Reviews
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
