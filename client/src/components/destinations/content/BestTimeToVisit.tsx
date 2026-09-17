import { Sun, CloudRain, TreePine, Leaf, Sparkles } from "lucide-react";

interface BestTimeProps {
  data: {
    season: string;
    weather: string;
    recommended: boolean;
    icon: string;
  }[];
}

const iconMap: Record<string, React.ElementType> = {
  sun: Sun,
  cloudRain: CloudRain,
  treePine: TreePine,
  leaf: Leaf,
};

export default function BestTimeToVisit({ data }: BestTimeProps) {
  return (
    <div className="pt-4">
      <h3 className="text-3xl font-serif text-[#17211D] font-bold mb-8">Best Time to Visit</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon] || Sun;
          const isRec = item.recommended;
          return (
            <div 
              key={index} 
              className={`p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all duration-500 group flex flex-col h-full min-h-[220px] ${
                isRec 
                  ? "bg-[#091C1A] border border-white/10 shadow-2xl hover:shadow-[0_20px_40px_rgba(9,28,26,0.3)] hover:-translate-y-2" 
                  : "bg-white border border-[#E2E7E3] shadow-sm hover:shadow-xl hover:border-[#087F5B]/30 hover:-translate-y-2"
              }`}
            >
              {/* Background Watermark Icon */}
              <div className={`absolute -bottom-6 -right-6 pointer-events-none transition-transform duration-700 group-hover:scale-125 ${
                isRec ? "text-white/5" : "text-[#17211D]/[0.03]"
              }`}>
                 <Icon className="w-48 h-48" strokeWidth={0.7} />
              </div>
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <h4 className={`text-xl font-bold tracking-tight ${isRec ? 'text-white' : 'text-[#17211D]'}`}>
                  {item.season}
                </h4>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  isRec ? "bg-[#F4A62A] text-[#17211D]" : "bg-[#F7F7F2] text-[#087F5B]"
                }`}>
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
              </div>
              
              <p className={`text-[15px] leading-relaxed mb-12 relative z-10 ${isRec ? 'text-white/80' : 'text-[#66736D]'}`}>
                {item.weather}
              </p>
              
              {isRec && (
                <div className="absolute bottom-6 left-6 z-10 mt-auto">
                   <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F4A62A]/10 text-[#F4A62A] border border-[#F4A62A]/20 text-xs font-bold tracking-wide uppercase rounded-full backdrop-blur-sm shadow-sm">
                     <Sparkles className="w-3.5 h-3.5" /> Highly Recommended
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
