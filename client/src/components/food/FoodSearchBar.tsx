"use client";

import { motion } from "framer-motion";
import { Banknote, Clock3, MapPin, Search, Utensils, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { DiningStyle } from "@/types/food";

const diningStyles: DiningStyle[] = [
  "Local favourites",
  "Family dining",
  "Street food",
  "Fine dining",
  "Cafe & snacks",
];

const inputClass =
  "w-full bg-transparent text-sm font-medium text-[#173b31] outline-none placeholder:text-[#6f817b]";

export function FoodSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("Cox's Bazar");
  const [mealTime, setMealTime] = useState("Dinner");
  const [guests, setGuests] = useState("2");
  const [diningStyle, setDiningStyle] = useState<DiningStyle>("Local favourites");
  const [budget, setBudget] = useState("2000");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      destination,
      mealTime,
      guests,
      diningStyle,
      budget,
    });

    router.push(`/food/search?${params.toString()}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="grid gap-2 rounded-[26px] border border-white/[0.55] bg-white/[0.88] p-2.5 shadow-[0_22px_70px_rgba(4,39,29,0.24)] backdrop-blur-2xl md:grid-cols-2 xl:grid-cols-[1.2fr_.9fr_.9fr_1fr_1fr_auto]"
    >
      <SearchField icon={<MapPin size={18} />} label="Destination">
        <input
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className={inputClass}
          aria-label="Food destination"
          placeholder="Where will you eat?"
        />
      </SearchField>

      <SearchField icon={<Clock3 size={18} />} label="Meal time">
        <select
          value={mealTime}
          onChange={(event) => setMealTime(event.target.value)}
          className={inputClass}
          aria-label="Meal time"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Late night</option>
        </select>
      </SearchField>

      <SearchField icon={<UsersRound size={18} />} label="Guests">
        <select
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          className={inputClass}
          aria-label="Number of guests"
        >
          {[1, 2, 3, 4, 5, 6, 8, 10].map((value) => (
            <option key={value} value={value}>
              {value} guest{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </SearchField>

      <SearchField icon={<Utensils size={18} />} label="Dining style">
        <select
          value={diningStyle}
          onChange={(event) => setDiningStyle(event.target.value as DiningStyle)}
          className={inputClass}
          aria-label="Dining style"
        >
          {diningStyles.map((style) => (
            <option key={style}>{style}</option>
          ))}
        </select>
      </SearchField>

      <SearchField icon={<Banknote size={18} />} label="Total budget">
        <select
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          className={inputClass}
          aria-label="Food budget"
        >
          <option value="500">Under ৳500</option>
          <option value="1000">Under ৳1,000</option>
          <option value="2000">Under ৳2,000</option>
          <option value="5000">Under ৳5,000</option>
        </select>
      </SearchField>

      <button
        type="submit"
        className="flex min-h-14 items-center justify-center gap-2 rounded-[19px] bg-gradient-to-r from-[#e39a22] to-[#f5b73e] px-7 font-semibold text-[#16372e] shadow-[0_12px_28px_rgba(227,154,34,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(227,154,34,0.38)] focus:outline-none focus:ring-2 focus:ring-[#f2b23b] focus:ring-offset-2"
      >
        <Search size={19} />
        Search
      </button>
    </motion.form>
  );
}

function SearchField({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-14 items-center gap-3 rounded-[19px] border border-[#dce7e2] bg-white/[0.76] px-4 transition focus-within:border-[#d99a2f] focus-within:shadow-[0_0_0_3px_rgba(217,154,47,0.11)]">
      <span className="shrink-0 text-[#0a7555]">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.11em] text-[#72827d]">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}