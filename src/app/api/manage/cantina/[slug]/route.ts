import { NextResponse } from "next/server";
import {
  assignWineAdditives,
  attachWinesToWorkshop,
  getWineryManagementBySlug,
  updateWineProductionDescription,
  updateWineryProfile,
} from "../../../../../lib/data/repositories/managementRepository";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const winery = await getWineryManagementBySlug(slug);

  if (!winery) {
    return NextResponse.json({ error: "Cantina non trovata" }, { status: 404 });
  }

  return NextResponse.json({ winery });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = (await request.json()) as {
      profile?: {
        name?: string;
        lat?: number;
        lng?: number;
        historyText?: string;
      };
      workshop?: {
        wineIds?: number[];
      };
      wines?: Array<{
        wineId: number;
        productionDescription?: string;
        additiveIds?: number[];
      }>;
    };

    if (body.profile) {
      await updateWineryProfile(slug, body.profile);
    }

    if (body.workshop?.wineIds) {
      await attachWinesToWorkshop(`${slug}-workshop`, body.workshop.wineIds);
    }

    if (Array.isArray(body.wines)) {
      for (const wine of body.wines) {
        if (typeof wine.wineId !== "number") {
          continue;
        }

        if (wine.productionDescription !== undefined) {
          await updateWineProductionDescription(wine.wineId, wine.productionDescription);
        }

        if (Array.isArray(wine.additiveIds)) {
          await assignWineAdditives(wine.wineId, wine.additiveIds);
        }
      }
    }

    const winery = await getWineryManagementBySlug(slug);
    if (!winery) {
      return NextResponse.json({ error: "Cantina non trovata" }, { status: 404 });
    }

    return NextResponse.json({ winery });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Errore aggiornamento cantina",
      },
      { status: 400 },
    );
  }
}
