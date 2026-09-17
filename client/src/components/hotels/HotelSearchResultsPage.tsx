"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  GitCompareArrows,
  List,
  Map,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { formatBdt } from "@/data/services/hotels";
import { HotelCard } from "./HotelCard";
import { HotelMap } from "./HotelMap";
import { HotelSearchBar } from "./HotelSearchBar";

type SortKey = "recommended" | "lowest" | "highest-rated" | "nearest" | "most-reviewed";

export function HotelSearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? "Cox’s Bazar";
  const checkIn = searchParams.get("checkIn") ?? "2026-09-20";
  const checkOut = searchParams.get("checkOut") ?? "2026-09-23";
  const guests = searchParams.get("guests") ?? "2";
  const rooms = searchParams.get("rooms") ?? "1";

  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(2000);
  const [freeBreakfast, setFreeBreakfast] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [parking, setParking] = useState(false);
  const [generator, setGenerator] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"list" | "map">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const nights = useMemo(() => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 3;
    return Math.max(1, Math.ceil((end - start) / 86_400_000));
  }, [checkIn, checkOut]);

  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/hotels`);
        const data = await res.json();
        if (data.success && data.data) {
          setHotels(data.data.hotels);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    const result = hotels.filter((hotel) => {
      const destinationMatch = hotel.destination
        .toLowerCase()
        .includes(destination.toLowerCase().replace("'", "’"));
      const amenityMatch =
        (!freeBreakfast || hotel.breakfastIncluded) &&
        (!freeCancellation || hotel.freeCancellation) &&
        (!parking || hotel.amenities.some((item: any) => item.toLowerCase().includes("parking"))) &&
        (!generator || hotel.amenities.some((item: any) => item.toLowerCase().includes("generator")));

      return (
        (destinationMatch || destination.toLowerCase().includes("cox")) &&
        hotel.pricePerNight <= maxPrice &&
        hotel.rating >= minRating &&
        hotel.distanceMeters <= maxDistance &&
        amenityMatch
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "lowest") return a.pricePerNight - b.pricePerNight;
      if (sort === "highest-rated") return b.rating - a.rating;
      if (sort === "nearest") return a.distanceMeters - b.distanceMeters;
      if (sort === "most-reviewed") return b.reviewCount - a.reviewCount;
      return b.rating * 100 + b.reviewCount / 100 - (a.rating * 100 + a.reviewCount / 100);
    });
  }, [destination, freeBreakfast, freeCancellation, generator, maxDistance, maxPrice, minRating, parking, sort]);

  const toggleCompare = (hotelId: string) => {
    setCompareIds((current) => {
      if (current.includes(hotelId)) return current.filter((id) => id !== hotelId);
      if (current.length === 3) return current;
      return [...current, hotelId];
    });
  };

  const openCompare = () => {
    const selected = hotels.filter((hotel) => compareIds.includes(hotel.id));
    router.push(`/hotels/compare?hotels=${selected.map((hotel) => hotel.slug).join(",")}`);
  };

  const clearFilters = () => {
    setMaxPrice(15000);
    setMinRating(0);
    setMaxDistance(2000);
    setFreeBreakfast(false);
    setFreeCancellation(false);
    setParking(false);
    setGenerator(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f3] px-4 pb-24 pt-24 text-[#173b31] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative z-20">
          <HotelSearchBar
            compact
            defaults={{ destination, checkIn, checkOut, guests, rooms }}
          />
        </div>

        <div className="mt-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c47b14]">Stay search</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Hotels in {destination}
            </h1>
            <p className="mt-2 text-[#6b7d76]">
              {filteredHotels.length} matching properties · {nights} nights · {guests} guests
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-4 py-3 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal size={17} /> Filters
            </button>
            <label className="flex items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-3 py-2 text-sm text-[#60736c]">
              Sort by
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="bg-transparent py-1 font-semibold text-[#173b31] outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="lowest">Lowest total price</option>
                <option value="highest-rated">Highest rated</option>
                <option value="nearest">Nearest to beach</option>
                <option value="most-reviewed">Most reviewed</option>
              </select>
              <ChevronDown size={15} />
            </label>
            <div className="flex rounded-xl border border-[#d7e3de] bg-white p-1 lg:hidden">
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                className={`rounded-lg p-2 ${view === "list" ? "bg-[#087653] text-white" : "text-[#62766e]"}`}
              >
                <List size={17} />
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                aria-label="Map view"
                className={`rounded-lg p-2 ${view === "map" ? "bg-[#087653] text-white" : "text-[#62766e]"}`}
              >
                <Map size={17} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_minmax(300px,.65fr)] xl:grid-cols-[270px_minmax(0,1fr)_430px]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[25px] border border-[#dce7e2] bg-white p-5 shadow-[0_15px_40px_rgba(12,59,47,0.07)]">
              <FilterContent
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                freeBreakfast={freeBreakfast}
                setFreeBreakfast={setFreeBreakfast}
                freeCancellation={freeCancellation}
                setFreeCancellation={setFreeCancellation}
                parking={parking}
                setParking={setParking}
                generator={generator}
                setGenerator={setGenerator}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          <section className={`${view === "map" ? "hidden lg:block" : "block"} min-w-0 space-y-5`}>
            {filteredHotels.length ? (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  nights={nights}
                  selectedForCompare={compareIds.includes(hotel.id)}
                  onToggleCompare={toggleCompare}
                />
              ))
            ) : (
              <div className="rounded-[28px] border border-dashed border-[#cbdcd5] bg-white p-12 text-center">
                <h2 className="font-serif text-3xl font-semibold">No matching hotels</h2>
                <p className="mt-2 text-[#6c7e77]">Try increasing your budget or clearing some filters.</p>
                <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-[#087653] px-5 py-3 font-semibold text-white">Clear filters</button>
              </div>
            )}
          </section>

          <div className={`${view === "list" ? "hidden lg:block" : "block"}`}>
            <HotelMap hotels={filteredHotels} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#052c22]/55 backdrop-blur-sm lg:hidden"
            onClick={() => setFiltersOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold">Filters</h2>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="rounded-full border border-[#dce7e2] p-2"><X size={18} /></button>
              </div>
              <FilterContent
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                freeBreakfast={freeBreakfast}
                setFreeBreakfast={setFreeBreakfast}
                freeCancellation={freeCancellation}
                setFreeCancellation={setFreeCancellation}
                parking={parking}
                setParking={setParking}
                generator={generator}
                setGenerator={setGenerator}
                clearFilters={clearFilters}
              />
              <button type="button" onClick={() => setFiltersOpen(false)} className="mt-6 w-full rounded-xl bg-[#087653] py-3.5 font-semibold text-white">Show {filteredHotels.length} hotels</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-white/20 bg-[#073e30]/95 p-3 pl-5 text-white shadow-[0_20px_60px_rgba(3,35,27,0.35)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <GitCompareArrows size={19} className="text-[#f2b23b]" />
              <p className="text-sm"><strong>{compareIds.length} hotel{compareIds.length > 1 ? "s" : ""}</strong><span className="block text-xs text-white/60">Select up to 3</span></p>
            </div>
            <button type="button" disabled={compareIds.length < 2} onClick={openCompare} className="rounded-xl bg-[#efa72d] px-5 py-3 text-sm font-bold text-[#13382d] disabled:cursor-not-allowed disabled:opacity-50">Compare now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

type FilterContentProps = {
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  maxDistance: number;
  setMaxDistance: (value: number) => void;
  freeBreakfast: boolean;
  setFreeBreakfast: (value: boolean) => void;
  freeCancellation: boolean;
  setFreeCancellation: (value: boolean) => void;
  parking: boolean;
  setParking: (value: boolean) => void;
  generator: boolean;
  setGenerator: (value: boolean) => void;
  clearFilters: () => void;
};

function FilterContent(props: FilterContentProps) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#e3ece8] pb-4">
        <h2 className="font-serif text-xl font-semibold">Filters</h2>
        <button type="button" onClick={props.clearFilters} className="text-xs font-bold text-[#087653]">Clear all</button>
      </div>

      <FilterGroup title="Maximum nightly price">
        <div className="flex justify-between text-sm"><span>৳0</span><strong>৳{props.maxPrice.toLocaleString()}</strong></div>
        <input type="range" min="2000" max="15000" step="500" value={props.maxPrice} onChange={(event) => props.setMaxPrice(Number(event.target.value))} className="mt-3 w-full accent-[#087653]" />
      </FilterGroup>

      <FilterGroup title="Guest rating">
        <div className="grid grid-cols-4 gap-2">
          {[0, 7, 8, 9].map((rating) => (
            <button key={rating} type="button" onClick={() => props.setMinRating(rating)} className={`rounded-lg border px-2 py-2 text-xs font-semibold ${props.minRating === rating ? "border-[#087653] bg-[#087653] text-white" : "border-[#d9e4df]"}`}>
              {rating === 0 ? "All" : `${rating}+`}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Beach distance">
        {[500, 1000, 2000].map((distance) => (
          <label key={distance} className="mb-3 flex cursor-pointer items-center justify-between text-sm">
            <span>Up to {distance < 1000 ? `${distance} m` : `${distance / 1000} km`}</span>
            <input type="radio" name="distance" checked={props.maxDistance === distance} onChange={() => props.setMaxDistance(distance)} className="accent-[#087653]" />
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Popular facilities">
        <FilterCheck label="Free breakfast" checked={props.freeBreakfast} onChange={props.setFreeBreakfast} />
        <FilterCheck label="Free cancellation" checked={props.freeCancellation} onChange={props.setFreeCancellation} />
        <FilterCheck label="Parking" checked={props.parking} onChange={props.setParking} />
        <FilterCheck label="Generator backup" checked={props.generator} onChange={props.setGenerator} />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return <div className="border-b border-[#e7eeeb] py-5 last:border-0"><h3 className="mb-4 text-sm font-bold text-[#173b31]">{title}</h3>{children}</div>;
}

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm text-[#4d665d]">
      <button type="button" role="checkbox" aria-checked={checked} onClick={() => onChange(!checked)} className={`grid h-5 w-5 place-items-center rounded border ${checked ? "border-[#087653] bg-[#087653] text-white" : "border-[#bccdc6]"}`}>
        {checked && <Check size={13} />}
      </button>
      {label}
    </label>
  );
}