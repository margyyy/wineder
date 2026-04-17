export type FeedbackPayload = {
  sessionId: string;
  wineId: number;
  feedback: "LIKE" | "DISLIKE";
};

export function parseFeedbackPayload(input: unknown): FeedbackPayload {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload");
  }

  const maybe = input as {
    sessionId?: unknown;
    wineId?: unknown;
    feedback?: unknown;
  };

  if (typeof maybe.sessionId !== "string" || maybe.sessionId.length === 0) {
    throw new Error("sessionId is required");
  }

  if (typeof maybe.wineId !== "number") {
    throw new Error("wineId must be a number");
  }

  if (maybe.feedback !== "LIKE" && maybe.feedback !== "DISLIKE") {
    throw new Error("feedback must be LIKE or DISLIKE");
  }

  return {
    sessionId: maybe.sessionId,
    wineId: maybe.wineId,
    feedback: maybe.feedback,
  };
}
