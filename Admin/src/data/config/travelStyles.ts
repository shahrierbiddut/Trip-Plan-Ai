import {
  ArrowUpRight,
  Backpack,
  Compass,
  Heart,
  Leaf,
  Users,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

export type FilterGroup = "season" | "budget" | "duration";

export type Filters = Record<FilterGroup, string[]>;

export type Category = {
  title: string;
  description: string;
  slug: string;
  image: string;
  destinations: number;
  icon: LucideIcon;
  seasons: string[];
  budgets: string[];
  durations: string[];
  keywords: string[];
};

export type TravelPreferences = {
  travelerType: "Solo" | "Couple" | "Family" | "Friends";
  interests: string[];
  budget: string;
  duration: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

/* ============================================================
   CONSTANTS
============================================================ */

export const STORAGE_KEYS = {
  preferences: "tripplan-ai-travel-preferences",
  wishlist: "tripplan-ai-category-wishlist",
  searchHistory: "tripplan-ai-category-search-history",
} as const;

export const filterOptions: Record<FilterGroup, string[]> = {
  season: ["Spring", "Summer", "Autumn", "Winter"],
  budget: ["Budget", "Mid-range", "Luxury"],
  duration: ["Weekend Getaway", "5–7 Days", "8–14 Days", "15+ Days"],
};

export const initialFilters: Filters = {
  season: [],
  budget: [],
  duration: [],
};

export const initialPreferences: TravelPreferences = {
  travelerType: "Solo",
  interests: [],
  budget: "Mid-range",
  duration: "5–7 Days",
};

export const groupLabels: Record<FilterGroup, string> = {
  season: "Season",
  budget: "Budget",
  duration: "Duration",
};

/* ============================================================
   CATEGORY DATA
   Images point to existing photos in public/assets/
============================================================ */

export const categories: Category[] = [
  {
    title: "Backpacking",
    description: "Travel freely",
    slug: "backpacking",
    image: "/assets/jaflong/cover-1.jpg",
    destinations: 20,
    icon: Backpack,
    seasons: ["Spring", "Summer", "Autumn"],
    budgets: ["Budget", "Mid-range"],
    durations: ["5–7 Days", "8–14 Days", "15+ Days"],
    keywords: ["solo", "hostel", "local", "independent", "low-cost"],
  },
  {
    title: "Adventure",
    description: "Go beyond the familiar",
    slug: "adventure",
    image: "/assets/Sajek/cover-1.jpg",
    destinations: 24,
    icon: Compass,
    seasons: ["Spring", "Summer", "Autumn", "Winter"],
    budgets: ["Budget", "Mid-range", "Luxury"],
    durations: ["Weekend Getaway", "5–7 Days", "8–14 Days", "15+ Days"],
    keywords: ["hiking", "trekking", "camping", "mountain", "thrill"],
  },
  {
    title: "Family",
    description: "Make memories",
    slug: "family",
    image: "/assets/Sylhet/cover-1.jpg",
    destinations: 15,
    icon: Users,
    seasons: ["Spring", "Summer", "Autumn", "Winter"],
    budgets: ["Budget", "Mid-range", "Luxury"],
    durations: ["Weekend Getaway", "5–7 Days", "8–14 Days"],
    keywords: ["children", "group", "safe", "memories", "family-friendly"],
  },
  {
    title: "Nature",
    description: "Return to calm",
    slug: "nature",
    image: "/assets/sreemangal/cover-1.webp",
    destinations: 16,
    icon: Leaf,
    seasons: ["Spring", "Summer", "Autumn", "Winter"],
    budgets: ["Budget", "Mid-range", "Luxury"],
    durations: ["Weekend Getaway", "5–7 Days", "8–14 Days", "15+ Days"],
    keywords: ["forest", "waterfall", "lake", "wildlife", "peaceful"],
  },
  {
    title: "Beach",
    description: "Follow the sun",
    slug: "beach",
    image: "/assets/Coxs/cover-1.jpg",
    destinations: 18,
    icon: Waves,
    seasons: ["Spring", "Summer", "Winter"],
    budgets: ["Budget", "Mid-range", "Luxury"],
    durations: ["Weekend Getaway", "5–7 Days", "8–14 Days"],
    keywords: ["island", "ocean", "sunset", "relax", "sea"],
  },
  {
    title: "Romantic",
    description: "Escape together",
    slug: "romantic",
    image: "/assets/Saintmartin/cover-1.jpg",
    destinations: 12,
    icon: Heart,
    seasons: ["Spring", "Autumn", "Winter"],
    budgets: ["Mid-range", "Luxury"],
    durations: ["Weekend Getaway", "5–7 Days", "8–14 Days"],
    keywords: ["couple", "honeymoon", "sunset", "resort", "escape"],
  },
];

/* ============================================================
   AI MATCH SCORING
============================================================ */

export function getMatchScore(
  category: Category,
  filters: Filters,
  preferences: TravelPreferences,
  isWishlisted: boolean,
): number {
  let score = 76;

  const selectedFilters = [
    ...filters.season,
    ...filters.budget,
    ...filters.duration,
  ];
  const categoryValues = [
    ...category.seasons,
    ...category.budgets,
    ...category.durations,
  ];

  score +=
    selectedFilters.filter((item) => categoryValues.includes(item)).length * 4;
  score += preferences.interests.includes(category.slug) ? 9 : 0;
  score += category.budgets.includes(preferences.budget) ? 3 : 0;
  score += category.durations.includes(preferences.duration) ? 3 : 0;
  score += isWishlisted ? 2 : 0;

  if (preferences.travelerType === "Couple" && category.slug === "romantic")
    score += 5;
  if (preferences.travelerType === "Family" && category.slug === "family")
    score += 5;
  if (preferences.travelerType === "Solo" && category.slug === "backpacking")
    score += 4;
  if (preferences.travelerType === "Friends" && category.slug === "adventure")
    score += 4;

  return Math.min(98, score);
}

export function getDynamicDestinationCount(
  category: Category,
  filters: Filters,
): number {
  let ratio = 1;

  if (filters.season.length > 0) ratio *= 0.82;
  if (filters.budget.length > 0) ratio *= 0.76;
  if (filters.duration.length > 0) ratio *= 0.8;

  return Math.max(1, Math.round(category.destinations * ratio));
}

/* ============================================================
   ITINERARIES
============================================================ */

const itineraryByCategory: Record<string, ItineraryDay[]> = {
  adventure: [
    {
      day: 1,
      title: "Arrival & trail briefing",
      description:
        "Settle in, meet your local guide, and prepare for the route ahead.",
    },
    {
      day: 2,
      title: "Signature outdoor experience",
      description:
        "Spend the day hiking, exploring viewpoints, and enjoying a local lunch.",
    },
    {
      day: 3,
      title: "Hidden landscape & return",
      description:
        "Visit a quieter natural landmark before a relaxed journey home.",
    },
  ],
  beach: [
    {
      day: 1,
      title: "Coastal arrival",
      description:
        "Check in, walk the shoreline, and enjoy a relaxed sunset experience.",
    },
    {
      day: 2,
      title: "Island & water day",
      description:
        "Explore nearby islands, local food, and optional water activities.",
    },
    {
      day: 3,
      title: "Slow morning & departure",
      description: "Enjoy a calm beach morning before returning home.",
    },
  ],
  romantic: [
    {
      day: 1,
      title: "Private arrival experience",
      description: "Check in together and begin with a sunset dinner.",
    },
    {
      day: 2,
      title: "Curated couple experience",
      description:
        "Explore scenic places with a private activity and memorable evening.",
    },
    {
      day: 3,
      title: "Relaxed farewell",
      description:
        "Enjoy breakfast, a short photo stop, and an easy departure.",
    },
  ],
  family: [
    {
      day: 1,
      title: "Family-friendly arrival",
      description:
        "Easy check-in, nearby sightseeing, and an early group dinner.",
    },
    {
      day: 2,
      title: "Activities for everyone",
      description:
        "Mix educational, playful, and relaxing activities for all ages.",
    },
    {
      day: 3,
      title: "Memory-making morning",
      description:
        "Enjoy one final shared experience before the return trip.",
    },
  ],
  nature: [
    {
      day: 1,
      title: "Into the landscape",
      description:
        "Arrive, settle into an eco stay, and take a gentle nature walk.",
    },
    {
      day: 2,
      title: "Forest, lake & local life",
      description:
        "Explore the area's signature landscape with a local guide.",
    },
    {
      day: 3,
      title: "Quiet morning",
      description: "Enjoy a slow sunrise experience and return refreshed.",
    },
  ],
  backpacking: [
    {
      day: 1,
      title: "Local arrival & orientation",
      description:
        "Check into a social stay and learn the most efficient local route.",
    },
    {
      day: 2,
      title: "Independent discovery",
      description:
        "Follow a flexible route through markets, landmarks, and local food spots.",
    },
    {
      day: 3,
      title: "One last neighbourhood",
      description:
        "Explore a final hidden corner before moving to your next stop.",
    },
  ],
};

export function getItinerary(category: Category): ItineraryDay[] {
  return itineraryByCategory[category.slug] ?? itineraryByCategory.nature;
}

/* ============================================================
   LOCAL STORAGE HELPERS
============================================================ */

export function readStoredValue<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function storeValue<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The page still works when storage is unavailable.
  }
}
