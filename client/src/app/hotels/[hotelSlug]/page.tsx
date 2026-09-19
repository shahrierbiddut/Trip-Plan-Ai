import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetailsPage } from "@/components/hotels/HotelDetailsPage";
import { fetchHotelBySlug } from "@/lib/api/hotels";

export const dynamic = "force-dynamic";

type HotelDetailsRouteProps = {
  params: Promise<{ hotelSlug: string }>;
};

export async function generateMetadata({ params }: HotelDetailsRouteProps): Promise<Metadata> {
  const { hotelSlug } = await params;
  const res = await fetchHotelBySlug(hotelSlug);
  const hotel = res?.success ? res.data : null;

  if (!hotel) return { title: "Hotel not found | TripPlan AI" };

  return {
    title: `${hotel.name} | TripPlan AI`,
    description: `${hotel.name} in ${hotel.destination}. View rooms, transparent prices, nearby places and guest review intelligence.`,
  };
}

export default async function HotelDetailsRoute({ params }: HotelDetailsRouteProps) {
  const { hotelSlug } = await params;
  const res = await fetchHotelBySlug(hotelSlug);
  const hotel = res?.success ? res.data : null;

  if (!hotel) notFound();

  return <HotelDetailsPage hotel={hotel} />;
}