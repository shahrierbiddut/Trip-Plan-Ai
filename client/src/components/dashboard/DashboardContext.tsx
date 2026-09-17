"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
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
    
    // Only fetch if session is loaded (either we have an ID or session is fully unauthenticated)
    if (session !== undefined) {
      fetchDashboard();
    }
  }, [userId, session]);

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
