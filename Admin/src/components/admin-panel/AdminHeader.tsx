"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  Command,
  Sparkles,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 shadow-[0_4px_20px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:h-20 sm:px-6 lg:left-[236px]  lg:px-8">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md lg:hidden cursor-pointer"
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
              Dashboard
            </h2>

            {/* Live indicator */}
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

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}
      <div className="flex items-center gap-1.5 sm:gap-3">

        {/* ===================================================
            DESKTOP SEARCH
        =================================================== */}
        <div className="group relative hidden md:block">

          <div className="flex h-10 w-56 items-center rounded-xl border border-slate-200 bg-slate-50/70 px-3 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.08)] hover:border-emerald-200 lg:w-64">

            <Search
              size={17}
              className="shrink-0 text-slate-400 transition-colors duration-300 group-focus-within:text-emerald-600"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent px-2 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />

            {/* Shortcut */}
            <div className="hidden items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 lg:flex">
              <Command size={9} />
              K
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE SEARCH
        =================================================== */}
        <button
          type="button"
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600 md:hidden cursor-pointer"
        >
          <Search size={19} />
        </button>

        {/* ===================================================
            NOTIFICATION
        =================================================== */}
        <button
          type="button"
          aria-label="Notifications"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-emerald-50 cursor-pointer hover:text-emerald-600"
        >
          <Bell
            size={19}
            className="transition-transform duration-300 group-hover:-rotate-12"
          />

          {/* Notification Ping */}
          <span className="absolute right-[9px] top-[8px] flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* ===================================================
            PROFILE
        =================================================== */}
        <button
          type="button"
          className="group flex items-center gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-slate-50 sm:gap-3 sm:pr-2 cursor-pointer"
        >

          {/* Avatar */}
          <div className="relative">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#004D40] to-emerald-500 text-sm font-black text-white shadow-md shadow-emerald-900/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg sm:h-10 sm:w-10">
              A
            </div>

            {/* Online */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          {/* User Info */}
          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-slate-900">
              Admin
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              Administrator
            </p>
          </div>

        </button>
      </div>

      {/* =====================================================
          MOBILE SEARCH OVERLAY
      ===================================================== */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 flex h-[68px] items-center gap-2 border-b border-emerald-100 bg-white px-3 shadow-lg md:hidden">

          {/* Back / Close */}
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors cursor-pointer hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>

          {/* Search */}
          <div className="flex h-10 flex-1 items-center rounded-xl border border-emerald-300 bg-emerald-50/30 px-3 shadow-[0_0_0_4px_rgba(16,185,129,0.06)]">

            <Search
              size={17}
              className="shrink-0 text-emerald-600"
            />

            <input
              autoFocus
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent px-2 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />

            <Sparkles
              size={15}
              className="shrink-0 text-emerald-500"
            />
          </div>
        </div>
      )}
    </header>
  );
}
