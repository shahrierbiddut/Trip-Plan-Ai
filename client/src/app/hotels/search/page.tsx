import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelSearchResultsPage } from "@/components/hotels/HotelSearchResultsPage";

export const metadata: Metadata = {
  title: "Search Hotels | TripPlan AI",
  description: "Filter, sort, compare and explore hotels with transparent total pricing.",
};

export default function HotelSearchPage() {
  return (
    <Suspense fallback={<HotelSearchLoading />}>
      <HotelSearchResultsPage />
    </Suspense>
  );
}

function HotelSearchLoading() {
  return (
    <main className="min-h-screen bg-[#f7f7f3] px-4 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] animate-pulse space-y-5">
        <div className="h-20 rounded-[26px] bg-[#e8efec]" />
        <div className="h-12 w-1/3 rounded-xl bg-[#e8efec]" />
        <div className="grid gap-5 lg:grid-cols-[260px_1fr_380px]">
          <div className="h-[620px] rounded-[26px] bg-[#e8efec]" />
          <div className="space-y-5">{[1, 2, 3].map((item) => <div key={item} className="h-[280px] rounded-[26px] bg-[#e8efec]" />)}</div>
          <div className="h-[620px] rounded-[26px] bg-[#e8efec]" />
        </div>
      </div>
    </main>
  );
}