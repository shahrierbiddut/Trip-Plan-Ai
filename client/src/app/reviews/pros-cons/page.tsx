"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Filter,
  Heart,
  Search,
  ShieldCheck,
  Star,
  TrendingDown,
  TrendingUp,
  Utensils,
  Waves,
  Users,
  Car,
  Hotel,
  Sparkles,
  Wallet,
  X,
  MessageSquareQuote,
} from "lucide-react";
import { useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type InsightColor = "green" | "gold" | "red";

type Insight = {
  id: number;
  title: string;
  description: string;
  percentage: number;
  category: string;
  icon: React.ReactNode;
  color: InsightColor;
};

type ReviewQuote = {
  id: number;
  name: string;
  tripType: string;
  rating: number;
  text: string;
  date: string;
};

/* ============================================================
   DATA
============================================================ */

const pros: Insight[] = [
  {
    id: 1,
    title: "Beautiful Beaches",
    description:
      "Travelers consistently praise the long sandy coastline, sea views and relaxing beach atmosphere.",
    percentage: 96,
    category: "Overall Experience",
    icon: <Waves size={16} />,
    color: "green",
  },
  {
    id: 2,
    title: "Stunning Sunsets",
    description:
      "Sunset views are one of the most frequently mentioned highlights in traveler reviews.",
    percentage: 89,
    category: "Overall Experience",
    icon: <Sparkles size={16} />,
    color: "gold",
  },
  {
    id: 3,
    title: "Fresh Seafood",
    description:
      "Visitors appreciate the variety of fresh seafood and local dining experiences.",
    percentage: 91,
    category: "Food & Dining",
    icon: <Utensils size={16} />,
    color: "green",
  },
  {
    id: 4,
    title: "Family Friendly",
    description:
      "Families frequently mention the destination's relaxed atmosphere and variety of activities.",
    percentage: 84,
    category: "Family Experience",
    icon: <Users size={16} />,
    color: "green",
  },
  {
    id: 5,
    title: "Scenic Marine Drive",
    description:
      "The coastal road and surrounding views are frequently highlighted as memorable experiences.",
    percentage: 87,
    category: "Overall Experience",
    icon: <Car size={16} />,
    color: "green",
  },
  {
    id: 6,
    title: "Good Hotel Options",
    description:
      "Travelers appreciate the wide range of accommodation choices across different budgets.",
    percentage: 82,
    category: "Accommodation",
    icon: <Hotel size={16} />,
    color: "gold",
  },
];

const concerns: Insight[] = [
  {
    id: 1,
    title: "Peak-season Crowds",
    description:
      "Busy periods can make popular beach areas and attractions feel crowded.",
    percentage: 32,
    category: "Overall Experience",
    icon: <Users size={16} />,
    color: "red",
  },
  {
    id: 2,
    title: "Weekend Traffic",
    description:
      "Traffic congestion is a common concern during weekends and holiday periods.",
    percentage: 28,
    category: "Transportation",
    icon: <Car size={16} />,
    color: "red",
  },
  {
    id: 3,
    title: "Weather Changes",
    description:
      "Sudden weather changes can affect outdoor activities and beach plans.",
    percentage: 16,
    category: "Overall Experience",
    icon: <Sparkles size={16} />,
    color: "gold",
  },
  {
    id: 4,
    title: "Holiday Availability",
    description:
      "Popular hotels and services can become limited during major holidays.",
    percentage: 12,
    category: "Accommodation",
    icon: <Hotel size={16} />,
    color: "gold",
  },
  {
    id: 5,
    title: "Seasonal Price Changes",
    description:
      "Accommodation and travel costs may increase during peak seasons.",
    percentage: 10,
    category: "Value for Money",
    icon: <Wallet size={16} />,
    color: "gold",
  },
];

const reviewQuotes: ReviewQuote[] = [
  {
    id: 1,
    name: "Verified Traveler",
    tripType: "Family Trip",
    rating: 5,
    text: "The beach was beautiful and the whole family had a great time. Sunset was definitely the highlight.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Verified Traveler",
    tripType: "Couple Trip",
    rating: 4.8,
    text: "Great destination for a relaxing trip. Food was excellent and Marine Drive was amazing.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Verified Traveler",
    tripType: "Friends Trip",
    rating: 4.5,
    text: "Lots of things to explore. It gets busy during weekends, but the overall experience was worth it.",
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
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================
   COLOR HELPERS
============================================================ */

function getColorClasses(color: InsightColor) {
  if (color === "green") {
    return {
      icon: "bg-[#087F5B]/10 text-[#087F5B]",
      percentage: "text-[#087F5B]",
      progress: "bg-[#087F5B]",
    };
  }

  if (color === "gold") {
    return {
      icon: "bg-[#F4A62A]/10 text-[#C9820B]",
      percentage: "text-[#C9820B]",
      progress: "bg-[#F4A62A]",
    };
  }

  return {
    icon: "bg-[#EF5B52]/10 text-[#D13D35]",
    percentage: "text-[#D13D35]",
    progress: "bg-[#EF5B52]",
  };
}

/* ============================================================
   PAGE HEADER
============================================================ */

function PageHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mt-10"
    >
      <Link
        href="/reviews"
        className="
          group
          mb-6
          inline-flex
          items-center
          gap-2
          text-[11px]
          font-semibold
          text-[#087F5B]
          transition-colors
          duration-200
          hover:text-[#C9820B]
        "
      >
        <ArrowLeft
          size={14}
          className="
            transition-transform
            duration-200
            group-hover:-translate-x-1
          "
        />
        Back to Reviews
      </Link>

      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-[#F4A62A]" />

        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#087F5B]
          "
        >
          AI Review Intelligence
        </span>

        <span className="h-px w-8 bg-[#F4A62A]" />
      </div>

      <h1
        className="
          font-serif
          text-[34px]
          font-medium
          leading-[1.08]
          tracking-[-0.035em]
          text-[#0B2522]
          sm:text-[44px]
          lg:text-[52px]
        "
      >
        What Travelers
        <span className="text-[#087F5B]"> Love &amp; Concern.</span>
      </h1>

      <p
        className="
          mx-auto
          mt-4
          max-w-[650px]
          text-[13px]
          leading-6
          text-[#66736D]
          sm:text-[14px]
        "
      >
        Our AI analyzes thousands of traveler reviews to identify the
        experiences people love most and the concerns worth knowing before your
        trip.
      </p>
    </motion.div>
  );
}

/* ============================================================
   AI SUMMARY
============================================================ */

function AISummaryCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[#075143]
        bg-[#063A2F]
        p-6
        text-white
        shadow-[0_15px_40px_rgba(6,58,47,0.16)]
      "
    >
      <div
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
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-52
          w-52
          rounded-full
          bg-[#F4A62A]/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#F4B942]/20
              bg-[#F4A62A]/15
              text-[#F4B942]
            "
          >
            <Sparkles size={18} fill="currentColor" />
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F4B942]">
              AI Generated Summary
            </p>

            <h2 className="mt-1 text-[17px] font-bold">The big picture</h2>
          </div>
        </div>

        <p className="mt-5 max-w-[760px] text-[12px] leading-6 text-white/70">
          Travelers consistently praise the destination for its beautiful
          beaches, fresh seafood, family-friendly atmosphere and memorable
          sunsets. The most common concerns are peak-season crowds, weekend
          traffic and seasonal price increases. Overall sentiment remains
          strongly positive.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:max-w-[520px]">
          <SummaryMetric value="88%" label="Positive" color="text-[#6DD4B3]" />

          <SummaryMetric value="8%" label="Neutral" color="text-[#F4B942]" />

          <SummaryMetric value="4%" label="Negative" color="text-[#F08078]" />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SUMMARY METRIC
============================================================ */

function SummaryMetric({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-white/[0.05]
        px-3
        py-3
        backdrop-blur-sm
      "
    >
      <p className={`text-[18px] font-bold ${color}`}>{value}</p>

      <p className="mt-0.5 text-[9px] text-white/45">{label}</p>
    </div>
  );
}

/* ============================================================
   INSIGHT CARD
============================================================ */

function InsightCard({
  insight,
  type,
}: {
  insight: Insight;
  type: "pro" | "concern";
}) {
  const reduceMotion = useReducedMotion();
  const colors = getColorClasses(insight.color);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.01,
            }
      }
      className="
        group
        rounded-[16px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.05)]
        transition-shadow
        duration-300
        hover:shadow-[0_16px_35px_rgba(11,37,34,0.10)]
      "
    >
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={
            reduceMotion
              ? undefined
              : {
                  rotate: type === "pro" ? 5 : -5,
                  scale: 1.08,
                }
          }
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${colors.icon}
          `}
        >
          {insight.icon}
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[12px] font-bold text-[#17211D]">
                {insight.title}
              </h3>

              <p className="mt-1 text-[9px] font-medium text-[#087F5B]">
                {insight.category}
              </p>
            </div>

            <span
              className={`
                shrink-0
                text-[13px]
                font-bold
                ${colors.percentage}
              `}
            >
              {insight.percentage}%
            </span>
          </div>

          <p className="mt-3 text-[10px] leading-5 text-[#66736D]">
            {insight.description}
          </p>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF2F0]">
            <motion.div
              initial={
                reduceMotion
                  ? {
                      width: `${insight.percentage}%`,
                    }
                  : {
                      width: 0,
                    }
              }
              whileInView={{
                width: `${insight.percentage}%`,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`h-full rounded-full ${colors.progress}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   SECTION
============================================================ */

function InsightGroup({
  title,
  description,
  icon,
  items,
  type,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: Insight[];
  type: "pro" | "concern";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      className="
        rounded-[20px]
        border
        border-[#DCE5E1]
        bg-[#FBFCFA]
        p-5
        sm:p-6
      "
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              type === "pro"
                ? "bg-[#087F5B]/10 text-[#087F5B]"
                : "bg-[#EF5B52]/10 text-[#D13D35]"
            }
          `}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-[18px] font-bold text-[#17211D]">{title}</h2>

          <p className="mt-1 text-[10px] leading-5 text-[#66736D]">
            {description}
          </p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="mt-5 grid gap-3 sm:grid-cols-2"
      >
        {items.map((item) => (
          <InsightCard key={`${type}-${item.id}`} insight={item} type={type} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   TRUST STRIP
============================================================ */

function TrustStrip() {
  return (
    <motion.div
      variants={itemVariants}
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-3
        rounded-[16px]
        border
        border-[#DCE5E1]
        bg-white
        px-5
        py-4
        text-center
        sm:flex-row
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#087F5B]/10
          text-[#087F5B]
        "
      >
        <ShieldCheck size={16} />
      </div>

      <p className="text-[10px] leading-5 text-[#66736D]">
        Insights are generated from
        <span className="font-semibold text-[#087F5B]">
          {" "}
          verified traveler experiences
        </span>{" "}
        and aggregated review patterns.
      </p>
    </motion.div>
  );
}

/* ============================================================
   TRAVELER QUOTES
============================================================ */

function TravelerQuotes() {
  const [search, setSearch] = useState("");

  const filteredQuotes = useMemo(() => {
    if (!search.trim()) return reviewQuotes;

    return reviewQuotes.filter((review) =>
      `${review.text} ${review.tripType}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <motion.section
      variants={itemVariants}
      className="
        rounded-[20px]
        border
        border-[#DCE5E1]
        bg-white
        p-5
        sm:p-6
      "
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareQuote size={17} className="text-[#F4A62A]" />

            <h2 className="text-[18px] font-bold text-[#17211D]">
              What Travelers Are Saying
            </h2>
          </div>

          <p className="mt-1.5 text-[10px] text-[#66736D]">
            Real experiences behind the AI insights.
          </p>
        </div>

        <div className="relative">
          <Search
            size={13}
            className="
              pointer-events-none
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
            placeholder="Search experiences..."
            className="
              h-9
              w-full
              rounded-lg
              border
              border-[#DCE5E1]
              bg-[#F7F7F2]
              pl-8
              pr-3
              text-[10px]
              text-[#17211D]
              outline-none
              transition-all
              duration-200
              placeholder:text-[#9AA39F]
              focus:border-[#087F5B]
              focus:bg-white
              sm:w-[220px]
            "
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {filteredQuotes.map((review) => (
          <motion.article
            key={review.id}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[14px]
              border
              border-[#E3E9E6]
              bg-[#FBFCFA]
              p-4
              transition-shadow
              duration-300
              hover:shadow-[0_12px_28px_rgba(11,37,34,0.08)]
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#17211D]">
                  {review.name}
                </p>

                <p className="mt-0.5 text-[8px] text-[#8A9590]">
                  {review.tripType}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[#F4A62A]">
                <Star size={11} fill="currentColor" />

                <span className="text-[9px] font-bold text-[#17211D]">
                  {review.rating}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[10px] leading-5 text-[#56635D]">
              “{review.text}”
            </p>

            <p className="mt-3 text-[8px] text-[#9AA39F]">{review.date}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

/* ============================================================
   CTA
============================================================ */

function ReviewCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[#075143]
        bg-[#063A2F]
        p-6
        text-center
        sm:p-8
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-24
          h-56
          w-56
          rounded-full
          bg-[#087F5B]/25
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-20
          h-56
          w-56
          rounded-full
          bg-[#F4A62A]/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4A62A]/15 text-[#F4B942]">
          <Heart size={18} fill="currentColor" />
        </div>

        <h2 className="mt-4 font-serif text-[25px] text-white">
          Share Your Experience
        </h2>

        <p className="mx-auto mt-2 max-w-[500px] text-[10px] leading-5 text-white/60">
          Your experience can help another traveler make a better and more
          confident travel decision.
        </p>

        <Link
          href="/reviews/write-review"
          className="
            mt-5
            inline-flex
            h-9
            items-center
            gap-2
            rounded-lg
            bg-[#F4A62A]
            px-5
            text-[10px]
            font-bold
            text-[#063A2F]
            shadow-[0_8px_25px_rgba(244,166,42,0.18)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#F4B942]
            hover:shadow-[0_12px_30px_rgba(244,166,42,0.25)]
          "
        >
          Write a Review
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ProsConsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#17211D]">
      {/* Background decorations */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-[-150px]
          top-[180px]
          h-80
          w-80
          rounded-full
          bg-[#087F5B]/[0.025]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          bottom-[-120px]
          right-[-120px]
          h-80
          w-80
          rounded-full
          bg-[#F4A62A]/[0.025]
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1180px]
          px-5
          py-10
          sm:px-8
          sm:py-14
          lg:px-10
          lg:py-16
        "
      >
        <PageHeader />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 space-y-5"
        >
          <AISummaryCard />

          <div className="grid gap-5 lg:grid-cols-2">
            <InsightGroup
              title="What Travelers Love"
              description="The experiences that receive the strongest positive mentions."
              icon={<Check size={19} />}
              items={pros}
              type="pro"
            />

            <InsightGroup
              title="Common Concerns"
              description="Things travelers frequently mention as areas to consider."
              icon={<CircleAlert size={19} />}
              items={concerns}
              type="concern"
            />
          </div>

          <TrustStrip />

          <TravelerQuotes />

          <ReviewCTA />

          <div className="flex justify-center pt-1">
            <Link
              href="/reviews"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                text-[#66736D]
                transition-colors
                duration-200
                hover:text-[#087F5B]
              "
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Explore all reviews
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
