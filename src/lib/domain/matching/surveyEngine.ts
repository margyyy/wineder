import { FEATURE_KEYS, type FeatureKey, type FeatureVector } from "./features";
import { buildSurveyVector } from "./vectorMath";
import { questionBank } from "./questionBank";

export type SurveyAnswerInput = {
  questionId: string;
  optionId: string;
};

function findOption(answer: SurveyAnswerInput) {
  const question = questionBank.find((item) => item.id === answer.questionId);
  if (!question) return null;
  const option = question.options.find((item) => item.id === answer.optionId);
  if (!option) return null;
  return option;
}

export function computeFeatureCoverage(): Record<FeatureKey, number> {
  const touchedQuestions = Object.fromEntries(FEATURE_KEYS.map((key) => [key, new Set<string>()])) as Record<FeatureKey, Set<string>>;

  for (const question of questionBank) {
    for (const option of question.options) {
      for (const key of FEATURE_KEYS) {
        if (typeof option.weights[key] === "number") {
          touchedQuestions[key].add(question.id);
        }
      }
    }
  }

  return Object.fromEntries(FEATURE_KEYS.map((key) => [key, touchedQuestions[key].size])) as Record<FeatureKey, number>;
}

export function buildVectorFromSurveyAnswers(answers: SurveyAnswerInput[]) {
  const contributions: Array<Partial<FeatureVector>> = [];

  for (const answer of answers) {
    const option = findOption(answer);
    if (!option) {
      throw new Error(`Invalid answer pair: ${answer.questionId}:${answer.optionId}`);
    }

    const normalized: Partial<FeatureVector> = {};
    for (const key of FEATURE_KEYS) {
      const value = option.weights[key];
      if (typeof value === "number") {
        normalized[key] = value;
      }
    }
    contributions.push(normalized);
  }

  const vector = buildSurveyVector(contributions);
  return {
    vector,
    coverage: computeFeatureCoverage(),
  };
}
