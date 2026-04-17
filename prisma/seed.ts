import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedWine = {
  name: string;
  slug: string;
  color: "red" | "white";
  alcoholPercent: number;
  vintage: number;
  bodyScore: number;
  aromaTags: string;
  priceRangeMin: number;
  priceRangeMax: number;
};

type SeedWinery = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  category: "winery";
  wines: SeedWine[];
};

// Some wine descriptors are estimated for MVP demo when public data is incomplete.
const wineries: SeedWinery[] = [
  {
    name: "Pasqua Wine",
    slug: "pasqua-wine",
    lat: 45.4384,
    lng: 10.9916,
    category: "winery",
    wines: [
      {
        name: "11 Minutes Rose",
        slug: "pasqua-11-minutes-rose",
        color: "red",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "rose,floral,red-fruit,citrus",
        priceRangeMin: 11,
        priceRangeMax: 15,
      },
      {
        name: "Hey French You Could Have Made This But You Did Not",
        slug: "pasqua-hey-french",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "cherry,spice,oak,blackberry",
        priceRangeMin: 32,
        priceRangeMax: 45,
      },
      {
        name: "PassioneSentimento Rosso",
        slug: "pasqua-passionesentimento-rosso",
        color: "red",
        alcoholPercent: 14,
        vintage: 2022,
        bodyScore: 4,
        aromaTags: "ripe-fruit,plum,vanilla,spice",
        priceRangeMin: 9,
        priceRangeMax: 14,
      },
    ],
  },
  {
    name: "Farina",
    slug: "farina",
    lat: 45.5145,
    lng: 10.8462,
    category: "winery",
    wines: [
      {
        name: "Amarone della Valpolicella Classico",
        slug: "farina-amarone-classico",
        color: "red",
        alcoholPercent: 15,
        vintage: 2019,
        bodyScore: 5,
        aromaTags: "dark-cherry,cocoa,tobacco,spice",
        priceRangeMin: 34,
        priceRangeMax: 50,
      },
      {
        name: "Valpolicella Ripasso Classico Superiore",
        slug: "farina-ripasso-classico-superiore",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "red-fruit,herbs,spice",
        priceRangeMin: 14,
        priceRangeMax: 22,
      },
      {
        name: "Lugana",
        slug: "farina-lugana",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,white-flowers,mineral",
        priceRangeMin: 10,
        priceRangeMax: 16,
      },
    ],
  },
  {
    name: "Albino Armani",
    slug: "albino-armani",
    lat: 45.5608,
    lng: 11.1549,
    category: "winery",
    wines: [
      {
        name: "Pinot Grigio Colle Ara",
        slug: "albino-armani-pinot-grigio-colle-ara",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "pear,white-peach,floral",
        priceRangeMin: 12,
        priceRangeMax: 18,
      },
      {
        name: "Amarone della Valpolicella Cuslanus",
        slug: "albino-armani-amarone-cuslanus",
        color: "red",
        alcoholPercent: 15,
        vintage: 2018,
        bodyScore: 5,
        aromaTags: "black-fruit,cocoa,balsamic,spice",
        priceRangeMin: 38,
        priceRangeMax: 58,
      },
      {
        name: "Foja Tonda",
        slug: "albino-armani-foja-tonda",
        color: "red",
        alcoholPercent: 13.5,
        vintage: 2022,
        bodyScore: 3,
        aromaTags: "cherry,pepper,violet",
        priceRangeMin: 13,
        priceRangeMax: 20,
      },
    ],
  },
  {
    name: "Ca' Rugate",
    slug: "ca-rugate",
    lat: 45.4389,
    lng: 11.2257,
    category: "winery",
    wines: [
      {
        name: "Soave Classico Monte Fiorentine",
        slug: "ca-rugate-soave-classico-monte-fiorentine",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,almond,white-flowers",
        priceRangeMin: 13,
        priceRangeMax: 20,
      },
      {
        name: "Amarone Punta 470",
        slug: "ca-rugate-amarone-punta-470",
        color: "red",
        alcoholPercent: 15,
        vintage: 2019,
        bodyScore: 5,
        aromaTags: "blackberry,spice,cocoa,dried-fruit",
        priceRangeMin: 42,
        priceRangeMax: 62,
      },
      {
        name: "Campo Lavei Valpolicella Superiore",
        slug: "ca-rugate-campo-lavei",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "red-cherry,herbs,spice",
        priceRangeMin: 18,
        priceRangeMax: 28,
      },
    ],
  },
  {
    name: "Zyme",
    slug: "zyme",
    lat: 45.5133,
    lng: 10.8208,
    category: "winery",
    wines: [
      {
        name: "Kairos",
        slug: "zyme-kairos",
        color: "red",
        alcoholPercent: 15,
        vintage: 2020,
        bodyScore: 5,
        aromaTags: "black-fruit,balsamic,cocoa,spice",
        priceRangeMin: 70,
        priceRangeMax: 95,
      },
      {
        name: "From Black to White",
        slug: "zyme-from-black-to-white",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,floral,mineral",
        priceRangeMin: 16,
        priceRangeMax: 24,
      },
      {
        name: "Oseleta",
        slug: "zyme-oseleta",
        color: "red",
        alcoholPercent: 14.5,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "dark-fruit,pepper,earth",
        priceRangeMin: 36,
        priceRangeMax: 52,
      },
    ],
  },
];

async function seedWinery(wineryData: SeedWinery) {
  const winery = await prisma.winery.upsert({
    where: { slug: wineryData.slug },
    create: {
      name: wineryData.name,
      slug: wineryData.slug,
      lat: wineryData.lat,
      lng: wineryData.lng,
      category: wineryData.category,
    },
    update: {
      name: wineryData.name,
      lat: wineryData.lat,
      lng: wineryData.lng,
      category: wineryData.category,
    },
  });

  for (const wineData of wineryData.wines.slice(0, 3)) {
    await prisma.wine.upsert({
      where: { slug: wineData.slug },
      create: {
        ...wineData,
        wineryId: winery.id,
      },
      update: {
        ...wineData,
        wineryId: winery.id,
      },
    });
  }
}

async function main() {
  for (const winery of wineries) {
    await seedWinery(winery);
  }

  const additiveCount = await prisma.additive.count();
  console.log(
    `Seed complete. Wineries: ${wineries.length}, additives: ${additiveCount}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
