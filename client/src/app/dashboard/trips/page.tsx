"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { MapPin, Calendar, Clock, Users, Wallet, Plus, Compass, ChevronRight } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Upcoming:  { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500" },
  Active:    { bg: "bg-blue-50",     text: "text-blue-700",    dot: "bg-blue-500"    },
  Completed: { bg: "bg-gray-100",    text: "text-gray-600",    dot: "bg-gray-400"    },
  Cancelled: { bg: "bg-red-50",      text: "text-red-600",     dot: "bg-red-400"     },
};

const TIER_COLORS: Record<string, string> = {
  budget:   "bg-sky-100 text-sky-700",
  standard: "bg-violet-100 text-violet-700",
  premium:  "bg-amber-100 text-amber-700",
  luxury:   "bg-rose-100 text-rose-700",
};

const FALLBACK_IMAGES: Record<string, string> = {
  sylhet:      "/assets/Sylhet/cover-1.jpg",
  coxs:        "/assets/Cox's Bazar/cover-1.jpg",
  "cox's":     "/assets/Cox's Bazar/cover-1.jpg",
  bandarban:   "/assets/Bandarban/cover-1.jpg",
  rangamati:   "/assets/Rangamati/cover-1.jpg",
  "saint martin": "/assets/Saint Martin/cover-1.jpg",
  kuakata:     "/assets/Kuakata/cover-1.jpg",
  sundarban:   "/assets/Sundarban/cover-1.jpg",
  sajek:       "/assets/Sajek/cover-1.jpg",
};

function getTripImage(trip: any): string {
  if (trip.image && trip.image.trim() !== "") return trip.image;
  const dest = (trip.destination || "").toLowerCase();
  for (const key of Object.keys(FALLBACK_IMAGES)) {
    if (dest.includes(key)) return FALLBACK_IMAGES[key];
  }
  return "/assets/Sylhet/cover-1.jpg";
}

