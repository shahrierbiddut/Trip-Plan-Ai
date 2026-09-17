import type { Metadata } from "next";
import TravelGuidesPage from "@/components/inspiration/TravelGuidesPage";

export const metadata: Metadata = {
  title: "Travel Guides | TripPlan AI",
  description: "Practical Bangladesh travel guides for first trips, family getaways, budgets and better preparation.",
};

export default function Page() {
  return <TravelGuidesPage />;
}
