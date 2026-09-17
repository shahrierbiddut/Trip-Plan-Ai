"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, PenLine, MapPin } from "lucide-react";

const destinations = [
  "Cox's Bazar",
  "Sajek Valley",
  "Bandarban",
  "Saint Martin",
  "Kuakata",
];

const heroImages = {
  main: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=90",
  mountain:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=90",
  beach:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=90",
  valley:
    "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=90",
  island:
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=90",
};

export default function ReviewHero() {
  const [search, setSearch] = useState("");

  const handleSearch = (value?: string) => {
    const query = value ?? search.trim();

    if (!query) return;

    console.log("Searching reviews for:", query);

    // Example:
    // router.push(`/reviews?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#0B2522]">
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================== */}

      <div className="absolute inset-0 -z-30">
        <img
          src={heroImages.main}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* =========================================================
          DARK OVERLAYS
      ========================================================== */}

      <div className="absolute inset-0 -z-20 bg-[#071815]/75" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071815_0%,rgba(7,24,21,0.92)_27%,rgba(7,24,21,0.55)_58%,rgba(7,24,21,0.25)_100%)]" />

      {/* =========================================================
          HERO CONTAINER
      ========================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative min-h-[650px] py-16 sm:min-h-[680px] lg:min-h-[720px] lg:py-20">
          <div className="grid min-h-[580px] items-center lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            {/* =====================================================
                LEFT CONTENT
            ====================================================== */}

            <div className="relative z-20 max-w-[620px]">
              {/* Small Label */}

              <div className="mb-5 inline-flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4A62A]/15 text-[#F4B942]">
                  <Sparkles size={14} strokeWidth={2.2} />
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F4B942]">
                  Traveler Insights
                </span>
              </div>

              {/* Main Heading */}

              <h1 className="font-serif text-[45px] font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-[58px] lg:text-[68px] xl:text-[74px]">
                Real Journeys.
                <br />
                <span className="text-[#F4B942]">Honest Stories.</span>
                <br />
                <span className="text-white">Better Trips.</span>
              </h1>

              {/* Description */}

              <p className="mt-6 max-w-[540px] text-[14px] leading-6 text-white/75 sm:text-[15px] sm:leading-7">
                Discover authentic traveler experiences, AI-powered review
                insights, and personalized recommendations to help you plan your
                perfect trip.
              </p>

              {/* CTA Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Write Review */}

                <Link
                  href="/reviews/write-review"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#F4A62A] px-6 text-sm font-semibold text-[#17211D] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F4B942] hover:shadow-xl"
                >
                  <PenLine
                    size={16}
                    strokeWidth={2.3}
                    className="transition-transform duration-300 group-hover:-rotate-6"
                  />
                  Write a Review
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Explore */}

                <Link
                  href="/destinations"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/[0.04] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#F4B942]/70 hover:bg-white/10"
                >
                  Explore Destinations
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* =====================================================
                RIGHT VISUAL / SEARCH AREA
            ====================================================== */}

            <div className="relative mt-10 min-h-[330px] lg:mt-0 lg:min-h-[500px]">
              {/* Decorative glow */}

              <div className="absolute right-[10%] top-[5%] h-48 w-48 rounded-full bg-[#087F5B]/20 blur-3xl" />

              {/* =================================================
                  IMAGE COLLAGE
              ================================================== */}

              <div className="absolute inset-0 hidden lg:block">
                {/* Large mountain image */}

                <div className="absolute left-[4%] top-[12%] h-[220px] w-[48%] overflow-hidden rounded-[22px] border border-white/15 shadow-2xl">
                  <img
                    src={heroImages.mountain}
                    alt="Mountain travel destination"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071815]/50 to-transparent" />
                </div>

                {/* Large beach image */}

                <div className="absolute right-0 top-0 h-[250px] w-[51%] overflow-hidden rounded-[22px] border border-white/15 shadow-2xl">
                  <img
                    src={heroImages.beach}
                    alt="Beach destination"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071815]/40 to-transparent" />
                </div>

                {/* Bottom valley */}

                <div className="absolute bottom-[2%] left-[8%] h-[180px] w-[43%] overflow-hidden rounded-[22px] border border-white/15 shadow-2xl">
                  <img
                    src={heroImages.valley}
                    alt="Green valley destination"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Bottom island */}

                <div className="absolute bottom-0 right-[2%] h-[205px] w-[48%] overflow-hidden rounded-[22px] border border-white/15 shadow-2xl">
                  <img
                    src={heroImages.island}
                    alt="Island destination"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* =================================================
                  SEARCH CARD
              ================================================== */}

              <div className="absolute left-1/2 top-[27%] z-20 w-[92%] -translate-x-1/2 lg:w-[78%]">
                <div className="rounded-2xl border border-black/5 bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2">
                    {/* Search Input */}

                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                      <Search
                        size={19}
                        className="shrink-0 text-[#087F5B]"
                        strokeWidth={2}
                      />

                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        placeholder="Search destinations, experiences or traveler reviews..."
                        className="h-12 w-full min-w-0 bg-transparent text-[12px] text-[#17211D] outline-none placeholder:text-[#7A8580] sm:text-[13px]"
                      />
                    </div>

                    {/* Search Button */}

                    <button
                      type="button"
                      onClick={() => handleSearch()}
                      aria-label="Search reviews"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B2522] text-white transition-all duration-300 hover:bg-[#087F5B]"
                    >
                      <Search size={17} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>

                {/* =================================================
                    POPULAR DESTINATION CHIPS
                ================================================== */}

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {destinations.map((destination) => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => {
                        setSearch(destination);
                        handleSearch(destination);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0B2522]/80 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-[#F4B942]/60 hover:bg-[#163D36] hover:text-[#F4B942]"
                    >
                      <MapPin size={10} className="text-[#F4B942]" />

                      {destination}
                    </button>
                  ))}
                </div>
              </div>

              {/* =================================================
                  MOBILE VISUAL
              ================================================== */}

              <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl lg:hidden">
                <img
                  src={heroImages.beach}
                  alt=""
                  className="h-full w-full object-cover opacity-55"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071815] via-[#071815]/70 to-[#071815]/20" />
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM GRADIENT
          ====================================================== */}

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B2522] to-transparent" />
        </div>
      </div>
    </section>
  );
}
