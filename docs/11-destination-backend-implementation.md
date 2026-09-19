# Destination Backend Implementation Guide

This document outlines the step-by-step process for migrating the static Destination data into a dynamic MongoDB backend. It assumes that your backend server is already set up and connected to MongoDB via Mongoose.

## Phase 1: Backend Implementation

### Step 1: Create the Mongoose Model
First, create a new file in your backend models directory: `models/Destination.js`.
This schema handles the complex nested structures (hotels, foods, reviews) exactly as the frontend expects.

```javascript
import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: String, default: "Bangladesh" },
  subtitle: String,
  description: String,
  heroImage: String,
  
  rating: Number,
  reviewCount: String,
  aiMatch: Number,
  recommendedStay: String,
  estimatedBudget: Number,
  popularSeason: String,
  tags: [String],

  overview: {
    title: String,
    content: [String],
    image: String,
    videoUrl: String
  },

  whyLoveIt: [{ title: String, description: String, icon: String }],
  
  aiGuide: { match: Number, bestFor: [String], idealTrip: String, travelStyle: String, recommendation: String },
  
  bestTime: [{ season: String, weather: String, recommended: Boolean, icon: String }],
  
  thingsToDo: [{ title: String, description: String, time: String, image: String, type: String }],
  
  placesToExplore: [{ slug: String, title: String, description: String, longDescription: String, image: String, rating: Number, tags: [String] }],
  
  marineDriveFeature: { title: String, description: String, image: String, highlights: [String] },
  
  itinerary: [{ day: String, title: String, description: String, image: String }],
  
  hotels: [{ name: String, category: String, rating: Number, location: String, priceFrom: Number, image: String, amenities: [String] }],
  
  foods: [{ title: String, description: String, price: String, image: String, type: String }],
  
  gallery: [String],
  
  reviews: {
    overall: Number,
    count: Number,
    breakdown: { type: Map, of: Number }, // e.g. {"5": 60, "4": 30}
    list: [{ name: String, avatar: String, rating: Number, date: String, tripType: String, text: String }],
    aiSummary: { loved: [String], concerns: [String], verdict: String }
  },
  
  travelInfo: { gettingThere: { air: String, road: String }, gettingAround: { options: String }, weather: String, safety: String, internet: String, currency: String },
  
  travelTips: [String],
  
  relatedDestinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
```

### Step 2: Create the Controller
Create `controllers/destinationController.js` to handle API requests.

```javascript
import Destination from '../models/Destination.js';

// Get all destinations (Summary for cards/home page)
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({}).select('slug name heroImage rating aiMatch estimatedBudget tags');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destinations", error: error.message });
  }
};

// Get single destination by slug (Detailed view)
export const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const destination = await Destination.findOne({ slug })
      .populate('relatedDestinations', 'slug name heroImage rating aiMatch estimatedBudget');
      
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destination details", error: error.message });
  }
};
```

### Step 3: Create API Routes
Create `routes/destinationRoutes.js` and link it to your main `server.js` or `app.js`.

```javascript
import express from 'express';
import { getAllDestinations, getDestinationBySlug } from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:slug', getDestinationBySlug);

export default router;
```
*In your `server.js`: `app.use('/api/destinations', destinationRoutes);`*


## Phase 2: Frontend Implementation

### Step 4: Update the Fetch Function
Instead of returning local mock data, update your `client/src/data/destinationRegistry.ts` (or create a new service file) to fetch from your backend API.

```typescript
// Replace mock data with this fetch function
export async function fetchDestinationBySlug(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/destinations/${slug}`, {
      // Use 'no-store' during development, switch to 'force-cache' for production
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch destination:", error);
    return null;
  }
}
```

### Step 5: Update the Dynamic Page
Open `client/src/app/destinations/[slug]/page.tsx` and change the data fetching logic.

```typescript
import { fetchDestinationBySlug } from "@/data/destinationRegistry"; // Use the new fetch function
import { notFound } from "next/navigation";
// ... imports ...

export default async function DestinationDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // 1. Fetch data from backend
  const data = await fetchDestinationBySlug(slug);
  
  // 2. Handle 404
  if (!data) {
    return notFound();
  }

  // 3. Render page (No changes needed below this line!)
  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      <DestinationHeroDetails data={data} />
      {/* ... */}
    </div>
  );
}
```

## Phase 3: Data Migration (Seeding)
1. Convert your current TypeScript mock files (`sylhetData.ts`, `coxsBazar.ts`, etc.) into JSON objects.
2. Send a `POST` request to your database using Postman or MongoDB Compass, pasting the JSON objects to insert them as documents in the `destinations` collection.
