"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Download, ImagePlus, PenLine, Save, Trash2, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { saveStoryDraft } from "@/lib/api/stories";
import { storyButton } from "./StoryShared";

type Draft = { name: string; destination: string; title: string; month: string; story: string; lesson: string };
type StoryImage = { name: string; type: string; size: number; dataUrl: string };
const emptyDraft: Draft = { name: "", destination: "", title: "", month: "", story: "", lesson: "" };
const draftKey = "tripplan-story-draft-v1";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export default function StoryDraft({ compact = false }: { compact?: boolean }) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { data: session, isPending: isSessionPending } = useSession();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [status, setStatus] = useState("");
  const [opened, setOpened] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [storyImage, setStoryImage] = useState<StoryImage | null>(null);

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
    } catch {
      setStatus("Your saved local draft could not be loaded. You can still continue writing.");
    }
    setOpened(true);
  };


  const selectImage = (file: File | undefined, input: HTMLInputElement) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Please choose an image file.");
      input.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setStatus("Image must be 2 MB or smaller.");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setStatus("Could not read this image. Please choose another image.");
        input.value = "";
        return;
      }

      setStoryImage({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: reader.result,
      });
      setStatus("");
    };
    reader.onerror = () => {
      setStatus("Could not read this image. Please choose another image.");
      input.value = "";
    };
    reader.readAsDataURL(file);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();

    if (isSessionPending) {
      setStatus("Checking your account. Please try again in a moment.");
      return;
    }

    if (!session?.user?.id) {
      setStatus("Please log in before saving a draft to your account.");
      return;
    }

    setIsSaving(true);
    setStatus("Saving draft...");

    try {
      // Keep a browser copy as a backup, but MongoDB is now the main saved draft.
      localStorage.setItem(draftKey, JSON.stringify(draft));

      await saveStoryDraft({
        userId: session.user.id,
        authorName: (session.user.name ?? draft.name) || "Traveler",
        authorEmail: session.user.email ?? null,
        name: draft.name,
        destination: draft.destination,
        title: draft.title,
        month: draft.month,
        story: draft.story,
        lesson: draft.lesson,
        status: "Draft",
        clientDraftKey: draftKey,
        image: storyImage,
      });

      setStatus("Draft saved successfully to your account.");

      // Close the form automatically after a successful MongoDB save.
      window.setTimeout(() => {
        setOpened(false);
        setStoryImage(null);
      }, 700);
    } catch (error) {
      console.error("Failed to save story draft:", error);
      setStatus(error instanceof Error ? error.message : "Could not save the draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
        <p className="text-sm leading-6 text-[#65786D]">Write your story and save it privately to your account. Saving a draft does not publish it.</p>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Your name<input maxLength={100} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} className={field} placeholder="How should we credit you?" /></label><label className="text-xs font-semibold">Destination<input maxLength={120} value={draft.destination} onChange={event => setDraft({ ...draft, destination: event.target.value })} className={field} placeholder="Where did you go?" /></label></div>
        <label className="block text-xs font-semibold">Story title<input maxLength={160} value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} className={field} placeholder="The moment you still remember…" /></label>
        <label className="block text-xs font-semibold">Travel month <span className="font-normal">(optional)</span><input type="month" value={draft.month} onChange={event => setDraft({ ...draft, month: event.target.value })} className={field} /></label>
        <div className="space-y-2">
          <span className="block text-xs font-semibold">Story image <span className="font-normal">(optional, max 2 MB)</span></span>
          {!storyImage ? (
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#B9CEC2] bg-white px-4 py-5 text-sm font-semibold text-[#087F5B] transition hover:border-[#087F5B] hover:bg-[#F3F8F5]">
              <ImagePlus size={18} />
              Add an image
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={event => selectImage(event.target.files?.[0], event.currentTarget)}
              />
            </label>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#D6E1DA] bg-white">
              <img src={storyImage.dataUrl} alt="Story preview" className="h-44 w-full object-cover" />
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#17332A]">{storyImage.name}</p>
                  <p className="text-xs text-[#65786D]">{(storyImage.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStoryImage(null)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#D6E1DA] px-3 py-2 text-xs font-semibold text-[#7A2E2E] hover:bg-[#FFF5F5]"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          )}
          <p className="text-[11px] leading-5 text-[#65786D]">JPG, PNG, WEBP, GIF, HEIC, SVG or any other image format supported by your browser.</p>
        </div>
        <label className="block text-xs font-semibold">Your experience<textarea rows={7} maxLength={12000} value={draft.story} onChange={event => setDraft({ ...draft, story: event.target.value })} className={field} placeholder="What happened? Who did you meet? What surprised you?" /></label>
        <label className="block text-xs font-semibold">What you learned<textarea rows={3} maxLength={2000} value={draft.lesson} onChange={event => setDraft({ ...draft, lesson: event.target.value })} className={field} placeholder="Something you would tell another traveler…" /></label>
        <div className="flex flex-wrap gap-3"><button type="submit" disabled={isSaving} className={`${storyButton} disabled:cursor-not-allowed disabled:opacity-60`}><Save size={16} /> {isSaving ? "Saving..." : "Save draft"}</button><button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-full border border-[#C9DBD1] px-5 py-3 text-sm font-semibold text-[#087F5B]"><Download size={16} /> Download copy</button></div>
        <p role="status" className="text-xs leading-6 text-[#087F5B]">{status || "Tip: keep booking references and private contact details out of a story you plan to share."}</p>
      </form>
    </dialog>
  </>;
}
