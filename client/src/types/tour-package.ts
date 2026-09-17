export type TourPackageBatch = {
  date: string;
  seats: string;
  status: "Available" | "Filling fast";
};

export type TourPackageExperience = {
  category: string;
  rating: number;
  reviews: number;
  highlights: string[];
  gallery: Array<{ src: string; label: string; alt: string }>;
  dayTitles: string[];
  accommodation: {
    name: string;
    type: string;
    room: string;
    amenities: string[];
  };
  transport: {
    name: string;
    type: string;
    details: string[];
  };
  pickup: string;
  batches: TourPackageBatch[];
  safety: string[];
  excluded: string[];
  packing: string[];
  policies: Array<[string, string]>;
  faqs: Array<[string, string]>;
};

export type TourPackage = {
  _id?: string;
  id: number;
  slug: string;
  sourceSlug?: string;
  title: string;
  destination: string;
  subtitle?: string;
  image: string;
  duration: string;
  people?: string;
  price: number;
  oldPrice?: number;
  company: string;
  description?: string;
  includes?: string[];
  rating?: number;
  reviews?: number;
  tag?: string;
  featured: boolean;
  upcoming: boolean;
  active: boolean;
  sortOrder: number;
  startDate?: string;
  seatsLeft?: number;
  experience?: TourPackageExperience;
  travelerReview?: {
    name: string;
    initials: string;
    destination: string;
    rating: string;
    image: string;
    review: string;
  };
};
