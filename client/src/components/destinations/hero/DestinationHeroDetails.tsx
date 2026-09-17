import { Star, MapPin, Sparkles, Heart, Share2, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface DestinationHeroProps {
  data: {
    name: string;
    country: string;
    subtitle: string;
    description: string;
    heroImage: string;
    rating: number;
    reviewCount: string;
    aiMatch: number;
    tags: string[];
  };
  handleBookmark: () => Promise<{ success: boolean; message: string }>;
}

export default function DestinationHeroDetails({ data, handleBookmark }: DestinationHeroProps) {
  return (
    <div className="relative w-full h-[85vh] min-h-[650px] flex flex-col justify-end overflow-hidden group">
      {/* Background Image with subtle zoom effect */}
      <div className="absolute inset-0 z-0 transition-transform duration-[10000ms] group-hover:scale-105">
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        {/* Premium Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020C0A] via-[#041714]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020C0A]/90 via-[#0B2522]/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-16 md:pb-20 flex flex-col md:flex-row justify-between items-end gap-12">
        
        {/* Left Content */}
        <div className="max-w-3xl w-full">
          {/* Glassmorphism Breadcrumb */}
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs text-white/90 mb-8 font-medium shadow-lg">
            <Link href="/" className="hover:text-[#F4A62A] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link href="/destinations" className="hover:text-[#F4A62A] transition-colors">Destinations</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white font-bold">{data.name}</span>
          </nav>

          {/* Country Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-4 bg-green-600 rounded-[2px] shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
               </div>
            </div>
            <span className="text-white font-extrabold tracking-[0.2em] text-xs uppercase text-shadow-sm">{data.country}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif text-white mb-4 leading-[1.1] drop-shadow-lg">
            {data.name}
          </h1>
          <p className="text-2xl md:text-3xl text-[#F4A62A] font-serif italic mb-8 drop-shadow-md">
            {data.subtitle}
          </p>
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-light drop-shadow-sm">
            {data.description}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-white mb-10">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
              <Star className="w-4 h-4 fill-[#F4A62A] text-[#F4A62A]" />
              <span className="font-bold text-white">{data.rating}</span>
              <span className="text-white/60 font-medium">({data.reviewCount} Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
              <MapPin className="w-4 h-4 text-[#4DB6AC]" />
              <span className="font-bold">{data.country}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg font-bold">
              <Sparkles className="w-4 h-4 text-[#F4A62A]" />
              {data.tags}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/plan-trip">
              <Button
                className="bg-gradient-to-r from-[#F4A62A] to-[#E67E22] hover:shadow-[0_0_20px_rgba(244,166,42,0.4)] text-white font-extrabold px-10 py-7 rounded-full text-base border-none transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" /> Plan Your Trip
              </Button>
            </Link>
            
            <Button
            onClick={handleBookmark}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-bold px-8 py-7 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Heart className="w-5 h-5 mr-2" /> Save
            </Button>
          </div>
        </div>

        {/* Right Content - Floating AI Match Card */}
        <div className="hidden lg:block w-80 shrink-0 relative z-20">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#087F5B] to-[#F4A62A] rounded-[2rem] blur opacity-30 animate-pulse" />
          <div className="relative bg-[#051412]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 text-white shadow-2xl transform transition-transform duration-500 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[#F4A62A] font-extrabold text-sm uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                AI Match
              </div>
              <Share2 className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-7xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{data.aiMatch}</div>
              <span className="text-3xl font-bold text-[#F4A62A]">%</span>
            </div>
            <p className="text-xs text-[#4DB6AC] mb-8 font-bold uppercase tracking-wider">Matched to your profile</p>
            
            <div className="space-y-4">
              {["Perfect for Relaxation", "Top Family Destination", "Amazing Seafood", "Nature Trails"].map((pref, i) => (
                <div key={i} className="flex items-center gap-3 text-sm group">
                  <div className="w-5 h-5 rounded-full bg-[#087F5B]/20 border border-[#087F5B]/50 flex items-center justify-center shrink-0 group-hover:bg-[#087F5B] transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-[#4DB6AC] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{pref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
