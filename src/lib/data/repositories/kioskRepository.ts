import { prisma } from "../../db/prisma";

export type KioskPersistedWine = {
  id: number;
  slug: string;
  name: string;
  wineryId: number;
  wineryName: string;
  wineryLat: number;
  wineryLng: number;
  wineryCategory: string;
  color: string;
  alcoholPercent: number;
  vintage: number;
  priceRangeMin: number;
  priceRangeMax: number;
  distanceKm: number;
  score: number;
  imageUrl: string;
};

type KioskPayload = {
  wines: KioskPersistedWine[];
};

export async function createKioskShare(input: {
  code: string;
  sessionId?: string;
  wines: KioskPersistedWine[];
}) {
  return prisma.kioskShare.create({
    data: {
      code: input.code,
      sessionId: input.sessionId,
      payload: JSON.stringify({ wines: input.wines } satisfies KioskPayload),
    },
  });
}

export async function getKioskShareByCode(code: string) {
  const share = await prisma.kioskShare.findUnique({ where: { code } });
  if (!share) {
    return null;
  }

  const parsed = JSON.parse(share.payload) as KioskPayload;
  return {
    code: share.code,
    sessionId: share.sessionId,
    wines: parsed.wines,
    createdAt: share.createdAt,
  };
}
