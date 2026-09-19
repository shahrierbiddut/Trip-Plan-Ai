"use client";

import { Info } from "lucide-react";

interface NotesPanelProps {
  notes: string[];
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  if (notes.length === 0) {
    return <p className="text-[12px] text-[#687873]">No additional notes for this trip.</p>;
  }

  return (
    <div>
      <h3 className="font-serif text-[18px] font-bold text-[#12342D]">Travel Notes</h3>
      <ul className="mt-3 space-y-2.5">
        {notes.map((note) => (
          <li key={note} className="flex items-start gap-2.5 rounded-2xl border border-[#EEF5F1] bg-[#FAFAF7] p-3.5 text-[12px] leading-5 text-[#30483F]">
            <Info size={15} className="mt-0.5 shrink-0 text-[#087F5B]" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
