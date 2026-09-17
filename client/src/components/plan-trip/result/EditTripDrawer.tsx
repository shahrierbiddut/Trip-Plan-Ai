"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, Trash2, X } from "lucide-react";
import { BUDGET_TIER_OPTIONS, TRAVEL_PACE_OPTIONS } from "@/data/config/tripPlanOptions";
import { generateTrip } from "@/lib/services/tripPlanner";
import { showTripPlanToast } from "@/components/TripPlanToast";
import type { BudgetCategory, BudgetTier, GeneratedTrip, TravelPace } from "@/types/tripPlan";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface EditTripDrawerProps {
  isOpen: boolean;
  trip: GeneratedTrip;
  onClose: () => void;
  onUpdate: (trip: GeneratedTrip) => void;
}

function recalcTotals(trip: GeneratedTrip) {
  const total = trip.budget.categories.reduce((sum, category) => sum + category.amount, 0);
  trip.budget.total = total;
  trip.budget.categories.forEach((category) => {
    category.percent = total > 0 ? Math.round((category.amount / total) * 100) : 0;
  });
  trip.budget.usedPercent = trip.budget.budgetLimit > 0 ? Math.round((total / trip.budget.budgetLimit) * 100) : 100;
}

function adjustCategory(trip: GeneratedTrip, label: BudgetCategory["label"], delta: number) {
  const category = trip.budget.categories.find((entry) => entry.label === label);
  if (category) category.amount = Math.max(0, category.amount + delta);
}

