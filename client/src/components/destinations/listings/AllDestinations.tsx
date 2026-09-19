"use client";

import { DestinationData } from "@/types/destination-card";
import DestinationCard from '@/components/destinations/listings/DestinationCard';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AllDestinationsProps {
  destinations: DestinationData[];
  viewMode: "grid" | "list" | "map";
}

export default function AllDestinations({ destinations, viewMode }: AllDestinationsProps) {
  if (destinations.length === 0) {
    return (
      <div className="py-12 text-center bg-[#F7F7F2] rounded-xl border border-[#E2E7E3]">
        <h3 className="text-xl font-serif font-bold text-[#17211D] mb-2">No destinations found.</h3>
        <p className="text-[#66736D] text-[14px] mb-6">Try adjusting your filters or searching for another Bangladesh destination.</p>
        <div className="flex gap-4 justify-center">
          <button className="px-5 py-2.5 rounded-lg border border-[#E2E7E3] bg-white text-[#17211D] font-bold text-[13px] hover:bg-gray-50 transition-colors">
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#17211D] mb-6">
        All Destinations
      </h2>

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.slug || `dest-${index}`} destination={destination} />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="flex flex-col gap-5">
          {destinations.map((destination, index) => (
            <div key={destination.slug || `dest-${index}`} className="max-w-3xl">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      )}

      {viewMode === "map" && (
        <div className="w-full h-[600px] bg-[#E2E7E3] rounded-xl flex items-center justify-center border border-[#C7D3CE]">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#17211D] mb-2">Map View Active</h3>
            <p className="text-[13px] text-[#66736D]">Select a destination from the list on the left to view it on the map.</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#E2E7E3] text-[#66736D] hover:bg-[#F7F7F2] hover:text-[#17211D] transition-colors disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#087F5B] text-white font-bold text-[13px] shadow-sm">
          1
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#E2E7E3] text-[#66736D] hover:bg-[#F7F7F2] hover:text-[#17211D] font-bold text-[13px] transition-colors">
          2
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#E2E7E3] text-[#66736D] hover:bg-[#F7F7F2] hover:text-[#17211D] font-bold text-[13px] transition-colors">
          3
        </button>
        <span className="text-[#66736D]">...</span>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#E2E7E3] text-[#66736D] hover:bg-[#F7F7F2] hover:text-[#17211D] transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
