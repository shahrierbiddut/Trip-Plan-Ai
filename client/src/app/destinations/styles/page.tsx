"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import ExploreByExperience from "@/components/destinations/listings/ExploreByExperience";

export default function TravelStylesPage() {
  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[540px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/Sajek/cover-1.jpg"
          alt="Travel Styles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#073D31]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#073D31]/60 via-[#073D31]/20 to-[#073D31]/80" />
        
        <div className="relative z-10 text-center px-5 max-w-4xl pt-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-white backdrop-blur-md mb-6 border border-white/20 shadow-lg">
            <Sparkles size={14} className="text-[#F4A934]" />
            Find Your Vibe
          </p>
          <h1 className="font-serif text-[46px] sm:text-[60px] font-bold leading-tight text-white mb-6 drop-shadow-lg">
            Travel Styles & Experiences
          </h1>
          <p className="text-white/90 text-[16px] sm:text-[18px] max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Whether you seek adrenaline-pumping adventures or serene escapes, discover destinations perfectly matched to your personal travel style.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">6+</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">Unique Styles</span>
            </div>
            <div className="w-[1px] h-10 bg-white/20 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">45+</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">Destinations</span>
            </div>
            <div className="w-[1px] h-10 bg-white/20 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-serif text-[#F4A934]">100%</span>
              <span className="text-[12px] uppercase tracking-wider font-bold text-white/80 mt-1">Personalized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-16 -mt-12 relative z-20">
        <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(7,61,49,0.05)] p-8 sm:p-12 border border-[#DCE6E1]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-[28px] font-bold text-[#12342D] mb-4">Choose Your Next Experience</h2>
            <p className="text-[#687873]">Browse our curated collection of destinations organized by the type of experience they offer. From pristine beaches to dense forests, find exactly what you're looking for.</p>
          </div>
          
          <ExploreByExperience />

          {/* Featured Editorial Block */}
          <div className="mt-20 mb-10 rounded-[32px] overflow-hidden bg-[#0A251C] flex flex-col lg:flex-row shadow-2xl shadow-[#073D31]/15 border border-[#113B2E]">
            <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[450px]">
              <Image 
                src="/assets/sreemangal/cover-1.webp" 
                fill 
                alt="Sreemangal Tea Gardens" 
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A251C] hidden lg:block opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A251C] to-transparent lg:hidden opacity-90" />
            </div>
            
            <div className="w-full lg:w-1/2 p-10 sm:p-14 lg:p-16 flex flex-col justify-center relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1A4535] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F4A934] mb-6 w-fit border border-[#2A5C48]">
                <Sparkles size={14} /> Experience of the Month
              </span>
              
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                The Serenity of <br/><span className="text-[#F4A934]">Sreemangal's</span> Tea Gardens
              </h3>
              
              <p className="text-[#9DB0A7] text-[16px] leading-relaxed mb-10">
                Escape the city noise and immerse yourself in the "Tea Capital of Bangladesh." Wake up to rolling emerald hills, misty mornings, and the rich aroma of freshly brewed tea. Perfect for nature retreats and soul-soothing relaxation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/plan-trip" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F4A934] text-[#12342D] px-8 py-3.5 rounded-full font-bold hover:bg-[#E59923] transition-all hover:scale-105 shadow-lg shadow-[#F4A934]/20">
                  Plan This Retreat <ArrowRight size={18} />
                </Link>
                <Link href="/destinations" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid sm:grid-cols-2 gap-6">
             <div className="bg-[#EEF5F1] rounded-[24px] p-10 flex flex-col items-start border border-[#DCE6E1]/50 shadow-sm transition-all hover:shadow-md">
               <div className="h-14 w-14 rounded-full bg-[#073D31] text-[#F4A934] flex items-center justify-center mb-6 shadow-lg shadow-[#073D31]/20">
                 <Compass size={28} />
               </div>
               <h3 className="text-[22px] font-serif font-bold text-[#12342D] mb-3">Not sure where to go?</h3>
               <p className="text-[#687873] mb-8 flex-1 leading-relaxed">Let our AI travel assistant analyze your preferences and recommend the perfect travel style and destination for your next trip. Get a personalized itinerary in seconds.</p>
               <Link href="/plan-trip" className="inline-flex items-center gap-2 bg-[#F4A934] text-[#12342D] px-7 py-3.5 rounded-full font-bold hover:bg-[#E59923] transition-colors shadow-lg shadow-[#F4A934]/20">
                 Plan My Trip <ArrowRight size={16} />
               </Link>
             </div>
             
             <div className="bg-[#073D31] rounded-[24px] p-10 flex flex-col items-start relative overflow-hidden group shadow-lg shadow-[#073D31]/10">
               <Image src="/assets/hero-bg.jpg" fill alt="bg" className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 group-hover:scale-105 transform" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#073D31] to-transparent opacity-80" />
               <div className="relative z-10 flex flex-col h-full">
                 <h3 className="text-[22px] font-serif font-bold text-white mb-3">Explore All Destinations</h3>
                 <p className="text-white/80 mb-8 flex-1 leading-relaxed">Browse our complete directory of all beautiful places across Bangladesh. Filter by region, budget, and best time to visit.</p>
                 <Link href="/destinations" className="inline-flex items-center gap-2 bg-white text-[#073D31] px-7 py-3.5 rounded-full font-bold hover:bg-[#EEF5F1] transition-colors w-fit shadow-lg shadow-white/10">
                   View Directory <ArrowRight size={16} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
