"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

// These photographs already belong to the project's destination food galleries.
const foodStories = [
  {
    destination: "Cox's Bazar",
    dish: "Grilled fish",
    note: "Charred edges · A squeeze of lime",
    image: "/assets/Coxs/Taste/Grilled Fish.jpg",
    alt: "A whole grilled fish served with lime on a white plate",
    slug: "coxs-bazar",
  },
  {
    destination: "Bandarban",
    dish: "Bamboo chicken",
    note: "Smoky · Cooked inside bamboo",
    image: "/assets/Bandarban/Taste/Bamboo Chicken.jfif",
    alt: "Cooked chicken served inside a split bamboo stem",
    slug: "bandarban",
  },
  {
    destination: "Sylhet",
    dish: "A traditional meal",
    note: "Warm curry · Rice on the side",
    image: "/assets/Sylhet/taste/Traditional Thali.jfif",
    alt: "Curry in a clay pot with a bowl of rice alongside",
    slug: "sylhet",
  },
  {
    destination: "Sajek Valley",
    dish: "A thali to share",
    note: "Rice · A little of everything",
    image: "/assets/Sajek/Taste/Traditional Thali.jfif",
    alt: "A rice platter surrounded by small bowls of curry and vegetables",
    slug: "sajek-valley",
  },
  {
    destination: "Kuakata",
    dish: "Barbecue evenings",
    note: "Hot off the grill · Full of flavour",
    image: "/assets/Kuakata/taste/BBQ Dinner.jfif",
    alt: "Barbecue skewers cooking over a glowing charcoal grill",
    slug: "kuakata",
  },
  {
    destination: "Saint Martin",
    dish: "A seafood spread",
    note: "Seafood · Something to savour",
    image: "/assets/Saintmartin/Thinking/Local Food.jfif",
    alt: "A seafood platter with lobster, vegetables and side dishes",
    slug: "saint-martin",
  },
];

const controlClass =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#f4dfcd]/25 text-[#f4dfcd] transition-colors hover:border-[#edba62] hover:bg-white/10 hover:text-[#edba62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edba62] motion-reduce:transition-none";

