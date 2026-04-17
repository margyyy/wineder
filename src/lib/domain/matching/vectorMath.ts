import { FEATURE_KEYS, type FeatureVector, zeroVector } from "./features";

export type FeedbackEvent = {
  wineId: number;
  feedback: "LIKE" | "DISLIKE";
};

export type RankedWine = {
  id: number;
  slug: string;
  name: string;
  vector: FeatureVector;
};

export type RankedWineScore = RankedWine & {
  score: number;
};

export function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function buildSurveyVector(
  contributions: Array<Partial<FeatureVector>>,
): FeatureVector {
  const sum = zeroVector();
  const count = zeroVector();

  for (const contribution of contributions) {
    for (const key of FEATURE_KEYS) {
      const current = contribution[key];
      if (typeof current === "number") {
        sum[key] += current;
        count[key] += 1;
      }
    }
  }

  const vector = zeroVector();
  for (const key of FEATURE_KEYS) {
    if (count[key] === 0) {
      vector[key] = 0;
      continue;
    }
    vector[key] = clamp01(sum[key] / count[key]);
  }

  return vector;
}

export function cosineSimilarity(a: FeatureVector, b: FeatureVector): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const key of FEATURE_KEYS) {
    dot += a[key] * b[key];
    normA += a[key] * a[key];
    normB += b[key] * b[key];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  const raw = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  return clamp01(raw);
}

export function rankWinesBySimilarity(
  userVector: FeatureVector,
  wines: RankedWine[],
): RankedWineScore[] {
  return wines
    .map((wine) => ({
      ...wine,
      score: cosineSimilarity(userVector, wine.vector),
    }))
    .sort((a, b) => b.score - a.score);
}

export function applyFeedbackFromBaseline(
  baselineVector: FeatureVector,
  feedbackEvents: FeedbackEvent[],
  wineVectors: Record<number, FeatureVector>,
  learningRate = 0.25,
): FeatureVector {
  const current = { ...baselineVector };

  for (const event of feedbackEvents) {
    const wineVector = wineVectors[event.wineId];
    if (!wineVector) {
      continue;
    }

    const direction = event.feedback === "LIKE" ? 1 : -1;

    for (const key of FEATURE_KEYS) {
      const delta = wineVector[key] - baselineVector[key];
      current[key] = clamp01(current[key] + direction * learningRate * delta);
    }
  }

  return current;
}
