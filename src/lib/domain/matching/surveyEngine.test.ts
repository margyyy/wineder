import { describe, expect, it } from "vitest";
import { buildVectorFromSurveyAnswers, computeFeatureCoverage } from "./surveyEngine";
import { FEATURE_KEYS } from "./features";

describe("surveyEngine", () => {
  it("provides six questions and full feature coverage", () => {
    const coverage = computeFeatureCoverage();
    for (const key of FEATURE_KEYS) {
      expect(coverage[key]).toBeGreaterThanOrEqual(2);
    }
  });

  it("computes a baseline vector from valid answers", () => {
    const result = buildVectorFromSurveyAnswers([
      { questionId: "coffee-style", optionId: "short-bitter" },
      { questionId: "sparkling-water", optionId: "very-sparkling" },
      { questionId: "fruit-mood", optionId: "red-fruit" },
      { questionId: "aroma-space", optionId: "wood-fire" },
      { questionId: "spice-tolerance", optionId: "love-it" },
      { questionId: "occasion", optionId: "structured" },
    ]);

    expect(result.vector.corpo).toBeGreaterThan(0);
    expect(result.vector.tannini).toBeGreaterThan(0);
    expect(result.vector.effervescenza).toBeGreaterThan(0);
  });

  it("throws on invalid question option pairs", () => {
    expect(() =>
      buildVectorFromSurveyAnswers([{ questionId: "unknown", optionId: "x" }]),
    ).toThrow();
  });
});
