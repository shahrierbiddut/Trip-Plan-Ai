"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Map,
  Compass,
  Heart,
  Wallet,
  CalendarDays,
  UserCircle,
  BookOpen,
  Bell,
  HelpCircle,
  Settings,
  Plus,
  Sparkles,
  ChevronDown,
  Plane,
  Ticket
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

type SessionUser = {
  name?: string | null;
  image?: string | null;
  role?: string | null;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
};

type NavigationGroup = {
  section: string;
  items: NavigationItem[];
};

const navigation: NavigationGroup[] = [
  {
    section: "OVERVIEW",
    items: [
      { name: "Overview", href: "/dashboard", icon: Home },
    ],
  },
  {
    section: "TRAVEL",
    items: [
      { name: "My Bookings", href: "/dashboard/my-bookings", icon: Ticket },
      { name: "My Trips", href: "/dashboard/trips", icon: Map },
      { name: "Plan a Trip", href: "/plan-trip", icon: Compass },
      { name: "Saved", href: "/dashboard/saved", icon: Heart },
      { name: "Budget Tracker", href: "/dashboard/budget", icon: Wallet },
      { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
    ],
  },
  {
    section: "PERSONAL",
    items: [
      { name: "Travel Profile", href: "/dashboard/profile", icon: UserCircle },
      { name: "My Stories", href: "/dashboard/stories", icon: BookOpen },
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    section: "MORE",
    items: [
      { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function DashboardSidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const pathname = usePathname();
  const userdata = useSession();
  const user = userdata?.data?.user as SessionUser | undefined;

  return (
    <div className="flex h-full w-full flex-col bg-[#04271C] text-white">
      {/* Logo & Brand */}
      <div className="p-6 pb-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />
            <Plane
              size={20}
              strokeWidth={2.3}
              className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <span className="text-[20px] font-extrabold leading-none tracking-[-0.035em] text-white transition-colors duration-300">
            TripPlan <span className="text-[#D88928]">AI</span>
          </span>
        </Link>
      </div>

      {/* Main CTA */}
      <div className="px-5 mb-6">
        <Link
          href="/plan-trip"
          onClick={onMobileClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F4A934] to-[#F19305] py-3 text-[14px] font-bold text-[#14151a] shadow-md transition-all hover:scale-[1.02] hover:shadow-[0_4px_14px_rgba(244,169,52,0.3)] active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} className="text-[#14151a]" />
          Plan a New Trip ✨
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
        {navigation.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="mb-2 px-3 text-[10px] font-bold tracking-widest text-white/50 uppercase">
              {group.section}
            </h3>
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onMobileClose}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${isActive
                      ? "bg-[#0B3D2E] text-white"
                      : "text-white/70 hover:bg-[#0A382A]/50 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className={`${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                          }`}
                      />
                      {item.name}
                    </div>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4A934] text-[10px] font-bold text-[#17211D]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4">
        <div className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#0B3D2E] p-3 transition-colors hover:bg-[#0A382A]">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#04271C]">
              <Avatar className="h-9 w-9 shrink-0">
                <Avatar.Image
                  alt={user?.name ?? undefined}
                  src={user?.image ?? undefined}
                />
                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white">
                {user?.name}
              </span>
              <span className="text-[11px] text-white/60">
                {user?.role}
              </span>
            </div>
          </div>
          <ChevronDown size={16} className="text-white/60" />
        </div>
      </div>
    </div>
  );
}
