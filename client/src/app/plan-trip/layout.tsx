"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TripPlanToaster } from "@/components/TripPlanToast";

export default function PlanTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#FBFCFA] via-[#FAFAF7] to-[#F3F7F4]">
      <TripPlanToaster />
      <Navbar />
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-[#087F5B]/[0.06] blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-[520px] h-96 w-96 rounded-full bg-[#F4A934]/[0.08] blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-[1400px] h-80 w-80 rounded-full bg-[#087F5B]/[0.05] blur-[110px]"
        />
        <div className="relative pt-24">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
