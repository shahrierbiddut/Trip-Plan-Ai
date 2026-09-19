"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Heart,
  Leaf,
  MessageCircle,
  Sparkles,
  Star,
  Tag,
  ThumbsUp,
} from "lucide-react";

type RecommendedDestination = {
  name: string;
  match: number;
  budget: string;
  image: string;
};

const recommendedDestinations: RecommendedDestination[] = [
  {
    name: "Cox's Bazar",
    match: 92,
    budget: "৳6,800",
    image: "/assets/Coxs/cover-1.jpg",
  },
  {
    name: "Saint Martin",
    match: 91,
    budget: "৳5,400",
    image: "/assets/Saintmartin/cover-1.jpg",
  },
  {
    name: "Sundarban",
    match: 90,
    budget: "৳6,500",
    image: "/assets/Sundarban/cover-1.jpg",
  },
  {
    name: "Sylhet",
    match: 89,
    budget: "৳7,200",
    image: "/assets/Sylhet/cover-1.jpg",
  },
];

const travelersLove = ["Beautiful beaches", "Great seafood", "Scenic sunsets"];

const commonConcerns = ["Weekend crowds", "Peak-season traffic"];

export default function TravelInsights() {
  return (
    <section className="bg-[#F8FAF9] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_1fr]">
          {/* =====================================================
              LEFT — PICKED FOR YOU
          ====================================================== */}

          <PickedForYou />

          {/* =====================================================
              RIGHT — AI REVIEW INTELLIGENCE
          ====================================================== */}

          <AIReviewIntelligence />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PICKED FOR YOU
================================================================ */

function PickedForYou() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4EBE7] bg-white shadow-[0_3px_14px_rgba(23,33,29,0.06)]">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div>
          <h2 className="text-[19px] font-extrabold tracking-[-0.025em] text-[#17211D] sm:text-[20px]">
            Picked for You
          </h2>

          <p className="mt-1 text-[10px] font-semibold text-[#52615A] sm:text-[11px]">
            Because you love Beach + Adventure + Budget Travel
          </p>
        </div>

        <Link
          href="/recommendations"
          className="group flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#087F5B] transition-colors hover:text-[#065F46]"
        >
          View All
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* DESTINATION LIST */}

      <div className="mt-4 grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-5">
        {recommendedDestinations.map((destination) => (
          <RecommendationCard
            key={destination.name}
            destination={destination}
          />
        ))}
      </div>

      {/* CAROUSEL DOTS */}

      <div className="flex items-center justify-center gap-1.5 py-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#087F5B]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C7D3CE]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C7D3CE]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C7D3CE]" />
      </div>
    </div>
  );
}

/* ================================================================
   RECOMMENDATION CARD
================================================================ */

