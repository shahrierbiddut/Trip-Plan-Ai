"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { WIZARD_STEPS } from "@/data/config/tripPlanOptions";
import { fetchDestinations } from "@/lib/api/destination";
import type { DestinationData } from "@/types/destination-card";
import { generateTrip, isFormValid } from "@/lib/services/tripPlanner";
import { showTripPlanToast } from "@/components/TripPlanToast";
import type { GeneratedTrip, ResultTabId, TripPlanFormState, WizardStepId } from "@/types/tripPlan";

import PlanningHero from "@/components/plan-trip/PlanningHero";
import AIDecideFloatingCard from "@/components/plan-trip/AIDecideFloatingCard";
import PlanningProgress from "@/components/plan-trip/PlanningProgress";
import WhyTripPlanAI from "@/components/plan-trip/WhyTripPlanAI";
import WizardStepShell from "@/components/plan-trip/shared/WizardStepShell";
import DestinationSelector from "@/components/plan-trip/wizard/DestinationSelector";
import DateSelector from "@/components/plan-trip/wizard/DateSelector";
import TravelerSelector from "@/components/plan-trip/wizard/TravelerSelector";
import TravelStyleSelector from "@/components/plan-trip/wizard/TravelStyleSelector";
import BudgetSelector from "@/components/plan-trip/wizard/BudgetSelector";
import PreferenceSelector from "@/components/plan-trip/wizard/PreferenceSelector";
import TripBlueprint from "@/components/plan-trip/wizard/TripBlueprint";
import BudgetOverviewPreview from "@/components/plan-trip/wizard/BudgetOverviewPreview";
import AIGenerationState from "@/components/plan-trip/result/AIGenerationState";
import TripSummary from "@/components/plan-trip/result/TripSummary";
import AIRecommendationCard from "@/components/plan-trip/result/AIRecommendationCard";
import ItineraryTimeline from "@/components/plan-trip/result/ItineraryTimeline";
import HotelRecommendations from "@/components/plan-trip/result/HotelRecommendations";
import FoodRecommendations from "@/components/plan-trip/result/FoodRecommendations";
import TransportPlanView from "@/components/plan-trip/result/TransportPlanView";
import BudgetBreakdownPanel from "@/components/plan-trip/result/BudgetBreakdownPanel";
import NotesPanel from "@/components/plan-trip/result/NotesPanel";
import TripActions from "@/components/plan-trip/result/TripActions";
import AIFormAssistant from "@/components/plan-trip/AIFormAssistant";
import AITravelAssistant from "@/components/plan-trip/result/AITravelAssistant";
import EditTripDrawer from "@/components/plan-trip/result/EditTripDrawer";

const INITIAL_FORM_STATE: TripPlanFormState = {
  destinationSlug: null,
  startDate: null,
  endDate: null,
  travelerType: "Solo",
  travelers: { adults: 1, children: 0 },
  travelStyles: [],
  budgetTier: "standard",
  customBudget: null,
  accommodation: null,
  foodPreferences: [],
  transport: null,
  activities: [],
  travelPace: "balanced",
};

type Phase = "wizard" | "generating" | "result";

