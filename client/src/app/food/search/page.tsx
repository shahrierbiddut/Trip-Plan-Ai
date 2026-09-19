import type { Metadata } from "next";
import { FoodSearchResultsPage } from "@/components/food/FoodSearchResultsPage";

export const metadata: Metadata = {
  title: "Food Search Results | TripPlan AI",
  description:
    "Compare restaurants and local food places by destination, meal budget and traveller needs.",
};

type FoodSearchPageProps = {
  searchParams: Promise<{
    destination?: string;
    mealTime?: string;
    guests?: string;
    diningStyle?: string;
    budget?: string;
    collection?: string;
  }>;
};

export default async function FoodSearchPage({ searchParams }: FoodSearchPageProps) {
  const params = await searchParams;

  return <FoodSearchResultsPage defaults={params} />;
}