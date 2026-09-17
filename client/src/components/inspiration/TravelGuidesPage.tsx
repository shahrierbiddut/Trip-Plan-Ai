"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Backpack, Bookmark, Check, CheckCheck, Clock3, Compass, Heart, Search, Sparkles, Users, Wallet, X } from "lucide-react";
import { travelGuides, type TravelGuide } from "@/data/travelGuides";

const filters = ["All guides", "Getting there", "Budget", "Family & solo", "Seasonal"];
const heroFilters = ["First trip", "Budget travel", "Family & solo", "Hills", "Beaches", "Weekend"];
const needs = [
  { title: "First-time traveler", text: "A little help to get started.", filter: "First trip", icon: Backpack },
  { title: "Family getaway", text: "Good times for every generation.", filter: "Family & solo", icon: Users },
  { title: "Travel on a budget", text: "More experiences, less spending.", filter: "Budget", icon: Wallet },
  { title: "A weekend escape", text: "Short breaks. Lasting memories.", filter: "Weekend", icon: Compass },
];
const essentials = ["Booking confirmed", "Documents packed", "Return journey planned", "Weather & local guidance checked"];
const extraEssentials = ["Offline directions saved", "Shared my plan with someone", "Personal essentials packed", "Budget buffer set aside"];
const storageKey = "tripplan-travel-guides-v1";
const storageEvent = "tripplan-guides-change";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(storageEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(storageEvent, callback); };
};
const readStorage = () => { try { return localStorage.getItem(storageKey) ?? "{}"; } catch { return "{}"; } };
const shell = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20";
const heading = "font-serif text-[28px] leading-tight tracking-[-0.035em] text-[#17211D] sm:text-[34px] lg:text-[38px]";
const amberButton = "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#E39A28] px-6 py-3.5 text-sm font-semibold text-[#17332A] shadow-[0_6px_18px_rgba(217,134,31,0.16)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087F5B] motion-safe:hover:-translate-y-0.5";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={false} whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [18, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Photo({ src, alt, className = "", priority = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.045] ${className}`} />;
}

export default function TravelGuidesPage() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All guides");
  const [savedOnly, setSavedOnly] = useState(false);
  const [limit, setLimit] = useState(6);
  const stored = useSyncExternalStore(subscribe, readStorage, () => "{}");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const parsed = useMemo((): { saved: string[]; checked: string[] } => {
    try {
      const raw = JSON.parse(stored);
      return {
        saved: Array.isArray(raw?.saved) ? raw.saved.filter((id: unknown) => typeof id === "string" && travelGuides.some(g => g.id === id)) : [],
        checked: Array.isArray(raw?.checked) ? raw.checked.filter((item: unknown) => typeof item === "string" && [...essentials, ...extraEssentials].includes(item)) : [],
      };
    } catch { return { saved: [], checked: [] }; }
  }, [stored]);
  const [fallback, setFallback] = useState<{ saved: string[]; checked: string[] } | null>(null);
  const { saved, checked } = fallback ?? parsed;
  const [storageWarning, setStorageWarning] = useState(false);
  const [expandedChecklist, setExpandedChecklist] = useState(false);
  const [activeGuide, setActiveGuide] = useState<TravelGuide | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const results = useRef<HTMLElement>(null);
  const extraChecklist = useRef<HTMLInputElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const persist = (value: { saved: string[]; checked: string[] }) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
      window.dispatchEvent(new Event(storageEvent));
      setFallback(null);
    } catch { setFallback(value); setStorageWarning(true); }
  };

  useEffect(() => {
    if (!activeGuide) return;
    const node = dialog.current;
    node?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = oldOverflow;
      lastTrigger.current?.focus();
    };
  }, [activeGuide]);

  useEffect(() => { if (expandedChecklist) extraChecklist.current?.focus({ preventScroll: true }); }, [expandedChecklist]);

  const scrollToGuides = () => results.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  const chooseFilter = (value: string, scroll = false) => {
    setFilter(value); setLimit(6);
    if (scroll) { setQuery(""); setSavedOnly(false); scrollToGuides(); }
  };
  const openGuide = (guide: TravelGuide) => { lastTrigger.current = document.activeElement as HTMLElement; setActiveGuide(guide); };
  const toggleSaved = (id: string) => persist({ saved: saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id], checked });
  const toggleChecked = (item: string) => persist({ saved, checked: checked.includes(item) ? checked.filter(value => value !== item) : [...checked, item] });
  const matching = travelGuides.filter(guide => {
    const text = `${guide.title} ${guide.description} ${guide.category} ${guide.tags.join(" ")}`.toLowerCase();
    return (!query.trim() || text.includes(query.trim().toLowerCase())) && (filter === "All guides" || guide.category === filter || guide.tags.includes(filter)) && (!savedOnly || saved.includes(guide.id));
  });
  const featured = travelGuides[0];
  const progress = Math.round(checked.length / (essentials.length + extraEssentials.length) * 100);

  return (
    <div className="overflow-x-clip bg-[#F7F7F2] text-[#17211D] selection:bg-[#F4B942]/35">
      <section aria-labelledby="guides-heading" className="relative isolate overflow-hidden rounded-b-[26px] bg-[#071A16]">
        <motion.div className="absolute inset-0 -z-20" initial={false} animate={reduced ? undefined : { scale: [1, 1.035, 1] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}>
          <Photo src="/assets/Sajek/cover-1.jpg" alt="Green hills and mountain views in Sajek" priority sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031C15]/90 via-[#071A16]/65 to-[#071A16]/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071A16]/35 to-transparent" />
        <div className={`${shell} relative pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44`}>
          <Reveal className="max-w-[790px]">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85"><span className="h-px w-7 bg-[#F4B942]" /> Inspiration / Travel guides</p>
            <h1 id="guides-heading" className="font-serif text-[43px] leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">Know more.<br className="sm:hidden" /> <span className="italic text-[#FFD078]">Travel better.</span></h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/80 sm:text-base">Practical guides, thoughtful tips and a little local inspiration for your next Bangladesh adventure.</p>
            <form role="search" onSubmit={event => { event.preventDefault(); setLimit(6); scrollToGuides(); }} className="mt-8 flex max-w-[660px] items-center gap-2 rounded-2xl border border-white/45 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl">
              <Search size={19} className="ml-3 shrink-0 text-[#507067]" aria-hidden="true" />
              <label className="sr-only" htmlFor="guide-search">Search travel guides</label>
              <input id="guide-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(6); }} placeholder="What do you need help with?" className="h-12 min-w-0 flex-1 bg-transparent text-[13px] text-[#17332A] outline-none placeholder:text-[#6F817B] sm:text-sm" />
              <button className={`${amberButton} !px-4 !py-3.5 sm:!px-7`} type="submit">Search</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">{heroFilters.map(item => <button key={item} onClick={() => chooseFilter(item, true)} className="rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-sm transition hover:border-[#FFD078] hover:bg-[#FFD078]/15 focus-visible:outline-2 focus-visible:outline-[#FFD078]">{item === "Family & solo" ? "Family & solo" : item}</button>)}</div>
          </Reveal>
          <div className="absolute bottom-7 right-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/75 lg:flex"><span className="h-px w-10 bg-white/45" /> A little closer to Bangladesh <ArrowDown size={14} /></div>
        </div>
      </section>

      <div className={`${shell} py-12 sm:py-16`}>
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><h2 className={heading}>What kind of trip are you planning?</h2><p className="text-xs text-[#66736D]">Find a guide that feels like you.</p></div>
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">{needs.map(({ title, text, filter: value, icon: Icon }) => <button key={title} onClick={() => chooseFilter(value, true)} className="group flex items-center gap-3 rounded-2xl border border-[#DCE6E1] bg-white/75 p-4 text-left transition duration-300 hover:border-[#087F5B]/40 hover:bg-white hover:shadow-md motion-safe:hover:-translate-y-1"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#087F5B] to-[#064A39] text-white"><Icon size={22} strokeWidth={1.5} /></span><span className="min-w-0 flex-1"><span className="block font-serif text-[16px] font-semibold">{title}</span><span className="mt-1 block text-[11px] leading-5 text-[#66736D]">{text}</span></span><ArrowRight size={15} className="shrink-0 text-[#087F5B] transition-transform motion-safe:group-hover:translate-x-1" /></button>)}</div>
        </Reveal>

        <section aria-labelledby="featured-heading" className="mt-14 sm:mt-20">
          <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087F5B]">The editor’s bookshelf</p><h2 id="featured-heading" className={heading}>A little guidance. A better journey.</h2></div><p className="max-w-xs text-xs leading-5 text-[#66736D]">Small details that make a meaningful difference.</p></Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.08fr_1fr]">
            <Reveal><button onClick={() => openGuide(featured)} className="group relative flex min-h-[340px] w-full items-end overflow-hidden rounded-[22px] bg-[#073D31] text-left sm:min-h-[390px] lg:h-full"><Photo src={featured.image} alt="Cox’s Bazar coastline" sizes="(max-width: 1024px) 100vw, 50vw" /><span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" /><span className="relative w-full p-6 sm:p-8"><span className="rounded-md bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#234137]">Essential guide</span><span className="mt-4 block max-w-md font-serif text-3xl leading-tight tracking-tight text-white sm:text-[36px]">{featured.title}</span><span className="mt-5 flex items-center justify-between text-xs text-white/90"><span className="flex items-center gap-1.5"><Clock3 size={13} /> {featured.minutes} min read</span><span className="flex items-center gap-2">Read guide <ArrowRight size={15} /></span></span></span></button></Reveal>
            <div className="grid gap-4">{travelGuides.slice(1, 3).map((guide, index) => <Reveal key={guide.id} delay={index * 0.07}><button onClick={() => openGuide(guide)} className="group grid h-full w-full grid-cols-[0.8fr_1fr] overflow-hidden rounded-[22px] border border-[#DCE6E1] bg-white/80 text-left transition hover:shadow-lg"><span className="relative min-h-[190px]"><Photo src={guide.image} alt={guide.title} /></span><span className="flex flex-col items-start justify-center p-4 sm:p-6"><span className="text-[9px] font-bold uppercase tracking-wider text-[#087F5B]">{guide.category === "Budget" ? "Group travel" : "Family travel"}</span><span className="mt-2 font-serif text-xl leading-tight tracking-tight sm:text-2xl">{guide.title}</span><span className="mt-2 hidden text-xs leading-5 text-[#66736D] sm:block">{guide.description}</span><span className="mt-5 flex w-full flex-wrap items-center justify-between gap-2 text-[10px]"><span className="flex items-center gap-1 text-[#66736D]"><Clock3 size={12} /> {guide.minutes} min read</span><span className="flex items-center gap-1 font-semibold text-[#087F5B]">Read guide <ArrowRight size={13} /></span></span></span></button></Reveal>)}</div>
          </div>
        </section>

        <section ref={results} id="all-guides" aria-labelledby="all-guides-heading" className="mt-14 scroll-mt-28 sm:mt-20">
          <Reveal><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 id="all-guides-heading" className={heading}>Good reads for your next getaway</h2><p className="mt-3 text-sm text-[#66736D]">Helpful guides for the questions that come before the journey.</p></div><button aria-pressed={savedOnly} onClick={() => { setSavedOnly(!savedOnly); setLimit(6); }} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${savedOnly ? "border-[#087F5B] bg-[#087F5B] text-white" : "border-[#DCE6E1] bg-white text-[#30483F] hover:border-[#087F5B]"}`}><Bookmark size={14} fill={savedOnly ? "currentColor" : "none"} /> Saved ({saved.length})</button></div>
          <div className="mt-6 flex flex-wrap gap-2">{[...filters, ...(!filters.includes(filter) ? [filter] : [])].map(item => <button key={item} aria-pressed={filter === item} onClick={() => chooseFilter(item)} className={`rounded-full border px-4 py-2 text-xs transition ${filter === item ? "border-[#087F5B] bg-[#087F5B] text-white" : "border-[#DCE6E1] bg-white/60 text-[#426257] hover:border-[#087F5B]/50"}`}>{item}</button>)}</div></Reveal>
          <p aria-live="polite" className="mb-4 mt-5 text-xs text-[#66736D]">{matching.length} {matching.length === 1 ? "guide" : "guides"}{query.trim() ? ` for “${query.trim()}”` : " to explore"}{savedOnly ? " · Saved on this device" : ""}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{matching.slice(0, limit).map((guide, index) => <Reveal key={guide.id} delay={(index % 3) * 0.045}><article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE6E1] bg-white/75 transition duration-300 hover:border-[#087F5B]/30 hover:shadow-[0_12px_30px_rgba(7,61,49,0.08)] motion-safe:hover:-translate-y-1"><button onClick={() => openGuide(guide)} aria-label={`Read ${guide.title}`} className="relative block aspect-[1.9] w-full overflow-hidden"><Photo src={guide.image} alt={guide.title} /><span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" /></button><div className="flex flex-1 flex-col p-5"><p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">{guide.category}</p><h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.025em]"><button onClick={() => openGuide(guide)} className="text-left transition hover:text-[#087F5B]">{guide.title}</button></h3><p className="mb-4 mt-2 text-xs leading-5 text-[#66736D]">{guide.description}</p><div className="mt-auto flex items-center justify-between"><span className="flex items-center gap-1.5 text-[11px] text-[#66736D]"><Clock3 size={13} /> {guide.minutes} min read</span><button disabled={!ready} aria-label={`${saved.includes(guide.id) ? "Unsave" : "Save"} ${guide.title}`} aria-pressed={saved.includes(guide.id)} onClick={() => toggleSaved(guide.id)} className="flex h-9 w-9 items-center justify-center rounded-full text-[#087F5B] transition hover:bg-[#EEF5F1] disabled:opacity-40"><Bookmark size={17} fill={saved.includes(guide.id) ? "currentColor" : "none"} /></button></div></div></article></Reveal>)}</div>
          {!matching.length && <div className="rounded-2xl border border-dashed border-[#B9CEC5] bg-white/60 px-6 py-14 text-center"><Search size={26} className="mx-auto mb-3 text-[#087F5B]" /><h3 className="font-serif text-2xl">{savedOnly && !saved.length ? "Your reading list starts here" : "No guides match just yet"}</h3><p className="mt-2 text-sm text-[#66736D]">{savedOnly && !saved.length ? "Tap the bookmark on a guide to keep it for later." : "Try another search or explore all our guides."}</p><button onClick={() => { setQuery(""); setFilter("All guides"); setSavedOnly(false); }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#087F5B]">Explore all guides <ArrowRight size={15} /></button></div>}
          {matching.length > limit && <div className="mt-8 text-center"><button onClick={() => setLimit(current => current + 6)} className="inline-flex items-center gap-3 rounded-xl bg-[#087F5B] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#065F46]">View more guides <ArrowDown size={16} /></button></div>}
          {storageWarning && <p role="status" className="mt-4 text-xs text-[#8A5A19]">Browser storage is unavailable. Your bookmarks and checklist will stay only while this page is open.</p>}
        </section>
      </div>

      <section aria-labelledby="checklist-heading" className={`${shell} pb-10`}>
        <Reveal className="relative isolate overflow-hidden rounded-[24px] bg-[#073D31] p-6 sm:p-10 lg:p-12">
          <div className="absolute inset-0 -z-20"><Photo src="/assets/Sajek/cover-2.jpg" alt="" sizes="100vw" /></div><div className="absolute inset-0 -z-10 bg-[#032C22]/90" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AFCDBE]">Before you go</p><h2 id="checklist-heading" className="mt-3 max-w-lg font-serif text-3xl leading-tight tracking-[-0.035em] text-white sm:text-[38px]">Packed your bags.<br />Checked the essentials?</h2><p className="mt-3 max-w-sm text-sm leading-6 text-white/65">A few small checks for a smoother journey. Keep your own progress as you prepare.</p><button onClick={() => setExpandedChecklist(!expandedChecklist)} aria-expanded={expandedChecklist} aria-controls="extra-checklist" className={`${amberButton} mt-6`}>{expandedChecklist ? "Show fewer items" : "Open my checklist"} <ArrowRight size={16} /></button><p className="mt-3 text-[10px] text-white/55">Saved on this device · {checked.length} of 8 complete</p></div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6"><div className="mb-4 flex items-center justify-between text-xs text-white/80"><span className="flex items-center gap-2"><CheckCheck size={16} /> Your travel essentials</span><span>{progress}%</span></div><div role="progressbar" aria-label="Checklist completion" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full origin-left rounded-full bg-[#FFD078] transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
          <div className="space-y-3">{essentials.map(item => <label key={item} className="flex cursor-pointer items-center gap-3 text-xs leading-5 text-white/90"><input type="checkbox" disabled={!ready} checked={checked.includes(item)} onChange={() => toggleChecked(item)} className="h-4 w-4 shrink-0 accent-[#F4B942]" /><span className={checked.includes(item) ? "text-white/50 line-through" : ""}>{item}</span></label>)}</div>
          <div id="extra-checklist" hidden={!expandedChecklist} className="mt-3 space-y-3">{extraEssentials.map((item, index) => <label key={item} className="flex cursor-pointer items-center gap-3 text-xs leading-5 text-white/90"><input ref={index === 0 ? extraChecklist : undefined} type="checkbox" disabled={!ready} checked={checked.includes(item)} onChange={() => toggleChecked(item)} className="h-4 w-4 shrink-0 accent-[#F4B942]" /><span className={checked.includes(item) ? "text-white/50 line-through" : ""}>{item}</span></label>)}</div>
          {progress === 100 && <p role="status" className="mt-5 flex items-center gap-2 text-xs text-[#FFD078]"><Check size={15} /> Checklist complete. Enjoy the journey!</p>}
          </div></div>
        </Reveal>
      </section>

      <section className={`${shell} pb-16 pt-7 text-center sm:pb-20`}><Reveal><span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFE8] text-[#087F5B]"><Sparkles size={20} /></span><h2 className={heading}>Ready to turn inspiration into a trip?</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#66736D]">Bring your destination, travel style and a little curiosity.<br className="hidden sm:block" /> Let’s put the journey together.</p><Link href="/plan-trip" className={`${amberButton} mt-6`}><Sparkles size={16} /> Plan My Trip <ArrowRight size={16} /></Link><p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[#84958B]">Made for the love of Bangladesh <Heart size={11} /></p></Reveal></section>

      <dialog ref={dialog} aria-labelledby="guide-dialog-title" onCancel={() => setActiveGuide(null)} onClose={() => setActiveGuide(null)} onClick={event => { if (event.target === event.currentTarget) setActiveGuide(null); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-3xl overflow-y-auto rounded-[24px] bg-[#FAFAF7] p-0 text-[#17211D] shadow-2xl backdrop:bg-[#031C15]/70 backdrop:backdrop-blur-sm">
        {activeGuide && <><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DCE6E1] bg-[#FAFAF7]/95 px-5 py-3 backdrop-blur-lg"><span className="flex items-center gap-2 text-xs font-semibold text-[#087F5B]"><Compass size={16} /> TripPlan reading room</span><button autoFocus aria-label="Close guide" onClick={() => setActiveGuide(null)} className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#E7EFE8]"><X size={20} /></button></div><div className="relative h-48 sm:h-64"><Photo src={activeGuide.image} alt={activeGuide.title} sizes="(max-width: 768px) 100vw, 768px" /></div><div className="p-6 sm:p-9"><p className="text-[10px] font-bold uppercase tracking-widest text-[#087F5B]">{activeGuide.category} · {activeGuide.minutes} min read</p><h2 id="guide-dialog-title" className={`${heading} mt-3`}>{activeGuide.title}</h2><p className="mt-3 text-sm leading-7 text-[#66736D]">{activeGuide.description}</p><div className="mt-7 space-y-7">{activeGuide.sections.map((section, index) => <section key={section.title}><h3 className="flex items-start gap-3 font-serif text-xl"><span className="mt-1 text-xs font-sans text-[#087F5B]">0{index + 1}</span>{section.title}</h3><p className="mt-2 text-sm leading-7 text-[#53685F]">{section.text}</p></section>)}</div><p className="mt-8 rounded-xl bg-[#EEF3ED] p-4 text-xs leading-6 text-[#53685F]">Planning notes, not live travel updates. Confirm current access, weather, prices and booking terms with official sources and your providers before departure.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/plan-trip" className={amberButton} onClick={() => setActiveGuide(null)}>Plan My Trip <ArrowRight size={15} /></Link><button disabled={!ready} aria-pressed={saved.includes(activeGuide.id)} onClick={() => toggleSaved(activeGuide.id)} className="inline-flex items-center gap-2 rounded-xl border border-[#C9DBD1] px-5 py-3 text-sm text-[#087F5B]"><Bookmark size={16} fill={saved.includes(activeGuide.id) ? "currentColor" : "none"} />{saved.includes(activeGuide.id) ? "Guide saved" : "Save for later"}</button></div></div></>}
      </dialog>
    </div>
  );
}
