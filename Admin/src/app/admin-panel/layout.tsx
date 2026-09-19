

"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin-panel/AdminSidebar";
import AdminHeader from "@/components/admin-panel/AdminHeader";

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-[236px]">
        {/* Header (এখানেই মোবাইলের মেনু এবং হেডার একসাথে আছে) */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}