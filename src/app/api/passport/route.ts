import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../lib/db/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("survey_session_id")?.value;

  if (!sessionId) {
    return NextResponse.json({ wines: [] });
  }

  const events = await prisma.wineFeedbackEvent.findMany({
    where: { surveySessionId: sessionId, feedback: "LIKE" },
    include: {
      wine: {
        include: { winery: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // deduplicate by wineId, keep most recent
  const seen = new Set<number>();
  const wines = events
    .filter((e) => {
      if (seen.has(e.wineId)) return false;
      seen.add(e.wineId);
      return true;
    })
    .map((e) => ({
      id: e.wine.id,
      slug: e.wine.slug,
      name: e.wine.name,
      color: e.wine.color,
      vintage: e.wine.vintage,
      wineryId: e.wine.wineryId,
      wineryName: e.wine.winery.name,
      wineryLat: e.wine.winery.lat,
      wineryLng: e.wine.winery.lng,
    }));

  return NextResponse.json({ wines });
}
