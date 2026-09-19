import { Sparkles, Heart } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

interface FinalCTAProps {
  name: string;
  image?: string;
}

export default function FinalCTA({ name, image }: FinalCTAProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden mt-16 mb-8 border border-[#E2E7E3] shadow-lg">
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/assets/Coxs/cover-4.jpg"}
          alt="CTA Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B2522]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2522]/90 to-transparent" />
      </div>

      <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center text-center text-white">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
           <Sparkles className="w-8 h-8 text-[#F4A62A]" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Ready to Explore {name}?
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-medium leading-relaxed">
          Let TRIP PLAN AI build a personalized journey around your time, budget, and travel style.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/plan-trip" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto bg-[#F4A62A] hover:bg-[#F4B942] text-[#17211D] font-bold px-10 py-7 rounded-xl text-lg shadow-xl shadow-[#F4A62A]/20"
            >
              <Sparkles className="w-5 h-5 mr-2" /> Plan My {name} Trip
            </Button>
          </Link>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold px-8 py-7 rounded-xl backdrop-blur-sm"
          >
            <Heart className="w-5 h-5 mr-2" /> Save Destination
          </Button>
        </div>
      </div>
    </div>
  );
}
