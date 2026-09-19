"use client";

import { CalendarDays, Heart, Briefcase, Wallet } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import NextAdventureCard from "@/components/dashboard/NextAdventureCard";
import AITripGenerator from "@/components/dashboard/AITripGenerator";
import BudgetTracker from "@/components/dashboard/BudgetTracker";
import TripsSection from "@/components/dashboard/TripsSection";
import AITravelInsight from "@/components/dashboard/AITravelInsight";
import SavedForLater from "@/components/dashboard/SavedForLater";
import TravelCalendar from "@/components/dashboard/TravelCalendar";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { useSession } from "@/lib/auth-client";

export default function DashboardOverview() {
  const { dashboardData, isLoading, error } = useDashboard();
  const { data: session } = useSession();

  if (isLoading) {
    return <div className="flex h-full items-center justify-center p-10"><p className="text-[#66736D]">Loading dashboard...</p></div>;
  }

  if (error || !dashboardData) {
    return <div className="flex h-full items-center justify-center p-10"><p className="text-red-500">{error || "Failed to load dashboard data"}</p></div>;
  }

  const { stats } = dashboardData;
  const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "Traveler";

  return (
    <div className="flex flex-col gap-8 pb-10 px-6 lg:px-10 pt-6">
      {/* Hero Welcome */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#17211D]">
            Welcome back, {firstName}! <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h1>
          <p className="mt-2 text-[14px] text-[#66736D]">
            Ready to plan your next Bangladesh adventure?
          </p>
        </div>
      </div>

      {/* Top Layout: Left Side (Stats + Cards) | Right Side (Budget) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        
        {/* Left Side */}
        <div className="flex flex-col gap-6 xl:col-span-9">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<CalendarDays size={20} className="text-[#087F5B]" />}
              iconBgColor="bg-[#087F5B]/10"
              title="Upcoming Trips"
              value={`0${stats.upcomingTrips.count}`}
              detail={stats.upcomingTrips.detail}
            />
            <StatCard
              icon={<Heart size={20} className="text-[#F4A934]" />}
              iconBgColor="bg-[#F4A934]/10"
              title="Saved Destinations"
              value={stats.savedDestinations.count.toString()}
              detail={stats.savedDestinations.detail}
            />
            <StatCard
              icon={<Briefcase size={20} className="text-[#073D31]" />}
              iconBgColor="bg-[#073D31]/10"
              title="Trips Completed"
              value={`0${stats.tripsCompleted.count}`}
              detail={stats.tripsCompleted.detail}
            />
            <StatCard
              icon={<Wallet size={20} className="text-[#F4B942]" />}
              iconBgColor="bg-[#F4B942]/10"
              title="Total Travel Budget"
              value={stats.totalBudget.amount}
              detail={stats.totalBudget.detail}
            />
          </div>

          {/* Next Adventure & AI Generator */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-9">
            <div className="lg:col-span-5">
              <NextAdventureCard />
            </div>
            <div className="lg:col-span-4">
              <AITripGenerator />
            </div>
          </div>
        </div>

        {/* Right Side: Budget Tracker */}
        <div className="xl:col-span-3 h-full">
          <BudgetTracker />
        </div>
      </div>

      {/* Middle Section (My Trips & AI Insight) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <TripsSection />
        </div>
        <div className="lg:col-span-4">
          <AITravelInsight />
        </div>
      </div>
      
      {/* Bottom Section (Saved, Calendar, Activity) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SavedForLater />
        </div>
        <div className="lg:col-span-5">
          <TravelCalendar />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
