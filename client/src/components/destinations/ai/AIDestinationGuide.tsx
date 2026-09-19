import { Sparkles } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface AIGuideProps {
  data: {
    match: number;
    bestFor: string[];
    idealTrip: string;
    travelStyle: string;
    recommendation: string;
  };
}

export default function AIDestinationGuide({ data }: AIGuideProps) {
  // Calculate SVG stroke dasharray for the percentage ring
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.match / 100) * circumference;

  return (
    <div className="relative bg-[#091C1A] rounded-2xl p-6 md:p-8 text-white shadow-xl overflow-hidden border border-white/5">
      {/* Subtle Background Pattern / Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A62A]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#087F5B]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Your AI Guide to Cox&apos;s Bazar</h2>
        <p className="text-white/80 mb-8 max-w-2xl text-[13px] md:text-[14px] leading-relaxed">
          Based on traveler preferences and destination patterns,
          <br className="hidden md:block" />
          here&apos;s why Cox&apos;s Bazar is a great match for you.
        </p>

        <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between">
          
          {/* Left Side: Stats and Details */}
          <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 md:gap-8 items-center flex-1 pr-0 xl:pr-4">
            
            {/* AI Match Ring */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Background Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="fill-none stroke-[#1B3631]"
                    strokeWidth="7"
                  />
                  {/* Progress Ring */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="fill-none stroke-[#F4A62A] transition-all duration-1000 ease-out"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                  {/* Small Green Accent on ring (simulated by a small stroke on top) */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="fill-none stroke-[#087F5B]"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (15 / 100) * circumference}
                  />
                </svg>
                <div className="flex flex-col items-center justify-center mt-1">
                  <span className="text-[10px] text-white/90 font-medium mb-0.5">AI Match</span>
                  <span className="text-3xl font-bold text-white tracking-tight">{data.match}%</span>
                </div>
              </div>
            </div>

            {/* Best For Tags */}
            <div className="shrink-0 xl:flex-1 ml-2 md:ml-0">
              <h4 className="text-[#F4A62A] font-bold text-[13px] mb-3">Best For</h4>
              <div className="grid grid-cols-2 gap-2">
                {data.bestFor.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-[#122B27] rounded-full text-[11px] text-white/90 font-medium text-center shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-white/10" />

            {/* Ideal Trip */}
            <div className="shrink-0 min-w-[80px]">
               <h4 className="text-[#F4A62A] font-bold text-[13px] mb-3">Ideal Trip</h4>
               <p className="text-[13px] text-white/90 font-medium">{data.idealTrip}</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-white/10" />

            {/* Travel Style */}
            <div className="shrink-0 min-w-[100px]">
               <h4 className="text-[#F4A62A] font-bold text-[13px] mb-3">Travel Style</h4>
               <p className="text-[13px] text-white/90 font-medium leading-relaxed">
                 {data.travelStyle.split(' / ').map((part, index, array) => (
                   <span key={index}>
                     {index > 0 ? <><br/>/ {part}</> : part}
                   </span>
                 ))}
               </p>
            </div>
            
          </div>

          {/* Right Side: Recommendation Card */}
          <div className="w-full xl:w-[280px] shrink-0">
            <div className="bg-[#122B27] p-6 rounded-2xl flex flex-col justify-between h-full">
               <div className="mb-6">
                 <h4 className="text-[#F4A62A] font-bold text-[13px] mb-3">AI Recommendation</h4>
                 <p className="text-[13px] text-white/90 leading-relaxed font-light">{data.recommendation}</p>
               </div>
               
               <Link href="/plan-trip" className="w-full block mt-auto">
                 <Button 
                   className="w-full bg-[#F4A62A] hover:bg-[#F4B942] text-[#17211D] font-bold transition-all rounded-lg py-5 text-[13px]"
                 >
                   <Sparkles className="w-4 h-4 mr-1.5" /> 
                   Build My Trip
                 </Button>
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
