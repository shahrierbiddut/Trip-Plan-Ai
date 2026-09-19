"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  CloudUpload,
  Heart,
  MapPin,
  Minus,
  Send,
  Sparkles,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type TripType = "Family" | "Couple" | "Friends" | "Solo" | "Business";

type RatingCategory = {
  id: string;
  label: string;
  value: number;
};

type UploadedImage = {
  id: number;
  url: string;
  name: string;
};

/* ============================================================
   CONSTANTS
============================================================ */

const destinations = [
  "Cox's Bazar",
  "Sajek Valley",
  "Bandarban",
  "Sylhet",
  "Saint Martin's Island",
  "Rangamati",
];

const tripTypes: TripType[] = [
  "Family",
  "Couple",
  "Friends",
  "Solo",
  "Business",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const initialCategories: RatingCategory[] = [
  {
    id: "experience",
    label: "Overall Experience",
    value: 0,
  },
  {
    id: "family",
    label: "Family Experience",
    value: 0,
  },
  {
    id: "transportation",
    label: "Transportation",
    value: 0,
  },
  {
    id: "accommodation",
    label: "Accommodation",
    value: 0,
  },
  {
    id: "cleanliness",
    label: "Cleanliness",
    value: 0,
  },
  {
    id: "food",
    label: "Food & Dining",
    value: 0,
  },
  {
    id: "safety",
    label: "Safety & Security",
    value: 0,
  },
  {
    id: "value",
    label: "Value for Money",
    value: 0,
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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardMotion: Variants = {
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
   STAR RATING
============================================================ */

function StarRating({
  value,
  onChange,
  size = 24,
  interactive = true,
}: {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  interactive?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;

        return (
          <motion.button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            whileHover={
              interactive && !shouldReduceMotion
                ? {
                    scale: 1.16,
                    y: -2,
                    rotate: [0, -3, 3, 0],
                  }
                : undefined
            }
            whileTap={
              interactive && !shouldReduceMotion
                ? {
                    scale: 0.9,
                  }
                : undefined
            }
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={`
              rounded-md
              p-0.5
              outline-none
              transition-all
              duration-200
              focus-visible:ring-2
              focus-visible:ring-[#087F5B]/30
              ${
                active
                  ? "text-[#F4A62A] drop-shadow-[0_3px_7px_rgba(244,166,42,0.25)]"
                  : "text-[#D5DDD9] hover:text-[#E5A12B]"
              }
              ${interactive ? "cursor-pointer" : "cursor-default"}
            `}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              fill={active ? "currentColor" : "none"}
              strokeWidth={1.8}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

/* ============================================================
   FIELD LABEL
============================================================ */

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      className="
        mb-2
        block
        text-[12px]
        font-semibold
        tracking-[-0.01em]
        text-[#17211D]
      "
    >
      {children}
      {required && <span className="ml-1 text-[#D14A43]">*</span>}
    </label>
  );
}

/* ============================================================
   INPUT CLASS
============================================================ */

const inputClass = `
  w-full
  rounded-xl
  border
  border-[#D9E2DE]
  bg-[#FBFCFA]
  text-[#17211D]
  outline-none
  transition-all
  duration-300
  hover:border-[#B8CCC5]
  hover:bg-white
  focus:border-[#087F5B]
  focus:bg-white
  focus:ring-4
  focus:ring-[#087F5B]/[0.08]
`;

/* ============================================================
   MAIN PAGE
============================================================ */

export default function WriteReviewPage() {
  const shouldReduceMotion = useReducedMotion();

  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState<TripType | "">("");
  const [travelMonth, setTravelMonth] = useState("");
  const [overallRating, setOverallRating] = useState(0);

  const [categories, setCategories] =
    useState<RatingCategory[]>(initialCategories);

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const [loved, setLoved] = useState("");
  const [concerns, setConcerns] = useState("");

  const [recommend, setRecommend] = useState<boolean | null>(null);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ==========================================================
     CATEGORY RATING
  ========================================================== */

  const updateCategoryRating = (id: string, value: number) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? {
              ...category,
              value,
            }
          : category,
      ),
    );
  };

  /* ==========================================================
     IMAGE UPLOAD
  ========================================================== */

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const newImages: UploadedImage[] = [];

    Array.from(files)
      .slice(0, 5 - images.length)
      .forEach((file, index) => {
        const url = URL.createObjectURL(file);

        newImages.push({
          id: Date.now() + index,
          url,
          name: file.name,
        });
      });

    setImages((current) => [...current, ...newImages]);

    event.target.value = "";
  };

  const removeImage = (id: number) => {
    setImages((current) => current.filter((image) => image.id !== id));
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !destination ||
      !tripType ||
      !overallRating ||
      !title.trim() ||
      !review.trim()
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          tripType,
          rating: overallRating,
          title,
          reviewText: review
        })
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewLength = review.length;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#17211D]">
      {/* ======================================================
          SUCCESS MODAL
      ======================================================= */}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#052E26]/60
              px-5
              backdrop-blur-sm
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                relative
                w-full
                max-w-[440px]
                overflow-hidden
                rounded-[24px]
                border
                border-[#DCE5E1]
                bg-white
                p-7
                text-center
                shadow-[0_30px_80px_rgba(0,0,0,0.2)]
              "
            >
              <motion.div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-44
                  w-44
                  rounded-full
                  bg-[#087F5B]/10
                  blur-3xl
                "
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F3F6F4]
                  text-[#66736D]
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-[#E8EFEC]
                  hover:text-[#087F5B]
                "
              >
                <X size={15} />
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                }}
                className="
                  relative
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#087F5B]/10
                  text-[#087F5B]
                "
              >
                <CircleCheck size={34} />
              </motion.div>

              <h2
                className="
                  relative
                  mt-5
                  font-serif
                  text-[27px]
                  font-medium
                  tracking-[-0.025em]
                  text-[#0B2522]
                "
              >
                Thank You for Sharing!
              </h2>

              <p
                className="
                  relative
                  mx-auto
                  mt-3
                  max-w-[340px]
                  text-[13px]
                  leading-6
                  text-[#66736D]
                "
              >
                Your travel experience has been submitted and will help other
                travelers make smarter decisions.
              </p>

              <div
                className="
                  relative
                  mt-6
                  rounded-xl
                  border
                  border-[#DCE5E1]
                  bg-[#F7F7F2]
                  p-4
                  text-left
                "
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#F4A62A]" />

                  <span className="text-[11px] font-semibold text-[#17211D]">
                    AI Review Analysis
                  </span>
                </div>

                <p className="mt-2 text-[10px] leading-5 text-[#66736D]">
                  Your review can help improve future recommendations and
                  destination insights.
                </p>
              </div>

              <Link
                href="/reviews"
                className="
                  relative
                  mt-6
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#087F5B]
                  text-[12px]
                  font-semibold
                  text-white
                  shadow-[0_10px_24px_rgba(8,127,91,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#076D4F]
                  hover:shadow-[0_15px_30px_rgba(8,127,91,0.25)]
                "
              >
                Back to Reviews
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          NAVBAR
      ======================================================= */}

      <header
        className="
          border-b
          border-[#E0E7E3]
          bg-white/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[68px]
            max-w-[1180px]
            items-center
            justify-between
            px-5
            sm:px-8
          "
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: 3,
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
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#063A2F]
                text-[#F4B942]
                shadow-sm
              "
            >
              <MapPin size={18} fill="currentColor" />
            </motion.div>

            <div>
              <span
                className="
                  block
                  font-serif
                  text-[18px]
                  font-semibold
                  tracking-[-0.03em]
                  text-[#0B2522]
                "
              >
                TripPlan
              </span>

              <span
                className="
                  block
                  -mt-0.5
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#087F5B]
                "
              >
                AI Travel
              </span>
            </div>
          </Link>

          <Link
            href="/reviews"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              text-[#66736D]
              transition-colors
              duration-200
              hover:text-[#087F5B]
            "
          >
            <ArrowLeft
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
            Back to Reviews
          </Link>
        </div>
      </header>

      {/* ======================================================
          HERO
      ======================================================= */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#E2E8E5]
          bg-[#F1F5F1]
        "
      >
        <motion.div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#087F5B]/[0.06]
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.8, 0.5],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -bottom-28
            left-[-100px]
            h-64
            w-64
            rounded-full
            bg-[#F4A62A]/[0.05]
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            mx-auto
            max-w-[820px]
            px-5
            py-12
            text-center
            sm:px-8
            sm:py-16
          "
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -2,
                    scale: 1.03,
                  }
            }
            className="
              mx-auto
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#087F5B]/15
              bg-white/70
              px-3
              py-1.5
              backdrop-blur-sm
            "
          >
            <Sparkles
              size={12}
              className="text-[#F4A62A]"
              fill="currentColor"
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#087F5B]
              "
            >
              Share Your Experience
            </span>
          </motion.div>

          <h1
            className="
              font-serif
              text-[36px]
              font-medium
              leading-[1.08]
              tracking-[-0.035em]
              text-[#0B2522]
              sm:text-[48px]
              lg:text-[54px]
            "
          >
            Your Journey Could
            <span className="text-[#087F5B]"> Inspire Others.</span>
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-[600px]
              text-[12px]
              leading-6
              text-[#66736D]
              sm:text-[14px]
              sm:leading-7
            "
          >
            Tell fellow travelers what you loved, what to expect, and what they
            should know before visiting.
          </p>
        </motion.div>
      </section>

      {/* ======================================================
          MAIN
      ======================================================= */}

      <section className="py-8 sm:py-12 lg:py-14">
        <div
          className="
            mx-auto
            grid
            max-w-[1180px]
            grid-cols-1
            gap-6
            px-5
            sm:px-8
            lg:grid-cols-[minmax(0,1fr)_320px]
          "
        >
          {/* ==================================================
              FORM
          =================================================== */}

          <motion.form
            onSubmit={handleSubmit}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="space-y-5"
          >
            {/* STEP 01 */}

            <FormCard>
              <StepHeading
                number="01"
                title="Tell Us About Your Trip"
                description="Start with a few details about where and when you traveled."
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Destination</FieldLabel>

                  <div className="relative">
                    <MapPin
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-[#087F5B]
                      "
                    />

                    <select
                      required
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      className={`
                        ${inputClass}
                        h-11
                        appearance-none
                        pl-10
                        pr-10
                        text-[11px]
                        font-medium
                      `}
                    >
                      <option value="">Select destination</option>

                      {destinations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-3.5
                        top-1/2
                        -translate-y-1/2
                        text-[#66736D]
                      "
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required>Travel Type</FieldLabel>

                  <div className="relative">
                    <Users
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-[#087F5B]
                      "
                    />

                    <select
                      required
                      value={tripType}
                      onChange={(event) =>
                        setTripType(event.target.value as TripType | "")
                      }
                      className={`
                        ${inputClass}
                        h-11
                        appearance-none
                        pl-10
                        pr-10
                        text-[11px]
                        font-medium
                      `}
                    >
                      <option value="">Select travel type</option>

                      {tripTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-3.5
                        top-1/2
                        -translate-y-1/2
                        text-[#66736D]
                      "
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>When Did You Visit?</FieldLabel>

                  <select
                    value={travelMonth}
                    onChange={(event) => setTravelMonth(event.target.value)}
                    className={`
                      ${inputClass}
                      h-11
                      px-3.5
                      text-[11px]
                      font-medium
                    `}
                  >
                    <option value="">Select month</option>

                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormCard>

            {/* STEP 02 */}

            <FormCard>
              <StepHeading
                number="02"
                title="Rate Your Experience"
                description="Your rating helps us understand the overall quality of your trip."
              />

              <div
                className="
                  mt-6
                  rounded-[15px]
                  border
                  border-[#E5EBE8]
                  bg-[#F8FAF8]
                  p-5
                  text-center
                "
              >
                <p className="text-[10px] font-medium text-[#66736D]">
                  Overall Rating
                </p>

                <div className="mt-3 flex justify-center">
                  <StarRating
                    value={overallRating}
                    onChange={setOverallRating}
                    size={30}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={overallRating}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    className="
                      mt-2
                      text-[11px]
                      font-semibold
                      text-[#087F5B]
                    "
                  >
                    {overallRating === 0
                      ? "Tap a star to rate your experience"
                      : ratingLabel(overallRating)}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-6 space-y-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
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
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: 3,
                            borderColor: "#C8D8D1",
                          }
                    }
                    className="
                      flex
                      flex-col
                      gap-2
                      rounded-xl
                      border
                      border-[#E6ECE9]
                      bg-white
                      p-3.5
                      transition-colors
                      duration-200
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <span className="text-[10px] font-semibold text-[#4E5D56]">
                      {category.label}
                    </span>

                    <StarRating
                      value={category.value}
                      onChange={(value) =>
                        updateCategoryRating(category.id, value)
                      }
                      size={18}
                    />
                  </motion.div>
                ))}
              </div>
            </FormCard>

            {/* STEP 03 */}

            <FormCard>
              <StepHeading
                number="03"
                title="Share Your Experience"
                description="Tell future travelers what made your trip memorable."
              />

              <div className="mt-6">
                <FieldLabel required>Review Title</FieldLabel>

                <input
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={90}
                  placeholder="Give your review a helpful title..."
                  className={`
                    ${inputClass}
                    h-11
                    px-3.5
                    text-[11px]
                    font-medium
                    placeholder:text-[#A0AAA5]
                  `}
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <FieldLabel required>Your Review</FieldLabel>

                  <span className="text-[9px] text-[#8A9590]">
                    {reviewLength}/1000
                  </span>
                </div>

                <textarea
                  required
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  maxLength={1000}
                  rows={7}
                  placeholder="What did you experience? What should other travelers know?"
                  className={`
                    ${inputClass}
                    min-h-[170px]
                    resize-none
                    px-3.5
                    py-3
                    text-[11px]
                    font-medium
                    leading-6
                    placeholder:text-[#A0AAA5]
                  `}
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel>❤️ What Did You Love?</FieldLabel>

                  <textarea
                    value={loved}
                    onChange={(event) => setLoved(event.target.value)}
                    rows={4}
                    placeholder="Beautiful beach, friendly locals, great food..."
                    className={`
                      ${inputClass}
                      resize-none
                      px-3.5
                      py-3
                      text-[10px]
                      leading-5
                      placeholder:text-[#A0AAA5]
                    `}
                  />
                </div>

                <div>
                  <FieldLabel>⚠ What Could Be Better?</FieldLabel>

                  <textarea
                    value={concerns}
                    onChange={(event) => setConcerns(event.target.value)}
                    rows={4}
                    placeholder="Weekend traffic, crowded areas..."
                    className={`
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#D9E2DE]
                      bg-[#FBFCFA]
                      px-3.5
                      py-3
                      text-[10px]
                      leading-5
                      text-[#17211D]
                      outline-none
                      placeholder:text-[#A0AAA5]
                      transition-all
                      duration-300
                      hover:border-[#D1B4B0]
                      hover:bg-white
                      focus:border-[#D14A43]
                      focus:ring-4
                      focus:ring-[#D14A43]/[0.08]
                    `}
                  />
                </div>
              </div>

              <div className="mt-6">
                <FieldLabel>Would You Recommend This Destination?</FieldLabel>

                <div className="grid grid-cols-2 gap-3">
                  <RecommendButton
                    selected={recommend === true}
                    onClick={() => setRecommend(true)}
                    icon={<Heart size={16} />}
                    title="Yes, definitely"
                    description="I would recommend it"
                  />

                  <RecommendButton
                    selected={recommend === false}
                    onClick={() => setRecommend(false)}
                    icon={<Minus size={16} />}
                    title="Not really"
                    description="It could be better"
                  />
                </div>
              </div>
            </FormCard>

            {/* STEP 04 */}

            <FormCard>
              <StepHeading
                number="04"
                title="Add Your Photos"
                description="Real photos help other travelers see the destination through your eyes."
              />

              <div className="mt-6">
                <label
                  className="
                    group
                    flex
                    min-h-[145px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-[15px]
                    border
                    border-dashed
                    border-[#BFCFC8]
                    bg-[#F9FBF9]
                    px-5
                    text-center
                    transition-all
                    duration-300
                    hover:border-[#087F5B]
                    hover:bg-[#087F5B]/[0.025]
                    hover:shadow-[0_10px_25px_rgba(8,127,91,0.05)]
                  "
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="sr-only"
                  />

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.07,
                            rotate: -3,
                          }
                    }
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#087F5B]/10
                      text-[#087F5B]
                      transition-colors
                      duration-300
                      group-hover:bg-[#087F5B]/15
                    "
                  >
                    <CloudUpload size={21} />
                  </motion.div>

                  <p className="mt-3 text-[11px] font-semibold text-[#17211D]">
                    Upload travel photos
                  </p>

                  <p className="mt-1 text-[9px] text-[#8A9590]">
                    JPG, PNG or WEBP · Up to 5 photos
                  </p>
                </label>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    <AnimatePresence>
                      {images.map((image) => (
                        <motion.div
                          key={image.id}
                          initial={{
                            opacity: 0,
                            scale: 0.85,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.85,
                          }}
                          className="
                            group
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-xl
                            border
                            border-[#DCE5E1]
                            bg-[#F3F6F4]
                          "
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            unoptimized
                            className="
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-110
                            "
                          />

                          <div
                            className="
                              absolute
                              inset-0
                              bg-black/0
                              transition-colors
                              duration-300
                              group-hover:bg-black/10
                            "
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="
                              absolute
                              right-1.5
                              top-1.5
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                              rounded-full
                              bg-[#063A2F]/80
                              text-white
                              opacity-0
                              backdrop-blur-sm
                              transition-all
                              duration-200
                              group-hover:opacity-100
                              hover:scale-110
                              hover:bg-[#C7372F]
                            "
                          >
                            <Trash2 size={11} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </FormCard>

            {/* SUBMIT */}

            <FormCard>
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#087F5B]/10
                  bg-[#087F5B]/[0.035]
                  p-3.5
                  transition-all
                  duration-300
                  hover:border-[#087F5B]/20
                  hover:bg-[#087F5B]/[0.05]
                "
              >
                <BadgeCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#087F5B]"
                />

                <div>
                  <p className="text-[10px] font-semibold text-[#17211D]">
                    Keep it real
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-[#66736D]">
                    Honest and helpful experiences make our travel community
                    better for everyone.
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={
                  !destination ||
                  !tripType ||
                  !overallRating ||
                  !title.trim() ||
                  !review.trim()
                }
                whileHover={
                  !shouldReduceMotion &&
                  destination &&
                  tripType &&
                  overallRating &&
                  title.trim() &&
                  review.trim()
                    ? {
                        y: -2,
                        scale: 1.005,
                      }
                    : undefined
                }
                whileTap={
                  !shouldReduceMotion
                    ? {
                        scale: 0.985,
                      }
                    : undefined
                }
                className="
                  group
                  mt-5
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#087F5B]
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_12px_28px_rgba(8,127,91,0.18)]
                  transition-all
                  duration-300
                  hover:bg-[#076D4F]
                  hover:shadow-[0_18px_36px_rgba(8,127,91,0.26)]
                  disabled:cursor-not-allowed
                  disabled:bg-[#B8C7C1]
                  disabled:shadow-none
                "
              >
                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                >
                  <Send size={15} />
                </motion.span>
                Submit Your Review
              </motion.button>

              <p className="mt-3 text-center text-[8px] text-[#8A9590]">
                By submitting, you agree that your review may be displayed
                publicly on TripPlan AI.
              </p>
            </FormCard>
          </motion.form>

          {/* ==================================================
              SIDEBAR
          =================================================== */}

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-4">
              {/* AI CARD */}

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 20,
                      }
                }
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#075143]
                  bg-[#063A2F]
                  p-5
                  text-white
                  shadow-[0_16px_40px_rgba(6,58,47,0.12)]
                  transition-all
                  duration-500
                  hover:border-[#0A705C]
                  hover:shadow-[0_24px_55px_rgba(6,58,47,0.20)]
                "
              >
                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-[#087F5B]/10
                    via-transparent
                    to-[#F4A62A]/[0.06]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <motion.div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-[#087F5B]/30
                    blur-3xl
                  "
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: [0, 10, 0],
                          y: [0, 8, 0],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: 1.08,
                              rotate: 8,
                            }
                      }
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
                      <Sparkles size={15} fill="currentColor" />
                    </motion.div>

                    <span className="text-[11px] font-bold">
                      AI-Powered Reviews
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5
                      font-serif
                      text-[23px]
                      font-medium
                      leading-tight
                    "
                  >
                    Your story can help
                    <span className="text-[#F4B942]"> another traveler.</span>
                  </h3>

                  <p className="mt-3 text-[9px] leading-5 text-white/60">
                    Your review contributes to AI-powered insights, sentiment
                    analysis and personalized recommendations.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <TrustPoint text="Verified traveler insights" />
                    <TrustPoint text="AI sentiment analysis" />
                    <TrustPoint text="Personalized recommendations" />
                    <TrustPoint text="Better travel decisions" />
                  </div>
                </div>
              </motion.div>

              {/* TIPS */}

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.35,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                className="
                  group
                  rounded-[18px]
                  border
                  border-[#DCE5E1]
                  bg-white
                  p-5
                  shadow-[0_5px_22px_rgba(11,37,34,0.045)]
                  transition-all
                  duration-300
                  hover:border-[#C8D8D1]
                  hover:shadow-[0_16px_36px_rgba(11,37,34,0.08)]
                "
              >
                <div className="flex items-center gap-2">
                  <Camera size={15} className="text-[#087F5B]" />

                  <h3 className="text-[11px] font-bold text-[#17211D]">
                    Tips for a Helpful Review
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  <TipItem text="Be specific about your experience." />
                  <TipItem text="Mention what you loved and what could improve." />
                  <TipItem text="Share practical tips future travelers can use." />
                  <TipItem text="Add authentic photos when possible." />
                </div>
              </motion.div>

              {/* PRIVACY */}

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                className="
                  group
                  flex
                  items-start
                  gap-2.5
                  rounded-xl
                  border
                  border-[#E3EAE7]
                  bg-[#F3F6F4]
                  p-3.5
                  transition-all
                  duration-300
                  hover:border-[#C8D8D1]
                  hover:bg-[#EEF4F1]
                  hover:shadow-[0_8px_20px_rgba(11,37,34,0.045)]
                "
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.12,
                        }
                  }
                >
                  <BadgeCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-[#087F5B]"
                  />
                </motion.div>

                <p className="text-[8px] leading-5 text-[#66736D]">
                  Reviews are moderated to keep our community useful, respectful
                  and authentic.
                </p>
              </motion.div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   FORM CARD
============================================================ */

function FormCard({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
            }
      }
      className="
        group
        rounded-[18px]
        border
        border-[#DCE5E1]
        bg-white
        p-5
        shadow-[0_5px_22px_rgba(11,37,34,0.045)]
        transition-all
        duration-300
        hover:border-[#C8D8D1]
        hover:shadow-[0_14px_34px_rgba(11,37,34,0.075)]
        sm:p-6
      "
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   STEP HEADING
============================================================ */

function StepHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-start gap-3.5">
      <motion.div
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.08,
                rotate: 3,
              }
        }
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#087F5B]/10
          text-[10px]
          font-bold
          text-[#087F5B]
          transition-colors
          duration-300
          group-hover:bg-[#087F5B]/15
        "
      >
        {number}
      </motion.div>

      <div>
        <h2
          className="
            text-[15px]
            font-bold
            tracking-[-0.02em]
            text-[#17211D]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-[9px]
            leading-5
            text-[#8A9590]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   RECOMMEND BUTTON
============================================================ */

function RecommendButton({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        group/recommend
        flex
        items-center
        gap-3
        rounded-xl
        border
        p-3.5
        text-left
        transition-all
        duration-300
        ${
          selected
            ? "border-[#087F5B] bg-[#087F5B]/[0.045] shadow-[0_8px_20px_rgba(8,127,91,0.08)]"
            : "border-[#DCE5E1] bg-white hover:border-[#B8CCC5] hover:bg-[#FAFCFB]"
        }
      `}
    >
      <motion.div
        animate={
          selected
            ? {
                scale: [1, 1.08, 1],
              }
            : undefined
        }
        transition={{
          duration: 0.35,
        }}
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          transition-colors
          duration-300
          ${
            selected
              ? "bg-[#087F5B] text-white"
              : "bg-[#F0F4F2] text-[#66736D] group-hover/recommend:bg-[#087F5B]/10 group-hover/recommend:text-[#087F5B]"
          }
        `}
      >
        {icon}
      </motion.div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-[#17211D]">{title}</p>

        <p className="mt-0.5 text-[8px] text-[#8A9590]">{description}</p>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            className="ml-auto"
          >
            <Check size={15} className="text-[#087F5B]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ============================================================
   TRUST POINT
============================================================ */

function TrustPoint({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: 4,
            }
      }
      className="
        flex
        cursor-default
        items-center
        gap-2
        rounded-lg
        py-0.5
      "
    >
      <motion.div
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.15,
              }
        }
        className="
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-[#087F5B]/20
          text-[#6DD4B3]
        "
      >
        <Check size={10} strokeWidth={2.5} />
      </motion.div>

      <span className="text-[9px] text-white/70">{text}</span>
    </motion.div>
  );
}

/* ============================================================
   TIP ITEM
============================================================ */

function TipItem({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: 4,
            }
      }
      className="
        group/tip
        flex
        cursor-default
        items-start
        gap-2.5
        rounded-lg
        px-1.5
        py-1
        transition-colors
        duration-200
        hover:bg-[#087F5B]/[0.035]
      "
    >
      <motion.div
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.1,
              }
        }
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#F4A62A]/10
          text-[#C9820B]
          transition-all
          duration-300
          group-hover/tip:bg-[#F4A62A]/20
        "
      >
        <Check size={10} strokeWidth={2.5} />
      </motion.div>

      <p className="text-[9px] leading-5 text-[#66736D]">{text}</p>
    </motion.div>
  );
}

/* ============================================================
   RATING LABEL
============================================================ */

function ratingLabel(value: number) {
  switch (value) {
    case 1:
      return "Not a great experience";

    case 2:
      return "Could be better";

    case 3:
      return "It was okay";

    case 4:
      return "Great experience";

    case 5:
      return "Amazing experience!";

    default:
      return "";
  }
}
