"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  History,
  Link2,
  MailPlus,
  RotateCcw,
  Save,
  Search,
  Settings2,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import {
  categories,
  filterOptions,
  initialFilters,
  initialPreferences,
  groupLabels,
  getMatchScore,
  getDynamicDestinationCount,
  getItinerary,
  readStoredValue,
  storeValue,
  STORAGE_KEYS,
} from "@/data/config/travelStyles";

import type {
  FilterGroup,
  Filters,
  Category,
  TravelPreferences,
} from "@/data/config/travelStyles";

import TrendingSection from "@/components/travel-categories/TrendingSection";
import TravelStyleMatcher from "@/components/travel-categories/TravelStyleMatcher";
import TravelerStories from "@/components/travel-categories/TravelerStories";

/* ============================================================
   CONSTANTS
============================================================ */

const revealEase = [0.22, 1, 0.36, 1] as const;

const groupIcons = {
  season: CalendarDays,
  budget: WalletCards,
  duration: Clock3,
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function TravelCategoriesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<TravelPreferences>(initialPreferences);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [previewCategory, setPreviewCategory] = useState<Category | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setPreferences(
      readStoredValue<TravelPreferences>(
        STORAGE_KEYS.preferences,
        initialPreferences,
      ),
    );
    setWishlist(readStoredValue<string[]>(STORAGE_KEYS.wishlist, []));
    setSearchHistory(
      readStoredValue<string[]>(STORAGE_KEYS.searchHistory, []),
    );
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const activeFilterCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return categories
      .filter((category) => {
        const searchableText = [
          category.title,
          category.description,
          ...category.keywords,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !query || searchableText.includes(query);
        const matchesSeason =
          filters.season.length === 0 ||
          filters.season.some((value) => category.seasons.includes(value));
        const matchesBudget =
          filters.budget.length === 0 ||
          filters.budget.some((value) => category.budgets.includes(value));
        const matchesDuration =
          filters.duration.length === 0 ||
          filters.duration.some((value) =>
            category.durations.includes(value),
          );
        const matchesWishlist =
          !showWishlistOnly || wishlist.includes(category.slug);

        return (
          matchesSearch &&
          matchesSeason &&
          matchesBudget &&
          matchesDuration &&
          matchesWishlist
        );
      })
      .map((category) => ({
        category,
        matchScore: getMatchScore(
          category,
          filters,
          preferences,
          wishlist.includes(category.slug),
        ),
        destinationCount: getDynamicDestinationCount(category, filters),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [filters, preferences, searchTerm, showWishlistOnly, wishlist]);

  const personalizedSuggestions = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          matchScore: getMatchScore(
            category,
            filters,
            preferences,
            wishlist.includes(category.slug),
          ),
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3),
    [filters, preferences, wishlist],
  );

  const toggleFilter = (group: FilterGroup, value: string) => {
    setFilters((current) => {
      const selectedValues = current[group];
      const isSelected = selectedValues.includes(value);

      return {
        ...current,
        [group]: isSelected
          ? selectedValues.filter((item) => item !== value)
          : group === "season"
            ? [...selectedValues, value]
            : [value],
      };
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters(initialFilters);
    setShowWishlistOnly(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (!query) return;

    const nextHistory = [
      query,
      ...searchHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      ),
    ].slice(0, 5);

    setSearchHistory(nextHistory);
    storeValue(STORAGE_KEYS.searchHistory, nextHistory);
    setIsSearchFocused(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    storeValue(STORAGE_KEYS.searchHistory, []);
  };

  const toggleWishlist = (slug: string) => {
    setWishlist((current) => {
      const isSaved = current.includes(slug);
      const nextWishlist = isSaved
        ? current.filter((item) => item !== slug)
        : [...current, slug];

      storeValue(STORAGE_KEYS.wishlist, nextWishlist);
      setNotice(isSaved ? "Removed from your wishlist" : "Saved to your wishlist");
      return nextWishlist;
    });
  };

  const savePreferences = (nextPreferences: TravelPreferences) => {
    setPreferences(nextPreferences);
    storeValue(STORAGE_KEYS.preferences, nextPreferences);
    setIsPreferencesOpen(false);
    setNotice("Travel preferences saved");
  };

  const buildCategoryHref = (slug: string) => {
    const params = new URLSearchParams({ category: slug });

    if (filters.season.length > 0) {
      params.set("season", filters.season.join(",").toLowerCase());
    }

    if (filters.budget.length > 0) {
      params.set("budget", filters.budget.join(",").toLowerCase());
    }

    if (filters.duration.length > 0) {
      params.set("duration", filters.duration.join(",").toLowerCase());
    }

    return `/destinations?${params.toString()}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#FFFEFB] via-white to-[#F4F8F5] text-[#13221C]">
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section className="relative pb-14 pt-[112px] sm:pb-16 sm:pt-[126px] lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#087F5B]/[0.06] blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#F4A934]/[0.08] blur-[110px]" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: revealEase }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] font-semibold text-[#718078] sm:text-xs"
          >
            <Link href="/" className="transition-colors hover:text-[#087F5B]">Home</Link>
            <span aria-hidden="true" className="text-[#BAC4BF]">/</span>
            <span className="text-[#087F5B]">Explore</span>
            <span aria-hidden="true" className="text-[#BAC4BF]">/</span>
            <span aria-current="page" className="text-[#35453D]">Travel Categories</span>
          </motion.nav>

          {/* Hero Content */}
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,500px)] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: revealEase }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087F5B] sm:text-[11px]">Travel, your way</p>
              <h1 className="mt-3 max-w-[720px] font-serif text-[42px] font-normal leading-[0.98] tracking-[-0.045em] text-[#13221C] sm:text-[56px] lg:text-[68px]">
                Stories begin with a{" "}
                <span className="bg-gradient-to-r from-[#D98B26] via-[#F4A934] to-[#B8691B] bg-clip-text italic text-transparent">travel style.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[13px] font-medium leading-[1.75] text-[#5B6C63] sm:text-[15px]">Choose how you want to explore the world. Every journey has a style—what&apos;s yours?</p>
            </motion.div>

            {/* Search Card */}
            <motion.form
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: revealEase }}
              onSubmit={handleSearchSubmit}
              className="relative rounded-[24px] border border-[#E4E8E4] bg-white/85 p-4 shadow-[0_18px_50px_rgba(31,43,36,0.09),inset_0_1px_0_rgba(255,255,255,0.90)] backdrop-blur-xl sm:p-5"
            >
              <label htmlFor="category-search" className="font-serif text-[18px] font-normal text-[#26382F] sm:text-[20px]">Where would you like to feel alive?</label>
              <div className="relative mt-3 flex h-14 items-center rounded-2xl border border-[#DDE5E0] bg-[#FFFEFB] transition-all duration-300 focus-within:border-[#087F5B]/45 focus-within:shadow-[0_0_0_4px_rgba(8,127,91,0.08)]">
                <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 text-[#087F5B]" />
                <input
                  id="category-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    window.setTimeout(() => setIsSearchFocused(false), 120)
                  }
                  placeholder="Search travel styles or experiences"
                  className="h-full w-full rounded-2xl bg-transparent pl-12 pr-16 text-[12px] font-medium text-[#1E3027] outline-none placeholder:text-[#89958F] sm:text-[13px]"
                />
                <button type="submit" aria-label="Search travel categories" className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#073D31] text-white shadow-[0_8px_20px_rgba(7,61,49,0.18)] transition-colors duration-300 hover:bg-[#087F5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B]/40">
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Search History Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="absolute inset-x-4 top-[calc(100%_-_10px)] z-40 overflow-hidden rounded-2xl border border-[#DCE6E1] bg-white p-2 shadow-[0_18px_45px_rgba(23,33,29,0.14)] sm:inset-x-5"
                  >
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#718078]"><History size={13} /> Recent searches</span>
                      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={clearSearchHistory} className="text-[9px] font-bold text-[#B86D1B] hover:text-[#087F5B]">Clear</button>
                    </div>
                    {searchHistory.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setSearchTerm(item);
                          setIsSearchFocused(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[11px] font-medium text-[#415249] transition-colors hover:bg-[#EEF8F3] hover:text-[#087F5B]"
                      >
                        <Search size={13} /> {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>

          {/* ========================================================
              MOBILE FILTER TOGGLE
          ======================================================== */}
          <div className="mt-10 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              aria-expanded={isFilterOpen}
              aria-controls="mobile-category-filters"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#DCE6E1] bg-white px-4 text-[11px] font-bold text-[#244137] shadow-sm transition-colors hover:border-[#087F5B]/35 hover:text-[#087F5B]"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#087F5B] px-1.5 text-[9px] text-white">{activeFilterCount}</span>}
            </button>

            {(activeFilterCount > 0 || searchTerm) && (
              <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B66C1C]">
                <RotateCcw size={13} /> Clear all
              </button>
            )}
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <motion.div
                id="mobile-category-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: revealEase }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 rounded-[22px] border border-[#DFE8E3] bg-white p-5 shadow-[0_14px_38px_rgba(23,33,29,0.08)]">
                  <FiltersPanel filters={filters} onToggle={toggleFilter} onClear={clearFilters} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================
              SIDEBAR + CARD GRID
          ======================================================== */}
          <div className="mt-7 grid items-start gap-7 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-9">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: revealEase }}
              className="sticky top-32 hidden rounded-[22px] border border-[#E2E9E5] bg-white/72 p-5 shadow-[0_14px_42px_rgba(23,33,29,0.06)] backdrop-blur-xl lg:block"
            >
              <FiltersPanel filters={filters} onToggle={toggleFilter} onClear={clearFilters} />
            </motion.aside>

            {/* Cards Section */}
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p aria-live="polite" className="text-[11px] font-semibold text-[#66766E]">
                    Showing <span className="font-bold text-[#087F5B]">{filteredCategories.length}</span> personalized travel styles
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#97A29C]">Sorted by your AI match</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPreferencesOpen(true)}
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-[#D8E5DE] bg-white px-3.5 text-[10px] font-bold text-[#087F5B] shadow-sm transition-colors hover:border-[#087F5B]/40 hover:bg-[#EEF8F3]"
                  >
                    <Settings2 size={14} /> Personalize
                  </button>
                  <button
                    type="button"
                    aria-pressed={showWishlistOnly}
                    onClick={() => setShowWishlistOnly((current) => !current)}
                    className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[10px] font-bold shadow-sm transition-colors ${showWishlistOnly ? "border-[#F4A934] bg-[#FFF3D8] text-[#A95F16]" : "border-[#D8E5DE] bg-white text-[#52635A] hover:border-[#F4A934]/50 hover:text-[#B86D1B]"}`}
                  >
                    <Heart size={14} fill={showWishlistOnly ? "currentColor" : "none"} /> Saved {wishlist.length}
                  </button>
                  {activeFilterCount > 0 && <span className="hidden rounded-full bg-[#EAF7F1] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#087F5B] sm:inline-flex">{activeFilterCount} filters</span>}
                </div>
              </div>

              {/* CARD GRID — uniform 3-column */}
              <motion.div layout className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                <AnimatePresence>
                  {filteredCategories.map(
                    ({ category, matchScore, destinationCount }, index) => (
                    <CategoryCard
                      key={category.slug}
                      category={category}
                      href={buildCategoryHref(category.slug)}
                      index={index}
                      reduceMotion={Boolean(shouldReduceMotion)}
                      matchScore={matchScore}
                      destinationCount={destinationCount}
                      isWishlisted={wishlist.includes(category.slug)}
                      onToggleWishlist={() => toggleWishlist(category.slug)}
                      onPreview={() => setPreviewCategory(category)}
                    />
                    ),
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredCategories.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[360px] flex-col items-center justify-center rounded-[26px] border border-dashed border-[#CAD8D1] bg-white/70 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF7F1] text-[#087F5B]"><Search size={23} /></div>
                  <h2 className="mt-5 font-serif text-[25px] text-[#17211D]">No travel styles match your current filters.</h2>
                  <p className="mt-2 max-w-sm text-[12px] leading-6 text-[#6B7A72]">Try changing your search, season, budget, or duration.</p>
                  <button type="button" onClick={clearFilters} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#087F5B] px-5 text-[11px] font-bold text-white transition-colors hover:bg-[#06694B]">
                    <RotateCcw size={14} /> Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          NEW SECTION #1 — TRENDING THIS SEASON
      ======================================================== */}
      <TrendingSection />

      {/* ========================================================
          NEW SECTION #2 — FIND YOUR PERFECT TRAVEL STYLE
      ======================================================== */}
      <TravelStyleMatcher />

      {/* ========================================================
          NEW SECTION #3 — REAL STORIES. REAL JOURNEYS.
      ======================================================== */}
      <TravelerStories />

      {/* ========================================================
          EXISTING — AI CURATION SECTION
      ======================================================== */}
      <section className="relative mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20 xl:px-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: revealEase }}
          className="relative overflow-hidden rounded-[26px] border border-[#D9E3DD] bg-gradient-to-br from-[#F7F4E9] via-[#FFFEFA] to-[#EDF7F2] p-5 shadow-[0_18px_48px_rgba(23,33,29,0.08)] sm:p-7 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:items-center lg:gap-8"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B]/10 blur-[55px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-[30%] h-48 w-48 rounded-full bg-[#F4A934]/12 blur-[60px]" />

          <div className="relative">
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#073D31] text-[#FFD078] shadow-[0_12px_28px_rgba(7,61,49,0.18)]"
            >
              <Sparkles size={21} />
            </motion.div>
            <h2 className="mt-5 font-serif text-[27px] font-normal leading-tight tracking-[-0.025em] text-[#17211D] sm:text-[32px]">Let AI curate your next chapter</h2>
            <p className="mt-3 max-w-[500px] text-[12px] font-medium leading-6 text-[#627168] sm:text-[13px]">Answer a few questions and let TripPlan AI design journeys that fit your style, time, and budget.</p>
            <button type="button" onClick={() => setIsPreferencesOpen(true)} className="group mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#E89425] to-[#F5B13E] px-5 text-[11px] font-bold text-[#13221C] shadow-[0_10px_25px_rgba(232,148,37,0.24)] transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E89425]/45">
              Discover My Match <Sparkles size={14} className="transition-transform duration-300 group-hover:rotate-12" />
            </button>
          </div>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-3 lg:mt-0">
            {personalizedSuggestions.map(({ category, matchScore }, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: revealEase }}
              >
                <button type="button" onClick={() => setPreviewCategory(category)} className="group flex min-h-[100px] w-full overflow-hidden rounded-2xl border border-white/80 bg-white text-left shadow-[0_10px_25px_rgba(23,33,29,0.08)] sm:block">
                  <div className="relative min-h-[100px] w-[110px] shrink-0 overflow-hidden sm:h-[105px] sm:w-full">
                    <Image src={category.image} alt="" fill sizes="(max-width: 640px) 110px, 220px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    <span className="absolute left-2 top-2 rounded-full border border-white/30 bg-[#071A16]/70 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#FFD078] backdrop-blur-md">AI match {matchScore}%</span>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-3 sm:items-start">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#87938D]">{preferences.duration} · {category.title}</p>
                      <h3 className="mt-1 font-serif text-[15px] leading-tight text-[#17211D]">{category.description}</h3>
                    </div>
                    <ArrowUpRight size={16} className="shrink-0 text-[#087F5B] transition-colors group-hover:text-[#D98B26]" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </section>

      {/* ========================================================
          TOAST NOTIFICATION
      ======================================================== */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#BFE2D3] bg-[#073D31] px-4 py-2.5 text-[10px] font-bold text-white shadow-[0_16px_38px_rgba(7,61,49,0.28)]"
          >
            <Check size={14} className="text-[#FFD078]" /> {notice}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          DIALOGS
      ======================================================== */}
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        preferences={preferences}
        reduceMotion={Boolean(shouldReduceMotion)}
        onClose={() => setIsPreferencesOpen(false)}
        onSave={savePreferences}
      />

      <ItineraryPreviewDialog
        category={previewCategory}
        preferences={preferences}
        matchScore={
          previewCategory
            ? getMatchScore(
                previewCategory,
                filters,
                preferences,
                wishlist.includes(previewCategory.slug),
              )
            : 0
        }
        reduceMotion={Boolean(shouldReduceMotion)}
        onClose={() => setPreviewCategory(null)}
      />
    </main>
  );
}

/* ============================================================
   FILTERS PANEL
============================================================ */

function FiltersPanel({
  filters,
  onToggle,
  onClear,
}: {
  filters: Filters;
  onToggle: (group: FilterGroup, value: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F5B]">Refine your way</p>
        <SlidersHorizontal size={15} className="text-[#087F5B]" />
      </div>

      <div className="mt-5 space-y-5">
        {(Object.keys(filterOptions) as FilterGroup[]).map((group) => {
          const GroupIcon = groupIcons[group];

          return (
            <fieldset key={group} className="border-b border-[#E4EAE6] pb-5 last:border-b-0 last:pb-0">
              <legend className="flex w-full items-center justify-between text-[11px] font-bold text-[#26382F]">
                <span className="inline-flex items-center gap-2"><GroupIcon size={15} strokeWidth={1.8} />{groupLabels[group]}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </legend>

              <div className="mt-3 space-y-2.5">
                {filterOptions[group].map((option) => {
                  const isSelected = filters[group].includes(option);

                  return (
                    <label key={option} className="flex cursor-pointer items-center justify-between gap-3 text-[10px] font-medium text-[#52625A]">
                      <span>{option}</span>
                      <input type="checkbox" checked={isSelected} onChange={() => onToggle(group, option)} className="sr-only" />
                      <span aria-hidden="true" className={`relative h-[18px] w-8 rounded-full border transition-all duration-300 ${isSelected ? "border-[#087F5B] bg-[#087F5B]" : "border-[#CCD5D0] bg-[#E8ECEA]"}`}>
                        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${isSelected ? "translate-x-[15px]" : "translate-x-0.5"}`} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      <button type="button" onClick={onClear} className="mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#087F5B] transition-colors hover:text-[#B86D1B]">
        <RotateCcw size={13} /> Clear all filters
      </button>
    </div>
  );
}

/* ============================================================
   CATEGORY CARD
============================================================ */

function CategoryCard({
  category,
  href,
  index,
  reduceMotion,
  matchScore,
  destinationCount,
  isWishlisted,
  onToggleWishlist,
  onPreview,
}: {
  category: Category;
  href: string;
  index: number;
  reduceMotion: boolean;
  matchScore: number;
  destinationCount: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onPreview: () => void;
}) {
  const Icon = category.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, filter: "blur(7px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(5px)" }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.055, ease: revealEase }}
      className="group relative h-[290px] overflow-hidden rounded-[20px] border border-[#23483D]/25 bg-[#0B251E] shadow-[0_14px_32px_rgba(23,33,29,0.10)] transition-shadow duration-500 hover:shadow-[0_22px_55px_rgba(8,59,46,0.22),0_0_0_1px_rgba(244,169,52,0.18)] sm:h-[310px]"
    >
      <Link href={href} aria-label={`Explore ${category.title} destinations`} className="absolute inset-0 z-20 rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFD078]" />

      <Image src={category.image} alt={`${category.title} travel experience`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041C16]/95 via-[#071A16]/18 to-black/[0.04] transition-colors duration-500 group-hover:from-[#031812]/90" />

      {/* Icon */}
      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#071A16]/30 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 group-hover:border-[#FFD078]/60 group-hover:bg-[#F4A934] group-hover:text-[#13221C]">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      {/* AI Match Badge */}
      <span className="absolute left-[62px] top-[19px] z-10 rounded-full border border-[#FFD078]/35 bg-[#071A16]/60 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#FFD078] backdrop-blur-md">AI match {matchScore}%</span>

      {/* Wishlist */}
      <button
        type="button"
        onClick={onToggleWishlist}
        aria-label={isWishlisted ? `Remove ${category.title} from wishlist` : `Save ${category.title} to wishlist`}
        aria-pressed={isWishlisted}
        className={`absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${isWishlisted ? "border-[#FFD078] bg-[#F4A934] text-[#13221C]" : "border-white/40 bg-[#071A16]/35 text-white hover:border-[#FFD078]/70 hover:text-[#FFD078]"}`}
      >
        <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0 text-white">
          <h2 className="truncate font-serif text-[27px] font-normal leading-none tracking-[-0.025em] sm:text-[30px]">{category.title}</h2>
          <p className="mt-1.5 text-[11px] font-medium text-white/85">{category.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#8FE0C2] sm:text-[9px]">{destinationCount} matching destinations</p>
            <button type="button" onClick={onPreview} className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-md transition-colors hover:border-[#FFD078]/60 hover:bg-[#F4A934] hover:text-[#13221C]">
              <Sparkles size={10} /> AI preview
            </button>
          </div>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/55 bg-[#071A16]/45 text-white backdrop-blur-lg transition-all duration-300 group-hover:border-[#FFD078] group-hover:bg-[#F4A934] group-hover:text-[#13221C] sm:h-12 sm:w-12">
          <ArrowUpRight size={20} strokeWidth={1.7} />
        </span>
      </div>
    </motion.article>
  );
}

/* ============================================================
   PREFERENCES DIALOG
============================================================ */

function PreferencesDialog({
  isOpen,
  preferences,
  reduceMotion,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  preferences: TravelPreferences;
  reduceMotion: boolean;
  onClose: () => void;
  onSave: (preferences: TravelPreferences) => void;
}) {
  const [draft, setDraft] = useState(preferences);

  useEffect(() => {
    if (isOpen) setDraft(preferences);
  }, [isOpen, preferences]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleInterest = (slug: string) => {
    setDraft((current) => ({
      ...current,
      interests: current.interests.includes(slug)
        ? current.interests.filter((item) => item !== slug)
        : [...current.interests, slug],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          onMouseDown={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#03120F]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preferences-title"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, ease: revealEase }}
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-t-[28px] border border-white/15 bg-[#FFFEFB] shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:rounded-[28px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E9E5] bg-[#FFFEFB]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#087F5B]">Personalized suggestions</p>
                <h2 id="preferences-title" className="mt-1 font-serif text-[24px] text-[#17211D]">Tell AI how you travel</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close preferences" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE5E0] text-[#53635B] transition-colors hover:border-[#087F5B]/40 hover:text-[#087F5B]"><X size={17} /></button>
            </div>

            <div className="space-y-7 p-5 sm:p-7">
              <fieldset>
                <legend className="flex items-center gap-2 text-[11px] font-bold text-[#26382F]"><UserRound size={16} className="text-[#087F5B]" /> Who are you travelling with?</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["Solo", "Couple", "Family", "Friends"] as const).map((type) => (
                    <button key={type} type="button" onClick={() => setDraft((current) => ({ ...current, travelerType: type }))} className={`h-11 rounded-xl border text-[10px] font-bold transition-all ${draft.travelerType === type ? "border-[#087F5B] bg-[#087F5B] text-white shadow-[0_8px_20px_rgba(8,127,91,0.16)]" : "border-[#DDE6E1] bg-white text-[#52635A] hover:border-[#087F5B]/35 hover:text-[#087F5B]"}`}>{type}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="flex items-center gap-2 text-[11px] font-bold text-[#26382F]"><Sparkles size={16} className="text-[#D98B26]" /> What experiences interest you?</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {categories.map((category) => {
                    const CatIcon = category.icon;
                    const selected = draft.interests.includes(category.slug);

                    return (
                      <button key={category.slug} type="button" aria-pressed={selected} onClick={() => toggleInterest(category.slug)} className={`flex min-h-12 items-center gap-2.5 rounded-xl border px-3 text-left text-[10px] font-bold transition-all ${selected ? "border-[#F4A934] bg-[#FFF3D8] text-[#9B5715]" : "border-[#DDE6E1] bg-white text-[#52635A] hover:border-[#F4A934]/45"}`}>
                        <CatIcon size={15} /> {category.title}
                        {selected && <Check size={13} className="ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-[11px] font-bold text-[#26382F]">
                  <span className="flex items-center gap-2"><WalletCards size={16} className="text-[#087F5B]" /> Preferred budget</span>
                  <select value={draft.budget} onChange={(event) => setDraft((current) => ({ ...current, budget: event.target.value }))} className="mt-3 h-12 w-full rounded-xl border border-[#DDE6E1] bg-white px-3 text-[11px] font-medium text-[#415249] outline-none focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.07]">
                    {filterOptions.budget.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>

                <label className="text-[11px] font-bold text-[#26382F]">
                  <span className="flex items-center gap-2"><Clock3 size={16} className="text-[#087F5B]" /> Preferred duration</span>
                  <select value={draft.duration} onChange={(event) => setDraft((current) => ({ ...current, duration: event.target.value }))} className="mt-3 h-12 w-full rounded-xl border border-[#DDE6E1] bg-white px-3 text-[11px] font-medium text-[#415249] outline-none focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.07]">
                    {filterOptions.duration.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#E2E9E5] bg-[#FFFEFB]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
              <button type="button" onClick={onClose} className="h-11 rounded-xl border border-[#DCE5E0] px-5 text-[10px] font-bold text-[#52635A] hover:border-[#087F5B]/35">Cancel</button>
              <button type="button" onClick={() => onSave(draft)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#087F5B] px-5 text-[10px] font-bold text-white shadow-[0_10px_24px_rgba(8,127,91,0.20)] transition-colors hover:bg-[#06694B]"><Save size={14} /> Save Preferences</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   ITINERARY PREVIEW DIALOG
============================================================ */

function ItineraryPreviewDialog({
  category,
  preferences,
  matchScore,
  reduceMotion,
  onClose,
}: {
  category: Category | null;
  preferences: TravelPreferences;
  matchScore: number;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    if (!category) return;

    setCollaboratorEmail("");
    setCollaborators([]);
    setShareStatus("");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [category, onClose]);

  if (!category) return null;

  const itinerary = getItinerary(category);
  const estimatedBudget =
    preferences.budget === "Budget"
      ? "৳6,000–৳10,000"
      : preferences.budget === "Luxury"
        ? "৳30,000+"
        : "৳12,000–৳20,000";

  const addCollaborator = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = collaboratorEmail.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setShareStatus("Enter a valid email address");
      return;
    }

    if (collaborators.includes(email)) {
      setShareStatus("This collaborator is already added");
      return;
    }

    setCollaborators((current) => [...current, email]);
    setCollaboratorEmail("");
    setShareStatus("Collaborator added to this preview");
  };

  const copyCollaborationLink = async () => {
    const link = `${window.location.origin}/plan-trip?category=${category.slug}&mode=collaborative`;

    try {
      await navigator.clipboard.writeText(link);
      setShareStatus("Collaboration link copied");
    } catch {
      setShareStatus("Copy the link from your browser address bar");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.22 }}
        onMouseDown={onClose}
        className="fixed inset-0 z-[110] flex items-end justify-center bg-[#03120F]/75 p-0 backdrop-blur-md sm:items-center sm:p-5"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="itinerary-preview-title"
          initial={{ opacity: 0, y: 34, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 26, scale: 0.97 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: revealEase }}
          onMouseDown={(event) => event.stopPropagation()}
          className="max-h-[94vh] w-full max-w-[980px] overflow-y-auto rounded-t-[28px] bg-[#FFFEFB] shadow-[0_30px_90px_rgba(0,0,0,0.40)] sm:rounded-[28px]"
        >
          <div className="relative min-h-[210px] overflow-hidden rounded-t-[28px] sm:min-h-[250px]">
            <Image src={category.image} alt={`${category.title} itinerary preview`} fill sizes="980px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041C16]/95 via-[#071A16]/25 to-black/10" />
            <button type="button" onClick={onClose} aria-label="Close itinerary preview" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-[#071A16]/35 text-white backdrop-blur-md hover:border-[#FFD078]/70 hover:text-[#FFD078]"><X size={18} /></button>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <span className="inline-flex rounded-full border border-[#FFD078]/35 bg-[#071A16]/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#FFD078] backdrop-blur-md">AI match {matchScore}%</span>
              <h2 id="itinerary-preview-title" className="mt-3 font-serif text-[32px] font-normal leading-none sm:text-[42px]">{category.title} itinerary preview</h2>
              <p className="mt-2 text-[11px] font-medium text-white/75 sm:text-[12px]">Personalized for {preferences.travelerType.toLowerCase()} travel · {preferences.duration} · {preferences.budget}</p>
            </div>
          </div>

          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#DFE8E3] bg-white p-3.5"><p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#88958E]">Estimated budget</p><p className="mt-1.5 text-[12px] font-bold text-[#17211D]">{estimatedBudget}</p></div>
                <div className="rounded-2xl border border-[#DFE8E3] bg-white p-3.5"><p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#88958E]">Best duration</p><p className="mt-1.5 text-[12px] font-bold text-[#17211D]">{preferences.duration}</p></div>
                <div className="col-span-2 rounded-2xl border border-[#DFE8E3] bg-white p-3.5 sm:col-span-1"><p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#88958E]">Travel style</p><p className="mt-1.5 text-[12px] font-bold text-[#17211D]">{category.title}</p></div>
              </div>

              <h3 className="mt-7 font-serif text-[23px] text-[#17211D]">Your three-day preview</h3>
              <div className="mt-4 space-y-3">
                {itinerary.map((item, index) => (
                  <motion.div key={item.day} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.08 }} className="flex gap-3 rounded-2xl border border-[#E0E8E4] bg-white p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF7F1] text-[10px] font-extrabold text-[#087F5B]">{item.day}</span>
                    <div><h4 className="text-[11px] font-bold text-[#26382F]">{item.title}</h4><p className="mt-1 text-[10px] leading-5 text-[#6B7972]">{item.description}</p></div>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="rounded-[22px] border border-[#DCE7E1] bg-gradient-to-b from-[#F1F8F4] to-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#073D31] text-[#FFD078]"><Users size={19} /></div>
              <h3 className="mt-4 font-serif text-[22px] text-[#17211D]">Plan together</h3>
              <p className="mt-2 text-[10px] leading-5 text-[#68776F]">Add travel companions to this preview or share a collaboration link.</p>

              <form onSubmit={addCollaborator} className="mt-4">
                <label htmlFor="collaborator-email" className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#66766E]">Collaborator email</label>
                <div className="relative mt-2">
                  <MailPlus size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#087F5B]" />
                  <input id="collaborator-email" type="email" value={collaboratorEmail} onChange={(event) => setCollaboratorEmail(event.target.value)} placeholder="traveler@example.com" className="h-11 w-full rounded-xl border border-[#D8E4DE] bg-white pl-10 pr-3 text-[10px] text-[#26382F] outline-none focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.07]" />
                </div>
                <button type="submit" className="mt-2.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#BFDACE] bg-white text-[10px] font-bold text-[#087F5B] transition-colors hover:bg-[#EAF7F1]"><MailPlus size={14} /> Add collaborator</button>
              </form>

              {collaborators.length > 0 && (
                <div className="mt-4 space-y-2">
                  {collaborators.map((email) => (
                    <div key={email} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[9px] font-semibold text-[#52635A]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7F1] text-[#087F5B]"><UserRound size={12} /></span><span className="min-w-0 flex-1 truncate">{email}</span><button type="button" onClick={() => setCollaborators((current) => current.filter((item) => item !== email))} aria-label={`Remove ${email}`} className="text-[#9AA49F] hover:text-[#B54E32]"><Trash2 size={13} /></button></div>
                  ))}
                </div>
              )}

              <button type="button" onClick={copyCollaborationLink} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#073D31] text-[10px] font-bold text-white shadow-[0_10px_24px_rgba(7,61,49,0.18)] transition-colors hover:bg-[#087F5B]"><Link2 size={14} /> Copy collaboration link</button>
              {shareStatus && <p aria-live="polite" className="mt-2 text-center text-[9px] font-semibold text-[#087F5B]">{shareStatus}</p>}
            </aside>
          </div>

          <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-[#E1E8E4] bg-[#FFFEFB]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
            <button type="button" onClick={copyCollaborationLink} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#DCE5E0] px-4 text-[10px] font-bold text-[#52635A] hover:border-[#087F5B]/35 hover:text-[#087F5B]"><Share2 size={14} /> Share preview</button>
            <Link href={`/plan-trip?category=${category.slug}&mode=collaborative`} className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#E89425] to-[#F5B13E] px-5 text-[10px] font-bold text-[#13221C] shadow-[0_10px_24px_rgba(232,148,37,0.22)]"><Sparkles size={14} /> Build full collaborative trip <ArrowRight size={14} /></Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}