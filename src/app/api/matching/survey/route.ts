import { NextResponse } from "next/server";
import { createSurveySession, listWineVectors } from "../../../../lib/data/repositories/matchingRepository";
import { buildVectorFromSurveyAnswers } from "../../../../lib/domain/matching/surveyEngine";
import { rankWinesBySimilarity } from "../../../../lib/domain/matching/vectorMath";
import { parseSurveyPayload } from "./validators";

export async function POST(request: Request) {
  try {
    const payload = parseSurveyPayload(await request.json());
    const { vector } = buildVectorFromSurveyAnswers(payload.answers);

    const session = await createSurveySession(payload.answers, vector);
    const wines = await listWineVectors();
    const ranked = rankWinesBySimilarity(vector, wines).slice(0, 6);

    const response = NextResponse.json({
      sessionId: session.id,
      vector,
      topMatches: ranked,
    });

    response.cookies.set("survey_session_id", session.id, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
