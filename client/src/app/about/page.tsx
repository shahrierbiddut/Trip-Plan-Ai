import AboutPageContent from "@/components/AboutPageContent";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us | TripPlan AI",
  description:
    "Learn how TripPlan AI makes travel planning smarter through personalized itineraries, trusted insights, and AI-powered recommendations.",
};

export default function AboutPage() {
  return <AboutPageContent/>;
}