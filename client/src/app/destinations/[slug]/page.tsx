// import { getDestinationBySlug } from "@/data/destinations/destinationRegistry";
import DestinationHeroDetails from "@/components/destinations/hero/DestinationHeroDetails";
import DestinationStatsStrip from "@/components/destinations/hero/DestinationStatsStrip";
import DestinationStickyNav from "@/components/destinations/layout/DestinationStickyNav";
import DestinationOverview from "@/components/destinations/content/DestinationOverview";
import WhyLoveIt from "@/components/destinations/content/WhyLoveIt";
import AIDestinationGuide from "@/components/destinations/ai/AIDestinationGuide";
import BestTimeToVisit from "@/components/destinations/content/BestTimeToVisit";
import ThingsToDo from "@/components/destinations/content/ThingsToDo";
import TopPlacesToExplore from "@/components/destinations/content/TopPlacesToExplore";
import MarineDriveFeature from "@/components/destinations/content/MarineDriveFeature";
import RecommendedItinerary from "@/components/destinations/content/RecommendedItinerary";
import AccommodationSection from "@/components/destinations/content/AccommodationSection";
import FoodDiningSection from "@/components/destinations/content/FoodDiningSection";
import ReviewsSection from "@/components/destinations/reviews/ReviewsSection";
import PhotoGallery from "@/components/destinations/content/PhotoGallery";
import TravelInfoTabs from "@/components/destinations/info/TravelInfoTabs";
import SmartTravelTips from "@/components/destinations/info/SmartTravelTips";
import AITravelAssistant from "@/components/destinations/ai/AITravelAssistant";
import RelatedDestinations from "@/components/destinations/layout/RelatedDestinations";
import FinalCTA from "@/components/destinations/layout/FinalCTA";
import StickyCTAs from "@/components/destinations/layout/StickyCTAs";
import { notFound, redirect } from "next/navigation";
import { fetchDestinationBySlug } from "@/lib/api/destination";
import { getUserSession } from "@/lib/core/session";
import { addBookmark } from "@/lib/actions/destinations";

export default async function DestinationDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await fetchDestinationBySlug(slug);
  const user = await getUserSession();

  if (!data) {
    return notFound();
  } else {
    console.log("data fetched from server!")
  }

  const handleBookmark = async () => {
    'use server'

    if (!user) {
      redirect('/auth/login');
    }
    const { _id, ...restDestination } = data;

    const bookmarkData = {
      ...restDestination,
      destinationId: _id,
      user: user.id
    }

    console.log("Bookmark Data:", bookmarkData);

    try {
      const res = await addBookmark(bookmarkData);

      if (res.error) {
        return { success: false, message: res.message };
      }

      if (res.insertedId) {
        return { success: true, message: `${data.name} added to your bookmark!` };
      }

      return { success: false, message: "Something went wrong!" };

    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to connect to server." };
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2]">

      <DestinationHeroDetails data={data}  handleBookmark={handleBookmark} />
      <DestinationStatsStrip
        rating={data.rating}
        reviews={data.reviewCount}
        recommendedStay={data.recommendedStay}
        estimatedBudget={data.estimatedBudget}
        popularSeason={data.popularSeason}
      />
      <DestinationStickyNav />

      <div className="max-w-360 mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          <div className="w-full lg:w-[68%] flex flex-col gap-16">

            <DestinationOverview data={data.overview} />

            <section id="ai-insights" className="scroll-mt-32">
              <AIDestinationGuide data={data.aiGuide} />
            </section>

            <section className="scroll-mt-32">
              <BestTimeToVisit data={data.bestTime} />
            </section>

            <section id="things-to-do" className="scroll-mt-32">
              <ThingsToDo data={data.thingsToDo} destinationName={data.name} />
            </section>

            <section id="places" className="scroll-mt-32">
              <TopPlacesToExplore data={data.placesToExplore} />
              <MarineDriveFeature data={data.marineDriveFeature} />
            </section>

            <section id="stay" className="scroll-mt-32">
              <AccommodationSection data={data.hotels} />
            </section>

            <section id="food" className="scroll-mt-32">
              <FoodDiningSection data={data.foods} destinationName={data.name} />
            </section>

            <section id="reviews" className="scroll-mt-32">
              <ReviewsSection data={data.reviews} />
            </section>

            <section className="scroll-mt-32">
              <PhotoGallery data={data.gallery} destinationName={data.name} />
            </section>

            <section id="travel-info" className="scroll-mt-32">
              <TravelInfoTabs data={data.travelInfo} />
            </section>

          </div>

          <div className="w-full lg:w-[32%] flex flex-col gap-8">
            <WhyLoveIt data={data.whyLoveIt} />
            <RecommendedItinerary data={data.itinerary} />
            <SmartTravelTips data={data.travelTips} />
          </div>

        </div>

        <RelatedDestinations data={data.relatedDestinations} />

        <FinalCTA name={data.name} image={data.heroImage} />

      </div>

      <StickyCTAs
        name={data.name}
        aiMatch={data.aiMatch}
        priceFrom={data.estimatedBudget}
      />
      <AITravelAssistant />
    </div>
  );
}

