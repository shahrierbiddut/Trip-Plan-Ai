"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Grid2X2,
  Heart,
  Hotel,
  List,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  ThumbsUp,
  UserRound,
  Users,
  UsersRound,
  Utensils,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ============================================================
   TYPES
============================================================ */

type Review = {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  title: string;
  text: string;
  destination: string;
  tripType: string;
  date: string;
  helpful: number;
  photos: string[];
  verified: boolean;
};

type ExperienceRating = {
  label: string;
  rating: number;
  icon: React.ReactNode;
};

/* ============================================================
   REVIEW DATA
============================================================ */

const reviews: Review[] = [
  {
    id: 1,
    name: "Tahmid Hasan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85",
    location: "Dhaka, Bangladesh",
    rating: 5,
    title: "An unforgettable coastal escape",
    text: "The beach is simply beautiful — especially during sunset. Marine Drive was one of the highlights of our trip. The seafood was delicious and the locals were very friendly.",
    destination: "Cox's Bazar",
    tripType: "Family Trip",
    date: "Feb 2026",
    helpful: 24,
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=85",
    ],
  },

  {
    id: 2,
    name: "Nusrat Jahan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85",
    location: "Chattogram, Bangladesh",
    rating: 4.5,
    title: "Peaceful, relaxing and refreshing",
    text: "Saint Martin is a paradise for nature lovers. Crystal clear water, amazing beaches and a peaceful environment. Perfect getaway for anyone looking to disconnect.",
    destination: "Saint Martin",
    tripType: "Couple Trip",
    date: "Jan 2026",
    helpful: 18,
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=85",
    ],
  },

  {
    id: 3,
    name: "Rifat Ahmed",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85",
    location: "Sylhet, Bangladesh",
    rating: 4,
    title: "Great experience with minor issues",
    text: "The hills, clouds and viewpoints are amazing. But weekend traffic and hotel prices were a bit high. Still, we had a great time and would definitely visit again.",
    destination: "Bandarban",
    tripType: "Friends Trip",
    date: "Dec 2025",
    helpful: 15,
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=85",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=85",
    ],
  },
];

/* ============================================================
   EXPERIENCE RATINGS
============================================================ */

const experienceRatings: ExperienceRating[] = [
  {
    label: "Overall Experience",
    rating: 4.9,
    icon: <Sparkles size={12} />,
  },
  {
    label: "Food & Dining",
    rating: 4.7,
    icon: <Utensils size={12} />,
  },
  {
    label: "Family Experience",
    rating: 4.8,
    icon: <UsersRound size={12} />,
  },
  {
    label: "Transportation",
    rating: 4.8,
    icon: <Car size={12} />,
  },
  {
    label: "Accommodation",
    rating: 4.8,
    icon: <Hotel size={12} />,
  },
  {
    label: "Cleanliness",
    rating: 4.5,
    icon: <Sparkles size={12} />,
  },
  {
    label: "Value for Money",
    rating: 4.6,
    icon: <CircleDollarSign size={12} />,
  },
  {
    label: "Safety & Security",
    rating: 4.8,
    icon: <ShieldCheck size={12} />,
  },
];

/* ============================================================
   FILTER STATE
============================================================ */

const ratingFilters = [
  {
    label: "5 stars",
    count: "7,254",
    stars: 5,
  },
  {
    label: "4 stars",
    count: "3,152",
    stars: 4,
  },
  {
    label: "3 stars",
    count: "1,256",
    stars: 3,
  },
  {
    label: "2 stars",
    count: "512",
    stars: 2,
  },
  {
    label: "1 star",
    count: "326",
    stars: 1,
  },
];

const travelerTypes = [
  {
    label: "Family",
    count: "4,256",
  },
  {
    label: "Couple",
    count: "3,125",
  },
  {
    label: "Solo Travelers",
    count: "2,145",
  },
  {
    label: "Friends",
    count: "3,385",
  },
  {
    label: "Adventure Travelers",
    count: "1,254",
  },
];

const experiences = [
  {
    label: "Beach",
    count: "6,524",
  },
  {
    label: "Food",
    count: "4,215",
  },
  {
    label: "Nature",
    count: "3,862",
  },
  {
    label: "Adventure",
    count: "2,541",
  },
  {
    label: "Culture",
    count: "1,254",
  },
  {
    label: "Hotels",
    count: "2,145",
  },
  {
    label: "Activities",
    count: "2,358",
  },
  {
    label: "Shopping",
    count: "952",
  },
];

/* ============================================================
   ANIMATION
============================================================ */

const reviewCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: index * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   STAR RATING
============================================================ */

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(rating);

        return (
          <Star
            key={star}
            size={size}
            className={filled ? "text-[#F4A62A]" : "text-[#D6DDD9]"}
            fill={filled ? "currentColor" : "transparent"}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   FILTER SIDEBAR
============================================================ */

function ReviewFilters({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside
      className="
        rounded-[14px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.045)]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-bold text-[#17211D]">Filter Reviews</h3>

        <button
          type="button"
          onClick={() => setSelectedRating(null)}
          className="
            text-[9px]
            font-semibold
            text-[#087F5B]
            transition-colors
            hover:text-[#F4A62A]
          "
        >
          Clear All
        </button>
      </div>

      {/* Destination */}

      <FilterGroup title="Destination">
        <button
          type="button"
          className="
            flex
            h-8
            w-full
            items-center
            justify-between
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
            px-2.5
            text-left
            text-[9px]
            text-[#46534D]
            transition-all
            hover:border-[#087F5B]
            hover:bg-[#F7FAF8]
          "
        >
          <span>All Destinations</span>
          <ChevronDown size={12} />
        </button>
      </FilterGroup>

      {/* Rating */}

      <FilterGroup title="Rating">
        <div className="space-y-2">
          {ratingFilters.map((item) => {
            const active = selectedRating === item.stars;

            return (
              <label
                key={item.label}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-md
                  px-1
                  py-0.5
                  transition-colors
                  hover:bg-[#F7FAF8]
                "
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setSelectedRating(active ? null : item.stars)}
                  className="
                    h-3
                    w-3
                    cursor-pointer
                    accent-[#087F5B]
                  "
                />

                <Stars rating={item.stars} size={10} />

                <span className="ml-auto text-[8px] text-[#87928D]">
                  ({item.count})
                </span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Traveler Type */}

      <FilterGroup title="Traveler Type">
        <div className="space-y-2">
          {travelerTypes.map((item) => (
            <CheckboxRow
              key={item.label}
              label={item.label}
              count={item.count}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Experience */}

      <FilterGroup title="Experience">
        <div className="space-y-2">
          {experiences.map((item) => (
            <motion.label
              key={item.label}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 3,
                    }
              }
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                rounded-md
                px-1
                py-0.5
                transition-colors
                hover:bg-[#F7FAF8]
              "
            >
              <input
                type="checkbox"
                className="
                  h-3
                  w-3
                  accent-[#087F5B]
                "
              />

              <span className="text-[9px] text-[#53615A]">{item.label}</span>

              <span className="ml-auto text-[8px] text-[#8B9691]">
                ({item.count})
              </span>
            </motion.label>
          ))}
        </div>
      </FilterGroup>

      {/* More Filters */}

      <FilterGroup title="More Filters">
        <div className="space-y-2">
          <CheckboxRow label="Verified Travelers Only" />
          <CheckboxRow label="With Photos" />
          <CheckboxRow label="AI Summarized" />
          <CheckboxRow label="Recommended" />
        </div>
      </FilterGroup>

      {/* Buttons */}

      <motion.button
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -2,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.98,
              }
        }
        className="
          mt-4
          flex
          h-9
          w-full
          items-center
          justify-center
          rounded-lg
          bg-[#063A2F]
          text-[9px]
          font-bold
          text-white
          shadow-[0_5px_14px_rgba(6,58,47,0.18)]
          transition-colors
          hover:bg-[#087F5B]
        "
      >
        Apply Filters
      </motion.button>

      <button
        type="button"
        onClick={() => setSelectedRating(null)}
        className="
          mt-2
          flex
          h-9
          w-full
          items-center
          justify-center
          rounded-lg
          border
          border-[#BCD1C9]
          bg-white
          text-[9px]
          font-semibold
          text-[#087F5B]
          transition-all
          hover:border-[#087F5B]
          hover:bg-[#F5FAF7]
        "
      >
        Clear All
      </button>
    </aside>
  );
}

/* ============================================================
   FILTER GROUP
============================================================ */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-[#EEF2F0] pt-4">
      <h4 className="mb-3 text-[9px] font-bold text-[#39453F]">{title}</h4>

      {children}
    </div>
  );
}

/* ============================================================
   CHECKBOX ROW
============================================================ */

function CheckboxRow({ label, count }: { label: string; count?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.label
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: 3,
            }
      }
      className="
        flex
        cursor-pointer
        items-center
        gap-2
        rounded-md
        px-1
        py-0.5
        transition-colors
        hover:bg-[#F7FAF8]
      "
    >
      <input
        type="checkbox"
        className="
          h-3
          w-3
          accent-[#087F5B]
        "
      />

      <span className="text-[9px] text-[#53615A]">{label}</span>

      {count && (
        <span className="ml-auto text-[8px] text-[#8B9691]">({count})</span>
      )}
    </motion.label>
  );
}

/* ============================================================
   REVIEW TOOLBAR
============================================================ */

function ReviewToolbar() {
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <div
      className="
        mb-4
        flex
        flex-col
        gap-3
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>
        <h2 className="text-[16px] font-bold text-[#17211D]">
          Traveler Reviews
        </h2>

        <p className="mt-1 text-[9px] text-[#89938F]">12,500 reviews found</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}

        <div
          className="
            flex
            h-8
            w-[180px]
            items-center
            gap-2
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
            px-2.5
            transition-all
            focus-within:border-[#087F5B]
            focus-within:shadow-[0_0_0_3px_rgba(8,127,91,0.07)]
          "
        >
          <Search size={12} className="text-[#89938F]" />

          <input
            type="text"
            placeholder="Search reviews..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-[9px]
              text-[#17211D]
              outline-none
              placeholder:text-[#A3ADA8]
            "
          />
        </div>

        {/* Sort */}

        <button
          type="button"
          className="
            flex
            h-8
            items-center
            gap-2
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
            px-2.5
            text-[9px]
            text-[#4B5953]
            transition-all
            hover:border-[#087F5B]
          "
        >
          <span className="text-[#87928D]">Sort by:</span>

          <span className="font-semibold text-[#17211D]">Most Helpful</span>

          <ChevronDown size={11} />
        </button>

        {/* View */}

        <div
          className="
            flex
            h-8
            overflow-hidden
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
          "
        >
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`
              flex
              w-8
              items-center
              justify-center
              transition-colors
              ${
                view === "grid"
                  ? "bg-[#EAF5F0] text-[#087F5B]"
                  : "text-[#89938F] hover:bg-[#F7FAF8]"
              }
            `}
          >
            <Grid2X2 size={13} />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={`
              flex
              w-8
              items-center
              justify-center
              transition-colors
              ${
                view === "list"
                  ? "bg-[#EAF5F0] text-[#087F5B]"
                  : "text-[#89938F] hover:bg-[#F7FAF8]"
              }
            `}
          >
            <List size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [helpful, setHelpful] = useState(false);
  const [saved, setSaved] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={reviewCardVariants}
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
              y: -4,
            }
      }
      className="
        group
        rounded-[14px]
        border
        border-[#E0E7E4]
        bg-white
        p-4
        shadow-[0_3px_14px_rgba(11,37,34,0.035)]
        transition-[box-shadow,border-color]
        duration-300
        hover:border-[#C8D8D1]
        hover:shadow-[0_14px_32px_rgba(11,37,34,0.09)]
      "
    >
      <div className="flex gap-3">
        {/* Avatar */}

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                }
          }
          className="
            relative
            h-9
            w-9
            shrink-0
            overflow-hidden
            rounded-full
            border
            border-[#DCE5E1]
          "
        >
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </motion.div>

        {/* Main */}

        <div className="min-w-0 flex-1">
          {/* Name row */}

          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-[11px] font-bold text-[#17211D]">
              {review.name}
            </h3>

            {review.verified && (
              <span className="inline-flex items-center gap-1 text-[7px] font-semibold text-[#087F5B]">
                <CheckCircle2 size={9} />
                Verified Traveler
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[8px] text-[#8A9590]">{review.location}</p>

          {/* Rating */}

          <div className="mt-2 flex items-center gap-2">
            <Stars rating={review.rating} size={11} />

            <span className="text-[9px] font-semibold text-[#17211D]">
              {review.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}

          <h4 className="mt-2 text-[12px] font-bold text-[#17211D]">
            {review.title}
          </h4>

          {/* Meta */}

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[8px] text-[#87928D]">
            <span>{review.destination}</span>

            <span>•</span>

            <span>{review.tripType}</span>

            <span>•</span>

            <span>{review.date}</span>
          </div>

          {/* Text */}

          <p
            className="
              mt-2
              max-w-[620px]
              text-[9px]
              leading-[1.7]
              text-[#59665F]
            "
          >
            {review.text}
          </p>

          {/* Photos */}

          <div className="mt-3 flex gap-1.5 overflow-hidden">
            {review.photos.map((photo, photoIndex) => (
              <motion.div
                key={photo}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.03,
                      }
                }
                className="
                  relative
                  h-[55px]
                  w-[68px]
                  shrink-0
                  overflow-hidden
                  rounded-lg
                  bg-[#EDF2EF]
                "
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="68px"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.01]
                  "
                />

                {photoIndex === 3 && (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/45
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    +5
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Actions */}

          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setHelpful(!helpful)}
              className={`
                group/action
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                transition-colors
                ${
                  helpful
                    ? "text-[#087F5B]"
                    : "text-[#78847E] hover:text-[#087F5B]"
                }
              `}
            >
              <ThumbsUp
                size={11}
                fill={helpful ? "currentColor" : "transparent"}
              />
              Helpful {review.helpful + (helpful ? 1 : 0)}
            </button>

            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className={`
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                transition-colors
                ${
                  saved
                    ? "text-[#087F5B]"
                    : "text-[#78847E] hover:text-[#087F5B]"
                }
              `}
            >
              <Bookmark
                size={11}
                fill={saved ? "currentColor" : "transparent"}
              />
              Save
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                text-[#78847E]
                transition-colors
                hover:text-[#087F5B]
              "
            >
              <Share2 size={11} />
              Share
            </button>

            <button
              type="button"
              className="
                ml-auto
                text-[#9AA39F]
                transition-colors
                hover:text-[#17211D]
              "
            >
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   TRAVELER RATING CARD
============================================================ */

function TravelerRatingCard() {
  const shouldReduceMotion = useReducedMotion();

  const ratingBars = [
    {
      stars: 5,
      percentage: 82,
    },
    {
      stars: 4,
      percentage: 12,
    },
    {
      stars: 3,
      percentage: 3,
    },
    {
      stars: 2,
      percentage: 2,
    },
    {
      stars: 1,
      percentage: 1,
    },
  ];

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        rounded-[14px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.045)]
        transition-shadow
        duration-300
        hover:shadow-[0_14px_30px_rgba(11,37,34,0.09)]
      "
    >
      <h3 className="text-[12px] font-bold text-[#17211D]">Traveler Rating</h3>

      <div className="mt-3 flex items-center gap-3">
        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.05,
                }
          }
        >
          <div className="text-[27px] font-bold tracking-[-0.04em] text-[#17211D]">
            4.8
            <span className="text-[11px] font-medium text-[#7D8983]"> / 5</span>
          </div>
        </motion.div>

        <div>
          <Stars rating={4.8} size={12} />

          <p className="mt-1 text-[8px] text-[#8B9691]">1,200 reviews</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {ratingBars.map((bar) => (
          <div key={bar.stars} className="flex items-center gap-2">
            <span className="w-[24px] text-[8px] font-medium text-[#68756F]">
              {bar.stars} ★
            </span>

            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#EAF0ED]">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }
                whileInView={{
                  width: `${bar.percentage}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: (5 - bar.stars) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-[#087F5B]"
              />
            </div>

            <span className="w-[25px] text-right text-[8px] text-[#7D8983]">
              {bar.percentage}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================================
   EXPERIENCE RATINGS CARD
============================================================ */

function ExperienceRatingsCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        rounded-[14px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.045)]
        transition-shadow
        duration-300
        hover:shadow-[0_14px_30px_rgba(11,37,34,0.09)]
      "
    >
      <h3 className="text-[12px] font-bold text-[#17211D]">
        Experience Ratings
      </h3>

      <div className="mt-4 space-y-3">
        {experienceRatings.map((item, index) => (
          <motion.div
            key={item.label}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 3,
                  }
            }
            className="flex items-center gap-2"
          >
            <div className="flex w-[86px] items-center gap-1.5 text-[8px] text-[#68756F]">
              <span className="text-[#087F5B]">{item.icon}</span>

              <span className="truncate">{item.label}</span>
            </div>

            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#EAF0ED]">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }
                whileInView={{
                  width: `${(item.rating / 5) * 100}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-[#087F5B]"
              />
            </div>

            <span className="w-[20px] text-right text-[8px] font-bold text-[#526058]">
              {item.rating}
            </span>
          </motion.div>
        ))}
      </div>

      <Link
        href="/reviews/categories"
        className="
          group
          mt-4
          flex
          items-center
          justify-center
          gap-1
          text-[9px]
          font-semibold
          text-[#087F5B]
          transition-colors
          hover:text-[#F4A62A]
        "
      >
        View All Categories
        <motion.span
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <ArrowRight size={11} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   ASK AI CARD
============================================================ */

function AskAIReviewsCard() {
  const [question, setQuestion] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const suggestions = [
    "Is Cox's Bazar good for families?",
    "What do travelers love most?",
    "Any concerns about peak season?",
    "Which destination is best for couples?",
  ];

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="
        relative
        overflow-hidden
        rounded-[14px]
        border
        border-[#075143]
        bg-[#063A2F]
        p-4
        text-white
        shadow-[0_7px_22px_rgba(6,58,47,0.15)]
      "
    >
      {/* Background */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-36
          w-36
          rounded-full
          bg-[#087F5B]/25
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [0, 8, -8, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Sparkles
              size={15}
              className="text-[#F4B942]"
              fill="currentColor"
            />
          </motion.div>

          <h3 className="text-[12px] font-bold">Ask AI About Reviews</h3>
        </div>

        <p className="mt-2 text-[9px] leading-[1.55] text-white/65">
          Get AI-powered answers from thousands of traveler experiences.
        </p>

        {/* Suggestions */}

        <div className="mt-3 space-y-1.5">
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => setQuestion(suggestion)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 3,
                      borderColor: "rgba(244,185,66,0.5)",
                      backgroundColor: "rgba(244,166,42,0.08)",
                    }
              }
              className="
                block
                w-full
                rounded-full
                border
                border-white/15
                bg-white/[0.04]
                px-2.5
                py-1.5
                text-left
                text-[8px]
                text-white/75
                transition-colors
              "
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        {/* Input */}

        <div
          className="
            mt-4
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-white/15
            bg-white/[0.06]
            px-2
            focus-within:border-[#F4B942]/60
          "
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-[9px]
              text-white
              outline-none
              placeholder:text-white/35
            "
          />

          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: -4,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.95,
                  }
            }
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-[#F4A62A]
              text-[#063A2F]
              transition-colors
              hover:bg-[#F8B94C]
            "
          >
            <Send size={11} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   PAGINATION
============================================================ */

function Pagination() {
  return (
    <div
      className="
        mt-5
        flex
        items-center
        justify-center
        gap-1.5
      "
    >
      <button
        type="button"
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-md
          text-[#89938F]
          transition-colors
          hover:bg-[#EAF3EF]
          hover:text-[#087F5B]
        "
      >
        <ChevronLeft size={13} />
      </button>

      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          type="button"
          className={`
            flex
            h-7
            min-w-7
            items-center
            justify-center
            rounded-md
            px-1.5
            text-[9px]
            font-semibold
            transition-all
            ${
              page === 1
                ? "bg-[#063A2F] text-white shadow-[0_4px_10px_rgba(6,58,47,0.15)]"
                : "text-[#68756F] hover:bg-[#EAF3EF] hover:text-[#087F5B]"
            }
          `}
        >
          {page}
        </button>
      ))}

      <span className="px-1 text-[9px] text-[#9AA39F]">...</span>

      <button
        type="button"
        className="
          flex
          h-7
          min-w-7
          items-center
          justify-center
          rounded-md
          px-1.5
          text-[9px]
          font-semibold
          text-[#68756F]
          transition-colors
          hover:bg-[#EAF3EF]
          hover:text-[#087F5B]
        "
      >
        417
      </button>

      <button
        type="button"
        className="
          ml-1
          flex
          h-7
          items-center
          gap-1
          rounded-md
          px-2
          text-[9px]
          font-semibold
          text-[#087F5B]
          transition-colors
          hover:bg-[#EAF3EF]
        "
      >
        Next
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
============================================================ */

export default function TravelerReviewsSection() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  return (
    <section
      id="traveler-reviews"
      className="
        bg-[#F7F7F2]
        pb-12
        pt-4
        sm:pb-16
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
        {/* ==================================================
            MAIN 3 COLUMN LAYOUT
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[180px_minmax(0,1fr)_220px]
            xl:grid-cols-[190px_minmax(0,1fr)_235px]
          "
        >
          {/* ================================================
              LEFT FILTER
          ================================================= */}

          <div className="lg:sticky lg:top-5 lg:self-start">
            <ReviewFilters
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>

          {/* ================================================
              CENTER REVIEWS
          ================================================= */}

          <main className="min-w-0">
            <ReviewToolbar />

            <div className="space-y-3">
              {reviews
                .filter((review) =>
                  selectedRating
                    ? Math.round(review.rating) === selectedRating
                    : true,
                )
                .map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
            </div>

            <Pagination />
          </main>

          {/* ================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            <TravelerRatingCard />

            <ExperienceRatingsCard />

            <AskAIReviewsCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
