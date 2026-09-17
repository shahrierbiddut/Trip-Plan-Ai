"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  Users,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type TripType = "All" | "Family" | "Couple" | "Friends" | "Solo";

type Review = {
  id: number;
  destination: string;
  location: string;
  title: string;
  quote: string;
  reviewer: string;
  avatar: string;
  rating: number;
  match: number;
  tripType: Exclude<TripType, "All">;
  date: string;
  duration: string;
  image: string;
  tags: string[];
  helpful: number;
  verified: boolean;
};

/* ============================================================
   DATA
============================================================ */

const reviews: Review[] = [
  {
    id: 1,
    destination: "Cox's Bazar",
    location: "Cox's Bazar, Bangladesh",
    title: "Exactly the peaceful family escape we needed",
    quote:
      "The beach was beautiful, the sunset was unforgettable and there were plenty of family-friendly places to explore. Marine Drive was the highlight of our trip.",
    reviewer: "Nusrat Rahman",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 4.9,
    match: 98,
    tripType: "Family",
    date: "Feb 2026",
    duration: "4 days",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    tags: ["Beach", "Family", "Sunset"],
    helpful: 128,
    verified: true,
  },
  {
    id: 2,
    destination: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    title: "A calm mountain escape above the clouds",
    quote:
      "If you want quiet mornings and incredible mountain views, Sajek is hard to beat. The sunrise from our resort was the best part of the trip.",
    reviewer: "Arif Hasan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 4.9,
    match: 96,
    tripType: "Couple",
    date: "Jan 2026",
    duration: "3 days",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    tags: ["Mountain", "Couple", "Nature"],
    helpful: 94,
    verified: true,
  },
  {
    id: 3,
    destination: "Bandarban",
    location: "Bandarban, Bangladesh",
    title: "Adventure, views and unforgettable roads",
    quote:
      "This was exactly the kind of adventure we were looking for. The hills, waterfalls and road journeys made every day feel different.",
    reviewer: "Tanvir Ahmed",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 4.8,
    match: 94,
    tripType: "Friends",
    date: "Dec 2025",
    duration: "4 days",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=85",
    tags: ["Adventure", "Friends", "Hiking"],
    helpful: 76,
    verified: true,
  },
  {
    id: 4,
    destination: "Saint Martin's Island",
    location: "Teknaf, Bangladesh",
    title: "Perfect for slowing down and enjoying the sea",
    quote:
      "The water was beautiful and the island atmosphere was exactly what we wanted. Seafood dinners beside the sea made the trip special.",
    reviewer: "Sadia Karim",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: 4.7,
    match: 93,
    tripType: "Couple",
    date: "Nov 2025",
    duration: "3 days",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
    tags: ["Island", "Food", "Couple"],
    helpful: 68,
    verified: true,
  },
  {
    id: 5,
    destination: "Sylhet",
    location: "Sylhet, Bangladesh",
    title: "Green landscapes everywhere we looked",
    quote:
      "Sylhet was incredibly relaxing. The tea gardens and waterfalls gave us a great mix of sightseeing and slow travel.",
    reviewer: "Mahir Chowdhury",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    rating: 4.6,
    match: 91,
    tripType: "Family",
    date: "Oct 2025",
    duration: "3 days",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    tags: ["Nature", "Family", "Tea"],
    helpful: 52,
    verified: true,
  },
  {
    id: 6,
    destination: "Kuakata",
    location: "Patuakhali, Bangladesh",
    title: "A quieter beach experience",
    quote:
      "Much less crowded than other beach destinations. Watching the sunset and sunrise from the same coastline was a memorable experience.",
    reviewer: "Rafiul Islam",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=120&q=80",
    rating: 4.5,
    match: 89,
    tripType: "Solo",
    date: "Sep 2025",
    duration: "2 days",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
    tags: ["Beach", "Solo", "Sunrise"],
    helpful: 41,
    verified: true,
  },
];

const preferences = [
  { label: "Beach", icon: Waves },
  { label: "Family", icon: Users },
  { label: "Food", icon: Utensils },
  { label: "Photography", icon: Camera },
];

