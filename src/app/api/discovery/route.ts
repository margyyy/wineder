import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { listDiscoverableWines } from "../../../lib/data/repositories/discoveryRepository";
import { parseDiscoveryQuery } from "./validators";

const VERONA_CENTER = {
  lat: 45.4384,
  lng: 10.9916,
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = parseDiscoveryQuery(url.searchParams);

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("survey_session_id")?.value;

    const wines = await listDiscoverableWines({
      sessionId,
      userLocation: query.userLocation ?? VERONA_CENTER,
      filters: query.filters,
      useMatchFilter: query.useMatchFilter,
    });

    return NextResponse.json({
      filters: query.filters,
      useMatchFilter: query.useMatchFilter,
      count: wines.length,
      wines,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid discovery query" },
      { status: 400 },
    );
  }
}
