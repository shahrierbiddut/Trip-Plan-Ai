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
import { useSession } from "@/lib/auth-client";

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

interface DashboardData {
  totalUsers: number;
  totalTrips: number;
  totalDestinations: number;
  totalReviews: number;
  activeUsers: number;
  completedTrips: number;
  userSatisfaction: number;
  tripGrowth: number;
  usersChange?: string;
  tripsChange?: string;
  destinationsChange?: string;
  reviewsChange?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPanelPage(): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const user = session?.user;

  // Dynamic user display name
  const userName = user?.name || user?.email?.split("@")[0] || "User";

  const [dashboard, setDashboard] = useState<DashboardData>({
    totalUsers: 0,
    totalTrips: 0,
    totalDestinations: 0,
    totalReviews: 0,
    activeUsers: 0,
    completedTrips: 0,
    userSatisfaction: 0,
    tripGrowth: 0,
    usersChange: "+0%",
    tripsChange: "+0%",
    destinationsChange: "+0%",
    reviewsChange: "+0%",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/dashboard`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const result = await response.json();
        const data = result.data ?? result;

        setDashboard({
          totalUsers: Number(data.totalUsers ?? 0),
          totalTrips: Number(data.totalTrips ?? 0),
          totalDestinations: Number(data.totalDestinations ?? 0),
          totalReviews: Number(data.totalReviews ?? 0),
          activeUsers: Number(data.activeUsers ?? 0),
          completedTrips: Number(data.completedTrips ?? 0),
          userSatisfaction: Number(data.userSatisfaction ?? 0),
          tripGrowth: Number(data.tripGrowth ?? 0),
          usersChange: data.usersChange ?? "+12.5%",
          tripsChange: data.tripsChange ?? "+8.2%",
          destinationsChange: data.destinationsChange ?? "+5.4%",
          reviewsChange: data.reviewsChange ?? "+10.8%",
        });
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats: Stat[] = [
    {
      title: "Total Users",
      value: loading ? "..." : dashboard.totalUsers.toLocaleString(),
      change: dashboard.usersChange || "+0%",
      description: "vs last month",
      icon: Users,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Trips",
      value: loading ? "..." : dashboard.totalTrips.toLocaleString(),
      change: dashboard.tripsChange || "+0%",
      description: "vs last month",
      icon: Map,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Destinations",
      value: loading ? "..." : dashboard.totalDestinations.toLocaleString(),
      change: dashboard.destinationsChange || "+0%",
      description: "vs last month",
      icon: MapPin,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Total Reviews",
      value: loading ? "..." : dashboard.totalReviews.toLocaleString(),
      change: dashboard.reviewsChange || "+0%",
      description: "vs last month",
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const performance: PerformanceItem[] = [
    {
      label: "Active Users",
      value: dashboard.activeUsers,
      icon: Users,
    },
    {
      label: "Completed Trips",
      value: dashboard.completedTrips,
      icon: Map,
    },
    {
      label: "User Satisfaction",
      value: dashboard.userSatisfaction,
      icon: Star,
    },
  ];

  const today = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F9F6] p-4 pt-24 sm:p-6 sm:pt-28 lg:p-8 lg:pt-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute left-[-180px] top-[35%] h-96 w-96 rounded-full bg-teal-200/10 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[20%] h-80 w-80 rounded-full bg-green-200/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        {/* HEADER */}
        <section
          className={`mb-8 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
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
                  Welcome back, {userName}
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

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex">
                <CalendarDays size={16} className="text-slate-500" />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Today
                  </p>

                  <p className="text-xs font-bold text-slate-700">{today}</p>
                </div>
              </div>

              <div className="group flex items-center gap-2 rounded-2xl bg-[#004D40] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#00695C] hover:shadow-xl">
                <Sparkles
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />

                <span>Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-emerald-50/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#004D40] group-hover:text-white`}
                    >
                      <Icon size={21} strokeWidth={2} />
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

        {/* ANALYTICS + PERFORMANCE */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Analytics */}
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
                  <TrendingUp size={15} className="text-emerald-600" />

                  <span className="text-sm font-black text-emerald-700">
                    +{dashboard.tripGrowth}%
                  </span>
                </div>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600/70">
                  Growth rate
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[#FBFCFA] p-2 transition-all duration-500 group-hover:border-emerald-100">
              <DashboardChart />
            </div>
          </div>

          {/* Performance */}
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
                    <Zap size={15} className="text-amber-500" />

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

              <div className="mt-7 space-y-6">
                {performance.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <div className="mb-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon size={14} className="text-slate-400" />

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
                              ? `${Math.min(item.value, 100)}%`
                              : "0%",
                            transitionDelay: `${700 + index * 200}ms`,
                          }}
                        >
                          <div className="absolute right-0 top-0 h-full w-10 animate-pulse bg-white/30 blur-sm" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-4 transition-all duration-500 group-hover:border-emerald-200">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <Sparkles size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-emerald-800">
                      Platform Insight
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-emerald-700/70">
                      Current platform metrics are updated from your backend data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section
          className={`mt-5 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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