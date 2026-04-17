import { NextResponse } from "next/server";
import {
  addFeedbackEvent,
  getFeedbackEventsBySession,
  getSurveySessionProfile,
  listWineVectors,
  profileToVectors,
  updateCurrentVector,
} from "../../../../lib/data/repositories/matchingRepository";
import { recomputeProfileFromEvents } from "../../../../lib/domain/matching/feedbackEngine";
import { parseFeedbackPayload } from "./validators";

export async function POST(request: Request) {
  try {
    const payload = parseFeedbackPayload(await request.json());

    const profile = await getSurveySessionProfile(payload.sessionId);
    if (!profile) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    await addFeedbackEvent(payload.sessionId, payload.wineId, payload.feedback);

    const [events, wines] = await Promise.all([
      getFeedbackEventsBySession(payload.sessionId),
      listWineVectors(),
    ]);

    const wineById = Object.fromEntries(wines.map((wine) => [wine.id, wine.vector]));
    const { baseline, learningRate } = profileToVectors(profile);

    const recomputed = recomputeProfileFromEvents({
      baselineVector: baseline,
      wineVectorsById: wineById,
      events: events.map((event) => ({ wineId: event.wineId, feedback: event.feedback })),
      learningRate,
      winesForRanking: wines,
    });

    await updateCurrentVector(payload.sessionId, recomputed.updatedVector);

    return NextResponse.json({
      updatedVector: recomputed.updatedVector,
      topMatches: recomputed.ranked.slice(0, 6),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
