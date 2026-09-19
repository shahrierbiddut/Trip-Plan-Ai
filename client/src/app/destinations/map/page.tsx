"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import MapCompareSection from "@/components/destinations/interactive/MapCompareSection";
import { fetchDestinations } from "@/lib/api/destination";
import type { DestinationData } from "@/types/destination-card";

export default function InteractiveMapPage() {
  const [destinationsData, setDestinationsData] = useState<DestinationData[]>([]);

  useEffect(() => {
    fetchDestinations().then(res => {
      if (Array.isArray(res)) setDestinationsData(res);
    });
  }, []);

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[540px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/Sylhet/cover-1.jpg"
          alt="Interactive Map"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#073D31]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#073D31]/60 via-[#073D31]/20 to-[#073D31]/80" />
        
        <div className="relative z-10 text-center px-5 max-w-4xl pt-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-white backdrop-blur-md mb-6 border border-white/20 shadow-lg">
            <Map size={14} className="text-[#F4A934]" />
            Compare & Explore
          </p>
          <h1 className="font-serif text-[46px] sm:text-[60px] font-bold leading-tight text-white mb-6 drop-shadow-lg">
            Interactive Destination Map
          </h1>
          <p className="text-white/90 text-[16px] sm:text-[18px] max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Visually compare your favorite destinations side-by-side. Analyze AI match percentages, budgets, and travel styles to make the perfect choice.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">15+</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">Data Points</span>
            </div>
            <div className="w-[1px] h-10 bg-white/20 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">95%</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">AI Match Accuracy</span>
            </div>
            <div className="w-[1px] h-10 bg-white/20 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">100s</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">Of Comparisons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-16 -mt-12 relative z-20">
        <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(7,61,49,0.05)] p-8 sm:p-12 border border-[#DCE6E1]">
          {/* How It Works Section */}
          <div className="mb-14 bg-[#F8FAF9] rounded-[24px] p-8 sm:p-10 border border-[#E4EBE7]">
            <div className="text-center mb-10">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#12342D] mb-3">How to Use the Interactive Map</h2>
              <p className="text-[#687873] max-w-xl mx-auto">Compare destinations in three simple steps to find the perfect match for your next adventure.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[2px] bg-[#DCE6E1] z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#087F5B] flex items-center justify-center text-[20px] font-bold text-[#087F5B] mb-5 shadow-sm shadow-[#087F5B]/10">
                  1
                </div>
                <h3 className="text-[17px] font-bold text-[#12342D] mb-2">Select Destinations</h3>
                <p className="text-[#687873] text-[14px] leading-relaxed px-4">Browse the list and select up to 3 destinations you want to compare side-by-side.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#F4A934] flex items-center justify-center text-[20px] font-bold text-[#F4A934] mb-5 shadow-sm shadow-[#F4A934]/10">
                  2
                </div>
                <h3 className="text-[17px] font-bold text-[#12342D] mb-2">Compare Data</h3>
                <p className="text-[#687873] text-[14px] leading-relaxed px-4">Analyze the AI match percentage, budget requirements, and best time to visit.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#087F5B] flex items-center justify-center text-[20px] font-bold text-[#087F5B] mb-5 shadow-sm shadow-[#087F5B]/10">
                  3
                </div>
                <h3 className="text-[17px] font-bold text-[#12342D] mb-2">Make a Choice</h3>
                <p className="text-[#687873] text-[14px] leading-relaxed px-4">Find your winner and let our AI create a fully personalized itinerary for that spot.</p>
              </div>
            </div>
          </div>

          <MapCompareSection destinations={destinationsData} />

          <div className="mt-16 bg-[#073D31] rounded-[24px] p-10 sm:p-14 text-center relative overflow-hidden group shadow-xl shadow-[#073D31]/10 border border-[#073D31]/20">
            <div className="absolute inset-0 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-1000 group-hover:scale-105 transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#073D31] to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4A934] backdrop-blur-md mb-6 border border-white/10">
                Next Steps
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-5 leading-tight">Ready to start your journey?</h3>
              <p className="text-white/80 mb-10 text-[16px] sm:text-[18px] leading-relaxed">
                Now that you've compared the best spots in Bangladesh, let our AI handle the logistics and build a personalized, day-by-day itinerary tailored to your budget and travel style.
              </p>
              <Link href="/plan-trip" className="inline-flex items-center gap-2 bg-[#F4A934] text-[#12342D] px-8 py-4 rounded-full font-bold hover:bg-[#E59923] transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-[#F4A934]/20">
                Plan My Trip With AI <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
