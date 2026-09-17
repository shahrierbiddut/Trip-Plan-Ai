import type { BudgetCategory, GeneratedTrip, ItineraryActivity } from "@/types/tripPlan";

export interface AssistantResponse {
  reply: string;
  updatedTrip?: GeneratedTrip;
}

function cloneTrip(trip: GeneratedTrip): GeneratedTrip {
  return JSON.parse(JSON.stringify(trip)) as GeneratedTrip;
}

function categoryFor(tag: ItineraryActivity["tag"]): BudgetCategory["label"] {
  if (tag === "meal") return "Food";
  if (tag === "transfer") return "Transport";
  if (tag === "stay") return "Accommodation";
  return "Activities";
}

function recalcBudgetTotals(trip: GeneratedTrip): void {
  const total = trip.budget.categories.reduce((sum, category) => sum + category.amount, 0);
  trip.budget.total = total;
  trip.budget.categories.forEach((category) => {
    category.percent = total > 0 ? Math.round((category.amount / total) * 100) : 0;
  });
  trip.budget.usedPercent = trip.budget.budgetLimit > 0 ? Math.round((total / trip.budget.budgetLimit) * 100) : 100;
  if (trip.budget.usedPercent <= 100) {
    trip.budget.aiSuggestion = undefined;
  }
}

function adjustCategory(trip: GeneratedTrip, label: BudgetCategory["label"], deltaAmount: number): void {
  const category = trip.budget.categories.find((entry) => entry.label === label);
  if (category) category.amount = Math.max(0, category.amount + deltaAmount);
}

function handleCheaper(trip: GeneratedTrip): AssistantResponse {
  const selected = trip.hotels.find((hotel) => hotel.selected);
  const cheapest = [...trip.hotels].sort((a, b) => a.pricePerNight - b.pricePerNight)[0];

  if (!selected || !cheapest || cheapest.id === selected.id) {
    return { reply: "Your current selections are already close to the best value I can find for this trip." };
  }

  const nightlySavings = selected.pricePerNight - cheapest.pricePerNight;
  const totalSavings = Math.max(0, nightlySavings * trip.nights);

  selected.selected = false;
  cheapest.selected = true;
  adjustCategory(trip, "Accommodation", -totalSavings);
  recalcBudgetTotals(trip);

  return {
    reply: `Switched your stay to ${cheapest.name} — that saves about ৳${totalSavings.toLocaleString("en-US")} on this trip.`,
    updatedTrip: trip,
  };
}

function handleRemoveActivity(trip: GeneratedTrip, keyword: string): AssistantResponse {
  let removedCount = 0;
  let removedCost = 0;
  let removedCategory: BudgetCategory["label"] | null = null;

  trip.itinerary.forEach((day) => {
    const remaining = day.activities.filter((activity) => {
      const haystack = `${activity.title} ${activity.tag} ${activity.location}`.toLowerCase();
      const matches = activity.tag !== "transfer" && haystack.includes(keyword);
      if (matches) {
        removedCount++;
        removedCost += activity.cost;
        removedCategory = categoryFor(activity.tag);
      }
      return !matches;
    });
    day.activities = remaining;
    day.totalCost = remaining.reduce((sum, activity) => sum + activity.cost, 0);
  });

  if (removedCount === 0) {
    return { reply: `I couldn't find anything matching "${keyword}" in your itinerary.` };
  }

  if (removedCategory) adjustCategory(trip, removedCategory, -removedCost);
  recalcBudgetTotals(trip);

  return {
    reply: `Removed ${removedCount} ${removedCount === 1 ? "activity" : "activities"} matching "${keyword}" and freed up ৳${removedCost.toLocaleString("en-US")}.`,
    updatedTrip: trip,
  };
}

function handleMoreFood(trip: GeneratedTrip): AssistantResponse {
  const dayWithFewestMeals = [...trip.itinerary].sort(
    (a, b) => a.activities.filter((act) => act.tag === "meal").length - b.activities.filter((act) => act.tag === "meal").length,
  )[0];

  if (!dayWithFewestMeals) {
    return { reply: "Generate a trip first so I have an itinerary to add food experiences to." };
  }

  const usedTitles = new Set(
    trip.itinerary.flatMap((day) => day.activities.filter((act) => act.tag === "meal").map((act) => act.title)),
  );
  const candidate = trip.food.find((food) => !usedTitles.has(food.title)) ?? trip.food[0];

  if (!candidate) {
    return { reply: "I don't have any additional food recommendations for this destination right now." };
  }

  const averageMealCost = Math.round(
    (trip.budget.categories.find((c) => c.label === "Food")?.amount ?? 1500) /
      Math.max(1, trip.itinerary.flatMap((day) => day.activities.filter((act) => act.tag === "meal")).length),
  );

  const newActivity: ItineraryActivity = {
    id: `assistant-${Date.now()}`,
    time: "08:00 PM",
    title: candidate.title,
    location: trip.destination.name,
    cost: averageMealCost,
    description: candidate.description,
    image: candidate.image,
    tag: "meal",
  };

  dayWithFewestMeals.activities.push(newActivity);
  dayWithFewestMeals.totalCost += newActivity.cost;
  adjustCategory(trip, "Food", newActivity.cost);
  recalcBudgetTotals(trip);

  return {
    reply: `Added "${candidate.title}" to Day ${dayWithFewestMeals.day} of your itinerary.`,
    updatedTrip: trip,
  };
}

function handleMoreRelaxed(trip: GeneratedTrip, command: string): AssistantResponse {
  const dayMatch = command.match(/day\s*(\d+)/i);
  const targetDayNumber = dayMatch ? Number(dayMatch[1]) : trip.itinerary[1]?.day ?? trip.itinerary[0]?.day;
  const day = trip.itinerary.find((entry) => entry.day === targetDayNumber);

  if (!day) {
    return { reply: "I couldn't find that day in your itinerary." };
  }

  const removable = [...day.activities].reverse().find((activity) => activity.tag !== "transfer");
  if (!removable) {
    return { reply: `Day ${day.day} is already light on activities.` };
  }

  day.activities = day.activities.filter((activity) => activity.id !== removable.id);
  day.totalCost -= removable.cost;
  adjustCategory(trip, categoryFor(removable.tag), -removable.cost);
  recalcBudgetTotals(trip);

  return {
    reply: `Made Day ${day.day} more relaxed by removing "${removable.title}".`,
    updatedTrip: trip,
  };
}

export function interpretAssistantCommand(command: string, trip: GeneratedTrip): AssistantResponse {
  const lower = command.toLowerCase();
  const working = cloneTrip(trip);

  if (lower.includes("cheap") || lower.includes("budget")) {
    return handleCheaper(working);
  }

  if (lower.includes("rain")) {
    return {
      reply:
        "If it rains, consider swapping outdoor sightseeing for local food experiences, markets, or your hotel's indoor amenities — I've kept your itinerary as-is since this is just a heads up.",
    };
  }

  const removeMatch = lower.match(/remove\s+([a-z\s]+)/);
  if (removeMatch) {
    return handleRemoveActivity(working, removeMatch[1].trim());
  }

  if (lower.includes("more food") || lower.includes("food experience")) {
    return handleMoreFood(working);
  }

  if (lower.includes("relax") || /day\s*\d+/.test(lower)) {
    return handleMoreRelaxed(working, lower);
  }

  return {
    reply:
      "I can help make this trip cheaper, add food experiences, remove an activity, or make a specific day more relaxed — try one of the suggestions below.",
  };
}