function RecommendationCard({
  destination,
}: {
  destination: RecommendedDestination;
}) {
  return (
    <Link
      href={`/destinations/${destination.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      className="group min-w-0"
    >
      {/* IMAGE */}

      <div className="relative h-[112px] overflow-hidden rounded-lg sm:h-[118px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 45vw, 180px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* DARK GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* HEART */}

        <button
          type="button"
          aria-label={`Save ${destination.name}`}
          onClick={(event) => {
            event.preventDefault();
          }}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#087F5B]"
        >
          <Heart size={13} />
        </button>
      </div>

      {/* INFO */}

      <div className="pt-2">
        <h3 className="truncate text-[11px] font-extrabold text-[#17211D] sm:text-[12px]">
          {destination.name}
        </h3>

        <p className="mt-0.5 text-[9px] font-medium text-[#78857F]">
          {destination.match}% Match
        </p>

        <p className="mt-1.5 text-[10px] font-bold text-[#087F5B]">
          From {destination.budget}
        </p>
      </div>
    </Link>
  );
}

/* ================================================================
   AI REVIEW INTELLIGENCE
================================================================ */

function AIReviewIntelligence() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4EBE7] bg-white shadow-[0_3px_14px_rgba(23,33,29,0.06)]">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div>
          <h2 className="text-[19px] font-extrabold tracking-[-0.025em] text-[#17211D] sm:text-[20px]">
            AI Review Intelligence
          </h2>
        </div>

        <Link
          href="/reviews"
          className="group flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#087F5B] hover:text-[#065F46]"
        >
          View All
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* DESTINATION */}

      <div className="mt-3 flex items-center gap-3 px-4 sm:px-5">
        {/* SMALL IMAGE */}

        <div className="relative h-[42px] w-[78px] shrink-0 overflow-hidden rounded-md">
          <Image
            src="/assets/Coxs/cover-1.jpg"
            alt="Cox's Bazar"
            fill
            sizes="78px"
            className="object-cover"
          />
        </div>

        {/* NAME */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-extrabold text-[#17211D]">
            Cox&apos;s Bazar
          </h3>

          <div className="mt-0.5 flex items-center gap-1 text-[9px] font-medium text-[#78857F]">
            <MapPinIcon />
            Bangladesh
          </div>
        </div>

        {/* RATING */}

        <div className="flex shrink-0 items-center gap-1">
          <Star size={13} className="fill-[#F4A900] text-[#F4A900]" />

          <span className="text-[11px] font-extrabold text-[#F0A900]">4.7</span>

          <span className="hidden text-[9px] text-[#78857F] sm:inline">
            (1.2K reviews)
          </span>
        </div>
      </div>

      {/* =====================================================
          SENTIMENT AREA
      ====================================================== */}

      <div className="mt-3 grid grid-cols-[105px_1fr_1fr] gap-2 px-4 sm:grid-cols-[115px_1fr_1fr] sm:px-5">
        {/* POSITIVE SCORE */}

        <div className="flex items-center justify-center rounded-lg bg-[#F8FAF9]">
          <div className="relative flex h-[76px] w-[76px] items-center justify-center">
            {/* Outer circle */}

            <div className="absolute inset-0 rounded-full border-[5px] border-[#DDECE6]" />

            {/* Green progress */}

            <div
              className="absolute inset-0 rounded-full border-[5px] border-transparent border-l-[#55B995] border-t-[#55B995]"
              style={{
                transform: "rotate(-35deg)",
              }}
            />

            <div className="text-center">
              <p className="text-[19px] font-extrabold leading-none text-[#17211D]">
                94%
              </p>

              <p className="mt-1 text-[8px] font-bold text-[#087F5B]">
                Positive
              </p>
            </div>
          </div>
        </div>

        {/* TRAVELERS LOVE */}

        <div className="rounded-lg bg-[#F8FAF9] px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <ThumbsUp size={12} className="text-[#087F5B]" />

            <h4 className="text-[10px] font-extrabold text-[#087F5B]">
              Travelers&apos; Love
            </h4>
          </div>

          <div className="mt-2 space-y-1.5">
            {travelersLove.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check
                  size={10}
                  strokeWidth={3}
                  className="shrink-0 text-[#5C9F82]"
                />

                <span className="truncate text-[9px] font-medium text-[#52615A]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COMMON CONCERNS */}

        <div className="rounded-lg bg-[#FFF8F7] px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <CircleAlert size={12} className="text-[#D64545]" />

            <h4 className="text-[10px] font-extrabold text-[#C83D3D]">
              Common Concerns
            </h4>
          </div>

          <div className="mt-2 space-y-1.5">
            {commonConcerns.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CircleAlert size={9} className="shrink-0 text-[#D64545]" />

                <span className="truncate text-[9px] font-medium text-[#6A5757]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          AI VERDICT
      ====================================================== */}

      <div className="mx-4 mt-3 rounded-lg border border-[#EEF2F0] bg-[#F8FAF9] px-3 py-2.5 sm:mx-5">
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#087F5B]" />

          <span className="text-[10px] font-extrabold text-[#087F5B]">
            AI Verdict
          </span>
        </div>

        <p className="mt-1 text-[9px] font-medium leading-4 text-[#52615A]">
          Best for short relaxing trips and family vacations.
        </p>
      </div>

      {/* =====================================================
          AI ANALYSIS TAGS
      ====================================================== */}

      <div className="flex flex-wrap gap-1.5 px-4 py-3 sm:px-5">
        <AnalysisTag icon={<Leaf size={11} />} label="AI Summary" />

        <AnalysisTag
          icon={<MessageCircle size={11} />}
          label="Sentiment Analysis"
        />

        <AnalysisTag icon={<Tag size={11} />} label="Common Themes" />
      </div>
    </div>
  );
}

/* ================================================================
   ANALYSIS TAG
================================================================ */

function AnalysisTag({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#E4EBE7] bg-[#F8FAF9] px-2.5 py-1.5 text-[8px] font-bold text-[#66736D]">
      <span className="text-[#087F5B]">{icon}</span>

      {label}
    </span>
  );
}

/* ================================================================
   SMALL MAP PIN
================================================================ */

function MapPinIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#087F5B]"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
