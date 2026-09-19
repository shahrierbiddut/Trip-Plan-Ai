import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import HotelDecisionSection from "@/components/home/HotelDecisionSection";
import NextAdventureCTA from "@/components/home/NextAdventureCTA";
import PopularDestinations from "@/components/home/PopularDestinations";
import RegionalFoodSection from "@/components/home/RegionalFoodSection";
import TransportBookingSection from "@/components/home/TransportBookingSection";
import TravelBannerSection from "@/components/home/TravelBannerSection";
import TravelCategories from "@/components/home/TravelCategories";
import TravelJourney from "@/components/home/TravelJourney";
import TravelStoriesSection from "@/components/home/TravelStoriesSection";
import TripPlanNewsletter from "@/components/home/TripPlanNewsletter";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <TravelBannerSection/>
      <TravelCategories />
      <PopularDestinations />
      <RegionalFoodSection />
      <HotelDecisionSection />
      <TransportBookingSection/>
      <TravelStoriesSection />
      <TravelJourney />
      <NextAdventureCTA plannerHref="/destinations" />
      <AboutSection />
      <TripPlanNewsletter />
      <Toaster />
    </div>
  );
}