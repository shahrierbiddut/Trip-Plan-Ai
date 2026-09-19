"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Filter, ArrowRight } from "lucide-react";
import TripCard from "@/components/dashboard/TripCard";
import { TripStatus } from "@/types/dashboardTrip";
import { useDashboard } from "@/components/dashboard/DashboardContext";

const tabs = ["All", "Drafts", "Upcoming", "Completed", "Cancelled"];

export default function TripsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | TripStatus>("All");
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-64 flex items-center justify-center">Loading trips...</div>;
  }

  const filteredTrips = dashboardData.myTrips.filter((trip: any) => {
    if (activeFilter === "All") return true;
    return trip.status === activeFilter;
  });

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E7E3] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="font-serif text-[20px] font-bold text-[#17211D]">My Trips</h2>
          <div className="hidden items-center gap-4 sm:flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab as any)}
                className={`text-[12px] font-medium transition-colors ${
                  activeFilter === tab
                    ? "border-b-2 border-[#087F5B] pb-1 text-[#087F5B]"
                    : "border-b-2 border-transparent pb-1 text-[#66736D] hover:text-[#17211D]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/dashboard/trips"
          className="group flex items-center gap-1.5 text-[12px] font-bold text-[#087F5B] transition-colors hover:text-[#073D31]"
        >
          View All Trips <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 custom-scrollbar lg:grid lg:grid-cols-2 xl:grid-cols-3 xl:overflow-visible xl:pb-0">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip: any) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <div className="col-span-full flex h-[200px] w-full items-center justify-center rounded-xl border border-dashed border-[#E2E7E3] bg-[#F7F7F2]">
            <p className="text-[13px] font-medium text-[#66736D]">
              No trips found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
