import {
  Backpack,
  Bus,
  Camera,
  Car,
  Compass,
  Flame,
  Heart,
  Landmark,
  Leaf,
  Mountain,
  Plane,
  ShoppingBag,
  Soup,
  Sparkles,
  Sunrise,
  Train,
  Users,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import type {
  AccommodationType,
  ActivityTag,
  BudgetTier,
  ExperienceTag,
  FoodPreference,
  TransportMode,
  TravelPace,
  TravelStyleOption,
  WizardStepMeta,
} from "@/types/tripPlan";

export const DESTINATION_REGION_LABELS: Record<string, string> = {
  "coxs-bazar": "Chattogram",
  "sajek-valley": "Rangamati",
  "saint-martin": "Cox's Bazar",
  "sundarban": "Khulna Division",
  "sreemangal": "Sylhet Division",
  "sylhet": "Sylhet Division",
  "jaflong": "Sylhet Division",
  "kuakata": "Patuakhali",
  "rangamati": "Chattogram Hill Tracts",
  "bandarban": "Chattogram Hill Tracts",
};

export const WIZARD_STEPS: WizardStepMeta[] = [
  { id: "destination", index: 1, label: "Destination" },
  { id: "dates", index: 2, label: "Dates" },
  { id: "travelers", index: 3, label: "Travelers" },
  { id: "style", index: 4, label: "Style" },
  { id: "budget", index: 5, label: "Budget" },
  { id: "preferences", index: 6, label: "Preferences" },
  { id: "review", index: 7, label: "Review" },
];

export const TRAVEL_STYLE_OPTIONS: TravelStyleOption[] = [
  { id: "adventure", label: "Adventure", icon: Compass },
  { id: "nature", label: "Nature", icon: Leaf },
  { id: "beach", label: "Beach", icon: Waves },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "family", label: "Family", icon: Users },
  { id: "backpacking", label: "Backpacking", icon: Backpack },
  { id: "relaxation", label: "Relaxation", icon: Sunrise },
  { id: "cultural", label: "Cultural", icon: Landmark },
];

export const EXPERIENCE_TAG_OPTIONS: { id: ExperienceTag; icon: typeof Waves }[] = [
  { id: "Beach", icon: Waves },
  { id: "Nature", icon: Leaf },
  { id: "Adventure", icon: Mountain },
  { id: "Relaxation", icon: Sunrise },
  { id: "Culture", icon: Landmark },
  { id: "Food", icon: UtensilsCrossed },
  { id: "Romantic", icon: Heart },
  { id: "Family", icon: Users },
];

export const DURATION_CHIPS: { label: string; days: number }[] = [
  { label: "Weekend", days: 2 },
  { label: "3–5 Days", days: 4 },
  { label: "5–7 Days", days: 6 },
  { label: "8–14 Days", days: 10 },
  { label: "15+ Days", days: 16 },
];

export const ACCOMMODATION_OPTIONS: { id: AccommodationType; label: string }[] = [
  { id: "hotel", label: "Hotel" },
  { id: "resort", label: "Resort" },
  { id: "budget-stay", label: "Budget Stay" },
  { id: "premium-stay", label: "Premium Stay" },
];

export const FOOD_PREFERENCE_OPTIONS: { id: FoodPreference; label: string; icon: typeof Soup }[] = [
  { id: "local", label: "Local Food", icon: Soup },
  { id: "seafood", label: "Seafood", icon: Waves },
  { id: "traditional", label: "Traditional", icon: UtensilsCrossed },
  { id: "street-food", label: "Street Food", icon: Flame },
  { id: "fine-dining", label: "Fine Dining", icon: Sparkles },
];

export const TRANSPORT_OPTIONS: { id: TransportMode; label: string; icon: typeof Bus }[] = [
  { id: "bus", label: "Bus", icon: Bus },
  { id: "train", label: "Train", icon: Train },
  { id: "private-car", label: "Private Car", icon: Car },
  { id: "flight", label: "Flight", icon: Plane },
  { id: "mixed", label: "Mixed", icon: Compass },
];

export const ACTIVITY_OPTIONS: { id: ActivityTag; label: string; icon: typeof Waves }[] = [
  { id: "beach", label: "Beach", icon: Waves },
  { id: "hiking", label: "Hiking", icon: Mountain },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "sightseeing", label: "Sightseeing", icon: Compass },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "culture", label: "Culture", icon: Landmark },
  { id: "nature", label: "Nature", icon: Leaf },
  { id: "food-experiences", label: "Food Experiences", icon: UtensilsCrossed },
  { id: "relaxation", label: "Relaxation", icon: Sunrise },
];

export const TRAVEL_PACE_OPTIONS: { id: TravelPace; label: string; description: string }[] = [
  { id: "relaxed", label: "Relaxed", description: "Fewer stops, more downtime" },
  { id: "balanced", label: "Balanced", description: "A steady, well-rounded mix" },
  { id: "packed", label: "Packed", description: "See and do as much as possible" },
];

export const BUDGET_TIER_OPTIONS: {
  id: BudgetTier;
  label: string;
  description: string;
  perDayBdt: number;
}[] = [
  { id: "economy", label: "Economy", description: "Budget stays, local food", perDayBdt: 2500 },
  { id: "standard", label: "Standard", description: "Comfortable & balanced", perDayBdt: 4500 },
  { id: "premium", label: "Premium", description: "Upgraded stays & experiences", perDayBdt: 7500 },
  { id: "luxury", label: "Luxury", description: "Top-tier comfort throughout", perDayBdt: 12000 },
];

export const BUDGET_CATEGORY_COLORS: Record<string, string> = {
  Accommodation: "#073D31",
  Transport: "#F4A934",
  Food: "#087F5B",
  Activities: "#D9861F",
  Other: "#66736D",
};
