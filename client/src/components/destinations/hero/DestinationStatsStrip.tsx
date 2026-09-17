import { Star, MessageSquare, Calendar, Wallet, CloudSun } from "lucide-react";

interface StatsProps {
  rating: number;
  reviews: string;
  recommendedStay: string;
  estimatedBudget: number;
  popularSeason: string;
}

export default function DestinationStatsStrip({
  rating,
  reviews,
  recommendedStay,
  estimatedBudget,
  popularSeason
}: StatsProps) {
  
  const stats = [
    {
      icon: Star,
      value: rating.toString(),
      label: "Rating",
      iconColor: "text-[#F4A62A]",
      bgColor: "bg-gradient-to-br from-[#F4A62A]/20 to-[#FF8C00]/10",
      glow: "shadow-[0_0_15px_rgba(244,166,42,0.3)]"
    },
    {
      icon: MessageSquare,
      value: `${reviews}+`,
      label: "Reviews",
      iconColor: "text-[#087F5B]",
      bgColor: "bg-gradient-to-br from-[#087F5B]/20 to-[#20C997]/10",
      glow: "shadow-[0_0_15px_rgba(8,127,91,0.3)]"
    },
    {
      icon: Calendar,
      value: recommendedStay,
      label: "Recommended Stay",
      iconColor: "text-[#3B82F6]",
      bgColor: "bg-gradient-to-br from-[#3B82F6]/20 to-[#60A5FA]/10",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
    },
    {
      icon: Wallet,
      value: `৳${estimatedBudget.toLocaleString()}+`,
      label: "Estimated Budget",
      iconColor: "text-[#10B981]",
      bgColor: "bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]"
    },
    {
      icon: CloudSun,
      value: popularSeason,
      label: "Popular Season",
      iconColor: "text-[#F43F5E]",
      bgColor: "bg-gradient-to-br from-[#F43F5E]/20 to-[#FB7185]/10",
      glow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]"
    }
  ];

  return (
    <div className="w-full relative z-30 -mt-10 mb-8 px-4 md:px-8 max-w-[1440px] mx-auto">
      <div className="bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,127,91,0.08)] border border-white rounded-[2rem] p-6 md:p-8 transform transition-transform duration-500 hover:-translate-y-1">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 w-full md:w-auto group flex-1">
              <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${stat.glow} border border-white/50`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor} transition-transform group-hover:scale-110`} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#17211D] text-xl md:text-2xl leading-tight mb-0.5">{stat.value}</span>
                <span className="text-[#66736D] text-xs md:text-sm font-semibold tracking-wide uppercase">{stat.label}</span>
              </div>
              {/* Elegant Divider for desktop */}
              {i < stats.length - 1 && (
                <div className="hidden md:block w-[2px] h-14 bg-gradient-to-b from-transparent via-gray-200 to-transparent ml-auto lg:ml-6 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
