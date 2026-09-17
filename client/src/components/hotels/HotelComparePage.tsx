"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Banknote,
  Check,
  CircleX,
  Crown,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { formatBdt } from "@/data/services/hotels";
import { fetchHotels } from "@/lib/api/hotels";
import type { Hotel } from "@/types/hotel";

const comparisonRows = [
  { label: "Total price (3 nights)", render: (hotel: Hotel) => formatBdt(hotel.pricePerNight * 3) },
  { label: "Guest rating", render: (hotel: Hotel) => `${hotel.rating} · ${hotel.ratingLabel}` },
  { label: "Beach distance", render: (hotel: Hotel) => hotel.distanceToAttraction },
  { label: "Breakfast", render: (hotel: Hotel) => hotel.breakfastIncluded },
  { label: "Cancellation", render: (hotel: Hotel) => hotel.freeCancellation },
  { label: "Family room", render: (hotel: Hotel) => hotel.suitableFor.includes("Family") },
  { label: "Parking", render: (hotel: Hotel) => hotel.amenities.some((item) => item.toLowerCase().includes("parking")) },
  { label: "Generator backup", render: (hotel: Hotel) => hotel.amenities.some((item) => item.toLowerCase().includes("generator")) },
  { label: "Pool", render: (hotel: Hotel) => hotel.amenities.some((item) => item.toLowerCase().includes("pool")) },
  { label: "Review strength", render: (hotel: Hotel) => strongestReviewArea(hotel) },
] as const;

