"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { EXPERIENCE_TAG_OPTIONS } from "@/data/config/tripPlanOptions";
import { matchDestinations } from "@/lib/services/destinationMatcher";
import type { DestinationMatch, ExperienceTag } from "@/types/tripPlan";
import ToggleChip from "@/components/plan-trip/shared/ToggleChip";

import { fetchDestinations } from "@/lib/api/destination";

interface AIDestinationMatcherProps {
  onSelectDestination: (slug: string) => void;
}

export default function AIDestinationMatcher({ onSelectDestination }: AIDestinationMatcherProps) {
  const [selectedTags, setSelectedTags] = useState<ExperienceTag[]>([]);
  const [results, setResults] = useState<DestinationMatch[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTag = (tag: ExperienceTag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((entry) => entry !== tag) : [...current, tag],
    );
  };

  const handleFind = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDestinations();
      if (Array.isArray(response)) {
        setResults(matchDestinations(selectedTags, response));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-[#DCE6E1] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]">
          <Sparkles size={16} />
        </span>
        <div>
          <p className="font-serif text-[16px] font-bold text-[#12342D]">
            Let TripPlan AI find your best match
          </p>
          <p className="text-[12px] text-[#687873]">
            Can&apos;t decide? Tell us what kind of experience you want.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {EXPERIENCE_TAG_OPTIONS.map(({ id, icon }) => (
          <ToggleChip
            key={id}
            label={id}
            icon={icon}
            selected={selectedTags.includes(id)}
            onClick={() => toggleTag(id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleFind}
        disabled={selectedTags.length === 0}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-5 py-2.5 text-[12px] font-bold text-[#17332A] shadow-[0_8px_22px_rgba(217,134,31,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        Find My Perfect Destination <Sparkles size={14} />
      </button>

      {results && (
        <div className="mt-5 space-y-3 border-t border-[#DCE6E1] pt-4">
          {results.length === 0 ? (
            <p className="text-[12px] text-[#687873]">Select at least one experience above to see matches.</p>
          ) : (
            results.map((match) => (
              <div
                key={match.destination.slug}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#EEF5F1] bg-[#FAFAF7] p-3.5"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-[14px] font-bold text-[#12342D]">
                      {match.destination.name}
                    </p>
                    <span className="rounded-full bg-[#087F5B]/10 px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                      AI Match {match.matchPercent}%
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-[#687873]">{match.reasons[0]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectDestination(match.destination.slug)}
                  className="shrink-0 rounded-full bg-[#04271C] px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-[#073D31]"
                >
                  Select
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
