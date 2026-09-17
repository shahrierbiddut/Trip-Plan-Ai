"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Star, Tag, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStories } from "@/lib/api/stories";
import type { TravelerStory } from "@/types/travelerStory";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TravelerStories() {
  const shouldReduceMotion = useReducedMotion();
  const [stories, setStories] = useState<TravelerStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStories().then((res) => {
      if (res?.success) setStories(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="min-h-[400px] flex items-center justify-center">Loading stories...</div>;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.65,
          ease: revealEase,
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[28px] font-normal leading-tight tracking-[-0.025em] text-[#17211D] sm:text-[34px]">
              📖 Real Stories. Real Journeys.
            </h2>
            <p className="mt-2 max-w-[560px] text-[13px] font-medium leading-relaxed text-[#5B6C63] sm:text-[14px]">
              See how travelers turned their favorite travel styles into
              unforgettable experiences.
            </p>
          </div>
          <Link
            href="/inspiration/stories"
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#087F5B] transition-colors hover:text-[#D98B26]"
          >
            View All Stories
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.09,
                ease: revealEase,
              }}
              className="group overflow-hidden rounded-[20px] border border-[#E2E7E3] bg-white shadow-[0_10px_28px_rgba(23,33,29,0.06)] transition-shadow duration-500 hover:shadow-[0_18px_42px_rgba(23,33,29,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden sm:h-[210px]">
                <Image
                  src={story.image}
                  alt={`${story.title} — ${story.destination}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Traveler Story Badge */}
                <span className="absolute left-3 top-3 z-10 rounded-full border border-[#F4A934]/50 bg-[#071A16]/65 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#FFD078] backdrop-blur-md">
                  Traveler Story
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title & Destination */}
                <h3 className="font-serif text-[20px] font-normal leading-tight tracking-[-0.02em] text-[#17211D] sm:text-[22px]">
                  {story.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#087F5B]">
                  <MapPin size={12} />
                  {story.destination}
                </div>

                {/* Metadata */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-medium text-[#66736D]">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={11} />
                    {story.duration}
                  </span>
                  <span className="text-[#CCD5D0]">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Tag size={11} />
                    {story.travelStyle}
                  </span>
                  <span className="text-[#CCD5D0]">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Wallet size={11} />
                    {story.budget}
                  </span>
                </div>

                {/* Story Excerpt */}
                <p className="mt-3 text-[12px] font-medium leading-relaxed text-[#5B6C63] sm:text-[13px]">
                  {story.story}
                </p>

                {/* Footer — Avatar + Rating + CTA */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8EDEA] pt-4">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={story.travelerAvatar}
                      alt={story.travelerName}
                      width={32}
                      height={32}
                      className="rounded-full bg-[#EAF7F1]"
                    />
                    <div>
                      <p className="text-[11px] font-bold text-[#17211D]">
                        {story.travelerName}
                      </p>
                      <p className="text-[9px] font-medium text-[#87938D]">
                        {story.travelerLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Rating */}
                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#D98B26]">
                      {story.rating}
                      <Star size={12} fill="#D98B26" strokeWidth={0} />
                    </span>

                    {/* CTA */}
                    <Link
                      href={story.href}
                      className="group/btn inline-flex items-center gap-1 rounded-full bg-[#073D31] px-3 py-1.5 text-[9px] font-bold text-white transition-colors hover:bg-[#087F5B]"
                    >
                      Read Journey
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
