"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  CalendarDays,
  MapPin,
  Search,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { TravellerType } from "@/types/hotel";

type HotelSearchBarProps = {
  compact?: boolean;
  defaults?: Partial<{
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
    travellerType: TravellerType;
    budget: string;
  }>;
};

const travellerTypes: TravellerType[] = [
  "Solo traveller",
  "Couple",
  "Family",
  "Friends group",
  "Business traveller",
];

const inputClass =
  "w-full bg-transparent text-sm font-medium text-[#173b31] outline-none placeholder:text-[#6f817b]";

export function HotelSearchBar({ compact = false, defaults }: HotelSearchBarProps) {
  const router = useRouter();
  const [destination, setDestination] = useState(defaults?.destination ?? "Cox’s Bazar");
  const [checkIn, setCheckIn] = useState(defaults?.checkIn ?? "2026-09-20");
  const [checkOut, setCheckOut] = useState(defaults?.checkOut ?? "2026-09-23");
  const [guests, setGuests] = useState(defaults?.guests ?? "2");
  const [rooms, setRooms] = useState(defaults?.rooms ?? "1");
  const [travellerType, setTravellerType] = useState<TravellerType>(
    defaults?.travellerType ?? "Family",
  );
  const [budget, setBudget] = useState(defaults?.budget ?? "10000");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
      travellerType,
      budget,
    });

    router.push(`/hotels/search?${params.toString()}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className={`grid gap-2 rounded-[26px] border border-white/50 bg-white/90 p-2.5 shadow-[0_22px_70px_rgba(4,39,29,0.22)] backdrop-blur-2xl ${
        compact
          ? "md:grid-cols-[1.1fr_1fr_1fr_auto]"
          : "md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_1fr_1fr_auto]"
      }`}
    >
      <SearchField icon={<MapPin size={18} />} label="Destination">
        <input
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className={inputClass}
          aria-label="Destination"
          placeholder="Where are you going?"
        />
      </SearchField>

      <SearchField icon={<CalendarDays size={18} />} label="Check-in">
        <input
          type="date"
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          className={inputClass}
          aria-label="Check-in date"
        />
      </SearchField>

      <SearchField icon={<CalendarDays size={18} />} label="Check-out">
        <input
          type="date"
          min={checkIn}
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          className={inputClass}
          aria-label="Check-out date"
        />
      </SearchField>

      <SearchField icon={<UsersRound size={18} />} label="Guests & rooms">
        <div className="flex items-center gap-1 text-sm font-medium text-[#173b31]">
          <select
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className="bg-transparent outline-none"
            aria-label="Number of guests"
          >
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <option key={value} value={value}>
                {value} guest{value > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <span className="text-[#9aaba5]">·</span>
          <select
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
            className="bg-transparent outline-none"
            aria-label="Number of rooms"
          >
            {[1, 2, 3, 4].map((value) => (
              <option key={value} value={value}>
                {value} room{value > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </SearchField>

      {!compact && (
        <SearchField icon={<UsersRound size={18} />} label="Traveller type">
          <select
            value={travellerType}
            onChange={(event) => setTravellerType(event.target.value as TravellerType)}
            className={inputClass}
            aria-label="Traveller type"
          >
            {travellerTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </SearchField>
      )}

      {!compact && (
        <SearchField icon={<Banknote size={18} />} label="Nightly budget">
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={inputClass}
            aria-label="Nightly budget"
          >
            <option value="2000">Under ৳2,000</option>
            <option value="5000">Under ৳5,000</option>
            <option value="10000">Under ৳10,000</option>
            <option value="20000">Under ৳20,000</option>
          </select>
        </SearchField>
      )}

      <button
        type="submit"
        className="flex min-h-14 items-center justify-center gap-2 rounded-[19px] bg-gradient-to-r from-[#e39a22] to-[#f5b73e] px-6 font-semibold text-[#16372e] shadow-[0_12px_28px_rgba(227,154,34,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(227,154,34,0.38)] focus:outline-none focus:ring-2 focus:ring-[#f2b23b] focus:ring-offset-2"
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
    <label className="flex min-h-14 items-center gap-3 rounded-[19px] border border-[#dce7e2] bg-white/75 px-4 transition focus-within:border-[#d99a2f] focus-within:shadow-[0_0_0_3px_rgba(217,154,47,0.11)]">
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