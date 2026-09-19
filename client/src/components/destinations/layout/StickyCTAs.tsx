"use client";

import { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface StickyCTAsProps {
  name: string;
  aiMatch: number;
  priceFrom: number;
}

export default function StickyCTAs({ name, aiMatch, priceFrom }: StickyCTAsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolling down past the main hero CTA, but hide near the bottom
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const nearBottom = document.documentElement.scrollHeight - window.innerHeight - 800;

      if (scrolled > heroHeight && scrolled < nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sticky CTA */}
      <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
        <div className="bg-white rounded-full p-2 pr-2.5 pl-6 shadow-[0_8px_30px_rgba(23,33,29,0.15)] border border-[#E2E7E3] flex items-center gap-6">
          <div className="flex items-center gap-4">
             <span className="font-bold text-[#17211D]">{name}</span>
             <div className="w-1 h-1 bg-[#E2E7E3] rounded-full" />
             <div className="flex items-center gap-1.5 text-xs font-bold text-[#F4A62A] bg-[#F4A62A]/10 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Match {aiMatch}%
             </div>
             <div className="w-1 h-1 bg-[#E2E7E3] rounded-full" />
             <span className="text-sm text-[#66736D]">From <strong className="text-[#17211D]">৳{priceFrom.toLocaleString()}+</strong></span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="ghost"
              className="rounded-full text-[#66736D] hover:text-[#17211D] hover:bg-[#F7F7F2]"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Link href="/plan-trip">
              <Button
                className="bg-[#087F5B] hover:bg-[#065F46] text-white font-bold rounded-full px-6"
              >
                Plan Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E2E7E3] p-3 shadow-[0_-4px_20px_rgba(23,33,29,0.08)] pb-safe animate-in slide-in-from-bottom-10 fade-in duration-300">
         <div className="flex items-center justify-between gap-3">
           <div className="flex flex-col">
             <span className="font-bold text-[#17211D] text-sm">{name}</span>
             <div className="flex items-center gap-1 text-[10px] font-bold text-[#F4A62A]">
                <Sparkles className="w-3 h-3" />
                {aiMatch}% Match
             </div>
           </div>
           
           <div className="flex items-center gap-2 flex-1 justify-end">
             <Button
               isIconOnly
               variant="outline"
               className="border-[#E2E7E3] rounded-lg text-[#17211D]"
             >
               <Heart className="w-5 h-5" />
             </Button>
             <Link href="/plan-trip" className="flex-1 max-w-[120px]">
               <Button
                 className="w-full bg-[#087F5B] hover:bg-[#065F46] text-white font-bold rounded-lg"
               >
                 Plan Trip
               </Button>
             </Link>
           </div>
         </div>
      </div>
    </>
  );
}
