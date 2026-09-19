"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Bookmark, Check } from "lucide-react";
import { publishedStories, type PublishedStory } from "@/data/researchedTravelStories";

export const storyShell = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20";
export const storyHeading = "font-serif text-[30px] leading-[1.15] tracking-[-0.035em] text-[#17211D] sm:text-[38px]";
export const storyButton = "inline-flex items-center justify-center gap-2 rounded-full bg-[#F4B942] px-6 py-3.5 text-sm font-semibold text-[#17332A] transition hover:bg-[#FFD078] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087F5B] motion-safe:hover:-translate-y-0.5";

export function StoryReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={false} whileInView={reduced ? undefined : { opacity: [0.5, 1], y: [20, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

export function StoryArtwork({ story, priority = false }: { story: PublishedStory; priority?: boolean }) {
  if (story.image) return <Image src={story.image} alt={story.imageNote} fill priority={priority} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" />;
  const isWarm = story.motif === "heritage";
  return <div className={`absolute inset-0 overflow-hidden ${isWarm ? "bg-[#EBDDC5] text-[#755034]" : "bg-[#DDE9DF] text-[#286B58]"}`}>
    <svg viewBox="0 0 600 360" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" role="img" aria-label={story.imageNote}>
      <circle cx="470" cy="85" r="52" fill={isWarm ? "#D39851" : "#F1C46D"} opacity=".75" />
      <path d="M0 230 Q100 170 230 223 T600 185 V360 H0Z" fill="currentColor" opacity=".07" />
      <path d="M0 270 Q180 210 360 260 T600 225" fill="none" stroke="currentColor" opacity=".2" strokeWidth="2" />
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {story.motif === "train" ? <>
          <path d="M90 175 H500 M120 175 V285 M470 175 V285 M75 173 L130 138 H460 L510 173" />
          <path d="M223 166 Q223 150 242 150 H360 Q380 150 380 170 V274 H223Z M228 215 H375 M245 270 L200 345 M355 270 L400 345 M211 323 H390 M225 298 H376" />
          <rect x="242" y="170" width="46" height="32" rx="3" /><rect x="309" y="170" width="48" height="32" rx="3" />
          <circle cx="249" cy="243" r="8" /><circle cx="353" cy="243" r="8" />
          <path d="M135 184 H185 V207 H135Z M410 184 H454 V207 H410Z M285 129 Q300 100 281 77" opacity=".5" />
        </> : story.motif === "heritage" ? <>
          <path d="M130 282 H475 M150 280 V172 H455 V280 M138 169 L302 112 L468 169Z M197 280 V226 Q226 184 255 226 V280 M282 280 V218 Q309 178 337 218 V280 M363 280 V226 Q392 184 421 226 V280 M170 183 H439 M170 197 H439" />
          <path d="M298 113 V89 M179 170 V143 M425 171 V143 M113 296 H493 M99 311 H508" />
        </> : story.motif === "waterfall" ? <>
          <path d="M15 300 L120 130 L190 161 L254 95 L335 130 L401 108 L583 300 M252 97 L265 166 L255 222 L275 285 M282 108 L298 168 L290 215 L304 286 M315 121 L328 164 L326 219 L342 286" />
          <path d="M158 309 Q262 270 424 308 M179 323 Q280 300 399 322 M90 211 L108 234 L71 269 M408 142 L439 195 L413 220 M204 167 L167 211 L196 244" opacity=".55" />
        </> : <>
          <path d="M96 243 Q275 270 442 230 Q402 302 169 282Z M190 258 Q184 203 237 191 Q302 184 320 260 M197 255 V218 M219 257 V205 M244 259 V201 M271 260 V207 M296 260 V224 M365 182 L393 295" />
          <path d="M60 313 Q140 297 213 314 T374 314 T540 305 M92 335 Q164 323 259 337 T489 332 M95 86 V205 M95 90 Q44 44 26 108 M95 90 Q144 35 160 89 M95 90 Q51 95 45 140" opacity=".55" />
        </>}
      </g>
      <text x="38" y="45" fontFamily="Georgia,serif" fontSize="16" letterSpacing="4" fill="currentColor" opacity=".6">BANGLADESH FIELD NOTES</text>
    </svg>
  </div>;
}

const savedKey = "tripplan-published-stories-v1";
const eventName = "tripplan-published-stories-changed";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(eventName, callback); };
};
const getSnapshot = () => { try { return localStorage.getItem(savedKey) ?? "[]"; } catch { return "[]"; } };

export function useSavedStories() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const [fallback, setFallback] = useState<string[] | null>(null);
  const [warning, setWarning] = useState("");
  const stored = useMemo(() => {
    try { const value = JSON.parse(raw); return Array.isArray(value) ? value.filter((slug): slug is string => typeof slug === "string" && publishedStories.some(story => story.slug === slug)) : []; }
    catch { return []; }
  }, [raw]);
  const saved = fallback ?? stored;
  const toggle = (slug: string) => {
    const next = saved.includes(slug) ? saved.filter(item => item !== slug) : [...saved, slug];
    try { localStorage.setItem(savedKey, JSON.stringify(next)); window.dispatchEvent(new Event(eventName)); setFallback(null); }
    catch { setFallback(next); setWarning("Storage is unavailable. This reading list will last only while the page is open."); }
  };
  return { saved, toggle, warning };
}

export function StorySave({ slug }: { slug: string }) {
  const { saved, toggle, warning } = useSavedStories();
  const active = saved.includes(slug);
  return <div><button onClick={() => toggle(slug)} aria-pressed={active} className="inline-flex items-center gap-2 rounded-full border border-[#CCDBD2] px-5 py-3 text-sm text-[#087F5B] transition hover:bg-[#EEF5F1]">{active ? <Check size={16} /> : <Bookmark size={16} />} {active ? "Saved on this device" : "Save story"}</button>{warning && <p role="status" className="mt-2 max-w-sm text-xs text-[#795B30]">{warning}</p>}</div>;
}
