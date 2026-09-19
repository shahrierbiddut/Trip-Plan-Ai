import { API_BASE_URL } from "@/lib/api/config";
const url = API_BASE_URL;

import { TravelCategory } from "@/types/travelCategory";

export const getFeatReviews = async () => {
  try {
    const response = await fetch(`${url}/api/featured-reviews`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured reviews: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching featured reviews from:", url, error);
    // Return empty array as fallback so the page doesn't crash entirely
    return [];
  }
};

export const getTravelCategories = async (): Promise<TravelCategory[]> => {
  try {
    const response = await fetch(`${url}/api/travel-categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch travel categories: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching travel categories from:", url, error);
    return [];
  }
};