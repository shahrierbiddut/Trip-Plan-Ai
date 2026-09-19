import type { Metadata } from "next";
import { FoodDiscoveryPage } from "@/components/food/FoodDiscoveryPage";

export const metadata: Metadata = {
  title: "Food & Restaurants in Bangladesh | TripPlan AI",
  description:
    "Discover local food, trusted restaurants and practical meal ideas across Bangladesh by destination, budget and traveller needs.",
};

export default function FoodPage() {
  return <FoodDiscoveryPage />;
}