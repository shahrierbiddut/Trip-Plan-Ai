"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Car,
  Coffee,
  MapPinned,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { destinations, formatBdt, hotels } from "@/data/services/hotels";
import { formatBdt } from "@/data/services/hotels";
import { HotelSearchBar } from "./HotelSearchBar";

const collections = [
  { title: "Budget stays under ৳2,000", icon: Banknote, tone: "from-[#184f40] to-[#0b2e25]" },
  { title: "Best family hotels", icon: UsersRound, tone: "from-[#bd7620] to-[#74420b]" },
  { title: "Hotels near the beach", icon: Waves, tone: "from-[#0c705a] to-[#075043]" },
  { title: "Resorts with swimming pool", icon: Building2, tone: "from-[#3f6b56] to-[#183e31]" },
  { title: "Hotels with free breakfast", icon: Coffee, tone: "from-[#9b6823] to-[#50330f]" },
  { title: "Business hotels", icon: Building2, tone: "from-[#315b53] to-[#163730]" },
  { title: "Airport pickup", icon: PlaneTakeoff, tone: "from-[#155d4b] to-[#0b352b]" },
  { title: "Hotels with parking", icon: Car, tone: "from-[#af6f27] to-[#653d10]" },
];

export function HotelDiscoveryPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [destinationSlide, setDestinationSlide] = useState(0);
  const [destinationCardsPerView, setDestinationCardsPerView] = useState(4);
  const [destinationCarouselPaused, setDestinationCarouselPaused] = useState(false);

  const destinationLastSlide = Math.max(
    0,
    destinations.length - destinationCardsPerView,
  );

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/hotels`);
        const data = await res.json();
        if (data.success && data.data) {
          setDestinations(data.data.destinations);
          setHotels(data.data.hotels);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      const nextCardsPerView =
        width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2 : 1;

      setDestinationCardsPerView(nextCardsPerView);
      setDestinationSlide(0);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    if (destinationCarouselPaused || destinationLastSlide === 0) return;

    const interval = window.setInterval(() => {
      setDestinationSlide((current) =>
        current >= destinationLastSlide ? 0 : current + 1,
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, [destinationCarouselPaused, destinationLastSlide]);

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#173b31]">
      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury beach resort surrounded by nature"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,39,29,.93)_0%,rgba(3,39,29,.69)_48%,rgba(3,39,29,.27)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f7f7f2] to-transparent" />

        <div className="mx-auto w-full max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Sparkles size={16} className="text-[#f4b43c]" />
              AI-powered hotel discovery
            </span>
            <h1 className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Find a stay that fits your journey.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Search trusted stays across Bangladesh by complete trip cost, location,
              facilities and real traveller needs—not price alone.
            </p>
          </motion.div>

          <div className="mt-9">
            <HotelSearchBar />
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore Bangladesh"
            title="Popular destinations"
            description="Start with a place, then discover the stay that matches your budget and travel style."
          />
        </div>

        <div
          className="mt-8 w-full overflow-hidden px-2 sm:px-5 lg:px-8"
          onMouseEnter={() => setDestinationCarouselPaused(true)}
          onMouseLeave={() => setDestinationCarouselPaused(false)}
          onFocusCapture={() => setDestinationCarouselPaused(true)}
          onBlurCapture={() => setDestinationCarouselPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{
              x: `${-(destinationSlide * (100 / destinationCardsPerView))}%`,
            }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.slug}
                className="shrink-0 px-2.5"
                style={{ flexBasis: `${100 / destinationCardsPerView}%` }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  href={`/hotels/search?destination=${encodeURIComponent(destination.name)}`}
                  className="group relative block min-h-[310px] overflow-hidden rounded-[28px] shadow-[0_18px_45px_rgba(16,59,47,0.12)]"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062c22] via-[#062c22]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold">{destination.name}</h3>
                        <p className="mt-1 text-sm text-white/75">{destination.hotelCount} available hotels</p>
                      </div>
                      <span className="rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur transition group-hover:bg-[#e7a02b] group-hover:text-[#14372d]">
                        <ArrowRight size={17} />
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/20 pt-4 text-xs">
                      <p><span className="block text-white/55">From</span>{formatBdt(destination.startingPrice)}</p>
                      <p><span className="block text-white/55">Popular area</span>{destination.popularArea}</p>
                      <p className="col-span-2"><span className="text-white/55">Best season: </span>{destination.bestSeason}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-7 flex justify-center gap-2" aria-label="Popular destination slides">
          {Array.from({ length: destinationLastSlide + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setDestinationSlide(index)}
              aria-label={`Show destination slide ${index + 1}`}
              aria-current={destinationSlide === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                destinationSlide === index
                  ? "w-7 bg-[#0a7555]"
                  : "w-2 bg-[#cddbd6] hover:bg-[#93aea4]"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-[#dfe8e4] bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Stay your way"
            title="Smart hotel collections"
            description="Shortlists made around the needs Bangladeshi travellers care about most."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {collections.map(({ title, icon: Icon, tone }) => (
              <Link
                key={title}
                href={`/hotels/search?collection=${encodeURIComponent(title)}`}
                className={`group relative min-h-44 overflow-hidden rounded-[24px] bg-gradient-to-br ${tone} p-5 text-white shadow-[0_14px_32px_rgba(12,58,45,0.14)] transition hover:-translate-y-1`}
              >
                <span className="inline-flex rounded-2xl bg-white/12 p-3 text-[#f4b43c] backdrop-blur">
                  <Icon size={23} />
                </span>
                <h3 className="mt-7 max-w-[220px] font-serif text-xl font-semibold leading-tight">{title}</h3>
                <ArrowRight className="absolute bottom-5 right-5 transition group-hover:translate-x-1" size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-7 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div className="overflow-hidden rounded-[34px] bg-[#073e30] p-7 text-white shadow-[0_24px_60px_rgba(7,62,48,0.2)] sm:p-10">
          <div className="flex items-center gap-2 text-[#f5b442]">
            <Sparkles size={18} />
            <span className="text-sm font-bold uppercase tracking-[0.15em]">AI Hotel Match</span>
          </div>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Tell us what a perfect stay means to you.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/72">
            Try: “Cox’s Bazar-এ family নিয়ে থাকার জন্য beach-এর কাছে ৳৪,০০০-এর মধ্যে clean hotel চাই।”
          </p>
          <div className="mt-8 flex flex-col gap-3 rounded-[22px] border border-white/15 bg-white/10 p-3 backdrop-blur sm:flex-row">
            <input
              aria-label="Describe your ideal hotel"
              placeholder="Describe your destination, budget and needs..."
              className="min-h-12 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/50"
            />
            <button
              type="button"
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#efa72e] px-6 font-semibold text-[#12362c] transition hover:bg-[#f7ba4f]"
            >
              <Sparkles size={17} /> Find my match
            </button>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["Complete cost estimate", "Review pros & concerns", "Smart alternatives"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/78">
                <BadgeCheck size={16} className="text-[#f3b43e]" /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-[#dce7e2] bg-white p-7 shadow-[0_18px_50px_rgba(11,62,48,0.09)] sm:p-9">
          <span className="inline-flex rounded-2xl bg-[#fff5df] p-3 text-[#d88b18]">
            <ShieldCheck size={25} />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#123b30]">Information you can trust</h2>
          <div className="mt-6 space-y-5">
            {[
              ["Verified details", "Clearly labelled hotel-provided policies and last verification date."],
              ["Transparent pricing", "Nightly rate, tax, service charge and total stay price together."],
              ["Useful local context", "Distance from beaches, terminals, hospitals and attractions."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <Star size={17} className="mt-1 shrink-0 text-[#e69a24]" fill="currentColor" />
                <p><strong className="block text-[#173c31]">{title}</strong><span className="text-sm leading-6 text-[#6b7d76]">{text}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Traveller favourites"
            title="Trending hotels"
            description="Highly considered stays with strong recent traveller feedback."
          />
          <Link href="/hotels/search" className="hidden items-center gap-2 font-semibold text-[#087653] sm:flex">
            View all <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {hotels.slice(0, 3).map((hotel: any) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.slug}`}
              className="group overflow-hidden rounded-[27px] border border-[#dae6e1] bg-white shadow-[0_14px_38px_rgba(13,60,47,0.09)] transition hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-xl bg-[#087653] px-3 py-2 text-sm font-bold text-white">{hotel.rating} {hotel.ratingLabel}</span>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#c77e15]"><MapPinned size={14} /> {hotel.area}, {hotel.destination}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">{hotel.name}</h3>
                <div className="mt-4 flex items-end justify-between border-t border-[#e3ebe8] pt-4">
                  <p className="text-sm text-[#71817b]">From <strong className="block text-lg text-[#153b30]">{formatBdt(hotel.pricePerNight)}</strong></p>
                  <ArrowRight size={19} className="text-[#087653]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c37c16]">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.03em] text-[#123b30] sm:text-5xl">{title}</h2>
      <p className="mt-3 leading-7 text-[#687a74]">{description}</p>
    </div>
  );
}