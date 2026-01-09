import { Token } from "../models/token.model";

export function mergeTokens(
  primary: Token,
  secondary: Token | null
): Token {
  if (!secondary) {
    return primary;
  }

  return {
    ...primary,

    // fill only if primary is missing
    name: primary.name || secondary.name,
    symbol: primary.symbol || secondary.symbol,

    priceUsd:
      primary.priceUsd !== null
        ? primary.priceUsd
        : secondary.priceUsd,

    marketCapUsd:
      primary.marketCapUsd !== null
        ? primary.marketCapUsd
        : secondary.marketCapUsd,

    volume24hUsd:
      primary.volume24hUsd !== null
        ? primary.volume24hUsd
        : secondary.volume24hUsd,

    liquidityUsd:
      primary.liquidityUsd !== null
        ? primary.liquidityUsd
        : secondary.liquidityUsd,

    updatedAt: Date.now()
  };
}
