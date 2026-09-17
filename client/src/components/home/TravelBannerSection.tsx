"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { fetchTourPackages } from "@/lib/api/tour-packages";
import type { TourPackage } from "@/types/tour-package";


function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD").format(price);
}

function PackageCards({ packages }: { packages: TourPackage[] }) {
  return (
    <div className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4">
      {packages.map((item) => (
        <Link
          key={item.id}
          href={`/tour-packages/${item.slug}`}
          className="
            group
            relative
            block
            h-[190px]
            w-[300px]
            shrink-0
            overflow-hidden
            rounded-[16px]
            bg-[#e9eef1]
            sm:h-[205px]
            sm:w-[330px]
            lg:h-[215px]
            lg:w-[350px]
          "
        >
          {/* IMAGE */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.06]
            "
            sizes="
              (max-width: 640px) 300px,
              (max-width: 1024px) 330px,
              350px
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/75
              via-black/40
              to-black/5
            "
          />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            {/* TOP */}
            <div className="flex items-start justify-between">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/90
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-[#15352b]
                  backdrop-blur-md
                "
              >
                <MapPin size={11} />

                {item.destination}
              </span>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  group-hover:rotate-45
                  group-hover:bg-white
                  group-hover:text-[#15352b]
                "
              >
                <ArrowUpRight size={15} />
              </div>
            </div>

            {/* BOTTOM */}
            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/65">
                {item.company}
              </p>

              <h3 className="max-w-[250px] text-[20px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                {item.title}
              </h3>

              <div className="mt-3 flex items-end justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <CalendarDays size={13} />

                  {item.duration}
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/60">
                    From
                  </p>

                  <p className="text-lg font-bold text-white">
                    ৳{formatPrice(item.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function TourPackageSection() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const x = useMotionValue("0%");

  const animationRef =
    useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    let active = true;

    fetchTourPackages({ featured: true })
      .then((items) => {
        if (active) setPackages(items);
      })
      .catch((error) => {
        console.error("Failed to load home tour packages:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    animationRef.current = animate(x, ["0%", "-50%"], {
      duration: 35,
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      animationRef.current?.stop();
    };
  }, [x]);

  const pause = () => {
    animationRef.current?.pause();
  };

  const play = () => {
    animationRef.current?.play();
  };

  return (
    <section className="overflow-hidden bg-[#f3f6f8] py-14 md:py-20">
      {/* HEADING */}
      <div className="mx-auto mb-8 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#73817b]">
              Explore Bangladesh
            </p>

            <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#102d25] sm:text-4xl">
              Popular tour packages
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#708078]">
              Discover packages from trusted travel businesses
              across Bangladesh.
            </p>
          </div>

          <Link
            href="/tour-packages"
            className="
              hidden
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#15352b]
              sm:flex
            "
          >
            View all

            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* VIDEO STYLE ROLLING AREA */}
      <div
        onMouseEnter={pause}
        onMouseLeave={play}
        className="
          w-full
          overflow-hidden
          border-y
          border-[#dfe5e8]
          py-4
        "
      >
        <motion.div
          style={{ x }}
          className="flex w-max"
        >
          {/* TRACK 01 */}
          <PackageCards packages={packages} />

          {/* DUPLICATE TRACK FOR SEAMLESS LOOP */}
          <PackageCards packages={packages} />
        </motion.div>
      </div>

      {/* MOBILE BUTTON */}
      <div className="mt-7 flex justify-center sm:hidden">
        <Link
          href="/tour-packages"
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#15352b]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
          "
        >
          View all packages

          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
