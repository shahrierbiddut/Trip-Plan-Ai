"use client";

import { ArrowRight, Bus, Car, MapPin, Plane, Train } from "lucide-react";
import type { TransportMode, TransportPlan } from "@/types/tripPlan";

const MODE_ICON: Record<TransportMode, typeof Bus> = {
  bus: Bus,
  train: Train,
  "private-car": Car,
  flight: Plane,
  mixed: Car,
};

interface TransportPlanViewProps {
  transport: TransportPlan;
}

export default function TransportPlanView({ transport }: TransportPlanViewProps) {
  return (
    <div>
      <h3 className="font-serif text-[18px] font-bold text-[#12342D]">Getting Around</h3>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {transport.legs.map((leg, index) => {
          const Icon = MODE_ICON[leg.mode];
          return (
            <div key={`${leg.from}-${leg.to}-${index}`} className="flex items-center gap-2">
              <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] px-3.5 py-2 text-center">
                <p className="text-[11px] font-bold text-[#12342D]">{leg.from}</p>
              </div>
              <div className="flex flex-col items-center px-1 text-[#087F5B]">
                <Icon size={16} />
                <ArrowRight size={12} className="mt-0.5" />
              </div>
              <div className="rounded-2xl border border-[#DCE6E1] bg-[#FAFAF7] px-3.5 py-2 text-center">
                <p className="text-[11px] font-bold text-[#12342D]">{leg.to}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2.5">
        {transport.legs.map((leg, index) => (
          <div
            key={`${leg.from}-${leg.to}-detail-${index}`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#EEF5F1] bg-[#FAFAF7] p-3.5"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-[#12342D]">
                <MapPin size={12} className="text-[#087F5B]" />
                {leg.from} → {leg.to}
              </p>
              {leg.note && <p className="mt-1 text-[11px] leading-5 text-[#687873]">{leg.note}</p>}
            </div>
            <span className="shrink-0 text-[12px] font-bold text-[#087F5B]">
              ৳{leg.estimatedCost.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#EEF5F1] p-3.5">
        <span className="text-[12px] font-bold text-[#12342D]">Estimated total transport cost</span>
        <span className="text-[13px] font-bold text-[#087F5B]">
          ৳{transport.totalEstimatedCost.toLocaleString("en-US")}
        </span>
      </div>
    </div>
  );
}
