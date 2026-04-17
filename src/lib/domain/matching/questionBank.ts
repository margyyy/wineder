import type { FeatureVector } from "./features";

export type QuestionOption = {
  id: string;
  label: string;
  weights: Partial<FeatureVector>;
};

export type MatchingQuestion = {
  id: string;
  label: string;
  options: QuestionOption[];
};

export const questionBank: MatchingQuestion[] = [
  {
    id: "occasion",
    label: "In che occasione ti piace bere?",
    options: [
      { id: "aperitivo", label: "Aperitivo con amici", weights: { effervescenza: 0.5, acidita: 0.4, corpo: -0.2, fruttato: 0.3 } },
      { id: "cena", label: "Cena in compagnia", weights: { corpo: 0.5, tannini: 0.3, speziato: 0.2, alcol: 0.2 } },
      { id: "relax", label: "Momento di relax in solitudine", weights: { dolcezza: 0.3, floreale: 0.4, corpo: -0.1, minerale: 0.3 } },
      { id: "brindisi", label: "Brindisi e celebrazioni", weights: { effervescenza: 0.7, fruttato: 0.4, dolcezza: 0.2, acidita: 0.2 } },
    ],
  },
  {
    id: "coffee-style",
    label: "Come preferisci il caffe?",
    options: [
      { id: "short-bitter", label: "Corto e amaro", weights: { tannini: 0.9, corpo: 0.7, dolcezza: -0.4, alcol: 0.3 } },
      { id: "balanced", label: "Bilanciato", weights: { tannini: 0.3, corpo: 0.4, dolcezza: 0.2, acidita: 0.2 } },
      { id: "sweet", label: "Con zucchero", weights: { dolcezza: 0.8, tannini: -0.3, acidita: -0.2, fruttato: 0.2 } },
    ],
  },
  {
    id: "sparkling-water",
    label: "A tavola scegli acqua naturale o frizzante?",
    options: [
      { id: "very-sparkling", label: "Molto frizzante", weights: { effervescenza: 0.9, acidita: 0.4, corpo: -0.2, minerale: 0.2 } },
      { id: "light-sparkling", label: "Leggermente frizzante", weights: { effervescenza: 0.5, acidita: 0.2, minerale: 0.2 } },
      { id: "still", label: "Naturale", weights: { effervescenza: -0.8, corpo: 0.2, minerale: 0.1 } },
    ],
  },
  {
    id: "fruit-mood",
    label: "Che profumi ti attirano di piu?",
    options: [
      { id: "red-fruit", label: "Frutti rossi maturi", weights: { fruttato: 0.8, speziato: 0.2, dolcezza: 0.2 } },
      { id: "citrus-fresh", label: "Agrumi e freschezza", weights: { fruttato: 0.6, acidita: 0.5, minerale: 0.3 } },
      { id: "dry-herbal", label: "Erbe secche e note asciutte", weights: { terroso: 0.5, speziato: 0.4, dolcezza: -0.2 } },
    ],
  },
  {
    id: "aroma-space",
    label: "Se pensi a un profumo, cosa preferisci?",
    options: [
      { id: "flowers", label: "Giardino fiorito", weights: { floreale: 0.9, fruttato: 0.3, acidita: 0.2 } },
      { id: "wood-fire", label: "Legno e camino", weights: { legnoso: 0.8, terroso: 0.4, speziato: 0.3 } },
      { id: "sea-breeze", label: "Aria di mare", weights: { minerale: 0.9, acidita: 0.3, effervescenza: 0.2 } },
    ],
  },
  {
    id: "spice-tolerance",
    label: "Con il piccante come te la cavi?",
    options: [
      { id: "love-it", label: "Mi piace molto", weights: { speziato: 0.8, corpo: 0.3, alcol: 0.2 } },
      { id: "sometimes", label: "Solo ogni tanto", weights: { speziato: 0.4, corpo: 0.2 } },
      { id: "avoid", label: "Lo evito", weights: { speziato: -0.5, acidita: 0.2, fruttato: 0.2 } },
    ],
  },
  {
    id: "texture-preference",
    label: "Quale sensazione preferisci al palato?",
    options: [
      { id: "light-fresh", label: "Leggero e fresco", weights: { corpo: -0.4, alcol: -0.3, acidita: 0.4, fruttato: 0.3 } },
      { id: "full-round", label: "Morbido e avvolgente", weights: { corpo: 0.6, dolcezza: 0.4, tannini: -0.2, floreale: 0.3 } },
      { id: "bold-intense", label: "Potente e persistente", weights: { corpo: 0.8, alcol: 0.5, tannini: 0.6, legnoso: 0.3 } },
    ],
  },
];
