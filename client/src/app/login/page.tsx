import LoginPage from "@/components/login/LoginPage";
import type { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Login | TripPlan AI",
  description:
    "Sign in to TripPlan AI and continue planning personalized journeys.",
};

export default function LoginRoute() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FAF8F3]" />}>
      <LoginPage />
    </Suspense>
  );
}