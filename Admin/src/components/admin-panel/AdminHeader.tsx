"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  Sparkles,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const pageTitles: Record<string, string> = {
    "/admin-panel": "Dashboard",
    "/admin-panel/users": "Users",
    "/admin-panel/destinations": "Destinations",
    "/admin-panel/categories": "Categories",
    "/admin-panel/reviews": "Reviews",
    "/admin-panel/trips": "Trips",
    "/admin-panel/bookings": "Bookings",
    "/admin-panel/stories": "Stories",
    "/admin-panel/analytics": "Analytics",
    "/admin-panel/moderation": "Moderation",
    "/admin-panel/notifications": "Notifications",
    "/admin-panel/profile": "Profile",
    "/admin-panel/settings": "Settings",
  };

  const pageTitle = pageTitles[pathname] || "Admin Panel";

  // Dynamic user name from session
  const userName = user?.name || user?.email?.split("@")[0] || "Admin";
  const userEmail = user?.email || "";

  // First letter for avatar
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });

      setProfileOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 shadow-[0_4px_20px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:h-20 sm:px-6 lg:left-[236px] lg:px-8">
      {/* LEFT SIDE */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md lg:hidden"
        >
          <Menu
            size={21}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>

        {/* Page Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-black tracking-tight text-slate-900 sm:text-xl">
              {pageTitle}
            </h2>

            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-600 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          <p className="hidden text-xs font-medium text-slate-400 sm:block">
            Manage your TripPlan AI platform
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* NOTIFICATION */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => router.push("/admin-panel/notifications")}
          className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
        >
          <Bell
            size={19}
            className="transition-transform duration-300 group-hover:-rotate-12"
          />

          <span className="absolute right-[9px] top-[8px] flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* PROFILE */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="group flex cursor-pointer items-center gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-slate-50 sm:gap-3 sm:pr-2"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#004D40] to-emerald-500 text-sm font-black text-white shadow-md shadow-emerald-900/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg sm:h-10 sm:w-10">
                {userInitial}
              </div>

              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            {/* User Info */}
            <div className="hidden text-left sm:block">
              <p className="max-w-[120px] truncate text-xs font-bold text-slate-900">
                {userName}
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={15}
              className={`hidden text-slate-400 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* PROFILE DROPDOWN */}
          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              {/* Logged User */}
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="truncate text-sm font-bold text-slate-900">
                  {userName}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                  {userEmail}
                </p>
              </div>

              {/* Profile */}
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/admin-panel/profile");
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                <User size={17} />
                Profile
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/admin-panel/settings");
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Settings size={17} />
                Settings
              </button>

              <div className="my-1 border-t border-slate-100" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}