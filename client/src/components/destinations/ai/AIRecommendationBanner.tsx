"use client";

import { Sparkles, Umbrella, Mountain, Users, Wallet, Leaf, Heart } from "lucide-react";
import { useState } from "react";

export default function AIRecommendationBanner() {
  const [activeTags, setActiveTags] = useState<Record<string, boolean>>({});

  const preferences = [
    { label: "Beach", icon: <Umbrella size={14} /> },
    { label: "Adventure", icon: <Mountain size={14} /> },
    { label: "Family", icon: <Users size={14} /> },
    { label: "Budget", icon: <Wallet size={14} /> },
    { label: "Nature", icon: <Leaf size={14} /> },
    { label: "Romantic", icon: <Heart size={14} /> },
  ];

  const toggleTag = (label: string) => {
    setActiveTags(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-8">
      <div className="relative rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden bg-[#0B2522]">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#087F5B]/30 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F4A62A]/20 to-transparent rounded-full blur-[60px] pointer-events-none" />
        
        {/* Background Texture/Grid (optional subtle overlay) */}
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="flex-1 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-[11px] font-bold uppercase tracking-widest mb-4 border border-white/10">
            <Sparkles size={12} className="text-[#F4A62A]" />
            AI-Powered Discovery
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3">
            Not Sure Where to Go?
          </h2>
          <p className="text-[15px] text-white/70 font-medium max-w-2xl leading-relaxed">
            Select what you love, and let <span className="text-white font-bold tracking-wide">TRIP PLAN AI</span> instantly match you with destinations that perfectly fit your travel style.
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-6 relative z-10">
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5">
            {preferences.map((pref) => {
              const isActive = activeTags[pref.label];
              return (
                <button
                  key={pref.label}
                  onClick={() => toggleTag(pref.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 shadow-sm ${
                    isActive 
                      ? "bg-gradient-to-r from-[#F4A62A] to-[#F4B942] text-[#17211D] border-transparent shadow-[#F4A62A]/20 scale-105" 
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/15 backdrop-blur-sm"
                  }`}
                >
                  {pref.icon}
                  {pref.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="group flex items-center gap-2.5 bg-[#087F5B] hover:bg-[#065F46] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-[#087F5B]/30 hover:shadow-[#087F5B]/50 hover:-translate-y-0.5 transition-all w-full lg:w-auto justify-center"
          >
            <Sparkles size={18} className="text-[#F4A62A] group-hover:animate-pulse" />
            Find My Perfect Destination
          </button>
        </div>
      </div>
    </div>
  );
}
