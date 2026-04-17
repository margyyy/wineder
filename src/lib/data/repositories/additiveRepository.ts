import { prisma } from "../../db/prisma";

export async function listAdditives() {
  return prisma.additive.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getAdditiveByName(name: string) {
  return prisma.additive.findUnique({
    where: { name },
  });
}
