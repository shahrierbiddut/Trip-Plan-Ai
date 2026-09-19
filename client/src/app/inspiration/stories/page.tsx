import type { Metadata } from "next";
import TravelStoriesPage from "@/components/inspiration/stories/TravelStoriesPage";

export const metadata: Metadata = {
  title: "Travel Stories | TripPlan AI",
  description: "Published journeys across Bangladesh, thoughtfully summarised with original authors, dates and sources. Find inspiration and start your own travel journal.",
};

export default function Page() { return <TravelStoriesPage />; }
