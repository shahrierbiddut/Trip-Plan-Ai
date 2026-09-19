"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Pencil, Save, Share2 } from "lucide-react";
import { showTripPlanToast } from "@/components/TripPlanToast";
import { saveTrip } from "@/lib/services/tripStorage";
import { downloadTripPdf } from "@/lib/services/tripPdf";
import type { GeneratedTrip } from "@/types/tripPlan";

interface TripActionsProps {
  trip: GeneratedTrip;
  onEdit: () => void;
}

export default function TripActions({ trip, onEdit }: TripActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    await saveTrip(trip);
    showTripPlanToast({ title: "Trip saved", message: "Your trip is saved to this device." });
    router.push("/dashboard/trips");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/plan-trip?trip=${trip.id}`;
    const shareData = {
      title: `TripPlan AI · ${trip.destination.name} Journey`,
      text: `Check out my ${trip.days}-day ${trip.destination.name} trip plan.`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showTripPlanToast({ title: "Link copied", message: "Trip link copied to your clipboard." });
    } catch {
      showTripPlanToast({ title: "Unable to share", message: "Please copy the page URL manually." });
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadTripPdf(trip);
      showTripPlanToast({ title: "PDF generated successfully", message: "Your trip document has downloaded." });
    } catch {
      showTripPlanToast({ title: "Unable to generate trip", message: "Please try again." });
    } finally {
      setIsDownloading(false);
    }
  };

  const actions = [
    { label: "Save Trip", icon: Save, onClick: handleSave },
    { label: "Share Trip", icon: Share2, onClick: handleShare },
    { label: "Download PDF", icon: Download, onClick: handleDownload, loading: isDownloading },
    { label: "Edit Trip", icon: Pencil, onClick: onEdit },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map(({ label, icon: Icon, onClick, loading }) => (
        <button
          key={label}
          type="button"
          onClick={onClick}
          disabled={loading}
          className="flex flex-col items-center gap-2 rounded-2xl border border-[#DCE6E1] bg-white p-4 text-center transition-colors hover:border-[#087F5B]/40 hover:bg-[#EEF5F1] disabled:cursor-wait disabled:opacity-70"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]">
            <Icon size={16} />
          </span>
          <span className="text-[11px] font-bold text-[#30483F]">{loading ? "Working…" : label}</span>
        </button>
      ))}
    </div>
  );
}