export default function RegionalFoodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLUListElement>(null);
  const position = useRef(0);
  const lastWrittenPosition = useRef(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.1 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useAnimationFrame((_, delta) => {
    const viewport = viewportRef.current;
    const group = firstGroupRef.current;
    if (!viewport || !group) return;

    if (reduceMotion || paused || hovered || focused || !inView || document.hidden) {
      position.current = viewport.scrollLeft;
      lastWrittenPosition.current = viewport.scrollLeft;
      return;
    }

    // Keep fractional pixels: rounding every frame otherwise stalls a slow marquee.
    // Respect a manual swipe or native keyboard scroll before resuming movement.
    if (Math.abs(viewport.scrollLeft - lastWrittenPosition.current) > 2) {
      position.current = viewport.scrollLeft;
    }
    const loopWidth = group.offsetWidth;
    if (!loopWidth) return;
    position.current = (position.current + Math.min(delta, 64) * 0.026) % loopWidth;
    viewport.scrollLeft = position.current;
    lastWrittenPosition.current = viewport.scrollLeft;
  });

  function moveCards(direction: -1 | 1) {
    const viewport = viewportRef.current;
    const group = firstGroupRef.current;
    if (!viewport || !group) return;
    setPaused(true);
    const cardStep = group.children[1]
      ? (group.children[1] as HTMLElement).offsetLeft - (group.children[0] as HTMLElement).offsetLeft
      : 300;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const target = viewport.scrollLeft + direction * cardStep;
    viewport.scrollTo({
      left: target < -1 ? maxScroll : target > maxScroll + 1 ? 0 : target,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="regional-food"
      aria-labelledby="regional-food-heading"
      className="overflow-hidden bg-[#431f1a] py-14 text-[#fff8ef] sm:py-20 lg:py-24 xl:py-28"
    >
      <div className="mx-auto grid max-w-[1664px] items-center gap-9 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.9fr_1.2fr] lg:gap-10 lg:px-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.65 }}
          className="max-w-xl motion-reduce:opacity-100! motion-reduce:transform-none!"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#edba62] sm:text-xs">
            Eat where you travel
          </p>
          <h2
            id="regional-food-heading"
            className="mt-4 font-serif text-[36px] font-normal leading-[1.1] tracking-[-0.035em] sm:text-[46px] lg:text-[48px] xl:text-[56px]"
          >
            A different food story<br className="hidden xl:block" /> in every destination.
          </h2>
          <p className="mt-6 max-w-[480px] text-sm leading-7 text-[#dfc6ba] sm:text-[15px]">
            From smoky bamboo chicken in the hills to grilled fish by the sea,
            make local flavours part of your journey. Find your next food stop
            and explore what to eat along the way.
          </p>
          <Link
            href="/food"
            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#edba62] px-6 text-sm font-semibold text-[#382019] transition-colors hover:bg-[#f6cc81] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edba62] motion-reduce:transition-none sm:mt-8"
          >
            Taste the region
            <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
          </Link>
        </motion.div>

        <div className="min-w-0">
          <p id="food-carousel-help" className="sr-only">
            Explore food by destination. Use the previous and next buttons or
            swipe to browse. Automatic movement pauses while you hover or focus
            on a card.
          </p>
          <div
            ref={viewportRef}
            id="regional-food-cards"
            role="region"
            aria-label="Food by destination"
            aria-describedby="food-carousel-help"
            tabIndex={0}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") setPaused(true);
            }}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                moveCards(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            className="flex overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_3%,black_94%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edba62] [&::-webkit-scrollbar]:hidden"
          >
            {/* CSS keeps the server and first client render identical, including
                when reduced motion is enabled before hydration. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                ref={copy === 0 ? firstGroupRef : undefined}
                aria-hidden={copy === 1 ? true : undefined}
                className={`relative m-0 flex w-max shrink-0 list-none gap-4 pr-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
              >
                {foodStories.map((food) => (
                  <li key={food.slug} className="w-[240px] shrink-0 sm:w-[280px] xl:w-[300px]">
                    <Link
                      href={`/destinations/${food.slug}#food`}
                      prefetch={false}
                      tabIndex={copy === 1 ? -1 : undefined}
                      aria-label={`${food.dish} — explore food in ${food.destination}`}
                      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#56342e] transition-colors duration-300 hover:border-[#edba62]/60 hover:bg-[#613b31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#edba62] motion-reduce:transition-none"
                    >
                      <div className="relative h-[204px] overflow-hidden sm:h-[224px] xl:h-[244px]">
                        <Image
                          src={food.image}
                          alt={copy === 1 ? "" : food.alt}
                          fill
                          sizes="(min-width: 1280px) 300px, (min-width: 640px) 280px, 240px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      </div>
                      <div className="p-5 sm:pb-6">
                        <p className="text-[11px] font-medium text-[#edba62]">{food.destination}</p>
                        <h3 className="mt-2 font-serif text-[23px] font-normal leading-tight tracking-[-0.025em] text-[#fff8ef] sm:text-2xl">
                          {food.dish}
                        </h3>
                        <p className="mt-3 text-[11px] leading-5 text-[#dfc6ba]">{food.note}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 px-1">
            <p className="text-[11px] tracking-wide text-[#dfc6ba]">A taste of Bangladesh</p>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous food cards" aria-controls="regional-food-cards" onClick={() => moveCards(-1)} className={controlClass}>
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" aria-label={paused ? "Play food carousel" : "Pause food carousel"} aria-controls="regional-food-cards" onClick={() => setPaused(!paused)} className={`${controlClass} motion-reduce:hidden`}>
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
              <button type="button" aria-label="Next food cards" aria-controls="regional-food-cards" onClick={() => moveCards(1)} className={controlClass}>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
