"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TravelChatWidget from "@/components/ai/TravelChatWidget";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAppShell =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/plan-trip");


    
  const showTravelChat =
    pathname === "/" ||
    pathname === "/destinations" ||
    pathname === "/reviews" ||
    pathname === "/tour-packages" ||
    pathname?.startsWith("/tour-packages/") ||
    pathname === "/inspiration/guides" ||
    pathname?.startsWith("/inspiration/guides/") ||
    pathname === "/inspiration/stories" ||
    pathname?.startsWith("/inspiration/stories/");

  return (
    <div className="flex min-h-full flex-col font-sans">
      {!isAppShell && <Navbar />}
      <main className="flex-1 h-full">{children}</main>
      {!isAppShell && <Footer />}
      {showTravelChat && <TravelChatWidget />}
    </div>
  );
}
