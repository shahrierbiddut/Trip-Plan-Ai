"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Sparkles } from "lucide-react";
import { DestinationData } from "@/types/destination-card";
import { useBookmarks } from "@/contexts/BookmarksContext";

interface DestinationCardProps {
  destination: DestinationData;
  featured?: boolean;
  featuredType?: "Trending" | "Popular" | "New";
}

export default function DestinationCard({ destination, featured, featuredType }: DestinationCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const slug = destination.slug || (destination as any).id;
  const bookmarked = isBookmarked(slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(destination);
  };

  return (
    <Link
      href={`/destinations/${destination.slug}`} 
      className="group relative block bg-[#0B1A16] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(23,33,29,0.08)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[320px]"
    >
      {/* Background Image */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Gradient overlay mimicking the dark shadow at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A16] via-[#0B1A16]/40 to-black/10" />

      {/* Top Left Badge (Trending/Popular/New) */}
      {(featured && featuredType) && (
        <div className="absolute top-4 left-4 bg-[#F4A62A]/90 backdrop-blur-sm text-[#0B2522] px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide z-10 shadow-sm">
          {featuredType}
        </div>
      )}

      {/* Top Right Wishlist */}
      <button
        className={`absolute top-4 right-4 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all z-20 ${
          bookmarked 
            ? "bg-[#F4A62A] border-[#F4A62A] text-[#0B2522]" 
            : "bg-black/30 border-white/20 text-white hover:bg-[#F4A62A] hover:text-[#0B2522] hover:border-[#F4A62A]"
        }`}
        aria-label={bookmarked ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleBookmarkClick}
      >
        <Heart size={16} className={bookmarked ? "fill-[#0B2522]" : ""} />
      </button>

      {/* Content Positioned at Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col z-10">
        
        {/* AI Match Badge (floating right above title) */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 w-fit px-2 py-1 rounded-md mb-2">
          <Sparkles size={12} className="text-[#F4A62A]" />
          <span className="text-[11px] font-bold text-white">
            AI Match {destination.aiMatch}%
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-bold text-white mb-0.5">
          {destination.name}
        </h3>
        
        {/* Location / Region */}
        <div className="flex items-center gap-1 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
          <span className="text-[12px] font-medium text-white/80">{destination.region}</span>
        </div>

        {/* Rating and Price row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-[#F4A62A] text-[#F4A62A]" />
            <span className="text-[13px] font-bold text-white">{destination.rating}</span>
            <span className="text-[11px] text-white/60">({destination.reviewCount} reviews)</span>
          </div>
          <div className="text-[13px] font-medium text-white/80">
            From <span className="font-bold text-white">
              {(destination as any).estimatedBudget 
                ? `৳${(destination as any).estimatedBudget.toLocaleString()}` 
                : typeof destination.budget === 'string' 
                  ? destination.budget 
                  : 'N/A'}
            </span>
          </div>
        </div>

        {/* Style Tags */}
        <div className="flex flex-wrap gap-2">
          {((destination.styles || (destination as any).tags) || []).slice(0, 3).map((style: string) => (
            <span key={style} className="bg-white/10 border border-white/10 text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              {style}
            </span>
          ))}
        </div>
        
      </div>
    </Link>
  );
}
