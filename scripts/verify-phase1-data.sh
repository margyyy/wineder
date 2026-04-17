#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

npx prisma validate >/dev/null
npx prisma db push >/dev/null
npx prisma db seed >/dev/null

node <<'NODE'
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  const wineryCount = await prisma.winery.count();
  const wineries = await prisma.winery.findMany({ include: { wines: true } });
  const wines = await prisma.wine.findMany();
  const additiveCountCheck = await prisma.additive.count();

  if (wineryCount !== 5) {
    throw new Error(`Expected 5 wineries, got ${wineryCount}`);
  }

  const overLimit = wineries.filter((winery) => winery.wines.length > 3);
  if (overLimit.length > 0) {
    throw new Error(`Found ${overLimit.length} wineries with more than 3 wines`);
  }

  const invalidWine = wines.find(
    (wine) => wine.color == null || wine.alcoholPercent == null || wine.vintage == null,
  );
  if (invalidWine) {
    throw new Error(`Wine ${invalidWine.slug} has missing required matching fields`);
  }

  if (typeof additiveCountCheck !== "number") {
    throw new Error("Additive table is not queryable");
  }

  console.log(`OK wineries=${wineryCount} wines=${wines.length} additives=${additiveCountCheck}`);
})()
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
NODE
