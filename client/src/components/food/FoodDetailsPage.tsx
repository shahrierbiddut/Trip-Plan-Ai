"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  UsersRound,
  Utensils,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatBdt } from "@/data/services/food";
import type { RestaurantSpotlight } from "@/types/food";

const menuItems = [
  {
    name: "Signature local platter",
    description: "Rice, regional curry, dal, seasonal bhorta and salad.",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=86",
  },
  {
    name: "Grilled fish with rice",
    description: "Fresh fish with steamed rice, vegetables and house sauce.",
    price: 580,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=86",
  },
  {
    name: "Family sharing meal",
    description: "A balanced selection of curry, rice, dal and sides for three people.",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=86",
  },
];

export function FoodDetailsPage({ restaurant }: { restaurant: RestaurantSpotlight }) {
  const [saved, setSaved] = useState(false);
  const [addedToTrip, setAddedToTrip] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f7f2] pb-24 pt-24 text-[#173b31]">
      <section className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/food/search"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#087653]"
        >
          <ArrowLeft size={16} /> Back to food results
        </Link>

        <div className="mt-5 grid gap-3 overflow-hidden rounded-[30px] sm:grid-cols-[1.6fr_1fr] sm:grid-rows-2">
          <div className="relative min-h-[360px] overflow-hidden sm:row-span-2 lg:min-h-[500px]">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-xl bg-white/[0.9] px-3 py-2 text-xs font-semibold text-[#173b31] backdrop-blur">
              Restaurant-provided photo
            </span>
          </div>
          {menuItems.slice(0, 2).map((item) => (
            <div key={item.name} className="relative hidden min-h-48 overflow-hidden sm:block">
              <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="flex flex-col gap-5 border-b border-[#dce6e2] pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#c77e15]">
                  <MapPin size={14} /> {restaurant.area}, {restaurant.destination}
                </p>
                <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                  {restaurant.name}
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-[#687b74]">
                  {restaurant.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#087653] px-3 py-2 font-bold text-white">
                    <Star size={14} fill="currentColor" /> {restaurant.rating}
                  </span>
                  <span className="font-semibold">
                    {restaurant.reviewCount.toLocaleString("en-BD")} traveller reviews
                  </span>
                  <span className="text-[#8a9994]">·</span>
                  <span>{restaurant.category}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSaved((value) => !value)}
                  className={`flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    saved
                      ? "border-[#e2a02e] bg-[#fff4df] text-[#a8640c]"
                      : "border-[#d8e3df] bg-white"
                  }`}
                >
                  <Heart size={16} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#d8e3df] bg-white"
                  aria-label="Share restaurant"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <section className="py-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d28a1d]">Popular choices</p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold">Menu highlights</h2>
                </div>
                <span className="text-xs text-[#71817b]">Prices may change at the restaurant</span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {menuItems.map((item, index) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="overflow-hidden rounded-[22px] border border-[#dce6e2] bg-white shadow-[0_10px_30px_rgba(12,58,45,0.07)]"
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold leading-tight">{item.name}</h3>
                        <strong className="text-[#c77e15]">{formatBdt(item.price)}</strong>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-[#71817b]">{item.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="grid gap-5 border-t border-[#dce6e2] py-8 md:grid-cols-2">
              <div className="rounded-[24px] border border-[#dce6e2] bg-white p-6">
                <h2 className="font-serif text-2xl font-semibold">Practical information</h2>
                <div className="mt-5 space-y-4 text-sm">
                  <InfoRow icon={Clock3} label="Typical hours" value="11:00 AM – 11:00 PM" />
                  <InfoRow icon={WalletCards} label="Estimated for two" value={formatBdt(restaurant.estimatedCostForTwo)} />
                  <InfoRow icon={UsersRound} label="Good for" value="Families, couples and small groups" />
                  <InfoRow icon={MapPin} label="Address" value={restaurant.address ?? `${restaurant.area}, ${restaurant.destination}`} />
                </div>
              </div>

              <div className="rounded-[24px] bg-[#073e30] p-6 text-white shadow-[0_18px_42px_rgba(7,62,48,0.16)]">
                <div className="flex items-center gap-2 text-[#f1ad2d]">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">Before you order</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold">Useful food checks</h2>
                <div className="mt-5 space-y-3 text-sm text-white/75">
                  {["Confirm current price and availability", "Tell staff about allergies directly", "Ask about spice level for children", "Check payment options before ordering"].map(
                    (item) => (
                      <p key={item} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-[#f1ad2d]" /> {item}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </section>

            <section className="border-t border-[#dce6e2] py-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d28a1d]">Review intelligence</p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold">What travellers mention</h2>
                </div>
                <div className="flex items-end gap-2">
                  <strong className="font-serif text-4xl">{restaurant.rating}</strong>
                  <span className="pb-1 text-sm text-[#71817b]">out of 5</span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Food quality", 92],
                  ["Service", 86],
                  ["Cleanliness", 88],
                  ["Value for money", 84],
                ].map(([label, score]) => (
                  <div key={label} className="rounded-2xl border border-[#dce6e2] bg-white p-4">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{label}</span>
                      <span>{score}%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5ece9]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#087653] to-[#e9a323]" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] border border-[#d7e3de] bg-white p-6 shadow-[0_18px_50px_rgba(12,58,45,0.11)]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#d28a1d]">Trip meal estimate</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <span className="text-sm text-[#71817b]">For two travellers</span>
                  <strong className="block font-serif text-3xl">{formatBdt(restaurant.estimatedCostForTwo)}</strong>
                </div>
                <span className={`rounded-xl px-3 py-2 text-xs font-bold ${restaurant.openNow ? "bg-[#eaf6ed] text-[#26753d]" : "bg-[#fff2df] text-[#9d5b13]"}`}>
                  {restaurant.openNow ? "Open now" : "Opens later"}
                </span>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-[#f4f7f5] p-4 text-sm">
                <p className="flex items-center justify-between gap-3">
                  <span className="text-[#71817b]">Must-try dish</span>
                  <strong className="text-right">{restaurant.popularDish}</strong>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span className="text-[#71817b]">Distance</span>
                  <strong>{restaurant.distanceKm ?? 1} km</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAddedToTrip((value) => !value)}
                className={`mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl font-semibold transition ${
                  addedToTrip
                    ? "bg-[#eaf6ed] text-[#176237]"
                    : "bg-gradient-to-r from-[#e39a22] to-[#f5b73e] text-[#173b31] shadow-[0_12px_28px_rgba(227,154,34,0.28)]"
                }`}
              >
                {addedToTrip ? <Check size={18} /> : <Utensils size={18} />}
                {addedToTrip ? "Added to Trip" : "Add to Trip"}
              </button>

              {restaurant.phone ? (
                <a
                  href={`tel:${restaurant.phone}`}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#0a5945] font-semibold text-[#0a5945]"
                >
                  <Phone size={17} /> Call restaurant
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-3 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-[#d8e3df] text-sm font-semibold text-[#82918c]"
                >
                  <Phone size={17} /> Contact not provided
                </button>
              )}
              <button
                type="button"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#d8e3df] font-semibold"
              >
                <MessageCircle size={17} /> Read all reviews
              </button>

              <p className="mt-5 flex items-start gap-2 border-t border-[#e1e9e6] pt-4 text-xs leading-5 text-[#71817b]">
                <BadgeCheck size={15} className="mt-0.5 shrink-0 text-[#087653]" />
                Restaurant information is presented for trip planning. Confirm current menu, hours and policies directly.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="rounded-lg bg-[#eef6f2] p-2 text-[#087653]">
        <Icon size={16} />
      </span>
      <p>
        <span className="block text-xs text-[#71817b]">{label}</span>
        <strong className="font-semibold text-[#173b31]">{value}</strong>
      </p>
    </div>
  );
}