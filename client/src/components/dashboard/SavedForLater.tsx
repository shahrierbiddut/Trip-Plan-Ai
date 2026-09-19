"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

const tabs = ["Destinations", "Hotels", "Travel Styles", "Trips"];

export default function SavedForLater() {
  const [activeTab, setActiveTab] = useState("Destinations");
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return <div className="h-64 flex items-center justify-center">Loading saved items...</div>;
  }

  const { savedForLater } = dashboardData;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif text-[20px] font-bold text-gray-900">Saved for Later</h2>
        <Link
          href="/dashboard/saved"
          className="group flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="mt-2 mb-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#087F5B] text-white shadow-md shadow-emerald-500/20"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {activeTab === "Destinations" ? (
          savedForLater.slice(0, 4).map((item: any) => (
            <div key={item.id} className="group relative flex flex-col gap-2 cursor-pointer rounded-2xl p-2 transition-all hover:bg-gray-50">
              <div className="relative h-28 w-full overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <button className="absolute right-2 top-2 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-md transition-all hover:bg-white hover:text-rose-500 hover:scale-110">
                  <Heart size={14} fill="currentColor" />
                </button>
              </div>
              <div className="px-1">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-bold text-gray-900 truncate">{item.name}</p>
                  <span className="flex items-center justify-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                    {item.match}%
                  </span>
                </div>
                <p className="text-[11px] font-medium text-gray-500 truncate mt-0.5">{item.region}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <Heart size={32} className="text-gray-200 mb-3" />
            <p className="text-[13px] font-medium text-gray-500">No saved {activeTab.toLowerCase()} yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
