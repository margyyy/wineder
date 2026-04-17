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
  dolcezza: number;
  acidita: number;
  tannini: number;
  corpo: number;
  alcol: number;
  effervescenza: number;
  fruttato: number;
  floreale: number;
  speziato: number;
  terroso: number;
  legnoso: number;
  minerale: number;
};

type SeedWinery = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  category: "winery";
  wines: SeedWine[];
};

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
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0.1,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.7,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.4,
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
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.7,
        corpo: 0.8,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.6,
        terroso: 0.4,
        legnoso: 0.7,
        minerale: 0.3,
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
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.2,
        speziato: 0.5,
        terroso: 0.3,
        legnoso: 0.5,
        minerale: 0.2,
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
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.6,
        terroso: 0.6,
        legnoso: 0.7,
        minerale: 0.3,
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
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.6,
        terroso: 0.4,
        legnoso: 0.5,
        minerale: 0.3,
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
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.5,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.7,
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
        dolcezza: 0.2,
        acidita: 0.6,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.6,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.5,
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
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.7,
        terroso: 0.6,
        legnoso: 0.8,
        minerale: 0.3,
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
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.5,
        corpo: 0.5,
        alcol: 0.6,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.4,
        speziato: 0.5,
        terroso: 0.3,
        legnoso: 0.3,
        minerale: 0.3,
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
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.6,
        floreale: 0.5,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.2,
        minerale: 0.7,
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
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.1,
        speziato: 0.7,
        terroso: 0.5,
        legnoso: 0.8,
        minerale: 0.2,
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
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.5,
        terroso: 0.4,
        legnoso: 0.5,
        minerale: 0.3,
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
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.1,
        speziato: 0.8,
        terroso: 0.6,
        legnoso: 0.8,
        minerale: 0.3,
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
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.6,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.8,
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
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.7,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.6,
        terroso: 0.6,
        legnoso: 0.4,
        minerale: 0.2,
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

const additives = [
  {
    name: "Solfiti",
    description: "Conservante usato per stabilita microbiologica e ossidativa del vino.",
  },
  {
    name: "Lieviti selezionati",
    description: "Lieviti impiegati in fermentazione per controllo aromatico e regolarita del processo.",
  },
  {
    name: "Bentonite",
    description: "Agente chiarificante minerale usato per stabilizzare proteine e limpidezza.",
  },
] as const;

const workshops = [
  {
    name: "Enoteca Arena",
    slug: "enoteca-arena",
    category: "bar",
    lat: 45.4402,
    lng: 10.9956,
    profileText: "Wine bar nel centro storico con degustazioni serali.",
    historyText: "Aperto nel 2016 con focus su produttori locali.",
    winerySlug: null,
    wineSlugs: ["pasqua-11-minutes-rose", "farina-lugana"],
  },
  {
    name: "Pasqua Wine",
    slug: "pasqua-wine-workshop",
    category: "winery",
    lat: 45.4384,
    lng: 10.9916,
    profileText: "Profilo pubblico cantina Pasqua.",
    historyText: "Cantina storica veronese.",
    winerySlug: "pasqua-wine",
    wineSlugs: ["pasqua-11-minutes-rose", "pasqua-hey-french", "pasqua-passionesentimento-rosso"],
  },
] as const;

async function seedAdditives() {
  for (const additive of additives) {
    await prisma.additive.upsert({
      where: { name: additive.name },
      create: additive,
      update: additive,
    });
  }
}

async function attachInitialAdditives() {
  const additiveByName = Object.fromEntries(
    (await prisma.additive.findMany()).map((item) => [item.name, item.id]),
  ) as Record<string, number>;

  const mapping: Array<{ wineSlug: string; additiveNames: string[]; productionDescription: string }> = [
    {
      wineSlug: "pasqua-hey-french",
      additiveNames: ["Solfiti", "Lieviti selezionati"],
      productionDescription: "Fermentazione in acciaio e affinamento in legno per struttura e complessita.",
    },
    {
      wineSlug: "farina-amarone-classico",
      additiveNames: ["Solfiti", "Bentonite"],
      productionDescription: "Appassimento tradizionale e affinamento prolungato in botte.",
    },
  ];

  for (const row of mapping) {
    const wine = await prisma.wine.findUnique({ where: { slug: row.wineSlug } });
    if (!wine) {
      continue;
    }

    await prisma.wine.update({
      where: { id: wine.id },
      data: {
        productionDescription: row.productionDescription,
      },
    });

    await prisma.wineAdditive.deleteMany({ where: { wineId: wine.id } });
    await prisma.wineAdditive.createMany({
      data: row.additiveNames
        .map((name) => additiveByName[name])
        .filter((id): id is number => typeof id === "number")
        .map((additiveId) => ({ wineId: wine.id, additiveId })),
    });

    await prisma.wine.update({
      where: { id: wine.id },
      data: {
        isVerified: true,
      },
    });
  }
}

async function seedWorkshops() {
  for (const workshop of workshops) {
    const winery = workshop.winerySlug
      ? await prisma.winery.findUnique({ where: { slug: workshop.winerySlug } })
      : null;

    const record = await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      create: {
        name: workshop.name,
        slug: workshop.slug,
        category: workshop.category,
        lat: workshop.lat,
        lng: workshop.lng,
        profileText: workshop.profileText,
        historyText: workshop.historyText,
        wineryId: winery?.id,
      },
      update: {
        name: workshop.name,
        category: workshop.category,
        lat: workshop.lat,
        lng: workshop.lng,
        profileText: workshop.profileText,
        historyText: workshop.historyText,
        wineryId: winery?.id,
      },
    });

    await prisma.workshopWine.deleteMany({ where: { workshopId: record.id } });

    const wines = await prisma.wine.findMany({
      where: {
        slug: { in: [...workshop.wineSlugs] },
      },
      select: { id: true },
    });

    if (wines.length > 0) {
      await prisma.workshopWine.createMany({
        data: wines.map((wine) => ({ workshopId: record.id, wineId: wine.id })),
      });
    }
  }
}

async function main() {
  for (const winery of wineries) {
    await seedWinery(winery);
  }

  await seedAdditives();
  await attachInitialAdditives();
  await seedWorkshops();

  const additiveCount = await prisma.additive.count();
  const workshopCount = await prisma.workshop.count();
  console.log(`Seed complete. Wineries: ${wineries.length}, additives: ${additiveCount}, workshops: ${workshopCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
