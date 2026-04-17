import { prisma } from "../../db/prisma";

export async function listWineries() {
  return prisma.winery.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getWineryBySlug(slug: string) {
  return prisma.winery.findUnique({
    where: { slug },
    include: {
      wines: true,
    },
  });
}
