"use client";

import { useState } from "react";
import Image from "next/image";

interface OverviewProps {
  data: {
    title: string;
    content: string[];
    image: string;
    videoUrl?: string;
  };
}

export default function DestinationOverview({ data }: OverviewProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="overview" className="scroll-mt-32">
      <h2 className="text-3xl md:text-4xl font-serif text-[#17211D] mb-8 font-bold">{data.title}</h2>
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-[#52615A] text-base leading-relaxed mb-5">{data.content[0]}</p>
          <p className="text-[#52615A] text-base leading-relaxed mb-8">{data.content[1]}</p>
          <div>
            <button className="text-[#087F5B] font-bold text-sm tracking-wide uppercase hover:text-[#065F46] hover:underline underline-offset-4 transition-all">
              Read Full Guide →
            </button>
          </div>
        </div>

        <div className="md:w-1/2 min-h-[300px] md:min-h-[350px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
          {!isVideoPlaying ? (
            <>
              <Image 
                src={data.image}
                alt="Overview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 cursor-pointer hover:bg-[#F4A62A] hover:border-[#F4A62A] transition-all duration-300 shadow-xl group-hover:scale-110"
                >
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </button>
              </div>
            </>
          ) : (
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={data.videoUrl || "https://www.youtube.com/embed/tCK3SFQ2gB0?autoplay=1&controls=1&mute=0"} 
              title={`${data.title} Video`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          )}
        </div>

      </div>
    </section>
  );
}
