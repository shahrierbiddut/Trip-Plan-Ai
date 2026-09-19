

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin-panel/AdminSidebar";
import AdminHeader from "@/components/admin-panel/AdminHeader";
import { useSession } from "@/lib/auth-client";

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(
  /\/+$/,
  "",
);

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [accessStatus, setAccessStatus] = useState<
    "checking" | "allowed" | "denied"
  >("checking");

  useEffect(() => {
    if (sessionLoading) return;

    const userId = session?.user?.id;

    if (!userId) {
      setAccessStatus("denied");
      router.replace("/login");
      return;
    }

    let cancelled = false;

    const verifyAdmin = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/users/${encodeURIComponent(userId)}`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Unable to verify admin access");
        }

        const result = await response.json();
        const role = String(result?.data?.role ?? "")
          .trim()
          .toLowerCase();

        if (cancelled) return;

        if (role === "admin") {
          setAccessStatus("allowed");
          return;
        }

        setAccessStatus("denied");
        router.replace("/login");
      } catch (error) {
        console.error("Admin access verification failed:", error);

        if (!cancelled) {
          setAccessStatus("denied");
          router.replace("/login");
        }
      }
    };

    verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [router, session?.user?.id, sessionLoading]);

  if (sessionLoading || accessStatus !== "allowed") {
    return null;
  }

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