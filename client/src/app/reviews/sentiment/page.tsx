"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Filter,
  Info,
  Minus,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type SentimentType = "positive" | "neutral" | "negative";

type Category = {
  id: string;
  name: string;
  description: string;
  score: number;
  positive: number;
  neutral: number;
  negative: number;
  trend: number;
  icon: string;
  color: "green" | "gold" | "red";
};

/* ============================================================
   DATA
============================================================ */
const categories: Category[] = [
  {
    id: "overall",
    name: "Overall Experience",
    description: "Overall travel experience, enjoyment and satisfaction",
    score: 88,
    positive: 88,
    neutral: 8,
    negative: 4,
    trend: 5,
    icon: "⭐",
    color: "green",
  },

  {
    id: "food",
    name: "Food & Dining",
    description: "Seafood, local food, restaurants and dining experience",
    score: 91,
    positive: 91,
    neutral: 6,
    negative: 3,
    trend: 4,
    icon: "🍽️",
    color: "green",
  },

  {
    id: "family",
    name: "Family Experience",
    description: "Activities, safety and comfort for families",
    score: 89,
    positive: 89,
    neutral: 7,
    negative: 4,
    trend: 3,
    icon: "👨‍👩‍👧",
    color: "green",
  },

  {
    id: "accommodation",
    name: "Accommodation",
    description: "Hotels, rooms, cleanliness and service quality",
    score: 82,
    positive: 82,
    neutral: 10,
    negative: 8,
    trend: 2,
    icon: "🏨",
    color: "gold",
  },

  {
    id: "transportation",
    name: "Transportation",
    description: "Roads, traffic, local transport and accessibility",
    score: 68,
    positive: 68,
    neutral: 14,
    negative: 18,
    trend: -3,
    icon: "🚗",
    color: "gold",
  },

  {
    id: "safety",
    name: "Safety & Security",
    description: "Personal safety, family security and traveler confidence",
    score: 94,
    positive: 94,
    neutral: 4,
    negative: 2,
    trend: 6,
    icon: "🛡️",
    color: "green",
  },

  {
    id: "cleanliness",
    name: "Cleanliness",
    description: "Cleanliness of beaches, hotels, restaurants and public areas",
    score: 81,
    positive: 81,
    neutral: 11,
    negative: 8,
    trend: 2,
    icon: "✨",
    color: "gold",
  },

  {
    id: "value",
    name: "Value for Money",
    description: "Prices, affordability and overall travel value",
    score: 76,
    positive: 76,
    neutral: 12,
    negative: 12,
    trend: 1,
    icon: "৳",
    color: "gold",
  },
];

const reviewQuotes = [
  {
    name: "Verified Traveler",
    location: "Dhaka → Cox's Bazar",
    rating: 5,
    sentiment: "positive" as SentimentType,
    category: "Beaches & Scenery",
    text: "The beach was beautiful and the sunset was one of the best parts of our trip.",
    date: "2 weeks ago",
  },
  {
    name: "Verified Traveler",
    location: "Chattogram → Cox's Bazar",
    rating: 4,
    sentiment: "positive" as SentimentType,
    category: "Food & Dining",
    text: "Fresh seafood and plenty of local restaurants. Overall food experience was excellent.",
    date: "1 month ago",
  },
  {
    name: "Verified Traveler",
    location: "Dhaka → Cox's Bazar",
    rating: 3,
    sentiment: "neutral" as SentimentType,
    category: "Accommodation",
    text: "The hotel was comfortable, although prices were higher during the holiday period.",
    date: "1 month ago",
  },
  {
    name: "Verified Traveler",
    location: "Sylhet → Cox's Bazar",
    rating: 3,
    sentiment: "negative" as SentimentType,
    category: "Transportation",
    text: "The destination was great, but weekend traffic made the journey much longer than expected.",
    date: "2 months ago",
  },
];

/* ============================================================
   MOTION
============================================================ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================
   HELPERS
============================================================ */