export default function EditTripDrawer({ isOpen, trip, onClose, onUpdate }: EditTripDrawerProps) {
  const [selectedDay, setSelectedDay] = useState(trip.itinerary[0]?.day ?? 1);
  const [isRegeneratingFull, setIsRegeneratingFull] = useState(false);

  const handleRegenerateTrip = async () => {
    setIsRegeneratingFull(true);
    const nextForm = { ...trip.formState };
    const seed = Math.floor(Math.random() * 1000) + 1;
    const regenerated = await generateTrip(nextForm, seed);
    setIsRegeneratingFull(false);
    if (regenerated) {
      onUpdate(regenerated);
      showTripPlanToast({ title: "Trip regenerated", message: "Here's a completely new plan!" });
    }
  };

  const applyRegeneration = async (patch: Partial<GeneratedTrip["formState"]>) => {
    const nextForm = { ...trip.formState, ...patch };
    const regenerated = await generateTrip(nextForm);
    if (regenerated) {
      onUpdate(regenerated);
      showTripPlanToast({ title: "Trip updated", message: "Your itinerary has been refreshed." });
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    const next: GeneratedTrip = JSON.parse(JSON.stringify(trip));
    const target = next.hotels.find((hotel) => hotel.id === hotelId);
    const previous = next.hotels.find((hotel) => hotel.selected);
    if (!target || target.selected) return;

    const nightlyDelta = target.pricePerNight - (previous?.pricePerNight ?? target.pricePerNight);
    next.hotels.forEach((hotel) => (hotel.selected = hotel.id === hotelId));
    adjustCategory(next, "Accommodation", nightlyDelta * next.nights);
    recalcTotals(next);
    onUpdate(next);
    showTripPlanToast({ title: "Hotel updated", message: `${target.name} is now your selected stay.` });
  };

  const handleRemoveActivity = (dayNumber: number, activityId: string) => {
    const next: GeneratedTrip = JSON.parse(JSON.stringify(trip));
    const day = next.itinerary.find((entry) => entry.day === dayNumber);
    if (!day) return;
    const activity = day.activities.find((entry) => entry.id === activityId);
    if (!activity || activity.tag === "transfer") return;

    day.activities = day.activities.filter((entry) => entry.id !== activityId);
    day.totalCost -= activity.cost;
    const label: BudgetCategory["label"] = activity.tag === "meal" ? "Food" : "Activities";
    adjustCategory(next, label, -activity.cost);
    recalcTotals(next);
    onUpdate(next);
  };

  const handleAddFoodActivity = (dayNumber: number) => {
    const next: GeneratedTrip = JSON.parse(JSON.stringify(trip));
    const day = next.itinerary.find((entry) => entry.day === dayNumber);
    const candidate = next.food[Math.floor(Math.random() * next.food.length)];
    if (!day || !candidate) return;

    const cost = Math.round(
      (next.budget.categories.find((c) => c.label === "Food")?.amount ?? 1500) /
        Math.max(1, next.itinerary.flatMap((d) => d.activities.filter((a) => a.tag === "meal")).length),
    );

    day.activities.push({
      id: `manual-${Date.now()}`,
      time: "08:00 PM",
      title: candidate.title,
      location: next.destination.name,
      cost,
      description: candidate.description,
      image: candidate.image,
      tag: "meal",
    });
    day.totalCost += cost;
    adjustCategory(next, "Food", cost);
    recalcTotals(next);
    onUpdate(next);
    showTripPlanToast({ title: "Activity added", message: `Added "${candidate.title}" to Day ${dayNumber}.` });
  };

  const handleRegenerateDay = async (dayNumber: number) => {
    const seed = Math.floor(Math.random() * 1000) + 1;
    const regenerated = await generateTrip(trip.formState, seed);
    if (!regenerated) return;

    const next: GeneratedTrip = JSON.parse(JSON.stringify(trip));
    const freshDay = regenerated.itinerary.find((entry) => entry.day === dayNumber);
    const dayIndex = next.itinerary.findIndex((entry) => entry.day === dayNumber);
    if (!freshDay || dayIndex === -1) return;

    next.itinerary[dayIndex] = freshDay;
    onUpdate(next);
    showTripPlanToast({ title: "Day regenerated", message: `Day ${dayNumber} has a refreshed plan.` });
  };

  const currentDay = trip.itinerary.find((day) => day.day === selectedDay) ?? trip.itinerary[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={onClose}
          className="fixed inset-0 z-[100] flex items-stretch justify-end bg-[#03120F]/60 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-trip-title"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.32, ease: revealEase }}
            onMouseDown={(event) => event.stopPropagation()}
            className="flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-white p-5 shadow-[0_0_60px_rgba(0,0,0,0.25)] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <h2 id="edit-trip-title" className="font-serif text-[20px] font-bold text-[#12342D]">
                Edit Trip
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close edit panel"
                className="rounded-full p-1.5 text-[#66736D] transition-colors hover:bg-[#EEF5F1] hover:text-[#12342D]"
              >
                <X size={18} />
              </button>
            </div>

            <section className="mt-6">
              <p className="text-[12px] font-bold text-[#26382F]">Travel Pace</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {TRAVEL_PACE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => applyRegeneration({ travelPace: option.id as TravelPace })}
                    aria-pressed={trip.formState.travelPace === option.id}
                    className={`rounded-xl border p-2.5 text-[11px] font-bold transition-all ${
                      trip.formState.travelPace === option.id
                        ? "border-[#F4A934] bg-[#073D31] text-white"
                        : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <p className="text-[12px] font-bold text-[#26382F]">Budget Tier</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {BUDGET_TIER_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => applyRegeneration({ budgetTier: option.id as BudgetTier, customBudget: null })}
                    aria-pressed={trip.formState.budgetTier === option.id}
                    className={`rounded-xl border p-2.5 text-left text-[11px] font-bold transition-all ${
                      trip.formState.budgetTier === option.id
                        ? "border-[#F4A934] bg-[#073D31] text-white"
                        : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]/40"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <p className="text-[12px] font-bold text-[#26382F]">Change Hotel</p>
              <div className="mt-2 space-y-2">
                {trip.hotels.map((hotel) => (
                  <button
                    key={hotel.id}
                    type="button"
                    onClick={() => handleSelectHotel(hotel.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                      hotel.selected ? "border-[#087F5B] bg-[#EEF5F1]" : "border-[#DCE6E1] hover:border-[#087F5B]/40"
                    }`}
                  >
                    <span className="text-[11px] font-bold text-[#12342D]">{hotel.name}</span>
                    <span className="text-[11px] font-semibold text-[#087F5B]">
                      ৳{hotel.pricePerNight.toLocaleString("en-US")}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#26382F]">Activities</p>
                <select
                  value={selectedDay}
                  onChange={(event) => setSelectedDay(Number(event.target.value))}
                  className="rounded-lg border border-[#DCE6E1] bg-white px-2 py-1 text-[11px] font-semibold text-[#30483F]"
                >
                  {trip.itinerary.map((day) => (
                    <option key={day.day} value={day.day}>
                      Day {day.day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2 space-y-2">
                {currentDay?.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-[#DCE6E1] p-2.5"
                  >
                    <span className="min-w-0 truncate text-[11px] font-semibold text-[#30483F]">
                      {activity.time} · {activity.title}
                    </span>
                    {activity.tag !== "transfer" && (
                      <button
                        type="button"
                        onClick={() => handleRemoveActivity(currentDay.day, activity.id)}
                        aria-label={`Remove ${activity.title}`}
                        className="shrink-0 rounded-full p-1.5 text-[#B54E32] transition-colors hover:bg-[#FBEAE6]"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => currentDay && handleAddFoodActivity(currentDay.day)}
                  className="rounded-full border border-[#087F5B]/30 bg-[#EEF5F1] px-3.5 py-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:bg-[#DCEEE4]"
                >
                  + Add Activity
                </button>
                <button
                  type="button"
                  onClick={() => currentDay && handleRegenerateDay(currentDay.day)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6E1] px-3.5 py-1.5 text-[11px] font-bold text-[#30483F] transition-colors hover:border-[#087F5B]/40"
                >
                  <RefreshCcw size={12} /> Regenerate Day
                </button>
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
