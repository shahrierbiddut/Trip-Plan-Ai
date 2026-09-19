"use client";

import { X, SlidersHorizontal, Mountain, Umbrella, Users, Heart, Backpack, Gem, Leaf, Coffee, Landmark, ChevronDown, Star, StarHalf } from "lucide-react";
import { useState } from "react";

interface DestinationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const REGIONS = ["Bangladesh"];

const TRAVEL_STYLES = [
  { name: "Adventure", icon: <Mountain size={14} className="text-[#4B5E57]" /> },
  { name: "Beach", icon: <Umbrella size={14} className="text-[#4B5E57]" /> },
  { name: "Family", icon: <Users size={14} className="text-[#4B5E57]" /> },
  { name: "Romantic", icon: <Heart size={14} className="text-[#4B5E57]" /> },
  { name: "Backpacking", icon: <Backpack size={14} className="text-[#4B5E57]" /> },
  { name: "Luxury", icon: <Gem size={14} className="text-[#4B5E57]" /> },
  { name: "Nature", icon: <Leaf size={14} className="text-[#4B5E57]" /> },
  { name: "Relaxation", icon: <Coffee size={14} className="text-[#4B5E57]" /> },
  { name: "Cultural", icon: <Landmark size={14} className="text-[#4B5E57]" /> },
];

const DURATIONS = ["1–2 Days", "3–4 Days", "5–7 Days", "1–2 Weeks", "2+ Weeks"];
const BEST_TIMES = ["Jan – Mar", "Apr – Jun", "Jul – Sep", "Oct – Dec"];
const AI_MATCHES = ["90%+", "80%+", "70%+"];

export default function DestinationSidebar({ isOpen, onClose }: DestinationSidebarProps) {
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [budget, setBudget] = useState(50000);

  const displayedStyles = showAllStyles ? TRAVEL_STYLES : TRAVEL_STYLES.slice(0, 7);

  // Helper for Rating Stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < Math.floor(rating)) {
            return <Star key={i} size={14} className="fill-[#F4A62A] text-[#F4A62A]" />;
          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <StarHalf key={i} size={14} className="fill-[#F4A62A] text-[#F4A62A]" />;
          } else {
            return <Star key={i} size={14} className="fill-[#E4EBE7] text-[#E4EBE7]" />;
          }
        })}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-7 pb-6">
      
      {/* 01. Region */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-3">01. Region</h4>
        <div className="flex flex-col gap-2.5">
          {REGIONS.map((region) => (
            <label key={region} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  defaultChecked={region === "Bangladesh"}
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#C7D3CE] checked:bg-[#0B2522] checked:border-[#0B2522] transition-colors"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-[13px] font-bold text-[#17211D]">
                {region}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 02. Travel Style */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-3">02. Travel Style</h4>
        <div className="flex flex-col gap-2.5">
          {displayedStyles.map((style) => (
            <label key={style.name} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#C7D3CE] checked:bg-[#0B2522] checked:border-[#0B2522] transition-colors"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {style.icon}
                <span className="text-[13px] font-semibold text-[#17211D]">
                  {style.name}
                </span>
              </div>
            </label>
          ))}
        </div>
        {!showAllStyles && (
          <button 
            onClick={() => setShowAllStyles(true)}
            className="flex items-center gap-1 text-[12px] font-bold text-[#087F5B] mt-4 hover:text-[#065F46] transition-colors"
          >
            Show More <ChevronDown size={14} />
          </button>
        )}
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 03. Budget */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-1">03. Budget <span className="font-normal text-[#66736D] text-[12px]">(Per Trip)</span></h4>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[13px] font-bold text-[#17211D]">৳5,000</span>
          <span className="text-[13px] font-bold text-[#17211D]">৳50,000+</span>
        </div>
        <div className="px-1">
          <input 
            type="range" 
            min="5000" 
            max="50000" 
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-1 bg-[#E4EBE7] rounded-full appearance-none cursor-pointer accent-[#0B2522]" 
          />
        </div>
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 04. Trip Duration */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-3">04. Trip Duration</h4>
        <div className="flex flex-col gap-2.5">
          {DURATIONS.map((duration) => (
            <label key={duration} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#C7D3CE] checked:bg-[#0B2522] checked:border-[#0B2522] transition-colors"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-[13px] font-medium text-[#4B5E57] group-hover:text-[#17211D] transition-colors">
                {duration}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 05. Rating */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-3">05. Rating</h4>
        <div className="flex flex-col gap-3">
          {[4.5, 4.0, 3.5].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#C7D3CE] checked:bg-[#0B2522] checked:border-[#0B2522] transition-colors"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(rating)}
                <span className="text-[13px] font-medium text-[#4B5E57] group-hover:text-[#17211D] transition-colors">
                  {rating.toFixed(1)}+
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 06. Best Time to Visit */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-3">06. Best Time to Visit</h4>
        <div className="flex flex-col gap-2.5">
          {BEST_TIMES.map((time) => (
            <label key={time} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#C7D3CE] checked:bg-[#0B2522] checked:border-[#0B2522] transition-colors"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-[13px] font-medium text-[#4B5E57] group-hover:text-[#17211D] transition-colors">
                {time}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#E4EBE7]" />

      {/* 07. AI Match */}
      <div>
        <h4 className="text-[14px] font-bold text-[#17211D] mb-1">07. AI Match</h4>
        <p className="text-[11px] font-medium text-[#4B5E57] mb-3">Show destinations with high AI Match</p>
        <div className="flex flex-col gap-2.5">
          {AI_MATCHES.map((match) => (
            <label key={match} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="aiMatch"
                  defaultChecked={match === "80%+"}
                  className="peer appearance-none w-4 h-4 rounded-full border border-[#C7D3CE] checked:border-[#0B2522] transition-colors"
                />
                {/* Radio inner dot */}
                <div className="absolute w-2 h-2 rounded-full bg-[#0B2522] opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-[13px] font-medium text-[#4B5E57] group-hover:text-[#17211D] transition-colors">
                {match}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0 sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto pr-6 pb-20 scrollbar-none">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-bold text-[#17211D]">Filter Destinations</h3>
          <button className="text-[12px] font-bold text-[#087F5B] hover:text-[#065F46] transition-colors">
            Clear All
          </button>
        </div>
        <SidebarContent />

        <div className="mt-8 pt-6 border-t border-[#E2E7E3] pb-4 flex flex-col gap-3">
          <button className="w-full py-3 rounded-xl bg-[#0B2522] text-white font-bold text-[14px] hover:bg-[#113833] transition-colors shadow-md">
            Apply Filters
          </button>
          <button className="w-full py-3 rounded-xl bg-white border border-[#C7D3CE] text-[#0B2522] font-bold text-[14px] hover:bg-[#F8FAF9] hover:border-[#0B2522] transition-colors">
            Clear All
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose}
          />
          <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E7E3]">
              <h3 className="text-[16px] font-bold text-[#17211D]">Filter Destinations</h3>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#F8FAF9] text-[#66736D] transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 pb-24">
              <SidebarContent />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 border-t border-[#E2E7E3] bg-white flex flex-col gap-2 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-lg bg-[#0B2522] text-white font-bold text-[14px] hover:bg-[#113833] transition-colors"
              >
                Apply Filters
              </button>
              <button className="w-full py-3 rounded-lg bg-white border border-[#C7D3CE] text-[#0B2522] font-bold text-[14px] hover:bg-[#F8FAF9] transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
