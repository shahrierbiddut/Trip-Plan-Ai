"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  BusFront,
  CalendarCheck2,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Coffee,
  HelpCircle,
  Hotel,
  Info,
  Luggage,
  ShieldCheck,
  Star,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react";

import type { TourPackageExperience as TourPackageExperienceData } from "@/types/tour-package";

type ExperienceProps = {
  destination: string;
  duration: string;
  price: number;
  experience: TourPackageExperienceData;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-BD").format(value);
}

export default function TourPackageExperience({ destination, duration, price, experience }: ExperienceProps) {
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const days = Math.max(1, Number.parseInt(duration, 10) || experience.dayTitles.length);
  const itinerary = Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    title: experience.dayTitles[index] ?? `Explore ${destination}`,
  }));
  const packageOptions = [
    ["Group sharing", "Shared room and transport", price],
    ["Solo traveller", "Group tour with room sharing", price + 1500],
    ["Couple comfort", "Private couple room", price + 3000],
    ["Family package", "Private family room", price + 5000],
  ] as const;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.09 } },
      }}
      className="relative mt-8 space-y-8"
    >
      <motion.section
        variants={{ hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
        className="relative overflow-hidden rounded-[34px] border border-white/80 bg-[linear-gradient(145deg,#ffffff_0%,#f4f1e9_100%)] p-4 shadow-[0_22px_70px_rgba(19,54,44,0.09)] sm:p-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#f2c15f]/20 blur-3xl" />
        <div className="relative px-2 pb-6 pt-2 sm:px-3 sm:pb-8">
          <Heading eyebrow="Photo story" title="See your stay, food and experiences" description="A visual look at the places and moments planned for this journey." />
        </div>
        <div className="relative grid gap-3 lg:grid-cols-[1.32fr_.68fr]">
          <motion.figure
            whileHover={{ scale: 0.992 }}
            transition={{ duration: 0.35 }}
            className="group relative h-[280px] overflow-hidden rounded-[26px] sm:h-[390px] lg:h-[520px]"
          >
            <Image src={experience.gallery[0].src} alt={experience.gallery[0].alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.045]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071f19]/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f6ca6d]">01 · Signature view</p><p className="mt-2 font-serif text-2xl sm:text-3xl">{experience.gallery[0].label}</p></div>
              <span className="hidden rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] backdrop-blur sm:block">{destination}</span>
            </figcaption>
          </motion.figure>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {experience.gallery.slice(1).map((photo, index) => (
              <motion.figure
                key={photo.src}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative h-[210px] overflow-hidden rounded-[22px] sm:h-[180px] lg:h-[164px]"
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 28vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f19]/75 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 p-4 text-sm font-semibold text-white"><span className="mr-2 text-[10px] text-[#f6ca6d]">0{index + 2}</span>{photo.label}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={{ hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
        className="relative overflow-hidden rounded-[34px] bg-[#0d3329] p-6 text-white shadow-[0_24px_70px_rgba(13,51,41,0.18)] sm:p-9"
      >
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#1e6b55]/35 blur-3xl" />
        <div className="relative">
        <Heading light eyebrow="Day-wise itinerary" title="A clear plan for every day" description="Choose a day to see departure, check-in, activities and meal information." />
        <div className="mt-8 grid gap-3 lg:grid-cols-[210px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {itinerary.map((day) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setOpenDay(day.day)}
              className={`min-w-[165px] rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 ${openDay === day.day ? "border-[#f2c15f] bg-[#f2c15f] text-[#17382f] shadow-[0_12px_28px_rgba(242,193,95,0.2)]" : "border-white/10 bg-white/[0.055] text-white hover:border-white/25 hover:bg-white/[0.09]"}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">Day {String(day.day).padStart(2, "0")}</span>
              <span className="mt-2 block text-sm font-semibold leading-5">{day.title}</span>
            </button>
          ))}
          </div>

          <div className="min-h-[350px] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:p-7">
            <AnimatePresence mode="wait">
              {itinerary.filter((day) => day.day === openDay).map((day) => {
                const index = day.day - 1;
                return (
                  <motion.div key={day.day} initial={{ opacity: 0, x: 24, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -18, filter: "blur(6px)" }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                      <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2c15f]">Your journey · Day {day.day}</p><h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{day.title}</h3></div>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Balanced pace</span>
                    </div>
                    <TimelineItem dark time={index === 0 ? "10:00 PM" : "07:30 AM"} title={index === 0 ? "Departure and transfer" : "Breakfast and day briefing"} text={index === 0 ? `Meet the coordinator and begin the journey to ${destination}.` : "Meet the group and review the day's route before leaving."} meal={index > 0 ? "Breakfast included" : undefined} />
                    <TimelineItem dark time="10:30 AM" title={experience.highlights[Math.min(index, experience.highlights.length - 1)]} text="Guided sightseeing with practical rest and photo stops." />
                    <TimelineItem dark time="06:30 PM" title={index === days - 1 ? "Return journey" : "Evening and hotel return"} text={index === days - 1 ? "Collect your luggage and begin the scheduled return journey." : "Return to the accommodation and enjoy the planned evening."} meal={index === days - 1 ? "Breakfast included" : "Selected meals included"} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </motion.section>

      <section className="relative overflow-hidden rounded-[34px] border border-[#eadfd2] bg-[linear-gradient(135deg,#fffaf3_0%,#f7ece7_100%)] p-6 shadow-[0_18px_55px_rgba(89,58,37,0.07)] sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[32px] border-[#eeb0a4]/20" />
        <div className="relative flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9d3e35] text-white shadow-[0_10px_25px_rgba(157,62,53,0.22)]"><X size={20} /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9d3e35]">Cost clarity</p><h2 className="mt-1 font-serif text-2xl font-semibold text-[#213a32] sm:text-3xl">What’s not included</h2></div></div>
        <div className="relative mt-7 grid gap-3 sm:grid-cols-2">{experience.excluded.map((item, index) => <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} key={item} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/65 p-4 text-sm leading-6 text-[#665b57] backdrop-blur"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9d3e35] text-white"><X size={11} /></span>{item}</motion.div>)}</div>
      </section>

      <section className="rounded-[34px] border border-[#dce6e0] bg-white p-6 shadow-[0_22px_65px_rgba(23,61,50,0.07)] sm:p-9">
        <Heading eyebrow="Package options" title="Choose the comfort level that fits" description="These prices help you compare. Final room and seat availability are confirmed after your request." />
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {packageOptions.map(([name, detail, optionPrice], index) => (
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }} key={name} className={`relative overflow-hidden rounded-[22px] border p-5 transition-shadow hover:shadow-[0_16px_35px_rgba(23,61,50,0.09)] ${index === 0 ? "border-[#1b5a48] bg-[linear-gradient(145deg,#e8f4ee,#f7fbf8)]" : "border-[#e0e7e3] bg-[#fbfcfa]"}`}>
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-[#1d3930]">{name}</h3><p className="mt-1 text-xs text-[#77827d]">{detail}</p></div>{index === 0 && <span className="rounded-full bg-[#173d32] px-2.5 py-1 text-[9px] font-bold uppercase text-white">Base</span>}</div>
              <p className="mt-4 text-xl font-bold text-[#173d32]">৳{formatPrice(optionPrice)}</p><p className="mt-1 text-[10px] text-[#87918d]">Starting price · availability applies</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-[#173d32] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><Heading light eyebrow="Upcoming batches" title="Pick a departure that works" description="Seats are reviewed when you submit the package request." /><span className="rounded-xl bg-white/10 px-3 py-2 text-xs"><b className="block">Pickup & drop</b><span className="text-white/55">{experience.pickup}</span></span></div>
        <div className="mt-7 grid gap-3 md:grid-cols-3">{experience.batches.map((batch) => <div key={batch.date} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"><div className="flex items-start justify-between gap-3"><CalendarCheck2 size={19} className="text-[#f2c15f]" /><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${batch.status === "Filling fast" ? "bg-[#f2c15f] text-[#17382f]" : "bg-white/10 text-white/70"}`}>{batch.status}</span></div><p className="mt-4 font-semibold">{batch.date}</p><p className="mt-1 text-xs text-white/50">{batch.seats}</p></div>)}</div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <DetailCard icon="hotel" eyebrow="Accommodation" title={experience.accommodation.name} subtitle={experience.accommodation.type} description={experience.accommodation.room} items={experience.accommodation.amenities} />
        <DetailCard icon="bus" eyebrow="Transport" title={experience.transport.name} subtitle={experience.transport.type} description="An equivalent vehicle may be used when operationally necessary." items={experience.transport.details} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6 sm:p-8"><Heading eyebrow="Packing checklist" title="Bring the essentials" description="Keep these items ready before departure." /><div className="mt-6 space-y-3">{experience.packing.map((item) => <GuideRow key={item} text={item} type="packing" />)}</div></div>
        <div className="rounded-[28px] bg-[#fff7e7] p-6 sm:p-8"><Heading eyebrow="Safety & health" title="Travel with confidence" description="Read these notes before requesting the package." /><div className="mt-6 space-y-3">{experience.safety.map((item) => <GuideRow key={item} text={item} type="safety" />)}</div></div>
      </section>

      <section className="rounded-[28px] bg-white p-6 sm:p-8">
        <Heading eyebrow="Cancellation policy" title="Know the refund timeline" description="Refunds exclude payment-channel charges and any non-refundable supplier cost." />
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#e0e8e4]">{experience.policies.map(([period, refund], index) => <div key={period} className={`grid gap-1 px-4 py-4 text-sm sm:grid-cols-[1fr_auto] ${index !== experience.policies.length - 1 ? "border-b border-[#e5ebe8]" : ""}`}><span className="font-medium text-[#31483f]">{period}</span><span className="text-xs font-semibold text-[#1b5a48]">{refund}</span></div>)}</div>
        <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#7c8782]"><Info size={14} className="mt-0.5 shrink-0" />If the operator cancels a batch, you can choose the announced alternative date or applicable refund option.</p>
      </section>

      <section className="rounded-[34px] border border-[#dce6e0] bg-white p-6 shadow-[0_22px_65px_rgba(23,61,50,0.07)] sm:p-9">
        <Heading eyebrow="Frequently asked questions" title="Quick answers before you book" description="Add any other question to the special-request field." />
        <div className="mt-7 space-y-3">{experience.faqs.map(([question, answer], index) => <div key={question} className={`overflow-hidden rounded-2xl border transition-colors ${openFaq === index ? "border-[#c9a255] bg-[#fffaf0]" : "border-[#e0e8e4] bg-[#fbfcfa]"}`}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"><HelpCircle size={17} className="shrink-0 text-[#b37a20]" /><span className="flex-1 text-sm font-semibold text-[#263f36]">{question}</span><ChevronDown size={17} className={`shrink-0 text-[#718078] transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p className="border-t border-[#e7dcc4] px-4 py-4 text-xs leading-6 text-[#718078] sm:px-5 sm:pl-12">{answer}</p></motion.div>}</AnimatePresence></div>)}</div>
      </section>
    </motion.div>
  );
}

function Heading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description: string; light?: boolean }) {
  return <div><div className="flex items-center gap-3"><span className={`h-px w-8 ${light ? "bg-[#f2c15f]" : "bg-[#c58a2c]"}`} /><p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${light ? "text-[#f2c15f]" : "text-[#9a6f2f]"}`}>{eyebrow}</p></div><h2 className={`mt-3 max-w-2xl font-serif text-[28px] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[36px] ${light ? "text-white" : "text-[#163a30]"}`}>{title}</h2><p className={`mt-4 max-w-2xl text-[13px] leading-6 sm:text-sm sm:leading-7 ${light ? "text-white/55" : "text-[#6f7c76]"}`}>{description}</p></div>;
}

function TimelineItem({ time, title, text, meal, dark = false }: { time: string; title: string; text: string; meal?: string; dark?: boolean }) {
  return <div className={`relative ml-2 border-l border-dashed pb-6 pl-6 last:pb-0 ${dark ? "border-white/20" : "border-[#b9ccc4]"}`}><span className={`absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${dark ? "border-[#214b40] bg-[#f2c15f] ring-2 ring-[#f2c15f]/20" : "border-white bg-[#e3a93f] ring-2 ring-[#e3a93f]/25"}`} /><div className="flex flex-col gap-1 sm:flex-row sm:gap-5"><span className={`inline-flex w-24 shrink-0 items-center gap-1.5 text-xs font-bold ${dark ? "text-[#f2c15f]" : "text-[#1b5a48]"}`}><Clock3 size={13} />{time}</span><div><h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-[#213a32]"}`}>{title}</h3><p className={`mt-1 text-xs leading-5 ${dark ? "text-white/55" : "text-[#75817c]"}`}>{text}</p>{meal && <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${dark ? "bg-[#f2c15f]/15 text-[#f8d791]" : "bg-[#fff4d8] text-[#926316]"}`}><UtensilsCrossed size={11} />{meal}</p>}</div></div></div>;
}

function DetailCard({ icon, eyebrow, title, subtitle, description, items }: { icon: "hotel" | "bus"; eyebrow: string; title: string; subtitle: string; description: string; items: string[] }) {
  const Icon = icon === "hotel" ? Hotel : BusFront;
  return <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className={`relative overflow-hidden rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(23,61,50,0.07)] sm:p-8 ${icon === "hotel" ? "border-[#d9e7df] bg-[linear-gradient(145deg,#ffffff,#edf6f1)]" : "border-[#eadfcb] bg-[linear-gradient(145deg,#ffffff,#fff8e9)]"}`}><div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[22px] border-[#f2c15f]/10" /><span className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${icon === "hotel" ? "bg-[#173d32] text-white" : "bg-[#f2c15f] text-[#17382f]"}`}><Icon size={22} /></span><p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a6f2f]">{eyebrow}</p><h2 className="relative mt-2 font-serif text-[24px] font-medium leading-tight text-[#173d32]">{title}</h2><p className="relative mt-2 text-xs font-semibold text-[#1b5a48]">{subtitle}</p><p className="relative mt-3 text-xs leading-6 text-[#77827d]">{description}</p><div className="relative mt-5 grid gap-2 sm:grid-cols-2">{items.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/65 px-3 py-2.5 text-[11px] font-medium text-[#52615b] backdrop-blur">{item === "Wi-Fi" ? <Wifi size={13} /> : item.toLowerCase().includes("breakfast") ? <Coffee size={13} /> : <Check size={13} className="text-[#1b5a48]" />}{item}</span>)}</div></motion.div>;
}

function GuideRow({ text, type }: { text: string; type: "packing" | "safety" }) {
  return <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3.5 text-xs leading-5 text-[#52615b]">{type === "packing" ? <Luggage size={16} className="mt-0.5 shrink-0 text-[#1b5a48]" /> : <CircleAlert size={16} className="mt-0.5 shrink-0 text-[#b2761d]" />}{text}</div>;
}

export function PackageTrustPills({ experience, duration }: { experience: TourPackageExperienceData; duration: string }) {
  return <div className="flex flex-wrap gap-2.5 text-xs font-semibold text-white"><span className="rounded-full bg-[#f2c15f] px-3 py-1.5 text-[#17382f]">{experience.category}</span><span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 backdrop-blur-md"><Star size={13} className="fill-[#f2c15f] text-[#f2c15f]" />{experience.rating} ({experience.reviews}+ reviews)</span><span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 backdrop-blur-md"><ShieldCheck size={13} />Verified package</span><span className="rounded-full border border-white/25 bg-black/20 px-3 py-1.5 backdrop-blur-md">{duration}</span></div>;
}
