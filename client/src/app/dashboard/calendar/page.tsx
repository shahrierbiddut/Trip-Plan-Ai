"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  Download,
  Plus,
  Compass,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  Utensils,
  Car,
  Bed,
  Camera,
  Sun,
  Filter,
  Eye,
  CalendarDays
} from "lucide-react";

// Safe date helper to completely prevent "Invalid time value" crashes
const parseSafeDate = (val: any): Date => {
  if (!val) return new Date();
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};

const formatDisplayDate = (date: Date): string => {
  try {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return "Invalid Date";
  }
};

const formatMonthYear = (date: Date): string => {
  try {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  } catch {
    return "September 2026";
  }
};

// Vibrant color themes for different trips
const TRIP_THEMES = [
  {
    bg: "bg-emerald-500",
    border: "border-emerald-600",
    lightBg: "bg-emerald-50",
    text: "text-emerald-700",
    gradient: "from-emerald-600 to-teal-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500"
  },
  {
    bg: "bg-amber-500",
    border: "border-amber-600",
    lightBg: "bg-amber-50",
    text: "text-amber-700",
    gradient: "from-amber-500 to-orange-600",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500"
  },
  {
    bg: "bg-sky-500",
    border: "border-sky-600",
    lightBg: "bg-sky-50",
    text: "text-sky-700",
    gradient: "from-sky-500 to-blue-600",
    badge: "bg-sky-100 text-sky-800 border-sky-200",
    dot: "bg-sky-500"
  },
  {
    bg: "bg-violet-500",
    border: "border-violet-600",
    lightBg: "bg-violet-50",
    text: "text-violet-700",
    gradient: "from-violet-600 to-purple-700",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    dot: "bg-violet-500"
  },
  {
    bg: "bg-rose-500",
    border: "border-rose-600",
    lightBg: "bg-rose-50",
    text: "text-rose-700",
    gradient: "from-rose-500 to-pink-600",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    dot: "bg-rose-500"
  }
];

