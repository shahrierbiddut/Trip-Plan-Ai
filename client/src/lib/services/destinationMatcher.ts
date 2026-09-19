import type { DestinationMatch, ExperienceTag } from "@/types/tripPlan";
import type { DestinationData } from "@/types/destination-card";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function matchDestinations(tags: ExperienceTag[], destinationsData: DestinationData[]): DestinationMatch[] {
  if (tags.length === 0 || destinationsData.length === 0) return [];

  const lowerTags = tags.map((tag) => tag.toLowerCase());

  const scored = destinationsData.map((destination) => {
    const destinationStyles = destination.styles.map((style) => style.toLowerCase());
    const matchedTags = lowerTags.filter((tag) =>
      destinationStyles.some((style) => style.includes(tag) || tag.includes(style)),
    );

    const overlapScore = (matchedTags.length / tags.length) * 100;
    const matchPercent = clamp(Math.round(overlapScore * 0.7 + destination.aiMatch * 0.3), 60, 99);

    const reasons = matchedTags.length
      ? [`Matches your love of ${matchedTags.map((tag) => tags[lowerTags.indexOf(tag)]).join(", ")}`]
      : [`Highly rated destination with a ${destination.aiMatch}% overall traveler match`];

    if (destination.trending) reasons.push("Currently trending with travelers");
    reasons.push(`Typical budget around ${destination.budget} for ${destination.duration}`);

    return { destination, matchPercent, reasons };
  });

  return scored.sort((a, b) => b.matchPercent - a.matchPercent).slice(0, 3);
}
