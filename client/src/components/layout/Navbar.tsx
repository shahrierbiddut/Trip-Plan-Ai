"use client";

import { Avatar } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  BookOpen,
  BusFront,
  ChevronDown,
  Compass,
  Heart,
  Info,
  LayoutDashboard,
  LogOut,
  Map,
  MapPin,
  Menu,
  PackageOpen,
  Plane,
  Route,
  Search,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { showLogoutToast } from "@/components/TripPlanToast";
import { signOut, useSession } from "@/lib/auth-client";

type SessionUser = NonNullable<ReturnType<typeof useSession>["data"]>["user"];

type MenuLink = {
  href: string;
  label: string;
  icon: typeof Sparkles;
};

const menuGroups: Array<{ title: string; links: MenuLink[] }> = [
  {
    title: "Plan",
    links: [
      { href: "/plan-trip", label: "Plan My Trip", icon: Sparkles },
      { href: "/tour-packages", label: "Tour Packages", icon: PackageOpen },
      { href: "/reviews", label: "Traveler Reviews", icon: Star },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/travel-categories", label: "Travel Categories", icon: Compass },
      { href: "/destinations", label: "Top Destinations", icon: MapPin },
      { href: "/hotels", label: "Hotels", icon: BedDouble },
      { href: "/food", label: "Food", icon: Utensils },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/destinations/styles", label: "Travel Styles", icon: Route },
      { href: "/destinations/map", label: "Interactive Map", icon: Map },
      { href: "/inspiration/guides", label: "Travel Guides", icon: BookOpen },
      { href: "/inspiration/stories", label: "Travel Stories", icon: BusFront },
      { href: "/about", label: "About TripPlan AI", icon: Info },
    ],
  },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;
  const userRole = (user as (typeof user & { role?: string }) | undefined)?.role;
  const dashboardHref =
    userRole?.toLowerCase() === "admin" ? "/admin-panel" : "/dashboard";

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [userMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleLogout = async () => {
    const logoutUserName = user?.name ?? "Traveler";
    const { error } = await signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    setUserMenuOpen(false);
    setMenuOpen(false);
    showLogoutToast(logoutUserName);
    router.replace("/");
    router.refresh();
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-3 pt-3 font-sans antialiased sm:px-5 sm:pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className="pointer-events-auto relative mx-auto flex h-[58px] w-full max-w-[1500px] items-center rounded-full border border-white/75 bg-[#F8FAF7]/90 px-2.5 shadow-[0_12px_34px_rgba(10,44,35,0.13),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-2xl sm:h-[66px] sm:px-3.5"
      >
        <Link
          href="/"
          aria-label="TripPlan AI home"
          onClick={() => {
            setMenuOpen(false);
            setUserMenuOpen(false);
          }}
          className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9952C] sm:gap-3"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FFD36E] via-[#F5B53F] to-[#DE9229] shadow-[0_7px_18px_rgba(217,149,44,0.28)] transition-transform duration-300 group-hover:-rotate-6 sm:h-11 sm:w-11">
            <span className="absolute inset-[3px] rounded-full border border-white/55" />
            <Plane
              size={20}
              strokeWidth={2.25}
              className="relative -rotate-45 text-[#123E33] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>

          <span className="hidden truncate text-[21px] font-extrabold tracking-[-0.045em] text-[#163D32] md:block">
            TripPlan <span className="text-[#D78A25]">AI</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            onClick={() => setMenuOpen(false)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isRouteActive(pathname, "/search")
                ? "bg-[#E8F2ED] text-[#087F5B]"
                : "text-[#426158] hover:bg-[#EDF4F0] hover:text-[#087F5B]"
            }`}
          >
            <Search size={21} strokeWidth={1.8} />
          </Link>

          <Link
            href="/dashboard/saved"
            aria-label="Wishlist"
            onClick={() => setMenuOpen(false)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isRouteActive(pathname, "/dashboard/saved")
                ? "bg-[#E8F2ED] text-[#087F5B]"
                : "text-[#426158] hover:bg-[#EDF4F0] hover:text-[#087F5B]"
            }`}
          >
            <Heart size={22} strokeWidth={1.8} />
          </Link>

          {isPending ? (
            <span className="hidden h-10 w-[82px] animate-pulse rounded-full bg-[#E4EBE7] sm:block" />
          ) : user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                aria-label="Open user menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((previous) => !previous)}
                className="flex h-10 items-center gap-2 rounded-full border border-[#D6E0DB] bg-white/70 p-1 pr-1.5 text-left shadow-sm transition-colors hover:border-[#A9C6B9] hover:bg-white sm:pr-3"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <Avatar.Image alt={user.name} src={user.image ?? undefined} />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <span className="hidden max-w-[108px] truncate text-[12px] font-semibold text-[#24463B] lg:block">
                  {user.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`hidden shrink-0 text-[#667A72] transition-transform sm:block ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <UserMenu
                    user={user}
                    userRole={userRole}
                    dashboardHref={dashboardHref}
                    onClose={() => setUserMenuOpen(false)}
                    onLogout={handleLogout}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="hidden h-10 items-center justify-center rounded-full border border-[#BFD1C8] bg-white/70 px-5 text-[13px] font-semibold text-[#24463B] shadow-sm transition-all hover:border-[#8FB4A3] hover:bg-white hover:text-[#087F5B] sm:flex"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFC85A] via-[#F4B23E] to-[#E69A2A] px-3.5 text-[12px] font-bold text-[#173E33] shadow-[0_7px_18px_rgba(217,149,44,0.26)] transition-all hover:-translate-y-0.5 hover:brightness-105 sm:px-5 sm:text-[13px]"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="tripplan-navigation-menu"
            onClick={() => {
              setMenuOpen((previous) => !previous);
              setUserMenuOpen(false);
            }}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F4B63F] text-[#173E33] shadow-[0_7px_18px_rgba(217,149,44,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8BE4D] sm:h-11 sm:w-11"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.75 }}
                transition={{ duration: 0.18 }}
                className="absolute"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <MegaMenu
            pathname={pathname}
            user={user}
            isPending={isPending}
            userRole={userRole}
            dashboardHref={dashboardHref}
            onClose={() => setMenuOpen(false)}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu({
  pathname,
  user,
  isPending,
  userRole,
  dashboardHref,
  onClose,
  onLogout,
}: {
  pathname: string;
  user?: SessionUser;
  isPending: boolean;
  userRole?: string;
  dashboardHref: string;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <motion.div
      id="tripplan-navigation-menu"
      initial={{ opacity: 0, y: -14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-92px)] w-full max-w-[1280px] overflow-y-auto rounded-[28px] border border-white/80 bg-[#FBFCF9]/[0.97] p-4 shadow-[0_24px_70px_rgba(8,35,28,0.2),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl sm:mt-3 sm:p-6 lg:p-8"
    >
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-[0.85fr_1.05fr_1.05fr_1.2fr] lg:gap-8">
        {menuGroups.map((group, groupIndex) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + groupIndex * 0.045, duration: 0.32 }}
          >
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#809189]">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.links.map((item) => {
                const active = isRouteActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-2 text-[14px] font-medium transition-all ${
                      active
                        ? "bg-[#E9F3EE] text-[#087F5B]"
                        : "text-[#536B62] hover:translate-x-0.5 hover:bg-[#F0F5F2] hover:text-[#173E33]"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={active ? "text-[#D78A25]" : "text-[#C3882D]"}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.section>
        ))}

        <motion.aside
          initial={{ opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19, duration: 0.32 }}
          className="rounded-[22px] bg-[#123F34] p-5 text-white shadow-[0_16px_35px_rgba(16,61,50,0.2)] sm:p-6"
        >
          <p className="font-serif text-[23px] font-semibold tracking-[-0.025em]">
            Hello, {user?.name?.split(" ")[0] ?? "Traveler"}
          </p>
          <p className="mt-2 text-[13px] leading-6 text-white/65">
            আপনার বাজেট ও পছন্দ অনুযায়ী সহজে বাংলাদেশের সম্পূর্ণ ভ্রমণ পরিকল্পনা করুন।
          </p>
          <Link
            href="/plan-trip"
            onClick={onClose}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#F4B63F] px-4 text-[13px] font-bold text-[#173E33] transition-all hover:-translate-y-0.5 hover:bg-[#F8C45F]"
          >
            Plan my trip <ArrowRight size={17} />
          </Link>
        </motion.aside>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#DEE8E2] pt-4 sm:flex-row sm:items-center sm:justify-between lg:hidden">
        <UtilityLinks onClose={onClose} />
        <MenuAuth
          user={user}
          isPending={isPending}
          userRole={userRole}
          dashboardHref={dashboardHref}
          onClose={onClose}
          onLogout={onLogout}
        />
      </div>

      <div className="mt-5 hidden items-center justify-end border-t border-[#DEE8E2] pt-4 lg:flex">
        <UtilityLinks onClose={onClose} />
      </div>
    </motion.div>
  );
}

function UtilityLinks({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="/search"
        onClick={onClose}
        className="flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-[#536B62] hover:bg-[#EDF4F0] hover:text-[#087F5B]"
      >
        <Search size={17} /> Search
      </Link>
      <Link
        href="/dashboard/saved"
        onClick={onClose}
        className="flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-[#536B62] hover:bg-[#EDF4F0] hover:text-[#087F5B]"
      >
        <Heart size={17} /> Wishlist
      </Link>
    </div>
  );
}

function MenuAuth({
  user,
  isPending,
  userRole,
  dashboardHref,
  onClose,
  onLogout,
}: {
  user?: SessionUser;
  isPending: boolean;
  userRole?: string;
  dashboardHref: string;
  onClose: () => void;
  onLogout: () => void;
}) {
  if (isPending) {
    return <span className="h-10 w-full animate-pulse rounded-full bg-[#E5ECE8] sm:w-40" />;
  }

  if (user) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <Link
          href={dashboardHref}
          onClick={onClose}
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#E6F2EC] px-4 text-[12px] font-semibold text-[#087F5B]"
        >
          <LayoutDashboard size={16} />
          {userRole?.toLowerCase() === "admin" ? "Admin" : "Dashboard"}
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#E8D4D0] bg-white px-4 text-[12px] font-semibold text-[#B34E45]"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <Link
        href="/login"
        onClick={onClose}
        className="flex h-10 items-center justify-center rounded-full border border-[#C9D8D1] px-5 text-[13px] font-semibold text-[#24463B]"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        onClick={onClose}
        className="flex h-10 items-center justify-center rounded-full bg-[#F4B63F] px-5 text-[13px] font-bold text-[#173E33]"
      >
        Get started
      </Link>
    </div>
  );
}

function UserMenu({
  user,
  userRole,
  dashboardHref,
  onClose,
  onLogout,
}: {
  user: SessionUser;
  userRole?: string;
  dashboardHref: string;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-[50px] z-[120] w-[min(300px,calc(100vw-32px))] overflow-hidden rounded-[20px] border border-[#E0E9E4] bg-[#FBFCF9]/95 p-3 shadow-[0_20px_50px_rgba(7,38,30,0.16)] backdrop-blur-2xl sm:top-[54px]"
    >
      <div className="flex items-center gap-3 rounded-[15px] bg-[#F1F6F3] p-3">
        <Avatar className="h-12 w-12 shrink-0">
          <Avatar.Image alt={user.name} src={user.image ?? undefined} />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#294A40]">{user.name}</p>
          <p className="mt-0.5 truncate text-[12px] text-[#788B83]">{user.email}</p>
        </div>
      </div>

      <Link
        href={dashboardHref}
        onClick={onClose}
        className="mt-2 flex h-11 items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#55736A] transition-colors hover:bg-[#EAF4EF] hover:text-[#087F5B]"
      >
        <LayoutDashboard size={18} />
        {userRole?.toLowerCase() === "admin" ? "Admin Dashboard" : "My Dashboard"}
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex h-11 w-full items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#8A5C5A] transition-colors hover:bg-[#FFF1EF] hover:text-[#C84E48]"
      >
        <LogOut size={18} /> Logout
      </button>
    </motion.div>
  );
}
