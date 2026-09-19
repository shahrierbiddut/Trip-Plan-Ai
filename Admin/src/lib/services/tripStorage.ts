import { readStoredValue, storeValue } from "@/data/config/travelStyles";
import type { GeneratedTrip } from "@/types/tripPlan";

const SAVED_TRIPS_KEY = "tripplan-ai-saved-trips";

export function listSavedTrips(): GeneratedTrip[] {
  return readStoredValue<GeneratedTrip[]>(SAVED_TRIPS_KEY, []);
}

export function getSavedTrip(id: string): GeneratedTrip | null {
  return listSavedTrips().find((trip) => trip.id === id) ?? null;
}

export async function saveTrip(trip: GeneratedTrip): Promise<void> {
  const existing = listSavedTrips().filter((entry) => entry.id !== trip.id);
  storeValue(SAVED_TRIPS_KEY, [trip, ...existing]);

  try {
    const payload = {
      id: trip.id,
      title: `${trip.destination.name} Trip`,
      destination: trip.destination.name,
      travelers: 1, // Default or compute from trip details
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + trip.days * 24 * 60 * 60 * 1000).toISOString(),
      status: "Upcoming",
      amount: trip.budget.total || 0,
      paymentStatus: "Pending",
      image: trip.destination.image || "",
    };

    const response = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "")}/api/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save trip to backend:", await response.text());
    }
  } catch (error) {
    console.error("Error saving trip to backend:", error);
  }
}

export function deleteSavedTrip(id: string): void {
  storeValue(
    SAVED_TRIPS_KEY,
    listSavedTrips().filter((trip) => trip.id !== id),
  );
}

export function isTripSaved(id: string): boolean {
  return listSavedTrips().some((trip) => trip.id === id);
}
