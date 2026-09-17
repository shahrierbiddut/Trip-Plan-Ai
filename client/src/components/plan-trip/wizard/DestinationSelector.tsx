"use client";

import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { fetchDestinations } from "@/lib/api/destination";
import type { DestinationData } from "@/types/destination-card";
import DestinationCard from "@/components/plan-trip/wizard/DestinationCard";
import AIDestinationMatcher from "@/components/plan-trip/wizard/AIDestinationMatcher";

interface DestinationSelectorProps {
  destinationSlug: string | null;
  onSelect: (slug: string) => void;
}

export default function DestinationSelector({ destinationSlug, onSelect }: DestinationSelectorProps) {
  const [query, setQuery] = useState("");
  const [destinationsData, setDestinationsData] = useState<DestinationData[]>([]);

  useEffect(() => {
    fetchDestinations().then(res => {
      if (Array.isArray(res)) setDestinationsData(res);
    });
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return destinationsData;
    return destinationsData.filter(
      (destination) =>
        destination.name.toLowerCase().includes(term) ||
        destination.styles.some((style) => style.toLowerCase().includes(term)),
    );
  }, [query, destinationsData]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="destination-search" className="sr-only">
          Search destinations
        </label>
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66736D]" />
          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations…"
            className="h-12 w-full rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] pl-11 pr-4 text-[13px] text-[#12342D] outline-none placeholder:text-[#66736D] focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.08]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((destination) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            selected={destinationSlug === destination.slug}
            onSelect={() => onSelect(destination.slug)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-[13px] text-[#687873]">
            No destinations match &quot;{query}&quot;.
          </p>
        )}
      </div>

      <div id="ai-destination-matcher">
        <AIDestinationMatcher onSelectDestination={onSelect} />
      </div>
    </div>
  );
}
