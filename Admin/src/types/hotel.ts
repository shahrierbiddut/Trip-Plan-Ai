export type TravellerType =
  | "Solo traveller"
  | "Couple"
  | "Family"
  | "Friends group"
  | "Business traveller";

export type Room = {
  id: string;
  name: string;
  image: string;
  bedType: string;
  maxGuests: number;
  size: string;
  view: string;
  airConditioned: boolean;
  breakfastIncluded: boolean;
  refundable: boolean;
  availableRooms: number;
  pricePerNight: number;
};

export type ReviewBreakdown = {
  cleanliness: number;
  staff: number;
  location: number;
  food: number;
  comfort: number;
  wifi: number;
  safety: number;
  value: number;
  family: number;
};

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  area: string;
  destination: string;
  address: string;
  category: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  shortReview: string;
  image: string;
  gallery: string[];
  pricePerNight: number;
  taxRate: number;
  serviceCharge: number;
  discount: number;
  availableRooms: number;
  distanceToAttraction: string;
  distanceMeters: number;
  nearestAttraction: string;
  amenities: string[];
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  payAtHotel: boolean;
  verifiedAt: string;
  suitableFor: TravellerType[];
  rooms: Room[];
  reviewBreakdown: ReviewBreakdown;
  guestsLiked: string[];
  commonComplaints: string[];
  nearbyPlaces: { name: string; distance: string; travelTime: string }[];
  policies: { label: string; value: string }[];
  coordinates: { x: number; y: number };
};

export type Destination = {
  name: string;
  slug: string;
  image: string;
  startingPrice: number;
  hotelCount: number;
  bestSeason: string;
  popularArea: string;
};
