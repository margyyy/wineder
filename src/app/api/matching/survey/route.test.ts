import { describe, expect, it } from "vitest";
import { parseSurveyPayload } from "./validators";

describe("survey route payload", () => {
  it("parses valid payload", () => {
    const payload = parseSurveyPayload({
      answers: [{ questionId: "q1", optionId: "a1" }],
    });

    expect(payload.answers).toHaveLength(1);
  });

  it("rejects invalid payload", () => {
    expect(() => parseSurveyPayload({ answers: [] })).toThrow();
    expect(() => parseSurveyPayload(null)).toThrow();
  });
});
