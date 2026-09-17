import Image from "next/image";
import { CalendarDays, Compass, Eye, Edit2, Share2, Download } from "lucide-react";
import { Trip } from "@/types/dashboardTrip";

export default function TripCard({ trip }: { trip: Trip }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-[#087F5B] text-white";
      case "Completed":
        return "bg-[#66736D] text-white";
      case "Draft":
        return "bg-[#F4A934] text-[#17211D]";
      default:
        return "bg-white/20 text-white";
    }
  };

  return (
    <div className="group relative flex h-[320px] w-full min-w-[280px] flex-col overflow-hidden rounded-2xl bg-white border border-[#E2E7E3] shadow-sm transition-all hover:shadow-md">
      {/* Image Area */}
      <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-t-2xl">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#073D31] via-[#073D31]/60 to-transparent opacity-90" />
        
        {/* Status Badge */}
        <div className="absolute left-4 top-4">
          <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(trip.status)}`}>
            {trip.status}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h4 className="text-[16px] font-bold">{trip.title}</h4>
          
          <div className="mt-2 flex items-center gap-3 text-[11px] font-medium text-white/80">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} className="text-white/60" />
              {trip.startDate} – {trip.endDate}
            </span>
          </div>
          
          <div className="mt-1.5 flex items-center gap-3 text-[11px] font-medium text-white/80">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} className="text-white/60" />
              {trip.durationString}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass size={12} className="text-white/60" />
              {trip.travelStyle}
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-[15px] font-bold text-[#F4A934]">
              ৳{trip.budget.toLocaleString()}
            </span>
            {/* AI Match */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#087F5B] bg-[#073D31]/80 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-white">{trip.aiMatch}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="flex h-[80px] items-center justify-around bg-white px-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#66736D] transition-colors hover:bg-black/5 hover:text-[#073D31]">
          <Eye size={18} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#66736D] transition-colors hover:bg-black/5 hover:text-[#073D31]">
          <Edit2 size={18} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#66736D] transition-colors hover:bg-black/5 hover:text-[#073D31]">
          <Share2 size={18} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#66736D] transition-colors hover:bg-black/5 hover:text-[#073D31]">
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
