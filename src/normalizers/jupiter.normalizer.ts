import { Token } from "../models/token.model";

export function normalizeJupiterToken(raw: any): Token {
  return {
    address: raw.address ?? "",
    name: raw.name ?? "",
    symbol: raw.symbol ?? "",

    priceUsd: raw.price ?? null,
    marketCapUsd: null,          // Jupiter doesn’t provide this reliably
    volume24hUsd: null,
    liquidityUsd: null,

    priceChange1h: null,
    priceChange24h: null,

    source: "dexscreener", // intentional for now (we’ll revisit)
    updatedAt: Date.now()
  };
}
