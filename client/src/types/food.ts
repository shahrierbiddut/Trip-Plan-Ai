export type DiningStyle =
  | "Local favourites"
  | "Family dining"
  | "Street food"
  | "Fine dining"
  | "Cafe & snacks";

export type FoodDestination = {
  name: string;
  slug: string;
  image: string;
  restaurantCount: number;
  startingPrice: number;
  famousFor: string;
  popularArea: string;
};

export type RestaurantSpotlight = {
  id: string;
  slug: string;
  name: string;
  destination: string;
  area: string;
  image: string;
  rating: number;
  reviewCount: number;
  popularDish: string;
  category: string;
  estimatedCostForTwo: number;
  shortDescription?: string;
  openNow?: boolean;
  distanceKm?: number;
  facilities?: string[];
  address?: string;
  phone?: string;
};