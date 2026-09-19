import type { Metadata } from "next";
import { HotelDiscoveryPage } from "@/components/hotels/HotelDiscoveryPage";

export const metadata: Metadata = {
  title: "Hotels in Bangladesh | TripPlan AI",
  description:
    "Discover hotels across Bangladesh by destination, total stay cost, facilities and traveller needs.",
};

export default function HotelsPage() {
  return <HotelDiscoveryPage />;
}