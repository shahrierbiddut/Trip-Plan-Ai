import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface ItineraryProps {
  data: {
    day: string;
    title: string;
    description: string;
    image: string;
  }[];
}

export default function RecommendedItinerary({ data }: ItineraryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-[#17211D]/5 border border-[#E2E7E3]/60 relative overflow-hidden">
      {/* Subtle top background glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F7F7F2] to-transparent pointer-events-none" />

      <h3 className="text-2xl md:text-3xl font-serif text-[#17211D] font-bold mb-10 relative z-10">
        Recommended 3-Day Itinerary
      </h3>
      
      <div className="relative pl-8 mb-4">
        {/* Vertical Timeline Line */}
        <div className="absolute top-2 bottom-6 left-[11px] w-0.5 bg-gradient-to-b from-[#087F5B]/40 via-[#F4A62A]/40 to-transparent" />
        
        <div className="flex flex-col gap-10">
          {data.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Timeline Dot (Pulse effect on hover) */}
              <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-[#087F5B] z-10 shadow-[0_0_0_4px_white] transition-transform duration-300 group-hover:scale-125 group-hover:border-[#F4A62A]" />
              
              <div className="flex flex-col xl:flex-row gap-5 xl:items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#087F5B]/10 rounded-full text-[11px] font-bold text-[#087F5B] mb-3 tracking-widest uppercase transition-colors group-hover:bg-[#F4A62A]/15 group-hover:text-[#B4740D]">
                    <span className="w-1 h-1 rounded-full bg-current" /> {item.day}
                  </div>
                  <h4 className="font-bold text-[#17211D] text-lg mb-2 group-hover:text-[#087F5B] transition-colors">{item.title}</h4>
                  <p className="text-sm text-[#66736D] leading-relaxed pr-4">{item.description}</p>
                </div>
                
                <div className="w-full xl:w-32 h-40 xl:h-24 shrink-0 relative rounded-xl overflow-hidden shadow-sm border border-black/5">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/plan-trip" className="w-full mt-6 inline-block relative z-10">
        <Button
          className="w-full bg-[#17211D] hover:bg-[#0B2522] text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#F4A62A]" />
          <span>Generate Full AI Itinerary</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
