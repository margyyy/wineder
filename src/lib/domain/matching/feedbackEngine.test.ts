import { describe, expect, it } from "vitest";
import { zeroVector } from "./features";
import { recomputeProfileFromEvents } from "./feedbackEngine";

describe("feedbackEngine", () => {
  it("moves toward wine vector on like and away on dislike", () => {
    const baseline = { ...zeroVector(), corpo: 0.3, tannini: 0.3 };
    const wineVectorsById = {
      1: { ...zeroVector(), corpo: 0.9, tannini: 0.9 },
      2: { ...zeroVector(), corpo: 0.8, tannini: 0.8 },
    };

    const wines = [
      { id: 1, slug: "one", name: "One", vector: wineVectorsById[1] },
      { id: 2, slug: "two", name: "Two", vector: wineVectorsById[2] },
    ];

    const liked = recomputeProfileFromEvents({
      baselineVector: baseline,
      wineVectorsById,
      events: [{ wineId: 1, feedback: "LIKE" }],
      winesForRanking: wines,
    });

    expect(liked.updatedVector.corpo).toBeGreaterThan(baseline.corpo);

    const disliked = recomputeProfileFromEvents({
      baselineVector: baseline,
      wineVectorsById,
      events: [{ wineId: 2, feedback: "DISLIKE" }],
      winesForRanking: wines,
    });

    expect(disliked.updatedVector.corpo).toBeLessThanOrEqual(baseline.corpo);
  });

  it("recomputes deterministically from baseline", () => {
    const baseline = { ...zeroVector(), fruttato: 0.4 };
    const wineVectorsById = {
      7: { ...zeroVector(), fruttato: 0.8 },
    };
    const events = [
      { wineId: 7, feedback: "LIKE" as const },
      { wineId: 7, feedback: "LIKE" as const },
    ];

    const wines = [{ id: 7, slug: "w", name: "W", vector: wineVectorsById[7] }];
    const a = recomputeProfileFromEvents({ baselineVector: baseline, wineVectorsById, events, winesForRanking: wines });
    const b = recomputeProfileFromEvents({ baselineVector: baseline, wineVectorsById, events, winesForRanking: wines });

    expect(a.updatedVector.fruttato).toBeCloseTo(b.updatedVector.fruttato, 8);
  });
});
