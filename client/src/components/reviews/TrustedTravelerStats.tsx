"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Star, Users, BadgeCheck } from "lucide-react";

type Stat = {
  id: number;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  icon: React.ElementType;
  accent: "gold" | "emerald";
};

const stats: Stat[] = [
  {
    id: 1,
    value: 4.8,
    suffix: "/5",
    decimals: 1,
    label: "Overall Rating",
    description: "Average rating from verified travelers",
    icon: Star,
    accent: "gold",
  },
  {
    id: 2,
    value: 12500,
    suffix: "+",
    label: "Traveler Reviews",
    description: "Authentic experiences shared by travelers",
    icon: Users,
    accent: "emerald",
  },
  {
    id: 3,
    value: 850,
    suffix: "+",
    label: "Destinations Reviewed",
    description: "Places explored and reviewed by our community",
    icon: MapPin,
    accent: "emerald",
  },
  {
    id: 4,
    value: 96,
    suffix: "%",
    label: "Would Recommend",
    description: "Travelers who would recommend their experience",
    icon: BadgeCheck,
    accent: "gold",
  },
];

/* ============================================================
   Animated Number
============================================================ */

function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1200,
}: {
  value: number;
  decimals?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = value * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, value, duration]);

  const formattedValue = displayValue.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={elementRef}>{formattedValue}</span>;
}

/* ============================================================
   Stat Card
============================================================ */

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;

  const isGold = stat.accent === "gold";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[16px]
        border
        border-[#DDE5E1]
        bg-white
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#B8CCC5]
        hover:shadow-[0_14px_32px_rgba(11,37,34,0.09)]
        sm:p-5
        lg:p-[18px]
      "
    >
      {/* =====================================================
          Decorative Corner Glow
      ====================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          blur-3xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          ${isGold ? "bg-[#F4A62A]/10" : "bg-[#087F5B]/10"}
        `}
      />

      {/* =====================================================
          Top Row
      ====================================================== */}

      <div className="relative flex items-start justify-between">
        {/* Icon */}

        <div
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-[9px]
            ${
              isGold
                ? "bg-[#F4A62A]/10 text-[#C9820B]"
                : "bg-[#087F5B]/10 text-[#087F5B]"
            }
          `}
        >
          <Icon size={15} strokeWidth={1.9} />
        </div>

        {/* Arrow */}

        <div
          className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-[#E3E9E6]
            text-[#66736D]
            transition-all
            duration-300
            group-hover:border-[#087F5B]/30
            group-hover:bg-[#087F5B]
            group-hover:text-white
          "
        >
          <ArrowUpRight
            size={11}
            strokeWidth={2}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>

      {/* =====================================================
          Number
      ====================================================== */}

      <div className="relative mt-5">
        <div className="flex items-baseline">
          <span
            className="
              font-serif
              text-[32px]
              font-medium
              leading-none
              tracking-[-0.035em]
              text-[#0B2522]
              sm:text-[35px]
              lg:text-[38px]
            "
          >
            <AnimatedNumber value={stat.value} decimals={stat.decimals} />
          </span>

          <span
            className={`
              ml-1
              font-serif
              text-[16px]
              font-medium
              ${isGold ? "text-[#C9820B]" : "text-[#087F5B]"}
            `}
          >
            {stat.suffix}
          </span>
        </div>
      </div>

      {/* =====================================================
          Label
      ====================================================== */}

      <h3
        className="
          relative
          mt-3
          text-[12px]
          font-semibold
          tracking-[-0.01em]
          text-[#17211D]
          sm:text-[13px]
        "
      >
        {stat.label}
      </h3>

      {/* =====================================================
          Description
      ====================================================== */}

      <p
        className="
          relative
          mt-1.5
          max-w-[245px]
          text-[9px]
          leading-[1.55]
          text-[#66736D]
          sm:text-[10px]
        "
      >
        {stat.description}
      </p>

      {/* =====================================================
          Bottom Accent
      ====================================================== */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          transition-all
          duration-500
          group-hover:w-full
          ${isGold ? "bg-[#F4A62A]" : "bg-[#087F5B]"}
        `}
      />
    </article>
  );
}

/* ============================================================
   Main Section
============================================================ */

export default function TrustedTravelerStats() {
  return (
    <section
      aria-labelledby="traveler-stats-heading"
      className="
        relative
        overflow-hidden
        bg-[#F7F7F2]
        py-9
        sm:py-11
        lg:py-12
      "
    >
      {/* ======================================================
          Background Decorations
      ======================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-100px]
          top-10
          h-56
          w-56
          rounded-full
          bg-[#087F5B]/[0.035]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-80px]
          bottom-5
          h-56
          w-56
          rounded-full
          bg-[#F4A62A]/[0.04]
          blur-3xl
        "
      />

      {/* ======================================================
          Container
      ======================================================= */}

      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ====================================================
            Section Header
        ===================================================== */}

        <div
          className="
            mx-auto
            max-w-[650px]
            text-center
          "
        >
          {/* Eyebrow */}

          <div
            className="
              mb-2.5
              inline-flex
              items-center
              gap-1.5
            "
          >
            <span
              className="
                h-px
                w-6
                bg-[#F4A62A]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#087F5B]
              "
            >
              Trusted by Travelers
            </span>

            <span
              className="
                h-px
                w-6
                bg-[#F4A62A]
              "
            />
          </div>

          {/* Heading */}

          <h2
            id="traveler-stats-heading"
            className="
              font-serif
              text-[27px]
              font-medium
              leading-[1.08]
              tracking-[-0.025em]
              text-[#0B2522]
              sm:text-[31px]
              lg:text-[35px]
            "
          >
            Travel Stories You Can{" "}
            <span className="text-[#087F5B]">Trust.</span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-2.5
              max-w-[550px]
              text-[10px]
              leading-[1.65]
              text-[#66736D]
              sm:text-[11px]
            "
          >
            Thousands of travelers share their real experiences with TripPlan
            AI, helping the next traveler discover better places and make
            smarter decisions.
          </p>
        </div>

        {/* ====================================================
            Statistics Grid
        ===================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:mt-8
            lg:grid-cols-4
            lg:gap-3.5
          "
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* ====================================================
            Bottom Trust Indicator
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            gap-1.5
            text-center
            sm:flex-row
            sm:gap-2.5
          "
        >
          {/* Verified Icon */}

          <div
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-[#087F5B]/10
              text-[#087F5B]
            "
          >
            <BadgeCheck size={11} strokeWidth={2} />
          </div>

          <p
            className="
              text-[9px]
              font-medium
              text-[#66736D]
            "
          >
            Built from authentic traveler experiences
          </p>

          <span
            aria-hidden="true"
            className="
              hidden
              h-1
              w-1
              rounded-full
              bg-[#C5CFCA]
              sm:block
            "
          />

          <p
            className="
              text-[9px]
              font-medium
              text-[#087F5B]
            "
          >
            Verified community insights
          </p>
        </div>
      </div>
    </section>
  );
}
