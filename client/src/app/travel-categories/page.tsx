import TravelCategoriesPage from "@/components/TravelCategoriesPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Travel Categories | TripPlan AI",
  description:
    "Explore travel styles and discover destinations by season, budget, and trip duration with TripPlan AI.",
};

export default function Page() {
  return <TravelCategoriesPage/>;
}