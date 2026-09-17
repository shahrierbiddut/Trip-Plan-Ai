export type PublishedStory = {
  slug: string;
  title: string;
  destination: string;
  category: "People & culture" | "Adventure" | "Slow travel" | "River life";
  kind: "First-person account" | "Travel feature";
  author: string | null;
  publisher: string;
  published: string;
  sourceTitle: string;
  sourceUrl: string;
  excerpt: string;
  paragraphs: string[];
  takeaway: string;
  moment: string;
  image?: string;
  imageNote: string;
  motif: "hills" | "waterfall" | "river" | "heritage" | "train";
};

export const researchDate = "2026-09-11";

// Short original summaries of linked publications, not community submissions.
// Historical prices, availability, safety claims and invented engagement are excluded.
export const publishedStories: PublishedStory[] = [
  {
    slug: "jaflong-through-a-local-door",
    title: "A different Jaflong, through a local door",
    destination: "Jaflong, Sylhet",
    category: "People & culture",
    kind: "First-person account",
    author: "Eliza Binte Elahi",
    publisher: "The Business Standard",
    published: "2026-01-07",
    sourceTitle: "A homestay journey into Jaflong’s Khasi Punjee",
    sourceUrl: "https://www.tbsnews.net/features/explorer/homestay-journey-jaflongs-khasi-punjee-1328476",
    excerpt: "Beyond the familiar river views, a homestay brings the people of Jaflong into focus.",
    paragraphs: [
      "Eliza Binte Elahi describes staying with a Khasi host family after learning about a community tourism initiative. Her account follows the crossing into the village, meals in a family-run restaurant and time spent with a local guide.",
      "The story turns towards betel gardens, household traditions and the work behind hosting visitors. It presents a visit shaped by conversation and everyday life, rather than a list of photo stops.",
    ],
    takeaway: "Let hosts explain their customs, and ask permission before entering private spaces or taking portraits.",
    moment: "A shared meal becomes a way to understand the people behind a destination.",
    image: "/assets/jaflong/cover-1.jpg",
    imageNote: "Jaflong destination image from the project collection; not a photograph of the author’s visit.",
    motif: "river",
  },
  {
    slug: "kindness-on-a-rainy-trail",
    title: "The kindness that outlasted the waterfall",
    destination: "Khoiyachora, Chattogram",
    category: "Adventure",
    kind: "First-person account",
    author: "Samin Yasar Anabil",
    publisher: "The Business Standard",
    published: "2024-09-27",
    sourceTitle: "An unexpected encounter on a blurry path",
    sourceUrl: "https://www.tbsnews.net/features/explorer/unexpected-encounter-blurry-path-951641",
    excerpt: "Lost glasses, a muddy trek and a stranger whose kindness became the lasting memory.",
    paragraphs: [
      "Samin Yasar Anabil recalls a trip with three friends. After losing his glasses while kayaking at Mohamaya Lake, he struggled to see his footing on a wet trail towards Khoiyachora waterfall.",
      "Other trekkers noticed his difficulty and offered help. His reflection centres on that brief human connection, which became more memorable than the destination. The article was published in 2024 and describes a trip roughly two years earlier.",
    ],
    takeaway: "Reconsider an activity when essential equipment is lost; someone else’s completed trek is not a safety guarantee.",
    moment: "An unfamiliar face on a difficult path becomes the heart of the story.",
    imageNote: "Original decorative trail illustration; not a photograph of Khoiyachora or the reported incident.",
    motif: "waterfall",
  },
  {
    slug: "bandarban-beyond-the-viewpoints",
    title: "Following the quieter side of Bandarban",
    destination: "Bandarban, Chattogram",
    category: "Adventure",
    kind: "Travel feature",
    author: "U She Thowai Marma",
    publisher: "The Business Standard",
    published: "2025-11-13",
    sourceTitle: "Into the hills: A journey through the heart of Bandarban",
    sourceUrl: "https://www.tbsnews.net/features/explorer/hills-journey-through-heart-bandarban-1284691",
    excerpt: "River journeys, food and everyday village life give the hills a different perspective.",
    paragraphs: [
      "U She Thowai Marma’s feature explores Bandarban through the Sangu River, communities near the town and roads towards the hills. The writing draws attention to local food and the lived landscape between familiar viewpoints.",
      "It also describes more remote outings. Those descriptions belong to the publication’s 2025 context; this summary does not carry forward its fares, travel instructions or statements about guide requirements.",
    ],
    takeaway: "Confirm current access and guide arrangements locally before choosing an outing in the hills.",
    moment: "The spaces between the viewpoints have stories of their own.",
    image: "/assets/Bandarban/images 1.jfif",
    imageNote: "Bandarban destination image from the project collection; not a photograph supplied by this author.",
    motif: "hills",
  },
  {
    slug: "rajshahi-as-a-guest",
    title: "Seeing Rajshahi as a guest",
    destination: "Rajshahi",
    category: "People & culture",
    kind: "First-person account",
    author: "SM Abrar Aowsaf",
    publisher: "The Business Standard",
    published: "2024-12-25",
    sourceTitle: "An ‘otithi’ in Rajshahi",
    sourceUrl: "https://www.tbsnews.net/features/explorer/otithi-rajshahi-1026976",
    excerpt: "A potter’s workshop, local hospitality and a riverside pause change the shape of a city trip.",
    paragraphs: [
      "SM Abrar Aowsaf recounts a visit connected to the launch of BRAC’s Otithi initiative. The group met a community guide, tried pottery and spent time on a Padma river char before exploring heritage sites.",
      "The article also records tiredness from fitting a longer itinerary into fewer days. It is a personal account of an organised visit, not independent proof that the same experience, price or arrangement is available now.",
    ],
    takeaway: "Give workshops and conversations enough time instead of treating every experience as another stop.",
    moment: "Trying a craft makes the destination feel less distant.",
    imageNote: "Original decorative heritage illustration; not a photograph of a particular Rajshahi monument.",
    motif: "heritage",
  },
  {
    slug: "bhimruli-between-the-orchards",
    title: "Between the boats and the guava orchards",
    destination: "Bhimruli, Jhalakathi",
    category: "River life",
    kind: "First-person account",
    author: null,
    publisher: "Dhaka Tribune",
    published: "2026-08-15",
    sourceTitle: "Floating orchards of Bhimruli: A southern backwater adventure",
    sourceUrl: "https://www.dhakatribune.com/feature/travel/417473/floating-orchards-of-bhimruli-a-southern",
    excerpt: "A rainy visit follows a floating market into the waterways that sustain it.",
    paragraphs: [
      "This Dhaka Tribune diary follows a visitor from Barisal to Bhimruli and onward by boat into nearby orchard country. On that visit, much of the morning trading rush had passed before the writer arrived.",
      "Rain and modest visitor facilities sit alongside the appeal of the canals. The account connects the scenery with farmers, fruit trading and local boat work. A personal byline was not visible in the accessible article, so attribution remains with the publication.",
    ],
    takeaway: "Ask about the day’s trading rhythm, and remember that a market is also somebody’s workplace.",
    moment: "The orchard journey continues after the busiest boats have left.",
    imageNote: "Original decorative river illustration; not a photograph of Bhimruli’s market.",
    motif: "river",
  },
  {
    slug: "parbatipur-before-dawn",
    title: "The people you meet before dawn",
    destination: "Parbatipur, Dinajpur",
    category: "Slow travel",
    kind: "First-person account",
    author: "Mahmudul Islam",
    publisher: "The Business Standard",
    published: "2026-06-10",
    sourceTitle: "Chasing dawn at Parbatipur, Bangladesh’s legendary railway crossroads",
    sourceUrl: "https://www.tbsnews.net/features/explorer/chasing-dawn-parbatipur-bangladeshs-legendary-railway-crossroads-1459101",
    excerpt: "An overnight station report finds a whole world in the hours between trains.",
    paragraphs: [
      "Mahmudul Islam spends a winter night at Parbatipur Junction observing the station and talking with people there. The account includes workers, a helpful local companion and students waiting to continue their journey north.",
      "By morning, an ordinary interchange has become a collection of individual stories. This is a reporter’s particular overnight experience; it does not establish the safety, facilities or train schedules a visitor would encounter today.",
    ],
    takeaway: "Plan your own waiting and onward travel arrangements, while leaving time to notice everyday life.",
    moment: "A journey’s waiting time can hold its most interesting conversations.",
    imageNote: "Original decorative railway illustration; not a photograph of Parbatipur station.",
    motif: "train",
  },
];

export function formatStoryDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export const storyCategories = ["All stories", "People & culture", "Adventure", "Slow travel", "River life"] as const;
