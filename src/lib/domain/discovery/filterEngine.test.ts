import { describe, expect, it } from "vitest";
import { applyDiscoveryFilters } from "./filterEngine";

const rows = [
  {
    name: "Wine A",
    wineryId: 1,
    distanceKm: 4.2,
    vintage: 2021,
    alcoholPercent: 13.5,
    color: "red",
    priceRangeMin: 16,
    priceRangeMax: 22,
  },
  {
    name: "Wine B",
    wineryId: 2,
    distanceKm: 12.8,
    vintage: 2022,
    alcoholPercent: 11.5,
    color: "white",
    priceRangeMin: 10,
    priceRangeMax: 14,
  },
  {
    name: "Wine C",
    wineryId: 1,
    distanceKm: 8.1,
    vintage: 2020,
    alcoholPercent: 14.5,
    color: "red",
    priceRangeMin: 26,
    priceRangeMax: 35,
  },
];

describe("applyDiscoveryFilters", () => {
  it("returns all items when no filters are active", () => {
    const output = applyDiscoveryFilters(rows, {});
    expect(output).toHaveLength(3);
  });

  it("applies all enabled filters as AND conditions", () => {
    const output = applyDiscoveryFilters(rows, {
      maxDistanceKm: 10,
      wineryId: 1,
      color: "red",
      minAlcohol: 13,
      maxAlcohol: 14,
      priceMin: 15,
      priceMax: 24,
      vintage: 2021,
    });

    expect(output).toHaveLength(1);
    expect(output[0]?.vintage).toBe(2021);
  });
});
