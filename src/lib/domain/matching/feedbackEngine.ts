import type { FeatureVector } from "./features";
import { applyFeedbackFromBaseline, rankWinesBySimilarity, type FeedbackEvent, type RankedWine } from "./vectorMath";

export function recomputeProfileFromEvents(args: {
  baselineVector: FeatureVector;
  wineVectorsById: Record<number, FeatureVector>;
  events: FeedbackEvent[];
  learningRate?: number;
  winesForRanking: RankedWine[];
}) {
  const learningRate = args.learningRate ?? 0.25;
  const updatedVector = applyFeedbackFromBaseline(
    args.baselineVector,
    args.events,
    args.wineVectorsById,
    learningRate,
  );

  const ranked = rankWinesBySimilarity(updatedVector, args.winesForRanking);

  return {
    updatedVector,
    ranked,
  };
}
