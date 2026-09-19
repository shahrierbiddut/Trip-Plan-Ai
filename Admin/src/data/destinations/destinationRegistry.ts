import { coxsBazarData } from "./coxsBazar";
import { sajekValleyData } from "./sajekValley";
import { saintMartinData } from "./saintMartin";
import { sundarbanData } from "./sundarban";
import { sreemangalData } from "./sreemangal";
import { sylhetData } from "./sylhet";
import { jaflongData } from "./jaflong";
import { kuakataData } from "./kuakata";
import { rangamatiData } from "./rangamati";
import { bandarbanData } from "./bandarban";

const registry: Record<string, any> = {
  "coxs-bazar": coxsBazarData,
  "sajek-valley": sajekValleyData,
  "saint-martin": saintMartinData,
  "sundarban": sundarbanData,
  "sreemangal": sreemangalData,
  "sylhet": sylhetData,
  "jaflong": jaflongData,
  "kuakata": kuakataData,
  "rangamati": rangamatiData,
  "bandarban": bandarbanData,
};

export function getDestinationBySlug(slug: string) {
  return registry[slug] || null;
}

export function getPlaceWithDestinationBySlug(placeSlug: string) {
  for (const [destSlug, destData] of Object.entries(registry)) {
    const place = destData.placesToExplore?.find((p: any) => p.slug === placeSlug);
    if (place) {
      return { place, destination: destData };
    }
  }
  return null;
}
