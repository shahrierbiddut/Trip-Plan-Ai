"use client";

import { LayoutGrid, List, Map, SlidersHorizontal } from "lucide-react";

interface DestinationToolbarProps {
  resultCount: number;
  viewMode: "grid" | "list" | "map";
  setViewMode: (mode: "grid" | "list" | "map") => void;
  onOpenMobileFilters: () => void;
}

export default function DestinationToolbar({
  resultCount,
  viewMode,
  setViewMode,
  onOpenMobileFilters,
}: DestinationToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 pb-4 border-b border-[#E2E7E3]">
      <div>
        <h2 className="text-xl sm:text-[22px] font-bold text-[#17211D] mb-1">
          Explore Destinations
        </h2>
        <p className="text-[14px] font-bold text-[#087F5B]">
          {resultCount} destinations found
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 mt-2 md:mt-0">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold text-[#17211D]">Sort By:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-[#E2E7E3] text-[#17211D] text-[13px] font-medium py-1.5 pl-3 pr-8 rounded-lg focus:outline-none focus:border-[#087F5B] cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#66736D]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold text-[#17211D] hidden sm:inline">View:</span>
          <div className="flex bg-white rounded-lg p-1 border border-[#E2E7E3] shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-[#F7F7F2] text-[#087F5B]" : "text-[#66736D] hover:text-[#17211D]"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list" ? "bg-[#F7F7F2] text-[#087F5B]" : "text-[#66736D] hover:text-[#17211D]"
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "map" ? "bg-[#F7F7F2] text-[#087F5B]" : "text-[#66736D] hover:text-[#17211D]"
              }`}
            >
              <Map size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Filters Toggle */}
        <button 
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 bg-white border border-[#E2E7E3] px-3 py-1.5 rounded-lg text-[#17211D] text-[13px] font-bold shadow-sm"
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>
    </div>
  );
}
