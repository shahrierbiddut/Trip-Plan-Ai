"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";

export type DashboardContextType = {
  dashboardData: any;
  isLoading: boolean;
  error: string | null;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session === null) {
      router.push("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const url = new URL(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/dashboard`);
        if (userId) {
          url.searchParams.append("userId", userId);
        }
        
        const res = await fetch(url.toString());
        const response = await res.json();
        if (response && response.success) {
          setDashboardData(response.data);
        } else {
          setError(response?.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch if session is loaded and authenticated
    if (!isPending && session) {
      fetchDashboard();
    }
  }, [userId, session, isPending, router]);

  if (isPending || session === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F7F2]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#087F5B] border-t-transparent"></div>
          <p className="font-medium text-[#66736D]">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={{ dashboardData, isLoading, error }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
