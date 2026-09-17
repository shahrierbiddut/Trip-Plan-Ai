import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelComparePage } from "@/components/hotels/HotelComparePage";

export const metadata: Metadata = {
  title: "Compare Hotels | TripPlan AI",
  description: "Compare shortlisted hotels by total price, rating, location, policies and trip fit.",
};

export default function CompareHotelsRoute() {
  return (
    <Suspense fallback={<CompareLoading />}>
      <HotelComparePage />
    </Suspense>
  );
}

function CompareLoading() {
  return (
    <main className="min-h-screen bg-[#f8f8f4] px-4 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px] animate-pulse">
        <div className="mx-auto h-14 max-w-2xl rounded-xl bg-[#e8efec]" />
        <div className="mt-10 h-[760px] rounded-[30px] bg-[#e8efec]" />
      </div>
    </main>
  );
}
