"use client";

import Link from "next/link";
import { Bell, Heart, Plane, Search } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

const NAV_ITEMS: { label: string; href: string; active?: boolean }[] = [
  { label: "Explore", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Plan My Trip", href: "/plan-trip", active: true },
  { label: "Reviews", href: "/reviews" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
];

export default function PlanTripHeader() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-[#DCE6E1] bg-white px-5 lg:px-10">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_6px_16px_rgba(217,134,31,0.32)]">
          <Plane size={16} className="-rotate-45 text-[#17332A]" />
        </span>
        <span className="hidden font-serif text-[15px] font-bold text-[#12342D] sm:inline">
          TripPlan <span className="text-[#D88928]">AI</span>
        </span>
      </Link>

      <nav
        aria-label="Primary"
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`group relative py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors ${
              item.active ? "text-[#087F5B]" : "text-[#30483F] hover:text-[#B86D1B]"
            }`}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={`absolute -bottom-[6px] left-0 h-[2px] w-full origin-left bg-linear-to-r from-[#087F5B] to-[#F4A934] transition-transform duration-300 ${
                item.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="hidden h-10 w-10 items-center justify-center rounded-full text-[#30483F] transition-colors hover:bg-[#EEF5F1] sm:flex"
        >
          <Search size={19} />
        </button>
        <Link
          href="/dashboard/saved"
          aria-label="Wishlist"
          className="hidden h-10 w-10 items-center justify-center rounded-full text-[#30483F] transition-colors hover:bg-[#EEF5F1] sm:flex"
        >
          <Heart size={19} />
        </Link>
        <Link
          href="/dashboard/notifications"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#30483F] transition-colors hover:bg-[#EEF5F1]"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F4A934]" />
        </Link>
        <Link
          href="/dashboard/profile"
          aria-label="Your profile"
          className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-[#EEF5F1] transition-opacity hover:opacity-80"
        >
          <Avatar className="h-full w-full">
            <Avatar.Image src={user?.image ?? undefined} alt={user?.name ?? undefined} />
            <Avatar.Fallback>{user?.name?.charAt(0) ?? "U"}</Avatar.Fallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
