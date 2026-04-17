import {
  getSurveySessionProfile,
  listWineVectors,
  profileToVectors,
} from "./matchingRepository";
import { listWines } from "./wineRepository";
import { applyDiscoveryFilters, type DiscoveryFilters } from "../../domain/discovery/filterEngine";
import { distanceKm, type LatLng } from "../../domain/discovery/haversine";
import { rankWinesBySimilarity } from "../../domain/matching/vectorMath";

export type DiscoverableWine = {
  id: number;
  slug: string;
  name: string;
  wineryId: number;
  wineryName: string;
  wineryLat: number;
  wineryLng: number;
  wineryCategory: string;
  color: string;
  alcoholPercent: number;
  vintage: number;
  priceRangeMin: number;
  priceRangeMax: number;
  distanceKm: number;
  score: number;
  imageUrl: string;
};

export async function listDiscoverableWines(input: {
  sessionId?: string;
  userLocation: LatLng;
  filters: DiscoveryFilters;
  useMatchFilter: boolean;
}) {
  const wines = await listWines();

  let scoreByWineId: Record<number, number> = {};
  if (input.useMatchFilter && input.sessionId) {
    const profile = await getSurveySessionProfile(input.sessionId);
    if (profile) {
      const vectors = await listWineVectors();
      const ranked = rankWinesBySimilarity(profileToVectors(profile).current, vectors);
      scoreByWineId = Object.fromEntries(ranked.map((item) => [item.id, item.score]));
    }
  }

  const projected: DiscoverableWine[] = wines.map((wine) => ({
    id: wine.id,
    slug: wine.slug,
    name: wine.name,
    wineryId: wine.wineryId,
    wineryName: wine.winery.name,
    wineryLat: wine.winery.lat,
    wineryLng: wine.winery.lng,
    wineryCategory: wine.winery.category,
    color: wine.color,
    alcoholPercent: wine.alcoholPercent,
    vintage: wine.vintage,
    priceRangeMin: wine.priceRangeMin,
    priceRangeMax: wine.priceRangeMax,
    distanceKm: distanceKm(input.userLocation, { lat: wine.winery.lat, lng: wine.winery.lng }),
    score: scoreByWineId[wine.id] ?? 0,
    imageUrl: `/images/wine-fallback.svg?slug=${encodeURIComponent(wine.slug)}`,
  }));

  const filtered = applyDiscoveryFilters(projected, input.filters);

  if (input.useMatchFilter) {
    return filtered.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.distanceKm - b.distanceKm;
    });
  }

  return filtered.sort((a, b) => a.distanceKm - b.distanceKm);
}

export async function listWineAvailabilityPoints(slug: string) {
  const wines = await listWines();
  const wine = wines.find((item) => item.slug === slug);

  if (!wine) {
    return null;
  }

  return {
    wine: {
      id: wine.id,
      slug: wine.slug,
      name: wine.name,
      color: wine.color,
      alcoholPercent: wine.alcoholPercent,
      vintage: wine.vintage,
    },
    points: [
      {
        id: wine.winery.id,
        name: wine.winery.name,
        lat: wine.winery.lat,
        lng: wine.winery.lng,
        category: wine.winery.category,
      },
    ],
  };
}
