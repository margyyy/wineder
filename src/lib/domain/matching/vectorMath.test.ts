import { describe, expect, it } from "vitest";
import { applyFeedbackFromBaseline, buildSurveyVector, cosineSimilarity } from "./vectorMath";
import { zeroVector } from "./features";

describe("vectorMath", () => {
  it("returns 1 for identical vectors", () => {
    const v = {
      ...zeroVector(),
      corpo: 0.8,
      tannini: 0.4,
      fruttato: 0.5,
    };
    expect(cosineSimilarity(v, v)).toBeCloseTo(1, 5);
  });

  it("clamps negative survey contributions to zero", () => {
    const vector = buildSurveyVector([
      { dolcezza: -0.4, tannini: 0.7 },
      { dolcezza: -0.2, tannini: 0.3 },
    ]);

    expect(vector.dolcezza).toBe(0);
    expect(vector.tannini).toBeCloseTo(0.5, 5);
  });

  it("recomputes feedback from baseline without cascading", () => {
    const baseline = {
      ...zeroVector(),
      corpo: 0.3,
      tannini: 0.2,
    };

    const wineVectors = {
      10: {
        ...zeroVector(),
        corpo: 0.9,
        tannini: 0.8,
      },
    };

    const events = [
      { wineId: 10, feedback: "LIKE" as const },
      { wineId: 10, feedback: "LIKE" as const },
    ];

    const once = applyFeedbackFromBaseline(baseline, events, wineVectors, 0.25);
    const twice = applyFeedbackFromBaseline(baseline, events, wineVectors, 0.25);

    expect(once.corpo).toBeCloseTo(twice.corpo, 8);
    expect(once.tannini).toBeCloseTo(twice.tannini, 8);
  });
});
