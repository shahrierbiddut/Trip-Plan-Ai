"use client";

import Image from "next/image";
import { Star, Heart, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";

interface AccommodationProps {
  data: {
    id: number;
    name: string;
    category: string;
    rating: number;
    location: string;
    priceFrom: number;
    image: string;
    amenities: string[];
  }[];
}

export default function AccommodationSection({ data }: AccommodationProps) {
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
      <div className="relative w-full h-[320px] rounded-3xl overflow-hidden group shadow-2xl shadow-[#087F5B]/10">
        <Image 
          src={featuredImage} 
          alt="Where to Stay" 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Colorful Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2522]/95 via-[#0B2522]/60 to-transparent transition-opacity duration-500" />`n        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2522]/90 via-transparent to-transparent transition-opacity duration-500" />
        
        {/* Glassmorphism Content Box */}
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end items-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#F4A62A]" />
              <span className="text-[#F4A62A] text-sm font-bold tracking-widest uppercase">Premium Stays</span>
            </div>
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-md leading-tight">
              Find your perfect getaway
            </h4>
            <p className="text-white/90 mb-6 text-sm md:text-base drop-shadow-sm font-medium">
              Discover handpicked hotels and luxury resorts with exclusive deals for your comfort and budget.
            </p>
            <Button 
              onPress={() => setIsOpen(true)}
              className="bg-gradient-to-r from-[#F4A62A] to-[#E67E22] text-white shadow-lg shadow-[#E67E22]/40 border-none font-bold h-12 px-8 rounded-full transition-transform hover:scale-105"
            >
              Explore {data.length} Stays
            </Button>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0f2027]/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#F8F9FA] w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100 shrink-0">
              <div>
                <h3 className="text-2xl font-serif text-[#17211D] font-bold">Where to Stay</h3>
                <p className="text-xs text-gray-500 mt-1">Showing {data.length} available accommodations</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 hover:rotate-90 transition-all duration-300">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 md:p-8 flex-1 bg-gradient-to-b from-[#F8F9FA] to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {data.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group flex flex-col sm:flex-row shadow-sm hover:shadow-xl hover:shadow-[#087F5B]/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 overflow-hidden">
                      <Image src={hotel.image} alt={hotel.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button onClick={() => toggleWishlist(hotel.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/60 transition-colors z-10">
                        <Heart className={`w-4 h-4 ${wishlist[hotel.id] ? "fill-red-500 text-red-500" : "text-white"}`} />
                      </button>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-[#17211D] leading-tight text-sm group-hover:text-[#087F5B] transition-colors">{hotel.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] font-bold shrink-0 bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                          {hotel.rating}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mb-3 font-medium">{hotel.location} • {hotel.category}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {hotel.amenities.slice(0,3).map((amenity, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-[9px] font-semibold border border-gray-100">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Starting from</span>
                          <span className="font-extrabold text-sm text-[#17211D]">৳{hotel.priceFrom.toLocaleString()} <span className="font-medium text-[10px] text-gray-500">/night</span></span>
                        </div>
                        <Button className="bg-[#17211D] hover:bg-[#087F5B] text-white font-bold h-8 text-[10px] px-4 rounded-full transition-colors shadow-md">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-white flex justify-end shrink-0 rounded-b-3xl">
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 rounded-full" onPress={() => setIsOpen(false)}>
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


