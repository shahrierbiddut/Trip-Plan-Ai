"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import type { GeneratedTrip, ResultTabId } from "@/types/tripPlan";

import TripSummary from "@/components/plan-trip/result/TripSummary";
import AIRecommendationCard from "@/components/plan-trip/result/AIRecommendationCard";
import AITravelAssistant from "@/components/plan-trip/result/AITravelAssistant";
import ItineraryTimeline from "@/components/plan-trip/result/ItineraryTimeline";
import HotelRecommendations from "@/components/plan-trip/result/HotelRecommendations";
import FoodRecommendations from "@/components/plan-trip/result/FoodRecommendations";
import TransportPlanView from "@/components/plan-trip/result/TransportPlanView";
import BudgetBreakdownPanel from "@/components/plan-trip/result/BudgetBreakdownPanel";
import NotesPanel from "@/components/plan-trip/result/NotesPanel";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeResultTab, setActiveResultTab] = useState<ResultTabId>("itinerary");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (!id) return;
        
        // Ensure we have a valid URL and fallback if NEXT_PUBLIC_API_URL is missing
        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
        const url = `${baseUrl}/api/trips/${encodeURIComponent(id)}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setTrip(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTrip();
  }, [id]);

  const handleAITripUpdate = async (updatedTrip: GeneratedTrip) => {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
    const response = await fetch(`${baseUrl}/api/trips/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fullPlan: updatedTrip,
        formState: updatedTrip.formState,
        amount: updatedTrip.budget.total,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(
        typeof data?.message === "string"
          ? data.message
          : "AI changes save kora jayni. Abar try koro.",
      );
    }

    setTrip((current: any) =>
      current
        ? {
            ...current,
            fullPlan: updatedTrip,
            formState: updatedTrip.formState,
            amount: updatedTrip.budget.total,
            updatedAt: new Date().toISOString(),
          }
        : current,
    );
  };

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading your trip details...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 text-red-400">
          <Compass size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Trip not found</h2>
        <p className="text-gray-500 mb-6">The trip you are looking for does not exist or has been deleted.</p>
        <Link href="/dashboard/trips" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90">
          Back to My Trips
        </Link>
      </div>
    );
  }

  // Determine if we have the full generated plan
  const fullPlan: GeneratedTrip | null = trip.fullPlan || null;

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA]">
      {/* Sticky Header with Back Arrow */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-200/60 shadow-sm">
        <Link
          href="/dashboard/trips"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium text-sm"
        >
          <ArrowLeft size={18} />
          Back to My Trips
        </Link>
        <div className="font-bold text-gray-900">{trip.title}</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1400px]">
          {!fullPlan ? (
            // Legacy Trip Fallback
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-16 text-center flex flex-col items-center">
              <Compass size={48} className="text-primary/50 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Itinerary Saved</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                This trip was saved before full itinerary saving was supported. You can regenerate the full AI itinerary using your saved preferences.
              </p>
              <Link
                href={`/plan-trip?tripId=${trip.localId || trip._id}`}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
              >
                Regenerate Full Plan
              </Link>
            </div>
          ) : (
            // Full Plan View
            <div className="space-y-6">
              <TripSummary 
                trip={fullPlan} 
                activeTab={activeResultTab} 
                onTabChange={setActiveResultTab} 
                onPlanNewTrip={() => router.push('/plan-trip')} 
              />

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                <div className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.06)] sm:p-6">
                  {activeResultTab === "itinerary" && (
                    <ItineraryTimeline days={fullPlan.itinerary} onEditActivity={() => {}} />
                  )}
                  {activeResultTab === "stay" && (
                    <HotelRecommendations
                      hotels={fullPlan.hotels}
                      onSelect={() => {}}
                    />
                  )}
                  {activeResultTab === "food" && <FoodRecommendations food={fullPlan.food} />}
                  {activeResultTab === "transport" && <TransportPlanView transport={fullPlan.transport} />}
                  {activeResultTab === "budget" && (
                    <BudgetBreakdownPanel budget={fullPlan.budget} onOptimize={async () => {}} />
                  )}
                  {activeResultTab === "notes" && <NotesPanel notes={fullPlan.notes} />}
                </div>

                <div className="space-y-5">
                  <AIRecommendationCard recommendation={fullPlan.aiRecommendation} />
                  <AITravelAssistant
                    trip={fullPlan}
                    onTripUpdate={handleAITripUpdate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
