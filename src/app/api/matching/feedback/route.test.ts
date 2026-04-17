import { describe, expect, it } from "vitest";
import { parseFeedbackPayload } from "./validators";

describe("feedback route payload", () => {
  it("parses valid payload", () => {
    const payload = parseFeedbackPayload({
      sessionId: "abc",
      wineId: 1,
      feedback: "LIKE",
    });

    expect(payload.feedback).toBe("LIKE");
  });

  it("rejects invalid payload", () => {
    expect(() => parseFeedbackPayload({ sessionId: "", wineId: 1, feedback: "LIKE" })).toThrow();
    expect(() => parseFeedbackPayload({ sessionId: "ok", wineId: "x", feedback: "LIKE" })).toThrow();
    expect(() => parseFeedbackPayload({ sessionId: "ok", wineId: 1, feedback: "MAYBE" })).toThrow();
  });
});
