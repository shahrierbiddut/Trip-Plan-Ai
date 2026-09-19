"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DashboardProvider } from "@/components/dashboard/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="flex h-screen w-full bg-[#F7F7F2] overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar (Desktop Fixed, Mobile Drawer) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[320px] shrink-0 transform transition-transform duration-300 lg:static lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <DashboardSidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
