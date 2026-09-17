import ReviewHero from "@/components/reviews/ReviewHero";
import TrustedTravelerStats from "@/components/reviews/TrustedTravelerStats";
import AIReviewIntelligence from "@/components/reviews/AIReviewIntelligence";
import TravelerReviewsSection from "@/components/reviews/TravelerReviewsSection";
import ReviewJourneyCTA from "@/components/reviews/ReviewJourneyCTA";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F2]">
      <ReviewHero />
      <TrustedTravelerStats />
      <AIReviewIntelligence />
      <TravelerReviewsSection />
      <ReviewJourneyCTA />
    </main>
  );
}
