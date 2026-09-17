import Image from "next/image";
import { Sparkles, ArrowRight, Tag } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function AITravelInsight() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-full flex items-center justify-center bg-white rounded-2xl">Loading...</div>;
  }

  const { aiInsight } = dashboardData;

  return (
    <div className="group relative flex h-full min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#073D31] p-6 text-white shadow-lg lg:flex-row">
      {/* Left Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between lg:pr-8">
        <div>
          <h3 className="flex items-center gap-2 font-serif text-[20px] font-bold text-white">
            {aiInsight.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/80 max-w-[400px]">
            {aiInsight.description}
          </p>
        </div>

        <div className="mt-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Recommended for you
          </p>
          <div className="mt-1 flex items-center justify-between lg:justify-start lg:gap-8">
            <h4 className="font-serif text-[28px] text-white">
              {aiInsight.recommendation.name}
            </h4>
            
            {/* AI Match Badge (Mobile visible, Desktop flex) */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F4A934] bg-[#F4A934]/10 backdrop-blur-md">
                <span className="text-[12px] font-bold text-[#F4A934]">
                  {aiInsight.recommendation.match}%
                </span>
              </div>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-white/60">
                AI Match
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {aiInsight.recommendation.tags.map((tag: any) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/90"
              >
                <Tag size={10} className="text-white/40" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F4A934] px-6 text-[13px] font-bold text-[#17211D] transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Explore Recommendation <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Right Image (Desktop only or adjusted for mobile) */}
      <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#073D31] via-[#073D31]/40 to-transparent z-10" />
        <Image
          src={aiInsight.recommendation.image}
          alt={aiInsight.recommendation.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Mobile Image Overlay (Subtle background) */}
      <div className="absolute inset-0 z-0 lg:hidden opacity-20">
        <Image
          src={aiInsight.recommendation.image}
          alt={aiInsight.recommendation.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#073D31]/60" />
      </div>
    </div>
  );
}
