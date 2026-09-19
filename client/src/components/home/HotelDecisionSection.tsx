"use client";

import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { BedDouble, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

type Hotel = {
  id: number;
  name: string;
  location: string;
  slug: string;
  image: string;
  shape: string;
};

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Sea Pearl Beach Resort",
    location: "Cox’s Bazar",
    slug: "sea-pearl-beach-resort",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[40px_40px_18px_18px]",
  },
  {
    id: 2,
    name: "Grand Sylhet Hotel",
    location: "Sylhet",
    slug: "grand-sylhet-hotel",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[50%_50%_18px_18px]",
  },
  {
    id: 3,
    name: "The Palace Resort",
    location: "Habiganj",
    slug: "the-palace-resort",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[20px_20px_45px_45px]",
  },
  {
    id: 4,
    name: "InterContinental Dhaka",
    location: "Dhaka",
    slug: "intercontinental-dhaka",
    image:
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[42px_18px_42px_18px]",
  },
  {
    id: 5,
    name: "Sayeman Beach Resort",
    location: "Cox’s Bazar",
    slug: "sayeman-beach-resort",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[24px_48px_24px_48px]",
  },
  {
    id: 6,
    name: "Nazimgarh Resort",
    location: "Sylhet",
    slug: "nazimgarh-resort",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    shape: "rounded-[48px_48px_16px_16px]",
  },
];

const loopHotels = [...hotels, ...hotels];

export default function HotelSection() {
  const x = useMotionValue("0%");

  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    animationRef.current = animate(x, ["0%", "-50%"], {
      duration: 32,
      ease: "linear",
      repeat: Infinity,
    });

    return () => {
      animationRef.current?.stop();
    };
  }, [x]);

  const pauseAnimation = () => {
    animationRef.current?.pause();
  };

  const resumeAnimation = () => {
    animationRef.current?.play();
  };

  return (
    <section className="overflow-hidden bg-[#fcfaf6] py-16 md:py-20">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d9d2c3] bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#7a6f5a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8a96b]" />

            Recommended stays
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-[#1f1a14] sm:text-4xl md:text-5xl">
            Stays worth checking in for
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6f675b] sm:text-base">
            Discover handpicked hotels across Bangladesh — from beachside
            resorts to peaceful hillside retreats.
          </p>
        </div>
      </div>

      {/* Slider */}
      <div
        className="relative"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
      >
        <motion.div
          style={{ x }}
          className="flex w-max gap-5 px-4 sm:px-6 lg:px-8"
        >
          {loopHotels.map((hotel, index) => (
            <Link
              key={`${hotel.id}-${index}`}
              href={`/hotels/${hotel.slug}`}
              className="group block shrink-0"
            >
              <div className="w-[210px] sm:w-[230px] md:w-[250px] lg:w-[270px]">
                {/* Hotel Image */}
                <div
                  className={`relative h-[280px] overflow-hidden bg-[#eee8dd] ${hotel.shape}`}
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="
                      (max-width: 640px) 210px,
                      (max-width: 768px) 230px,
                      (max-width: 1024px) 250px,
                      270px
                    "
                  />
                </div>

                {/* Hotel Info */}
                <div className="px-1 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1ebdf] text-[#8a6a35]">
                      <BedDouble
                        size={17}
                        strokeWidth={1.7}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold text-[#201a14] transition-colors duration-300 group-hover:text-[#8a6a35]">
                        {hotel.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[#81786c]">
                        <MapPin
                          size={14}
                          strokeWidth={1.7}
                        />

                        <span>{hotel.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Explore Button */}
      <div className="mx-auto mt-12 flex max-w-7xl justify-center px-4">
        <Link
          href="/hotels"
          className="
            rounded-full
            border border-[#28231d]
            px-6 py-3
            text-sm font-medium
            text-[#28231d]
            transition-all duration-300
            hover:bg-[#28231d]
            hover:text-white
          "
        >
          Explore all hotels
        </Link>
      </div>
    </section>
  );
}