function TripCardLong({ trip }: { trip: any }) {
  const status = trip.status || "Upcoming";
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES["Upcoming"];
  const tierKey = (trip.formState?.budgetTier || "standard").toLowerCase();
  const tierStyle = TIER_COLORS[tierKey] ?? TIER_COLORS["standard"];
  const heroImg = getTripImage(trip);
  const destName = typeof trip.destination === "string" ? trip.destination : trip.destination?.name || "Trip";
  const startDate = trip.startDate ? new Date(trip.startDate).toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" }) : new Date(trip.createdAt).toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" });
  
  // Calculate travelers
  const adults = trip.formState?.travelers?.adults || 1;
  const children = trip.formState?.travelers?.children || 0;
  const totalTravelers = adults + children;

  return (
    <div className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-200/80 w-full relative">
      {/* Left indicator strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusStyle.dot} z-10 transition-all group-hover:w-2`} />

      {/* Image Section - Left */}
      <div className="w-full md:w-[320px] h-56 md:h-auto relative shrink-0 overflow-hidden">
        <img
          src={heroImg}
          alt={destName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          onError={(e: any) => { e.target.src = "/assets/Sylhet/cover-1.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
        
        {/* Status Badge (Mobile only, over image) */}
        <div className={`absolute top-4 left-4 flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} shadow-md`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {status}
        </div>

        {/* Image overlay details (Mobile) */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <h3 className="text-2xl font-extrabold text-white leading-tight drop-shadow-md mb-1">{destName}</h3>
          <div className="flex items-center gap-3 text-white/90 text-xs font-medium">
            <span className="flex items-center gap-1"><Calendar size={12} /> {startDate}</span>
            {trip.days && <span className="flex items-center gap-1"><Clock size={12} /> {trip.days} Days</span>}
          </div>
        </div>
      </div>

      {/* Content Section - Middle (Details) */}
      <div className="flex flex-col flex-1 p-6 md:p-8 relative bg-gradient-to-br from-white to-gray-50/30">
        <div className="hidden md:flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#087F5B] text-xs font-bold mb-1.5">
              <MapPin size={14} />
              <span className="uppercase tracking-[0.15em]">Bangladesh</span>
            </div>
            <h3 className="text-[28px] font-extrabold text-[#17211D] group-hover:text-[#087F5B] transition-colors tracking-tight leading-tight">{destName}</h3>
          </div>
          
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} shadow-sm ring-1 ring-black/5`}>
            <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
            {status}
          </div>
        </div>

        {/* Rich Details Grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 mt-2 mb-6">
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Calendar size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Departure</span>
              <span className="text-[13px] font-bold text-gray-800">{startDate}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Duration</span>
              <span className="text-[13px] font-bold text-gray-800">
                {trip.days ? `${trip.days} Days` : "Not set"}{trip.nights ? `, ${trip.nights} Nights` : ""}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Users size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Travelers</span>
              <span className="text-[13px] font-bold text-gray-800">
                {totalTravelers} Person{totalTravelers > 1 ? 's' : ''} <span className="text-gray-400 font-medium">({trip.formState?.travelerType || 'Solo'})</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Wallet size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Budget Tier</span>
              <span className="text-[13px] font-bold text-gray-800 capitalize">{tierKey || 'Standard'}</span>
            </div>
          </div>
        </div>

        {/* Mobile View Tags */}
        <div className="flex md:hidden flex-wrap gap-2 mt-2 mb-4">
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-700">
            <Users size={12} className="inline mr-1" /> {totalTravelers} Travelers
          </span>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${tierStyle}`}>
            <Wallet size={12} className="inline mr-1" /> {tierKey}
          </span>
        </div>

        {/* Dashed Divider for Desktop */}
        <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px border-r-2 border-dashed border-gray-200" />
      </div>

      {/* Action Section - Right (Desktop) / Bottom (Mobile) */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center p-6 md:p-8 md:w-[220px] bg-gray-50/50 md:bg-white shrink-0">
        <div className="flex flex-col items-start md:items-end mb-0 md:mb-6">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Est. Cost</span>
          <span className="text-2xl font-extrabold text-[#17211D]">
            {trip.amount > 0 ? `৳${Number(trip.amount).toLocaleString()}` : "TBD"}
          </span>
        </div>

        <Link
          href={`/dashboard/trips/${trip.localId || trip._id || trip.id}`}
          className="flex items-center justify-center gap-2 text-[14px] font-bold text-white bg-[#087F5B] hover:bg-[#066548] px-6 py-3.5 rounded-xl group/btn transition-all shadow-[0_4px_14px_rgba(8,127,91,0.25)] hover:shadow-[0_6px_20px_rgba(8,127,91,0.4)] hover:-translate-y-0.5 w-auto md:w-full"
        >
          View Details
          <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session?.user?.id) return;
        const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/trips/user/${session.user.id}`);
        const data = await response.json();
        if (data.success) setTrips(data.data);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center gap-4 h-full">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Loading your trips...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Navbar */}
      <div className="sticky top-0 z-20 bg-[#F7F7F2]/90 backdrop-blur-md px-6 lg:pr-10 lg:pl-4 py-4 flex items-center justify-between border-b border-gray-200/60 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F4A934] to-[#D99120] text-[#14151a] rounded-xl flex items-center justify-center shadow-sm">
            <Compass size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14151a] leading-tight">My Trips</h1>
            <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
              {trips.length > 0 ? `${trips.length} trip${trips.length > 1 ? "s" : ""} saved` : "No trips yet"}
            </p>
          </div>
        </div>
        
        <Link
          href="/plan-trip"
          className="flex items-center gap-2 bg-gradient-to-r from-[#F4A934] to-[#F19305] text-[#14151a] px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-[0_4px_14px_rgba(244,169,52,0.4)] hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} strokeWidth={2.5} />
          Plan a Trip
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:pr-10 lg:pl-0 lg:py-8 overflow-y-auto w-full max-w-7xl">
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm ml-4 lg:ml-0">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <Compass size={40} className="text-primary/60" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">No trips saved yet</h3>
            <p className="text-gray-500 text-sm text-center max-w-sm mb-8 font-medium">
              Start planning your dream trip! It will appear here as a beautifully organized itinerary.
            </p>
            <Link
              href="/plan-trip"
              className="bg-gradient-to-r from-[#F4A934] to-[#F19305] text-[#14151a] px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_4px_14px_rgba(244,169,52,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Planning Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full">
            {trips.map((trip) => (
              <TripCardLong key={trip._id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
