
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Map,
  MapPin,
  Star,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Sparkles,
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Zap,
  LucideIcon,
} from "lucide-react";

import DashboardChart from "@/components/admin-panel/DashboardChart";
import RecentActivity from "@/components/admin-panel/RecentlyActivity";

interface Stat {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

interface PerformanceItem {
  label: string;
  value: number;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12.5%",
    description: "vs last month",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Trips",
    value: "356",
    change: "+8.2%",
    description: "vs last month",
    icon: Map,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Destinations",
    value: "89",
    change: "+5.4%",
    description: "vs last month",
    icon: MapPin,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Total Reviews",
    value: "642",
    change: "+10.8%",
    description: "vs last month",
    icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const performance: PerformanceItem[] = [
  {
    label: "Active Users",
    value: 78,
    icon: Users,
  },
  {
    label: "Completed Trips",
    value: 64,
    icon: Map,
  },
  {
    label: "User Satisfaction",
    value: 92,
    icon: Star,
  },
];

export default function AdminPanelPage(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F9F6] p-4 sm:p-6 lg:p-8 mt-[80px]">

      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="absolute left-[-180px] top-[35%] h-96 w-96 rounded-full bg-teal-200/10 blur-3xl" />

        <div className="absolute bottom-[-150px] right-[20%] h-80 w-80 rounded-full bg-green-200/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px]">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <section
          className={`mb-8 transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            {/* Heading */}
            <div>

              {/* Status */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                  Admin Overview
                </span>
              </div>

              <div className="flex items-center gap-3">

                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back, Admin
                </h1>

                <span className="animate-[bounce_2s_infinite] text-2xl">
                  👋
                </span>

              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                Monitor your travel platform, manage destinations, and keep
                track of everything happening across your ecosystem.
              </p>

            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">

              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex">

                <CalendarDays
                  size={16}
                  className="text-slate-500"
                />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Today
                  </p>

                  <p className="text-xs font-bold text-slate-700">
                    September 11, 2026
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="group flex items-center gap-2 rounded-2xl bg-[#004D40] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00695C] hover:shadow-xl"
              >
                <Sparkles
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />

                <span>Overview</span>
              </button>

            </div>

          </div>
        </section>

        {/* =========================================================
            STAT CARDS
        ========================================================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat: Stat, index: number) => {
            const Icon: LucideIcon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-700 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_20px_45px_rgba(16,185,129,0.13)] ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >

                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-emerald-50/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Shine Animation */}
                <div className="pointer-events-none absolute -left-32 top-0 h-full w-24 rotate-12 bg-white/60 blur-xl transition-all duration-1000 group-hover:left-[120%]" />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        {stat.title}
                      </p>

                      <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                        {stat.value}
                      </h3>
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#004D40] group-hover:text-white`}
                    >
                      <Icon
                        size={21}
                        strokeWidth={2}
                      />
                    </div>

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center gap-1.5">

                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                        <ArrowUpRight size={12} />
                        {stat.change}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        {stat.description}
                      </span>

                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 text-slate-300 transition-all duration-300 group-hover:border-emerald-200 group-hover:text-emerald-600">
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

        </section>

        {/* =========================================================
            ANALYTICS + PERFORMANCE
        ========================================================= */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* =======================================================
              TRIP ANALYTICS
          ======================================================= */}
          <div
            className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-700 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] sm:p-6 xl:col-span-2 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: "500ms",
            }}
          >

            {/* Top Glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl transition-all duration-500 group-hover:bg-emerald-200/50" />

            <div className="relative mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Activity size={15} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">
                    Live Analytics
                  </span>

                </div>

                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  Trip Analytics
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monthly trip creation and platform activity overview.
                </p>

              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-2.5">

                <div className="flex items-center gap-2">

                  <TrendingUp
                    size={15}
                    className="text-emerald-600"
                  />

                  <span className="text-sm font-black text-emerald-700">
                    +18.4%
                  </span>

                </div>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600/70">
                  Growth rate
                </p>

              </div>

            </div>

            {/* Chart */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[#FBFCFA] p-2 transition-all duration-500 group-hover:border-emerald-100">
              <DashboardChart />
            </div>

          </div>

          {/* =======================================================
              QUICK OVERVIEW
          ======================================================= */}
          <div
            className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-700 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.09)] sm:p-6 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: "650ms",
            }}
          >

            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl transition-all duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-start justify-between">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <Zap
                      size={15}
                      className="text-amber-500"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Performance
                    </span>

                  </div>

                  <h2 className="text-xl font-black tracking-tight text-slate-900">
                    Quick Overview
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Platform health at a glance.
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-500 group-hover:rotate-12">
                  <ShieldCheck size={19} />
                </div>

              </div>

              {/* Progress */}
              <div className="mt-7 space-y-6">

                {performance.map(
                  (item: PerformanceItem, index: number) => {
                    const Icon: LucideIcon = item.icon;

                    return (
                      <div key={item.label}>

                        <div className="mb-2.5 flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <Icon
                              size={14}
                              className="text-slate-400"
                            />

                            <span className="text-xs font-semibold text-slate-600">
                              {item.label}
                            </span>

                          </div>

                          <span className="text-xs font-black text-slate-900">
                            {item.value}%
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="relative h-full rounded-full bg-gradient-to-r from-[#004D40] to-emerald-400 transition-all duration-[1400ms] ease-out"
                            style={{
                              width: visible
                                ? `${item.value}%`
                                : "0%",
                              transitionDelay: `${
                                700 + index * 200
                              }ms`,
                            }}
                          >
                            <div className="absolute right-0 top-0 h-full w-10 animate-pulse bg-white/30 blur-sm" />
                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* Insight */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-4 transition-all duration-500 group-hover:border-emerald-200">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <Sparkles size={16} />
                  </div>

                  <div>

                    <p className="text-xs font-black text-emerald-800">
                      Great performance! 🎉
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-emerald-700/70">
                      Your platform is growing steadily this month.
                      Keep maintaining the current momentum.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* =========================================================
            RECENT ACTIVITY
        ========================================================= */}
        <section
          className={`mt-5 transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "800ms",
          }}
        >
          <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.07)]">

            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-100/20 blur-3xl" />

            <div className="relative">
              <RecentActivity />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}