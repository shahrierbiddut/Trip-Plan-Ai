"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { formatBdt } from "@/data/services/food";
import { fetchFood } from "@/lib/api/food";
import { FoodSearchBar } from "./FoodSearchBar";
import { PopularFoodDestinations } from "./PopularFoodDestinations";
import { SmartFoodCollections } from "./SmartFoodCollections";
import { useState, useEffect } from "react";
import type { RestaurantSpotlight } from "@/types/food";

export function FoodDiscoveryPage() {
  const [restaurantSpotlights, setRestaurantSpotlights] = useState<RestaurantSpotlight[]>([]);

  useEffect(() => {
    fetchFood().then(res => {
      if (res?.success) setRestaurantSpotlights(res.data.restaurants);
    });
  }, []);
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#173b31]">
      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=90"
          alt="A welcoming restaurant table prepared for a meal"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,39,29,.94)_0%,rgba(3,39,29,.70)_48%,rgba(3,39,29,.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f7f7f2] to-transparent" />

        <div className="mx-auto w-full max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Sparkles size={16} className="text-[#f4b43c]" />
              Food discovery for your complete trip
            </span>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Taste Bangladesh, one journey at a time.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Find local dishes and practical places to eat by destination, group size,
              dining style and total meal budget—not popularity alone.
            </p>
          </motion.div>

          <div className="mt-9">
            <FoodSearchBar />
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore by flavour"
            title="Popular food destinations"
            description="Start with a destination, then discover regional dishes and places that fit your route and budget."
          />
        </div>
        <PopularFoodDestinations />
      </section>

      <section className="border-y border-[#dfe8e4] bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Eat your way"
            title="Smart food collections"
            description="Useful shortlists built around the way Bangladeshi travellers actually choose meals."
          />
          <SmartFoodCollections />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-7 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[#073e30] p-7 text-white shadow-[0_24px_60px_rgba(7,62,48,0.2)] sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e9a323]/16 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[#f5b442]">
              <Sparkles size={18} />
              <span className="text-sm font-bold uppercase tracking-[0.15em]">
                AI Food Match
              </span>
            </div>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Tell us what you want to eat during your trip.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/72">
              Try: “Cox&apos;s Bazar-এ family নিয়ে dinner-এর জন্য ৳২,০০০-এর মধ্যে
              clean seafood restaurant চাই।”
            </p>
            <div className="mt-8 flex flex-col gap-3 rounded-[22px] border border-white/15 bg-white/10 p-3 backdrop-blur sm:flex-row">
              <input
                aria-label="Describe your ideal food experience"
                placeholder="Describe your destination, meal, budget and needs..."
                className="min-h-12 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/50"
              />
              <button
                type="button"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#efa72e] px-6 font-semibold text-[#12362c] transition hover:bg-[#f7ba4f]"
              >
                <Sparkles size={17} /> Find food matches
              </button>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Estimated group cost", "Popular dishes", "Nearby alternatives"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-white/78">
                    <BadgeCheck size={16} className="text-[#f3b43e]" /> {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-[#dce7e2] bg-white p-7 shadow-[0_18px_50px_rgba(11,62,48,0.09)] sm:p-9">
          <span className="inline-flex rounded-2xl bg-[#fff5df] p-3 text-[#d88b18]">
            <ShieldCheck size={25} />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#123b30]">
            Choose food with useful context
          </h2>
          <div className="mt-6 space-y-5">
            {[
              {
                title: "Clear cost estimate",
                text: "Average per-person price and an estimated total for your group.",
                icon: WalletCards,
              },
              {
                title: "Trip-aware location",
                text: "Distance from your hotel, attractions and next travel stop.",
                icon: MapPinned,
              },
              {
                title: "Practical meal timing",
                text: "Useful opening-time context for breakfast, lunch and dinner.",
                icon: Clock3,
              },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-3">
                <Icon size={18} className="mt-1 shrink-0 text-[#e69a24]" />
                <p>
                  <strong className="block text-[#173c31]">{title}</strong>
                  <span className="text-sm leading-6 text-[#6b7d76]">{text}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Traveller favourites"
            title="Trending food places"
            description="Popular places to consider, with useful dish and group-cost information."
          />
          <Link
            href="/food/search"
            className="hidden items-center gap-2 font-semibold text-[#087653] sm:flex"
          >
            View all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {restaurantSpotlights.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/food/${restaurant.slug}`}
                className="group block overflow-hidden rounded-[27px] border border-[#dae6e1] bg-white shadow-[0_14px_38px_rgba(13,60,47,0.09)] transition hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-xl bg-[#087653] px-3 py-2 text-sm font-bold text-white">
                    <Star size={13} fill="currentColor" /> {restaurant.rating}
                  </span>
                  <span className="absolute right-4 top-4 rounded-xl bg-white/[0.88] px-3 py-2 text-xs font-bold text-[#173b31] backdrop-blur">
                    {restaurant.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#c77e15]">
                    <MapPinned size={14} /> {restaurant.area}, {restaurant.destination}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {restaurant.name}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#71817b]">
                    <Utensils size={15} className="text-[#087653]" /> Must try: {restaurant.popularDish}
                  </p>
                  <div className="mt-4 flex items-end justify-between border-t border-[#e3ebe8] pt-4">
                    <p className="text-sm text-[#71817b]">
                      Est. for two
                      <strong className="block text-lg text-[#153b30]">
                        {formatBdt(restaurant.estimatedCostForTwo)}
                      </strong>
                    </p>
                    <p className="text-right text-xs text-[#71817b]">
                      {restaurant.reviewCount.toLocaleString("en-BD")} reviews
                      <ArrowRight size={19} className="ml-auto mt-1 text-[#087653]" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#087653]">
        <span className="h-px w-8 bg-[#dfa02d]" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#123b30] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#667a73] sm:text-base">
        {description}
      </p>
    </div>
  );
}