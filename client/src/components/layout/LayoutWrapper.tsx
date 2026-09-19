"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAppShell =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/plan-trip");

  return (
    <div className="flex min-h-full flex-col font-sans">
      {!isAppShell && <Navbar />}
      <main className="flex-1 h-full">{children}</main>
      {!isAppShell && <Footer />}
    </div>
  );
}
