export const FEATURE_KEYS = [
  "dolcezza",
  "acidita",
  "tannini",
  "corpo",
  "alcol",
  "effervescenza",
  "fruttato",
  "floreale",
  "speziato",
  "terroso",
  "legnoso",
  "minerale",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];
export type FeatureVector = Record<FeatureKey, number>;

export const zeroVector = (): FeatureVector => ({
  dolcezza: 0,
  acidita: 0,
  tannini: 0,
  corpo: 0,
  alcol: 0,
  effervescenza: 0,
  fruttato: 0,
  floreale: 0,
  speziato: 0,
  terroso: 0,
  legnoso: 0,
  minerale: 0,
});
