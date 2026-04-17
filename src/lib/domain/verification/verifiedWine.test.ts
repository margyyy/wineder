import { describe, expect, it } from "vitest";
import { isWineVerified } from "./verifiedWine";

describe("isWineVerified", () => {
  it("returns true when production description and additives are present", () => {
    expect(isWineVerified({ productionDescription: "Fermentazione lenta", additiveCount: 1 })).toBe(true);
  });

  it("returns false when production description is missing", () => {
    expect(isWineVerified({ productionDescription: "", additiveCount: 2 })).toBe(false);
    expect(isWineVerified({ productionDescription: null, additiveCount: 2 })).toBe(false);
  });

  it("returns false when additive count is zero", () => {
    expect(isWineVerified({ productionDescription: "ok", additiveCount: 0 })).toBe(false);
  });
});
