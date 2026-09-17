"use client";

import Image from "next/image";
import { Star, Heart, ArrowRight, X, Compass } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface TopPlacesProps {
  data: {
    id: number;
    slug?: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    tags: string[];
  }[];
}

export default function TopPlacesToExplore({ data }: TopPlacesProps) {
  if (!data) return null;
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredImage = data.length > 0 ? data[0].image : "/placeholder.jpg";

  return (
    <div className="pt-4 relative">
      {/* Banner Section */}
      <div className="relative w-full h-[320px] rounded-3xl overflow-hidden group shadow-2xl shadow-[#11998e]/10">
        <Image 
          src={featuredImage} 
          alt="Top Places" 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Colorful Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2522]/95 via-[#0B2522]/60 to-transparent transition-opacity duration-500" />`n        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2522]/90 via-transparent to-transparent transition-opacity duration-500" />
        
        {/* Glassmorphism Content Box */}
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end items-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-[#E0F7FA]" />
              <span className="text-[#E0F7FA] text-sm font-bold tracking-widest uppercase">Must Visit</span>
            </div>
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-md leading-tight">
              Breathtaking Destinations
            </h4>
            <p className="text-white/90 mb-6 text-sm md:text-base drop-shadow-sm font-medium">
              Explore hidden gems, famous landmarks, and the most iconic places in the region for an unforgettable adventure.
            </p>
            <Button 
              onPress={() => setIsOpen(true)}
              className="bg-white text-[#11998e] hover:bg-[#E0F2F1] font-extrabold h-12 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Explore {data.length} Attractions
            </Button>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#00251A]/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#F4FBFA] w-full max-w-7xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#E0F2F1] shrink-0">
              <div>
                <h3 className="text-2xl font-serif text-[#004D40] font-bold">Top Places to Explore</h3>
                <p className="text-xs text-[#00796B] mt-1 font-medium">Curated landmarks and viewpoints</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center hover:bg-[#B2DFDB] hover:rotate-90 transition-all duration-300">
                <X className="w-5 h-5 text-[#00695C]" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 flex-1 bg-gradient-to-b from-[#F4FBFA] to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {data.map((place) => (
                  <div key={place.id} className="bg-white rounded-3xl border border-[#E0F2F1] overflow-hidden group shadow-md hover:shadow-2xl hover:shadow-[#00796B]/15 hover:-translate-y-2 transition-all duration-400">
                    <Link href={place.slug ? `/places/${place.slug}` : "#"} className="block relative h-56 w-full overflow-hidden">
                      <Image src={place.image} alt={place.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00251A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(place.id); }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/90 transition-all shadow-sm z-10 group/btn">
                      <Heart className={`w-5 h-5 transition-colors ${wishlist[place.id] ? "fill-red-500 text-red-500" : "text-white group-hover/btn:text-red-500"}`} />
                    </button>
                    
                    <div className="p-6">
                      <Link href={place.slug ? `/places/${place.slug}` : "#"} className="block">
                        <h4 className="font-bold text-[#004D40] text-xl mb-2 group-hover:text-[#00796B] transition-colors">{place.title}</h4>
                        <p className="text-[14px] text-[#4DB6AC] mb-5 line-clamp-2 leading-relaxed">{place.description}</p>
                        
                        <div className="flex items-center gap-1.5 text-[14px] text-[#00695C] font-extrabold mb-5 bg-[#E0F2F1] w-fit px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-[#F4A62A] text-[#F4A62A]" />
                          {place.rating} Rating
                        </div>
                      </Link>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-[#E0F2F1]">
                        <div className="text-[11px] text-[#00796B] flex flex-wrap gap-1.5 items-center">
                          <span className="font-bold uppercase tracking-wider mr-1">Best for:</span>
                          {place.tags.slice(0,2).map((tag, i) => (
                            <span key={i} className="bg-white shadow-sm px-2.5 py-1 rounded-md font-bold border border-[#B2DFDB]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={place.slug ? `/places/${place.slug}` : "#"}>
                          <Button className="font-bold bg-[#00695C] text-white hover:bg-[#004D40] rounded-full px-5 h-9 border-none transition-all shadow-md hover:shadow-lg">
                            Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 border-t border-[#E0F2F1] bg-white flex justify-end shrink-0 rounded-b-3xl">
              <Button className="bg-[#E0F2F1] text-[#00695C] hover:bg-[#B2DFDB] font-bold px-8 rounded-full" onPress={() => setIsOpen(false)}>
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


