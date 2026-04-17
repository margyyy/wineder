export type SurveyPayload = {
  answers: Array<{ questionId: string; optionId: string }>;
};

export function parseSurveyPayload(input: unknown): SurveyPayload {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload");
  }

  const maybe = input as { answers?: unknown };
  if (!Array.isArray(maybe.answers) || maybe.answers.length === 0) {
    throw new Error("answers is required");
  }

  return {
    answers: maybe.answers.map((answer) => {
      if (!answer || typeof answer !== "object") {
        throw new Error("Invalid answer item");
      }
      const row = answer as { questionId?: unknown; optionId?: unknown };
      if (typeof row.questionId !== "string" || typeof row.optionId !== "string") {
        throw new Error("questionId and optionId must be strings");
      }
      return {
        questionId: row.questionId,
        optionId: row.optionId,
      };
    }),
  };
}