export function HotelComparePage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotels().then(res => {
      if (res?.success) setHotels(res.data.hotels);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="min-h-screen bg-[#f8f8f4] flex items-center justify-center">Loading...</div>;

  const requestedSlugs = (searchParams.get("hotels") ?? "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  const selectedHotels = hotels
    .filter((hotel) => requestedSlugs.includes(hotel.slug))
    .slice(0, 3);
  const comparedHotels = selectedHotels.length >= 2 ? selectedHotels : hotels.slice(0, 3);

  const bestOverall = [...comparedHotels].sort((a, b) => b.rating - a.rating)[0];
  const bestBudget = [...comparedHotels].sort((a, b) => a.pricePerNight - b.pricePerNight)[0];
  const bestFamily = [...comparedHotels].sort((a, b) => b.reviewBreakdown.family - a.reviewBreakdown.family)[0];
  const bestLocation = [...comparedHotels].sort((a, b) => a.distanceMeters - b.distanceMeters)[0];

  return (
    <main className="min-h-screen bg-[#f8f8f4] px-4 pb-24 pt-24 text-[#173b31] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <Link href="/hotels/search" className="inline-flex items-center gap-2 text-sm font-semibold text-[#087653]">← Back to hotel search</Link>
        <header className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c47c16]">Side-by-side decision</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Compare your shortlisted stays</h1>
          <p className="mt-4 leading-7 text-[#687b74]">See the complete cost, location, policies and trip fit together before choosing your stay.</p>
        </header>

        <section className="mt-10 overflow-x-auto rounded-[30px] border border-[#d9e5e0] bg-white shadow-[0_24px_65px_rgba(13,57,45,0.1)]">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))]">
              <div className="flex items-center justify-center border-b border-r border-[#dfe8e4] bg-[#f7faf8] p-6">
                <div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf6f1] text-[#087653]"><Sparkles size={22} /></span><p className="mt-3 font-serif text-xl font-semibold">Compare hotels</p><span className="text-xs text-[#72837d]">Cox’s Bazar, Bangladesh</span></div>
              </div>
              {comparedHotels.map((hotel) => (
                <div key={hotel.id} className={`relative border-b border-r border-[#dfe8e4] p-4 last:border-r-0 ${hotel.id === bestOverall.id ? "bg-[#fffaf0]" : ""}`}>
                  {hotel.id === bestOverall.id && <span className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-[#e99e29] px-4 py-1.5 text-xs font-bold text-[#17392f] shadow-lg"><Crown size={13} /> Best overall</span>}
                  <img src={hotel.image} alt={hotel.name} className="h-40 w-full rounded-2xl object-cover" />
                  <div className="mt-4 flex items-start justify-between gap-2"><div><h2 className="font-serif text-2xl font-semibold">{hotel.name}</h2><p className="mt-1 flex items-center gap-1 text-sm text-[#6a7d76]"><MapPin size={14} className="text-[#d58716]" />{hotel.area}</p></div><BadgeCheck size={19} className="shrink-0 text-[#087653]" /></div>
                  <div className="mt-3 flex items-center gap-2"><span className="rounded-lg bg-[#087653] px-2 py-1 font-bold text-white">{hotel.rating}</span><span className="text-sm">{hotel.ratingLabel}</span></div>
                </div>
              ))}
            </div>

            {comparisonRows.map((row, rowIndex) => (
              <div key={row.label} className={`grid grid-cols-[220px_repeat(3,minmax(0,1fr))] ${rowIndex % 2 === 0 ? "bg-[#fbfcfb]" : "bg-white"}`}>
                <div className="border-b border-r border-[#e2eae7] px-5 py-4 text-sm font-semibold">{row.label}</div>
                {comparedHotels.map((hotel) => {
                  const value = row.render(hotel);
                  return <div key={hotel.id} className={`border-b border-r border-[#e2eae7] px-5 py-4 text-sm last:border-r-0 ${hotel.id === bestOverall.id ? "bg-[#fffaf0]/60" : ""}`}><CompareValue value={value} /></div>;
                })}
              </div>
            ))}

            <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))]">
              <div className="border-r border-[#e2eae7] bg-[#f7faf8]" />
              {comparedHotels.map((hotel) => (
                <div key={hotel.id} className={`flex gap-2 border-r border-[#e2eae7] p-4 last:border-r-0 ${hotel.id === bestOverall.id ? "bg-[#fffaf0]" : ""}`}>
                  <Link href={`/hotels/${hotel.slug}`} className="flex-1 rounded-xl border border-[#0b7254] px-3 py-3 text-center text-sm font-bold text-[#087653]">View details</Link>
                  <AddToTripButton hotel={hotel} featured={hotel.id === bestOverall.id} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-[#dce7e2] bg-white p-6 shadow-[0_18px_50px_rgba(13,57,45,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#e2eae7] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c47c16]"><Sparkles size={16} /> AI comparison</p><h2 className="mt-2 font-serif text-3xl font-semibold">A clearer decision at a glance</h2></div>
            <p className="max-w-xl text-sm leading-6 text-[#6b7d76]">{bestOverall.name} is the best overall match because it combines the strongest guest rating with reliable facilities. If budget matters most, {bestBudget.name} offers the lowest stay cost.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InsightCard icon={<Banknote size={22} />} label="Best budget" hotel={bestBudget} text={`${formatBdt(bestBudget.pricePerNight)} per night with strong value-for-money feedback.`} />
            <InsightCard icon={<UsersRound size={22} />} label="Best for family" hotel={bestFamily} text={`Family experience score ${bestFamily.reviewBreakdown.family}/10 with suitable room options.`} />
            <InsightCard icon={<MapPin size={22} />} label="Best location" hotel={bestLocation} text={`${bestLocation.distanceToAttraction}, the shortest distance in this shortlist.`} />
          </div>
        </section>
      </div>
    </main>
  );
}

function strongestReviewArea(hotel: Hotel) {
  const entries = Object.entries(hotel.reviewBreakdown) as [string, number][];
  const [area] = entries.sort((a, b) => b[1] - a[1])[0];
  return area.charAt(0).toUpperCase() + area.slice(1);
}

function CompareValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") return value ? <span className="inline-flex items-center gap-2 font-medium text-[#087653]"><Check size={16} className="rounded-full bg-[#dff2ea] p-0.5" /> Available</span> : <span className="inline-flex items-center gap-2 text-[#7b8883]"><CircleX size={16} /> Not included</span>;
  return <span className="font-medium text-[#294b40]">{value}</span>;
}

function AddToTripButton({ hotel, featured }: { hotel: Hotel; featured: boolean }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    const current = JSON.parse(localStorage.getItem("tripplan-trip-hotels") ?? "[]") as { hotelId?: string }[];
    if (!current.some((item) => item.hotelId === hotel.id)) current.push({ hotelId: hotel.id });
    localStorage.setItem("tripplan-trip-hotels", JSON.stringify(current));
    setAdded(true);
  };
  return <button type="button" onClick={add} className={`flex-1 rounded-xl px-3 py-3 text-sm font-bold ${featured ? "bg-[#e99e29] text-[#17392f]" : "bg-[#087653] text-white"}`}>{added ? "Added" : "Add to trip"}</button>;
}

function InsightCard({ icon, label, hotel, text }: { icon: ReactNode; label: string; hotel: Hotel; text: string }) {
  return <motion.article whileHover={{ y: -4 }} className="rounded-[22px] border border-[#dce7e2] bg-[#f9fbfa] p-5"><span className="inline-flex rounded-xl bg-[#eaf6f1] p-3 text-[#087653]">{icon}</span><p className="mt-4 text-xs font-bold uppercase tracking-[0.11em] text-[#b66d0f]">{label}</p><h3 className="mt-1 font-serif text-xl font-semibold">{hotel.name}</h3><p className="mt-2 text-sm leading-6 text-[#6a7d76]">{text}</p></motion.article>;
}