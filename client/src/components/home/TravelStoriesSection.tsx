"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Story = {
  id: number;
  title: string;
  author: string;
  image: string;
  cardColor: string;
  textColor: string;
  buttonHover: string;
  sectionBg: string;
};

const stories: Story[] = [
  {
    id: 1,
    title: "A quiet journey through the hills of Sajek",
    author: "TripPlan Stories",
    image:
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
    cardColor: "#F9C571",
    textColor: "#071A3D",
    buttonHover: "#FFE0A7",
    sectionBg: "#F8E6C9",
  },
  {
    id: 2,
    title: "Finding calm between tea gardens and clouds",
    author: "TripPlan Stories",
    image:
      "https://images.unsplash.com/photo-1599394022918-6c277a4c0049?q=80&w=1200&auto=format&fit=crop",
    cardColor: "#4DE1AE",
    textColor: "#071A3D",
    buttonHover: "#91F0CF",
    sectionBg: "#D9F5EA",
  },
  {
    id: 3,
    title: "The sea, the road and a weekend in Cox’s Bazar",
    author: "TripPlan Stories",
    image:
      "https://images.unsplash.com/photo-1590603740183-980e7f6920eb?q=80&w=1200&auto=format&fit=crop",
    cardColor: "#071A3D",
    textColor: "#FFFFFF",
    buttonHover: "#17366F",
    sectionBg: "#DFE7F1",
  },
];

export default function TravelStoriesSection() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const active =
    activeStory !== null ? stories[activeStory] : null;

  return (
    <motion.section
      animate={{
        backgroundColor: active?.sectionBg || "#ffffff",
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      {/* BACKGROUND STORY IMAGE */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{
              opacity: 0,
              scale: 1.06,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <Image
              src={active.image}
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-white/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT RED CURVES */}
      <div className="pointer-events-none absolute -left-10 top-[45%] hidden h-44 w-44 -translate-y-1/2 md:block">
        <div className="absolute left-0 top-0 h-36 w-36 rounded-full border-[6px] border-[#F33652] border-r-transparent border-t-transparent rotate-[35deg]" />

        <div className="absolute left-5 top-5 h-28 w-28 rounded-full border-[6px] border-[#F33652] border-r-transparent border-t-transparent rotate-[35deg]" />

        <div className="absolute left-10 top-10 h-20 w-20 rounded-full border-[6px] border-[#F33652] border-r-transparent border-t-transparent rotate-[35deg]" />
      </div>

      {/* TOP RIGHT YELLOW DECORATION */}
      <motion.svg
        initial={{ rotate: -5 }}
        animate={{ rotate: 5 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        viewBox="0 0 180 180"
        className="pointer-events-none absolute -right-4 -top-8 hidden h-44 w-44 md:block lg:right-10"
        fill="none"
      >
        <path
          d="
          M89 15
          C95 15 96 35 102 36
          C108 37 115 18 121 21
          C127 24 119 42 125 45
          C131 48 144 32 149 37
          C154 42 139 55 142 61
          C145 67 164 61 166 68
          C168 75 148 79 149 85
          C150 91 170 94 169 101
          C168 108 148 105 146 111
          C144 117 162 126 158 132
          C154 138 138 125 133 130
          C128 135 141 151 135 155
          C129 159 118 142 112 145
          C106 148 111 168 104 170
          C97 172 94 152 88 152
          C82 152 77 172 70 169
          C63 166 70 148 64 145
          C58 142 46 158 40 153
          C34 148 48 133 43 128
          C38 123 21 135 17 129
          C13 123 31 114 29 108
          C27 102 7 105 6 98
          C5 91 25 89 25 83
          C25 77 5 72 8 65
          C11 58 29 65 32 59
          C35 53 19 41 24 36
          C29 31 43 47 49 43
          C55 39 46 21 53 18
          C60 15 67 35 73 34
          C79 33 82 15 89 15Z
          "
          stroke="#F5B650"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <div className="relative mx-auto max-w-[950px]">
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="mb-9 text-center font-serif text-[30px] font-semibold tracking-[-0.03em] text-[#071A3D] sm:text-4xl md:mb-12 md:text-[46px]"
        >
          Some stories from the road
        </motion.h2>

        {/* CARDS */}
        {/* CARDS */}
<div className="mx-auto grid max-w-[1050px] grid-cols-1 gap-6 md:grid-cols-3">
  {stories.map((story, index) => (
    <motion.article
      key={story.id}
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.94,
        rotate: index === 0 ? -2 : index === 2 ? 2 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      whileHover={{
        y: -14,
        scale: 1.025,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        backgroundColor: story.cardColor,
        color: story.textColor,
      }}
      className="
        group
        flex min-h-[500px] flex-col
        rounded-[16px]
        border border-black/10
        p-[10px]
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        transition-shadow duration-500
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)]
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px]">
        <motion.div
          className="absolute inset-0"
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 340px"
          />
        </motion.div>

        {/* subtle image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
        <motion.h3
          className="min-h-[84px] text-[18px] font-medium leading-[1.3]"
          whileHover={{
            x: 3,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          {story.title}
        </motion.h3>

        {/* AUTHOR */}
        <div className="mt-4 flex items-center gap-2.5">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white/30">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
              alt="Author"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>

          <span className="text-[12px] font-medium">
            {story.author}
          </span>
        </div>

        {/* READ BUTTON */}
        <div className="mt-auto pt-6">
          <Link
            href="/inspiration/stories"
            onMouseEnter={() => setActiveStory(index)}
            onMouseLeave={() => setActiveStory(null)}
            onFocus={() => setActiveStory(index)}
            onBlur={() => setActiveStory(null)}
            style={
              activeStory === index
                ? {
                    backgroundColor: story.buttonHover,
                  }
                : undefined
            }
            className={`
              flex h-[48px] w-full items-center justify-center
              rounded-[10px]
              border text-[12px] font-semibold
              transition-all duration-300
              active:scale-[0.98]
              ${
                index === 2
                  ? "border-white/70 text-white"
                  : "border-[#071A3D]/40 text-[#071A3D]"
              }
            `}
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Read article
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  ))}
</div>
      </div>
    </motion.section>
  );
}