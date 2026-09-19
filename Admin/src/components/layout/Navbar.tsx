"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Plane,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { showLogoutToast } from "@/components/TripPlanToast";
import { getUserSession } from "@/lib/core/session";

/* ============================================================
   TYPES
============================================================ */

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

type DropdownItem = {
  label: string;
  href: string;
};

/* ============================================================
   DROPDOWN DATA
============================================================ */

const exploreItems: DropdownItem[] = [
  {
    label: "Travel Categories",
    href: "/travel-categories",
  },
  {
    label: "Hotels",
    href: "/hotels",
  },
  {
    label: "Food",
    href: "/food",
  },
];

const destinationItems: DropdownItem[] = [
  {
    label: "Top Destinations",
    href: "/destinations",
  },
  {
    label: "Travel Styles",
    href: "/destinations/styles",
  },
  {
    label: "Interactive Map",
    href: "/destinations/map",
  },
];

const inspirationItems: DropdownItem[] = [
  {
    label: "Travel Guides",
    href: "/inspiration/guides",
  },
  {
    label: "Travel Stories",
    href: "/inspiration/stories",
  },
  {
    label: "Travel Tips",
    href: "/inspiration/tips",
  },
];

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  const pathname = usePathname();

  const router = useRouter();

  const { data, isPending } = useSession();
  const user = data?.user;
  const userRole = (user as (typeof user & { role?: string }) | undefined)
    ?.role;
  const dashboardHref =
    userRole?.toLowerCase() === "admin" ? "/admin-panel" : "/dashboard";

  const handleLogout = async () => {
    const logoutUserName = user?.name ?? "Traveler";
    const { error } = await signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    setUserMenuOpen(false);
    showLogoutToast(logoutUserName);
    router.replace("/");
    router.refresh();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  /* ============================================================
     ACTIVE ROUTES
  ============================================================ */

  const isDestinationsActive =
    pathname === "/destinations" || pathname.startsWith("/destinations/");

  const isPlanTripActive =
    pathname === "/plan-trip" || pathname.startsWith("/plan-trip/");

  const isReviewsActive =
    pathname === "/reviews" || pathname.startsWith("/reviews/");

  const isInspirationActive =
    pathname === "/inspiration" || pathname.startsWith("/inspiration/");

  const isExploreActive = exploreItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  const isSearchActive =
    pathname === "/search" || pathname.startsWith("/search/");

  const isWishlistActive =
    pathname === "/wishlist" || pathname.startsWith("/wishlist/");

  /* ============================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ============================================================ */

  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreOpen(false);
    setDestinationsOpen(false);
    setInspirationOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

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

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [userMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-transparent px-3 pt-2 font-sans antialiased sm:px-5 sm:pt-3">
      {/* ========================================================
          MAIN NAVBAR
      ======================================================== */}

      <motion.nav
        initial={{ opacity: 0, y: -22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto h-[64px] w-full max-w-[1420px] rounded-[22px] border border-white/65 bg-white/[0.74] shadow-[0_14px_40px_rgba(7,26,22,0.14),0_3px_10px_rgba(7,26,22,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl sm:rounded-full"
      >
        <div className="relative mx-auto flex h-full w-full items-center px-3 sm:px-5 lg:px-7">
          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            href="/"
            aria-label="TripPlan AI Home"
            className="group z-20 flex shrink-0 items-center"
          >
            <div className="flex items-center gap-2.5">
              {/* Logo */}

              <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
                <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />

                <Plane
                  size={20}
                  strokeWidth={2.3}
                  className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              {/* Logo text */}

              <span className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[20px]">
                TripPlan <span className="text-[#D88928]">AI</span>
              </span>
            </div>
          </Link>

          {/* ====================================================
              CENTERED DESKTOP NAVIGATION

              IMPORTANT:
              This is absolutely centered in the navbar.
          ==================================================== */}

          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 items-center lg:flex">
            {/* ==================================================
                EXPLORE
            ================================================== */}

            <div className="relative flex h-full items-center">
              <button
                type="button"
                aria-expanded={exploreOpen}
                onClick={() => {
                  setExploreOpen((prev) => !prev);
                  setDestinationsOpen(false);
                  setInspirationOpen(false);
                }}
                className={`
                  relative flex h-full items-center
                  px-[14px]
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  transition-colors duration-200
                  ${
                    isExploreActive || exploreOpen
                      ? "text-[#087F5B]"
                      : "text-[#30483F] hover:text-[#B86D1B]"
                  }
                `}
              >
                <span className="flex items-center gap-[5px]">
                  Explore
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`
                      transition-transform duration-200
                      ${exploreOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* Active underline */}

                {(isExploreActive || exploreOpen) && (
                  <span className="absolute bottom-[17px] left-[14px] right-[14px] h-[2px] rounded-full bg-[#F4A934]" />
                )}
              </button>

              {exploreOpen && (
                <Dropdown
                  items={exploreItems}
                  pathname={pathname}
                  onClose={() => setExploreOpen(false)}
                />
              )}
            </div>

            {/* ==================================================
                DESTINATIONS
            ================================================== */}

            <div className="relative flex h-full items-center">
              <button
                type="button"
                aria-expanded={destinationsOpen}
                onClick={() => {
                  setDestinationsOpen((prev) => !prev);
                  setExploreOpen(false);
                  setInspirationOpen(false);
                }}
                className={`
                  relative flex h-full items-center
                  px-[14px]
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  transition-colors duration-200
                  ${
                    isDestinationsActive || destinationsOpen
                      ? "text-[#087F5B]"
                      : "text-[#30483F] hover:text-[#B86D1B]"
                  }
                `}
              >
                <span className="flex items-center gap-[5px]">
                  Destinations
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`
                      transition-transform duration-200
                      ${destinationsOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* Active underline */}

                {(isDestinationsActive || destinationsOpen) && (
                  <span className="absolute bottom-[17px] left-[14px] right-[14px] h-[2px] rounded-full bg-[#F4A934]" />
                )}
              </button>

              {destinationsOpen && (
                <Dropdown
                  items={destinationItems}
                  pathname={pathname}
                  onClose={() => setDestinationsOpen(false)}
                />
              )}
            </div>

            {/* ==================================================
                PLAN MY TRIP
            ================================================== */}

            <NavItem
              href="/plan-trip"
              label="Plan My Trip"
              active={isPlanTripActive}
            />

            {/* ==================================================
                REVIEWS
            ================================================== */}

            <NavItem href="/reviews" label="Reviews" active={isReviewsActive} />

            {/* ==================================================
                INSPIRATION
            ================================================== */}

            <div className="relative flex h-full items-center">
              <button
                type="button"
                aria-expanded={inspirationOpen}
                onClick={() => {
                  setInspirationOpen((prev) => !prev);
                  setExploreOpen(false);
                  setDestinationsOpen(false);
                }}
                className={`
                  relative flex h-full items-center
                  px-[14px]
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  transition-colors duration-200
                  ${
                    isInspirationActive || inspirationOpen
                      ? "text-[#087F5B]"
                      : "text-[#30483F] hover:text-[#B86D1B]"
                  }
                `}
              >
                <span className="flex items-center gap-[5px]">
                  Inspiration
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`
                      transition-transform duration-200
                      ${inspirationOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* Active underline */}

                {(isInspirationActive || inspirationOpen) && (
                  <span className="absolute bottom-[17px] left-[14px] right-[14px] h-[2px] rounded-full bg-[#F4A934]" />
                )}
              </button>

              {inspirationOpen && (
                <Dropdown
                  items={inspirationItems}
                  pathname={pathname}
                  onClose={() => setInspirationOpen(false)}
                />
              )}
            </div>

            <NavItem
              href="/about"
              label="About"
              active={pathname === "/about" || pathname.startsWith("/about/")}
            />
          </div>

          {/* ====================================================
              RIGHT SIDE ACTIONS

              These stay on the right.
          ==================================================== */}

          <div className="ml-auto hidden items-center lg:flex gap-2">
            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className={`
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-colors duration-200
                ${
                  isSearchActive
                    ? "bg-[#087F5B]/10 text-[#087F5B]"
                    : "text-[#476057] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
                }
              `}
            >
              <Search size={21} strokeWidth={1.8} />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`
                ml-1 flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-colors duration-200
                ${
                  isWishlistActive
                    ? "bg-[#087F5B]/10 text-[#087F5B]"
                    : "text-[#476057] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
                }
              `}
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>

            {isPending ? (
              <div
                aria-hidden="true"
                className="ml-3 flex h-[44px] w-[168px] animate-pulse items-center gap-2 rounded-full border border-[#C8D9D2] bg-white/55 p-1 pr-3"
              >
                <span className="h-9 w-9 shrink-0 rounded-full bg-[#DCE7E2]" />
                <span className="h-3 w-[86px] rounded-full bg-[#DCE7E2]" />
              </div>
            ) : user ? (
              <div ref={userMenuRef} className="relative ml-3">
                <button
                  type="button"
                  aria-label="Open user menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => setUserMenuOpen((previous) => !previous)}
                  className="flex h-[44px] max-w-[210px] items-center gap-2 rounded-full border border-[#C8D9D2] bg-white/70 py-1 pl-1 pr-3 text-left shadow-[0_5px_16px_rgba(7,38,30,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-200 hover:border-[#087F5B]/45 hover:bg-[#F5FAF8]"
                >
                  <Avatar className="h-9 w-9 shrink-0">
                    <Avatar.Image
                      alt={user.name}
                      src={user.image ?? undefined}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <span className="max-w-[120px] truncate text-[13px] font-semibold text-[#243D34]">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={15}
                    strokeWidth={2.2}
                    className={`shrink-0 text-[#63766E] transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-[52px] z-[120] w-[300px] overflow-hidden rounded-[20px] border border-[#E3EDE7] bg-[#F7F9F4]/95 p-3 shadow-[0_20px_50px_rgba(7,38,30,0.16),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl"
                    >
                      <div className="flex items-center gap-3 rounded-[15px] bg-[#F3F8F4] p-3">
                        <Avatar className="h-12 w-12 shrink-0 border border-[#DDEAE1] bg-gradient-to-br from-[#EEF7F1] via-[#F8F3E9] to-[#F0D39A] text-[#24463B] shadow-sm">
                          <Avatar.Image
                            alt={user.name}
                            src={user.image ?? undefined}
                          />
                          <Avatar.Fallback className="bg-transparent text-[#24463B]">
                            {user.name.charAt(0)}
                          </Avatar.Fallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-semibold text-[#35564F] transition-colors duration-200 group-hover:text-[#1D433C]">
                            {user.name}
                          </p>
                          <p className="mt-0.5 truncate text-[12px] text-[#7A8F89] transition-colors duration-200 group-hover:text-[#5A6F68]">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={dashboardHref}
                        onClick={() => setUserMenuOpen(false)}
                        className="mt-2 flex h-11 items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#5C7B71] transition-colors duration-200 hover:bg-[#EDF7F3] hover:text-[#0B7A5A]"
                      >
                        <LayoutDashboard
                          size={18}
                          strokeWidth={1.9}
                          className="text-[#78A08D] transition-colors duration-200 hover:text-[#0B7A5A]"
                        />
                        {userRole?.toLowerCase() === "admin"
                          ? "Admin Dashboard"
                          : "My Dashboard"}
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex h-11 w-full items-center gap-3 rounded-[13px] px-3 text-[13px] font-medium text-[#8A5C5A] transition-colors duration-200 hover:bg-[#FFF1EF] hover:text-[#C84E48]"
                      >
                        <LogOut
                          size={18}
                          strokeWidth={1.9}
                          className="text-[#C17A76] transition-colors duration-200 hover:text-[#C84E48]"
                        />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="ml-4 flex h-[38px] items-center justify-center rounded-full border border-[#B9CEC5] bg-white/55 px-[17px] text-[14px] font-semibold tracking-[-0.01em] text-[#263D34] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-all duration-200 hover:border-[#087F5B]/55 hover:bg-[#EDF7F3] hover:text-[#087F5B]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="ml-[9px] flex h-[38px] items-center justify-center rounded-full border border-[#FFD078]/55 bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-[18px] text-[14px] font-semibold tracking-[-0.01em] text-[#17332A] shadow-[0_8px_22px_rgba(217,134,31,0.28),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_11px_28px_rgba(217,134,31,0.36)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ====================================================
              MOBILE ACTIONS
          ==================================================== */}

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#385047] transition-colors hover:bg-[#087F5B]/10 hover:text-[#087F5B]"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#385047] transition-colors hover:bg-[#087F5B]/10 hover:text-[#087F5B]"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ========================================================
          MOBILE MENU
      ======================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            pathname={pathname}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================================================================
   NORMAL NAV ITEM

   Text = 14px
   Underline = directly under text
================================================================ */

function NavItem({ href, label, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex h-full items-center
        px-[14px]
        text-[14px]
        font-medium
        tracking-[-0.01em]
        transition-colors duration-200
        ${active ? "text-[#087F5B]" : "text-[#30483F] hover:text-[#B86D1B]"}
      `}
    >
      <span className="relative">
        {label}

        {/* Underline directly under text */}

        <span
          className={`
            absolute
            -bottom-[6px]
            left-0
            right-0
            h-[2px]
            rounded-full
            bg-linear-to-r from-[#087F5B] to-[#F4A934]
            transition-all duration-200
            ${
              active
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
            }
          `}
        />
      </span>
    </Link>
  );
}

/* ================================================================
   DROPDOWN
================================================================ */

function Dropdown({
  items,
  pathname,
  onClose,
}: {
  items: DropdownItem[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-[57px] z-[100] w-[275px] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/[0.94] p-2 shadow-[0_18px_45px_rgba(7,26,22,0.17),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl"
    >
      {/* Top accent */}

      <div className="absolute left-1/2 top-0 h-[2px] w-[40px] -translate-x-1/2 rounded-b-full bg-[#087F5B]" />

      <div className="pt-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center justify-between
                rounded-lg px-3 py-3
                text-[14px]
                font-medium
                tracking-[-0.005em]
                transition-colors
                ${
                  active
                    ? "bg-[#EDF7F3] text-[#087F5B]"
                    : "text-[#26342E] hover:bg-[#F4F8F6] hover:text-[#087F5B]"
                }
              `}
            >
              <span>{item.label}</span>

              {active && (
                <span className="h-[6px] w-[6px] rounded-full bg-[#087F5B]" />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ================================================================
   MOBILE MENU
================================================================ */

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const router = useRouter();

  const { data, isPending } = useSession();
  const user = data?.user;
  const userRole = (user as (typeof user & { role?: string }) | undefined)
    ?.role;
  const dashboardHref =
    userRole?.toLowerCase() === "admin" ? "/admin-panel" : "/dashboard";

  const handleLogout = async () => {
    const logoutUserName = user?.name ?? "Traveler";
    const { error } = await signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    onClose();
    showLogoutToast(logoutUserName);
    router.replace("/");
    router.refresh();
  };
  const mobileItems = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Destinations",
      href: "/destinations",
      active:
        pathname === "/destinations" || pathname.startsWith("/destinations/"),
    },
    {
      label: "Plan My Trip",
      href: "/plan-trip",
      active: pathname === "/plan-trip" || pathname.startsWith("/plan-trip/"),
    },
    {
      label: "Reviews",
      href: "/reviews",
      active: pathname === "/reviews" || pathname.startsWith("/reviews/"),
    },
    {
      label: "Inspiration",
      href: "/inspiration",
      active:
        pathname === "/inspiration" || pathname.startsWith("/inspiration/"),
    },
    {
      label: "About",
      href: "/about",
      active: pathname === "/about" || pathname.startsWith("/about/"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-2 w-full max-w-[1420px] overflow-hidden rounded-[22px] border border-white/80 bg-white/[0.94] px-4 pb-4 pt-3 shadow-[0_18px_45px_rgba(7,26,22,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl lg:hidden"
    >
      <div className="space-y-1">
        {mobileItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`
              relative flex h-11 items-center
              rounded-lg px-4
              text-[15px]
              font-medium
              tracking-[-0.01em]
              ${
                item.active
                  ? "bg-[#087F5B]/10 text-[#087F5B]"
                  : "text-[#30483F] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
              }
            `}
          >
            <span className="relative">
              {item.label}

              {item.active && (
                <span className="absolute -bottom-[5px] left-0 right-0 h-[2px] rounded-full bg-[#F4A934]" />
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile buttons */}

      <div className="mt-4 border-t border-[#DDE9E3] pt-4">
        {isPending ? (
          <div
            aria-hidden="true"
            className="flex animate-pulse items-center gap-3 rounded-[18px] border border-[#DCE8E2] bg-[#F7FAF8] p-3"
          >
            <span className="h-11 w-11 shrink-0 rounded-full bg-[#DCE7E2]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded-full bg-[#DCE7E2]" />
              <div className="h-2.5 w-40 max-w-full rounded-full bg-[#E4ECE8]" />
            </div>
          </div>
        ) : user ? (
          <div className="rounded-[18px] border border-[#DCE8E2] bg-[#F7FAF8] p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 shrink-0">
                <Avatar.Image alt={user.name} src={user.image ?? undefined} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-[#17332A]">
                  {user.name}
                </p>
                <p className="truncate text-[12px] text-[#6B7D75]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href={dashboardHref}
                onClick={onClose}
                className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#E6F3ED] text-[12px] font-semibold text-[#087F5B] transition-colors hover:bg-[#D9EDE4]"
              >
                <LayoutDashboard size={16} strokeWidth={2} />
                {userRole?.toLowerCase() === "admin" ? "Admin" : "Dashboard"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#F0D2CE] bg-white text-[12px] font-semibold text-[#B23A32] transition-colors hover:bg-[#FFF1EF]"
              >
                <LogOut size={16} strokeWidth={2} />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="flex h-10 items-center justify-center rounded-full border border-[#B9CEC5] bg-white/70 text-[14px] font-semibold tracking-[-0.01em] text-[#263D34] transition-colors hover:border-[#087F5B]/55 hover:bg-[#EDF7F3] hover:text-[#087F5B]"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={onClose}
              className="flex h-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] text-[14px] font-semibold tracking-[-0.01em] text-[#17332A] shadow-[0_7px_18px_rgba(217,134,31,0.25)]"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
