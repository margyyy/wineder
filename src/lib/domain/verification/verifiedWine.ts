export function isWineVerified(input: { productionDescription?: string | null; additiveCount: number }) {
  const hasProductionDescription = typeof input.productionDescription === "string" && input.productionDescription.trim().length > 0;
  return hasProductionDescription && input.additiveCount > 0;
}
