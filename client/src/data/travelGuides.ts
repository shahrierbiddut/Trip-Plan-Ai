export type TravelGuide = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  minutes: number;
  tags: string[];
  sections: { title: string; text: string }[];
};

// Editorial preparation guides. No live prices, schedules or verification claims.
export const travelGuides: TravelGuide[] = [
  {
    id: "first-coxs-bazar", title: "Your first trip to Cox’s Bazar, made simple",
    description: "Getting there, choosing your base and leaving room to slow down.",
    category: "First trip", image: "/assets/Coxs/cover-2.jpg", minutes: 4,
    tags: ["First trip", "Beaches", "Getting there", "Family & solo"],
    sections: [
      { title: "Start with the journey", text: "Choose your starting city, travel dates and arrival window before booking a stay. Compare the full journey, including the transfer from your arrival point to the hotel. Confirm the current departure point, luggage allowance and return arrangements with your operator." },
      { title: "Choose a useful base", text: "Decide whether easy access to food and transport or a quieter setting matters more. Ask the property for its exact map pin, room arrangement, check-in time and complete payable amount. Confirm these details in writing before sending an advance." },
      { title: "Keep the first day gentle", text: "Leave space to check in, eat and rest after the journey. Group nearby stops together instead of trying to cover every attraction. Check local beach instructions and conditions on arrival; do not treat a suggested itinerary as confirmation that an activity is operating." },
      { title: "Make a complete budget", text: "List return travel, room nights, meals, local transfers and optional activities separately. Mark which amounts are per person and which are shared. Keep an extra buffer and save your booking confirmations where you can access them offline." },
    ],
  },
  {
    id: "group-budget", title: "A friends’ trip without the budget stress",
    description: "Agree on the essentials, split shared costs and enjoy the journey.",
    category: "Budget", image: "/assets/Sajek/Thinking/Chander Gari Ride.jfif", minutes: 3,
    tags: ["Budget travel", "Budget", "Weekend"],
    sections: [
      { title: "Agree before anyone books", text: "Ask each person for a comfortable total spending limit. Agree on transport, room sharing and the activities everyone wants. Keep optional extras separate so nobody feels pressured to spend more." },
      { title: "Separate shared and personal costs", text: "Put rooms and hired transport in a shared list. Track individual meals, shopping and optional activities separately. For each payment, record who paid, the amount and which people should share it." },
      { title: "Assign small responsibilities", text: "One person can coordinate transport, another accommodation and another the expense list. Share booking confirmations with the whole group. Agree on cancellation and refund responsibilities before collecting money." },
      { title: "Settle with a clear record", text: "Review expenses together during the trip and settle the final balance after checking receipts. Keep a small agreed group buffer; return any unused amount using the same split you agreed at the start." },
    ],
  },
  {
    id: "family-travel", title: "Little travelers. Big adventures.",
    description: "A calmer family trip starts with a little extra breathing room.",
    category: "Family & solo", image: "/assets/jaflong/cover-1.jpg", minutes: 3,
    tags: ["Family & solo", "First trip"],
    sections: [
      { title: "Plan around your family", text: "Ask everyone about walking comfort, preferred meal times and rest needs. Choose a small number of main activities and leave flexible time between them. Include the transfer time when deciding whether a day feels manageable." },
      { title: "Ask specific accommodation questions", text: "Confirm bed arrangements, stairs or lift access, bathroom setup and the distance to food. Ask about any accessibility needs directly rather than relying on a general family-friendly label." },
      { title: "Pack for the journey itself", text: "Keep water, familiar snacks, a change of clothes and personal essentials easy to reach. Download booking details and useful contact numbers. Share the plan with your group so one person is not responsible for remembering everything." },
      { title: "Give yourself permission to skip", text: "A shorter outing and a comfortable return can be better than completing every stop. Keep an easy alternative near your accommodation, and review the next day’s plan together each evening." },
    ],
  },
  {
    id: "sajek-preparation", title: "Sajek: before you head for the hills",
    description: "A thoughtful starting point for your first hill getaway.",
    category: "Getting there", image: "/assets/Sajek/cover-1.jpg", minutes: 4,
    tags: ["Hills", "First trip", "Getting there"],
    sections: [
      { title: "Confirm access before committing", text: "Before booking, ask your accommodation and transport provider about current access requirements, road conditions and any local travel restrictions. Check again shortly before departure. A saved guide cannot confirm that a route is open today." },
      { title: "Arrange the whole transfer", text: "Confirm where your onward vehicle meets you, how luggage will be carried, who to contact and what happens if your first transport is late. Ask whether the quote covers the return journey and any waiting time." },
      { title: "Check what your stay includes", text: "Ask about meals, water, electricity arrangements and room facilities that matter to you. Save the property’s contact and arrival directions offline. Bring the identification your providers require." },
      { title: "Leave room for changing conditions", text: "Keep arrival and departure days light. Confirm local advice before heading to viewpoints or unfamiliar paths. If conditions change, choose a shorter outing or remain at your accommodation instead of forcing the original plan." },
    ],
  },
  {
    id: "sylhet-weekend", title: "Sylhet on a weekend",
    description: "Fewer stops, a better pace and time to enjoy the view.",
    category: "Getting there", image: "/assets/Sylhet/cover-1.jpg", minutes: 3,
    tags: ["Weekend", "Getting there", "Budget travel"],
    sections: [
      { title: "Pick one main experience", text: "Choose what matters most: a relaxed city stay, tea landscapes or a waterside outing. Select your base around that choice. Avoid treating every place in the region as a quick stop from the same hotel." },
      { title: "Count travel time honestly", text: "Write down your actual arrival and departure times. Subtract check-in, meals and rest before adding activities. Confirm the time and cost of local transfers with your provider for your chosen dates." },
      { title: "Build a flexible second day", text: "Keep the day closest to your return journey easy to shorten. Save an indoor or nearby alternative, and check conditions and availability before paying for an outing." },
    ],
  },
  {
    id: "rainy-day", title: "Rainy days, better backup plans",
    description: "A flexible plan can still make a memorable getaway.",
    category: "Seasonal", image: "/assets/Sylhet/cover-3.jpg", minutes: 3,
    tags: ["Seasonal", "Hills", "Weekend"],
    sections: [
      { title: "Keep your bookings flexible", text: "Read cancellation and rescheduling terms before paying. Ask how the operator handles a disrupted outing and keep written confirmation. Check the forecast and local instructions shortly before travel." },
      { title: "Create a nearby alternative", text: "Save a relaxed food stop, an indoor activity or a rest day option near your accommodation. Confirm opening hours directly. Avoid replacing a cancelled trip with another unfamiliar route without checking conditions." },
      { title: "Protect the essentials", text: "Pack a water-resistant pouch for documents and electronics, spare dry clothes and suitable footwear. If local authorities or operators advise against an outing, postpone it and use your backup plan." },
    ],
  },
  {
    id: "booking-stay", title: "Booking a stay? Ask these first",
    description: "The small questions that make check-in feel much simpler.",
    category: "Budget", image: "/assets/Sajek/Resort/Premium Resort.jfif", minutes: 3,
    tags: ["Budget", "Budget travel", "First trip", "Family & solo"],
    sections: [
      { title: "Confirm the actual room", text: "Ask for the room type, number of beds, guest capacity and any features you specifically need. Check whether photos show that room type. Confirm check-in, check-out and early arrival arrangements." },
      { title: "Ask for the final amount", text: "Request a written total including taxes, extra beds and other mandatory charges. Clarify breakfast, parking and any advance payment. Review cancellation terms and keep a payment receipt." },
      { title: "Check the location and contact", text: "Confirm the exact property location and official contact details through more than one reliable channel. Work out how you will reach it from your arrival point. Share your arrival time and ask whom to call if you are delayed." },
    ],
  },
  {
    id: "solo-preparation", title: "Your own pace. Your own adventure.",
    description: "Simple preparation for a more confident solo journey.",
    category: "Family & solo", image: "/assets/Coxs/Thinking/Beach Walk.jfif", minutes: 3,
    tags: ["Family & solo", "First trip", "Beaches"],
    sections: [
      { title: "Make arrival straightforward", text: "Choose an arrival window that gives you time to find your accommodation comfortably. Arrange the first transfer in advance if needed, and keep the booking and directions available offline." },
      { title: "Keep a trusted person informed", text: "Share your main itinerary and accommodation contact with someone you trust. Agree on a check-in routine that works for you. Avoid posting your exact live location publicly." },
      { title: "Choose your own pace", text: "Plan one main activity and a flexible option each day. Confirm local guidance and access conditions before exploring unfamiliar areas. You can change a plan whenever you feel uncomfortable." },
    ],
  },
];
