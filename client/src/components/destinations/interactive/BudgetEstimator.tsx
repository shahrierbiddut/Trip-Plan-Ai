"use client";

import { useState } from "react";
import { Train, Bed, Utensils, Map, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@heroui/react";

interface BudgetProps {
  data: {
    baseTransport: number;
    baseStay: number;
    baseFood: number;
    baseActivities: number;
    baseMisc: number;
  };
}

export default function BudgetEstimator({ data }: BudgetProps) {
  const [travelers, setTravelers] = useState("2");
  const [duration, setDuration] = useState("3");
  const [style, setStyle] = useState("comfort");

  // Simple calculation logic
  const tMultiplier = parseInt(travelers);
  const dMultiplier = parseInt(duration);
  const styleMultiplier = style === "budget" ? 0.7 : style === "premium" ? 1.5 : 1;

  const transport = Math.round(data.baseTransport * tMultiplier * styleMultiplier);
  const stay = Math.round(data.baseStay * dMultiplier * styleMultiplier); 
  const food = Math.round(data.baseFood * tMultiplier * dMultiplier * styleMultiplier);
  const activities = Math.round(data.baseActivities * tMultiplier * styleMultiplier);
  const misc = Math.round(data.baseMisc * dMultiplier * styleMultiplier);
  
  const total = transport + stay + food + activities + misc;

  return (
    <div className="bg-white border border-[#E2E7E3]/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#17211D]/5 relative overflow-hidden">
      {/* Subtle top background glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F7F7F2] to-transparent pointer-events-none" />

      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-8 relative z-10">How much will your trip cost?</h3>
      
      <div className="flex flex-col gap-5 mb-10 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
             <label className="text-[13px] font-bold text-[#17211D] tracking-wide">Travelers</label>
             <select 
               value={travelers}
               onChange={(e) => setTravelers(e.target.value)}
               className="bg-[#FDFDFB] text-[15px] font-medium text-[#17211D] p-3 rounded-xl border border-[#E2E7E3] w-full focus:outline-none focus:ring-2 focus:ring-[#087F5B]/20 focus:border-[#087F5B] transition-all cursor-pointer shadow-sm hover:border-[#087F5B]/40"
             >
               <option value="1">1 Adult</option>
               <option value="2">2 Adults</option>
               <option value="3">3 Adults</option>
               <option value="4">4 Adults</option>
             </select>
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-[13px] font-bold text-[#17211D] tracking-wide">Trip Duration</label>
             <select 
               value={duration}
               onChange={(e) => setDuration(e.target.value)}
               className="bg-[#FDFDFB] text-[15px] font-medium text-[#17211D] p-3 rounded-xl border border-[#E2E7E3] w-full focus:outline-none focus:ring-2 focus:ring-[#087F5B]/20 focus:border-[#087F5B] transition-all cursor-pointer shadow-sm hover:border-[#087F5B]/40"
             >
               <option value="1">1 Day</option>
               <option value="2">2 Days</option>
               <option value="3">3 Days</option>
               <option value="5">5 Days</option>
               <option value="7">1 Week</option>
             </select>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
           <label className="text-[13px] font-bold text-[#17211D] tracking-wide">Travel Style</label>
           <select 
             value={style}
             onChange={(e) => setStyle(e.target.value)}
             className="bg-[#FDFDFB] text-[15px] font-medium text-[#17211D] p-3 rounded-xl border border-[#E2E7E3] w-full focus:outline-none focus:ring-2 focus:ring-[#087F5B]/20 focus:border-[#087F5B] transition-all cursor-pointer shadow-sm hover:border-[#087F5B]/40"
           >
             <option value="budget">Budget (Backpacker)</option>
             <option value="comfort">Comfort (Standard)</option>
             <option value="premium">Premium (Luxury)</option>
           </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {[
          { label: "Transport", icon: Train, amount: transport },
          { label: "Stay", icon: Bed, amount: stay },
          { label: "Food", icon: Utensils, amount: food },
          { label: "Activities", icon: Map, amount: activities },
          { label: "Miscellaneous", icon: HelpCircle, amount: misc },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center group">
            <div className="flex items-center gap-2.5 text-[#66736D] text-[14.5px] font-medium">
               <div className="w-8 h-8 rounded-full bg-[#F7F7F2] flex items-center justify-center group-hover:bg-[#E8F3EF] group-hover:text-[#087F5B] transition-colors">
                 <item.icon className="w-4 h-4" /> 
               </div>
               {item.label}
            </div>
            {/* Dashed Line */}
            <div className="flex-1 mx-4 border-b border-dashed border-[#E2E7E3] opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <span className="font-bold text-[#17211D] text-[15px] tabular-nums">৳{item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-[#E2E7E3] mb-8 flex justify-between items-end relative z-10">
        <div>
           <div className="text-[15px] font-bold text-[#17211D] mb-1">Total Estimated Budget</div>
           <div className="text-[11px] text-[#66736D]">* Estimated cost for {travelers} traveler(s)</div>
        </div>
        <div className="text-3xl font-bold text-[#0B2522] tabular-nums tracking-tight">
          ৳{total.toLocaleString()}<span className="text-[#F4A62A]">+</span>
        </div>
      </div>

      <Button
        className="w-full bg-[#0B2522] hover:bg-[#163D36] text-white font-bold rounded-xl py-7 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-[15px] tracking-wide relative z-10"
      >
        <CheckCircle2 className="w-5 h-5 mr-1" />
        Create My Budget
      </Button>
    </div>
  );
}
