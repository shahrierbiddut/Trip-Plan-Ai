import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoodDetailsPage } from "@/components/food/FoodDetailsPage";
import { fetchFoodBySlug } from "@/lib/api/food";

export const dynamic = "force-dynamic";

type FoodDetailsRouteProps = {
  params: Promise<{ restaurantSlug: string }>;
};

export async function generateMetadata({ params }: FoodDetailsRouteProps): Promise<Metadata> {
  const { restaurantSlug } = await params;
  const res = await fetchFoodBySlug(restaurantSlug);
  const restaurant = res?.success ? res.data : null;

  if (!restaurant) return { title: "Restaurant not found | TripPlan AI" };

  return {
    title: `${restaurant.name} | TripPlan AI`,
    description: `Discover ${restaurant.name} in ${restaurant.destination}. View the menu, ratings, and plan your meal.`,
  };
}

export default async function FoodDetailsRoute({ params }: FoodDetailsRouteProps) {
  const { restaurantSlug } = await params;
  const res = await fetchFoodBySlug(restaurantSlug);
  const restaurant = res?.success ? res.data : null;

  if (!restaurant) notFound();

  return <FoodDetailsPage restaurant={restaurant} />;
}