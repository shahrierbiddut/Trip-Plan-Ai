import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";

interface MarineDriveProps {
  data: {
    title: string;
    description: string;
    image: string;
    highlights: string[];
  };
}

export default function MarineDriveFeature({ data }: MarineDriveProps) {
  if (!data) return null;
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mt-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
        />
        {/* Dark Green gradient overlay to make text readable on left, while image is visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091C1A]/95 via-[#091C1A]/70 to-[#091C1A]/10" />
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-3xl flex flex-col items-start text-white">
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">{data.title}</h3>
        <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
          {data.description}
        </p>
        
        <div className="flex flex-col gap-3 mb-10">
          {data.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        <Button
          className="bg-[#F4A62A] hover:bg-[#F4B942] text-[#17211D] font-bold px-8 py-6 rounded-lg text-sm"
        >
          Explore {data.title} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

