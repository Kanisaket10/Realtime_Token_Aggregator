import { Token } from "../models/token.model";

type SortKey = "priceUsd" | "volume24hUsd" | "marketCapUsd";

export function sortTokens(
  tokens: Token[],
  sortBy?: SortKey
): Token[] {
  if (!sortBy) {
    return tokens;
  }

  return [...tokens].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    return bVal - aVal;
  });
}
