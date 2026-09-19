"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
  MessageCircle,
  PhoneCall,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";

import {
  animate,
  motion,
  useMotionValue,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchTourPackages } from "@/lib/api/tour-packages";
import type { TourPackage } from "@/types/tour-package";

/* ============================================================
   TYPES
============================================================ */

type Package = {
  id: number;
  slug: string;
  title: string;
  destination: string;
  subtitle: string;
  image: string;
  duration: string;
  people: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  tag: string;
};

type UpcomingPackage = {
  id: number;
  slug: string;
  title: string;
  destination: string;
  image: string;
  startDate: string;
  duration: string;
  seatsLeft: number;
  price: number;
  company: string;
};

/* ============================================================
   PRICE FORMAT
============================================================ */

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(
    price
  );

/* ============================================================
   FEATURED PACKAGE CARD
============================================================ */

function FeaturedPackageCard({
  tour,
  duplicate = false,
}: {
  tour: Package;
  duplicate?: boolean;
}) {
  return (
    <Link
      href={`/tour-packages/${tour.slug}`}
      tabIndex={duplicate ? -1 : undefined}
      className="
        group
        relative
        h-[450px]
        w-[275px]
        shrink-0
        overflow-hidden
        rounded-[28px]
        sm:h-[485px]
        sm:w-[310px]
        lg:h-[505px]
        lg:w-[345px]
      "
    >
      {/* IMAGE */}

      <img
        src={tour.image}
        alt={tour.title}
        draggable={false}
        className="
          pointer-events-none
          h-full
          w-full
          select-none
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.055]
        "
      />

      {/* GRADIENT */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/15
          to-black/5
        "
      />

      {/* TAG */}

      <div className="absolute left-4 top-4">
        <span
          className="
            rounded-full
            bg-white/90
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-[#29332e]
            backdrop-blur
          "
        >
          {tour.tag}
        </span>
      </div>

      {/* CONTENT */}

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="mb-3 flex items-center gap-1.5 text-xs text-white/75">
          <MapPin size={14} />

          {tour.destination}
        </div>

        <h2 className="text-[21px] font-semibold leading-tight">
          {tour.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/70">
          {tour.subtitle}
        </p>

        {/* PACKAGE META */}

        <div className="mt-4 flex items-center gap-4 text-xs text-white/80">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />

            {tour.duration}
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={14} />

            {tour.people}
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-5 flex items-end justify-between border-t border-white/20 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/60">
              Starting from
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-bold">
                ৳{formatPrice(tour.price)}
              </span>

              {tour.oldPrice && (
                <span className="text-xs text-white/50 line-through">
                  ৳
                  {formatPrice(
                    tour.oldPrice
                  )}
                </span>
              )}
            </div>
          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#1e2d27]
              transition-all
              duration-300
              group-hover:rotate-45
              group-hover:scale-105
            "
          >
            <ArrowRight size={17} />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   VIDEO STYLE CONTINUOUS ROLLING SLIDER
============================================================ */

function FeaturedPackagesSlider({
  packages,
}: {
  packages: Package[];
}) {
  const x = useMotionValue(0);

  const firstTrackRef =
    useRef<HTMLDivElement>(null);

  const animationRef =
    useRef<ReturnType<typeof animate> | null>(
      null
    );

  const [trackWidth, setTrackWidth] =
    useState(0);

  /* ---------------------------------------------
     Measure exact width of first package track
  --------------------------------------------- */

  useEffect(() => {
    const track = firstTrackRef.current;

    if (!track) return;

    const updateWidth = () => {
      setTrackWidth(track.scrollWidth);
    };

    updateWidth();

    const observer =
      new ResizeObserver(updateWidth);

    observer.observe(track);

    window.addEventListener(
      "resize",
      updateWidth
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateWidth
      );
    };
  }, []);

  /* ---------------------------------------------
     Infinite rolling animation
  --------------------------------------------- */

  useEffect(() => {
    if (!trackWidth) return;

    animationRef.current?.stop();

    x.set(0);

    animationRef.current = animate(
      x,
      -trackWidth,
      {
        duration: 34,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }
    );

    return () => {
      animationRef.current?.stop();
    };
  }, [trackWidth, x]);

  /* ---------------------------------------------
     Pause / Resume
  --------------------------------------------- */

  const pauseAnimation = () => {
    animationRef.current?.pause();
  };

  const resumeAnimation = () => {
    animationRef.current?.play();
  };

  return (
    <div
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      className="
        relative
        left-1/2
        w-screen
        -translate-x-1/2
        overflow-hidden
      "
    >
      <motion.div
        style={{ x }}
        className="flex w-max"
      >
        {/* FIRST TRACK */}

        <div
          ref={firstTrackRef}
          className="
            flex
            shrink-0
            gap-4
            pr-4
            sm:gap-5
            sm:pr-5
          "
        >
          {packages.map(
            (tour, index) => (
              <FeaturedPackageCard
                key={tour.slug || `featured-${index}`}
                tour={tour}
              />
            )
          )}
        </div>

        {/* SECOND IDENTICAL TRACK */}

        <div
          aria-hidden="true"
          className="
            flex
            shrink-0
            gap-4
            pr-4
            sm:gap-5
            sm:pr-5
          "
        >
          {packages.map(
            (tour, index) => (
              <FeaturedPackageCard
                key={`duplicate-${tour.slug || index}`}
                tour={tour}
                duplicate
              />
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function TourPackagesPage() {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);

  useEffect(() => {
    let active = true;

    fetchTourPackages()
      .then((packages) => {
        if (active) setTourPackages(packages);
      })
      .catch((error) => {
        console.error("Failed to load tour packages:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredPackages: Package[] = tourPackages
    .filter((tour) => tour.featured)
    .map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      destination: tour.destination,
      subtitle: tour.subtitle || "",
      image: tour.image,
      duration: tour.duration,
      people: tour.people || "",
      price: tour.price,
      oldPrice: tour.oldPrice,
      rating: tour.rating || 0,
      reviews: tour.reviews || 0,
      tag: tour.tag || "Tour package",
    }));

  const upcomingPackages: UpcomingPackage[] = tourPackages
    .filter((tour) => tour.upcoming)
    .map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      destination: tour.destination,
      image: tour.image,
      startDate: tour.startDate || "Date coming soon",
      duration: tour.duration,
      seatsLeft: tour.seatsLeft || 0,
      price: tour.price,
      company: tour.company,
    }));

  const travelerReviews = tourPackages.flatMap((tour) =>
    tour.travelerReview ? [tour.travelerReview] : []
  );

  return (
    <main className="overflow-hidden bg-[#f7f4ef] text-[#171719]">
      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative overflow-hidden bg-[#d8c3f2] pb-14 pt-24 md:pb-20 md:pt-28">
        {/* BACKGROUND DECORATION */}

        <div className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[#c9adea]" />

        <div className="pointer-events-none absolute -right-36 top-16 h-[430px] w-[430px] rounded-full bg-[#c7abe8]" />

        {/* HERO TEXT */}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#4b2d66]/15
                bg-white/25
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#3c2354]
                backdrop-blur
              "
            >
              <Sparkles size={14} />

              Trips made for Bangladesh
            </div>

            <h1
              className="
                font-serif
                text-4xl
                font-semibold
                tracking-[-0.04em]
                text-[#251035]
                sm:text-5xl
                md:text-6xl
              "
            >
              Trips tailored to you
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#442e55] sm:text-lg">
              Handpicked tour packages with
              stays, transport, local
              experiences and clear pricing —
              all in one place.
            </p>
          </div>
        </div>

        {/* ====================================================
            FEATURED PACKAGES
        ==================================================== */}

        <div className="relative mt-12">
          <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#55376d]
                "
              >
                Recommended for you
              </p>
            </div>

            <p className="hidden text-sm text-[#5e4b6c] sm:block">
              Hover to pause
            </p>
          </div>

          <FeaturedPackagesSlider packages={featuredPackages} />
        </div>
      </section>

      {/* ========================================================
          UPCOMING DEPARTURES
      ======================================================== */}

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#8b6c3b]
                "
              >
                Upcoming departures
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#183229] sm:text-4xl">
                Your next trip could start soon
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6e7874]">
                Join scheduled group tours
                with fixed departure dates,
                clear prices and limited group
                sizes.
              </p>
            </div>

            <Link
              href="/tour-packages?type=upcoming"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#183229]"
            >
              See all upcoming tours

              <ChevronRight size={17} />
            </Link>
          </div>

          {/* UPCOMING CARDS */}

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {upcomingPackages.map(
              (tour, index) => (
                <motion.div
                  key={tour.slug || index}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    href={`/tour-packages/${tour.slug}`}
                    className="
                      group
                      block
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-black/[0.06]
                      bg-white
                      shadow-[0_10px_35px_rgba(25,45,35,0.06)]
                      transition-all
                      duration-300
                      hover:-translate-y-1.5
                      hover:shadow-[0_24px_55px_rgba(25,45,35,0.12)]
                    "
                  >
                    {/* IMAGE */}

                    <div className="relative h-[220px] overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* SEATS */}

                      <div
                        className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-[#173d32]
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          text-white
                        "
                      >
                        {tour.seatsLeft} seats
                        left
                      </div>
                    </div>

                    {/* DETAILS */}

                    <div className="p-5">
                      <p className="text-xs font-medium text-[#8c8f89]">
                        {tour.company}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-[#1a3129]">
                        {tour.title}
                      </h3>

                      <div className="mt-4 space-y-2.5 text-sm text-[#6f7974]">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                          />

                          Starts{" "}
                          {tour.startDate}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={16} />

                          {tour.duration}
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={16} />

                          {tour.destination}
                        </div>
                      </div>

                      {/* PRICE */}

                      <div className="mt-5 flex items-end justify-between border-t border-[#eceeea] pt-5">
                        <div>
                          <p className="text-[11px] text-[#949c97]">
                            Per person from
                          </p>

                          <p className="mt-1 text-2xl font-bold text-[#163c31]">
                            ৳
                            {formatPrice(
                              tour.price
                            )}
                          </p>
                        </div>

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-[#edf2ef]
                            text-[#173d32]
                            transition-all
                            group-hover:bg-[#173d32]
                            group-hover:text-white
                          "
                        >
                          <ArrowRight
                            size={17}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          WHY BOOK
      ======================================================== */}

      <section className="bg-[#102d26] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#e3b95e]
                "
              >
                More than a package
              </p>

              <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Less planning stress.
                <br />
                More time enjoying
                Bangladesh.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
                Every package is designed to
                make the journey easier:
                clear costs, practical
                schedules and local travel
                support from departure to
                return.
              </p>
            </div>

            {/* BENEFITS */}

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title:
                    "Verified packages",
                  text:
                    "Package information, stay and transport details are reviewed before publishing.",
                },

                {
                  icon: WalletCards,
                  title: "Clear pricing",
                  text:
                    "Know what is included before you book, with fewer surprise costs.",
                },

                {
                  icon: Headphones,
                  title:
                    "Local travel support",
                  text:
                    "Get help when you need it during your journey.",
                },

                {
                  icon: Users,
                  title:
                    "Trips for real travellers",
                  text:
                    "Family, couple, friends and group-friendly options across Bangladesh.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-[24px]
                      border
                      border-white/10
                      bg-white/[0.055]
                      p-6
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#e3b95e]
                        text-[#102d26]
                      "
                    >
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHAT IS INCLUDED
      ======================================================== */}

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div
          className="
            mx-auto
            max-w-7xl
            rounded-[32px]
            bg-[#eee7dc]
            p-6
            sm:p-9
            lg:p-12
          "
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#866b41]
                "
              >
                Easy to understand
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#23372f] sm:text-4xl">
                Know what your trip includes
                before you book
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#69736e]">
                Each package page can clearly
                show hotel, transport, meals,
                sightseeing, pickup
                information, cancellation
                policy and anything not
                included.
              </p>
            </div>

            {/* INCLUDED ITEMS */}

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Hotel / resort stay",
                "Transport details",
                "Daily itinerary",
                "Selected meals",
                "Local sightseeing",
                "Pickup information",
                "Package exclusions",
                "Cancellation policy",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-white/70
                    px-4
                    py-4
                  "
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#193b31]
                      text-white
                    "
                  >
                    <Check size={14} />
                  </div>

                  <span className="text-sm font-medium text-[#34443e]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA
      ======================================================== */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[32px]
            bg-[#d9c3f1]
            px-6
            py-12
            text-center
            sm:px-10
            md:py-16
          "
        >
          <div className="mx-auto max-w-3xl">
            <Star
              className="mx-auto text-[#65437b]"
              size={26}
            />

            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#2e173c] sm:text-4xl">
              Still deciding where to go?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#634d70] sm:text-base">
              Explore packages by
              destination, budget and travel
              style and find one that fits the
              trip you actually want.
            </p>

            <Link
              href="/plan-trip"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#203d33]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-transform
                hover:scale-[1.02]
              "
            >
              Find my perfect trip

              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          TRAVELLER REVIEWS & SUPPORT
      ======================================================== */}

      <section className="px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#96713a]">
                Traveller stories
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold text-[#23372f] sm:text-4xl">
                Trips remembered, stories shared
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#69736e]">
              See how other travellers experienced their journey before choosing the package that feels right for you.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {travelerReviews.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-[28px] border border-[#dfe4df] bg-white shadow-[0_18px_55px_rgba(31,55,46,0.07)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.destination} traveller experience`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a22]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[#29463c] backdrop-blur">
                    <Star size={13} className="fill-[#e3ae4e] text-[#e3ae4e]" />
                    {item.rating}
                  </div>
                </div>

                <div className="p-6">
                  <Quote size={23} className="text-[#c89a4e]" />

                  <p className="mt-4 text-sm leading-7 text-[#58665f]">
                    “{item.review}”
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#e8ebe8] pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5efe9] text-xs font-bold text-[#23483b]">
                      {item.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#253a32]">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs text-[#7a8680]">
                        {item.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mt-8 overflow-hidden rounded-[30px] bg-[#173e33] px-6 py-8 text-white sm:px-9 lg:px-12 lg:py-10"
          >
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[38px] border-white/[0.04]" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1bf62] text-[#183b31]">
                  <Headphones size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#f1c774]">
                    Talk before you book
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    Need help choosing your tour?
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                    Ask about dates, pickup, room sharing or package inclusions. Our support team will help you decide with confidence.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+8801738803106"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall size={17} />
                  Call helpline
                </a>

                <a
                  href="https://wa.me/8801738803106?text=I%20need%20help%20choosing%20a%20TripPlan%20AI%20tour%20package."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f1bf62] px-5 py-3.5 text-sm font-semibold text-[#173b31] transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
