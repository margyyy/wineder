import { prisma } from "../../db/prisma";
import { isWineVerified } from "../../domain/verification/verifiedWine";

export const WORKSHOP_CATEGORIES = ["restaurant", "bar", "club", "winery"] as const;
export type WorkshopCategory = (typeof WORKSHOP_CATEGORIES)[number];

export type CreateWorkshopInput = {
  name: string;
  slug: string;
  category: WorkshopCategory;
  lat: number;
  lng: number;
  profileText?: string;
  historyText?: string;
  wineryId?: number;
};

export async function createWorkshop(input: CreateWorkshopInput) {
  return prisma.workshop.create({
    data: {
      name: input.name,
      slug: input.slug,
      category: input.category,
      lat: input.lat,
      lng: input.lng,
      profileText: input.profileText,
      historyText: input.historyText,
      wineryId: input.wineryId,
    },
  });
}

export async function listWorkshops() {
  return prisma.workshop.findMany({
    include: {
      winery: true,
      workshopWines: {
        include: { wine: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getWorkshopBySlug(slug: string) {
  return prisma.workshop.findUnique({
    where: { slug },
    include: {
      winery: true,
      workshopWines: {
        include: {
          wine: {
            include: {
              wineAdditives: {
                include: { additive: true },
              },
            },
          },
        },
      },
    },
  });
}

export async function getWineryManagementBySlug(slug: string) {
  return prisma.winery.findUnique({
    where: { slug },
    include: {
      wines: {
        include: {
          wineAdditives: {
            include: { additive: true },
          },
        },
      },
      workshops: {
        include: {
          workshopWines: {
            include: { wine: true },
          },
        },
      },
    },
  });
}

export async function updateWorkshopProfile(
  slug: string,
  input: {
    name?: string;
    lat?: number;
    lng?: number;
    profileText?: string | null;
    historyText?: string | null;
  },
) {
  return prisma.workshop.update({
    where: { slug },
    data: {
      name: input.name,
      lat: input.lat,
      lng: input.lng,
      profileText: input.profileText,
      historyText: input.historyText,
    },
  });
}

export async function updateWineryProfile(
  slug: string,
  input: {
    name?: string;
    lat?: number;
    lng?: number;
    historyText?: string | null;
  },
) {
  const winery = await prisma.winery.update({
    where: { slug },
    data: {
      name: input.name,
      lat: input.lat,
      lng: input.lng,
    },
  });

  await prisma.workshop.upsert({
    where: { slug: `${slug}-workshop` },
    create: {
      name: winery.name,
      slug: `${slug}-workshop`,
      category: "winery",
      lat: winery.lat,
      lng: winery.lng,
      historyText: input.historyText,
      wineryId: winery.id,
    },
    update: {
      name: winery.name,
      lat: winery.lat,
      lng: winery.lng,
      historyText: input.historyText,
      wineryId: winery.id,
    },
  });

  return winery;
}

export async function attachWinesToWorkshop(slug: string, wineIds: number[]) {
  const workshop = await prisma.workshop.findUnique({ where: { slug } });
  if (!workshop) {
    throw new Error("Workshop not found");
  }

  await prisma.workshopWine.deleteMany({ where: { workshopId: workshop.id } });

  if (wineIds.length > 0) {
    await prisma.workshopWine.createMany({
      data: wineIds.map((wineId) => ({ workshopId: workshop.id, wineId })),
    });
  }

  return prisma.workshop.findUnique({
    where: { id: workshop.id },
    include: {
      workshopWines: {
        include: { wine: true },
      },
    },
  });
}

export async function updateWineProductionDescription(wineId: number, productionDescription?: string | null) {
  const wine = await prisma.wine.update({
    where: { id: wineId },
    data: { productionDescription: productionDescription ?? null },
    include: {
      wineAdditives: true,
    },
  });

  const verified = isWineVerified({
    productionDescription: wine.productionDescription,
    additiveCount: wine.wineAdditives.length,
  });

  return prisma.wine.update({
    where: { id: wineId },
    data: { isVerified: verified },
    include: {
      wineAdditives: {
        include: { additive: true },
      },
    },
  });
}

export async function assignWineAdditives(wineId: number, additiveIds: number[]) {
  await prisma.wineAdditive.deleteMany({ where: { wineId } });

  if (additiveIds.length > 0) {
    await prisma.wineAdditive.createMany({
      data: additiveIds.map((additiveId) => ({ wineId, additiveId })),
    });
  }

  const wine = await prisma.wine.findUnique({
    where: { id: wineId },
    include: {
      wineAdditives: true,
    },
  });

  if (!wine) {
    throw new Error("Wine not found");
  }

  const verified = isWineVerified({
    productionDescription: wine.productionDescription,
    additiveCount: wine.wineAdditives.length,
  });

  return prisma.wine.update({
    where: { id: wineId },
    data: { isVerified: verified },
    include: {
      wineAdditives: {
        include: { additive: true },
      },
    },
  });
}

export async function listCatalogWines() {
  return prisma.wine.findMany({
    include: {
      winery: true,
      wineAdditives: {
        include: { additive: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function listAdditives() {
  return prisma.additive.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getPublicWineryProfile(slug: string) {
  const workshop = await prisma.workshop.findFirst({
    where: {
      OR: [{ slug }, { slug: `${slug}-workshop` }],
      category: "winery",
    },
    include: {
      winery: true,
      workshopWines: {
        include: {
          wine: {
            include: {
              wineAdditives: {
                include: { additive: true },
              },
            },
          },
        },
      },
    },
  });

  if (!workshop) {
    return null;
  }

  return {
    workshop,
    wines: workshop.workshopWines.map((entry) => entry.wine),
  };
}
