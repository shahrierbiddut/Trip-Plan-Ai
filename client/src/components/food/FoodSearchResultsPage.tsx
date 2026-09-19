"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Filter,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Utensils,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatBdt } from "@/data/services/food";
import { useEffect } from "react";

type SearchDefaults = {
  destination?: string;
  mealTime?: string;
  guests?: string;
  diningStyle?: string;
  budget?: string;
  collection?: string;
};

type SortOption = "recommended" | "rating" | "price-low" | "distance";

const mapAreas: Record<string, { label: string; bbox: string }> = {
  dhaka: { label: "Dhaka", bbox: "90.34,23.70,90.46,23.83" },
  khulna: { label: "Khulna", bbox: "89.50,22.77,89.61,22.87" },
  chattogram: { label: "Chattogram", bbox: "91.75,22.28,91.88,22.42" },
  sylhet: { label: "Sylhet", bbox: "91.82,24.85,91.93,24.95" },
  rajshahi: { label: "Rajshahi", bbox: "88.52,24.32,88.66,24.42" },
  "cox's bazar": {
    label: "Cox's Bazar",
    bbox: "91.96,21.40,92.02,21.47",
  },
};

export function FoodSearchResultsPage({ defaults }: { defaults: SearchDefaults }) {
  const [destination, setDestination] = useState(defaults.destination ?? "");
  const [minimumRating, setMinimumRating] = useState(0);
  const [openOnly, setOpenOnly] = useState(false);
  const [maximumBudget, setMaximumBudget] = useState(Number(defaults.budget ?? 5000));
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const mapArea =
    mapAreas[destination.trim().toLowerCase()] ?? {
      label: "Bangladesh",
      bbox: "88.00,20.50,93.00,26.80",
    };

  const [restaurantSpotlights, setRestaurantSpotlights] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/food`);
        const data = await res.json();
        if (data.success && data.data) {
          setRestaurantSpotlights(data.data.restaurants);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const results = useMemo(() => {
    const normalizedDestination = destination.trim().toLowerCase();
    const filtered = restaurantSpotlights.filter((restaurant) => {
      const matchesDestination =
        !normalizedDestination ||
        restaurant.destination.toLowerCase().includes(normalizedDestination) ||
        normalizedDestination.includes(restaurant.destination.toLowerCase());
      const matchesRating = restaurant.rating >= minimumRating;
      const matchesOpen = !openOnly || restaurant.openNow;
      const matchesBudget = restaurant.estimatedCostForTwo <= maximumBudget;

      return matchesDestination && matchesRating && matchesOpen && matchesBudget;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price-low") return a.estimatedCostForTwo - b.estimatedCostForTwo;
      if (sort === "distance") return (a.distanceKm ?? 99) - (b.distanceKm ?? 99);
      return b.reviewCount + b.rating * 100 - (a.reviewCount + a.rating * 100);
    });
  }, [destination, maximumBudget, minimumRating, openOnly, sort]);

  const clearFilters = () => {
    setMinimumRating(0);
    setOpenOnly(false);
    setMaximumBudget(5000);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f2] pb-20 pt-24 text-[#173b31]">
      <section className="border-b border-[#dce6e2] bg-[#073e30] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f1ad2d]">
            Find your next meal
          </p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
                Food places {destination ? `in ${destination}` : "across Bangladesh"}
              </h1>
              <p className="mt-2 text-sm text-white/70">
                {defaults.collection
                  ? `Collection: ${defaults.collection}`
                  : `${defaults.mealTime ?? "Any meal"} · ${defaults.guests ?? "2"} guests · practical total-cost estimates`}
              </p>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-2 rounded-[22px] border border-white/15 bg-white/10 p-2 backdrop-blur-xl sm:flex-row">
              <label className="flex min-h-12 flex-1 items-center gap-2 rounded-2xl bg-white/[0.92] px-4">
                <MapPin size={17} className="text-[#087653]" />
                <input
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder="Search destination"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </label>
              <button
                type="button"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e39a22] to-[#f5b73e] px-6 font-semibold text-[#173b31]"
              >
                <Search size={17} /> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#667a73]">
            <strong className="text-[#173b31]">{results.length}</strong> matching food places
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-4 text-sm font-semibold lg:hidden"
            >
              <Filter size={16} /> Filters
            </button>
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-3 text-sm">
              <span className="text-[#71817b]">Sort:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="bg-transparent font-semibold outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest rated</option>
                <option value="price-low">Lowest total price</option>
                <option value="distance">Nearest first</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_360px]">
          <aside className="hidden lg:block">
            <FilterPanel
              maximumBudget={maximumBudget}
              minimumRating={minimumRating}
              openOnly={openOnly}
              setMaximumBudget={setMaximumBudget}
              setMinimumRating={setMinimumRating}
              setOpenOnly={setOpenOnly}
              clearFilters={clearFilters}
            />
          </aside>

          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((restaurant, index) => (
                <motion.article
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group overflow-hidden rounded-[24px] border border-[#dbe6e2] bg-white shadow-[0_12px_34px_rgba(12,58,45,0.08)] sm:grid sm:grid-cols-[220px_1fr]"
                >
                  <div className="relative min-h-52 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-lg bg-[#087653] px-2.5 py-1.5 text-xs font-bold text-white">
                      {restaurant.category}
                    </span>
                  </div>

                  <div className="flex flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-[#c77e15]">
                          <MapPin size={13} /> {restaurant.area}, {restaurant.destination}
                        </p>
                        <h2 className="mt-1 font-serif text-2xl font-semibold">
                          {restaurant.name}
                        </h2>
                      </div>
                      <button
                        type="button"
                        aria-label={`Save ${restaurant.name}`}
                        className="rounded-full border border-[#dce6e2] p-2 text-[#60746c] transition hover:border-[#e3a02e] hover:text-[#d98c18]"
                      >
                        <Heart size={17} />
                      </button>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6c7d77]">
                      {restaurant.shortDescription}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#edf6f1] px-2.5 py-1.5 font-bold text-[#087653]">
                        <Star size={13} fill="currentColor" /> {restaurant.rating}
                        <span className="font-medium text-[#63766f]">
                          ({restaurant.reviewCount.toLocaleString("en-BD")})
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-[#e0e8e5] px-2.5 py-1.5">
                        <Utensils size={13} /> {restaurant.popularDish}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-[#e0e8e5] px-2.5 py-1.5">
                        <MapPin size={13} /> {restaurant.distanceKm ?? 1} km away
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold ${
                          restaurant.openNow
                            ? "bg-[#edf7ee] text-[#26753d]"
                            : "bg-[#fff3e5] text-[#a35d12]"
                        }`}
                      >
                        <Clock3 size={13} /> {restaurant.openNow ? "Open now" : "Opens later"}
                      </span>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 border-t border-[#e5ece9] pt-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span className="text-xs text-[#71817b]">Estimated for two</span>
                        <strong className="block text-xl text-[#173b31]">
                          {formatBdt(restaurant.estimatedCostForTwo)}
                        </strong>
                      </div>
                      <Link
                        href={`/food/${restaurant.slug}`}
                        className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#073e30] px-5 text-sm font-semibold text-white transition hover:bg-[#0a5945]"
                      >
                        View details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="rounded-[24px] border border-[#dbe6e2] bg-white p-10 text-center">
                <Utensils size={32} className="mx-auto text-[#d49227]" />
                <h2 className="mt-4 font-serif text-2xl font-semibold">No exact matches found</h2>
                <p className="mt-2 text-sm text-[#6b7c75]">
                  Try another destination or clear the current filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDestination("");
                    clearFilters();
                  }}
                  className="mt-5 rounded-xl bg-[#073e30] px-5 py-3 text-sm font-semibold text-white"
                >
                  Show all food places
                </button>
              </div>
            )}
          </div>

          <aside className="overflow-hidden rounded-[25px] border border-[#d5e2dd] bg-white shadow-[0_15px_40px_rgba(12,58,45,0.09)] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
            <div className="flex items-center justify-between border-b border-[#dce6e2] p-4">
              <div>
                <h2 className="font-serif text-xl font-semibold">Food places nearby</h2>
                <p className="text-xs text-[#6d7e77]">Map centred around {mapArea.label}</p>
              </div>
              <span className="rounded-xl bg-[#fff3dc] p-2 text-[#d98d1a]">
                <MapPin size={18} />
              </span>
            </div>
            <div className="relative h-[420px] lg:h-[calc(100%-77px)]">
              <iframe
                title="Restaurant area map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(mapArea.bbox)}&layer=mapnik`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl border border-white/70 bg-white/[0.9] p-3 text-xs font-medium text-[#46635a] shadow-lg backdrop-blur">
                Select a restaurant card to view its full address and trip information.
              </div>
            </div>
          </aside>
        </div>
      </section>

      {filtersOpen && (
        <div className="fixed inset-0 z-[80] bg-black/40 p-4 backdrop-blur-sm lg:hidden">
          <div className="ml-auto h-full max-w-sm overflow-y-auto rounded-[24px] bg-[#f7f7f2] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
                <SlidersHorizontal size={19} /> Filters
              </h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-full border border-[#d8e3df] bg-white p-2"
              >
                <X size={18} />
              </button>
            </div>
            <FilterPanel
              maximumBudget={maximumBudget}
              minimumRating={minimumRating}
              openOnly={openOnly}
              setMaximumBudget={setMaximumBudget}
              setMinimumRating={setMinimumRating}
              setOpenOnly={setOpenOnly}
              clearFilters={clearFilters}
            />
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-4 w-full rounded-xl bg-[#073e30] px-5 py-3.5 font-semibold text-white"
            >
              Show {results.length} places
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

type FilterPanelProps = {
  maximumBudget: number;
  minimumRating: number;
  openOnly: boolean;
  setMaximumBudget: (value: number) => void;
  setMinimumRating: (value: number) => void;
  setOpenOnly: (value: boolean) => void;
  clearFilters: () => void;
};

function FilterPanel({
  maximumBudget,
  minimumRating,
  openOnly,
  setMaximumBudget,
  setMinimumRating,
  setOpenOnly,
  clearFilters,
}: FilterPanelProps) {
  return (
    <div className="rounded-[22px] border border-[#d7e3de] bg-white p-5 shadow-[0_12px_32px_rgba(12,58,45,0.07)]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <SlidersHorizontal size={17} /> Filters
        </h2>
        <button type="button" onClick={clearFilters} className="text-xs font-semibold text-[#087653]">
          Clear all
        </button>
      </div>

      <div className="mt-5 border-t border-[#e1e9e6] pt-5">
        <label className="text-sm font-bold">Maximum cost for two</label>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maximumBudget}
          onChange={(event) => setMaximumBudget(Number(event.target.value))}
          className="mt-4 w-full accent-[#087653]"
        />
        <div className="mt-1 flex justify-between text-xs text-[#6b7c75]">
          <span>৳500</span>
          <strong className="text-[#173b31]">{formatBdt(maximumBudget)}</strong>
        </div>
      </div>

      <div className="mt-5 border-t border-[#e1e9e6] pt-5">
        <p className="text-sm font-bold">Guest rating</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 4, 4.5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinimumRating(rating)}
              className={`rounded-lg border px-2 py-2 text-xs font-semibold ${
                minimumRating === rating
                  ? "border-[#087653] bg-[#087653] text-white"
                  : "border-[#dce5e2] bg-white"
              }`}
            >
              {rating === 0 ? "All" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-center justify-between border-t border-[#e1e9e6] pt-5 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <Clock3 size={16} className="text-[#087653]" /> Open now
        </span>
        <span
          className={`grid h-5 w-5 place-items-center rounded border ${
            openOnly ? "border-[#087653] bg-[#087653] text-white" : "border-[#bdcbc6]"
          }`}
        >
          {openOnly && <Check size={13} />}
        </span>
        <input
          type="checkbox"
          checked={openOnly}
          onChange={(event) => setOpenOnly(event.target.checked)}
          className="sr-only"
        />
      </label>

      <div className="mt-5 border-t border-[#e1e9e6] pt-5">
        <p className="text-sm font-bold">Useful facilities</p>
        <div className="mt-3 space-y-2 text-sm text-[#5f746c]">
          {["Family seating", "Air conditioning", "Takeaway", "Parking nearby"].map(
            (facility) => (
              <p key={facility} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e3a02b]" /> {facility}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}