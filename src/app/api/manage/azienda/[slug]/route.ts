import { NextResponse } from "next/server";
import {
  attachWinesToWorkshop,
  getWorkshopBySlug,
  listCatalogWines,
  updateWorkshopProfile,
} from "../../../../../lib/data/repositories/managementRepository";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = await getWorkshopBySlug(slug);

  if (!workshop) {
    return NextResponse.json({ error: "Azienda non trovata" }, { status: 404 });
  }

  const catalog = await listCatalogWines();
  return NextResponse.json({ workshop, catalog });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = (await request.json()) as {
      profile?: {
        name?: string;
        lat?: number;
        lng?: number;
        profileText?: string;
        historyText?: string;
      };
      wineIds?: number[];
    };

    if (body.profile) {
      await updateWorkshopProfile(slug, body.profile);
    }

    if (Array.isArray(body.wineIds)) {
      await attachWinesToWorkshop(slug, body.wineIds);
    }

    const workshop = await getWorkshopBySlug(slug);
    if (!workshop) {
      return NextResponse.json({ error: "Azienda non trovata" }, { status: 404 });
    }

    const catalog = await listCatalogWines();
    return NextResponse.json({ workshop, catalog });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Errore aggiornamento azienda",
      },
      { status: 400 },
    );
  }
}
