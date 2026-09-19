import { destinationsData, type DestinationData } from "@/data/destinations/destinations";
import { getDestinationBySlug } from "@/data/destinations/destinationRegistry";
import { BUDGET_CATEGORY_COLORS, BUDGET_TIER_OPTIONS, TRAVEL_STYLE_OPTIONS } from "@/data/config/tripPlanOptions";
import type {
  AIRecommendation,
  BudgetBreakdown,
  BudgetCategory,
  FoodRecommendation,
  GeneratedTrip,
  HotelRecommendation,
  ItineraryActivity,
  ItineraryDay,
  TransportPlan,
  TripPlanFormState,
} from "@/types/tripPlan";

/* ============================================================
   RAW DATA ADAPTER
   destinationRegistry.ts is untyped — normalize the fields this
   service actually reads so the rest of the file stays typed.
============================================================ */

interface RawHotel {
  id: number | string;
  name: string;
  category: string;
  rating: number;
  location: string;
  priceFrom: number;
  image: string;
  amenities: string[];
}

interface RawFood {
  id: number | string;
  title: string;
  description: string;
  price: string;
  image: string;
  type: string;
}

interface RawPlace {
  id: number | string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  tags?: string[];
}

interface RawItineraryTemplate {
  day: string;
  title: string;
  description: string;
  image: string;
}

interface RawDestinationDetail {
  heroImage: string;
  aiMatch: number;
  recommendedStay: string;
  estimatedBudget: number;
  tags: string[];
  itinerary: RawItineraryTemplate[];
  placesToExplore: RawPlace[];
  budget: {
    baseTransport: number;
    baseStay: number;
    baseFood: number;
    baseActivities: number;
    baseMisc: number;
  };
  hotels: RawHotel[];
  foods: RawFood[];
  travelInfo: {
    gettingThere?: { air?: string; road?: string };
    gettingAround?: { options?: string };
  };
  travelTips: string[];
}

function normalizeDestinationDetail(slug: string): RawDestinationDetail | null {
  const raw = getDestinationBySlug(slug);
  if (!raw) return null;

  return {
    heroImage: raw.heroImage ?? "",
    aiMatch: raw.aiMatch ?? 85,
    recommendedStay: raw.recommendedStay ?? "3–5 Days",
    estimatedBudget: raw.estimatedBudget ?? 8000,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    itinerary: Array.isArray(raw.itinerary) ? raw.itinerary : [],
    placesToExplore: Array.isArray(raw.placesToExplore) ? raw.placesToExplore : [],
    budget: {
      baseTransport: raw.budget?.baseTransport ?? 2000,
      baseStay: raw.budget?.baseStay ?? 4000,
      baseFood: raw.budget?.baseFood ?? 2500,
      baseActivities: raw.budget?.baseActivities ?? 1500,
      baseMisc: raw.budget?.baseMisc ?? 1000,
    },
    hotels: Array.isArray(raw.hotels) ? raw.hotels : [],
    foods: Array.isArray(raw.foods) ? raw.foods : [],
    travelInfo: raw.travelInfo ?? {},
    travelTips: Array.isArray(raw.travelTips) ? raw.travelTips : [],
  };
}

/* ============================================================
   HELPERS
============================================================ */

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function computeDurationDays(form: TripPlanFormState): number {
  if (form.startDate && form.endDate) {
    const start = new Date(form.startDate).getTime();
    const end = new Date(form.endDate).getTime();
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (Number.isFinite(diffDays) && diffDays > 0) return diffDays;
  }
  return 3;
}

