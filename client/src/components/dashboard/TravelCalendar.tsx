import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

export default function TravelCalendar() {
  const { dashboardData, isLoading } = useDashboard();
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 8, 1)); // Default to Sept 2026 if no trips (month is 0-indexed)

  if (isLoading || !dashboardData) {
    return <div className="h-64 flex items-center justify-center">Loading calendar...</div>;
  }

  // Get upcoming trips and sort them by start date
  const upcomingTrips = (dashboardData.myTrips || [])
    .filter((t: any) => t.status === "Upcoming")
    .map((t: any) => {
      // Parse the date "11 September 2026"
      const parts = String(t.endDate).split(' ');
      let monthIndex = 8; // default sep
      let year = 2026;
      if (parts.length >= 3) {
        monthIndex = new Date(Date.parse(parts[1] +" 1, 2012")).getMonth();
        year = parseInt(parts[2], 10);
      }
      const day = parseInt(t.startDate, 10);
      return {
        ...t,
        parsedDate: new Date(year, monthIndex, day),
        monthStr: parts[1] ? parts[1].substring(0, 3) : "Sep",
        dayStr: t.startDate
      };
    })
    .sort((a: any, b: any) => a.parsedDate.getTime() - b.parsedDate.getTime());

  // Use the first upcoming trip's month for the calendar, or current date if user navigated
  // We'll just stick to currentDate state, but initialize it to first trip if possible.
  // Actually, useEffect might be better for that, but let's just use simple derived state for the calendar view.
  
  const displayYear = currentDate.getFullYear();
  const displayMonth = currentDate.getMonth(); // 0-11
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Calculate calendar grid
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate(); // 28-31

  const handlePrevMonth = () => setCurrentDate(new Date(displayYear, displayMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(displayYear, displayMonth + 1, 1));

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-[20px] font-bold text-gray-900">My Travel Calendar</h2>
        <Link
          href="/dashboard/calendar"
          className="group flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          View Calendar <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex h-full gap-8">
        {/* Left: Upcoming List with modern timeline */}
        <div className="flex flex-1 flex-col justify-center border-r border-gray-100 pr-6 relative">
          <div className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-gray-100 rounded-full" />
          
          <div className="flex flex-col gap-8 relative z-10 max-h-[160px] overflow-y-auto scrollbar-hide">
            {upcomingTrips.length > 0 ? upcomingTrips.map((trip: any, idx: number) => {
              const isFirst = idx === 0;
              return (
                <div key={trip.id} className="group flex items-start gap-5 cursor-pointer">
                  <div className="flex flex-col items-center min-w-[32px]">
                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isFirst ? 'text-amber-500' : 'text-emerald-500'}`}>{trip.monthStr}</span>
                    <span className={`text-[22px] font-black leading-none transition-colors ${isFirst ? 'text-amber-600' : 'text-emerald-600'}`}>{trip.dayStr}</span>
                  </div>
                  <div className={`mt-2.5 h-3 w-3 rounded-full ring-4 ring-white shadow-sm transition-transform group-hover:scale-125 ${isFirst ? 'bg-amber-400 group-hover:bg-amber-500' : 'bg-gray-200 group-hover:bg-emerald-400'}`} />
                  <div className={`flex flex-col pt-1 rounded-xl bg-gray-50/50 p-3 flex-1 transition-all shadow-sm border border-transparent ${isFirst ? 'hover:bg-amber-50 hover:border-amber-100' : 'hover:bg-emerald-50 hover:border-emerald-100'}`}>
                    <span className={`text-[14px] font-bold ${isFirst ? 'text-amber-900' : 'text-emerald-900'}`}>{trip.title}</span>
                    <span className={`text-[12px] font-medium ${isFirst ? 'text-amber-700' : 'text-emerald-700'}`}>{trip.durationString} Trip</span>
                  </div>
                </div>
              );
            }) : (
              <div className="text-sm text-gray-400 text-center py-6">No upcoming trips</div>
            )}
          </div>
        </div>

        {/* Right: Mini Calendar */}
        <div className="flex flex-col w-[180px] justify-center pl-2">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="h-6 w-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"><ChevronLeft size={14} /></button>
            <span className="text-[12px] font-bold text-gray-900">{monthNames[displayMonth]} {displayYear}</span>
            <button onClick={handleNextMonth} className="h-6 w-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"><ChevronRight size={14} /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <span key={`day-${i}`} className="text-[10px] font-bold text-gray-400 mb-1">{day}</span>
            ))}
            
            {/* Empty days padding */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <span key={`empty-${i}`} className="text-transparent">0</span>
            ))}
            
            {/* Days */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
              // Check if this date has a trip
              const tripsOnThisDay = upcomingTrips.filter((t: any) => 
                t.parsedDate.getDate() === date && 
                t.parsedDate.getMonth() === displayMonth && 
                t.parsedDate.getFullYear() === displayYear
              );
              const hasTrip = tripsOnThisDay.length > 0;
              // Just a simple highlight for demo
              return (
                <div key={date} className="relative flex h-7 w-full items-center justify-center cursor-pointer group">
                  {hasTrip && (
                    <div className="absolute inset-y-0.5 w-[calc(100%+4px)] bg-[#087F5B]/10 rounded-full" />
                  )}
                  <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition-all ${
                    hasTrip ? "bg-[#087F5B] text-white font-bold shadow-sm" : 
                    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
                  }`}>
                    {date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
