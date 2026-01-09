import { Token } from "../models/token.model";

export function normalizeDexScreenerToken(raw: any): Token {
  const pair = raw?.pairs?.[0];

  return {
    address: pair?.baseToken?.address ?? "",
    name: pair?.baseToken?.name ?? "",
    symbol: pair?.baseToken?.symbol ?? "",

    priceUsd: pair?.priceUsd ? Number(pair.priceUsd) : null,
    marketCapUsd: pair?.fdv ? Number(pair.fdv) : null,
    volume24hUsd: pair?.volume?.h24 ? Number(pair.volume.h24) : null,
    liquidityUsd: pair?.liquidity?.usd
      ? Number(pair.liquidity.usd)
      : null,

    priceChange1h: pair?.priceChange?.h1 ?? null,
    priceChange24h: pair?.priceChange?.h24 ?? null,

    source: "dexscreener",
    updatedAt: Date.now()
  };
}
