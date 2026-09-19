"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Compass, Search, Star } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";

function HorizontalSavedCard({ destination }: { destination: any }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const slug = destination.slug || destination.id;
  const bookmarked = isBookmarked(slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(destination);
  };

  const estimatedBudget = destination.estimatedBudget 
    ? `৳${destination.estimatedBudget.toLocaleString()}` 
    : typeof destination.budget === 'string' 
      ? destination.budget 
      : 'N/A';

  return (
    <Link 
      href={`/destinations/${slug}`}
      className="group relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 w-full max-w-[1200px]"
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-[320px] h-[220px] sm:h-auto shrink-0 overflow-hidden">
        <img 
          src={destination.image || destination.heroImage} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle realistic inner shadow on image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 w-full justify-between bg-white relative">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold text-[#F4A934] bg-[#F4A934]/10 px-2.5 py-1 rounded-md uppercase tracking-widest border border-[#F4A934]/20">
                  {destination.country || "Destination"}
                </span>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                  <Star size={12} className="fill-[#F4A934] text-[#F4A934]" />
                  <span className="text-[12px] font-bold text-gray-700">{destination.rating || "4.5"}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-serif text-gray-900 group-hover:text-[#087F5B] transition-colors leading-tight">
                {destination.name}
              </h3>
            </div>
            
            <button
              onClick={handleBookmarkClick}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm border ${
                bookmarked 
                  ? "bg-[#F4A934] border-[#F4A934] text-[#0B2522] hover:bg-[#E39D30]" 
                  : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
              aria-label="Toggle save"
            >
              <Heart size={20} className={bookmarked ? "fill-current" : ""} />
            </button>
          </div>

          <p className="text-[14px] text-gray-500 line-clamp-2 mt-3 leading-relaxed max-w-[90%]">
            {destination.subtitle || destination.description || `Explore the beautiful landscapes and amazing culture of ${destination.name}.`}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-50 flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {((destination.styles || destination.tags) || []).slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-[11px] text-[#087F5B] bg-[#087F5B]/5 border border-[#087F5B]/10 px-3 py-1.5 rounded-lg font-bold tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[13px] font-medium text-gray-500 text-right shrink-0 ml-4 flex flex-col items-end">
            <span className="text-[11px] uppercase tracking-wider mb-0.5">Starting from</span>
            <span className="text-xl font-bold text-gray-900 font-serif">{estimatedBudget}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SavedDestinationsPage() {
  const { bookmarks, loading } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = bookmarks.filter((b) => 
    b.destinationData?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.destinationData?.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200/60 shadow-sm gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#17211D]">Saved Destinations</h1>
          <p className="text-[14px] text-gray-500 mt-1">Places you've bookmarked for your next adventure</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search saved places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#087F5B] focus:ring-1 focus:ring-[#087F5B] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="w-full">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#087F5B]/20 border-t-[#087F5B] rounded-full animate-spin" />
              <p className="mt-4 text-gray-500 font-medium">Loading your saved places...</p>
            </div>
          ) : bookmarks.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 md:p-16 text-center flex flex-col items-center max-w-[1200px]">
              <div className="w-20 h-20 bg-[#087F5B]/10 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-[#087F5B] fill-[#087F5B]/20" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Saved Destinations Yet</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                You haven't bookmarked any places. Browse our curated destinations and tap the heart icon to save them here for later.
              </p>
              <Link
                href="/destinations"
                className="flex items-center gap-2 bg-[#087F5B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#066548] shadow-lg shadow-[#087F5B]/20 hover:-translate-y-0.5 transition-all"
              >
                <Compass size={18} />
                Explore Destinations
              </Link>
            </div>
          ) : (
            // Saved Listings (Horizontal)
            <div className="flex flex-col gap-6 w-full">
              {filteredBookmarks.length > 0 ? (
                filteredBookmarks.map((bookmark) => (
                  <HorizontalSavedCard 
                    key={bookmark._id || bookmark.destinationSlug} 
                    destination={bookmark.destinationData} 
                  />
                ))
              ) : (
                <div className="py-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm max-w-[1200px]">
                  <p className="text-gray-500">No saved destinations match your search.</p>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
