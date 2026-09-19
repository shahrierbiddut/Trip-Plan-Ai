"use client";

import Image from "next/image";
import { Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface RelatedProps {
  data: {
    slug: string;
    name: string;
    rating: number;
    aiMatch: number;
    budget: string;
    image: string;
  }[];
}

export default function RelatedDestinations({ data }: RelatedProps) {
  if (!data) return null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 280;
        const gap = 20;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reached end, smooth scroll to start
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll next
          scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 280;
      scrollRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 280;
      scrollRef.current.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }
  };

  return (
    <div className="pt-10 border-t border-[#E2E7E3]/60 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h3 className="text-3xl font-serif text-[#17211D] font-bold mb-2">You Might Also Like</h3>
          <p className="text-[14px] text-[#66736D]">AI-recommended destinations based on your preferences</p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex gap-2">
          <button 
            onClick={scrollPrev} 
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={scrollNext} 
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div 
        className="relative -mx-4 px-4 md:mx-0 md:px-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {data.map((dest, i) => (
            <Link 
              key={i} 
              href={`/destinations/${dest.slug}`} 
              className="snap-start shrink-0 w-[260px] md:w-[280px] xl:w-[280px] group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(8,127,91,0.08)] hover:-translate-y-1 hover:border-[#087F5B]/30 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#F7F7F2]">
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-[#F4A62A] to-[#F4B942] rounded-md text-[11px] font-bold text-[#17211D] flex items-center gap-1.5 shadow-md shadow-[#F4A62A]/20">
                  <Sparkles className="w-3 h-3" />
                  {dest.aiMatch}% Match
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-bold text-[#17211D] text-base mb-2 line-clamp-1 group-hover:text-[#087F5B] transition-colors">{dest.name}</h4>
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                   <div className="flex items-center gap-1.5 text-sm text-[#17211D] font-bold">
                     <Star className="w-4 h-4 fill-[#F4A62A] text-[#F4A62A]" />
                     {dest.rating}
                   </div>
                   <span className="text-[11px] font-bold tracking-wide uppercase text-gray-500">From {dest.budget}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

