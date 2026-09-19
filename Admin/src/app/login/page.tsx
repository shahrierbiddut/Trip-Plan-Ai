import LoginPage from "@/components/login/LoginPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login | TripPlan AI",
  description:
    "Sign in to TripPlan AI and continue planning personalized journeys.",
};

export default function LoginRoute() {
  return <LoginPage/>;
}