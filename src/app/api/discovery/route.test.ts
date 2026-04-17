import { describe, expect, it } from "vitest";
import { parseDiscoveryQuery } from "./validators";

describe("discovery route query parser", () => {
  it("parses a valid query", () => {
    const query = parseDiscoveryQuery(
      new URLSearchParams({
        useMatchFilter: "true",
        maxDistanceKm: "12",
        wineryId: "3",
        vintage: "2021",
        minAlcohol: "11.5",
        maxAlcohol: "14.5",
        color: "red",
        priceMin: "10",
        priceMax: "20",
        lat: "45.4",
        lng: "10.9",
      }),
    );

    expect(query.useMatchFilter).toBe(true);
    expect(query.filters.wineryId).toBe(3);
    expect(query.userLocation?.lat).toBe(45.4);
  });

  it("rejects invalid ranges", () => {
    expect(() =>
      parseDiscoveryQuery(new URLSearchParams({ minAlcohol: "15", maxAlcohol: "10" })),
    ).toThrow();

    expect(() =>
      parseDiscoveryQuery(new URLSearchParams({ priceMin: "40", priceMax: "20" })),
    ).toThrow();

    expect(() => parseDiscoveryQuery(new URLSearchParams({ color: "orange" }))).toThrow();
  });
});
