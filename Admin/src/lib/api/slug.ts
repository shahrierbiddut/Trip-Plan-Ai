const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

import { TravelCategory } from "@/types/travelCategory";

export const getFeatReviews = async () => {
  try {
    const response = await fetch(`${url}/api/featured-reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured reviews");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    throw error;
  }
};

export const getTravelCategories = async (): Promise<TravelCategory[]> => {
  try {
    const response = await fetch(`${url}/api/travel-categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch travel categories");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching travel categories:", error);
    throw error;
  }
};