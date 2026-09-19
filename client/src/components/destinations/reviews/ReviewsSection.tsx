"use client";

import Image from "next/image";
import { Star, ThumbsUp, Quote } from "lucide-react";
import { useState } from "react";
import AIReviewSummary from '@/components/destinations/reviews/AIReviewSummary';

interface ReviewsProps {
  data: {
    overall: number;
    count: number;
    breakdown: Record<number, number>;
    list: {
      id: number;
      name: string;
      avatar: string;
      rating: number;
      date: string;
      tripType: string;
      text: string;
    }[];
    aiSummary: {
      loved: string[];
      concerns: string[];
      verdict: string;
    };
  };
}

export default function ReviewsSection({ data }: ReviewsProps) {
  if (!data) return null;
  const [helpful, setHelpful] = useState<Record<number, boolean>>({});

  const toggleHelpful = (id: number) => {
    setHelpful(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-4">
      <h3 className="text-3xl font-serif text-[#17211D] font-bold mb-10">What Travelers Say</h3>
      
      <div className="flex flex-col lg:flex-row gap-10 mb-16 bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E7E3]/50 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#087F5B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Rating Breakdown */}
        <div className="lg:w-1/3 flex flex-col justify-center relative z-10">
          <div className="flex items-end gap-5 mb-8">
            <h4 className="text-7xl font-serif font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-[#0B2522] to-[#087F5B] leading-none tracking-tighter">
              {data.overall}
            </h4>
            <div className="flex flex-col pb-2">
               <div className="flex text-[#F4A62A] mb-1 drop-shadow-md">
                 {[1,2,3,4,5].map(star => (
                   <Star key={star} className="w-5 h-5 fill-current" />
                 ))}
               </div>
               <span className="text-xs font-extrabold tracking-widest uppercase text-[#66736D] bg-[#F7F7F2] px-2 py-0.5 rounded w-fit">
                 {data.count.toLocaleString()}+ Reviews
               </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3.5 pr-8">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-4 text-sm group cursor-pointer">
                <span className="w-3 text-[#17211D] font-bold text-sm">{rating}</span>
                <Star className="w-4 h-4 text-[#F4A62A] fill-[#F4A62A] drop-shadow-sm group-hover:scale-110 transition-transform" />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                   <div 
                     className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#087F5B] to-[#20C997] rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(8,127,91,0.5)]"
                     style={{ width: `${data.breakdown[rating]}%` }}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="lg:w-2/3 relative z-10">
          <AIReviewSummary data={data.aiSummary} />
        </div>
      </div>

      {/* Review List */}
      <div className="relative">
        <h4 className="text-2xl font-serif text-[#17211D] font-bold mb-8">Top Traveler Experiences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.list.map(review => (
            <div key={review.id} className="bg-gradient-to-br from-white to-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(8,127,91,0.08)] hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden">
              
              {/* Premium Colorful Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F4A62A] via-[#087F5B] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative Giant Quote Mark */}
              <div className="absolute -top-6 -right-6 text-gray-100/50 group-hover:text-[#087F5B]/5 transition-colors duration-500 pointer-events-none transform group-hover:rotate-12 group-hover:scale-110">
                <Quote className="w-32 h-32" fill="currentColor" strokeWidth={0} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative shadow-md ring-2 ring-transparent group-hover:ring-[#087F5B]/20 transition-all duration-300 p-0.5 bg-white">
                       <div className="w-full h-full relative rounded-full overflow-hidden">
                         <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                       </div>
                    </div>
                    <div>
                       <h5 className="font-extrabold text-[#17211D] text-base group-hover:text-[#087F5B] transition-colors">{review.name}</h5>
                       <span className="text-[11px] font-bold tracking-wide uppercase text-gray-400">{review.date} • {review.tripType}</span>
                    </div>
                  </div>
                  <div className="flex text-[#F4A62A] drop-shadow-sm bg-orange-50 px-2 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-orange-200"}`} />
                    ))}
                  </div>
                </div>
                
                <p className="text-base text-gray-600 font-serif italic leading-relaxed mb-8 pr-4 group-hover:text-gray-900 transition-colors">
                  "{review.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => toggleHelpful(review.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      helpful[review.id] 
                        ? "bg-gradient-to-r from-[#087F5B] to-[#20C997] text-white shadow-lg shadow-[#087F5B]/30 border-none" 
                        : "bg-white border border-gray-200 text-gray-500 hover:border-[#087F5B]/30 hover:bg-[#F4FBFA] hover:text-[#087F5B] shadow-sm"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${helpful[review.id] ? "fill-current" : ""}`} />
                    {helpful[review.id] ? "Helpful" : "Helpful?"}
                  </button>
                  
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Verified Guest</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

