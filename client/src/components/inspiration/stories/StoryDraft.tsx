"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Download, PenLine, Save, X } from "lucide-react";
import { storyButton } from "./StoryShared";

type Draft = { name: string; destination: string; title: string; month: string; story: string; lesson: string };
const emptyDraft: Draft = { name: "", destination: "", title: "", month: "", story: "", lesson: "" };
const draftKey = "tripplan-story-draft-v1";

export default function StoryDraft({ compact = false }: { compact?: boolean }) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [status, setStatus] = useState("");
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!opened) return;
    const node = dialog.current;
    const button = trigger.current;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = overflow; button?.focus(); };
  }, [opened]);

  const open = () => {
    setStatus("");
    try {
      const stored = JSON.parse(localStorage.getItem(draftKey) ?? "null");
      if (stored && typeof stored === "object") {
        const restored = { ...emptyDraft };
        for (const key of Object.keys(restored) as (keyof Draft)[]) if (typeof stored[key] === "string") restored[key] = stored[key];
        setDraft(restored);
      }
    } catch { setStatus("Your saved draft could not be loaded. You can still write and download a copy."); }
    setOpened(true);
  };
  const save = (event: FormEvent) => {
    event.preventDefault();
    try { localStorage.setItem(draftKey, JSON.stringify(draft)); setStatus("Draft saved on this device. It has not been published or submitted."); }
    catch { setStatus("Could not save on this device. Download a copy to keep your writing."); }
  };
  const download = () => {
    const text = `${draft.title || "My travel story"}\n\nBy: ${draft.name}\nDestination: ${draft.destination}\nTravel month: ${draft.month}\n\n${draft.story}\n\nWhat I learned\n${draft.lesson}\n\nPrivate draft — not published or submitted.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "my-travel-story.txt"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Your draft copy is ready to keep or share yourself.");
  };
  const field = "mt-2 w-full rounded-xl border border-[#D6E1DA] bg-white px-4 py-3 text-sm text-[#17332A] outline-none focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10";
  return <>
    <button ref={trigger} onClick={open} className={compact ? "inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15" : storyButton}><PenLine size={16} /> Write your story</button>
    <dialog ref={dialog} onCancel={() => setOpened(false)} onClose={() => setOpened(false)} onClick={event => { if (event.target === event.currentTarget) setOpened(false); }} aria-labelledby={titleId} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-2xl overflow-y-auto rounded-3xl bg-[#FAFAF7] p-0 text-[#17211D] shadow-2xl backdrop:bg-[#031C15]/70 backdrop:backdrop-blur-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D6E1DA] bg-[#FAFAF7]/95 px-6 py-4 backdrop-blur"><h2 id={titleId} className="font-serif text-2xl">Your journey, in your words.</h2><button type="button" autoFocus onClick={() => setOpened(false)} aria-label="Close draft" className="rounded-full p-2 hover:bg-[#E8F0E8]"><X size={20} /></button></div>
      <form onSubmit={save} className="space-y-5 p-6 sm:p-8">
        <p className="text-sm leading-6 text-[#65786D]">Start a private draft. Save it on this device or download a copy. Public submissions are not connected yet.</p>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Your name<input maxLength={100} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} className={field} placeholder="How should we credit you?" /></label><label className="text-xs font-semibold">Destination<input maxLength={120} value={draft.destination} onChange={event => setDraft({ ...draft, destination: event.target.value })} className={field} placeholder="Where did you go?" /></label></div>
        <label className="block text-xs font-semibold">Story title<input maxLength={160} value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} className={field} placeholder="The moment you still remember…" /></label>
        <label className="block text-xs font-semibold">Travel month <span className="font-normal">(optional)</span><input type="month" value={draft.month} onChange={event => setDraft({ ...draft, month: event.target.value })} className={field} /></label>
        <label className="block text-xs font-semibold">Your experience<textarea rows={7} maxLength={12000} value={draft.story} onChange={event => setDraft({ ...draft, story: event.target.value })} className={field} placeholder="What happened? Who did you meet? What surprised you?" /></label>
        <label className="block text-xs font-semibold">What you learned<textarea rows={3} maxLength={2000} value={draft.lesson} onChange={event => setDraft({ ...draft, lesson: event.target.value })} className={field} placeholder="Something you would tell another traveler…" /></label>
        <div className="flex flex-wrap gap-3"><button type="submit" className={storyButton}><Save size={16} /> Save draft</button><button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-full border border-[#C9DBD1] px-5 py-3 text-sm font-semibold text-[#087F5B]"><Download size={16} /> Download copy</button></div>
        <p role="status" className="text-xs leading-6 text-[#087F5B]">{status || "Tip: keep booking references and private contact details out of a story you plan to share."}</p>
      </form>
    </dialog>
  </>;
}