function travelStyleLabels(form: TripPlanFormState): string[] {
  return form.travelStyles
    .map((id) => TRAVEL_STYLE_OPTIONS.find((option) => option.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function parseStayRange(recommendedStay: string): { min: number; max: number } {
  const numbers = recommendedStay.match(/\d+/g)?.map(Number) ?? [3, 5];
  return { min: numbers[0] ?? 3, max: numbers[numbers.length - 1] ?? numbers[0] ?? 5 };
}

const ACTIVITY_SLOT_TIMES = ["08:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM", "08:30 PM"];
const PACE_ACTIVITY_COUNT: Record<TripPlanFormState["travelPace"], number> = {
  relaxed: 3,
  balanced: 4,
  packed: 5,
};

/* ============================================================
   ITINERARY SYNTHESIS
============================================================ */

function buildItinerary(
  destinationName: string,
  days: number,
  raw: RawDestinationDetail,
  form: TripPlanFormState,
  tripFoodBudget: number,
  tripActivitiesBudget: number,
  transportTotal: number,
  seedOffset = 0,
): ItineraryDay[] {
  const pool: RawPlace[] = raw.placesToExplore.length
    ? raw.placesToExplore
    : raw.itinerary.map((template, index) => ({
        id: index,
        title: template.title,
        description: template.description,
        image: template.image,
      }));

  const activityCount = PACE_ACTIVITY_COUNT[form.travelPace];
  const dayFoodBudget = tripFoodBudget / days;
  const dayActivitiesBudget = tripActivitiesBudget / days;
  const itinerary: ItineraryDay[] = [];
  let poolCursor = seedOffset % Math.max(1, pool.length);
  let foodCursor = seedOffset % Math.max(1, raw.foods.length);

  for (let day = 1; day <= days; day++) {
    const template = raw.itinerary[(day - 1) % raw.itinerary.length] ?? {
      title: `Explore ${destinationName}`,
      description: `A day discovering the best of ${destinationName}.`,
      image: raw.heroImage,
    };

    const slots = ACTIVITY_SLOT_TIMES.slice(0, activityCount);
    const activities: ItineraryActivity[] = [];
    let headlinePlace: RawPlace | null = null;

    slots.forEach((time, slotIndex) => {
      const isFirstSlotOfDay1 = day === 1 && slotIndex === 0;
      const isLastSlotOfFinalDay = day === days && slotIndex === slots.length - 1 && days > 1;
      const isMealSlot = !isFirstSlotOfDay1 && !isLastSlotOfFinalDay && slotIndex % 2 === 1;

      if (isFirstSlotOfDay1) {
        activities.push({
          id: `d${day}-a${slotIndex}`,
          time,
          title: `Dhaka → ${destinationName}`,
          location: destinationName,
          cost: Math.round(transportTotal),
          description: raw.travelInfo.gettingThere?.road ?? raw.travelInfo.gettingThere?.air ?? "Arrival transfer.",
          travelMode: form.transport ?? "bus",
          tag: "transfer",
        });
        return;
      }

      if (isLastSlotOfFinalDay) {
        activities.push({
          id: `d${day}-a${slotIndex}`,
          time,
          title: `${destinationName} → Dhaka`,
          location: destinationName,
          cost: 0,
          description: "Departure transfer, included in your transport package.",
          travelMode: form.transport ?? "bus",
          tag: "transfer",
        });
        return;
      }

      if (isMealSlot) {
        const food = raw.foods[foodCursor % Math.max(1, raw.foods.length)];
        foodCursor++;
        activities.push({
          id: `d${day}-a${slotIndex}`,
          time,
          title: food ? food.title : "Local meal",
          location: destinationName,
          cost: Math.round(dayFoodBudget / Math.max(1, Math.ceil(slots.length / 2))),
          description: food?.description ?? "A taste of the local cuisine.",
          image: food?.image,
          tag: "meal",
        });
        return;
      }

      const place = pool[poolCursor % Math.max(1, pool.length)] ?? {
        title: template.title,
        description: template.description,
        image: template.image,
      };
      poolCursor++;
      if (!headlinePlace) headlinePlace = place;
      activities.push({
        id: `d${day}-a${slotIndex}`,
        time,
        title: place.title,
        location: `${place.title}, ${destinationName}`,
        cost: Math.round(dayActivitiesBudget / Math.max(1, Math.floor(slots.length / 2))),
        description: place.description,
        image: place.image,
        travelMode: "walk",
        tag: "sightseeing" as ItineraryActivity["tag"],
      });
    });

    const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);
    const headlineTitle: string | null = headlinePlace ? (headlinePlace as RawPlace).title : null;

    let dayTitle: string;
    if (day <= raw.itinerary.length) {
      dayTitle = day === 1 ? `Arrival · ${template.title}` : template.title;
    } else if (day === days) {
      dayTitle = headlineTitle ? `Relax & Departure · ${headlineTitle}` : "Relax & Departure";
    } else {
      dayTitle = headlineTitle ? `Discovering ${headlineTitle}` : `Exploring ${destinationName}`;
    }

    itinerary.push({
      day,
      title: dayTitle,
      activities,
      totalCost,
    });
  }

  return itinerary;
}

/* ============================================================
   HOTELS / FOOD / TRANSPORT
============================================================ */

const TIER_TO_CATEGORY: Record<TripPlanFormState["budgetTier"], string> = {
  economy: "Budget",
  standard: "Comfort",
  premium: "Premium",
  luxury: "Luxury",
};

function buildHotels(raw: RawDestinationDetail, form: TripPlanFormState): HotelRecommendation[] {
  const preferredCategory = TIER_TO_CATEGORY[form.budgetTier];
  const hotels = raw.hotels.map((hotel) => {
    const categoryMatch = hotel.category.toLowerCase() === preferredCategory.toLowerCase();
    const aiMatch = clamp(Math.round(60 + hotel.rating * 6 + (categoryMatch ? 15 : 0)), 60, 99);
    return {
      id: String(hotel.id),
      name: hotel.name,
      category: hotel.category,
      rating: hotel.rating,
      location: hotel.location,
      amenities: hotel.amenities,
      pricePerNight: hotel.priceFrom,
      image: hotel.image,
      aiMatch,
      selected: false,
    };
  });

  hotels.sort((a, b) => b.aiMatch - a.aiMatch);
  if (hotels[0]) hotels[0].selected = true;
  return hotels;
}

function buildFood(raw: RawDestinationDetail, form: TripPlanFormState): FoodRecommendation[] {
  const preferenceKeywords = form.foodPreferences.map((pref) => pref.replace("-", " "));
  return raw.foods.map((food) => {
    const haystack = `${food.title} ${food.type}`.toLowerCase();
    const matchedPreference = preferenceKeywords.some((keyword) => haystack.includes(keyword));
    return {
      id: String(food.id),
      title: food.title,
      description: food.description,
      priceRange: food.price,
      image: food.image,
      type: food.type,
      aiMatch: clamp(matchedPreference ? 92 : 78, 70, 97),
    };
  });
}

function buildTransport(
  destination: DestinationData,
  raw: RawDestinationDetail,
  form: TripPlanFormState,
  transportTotal: number,
  activitiesTotal: number,
): TransportPlan {
  const mode = form.transport ?? "bus";
  const legs: TransportPlan["legs"] = [
    {
      from: "Dhaka",
      to: destination.name,
      mode,
      estimatedCost: Math.round(transportTotal * 0.7),
      note: raw.travelInfo.gettingThere?.road ?? raw.travelInfo.gettingThere?.air,
    },
    {
      from: destination.name,
      to: "Local attractions",
      mode: "mixed",
      estimatedCost: Math.round(activitiesTotal * 0.08),
      note: raw.travelInfo.gettingAround?.options,
    },
    {
      from: destination.name,
      to: "Dhaka",
      mode,
      estimatedCost: Math.round(transportTotal * 0.3),
      note: "Return journey.",
    },
  ];

  return {
    legs,
    totalEstimatedCost: legs.reduce((sum, leg) => sum + leg.estimatedCost, 0),
  };
}

/* ============================================================
   BUDGET
============================================================ */

function buildBudget(
  stayTotal: number,
  transportTotal: number,
  foodTotal: number,
  activitiesTotal: number,
  miscTotal: number,
  form: TripPlanFormState,
  days: number,
  hotels: HotelRecommendation[],
): BudgetBreakdown {
  const categories: BudgetCategory[] = [
    { label: "Accommodation", amount: Math.round(stayTotal), percent: 0, color: BUDGET_CATEGORY_COLORS.Accommodation },
    { label: "Transport", amount: Math.round(transportTotal), percent: 0, color: BUDGET_CATEGORY_COLORS.Transport },
    { label: "Food", amount: Math.round(foodTotal), percent: 0, color: BUDGET_CATEGORY_COLORS.Food },
    { label: "Activities", amount: Math.round(activitiesTotal), percent: 0, color: BUDGET_CATEGORY_COLORS.Activities },
    { label: "Other", amount: Math.round(miscTotal), percent: 0, color: BUDGET_CATEGORY_COLORS.Other },
  ];

  const total = categories.reduce((sum, category) => sum + category.amount, 0);
  categories.forEach((category) => {
    category.percent = total > 0 ? Math.round((category.amount / total) * 100) : 0;
  });

  const tierBaseline = BUDGET_TIER_OPTIONS.find((tier) => tier.id === form.budgetTier)?.perDayBdt ?? 4500;
  const travelerCount = Math.max(1, form.travelers.adults + form.travelers.children);
  const budgetLimit = form.customBudget ?? tierBaseline * days * travelerCount;
  const usedPercent = budgetLimit > 0 ? Math.round((total / budgetLimit) * 100) : 100;

  let aiSuggestion: string | undefined;
  if (usedPercent > 100) {
    const cheapestAlternative = [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight)[0];
    const currentHotel = hotels.find((hotel) => hotel.selected);
    const potentialSavings =
      currentHotel && cheapestAlternative && cheapestAlternative.id !== currentHotel.id
        ? Math.max(0, (currentHotel.pricePerNight - cheapestAlternative.pricePerNight) * Math.max(1, days - 1))
        : Math.round(total * 0.08);
    aiSuggestion =
      potentialSavings > 0
        ? `Switching to a nearby hotel could save approximately ৳${potentialSavings.toLocaleString("en-US")}.`
        : "Trimming one activity per day could bring this trip closer to your budget.";
  } else if (usedPercent < 75) {
    const remaining = budgetLimit - total;
    aiSuggestion = `You're comfortably within budget with about ৳${Math.round(remaining).toLocaleString("en-US")} to spare — consider upgrading your stay or adding an extra experience.`;
  }

  return { total, categories, usedPercent, budgetLimit, aiSuggestion };
}

/* ============================================================
   AI RECOMMENDATION
============================================================ */

function buildAIRecommendation(
  destination: DestinationData,
  raw: RawDestinationDetail,
  form: TripPlanFormState,
  days: number,
  budget: BudgetBreakdown,
): AIRecommendation {
  const styleLabels = travelStyleLabels(form);
  const destinationTags = [...destination.styles, ...raw.tags].map((tag) => tag.toLowerCase());
  const matchedStyleLabels = styleLabels.filter((label) =>
    destinationTags.some((tag) => tag.includes(label.toLowerCase()) || label.toLowerCase().includes(tag)),
  );

  const stayRange = parseStayRange(raw.recommendedStay);
  const durationFits = days >= stayRange.min - 1 && days <= stayRange.max + 3;
  const budgetFits = budget.total <= budget.budgetLimit * 1.15;
  const familyFriendly =
    form.travelerType !== "Family" || destinationTags.some((tag) => tag.includes("family"));

  const matchPercent = clamp(
    70 + matchedStyleLabels.length * 6 + (budgetFits ? 6 : 0) + (durationFits ? 5 : 0) + (familyFriendly ? 3 : 0),
    70,
    99,
  );

  const styleReasonLabel =
    matchedStyleLabels.length > 0
      ? `Matches your love of ${matchedStyleLabels.join(", ")}`
      : styleLabels.length > 0
        ? `A different flavor from your usual ${styleLabels[0].toLowerCase()} trips`
        : "A well-rounded destination for any travel style";

  const paceReasonLabel =
    form.travelPace === "packed"
      ? "Plenty of activities to fill a packed schedule"
      : form.travelPace === "relaxed"
        ? "Unhurried days that match your relaxed pace"
        : "A balanced mix of sightseeing and downtime";

  return {
    matchPercent,
    reasons: [
      { label: styleReasonLabel, matched: matchedStyleLabels.length > 0 },
      { label: "Fits your selected budget", matched: budgetFits },
      { label: `Great for a ${days}-day trip`, matched: durationFits },
      { label: paceReasonLabel, matched: true },
      { label: `Suited for ${form.travelerType.toLowerCase()} travel`, matched: familyFriendly },
    ],
  };
}

/* ============================================================
   PUBLIC API
============================================================ */

export function generateTrip(form: TripPlanFormState, seedOffset = 0): GeneratedTrip | null {
  if (!form.destinationSlug) return null;

  const destination = destinationsData.find((entry) => entry.slug === form.destinationSlug);
  if (!destination) return null;

  const raw = normalizeDestinationDetail(form.destinationSlug);
  if (!raw) return null;

  const days = computeDurationDays(form);
  const nights = Math.max(1, days - 1);
  const travelerCount = Math.max(1, form.travelers.adults + form.travelers.children);
  const templateDays = Math.max(1, raw.itinerary.length);

  const transportTotal = raw.budget.baseTransport * travelerCount;
  const stayTotal = raw.budget.baseStay * nights;
  const perDayFood = raw.budget.baseFood / templateDays;
  const foodTotal = perDayFood * days * travelerCount;
  const perDayActivities = raw.budget.baseActivities / templateDays;
  const activitiesTotal = perDayActivities * days * travelerCount;
  const perDayMisc = raw.budget.baseMisc / templateDays;
  const miscTotal = perDayMisc * days * travelerCount;

  const itinerary = buildItinerary(destination.name, days, raw, form, foodTotal, activitiesTotal, transportTotal, seedOffset);
  const hotels = buildHotels(raw, form);
  const food = buildFood(raw, form);
  const transport = buildTransport(destination, raw, form, transportTotal, activitiesTotal);
  const budget = buildBudget(stayTotal, transportTotal, foodTotal, activitiesTotal, miscTotal, form, days, hotels);
  const aiRecommendation = buildAIRecommendation(destination, raw, form, days, budget);

  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    formState: form,
    destination,
    days,
    nights,
    itinerary,
    hotels,
    food,
    transport,
    budget,
    aiRecommendation,
    notes: raw.travelTips,
  };
}

export function isFormValid(form: TripPlanFormState): boolean {
  return Boolean(
    form.destinationSlug &&
      form.startDate &&
      form.endDate &&
      form.travelers.adults + form.travelers.children > 0,
  );
}
