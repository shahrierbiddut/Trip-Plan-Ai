"use client";

import { Clock3, MapPinned, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "AI-Powered", description: "Smart itinerary generation" },
  { icon: MapPinned, title: "Local Expertise", description: "100% Bangladesh focused" },
  { icon: ShieldCheck, title: "Secure & Private", description: "Your trip data stays yours" },
  { icon: Clock3, title: "Save Time", description: "Plan a full trip in minutes" },
];

export default function WhyTripPlanAI() {
  return (
    <section className="rounded-[22px] border border-[#DCE6E1] bg-white p-6 shadow-[0_10px_30px_rgba(7,26,22,0.05)]">
      <h2 className="font-serif text-[18px] font-bold text-[#12342D]">Why plan with TripPlan AI?</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF5F1] text-[#087F5B]">
              <Icon size={17} />
            </span>
            <div>
              <p className="text-[12px] font-bold text-[#12342D]">{title}</p>
              <p className="text-[11px] text-[#687873]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
