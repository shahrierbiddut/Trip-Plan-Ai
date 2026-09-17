"use client";

import { DestinationData } from "@/types/destination-card";
import DestinationCard from '@/components/destinations/listings/DestinationCard';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedDestinationsProps {
  destinations: DestinationData[];
}

export default function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const featured = destinations.filter((d) => d.featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-2 border-b border-[#E2E7E3]">
        <h2 className="text-[18px] font-bold text-[#17211D]">
          Featured This Week
        </h2>
        
        <Link 
          href="/destinations?featured=true" 
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#087F5B] hover:text-[#065F46] transition-colors mt-2 sm:mt-0"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((destination, index) => (
          <DestinationCard 
            key={destination.id} 
            destination={destination} 
            featured={true}
            featuredType={index === 0 ? "Trending" : index === 1 ? "Popular" : "New"} 
          />
        ))}
      </div>
    </div>
  );
}
