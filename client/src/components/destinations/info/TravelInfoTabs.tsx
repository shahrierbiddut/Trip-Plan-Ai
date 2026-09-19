"use client";

import { useState } from "react";
import { Plane, Bus, Cloud, Shield, Wifi, Banknote, CarTaxiFront, Umbrella } from "lucide-react";

interface TravelInfoProps {
  data: {
    gettingThere: {
      air: string;
      road: string;
    };
    gettingAround: {
      options: string;
    };
    weather: string;
    safety: string;
    internet: string;
    currency: string;
  };
}

export default function TravelInfoTabs({ data }: TravelInfoProps) {
  const [activeTab, setActiveTab] = useState("getting-there");

  const tabs = [
    { id: "getting-there", label: "Getting There" },
    { id: "getting-around", label: "Getting Around" },
    { id: "weather", label: "Weather" },
    { id: "essentials", label: "Essentials" }
  ];

  return (
    <div className="pt-6 relative">
      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-8">Travel Information</h3>
      
      {/* Desktop Tabs as Pills */}
      <div className="hidden md:flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-[14px] font-bold rounded-full whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id 
                ? "bg-[#0B2522] text-white shadow-md shadow-[#0B2522]/20" 
                : "bg-transparent border border-[#E2E7E3] text-[#66736D] hover:bg-[#F7F7F2] hover:text-[#17211D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Container */}
      <div className="bg-white rounded-3xl border border-[#E2E7E3]/60 p-8 shadow-xl shadow-[#17211D]/5 min-h-[250px] relative overflow-hidden">
        
        {/* Decorative corner accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#087F5B]/5 to-transparent rounded-full blur-[20px] pointer-events-none" />

        {/* Mobile Dropdown */}
        <div className="md:hidden mb-8">
           <select 
             className="w-full bg-[#FDFDFB] border border-[#E2E7E3] rounded-xl p-3.5 text-sm font-bold text-[#17211D] focus:ring-2 focus:ring-[#087F5B]/20 focus:border-[#087F5B] transition-all shadow-sm"
             value={activeTab}
             onChange={(e) => setActiveTab(e.target.value)}
           >
             {tabs.map((tab) => (
               <option key={tab.id} value={tab.id}>{tab.label}</option>
             ))}
           </select>
        </div>

        {activeTab === "getting-there" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300 relative z-10">
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-full bg-[#F4A62A]/10 text-[#F4A62A] border border-[#F4A62A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F4A62A] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Plane className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-[#17211D] text-[15px] mb-2 tracking-wide">By Air</h4>
                <p className="text-[14px] text-[#66736D] leading-relaxed max-w-2xl">{data.gettingThere.air}</p>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-full bg-[#087F5B]/10 text-[#087F5B] border border-[#087F5B]/20 flex items-center justify-center shrink-0 group-hover:bg-[#087F5B] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Bus className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-[#17211D] text-[15px] mb-2 tracking-wide">By Road</h4>
                <p className="text-[14px] text-[#66736D] leading-relaxed max-w-2xl">{data.gettingThere.road}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "getting-around" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300 relative z-10">
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-full bg-[#F4A62A]/10 text-[#F4A62A] border border-[#F4A62A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F4A62A] group-hover:text-white transition-colors duration-300 shadow-sm">
                <CarTaxiFront className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-[#17211D] text-[15px] mb-2 tracking-wide">Local Transport</h4>
                <p className="text-[14px] text-[#66736D] leading-relaxed max-w-2xl">{data.gettingAround.options}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "weather" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300 relative z-10">
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-full bg-[#087F5B]/10 text-[#087F5B] border border-[#087F5B]/20 flex items-center justify-center shrink-0 group-hover:bg-[#087F5B] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Umbrella className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-[#17211D] text-[15px] mb-2 tracking-wide">Climate & Conditions</h4>
                <p className="text-[14px] text-[#66736D] leading-relaxed max-w-2xl">{data.weather}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "essentials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 animate-in fade-in duration-300 relative z-10">
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#F4A62A]/10 text-[#F4A62A] border border-[#F4A62A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F4A62A] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h4 className="font-bold text-[#17211D] text-[14px] mb-1.5 tracking-wide">Safety</h4>
                <p className="text-[13px] text-[#66736D] leading-relaxed">{data.safety}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#087F5B]/10 text-[#087F5B] border border-[#087F5B]/20 flex items-center justify-center shrink-0 group-hover:bg-[#087F5B] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Wifi className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h4 className="font-bold text-[#17211D] text-[14px] mb-1.5 tracking-wide">Internet</h4>
                <p className="text-[13px] text-[#66736D] leading-relaxed">{data.internet}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#F4A62A]/10 text-[#F4A62A] border border-[#F4A62A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F4A62A] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h4 className="font-bold text-[#17211D] text-[14px] mb-1.5 tracking-wide">Currency</h4>
                <p className="text-[13px] text-[#66736D] leading-relaxed">{data.currency}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
