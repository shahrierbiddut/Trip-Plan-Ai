/* ============================================================
   TRAVELER STORIES DATA
   Real Stories section data.
   Images use existing photos from public/assets/.
============================================================ */

export type TravelerStory = {
  id: string;
  title: string;
  destination: string;
  duration: string;
  travelStyle: string;
  budget: string;
  rating: number;
  story: string;
  travelerName: string;
  travelerLocation: string;
  travelerAvatar: string;
  image: string;
  href: string;
};

export const travelerStories: TravelerStory[] = [
  {
    id: "weekend-by-the-sea",
    title: "A Weekend by the Sea",
    destination: "Cox's Bazar",
    duration: "2 Days",
    travelStyle: "Family",
    budget: "৳12,500",
    rating: 4.8,
    story:
      "A simple weekend escape filled with sunset walks, fresh seafood and scenic Marine Drive moments.",
    travelerName: "Nusrat Jahan",
    travelerLocation: "Dhaka, Bangladesh",
    travelerAvatar: "/assets/avatar-1.svg",
    image: "/assets/Coxs/cover-3.jpg",
    href: "/inspiration/stories",
  },
  {
    id: "into-the-hills",
    title: "Into the Hills",
    destination: "Bandarban",
    duration: "3 Days",
    travelStyle: "Adventure",
    budget: "৳9,800",
    rating: 4.9,
    story:
      "Mountain trails, quiet viewpoints and one of our most memorable adventures in the hills of Bandarban.",
    travelerName: "Rifat Ahmed",
    travelerLocation: "Chattogram, Bangladesh",
    travelerAvatar: "/assets/avatar-2.svg",
    image: "/assets/Bandarban/images 1.jfif",
    href: "/inspiration/stories",
  },
  {
    id: "slow-days-in-sajek",
    title: "Slow Days in Sajek",
    destination: "Sajek Valley",
    duration: "3 Days",
    travelStyle: "Nature",
    budget: "৳11,200",
    rating: 4.8,
    story:
      "Peaceful mornings, cloudy hills and the perfect escape from city life. Sajek offers pure tranquility.",
    travelerName: "Tahmid Hasan",
    travelerLocation: "Dhaka, Bangladesh",
    travelerAvatar: "/assets/avatar-1.svg",
    image: "/assets/Sajek/cover-3.jpg",
    href: "/inspiration/stories",
  },
];
