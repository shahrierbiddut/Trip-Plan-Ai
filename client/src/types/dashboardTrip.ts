export type TripStatus = "Upcoming" | "Completed" | "Draft" | "Cancelled";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  durationString: string;
  travelStyle: string;
  budget: number;
  status: TripStatus;
  aiMatch: number;
};
