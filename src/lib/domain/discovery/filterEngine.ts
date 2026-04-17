export type DiscoveryFilters = {
  maxDistanceKm?: number;
  wineryId?: number;
  vintage?: number;
  minAlcohol?: number;
  maxAlcohol?: number;
  color?: string;
  priceMin?: number;
  priceMax?: number;
};

export type FilterableDiscoveryRow = {
  wineryId: number;
  distanceKm: number;
  vintage: number;
  alcoholPercent: number;
  color: string;
  priceRangeMin: number;
  priceRangeMax: number;
};

export function applyDiscoveryFilters<T extends FilterableDiscoveryRow>(
  items: T[],
  filters: DiscoveryFilters,
): T[] {
  return items.filter((item) => {
    if (typeof filters.maxDistanceKm === "number" && item.distanceKm > filters.maxDistanceKm) {
      return false;
    }

    if (typeof filters.wineryId === "number" && item.wineryId !== filters.wineryId) {
      return false;
    }

    if (typeof filters.vintage === "number" && item.vintage !== filters.vintage) {
      return false;
    }

    if (typeof filters.minAlcohol === "number" && item.alcoholPercent < filters.minAlcohol) {
      return false;
    }

    if (typeof filters.maxAlcohol === "number" && item.alcoholPercent > filters.maxAlcohol) {
      return false;
    }

    if (typeof filters.color === "string" && filters.color.length > 0 && item.color !== filters.color) {
      return false;
    }

    if (typeof filters.priceMin === "number" && item.priceRangeMax < filters.priceMin) {
      return false;
    }

    if (typeof filters.priceMax === "number" && item.priceRangeMin > filters.priceMax) {
      return false;
    }

    return true;
  });
}
