"use client";

import { motion } from "framer-motion";
import {
  AirVent,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Coffee,
  GitCompareArrows,
  Heart,
  MapPin,
  Maximize2,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { formatBdt } from "@/data/services/hotels";
import type { Hotel, Room } from "@/types/hotel";

export function HotelDetailsPage({ hotel }: { hotel: Hotel }) {
  const [checkIn, setCheckIn] = useState("2026-09-20");
  const [checkOut, setCheckOut] = useState("2026-09-23");
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<Room>(hotel.rooms[0]);
  const [notice, setNotice] = useState("");

  const nights = useMemo(() => {
    const difference = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.ceil(difference / 86_400_000) || 1);
  }, [checkIn, checkOut]);

  const roomSubtotal = selectedRoom.pricePerNight * nights;
  const tax = Math.round(roomSubtotal * hotel.taxRate);
  const total = roomSubtotal + tax + hotel.serviceCharge - hotel.discount;

  const addToTrip = () => {
    const current = JSON.parse(localStorage.getItem("tripplan-trip-hotels") ?? "[]") as unknown[];
    const tripHotel = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests,
      estimatedCost: total,
      location: hotel.address,
    };
    localStorage.setItem("tripplan-trip-hotels", JSON.stringify([...current, tripHotel]));
    setNotice("Hotel added to your trip plan.");
    window.setTimeout(() => setNotice(""), 2800);
  };

  const shareHotel = async () => {
    if (navigator.share) {
      await navigator.share({ title: hotel.name, text: hotel.shortReview, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setNotice("Hotel link copied.");
    window.setTimeout(() => setNotice(""), 2200);
  };

  return (
    <main className="min-h-screen bg-[#f8f8f4] pb-24 pt-24 text-[#173b31]">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6c7e77]">
          <Link href="/hotels" className="hover:text-[#087653]">Hotels</Link>
          <ChevronRight size={14} />
          <Link href={`/hotels/search?destination=${encodeURIComponent(hotel.destination)}`} className="hover:text-[#087653]">{hotel.destination}</Link>
          <ChevronRight size={14} />
          <span className="text-[#173b31]">{hotel.name}</span>
        </nav>

        <header className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{hotel.name}</h1>
              <BadgeCheck size={23} className="text-[#087653]" aria-label="Verified hotel" />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[#657871]"><MapPin size={16} className="text-[#d68a18]" /> {hotel.address}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-xl bg-[#087653] px-3 py-2 text-lg font-bold text-white">{hotel.rating}</span>
              <p><strong className="block">{hotel.ratingLabel}</strong><span className="text-sm text-[#71817c]">{hotel.reviewCount.toLocaleString()} guest reviews</span></p>
              <span className="ml-2 rounded-full border border-[#d8e4df] bg-white px-3 py-1.5 text-xs font-semibold">{hotel.category}-star hotel</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={<Heart size={17} />} label="Save" />
            <ActionButton icon={<Share2 size={17} />} label="Share" onClick={shareHotel} />
            <Link href={`/hotels/compare?hotels=${hotel.slug}`} className="flex items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-4 py-3 text-sm font-semibold transition hover:border-[#087653]"><GitCompareArrows size={17} /> Compare</Link>
          </div>
        </header>

        <section className="mt-7 grid h-[520px] gap-3 overflow-hidden rounded-[30px] sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative overflow-hidden">
            <img src={hotel.gallery[0]} alt={`${hotel.name} exterior`} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-[#092f25]/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur">Hotel-provided photo</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {hotel.gallery.slice(1, 5).map((image, index) => (
              <div key={image} className="relative overflow-hidden">
                <img src={image} alt={`${hotel.name} gallery ${index + 2}`} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                {index === 3 && <button type="button" className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/92 px-4 py-2 text-sm font-semibold text-[#173b31] shadow-lg backdrop-blur"><Maximize2 size={16} /> View gallery</button>}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-7 grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 space-y-8">
            <nav className="flex gap-6 overflow-x-auto border-b border-[#dce6e2] text-sm font-semibold text-[#63766f]">
              {["Overview", "Rooms", "Amenities", "Location", "Reviews", "Policies"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="whitespace-nowrap border-b-2 border-transparent pb-4 transition hover:border-[#e39a24] hover:text-[#087653]">{item}</a>
              ))}
            </nav>

            <section id="overview" className="rounded-[28px] border border-[#ead7b6] bg-gradient-to-br from-[#fff9ed] to-white p-6 shadow-[0_15px_35px_rgba(89,61,16,0.06)] sm:p-8">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.13em] text-[#c77d15]"><Sparkles size={17} /> Why this hotel matches your trip</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold">A strong match for a comfortable {hotel.destination} stay.</h2>
              <p className="mt-3 leading-7 text-[#5f716b]">This hotel combines {hotel.amenities.slice(0, 3).join(", ")} and quick access to {hotel.nearestAttraction}. Its strongest review scores are location, cleanliness and family experience.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p className="flex gap-2 rounded-2xl bg-[#eaf6f1] p-4 text-sm text-[#245847]"><Check size={18} className="shrink-0 text-[#087653]" /> Guests consistently mention {hotel.guestsLiked.slice(0, 2).join(" and ").toLowerCase()}.</p>
                <p className="flex gap-2 rounded-2xl bg-[#fff3e7] p-4 text-sm text-[#785023]"><CircleAlert size={18} className="shrink-0 text-[#d88614]" /> Consider that {hotel.commonComplaints[0].toLowerCase()}.</p>
              </div>
            </section>

            <section id="amenities">
              <SectionTitle title="Popular amenities" subtitle="Facilities most useful for this trip." />
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {hotel.amenities.map((amenity, index) => {
                  const Icon = [Wifi, Coffee, AirVent, ShieldCheck, MapPin, BedDouble][index % 6];
                  return <div key={amenity} className="flex items-center gap-3 rounded-2xl border border-[#dce7e2] bg-white p-4 text-sm font-semibold"><span className="rounded-xl bg-[#eaf6f1] p-2 text-[#087653]"><Icon size={18} /></span>{amenity}</div>;
                })}
              </div>
            </section>

            <section id="rooms">
              <SectionTitle title="Choose your room" subtitle={`Availability shown for ${nights} night${nights > 1 ? "s" : ""}.`} />
              <div className="mt-5 space-y-4">
                {hotel.rooms.map((room) => (
                  <article key={room.id} className={`overflow-hidden rounded-[25px] border bg-white transition sm:grid sm:grid-cols-[220px_1fr] ${selectedRoom.id === room.id ? "border-[#e3a039] shadow-[0_16px_38px_rgba(208,140,30,0.12)]" : "border-[#dce7e2]"}`}>
                    <img src={room.image} alt={room.name} className="h-52 w-full object-cover sm:h-full" />
                    <div className="p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-serif text-2xl font-semibold">{room.name}</h3>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#61756e]">
                            <span className="flex items-center gap-1"><BedDouble size={14} /> {room.bedType}</span>
                            <span className="flex items-center gap-1"><UsersRound size={14} /> Up to {room.maxGuests}</span>
                            <span className="flex items-center gap-1"><Maximize2 size={14} /> {room.size}</span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {[room.view, room.breakfastIncluded ? "Breakfast included" : "Room only", room.refundable ? "Free cancellation" : "Non-refundable", `${room.availableRooms} rooms left`].map((item) => <span key={item} className="rounded-full bg-[#f0f6f3] px-3 py-1 text-xs font-medium text-[#3b6154]">{item}</span>)}
                          </div>
                        </div>
                        <div className="shrink-0 text-left md:text-right">
                          <p className="font-serif text-2xl font-bold">{formatBdt(room.pricePerNight)}</p>
                          <p className="text-xs text-[#75867f]">per night · {formatBdt(room.pricePerNight * nights)} total</p>
                          <button type="button" onClick={() => setSelectedRoom(room)} className={`mt-3 rounded-xl px-5 py-2.5 text-sm font-bold ${selectedRoom.id === room.id ? "bg-[#087653] text-white" : "bg-[#eda52e] text-[#15382e]"}`}>{selectedRoom.id === room.id ? "Selected" : "Select room"}</button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="location">
              <SectionTitle title="Nearby places" subtitle="Real-world context for getting around your destination." />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {hotel.nearbyPlaces.map((place) => (
                  <div key={place.name} className="flex items-center justify-between rounded-2xl border border-[#dce7e2] bg-white p-4">
                    <p><strong className="block">{place.name}</strong><span className="text-sm text-[#6d7f78]">{place.distance}</span></p>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#087653]"><Clock3 size={14} /> {place.travelTime}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="reviews">
              <SectionTitle title={`Guest reviews (${hotel.reviewCount.toLocaleString()})`} subtitle="Category scores and an easy-to-scan review summary." />
              <div className="mt-5 grid gap-5 rounded-[28px] border border-[#dce7e2] bg-white p-6 lg:grid-cols-[.8fr_1fr_1fr]">
                <div>
                  <div className="inline-flex rounded-2xl bg-[#087653] px-4 py-3 font-serif text-4xl font-bold text-white">{hotel.rating}</div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold">{hotel.ratingLabel}</h3>
                  <p className="mt-1 text-sm text-[#6f817a]">Based on verified feedback</p>
                  <div className="mt-3 flex text-[#e59b24]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div>
                </div>
                <ReviewList hotel={hotel} />
                <div className="space-y-5">
                  <ReviewSummary title="Guests liked" items={hotel.guestsLiked} positive />
                  <ReviewSummary title="Common concerns" items={hotel.commonComplaints} />
                </div>
              </div>
            </section>

            <section id="policies">
              <SectionTitle title="Hotel policies" subtitle="Hotel-provided information—confirm special requests before arrival." />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {hotel.policies.map((policy) => <div key={policy.label} className="rounded-2xl border border-[#dce7e2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#b16d0f]">{policy.label}</p><p className="mt-1 text-sm text-[#425f55]">{policy.value}</p></div>)}
              </div>
            </section>
          </div>

          <aside>
            <div className="sticky top-24 rounded-[30px] border border-[#e4d9c5] bg-white/92 p-6 shadow-[0_24px_70px_rgba(17,59,46,0.15)] backdrop-blur-xl">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#087653]"><ShieldCheck size={16} /> Transparent stay estimate</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold">Plan your stay</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <BookingInput label="Check-in"><input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" /></BookingInput>
                <BookingInput label="Check-out"><input type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none" /></BookingInput>
              </div>
              <label className="mt-3 flex items-center gap-3 rounded-2xl border border-[#dce7e2] p-4"><UsersRound size={18} className="text-[#087653]" /><span className="flex-1 text-xs font-bold uppercase tracking-[0.08em] text-[#6d7f78]">Guests</span><select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="bg-transparent text-sm font-semibold outline-none">{[1, 2, 3, 4, 5, 6].map((value) => <option key={value}>{value}</option>)}</select></label>
              <div className="mt-5 rounded-2xl bg-[#f2f7f5] p-4 text-sm">
                <p className="font-semibold">{selectedRoom.name}</p>
                <p className="mt-1 text-[#6b7c75]">{selectedRoom.bedType} · Up to {selectedRoom.maxGuests} guests</p>
              </div>
              <div className="mt-5 space-y-3 border-b border-[#e2eae7] pb-5 text-sm">
                <PriceRow label={`${formatBdt(selectedRoom.pricePerNight)} × ${nights} nights`} value={roomSubtotal} />
                <PriceRow label="Tax and charges" value={tax} />
                <PriceRow label="Service charge" value={hotel.serviceCharge} />
                {hotel.discount > 0 && <PriceRow label="Current discount" value={-hotel.discount} discount />}
              </div>
              <div className="flex items-end justify-between py-5"><p><span className="block text-sm font-semibold">Total stay price</span><span className="text-xs text-[#71827c]">Includes listed charges</span></p><strong className="font-serif text-3xl">{formatBdt(total)}</strong></div>
              <button type="button" className="w-full rounded-2xl bg-gradient-to-r from-[#e59a24] to-[#f4b53e] py-4 font-bold text-[#14372d] shadow-[0_14px_30px_rgba(224,149,31,0.28)] transition hover:-translate-y-0.5">Check availability</button>
              <button type="button" onClick={addToTrip} className="mt-3 w-full rounded-2xl border border-[#087653] py-4 font-bold text-[#087653] transition hover:bg-[#eaf6f1]">Add to trip</button>
              <p className="mt-4 text-center text-xs leading-5 text-[#72837d]">No payment is taken. This saves the hotel and estimated cost to the current browser.</p>
            </div>
          </aside>
        </div>
      </div>

      {notice && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-[#073e30] px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</motion.div>}
    </main>
  );
}

function ActionButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className="flex items-center gap-2 rounded-xl border border-[#d7e3de] bg-white px-4 py-3 text-sm font-semibold transition hover:border-[#087653]">{icon}{label}</button>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <div><h2 className="font-serif text-3xl font-semibold tracking-[-0.025em]">{title}</h2><p className="mt-2 text-[#6b7d76]">{subtitle}</p></div>;
}

function BookingInput({ label, children }: { label: string; children: ReactNode }) {
  return <label className="rounded-2xl border border-[#dce7e2] p-3"><span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6d7e78]"><CalendarDays size={12} /> {label}</span>{children}</label>;
}

function PriceRow({ label, value, discount = false }: { label: string; value: number; discount?: boolean }) {
  return <div className={`flex justify-between ${discount ? "font-semibold text-[#087653]" : "text-[#526b62]"}`}><span>{label}</span><span>{value < 0 ? "−" : ""}{formatBdt(Math.abs(value))}</span></div>;
}

function ReviewList({ hotel }: { hotel: Hotel }) {
  const items = Object.entries(hotel.reviewBreakdown).slice(0, 7);
  return <div className="space-y-3">{items.map(([label, score]) => <div key={label}><div className="mb-1 flex justify-between text-xs"><span className="capitalize">{label}</span><strong>{score}</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e5ece9]"><div className="h-full rounded-full bg-[#087653]" style={{ width: `${score * 10}%` }} /></div></div>)}</div>;
}

function ReviewSummary({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <div><h3 className="font-serif text-lg font-semibold">{title}</h3><ul className="mt-2 space-y-2 text-xs text-[#5f736b]">{items.slice(0, 3).map((item) => <li key={item} className="flex gap-2"><span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${positive ? "bg-[#dff2ea] text-[#087653]" : "bg-[#fff0df] text-[#cf7610]"}`}>{positive ? <Check size={10} /> : <CircleAlert size={10} />}</span>{item}</li>)}</ul></div>;
}