/* ============================================================
   MOTION
============================================================ */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.07,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({
  review,
  index,
  saved,
  onSave,
}: {
  review: Review;
  index: number;
  saved: boolean;
  onSave: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              transition: {
                duration: 0.25,
              },
            }
      }
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-[#DCE5E1]
        bg-white
        shadow-[0_5px_20px_rgba(11,37,34,0.055)]
        transition-shadow
        duration-300
        hover:border-[#C8D8D1]
        hover:shadow-[0_18px_42px_rgba(11,37,34,0.11)]
      "
    >
      {/* Image */}

      <div className="relative h-[205px] overflow-hidden">
        <Image
          src={review.image}
          alt={review.destination}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.06]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#071E19]/75
            via-transparent
            to-transparent
          "
        />

        {/* AI Match */}

        <div
          className="
            absolute
            left-4
            top-4
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/20
            bg-[#063A2F]/90
            px-2.5
            py-1.5
            text-[9px]
            font-bold
            text-[#F4B942]
            shadow-lg
            backdrop-blur-md
          "
        >
          <Target size={11} />
          {review.match}% AI Match
        </div>

        {/* Save */}

        <motion.button
          type="button"
          onClick={onSave}
          whileTap={{ scale: 0.88 }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                }
          }
          aria-label={saved ? "Remove saved review" : "Save review"}
          className={`
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            backdrop-blur-md
            transition-all
            duration-200
            ${
              saved
                ? "border-[#F4B942] bg-[#F4B942] text-[#063A2F]"
                : "border-white/25 bg-black/20 text-white hover:border-white/50 hover:bg-black/35"
            }
          `}
        >
          <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
        </motion.button>

        {/* Destination */}

        <div className="absolute bottom-4 left-4">
          <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-white">
            {review.destination}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-[9px] text-white/75">
            <MapPin size={10} />
            {review.location}
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        {/* Reviewer */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                src={review.avatar}
                alt={review.reviewer}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[10px] font-bold text-[#17211D]">
                  {review.reviewer}
                </p>

                {review.verified && (
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#087F5B] text-white">
                    <Check size={8} strokeWidth={3} />
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-[8px] text-[#8A9590]">
                Verified traveler
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-[#F4A62A]">
            <Star size={12} fill="currentColor" />

            <span className="text-[11px] font-bold text-[#17211D]">
              {review.rating}
            </span>
          </div>
        </div>

        {/* Title */}

        <h4 className="mt-4 text-[14px] font-bold leading-5 tracking-[-0.01em] text-[#17211D]">
          {review.title}
        </h4>

        {/* Quote */}

        <p className="mt-2.5 line-clamp-3 text-[11px] leading-[1.7] text-[#66736D]">
          “{review.quote}”
        </p>

        {/* Tags */}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-[#F2F6F3]
                px-2
                py-1
                text-[8px]
                font-medium
                text-[#477064]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}

        <div className="mt-4 flex items-center justify-between border-t border-[#E8EEEB] pt-3">
          <div className="flex items-center gap-3 text-[8px] text-[#8A9590]">
            <span className="inline-flex items-center gap-1">
              <Clock3 size={10} />
              {review.duration}
            </span>

            <span>{review.date}</span>
          </div>

          <div className="flex items-center gap-1 text-[8px] text-[#8A9590]">
            <ThumbsUp size={10} />
            {review.helpful} helpful
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ReviewsForYouPage() {
  const shouldReduceMotion = useReducedMotion();

  const [activeType, setActiveType] = useState<TripType>("All");
  const [search, setSearch] = useState("");
  const [savedReviews, setSavedReviews] = useState<number[]>([]);
  const [sort, setSort] = useState("Best Match");

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (activeType !== "All") {
      result = result.filter((review) => review.tripType === activeType);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (review) =>
          review.destination.toLowerCase().includes(query) ||
          review.title.toLowerCase().includes(query) ||
          review.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (sort === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sort === "Best Match") {
      result.sort((a, b) => b.match - a.match);
    }

    return result;
  }, [activeType, search, sort]);

  const toggleSaved = (id: number) => {
    setSavedReviews((current) =>
      current.includes(id)
        ? current.filter((reviewId) => reviewId !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#17211D]">
      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative overflow-hidden bg-[#063A2F]">
        {/* Background glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-28
            -top-28
            h-80
            w-80
            rounded-full
            bg-[#087F5B]/30
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-[-100px]
            h-72
            w-72
            rounded-full
            bg-[#F4A62A]/10
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-7 sm:px-8 lg:px-12">
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
              text-white/60
              transition-colors
              hover:text-[#F4B942]
            "
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to Reviews
          </Link>

          {/* Hero content */}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-10 max-w-[780px] text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B942]/20 bg-[#F4A62A]/10 px-3 py-1.5">
              <Sparkles size={12} className="text-[#F4B942]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F4B942]">
                Personalized Review Intelligence
              </span>
            </div>

            <h1
              className="
                font-serif
                text-[36px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-white
                sm:text-[48px]
                lg:text-[58px]
              "
            >
              Reviews Picked
              <span className="text-[#F4B942]"> For You.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[650px] text-[12px] leading-6 text-white/65 sm:text-[14px]">
              Discover traveler experiences that match your interests, travel
              style and preferences — powered by TripPlan AI.
            </p>
          </motion.div>

          {/* Preference profile */}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.55,
            }}
            className="
              mx-auto
              mt-8
              max-w-[760px]
              rounded-2xl
              border
              border-white/10
              bg-white/[0.055]
              p-4
              backdrop-blur-md
            "
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-[#F4B942]" />

                  <span className="text-[10px] font-bold text-white">
                    Your travel profile
                  </span>
                </div>

                <p className="mt-1 text-[8px] text-white/45">
                  Recommendations are based on your selected interests.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {preferences.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.span
                      key={item.label}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -2,
                              scale: 1.03,
                            }
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.05]
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-medium
                        text-white/75
                      "
                    >
                      <Icon size={9} className="text-[#F4B942]" />

                      {item.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          CONTENT
      ======================================================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {/* Toolbar */}

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Left */}

          <div>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#F4A62A]" fill="currentColor" />

              <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#17211D]">
                Recommended for your travel style
              </h2>
            </div>

            <p className="mt-1 text-[10px] text-[#8A9590]">
              {filteredReviews.length} personalized traveler experiences
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full lg:max-w-[260px]">
            <Search
              size={14}
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination or interest..."
              className="
                h-9
                w-full
                rounded-lg
                border
                border-[#DCE5E1]
                bg-white
                pl-9
                pr-3
                text-[10px]
                text-[#17211D]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#A1AAA6]
                focus:border-[#087F5B]
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
          </div>
        </motion.div>

        {/* Filters */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(["All", "Family", "Couple", "Friends", "Solo"] as TripType[]).map(
              (type) => (
                <motion.button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -1,
                        }
                  }
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      activeType === type
                        ? "border-[#087F5B] bg-[#087F5B] text-white shadow-sm"
                        : "border-[#DCE5E1] bg-white text-[#66736D] hover:border-[#087F5B]/30 hover:text-[#087F5B]"
                    }
                  `}
                >
                  {type}
                </motion.button>
              ),
            )}
          </div>

          {/* Sort */}

          <div className="relative inline-flex items-center self-start sm:self-auto">
            <span className="mr-2 text-[9px] font-medium text-[#8A9590]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="
                  h-8
                  appearance-none
                  rounded-lg
                  border
                  border-[#DCE5E1]
                  bg-white
                  pl-3
                  pr-8
                  text-[9px]
                  font-semibold
                  text-[#4E5D56]
                  outline-none
                  transition-all
                  focus:border-[#087F5B]
                "
              >
                <option>Best Match</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A9590]"
              />
            </div>
          </div>
        </div>

        {/* Active search */}

        {search && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="text-[9px] text-[#8A9590]">Searching for:</span>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-[#EAF2EE]
                px-2
                py-1
                text-[8px]
                font-semibold
                text-[#087F5B]
              "
            >
              {search}

              <X size={9} />
            </button>
          </motion.div>
        )}

        {/* ==================================================
            REVIEW GRID
        =================================================== */}

        {filteredReviews.length > 0 ? (
          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                saved={savedReviews.includes(review.id)}
                onSave={() => toggleSaved(review.id)}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-dashed
              border-[#C8D8D1]
              bg-white
              px-6
              py-16
              text-center
            "
          >
            <Search size={24} className="mx-auto text-[#087F5B]" />

            <h3 className="mt-4 text-[15px] font-bold text-[#17211D]">
              No matching reviews found
            </h3>

            <p className="mt-1 text-[10px] text-[#8A9590]">
              Try another destination, interest or travel style.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveType("All");
              }}
              className="
                mt-5
                rounded-lg
                bg-[#087F5B]
                px-4
                py-2
                text-[9px]
                font-semibold
                text-white
                transition-all
                hover:bg-[#066B4D]
              "
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ==================================================
            AI EXPLANATION
        =================================================== */}

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[20px]
            border
            border-[#DCE5E1]
            bg-[#063A2F]
            p-5
            sm:p-6
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-[#087F5B]/25
              blur-3xl
            "
          />

          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#F4B942]/20
                  bg-[#F4A62A]/10
                  text-[#F4B942]
                "
              >
                <Sparkles size={16} fill="currentColor" />
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-white">
                  Why these reviews?
                </h3>

                <p className="mt-1 max-w-[700px] text-[9px] leading-5 text-white/55">
                  TripPlan AI compares traveler preferences, destination
                  interests, review sentiment, ratings and trip types to find
                  experiences that are most relevant to you.
                </p>
              </div>
            </div>

            <Link
              href="/reviews"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-1.5
                rounded-lg
                border
                border-white/20
                bg-white/[0.04]
                px-4
                py-2.5
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
              Explore All Reviews
              <ArrowRight
                size={11}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
