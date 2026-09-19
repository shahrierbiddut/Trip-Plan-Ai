"use client";

import Image from "next/image";
import { ArrowRight, X, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";

interface FoodProps {
  data: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    type: string;
  }[];
  destinationName?: string;
}

export default function FoodDiningSection({ data, destinationName }: FoodProps) {
  if (!data) return null;
  const [isOpen, setIsOpen] = useState(false);
  const title = `Taste of ${destinationName || "Cox's Bazar"}`;
  const featuredImage = data.length > 0 ? data[0].image : "/placeholder.jpg";

  return (
    <div className="pt-4 relative">
      {/* Banner Section */}
      <div className="relative w-full h-[320px] rounded-3xl overflow-hidden group shadow-2xl shadow-[#ff4b1f]/10">
        <Image 
          src={featuredImage} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Colorful Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2522]/95 via-[#0B2522]/60 to-transparent transition-opacity duration-500" />`n        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2522]/90 via-transparent to-transparent transition-opacity duration-500" />
        
        {/* Glassmorphism Content Box */}
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end items-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-[#FFD700]" />
              <span className="text-[#FFD700] text-sm font-bold tracking-widest uppercase">Culinary Journey</span>
            </div>
            <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-md leading-tight">
              Explore local flavors
            </h4>
            <p className="text-white/90 mb-6 text-sm md:text-base drop-shadow-sm font-medium">
              Discover the best culinary experiences and famous local dishes you must try during your trip.
            </p>
            <Button 
              onPress={() => setIsOpen(true)}
              className="bg-white text-[#ff4b1f] hover:bg-[#FFF5F5] font-extrabold h-12 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              View {data.length} Culinary Spots
            </Button>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#3E1106]/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#FFF9F5] w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#FFE8E0] shrink-0">
              <div>
                <h3 className="text-2xl font-serif text-[#3E1106] font-bold">{title}</h3>
                <p className="text-xs text-[#ff4b1f] mt-1 font-medium">Local Delicacies & Restaurants</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-[#FFF5F5] flex items-center justify-center hover:bg-[#FFE8E0] hover:rotate-90 transition-all duration-300">
                <X className="w-5 h-5 text-[#ff4b1f]" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {data.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-[#FFE8E0] overflow-hidden shrink-0 group hover:shadow-xl hover:shadow-[#ff4b1f]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3E1106]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold text-[#ff4b1f] shadow-sm uppercase tracking-wider">
                        {item.type}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="font-bold text-[#3E1106] text-lg mb-2 group-hover:text-[#ff4b1f] transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">{item.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#FFE8E0]/50">
                        <div className="text-sm font-extrabold text-[#ff4b1f]">
                          {item.price}
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#ff4b1f] group-hover:bg-[#ff4b1f] group-hover:text-white transition-all duration-300 shadow-sm">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 border-t border-[#FFE8E0] bg-white flex justify-end shrink-0 rounded-b-3xl">
              <Button className="bg-[#FFF5F5] hover:bg-[#FFE8E0] text-[#ff4b1f] font-bold px-8 rounded-full" onPress={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