function getScoreColor(score: number) {
  if (score >= 85) {
    return {
      text: "#087F5B",
      bg: "bg-[#087F5B]/10",
      bar: "bg-[#087F5B]",
    };
  }

  if (score >= 70) {
    return {
      text: "#C9820B",
      bg: "bg-[#F4A62A]/10",
      bar: "bg-[#F4A62A]",
    };
  }

  return {
    text: "#C7372F",
    bg: "bg-[#EF5B52]/10",
    bar: "bg-[#EF5B52]",
  };
}

/* ============================================================
   SCORE RING
============================================================ */

function ScoreRing({ score }: { score: number }) {
  const shouldReduceMotion = useReducedMotion();
  const colors = getScoreColor(score);

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.06,
              rotate: 2,
            }
      }
      className="relative h-[92px] w-[92px] shrink-0"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${colors.text} 0deg ${
            score * 3.6
          }deg, #E9EEEB ${score * 3.6}deg 360deg)`,
        }}
      />

      <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-white">
        <span
          className="font-serif text-[24px] font-semibold leading-none"
          style={{ color: colors.text }}
        >
          {score}
        </span>

        <span className="mt-1 text-[8px] font-medium text-[#8A9590]">
          / 100
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   CATEGORY CARD
============================================================ */

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const colors = getScoreColor(category.score);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.25,
              },
            }
      }
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-[#DCE5E1]
        bg-white
        p-5
        shadow-[0_5px_22px_rgba(11,37,34,0.05)]
        transition-all
        duration-300
        hover:border-[#C7D8D1]
        hover:shadow-[0_18px_40px_rgba(11,37,34,0.11)]
      "
    >
      {/* Hover glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-28
          w-28
          rounded-full
          bg-[#087F5B]/5
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Header */}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: 5,
                  }
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F7F7F2]
              text-[19px]
            "
          >
            {category.icon}
          </motion.div>

          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-bold text-[#17211D]">
              {category.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#7A8580]">
              {category.description}
            </p>
          </div>
        </div>

        <div
          className={`
            shrink-0
            rounded-full
            px-2
            py-1
            text-[8px]
            font-bold
            ${colors.bg}
          `}
          style={{ color: colors.text }}
        >
          {category.score >= 85
            ? "Excellent"
            : category.score >= 70
              ? "Good"
              : "Needs Attention"}
        </div>
      </div>

      {/* Score */}

      <div className="relative mt-5 flex items-center gap-5">
        <ScoreRing score={category.score} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium text-[#8A9590]">
              Positive sentiment
            </span>

            <span
              className="text-[10px] font-bold"
              style={{ color: colors.text }}
            >
              {category.positive}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E9EEEB]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${category.positive}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`h-full rounded-full ${colors.bar}`}
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#087F5B]" />
              <span className="text-[8px] text-[#7A8580]">
                {category.positive}% Positive
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4A62A]" />
              <span className="text-[8px] text-[#7A8580]">
                {category.neutral}% Neutral
              </span>
            </div>
          </div>

          <div className="mt-1.5 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF5B52]" />

            <span className="text-[8px] text-[#7A8580]">
              {category.negative}% Negative
            </span>
          </div>
        </div>
      </div>

      {/* Bottom trend */}

      <div className="mt-5 flex items-center justify-between border-t border-[#E8EEEB] pt-3">
        <div className="flex items-center gap-1.5">
          {category.trend >= 0 ? (
            <TrendingUp size={12} className="text-[#087F5B]" />
          ) : (
            <TrendingDown size={12} className="text-[#EF5B52]" />
          )}

          <span
            className={`text-[9px] font-semibold ${
              category.trend >= 0 ? "text-[#087F5B]" : "text-[#C7372F]"
            }`}
          >
            {category.trend >= 0 ? "+" : ""}
            {category.trend}% vs last month
          </span>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-1
            text-[9px]
            font-semibold
            text-[#0B6B50]
            transition-colors
            duration-200
            hover:text-[#F4A62A]
          "
        >
          View details
          <ArrowRight size={11} />
        </button>
      </div>
    </motion.article>
  );
}

