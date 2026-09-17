"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Users,
  Map,
  MapPin,
  FolderKanban,
  Star,
  BarChart3,
  ShieldCheck,
  Settings,
  LogOut,
  Globe2,
  Bell,
  ChevronRight,
  BookOpen,
  Ticket,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainMenuItems = [
  {
    name: "Dashboard",
    href: "/admin-panel",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin-panel/users",
    icon: Users,
  },
  {
    name: "Destinations",
    href: "/admin-panel/destinations",
    icon: MapPin,
  },
  {
    name: "Categories",
    href: "/admin-panel/categories",
    icon: FolderKanban,
  },
  {
    name: "Reviews",
    href: "/admin-panel/reviews",
    icon: Star,
  },
  {
    name: "Trips",
    href: "/admin-panel/trips",
    icon: Map,
  },
  {
    name: "Bookings",
    href: "/admin-panel/bookings",
    icon: Ticket,
  },
  {
    name: "Stories",
    href: "/admin-panel/stories",
    icon: BookOpen,
  },
  {
    name: "Analytics",
    href: "/admin-panel/analytics",
    icon: BarChart3,
  },
  {
    name: "Moderation",
    href: "/admin-panel/moderation",
    icon: ShieldCheck,
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin-panel") {
      return pathname === "/admin-panel";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[236px]
          flex-col
          overflow-hidden
          bg-[#004D40]
          text-white
          shadow-xl
          transform
          transition-transform
          duration-300
          ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* ================= MOBILE CLOSE BUTTON ================= */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-3 top-3
            z-10
            flex h-8 w-8
            cursor-pointer
            items-center justify-center
            rounded-lg
            text-white
            transition
            hover:bg-white/10
            lg:hidden
          "
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        {/* ================= ADMIN PROFILE ================= */}
        <div className="shrink-0 px-5 pb-5 pt-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div
              className="
                relative
                flex h-[66px] w-[66px]
                items-center justify-center
                overflow-hidden
                rounded-full
                border-[3px] border-[#27B889]
                bg-[#0B2522]
                shadow-md
              "
            >
              <span className="text-xl font-bold text-white">A</span>

              {/* Online indicator */}
              <span
                className="
                  absolute bottom-0 right-0
                  h-4 w-4
                  rounded-full
                  border-[3px]
                  border-[#004D40]
                  bg-[#20C878]
                "
              />
            </div>

            <h2 className="mt-3 text-[15px] font-bold text-white">
              Admin
            </h2>

            <p className="mt-0.5 text-[12px] text-[#B8D5CC]">
              Super Admin
            </p>

            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#20C878]" />

              <span className="text-[11px] text-[#A9CFC3]">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          {/* ================= MAIN MENU ================= */}
          <div>
            <p
              className="
                mb-2 px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#91B9AE]
              "
            >
              Main Menu
            </p>

            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      group relative
                      flex items-center gap-3
                      rounded-[10px]
                      px-3 py-[9px]
                      text-[13px]
                      font-medium
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-[#16A875] text-white shadow-sm"
                          : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={active ? 2.2 : 1.8}
                      className={`
                        shrink-0
                        transition-all
                        duration-200
                        ${
                          active
                            ? "text-white"
                            : "text-[#A9C9C0] group-hover:text-white"
                        }
                      `}
                    />

                    <span>{item.name}</span>

                    {active && (
                      <span
                        className="
                          absolute right-3
                          h-1.5 w-1.5
                          rounded-full
                          bg-white
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="mt-7">
            <p
              className="
                mb-2 px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#91B9AE]
              "
            >
              Quick Links
            </p>

            <div className="space-y-1">
              {/* Visit Website */}
              <Link
                href="/"
                onClick={onClose}
                className="
                  group
                  flex items-center gap-3
                  rounded-[10px]
                  px-3 py-[9px]
                  text-[13px]
                  font-medium
                  text-[#D0E2DD]
                  transition-all
                  duration-200
                  hover:bg-[#0A6254]
                  hover:text-white
                "
              >
                <Globe2
                  size={18}
                  strokeWidth={1.8}
                  className="
                    text-[#A9C9C0]
                    transition-colors
                    group-hover:text-white
                  "
                />

                <span>Visit Website</span>
              </Link>

              {/* Notifications */}
              <Link
                href="/admin-panel/notifications"
                onClick={onClose}
                className="
                  group
                  flex items-center gap-3
                  rounded-[10px]
                  px-3 py-[9px]
                  text-[13px]
                  font-medium
                  text-[#D0E2DD]
                  transition-all
                  duration-200
                  hover:bg-[#0A6254]
                  hover:text-white
                "
              >
                <Bell
                  size={18}
                  strokeWidth={1.8}
                  className="
                    text-[#A9C9C0]
                    transition-colors
                    group-hover:text-white
                  "
                />

                <span>Notifications</span>

                <span
                  className="
                    ml-auto
                    flex h-5 min-w-5
                    items-center justify-center
                    rounded-full
                    bg-[#F4A62A]
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  5
                </span>
              </Link>
            </div>
          </div>

          {/* ================= ACCOUNT ================= */}
          <div className="mt-7">
            <p
              className="
                mb-2 px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#91B9AE]
              "
            >
              Account
            </p>

            <div className="space-y-1">
              {/* Profile */}
              <Link
                href="/admin-panel/profile"
                onClick={onClose}
                className={`
                  group
                  flex items-center gap-3
                  rounded-[10px]
                  px-3 py-[9px]
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive("/admin-panel/profile")
                      ? "bg-[#16A875] text-white"
                      : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                  }
                `}
              >
                <Users
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isActive("/admin-panel/profile")
                      ? "text-white"
                      : "text-[#A9C9C0] group-hover:text-white"
                  }
                />

                <span>Profile</span>
              </Link>

              {/* Settings */}
              <Link
                href="/admin-panel/settings"
                onClick={onClose}
                className={`
                  group
                  flex items-center gap-3
                  rounded-[10px]
                  px-3 py-[9px]
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive("/admin-panel/settings")
                      ? "bg-[#16A875] text-white"
                      : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                  }
                `}
              >
                <Settings
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isActive("/admin-panel/settings")
                      ? "text-white"
                      : "text-[#A9C9C0] group-hover:text-white"
                  }
                />

                <span>Settings</span>
              </Link>

              {/* Logout */}
              <Link
                href="/admin-panel/logout"
                onClick={onClose}
                className="
                  group
                  flex w-full
                  items-center gap-3
                  rounded-[10px]
                  px-3 py-[9px]
                  text-[13px]
                  font-medium
                  text-[#D0E2DD]
                  transition-all
                  duration-200
                  hover:bg-red-500/15
                  hover:text-red-300
                "
              >
                <LogOut
                  size={18}
                  strokeWidth={1.8}
                  className="
                    text-[#A9C9C0]
                    transition-all
                    duration-200
                    group-hover:-translate-x-0.5
                    group-hover:text-red-300
                  "
                />

                <span>Logout</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* ================= BRAND FOOTER ================= */}
        <div className="shrink-0 border-t border-white/10 px-5 py-3">
          <p className="text-[11px] font-bold text-white">
            TRIP PLAN AI
          </p>

          <p className="text-[9px] text-[#8EB8AC]">
            Plan Smarter. Travel Better.
          </p>
        </div>
      </aside>
    </>
  );
}