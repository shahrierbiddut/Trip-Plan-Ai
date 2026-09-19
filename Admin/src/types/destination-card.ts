export type DestinationData = {
  id: string;
  slug: string;
  name: string;
  region: string;
  image: string;
  rating: number;
  reviewCount: string;
  budget: string;
  budgetNumber: number;
  duration: string;
  bestTime: string;
  styles: string[];
  aiMatch: number;
  trending?: boolean;
  featured?: boolean;
};