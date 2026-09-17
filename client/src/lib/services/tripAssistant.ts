import type {
  AITripOperation,
  AITripProposal,
  BudgetCategory,
  GeneratedTrip,
  ItineraryActivity,
} from "@/types/tripPlan";

export interface AppliedTripProposal {
  trip: GeneratedTrip;
  appliedCount: number;
}

function cloneTrip(trip: GeneratedTrip): GeneratedTrip {
  if (typeof structuredClone === "function") return structuredClone(trip);
  return JSON.parse(JSON.stringify(trip)) as GeneratedTrip;
}

function categoryFor(tag: ItineraryActivity["tag"]): BudgetCategory["label"] {
  if (tag === "meal") return "Food";
  if (tag === "transfer") return "Transport";
  if (tag === "stay") return "Accommodation";
  return "Activities";
}

function adjustCategory(
  trip: GeneratedTrip,
  label: BudgetCategory["label"],
  deltaAmount: number,
): void {
  const category = trip.budget.categories.find((entry) => entry.label === label);
  if (category) category.amount = Math.max(0, category.amount + deltaAmount);
}

function recalcDay(trip: GeneratedTrip, dayNumber: number): void {
  const day = trip.itinerary.find((entry) => entry.day === dayNumber);
  if (!day) return;
  day.totalCost = day.activities.reduce((sum, activity) => sum + activity.cost, 0);
}

function recalcBudgetTotals(trip: GeneratedTrip): void {
  const total = trip.budget.categories.reduce(
    (sum, category) => sum + category.amount,
    0,
  );

  trip.budget.total = total;
  trip.budget.categories.forEach((category) => {
    category.percent = total > 0 ? Math.round((category.amount / total) * 100) : 0;
  });
  trip.budget.usedPercent =
    trip.budget.budgetLimit > 0
      ? Math.round((total / trip.budget.budgetLimit) * 100)
      : 100;

  if (trip.budget.usedPercent <= 100) {
    trip.budget.aiSuggestion = undefined;
  } else {
    trip.budget.aiSuggestion =
      "Your updated plan is above the current budget. Ask TripPlan AI to reduce the cost.";
  }
}

function applyOperation(trip: GeneratedTrip, operation: AITripOperation): boolean {
  if (operation.type === "remove_activity") {
    const day = trip.itinerary.find((entry) => entry.day === operation.day);
    if (!day) return false;

    const activity = day.activities.find((entry) => entry.id === operation.activityId);
    if (!activity || activity.tag === "transfer") return false;

    day.activities = day.activities.filter((entry) => entry.id !== operation.activityId);
    adjustCategory(trip, categoryFor(activity.tag), -activity.cost);
    recalcDay(trip, day.day);
    return true;
  }

  if (operation.type === "move_activity") {
    const fromDay = trip.itinerary.find((entry) => entry.day === operation.fromDay);
    const toDay = trip.itinerary.find((entry) => entry.day === operation.toDay);
    if (!fromDay || !toDay || fromDay.day === toDay.day) return false;

    const activity = fromDay.activities.find((entry) => entry.id === operation.activityId);
    if (!activity || activity.tag === "transfer") return false;

    fromDay.activities = fromDay.activities.filter((entry) => entry.id !== operation.activityId);
    toDay.activities.push({
      ...activity,
      time: operation.newTime?.trim() || activity.time,
    });
    recalcDay(trip, fromDay.day);
    recalcDay(trip, toDay.day);
    return true;
  }

  if (operation.type === "add_food") {
    const day = trip.itinerary.find((entry) => entry.day === operation.day);
    const food = trip.food.find((entry) => entry.id === operation.foodId);
    if (!day || !food) return false;

    const mealCount = trip.itinerary.reduce(
      (count, entry) =>
        count + entry.activities.filter((activity) => activity.tag === "meal").length,
      0,
    );
    const foodBudget =
      trip.budget.categories.find((entry) => entry.label === "Food")?.amount ?? 0;
    const estimatedCost = Math.max(0, Math.round(foodBudget / Math.max(1, mealCount)));

    const activity: ItineraryActivity = {
      id: `ai-food-${Date.now()}-${operation.day}`,
      time: operation.time?.trim() || "08:00 PM",
      title: food.title,
      location: trip.destination.name,
      cost: estimatedCost,
      description: food.description,
      image: food.image,
      tag: "meal",
    };

    day.activities.push(activity);
    adjustCategory(trip, "Food", estimatedCost);
    recalcDay(trip, day.day);
    return true;
  }

  if (operation.type === "add_activity") {
    const day = trip.itinerary.find((entry) => entry.day === operation.day);
    if (!day) return false;

    const activity: ItineraryActivity = {
      id: `ai-activity-${Date.now()}-${operation.day}`,
      time: operation.time,
      title: operation.title,
      location: operation.location,
      cost: Math.max(0, Math.round(operation.estimatedCost)),
      description: operation.description,
      tag: operation.tag,
    };

    day.activities.push(activity);
    adjustCategory(trip, categoryFor(activity.tag), activity.cost);
    recalcDay(trip, day.day);
    return true;
  }

  if (operation.type === "select_hotel") {
    const nextHotel = trip.hotels.find((hotel) => hotel.id === operation.hotelId);
    if (!nextHotel) return false;

    const currentHotel = trip.hotels.find((hotel) => hotel.selected);
    if (currentHotel?.id === nextHotel.id) return false;

    const oldStayCost = (currentHotel?.pricePerNight ?? 0) * Math.max(1, trip.nights);
    const newStayCost = nextHotel.pricePerNight * Math.max(1, trip.nights);

    trip.hotels = trip.hotels.map((hotel) => ({
      ...hotel,
      selected: hotel.id === nextHotel.id,
    }));
    adjustCategory(trip, "Accommodation", newStayCost - oldStayCost);
    return true;
  }

  if (operation.type === "set_travel_pace") {
    if (trip.formState.travelPace === operation.pace) return false;
    trip.formState.travelPace = operation.pace;
    return true;
  }

  if (operation.type === "set_budget_limit") {
    const amount = Math.max(1, Math.round(operation.amount));
    trip.formState.customBudget = amount;
    trip.budget.budgetLimit = amount;
    return true;
  }

  if (operation.type === "add_note") {
    const note = operation.note.trim();
    if (!note || trip.notes.some((entry) => entry.toLowerCase() === note.toLowerCase())) {
      return false;
    }
    trip.notes.push(note);
    return true;
  }

  return false;
}

export function applyAITripProposal(
  currentTrip: GeneratedTrip,
  proposal: AITripProposal,
): AppliedTripProposal {
  const trip = cloneTrip(currentTrip);
  let appliedCount = 0;

  for (const operation of proposal.operations) {
    if (applyOperation(trip, operation)) appliedCount += 1;
  }

  if (appliedCount > 0) {
    recalcBudgetTotals(trip);
  }

  return { trip, appliedCount };
}
