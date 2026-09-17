import type { Metadata } from "next";
import RegisterPage from "@/components/register/RegisterPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Account | TripPlan AI",
  description:
    "Create your TripPlan AI account and start planning personalized journeys.",
};

export default function SignupRoute() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FAF8F3]" />}>
      <RegisterPage />
    </Suspense>
  );
}