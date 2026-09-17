"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Plane, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type TripPlanToastOptions = {
  title: string;
  message: string;
  icon?: ReactNode;
  duration?: number;
};

export function TripPlanToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 106,
        right: "clamp(16px, 3vw, 56px)",
      }}
    />,
    document.body,
  );
}

export function showTripPlanToast({
  title,
  message,
  icon = <Plane size={19} strokeWidth={2.1} />,
  duration = 4000,
}: TripPlanToastOptions) {
  return toast.custom(
    (currentToast) => (
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={
          currentToast.visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -8, scale: 0.98 }
        }
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
        className="w-[calc(100vw-32px)] max-w-90 overflow-hidden rounded-[18px] border border-white/15 bg-linear-to-br from-[#073D31] to-[#0A5745] text-white shadow-[0_18px_44px_rgba(7,61,49,0.25)]"
      >
        <div className="flex min-w-0 items-center gap-3 py-3.5 pl-3.5 pr-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] to-[#F4A934] text-[#073D31] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
            {icon}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-white">
              {title}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-white/70">
              {message}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close notification"
            onClick={() => toast.dismiss(currentToast.id)}
            className="self-start rounded-full p-1 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        <div className="h-1 w-full overflow-hidden bg-white/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            style={{ transformOrigin: "left center" }}
            className="h-full w-full bg-gradient-to-r from-[#F4A934] to-[#FFD16F]"
          />
        </div>
      </motion.div>
    ),
    {
      duration,
      position: "top-right",
    },
  );
}

export function showLogoutToast(userName: string) {
  return showTripPlanToast({
    title: `Goodbye, ${userName}`,
    message: "You have been logged out successfully.",
  });
}

export function showLoginToast(userName: string) {
  return showTripPlanToast({
    title: `Welcome back, ${userName}`,
    message: "Your next journey is waiting.",
  });
}

export function showSignupToast(userName: string) {
  return showTripPlanToast({
    title: `Welcome to TripPlan AI, ${userName}`,
    message: "Your account was created successfully.",
    duration: 1800,
  });
}
