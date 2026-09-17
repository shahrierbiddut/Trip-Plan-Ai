import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import { formatStoryDate, publishedStories, researchDate } from "@/data/researchedTravelStories";
import { StoryArtwork, StoryReveal, StorySave, storyButton, storyShell } from "@/components/inspiration/stories/StoryShared";

export function generateStaticParams() { return publishedStories.map(story => ({ slug: story.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = publishedStories.find(item => item.slug === slug);
  return { title: story ? `${story.title} | TripPlan AI` : "Story not found | TripPlan AI", description: story?.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = publishedStories.find(item => item.slug === slug);
  if (!story) notFound();
  const related = publishedStories.filter(item => item.slug !== story.slug).slice(0, 3);
  return <div className="bg-[#F7F7F2] pb-16 pt-28 text-[#17211D] sm:pt-32">
    <div className={storyShell}><Link href="/inspiration/stories" className="inline-flex items-center gap-2 text-xs font-medium text-[#087F5B]"><ArrowLeft size={15} /> All travel stories</Link>
      <article className="mx-auto mt-8 max-w-4xl">
        <StoryReveal><div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-wider text-[#819077]"><span className="rounded-full bg-[#E7EFE2] px-3 py-1.5 font-semibold text-[#087F5B]">{story.category}</span><span>{story.kind}</span><span>1 min summary</span></div><h1 className="mt-5 max-w-3xl font-serif text-[38px] leading-[1.09] tracking-[-0.04em] sm:text-5xl lg:text-[60px]">{story.title}</h1><p className="mt-5 max-w-2xl text-base leading-8 text-[#6D7D6F]">{story.excerpt}</p><div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#73826F]"><span className="font-semibold text-[#345A42]">Original {story.author ? `author: ${story.author}` : `publication: ${story.publisher}`}</span><span>{formatStoryDate(story.published)}</span><span className="flex items-center gap-1"><MapPin size={12} /> {story.destination}</span></div><figure className="mt-8"><div className="relative aspect-[1.65] overflow-hidden rounded-[22px] bg-[#DDE9DF]"><StoryArtwork story={story} priority /></div><figcaption className="mt-3 text-[10px] leading-5 text-[#8A9485]">{story.imageNote}</figcaption></figure></StoryReveal>
        <div className="mx-auto mt-9 max-w-2xl"><p className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#087F5B]"><BookOpen size={14} /> TripPlan AI editorial summary</p>
          {story.paragraphs.map(paragraph => <p key={paragraph} className="mb-5 text-[16px] leading-8 text-[#425D4B]">{paragraph}</p>)}
          <p className="text-xs text-[#6A7D69]">Source: <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#087F5B] underline underline-offset-4">{story.publisher}, {formatStoryDate(story.published)} <ArrowUpRight size={12} className="inline" /></a></p>
          <aside className="my-8 rounded-2xl border border-[#D9E2D2] bg-[#EBF0E5] p-6"><h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#087F5B]">Our takeaway</h2><p className="mt-3 font-serif text-2xl leading-relaxed text-[#36593C]">{story.takeaway}</p><p className="mt-3 text-[10px] leading-5 text-[#7B8B73]">TripPlan AI’s interpretation, not a quote from the author.</p></aside>
          <section aria-labelledby="original-source" className="border-y border-[#D9E2D2] py-6"><h2 id="original-source" className="font-serif text-2xl">Continue with the original voice.</h2><p className="mt-3 text-sm leading-7 text-[#6B7D67]">{story.sourceTitle}</p><p className="mt-1 text-xs text-[#7D8A76]">{story.author ?? "Personal byline not visible in the accessible article"} · {story.publisher}<br />Published {formatStoryDate(story.published)} · Source checked {formatStoryDate(researchDate)}</p><a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${storyButton} mt-5`}>Read original article <ArrowUpRight size={16} /></a></section>
          <p className="mt-5 text-xs leading-6 text-[#809077]">This summary preserves a published experience, not a live itinerary. Confirm current local access, conditions and arrangements before making plans.</p><div className="mt-6 flex flex-wrap items-center justify-between gap-4"><StorySave slug={story.slug} /><Link href="/plan-trip" className="inline-flex items-center gap-2 text-sm font-semibold text-[#087F5B]">Plan a journey <ArrowRight size={16} /></Link></div>
        </div>
      </article>
      <section className="mt-16 border-t border-[#D9E2D2] pt-10"><h2 className="font-serif text-3xl tracking-tight">Another story, another perspective.</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map(item => <Link key={item.slug} href={`/inspiration/stories/${item.slug}`} className="group overflow-hidden rounded-2xl border border-[#D9E2D2] bg-white/60"><div className="relative aspect-[2]"><StoryArtwork story={item} /></div><div className="p-5"><p className="text-[10px] text-[#8B805A]">{item.destination}</p><h3 className="mt-2 font-serif text-xl leading-tight">{item.title}</h3><p className="mt-3 text-[10px] text-[#798A72]">{item.publisher}</p></div></Link>)}</div></section>
    </div>
  </div>;
}
