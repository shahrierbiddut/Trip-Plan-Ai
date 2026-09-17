import type { Metadata } from "next";
import RegisterPage from "@/components/register/RegisterPage";

export const metadata: Metadata = {
  title: "Create Account | TripPlan AI",
  description:
    "Create your TripPlan AI account and start planning personalized journeys.",
};

export default function SignupRoute() {
  return <RegisterPage />;
}