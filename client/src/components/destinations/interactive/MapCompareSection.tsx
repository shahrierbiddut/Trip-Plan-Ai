"use client";

import { useState } from "react";
import Image from "next/image";
import { DestinationData } from "@/types/destination-card";
import { Check, X, Scale, Sparkles, Star, Wallet, Calendar, Clock, MapPin, Plus } from "lucide-react";

interface MapCompareSectionProps {
  destinations: DestinationData[];
}

export default function MapCompareSection({ destinations }: MapCompareSectionProps) {
  const [selected, setSelected] = useState<DestinationData[]>(destinations.slice(0, 3));

  const toggleSelection = (dest: DestinationData) => {
    if (selected.find(s => s.id === dest.id)) {
      setSelected(selected.filter(s => s.id !== dest.id));
    } else if (selected.length < 3) {
      setSelected([...selected, dest]);
    }
  };

  return (
    <div className="mb-16">
      <div className="flex flex-col lg:flex-row items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-serif font-bold text-[#17211D] flex items-center gap-3">
            <Scale className="text-[#087F5B]" size={28} />
            Compare Destinations
          </h2>
          <p className="text-[14px] text-[#66736D] mt-2 font-medium max-w-xl">
            Select up to 3 destinations to compare AI Match, budget, best time, and travel styles side-by-side to make your perfect choice.
          </p>
        </div>
        {selected.length > 0 && (
          <button 
            onClick={() => setSelected([])}
            className="text-[#66736D] text-[13px] font-bold hover:text-[#087F5B] transition-colors border border-[#E4EBE7] bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Selection List */}
        <div className="lg:w-[280px] shrink-0">
          <div className="bg-white rounded-2xl border border-[#E4EBE7] p-5 shadow-[0_4px_20px_rgba(23,33,29,0.02)]">
            <h3 className="text-[14px] font-bold text-[#17211D] mb-4 flex items-center justify-between">
              Select to Compare
              <span className="text-[11px] font-medium text-[#66736D] bg-[#F8FAF9] px-2 py-0.5 rounded-full border border-[#E4EBE7]">
                {selected.length}/3
              </span>
            </h3>
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {destinations.map((dest) => {
                const isSelected = selected.some(s => s.id === dest.id);
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggleSelection(dest)}
                    disabled={!isSelected && selected.length >= 3}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected 
                        ? 'border-[#087F5B] bg-[#087F5B]/5 shadow-sm' 
                        : 'border-[#E4EBE7] bg-white hover:border-[#C7D3CE] hover:bg-[#F8FAF9] disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E4EBE7]">
                        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[13px] font-bold truncate max-w-[130px] ${isSelected ? 'text-[#087F5B]' : 'text-[#17211D]'}`}>
                          {dest.name}
                        </span>
                        <span className="text-[11px] font-medium text-[#66736D] truncate max-w-[130px]">
                          {dest.region}
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-[#087F5B] border-[#087F5B] text-white' : 'border-[#C7D3CE] text-transparent'
                    }`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Comparison Board */}
        <div className="flex-1 overflow-x-auto pb-4">
          {selected.length === 0 ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-[#F8FAF9] rounded-2xl border-2 border-dashed border-[#C7D3CE]">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                <Scale size={24} className="text-[#C7D3CE]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#17211D] mb-2">No Destinations Selected</h3>
              <p className="text-[#66736D] text-[14px] font-medium max-w-sm text-center">
                Select up to 3 destinations from the list on the left to see a detailed side-by-side comparison.
              </p>
            </div>
          ) : (
            <div className="flex gap-4 min-w-max lg:min-w-0">
              {/* Comparison Cards */}
              {selected.map((dest) => (
                <div key={dest.id} className="w-[280px] lg:w-full lg:min-w-[200px] flex-1 bg-white rounded-2xl border border-[#E4EBE7] shadow-[0_4px_20px_rgba(23,33,29,0.03)] overflow-hidden flex flex-col relative group animate-in fade-in duration-300">
                  <button 
                    onClick={() => toggleSelection(dest)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-[#D64545] backdrop-blur-md rounded-full text-white flex items-center justify-center z-10 transition-colors shadow-sm"
                  >
                    <X size={16} />
                  </button>
                  
                  {/* Card Header (Image + Name) */}
                  <div className="relative h-[160px] w-full">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 280px, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-[20px] font-serif font-bold leading-tight mb-1">{dest.name}</h4>
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/80">
                        <MapPin size={12} /> {dest.region}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body (Stats) */}
                  <div className="p-5 flex flex-col gap-6">
                    
                    {/* AI Match */}
                    <div className="flex lg:items-center justify-between lg:justify-start lg:h-[24px]">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider">AI Match</span>
                      <div className="flex items-center gap-1.5 bg-[#F4A62A]/10 px-2.5 py-1 rounded-md border border-[#F4A62A]/20 text-[#0B2522]">
                        <Sparkles size={14} className="text-[#F4A62A]" />
                        <span className="text-[14px] font-extrabold">{dest.aiMatch}%</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex lg:items-center justify-between lg:justify-start lg:h-[24px]">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider">Rating</span>
                      <div className="flex items-center gap-1.5">
                        <Star size={16} className="fill-[#F4A62A] text-[#F4A62A]" />
                        <span className="text-[14px] font-bold text-[#17211D]">{dest.rating}</span>
                        <span className="text-[12px] font-medium text-[#66736D]">({dest.reviewCount})</span>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex lg:items-center justify-between lg:justify-start lg:h-[24px]">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider">Budget</span>
                      <div className="flex items-center gap-2">
                        <Wallet size={16} className="text-[#087F5B]" />
                        <span className="text-[14px] font-bold text-[#17211D]">{dest.budget}</span>
                      </div>
                    </div>

                    {/* Best Time */}
                    <div className="flex lg:items-center justify-between lg:justify-start lg:h-[24px]">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider">Best Time</span>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#087F5B]" />
                        <span className="text-[14px] font-semibold text-[#17211D]">{dest.bestTime}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex lg:items-center justify-between lg:justify-start lg:h-[24px]">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider">Duration</span>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#087F5B]" />
                        <span className="text-[14px] font-semibold text-[#17211D]">{dest.duration}</span>
                      </div>
                    </div>

                    {/* Styles */}
                    <div className="flex flex-col lg:pt-2">
                      <span className="lg:hidden text-[12px] font-bold text-[#66736D] uppercase tracking-wider mb-2">Travel Styles</span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.styles.map(s => (
                          <span key={s} className="bg-[#F8FAF9] border border-[#E4EBE7] px-2.5 py-1 rounded-md text-[11px] font-bold text-[#52615A]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-auto p-5 pt-0">
                    <button className="w-full py-2.5 rounded-lg bg-white border border-[#087F5B] text-[#087F5B] font-bold text-[13px] hover:bg-[#087F5B] hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add More Placeholder (if < 3 selected) */}
              {selected.length < 3 && (
                <div className="w-[280px] lg:w-full lg:min-w-[200px] flex-1 bg-[#F8FAF9] rounded-2xl border-2 border-dashed border-[#E4EBE7] flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E4EBE7] flex items-center justify-center mb-3 text-[#087F5B]">
                    <Plus size={20} />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#17211D] mb-1">Add Destination</h4>
                  <p className="text-[12px] text-[#66736D] font-medium">Select another destination from the list to compare.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
