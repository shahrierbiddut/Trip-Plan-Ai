"use client";

import Image from "next/image";
import DestinationSearch from '@/components/destinations/listings/DestinationSearch';

export default function DestinationHero() {
  return (
    <section className="relative w-full h-[550px] lg:h-[600px] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Image (User uploaded winding road) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.jpg" 
          alt="Bandarban hills and mountain landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Stronger overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#071A16]/90" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 mx-auto text-center mt-6">
        <span className="inline-block text-[#F4B942] font-bold tracking-widest text-[12px] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Discover Bangladesh
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-serif text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] font-normal tracking-tight leading-tight">
          Explore Destinations
        </h1>
        
        <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-serif text-white mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          Find the Place That Feels Right for You.
        </h2>
        
        <p className="max-w-3xl mx-auto text-[14px] sm:text-[15px] text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Explore destinations, compare travel experiences, and discover places matched to your interests, budget, and travel style.
        </p>

        {/* Search Module */}
        <DestinationSearch />
      </div>
    </section>
  );
}
