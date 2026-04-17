import { prisma } from "../../db/prisma";

export async function listWines() {
  return prisma.wine.findMany({
    include: {
      winery: true,
      wineAdditives: {
        include: { additive: true },
      },
      workshopWines: {
        include: { workshop: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function listWinesByWinery(wineryId: number) {
  return prisma.wine.findMany({
    where: { wineryId },
    include: {
      winery: true,
      wineAdditives: {
        include: { additive: true },
      },
      workshopWines: {
        include: { workshop: true },
      },
    },
    orderBy: { name: "asc" },
  });
}
