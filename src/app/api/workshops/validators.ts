import { WORKSHOP_CATEGORIES, type WorkshopCategory } from "../../../lib/data/repositories/managementRepository";

export type CreateWorkshopPayload = {
  name: string;
  slug: string;
  category: WorkshopCategory;
  lat: number;
  lng: number;
  profileText?: string;
  historyText?: string;
  wineryId?: number;
};

function parseNumber(value: unknown, field: string): number {
  const num = typeof value === "string" ? Number(value) : value;
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new Error(`Campo ${field} non valido`);
  }
  return num;
}

function parseString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Campo ${field} obbligatorio`);
  }
  return value.trim();
}

export function parseCreateWorkshopPayload(payload: unknown): CreateWorkshopPayload {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Payload non valido");
  }

  const body = payload as Record<string, unknown>;
  const category = parseString(body.category, "category");

  if (!WORKSHOP_CATEGORIES.includes(category as WorkshopCategory)) {
    throw new Error("Categoria workshop non valida");
  }

  return {
    name: parseString(body.name, "name"),
    slug: parseString(body.slug, "slug"),
    category: category as WorkshopCategory,
    lat: parseNumber(body.lat, "lat"),
    lng: parseNumber(body.lng, "lng"),
    profileText: typeof body.profileText === "string" ? body.profileText : undefined,
    historyText: typeof body.historyText === "string" ? body.historyText : undefined,
    wineryId: body.wineryId === undefined ? undefined : parseNumber(body.wineryId, "wineryId"),
  };
}
