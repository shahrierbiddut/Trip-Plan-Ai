"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, AlertCircle, Sparkles, ThumbsUp, MessageSquareText } from "lucide-react";

export default function ReviewIntelligence() {
  const travelersLove = [
    "Pristine, endless sandy beaches", 
    "Fresh, affordable seafood options", 
    "Breathtaking sunset views over the bay",
    "Friendly local hospitality"
  ];
  
  const commonConcerns = [
    "Crowded during national holidays", 
    "Traffic congestion in peak season",
    "Limited high-end nightlife"
  ];

  
  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#17211D] flex items-center gap-3">
            <MessageSquareText className="text-[#087F5B]" size={28} />
            Know Before You Go
          </h2>
          <p className="text-[14px] text-[#66736D] mt-2 font-medium max-w-2xl">
            Our AI analyzes thousands of real traveler reviews to give you an honest, unbiased summary of what to expect.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4EBE7] shadow-[0_8px_30px_rgba(23,33,29,0.04)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] flex-col-reverse lg:flex-row">
          
          {/* Left: Destination Context (Image with overlay) */}
          <div className="relative h-[300px] lg:h-auto w-full">
            <Image 
              src="/assets/Coxs/cover-1.jpg"
              alt="Cox's Bazar"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 340px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
              <span className="bg-[#F4A62A] text-[#0B2522] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
                Most Reviewed
              </span>
              <h3 className="text-[28px] font-serif font-bold text-white leading-tight mb-1">Cox&apos;s Bazar</h3>
              <p className="text-[14px] font-medium text-white/80 mb-6">Bangladesh</p>
              
              {/* Glassmorphism Sentiment Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center gap-4">
                {/* SVG Circular Progress */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/20"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#55B995]"
                      strokeWidth="3"
                      strokeDasharray="94, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[14px] font-extrabold text-white">94%</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white mb-0.5">Positive Sentiment</p>
                  <p className="text-[11px] font-medium text-white/70">Based on 1.2K+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Insights */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#F8FAF9]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mb-10">
              {/* Pros */}
              <div>
                <div className="flex items-center gap-3 mb-5 border-b border-[#E4EBE7] pb-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8F7F1] flex items-center justify-center">
                    <ThumbsUp size={14} className="text-[#087F5B]" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#17211D]">Travelers Love</h4>
                </div>
                <ul className="space-y-4">
                  {travelersLove.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#E8F7F1] flex items-center justify-center">
                        <Check size={12} className="text-[#087F5B]" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] font-medium text-[#52615A] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <div className="flex items-center gap-3 mb-5 border-b border-[#E4EBE7] pb-3">
                  <div className="w-8 h-8 rounded-full bg-[#FCE8E8] flex items-center justify-center">
                    <AlertCircle size={14} className="text-[#D64545]" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#17211D]">Common Concerns</h4>
                </div>
                <ul className="space-y-4">
                  {commonConcerns.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#FCE8E8] flex items-center justify-center">
                        <AlertCircle size={12} className="text-[#D64545]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[14px] font-medium text-[#6A5757] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict & CTA */}
            <div className="relative overflow-hidden bg-white rounded-xl border border-[#F4A62A]/30 shadow-[0_4px_20px_rgba(244,166,42,0.05)]">
              {/* Subtle gold gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4A62A]/5 to-transparent pointer-events-none" />
              
              <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A62A] to-[#F4B942] flex items-center justify-center shrink-0 shadow-sm mt-1 sm:mt-0">
                    <Sparkles size={18} className="text-[#0B2522]" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-bold text-[#17211D] mb-1 flex items-center gap-2">
                      AI Final Verdict
                      <span className="text-[10px] font-bold bg-[#E4EBE7] text-[#52615A] px-2 py-0.5 rounded-full uppercase tracking-wider">Summary</span>
                    </h5>
                    <p className="text-[14px] font-medium text-[#52615A] leading-relaxed max-w-xl">
                      Cox&apos;s Bazar is an outstanding choice for families and couples seeking a relaxing beach escape. While peak seasons can get busy, the sheer beauty of the longest sea beach in the world makes it incredibly worthwhile.
                    </p>
                  </div>
                </div>
                <Link 
                  href="/reviews"
                  className="shrink-0 flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-white border border-[#087F5B] rounded-lg text-[13px] font-bold text-[#087F5B] hover:bg-[#087F5B] hover:text-white transition-colors"
                >
                  View All Insights
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
