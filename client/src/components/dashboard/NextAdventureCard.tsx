import Image from "next/image";
import { Sparkles, Calendar, Users, Wallet, CalendarDays, ArrowRight } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function NextAdventureCard() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-64 flex items-center justify-center bg-white rounded-2xl">Loading...</div>;
  }

  const trip = dashboardData.nextAdventure;

  return (
    <div className="group relative flex h-[280px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#073D31] text-white shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={trip.image}
          alt={trip.destination}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#073D31] via-[#073D31]/80 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        {/* Top Info */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
            Your Next Adventure
          </p>
          <h3 className="mt-1 font-serif text-3xl text-white">
            {trip.destination}
          </h3>
          <p className="mt-1 text-[13px] font-medium text-white/90">
            {trip.startDate} – {trip.endDate}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-[11px] font-medium text-white/80">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-white/60" />
              {trip.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-white/60" />
              {trip.group}
            </div>
          </div>
        </div>

        {/* Bottom Info & Actions */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Estimated Budget
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#F4A934]">
              {trip.budget}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#F4A934] px-5 text-[12px] font-bold text-[#17211D] transition-colors hover:bg-[#F5B13E]">
                View Trip <ArrowRight size={14} />
              </button>
              <button className="flex h-10 items-center justify-center rounded-lg border border-white/20 px-5 text-[12px] font-bold text-white transition-colors hover:bg-white/10">
                Edit Plan
              </button>
            </div>
          </div>

          {/* AI Match Badge */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] border-[#087F5B] bg-[#073D31]/50 backdrop-blur-md">
              <span className="text-[15px] font-bold text-white">
                {trip.aiMatch}%
              </span>
            </div>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/60">
              AI Match
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