export default function PlanTripPage() {
  const [currentStep, setCurrentStep] = useState<WizardStepId>("destination");
  const [phase, setPhase] = useState<Phase>("wizard");
  const [formState, setFormState] = useState<TripPlanFormState>(INITIAL_FORM_STATE);
  const [generatedTrip, setGeneratedTrip] = useState<GeneratedTrip | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<ResultTabId>("itinerary");
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [destinationsData, setDestinationsData] = useState<DestinationData[]>([]);

  useEffect(() => {
    fetchDestinations().then(res => {
      if (Array.isArray(res)) {
        setDestinationsData(res);
        
        // Auto-select destination if passed in URL
        const params = new URLSearchParams(window.location.search);
        const searchDestination = params.get("destination");
        if (searchDestination) {
          const matchedDest = res.find(
            d => d.name.toLowerCase() === searchDestination.toLowerCase() || 
                 d.slug.toLowerCase() === searchDestination.toLowerCase()
          );
          if (matchedDest) {
            setFormState(prev => ({ ...prev, destinationSlug: matchedDest.slug }));
          }
        }
      }
    });

    const tripId = new URLSearchParams(window.location.search).get("tripId");
    if (tripId) {
      const loadTrip = async () => {
        try {
          const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/trips/${tripId}`);
          const data = await res.json();
          if (data.success && data.data?.formState) {
            setFormState(data.data.formState);
            setPhase("generating");
          }
        } catch (e) {
          console.error("Failed to load trip:", e);
        }
      };
      loadTrip();
    }
  }, []);

  const destination = useMemo(
    () => destinationsData.find((entry) => entry.slug === formState.destinationSlug) ?? null,
    [formState.destinationSlug, destinationsData],
  );

  const days =
    formState.startDate && formState.endDate
      ? Math.max(1, Math.round((new Date(formState.endDate).getTime() - new Date(formState.startDate).getTime()) / 86400000) + 1)
      : null;
  const nights = days ? Math.max(0, days - 1) : null;
  const travelerCount = formState.travelers.adults + formState.travelers.children;

  const stepIndex = WIZARD_STEPS.findIndex((step) => step.id === currentStep);
  const goToStep = (step: WizardStepId) => setCurrentStep(step);
  const goNext = () => {
    const next = WIZARD_STEPS[stepIndex + 1];
    if (next) setCurrentStep(next.id);
  };
  const goBack = () => {
    const previous = WIZARD_STEPS[stepIndex - 1];
    if (previous) setCurrentStep(previous.id);
  };

  const patchForm = (patch: Partial<TripPlanFormState>) => setFormState((current) => ({ ...current, ...patch }));

  const handleSelectDestination = (slug: string) => {
    patchForm({ destinationSlug: slug });
  };

  const handleGenerate = () => {
    if (!isFormValid(formState)) {
      showTripPlanToast({ title: "Please complete your trip details", message: "Destination, dates and travelers are required." });
      return;
    }
    setPhase("generating");
  };

  const handleGenerationComplete = async () => {
    const trip = await generateTrip(formState);
    if (!trip) {
      showTripPlanToast({ title: "Unable to generate trip", message: "Please try again." });
      setPhase("wizard");
      return;
    }
    setGeneratedTrip(trip);
    setActiveResultTab("itinerary");
    setPhase("result");
  };

  const handleOptimizeBudget = async () => {
    if (!generatedTrip) return;
    const cheapestHotel = [...generatedTrip.hotels].sort((a, b) => a.pricePerNight - b.pricePerNight)[0];
    if (!cheapestHotel) return;
    const nextForm = { ...generatedTrip.formState, budgetTier: "economy" as const, customBudget: null };
    const regenerated = await generateTrip(nextForm);
    if (regenerated) {
      setGeneratedTrip(regenerated);
      showTripPlanToast({ title: "Budget optimized", message: "Switched to more economical options." });
    }
  };

  const handleEditTrip = () => {
    setPhase("wizard");
    setCurrentStep("review");
  };

  const nextDisabledForStep = (): boolean => {
    if (currentStep === "destination") return !formState.destinationSlug;
    if (currentStep === "dates") return !formState.startDate || !formState.endDate;
    return false;
  };

  const handlePlanNewTrip = () => {
    setFormState(INITIAL_FORM_STATE);
    setGeneratedTrip(null);
    setCurrentStep("destination");
    setPhase("wizard");
  };

  if (phase === "generating") {
    return (
      <div className="flex min-h-full items-center justify-center p-6">
        <AIGenerationState onComplete={handleGenerationComplete} />
      </div>
    );
  }

  if (phase === "result" && generatedTrip) {
    return (
      <div className="mx-auto max-w-[1800px] space-y-6 p-5 pb-28 sm:p-8 lg:p-10 xl:p-12">
        <TripSummary trip={generatedTrip} activeTab={activeResultTab} onTabChange={setActiveResultTab} onPlanNewTrip={handlePlanNewTrip} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.06)] sm:p-6">
            {activeResultTab === "itinerary" && (
              <ItineraryTimeline days={generatedTrip.itinerary} onEditActivity={() => setIsEditDrawerOpen(true)} />
            )}
            {activeResultTab === "stay" && (
              <HotelRecommendations
                hotels={generatedTrip.hotels}
                onSelect={(hotelId) =>
                  setGeneratedTrip((current) => {
                    if (!current) return current;
                    return {
                      ...current,
                      hotels: current.hotels.map((hotel) => ({ ...hotel, selected: hotel.id === hotelId })),
                    };
                  })
                }
              />
            )}
            {activeResultTab === "food" && <FoodRecommendations food={generatedTrip.food} />}
            {activeResultTab === "transport" && <TransportPlanView transport={generatedTrip.transport} />}
            {activeResultTab === "budget" && (
              <BudgetBreakdownPanel budget={generatedTrip.budget} onOptimize={handleOptimizeBudget} />
            )}
            {activeResultTab === "notes" && <NotesPanel notes={generatedTrip.notes} />}
          </div>

          <div className="space-y-5">
            <AIRecommendationCard recommendation={generatedTrip.aiRecommendation} />
            <AITravelAssistant trip={generatedTrip} onTripUpdate={setGeneratedTrip} />
          </div>
        </div>

        <TripActions trip={generatedTrip} onEdit={handleEditTrip} />
        <WhyTripPlanAI />

        <EditTripDrawer
          isOpen={isEditDrawerOpen}
          trip={generatedTrip}
          onClose={() => setIsEditDrawerOpen(false)}
          onUpdate={setGeneratedTrip}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1800px] space-y-7 p-5 pb-28 sm:p-8 lg:p-10 xl:p-12">
      <PlanningHero />

      {currentStep === "destination" && (
        <AIDecideFloatingCard onOpen={() => document.getElementById("ai-destination-matcher")?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      )}

      <PlanningProgress currentStep={currentStep} onStepClick={goToStep} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div>
          {currentStep === "destination" && (
            <WizardStepShell
              title="Where do you want to go?"
              onNext={goNext}
              nextDisabled={nextDisabledForStep()}
            >
              <DestinationSelector destinationSlug={formState.destinationSlug} onSelect={handleSelectDestination} />
            </WizardStepShell>
          )}

          {currentStep === "dates" && (
            <WizardStepShell
              title="When are you traveling?"
              description="Pick your dates — we'll calculate the length of your trip automatically."
              onBack={goBack}
              onNext={goNext}
              nextDisabled={nextDisabledForStep()}
            >
              <DateSelector
                startDate={formState.startDate}
                endDate={formState.endDate}
                onChange={(startDate, endDate) => patchForm({ startDate, endDate })}
              />
            </WizardStepShell>
          )}

          {currentStep === "travelers" && (
            <WizardStepShell title="Who's coming along?" onBack={goBack} onNext={goNext}>
              <TravelerSelector
                travelerType={formState.travelerType}
                travelers={formState.travelers}
                onChange={(travelerType, travelers) => patchForm({ travelerType, travelers })}
              />
            </WizardStepShell>
          )}

          {currentStep === "style" && (
            <WizardStepShell title="What's your travel style?" onBack={goBack} onNext={goNext}>
              <TravelStyleSelector
                selected={formState.travelStyles}
                onChange={(travelStyles) => patchForm({ travelStyles })}
              />
            </WizardStepShell>
          )}

          {currentStep === "budget" && (
            <WizardStepShell title="What's your budget?" onBack={goBack} onNext={goNext}>
              <BudgetSelector
                budgetTier={formState.budgetTier}
                customBudget={formState.customBudget}
                days={days ?? 3}
                travelers={Math.max(1, travelerCount)}
                onChange={(budgetTier, customBudget) => patchForm({ budgetTier, customBudget })}
              />
            </WizardStepShell>
          )}

          {currentStep === "preferences" && (
            <WizardStepShell title="Fine-tune your preferences" onBack={goBack} onNext={goNext}>
              <PreferenceSelector
                accommodation={formState.accommodation}
                foodPreferences={formState.foodPreferences}
                transport={formState.transport}
                activities={formState.activities}
                travelPace={formState.travelPace}
                onChange={(patch) => patchForm(patch)}
              />
            </WizardStepShell>
          )}

          {currentStep === "review" && (
            <WizardStepShell title="Review & Generate" onBack={goBack} hideNext>
              <div className="overflow-hidden rounded-2xl border border-[#DCE6E1]">
                {destination && (
                  <div className="relative h-[160px] w-full sm:h-[200px]">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="font-serif text-[19px] font-bold">{destination.name}</p>
                      <p className="text-[11px] text-white/80">
                        {days} Days / {nights} Nights · {travelerCount} {travelerCount === 1 ? "traveler" : "travelers"}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-3 bg-[#FAFAF7] p-8 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#073D31] text-[#F4A934]">
                    <Sparkles size={19} />
                  </span>
                  <p className="font-serif text-[17px] font-bold text-[#12342D]">You&apos;re all set!</p>
                  <p className="max-w-sm text-[12px] text-[#687873]">
                    Check your Trip Blueprint, then hit Generate My Trip when you&apos;re ready.
                  </p>
                </div>
              </div>
            </WizardStepShell>
          )}
        </div>

        <div className="space-y-5 lg:sticky lg:top-24">
          <TripBlueprint
            formState={formState}
            destination={destination}
            days={days}
            nights={nights}
            isValid={isFormValid(formState)}
            onEdit={goToStep}
            onGenerate={handleGenerate}
          />
          <BudgetOverviewPreview
            budgetTier={formState.budgetTier}
            customBudget={formState.customBudget}
            days={days ?? 3}
            travelers={Math.max(1, travelerCount)}
          />
          <AIFormAssistant
            form={formState}
            destinations={destinationsData}
            onApply={patchForm}
          />
        </div>
      </div>

      <WhyTripPlanAI />

      {currentStep === "review" && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DCE6E1] bg-white p-4 shadow-[0_-8px_24px_rgba(7,26,22,0.08)] lg:hidden">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isFormValid(formState)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] py-3.5 text-[13px] font-bold text-[#17332A] shadow-[0_10px_26px_rgba(217,134,31,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Sparkles size={16} /> Generate My Trip
          </button>
        </div>
      )}
    </div>
  );
}