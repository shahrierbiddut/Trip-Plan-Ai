import type { LucideIcon } from "lucide-react";
import type { DestinationData } from "@/data/destinations/destinations";

/* ============================================================
   WIZARD / FORM STATE
============================================================ */

export type TravelerType = "Solo" | "Couple" | "Family" | "Friends";

export type TravelStyleId =
  | "adventure"
  | "nature"
  | "beach"
  | "romantic"
  | "family"
  | "backpacking"
  | "relaxation"
  | "cultural";

export type BudgetTier = "economy" | "standard" | "premium" | "luxury";

export type AccommodationType =
  | "hotel"
  | "resort"
  | "budget-stay"
  | "premium-stay";

export type FoodPreference =
  | "local"
  | "seafood"
  | "traditional"
  | "street-food"
  | "fine-dining";

export type TransportMode = "bus" | "train" | "private-car" | "flight" | "mixed";

export type ActivityTag =
  | "beach"
  | "hiking"
  | "photography"
  | "sightseeing"
  | "shopping"
  | "culture"
  | "nature"
  | "food-experiences"
  | "relaxation";

export type TravelPace = "relaxed" | "balanced" | "packed";

export interface TravelerCounts {
  adults: number;
  children: number;
}

export interface TripPlanFormState {
  destinationSlug: string | null;
  startDate: string | null;
  endDate: string | null;
  travelerType: TravelerType;
  travelers: TravelerCounts;
  travelStyles: TravelStyleId[];
  budgetTier: BudgetTier;
  customBudget: number | null;
  accommodation: AccommodationType | null;
  foodPreferences: FoodPreference[];
  transport: TransportMode | null;
  activities: ActivityTag[];
  travelPace: TravelPace;
}

/* ============================================================
   AI DESTINATION MATCHER
============================================================ */

export type ExperienceTag =
  | "Beach"
  | "Nature"
  | "Adventure"
  | "Relaxation"
  | "Culture"
  | "Food"
  | "Romantic"
  | "Family";

export interface DestinationMatch {
  destination: DestinationData;
  matchPercent: number;
  reasons: string[];
}

/* ============================================================
   GENERATED TRIP OUTPUT (kept separate from form state)
============================================================ */

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  cost: number;
  description: string;
  image?: string;
  travelMode?: TransportMode | "walk";
  tag: ActivityTag | "meal" | "transfer" | "stay";
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
  totalCost: number;
}

export interface HotelRecommendation {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  amenities: string[];
  pricePerNight: number;
  image: string;
  aiMatch: number;
  selected: boolean;
}

export interface FoodRecommendation {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  image: string;
  type: string;
  aiMatch: number;
}

export interface TransportLeg {
  from: string;
  to: string;
  mode: TransportMode;
  estimatedCost: number;
  note?: string;
}

export interface TransportPlan {
  legs: TransportLeg[];
  totalEstimatedCost: number;
}

export interface BudgetCategory {
  label: "Accommodation" | "Transport" | "Food" | "Activities" | "Other";
  amount: number;
  percent: number;
  color: string;
}

export interface BudgetBreakdown {
  total: number;
  categories: BudgetCategory[];
  usedPercent: number;
  budgetLimit: number;
  aiSuggestion?: string;
}

export interface AIRecommendationReason {
  label: string;
  matched: boolean;
}

export interface AIRecommendation {
  matchPercent: number;
  reasons: AIRecommendationReason[];
}

export interface GeneratedTrip {
  id: string;
  createdAt: string;
  formState: TripPlanFormState;
  destination: DestinationData;
  days: number;
  nights: number;
  itinerary: ItineraryDay[];
  hotels: HotelRecommendation[];
  food: FoodRecommendation[];
  transport: TransportPlan;
  budget: BudgetBreakdown;
  aiRecommendation: AIRecommendation;
  notes: string[];
}

/* ============================================================
   WIZARD UI
============================================================ */

export type WizardStepId =
  | "destination"
  | "dates"
  | "travelers"
  | "style"
  | "budget"
  | "preferences"
  | "review";

export interface WizardStepMeta {
  id: WizardStepId;
  index: number;
  label: string;
}

export interface TravelStyleOption {
  id: TravelStyleId;
  label: string;
  icon: LucideIcon;
}

export type ResultTabId =
  | "itinerary"
  | "stay"
  | "food"
  | "transport"
  | "budget"
  | "notes";