/* ============================================================
   SENTIMENT SUMMARY
============================================================ */

function SentimentSummary() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
            }
      }
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[#075143]
        bg-[#063A2F]
        p-5
        text-white
        shadow-[0_15px_40px_rgba(6,58,47,0.14)]
        sm:p-6
      "
    >
      {/* Background */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#087F5B]/30
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 12, -4, 0],
                y: [0, 8, -5, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#F4A62A]/15
                text-[#F4B942]
              "
            >
              <BarChart3 size={16} />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4B942]">
              AI Sentiment Overview
            </span>
          </div>

          <h2 className="mt-3 font-serif text-[25px] font-medium tracking-[-0.025em] sm:text-[29px]">
            Travelers are overwhelmingly positive.
          </h2>

          <p className="mt-2 max-w-[610px] text-[10px] leading-5 text-white/60 sm:text-[11px]">
            Our AI analyzed more than 12,500 verified traveler reviews to
            understand how people feel about different parts of the travel
            experience.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative h-[110px] w-[110px] shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#087F5B 0% 88%, #F4A62A 88% 96%, #EF5B52 96% 100%)",
              }}
            />

            <div className="absolute inset-[8px] flex flex-col items-center justify-center rounded-full bg-[#063A2F]">
              <span className="font-serif text-[28px] font-semibold">88%</span>

              <span className="mt-0.5 text-[8px] text-[#6DD4B3]">Positive</span>
            </div>
          </div>

          <div className="hidden space-y-3 sm:block">
            <SummaryStat color="bg-[#087F5B]" value="88%" label="Positive" />

            <SummaryStat color="bg-[#F4A62A]" value="8%" label="Neutral" />

            <SummaryStat color="bg-[#EF5B52]" value="4%" label="Negative" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SUMMARY STAT
============================================================ */

function SummaryStat({
  color,
  value,
  label,
}: {
  color: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />

      <span className="text-[10px] font-bold text-white">{value}</span>

      <span className="text-[9px] text-white/50">{label}</span>
    </div>
  );
}

/* ============================================================
   FILTER BAR
============================================================ */

function FilterBar({
  sentiment,
  setSentiment,
  search,
  setSearch,
}: {
  sentiment: string;
  setSentiment: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="
        flex
        flex-col
        gap-3
        rounded-[16px]
        border
        border-[#DCE5E1]
        bg-white
        p-3
        shadow-[0_4px_16px_rgba(11,37,34,0.04)]
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-2">
        <div
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
          <Filter size={14} />
        </div>

        <span className="text-[11px] font-semibold text-[#17211D]">
          Explore sentiment
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Search */}

        <div className="relative">
          <Search
            size={13}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#8A9590]
            "
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search category..."
            className="
              h-9
              w-full
              rounded-lg
              border
              border-[#DCE5E1]
              bg-[#FAFBF9]
              pl-8
              pr-3
              text-[10px]
              text-[#17211D]
              outline-none
              transition-all
              duration-200
              placeholder:text-[#A0AAA5]
              focus:border-[#087F5B]
              focus:bg-white
              focus:ring-2
              focus:ring-[#087F5B]/10
              sm:w-[180px]
            "
          />
        </div>

        {/* Select */}

        <div className="relative">
          <select
            value={sentiment}
            onChange={(event) => setSentiment(event.target.value)}
            className="
              h-9
              w-full
              appearance-none
              rounded-lg
              border
              border-[#DCE5E1]
              bg-[#FAFBF9]
              pl-3
              pr-8
              text-[10px]
              font-medium
              text-[#4E5D56]
              outline-none
              transition-all
              duration-200
              focus:border-[#087F5B]
              focus:ring-2
              focus:ring-[#087F5B]/10
              sm:w-[150px]
            "
          >
            <option value="all">All Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <ChevronDown
            size={13}
            className="
              pointer-events-none
              absolute
              right-2.5
              top-1/2
              -translate-y-1/2
              text-[#7A8580]
            "
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   REVIEW QUOTES
============================================================ */

function ReviewQuotes() {
  const shouldReduceMotion = useReducedMotion();

  const sentimentStyles = {
    positive: {
      bg: "bg-[#087F5B]/10",
      text: "text-[#087F5B]",
      label: "Positive",
      icon: ThumbsUp,
    },
    neutral: {
      bg: "bg-[#F4A62A]/10",
      text: "text-[#C9820B]",
      label: "Neutral",
      icon: Minus,
    },
    negative: {
      bg: "bg-[#EF5B52]/10",
      text: "text-[#C7372F]",
      label: "Negative",
      icon: ThumbsDown,
    },
  };

  return (
    <motion.div variants={itemVariants}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#087F5B]">
            Real Traveler Voice
          </span>

          <h2 className="mt-1 font-serif text-[24px] font-medium tracking-[-0.025em] text-[#0B2522]">
            What people are saying
          </h2>
        </div>

        <span className="hidden text-[9px] text-[#8A9590] sm:block">
          AI-classified sample reviews
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {reviewQuotes.map((review, index) => {
          const style = sentimentStyles[review.sentiment];
          const Icon = style.icon;

          return (
            <motion.article
              key={`${review.name}-${index}`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
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
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              className="
                group
                rounded-[16px]
                border
                border-[#DCE5E1]
                bg-white
                p-4
                shadow-[0_4px_18px_rgba(11,37,34,0.04)]
                transition-all
                duration-300
                hover:border-[#C8D8D1]
                hover:shadow-[0_15px_32px_rgba(11,37,34,0.09)]
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold text-[#17211D]">
                    {review.name}
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#8A9590]">
                    {review.location}
                  </p>
                </div>

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    px-2
                    py-1
                    text-[8px]
                    font-semibold
                    ${style.bg}
                    ${style.text}
                  `}
                >
                  <Icon size={10} />

                  {style.label}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={10}
                    className={
                      starIndex < review.rating
                        ? "text-[#F4A62A]"
                        : "text-[#DDE4E0]"
                    }
                    fill={starIndex < review.rating ? "currentColor" : "none"}
                  />
                ))}

                <span className="ml-1 text-[8px] text-[#8A9590]">
                  {review.date}
                </span>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-[#4E5D56]">
                “{review.text}”
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-[#EDF1EF] pt-2.5">
                <span className="text-[8px] font-medium text-[#8A9590]">
                  Category
                </span>

                <span className="text-[8px] font-semibold text-[#087F5B]">
                  {review.category}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function SentimentByCategoryPage() {
  const [sentiment, setSentiment] = useState("all");
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();

    return categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const matchesSentiment =
        sentiment === "all" ||
        (sentiment === "positive" && category.positive >= 80) ||
        (sentiment === "neutral" &&
          category.neutral >= 8 &&
          category.neutral < 15) ||
        (sentiment === "negative" && category.negative >= 10);

      return matchesSearch && matchesSentiment;
    });
  }, [search, sentiment]);

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#17211D]">
      {/* ======================================================
          TOP BACK LINK
      ======================================================= */}

      <div className="mx-auto max-w-[1180px] px-5 pt-6 sm:px-8 lg:px-10">
        <Link
          href="/reviews"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            text-[#0B6B50]
            transition-colors
            duration-200
            hover:text-[#F4A62A]
          "
        >
          <motion.span
            whileHover={{
              x: -3,
            }}
          >
            <ArrowLeft size={13} />
          </motion.span>
          Back to Reviews
        </Link>
      </div>

      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative overflow-hidden pb-8 pt-8 sm:pb-10 sm:pt-10">
        {/* Decorative circles */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-32
            top-0
            h-72
            w-72
            rounded-full
            bg-[#087F5B]/5
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            top-10
            h-72
            w-72
            rounded-full
            bg-[#F4A62A]/5
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[780px]"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2"
            >
              <span className="h-px w-7 bg-[#F4A62A]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#087F5B]">
                AI-Powered Review Analysis
              </span>

              <span className="h-px w-7 bg-[#F4A62A]" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="
                mt-4
                font-serif
                text-[38px]
                font-medium
                leading-[1.05]
                tracking-[-0.035em]
                text-[#0B2522]
                sm:text-[48px]
                lg:text-[55px]
              "
            >
              Sentiment by <span className="text-[#087F5B]">Category.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="
                mt-4
                max-w-[680px]
                text-[11px]
                leading-6
                text-[#66736D]
                sm:text-[12px]
                sm:leading-6
              "
            >
              Go beyond an overall rating. See exactly what travelers love, what
              concerns them, and how each part of the travel experience performs
              based on thousands of real reviews.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#DCE5E1]
                  bg-white
                  px-3
                  py-1.5
                  shadow-sm
                "
              >
                <CheckCircle2 size={11} className="text-[#087F5B]" />

                <span className="text-[9px] font-semibold text-[#4E5D56]">
                  12,500+ reviews analyzed
                </span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#DCE5E1]
                  bg-white
                  px-3
                  py-1.5
                  shadow-sm
                "
              >
                <Info size={11} className="text-[#F4A62A]" />

                <span className="text-[9px] font-semibold text-[#4E5D56]">
                  AI-generated insights
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          CONTENT
      ======================================================= */}

      <section className="pb-14 sm:pb-18">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
          >
            {/* Summary */}

            <SentimentSummary />

            {/* Filter */}

            <div className="mt-5">
              <FilterBar
                sentiment={sentiment}
                setSentiment={setSentiment}
                search={search}
                setSearch={setSearch}
              />
            </div>

            {/* Category heading */}

            <motion.div
              variants={itemVariants}
              className="mb-4 mt-8 flex items-end justify-between"
            >
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#087F5B]">
                  Category Breakdown
                </span>

                <h2 className="mt-1 font-serif text-[25px] font-medium tracking-[-0.025em] text-[#0B2522]">
                  Understand every part of the journey.
                </h2>
              </div>

              <span className="hidden text-[9px] text-[#8A9590] sm:block">
                {filteredCategories.length} categories
              </span>
            </motion.div>

            {/* Categories */}

            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="
                  rounded-[18px]
                  border
                  border-[#DCE5E1]
                  bg-white
                  px-6
                  py-12
                  text-center
                "
              >
                <Search size={25} className="mx-auto text-[#9AA59F]" />

                <h3 className="mt-3 text-[13px] font-bold text-[#17211D]">
                  No categories found
                </h3>

                <p className="mt-1 text-[9px] text-[#8A9590]">
                  Try another category or sentiment filter.
                </p>
              </motion.div>
            )}

            {/* Review quotes */}

            <div className="mt-10">
              <ReviewQuotes />
            </div>

            {/* AI Disclaimer */}

            <motion.div
              variants={itemVariants}
              className="
                mt-6
                flex
                flex-col
                gap-3
                rounded-[14px]
                border
                border-[#DCE5E1]
                bg-white
                p-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#087F5B]/10
                    text-[#087F5B]
                  "
                >
                  <Info size={13} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold text-[#17211D]">
                    How sentiment is calculated
                  </p>

                  <p className="mt-0.5 max-w-[700px] text-[8px] leading-4 text-[#8A9590]">
                    AI analyzes review text, identifies sentiment patterns,
                    groups similar experiences and calculates category-level
                    scores from the available traveler feedback.
                  </p>
                </div>
              </div>

              <Link
                href="/reviews/insights"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-[#063A2F]
                  px-3.5
                  py-2
                  text-[9px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#087F5B]
                  hover:shadow-[0_8px_20px_rgba(8,127,91,0.2)]
                "
              >
                Explore AI Insights
                <ArrowRight size={11} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
