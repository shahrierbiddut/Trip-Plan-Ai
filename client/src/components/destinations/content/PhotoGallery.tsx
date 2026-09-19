"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, ImageIcon, Play, Pause } from "lucide-react";
import { Button } from "@heroui/react";

interface GalleryProps {
  data: string[];
  destinationName?: string;
}

export default function PhotoGallery({ data, destinationName }: GalleryProps) {
  if (!data) return null;
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000); // Changes every 4 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, data.length, isOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsOpen(true);
    setIsAutoPlaying(false); // Pause when lightbox opens
  };

  const closeLightbox = () => setIsOpen(false);

  const nextLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % data.length);
  };

  const prevLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-serif text-[#17211D] font-bold">Stunning Views</h3>
          <p className="text-gray-500 mt-1">Explore {destinationName || "Cox's Bazar"} through photos</p>
        </div>
        <Button 
          className="bg-white border border-gray-200 text-[#087F5B] font-bold hover:bg-[#087F5B] hover:text-white transition-colors hidden md:flex rounded-full shadow-sm"
          onPress={() => openLightbox(0)}
        >
          <ImageIcon className="w-4 h-4 mr-2" /> View All {data.length} Photos
        </Button>
      </div>
      
      {/* Premium Auto-Slider with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-4 h-[400px] md:h-[550px]">
        
        {/* Main Featured Image (Left) */}
        <div className="relative w-full lg:w-3/4 h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group">
          {/* Crossfading Images */}
          {data.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <Image 
                src={img} 
                alt={`Featured view ${idx + 1}`} 
                fill 
                className={`object-cover transition-transform duration-[10000ms] ease-linear ${idx === currentIndex ? 'scale-110' : 'scale-100'}`}
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}

          {/* Controls & Overlays */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             
             {/* Top Right: Autoplay Toggle */}
             <div className="flex justify-end pointer-events-auto">
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/20"
                  title={isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
             </div>

             {/* Bottom: Expand & Info */}
             <div className="flex items-end justify-between pointer-events-auto">
                <div className="text-white drop-shadow-md">
                   <div className="font-bold text-lg">Photo {currentIndex + 1} of {data.length}</div>
                   <div className="text-sm text-white/80">Stunning views of {destinationName}</div>
                </div>
                
                <button 
                  onClick={() => openLightbox(currentIndex)}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-2.5 rounded-full transition-all duration-300 border border-white/30 font-bold text-sm"
                >
                  <Maximize2 className="w-4 h-4" /> Fullscreen
                </button>
             </div>
          </div>

          {/* Progress Bar (Bottom) */}
          {isAutoPlaying && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/20 z-20 w-full">
              <div 
                key={currentIndex} // Re-triggers animation on index change
                className="h-full bg-[#F4A62A]"
                style={{ animation: 'progress 4s linear' }}
              />
            </div>
          )}
        </div>
        
        {/* Thumbnails Sidebar (Right) */}
        <div className="hidden lg:flex w-1/4 h-full flex-col gap-3 overflow-y-auto scrollbar-hide pr-2 pb-2">
          {data.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false); // Pause if user manually clicks
              }}
              className={`relative w-full h-[120px] shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform ${
                currentIndex === idx 
                  ? 'ring-4 ring-[#087F5B] ring-offset-2 scale-[0.98] shadow-lg opacity-100' 
                  : 'opacity-50 hover:opacity-100 hover:scale-[0.98]'
              }`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                fill 
                className="object-cover"
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 bg-black/10" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Thumbnails (Horizontal Scroll) */}
        <div className="flex lg:hidden w-full gap-3 overflow-x-auto scrollbar-hide pb-2">
          {data.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`relative w-28 h-20 shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                currentIndex === idx 
                  ? 'ring-2 ring-[#087F5B] ring-offset-1 opacity-100' 
                  : 'opacity-50'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Premium Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-[#051412]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
          <div className="flex justify-between items-center p-6 text-white z-10 bg-gradient-to-b from-black/50 to-transparent">
            <span className="text-sm font-bold tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20">
              {lightboxIndex + 1} OF {data.length}
            </span>
            <button 
              onClick={closeLightbox}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-12" onClick={closeLightbox}>
            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <div className="relative w-full h-full max-h-[85vh]">
                <Image 
                  src={data[lightboxIndex]}
                  alt={`Photo ${lightboxIndex + 1}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              <button 
                className="absolute left-0 -ml-4 md:-ml-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-50 border border-white/10 group"
                onClick={prevLightboxImage}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                className="absolute right-0 -mr-4 md:-mr-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-50 border border-white/10 group"
                onClick={nextLightboxImage}
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

