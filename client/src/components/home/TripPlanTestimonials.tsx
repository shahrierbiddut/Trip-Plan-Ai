"use client";

import { getFeatReviews } from "@/lib/api/slug";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

export type TripPlanTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  tag: string;
  initials: string;
  rating?: number;
};

type TripPlanTestimonialsProps = {
  testimonials?: TripPlanTestimonial[];
  className?: string;
};

// Replace these examples with verified traveller feedback before production.
// const sampleTestimonials: TripPlanTestimonial[] = [
//   {
//     id: "family-coxs-bazar",
//     quote:
//       "TripPlan AI made our family trip much easier. We compared total stay costs, checked family facilities and added the right hotel to our plan without opening multiple websites.",
//     name: "Family Traveller",
//     role: "Dhaka - Cox's Bazar trip",
//     tag: "FAMILY TRIP",
//     initials: "FT",
//     rating: 5,
//   },
//   {
//     id: "solo-sajek",
//     quote:
//       "The BDT budget view gave me a clear picture before I left. Hotel, food and transport estimates stayed together, so adjusting my Sajek itinerary was simple.",
//     name: "Solo Traveller",
//     role: "Chattogram - Sajek trip",
//     tag: "SOLO TRIP",
//     initials: "ST",
//     rating: 5,
//   },
//   {
//     id: "friends-sylhet",
//     quote:
//       "Local transport notes and destination essentials helped our group prepare properly. Everyone could understand the plan and the expected shared cost before the journey.",
//     name: "Friends Group",
//     role: "Khulna - Sylhet trip",
//     tag: "GROUP TRIP",
//     initials: "FG",
//     rating: 5,
//   },
// ];

const sampleTestimonials = await getFeatReviews();
// console.log(sampleTestimonials);

export default function TripPlanTestimonials({
  testimonials = sampleTestimonials,
  className = "",
}: TripPlanTestimonialsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="tripplan-testimonials-heading"
      className={`w-full bg-[#f8f8f7] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#bd642f] sm:text-xs">
            Traveller testimonials
          </p>
          <h2
            id="tripplan-testimonials-heading"
            className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-[#1d1a18] sm:text-5xl lg:text-6xl"
          >
            Voices of TripPlan AI
          </h2>
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mx-auto mt-5 block h-px w-20 origin-center bg-[#c97745]"
          />
        </motion.header>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  reduceMotion,
}: {
  testimonial: TripPlanTestimonial;
  index: number;
  reduceMotion: boolean;
}) {
  const rating = Math.min(Math.max(testimonial.rating ?? 5, 0), 5);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, rotateX: 1.5, rotateY: index === 1 ? 0 : index === 0 ? 1 : -1 }
      }
      className="flex h-full flex-col rounded-sm border border-[#e3e0dd] bg-white p-7 shadow-[0_6px_18px_rgba(35,31,28,0.06)] [transform-style:preserve-3d] sm:p-9"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex items-center gap-1 text-[#bd4d08]"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={starIndex}
              size={16}
              strokeWidth={1.8}
              fill={starIndex < rating ? "currentColor" : "none"}
              className={starIndex < rating ? "text-[#bd4d08]" : "text-[#d7d1cc]"}
              aria-hidden="true"
            />
          ))}
        </div>

        <span className="rounded-sm border border-[#ebe8e5] bg-[#faf9f8] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#938b85]">
          {testimonial.tag}
        </span>
      </div>

      <blockquote className="mt-7 flex-1 font-serif text-lg italic leading-8 text-[#48433f] sm:text-xl sm:leading-9">
        &quot;{testimonial.quote}&quot;
      </blockquote>

      <div className="mt-8 border-t border-[#ece9e6] pt-6">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#154c3c] to-[#082f26] font-serif text-sm font-semibold text-white shadow-[0_5px_14px_rgba(8,47,38,0.2)]">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif text-sm font-semibold text-[#2b2724] sm:text-base">
              {testimonial.name}
            </p>
            <p className="mt-0.5 truncate font-serif text-xs text-[#aaa39e] sm:text-sm">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