const ACTIVITY_TAG_CONFIG: Record<string, { icon: React.FC<any>; color: string; bg: string }> = {
  sightseeing: { icon: Camera, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
  meal: { icon: Utensils, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  transfer: { icon: Car, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  hotel: { icon: Bed, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  activity: { icon: Sun, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" }
};

const TripDetailCard = ({ trip, selectedDate }: { trip: any, selectedDate: Date }) => {
  const currentDayIndexInTrip = useMemo(() => {
    if (!trip) return 1;
    const sTime = new Date(trip.startDate.getFullYear(), trip.startDate.getMonth(), trip.startDate.getDate()).getTime();
    const curTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
    const diffDays = Math.floor((curTime - sTime) / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays >= 1 && diffDays <= trip.daysCount) return diffDays;
    return 1;
  }, [trip, selectedDate]);

  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  useEffect(() => {
    setActiveDayTab(currentDayIndexInTrip);
  }, [currentDayIndexInTrip, selectedDate]);

  if (!trip) return null;

  return (
    <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 first:border-0 first:mt-0 first:pt-0">
      {/* Destination Thumbnail & Name */}
      <div className="relative rounded-2xl overflow-hidden h-28 mb-4 group">
        <img
          src={trip.destImage}
          alt={trip.destinationName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4A934]">
              {trip.formState?.travelerType || "Vacation"}
            </p>
            <h4 className="text-lg font-bold font-serif leading-tight">
              {trip.destinationName}
            </h4>
          </div>
          <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
            Day {activeDayTab} of {trip.daysCount}
          </span>
        </div>
      </div>

      {/* Quick Day Selector Tabs */}
      <div className="mb-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Select Itinerary Day:
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {Array.from({ length: trip.daysCount || 1 }).map((_, idx) => {
            const dNumber = idx + 1;
            const isActive = activeDayTab === dNumber;
            return (
              <button
                key={dNumber}
                onClick={() => setActiveDayTab(dNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#087F5B] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Day {dNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Activities List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700">
            Day {activeDayTab} Schedule
          </span>
          <span className="text-[11px] text-gray-400">
            {trip.plan?.itinerary?.[activeDayTab - 1]?.title || "Daily Exploration"}
          </span>
        </div>

        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {trip.plan?.itinerary?.[activeDayTab - 1]?.activities?.map(
            (act: any, aIdx: number) => {
              const tag = act.tag?.toLowerCase() || "activity";
              const config = ACTIVITY_TAG_CONFIG[tag] || ACTIVITY_TAG_CONFIG.activity;
              const TagIcon = config.icon;

              return (
                <div
                  key={aIdx}
                  className="p-3 bg-gray-50/80 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all shadow-2xs group"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${config.bg} ${config.color}`}
                    >
                      <TagIcon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <Clock size={10} /> {act.time || "Flexible"}
                        </span>
                        {act.cost > 0 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                            ৳{act.cost.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-gray-800 truncate mt-0.5">
                        {act.title}
                      </p>
                      {act.location && (
                        <p className="text-[10px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="shrink-0 text-gray-400" />
                          {act.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          ) || (
            <div className="p-4 text-center bg-gray-50 rounded-xl text-xs text-gray-400">
              No activities scheduled for this day yet.
            </div>
          )}
        </div>

        {/* Full Trip Link */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={`/dashboard/trips/${trip._id}`}
            className="text-xs font-bold text-[#087F5B] hover:text-[#066548] flex items-center gap-1 hover:underline"
          >
            Open Full Trip Page
            <ArrowRight size={13} />
          </Link>

          <Link
            href="/dashboard/budget"
            className="text-xs font-medium text-gray-500 hover:text-gray-800"
          >
            Track Expenses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function CalendarPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "timeline" | "schedule">("calendar");

  // Fetch Trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session?.user?.id) {
          setLoading(false);
          return;
        }

        const url = process.env.NEXT_PUBLIC_API_URL?.replace("localhost", "127.0.0.1") || "http://127.0.0.1:5000";
        const response = await fetch(`${url}/api/trips/user/${session.user.id}`);
        if (!response.ok) throw new Error("Failed to fetch trips");
        const resData = await response.json();

        if (resData.success && Array.isArray(resData.data)) {
          const sorted = resData.data.sort(
            (a: any, b: any) => parseSafeDate(a.createdAt).getTime() - parseSafeDate(b.createdAt).getTime()
          );
          setTrips(sorted);
          if (sorted.length > 0) {
            setSelectedTrip(sorted[0]);
            // Jump calendar to first trip start date if available
            const firstTripStart = parseSafeDate(sorted[0].formState?.startDate || sorted[0].createdAt);
            setCurrentDate(new Date(firstTripStart.getFullYear(), firstTripStart.getMonth(), 1));
            setSelectedDate(firstTripStart);
          }
        }
      } catch (error) {
        console.error("Failed to fetch calendar trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Compute trip dates mapping with safe fallbacks
  const enrichedTrips = useMemo(() => {
    return trips.map((trip, idx) => {
      const theme = TRIP_THEMES[idx % TRIP_THEMES.length];
      const startDate = parseSafeDate(trip.formState?.startDate || trip.createdAt);
      const daysCount = Number(trip.days) || trip.plan?.itinerary?.length || 3;
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + (daysCount - 1));

      // Calculate total itinerary activities & cost
      let totalActivities = 0;
      let totalCost = trip.plan?.budget?.total || 0;
      if (trip.plan?.itinerary) {
        trip.plan.itinerary.forEach((day: any) => {
          if (day.activities) {
            totalActivities += day.activities.length;
          }
        });
      }

      const destImage = 
        trip.destination?.image || 
        trip.plan?.itinerary?.[0]?.activities?.[0]?.image ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80";

      return {
        ...trip,
        theme,
        startDate,
        endDate,
        daysCount,
        totalActivities,
        totalCost,
        destImage,
        destinationName: trip.destination?.name || trip.title || "Adventure Trip"
      };
    });
  }, [trips]);

  // Calendar Grid calculations
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      days.push({
        date: d,
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        tripsHere: []
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const d = new Date(year, month, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      // Check which trips fall on this date
      const tripsHere = enrichedTrips.filter((t) => {
        const dTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const sTime = new Date(t.startDate.getFullYear(), t.startDate.getMonth(), t.startDate.getDate()).getTime();
        const eTime = new Date(t.endDate.getFullYear(), t.endDate.getMonth(), t.endDate.getDate()).getTime();
        return dTime >= sTime && dTime <= eTime;
      });

      days.push({
        date: d,
        dayNumber: day,
        isCurrentMonth: true,
        isToday,
        tripsHere
      });
    }

    // Next month padding to fill a complete 35 or 42 grid
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: false,
        tripsHere: []
      });
    }

    return days;
  }, [currentDate, enrichedTrips]);

  // Next / Previous Month Navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const jumpToToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  // Find trips happening on selected date
  const selectedDateTrips = useMemo(() => {
    const sTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getTime();
    return enrichedTrips.filter((t) => {
      const st = new Date(t.startDate.getFullYear(), t.startDate.getMonth(), t.startDate.getDate()).getTime();
      const et = new Date(t.endDate.getFullYear(), t.endDate.getMonth(), t.endDate.getDate()).getTime();
      return sTime >= st && sTime <= et;
    });
  }, [selectedDate, enrichedTrips]);

  // Active trips for detail drawer (defaults to matching selected date or overall selectedTrip)
  const displayTrips = selectedDateTrips.length > 0 
    ? selectedDateTrips 
    : (selectedTrip ? [selectedTrip] : (enrichedTrips.length > 0 ? [enrichedTrips[0]] : []));

  // Active trip for detail drawer fallback (used in schedule/timeline views)
  const activeDetailTrip = displayTrips[0];

  // Top overall stats
  const stats = useMemo(() => {
    const totalTrips = enrichedTrips.length;
    const totalDays = enrichedTrips.reduce((acc, t) => acc + (t.daysCount || 0), 0);
    const totalBudget = enrichedTrips.reduce((acc, t) => acc + (t.totalCost || 0), 0);
    const totalActivities = enrichedTrips.reduce((acc, t) => acc + (t.totalActivities || 0), 0);
    return { totalTrips, totalDays, totalBudget, totalActivities };
  }, [enrichedTrips]);

  // Export Calendar to iCalendar (.ics) format
  const exportToICS = () => {
    if (!enrichedTrips.length) return;

    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TripPlan AI//Smart Trip Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH"
    ];

    enrichedTrips.forEach((trip) => {
      if (trip.plan?.itinerary) {
        trip.plan.itinerary.forEach((day: any) => {
          const dayOffset = (day.day || 1) - 1;
          const eventDate = new Date(trip.startDate);
          eventDate.setDate(trip.startDate.getDate() + dayOffset);
          const dateStr = eventDate.toISOString().slice(0, 10).replace(/-/g, "");

          (day.activities || []).forEach((act: any, idx: number) => {
            icsContent.push("BEGIN:VEVENT");
            icsContent.push(`UID:${trip._id}-d${day.day}-a${idx}@tripplanai.com`);
            icsContent.push(`DTSTAMP:${dateStr}T090000Z`);
            icsContent.push(`DTSTART;VALUE=DATE:${dateStr}`);
            icsContent.push(`SUMMARY:${act.title || "Travel Activity"} - ${trip.destinationName}`);
            icsContent.push(`DESCRIPTION:${(act.description || "").replace(/\n/g, " ")} | Time: ${act.time || "N/A"}`);
            icsContent.push(`LOCATION:${act.location || trip.destinationName}`);
            icsContent.push("STATUS:CONFIRMED");
            icsContent.push("END:VEVENT");
          });
        });
      }
    });

    icsContent.push("END:VCALENDAR");

    const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `TripPlanAI_Calendar_${new Date().getFullYear()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#F7F7F2]">
      {/* Sticky Premium Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200/70 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#073D31] to-[#087F5B] flex items-center justify-center text-white shadow-md shadow-[#087F5B]/20">
              <CalendarDays size={20} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#17211D] flex items-center gap-2">
                Trip Calendar
                <span className="text-xs font-sans font-bold bg-[#F4A934]/15 text-[#D9861F] border border-[#F4A934]/30 px-2.5 py-0.5 rounded-full">
                  {trips.length} {trips.length === 1 ? "Trip" : "Trips"} Planned
                </span>
              </h1>
              <p className="text-[13px] text-gray-500 mt-0.5">
                Manage your travel timeline, day-by-day itineraries, and milestones
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "calendar"
                  ? "bg-white text-[#087F5B] shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CalendarIcon size={14} />
              Month Grid
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "timeline"
                  ? "bg-white text-[#087F5B] shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Layers size={14} />
              Timeline
            </button>
            <button
              onClick={() => setViewMode("schedule")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "schedule"
                  ? "bg-white text-[#087F5B] shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Clock size={14} />
              Day Schedule
            </button>
          </div>

          {/* Export to .ICS Button */}
          <button
            onClick={exportToICS}
            disabled={trips.length === 0}
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
            title="Export trips to Google or Apple Calendar"
          >
            <Download size={14} className="text-[#087F5B]" />
            <span className="hidden sm:inline">Export</span> .ICS
          </button>

          {/* Plan a New Trip CTA */}
          <Link
            href="/plan-trip"
            className="flex items-center gap-2 bg-gradient-to-r from-[#073D31] to-[#087F5B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#087F5B]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus size={15} />
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
        {/* Top Highlight Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Total Trips */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Scheduled Trips</p>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-1">{stats.totalTrips}</h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Ready in calendar
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase size={18} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          </div>

          {/* Card 2: Total Travel Days */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Travel Days</p>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-1">{stats.totalDays} Days</h3>
                <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                  <Sparkles size={12} /> Curated milestones
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun size={18} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          </div>

          {/* Card 3: Planned Budget */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-sky-200 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Estimated Budget</p>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-1">
                  ৳ {stats.totalBudget > 0 ? stats.totalBudget.toLocaleString() : "0"}
                </h3>
                <p className="text-[11px] text-sky-600 font-semibold mt-1 flex items-center gap-1">
                  <DollarSign size={12} /> Optimized costs
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-500" />
          </div>

          {/* Card 4: Total Experiences */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-violet-200 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Activities</p>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-1">{stats.totalActivities}</h3>
                <p className="text-[11px] text-violet-600 font-semibold mt-1 flex items-center gap-1">
                  <MapPin size={12} /> Sightseeing & Food
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Camera size={18} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 border-4 border-[#087F5B]/20 border-t-[#087F5B] rounded-full animate-spin" />
            <p className="mt-4 text-gray-500 font-medium">Loading your travel calendar & schedule...</p>
          </div>
        ) : trips.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 md:p-16 text-center flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
              <CalendarIcon size={36} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Scheduled Trips Yet</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
              Your calendar is currently clear. Plan your next adventure with our AI Trip Planner to unlock automatic schedules, daily itineraries, and timeline tracking.
            </p>
            <Link
              href="/plan-trip"
              className="flex items-center gap-2 bg-[#087F5B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#066548] shadow-lg shadow-[#087F5B]/20 hover:-translate-y-0.5 transition-all"
            >
              <Compass size={18} />
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <>
            {/* VIEW 1: MONTHLY CALENDAR GRID */}
            {viewMode === "calendar" && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Main Calendar Card (8 cols) */}
                <div className="xl:col-span-8 bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
                  {/* Calendar Top Bar */}
                  <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-gray-50/70 to-white">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold font-serif text-gray-900">
                        {formatMonthYear(currentDate)}
                      </h2>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
                        {calendarDays.filter((d) => d.isCurrentMonth && d.tripsHere.length > 0).length} active travel days
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={jumpToToday}
                        className="text-xs font-bold text-gray-700 hover:text-[#087F5B] bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all shadow-2xs"
                      >
                        Today
                      </button>
                      <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
                        <button
                          onClick={prevMonth}
                          className="p-1.5 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all"
                          title="Previous Month"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={nextMonth}
                          className="p-1.5 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all"
                          title="Next Month"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Day Names Header */}
                  <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50 text-center py-2.5 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Days 7-Column Grid */}
                  <div className="grid grid-cols-7 auto-rows-fr bg-gray-200/50 gap-[1px]">
                    {calendarDays.map((cell, i) => {
                      const isSelected =
                        selectedDate.getDate() === cell.date.getDate() &&
                        selectedDate.getMonth() === cell.date.getMonth() &&
                        selectedDate.getFullYear() === cell.date.getFullYear();

                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedDate(cell.date);
                            if (cell.tripsHere.length > 0) {
                              setSelectedTrip(cell.tripsHere[0]);
                            }
                          }}
                          className={`min-h-[90px] sm:min-h-[110px] p-2 bg-white flex flex-col justify-between transition-all cursor-pointer relative group ${
                            !cell.isCurrentMonth ? "bg-gray-50/40 text-gray-300" : "hover:bg-emerald-50/30"
                          } ${isSelected ? "ring-2 ring-[#087F5B] ring-inset z-10 bg-emerald-50/40" : ""}`}
                        >
                          {/* Day Number and Badges */}
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                                cell.isToday
                                  ? "bg-[#087F5B] text-white shadow-sm font-bold"
                                  : isSelected
                                  ? "bg-gray-900 text-white font-bold"
                                  : cell.isCurrentMonth
                                  ? "text-gray-800 group-hover:text-[#087F5B]"
                                  : "text-gray-300"
                              }`}
                            >
                              {cell.dayNumber}
                            </span>

                            {cell.tripsHere.length > 0 && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                          </div>

                          {/* Trip Pills on Day */}
                          <div className="space-y-1 overflow-hidden mt-1">
                            {cell.tripsHere.slice(0, 2).map((tr: any) => {
                              // Calculate Day X of Y
                              const sTime = new Date(tr.startDate.getFullYear(), tr.startDate.getMonth(), tr.startDate.getDate()).getTime();
                              const cTime = new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate()).getTime();
                              const dayNum = Math.floor((cTime - sTime) / (1000 * 60 * 60 * 24)) + 1;

                              return (
                                <div
                                  key={tr._id}
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md truncate text-white ${tr.theme.bg} shadow-xs flex items-center gap-1`}
                                  title={`${tr.destinationName} - Day ${dayNum}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                                  <span className="truncate">{tr.destinationName}</span>
                                  <span className="text-[9px] opacity-85 ml-auto shrink-0 font-medium">D{dayNum}</span>
                                </div>
                              );
                            })}

                            {cell.tripsHere.length > 2 && (
                              <span className="text-[9px] text-gray-500 font-bold block pl-1">
                                +{cell.tripsHere.length - 2} more
                              </span>
                            )}
                          </div>

                          {/* Subtle footer dots on hover */}
                          <div className="h-1 flex gap-1 mt-auto pt-1">
                            {cell.tripsHere.length > 0 && (
                              <div className="flex gap-1">
                                <span className="w-1 h-1 rounded-full bg-sky-400" />
                                <span className="w-1 h-1 rounded-full bg-amber-400" />
                                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calendar Footer Legend */}
                  <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="font-semibold text-gray-500">Trip Legend:</span>
                      {enrichedTrips.map((tr) => (
                        <div key={tr._id} className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${tr.theme.bg}`} />
                          <span className="font-bold text-gray-700 text-[11px]">{tr.destinationName}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#087F5B]" /> Today
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-900" /> Selected Date
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Detail & Day Activities Drawer (4 cols) */}
                <div className="xl:col-span-4 space-y-5">
                  {/* Selected Date Header Card */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F5B] bg-[#087F5B]/10 px-3 py-1 rounded-full border border-[#087F5B]/20">
                        Selected Date
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {selectedDateTrips.length} {selectedDateTrips.length === 1 ? "Trip active" : "Trips active"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-serif text-gray-900">
                      {formatDisplayDate(selectedDate)}
                    </h3>

                    {/* Active Trips on Selected Date */}
                    {displayTrips.length > 0 ? (
                      <div className="space-y-6">
                        {displayTrips.map((trip: any) => (
                          <TripDetailCard key={trip._id} trip={trip} selectedDate={selectedDate} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-gray-50 rounded-2xl mt-4 border border-dashed border-gray-200">
                        <Compass className="mx-auto text-gray-300 mb-2" size={28} />
                        <p className="text-xs text-gray-500 font-medium">No trip scheduled on this date.</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Click on a highlighted day with a colored badge.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: TRIP TIMELINE VIEW (Rich Journey Cards) */}
            {viewMode === "timeline" && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-gray-900">
                    Chronological Journey Timeline
                  </h2>
                  <span className="text-xs text-gray-500">
                    Showing all {enrichedTrips.length} scheduled journeys
                  </span>
                </div>

                <div className="relative border-l-2 border-emerald-200 ml-4 md:ml-6 space-y-8 pl-6 md:pl-8">
                  {enrichedTrips.map((trip, idx) => (
                    <div key={trip._id} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[31px] md:-left-[39px] top-4 w-7 h-7 rounded-full bg-white border-4 border-[#087F5B] shadow-md flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
                      </div>

                      {/* Journey Card */}
                      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          {/* Image Column */}
                          <div className="md:col-span-4 relative h-48 md:h-auto min-h-[190px] overflow-hidden">
                            <img
                              src={trip.destImage}
                              alt={trip.destinationName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
                            <div className="absolute top-3 left-3">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md text-white ${trip.theme.bg} shadow-sm`}>
                                {trip.daysCount} Days Tour
                              </span>
                            </div>
                          </div>

                          {/* Details Column */}
                          <div className="md:col-span-8 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <span className="text-xs font-bold text-[#D9861F] bg-[#F4A934]/15 px-2.5 py-0.5 rounded-full">
                                  {formatDisplayDate(trip.startDate)} - {formatDisplayDate(trip.endDate)}
                                </span>
                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                                  {trip.formState?.travelerType || "Trip Plan"}
                                </span>
                              </div>

                              <h3 className="text-2xl font-bold font-serif text-gray-900 group-hover:text-[#087F5B] transition-colors">
                                {trip.destinationName}
                              </h3>

                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {trip.destination?.description ||
                                  "Experience scenic attractions, curated local dining, and comfortable accommodations tailored to your schedule."}
                              </p>

                              {/* Highlights Pill Badges */}
                              <div className="flex flex-wrap gap-2 mt-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                  <Camera size={13} className="text-sky-500" />
                                  <span className="font-bold">{trip.totalActivities}</span> Activities
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                  <DollarSign size={13} className="text-emerald-500" />
                                  <span className="font-bold">৳{trip.totalCost > 0 ? trip.totalCost.toLocaleString() : "N/A"}</span> Est. Budget
                                </div>
                                {trip.plan?.hotels?.[0] && (
                                  <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    <Bed size={13} className="text-purple-500" />
                                    <span>{trip.plan.hotels[0].name}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                              <button
                                onClick={() => {
                                  setSelectedTrip(trip);
                                  setSelectedDate(trip.startDate);
                                  setViewMode("calendar");
                                }}
                                className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1"
                              >
                                <CalendarIcon size={14} />
                                View on Calendar
                              </button>

                              <Link
                                href={`/dashboard/trips/${trip._id}`}
                                className="flex items-center gap-1.5 bg-[#087F5B] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#066548] transition-all shadow-sm shadow-[#087F5B]/20"
                              >
                                View Itinerary
                                <ArrowRight size={13} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 3: DAY-BY-DAY SCHEDULE VIEW */}
            {viewMode === "schedule" && (
              <div className="space-y-6 max-w-5xl mx-auto">
                {/* Trip selector dropdown if multiple trips */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Trip:</span>
                    <select
                      value={activeDetailTrip?._id || ""}
                      onChange={(e) => {
                        const tr = enrichedTrips.find((t) => t._id === e.target.value);
                        if (tr) {
                          setSelectedTrip(tr);
                          setSelectedDate(tr.startDate);
                        }
                      }}
                      className="bg-gray-50 border border-gray-200 text-sm font-bold text-gray-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#087F5B]"
                    >
                      {enrichedTrips.map((tr) => (
                        <option key={tr._id} value={tr._id}>
                          {tr.destinationName} ({tr.daysCount} Days)
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="text-xs text-gray-500 font-medium">
                    {activeDetailTrip ? `${formatDisplayDate(activeDetailTrip.startDate)} – ${formatDisplayDate(activeDetailTrip.endDate)}` : ""}
                  </span>
                </div>

                {/* Day-by-Day Full Accordion / Cards */}
                {activeDetailTrip?.plan?.itinerary?.map((day: any) => (
                  <div
                    key={day.day}
                    className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden"
                  >
                    {/* Day Header */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#087F5B] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          D{day.day}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold font-serif text-gray-900">
                            {day.title || `Day ${day.day} Exploration`}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {day.activities?.length || 0} scheduled activities
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        Cost: ৳{(day.totalCost || 0).toLocaleString()}
                      </span>
                    </div>

                    {/* Day Activities Grid */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {day.activities?.map((act: any, aIdx: number) => {
                        const tag = act.tag?.toLowerCase() || "activity";
                        const config = ACTIVITY_TAG_CONFIG[tag] || ACTIVITY_TAG_CONFIG.activity;
                        const TagIcon = config.icon;

                        return (
                          <div
                            key={aIdx}
                            className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all shadow-2xs flex gap-3.5"
                          >
                            {act.image ? (
                              <img
                                src={act.image}
                                alt={act.title}
                                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-200"
                              />
                            ) : (
                              <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${config.bg} ${config.color}`}
                              >
                                <TagIcon size={22} />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-bold text-[#D9861F] flex items-center gap-1">
                                  <Clock size={11} /> {act.time || "Anytime"}
                                </span>
                                {act.cost > 0 && (
                                  <span className="text-[10px] font-bold text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                                    ৳{act.cost.toLocaleString()}
                                  </span>
                                )}
                              </div>

                              <h4 className="text-sm font-bold text-gray-900 truncate">
                                {act.title}
                              </h4>

                              {act.location && (
                                <p className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                  <MapPin size={11} className="text-gray-400 shrink-0" />
                                  {act.location}
                                </p>
                              )}

                              {act.description && (
                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-1">
                                  {act.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
