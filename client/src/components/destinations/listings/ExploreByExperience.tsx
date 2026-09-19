"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreByExperience() {
  const experiences = [
    {
      title: "Beach\nEscapes",
      count: "18 DESTINATIONS",
      image: "/assets/Coxs/cover-1.jpg",
    },
    {
      title: "Mountain\nAdventures",
      count: "24 DESTINATIONS",
      image: "/assets/hero-bg.jpg",
    },
    {
      title: "Family\nGetaways",
      count: "15 DESTINATIONS",
      image: "/assets/Sylhet/cover-1.jpg",
    },
    {
      title: "Romantic\nEscapes",
      count: "12 DESTINATIONS",
      image: "/assets/Sajek/cover-1.jpg",
    },
    {
      title: "Nature\nRetreats",
      count: "20 DESTINATIONS",
      image: "/assets/sreemangal/cover-1.webp",
    },
    {
      title: "Cultural\nJourneys",
      count: "16 DESTINATIONS",
      image: "/assets/Sundarban/cover-1.jpg",
    }
  ];

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-[22px] font-bold text-[#17211D]">
          Explore by Experience
        </h2>
        <Link 
          href="/travel-categories" 
          className="text-[13px] font-bold text-[#087F5B] hover:text-[#065F46] transition-colors flex items-center gap-1.5"
        >
          View All Categories <ArrowRight size={14} />
        </Link>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5 sm:mx-0 sm:px-0">
        {experiences.map((exp) => (
          <Link
            key={exp.title}
            href={`/destinations?style=${exp.title.replace('\n', ' ').split(' ')[0].toLowerCase()}`}
            className="group relative flex-none w-[160px] sm:w-[180px] lg:w-[calc(16.666%-14px)] h-[220px] sm:h-[240px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Background Image */}
            <Image
              src={exp.image}
              alt={exp.title.replace('\n', ' ')}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 160px, 16vw"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A16] via-[#0B1A16]/50 to-black/10 opacity-90 transition-opacity group-hover:opacity-100" />
            
            {/* Content (Bottom Left) */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-start justify-end h-full">
              <h3 className="text-[18px] sm:text-[20px] font-serif text-white font-bold leading-tight mb-1.5 whitespace-pre-line">
                {exp.title}
              </h3>
              
              <p className="text-[9px] sm:text-[10px] font-bold text-[#F4A62A] tracking-wider mb-4 uppercase">
                {exp.count}
              </p>
              
              <div className="w-7 h-7 rounded-full bg-[#F4A62A] flex items-center justify-center text-[#0B2522] transform transition-transform group-hover:scale-110 group-hover:bg-[#F4B942]">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
