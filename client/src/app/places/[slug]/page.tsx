import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { fetchPlaceBySlug } from "@/lib/api/destination";

export default async function PlaceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resultResponse = await fetchPlaceBySlug(slug);
  
  if (!resultResponse || !resultResponse.success) {
    notFound();
  }

  const { place, destination } = resultResponse.data;

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] pb-20">
      {/* Hero Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full bg-[#17211D]">
        <Image 
          src={place.image} 
          alt={place.title} 
          fill 
          className="object-cover"
          priority
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091C1A] via-[#091C1A]/40 to-black/20" />
        
        {/* Top Navigation Bar (pt-28 pushes it below the global Navbar) */}
        <div className="absolute top-0 left-0 right-0 pt-28 pb-6 px-6 md:px-10 flex justify-between items-center z-[60]">
          <Link href={`/destinations/${destination.slug}`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-xl rounded-full text-white font-bold transition-all text-sm border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 active:scale-95 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to {destination.name} Guide
            </button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2.5 mb-6">
                {place.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full text-[13px] font-extrabold text-white shadow-lg tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-2xl leading-[1.1]">
                {place.title}
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-[#F4A62A] to-[#D9861F] rounded-full mb-6 shadow-[0_0_15px_rgba(244,166,42,0.5)]"></div>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-lg leading-relaxed">
                {place.description}
              </p>
            </div>
            
            {/* Quick Rating Badge */}
            <div className="flex items-center gap-4 bg-black/30 backdrop-blur-2xl border border-white/20 p-5 rounded-3xl shadow-2xl">
               <div className="w-14 h-14 bg-gradient-to-br from-[#F4A62A] via-[#F4A934] to-[#D9861F] rounded-2xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                 <Star className="w-7 h-7 text-white fill-white drop-shadow-md" />
               </div>
               <div className="pr-2">
                 <div className="text-3xl font-extrabold text-white leading-none tracking-tight">{place.rating}</div>
                 <div className="text-[12px] text-white/70 uppercase tracking-widest font-bold mt-1.5">Traveler Rating</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#17211D]/5 border border-[#E2E7E3]/60">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: About & Activities */}
            <div className="lg:col-span-2 space-y-10">
              
              <section>
                <h2 className="text-2xl font-serif text-[#17211D] font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#087F5B]" />
                  About {place.title}
                </h2>
                <div className="prose prose-lg prose-p:text-[#52615A] prose-p:leading-loose max-w-none">
                  {/* @ts-ignore - added longDescription in data */}
                  <p>{place.longDescription || place.description}</p>
                  <p>
                    Whether you are looking for an adventure or just a quiet place to unwind, this location offers an unforgettable experience. Plan your visit during the early morning hours or late afternoon to catch the best natural lighting and avoid peak crowds.
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What Makes It Special */}
                <div className="bg-[#F7F7F2] p-8 rounded-3xl border border-[#E2E7E3]/80 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#17211D] text-xl mb-6 flex items-center gap-2.5">
                    <Star className="w-6 h-6 text-[#F4A62A]" />
                    Special Highlights
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#087F5B] mt-2 shrink-0"></span>
                      <span className="text-[#52615A] text-[15px] leading-relaxed">Unique features that attract visitors globally.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#087F5B] mt-2 shrink-0"></span>
                      <span className="text-[#52615A] text-[15px] leading-relaxed">Highly recommended for <strong>{place.tags.join(" and ")}</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#087F5B] mt-2 shrink-0"></span>
                      <span className="text-[#52615A] text-[15px] leading-relaxed">A pristine environment perfect for making memories.</span>
                    </li>
                  </ul>
                </div>

                {/* Things to Do */}
                <div className="bg-[#F7F7F2] p-8 rounded-3xl border border-[#E2E7E3]/80 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#17211D] text-xl mb-6 flex items-center gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-[#087F5B]" />
                    Things to Do Here
                  </h3>
                  <ul className="space-y-4">
                    {place.tags.slice(0, 3).map((tag: string, i: number) => {
                      let activity = `Discover the unique ${tag.toLowerCase()} aspects.`;
                      switch(tag.toLowerCase()) {
                        case 'relaxation': activity = 'Unwind and relax in the serene environment.'; break;
                        case 'photography': activity = 'Find the perfect angles for breathtaking photos.'; break;
                        case 'nature': activity = 'Immerse yourself in the surrounding natural beauty.'; break;
                        case 'adventure': activity = 'Embark on an exciting physical activity or trek.'; break;
                        case 'culture': activity = 'Learn about the deep-rooted local history.'; break;
                        case 'family': activity = 'Enjoy safe and fun activities suitable for all ages.'; break;
                        case 'must visit': activity = 'Experience the iconic highlights everyone talks about.'; break;
                      }
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#F4A62A] mt-2 shrink-0"></span>
                          <span className="text-[#52615A] text-[15px] leading-relaxed">{activity}</span>
                        </li>
                      );
                    })}
                    {place.tags.length < 3 && (
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#F4A62A] mt-2 shrink-0"></span>
                        <span className="text-[#52615A] text-[15px] leading-relaxed">Take a guided tour to learn more about the area.</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

            </div>
            
            {/* Right Column: AI Insights */}
            <div className="lg:col-span-1">
              <div className="bg-[#E8F3EF] rounded-3xl p-8 border border-[#087F5B]/15">
                <h3 className="font-bold text-[#17211D] text-lg mb-6">Why Visit?</h3>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Perfectly matches your interest in {place.tags[0]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Highly rated ({place.rating}/5) by previous travelers</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Great for photography and scenic views</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href={`/destinations/${destination.slug}`}>
                    <Button className="w-full bg-[#163D36] hover:bg-[#0B2522] text-white font-bold rounded-xl py-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Add to Itinerary
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

