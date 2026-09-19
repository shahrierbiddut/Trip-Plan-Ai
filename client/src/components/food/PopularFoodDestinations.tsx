"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatBdt } from "@/data/services/food";
import { fetchFood } from "@/lib/api/food";

export function PopularFoodDestinations() {
  const [foodDestinations, setFoodDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [slide, setSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [paused, setPaused] = useState(false);
  const lastSlide = Math.max(0, foodDestinations.length - cardsPerView);

  useEffect(() => {
    fetchFood().then((res) => {
      if (res?.success && res.data) {
        setFoodDestinations(res.data.destinations);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      setCardsPerView(width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2 : 1);
      setSlide(0);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    if (paused || lastSlide === 0) return;

    const interval = window.setInterval(() => {
      setSlide((current) => (current >= lastSlide ? 0 : current + 1));
    }, 2400);

    return () => window.clearInterval(interval);
  }, [lastSlide, paused]);

  return (
    <>
      <div
        className="mt-8 w-full overflow-hidden px-2 sm:px-5 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <motion.div
          className="flex"
          animate={{ x: `${-(slide * (100 / cardsPerView))}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {foodDestinations.map((destination, index) => (
            <motion.div
              key={destination.slug}
              className="shrink-0 px-2.5"
              style={{ flexBasis: `${100 / cardsPerView}%` }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <Link
                href={`/food/search?destination=${encodeURIComponent(destination.name)}`}
                className="group relative block min-h-[320px] overflow-hidden rounded-[28px] shadow-[0_18px_45px_rgba(16,59,47,0.13)] [transform-style:preserve-3d] transition duration-500 hover:-translate-y-1 hover:[transform:perspective(900px)_rotateX(1.5deg)_rotateY(-1.5deg)]"
              >
                <img
                  src={destination.image}
                  alt={`Food experience in ${destination.name}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062c22] via-[#062c22]/38 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">{destination.name}</h3>
                      <p className="mt-1 text-sm text-white/75">
                        {destination.restaurantCount} food places
                      </p>
                    </div>
                    <span className="rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur transition group-hover:bg-[#e7a02b] group-hover:text-[#14372d]">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/20 pt-4 text-xs">
                    <p>
                      <span className="block text-white/55">Meals from</span>
                      {formatBdt(destination.startingPrice)}
                    </p>
                    <p>
                      <span className="block text-white/55">Popular area</span>
                      {destination.popularArea}
                    </p>
                    <p className="col-span-2">
                      <span className="text-white/55">Famous for: </span>
                      {destination.famousFor}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-7 flex justify-center gap-2" aria-label="Food destination slides">
        {Array.from({ length: lastSlide + 1 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSlide(index)}
            aria-label={`Show food destination slide ${index + 1}`}
            aria-current={slide === index ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              slide === index
                ? "w-7 bg-[#0a7555]"
                : "w-2 bg-[#cddbd6] hover:bg-[#93aea4]"
            }`}
          />
        ))}
      </div>
    </>
  );
}