import type { DiscoveryFilters } from "../../../lib/domain/discovery/filterEngine";

const VALID_COLORS = new Set(["red", "white", "rose"]);
const VALID_ALCOHOL_CATS = new Set(["no-alcol", "low-alcol"]);

function parseNumber(raw: string | null, key: string) {
  if (raw === null || raw.length === 0) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`Invalid numeric value for ${key}`);
  return value;
}

export type DiscoveryQuery = {
  useMatchFilter: boolean;
  userLocation?: { lat: number; lng: number };
  filters: DiscoveryFilters;
};

export function parseDiscoveryQuery(searchParams: URLSearchParams): DiscoveryQuery {
  const useMatchRaw = searchParams.get("useMatchFilter");
  const useMatchFilter = useMatchRaw ? useMatchRaw !== "false" : true;

  const color = searchParams.get("color") ?? undefined;
  if (color && !VALID_COLORS.has(color)) throw new Error("Invalid color filter");

  const alcoholCategoryRaw = searchParams.get("alcoholCategory") ?? undefined;
  if (alcoholCategoryRaw && !VALID_ALCOHOL_CATS.has(alcoholCategoryRaw)) {
    throw new Error("Invalid alcoholCategory filter");
  }
  const alcoholCategory = alcoholCategoryRaw as DiscoveryFilters["alcoholCategory"];

  const search = searchParams.get("search") ?? undefined;

  const lat = parseNumber(searchParams.get("lat"), "lat");
  const lng = parseNumber(searchParams.get("lng"), "lng");

  const filters: DiscoveryFilters = {
    maxDistanceKm: parseNumber(searchParams.get("maxDistanceKm"), "maxDistanceKm"),
    wineryId: parseNumber(searchParams.get("wineryId"), "wineryId"),
    vintage: parseNumber(searchParams.get("vintage"), "vintage"),
    minAlcohol: parseNumber(searchParams.get("minAlcohol"), "minAlcohol"),
    maxAlcohol: parseNumber(searchParams.get("maxAlcohol"), "maxAlcohol"),
    color,
    priceMin: parseNumber(searchParams.get("priceMin"), "priceMin"),
    priceMax: parseNumber(searchParams.get("priceMax"), "priceMax"),
    alcoholCategory,
    search: search?.trim() || undefined,
  };

  if (typeof filters.maxDistanceKm === "number" && filters.maxDistanceKm < 0) {
    throw new Error("maxDistanceKm must be >= 0");
  }

  if (
    typeof filters.minAlcohol === "number" &&
    typeof filters.maxAlcohol === "number" &&
    filters.minAlcohol > filters.maxAlcohol
  ) {
    throw new Error("minAlcohol cannot be greater than maxAlcohol");
  }

  if (
    typeof filters.priceMin === "number" &&
    typeof filters.priceMax === "number" &&
    filters.priceMin > filters.priceMax
  ) {
    throw new Error("priceMin cannot be greater than priceMax");
  }

  if ((lat === undefined) !== (lng === undefined)) {
    throw new Error("lat and lng must be provided together");
  }

  return {
    useMatchFilter,
    userLocation: lat !== undefined && lng !== undefined ? { lat, lng } : undefined,
    filters,
  };
}
