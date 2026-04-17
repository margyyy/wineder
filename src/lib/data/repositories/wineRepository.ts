import { unstable_cache } from "next/cache";
import { prisma } from "../../db/prisma";

const WINE_INCLUDE = {
  winery: true,
  wineAdditives: { include: { additive: true } },
  workshopWines: { include: { workshop: true } },
} as const;

export const listWines = unstable_cache(
  async () => {
    return prisma.wine.findMany({
      include: WINE_INCLUDE,
      orderBy: { name: "asc" },
    });
  },
  ["wines-all"],
  { revalidate: 300 }, // cache 5 min
);

export async function listWinesByWinery(wineryId: number) {
  return prisma.wine.findMany({
    where: { wineryId },
    include: WINE_INCLUDE,
    orderBy: { name: "asc" },
  });
}
